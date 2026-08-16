/**
 * types.ts — Shared type model for the Epiplex IE Rules Generator.
 *
 * These types are used by the content script (DOM scanning), the popup
 * (rule generation / preview), and the pure rule engines. Everything in
 * this module is plain data — safe to pass through chrome.runtime messages.
 */

/** Epiplex CurrentRole numeric codes (stable across IEAdaptor.xml versions). */
export type RoleId =
  | 3   // Scroll bar
  | 10  // Container / group
  | 12  // Menu item
  | 24  // Table
  | 28  // Table row
  | 29  // Table cell
  | 30  // Link
  | 34  // List item / option
  | 37  // Tab
  | 40  // Image
  | 41  // Text
  | 42  // Text box
  | 43  // Button
  | 44  // Checkbox
  | 45  // Radio button
  | 46  // Dropdown
  | 82  // Icon
  | 86  // Menu
  | 92; // Date control

/** Human-readable role info, including the highlight colour used for visual inspection. */
export interface RoleInfo {
  id: RoleId;
  name: string;
  color: string;
}

/** Master role table. Future roles can be added here or via the settings JSON. */
export const ROLES: Record<number, RoleInfo> = {
  3:  { id: 3,  name: 'Scroll bar',        color: '#9e9e9e' },
  10: { id: 10, name: 'Container / Group', color: '#8d6e63' },
  12: { id: 12, name: 'Menu item',         color: '#4a148c' },
  24: { id: 24, name: 'Table',             color: '#00695c' },
  28: { id: 28, name: 'Table row',         color: '#00897b' },
  29: { id: 29, name: 'Table cell',        color: '#26a69a' },
  30: { id: 30, name: 'Link',              color: '#1565c0' },
  34: { id: 34, name: 'List item / Option',color: '#5e35b1' },
  37: { id: 37, name: 'Tab',               color: '#f57f17' },
  40: { id: 40, name: 'Image',             color: '#ad1457' },
  41: { id: 41, name: 'Text',              color: '#546e7a' },
  42: { id: 42, name: 'Text box',          color: '#0277bd' },
  43: { id: 43, name: 'Button',            color: '#d32f2f' },
  44: { id: 44, name: 'Checkbox',          color: '#2e7d32' },
  45: { id: 45, name: 'Radio button',      color: '#f9a825' },
  46: { id: 46, name: 'Dropdown',          color: '#e65100' },
  82: { id: 82, name: 'Icon',              color: '#6d4c41' },
  86: { id: 86, name: 'Menu',              color: '#7b1fa2' },
  92: { id: 92, name: 'Date control',      color: '#00838f' },
};

export const roleName = (id: RoleId | number): string =>
  (ROLES[id] && ROLES[id].name) || `Role ${id}`;

export const roleColor = (id: RoleId | number): string =>
  (ROLES[id] && ROLES[id].color) || '#607d8b';

/** Attributes captured from a DOM element (safe subset, serializable). */
export interface ControlAttributes {
  tagName: string;
  type?: string;
  role?: string;
  className?: string;
  id?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  placeholder?: string;
  title?: string;
  name?: string;
  value?: string;
  href?: string;
  alt?: string;
  checked?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  selected?: boolean;
  multiple?: boolean;
  contentEditable?: boolean;
  /** Arbitrary data-* attributes (camel-cased suffix → value). */
  data?: Record<string, string>;
  /** Short innerText snippet for preview / diagnostics. */
  text?: string;
}

/** XPath + CSS selector that uniquely locates a control on the page. */
export interface ControlLocation {
  xpath: string;
  cssSelector: string;
}

/** How the confidence score was derived — shown in the diagnostics panel. */
export interface ConfidenceBreakdown {
  tag: number | null;        // e.g. 95 — matched by tag name + type
  roleAttr: number | null;   // e.g. 88 — matched by role="" attribute
  klass: number | null;      // e.g. 76 — matched by class name
  framework: number | null;  // e.g. 90 — matched by framework-specific class
  aria: number | null;       // e.g. 70 — matched by ARIA attributes
}

