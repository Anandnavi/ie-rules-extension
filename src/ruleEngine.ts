/**
 * ruleEngine.ts — Core rule engine.
 *
 * Pure, DOM-light module implementing the Epiplex rule pipeline:
 *   detectControlRole()  — infer CurrentRole from tags / classes / role attrs / aria
 *   extractAttributes()  — capture serializable attributes for rule building
 *   buildTagRule()       — RoleIdentifier → BasedOnTags rules
 *   buildAttributeRule() — RoleIdentifier → BasedOnAttributes rules
 *   deduplicateRules()   — merge identical rules, union conditions
 *   generateRuleModel()  — orchestrate everything into a RuleModel for the XML writer
 *
 * The module only depends on a minimal `ElementLike` surface, so the same code
 * runs in the content script and in Node unit tests.
 */
import type {
  AttributeRoleMapping,
  AttributeRule,
  ConfidenceBreakdown,
  ControlAttributes,
  DetectedControl,
  FrameworkRoleMapping,
  Operator,
  RoleId,
  RoleMappingConfig,
  RuleModel,
  StandardLabelRule,
  TagRule,
  TagCondition,
  TraverseLabelRule,
  TraversalRule,
} from './types';
import { roleName } from './types';

/** Minimal element surface used by the engine (real Element satisfies this). */
export interface ElementLike {
  tagName: string;
  className?: string;
  getAttribute(name: string): string | null;
  getAttributeNames?(): string[];
}

/** Tags whose native semantics fully determine the role (tag wins over classes). */
const STRONG_TAGS = new Set([
  'input', 'select', 'textarea', 'button', 'a', 'img', 'table', 'tbody',
  'tr', 'td', 'th', 'li', 'option', 'optgroup', 'svg', 'i', 'nav', 'form',
  'fieldset',
]);

/** Roles that can only come from a widget class (never from a plain text tag). */
const WIDGET_ROLES = new Set<RoleId>([46, 92, 44, 45, 34, 37]);

/** Epiplex type normalization — mirrors the casing used in IEAdaptor.xml. */
const UPPER_TYPES = new Set([
  'TEXT', 'PASSWORD', 'FILE', 'NUMBER', 'COLOR', 'SEARCH', 'CHECKBOX', 'RADIO',
  'SUBMIT', 'RESET', 'BUTTON', 'IMAGE', 'DATE', 'TIME', 'MONTH', 'WEEK',
]);
export function normalizeType(type: string): string {
  return UPPER_TYPES.has(type.toUpperCase()) ? type.toUpperCase() : type.toLowerCase();
}

/** Tag name as written in Epiplex conditions: standard tags uppercase, custom elements lowercase. */
export function normalizeTagName(tag: string): string {
  const t = tag.toLowerCase();
  const STANDARD = new Set([
    'input', 'textarea', 'select', 'button', 'a', 'area', 'img', 'table',
    'tr', 'td', 'th', 'li', 'option', 'label', 'span', 'div', 'p', 'i', 'svg',
    'nav', 'form', 'fieldset', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'mark', 'caption', 'legend', 'section', 'article', 'header', 'footer',
    'main', 'tbody', 'thead', 'tfoot', 'dd', 'dt', 'dl', 'em', 'strong', 'b',
  ]);
  return STANDARD.has(t) ? t.toUpperCase() : t;
}

// ---------------------------------------------------------------------------
// Attribute extraction
// ---------------------------------------------------------------------------

const KNOWN_DATA_ATTRS = ['data-comp-id', 'data-component-type', 'data-testid', 'data-role', 'data-toggle'];

