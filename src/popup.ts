/**
 * popup.ts — Popup controller.
 *
 * Orchestrates: scan requests to the content script, rule generation
 * (ruleEngine + labelEngine + traversalEngine), XML generation/validation,
 * compare/merge with an existing IEAdaptor.xml, GPS mappings, test-case
 * generation, visual-inspection toggles, live capture, and settings.
 */
import { compareRules, mergeXML, parseExistingRules } from './compareEngine';
import { buildStandardLabelRules, buildTraverseLabelRules, suggestMissingLabels } from './labelEngine';
import { generateRuleModel, type RuleGenContext } from './ruleEngine';
import { loadSettings, saveSettings, validateMappingJson, type ExtensionSettings } from './settings';
import { generateTraversalRules, suggestTraversalImprovements } from './traversalEngine';
import { generateStepSentence } from './stepSentence';
import type { CompareResult, DetectedControl, RuleModel, ScanResponse } from './types';
import { roleColor, roleName, ROLES } from './types';
import {
  EXTENSION_VERSION,
  generateGpsMappings,
  generateTestCases,
  generateXML,
  validateXML,
} from './xmlGenerator';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface AppState {
  settings: ExtensionSettings;
  scan: ScanResponse | null;
  model: RuleModel | null;
  xml: string;
  gpsXml: string;
  testCases: string;
  existingXml: string;
  existingFileName: string;
  compare: CompareResult | null;
  mergedXml: string | null;
  mergedCount: number;
  tabId: number | null;
}

const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;

const state: AppState = {
  settings: await loadSettings(),
  scan: null,
  model: null,
  xml: '',
  gpsXml: '',
  testCases: '',
  existingXml: '',
  existingFileName: '',
  compare: null,
  mergedXml: null,
  mergedCount: 0,
  tabId: null,
};

const esc = (s: string | undefined | null): string =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------------------
// Chrome messaging helpers
// ---------------------------------------------------------------------------

async function getActiveTab(): Promise<{ id: number; url?: string; title?: string } | null> {
  const res = await chrome.runtime.sendMessage({ type: 'EPIPLEX_GET_TAB' });
  if (res?.ok && res.tab) {
    state.tabId = res.tab.id;
    return res.tab;
  }
  // Fallback (e.g. when background hasn't replied): direct query.
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    state.tabId = tab?.id ?? null;
    return tab ? { id: tab.id as number, url: tab.url, title: tab.title } : null;
  } catch {
    return null;
  }
}

async function sendToTab<T>(type: string, extra: Record<string, unknown> = {}): Promise<T | null> {
  if (state.tabId === null) await getActiveTab();
  if (state.tabId === null) return null;
  try {
    const res = await chrome.tabs.sendMessage(state.tabId, { type, ...extra });
    return (res?.ok ? res : null) as T | null;
  } catch (e) {
    setStatus('scanStatus', `Cannot reach the page — open a normal web page first (${(e as Error).message})`, 'err');
    return null;
  }
}

// ---------------------------------------------------------------------------
// Scan + rule generation pipeline
// ---------------------------------------------------------------------------

async function runScan(): Promise<void> {
  const tab = await getActiveTab();
  if (!tab || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) {
    setStatus('scanStatus', 'Open a normal web page to scan (chrome:// and store pages are blocked).', 'err');
    return;
  }
  setStatus('scanStatus', 'Scanning page…', '');
  const res = await sendToTab<{ payload: ScanResponse }>('EPIPLEX_SCAN');
  if (!res) return;

  state.scan = res.payload;
  const ctrl = res.payload.controls;
  const s = state.settings;

  // Build the rule model.
  const ctx: RuleGenContext = {
    config: await import('./settings').then((m) => m.resolveRoleMappings(state.settings)),
    url: res.payload.url,
    title: res.payload.title,
    minConfidence: s.minConfidence,
    emitTraversalRules: s.emitTraversalRules,
    emitLabelRules: s.emitLabelRules,
  };
  const traversal = s.emitTraversalRules ? generateTraversalRules(ctrl) : [];
  const labels = s.emitLabelRules
    ? { standard: buildStandardLabelRules(ctrl), traverse: buildTraverseLabelRules(ctrl) }
    : { standard: buildStandardLabelRules(ctrl), traverse: [] };

  state.model = generateRuleModel(ctrl, ctx, { traversalRules: traversal, labelRules: labels });
  state.xml = generateXML(state.model);
  state.gpsXml = generateGpsMappings(ctrl);
  state.testCases = generateTestCases(state.model);

  // Compare with any loaded existing XML.
  if (state.existingXml) refreshCompare();

  renderFrameworks();
  renderRoleSummary();
  renderControls();
  renderRules();
  renderXml();
  renderDiagnostics();

  document.querySelector('#siteInfo')!.textContent = `${res.payload.title} — ${res.payload.url}`;
  setStatus('scanStatus', `Scanned ${ctrl.length} controls in ${new Date().toLocaleTimeString()}`, 'ok');
  switchTab('scan');
}

