/**
 * frameworkDetector.ts — Smart framework detection.
 *
 * Detects the UI framework of the current page (page-level signals) and of
 * individual elements (class-name signals). The detected framework boosts
 * rule confidence and drives specialised rules (mat-*, slds-*, appmagic-*…).
 */
import type { FrameworkInfo } from './types';

/** Framework signature table. `classPatterns` are tested against the element
 *  className; `pageSignals` against the document (body classes, tags, attrs). */
export const FRAMEWORKS: FrameworkInfo[] = [
  {
    key: 'Angular Material',
    name: 'Angular Material',
    classPatterns: [/mat-[a-z-]+/, /matIcon/, /ng-star-inserted/],
    pageSignals: [/ng-version/, /ng-app/, /<app-[a-z-]+/i, /_nghost-/],
  },
  {
    key: 'React',
    name: 'React',
    classPatterns: [/react-combobox-view/, /react-select/, /react-datepicker/],
    pageSignals: [/data-reactroot/i, /_reactRootContainer/, /__reactFiber/],
  },
  {
    key: 'Vue',
    name: 'Vue',
    classPatterns: [/data-v-[a-f0-9]+/, /vue-/],
    pageSignals: [/data-v-[a-f0-9]+/, /__vue__/, /vue-root/],
  },
  {
    key: 'Salesforce Lightning',
    name: 'Salesforce Lightning',
    classPatterns: [/slds-[a-z-]+/, /lightning-[a-z-]+/, /force-[a-z-]+/],
    pageSignals: [/force-aloha/, /lightning-out/, /aura/],
  },
  {
    key: 'PowerApps',
    name: 'PowerApps',
    classPatterns: [/appmagic-[a-z-]+/, /powerapps-[a-z-]+/],
    pageSignals: [/appmagic-/, /powerapps/],
  },
  {
    key: 'SAP UI5',
    name: 'SAP UI5',
    classPatterns: [/ui5-[a-z-]+/, /sapM[A-Z][a-zA-Z]+/, /sapUi/],
    pageSignals: [/sap-ui-core/i, /sapUiView/, /ui5-/],
  },
  {
    key: 'Select2',
    name: 'Select2 (jQuery)',
    classPatterns: [/select2-[a-z-]+/],
    pageSignals: [/select2/],
  },
  {
    key: 'Bootstrap',
    name: 'Bootstrap',
    classPatterns: [/form-control/, /dropdown-toggle/, /\bbtn\b/, /nav-tabs/, /custom-select/],
    pageSignals: [/bootstrap/],
  },
  {
    key: 'PrimeNG',
    name: 'PrimeNG',
    classPatterns: [/p-(dropdown|checkbox|radiobutton|calendar|button|tabview|input)/],
    pageSignals: [/primeng/, /p-dropdown/],
  },
];

/** Page-level framework detection — scans the document once per scan. */
export function detectFrameworks(doc: Document): FrameworkInfo[] {
  const detected: FrameworkInfo[] = [];
  const haystack: string[] = [];
  if (doc.documentElement) {
    haystack.push(doc.documentElement.outerHTML.slice(0, 40000));
  }
  const meta = doc.querySelector('meta[ng-version]');
  if (meta) haystack.push('ng-version');
  if (doc.querySelector('#__next, #root[data-reactroot]')) haystack.push('data-reactroot');

  for (const fw of FRAMEWORKS) {
    const hit = fw.pageSignals.some((re) => haystack.some((h) => re.test(h)));
    if (hit) detected.push(fw);
  }
  // Merge overlapping entries (e.g. Angular Material + Select2 on one page).
  return detected;
}

/**
 * Framework for a single element, or null. Returns the first framework whose
 * class pattern matches. `frameworks` is the page-level detection result —
 * a page that does not have the framework flagged at page level still gets
 * per-element matches (framework class names are strong signals).
 */
export function detectElementFramework(
  el: Element,
  frameworks: FrameworkInfo[] | null
): { framework: string; classMatch: string | null } | null {
  const className = el.getAttribute('class') || '';
  const tagName = el.tagName.toLowerCase();
  const pool = frameworks && frameworks.length > 0 ? frameworks : FRAMEWORKS;
  for (const fw of pool) {
    const match = fw.classPatterns.find((re) => re.test(className) || re.test(tagName));
    if (match) {
      const m = className.match(match);
      return { framework: fw.name, classMatch: m ? m[0] : tagName };
    }
  }
  return null;
}
