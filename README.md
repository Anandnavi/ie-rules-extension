# Epiplex IE Rules Generator

A production-ready **Google Chrome / Microsoft Edge** extension (Manifest V3,
TypeScript) that scans any open web page, detects every interactive control,
maps it to an Epiplex role, and generates **IEAdaptor.xml** rules for
**Epiplex Capture / NetOn** — directly usable, matching the structure and
naming conventions of the reference `IEAdaptor.xml` (included in this repo).

---

## Features

| Area | What it does |
|---|---|
| **DOM scanning** | `input`, `textarea`, `button`, `select`, `option`, `a`, `img`, `svg`, `div`, `span`, `label`, `table`, `tr`, `td`, custom elements, **shadow DOM**, same-origin iframes |
| **Role detection** | Text box (42), Button (43), Checkbox (44), Radio (45), Dropdown (46), Option (34), Table cell (29), Row (28), Table (24), Link (30), Tab (37), Image (40), Text (41), Date (92), Icon (82), Menu item (12), Container (10) |
| **Confidence scoring** | 95 % tag · 88 % role attribute · 90–95 % framework class · 76 % generic class · 82 % ARIA — shown per rule and in the diagnostics panel |
| **Rule generation** | `BasedOnTags`, `BasedOnAttributes`, `BasedOnTraverseLogic` — unique rules only, duplicates merged automatically |
| **Label engine** | `label[for]`, `aria-labelledby`, `aria-label`, parent label, sibling label, nearest text node, table-header association, form-group association → `StandardLogic` + `TraverseLogic` |
| **Traversal engine** | PR / CH / PS / NS + recursive paths for Angular Material, React, Salesforce Lightning, PowerApps, SAP UI5, Select2, Bootstrap, Material UI, PrimeNG, custom checkboxes/radios/dropdowns, SVG controls, nested div controls |
| **Framework detection** | Angular, React, Vue, Salesforce, PowerApps, SAP UI5 (page-level + per-element), drives specialised `mat-*`, `slds-*`, `appmagic-*`, `ui5-*`, `select2-*`, `react-combobox-*` rules |
| **Compare mode** | Upload an existing `IEAdaptor.xml` → see **new / modified / duplicate / obsolete** rules |
| **Merge mode** | Merges generated rules into the existing XML — preserves formatting and comments, avoids duplicates |
| **Visual inspection** | Colour-coded overlay per role; hover shows Tag, Role, Label, Attributes, Generated rule, CSS selector, XPath |
| **Step sentences** | Human-readable "Click &lt;name&gt; button/link/Icon/logo." per control — names never use CSS classes (utility classes like `text-*`, `h-*`, `bg-*` are filtered) and follow a fixed priority: visible text → aria-label → title → alt → associated label → parent/sibling text → brand/logo text → fallback |
| **Live capture** | `MutationObserver` — re-scans on AJAX / React updates / Angular rendering / SPA navigation |
| **Export** | `Copy XML`, `Download IEAdaptor.xml`, GPS sample mappings, generated test cases |

## Architecture

```
manifest.json            MV3 manifest (content script, popup, service worker)
popup.html / styles.css  Popup UI (Scan, Rules, XML, Compare, Settings tabs)
src/
  content.ts             DOM scan, shadow DOM, iframes, highlight overlay, MutationObserver, traversal discovery
  background.ts          Service worker — download relay, active-tab helper
  popup.ts               Popup controller — rule pipeline, compare/merge UI, settings
  ruleEngine.ts          detectControlRole(), extractAttributes(), buildTagRule(),
                         buildAttributeRule(), deduplicateRules(), generateRuleModel()
  labelEngine.ts         findLabel() + StandardLogic/TraverseLogic label rules + missing-label suggestions
  stepSentence.ts        Human-readable control names + "Click <name> button/link/Icon/logo." step sentences
  traversalEngine.ts     buildTraversalRule() + traversal rule collection + improvement suggestions
  frameworkDetector.ts   Page-level + per-element framework detection
  xmlGenerator.ts        generateXML(), validateXML(), GPS mappings, test-case generation
  compareEngine.ts       parseExistingRules(), compareRules(), mergeXML() (text-level, comment-safe)
  settings.ts            Settings persistence + configurable role mappings
  roleMappings.json      Configurable role mappings (import overrides from the Settings tab)
  types.ts               Shared type model (roles, rules, compare result)
scripts/generate-icons.mjs  Pure-Node PNG icon generator (no deps)
examples/                Angular Material, React, Salesforce Lightning, PowerApps test pages
tests/run-tests.mjs      Node test suite (jsdom + esbuild)
```

