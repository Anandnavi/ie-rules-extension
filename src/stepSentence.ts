/**
 * stepSentence.ts — Human-readable control naming + step-sentence generation.
 *
 * Rules enforced here:
 *   - CSS class names are NEVER used as a control name.
 *   - Utility/framework classes (Tailwind-style: text-*, bg-*, h-*, w-*, p-*,
 *     m-*, opacity-*, duration-*, transition-*, flex, grid, rounded, shadow,
 *     hover:*, focus:*, dark:*, md:*, lg:*, xl:*) are ignored.
 *   - For clickable elements the name is resolved by priority:
 *       1. Visible text (innerText)
 *       2. aria-label
 *       3. title
 *       4. alt
 *       5. Associated label
 *       6. Parent or sibling visible text
 *       7. Brand / logo text (adjacent text, e.g. "ChatGPT")
 *       8. Generic fallback
 *   - Step sentences: "Click <Name> button/link.", "Click <Name> Icon.",
 *     "Click <Name> logo." — the name inside the sentence always matches the
 *     human-readable step description.
 */
import type { DetectedControl } from './types';

/** Utility / framework class patterns that must never leak into control names. */
const UTILITY_PATTERNS: RegExp[] = [
  /^text-/i, /^bg-/i, /^h-/i, /^w-/i, /^p-/i, /^m-/i,
  /^opacity-/i, /^duration-/i, /^transition-/i,
  /^flex$/i, /^grid$/i, /^rounded/i, /^shadow/i,
  /^hover:/i, /^focus:/i, /^dark:/i,
  /^md:/i, /^lg:/i, /^xl:/i, /^sm:/i, /^2xl:/i,
  /^(relative|absolute|fixed|sticky)$/i,
  /^(block|inline|inline-block|hidden)$/i,
  /^(border|border-.*)$/i,
];

/** True when a whitespace-separated token is a utility/framework class. */
export function isUtilityClass(token: string): boolean {
  const t = token.trim();
  if (!t) return false;
  return UTILITY_PATTERNS.some((re) => re.test(t));
}

/** Collapse whitespace, trim quotes/brackets, cap length. Returns null when unusable. */
function cleanName(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw
    .replace(/\s+/g, ' ')
    .replace(/^[\s"'“”‘’([{]+|[\s"'“”‘’)\]}]+$/g, '')
    .trim();
  if (!cleaned || cleaned.length < 1) return null;
  return cleaned.length > 48 ? cleaned.slice(0, 47).trimEnd() + '…' : cleaned;
}

/** Reject names that consist entirely of utility classes (defensive guard). */
function usableName(raw: string | null | undefined): string | null {
  const name = cleanName(raw);
  if (!name) return null;
  const tokens = name.split(/\s+/);
  if (tokens.length > 0 && tokens.every(isUtilityClass)) return null;
  return name;
}

export type ClickKind =
  | 'button' | 'link' | 'icon' | 'logo'
  | 'checkbox' | 'radio' | 'dropdown' | 'textbox' | 'date' | 'tab' | 'other';

/** Which sentence template a control uses. */
export function clickKind(c: DetectedControl): ClickKind {
  const tag = c.attributes.tagName;
  const role = c.attributes.role;
  const cls = c.attributes.className || '';
  const isLogo = /logo|brand/i.test(cls);

  if (role === 'button' || tag === 'button' || c.role === 43) return 'button';
  if (tag === 'a' || role === 'link' || c.role === 30) return 'link';
  if (c.role === 82 || tag === 'svg' || tag === 'i' || tag === 'mat-icon') return isLogo ? 'logo' : 'icon';
  if (tag === 'img') return isLogo ? 'logo' : 'icon';
  if (c.role === 44) return 'checkbox';
  if (c.role === 45) return 'radio';
  if (c.role === 46) return 'dropdown';
  if (c.role === 42) return 'textbox';
  if (c.role === 92) return 'date';
  if (c.role === 37) return 'tab';
  return 'other';
}

/**
 * Resolve the human-readable control name using the documented priority.
 * CSS class names are never used.
 */
export function computeControlName(c: DetectedControl): string {
  const a = c.attributes;

  // 1. Visible text (innerText / textContent of the element itself).
  const visible = usableName(c.displayText);
  if (visible) return visible;

  // 2. aria-label
  const aria = usableName(a.ariaLabel);
  if (aria) return aria;

  // 3. title
  const title = usableName(a.title);
  if (title) return title;

  // 4. alt
  const alt = usableName(a.alt);
  if (alt) return alt;

  // 5. Associated label (label[for], parent label, form-group…)
  const label = usableName(c.label);
  if (label) return label;

  // 6. Parent or sibling visible text
  const adjacent = usableName(c.adjacentText);
  if (adjacent) return adjacent;

  // 7. Brand / logo text — same adjacent-text source as #6; already tried.
  // 8. Generic fallback — never a class name.
  return 'element';
}

/** The human-readable step description (control name). */
export function stepDescription(c: DetectedControl): string {
  return computeControlName(c);
}

/** The full step sentence, e.g. "Click Save button." or "Click ChatGPT Icon.". */
export function generateStepSentence(c: DetectedControl): string {
  const name = computeControlName(c);
  switch (clickKind(c)) {
    case 'button':  return `Click ${name} button.`;
    case 'link':    return `Click ${name} link.`;
    case 'icon':    return `Click ${name} Icon.`;
    case 'logo':    return `Click ${name} logo.`;
    case 'checkbox': return `Check ${name} checkbox.`;
    case 'radio':   return `Select ${name} radio.`;
    case 'dropdown': return `Select ${name} dropdown.`;
    case 'textbox': return `Type into ${name} textbox.`;
    case 'date':    return `Pick date in ${name}.`;
    case 'tab':     return `Click ${name} tab.`;
    default:        return `Click ${name}.`;
  }
}
