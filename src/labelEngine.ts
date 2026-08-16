/**
 * labelEngine.ts — Label identification.
 *
 * Finds labels for controls using, in priority order:
 *   aria-label → aria-labelledby → label[for=id] → parent <label> →
 *   sibling label → nearest text node → table-header association →
 *   form-group association.
 *
 * Also builds the LabelIdentifier rules (StandardLogic + TraverseLogic) that
 * Epiplex will use to re-derive control names at runtime.
 */
import type {
  DetectedControl,
  RoleId,
  StandardLabelRule,
  TraversalPath,
  TraverseLabelRule,
} from './types';

// ---------------------------------------------------------------------------
// DOM-level label discovery (runs in the content script)
// ---------------------------------------------------------------------------

export interface LabelResult {
  text: string | null;
  strategy: DetectedControl['labelStrategy'];
}

/** Collapse whitespace and cap length (Epiplex control names are short). */
export function cleanText(t: string | null | undefined): string | null {
  if (!t) return null;
  const cleaned = t.replace(/\s+/g, ' ').trim();
  if (!cleaned) return null;
  return cleaned.length > 120 ? cleaned.slice(0, 120) + '…' : cleaned;
}

function labelForId(doc: Document, id: string): HTMLLabelElement | null {
  try {
    const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(id) : id.replace(/([^a-zA-Z0-9_-])/g, '\\$1');
    return doc.querySelector(`label[for="${escaped}"]`);
  } catch {
    return null;
  }
}

/**
 * Find the best label for an element using all documented strategies.
 * `doc` is only used for label[for] lookups; everything else is local DOM.
 */
export function findLabel(el: Element, doc: Document): LabelResult {
  // 1. aria-label (author-provided, best).
  const ariaLabel = el.getAttribute('aria-label');
  if (ariaLabel && ariaLabel.trim()) {
    return { text: cleanText(ariaLabel), strategy: 'aria-label' };
  }

  // 2. aria-labelledby → referenced element text.
  const labelledby = el.getAttribute('aria-labelledby');
  if (labelledby) {
    const parts: string[] = [];
    for (const id of labelledby.split(/\s+/)) {
      const ref = doc.getElementById(id);
      if (ref) {
        const t = cleanText(ref.textContent);
        if (t) parts.push(t);
      }
    }
    if (parts.length) return { text: parts.join(' '), strategy: 'aria-labelledby' };
  }

  // 3. label[for=id].
  const id = el.getAttribute('id');
  if (id) {
    const lab = labelForId(doc, id);
    if (lab) {
      const t = cleanText(lab.textContent);
      if (t) return { text: t, strategy: 'label-for' };
    }
  }

  // 4. Wrapping <label> (parent label).
  let node: Element | null = el.parentElement;
  while (node && node.tagName.toLowerCase() !== 'label' && node !== el.closest('form, body')) {
    node = node.parentElement;
  }
  if (node && node.tagName.toLowerCase() === 'label') {
    const t = cleanText(node.textContent);
    if (t) return { text: t, strategy: 'parent-label' };
  }

  // 5. Sibling label (previous or next element).
  const prev = el.previousElementSibling;
  if (prev && prev.tagName.toLowerCase() === 'label') {
    const t = cleanText(prev.textContent);
    if (t) return { text: t, strategy: 'sibling-label' };
  }
  const next = el.nextElementSibling;
  if (next && next.tagName.toLowerCase() === 'label') {
    const t = cleanText(next.textContent);
    if (t) return { text: t, strategy: 'sibling-label' };
  }

  // 6. Table header association: <td>/<th> → matching <th> in the header row.
  const cell = el.closest('td, th');
  if (cell && cell.tagName.toLowerCase() === 'td') {
    const row = cell.parentElement;
    const headerText = headerForCell(cell as HTMLTableCellElement);
    if (headerText) return { text: headerText, strategy: 'table-header' };
    void row;
  }

  // 7. form-group style association: .form-group / .form-field / .slds-form-element / .field
  const group = el.closest('.form-group, .form-field, .form-field-wrapper, .slds-form-element, .field, .mat-form-field, .p-field');
  if (group) {
    const lab = group.querySelector('label, .slds-form-element__label, .mat-form-field-label, legend');
    if (lab) {
      const t = cleanText(lab.textContent);
      if (t) return { text: t, strategy: 'form-group' };
    }
  }

  // 8. Nearest text node: previous sibling text, then parent's first text.
  if (prev) {
    const t = cleanText(prev.textContent);
    if (t && t.length <= 60) return { text: t, strategy: 'nearest-text' };
  }
  const parent = el.parentElement;
  if (parent) {
    const direct = Array.from(parent.childNodes)
      .filter((n) => n.nodeType === 3) // Node.TEXT_NODE
      .map((n) => n.textContent || '')
      .join(' ');
    const t = cleanText(direct);
    if (t && t.length <= 60) return { text: t, strategy: 'nearest-text' };
  }

  // 9. Placeholder / title fallback (not a DOM walk but a useful label source).
  const ph = el.getAttribute('placeholder');
  if (ph && ph.trim()) return { text: cleanText(ph), strategy: 'nearest-text' };

  return { text: null, strategy: 'none' };
}

