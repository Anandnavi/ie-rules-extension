/**
 * content.ts — Content script.
 *
 * Scans the live DOM (including shadow roots and same-origin iframes),
 * detects Epiplex roles, finds labels, discovers framework wrappers for
 * traversal rules, and renders the visual-inspection highlight overlay.
 *
 * Message protocol (popup → content):
 *   { type: 'EPIPLEX_SCAN' }                        → ScanResponse
 *   { type: 'EPIPLEX_HIGHLIGHT', enabled: boolean } → toggle overlay
 *   { type: 'EPIPLEX_LIVE', enabled: boolean }      → toggle MutationObserver
 *   { type: 'EPIPLEX_CLEAR_HIGHLIGHT' }             → remove overlay
 */
import { detectElementFramework, detectFrameworks } from './frameworkDetector';
import { findLabel } from './labelEngine';
import { detectControlRole, extractAttributes, type ElementLike } from './ruleEngine';
import { loadSettings, resolveRoleMappings } from './settings';
import { buildTraversalRule, type TraversalDiscovery } from './traversalEngine';
import type { DetectedControl, FrameworkInfo, RoleId, RoleMappingConfig, ScanResponse, TraversalRule } from './types';
import { roleColor, roleName } from './types';

const EXCLUDED_TAGS = new Set(['script', 'style', 'template', 'noscript', 'meta', 'link', 'title', 'head', 'iframe', 'br', 'hr']);
const MAX_CONTROLS = 3000;
const MAX_TEXT_CONTROLS = 800;

// Framework wrapper patterns → traversal rules (wrapper → real control).
const WRAPPER_PATTERNS: { re: RegExp; framework: string }[] = [
  { re: /mat-form-field|mat-checkbox|mat-slide-toggle|mat-radio-group/, framework: 'Angular Material' },
  { re: /slds-form-element|slds-checkbox|slds-radio/, framework: 'Salesforce Lightning' },
  { re: /select2-container/, framework: 'Select2' },
  { re: /ui5-(combobox|select|datepicker|checkbox|radiobutton)/, framework: 'SAP UI5' },
  { re: /p-(dropdown|checkbox|radiobutton|calendar)/, framework: 'PrimeNG' },
  { re: /appmagic-(combobox|checkbox|radio|datepicker)/, framework: 'PowerApps' },
];

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let lastScan: DetectedControl[] = [];
let highlightEnabled = false;
let liveEnabled = false;
let observer: MutationObserver | null = null;
let overlay: HTMLDivElement | null = null;
let tooltip: HTMLDivElement | null = null;
let repositionRaf = 0;
let activeBoxes: { el: HTMLDivElement; control: DetectedControl }[] = [];
let frameId = 0;

// ---------------------------------------------------------------------------
// Location helpers
// ---------------------------------------------------------------------------

function xpathFor(el: Element): string {
  if (el.id) return `//*[@id="${el.id.replace(/"/g, '\\"')}"]`;
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node.nodeType === 1) {
    const tag = node.tagName.toLowerCase();
    let idx = 1;
    let sib: Element | null = node.previousElementSibling;
    while (sib) {
      if (sib.tagName === node.tagName) idx++;
      sib = sib.previousElementSibling;
    }
    parts.unshift(`${tag}[${idx}]`);
    node = node.parentElement;
  }
  return '/' + parts.join('/');
}

function cssFor(el: Element): string {
  const id = el.id;
  if (id && /^[a-zA-Z][\w-]*$/.test(id)) return `#${id}`;
  const cls = Array.from(el.classList || []).filter((c) => /^[a-zA-Z][\w-]*$/.test(c));
  if (cls.length) return `${el.tagName.toLowerCase()}.${cls.join('.')}`;
  const parent = el.parentElement;
  if (parent) {
    const siblings = Array.from(parent.children).filter((c) => c.tagName === el.tagName);
    const idx = siblings.indexOf(el) + 1;
    return `${el.tagName.toLowerCase()}:nth-of-type(${idx})`;
  }
  return el.tagName.toLowerCase();
}

function visible(el: Element): boolean {
  try {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 1 && rect.height > 1;
  } catch {
    return false;
  }
}

/**
 * Visible text adjacent to icon/logo/button elements (e.g. the "ChatGPT"
 * label next to the ChatGPT SVG). Used for human-readable step sentences.
 */
