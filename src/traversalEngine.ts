/**
 * traversalEngine.ts — Traversal logic generation.
 *
 * Generates BasedOnTraverseLogic rules that tell Epiplex how to reach a real
 * control from a visible wrapper / visual widget:
 *
 *   Angular Material : mat-form-field → CH recursive <input> | <mat-select>
 *   Salesforce        : slds-form-element → CH recursive <input>/<select>
 *   PowerApps         : appmagic-* widget → CH recursive <input>
 *   SAP UI5           : ui5-* widget → CH recursive <input>
 *   Select2 / Chosen  : widget → PS/PR recursive <select>
 *   Bootstrap         : custom checkbox/switch → PS/PR recursive <input type=checkbox>
 *   custom widgets    : div[role=combobox] → CH recursive <select>/<input>
 *   SVG controls      : svg icon sibling → PS recursive <button>/<input>
 *
 * Supported paths: PR (parent), CH (child), PS (previous sibling), NS (next
 * sibling), and recursive traversal on any of them.
 *
 * The DOM-side discovery (finding wrappers in the live page) lives in
 * content.ts; this module converts a discovery into a proper rule and
 * collects/dedups all rules for XML emission.
 */
import type { Condition, DetectedControl, RoleId, TraversalPath, TraversalRule } from './types';

/** What content.ts discovered: an anchor element + how to reach the real control. */
export interface TraversalDiscovery {
  /** Anchor condition (what Epiplex should match). */
  condition: Condition;
  /** Target filter attributes, e.g. { TagName: 'input', type: 'checkbox' }. */
  target: Record<string, string>;
  /** Direction from anchor to target. */
  direction: 'CH' | 'PR' | 'PS' | 'NS';
  /** Whether the traversal is recursive. */
  recursive: boolean;
  framework: string | null;
  reason: string;
}

/**
 * Convert a discovery into an Epiplex TraversalRule. The anchor becomes the
 * rule's <Condition>, the target becomes the <Path> <Attributes> filter, and
 * the direction becomes the Path="PS"|"CH"|… attribute.
 */
export function buildTraversalRule(
  discovery: TraversalDiscovery,
  currentRole: RoleId,
  parentRole: RoleId | null,
  confidence: number
): TraversalRule {
  const paths: TraversalPath[] = [
    {
      path: discovery.direction,
      operator: discovery.recursive ? 'recursive' : 'simple',
      attributes: discovery.target,
    },
  ];
  return {
    currentRole,
    parentRole,
    condition: discovery.condition,
    paths,
    source: discovery.reason,
    framework: discovery.framework ?? undefined,
    confidence,
  };
}

/**
 * Collect traversal rules that content.ts attached to detected controls
 * (`control.traversalRule`). Returns the deduplicated list.
 */
export function generateTraversalRules(controls: DetectedControl[]): TraversalRule[] {
  const seen = new Map<string, TraversalRule>();
  for (const c of controls) {
    const r = c.traversalRule;
    if (!r) continue;
    const key = fingerprint(r);
    if (!seen.has(key)) seen.set(key, r);
  }
  return [...seen.values()].sort((a, b) => a.currentRole - b.currentRole);
}

/** Canonical fingerprint used for dedup + compare. */
export function fingerprint(r: TraversalRule): string {
  const cond = [r.condition.tagName, r.condition.type, r.condition.className, r.condition.attribute, r.condition.value].join('|');
  const paths = r.paths.map((p) => `${p.path}:${p.operator}:${Object.keys(p.attributes).sort().map((k) => `${k}=${p.attributes[k]}`).join(',')}`).join('>');
  return `traversal|${r.currentRole}|${r.parentRole ?? ''}|${cond}|${paths}`;
}

/**
 * Bonus: suggest traversal improvements for controls that are covered by a
 * tag/attribute rule but could benefit from a wrapper-anchored rule.
 */
export function suggestTraversalImprovements(controls: DetectedControl[]): string[] {
  const suggestions: string[] = [];
  for (const c of controls) {
    if (c.traversalRule) continue;
    const tag = c.attributes.tagName;
    const cls = c.attributes.className || '';
    if ((tag === 'input' || tag === 'select') && /\b(hidden|sr-only|visually-hidden)\b/.test(cls)) {
      suggestions.push(
        `The ${c.roleName} at ${c.location.cssSelector} is visually hidden — consider a traversal rule anchored on its visible wrapper (checkbox/select2/combobox).`
      );
    }
    if (c.traversalRule === undefined) {
      suggestions.push(
        `The ${c.roleName} at ${c.location.cssSelector} is covered by a tag rule but sits in a framework wrapper — verify a traversal rule from that wrapper is desired.`
      );
    }
  }
  return [...new Set(suggestions)].slice(0, 20);
}
