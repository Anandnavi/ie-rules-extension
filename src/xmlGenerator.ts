/**
 * xmlGenerator.ts — IEAdaptor.xml generation + validation.
 *
 * Produces a valid, pretty-printed IEAdaptor.xml exactly matching the
 * Epiplex structure and naming conventions (see the reference IEAdaptor.xml):
 *
 *   <?xml version="1.0" encoding="utf-8"?>
 *   <IEFilters ExcludedDomain="">
 *     <General Enable="1" QueryHeader="0" QueryTag="H1">
 *       <RoleIdentifier>
 *         <BasedOnTags>…</BasedOnTags>
 *         <BasedOnAttributes>…</BasedOnAttributes>
 *         <BasedOnTraverseLogic>…</BasedOnTraverseLogic>
 *       </RoleIdentifier>
 *       <LabelIdentifier rolesforrectandielogic="42|44|45|46|33|34|30|10|40|82|43|37">
 *         <StandardLogic>…</StandardLogic>
 *         <TraverseLogic>…</TraverseLogic>
 *         <DefaultLogic>…</DefaultLogic>
 *       </LabelIdentifier>
 *     </General>
 *   </IEFilters>
 */
import type {
  AttributeRule,
  DetectedControl,
  RuleModel,
  StandardLabelRule,
  TagRule,
  TraversalRule,
  TraverseLabelRule,
} from './types';
import { computeControlName } from './stepSentence';

export const EXTENSION_NAME = 'Epiplex IE Rules Generator';
export const EXTENSION_VERSION = '1.0.0';

// ---------------------------------------------------------------------------
// XML helpers
// ---------------------------------------------------------------------------

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const T = '\t';

/** Render a comment line. */
function comment(text: string, indent: number): string {
  return `${T.repeat(indent)}<!-- ${text} -->`;
}

// ---------------------------------------------------------------------------
// RoleIdentifier rules
// ---------------------------------------------------------------------------

function renderTagRule(rule: TagRule, indent: number): string {
  const out: string[] = [];
  const parent = rule.parentRole === null ? '' : String(rule.parentRole);
  out.push(`${T.repeat(indent)}<Rule Enable="1" CurrentRole="${rule.currentRole}" ParentRole="${parent}">`);
  out.push(`${T.repeat(indent + 1)}<CurrentInfo>`);
  for (const cond of rule.conditions) {
    const type = cond.type ? ` Type="${escapeXml(cond.type)}"` : '';
    out.push(`${T.repeat(indent + 2)}<Condition TagName="${escapeXml(cond.tagName)}"${type}/>`);
  }
  if (rule.source) out.push(comment(escapeXml(rule.source), indent + 2));
  out.push(`${T.repeat(indent + 1)}</CurrentInfo>`);
  out.push(`${T.repeat(indent)}</Rule>`);
  return out.join('\n');
}

function renderAttributeRule(rule: AttributeRule, indent: number): string {
  const out: string[] = [];
  const parent = rule.parentRole === null ? '' : String(rule.parentRole);
  const values = `|${[...new Set(rule.values)].join('|')}|`;
  out.push(`${T.repeat(indent)}<Rule Enable="1" CurrentRole="${rule.currentRole}" ParentRole="${parent}">`);
  out.push(`${T.repeat(indent + 1)}<CurrentInfo>`);
  out.push(`${T.repeat(indent + 2)}<Condition Operator="${rule.operator}" ${escapeXml(rule.attribute)}="${escapeXml(values)}"/>`);
  if (rule.framework) out.push(comment(`framework: ${escapeXml(rule.framework)}`, indent + 2));
  if (rule.source) out.push(comment(escapeXml(rule.source), indent + 2));
  out.push(`${T.repeat(indent + 1)}</CurrentInfo>`);
  out.push(`${T.repeat(indent)}</Rule>`);
  return out.join('\n');
}

