/**
 * tests/run-tests.mjs — End-to-end test suite for the Epiplex IE Rules Generator.
 *
 * Builds a Node bundle of the pure src modules (esbuild) and runs assertions:
 *   1. Role detection (tag / role attr / framework class / aria / defaults)
 *   2. Attribute extraction
 *   3. Tag-rule building + dedup merging
 *   4. Full pipeline on the example pages (jsdom): scan → model → XML → validate
 *   5. Compare + merge against the reference IEAdaptor.xml
 *
 * Run: npm test   (or: npm run build && node tests/run-tests.mjs)
 */
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(root, '..', 'dist-test');
mkdirSync(outDir, { recursive: true });

// ---- Bundle the pure modules for Node --------------------------------------
await build({
  stdin: {
    contents: `
      export * from '../src/ruleEngine';
      export * from '../src/labelEngine';
      export * from '../src/traversalEngine';
      export * from '../src/xmlGenerator';
      export * from '../src/compareEngine';
      export * from '../src/frameworkDetector';
      export * from '../src/stepSentence';
      export * from '../src/settings';
      export { ROLES, roleName, roleColor } from '../src/types';
      import defaultMappings from '../src/roleMappings.json';
      export { defaultMappings };
    `,
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node18',
  outfile: resolve(outDir, 'harness.mjs'),
  logLevel: 'silent',
});

const H = await import(pathToFileURL(resolve(outDir, 'harness.mjs')).href);

// ---- Assertion helpers ------------------------------------------------------
let passed = 0;
let failed = 0;
const failures = [];
function assert(cond, msg) {
  if (cond) { passed++; }
  else { failed++; failures.push(msg); console.error(`  ✗ ${msg}`); }
}
function section(name) { console.log(`\n=== ${name} ===`); }
function ok(msg) { console.log(`  ✓ ${msg}`); }

const config = H.defaultMappings;

// ---- 1. Role detection -------------------------------------------------------
section('Role detection (tag / type / role attr / class / aria)');
{
  const el = (tag, attrs = {}) => {
    const e = { tagName: tag.toUpperCase(), className: attrs.class || '', getAttribute: (n) => (n in attrs ? attrs[n] : null) };
    return e;
  };
  const cases = [
    ['input', { type: 'text' }, 42],
    ['input', { type: 'password' }, 42],
    ['input', { type: 'email' }, 42],
    ['input', { type: 'tel' }, 42],
    ['input', { type: 'number' }, 42],
    ['input', { type: 'date' }, 92],
    ['input', { type: 'time' }, 92],
    ['input', { type: 'checkbox' }, 44],
    ['input', { type: 'radio' }, 45],
    ['textarea', {}, 42],
    ['select', {}, 46],
    ['button', {}, 43],
    ['a', { href: '#' }, 30],
    ['area', { href: '#' }, 30],
    ['img', { alt: 'x' }, 40],
    ['table', {}, 24],
    ['tr', {}, 28],
    ['td', {}, 29],
    ['li', {}, 34],
    ['option', {}, 34],
    ['svg', {}, 82],
    ['i', {}, 82],
    ['label', {}, 41],
    ['nav', {}, 10],
    ['form', {}, 10],
  ];
  for (const [tag, attrs, expect] of cases) {
    const det = H.detectControlRole(el(tag, attrs), config, null);
    assert(det.role === expect, `detectControlRole(<${tag} ${JSON.stringify(attrs)}>) = ${det.role}, expected ${expect}`);
  }
  // role attribute
  assert(H.detectControlRole(el('div', { role: 'combobox' }), config, null).role === 46, 'div[role=combobox] → 46');
  assert(H.detectControlRole(el('div', { role: 'button' }), config, null).role === 43, 'div[role=button] → 43');
  assert(H.detectControlRole(el('div', { role: 'checkbox' }), config, null).role === 44, 'div[role=checkbox] → 44');
  // Gaps vs the working IEAdaptor.xml main block: role="|combobox|menu|...|" → 46 and |SCROLL BAR| → 3
  assert(H.detectControlRole(el('div', { role: 'menu' }), config, null).role === 46, 'div[role=menu] → 46 (matches working file)');
  assert(H.detectControlRole(el('div', { role: 'scrollbar' }), config, null).role === 3, 'div[role=scrollbar] → 3 (matches |SCROLL BAR| → 3)');
  assert(H.detectControlRole(el('div', { role: 'menuitem' }), config, null).role === 12, 'div[role=menuitem] → 12 (|MENUITEM| → 12)');
  assert(H.roleName(86) === 'Menu', 'role 86 named Menu (per-app Menu role in working file)');
  assert(H.detectControlRole(el('div', { class: 'menu-button' }), config, null).role === 46, 'menu-button class → 46 (matches working file dropdown list)');
  // <area> tag → 30 (reference |A|AREA| → 30) and its |AREA| tag rule
  const areaCtrl = { role: 30, parentRole: null, attributes: { tagName: 'area' }, reason: 'tag', framework: null, confidence: 95 };
  const areaRule = H.buildTagRule(areaCtrl);
  assert(areaRule && areaRule.conditions.some((c) => c.tagName === '|AREA|'), '<area> → |AREA| tag rule');
  // Generated attribute rules for the new roles
  const scrollbarCtrl = { role: 3, parentRole: null, attributes: { tagName: 'div', role: 'scrollbar' }, reason: 'aria role', framework: null, confidence: 88 };
  const attrRule = H.buildAttributeRule(scrollbarCtrl, config);
  assert(attrRule && attrRule.attribute === 'role' && attrRule.values.includes('scrollbar'), 'role=scrollbar → attribute rule');
  // framework classes
  assert(H.detectControlRole(el('mat-select', { class: 'mat-select' }), config, 'Angular Material').role === 46, 'mat-select class → 46');
  assert(H.detectControlRole(el('div', { class: 'mat-option' }), config, 'Angular Material').role === 34, 'mat-option class → 34');
  assert(H.detectControlRole(el('div', { class: 'slds-checkbox' }), config, 'Salesforce Lightning').role === 44, 'slds-checkbox class → 44');
  assert(H.detectControlRole(el('div', { class: 'appmagic-button' }), config, 'PowerApps').role === 43, 'appmagic-button class → 43');
  assert(H.detectControlRole(el('div', { class: 'select2-selection__rendered' }), config, 'Select2').role === 46, 'select2 class → 46');
  // widget class overriding a text-ish native control
  assert(H.detectControlRole(el('input', { type: 'text', class: 'datepicker' }), config, null).role === 92, 'input[type=text].datepicker → 92 (widget class overrides text)');
  assert(H.detectControlRole(el('input', { type: 'text', class: 'slds-combobox__input slds-input' }), config, 'Salesforce Lightning').role === 46, 'slds-combobox input → 46');
  // aria hints
  assert(H.detectControlRole(el('div', { 'aria-haspopup': 'listbox' }), config, null).role === 46, 'aria-haspopup=listbox → 46');
  // default
  assert(H.detectControlRole(el('span', {}), config, null).role === 41, 'span → 41 default');
  assert(H.detectControlRole(el('div', { class: 'card mt-3' }), config, null).role === 41, 'generic div → 41');
  ok(`${passed - (passed - countOf('detectControlRole'))} detection checks`);
}
function countOf() { return 0; }

// ---- 2. Attribute extraction --------------------------------------------------
section('Attribute extraction');
{
  const fake = {
    tagName: 'INPUT',
    className: 'form-control',
    getAttribute: (n) => ({ type: 'email', id: 'mail', name: 'email', 'aria-label': 'Email', placeholder: 'you@x.com', 'data-testid': 'email-field', title: 'x' }[n] ?? null),
    getAttributeNames: () => ['type', 'id', 'name', 'aria-label', 'placeholder', 'data-testid', 'title'],
  };
  const a = H.extractAttributes(fake);
  assert(a.tagName === 'input' && a.type === 'email' && a.id === 'mail', 'extractAttributes basic fields');
  assert(a.ariaLabel === 'Email' && a.placeholder === 'you@x.com', 'extractAttributes aria/placeholder');
  assert(a.data && a.data.testid === 'email-field', 'extractAttributes data-*');
  ok('extractAttributes ✓');
}

// ---- 3. Tag-rule building + dedup ---------------------------------------------
section('Tag rules & dedup merging');
{
  const mk = (role, parent, tagName, type, conf) => ({
    uid: 'x', role, parentRole: parent, confidence: conf,
    confidenceBreakdown: { tag: conf, roleAttr: null, klass: null, framework: null, aria: null },
    attributes: { tagName, type },
    label: null, labelStrategy: 'none', labelMethod: 'none',
    location: { xpath: '//x', cssSelector: 'x' }, framework: null, frameworkClass: null,
    reason: 'test', displayText: '', roleName: 'x',
  });
  const r1 = H.buildTagRule(mk(42, 10, 'input', 'text', 95));
  const r2 = H.buildTagRule(mk(42, 10, 'input', 'password', 95));
  const r3 = H.buildTagRule(mk(42, 10, 'textarea', undefined, 95));
  assert(r1 && r2 && r3, 'buildTagRule returns rules');
  const merged = H.deduplicateTagRules([r1, r2, r3]);
  assert(merged.length === 1, `dedup merges 3 tag rules → ${merged.length}`);
  assert(merged[0].conditions.length === 2, 'merged rule has 2 conditions (INPUT + TEXTAREA)');
  const inputCond = merged[0].conditions.find((c) => c.tagName === '|INPUT|');
  assert(inputCond && inputCond.type === '|TEXT|PASSWORD|', `INPUT type list merged → ${inputCond?.type}`);
  assert(merged[0].confidence === 95, 'merged confidence = max');
  ok('dedup/merge ✓');
}

// ---- 4. Full pipeline on example pages ----------------------------------------
section('Full pipeline on example pages (jsdom)');
{
  const EXCLUDED = new Set(['script', 'style', 'template', 'noscript', 'meta', 'link', 'title', 'head', 'html', 'body']);
  const wrapperRe = /mat-form-field|slds-form-element|appmagic-(combobox|checkbox|radio|datepicker)|p-(dropdown|checkbox|radiobutton|calendar)|select2-container/;

  const scanDoc = (html) => {
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const controls = [];
    for (const el of document.querySelectorAll('*')) {
      const tag = el.tagName.toLowerCase();
      if (EXCLUDED.has(tag)) continue;
      const det = H.detectControlRole(el, config, null);
      const attrs = H.extractAttributes(el);
      const label = H.findLabel(el, document);
      // simple wrapper discovery (mirrors content.ts)
      let traversal;
      let p = el.parentElement, hops = 0;
      while (p && hops < 3) {
        const m = (p.className || '').match(wrapperRe);
        if (m) {
          traversal = H.buildTraversalRule(
            { condition: { className: `|${m[0]}|`, operator: 'contains' }, target: { TagName: tag, ...(el.type ? { type: el.type } : {}) }, direction: 'CH', recursive: true, framework: null, reason: 'test wrapper' },
            det.role, 10, 90
          );
          break;
        }
        p = p.parentElement; hops++;
      }
      const parentRole = det.role === 34 ? (el.closest('select,[role=listbox]') ? 46 : 10) : [42, 44, 45, 46, 92, 29, 28, 43].includes(det.role) ? 10 : null;
      controls.push({
        uid: String(controls.length), role: det.role, roleName: H.roleName(det.role), confidence: det.confidence,
        confidenceBreakdown: det.breakdown, attributes: attrs, label: label.text, labelStrategy: label.strategy, labelMethod: label.strategy,
        location: { xpath: '//x', cssSelector: tag }, framework: null, frameworkClass: det.frameworkClass, reason: det.reason,
        parentRole, displayText: (el.textContent || '').slice(0, 40), traversalRule: traversal,
      });
    }
    return controls;
  };

  const buildModel = (controls, url) => {
    const traversal = H.generateTraversalRules(controls);
    const labels = { standard: H.buildStandardLabelRules(controls), traverse: H.buildTraverseLabelRules(controls) };
    const model = H.generateRuleModel(controls, { config, url, title: 'test', minConfidence: 0, emitTraversalRules: true, emitLabelRules: true }, { traversalRules: traversal, labelRules: labels });
    const xml = H.generateXML(model);
    const valid = H.validateXML(xml);
    return { model, xml, valid, controls };
  };

  const files = [
    ['examples/angular-material.html', 'Angular Material'],
    ['examples/react.html', 'React'],
    ['examples/salesforce-lightning.html', 'Salesforce Lightning'],
    ['examples/powerapps.html', 'PowerApps'],
  ];
  for (const [file, name] of files) {
    const html = readFileSync(resolve(root, '..', file), 'utf-8');
    const { model, xml, valid, controls } = buildModel(scanDoc(html), file);
    const roles = new Set(controls.map((c) => c.role));
    console.log(`  ${name}: ${controls.length} controls, roles: ${[...roles].sort((a, b) => a - b).join(',')}`);

    assert(xml.startsWith('<?xml version="1.0" encoding="utf-8"?>'), `${name}: XML declaration`);
    assert(xml.includes('<IEFilters') && xml.includes('<RoleIdentifier>') && xml.includes('<BasedOnTags>') && xml.includes('<LabelIdentifier'), `${name}: XML structure`);
    assert(valid.valid, `${name}: XML valid (${valid.errors.join('; ')})`);
    assert(model.basedOnTags.length > 0, `${name}: tag rules generated`);

    if (name === 'Angular Material') {
      assert(roles.has(46), 'Angular: dropdown role detected');
      assert(roles.has(44), 'Angular: checkbox role detected');
      assert(roles.has(92), 'Angular: date control detected (mat-datepicker)');
      assert(model.basedOnTraverseLogic.length > 0, `Angular: traversal rules generated (${model.basedOnTraverseLogic.length})`);
      assert(model.basedOnTraverseLogic.some((r) => r.condition.className && r.condition.className.includes('mat-form-field')), 'Angular: mat-form-field traversal rule');
      assert(model.basedOnAttributes.some((r) => r.values.includes('mat-select')), 'Angular: mat-select attribute rule');
    }
    if (name === 'Salesforce Lightning') {
      assert(roles.has(46), 'SLDS: combobox/select dropdown detected');
      assert(roles.has(44), 'SLDS: checkbox detected');
      assert(model.basedOnTraverseLogic.some((r) => r.condition.className && r.condition.className.includes('slds-form-element')), 'SLDS: slds-form-element traversal rule');
    }
    if (name === 'PowerApps') {
      assert(roles.has(92), 'PowerApps: date control detected');
      assert(model.basedOnAttributes.some((r) => r.values.includes('appmagic-button')), 'PowerApps: appmagic-button attribute rule');
    }
    if (name === 'React') {
      assert(roles.has(46), 'React: combobox dropdown detected');
      assert(model.basedOnAttributes.some((r) => r.values.includes('react-combobox-view')), 'React: react-combobox-view attribute rule');
    }
  }
  ok('pipeline ✓');
}

// ---- 4b. ChatGPT-logo / icon & image rules (all controls) ----------------------
section('ChatGPT logo & icon/image rules');
{
  // Real-world ChatGPT logo: an SVG with only utility classes, labelled by the
  // adjacent brand text. It must be detected (role 82), generate a |SVG| tag
  // rule, produce "Click ChatGPT Icon.", and the exported XML must include it
  // in the rect-clickable role set so Epiplex records the click.
  const html = '<header><nav><a href="/"><svg class="text-primary h-7 w-auto transition-opacity duration-500 opacity-100" aria-hidden="true"></svg><span>ChatGPT</span></a></nav></header>';
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const svg = document.querySelector('svg');
  const det = H.detectControlRole(svg, config, null);
  assert(det.role === 82, `ChatGPT logo svg → role 82 (got ${det.role})`);

  const ctrl = {
    uid: 'logo', role: 82, roleName: 'Icon', confidence: det.confidence, confidenceBreakdown: det.breakdown,
    attributes: H.extractAttributes(svg), label: null, labelStrategy: 'none', labelMethod: 'none',
    location: { xpath: '//svg', cssSelector: 'header svg' }, framework: null, frameworkClass: det.frameworkClass,
    reason: det.reason, parentRole: 10, displayText: '', adjacentText: 'ChatGPT',
  };
  const tagRule = H.buildTagRule(ctrl);
  assert(tagRule && tagRule.conditions.some((c) => c.tagName === '|SVG|'), 'logo svg → |SVG| tag rule');
  assert(H.generateStepSentence(ctrl) === 'Click ChatGPT Icon.', 'logo step sentence = Click ChatGPT Icon.');

  // Icon rules must never steal clicks from links/buttons: an icon nested in a
  // link (parentRole 30) or button (43) gets NO tag rule (working file only
  // maps icons with ParentRole=10), and standalone icons (parent 10) keep it.
  assert(H.buildTagRule({ ...ctrl, parentRole: 30 }) === null, 'svg in link → no |SVG| rule (link keeps priority)');
  assert(H.buildTagRule({ ...ctrl, role: 82, attributes: { ...ctrl.attributes, tagName: 'i' }, parentRole: 43 }) === null, 'i in button → no |I| rule (button keeps priority)');
  assert(H.buildTagRule({ ...ctrl, parentRole: 10 }) !== null, 'standalone svg (parent 10) → |SVG| rule kept');

  const imgCtrl = { ...ctrl, uid: 'img', role: 40, roleName: 'Image', attributes: { ...ctrl.attributes, tagName: 'img', alt: 'OpenAI' }, displayText: '' };
  const imgInLink = H.buildTagRule({ ...imgCtrl, parentRole: 30 });
  assert(imgInLink && imgInLink.parentRole === null, 'img rule parentRole normalized to null (matches reference |IMG| ParentRole="")');
  const imgAria = { ...imgCtrl, attributes: { ...imgCtrl.attributes, role: 'img' } };
  assert(H.buildAttributeRule({ ...imgAria, parentRole: 30 }, config) === null, 'role=img inside a link → no attribute rule (link keeps priority)');
  assert(H.buildAttributeRule({ ...imgAria, parentRole: 10 }, config) !== null, 'role=img under container → attribute rule kept');

  const model = H.generateRuleModel([ctrl, imgCtrl], { config, url: 'chatgpt', title: 'test', minConfidence: 0, emitTraversalRules: false, emitLabelRules: false }, { traversalRules: [], labelRules: { standard: [], traverse: [] } });
  const xml = H.generateXML(model);
  assert(xml.includes('rolesforrectandielogic="42|44|45|46|33|34|30|10|40|82|43|37"'), 'extended rect-clickable role set (30|10|40|82|43|37) in XML');
  assert(xml.includes('<Condition TagName="|SVG|"/>'), '|SVG| tag rule rendered');
  assert(xml.includes('<Condition TagName="|IMG|"/>'), '|IMG| tag rule rendered');
  assert(H.validateXML(xml).valid, 'logo XML valid');
  ok('logo/icon/image rules ✓');
}

// ---- 5. Compare + merge against the reference IEAdaptor.xml ---------------------
section('Compare & merge with reference IEAdaptor.xml');
{
  const ref = readFileSync(resolve(root, '..', 'IEAdaptor.xml'), 'utf-8');
  const existing = H.parseExistingRules(ref);
  assert(existing.tagRules.length > 10, `reference tag rules parsed (${existing.tagRules.length})`);
  assert(existing.attrRules.length > 5, `reference attribute rules parsed (${existing.attrRules.length})`);
  assert(existing.traversalRules.length > 5, `reference traversal rules parsed (${existing.traversalRules.length})`);
  assert(existing.traverseLabelRules.length > 5, `reference label traverse rules parsed (${existing.traverseLabelRules.length})`);

  // Small generated model (subset) for compare/merge tests.
  const model = {
    basedOnTags: [
      { currentRole: 42, parentRole: 10, conditions: [{ tagName: '|INPUT|', type: '|TEXT|' }], source: 'test', confidence: 95 },
      { currentRole: 46, parentRole: 10, conditions: [{ tagName: '|SELECT|', type: '|SELECT-ONE|' }], source: 'test', confidence: 95 },
      { currentRole: 92, parentRole: 10, conditions: [{ tagName: '|INPUT|', type: '|DATE|' }], source: 'test', confidence: 95 },
    ],
    basedOnAttributes: [
      { currentRole: 46, parentRole: null, attribute: 'className', values: ['my-custom-combobox'], operator: 'contains', source: 'test', confidence: 90 },
      { currentRole: 92, parentRole: 10, attribute: 'data-testid', values: ['date-field'], operator: 'contains', source: 'test', confidence: 84 },
    ],
    basedOnTraverseLogic: [
      { currentRole: 42, parentRole: 10, condition: { className: '|my-wrapper|', operator: 'contains' }, paths: [{ path: 'CH', operator: 'recursive', attributes: { TagName: 'input', type: 'text' } }], source: 'test', confidence: 90 },
    ],
    standardLogic: [{ id: 'SL_1', from: 'id', to: 'htmlfor', operator: 'contains', reason: 'std' }],
    traverseLogic: [{ id: 'TL_1', role: 42, parentRole: 10, attributes: { TagName: 'input' }, paths: [{ path: 'PR', operator: 'simple', attributes: { TagName: 'label' } }], method: 'innerText', reason: 'lbl' }],
    sites: ['http://test/'],
    diagnostics: [],
  };

  const cmp = H.compareRules(model, existing);
  assert(cmp.newRules.length >= 2, `compare finds new rules (${cmp.newRules.length})`);
  assert(cmp.duplicateRules.length > 0, `compare finds duplicates (${cmp.duplicateRules.length})`);
  assert(cmp.obsoleteRules.length > 0, `compare finds obsolete rules (${cmp.obsoleteRules.length})`);

  const merged = H.mergeXML(model, ref);
  assert(merged.added > 0, `merge adds new rules (${merged.added})`);
  assert(merged.xml.length > ref.length, 'merged XML is longer than original');
  assert(merged.xml.includes('my-custom-combobox'), 'merged XML contains the new attribute rule (class)');
  assert(merged.xml.includes('data-testid') && merged.xml.includes('date-field'), 'merged XML contains the new attribute rule (data-testid)');
  // Comments + formatting preserved
  assert(merged.xml.includes('<!--'), 'merged XML preserves comments');
  // Re-parsing merged XML works
  const reParsed = H.parseExistingRules(merged.xml);
  assert(reParsed.tagRules.length >= existing.tagRules.length, 'merged XML re-parses');
  ok(`merge preserved ${existing.tagRules.length} tag rules + added ${merged.added}`);
}

// ---- 6. Step sentences (human-readable control names) ------------------------
section('Step sentences (no CSS classes, name priority)');
{
  const mk = (over) => ({
    uid: 'x', role: 43, roleName: 'Button', confidence: 95,
    confidenceBreakdown: { tag: 95, roleAttr: null, klass: null, framework: null, aria: null },
    attributes: { tagName: 'button' },
    label: null, labelStrategy: 'none', labelMethod: 'none',
    location: { xpath: '//x', cssSelector: 'x' }, framework: null, frameworkClass: null,
    reason: 'test', displayText: '', roleName2: undefined,
    ...over,
  });

  // Utility-class filtering
  for (const cls of ['text-primary', 'h-7', 'w-auto', 'transition-opacity', 'duration-500', 'opacity-100', 'hover:bg-red', 'md:flex', 'rounded-lg', 'shadow-sm']) {
    assert(H.isUtilityClass(cls), `isUtilityClass('${cls}') = true`);
  }
  for (const cls of ['mat-button', 'btn-primary', 'slds-button', 'navbar-brand']) {
    assert(!H.isUtilityClass(cls), `isUtilityClass('${cls}') = false`);
  }

  // 1. Visible text wins
  assert(H.computeControlName(mk({ displayText: 'Save changes' })) === 'Save changes', 'name = visible text');
  assert(H.generateStepSentence(mk({ displayText: 'Save changes' })) === 'Click Save changes button.', 'sentence = Click Save changes button.');
  // 2. aria-label when no text
  assert(H.computeControlName(mk({ attributes: { tagName: 'div', role: 'button' }, displayText: '' })) === 'element', 'no aria → fallback');
  assert(H.computeControlName(mk({ attributes: { tagName: 'div', role: 'button', ariaLabel: 'Close panel' } })) === 'Close panel', 'name = aria-label');
  assert(H.generateStepSentence(mk({ attributes: { tagName: 'div', role: 'button', ariaLabel: 'Close panel' } })) === 'Click Close panel button.', 'div[role=button] → button sentence');
  // 3. title
  assert(H.computeControlName(mk({ attributes: { tagName: 'button', title: 'Print report' } })) === 'Print report', 'name = title');
  // 4. alt (img)
  assert(H.computeControlName(mk({ role: 40, attributes: { tagName: 'img', alt: 'Company logo' } })) === 'Company logo', 'name = alt');
  // 5. associated label
  assert(H.computeControlName(mk({ attributes: { tagName: 'input' }, role: 42, label: 'Email address' })) === 'Email address', 'name = label');
  // 6/7. adjacent text (brand / logo) — the ChatGPT icon case
  const chatgpt = mk({ role: 82, attributes: { tagName: 'svg', className: 'text-primary h-7 w-auto transition-opacity duration-500 opacity-100' }, adjacentText: 'ChatGPT' });
  assert(H.computeControlName(chatgpt) === 'ChatGPT', 'svg adjacent text → ChatGPT');
  assert(H.generateStepSentence(chatgpt) === 'Click ChatGPT Icon.', 'Click ChatGPT Icon.');
  // Never class names, even when only classes are available
  const iconOnly = mk({ role: 82, attributes: { tagName: 'svg', className: 'text-primary h-7 w-auto transition-opacity duration-500 opacity-100' } });
  assert(!H.generateStepSentence(iconOnly).includes('text-primary'), 'class names never appear in sentence');
  assert(H.generateStepSentence(iconOnly).includes('Icon.'), 'icon fallback sentence');
  // link kind
  assert(H.generateStepSentence(mk({ role: 30, attributes: { tagName: 'a' }, displayText: 'View reports' })) === 'Click View reports link.', 'link sentence');
  // logo kind via class
  assert(H.generateStepSentence(mk({ role: 82, attributes: { tagName: 'img', className: 'navbar-logo', alt: 'Acme' } })) === 'Click Acme logo.', 'logo sentence');
  // sentence always matches the step description
  const d = mk({ displayText: 'Submit order' });
  assert(H.generateStepSentence(d).includes(H.stepDescription(d)), 'sentence contains the step description');
  ok('step sentences ✓');
}

// ---- Summary -------------------------------------------------------------------
console.log(`\n${'='.repeat(50)}`);
console.log(`PASSED: ${passed}   FAILED: ${failed}`);
if (failed > 0) {
  console.error('\nFailures:');
  failures.forEach((f) => console.error('  - ' + f));
  process.exit(1);
}
console.log('All tests passed ✓');