/** For a <td>, find the <th> in the same column of the table header. */
function headerForCell(cell: HTMLTableCellElement): string | null {
  const row = cell.parentElement as HTMLTableRowElement | null;
  if (!row) return null;
  const table = cell.closest('table');
  if (!table) return null;
  const cells = Array.from(row.cells);
  const index = cells.indexOf(cell);
  if (index < 0) return null;
  const head = table.tHead;
  if (!head) return null;
  const headerRow = head.rows[0];
  if (!headerRow) return null;
  const th = headerRow.cells[index];
  return th ? cleanText(th.textContent) : null;
}

// ---------------------------------------------------------------------------
// Label rule generation (runs in the popup)
// ---------------------------------------------------------------------------

/** StandardLogic base rules — always emitted (matches IEAdaptor.xml defaults). */
export function buildStandardLabelRules(controls: DetectedControl[]): StandardLabelRule[] {
  const rules: StandardLabelRule[] = [
    {
      id: 'SL_1',
      from: 'id',
      to: 'htmlfor',
      operator: 'contains',
      reason: 'Standard Epiplex association: control id ↔ <label for> (label[for=id]).',
    },
    {
      id: 'SL_2',
      from: 'aria-labelledby',
      to: 'id',
      operator: 'contains',
      reason: 'ARIA association: aria-labelledby lists the id of the labelling element.',
    },
  ];
  const hasAriaLabel = controls.some((c) => c.attributes.ariaLabel);
  if (hasAriaLabel) {
    rules.push({
      id: 'SL_3',
      from: 'aria-label',
      to: 'title',
      operator: 'contains',
      reason: 'aria-label is used directly as the control name.',
    });
  }
  return rules;
}

function attrsString(attrs: Record<string, string>): string {
  return Object.keys(attrs).sort().map((k) => `${k}=${attrs[k]}`).join(',');
}

function labelTraversalFingerprint(r: TraverseLabelRule): string {
  const paths = r.paths.map((p) => `${p.path}:${p.operator}:${attrsString(p.attributes)}`).join('>');
  return `${r.role}|${r.parentRole ?? ''}|${attrsString(r.attributes)}|${paths}|${r.method}`;
}

/**
 * Build TraverseLogic rules from the label strategies actually used on the page.
 * Rules are deduplicated; stable TL_ ids are assigned in role order.
 */
export function buildTraverseLabelRules(controls: DetectedControl[]): TraverseLabelRule[] {
  const seen = new Map<string, TraverseLabelRule>();
  const push = (r: TraverseLabelRule) => {
    const key = labelTraversalFingerprint(r);
    if (!seen.has(key)) seen.set(key, r);
  };

  const inputAttrs = (c: DetectedControl): Record<string, string> => {
    const a: Record<string, string> = { TagName: c.attributes.tagName.toUpperCase() };
    if (c.attributes.tagName === 'input' && c.attributes.type && c.attributes.type !== 'text') {
      a.type = c.attributes.type;
    }
    return a;
  };

  const innerTextPath = (path: string, operator: 'simple' | 'recursive', attributes: Record<string, string>): TraversalPath[] => [
    { path, operator, attributes },
  ];

  for (const c of controls) {
    switch (c.labelStrategy) {
      case 'parent-label':
        push({
          id: '', role: c.role, parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath('PR', 'simple', { TagName: 'label' }),
          method: 'innerText',
          reason: `Label found by wrapping <label> (e.g. ${c.location.cssSelector}).`,
        });
        break;
      case 'sibling-label':
        push({
          id: '', role: c.role, parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath('PS', 'simple', { TagName: 'label' }),
          method: 'innerText',
          reason: `Label found as sibling <label> (e.g. ${c.location.cssSelector}).`,
        });
        break;
      case 'nearest-text':
        push({
          id: '', role: c.role, parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath('PS', 'simple', {}),
          method: 'innerText',
          reason: `Label taken from the nearest preceding text node (${c.location.cssSelector}).`,
        });
        push({
          id: '', role: c.role, parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath('PR', 'recursive', { TagName: 'label' }),
          method: 'innerText',
          reason: `Fallback: walk parents for a <label> containing the control.`,
        });
        break;
      case 'table-header':
        push({
          id: '', role: c.role, parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath('PR', 'recursive', { TagName: 'tr' }),
          method: 'innerText',
          reason: `Label derived from the table header / row text (${c.location.cssSelector}).`,
        });
        break;
      case 'form-group':
        push({
          id: '', role: c.role, parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath('PR', 'recursive', { TagName: 'label' }),
          method: 'innerText',
          reason: `Label inside a form-group wrapper (${c.location.cssSelector}).`,
        });
        break;
      default:
        break;
    }
  }

  const rules = [...seen.values()].sort((a, b) => a.role - b.role || a.paths[0].path.localeCompare(b.paths[0].path));
  rules.forEach((r, i) => { r.id = `TL_${i + 1}`; });
  return rules;
}

/**
 * Suggest missing label rules (bonus feature): controls with no label at all.
 * Returns human-readable suggestions shown in the diagnostics panel.
 */
export function suggestMissingLabels(controls: DetectedControl[]): string[] {
  const missing = controls.filter((c) => !c.label && c.role !== 24 && c.role !== 28 && c.role !== 29 && c.role !== 10);
  return missing.map(
    (c) =>
      `Add aria-label or <label for="${c.attributes.id || '…'}"> for the ${c.roleName} at ${c.location.cssSelector}.`
  );
}