function renderTraversalRule(rule: TraversalRule, indent: number): string {
  const out: string[] = [];
  const parent = rule.parentRole === null ? '' : String(rule.parentRole);
  out.push(`${T.repeat(indent)}<Rule Enable="1" CurrentRole="${rule.currentRole}" ParentRole="${parent}">`);
  out.push(`${T.repeat(indent + 1)}<CurrentInfo>`);
  const cond = rule.condition;
  if (cond.tagName) {
    out.push(`${T.repeat(indent + 2)}<Condition TagName="${escapeXml(cond.tagName)}"/>`);
  } else if (cond.className) {
    out.push(`${T.repeat(indent + 2)}<Condition className="${escapeXml(cond.className)}" Operator="${cond.operator || 'contains'}"/>`);
  } else if (cond.attribute) {
    out.push(`${T.repeat(indent + 2)}<Condition ${escapeXml(cond.attribute)}="${escapeXml(cond.value || '')}" Operator="${cond.operator || 'contains'}"/>`);
  } else if (cond.type) {
    out.push(`${T.repeat(indent + 2)}<Condition TagName="${escapeXml(cond.type)}"/>`);
  }
  if (rule.framework) out.push(comment(`framework: ${escapeXml(rule.framework)}`, indent + 2));
  if (rule.source) out.push(comment(escapeXml(rule.source), indent + 2));
  out.push(`${T.repeat(indent + 1)}</CurrentInfo>`);
  out.push(`${T.repeat(indent + 1)}<TraversalInfo>`);
  for (const path of rule.paths) {
    out.push(`${T.repeat(indent + 2)}<Path Path="${path.path}">`);
    out.push(`${T.repeat(indent + 3)}<Condition Operator="${path.operator}">`);
    const attrs = Object.entries(path.attributes)
      .map(([k, v]) => `${k}="${escapeXml(v)}"`)
      .join(' ');
    out.push(`${T.repeat(indent + 4)}<Attributes ${attrs}/>`);
    out.push(`${T.repeat(indent + 3)}</Condition>`);
    out.push(`${T.repeat(indent + 2)}</Path>`);
  }
  out.push(`${T.repeat(indent + 1)}</TraversalInfo>`);
  out.push(`${T.repeat(indent)}</Rule>`);
  return out.join('\n');
}

// ---------------------------------------------------------------------------
// LabelIdentifier rules
// ---------------------------------------------------------------------------

function renderStandardRule(rule: StandardLabelRule, indent: number): string {
  return [
    `${T.repeat(indent)}<Rule Id="${rule.id}">`,
    `${T.repeat(indent + 1)}<Attributes From="${rule.from}" To="${rule.to}" Operator="${rule.operator}"/>`,
    `${T.repeat(indent)}</Rule>`,
  ].join('\n');
}

function renderTraverseLabelRule(rule: TraverseLabelRule, indent: number): string {
  const out: string[] = [];
  const parent = rule.parentRole === null ? '' : String(rule.parentRole);
  out.push(`${T.repeat(indent)}<Rule Id="${rule.id}" Enable="1">`);
  out.push(`${T.repeat(indent + 1)}<WhenToConsider Role="${rule.role}" ParentRole="${parent}">`);
  const attrs = Object.entries(rule.attributes).map(([k, v]) => `${k}="${escapeXml(v)}"`).join(' ');
  out.push(`${T.repeat(indent + 2)}<Attributes ${attrs}/>`);
  out.push(`${T.repeat(indent + 1)}</WhenToConsider>`);
  out.push(`${T.repeat(indent + 1)}<WhereToGo>`);
  for (const path of rule.paths) {
    out.push(`${T.repeat(indent + 2)}<Path Path="${path.path}">`);
    out.push(`${T.repeat(indent + 3)}<Condition Operator="${path.operator}">`);
    const pAttrs = Object.entries(path.attributes).map(([k, v]) => `${k}="${escapeXml(v)}"`).join(' ');
    out.push(`${T.repeat(indent + 4)}<Attributes ${pAttrs}/>`);
    out.push(`${T.repeat(indent + 3)}</Condition>`);
    out.push(`${T.repeat(indent + 2)}</Path>`);
  }
  out.push(`${T.repeat(indent + 1)}</WhereToGo>`);
  out.push(`${T.repeat(indent + 1)}<WhatToCall>`);
  out.push(`${T.repeat(indent + 2)}<Method Name="${rule.method}"/>`);
  out.push(`${T.repeat(indent + 1)}</WhatToCall>`);
  out.push(`${T.repeat(indent)}</Rule>`);
  return out.join('\n');
}

