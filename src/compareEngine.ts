/**
 * compareEngine.ts — Compare & merge against an existing IEAdaptor.xml.
 *
 * Comparison is fingerprint-based:
 *   - new rules     : in generated, not in existing
 *   - modified rules: same (kind, role, parent) but different condition values
 *   - duplicate rules: exact fingerprint match in both
 *   - obsolete rules: in existing, not in generated
 *
 * Merging is text-level: new rule blocks are spliced into the existing XML
 * string before the closing tag of their section. This preserves all existing
 * formatting, comments and custom rules byte-for-byte.
 */
import type {
  AttributeRule,
  CompareResult,
  RuleModel,
  TagCondition,
  TagRule,
  TraverseLabelRule,
  TraversalRule,
} from './types';

export interface ExistingRules {
  tagRules: { fingerprint: string; role: number; parent: number | null; description: string; raw: string; conds: { tagName: string; type: string }[] }[];
  attrRules: { fingerprint: string; role: number; parent: number | null; description: string; raw: string; values: string[] }[];
  traversalRules: { fingerprint: string; role: number; parent: number | null; description: string; raw: string }[];
  standardRules: { fingerprint: string; description: string; raw: string }[];
  traverseLabelRules: { fingerprint: string; role: number; description: string; raw: string }[];
}

// ---------------------------------------------------------------------------
// Lightweight XML rule extraction (works in browser + Node)
// ---------------------------------------------------------------------------

function attr(name: string, block: string): string | null {
  const m = block.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : null;
}

function extractBlocks(xml: string): string[] {
  const blocks: string[] = [];
  const re = /<Rule\b[^>]*>[\s\S]*?<\/Rule>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) blocks.push(m[0]);
  return blocks;
}