/** Capture the serializable attribute surface of a control. */
export function extractAttributes(el: ElementLike): ControlAttributes {
  const attrs: ControlAttributes = {
    tagName: el.tagName.toLowerCase(),
  };
  const get = (n: string) => el.getAttribute(n);
  const val = (n: string) => { const v = get(n); return v === null ? undefined : v; };

  attrs.type = val('type');
  attrs.role = val('role');
  attrs.id = val('id');
  attrs.ariaLabel = val('aria-label');
  attrs.ariaLabelledby = val('aria-labelledby');
  attrs.placeholder = val('placeholder');
  attrs.title = val('title');
  attrs.name = val('name');
  attrs.value = val('value');
  attrs.href = val('href');
  attrs.alt = val('alt');
  attrs.checked = get('checked') !== null;
  attrs.disabled = get('disabled') !== null;
  attrs.readonly = get('readonly') !== null;
  attrs.selected = get('selected') !== null;
  attrs.multiple = get('multiple') !== null;
  attrs.contentEditable = (el as { isContentEditable?: boolean }).isContentEditable || get('contenteditable') === 'true';

  const cls = el.className !== undefined && el.className !== null
    ? String(el.className)
    : (get('class') || '');
  attrs.className = cls || undefined;

  const data: Record<string, string> = {};
  if (el.getAttributeNames) {
    for (const name of el.getAttributeNames()) {
      if (name.startsWith('data-')) data[name.replace(/^data-/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = get(name) || '';
    }
  } else {
    for (const name of KNOWN_DATA_ATTRS) {
      const v = get(name);
      if (v !== null) data[name] = v;
    }
  }
  if (Object.keys(data).length > 0) attrs.data = data;

  return attrs;
}

// ---------------------------------------------------------------------------
// Role detection
// ---------------------------------------------------------------------------

export interface RoleDetection {
  role: RoleId;
  confidence: number;
  breakdown: ConfidenceBreakdown;
  reason: string;
  framework: string | null;
  frameworkClass: string | null;
}

function cleanBreakdown(): ConfidenceBreakdown {
  return { tag: null, roleAttr: null, klass: null, framework: null, aria: null };
}

function matchFrameworkClass(
  el: ElementLike,
  config: RoleMappingConfig
): { mapping: FrameworkRoleMapping; classToken: string } | null {
  const className = el.className !== undefined && el.className !== null ? String(el.className) : (el.getAttribute('class') || '');
  if (!className) return null;
  let best: { mapping: FrameworkRoleMapping; classToken: string; score: number } | null = null;
  for (const m of config.frameworkRoleMappings) {
    try {
      const re = new RegExp(m.classPattern);
      const m2 = className.match(re);
      if (!m2) continue;
      // Prefer the highest-confidence mapping; tie-break by longest matched
      // token (e.g. "slds-combobox__input" → combobox, not slds-input).
      const score = m.confidence * 1000 + (m2[0]?.length || 0);
      if (!best || score > best.score) best = { mapping: m, classToken: m2[0], score };
    } catch {
      // malformed pattern in user JSON — skip
    }
  }
  return best ? { mapping: best.mapping, classToken: best.classToken } : null;
}

function matchAttributeRole(el: ElementLike, config: RoleMappingConfig): { mapping: AttributeRoleMapping; value: string } | null {
  for (const m of config.attributeRoleMappings) {
    const v = el.getAttribute(m.attribute);
    if (v === null || v === '') continue;
    try {
      if (new RegExp(m.valuePattern).test(v)) return { mapping: m, value: v };
    } catch {
      // malformed pattern in user JSON — skip
    }
  }
  return null;
}

/** Tag + type based role (95% confidence). */
function detectByTag(el: ElementLike, config: RoleMappingConfig): RoleDetection | null {
  const tag = el.tagName.toLowerCase();
  const tagRoles = config.tagRoles || {};
  const inputTypeRoles = config.inputTypeRoles || {};

  // input → role from type
  if (tag === 'input') {
    const type = (el.getAttribute('type') || 'text').toLowerCase();
    const role = inputTypeRoles[type];
    if (role) {
      return {
        role, confidence: 95,
        breakdown: { ...cleanBreakdown(), tag: 95 },
        reason: `Matched <input type="${type}"> → ${roleName(role)} (${role})`,
        framework: null, frameworkClass: null,
      };
    }
  }
  if (tag === 'textarea') {
    return { role: 42, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <textarea> → ${roleName(42)} (42)`, framework: null, frameworkClass: null };
  }
  if (tag === 'select') {
    const multiple = el.getAttribute('multiple') !== null;
    return { role: 46, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <select${multiple ? ' multiple' : ''}> → Dropdown (46)`, framework: null, frameworkClass: null };
  }
  if (tag === 'button') {
    return { role: 43, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <button> → Button (43)`, framework: null, frameworkClass: null };
  }
  if (tag === 'a') {
    return { role: 30, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <a> → Link (30)`, framework: null, frameworkClass: null };
  }
  if (tag === 'img') {
    return { role: 40, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <img> → Image (40)`, framework: null, frameworkClass: null };
  }
  if (tag === 'table' || tag === 'tbody') {
    return { role: 24, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> → Table (24)`, framework: null, frameworkClass: null };
  }
  if (tag === 'tr') {
    return { role: 28, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <tr> → Table row (28)`, framework: null, frameworkClass: null };
  }
  if (tag === 'td' || tag === 'th') {
    return { role: 29, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> → Table cell (29)`, framework: null, frameworkClass: null };
  }
  if (tag === 'li' || tag === 'option' || tag === 'optgroup') {
    return { role: 34, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> → List item / option (34)`, framework: null, frameworkClass: null };
  }
  if (tag === 'label') {
    return { role: 41, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <label> → Text (41)`, framework: null, frameworkClass: null };
  }
  if (tag === 'svg' || tag === 'i') {
    return { role: 82, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> → Icon (82)`, framework: null, frameworkClass: null };
  }
  if (tag === 'nav' || tag === 'form' || tag === 'fieldset') {
    return { role: 10, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> → Container (10)`, framework: null, frameworkClass: null };
  }
  const custom = tagRoles[tag];
  if (custom) {
    return { role: custom, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> → ${roleName(custom)} (${custom})`, framework: null, frameworkClass: null };
  }
  return null;
}

/**
 * Main role detection. Priority (mirrors Epiplex evaluation: attribute/class
 * rules are consulted before tag rules):
 *   1. role="" attribute (88)              — author intent (ARIA widgets)
 *   2. widget class on a text-ish control  — input[type=text].datepicker → 92
 *   3. strong tag + type (95)              — input/select/button/a/img/table/…
 *   4. framework class (90–95)             — mat-select, slds-button, …
 *   5. generic class (70–80)               — combobox, checkbox, calendar…
 *   6. ARIA hints (70–82)                  — aria-haspopup/listbox…
 *   7. default tag role (41 text / 10 container)
 */
export function detectControlRole(
  el: ElementLike,
  config: RoleMappingConfig,
  frameworkKey: string | null
): RoleDetection {
  const tag = el.tagName.toLowerCase();
  const breakdown = cleanBreakdown();

  // 1. Explicit role attribute (author intent).
  const byAttr = matchAttributeRole(el, config);
  if (byAttr) {
    const { mapping, value } = byAttr;
    breakdown.roleAttr = mapping.confidence;
    if (mapping.attribute === 'aria-haspopup' || mapping.attribute === 'aria-expanded') breakdown.aria = mapping.confidence;
    return {
      role: mapping.role, confidence: mapping.confidence, breakdown,
      reason: `Matched ${mapping.attribute}="${value}" → ${roleName(mapping.role)} (${mapping.role})`,
      framework: null, frameworkClass: null,
    };
  }

  // Class mapping (framework-specific or generic widget classes).
  const byClass = matchFrameworkClass(el, config);

  // 2/3. Strong native tags — but a widget class on a text-ish control wins
  // (input[type=text] with class "datepicker"/"combobox"/"mat-select" is a
  // date/dropdown, not a plain text box).
  if (STRONG_TAGS.has(tag)) {
    const byTag = detectByTag(el, config);
    if (byTag) {
      if (byClass && byTag.role === 42 && WIDGET_ROLES.has(byClass.mapping.role)) {
        breakdown.framework = byClass.mapping.confidence;
        breakdown.klass = byClass.mapping.confidence;
        return {
          role: byClass.mapping.role, confidence: byClass.mapping.confidence, breakdown,
          reason: `Matched widget class "${byClass.classToken}" (${byClass.mapping.framework}) on <${tag}> → ${roleName(byClass.mapping.role)} (${byClass.mapping.role})`,
          framework: frameworkKey || byClass.mapping.framework,
          frameworkClass: byClass.classToken,
        };
      }
      return byTag;
    }
  }

  // 4/5. Framework-specific / generic class on a generic or custom element.
  if (byClass) {
    const { mapping, classToken } = byClass;
    breakdown.framework = mapping.confidence;
    breakdown.klass = mapping.confidence;
    return {
      role: mapping.role, confidence: mapping.confidence, breakdown,
      reason: `Matched framework class "${classToken}" (${mapping.framework}) → ${roleName(mapping.role)} (${mapping.role})`,
      framework: frameworkKey || mapping.framework,
      frameworkClass: classToken,
    };
  }

  // 6. ARIA attribute hints (combobox, datepicker…).
  for (const [attr, re, role, conf] of [
    ['aria-haspopup', /listbox|menu|true/i, 46, 82],
    ['aria-expanded', /true|false/i, 46, 70],
    ['aria-autocomplete', /list|inline/i, 42, 70],
  ] as const) {
    const v = el.getAttribute(attr);
    if (v && re.test(v)) {
      breakdown.aria = conf;
      return { role, confidence: conf, breakdown, reason: `Matched ${attr}="${v}" → ${roleName(role)} (${role})`, framework: null, frameworkClass: null };
    }
  }

  // 7. Default: role from the tag-mapping table (text tags, custom elements,
  // semantic containers), else plain Text (41).
  const def = config.tagRoles?.[tag];
  breakdown.tag = 60;
  if (def !== undefined) {
    return {
      role: def, confidence: 60, breakdown,
      reason: `Default <${tag}> → ${roleName(def)} (${def})`,
      framework: null, frameworkClass: null,
    };
  }
  return {
    role: 41, confidence: 60, breakdown,
    reason: `Default <${tag}> → Text (41)`,
    framework: null, frameworkClass: null,
  };
}

// ---------------------------------------------------------------------------
// Rule building
// ---------------------------------------------------------------------------

function pipe(values: string[]): string {
  const uniq = [...new Set(values.filter(Boolean))];
  return `|${uniq.join('|')}|`;
}

/** Build a BasedOnTags rule from a control detected by tag. */
export function buildTagRule(c: DetectedControl): TagRule | null {
  const tag = c.attributes.tagName;
  const conds: TagCondition[] = [];
  // Icons (svg/i/mat-icon) only get a tag rule under a container (ParentRole=10),
  // exactly like the working reference (|i|svg|mat-icon| → 82, ParentRole="10").
  // This keeps icons nested inside links/buttons from overriding those controls.
  if (c.role === 82 && (tag === 'svg' || tag === 'i' || tag === 'mat-icon') && c.parentRole !== 10) return null;
  if (tag === 'input') {
    const type = c.attributes.type || 'text';
    const t = normalizeType(type);
    conds.push({ tagName: '|INPUT|', type: pipe([t]) });
  } else if (tag === 'select') {
    const multiple = c.attributes.multiple === true;
    conds.push({ tagName: '|SELECT|', type: pipe([multiple ? 'SELECT-MULTIPLE' : 'SELECT-ONE']) });
  } else if (tag === 'textarea') {
    conds.push({ tagName: '|TEXTAREA|' });
  } else {
    conds.push({ tagName: pipe([normalizeTagName(tag)]) });
  }
  // Images match the reference's unrestricted |IMG| → 40 (ParentRole=""), so any
  // parent-based img rule is normalized away to keep parity.
  const parent = tag === 'img' && c.role === 40 ? null : c.parentRole;
  return {
    currentRole: c.role, parentRole: parent, conditions: conds,
    source: c.reason, framework: c.framework ?? undefined, confidence: c.confidence,
  };
}

/** Interactive ancestor roles that own their nested icons/images (link/button/…). */
const INTERACTIVE_PARENT_ROLES = new Set<RoleId>([30, 43, 12, 37, 42, 44, 45, 46, 92, 34]);

/** Build a BasedOnAttributes rule from a control detected by class / role / aria. */
export function buildAttributeRule(c: DetectedControl, config: RoleMappingConfig): AttributeRule | null {
  const a = c.attributes;
  // Guard: icons/images nested inside interactive controls (links, buttons, …)
  // belong to that control — never emit a standalone rule that could steal its
  // click (mirrors the tag-rule restriction for svg/i/mat-icon).
  if ((c.role === 82 || c.role === 40) && c.parentRole != null && INTERACTIVE_PARENT_ROLES.has(c.parentRole)) return null;
  // Role attribute match.
  if (a.role) {
    const roleMapping = config.attributeRoleMappings.find(
      (m) => m.attribute === 'role' && new RegExp(m.valuePattern).test(a.role || '')
    );
    if (roleMapping) {
      return { currentRole: c.role, parentRole: c.parentRole, attribute: 'role', values: [a.role], operator: 'equals', source: c.reason, framework: c.framework ?? undefined, confidence: c.confidence };
    }
  }
  // Framework / generic class match.
  const cls = a.className;
  if (cls) {
    const tokens = cls.split(/\s+/).filter(Boolean);
    const mapped = tokens.filter((t) => {
      try { return config.frameworkRoleMappings.some((m) => new RegExp(m.classPattern).test(t)); }
      catch { return false; }
    });
    if (mapped.length > 0) {
      return { currentRole: c.role, parentRole: c.parentRole, attribute: 'className', values: mapped, operator: 'contains', source: c.reason, framework: c.framework ?? undefined, confidence: c.confidence };
    }
  }
  // data-* hints (e.g. data-comp-id="date-picker").
  if (a.data) {
    for (const key of Object.keys(a.data)) {
      const full = `data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      const v = a.data[key];
      if (/(date|calendar)/i.test(v)) {
        return { currentRole: c.role, parentRole: c.parentRole, attribute: full, values: [v], operator: 'contains', source: c.reason, framework: c.framework ?? undefined, confidence: c.confidence };
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Deduplication & merging
// ---------------------------------------------------------------------------

function uniqPipe(list: string[]): string[] {
  return [...new Set(list)];
}

/** Merge tag rules with identical (role, parent) by unioning conditions. */
export function deduplicateTagRules(rules: TagRule[]): TagRule[] {
  const map = new Map<string, TagRule>();
  for (const r of rules) {
    const key = `${r.currentRole}|${r.parentRole ?? ''}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { ...r, conditions: [...r.conditions] });
      continue;
    }
    for (const cond of r.conditions) {
      const hit = existing.conditions.find((c2) => c2.tagName === cond.tagName && c2.type === cond.type);
      if (!hit) existing.conditions.push({ ...cond });
    }
    existing.confidence = Math.max(existing.confidence, r.confidence);
    existing.source = [existing.source, r.source].filter((s, i, arr) => arr.indexOf(s) === i).join(' · ');
  }
  // Merge conditions with same tagName by unioning types.
  for (const r of map.values()) {
    const byTag = new Map<string, TagCondition>();
    for (const cond of r.conditions) {
      const hit = byTag.get(cond.tagName);
      if (!hit) { byTag.set(cond.tagName, { ...cond }); continue; }
      if (cond.type) hit.type = hit.type ? `|${uniqPipe([...hit.type.slice(1, -1).split('|'), ...cond.type.slice(1, -1).split('|')]).join('|')}|` : cond.type;
    }
    r.conditions = [...byTag.values()];
  }
  return [...map.values()];
}

/** Merge attribute rules with identical (role, parent, attribute, operator) by unioning values. */
export function deduplicateAttributeRules(rules: AttributeRule[]): AttributeRule[] {
  const map = new Map<string, AttributeRule>();
  for (const r of rules) {
    const key = `${r.currentRole}|${r.parentRole ?? ''}|${r.attribute}|${r.operator}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { ...r, values: [...r.values] });
      continue;
    }
    existing.values = uniqPipe([...existing.values, ...r.values]);
    existing.confidence = Math.max(existing.confidence, r.confidence);
    existing.source = [existing.source, r.source].filter((s, i, arr) => arr.indexOf(s) === i).join(' · ');
  }
  return [...map.values()];
}

/** Generic dedup for rules with a computed fingerprint. */
export function deduplicateRules<T extends { currentRole: RoleId; parentRole: RoleId | null }>(
  rules: T[],
  fingerprint: (r: T) => string
): T[] {
  const seen = new Map<string, T>();
  for (const r of rules) {
    const key = fingerprint(r);
    if (!seen.has(key)) seen.set(key, r);
  }
  return [...seen.values()];
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

export interface RuleGenContext {
  config: RoleMappingConfig;
  url: string;
  title: string;
  minConfidence: number;
  emitTraversalRules: boolean;
  emitLabelRules: boolean;
}

/**
 * Generate the full rule model from detected controls.
 * Order of emission matches IEAdaptor.xml: BasedOnTags → BasedOnAttributes →
 * BasedOnTraverseLogic → LabelIdentifier (StandardLogic + TraverseLogic).
 */
export function generateRuleModel(
  controls: DetectedControl[],
  ctx: RuleGenContext,
  extra?: { traversalRules?: TraversalRule[]; labelRules?: { standard: StandardLabelRule[]; traverse: TraverseLabelRule[] } }
): RuleModel {
  const tagRules: TagRule[] = [];
  const attrRules: AttributeRule[] = [];

  for (const c of controls) {
    if (c.confidence < ctx.minConfidence) continue;
    // Tag rules come from tag-based detections only (avoid double rules for class-matched inputs).
    if (!c.frameworkClass) {
      const tr = buildTagRule(c);
      if (tr) tagRules.push(tr);
    }
    const ar = buildAttributeRule(c, ctx.config);
    if (ar) attrRules.push(ar);
  }

  const dedupTags = deduplicateTagRules(tagRules);
  const dedupAttrs = deduplicateAttributeRules(attrRules);
  const traversal = extra?.traversalRules ? deduplicateRules(extra.traversalRules, traversalFingerprint) : [];
  const standard = extra?.labelRules ? extra.labelRules.standard : [];
  const traverse = extra?.labelRules ? extra.labelRules.traverse : [];

  return {
    basedOnTags: dedupTags.sort((a, b) => a.currentRole - b.currentRole),
    basedOnAttributes: dedupAttrs.sort((a, b) => a.currentRole - b.currentRole),
    basedOnTraverseLogic: traversal.sort((a, b) => a.currentRole - b.currentRole),
    standardLogic: standard,
    traverseLogic: traverse,
    sites: [`${ctx.url}${ctx.title ? ` — ${ctx.title}` : ''}`],
    diagnostics: [],
  };
}

/** Fingerprint for traversal rules (dedup key). */
export function traversalFingerprint(r: TraversalRule): string {
  const cond = [r.condition.tagName, r.condition.type, r.condition.className, r.condition.attribute, r.condition.value].join('|');
  const paths = r.paths.map((p) => `${p.path}:${p.operator}:${JSON.stringify(p.attributes)}`).join('>');
  return `traversal|${r.currentRole}|${r.parentRole ?? ''}|${cond}|${paths}`;
}

/** Operator normalization helper (matches Epiplex attribute operators). */
export function toEpiplexOperator(op: Operator): string {
  return op === 'startswith' ? 'starts-with' : op === 'endswith' ? 'ends-with' : op;
}