// ---------------------------------------------------------------------------
// Full document generation
// ---------------------------------------------------------------------------

const DEFAULT_LOGIC = [
  { id: 'DL_6', name: 'title' },
  { id: 'DL_7', name: 'alt' },
  { id: 'DL_2', name: 'Id' },
  { id: 'DL_3', name: 'className' },
  { id: 'DL_4', name: 'type' },
];

/** Generate the full IEAdaptor.xml document from a RuleModel. */
export function generateXML(model: RuleModel): string {
  const out: string[] = [];
  const sites = [...new Set(model.sites)].join('; ');

  out.push('<?xml version="1.0" encoding="utf-8"?>');
  out.push(`<IEFilters ExcludedDomain="">`);
  out.push(comment(`Generated by ${EXTENSION_NAME} v${EXTENSION_VERSION}`, 1));
  if (sites) out.push(comment(`Scanned: ${escapeXml(sites)}`, 1));
  out.push(`${T}<General Enable="1" QueryHeader="0" QueryTag="H1">`);

  // ---- RoleIdentifier ----
  out.push(`${T.repeat(2)}<RoleIdentifier>`);

  out.push(`${T.repeat(3)}<BasedOnTags>`);
  for (const rule of model.basedOnTags) out.push(renderTagRule(rule, 4));
  out.push(`${T.repeat(3)}</BasedOnTags>`);

  out.push(`${T.repeat(3)}<BasedOnAttributes>`);
  for (const rule of model.basedOnAttributes) out.push(renderAttributeRule(rule, 4));
  out.push(`${T.repeat(3)}</BasedOnAttributes>`);

  out.push(`${T.repeat(3)}<BasedOnTraverseLogic>`);
  for (const rule of model.basedOnTraverseLogic) out.push(renderTraversalRule(rule, 4));
  out.push(`${T.repeat(3)}</BasedOnTraverseLogic>`);

  out.push(`${T.repeat(2)}</RoleIdentifier>`);

  // ---- LabelIdentifier ----
  // Role set matches the working reference file's final LabelIdentifier so
  // Epiplex hit-tests by rect for links (30), nav (10), images (40), icons (82),
  // buttons (43) and tabs (37) too — without 40|82, clicking a logo/icon
  // (e.g. the ChatGPT logo) is never recorded.
  out.push(`${T.repeat(2)}<LabelIdentifier rolesforrectandielogic="42|44|45|46|33|34|30|10|40|82|43|37">`);
  out.push(`${T.repeat(3)}<StandardLogic>`);
  for (const rule of model.standardLogic) out.push(renderStandardRule(rule, 4));
  out.push(`${T.repeat(3)}</StandardLogic>`);
  out.push(`${T.repeat(3)}<TraverseLogic>`);
  for (const rule of model.traverseLogic) out.push(renderTraverseLabelRule(rule, 4));
  out.push(`${T.repeat(3)}</TraverseLogic>`);
  out.push(`${T.repeat(3)}<DefaultLogic>`);
  for (const dl of DEFAULT_LOGIC) {
    out.push(`${T.repeat(4)}<Rule Id="${dl.id}">`);
    out.push(`${T.repeat(5)}<Attributes Name="${dl.name}"/>`);
    out.push(`${T.repeat(4)}</Rule>`);
  }
  out.push(`${T.repeat(3)}</DefaultLogic>`);
  out.push(`${T.repeat(2)}</LabelIdentifier>`);

  out.push(`${T}</General>`);
  out.push('</IEFilters>');
  return out.join('\n');
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate the generated XML. Uses DOMParser when available (browser popup),
 * falls back to a structural well-formedness check (Node tests).
 */
export function validateXML(xml: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. DOMParser path (browser).
  if (typeof DOMParser !== 'undefined') {
    try {
      const doc = new DOMParser().parseFromString(xml, 'text/xml');
      const perr = doc.querySelector('parsererror');
      if (perr) {
        errors.push(perr.textContent ? perr.textContent.trim().slice(0, 300) : 'XML parse error');
        return { valid: false, errors, warnings };
      }
      const root = doc.documentElement;
      if (!root || root.tagName !== 'IEFilters') {
        errors.push(`Root element must be <IEFilters>, found <${root ? root.tagName : 'none'}>.`);
      }
      if (!root.querySelector('General RoleIdentifier')) warnings.push('Missing <General><RoleIdentifier>.');
      if (!root.querySelector('General LabelIdentifier')) warnings.push('Missing <General><LabelIdentifier>.');
    } catch (e) {
      errors.push(`XML parse failed: ${(e as Error).message}`);
    }
    return { valid: errors.length === 0, errors, warnings };
  }

  // 2. Structural fallback (Node).
  const opens = xml.match(/<[A-Za-z][\w-]*(\s[^>]*)?>/g) || [];
  const closes = xml.match(/<\/[A-Za-z][\w-]*>/g) || [];
  if (!xml.startsWith('<?xml')) errors.push('Missing XML declaration.');
  if (!xml.includes('<IEFilters')) errors.push('Missing <IEFilters> root.');
  if (opens.length === 0) errors.push('No elements found.');
  if ((xml.match(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;)/g) || []).length > 0) errors.push('Unescaped "&" found.');
  return { valid: errors.length === 0, errors, warnings };
}