The rule engine is **DOM-light**: `detectControlRole`/`extractAttributes` operate
on a minimal `ElementLike` surface, so the same code runs in the content script
and in the Node test suite.

## Build

Prerequisites: Node.js ≥ 18.

```bash
npm install            # esbuild + typescript + jsdom (dev only)
npm run build          # bundles dist/ (content.js, background.js, popup.js, popup.html, styles.css, manifest.json, icons)
npm run lint           # tsc --noEmit type check
npm test               # build + run the full test suite (87 assertions)
npm run build:watch    # rebuild on change
```

## Install in Chrome / Edge

1. Run `npm run build` — bundles are written to the **project root**
   (`content.js`, `background.js`, `popup.js` next to `manifest.json`,
   `popup.html`, `styles.css`, `icons/`) and mirrored into `dist/`.
2. Open `chrome://extensions` (Chrome) or `edge://extensions` (Edge).
3. Enable **Developer mode**.
4. **Load unpacked** → select the project root folder (or `dist/` if you
   prefer a clean copy). Both locations load.
5. Pin the extension, open any web page, click the **IE** icon.

> ⚠️ The load fails with *"Could not load javascript content.js"* if you load
> the folder **before** running `npm run build` (the bundles don't exist yet)
> or a folder that only contains `manifest.json`. Always build first, then load
> the project root or `dist/`.

> Tip: open `examples/angular-material.html` (or the other example pages) via
> File → Open File, or serve them locally, and scan them to see framework rules
> in action.

## Usage

1. **Scan page** — detects controls, frameworks, and shows the diagnostics panel
   (why each rule was generated, missing-label suggestions, XPath/CSS selectors).
2. **Highlight** — draws colour-coded boxes on the page; hover for details.
3. **Rules** — filter by kind (BasedOnTags / BasedOnAttributes / TraverseLogic /
   label rules), search, per-rule confidence + source.
4. **Scan tab** — the controls table shows a **Step sentence** column
   ("Click Save button.", "Click ChatGPT Icon.") and **📋 Copy step sentences**
   exports them all; names are derived by priority and never contain CSS
   classes — utility classes (`text-*`, `bg-*`, `h-*`, `w-*`, `p-*`, `m-*`,
   `opacity-*`, `duration-*`, `transition-*`, `flex`, `grid`, `rounded`,
   `shadow`, `hover:*`, `focus:*`, `dark:*`, `md:*`, `lg:*`, `xl:*`) are
   ignored, and each sentence matches the human-readable step description.
5. **XML** — pretty-printed IEAdaptor.xml with validation status; copy,
   download, GPS mappings (also uses the clean control names), generated test cases.
6. **Compare** — upload your existing `IEAdaptor.xml`; see new / modified /
   duplicate / obsolete rules; **Merge** splices only new rules in while
   preserving your formatting and comments.
7. **Settings** — per-framework toggles, minimum confidence, traversal/label
   rule switches, and the configurable role-mapping JSON.

## Role reference

| Role | Epiplex meaning | Detected from |
|---|---|---|
| 42 | Text box | `input` (text/password/email/tel/number/url/search/file/color), `textarea` |
| 92 | Date control | `input[type=date|time|datetime-local|month|week]`, `mat-datepicker`, `slds-datepicker`, `appmagic-datepicker`, `data-*date*` |
| 44 | Checkbox | `input[type=checkbox]`, `mat-checkbox`, `mat-slide-toggle`, `slds-checkbox`, `appmagic-checkbox` |
| 45 | Radio button | `input[type=radio]`, `mat-radio-*`, `slds-radio`, `appmagic-radio` |
| 46 | Dropdown | `select`, `mat-select`, `select2-*`, `react-combobox-view`, `slds-combobox`, `ui5-select`, `p-dropdown`, `role=combobox/listbox` |
| 34 | List item / option | `li`, `option`, `mat-option`, `select2-results__option`, `react-combobox-option` |
| 43 | Button | `button`, `input[type=submit|reset|button|image]`, `mat-button*`, `slds-button`, `appmagic-button`, `btn` |
| 30 | Link | `a`, `area`, `role=link` |
| 37 | Tab | `mat-tab-label`, `slds-tabs`, `nav-tabs`, `role=tab`, `PGTAB` |
| 40 | Image | `img`, `role=img` |
| 41 | Text | `div`, `span`, `label`, `p`, `h1–h6`, `td` text… |
| 24 / 28 / 29 | Table / row / cell | `table`, `tr`, `td`/`th`, `mat-calendar-body-cell`, `uiDayInMonthCell` |
| 82 | Icon | `svg`, `i`, `mat-icon` |
| 12 | Menu item | `menuitem`, `mat-menu-item`, `role=menuitem` |
| 10 | Container | `form`, `fieldset`, `nav`, `section`, `article`… |

## Configurable role mappings

`src/roleMappings.json` is the default mapping table. From the **Settings** tab
you can import an override JSON (arrays are replaced wholesale). Schema:

```jsonc
{
  "frameworkRoleMappings": [
    { "classPattern": "\\bmy-widget\\b", "role": 46, "framework": "My Framework", "confidence": 90 }
  ],
  "attributeRoleMappings": [
    { "attribute": "data-role", "valuePattern": "picker", "role": 92, "confidence": 84 }
  ],
  "inputTypeRoles": { "range": 46 },
  "tagRoles": { "my-input": 42 }
}
```

- `classPattern` / `valuePattern` are regex fragments matched against the
  class / attribute value; the **highest-confidence, longest** match wins.
- Future Epiplex roles are just new entries — no code changes needed.

## Generated XML

```xml
<?xml version="1.0" encoding="utf-8"?>
<IEFilters ExcludedDomain="">
  <General Enable="1" QueryHeader="0" QueryTag="H1">
    <RoleIdentifier>
      <BasedOnTags>
        <Rule Enable="1" CurrentRole="42" ParentRole="10">
          <CurrentInfo>
            <Condition TagName="|INPUT|" Type="|TEXT|email|"/>
          </CurrentInfo>
        </Rule>
      </BasedOnTags>
      <BasedOnAttributes>…</BasedOnAttributes>
      <BasedOnTraverseLogic>
        <Rule Enable="1" CurrentRole="42" ParentRole="10">
          <CurrentInfo><Condition className="|mat-form-field|" Operator="contains"/></CurrentInfo>
          <TraversalInfo><Path Path="CH"><Condition Operator="recursive"><Attributes TagName="input"/></Condition></Path></TraversalInfo>
        </Rule>
      </BasedOnTraverseLogic>
    </RoleIdentifier>
    <LabelIdentifier rolesforrectandielogic="42|44|45|46|33|34">
      <StandardLogic>…</StandardLogic>
      <TraverseLogic>…</TraverseLogic>
      <DefaultLogic>…</DefaultLogic>
    </LabelIdentifier>
  </General>
</IEFilters>
```

Tabs, attribute order (`TagName`→`Type`, `Operator`→attribute), pipe-delimited
value lists (`|TEXT|email|`), and comment conventions mirror the bundled
reference `IEAdaptor.xml` so the output drops straight into Epiplex.

## Testing

`npm test` builds a Node bundle of the pure engines and runs 87 assertions:

- role detection table (tag / type / role attr / framework class / ARIA / defaults)
- widget-class overrides (`input[type=text].datepicker` → 92, `slds-combobox__input` → 46)
- attribute extraction incl. `data-*`
- tag-rule building + dedup/merge (type lists unioned, max confidence)
- full pipeline on all four example pages (jsdom): scan → model → XML → validate
- compare + merge against the real `IEAdaptor.xml` (coverage-aware, comment-safe)

## License

Internal tooling — free to use within your organisation.