function section(xml: string, name: string): string {
  const open = new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`);
  const m = xml.match(open);
  return m ? m[1] : '';
}

/** Parse all existing rules out of an IEAdaptor.xml document. */
export function parseExistingRules(xml: string): ExistingRules {
  const result: ExistingRules = { tagRules: [], attrRules: [], traversalRules: [], standardRules: [], traverseLabelRules: [] };
  const ri = section(xml, 'RoleIdentifier');
  const tags = section(ri, 'BasedOnTags');
  const attrs = section(ri, 'BasedOnAttributes');
  const traverse = section(ri, 'BasedOnTraverseLogic');
  const li = section(xml, 'LabelIdentifier');
  const standard = section(li, 'StandardLogic');
  const traverseLabel = section(li, 'TraverseLogic');

  for (const block of extractBlocks(tags)) {
    const role = Number(attr('CurrentRole', block) || 0);
    const parent = attr('ParentRole', block) === '' || attr('ParentRole', block) === null ? null : Number(attr('ParentRole', block));
    const conds: TagCondition[] = [];
    const condRe = /<Condition\b([^>]*)\/?>/g;
    let m: RegExpExecArray | null;
    while ((m = condRe.exec(block)) !== null) {
      const c = m[1];
      const tn = attr('TagName', `<x ${c}/>`);
      const ty = attr('Type', `<x ${c}/>`);
      if (tn) conds.push({ tagName: tn, type: ty || undefined });
    }
    const fp = `tag|${role}|${parent ?? ''}|${conds.map((c) => `${c.tagName}:${c.type || ''}`).join(',')}`;
    result.tagRules.push({
      fingerprint: fp, role, parent,
      description: conds.map((c) => `${c.tagName}${c.type ? ' type=' + c.type : ''}`).join(' · '),
      raw: block,
      conds: conds.map((c) => ({ tagName: c.tagName, type: c.type || '' })),
    });
  }

  for (const block of extractBlocks(attrs)) {
    const role = Number(attr('CurrentRole', block) || 0);
    const parent = attr('ParentRole', block) === '' || attr('ParentRole', block) === null ? null : Number(attr('ParentRole', block));
    const m = block.match(/<Condition\b([^>]*)\/?>/);
    const c = m ? m[1] : '';
    const operator = attr('Operator', `<x ${c}/>`) || 'contains';
    const attribute = (c.match(/\s([a-zA-Z-]+)="\|/)?.[1]) || 'className';
    const rawValues = c.match(/="\|([^|]*\|[^|]*)\|?"/)?.[1] || '';
    const values = rawValues.split('|').filter(Boolean);
    const fp = `attr|${role}|${parent ?? ''}|${attribute}|${operator}|${[...values].sort().join('|')}`;
    result.attrRules.push({ fingerprint: fp, role, parent, description: `${attribute} ${operator}`, raw: block, values });
  }

  for (const block of extractBlocks(traverse)) {
    const role = Number(attr('CurrentRole', block) || 0);
    const parent = attr('ParentRole', block) === '' || attr('ParentRole', block) === null ? null : Number(attr('ParentRole', block));
    const cond = block.match(/<CurrentInfo>([\s\S]*?)<\/CurrentInfo>/);
    const condSrc = cond ? cond[1] : '';
    const paths: string[] = [];
    const pathRe = /<Path Path="([^"]+)">([\s\S]*?)<\/Path>/g;
    let pm: RegExpExecArray | null;
    while ((pm = pathRe.exec(block)) !== null) {
      const inner = pm[2];
      const op = attr('Operator', inner) || 'simple';
      const at = inner.match(/<Attributes\b([^>]*)\/?>/);
      paths.push(`${pm[1]}:${op}:${at ? at[1].trim() : ''}`);
    }
    const fp = `traversal|${role}|${parent ?? ''}|${condSrc.replace(/\s+/g, ' ').trim()}|${paths.join('>')}`;
    result.traversalRules.push({ fingerprint: fp, role, parent, description: `${role} via ${paths.join(' → ')}`, raw: block });
  }

  for (const block of extractBlocks(standard)) {
    const id = attr('Id', block) || '';
    const m = block.match(/<Attributes\b([^>]*)\/?>/);
    const c = m ? m[1] : '';
    const from = attr('From', `<x ${c}/>`) || '';
    const to = attr('To', `<x ${c}/>`) || '';
    const op = attr('Operator', `<x ${c}/>`) || '';
    result.standardRules.push({ fingerprint: `sl|${from}|${to}|${op}`, description: `${from} → ${to} (${op})`, raw: block });
    void id;
  }

  for (const block of extractBlocks(traverseLabel)) {
    const m = block.match(/<WhenToConsider\b([^>]*)\/?>/);
    const role = Number(attr('Role', `<x ${m ? m[1] : ''}/>`) || 0);
    const paths: string[] = [];
    const pathRe = /<Path Path="([^"]+)">([\s\S]*?)<\/Path>/g;
    let pm: RegExpExecArray | null;
    while ((pm = pathRe.exec(block)) !== null) {
      const op = attr('Operator', pm[2]) || 'simple';
      const at = pm[2].match(/<Attributes\b([^>]*)\/?>/);
      paths.push(`${pm[1]}:${op}:${at ? at[1].trim() : ''}`);
    }
    const method = block.match(/<Method Name="([^"]*)"/)?.[1] || 'innerText';
    result.traverseLabelRules.push({
      fingerprint: `tl|${role}|${m ? m[1].trim() : ''}|${paths.join('>')}|${method}`,
      role, description: `role ${role} via ${paths.join(' → ')}`, raw: block,
    });
  }

  return result;
}

// ---------------------------------------------------------------------------
// Fingerprints for generated rules (must match parseExistingRules)
// ---------------------------------------------------------------------------

function tagFingerprint(r: TagRule): string {
  const conds = r.conditions.map((c) => `${c.tagName}:${c.type || ''}`).join(',');
  return `tag|${r.currentRole}|${r.parentRole ?? ''}|${conds}`;
}

function attrFingerprint(r: AttributeRule): string {
  return `attr|${r.currentRole}|${r.parentRole ?? ''}|${r.attribute}|${r.operator}|${[...r.values].sort().join('|')}`;
}

function traversalFingerprint(r: TraversalRule): string {
  const cond = [
    r.condition.tagName ? `TagName="${r.condition.tagName}"` : '',
    r.condition.type ? `Type="${r.condition.type}"` : '',
    r.condition.className ? `className="${r.condition.className}"` : '',
    r.condition.attribute ? `${r.condition.attribute}="${r.condition.value || ''}"` : '',
  ].filter(Boolean).join(' ');
  const paths = r.paths.map((p) => {
    const at = Object.entries(p.attributes).map(([k, v]) => `${k}="${v}"`).join(' ');
    return `${p.path}:${p.operator}:${at}`;
  }).join('>');
  return `traversal|${r.currentRole}|${r.parentRole ?? ''}|${cond}|${paths}`;
}

function standardFingerprint(r: { from: string; to: string; operator: string }): string {
  return `sl|${r.from}|${r.to}|${r.operator}`;
}

function labelTraversalFingerprint(r: TraverseLabelRule): string {
  const attrs = Object.entries(r.attributes).map(([k, v]) => `${k}="${v}"`).join(' ');
  const paths = r.paths.map((p) => {
    const at = Object.entries(p.attributes).map(([k, v]) => `${k}="${v}"`).join(' ');
    return `${p.path}:${p.operator}:${at}`;
  }).join('>');
  return `tl|${r.role}|${attrs}|${paths}|${r.method}`;
}

/** Type token list from a pipe string, e.g. "|TEXT|PASSWORD|" → ["TEXT","PASSWORD"]. */
function typeTokens(pipeList: string): string[] {
  return pipeList.slice(1, -1).split('|').filter(Boolean);
}

/** True when an existing tag rule already covers a generated tag rule
 *  (same role/parent, every generated condition matched by tagName and a
 *  type list that includes the generated type). */
function existingTagCovers(
  existing: ExistingRules['tagRules'],
  gen: TagRule
): boolean {
  return existing.some((e) => {
    if (e.role !== gen.currentRole || (e.parent ?? null) !== (gen.parentRole ?? null)) return false;
    return gen.conditions.every((gc) =>
      e.conds.some((ec) => {
        if (ec.tagName !== gc.tagName) return false;
        if (!gc.type) return true;
        if (!ec.type) return false;
        const genTypes = typeTokens(gc.type);
        const exTypes = typeTokens(ec.type);
        return genTypes.every((t) => exTypes.includes(t));
      })
    );
  });
}

/** True when an existing attribute rule covers a generated one (same role/parent/
 *  attribute/operator and all generated values present in the existing values). */
function existingAttrCovers(
  existing: ExistingRules['attrRules'],
  gen: AttributeRule
): boolean {
  return existing.some((e) =>
    e.role === gen.currentRole && (e.parent ?? null) === (gen.parentRole ?? null) &&
    e.values.length > 0 && gen.values.every((v) => e.values.includes(v))
  );
}

// ---------------------------------------------------------------------------
// Compare
// ---------------------------------------------------------------------------

export function compareRules(model: RuleModel, existing: ExistingRules): CompareResult {
  const result: CompareResult = { newRules: [], modifiedRules: [], duplicateRules: [], obsoleteRules: [], matched: 0 };

  const existingTraversal = new Map(existing.traversalRules.map((r) => [r.fingerprint, r]));
  const existingStd = new Map(existing.standardRules.map((r) => [r.fingerprint, r]));
  const existingTl = new Map(existing.traverseLabelRules.map((r) => [r.fingerprint, r]));

  const toCompare = (kind: 'tag' | 'attribute' | 'traversal' | 'label-standard' | 'label-traverse', role: number, description: string, fingerprint: string, inG: boolean, inE: boolean) => ({
    kind, role, description, fingerprint, inGenerated: inG, inExisting: inE,
  });

  for (const r of model.basedOnTags) {
    const fp = tagFingerprint(r);
    const covered = existingTagCovers(existing.tagRules, r);
    if (covered) { result.duplicateRules.push(toCompare('tag', r.currentRole, `role ${r.currentRole}: ${r.conditions.map((c) => c.tagName + (c.type ? ' ' + c.type : '')).join(', ')}`, fp, true, true)); result.matched++; }
    else result.newRules.push(toCompare('tag', r.currentRole, `role ${r.currentRole}: ${r.conditions.map((c) => c.tagName + (c.type ? ' ' + c.type : '')).join(', ')}`, fp, true, false));
  }
  for (const r of model.basedOnAttributes) {
    const fp = attrFingerprint(r);
    const covered = existingAttrCovers(existing.attrRules, r);
    const desc = `role ${r.currentRole}: ${r.attribute} ${r.operator} |${r.values.join('|')}|`;
    if (covered) { result.duplicateRules.push(toCompare('attribute', r.currentRole, desc, fp, true, true)); result.matched++; }
    else result.newRules.push(toCompare('attribute', r.currentRole, desc, fp, true, false));
  }
  for (const r of model.basedOnTraverseLogic) {
    const fp = traversalFingerprint(r);
    const exists = existingTraversal.has(fp);
    const desc = `role ${r.currentRole}: traverse ${r.paths.map((p) => p.path).join(' → ')}`;
    if (exists) { result.duplicateRules.push(toCompare('traversal', r.currentRole, desc, fp, true, true)); result.matched++; }
    else result.newRules.push(toCompare('traversal', r.currentRole, desc, fp, true, false));
  }
  for (const r of model.standardLogic) {
    const fp = standardFingerprint(r);
    const exists = existingStd.has(fp);
    if (exists) { result.duplicateRules.push(toCompare('label-standard', 0, `${r.from} → ${r.to}`, fp, true, true)); result.matched++; }
    else result.newRules.push(toCompare('label-standard', 0, `${r.from} → ${r.to}`, fp, true, false));
  }
  for (const r of model.traverseLogic) {
    const fp = labelTraversalFingerprint(r);
    const exists = existingTl.has(fp);
    const desc = `role ${r.role}: ${r.paths.map((p) => p.path).join(' → ')}`;
    if (exists) { result.duplicateRules.push(toCompare('label-traverse', r.role, desc, fp, true, true)); result.matched++; }
    else result.newRules.push(toCompare('label-traverse', r.role, desc, fp, true, false));
  }

  // Modified: same (kind, role, parent) but different fingerprint — the existing
  // rule for that role was superseded by a different (stronger) generated rule.
  const attrSuperseded = (role: number, parent: number | null) =>
    model.basedOnTags.some((g) => g.currentRole === role && (g.parentRole ?? null) === parent) ||
    model.basedOnTraverseLogic.some((g) => g.currentRole === role && (g.parentRole ?? null) === parent);

  // Obsolete: existing rules whose (kind, role, parent) is absent from generated.
  for (const r of existing.tagRules) {
    if (!model.basedOnTags.some((g) => g.currentRole === r.role && (g.parentRole ?? null) === r.parent)) {
      result.obsoleteRules.push(toCompare('tag', r.role, `role ${r.role}: ${r.description}`, r.fingerprint, false, true));
    }
  }
  for (const r of existing.attrRules) {
    if (attrSuperseded(r.role, r.parent)) {
      result.modifiedRules.push(toCompare('attribute', r.role, `role ${r.role}: ${r.description} (superseded by a tag/traversal rule)`, r.fingerprint, false, true));
    } else if (!model.basedOnAttributes.some((g) => g.currentRole === r.role && (g.parentRole ?? null) === r.parent)) {
      result.obsoleteRules.push(toCompare('attribute', r.role, `role ${r.role}: ${r.description}`, r.fingerprint, false, true));
    }
  }
  for (const r of existing.traversalRules) {
    if (!model.basedOnTraverseLogic.some((g) => g.currentRole === r.role && (g.parentRole ?? null) === r.parent)) {
      result.obsoleteRules.push(toCompare('traversal', r.role, `role ${r.role}: ${r.description}`, r.fingerprint, false, true));
    }
  }
  for (const r of existing.standardRules) {
    if (!model.standardLogic.some((g) => `${g.from}|${g.to}|${g.operator}` === r.fingerprint.split('|').slice(1).join('|'))) {
      result.obsoleteRules.push(toCompare('label-standard', 0, r.description, r.fingerprint, false, true));
    }
  }
  for (const r of existing.traverseLabelRules) {
    if (!model.traverseLogic.some((g) => labelTraversalFingerprint(g) === r.fingerprint)) {
      result.obsoleteRules.push(toCompare('label-traverse', r.role, r.description, r.fingerprint, false, true));
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Merge (text-level, preserves formatting + comments)
// ---------------------------------------------------------------------------

/** Render one generated tag rule as XML text (used by merge). */
function renderTagBlock(r: TagRule): string {
  const parent = r.parentRole === null ? '' : String(r.parentRole);
  const out: string[] = [];
  out.push(`\t\t\t\t<Rule Enable="1" CurrentRole="${r.currentRole}" ParentRole="${parent}">`);
  out.push(`\t\t\t\t\t<CurrentInfo>`);
  for (const c of r.conditions) out.push(`\t\t\t\t\t\t<Condition TagName="${c.tagName}"${c.type ? ` Type="${c.type}"` : ''}/>`);
  out.push(`\t\t\t\t\t</CurrentInfo>`);
  out.push(`\t\t\t\t</Rule>`);
  return out.join('\n');
}

function renderAttrBlock(r: AttributeRule): string {
  const parent = r.parentRole === null ? '' : String(r.parentRole);
  const values = `|${[...new Set(r.values)].join('|')}|`;
  return [
    `\t\t\t\t<Rule Enable="1" CurrentRole="${r.currentRole}" ParentRole="${parent}">`,
    `\t\t\t\t\t<CurrentInfo>`,
    `\t\t\t\t\t\t<Condition Operator="${r.operator}" ${r.attribute}="${values}"/>`,
    `\t\t\t\t\t</CurrentInfo>`,
    `\t\t\t\t</Rule>`,
  ].join('\n');
}

/**
 * Merge generated rules into an existing IEAdaptor.xml string.
 * Only NEW rules are inserted (duplicates skipped); existing formatting and
 * comments are preserved byte-for-byte.
 */
export function mergeXML(model: RuleModel, existingXml: string): { xml: string; added: number } {
  const existing = parseExistingRules(existingXml);
  const existingTraversal = new Set(existing.traversalRules.map((r) => r.fingerprint));
  const existingStd = new Set(existing.standardRules.map((r) => r.fingerprint));
  const existingTl = new Set(existing.traverseLabelRules.map((r) => r.fingerprint));

  let added = 0;
  let xml = existingXml;

  const insertBefore = (xmlStr: string, sectionName: string, blocks: string[]): string => {
    if (blocks.length === 0) return xmlStr;
    const close = new RegExp(`(<\\/${sectionName}>)`);
    const m = xmlStr.match(close);
    if (!m || m.index === undefined) return xmlStr;
    const insertion = blocks.join('\n') + '\n';
    added += blocks.length;
    return xmlStr.slice(0, m.index) + insertion + xmlStr.slice(m.index);
  };

  // BasedOnTags — coverage-aware: an existing rule for the same (role, parent)
  // that already matches every generated condition is a duplicate.
  const newTags = model.basedOnTags.filter((r) => !existingTagCovers(existing.tagRules, r)).map(renderTagBlock);
  xml = insertBefore(xml, 'BasedOnTags', newTags);

  // BasedOnAttributes — value-aware: an existing rule with the same
  // (role, parent, attribute, operator) that already covers all generated
  // values is a duplicate; otherwise the rule is added.
  const newAttrs = model.basedOnAttributes.filter((r) => !existingAttrCovers(existing.attrRules, r)).map(renderAttrBlock);
  xml = insertBefore(xml, 'BasedOnAttributes', newAttrs);

  // BasedOnTraverseLogic — reuse renderTraversalRule at indent 4.
  const newTraversal = model.basedOnTraverseLogic.filter((r) => !existingTraversal.has(traversalFingerprint(r)));
  const traversalBlocks = newTraversal.map((r) => renderTraversalBlock(r));
  xml = insertBefore(xml, 'BasedOnTraverseLogic', traversalBlocks);

  // StandardLogic
  const newStd = model.standardLogic.filter((r) => !existingStd.has(standardFingerprint(r))).map((r) => `\t\t\t\t<Rule Id="${r.id}">\n\t\t\t\t\t<Attributes From="${r.from}" To="${r.to}" Operator="${r.operator}"/>\n\t\t\t\t</Rule>`);
  xml = insertBefore(xml, 'StandardLogic', newStd);

  // TraverseLogic (labels)
  const newTl = model.traverseLogic.filter((r) => !existingTl.has(labelTraversalFingerprint(r))).map(renderTraverseLabelBlock);
  xml = insertBefore(xml, 'TraverseLogic', newTl);

  return { xml, added };
}

function renderTraversalBlock(r: TraversalRule): string {
  const parent = r.parentRole === null ? '' : String(r.parentRole);
  const out: string[] = [];
  out.push(`\t\t\t\t<Rule Enable="1" CurrentRole="${r.currentRole}" ParentRole="${parent}">`);
  out.push(`\t\t\t\t\t<CurrentInfo>`);
  const cond = r.condition;
  if (cond.className) out.push(`\t\t\t\t\t\t<Condition className="${cond.className}" Operator="${cond.operator || 'contains'}"/>`);
  else if (cond.tagName) out.push(`\t\t\t\t\t\t<Condition TagName="${cond.tagName}"/>`);
  out.push(`\t\t\t\t\t</CurrentInfo>`);
  out.push(`\t\t\t\t\t<TraversalInfo>`);
  for (const p of r.paths) {
    out.push(`\t\t\t\t\t\t<Path Path="${p.path}">`);
    out.push(`\t\t\t\t\t\t\t<Condition Operator="${p.operator}">`);
    const attrs = Object.entries(p.attributes).map(([k, v]) => `${k}="${v}"`).join(' ');
    out.push(`\t\t\t\t\t\t\t\t<Attributes ${attrs}/>`);
    out.push(`\t\t\t\t\t\t\t</Condition>`);
    out.push(`\t\t\t\t\t\t</Path>`);
  }
  out.push(`\t\t\t\t\t</TraversalInfo>`);
  out.push(`\t\t\t\t</Rule>`);
  return out.join('\n');
}

function renderTraverseLabelBlock(r: TraverseLabelRule): string {
  const parent = r.parentRole === null ? '' : String(r.parentRole);
  const out: string[] = [];
  out.push(`\t\t\t\t<Rule Id="${r.id}" Enable="1">`);
  out.push(`\t\t\t\t\t<WhenToConsider Role="${r.role}" ParentRole="${parent}">`);
  const attrs = Object.entries(r.attributes).map(([k, v]) => `${k}="${v}"`).join(' ');
  out.push(`\t\t\t\t\t\t<Attributes ${attrs}/>`);
  out.push(`\t\t\t\t\t</WhenToConsider>`);
  out.push(`\t\t\t\t\t<WhereToGo>`);
  for (const p of r.paths) {
    out.push(`\t\t\t\t\t\t<Path Path="${p.path}">`);
    out.push(`\t\t\t\t\t\t\t<Condition Operator="${p.operator}">`);
    const pAttrs = Object.entries(p.attributes).map(([k, v]) => `${k}="${v}"`).join(' ');
    out.push(`\t\t\t\t\t\t\t\t<Attributes ${pAttrs}/>`);
    out.push(`\t\t\t\t\t\t\t</Condition>`);
    out.push(`\t\t\t\t\t\t</Path>`);
  }
  out.push(`\t\t\t\t\t</WhereToGo>`);
  out.push(`\t\t\t\t\t<WhatToCall>`);
  out.push(`\t\t\t\t\t\t<Method Name="${r.method}"/>`);
  out.push(`\t\t\t\t\t</WhatToCall>`);
  out.push(`\t\t\t\t</Rule>`);
  return out.join('\n');
}