// ---------------------------------------------------------------------------
// Bonus features
// ---------------------------------------------------------------------------

/** Generate sample GPS (Global Positioning) mappings for the detected controls. */
export function generateGpsMappings(controls: DetectedControl[]): string {
  const out: string[] = [];
  out.push('<?xml version="1.0" encoding="utf-8"?>');
  out.push('<!-- Sample GPS mappings generated by ' + EXTENSION_NAME + ' — import into Epiplex Capture -->');
  out.push('<GPSMappings>');
  for (const c of controls.slice(0, 200)) {
    // Human-readable name — never a CSS class (see stepSentence.ts).
    const base = computeControlName(c);
    const name = (base === 'element' ? (c.attributes.id || c.attributes.name || base) : base).slice(0, 60);
    out.push(
      `${T}<Mapping ControlName="${escapeXml(name)}" Role="${c.role}" Tag="${escapeXml(c.attributes.tagName.toUpperCase())}" Selector="${escapeXml(c.location.cssSelector)}" XPath="${escapeXml(c.location.xpath)}"/>`
    );
  }
  out.push('</GPSMappings>');
  return out.join('\n');
}

/** Generate a test-case snippet (JSDOM-style assertions) for every rule. */
export function generateTestCases(model: RuleModel): string {
  const out: string[] = [];
  out.push('// Auto-generated test cases for the Epiplex IE Rules Generator');
  out.push('// Run with: node --test (uses jsdom). One test per generated rule.');
  out.push('import { JSDOM } from "jsdom";');
  out.push('import { detectControlRole } from "../src/ruleEngine";');
  out.push('');
  out.push('function makeEl(tag, attrs = {}) {');
  out.push('  const { window } = new JSDOM(`<${tag}></${tag}>`);');
  out.push('  const el = window.document.createElement(tag);');
  out.push('  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);');
  out.push('  return el;');
  out.push('}');
  out.push('');
  out.push('export const cases = [');
  for (const rule of model.basedOnTags) {
    for (const cond of rule.conditions) {
      const tags = cond.tagName.replace(/\|/g, '').split('|')[0] || 'div';
      const types = cond.type ? cond.type.replace(/\|/g, '').split('|').slice(0, 1)[0] : null;
      const attrs = types ? `{ type: "${types}" }` : '{}';
      out.push(`  { name: "Tag rule → role ${rule.currentRole} on <${tags}>${types ? ` type=${types}` : ''}", tag: "${tags}", attrs: ${attrs}, expect: ${rule.currentRole} },`);
    }
  }
  out.push('];');
  out.push('');
  out.push('export function runCase(c) {');
  out.push('  const el = makeEl(c.tag, c.attrs);');
  out.push('  const det = detectControlRole(el, { frameworkRoleMappings: [], attributeRoleMappings: [], tagRoles: {}, inputTypeRoles: { text: 42 } });');
  out.push('  return det.role === c.expect ? "PASS" : `FAIL expected ${c.expect} got ${det.role}`;');
  out.push('}');
  return out.join('\n');
}