/** A single control detected on the page. */
export interface DetectedControl {
  /** Unique instance id (used by the highlight overlay + popup table). */
  uid: string;
  role: RoleId;
  roleName: string;
  /** Overall confidence 0–100 (highest contributing signal). */
  confidence: number;
  confidenceBreakdown: ConfidenceBreakdown;
  attributes: ControlAttributes;
  /** Resolved human-readable label, if any. */
  label: string | null;
  /** Description of the label strategy that succeeded (diagnostics). */
  labelMethod: string;
  location: ControlLocation;
  /** Framework key detected for this element, e.g. "Angular Material". */
  framework: string | null;
  /** The framework class that triggered role detection, e.g. "mat-select". */
  frameworkClass: string | null;
  /** Human-readable reason this rule was generated (diagnostics). */
  reason: string;
  /** Parent container role, when the element lives inside a known container. */
  parentRole: RoleId | null;
  /** Visible text (for tables: the cell text). */
  displayText: string;
  /** Visible text of a neighbouring sibling / parent text node (brand/logo labels such as "ChatGPT"). */
  adjacentText?: string;
  /** Which label strategy found the label (diagnostics + label-rule generation). */
  labelStrategy: 'aria-label' | 'aria-labelledby' | 'label-for' | 'parent-label' | 'sibling-label' | 'nearest-text' | 'table-header' | 'form-group' | 'none';
  /** Pre-built traversal rule (wrapper → real control), discovered by content.ts. */
  traversalRule?: TraversalRule;
}

// ---------------------------------------------------------------------------
// Rule model — the intermediate representation from which IEAdaptor.xml is
// generated. Rules are deduplicated and merged before XML emission.
// ---------------------------------------------------------------------------

export type Operator = 'equals' | 'contains' | 'startswith' | 'endswith';

/** One <Condition> inside a tag-based rule. */
export interface TagCondition {
  /** Pipe-delimited tag list, e.g. "|INPUT|TEXTAREA|". */
  tagName: string;
  /** Pipe-delimited type list for input elements, e.g. "|TEXT|PASSWORD|". */
  type?: string;
}

/** RoleIdentifier rule matched purely by tag name (+ optional type list). */
export interface TagRule {
  currentRole: RoleId;
  parentRole: RoleId | null;
  conditions: TagCondition[];
  /** Human-readable origin, e.g. "input type=email on acme.com". */
  source: string;
  framework?: string;
  confidence: number;
}

/** RoleIdentifier rule matched by an attribute value (class, id, data-*, …). */
export interface AttributeRule {
  currentRole: RoleId;
  parentRole: RoleId | null;
  /** Attribute name as written in the XML: className, id, aria-label, data-* … */
  attribute: string;
  /** Values OR-ed together in one pipe-delimited Condition. */
  values: string[];
  operator: Operator;
  source: string;
  framework?: string;
  confidence: number;
}

/** One traversal step inside a TraversalInfo <Path>. */
export interface TraversalPath {
  /** PR | CH | PS | NS, or a compound like PS-CH (matching Epiplex syntax). */
  path: string;
  operator: 'simple' | 'recursive';
  /** Attribute filters for the traversal target, e.g. { TagName: 'input', type: 'checkbox' }. */
  attributes: Record<string, string>;
  /** Optional equality check on the target (Epiplex `Check` attribute). */
  check?: string;
}

/** RoleIdentifier rule anchored on a visible wrapper that must be traversed to find the real control. */
export interface TraversalRule {
  currentRole: RoleId;
  parentRole: RoleId | null;
  /** The condition that identifies the anchor element (wrapper / visual control). */
  condition: Condition;
  paths: TraversalPath[];
  source: string;
  framework?: string;
  confidence: number;
}

/** A match condition: tag list, type list and/or attribute value. */
export interface Condition {
  tagName?: string;     // pipe-delimited
  type?: string;        // pipe-delimited
  className?: string;   // pipe-delimited
  attribute?: string;   // e.g. data-comp-id, id, name
  value?: string;       // pipe-delimited value for `attribute`
  operator?: Operator;
}