// ---------------------------------------------------------------------------
// Rendering: scan tab
// ---------------------------------------------------------------------------

function renderFrameworks(): void {
  const host = $<HTMLElement>('frameworkChips');
  const fws = state.scan?.frameworks || [];
  host.innerHTML = fws.length
    ? fws.map((f) => `<span class="chip">${esc(f)}</span>`).join('')
    : '<span class="muted">No known framework detected (still generating tag/attribute rules).</span>';
}

function renderRoleSummary(): void {
  const host = $<HTMLElement>('roleSummary');
  const counts = new Map<number, number>();
  for (const c of state.scan?.controls || []) counts.set(c.role, (counts.get(c.role) || 0) + 1);
  host.innerHTML = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(
      ([role, n]) =>
        `<span class="chip"><span style="color:${roleColor(role)}">●</span> ${esc(roleName(role))}<span class="n">${n}</span></span>`
    )
    .join('');
  $<HTMLElement>('summaryRow').hidden = false;
}

function roleFilterOptions(): string {
  const roles = new Set<number>();
  for (const c of state.scan?.controls || []) roles.add(c.role);
  return [...roles].sort((a, b) => a - b).map((r) => `<option value="${r}">${esc(roleName(r))} (${r})</option>`).join('');
}

function renderControls(): void {
  const filter = $<HTMLSelectElement>('roleFilter');
  const prev = filter.value;
  filter.innerHTML = '<option value="">All control types</option>' + roleFilterOptions();
  filter.value = prev;

  const tbody = $<HTMLTableElement>('controlsTable').querySelector('tbody')!;
  const search = $<HTMLInputElement>('searchBox').value.toLowerCase();
  const role = filter.value;

  const rows = (state.scan?.controls || []).filter((c) => {
    if (role && String(c.role) !== role) return false;
    if (search) {
      const hay = [c.attributes.tagName, c.attributes.id, c.attributes.name, c.attributes.className, c.label, c.reason, c.location.cssSelector, c.location.xpath].join(' ').toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  });

  $<HTMLElement>('controlCount').textContent = `${rows.length} shown / ${state.scan?.controls.length ?? 0}`;

  tbody.innerHTML = rows
    .map((c) => {
      const a = c.attributes;
      const conf = Math.round(c.confidence);
      const attrs = [a.type && `type=${a.type}`, a.name && `name=${a.name}`, a.className && `class=${a.className.split(/\s+/).slice(0, 2).join(' ')}`].filter(Boolean).join('<br>');
      return `<tr>
        <td><span class="role-chip" style="background:${roleColor(c.role)}">${c.roleName}</span></td>
        <td>${esc(c.label || '—')}</td>
        <td class="mono">&lt;${esc(a.tagName)}&gt;${attrs ? `<br><span class="muted">${attrs}</span>` : ''}</td>
        <td><span class="conf-bar"><i style="width:${conf}%"></i></span> ${conf}%</td>
        <td class="mono">${esc(c.labelStrategy)}</td>
        <td class="mono" title="${esc(c.reason)}">${esc(short(c.reason, 60))}</td>
        <td class="mono">${esc(short(c.location.cssSelector, 34))}</td>
        <td class="mono" title="${esc(generateStepSentence(c))}">${esc(short(generateStepSentence(c), 46))}</td>
      </tr>`;
    })
    .join('') || '<tr><td colspan="8" class="muted">No controls match the current filter.</td></tr>';
}

function renderDiagnostics(): void {
  const host = $<HTMLElement>('diagList');
  const ctrl = state.scan?.controls || [];
  const suggestions = [...suggestMissingLabels(ctrl), ...suggestTraversalImprovements(ctrl)];
  const unique = [...new Set(suggestions)];
  const html = unique.slice(0, 25).map((s) => `<div class="d-item"><span>💡</span> ${esc(s)}</div>`).join('');
  host.innerHTML = html || '<p class="muted">No suggestions — all controls have labels or are structural.</p>';
  $<HTMLElement>('suggestionList').innerHTML = unique.slice(0, 25).map((s) => `<li>${esc(s)}</li>`).join('');
}

// ---------------------------------------------------------------------------
// Rendering: rules tab
// ---------------------------------------------------------------------------

function ruleKindBadge(kind: string): string {
  const map: Record<string, string> = {
    tag: 'kind-tag', attribute: 'kind-attribute', traversal: 'kind-traversal',
    'label-standard': 'kind-label-standard', 'label-traverse': 'kind-label-traverse',
  };
  const label: Record<string, string> = {
    tag: 'BasedOnTags', attribute: 'BasedOnAttributes', traversal: 'TraverseLogic',
    'label-standard': 'StandardLogic', 'label-traverse': 'TraverseLogic',
  };
  return `<span class="kind-badge ${map[kind] || ''}">${label[kind] || kind}</span>`;
}

function renderRules(): void {
  const host = $<HTMLElement>('ruleList');
  const model = state.model;
  const filter = $<HTMLSelectElement>('ruleKindFilter').value;
  if (!model) { host.innerHTML = '<p class="muted">Scan a page first.</p>'; return; }

  type Item = { kind: string; desc: string; conf: number; src: string; fw?: string };
  const items: Item[] = [];
  for (const r of model.basedOnTags) {
    items.push({ kind: 'tag', desc: `Role ${r.currentRole} ${r.parentRole !== null ? `(parent ${r.parentRole})` : ''}: ${r.conditions.map((c) => `${c.tagName}${c.type ? ' ' + c.type : ''}`).join(' · ')}`, conf: r.confidence, src: r.source, fw: r.framework });
  }
  for (const r of model.basedOnAttributes) {
    items.push({ kind: 'attribute', desc: `Role ${r.currentRole}: ${r.attribute} ${r.operator} |${r.values.join('|')}|`, conf: r.confidence, src: r.source, fw: r.framework });
  }
  for (const r of model.basedOnTraverseLogic) {
    items.push({ kind: 'traversal', desc: `Role ${r.currentRole}: ${r.condition.className || r.condition.tagName || r.condition.attribute || '?'} → ${r.paths.map((p) => `${p.path}${p.operator === 'recursive' ? '*' : ''} ${Object.values(p.attributes).join(' ')}`).join(' → ')}`, conf: r.confidence, src: r.source, fw: r.framework });
  }
  for (const r of model.standardLogic) {
    items.push({ kind: 'label-standard', desc: `${r.id}: ${r.from} → ${r.to} (${r.operator})`, conf: 95, src: r.reason });
  }
  for (const r of model.traverseLogic) {
    items.push({ kind: 'label-traverse', desc: `${r.id}: role ${r.role} ${r.attributes.TagName || ''} → ${r.paths.map((p) => `${p.path} ${Object.values(p.attributes).join(' ')}`).join(' → ')} (${r.method})`, conf: 90, src: r.reason });
  }

  const filtered = filter ? items.filter((i) => i.kind === filter) : items;
  $<HTMLElement>('ruleCount').textContent = `${filtered.length} rules`;
  host.innerHTML = filtered
    .map(
      (i) => `<div class="rule-item">
        <div class="r-head">${ruleKindBadge(i.kind)}<b>${i.conf}%</b>${i.fw ? `<span class="chip">${esc(i.fw)}</span>` : ''}</div>
        <div class="r-desc">${esc(i.desc)}</div>
        <div class="r-src">${esc(i.src)}</div>
      </div>`
    )
    .join('') || '<p class="muted">No rules.</p>';
}

// ---------------------------------------------------------------------------
// Rendering: XML tab
// ---------------------------------------------------------------------------

function renderXml(): void {
  $<HTMLElement>('xmlPreview').textContent = state.xml || 'Scan a page to generate IEAdaptor.xml…';
  if (!state.xml) { $<HTMLElement>('xmlValid').textContent = ''; return; }
  const v = validateXML(state.xml);
  $<HTMLElement>('xmlValid').textContent = v.valid
    ? `✓ Valid XML (${(state.xml.length / 1024).toFixed(1)} KB)`
    : `✗ Invalid: ${v.errors.join('; ')}`;
  $<HTMLElement>('xmlValid').className = 'status ' + (v.valid ? 'ok' : 'err');
}

// ---------------------------------------------------------------------------
// Compare / merge
// ---------------------------------------------------------------------------

function refreshCompare(): void {
  if (!state.model || !state.existingXml) return;
  state.compare = compareRules(state.model, parseExistingRules(state.existingXml));
  const merged = mergeXML(state.model, state.existingXml);
  state.mergedXml = merged.xml;
  state.mergedCount = merged.added;
  renderCompare();
  $<HTMLButtonElement>('btnMerge').disabled = false;
  $<HTMLButtonElement>('btnDownloadMerged').disabled = state.mergedCount === 0;
}

function renderCompare(): void {
  const c = state.compare;
  const host = $<HTMLElement>('compareSummary');
  if (!c) { host.innerHTML = ''; $<HTMLTableElement>('compareTable').querySelector('tbody')!.innerHTML = ''; return; }

  host.innerHTML = `
    <div class="cmp new"><b>${c.newRules.length}</b> new</div>
    <div class="cmp modified"><b>${c.modifiedRules.length}</b> modified</div>
    <div class="cmp duplicate"><b>${c.duplicateRules.length}</b> duplicates</div>
    <div class="cmp obsolete"><b>${c.obsoleteRules.length}</b> obsolete</div>
    <div class="cmp matched"><b>${c.matched}</b> matched</div>
    <div class="cmp">+ <b>${state.mergedCount}</b> rules to merge</div>`;

  const filter = $<HTMLSelectElement>('compareFilter').value;
  const statusOf = (r: { inGenerated: boolean; inExisting: boolean }): string =>
    r.inGenerated && !r.inExisting ? 'new' : r.inGenerated && r.inExisting ? 'duplicate' : 'obsolete';

  const rows = [
    ...c.newRules.map((r) => ({ ...r, status: 'new' })),
    ...c.modifiedRules.map((r) => ({ ...r, status: 'modified' })),
    ...c.duplicateRules.map((r) => ({ ...r, status: 'duplicate' })),
    ...c.obsoleteRules.map((r) => ({ ...r, status: 'obsolete' })),
  ].filter((r) => !filter || r.status === filter);

  $<HTMLTableElement>('compareTable').querySelector('tbody')!.innerHTML = rows
    .map(
      (r) => `<tr>
        <td><span class="cmp ${r.status}" style="padding:2px 8px;margin:0">${r.status}</span></td>
        <td>${ruleKindBadge(r.kind)}</td>
        <td>${r.role || '—'}</td>
        <td class="mono">${esc(r.description)}</td>
      </tr>`
    )
    .join('') || '<tr><td colspan="4" class="muted">No differences.</td></tr>';
}

// ---------------------------------------------------------------------------
// Settings rendering
// ---------------------------------------------------------------------------

function renderSettings(): void {
  const s = state.settings;
  const fwHost = $<HTMLElement>('frameworkToggles');
  fwHost.innerHTML = Object.entries(s.enabledFrameworks)
    .map(([name, on]) => `<label><input type="checkbox" data-fw="${esc(name)}" ${on ? 'checked' : ''}/> ${esc(name)}</label>`)
    .join('');

  $<HTMLInputElement>('minConf').value = String(s.minConfidence);
  $<HTMLElement>('minConfVal').textContent = String(s.minConfidence);
  $<HTMLInputElement>('optTraversal').checked = s.emitTraversalRules;
  $<HTMLInputElement>('optLabelRules').checked = s.emitLabelRules;
  $<HTMLInputElement>('optHighlight').checked = s.highlightEnabled;
  $<HTMLTextAreaElement>('mappingJson').value = JSON.stringify(s.roleMappings ?? null, null, 2);
}

async function updateSettings(patch: Partial<ExtensionSettings>): Promise<void> {
  state.settings = { ...state.settings, ...patch };
  await saveSettings(state.settings);
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function short(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function setStatus(id: string, text: string, cls: 'ok' | 'err' | ''): void {
  const el = $(id);
  el.textContent = text;
  el.className = 'status ' + cls;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

async function downloadText(filename: string, text: string, mime = 'application/xml;charset=utf-8'): Promise<void> {
  try {
    const res = await chrome.runtime.sendMessage({ type: 'EPIPLEX_DOWNLOAD', filename, data: text, mime });
    if (res?.ok) return;
  } catch { /* fall back to anchor download */ }
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

function switchTab(name: string): void {
  document.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b.getAttribute('data-tab') === name));
  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === `panel-${name}`));
}

// ---------------------------------------------------------------------------
// Event wiring
// ---------------------------------------------------------------------------

function wireEvents(): void {
  document.querySelectorAll('.tab-btn').forEach((b) => b.addEventListener('click', () => switchTab(b.getAttribute('data-tab')!)));

  $<HTMLButtonElement>('btnScan').addEventListener('click', runScan);
  $<HTMLButtonElement>('btnCopySteps').addEventListener('click', async () => {
    const lines = (state.scan?.controls || []).map((c) => generateStepSentence(c));
    const ok = await copyText(lines.join('\n'));
    setStatus('scanStatus', ok ? `✓ Copied ${lines.length} step sentences` : 'Copy failed', ok ? 'ok' : 'err');
  });
  $<HTMLInputElement>('roleFilter').addEventListener('change', renderControls);
  $<HTMLInputElement>('searchBox').addEventListener('input', renderControls);
  $<HTMLSelectElement>('ruleKindFilter').addEventListener('change', renderRules);
  $<HTMLSelectElement>('compareFilter').addEventListener('change', renderCompare);

  $<HTMLButtonElement>('btnHighlight').addEventListener('click', async () => {
    const btn = $<HTMLButtonElement>('btnHighlight');
    const next = btn.dataset.state === 'on' ? false : true;
    btn.dataset.state = next ? 'on' : 'off';
    await sendToTab('EPIPLEX_HIGHLIGHT', { enabled: next });
    setStatus('scanStatus', next ? 'Highlight overlay ON — hover a box for details.' : 'Highlight OFF', next ? 'ok' : '');
  });

  $<HTMLButtonElement>('btnLive').addEventListener('click', async () => {
    const btn = $<HTMLButtonElement>('btnLive');
    const next = btn.dataset.state !== 'on';
    btn.dataset.state = next ? 'on' : 'off';
    const res = await sendToTab<{ live: boolean }>('EPIPLEX_LIVE', { enabled: next });
    setStatus('scanStatus', res?.live ? 'Live capture ON — rules update as the DOM changes.' : 'Live capture OFF.', res?.live ? 'ok' : '');
    if (next) runScan();
  });

  $<HTMLButtonElement>('btnCopyXml').addEventListener('click', async () => {
    const ok = await copyText(state.xml);
    setStatus('xmlValid', ok ? '✓ Copied' : 'Copy failed', ok ? 'ok' : 'err');
  });
  $<HTMLButtonElement>('btnDownloadXml').addEventListener('click', () => downloadText('IEAdaptor.xml', state.xml));
  $<HTMLButtonElement>('btnCopyGps').addEventListener('click', async () => copyText(state.gpsXml));
  $<HTMLButtonElement>('btnDownloadGps').addEventListener('click', () => downloadText('GPS-Mappings.xml', state.gpsXml));
  $<HTMLButtonElement>('btnCopyTests').addEventListener('click', async () => copyText(state.testCases));

  $<HTMLButtonElement>('btnLoadExisting').addEventListener('click', () => $<HTMLInputElement>('existingXmlInput').click());
  $<HTMLInputElement>('existingXmlInput').addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    state.existingXml = await file.text();
    state.existingFileName = file.name;
    $<HTMLElement>('existingFile').textContent = `${file.name} (${(state.existingXml.length / 1024).toFixed(1)} KB) loaded`;
    refreshCompare();
    switchTab('compare');
  });

  $<HTMLButtonElement>('btnMerge').addEventListener('click', async () => {
    setStatus('scanStatus', `Merged — ${state.mergedCount} new rules added, ${state.compare?.duplicateRules.length ?? 0} duplicates skipped.`, 'ok');
    renderCompare();
  });
  $<HTMLButtonElement>('btnDownloadMerged').addEventListener('click', () => {
    if (state.mergedXml) downloadText('IEAdaptor-merged.xml', state.mergedXml);
  });

  // Settings
  $<HTMLElement>('frameworkToggles').addEventListener('change', async (e) => {
    const input = e.target as HTMLInputElement;
    if (!input.dataset.fw) return;
    const fw = { ...state.settings.enabledFrameworks };
    fw[input.dataset.fw] = input.checked;
    await updateSettings({ enabledFrameworks: fw });
  });
  $<HTMLInputElement>('minConf').addEventListener('input', async (e) => {
    const v = Number((e.target as HTMLInputElement).value);
    $<HTMLElement>('minConfVal').textContent = String(v);
    await updateSettings({ minConfidence: v });
  });
  $<HTMLInputElement>('optTraversal').addEventListener('change', (e) => updateSettings({ emitTraversalRules: (e.target as HTMLInputElement).checked }));
  $<HTMLInputElement>('optLabelRules').addEventListener('change', (e) => updateSettings({ emitLabelRules: (e.target as HTMLInputElement).checked }));
  $<HTMLInputElement>('optHighlight').addEventListener('change', async (e) => {
    const v = (e.target as HTMLInputElement).checked;
    await updateSettings({ highlightEnabled: v });
    if (v && state.tabId) await sendToTab('EPIPLEX_HIGHLIGHT', { enabled: true });
  });

  $<HTMLButtonElement>('btnLoadMappings').addEventListener('click', async () => {
    const text = $<HTMLTextAreaElement>('mappingJson').value;
    const err = validateMappingJson(text);
    if (err) { setStatus('mappingStatus', err, 'err'); return; }
    const parsed = text.trim() ? JSON.parse(text) : null;
    await updateSettings({ roleMappings: parsed });
    setStatus('mappingStatus', 'Role mappings updated — re-scan the page to apply.', 'ok');
  });
  $<HTMLButtonElement>('btnExportMappings').addEventListener('click', async () => {
    const current = state.settings.roleMappings ?? (await import('./settings')).resolveRoleMappings(state.settings);
    await downloadText('roleMappings.json', JSON.stringify(current, null, 2), 'application/json');
  });
  $<HTMLButtonElement>('btnResetMappings').addEventListener('click', async () => {
    await updateSettings({ roleMappings: null });
    $<HTMLTextAreaElement>('mappingJson').value = 'null';
    setStatus('mappingStatus', 'Defaults restored.', 'ok');
  });

  // Live updates from content script.
  chrome.runtime.onMessage.addListener((msg: { type?: string; payload?: ScanResponse }) => {
    if (msg?.type === 'EPIPLEX_LIVE_UPDATE' && msg.payload) {
      state.scan = msg.payload;
      renderRoleSummary();
      renderControls();
      setStatus('scanStatus', `Live: ${msg.payload.controls.length} controls`, 'ok');
    }
  });
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

renderSettings();
wireEvents();
renderControls();
renderRules();
renderXml();

// Show extension version in the about card.
document.querySelector('#panel-settings .card:last-child .muted')!.textContent =
  `Epiplex IE Rules Generator v${EXTENSION_VERSION} — Manifest V3 · TypeScript · DOM scanning incl. shadow DOM. Generates IEAdaptor.xml compatible with Epiplex Capture / NetOn.`;