function captureAdjacentText(el: Element): string | undefined {
  const tag = el.tagName.toLowerCase();
  const role = el.getAttribute('role');
  const clickable =
    tag === 'svg' || tag === 'img' || tag === 'i' || tag === 'a' || tag === 'button' ||
    tag === 'mat-icon' || role === 'button' || role === 'link';
  if (!clickable) return undefined;

  const take = (t: string | null): string | undefined => {
    const cleaned = (t || '').replace(/\s+/g, ' ').trim();
    if (!cleaned) return undefined;
    return cleaned.length > 60 ? cleaned.slice(0, 59).trimEnd() + '…' : cleaned;
  };

  // Leaf sibling first (text-only sibling element).
  for (const sib of [el.previousElementSibling, el.nextElementSibling]) {
    if (sib && sib.children.length === 0) {
      const t = take(sib.textContent);
      if (t) return t;
    }
  }
  // Direct text node in the parent (e.g. <svg/> ChatGPT).
  const parent = el.parentElement;
  if (parent) {
    const direct = Array.from(parent.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent || '')
      .join(' ');
    const t = take(direct);
    if (t) return t;
    // First short-text sibling element (no nested controls).
    for (const sib of Array.from(parent.children)) {
      if (sib === el) continue;
      if (sib.querySelector('input, select, textarea, button, a')) continue;
      const t2 = take(sib.textContent);
      if (t2 && t2.length <= 40) return t2;
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Role helpers
// ---------------------------------------------------------------------------

/**
 * True when the element sits inside an interactive ancestor (link, button,
 * form field, menu item…). Icons nested there are part of that control — they
 * must not be scanned as separate icon controls, or they would steal the
 * click from the link/button (matches the working IEAdaptor.xml, which only
 * maps icons under a container with ParentRole=10).
 */
function hasInteractiveAncestor(el: Element): boolean {
  const sel = 'a, button, input, select, textarea, label, [role="button"], [role="link"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';
  let p = el.parentElement;
  for (let i = 0; p && i < 8; i++, p = p.parentElement) {
    if (p.matches && p.matches(sel)) return true;
    const r = p.getAttribute && p.getAttribute('role');
    if (r && /^(button|link|menuitem|menuitemcheckbox|menuitemradio)$/i.test(r)) return true;
  }
  return false;
}

function parentRoleFor(el: Element, role: RoleId): RoleId | null {
  if (role === 42 || role === 44 || role === 45 || role === 46 || role === 92 || role === 29 || role === 28 || role === 43) {
    return 10;
  }
  if (role === 34) {
    const inList = el.closest('select, [role="listbox"], [role="combobox"]');
    return inList ? 46 : 10;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Traversal discovery (wrapper → real control)
// ---------------------------------------------------------------------------

function discoverTraversal(
  el: Element,
  role: RoleId,
  frameworkClass: string | null,
  enabledFrameworks: Record<string, boolean>
): TraversalRule | undefined {
  const targetAttrs = (): Record<string, string> => {
    const t: Record<string, string> = { TagName: el.tagName.toLowerCase() };
    const type = el.getAttribute('type');
    if (type) t.type = type;
    return t;
  };

  // 1. Framework wrapper ancestor → CH recursive.
  let walker: Element | null = el.parentElement;
  let hops = 0;
  while (walker && hops < 3) {
    const cls = walker.getAttribute('class') || '';
    for (const p of WRAPPER_PATTERNS) {
      const m = cls.match(p.re);
      if (m && enabledFrameworks[p.framework] !== false) {
        const discovery: TraversalDiscovery = {
          condition: { className: `|${m[0]}|`, operator: 'contains' },
          target: targetAttrs(),
          direction: 'CH',
          recursive: true,
          framework: p.framework,
          reason: `${p.framework}: <${walker.tagName.toLowerCase()} class="${m[0]}"> wraps the real control`,
        };
        return buildTraversalRule(discovery, role, 10, 90);
      }
    }
    walker = walker.parentElement;
    hops++;
  }

  // 2. Visually hidden native control with a visible sibling widget (custom checkboxes / select2).
  if ((role === 44 || role === 45 || role === 46) && (el as HTMLInputElement).type && !visible(el)) {
    const prev = el.previousElementSibling;
    const next = el.nextElementSibling;
    const widget = (prev && visible(prev)) ? prev : (next && visible(next)) ? next : null;
    if (widget) {
      const wClass = widget.getAttribute('class') || '';
      const wTag = widget.tagName.toLowerCase();
      const direction = prev && visible(prev) ? 'PS' : 'NS';
      const discovery: TraversalDiscovery = {
        condition:
          wTag === 'label'
            ? { tagName: '|label|' }
            : { className: `|${wClass.split(/\s+/).filter(Boolean).slice(0, 2).join('|')}|`, operator: 'contains' },
        target: { TagName: 'input', type: (el as HTMLInputElement).type },
        direction, recursive: true,
        framework: null,
        reason: `Custom ${roleName(role).toLowerCase()}: visible <${wTag}> widget next to the hidden input`,
      };
      return buildTraversalRule(discovery, role, 10, 85);
    }
  }

  // 3. Custom widget element itself (label/div/span matched by checkbox|radio|switch|combobox class).
  const tag = el.tagName.toLowerCase();
  if ((tag === 'label' || tag === 'div' || tag === 'span') && frameworkClass && /checkbox|switch|radio|combobox/i.test(frameworkClass)) {
    const input = el.querySelector('input[type="checkbox"], input[type="radio"], select');
    if (input) {
      const target: Record<string, string> = { TagName: input.tagName.toLowerCase() };
      const type = input.getAttribute('type');
      if (type) target.type = type;
      const discovery: TraversalDiscovery = {
        condition: { className: `|${frameworkClass}|`, operator: 'contains' },
        target,
        direction: 'CH', recursive: true,
        framework: null,
        reason: `Custom widget <${tag}> with class "${frameworkClass}" contains the real control`,
      };
      return buildTraversalRule(discovery, role, 10, 85);
    }
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// Scan
// ---------------------------------------------------------------------------

interface ScanContext {
  controls: DetectedControl[];
  config: RoleMappingConfig;
  frameworks: FrameworkInfo[];
  enabledFw: Record<string, boolean>;
  textCount: number;
  iframePrefix: string;
}

function walkTree(root: Node, ctx: ScanContext): void {
  if (ctx.controls.length >= MAX_CONTROLS) return;
  const nodes = root instanceof Document || root instanceof DocumentFragment || root instanceof ShadowRoot
    ? Array.from(root.querySelectorAll('*'))
    : Array.from((root as Element).querySelectorAll('*'));
  const visited = new Set<Element>();

  for (const el of nodes) {
    if (ctx.controls.length >= MAX_CONTROLS) break;
    if (!(el instanceof Element)) continue;
    const tag = el.tagName.toLowerCase();
    if (EXCLUDED_TAGS.has(tag)) continue;
    if (el.id === 'epiplex-ie-overlay' || el.classList?.contains('epiplex-box')) continue;
    if (visited.has(el)) continue;
    visited.add(el);

    // Recurse into shadow roots + same-origin iframes.
    const shadow = (el as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot;
    if (shadow) walkTree(shadow, { ...ctx, iframePrefix: ctx.iframePrefix });
    if (tag === 'iframe') {
      try {
        const idoc = (el as HTMLIFrameElement).contentDocument;
        if (idoc) walkTree(idoc, { ...ctx, iframePrefix: `${ctx.iframePrefix}iframe#${el.id || ''} ` });
      } catch { /* cross-origin */ }
      continue;
    }

    // Detect role.
    const elLike: ElementLike = el as unknown as ElementLike;
    const det = detectControlRole(elLike, ctx.config, null);
    const fwEl = detectElementFramework(el, ctx.frameworks);

    const role = det.role;
    const confidence = det.confidence;
    const breakdown = det.breakdown;
    const reason = det.reason;
    const frameworkClass = det.frameworkClass;

    // Icons nested inside an interactive control (link/button/menu item…) are
    // part of that control — never scan them as separate icon controls so the
    // link/button keeps priority.
    if ((tag === 'svg' || tag === 'i' || tag === 'mat-icon') && hasInteractiveAncestor(el)) continue;

    // Skip noisy text/container defaults unless meaningful.
    if (role === 10 && !['form', 'fieldset', 'nav', 'section', 'article', 'header', 'footer', 'main'].includes(tag)) continue;
    if (role === 41) {
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (text.length < 2) continue;
      if (el.querySelector('input, select, textarea, button, a, img, table')) continue; // container of controls, not text
      if (ctx.textCount >= MAX_TEXT_CONTROLS) continue;
      ctx.textCount++;
    }
    if (role === 82 && el.children.length > 0 && !el.textContent) continue; // svg containers

    const labelResult = findLabel(el, root.ownerDocument || document);
    const attrs = extractAttributes(elLike);
    const traversal = discoverTraversal(el, role, frameworkClass, ctx.enabledFw);

    const control: DetectedControl = {
      uid: `c${frameId++}`,
      role,
      roleName: roleName(role),
      confidence,
      confidenceBreakdown: breakdown,
      attributes: attrs,
      label: labelResult.text,
      labelStrategy: labelResult.strategy,
      labelMethod: labelResult.strategy,
      location: { xpath: ctx.iframePrefix + xpathFor(el), cssSelector: ctx.iframePrefix + cssFor(el) },
      framework: fwEl ? fwEl.framework : null,
      frameworkClass,
      reason,
      parentRole: parentRoleFor(el, role),
      displayText: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
      adjacentText: captureAdjacentText(el),
      traversalRule: traversal,
    };
    ctx.controls.push(control);
  }
}

// ---------------------------------------------------------------------------
// Highlight overlay
// ---------------------------------------------------------------------------

function ensureOverlay(): HTMLDivElement {
  if (overlay && overlay.isConnected) return overlay;
  overlay = document.createElement('div');
  overlay.id = 'epiplex-ie-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;z-index:2147483646;pointer-events:none;';
  const style = document.createElement('style');
  style.textContent = `
    .epiplex-box{position:fixed;border:2px solid transparent;box-sizing:border-box;pointer-events:auto;cursor:crosshair;transition:box-shadow .12s;}
    .epiplex-box:hover{box-shadow:0 0 0 2px rgba(0,0,0,.6), 0 4px 14px rgba(0,0,0,.35);z-index:1;}
    #epiplex-tip{position:fixed;z-index:2147483647;background:#0f1b2d;color:#e8eef7;font:11px/1.45 Consolas,Menlo,monospace;padding:8px 10px;border-radius:6px;max-width:420px;white-space:pre-wrap;word-break:break-word;pointer-events:none;box-shadow:0 6px 22px rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.15);}
    #epiplex-tip b{color:#ffd54f;}
    #epiplex-tip .k{color:#80cbc4;}
  `;
  document.documentElement.appendChild(style);
  document.documentElement.appendChild(overlay);
  return overlay;
}

function renderHighlight(): void {
  if (!highlightEnabled) return;
  const host = ensureOverlay();
  activeBoxes.forEach((b) => b.el.remove());
  activeBoxes = [];
  tooltip?.remove();
  tooltip = null;

  const win = window;
  const docEl = document.documentElement;
  for (const c of lastScan) {
    if (c.location.cssSelector.includes('iframe')) continue; // cross-frame controls aren't positionable here
    let el: Element | null = null;
    try {
      el = c.attributes.id ? document.getElementById(c.attributes.id) : null;
      if (!el) el = document.querySelector(c.location.cssSelector);
      if (!el) {
        const p = document.evaluate(c.location.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as Element | null;
        el = p;
      }
    } catch { el = null; }
    if (!el || !el.isConnected || !visible(el)) continue;

    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;
    const box = document.createElement('div');
    box.className = 'epiplex-box';
    box.style.borderColor = roleColor(c.role);
    box.style.background = roleColor(c.role) + '2e';
    box.style.left = rect.left + 'px';
    box.style.top = rect.top + 'px';
    box.style.width = rect.width + 'px';
    box.style.height = rect.height + 'px';
    const control = c;
    box.addEventListener('mouseenter', () => showTooltip(control, box));
    box.addEventListener('mouseleave', () => tooltip?.remove());
    host.appendChild(box);
    activeBoxes.push({ el: box, control: c });
  }

  const reposition = () => {
    if (!highlightEnabled) return;
    for (const b of activeBoxes) {
      let el: Element | null = null;
      try {
        el = b.control.attributes.id ? document.getElementById(b.control.attributes.id) : null;
        if (!el) el = document.querySelector(b.control.location.cssSelector);
      } catch { el = null; }
      if (!el) { b.el.style.display = 'none'; continue; }
      const rect = el.getBoundingClientRect();
      b.el.style.left = rect.left + 'px';
      b.el.style.top = rect.top + 'px';
      b.el.style.width = rect.width + 'px';
      b.el.style.height = rect.height + 'px';
    }
  };
  const onScroll = () => {
    if (repositionRaf) cancelAnimationFrame(repositionRaf);
    repositionRaf = requestAnimationFrame(reposition);
  };
  win.removeEventListener('scroll', onScroll, true);
  win.addEventListener('scroll', onScroll, true);
  win.removeEventListener('resize', onScroll);
  win.addEventListener('resize', onScroll);
  void docEl;
}

function showTooltip(c: DetectedControl, anchor: HTMLDivElement): void {
  tooltip?.remove();
  tooltip = document.createElement('div');
  tooltip.id = 'epiplex-tip';
  const a = c.attributes;
  const ruleLine = c.traversalRule
    ? `Traversal: ${c.traversalRule.condition.className || c.traversalRule.condition.tagName || ''} → ${c.traversalRule.paths.map((p) => `${p.path}${p.operator === 'recursive' ? '*' : ''}`).join(' ')}`
    : `Rule: ${c.reason}`;
  tooltip.textContent = '';
  tooltip.innerHTML =
    `<b>${c.roleName}</b> (role ${c.role}) · ${c.confidence}%<br>` +
    `<span class="k">Tag:</span> ${a.tagName}${a.type ? ` type="${a.type}"` : ''}<br>` +
    `<span class="k">Label:</span> ${(c.label || '—').slice(0, 60)}<br>` +
    `<span class="k">Attrs:</span> ${[a.id && `id=${a.id}`, a.name && `name=${a.name}`, a.className && `class=${a.className.split(/\s+/).slice(0, 3).join(' ')}`].filter(Boolean).join(' ') || '—'}<br>` +
    `<span class="k">Rule:</span> ${ruleLine}<br>` +
    `<span class="k">CSS:</span> ${c.location.cssSelector}<br>` +
    `<span class="k">XPath:</span> ${c.location.xpath}`;
  const rect = anchor.getBoundingClientRect();
  tooltip.style.left = Math.min(rect.left, window.innerWidth - 440) + 'px';
  tooltip.style.top = (rect.top > 180 ? rect.top - tooltip.offsetHeight - 10 : rect.bottom + 10) + 'px';
  document.documentElement.appendChild(tooltip);
}

function clearHighlight(): void {
  highlightEnabled = false;
  overlay?.remove();
  tooltip?.remove();
  activeBoxes = [];
}

// ---------------------------------------------------------------------------
// Live capture (MutationObserver)
// ---------------------------------------------------------------------------

function startLive(config: RoleMappingConfig, frameworks: FrameworkInfo[], enabledFw: Record<string, boolean>): void {
  if (observer) return;
  let timer = 0;
  observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      const res = performScan(config, frameworks, enabledFw);
      chrome.runtime.sendMessage({ type: 'EPIPLEX_LIVE_UPDATE', payload: res }).catch(() => undefined);
    }, 700);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
}

function stopLive(): void {
  observer?.disconnect();
  observer = null;
}

// ---------------------------------------------------------------------------
// Scan orchestration
// ---------------------------------------------------------------------------

function performScan(config: RoleMappingConfig, frameworks: FrameworkInfo[], enabledFw: Record<string, boolean>): ScanResponse {
  frameId = 0;
  const ctx: ScanContext = { controls: [], config, frameworks, enabledFw, textCount: 0, iframePrefix: '' };
  walkTree(document, ctx);
  lastScan = ctx.controls;
  if (highlightEnabled) renderHighlight();
  return {
    controls: lastScan,
    frameworks: frameworks.map((f) => f.name),
    url: location.href,
    title: document.title,
    timestamp: Date.now(),
  };
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  void (async () => {
    const settings = await loadSettings();
    const baseConfig = resolveRoleMappings(settings);
    // Respect per-framework toggles: drop mappings for disabled frameworks.
    const config: RoleMappingConfig = {
      ...baseConfig,
      frameworkRoleMappings: baseConfig.frameworkRoleMappings.filter(
        (m) => settings.enabledFrameworks[m.framework] !== false
      ),
    };
    const frameworks = detectFrameworks(document).filter((f) => settings.enabledFrameworks[f.key] !== false);
    const enabledFw = settings.enabledFrameworks;

    switch (msg?.type) {
      case 'EPIPLEX_SCAN': {
        const res = performScan(config, frameworks, enabledFw);
        sendResponse({ ok: true, payload: res });
        break;
      }
      case 'EPIPLEX_HIGHLIGHT': {
        highlightEnabled = !!msg.enabled;
        if (highlightEnabled) renderHighlight();
        else clearHighlight();
        sendResponse({ ok: true });
        break;
      }
      case 'EPIPLEX_LIVE': {
        if (msg.enabled) startLive(config, frameworks, enabledFw);
        else stopLive();
        liveEnabled = !!msg.enabled;
        sendResponse({ ok: true, live: liveEnabled });
        break;
      }
      case 'EPIPLEX_CLEAR_HIGHLIGHT': {
        clearHighlight();
        sendResponse({ ok: true });
        break;
      }
      default:
        sendResponse({ ok: false, error: 'unknown message' });
    }
  })().catch((e) => sendResponse({ ok: false, error: String(e) }));
  return true; // async response
});