/** LabelIdentifier — StandardLogic rule (id ↔ label[for] style associations). */
export interface StandardLabelRule {
  id: string;
  from: string;
  to: string;
  operator: Operator;
  reason: string;
}

/** LabelIdentifier — TraverseLogic rule (walk the DOM to find the label text). */
export interface TraverseLabelRule {
  id: string;
  role: RoleId;
  parentRole: RoleId | null;
  /** WhenToConsider attributes, e.g. { TagName: 'input' }. */
  attributes: Record<string, string>;
  /** WhereToGo paths. */
  paths: TraversalPath[];
  /** WhatToCall method, e.g. 'innerText'. */
  method: string;
  reason: string;
}

/** Full generation result handed to the XML writer. */
export interface RuleModel {
  basedOnTags: TagRule[];
  basedOnAttributes: AttributeRule[];
  basedOnTraverseLogic: TraversalRule[];
  standardLogic: StandardLabelRule[];
  traverseLogic: TraverseLabelRule[];
  /** Sites the rules were observed on (used for XML comments). */
  sites: string[];
  /** Diagnostics: every generated rule with its rationale. */
  diagnostics: DiagnosticEntry[];
}

/** One diagnostics row: a rule + why it was generated + test case + selectors. */
export interface DiagnosticEntry {
  kind: 'tag' | 'attribute' | 'traversal' | 'label-standard' | 'label-traverse';
  ruleId: string;
  role: RoleId;
  description: string;
  reason: string;
  confidence: number;
  framework?: string;
  /** Sample page instance this rule came from. */
  sampleSelector: string;
  sampleXPath: string;
  /** Generated unit-test snippet (JSDOM-style assertion). */
  testCase: string;
}

/** Scan request/response payloads exchanged between popup and content script. */
export interface ScanResponse {
  controls: DetectedControl[];
  frameworks: string[];
  url: string;
  title: string;
  timestamp: number;
}

// ---------------------------------------------------------------------------
// Framework detection
// ---------------------------------------------------------------------------

export interface FrameworkInfo {
  key: string;
  name: string;
  /** Class name fragments that identify the framework on a single element. */
  classPatterns: RegExp[];
  /** Page-level signals (meta tags, attributes, tag names). */
  pageSignals: RegExp[];
}

// ---------------------------------------------------------------------------
// Role mappings — configurable through roleMappings.json / settings
// ---------------------------------------------------------------------------

export interface FrameworkRoleMapping {
  /** Regex fragment matched against the element class attribute. */
  classPattern: string;
  role: RoleId;
  framework: string;
  /** Confidence bonus (e.g. 90). */
  confidence: number;
}

export interface AttributeRoleMapping {
  /** Attribute name: className, role, aria-haspopup, data-comp-id … */
  attribute: string;
  /** Regex fragment matched against the attribute value. */
  valuePattern: string;
  role: RoleId;
  confidence: number;
}

export interface RoleMappingConfig {
  /** Element that can be scanned and its container role, e.g. { 42: 10 }. */
  defaultParentRoles?: Record<string, number>;
  frameworkRoleMappings: FrameworkRoleMapping[];
  attributeRoleMappings: AttributeRoleMapping[];
  /** Extra input types → role overrides (e.g. type=range → 46). */
  inputTypeRoles?: Record<string, RoleId>;
  /** Extra tag → role overrides. */
  tagRoles?: Record<string, RoleId>;
}

// ---------------------------------------------------------------------------
// Compare / merge
// ---------------------------------------------------------------------------

export interface CompareResult {
  newRules: CompareRule[];
  modifiedRules: CompareRule[];
  duplicateRules: CompareRule[];
  obsoleteRules: CompareRule[];
  /** Rules present in the existing XML that match generated ones 1:1. */
  matched: number;
}

/** A rule with enough info to render in the compare table. */
export interface CompareRule {
  fingerprint: string;
  role: number;
  kind: 'tag' | 'attribute' | 'traversal' | 'label-standard' | 'label-traverse';
  description: string;
  inGenerated: boolean;
  inExisting: boolean;
}
