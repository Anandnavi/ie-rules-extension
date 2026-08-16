"use strict";
(() => {
  // src/frameworkDetector.ts
  var FRAMEWORKS = [
    {
      key: "Angular Material",
      name: "Angular Material",
      classPatterns: [/mat-[a-z-]+/, /matIcon/, /ng-star-inserted/],
      pageSignals: [/ng-version/, /ng-app/, /<app-[a-z-]+/i, /_nghost-/]
    },
    {
      key: "React",
      name: "React",
      classPatterns: [/react-combobox-view/, /react-select/, /react-datepicker/],
      pageSignals: [/data-reactroot/i, /_reactRootContainer/, /__reactFiber/]
    },
    {
      key: "Vue",
      name: "Vue",
      classPatterns: [/data-v-[a-f0-9]+/, /vue-/],
      pageSignals: [/data-v-[a-f0-9]+/, /__vue__/, /vue-root/]
    },
    {
      key: "Salesforce Lightning",
      name: "Salesforce Lightning",
      classPatterns: [/slds-[a-z-]+/, /lightning-[a-z-]+/, /force-[a-z-]+/],
      pageSignals: [/force-aloha/, /lightning-out/, /aura/]
    },
    {
      key: "PowerApps",
      name: "PowerApps",
      classPatterns: [/appmagic-[a-z-]+/, /powerapps-[a-z-]+/],
      pageSignals: [/appmagic-/, /powerapps/]
    },
    {
      key: "SAP UI5",
      name: "SAP UI5",
      classPatterns: [/ui5-[a-z-]+/, /sapM[A-Z][a-zA-Z]+/, /sapUi/],
      pageSignals: [/sap-ui-core/i, /sapUiView/, /ui5-/]
    },
    {
      key: "Select2",
      name: "Select2 (jQuery)",
      classPatterns: [/select2-[a-z-]+/],
      pageSignals: [/select2/]
    },
    {
      key: "Bootstrap",
      name: "Bootstrap",
      classPatterns: [/form-control/, /dropdown-toggle/, /\bbtn\b/, /nav-tabs/, /custom-select/],
      pageSignals: [/bootstrap/]
    },
    {
      key: "PrimeNG",
      name: "PrimeNG",
      classPatterns: [/p-(dropdown|checkbox|radiobutton|calendar|button|tabview|input)/],
      pageSignals: [/primeng/, /p-dropdown/]
    }
  ];
  function detectFrameworks(doc) {
    const detected = [];
    const haystack = [];
    if (doc.documentElement) {
      haystack.push(doc.documentElement.outerHTML.slice(0, 4e4));
    }
    const meta = doc.querySelector("meta[ng-version]");
    if (meta) haystack.push("ng-version");
    if (doc.querySelector("#__next, #root[data-reactroot]")) haystack.push("data-reactroot");
    for (const fw of FRAMEWORKS) {
      const hit = fw.pageSignals.some((re) => haystack.some((h) => re.test(h)));
      if (hit) detected.push(fw);
    }
    return detected;
  }
  function detectElementFramework(el, frameworks) {
    const className = el.getAttribute("class") || "";
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

  // src/labelEngine.ts
  function cleanText(t) {
    if (!t) return null;
    const cleaned = t.replace(/\s+/g, " ").trim();
    if (!cleaned) return null;
    return cleaned.length > 120 ? cleaned.slice(0, 120) + "\u2026" : cleaned;
  }
  function labelForId(doc, id) {
    try {
      const escaped = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(id) : id.replace(/([^a-zA-Z0-9_-])/g, "\\$1");
      return doc.querySelector(`label[for="${escaped}"]`);
    } catch {
      return null;
    }
  }
  function findLabel(el, doc) {
    const ariaLabel = el.getAttribute("aria-label");
    if (ariaLabel && ariaLabel.trim()) {
      return { text: cleanText(ariaLabel), strategy: "aria-label" };
    }
    const labelledby = el.getAttribute("aria-labelledby");
    if (labelledby) {
      const parts = [];
      for (const id2 of labelledby.split(/\s+/)) {
        const ref = doc.getElementById(id2);
        if (ref) {
          const t = cleanText(ref.textContent);
          if (t) parts.push(t);
        }
      }
      if (parts.length) return { text: parts.join(" "), strategy: "aria-labelledby" };
    }
    const id = el.getAttribute("id");
    if (id) {
      const lab = labelForId(doc, id);
      if (lab) {
        const t = cleanText(lab.textContent);
        if (t) return { text: t, strategy: "label-for" };
      }
    }
    let node = el.parentElement;
    while (node && node.tagName.toLowerCase() !== "label" && node !== el.closest("form, body")) {
      node = node.parentElement;
    }
    if (node && node.tagName.toLowerCase() === "label") {
      const t = cleanText(node.textContent);
      if (t) return { text: t, strategy: "parent-label" };
    }
    const prev = el.previousElementSibling;
    if (prev && prev.tagName.toLowerCase() === "label") {
      const t = cleanText(prev.textContent);
      if (t) return { text: t, strategy: "sibling-label" };
    }
    const next = el.nextElementSibling;
    if (next && next.tagName.toLowerCase() === "label") {
      const t = cleanText(next.textContent);
      if (t) return { text: t, strategy: "sibling-label" };
    }
    const cell = el.closest("td, th");
    if (cell && cell.tagName.toLowerCase() === "td") {
      const row = cell.parentElement;
      const headerText = headerForCell(cell);
      if (headerText) return { text: headerText, strategy: "table-header" };
      void row;
    }
    const group = el.closest(".form-group, .form-field, .form-field-wrapper, .slds-form-element, .field, .mat-form-field, .p-field");
    if (group) {
      const lab = group.querySelector("label, .slds-form-element__label, .mat-form-field-label, legend");
      if (lab) {
        const t = cleanText(lab.textContent);
        if (t) return { text: t, strategy: "form-group" };
      }
    }
    if (prev) {
      const t = cleanText(prev.textContent);
      if (t && t.length <= 60) return { text: t, strategy: "nearest-text" };
    }
    const parent = el.parentElement;
    if (parent) {
      const direct = Array.from(parent.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent || "").join(" ");
      const t = cleanText(direct);
      if (t && t.length <= 60) return { text: t, strategy: "nearest-text" };
    }
    const ph = el.getAttribute("placeholder");
    if (ph && ph.trim()) return { text: cleanText(ph), strategy: "nearest-text" };
    return { text: null, strategy: "none" };
  }
  function headerForCell(cell) {
    const row = cell.parentElement;
    if (!row) return null;
    const table = cell.closest("table");
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

  // src/types.ts
  var ROLES = {
    3: { id: 3, name: "Scroll bar", color: "#9e9e9e" },
    10: { id: 10, name: "Container / Group", color: "#8d6e63" },
    12: { id: 12, name: "Menu item", color: "#4a148c" },
    24: { id: 24, name: "Table", color: "#00695c" },
    28: { id: 28, name: "Table row", color: "#00897b" },
    29: { id: 29, name: "Table cell", color: "#26a69a" },
    30: { id: 30, name: "Link", color: "#1565c0" },
    34: { id: 34, name: "List item / Option", color: "#5e35b1" },
    37: { id: 37, name: "Tab", color: "#f57f17" },
    40: { id: 40, name: "Image", color: "#ad1457" },
    41: { id: 41, name: "Text", color: "#546e7a" },
    42: { id: 42, name: "Text box", color: "#0277bd" },
    43: { id: 43, name: "Button", color: "#d32f2f" },
    44: { id: 44, name: "Checkbox", color: "#2e7d32" },
    45: { id: 45, name: "Radio button", color: "#f9a825" },
    46: { id: 46, name: "Dropdown", color: "#e65100" },
    82: { id: 82, name: "Icon", color: "#6d4c41" },
    86: { id: 86, name: "Menu", color: "#7b1fa2" },
    92: { id: 92, name: "Date control", color: "#00838f" }
  };
  var roleName = (id) => ROLES[id] && ROLES[id].name || `Role ${id}`;
  var roleColor = (id) => ROLES[id] && ROLES[id].color || "#607d8b";

  // src/ruleEngine.ts
  var STRONG_TAGS = /* @__PURE__ */ new Set([
    "input",
    "select",
    "textarea",
    "button",
    "a",
    "img",
    "table",
    "tbody",
    "tr",
    "td",
    "th",
    "li",
    "option",
    "optgroup",
    "svg",
    "i",
    "nav",
    "form",
    "fieldset"
  ]);
  var WIDGET_ROLES = /* @__PURE__ */ new Set([46, 92, 44, 45, 34, 37]);
  var KNOWN_DATA_ATTRS = ["data-comp-id", "data-component-type", "data-testid", "data-role", "data-toggle"];
  function extractAttributes(el) {
    const attrs = {
      tagName: el.tagName.toLowerCase()
    };
    const get = (n) => el.getAttribute(n);
    const val = (n) => {
      const v = get(n);
      return v === null ? void 0 : v;
    };
    attrs.type = val("type");
    attrs.role = val("role");
    attrs.id = val("id");
    attrs.ariaLabel = val("aria-label");
    attrs.ariaLabelledby = val("aria-labelledby");
    attrs.placeholder = val("placeholder");
    attrs.title = val("title");
    attrs.name = val("name");
    attrs.value = val("value");
    attrs.href = val("href");
    attrs.alt = val("alt");
    attrs.checked = get("checked") !== null;
    attrs.disabled = get("disabled") !== null;
    attrs.readonly = get("readonly") !== null;
    attrs.selected = get("selected") !== null;
    attrs.multiple = get("multiple") !== null;
    attrs.contentEditable = el.isContentEditable || get("contenteditable") === "true";
    const cls = el.className !== void 0 && el.className !== null ? String(el.className) : get("class") || "";
    attrs.className = cls || void 0;
    const data = {};
    if (el.getAttributeNames) {
      for (const name of el.getAttributeNames()) {
        if (name.startsWith("data-")) data[name.replace(/^data-/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = get(name) || "";
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
  function cleanBreakdown() {
    return { tag: null, roleAttr: null, klass: null, framework: null, aria: null };
  }
  function matchFrameworkClass(el, config) {
    const className = el.className !== void 0 && el.className !== null ? String(el.className) : el.getAttribute("class") || "";
    if (!className) return null;
    let best = null;
    for (const m of config.frameworkRoleMappings) {
      try {
        const re = new RegExp(m.classPattern);
        const m2 = className.match(re);
        if (!m2) continue;
        const score = m.confidence * 1e3 + (m2[0]?.length || 0);
        if (!best || score > best.score) best = { mapping: m, classToken: m2[0], score };
      } catch {
      }
    }
    return best ? { mapping: best.mapping, classToken: best.classToken } : null;
  }
  function matchAttributeRole(el, config) {
    for (const m of config.attributeRoleMappings) {
      const v = el.getAttribute(m.attribute);
      if (v === null || v === "") continue;
      try {
        if (new RegExp(m.valuePattern).test(v)) return { mapping: m, value: v };
      } catch {
      }
    }
    return null;
  }
  function detectByTag(el, config) {
    const tag = el.tagName.toLowerCase();
    const tagRoles = config.tagRoles || {};
    const inputTypeRoles = config.inputTypeRoles || {};
    if (tag === "input") {
      const type = (el.getAttribute("type") || "text").toLowerCase();
      const role = inputTypeRoles[type];
      if (role) {
        return {
          role,
          confidence: 95,
          breakdown: { ...cleanBreakdown(), tag: 95 },
          reason: `Matched <input type="${type}"> \u2192 ${roleName(role)} (${role})`,
          framework: null,
          frameworkClass: null
        };
      }
    }
    if (tag === "textarea") {
      return { role: 42, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <textarea> \u2192 ${roleName(42)} (42)`, framework: null, frameworkClass: null };
    }
    if (tag === "select") {
      const multiple = el.getAttribute("multiple") !== null;
      return { role: 46, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <select${multiple ? " multiple" : ""}> \u2192 Dropdown (46)`, framework: null, frameworkClass: null };
    }
    if (tag === "button") {
      return { role: 43, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <button> \u2192 Button (43)`, framework: null, frameworkClass: null };
    }
    if (tag === "a") {
      return { role: 30, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <a> \u2192 Link (30)`, framework: null, frameworkClass: null };
    }
    if (tag === "img") {
      return { role: 40, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <img> \u2192 Image (40)`, framework: null, frameworkClass: null };
    }
    if (tag === "table" || tag === "tbody") {
      return { role: 24, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> \u2192 Table (24)`, framework: null, frameworkClass: null };
    }
    if (tag === "tr") {
      return { role: 28, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <tr> \u2192 Table row (28)`, framework: null, frameworkClass: null };
    }
    if (tag === "td" || tag === "th") {
      return { role: 29, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> \u2192 Table cell (29)`, framework: null, frameworkClass: null };
    }
    if (tag === "li" || tag === "option" || tag === "optgroup") {
      return { role: 34, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> \u2192 List item / option (34)`, framework: null, frameworkClass: null };
    }
    if (tag === "label") {
      return { role: 41, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <label> \u2192 Text (41)`, framework: null, frameworkClass: null };
    }
    if (tag === "svg" || tag === "i") {
      return { role: 82, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> \u2192 Icon (82)`, framework: null, frameworkClass: null };
    }
    if (tag === "nav" || tag === "form" || tag === "fieldset") {
      return { role: 10, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> \u2192 Container (10)`, framework: null, frameworkClass: null };
    }
    const custom = tagRoles[tag];
    if (custom) {
      return { role: custom, confidence: 95, breakdown: { ...cleanBreakdown(), tag: 95 }, reason: `Matched <${tag}> \u2192 ${roleName(custom)} (${custom})`, framework: null, frameworkClass: null };
    }
    return null;
  }
  function detectControlRole(el, config, frameworkKey) {
    const tag = el.tagName.toLowerCase();
    const breakdown = cleanBreakdown();
    const byAttr = matchAttributeRole(el, config);
    if (byAttr) {
      const { mapping, value } = byAttr;
      breakdown.roleAttr = mapping.confidence;
      if (mapping.attribute === "aria-haspopup" || mapping.attribute === "aria-expanded") breakdown.aria = mapping.confidence;
      return {
        role: mapping.role,
        confidence: mapping.confidence,
        breakdown,
        reason: `Matched ${mapping.attribute}="${value}" \u2192 ${roleName(mapping.role)} (${mapping.role})`,
        framework: null,
        frameworkClass: null
      };
    }
    const byClass = matchFrameworkClass(el, config);
    if (STRONG_TAGS.has(tag)) {
      const byTag = detectByTag(el, config);
      if (byTag) {
        if (byClass && byTag.role === 42 && WIDGET_ROLES.has(byClass.mapping.role)) {
          breakdown.framework = byClass.mapping.confidence;
          breakdown.klass = byClass.mapping.confidence;
          return {
            role: byClass.mapping.role,
            confidence: byClass.mapping.confidence,
            breakdown,
            reason: `Matched widget class "${byClass.classToken}" (${byClass.mapping.framework}) on <${tag}> \u2192 ${roleName(byClass.mapping.role)} (${byClass.mapping.role})`,
            framework: frameworkKey || byClass.mapping.framework,
            frameworkClass: byClass.classToken
          };
        }
        return byTag;
      }
    }
    if (byClass) {
      const { mapping, classToken } = byClass;
      breakdown.framework = mapping.confidence;
      breakdown.klass = mapping.confidence;
      return {
        role: mapping.role,
        confidence: mapping.confidence,
        breakdown,
        reason: `Matched framework class "${classToken}" (${mapping.framework}) \u2192 ${roleName(mapping.role)} (${mapping.role})`,
        framework: frameworkKey || mapping.framework,
        frameworkClass: classToken
      };
    }
    for (const [attr, re, role, conf] of [
      ["aria-haspopup", /listbox|menu|true/i, 46, 82],
      ["aria-expanded", /true|false/i, 46, 70],
      ["aria-autocomplete", /list|inline/i, 42, 70]
    ]) {
      const v = el.getAttribute(attr);
      if (v && re.test(v)) {
        breakdown.aria = conf;
        return { role, confidence: conf, breakdown, reason: `Matched ${attr}="${v}" \u2192 ${roleName(role)} (${role})`, framework: null, frameworkClass: null };
      }
    }
    const def = config.tagRoles?.[tag];
    breakdown.tag = 60;
    if (def !== void 0) {
      return {
        role: def,
        confidence: 60,
        breakdown,
        reason: `Default <${tag}> \u2192 ${roleName(def)} (${def})`,
        framework: null,
        frameworkClass: null
      };
    }
    return {
      role: 41,
      confidence: 60,
      breakdown,
      reason: `Default <${tag}> \u2192 Text (41)`,
      framework: null,
      frameworkClass: null
    };
  }

  // src/roleMappings.json
  var roleMappings_default = {
    _comment: "Epiplex IE Rules Generator \u2014 configurable role mappings. Edit values here or import an override JSON from the extension Settings tab. Each mapping is matched against the element; the first match wins. confidence is a 0-100 score used in the rule diagnostics.",
    defaultParentRoles: {
      "42": 10,
      "43": 10,
      "44": 10,
      "45": 10,
      "46": 10,
      "92": 10,
      "29": 10,
      "28": 10,
      "34": 46,
      "34_option_in_select": 46
    },
    frameworkRoleMappings: [
      { classPattern: "\\bmat-select\\b", role: 46, framework: "Angular Material", confidence: 95 },
      { classPattern: "mat-select-", role: 46, framework: "Angular Material", confidence: 90 },
      { classPattern: "mat-option", role: 34, framework: "Angular Material", confidence: 90 },
      { classPattern: "mat-checkbox", role: 44, framework: "Angular Material", confidence: 92 },
      { classPattern: "mat-slide-toggle", role: 44, framework: "Angular Material", confidence: 92 },
      { classPattern: "mat-radio", role: 45, framework: "Angular Material", confidence: 92 },
      { classPattern: "mat-datepicker", role: 92, framework: "Angular Material", confidence: 92 },
      { classPattern: "mat-calendar-body-cell", role: 29, framework: "Angular Material", confidence: 88 },
      { classPattern: "mat-tab-label", role: 37, framework: "Angular Material", confidence: 90 },
      { classPattern: "mat-tab-link", role: 37, framework: "Angular Material", confidence: 90 },
      { classPattern: "mat-button|mat-raised-button|mat-icon-button|mat-fab|mat-mini-fab", role: 43, framework: "Angular Material", confidence: 90 },
      { classPattern: "mat-form-field", role: 42, framework: "Angular Material", confidence: 80 },
      { classPattern: "mat-menu-item", role: 12, framework: "Angular Material", confidence: 85 },
      { classPattern: "select2-selection|select2-container", role: 46, framework: "Select2 (jQuery)", confidence: 93 },
      { classPattern: "select2-results__option", role: 34, framework: "Select2 (jQuery)", confidence: 90 },
      { classPattern: "react-combobox-view|react-select", role: 46, framework: "React", confidence: 90 },
      { classPattern: "react-combobox-option", role: 34, framework: "React", confidence: 88 },
      { classPattern: "slds-button", role: 43, framework: "Salesforce Lightning", confidence: 92 },
      { classPattern: "slds-input", role: 42, framework: "Salesforce Lightning", confidence: 92 },
      { classPattern: "slds-checkbox", role: 44, framework: "Salesforce Lightning", confidence: 92 },
      { classPattern: "slds-radio", role: 45, framework: "Salesforce Lightning", confidence: 92 },
      { classPattern: "slds-combobox|slds-select", role: 46, framework: "Salesforce Lightning", confidence: 92 },
      { classPattern: "slds-datepicker", role: 92, framework: "Salesforce Lightning", confidence: 90 },
      { classPattern: "slds-tabs", role: 37, framework: "Salesforce Lightning", confidence: 85 },
      { classPattern: "lightning-button", role: 43, framework: "Salesforce Lightning", confidence: 88 },
      { classPattern: "lightning-input", role: 42, framework: "Salesforce Lightning", confidence: 88 },
      { classPattern: "lightning-combobox", role: 46, framework: "Salesforce Lightning", confidence: 88 },
      { classPattern: "appmagic-button", role: 43, framework: "PowerApps", confidence: 92 },
      { classPattern: "appmagic-checkbox", role: 44, framework: "PowerApps", confidence: 92 },
      { classPattern: "appmagic-combobox", role: 46, framework: "PowerApps", confidence: 92 },
      { classPattern: "appmagic-text", role: 42, framework: "PowerApps", confidence: 88 },
      { classPattern: "appmagic-datepicker", role: 92, framework: "PowerApps", confidence: 90 },
      { classPattern: "appmagic-radio", role: 45, framework: "PowerApps", confidence: 90 },
      { classPattern: "ui5-input|sapMInput", role: 42, framework: "SAP UI5", confidence: 92 },
      { classPattern: "ui5-datepicker|sapMDatePicker", role: 92, framework: "SAP UI5", confidence: 90 },
      { classPattern: "ui5-select|ui-dropdown", role: 46, framework: "SAP UI5", confidence: 92 },
      { classPattern: "ui5-option", role: 34, framework: "SAP UI5", confidence: 88 },
      { classPattern: "ui5-button|sapMBtn", role: 43, framework: "SAP UI5", confidence: 92 },
      { classPattern: "ui5-checkbox|sapMCb", role: 44, framework: "SAP UI5", confidence: 90 },
      { classPattern: "ui5-radiobutton|sapMRb", role: 45, framework: "SAP UI5", confidence: 90 },
      { classPattern: "p-dropdown", role: 46, framework: "PrimeNG", confidence: 90 },
      { classPattern: "p-checkbox", role: 44, framework: "PrimeNG", confidence: 90 },
      { classPattern: "p-radiobutton", role: 45, framework: "PrimeNG", confidence: 90 },
      { classPattern: "p-calendar", role: 92, framework: "PrimeNG", confidence: 90 },
      { classPattern: "p-button", role: 43, framework: "PrimeNG", confidence: 88 },
      { classPattern: "p-tabview", role: 37, framework: "PrimeNG", confidence: 85 },
      { classPattern: "dropdown-toggle|btn", role: 43, framework: "Bootstrap", confidence: 78 },
      { classPattern: "form-control", role: 42, framework: "Bootstrap", confidence: 70 },
      { classPattern: "custom-select", role: 46, framework: "Bootstrap", confidence: 76 },
      { classPattern: "custom-checkbox", role: 44, framework: "Bootstrap", confidence: 76 },
      { classPattern: "custom-radio", role: 45, framework: "Bootstrap", confidence: 76 },
      { classPattern: "custom-switch", role: 44, framework: "Bootstrap", confidence: 76 },
      { classPattern: "nav-tabs|nav-link", role: 37, framework: "Bootstrap", confidence: 74 },
      { classPattern: "chosen-single|chosen-choices", role: 46, framework: "Chosen (jQuery)", confidence: 90 },
      { classPattern: "goog-menu|goog-menuitem", role: 46, framework: "Google", confidence: 82 },
      { classPattern: "ui-dropdown", role: 46, framework: "PrimeFaces / SAP", confidence: 82 },
      { classPattern: "calendar|datepicker", role: 92, framework: "Generic", confidence: 76 },
      { classPattern: "combobox", role: 46, framework: "Generic", confidence: 76 },
      { classPattern: "menu-button", role: 46, framework: "Generic", confidence: 76 },
      { classPattern: "checkbox", role: 44, framework: "Generic", confidence: 70 },
      { classPattern: "radio", role: 45, framework: "Generic", confidence: 70 }
    ],
    attributeRoleMappings: [
      { attribute: "role", valuePattern: "^(button)$", role: 43, confidence: 88 },
      { attribute: "role", valuePattern: "^(checkbox|switch)$", role: 44, confidence: 88 },
      { attribute: "role", valuePattern: "^(radio)$", role: 45, confidence: 88 },
      { attribute: "role", valuePattern: "^(combobox|listbox|menu)$", role: 46, confidence: 88 },
      { attribute: "role", valuePattern: "^(option)$", role: 34, confidence: 88 },
      { attribute: "role", valuePattern: "^(link)$", role: 30, confidence: 88 },
      { attribute: "role", valuePattern: "^(tab)$", role: 37, confidence: 88 },
      { attribute: "role", valuePattern: "^(menuitem)$", role: 12, confidence: 88 },
      { attribute: "role", valuePattern: "^(img|image)$", role: 40, confidence: 88 },
      { attribute: "role", valuePattern: "^(gridcell|cell)$", role: 29, confidence: 88 },
      { attribute: "role", valuePattern: "^(row)$", role: 28, confidence: 88 },
      { attribute: "role", valuePattern: "^(table|grid)$", role: 24, confidence: 88 },
      { attribute: "role", valuePattern: "^(textbox|searchbox)$", role: 42, confidence: 88 },
      { attribute: "role", valuePattern: "^(scrollbar)$", role: 3, confidence: 88 },
      { attribute: "aria-haspopup", valuePattern: "^(listbox|menu|true)$", role: 46, confidence: 82 },
      { attribute: "aria-expanded", valuePattern: "^(true|false)$", role: 46, confidence: 70 },
      { attribute: "data-comp-id", valuePattern: "(date-picker|calendar)", role: 92, confidence: 84 },
      { attribute: "data-component-type", valuePattern: "(date|calendar)", role: 92, confidence: 84 },
      { attribute: "data-testid", valuePattern: "(date|calendar)", role: 92, confidence: 76 },
      { attribute: "data-testid", valuePattern: "(dropdown|combobox)", role: 46, confidence: 76 }
    ],
    inputTypeRoles: {
      text: 42,
      password: 42,
      email: 42,
      tel: 42,
      number: 42,
      url: 42,
      search: 42,
      color: 42,
      file: 42,
      date: 92,
      time: 92,
      "datetime-local": 92,
      month: 92,
      week: 92,
      checkbox: 44,
      radio: 45,
      range: 46,
      button: 43,
      submit: 43,
      reset: 43,
      image: 43
    },
    tagRoles: {
      input: 42,
      textarea: 42,
      select: 46,
      button: 43,
      a: 30,
      area: 30,
      img: 40,
      table: 24,
      tbody: 24,
      tr: 28,
      td: 29,
      th: 29,
      li: 34,
      option: 34,
      optgroup: 34,
      svg: 82,
      i: 82,
      "mat-icon": 82,
      label: 41,
      span: 41,
      div: 41,
      p: 41,
      h1: 41,
      h2: 41,
      h3: 41,
      h4: 41,
      h5: 41,
      h6: 41,
      nav: 10,
      form: 10,
      fieldset: 10,
      section: 10,
      article: 10,
      header: 10,
      footer: 10,
      main: 10,
      ul: 10,
      ol: 10
    }
  };

  // src/settings.ts
  var DEFAULT_SETTINGS = {
    enabledFrameworks: {
      "Angular Material": true,
      "React": true,
      "Vue": true,
      "Salesforce Lightning": true,
      "PowerApps": true,
      "SAP UI5": true,
      "Select2": true,
      "Bootstrap": true,
      "PrimeNG": true
    },
    highlightEnabled: true,
    includeLowConfidence: true,
    minConfidence: 55,
    emitTraversalRules: true,
    emitLabelRules: true,
    roleMappings: null,
    scanAllTags: true
  };
  function resolveRoleMappings(settings) {
    if (settings.roleMappings) return settings.roleMappings;
    return roleMappings_default;
  }
  var STORAGE_KEY = "epiplexIeSettings";
  async function loadSettings() {
    try {
      const raw = await chrome.storage.local.get(STORAGE_KEY);
      if (raw && raw[STORAGE_KEY]) {
        return { ...DEFAULT_SETTINGS, ...raw[STORAGE_KEY] };
      }
    } catch {
    }
    return { ...DEFAULT_SETTINGS };
  }

  // src/traversalEngine.ts
  function buildTraversalRule(discovery, currentRole, parentRole, confidence) {
    const paths = [
      {
        path: discovery.direction,
        operator: discovery.recursive ? "recursive" : "simple",
        attributes: discovery.target
      }
    ];
    return {
      currentRole,
      parentRole,
      condition: discovery.condition,
      paths,
      source: discovery.reason,
      framework: discovery.framework ?? void 0,
      confidence
    };
  }

  // src/content.ts
  var EXCLUDED_TAGS = /* @__PURE__ */ new Set(["script", "style", "template", "noscript", "meta", "link", "title", "head", "iframe", "br", "hr"]);
  var MAX_CONTROLS = 3e3;
  var MAX_TEXT_CONTROLS = 800;
  var WRAPPER_PATTERNS = [
    { re: /mat-form-field|mat-checkbox|mat-slide-toggle|mat-radio-group/, framework: "Angular Material" },
    { re: /slds-form-element|slds-checkbox|slds-radio/, framework: "Salesforce Lightning" },
    { re: /select2-container/, framework: "Select2" },
    { re: /ui5-(combobox|select|datepicker|checkbox|radiobutton)/, framework: "SAP UI5" },
    { re: /p-(dropdown|checkbox|radiobutton|calendar)/, framework: "PrimeNG" },
    { re: /appmagic-(combobox|checkbox|radio|datepicker)/, framework: "PowerApps" }
  ];
  var lastScan = [];
  var highlightEnabled = false;
  var liveEnabled = false;
  var observer = null;
  var overlay = null;
  var tooltip = null;
  var repositionRaf = 0;
  var activeBoxes = [];
  var frameId = 0;
  function xpathFor(el) {
    if (el.id) return `//*[@id="${el.id.replace(/"/g, '\\"')}"]`;
    const parts = [];
    let node = el;
    while (node && node.nodeType === 1) {
      const tag = node.tagName.toLowerCase();
      let idx = 1;
      let sib = node.previousElementSibling;
      while (sib) {
        if (sib.tagName === node.tagName) idx++;
        sib = sib.previousElementSibling;
      }
      parts.unshift(`${tag}[${idx}]`);
      node = node.parentElement;
    }
    return "/" + parts.join("/");
  }
  function cssFor(el) {
    const id = el.id;
    if (id && /^[a-zA-Z][\w-]*$/.test(id)) return `#${id}`;
    const cls = Array.from(el.classList || []).filter((c) => /^[a-zA-Z][\w-]*$/.test(c));
    if (cls.length) return `${el.tagName.toLowerCase()}.${cls.join(".")}`;
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter((c) => c.tagName === el.tagName);
      const idx = siblings.indexOf(el) + 1;
      return `${el.tagName.toLowerCase()}:nth-of-type(${idx})`;
    }
    return el.tagName.toLowerCase();
  }
  function visible(el) {
    try {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 1 && rect.height > 1;
    } catch {
      return false;
    }
  }
  function captureAdjacentText(el) {
    const tag = el.tagName.toLowerCase();
    const role = el.getAttribute("role");
    const clickable = tag === "svg" || tag === "img" || tag === "i" || tag === "a" || tag === "button" || tag === "mat-icon" || role === "button" || role === "link";
    if (!clickable) return void 0;
    const take = (t) => {
      const cleaned = (t || "").replace(/\s+/g, " ").trim();
      if (!cleaned) return void 0;
      return cleaned.length > 60 ? cleaned.slice(0, 59).trimEnd() + "\u2026" : cleaned;
    };
    for (const sib of [el.previousElementSibling, el.nextElementSibling]) {
      if (sib && sib.children.length === 0) {
        const t = take(sib.textContent);
        if (t) return t;
      }
    }
    const parent = el.parentElement;
    if (parent) {
      const direct = Array.from(parent.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent || "").join(" ");
      const t = take(direct);
      if (t) return t;
      for (const sib of Array.from(parent.children)) {
        if (sib === el) continue;
        if (sib.querySelector("input, select, textarea, button, a")) continue;
        const t2 = take(sib.textContent);
        if (t2 && t2.length <= 40) return t2;
      }
    }
    return void 0;
  }
  function hasInteractiveAncestor(el) {
    const sel = 'a, button, input, select, textarea, label, [role="button"], [role="link"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';
    let p = el.parentElement;
    for (let i = 0; p && i < 8; i++, p = p.parentElement) {
      if (p.matches && p.matches(sel)) return true;
      const r = p.getAttribute && p.getAttribute("role");
      if (r && /^(button|link|menuitem|menuitemcheckbox|menuitemradio)$/i.test(r)) return true;
    }
    return false;
  }
  function parentRoleFor(el, role) {
    if (role === 42 || role === 44 || role === 45 || role === 46 || role === 92 || role === 29 || role === 28 || role === 43) {
      return 10;
    }
    if (role === 34) {
      const inList = el.closest('select, [role="listbox"], [role="combobox"]');
      return inList ? 46 : 10;
    }
    return null;
  }
  function discoverTraversal(el, role, frameworkClass, enabledFrameworks) {
    const targetAttrs = () => {
      const t = { TagName: el.tagName.toLowerCase() };
      const type = el.getAttribute("type");
      if (type) t.type = type;
      return t;
    };
    let walker = el.parentElement;
    let hops = 0;
    while (walker && hops < 3) {
      const cls = walker.getAttribute("class") || "";
      for (const p of WRAPPER_PATTERNS) {
        const m = cls.match(p.re);
        if (m && enabledFrameworks[p.framework] !== false) {
          const discovery = {
            condition: { className: `|${m[0]}|`, operator: "contains" },
            target: targetAttrs(),
            direction: "CH",
            recursive: true,
            framework: p.framework,
            reason: `${p.framework}: <${walker.tagName.toLowerCase()} class="${m[0]}"> wraps the real control`
          };
          return buildTraversalRule(discovery, role, 10, 90);
        }
      }
      walker = walker.parentElement;
      hops++;
    }
    if ((role === 44 || role === 45 || role === 46) && el.type && !visible(el)) {
      const prev = el.previousElementSibling;
      const next = el.nextElementSibling;
      const widget = prev && visible(prev) ? prev : next && visible(next) ? next : null;
      if (widget) {
        const wClass = widget.getAttribute("class") || "";
        const wTag = widget.tagName.toLowerCase();
        const direction = prev && visible(prev) ? "PS" : "NS";
        const discovery = {
          condition: wTag === "label" ? { tagName: "|label|" } : { className: `|${wClass.split(/\s+/).filter(Boolean).slice(0, 2).join("|")}|`, operator: "contains" },
          target: { TagName: "input", type: el.type },
          direction,
          recursive: true,
          framework: null,
          reason: `Custom ${roleName(role).toLowerCase()}: visible <${wTag}> widget next to the hidden input`
        };
        return buildTraversalRule(discovery, role, 10, 85);
      }
    }
    const tag = el.tagName.toLowerCase();
    if ((tag === "label" || tag === "div" || tag === "span") && frameworkClass && /checkbox|switch|radio|combobox/i.test(frameworkClass)) {
      const input = el.querySelector('input[type="checkbox"], input[type="radio"], select');
      if (input) {
        const target = { TagName: input.tagName.toLowerCase() };
        const type = input.getAttribute("type");
        if (type) target.type = type;
        const discovery = {
          condition: { className: `|${frameworkClass}|`, operator: "contains" },
          target,
          direction: "CH",
          recursive: true,
          framework: null,
          reason: `Custom widget <${tag}> with class "${frameworkClass}" contains the real control`
        };
        return buildTraversalRule(discovery, role, 10, 85);
      }
    }
    return void 0;
  }
  function walkTree(root, ctx) {
    if (ctx.controls.length >= MAX_CONTROLS) return;
    const nodes = root instanceof Document || root instanceof DocumentFragment || root instanceof ShadowRoot ? Array.from(root.querySelectorAll("*")) : Array.from(root.querySelectorAll("*"));
    const visited = /* @__PURE__ */ new Set();
    for (const el of nodes) {
      if (ctx.controls.length >= MAX_CONTROLS) break;
      if (!(el instanceof Element)) continue;
      const tag = el.tagName.toLowerCase();
      if (EXCLUDED_TAGS.has(tag)) continue;
      if (el.id === "epiplex-ie-overlay" || el.classList?.contains("epiplex-box")) continue;
      if (visited.has(el)) continue;
      visited.add(el);
      const shadow = el.shadowRoot;
      if (shadow) walkTree(shadow, { ...ctx, iframePrefix: ctx.iframePrefix });
      if (tag === "iframe") {
        try {
          const idoc = el.contentDocument;
          if (idoc) walkTree(idoc, { ...ctx, iframePrefix: `${ctx.iframePrefix}iframe#${el.id || ""} ` });
        } catch {
        }
        continue;
      }
      const elLike = el;
      const det = detectControlRole(elLike, ctx.config, null);
      const fwEl = detectElementFramework(el, ctx.frameworks);
      const role = det.role;
      const confidence = det.confidence;
      const breakdown = det.breakdown;
      const reason = det.reason;
      const frameworkClass = det.frameworkClass;
      if ((tag === "svg" || tag === "i" || tag === "mat-icon") && hasInteractiveAncestor(el)) continue;
      if (role === 10 && !["form", "fieldset", "nav", "section", "article", "header", "footer", "main"].includes(tag)) continue;
      if (role === 41) {
        const text = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (text.length < 2) continue;
        if (el.querySelector("input, select, textarea, button, a, img, table")) continue;
        if (ctx.textCount >= MAX_TEXT_CONTROLS) continue;
        ctx.textCount++;
      }
      if (role === 82 && el.children.length > 0 && !el.textContent) continue;
      const labelResult = findLabel(el, root.ownerDocument || document);
      const attrs = extractAttributes(elLike);
      const traversal = discoverTraversal(el, role, frameworkClass, ctx.enabledFw);
      const control = {
        uid: `c${frameId++}`,
        role,
        roleName: roleName(role),
        confidence,
        confidenceBreakdown: breakdown,
        attributes: attrs,
        label: labelResult.text,
        labelStrategy: labelResult.strategy,
        labelMethod: labelResult.strategy,
        location: { xpath: ctx.iframePrefix + xpathFor(el), cssSelector: ctx.iframePrefix + cssFor(el) },
        framework: fwEl ? fwEl.framework : null,
        frameworkClass,
        reason,
        parentRole: parentRoleFor(el, role),
        displayText: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80),
        adjacentText: captureAdjacentText(el),
        traversalRule: traversal
      };
      ctx.controls.push(control);
    }
  }
  function ensureOverlay() {
    if (overlay && overlay.isConnected) return overlay;
    overlay = document.createElement("div");
    overlay.id = "epiplex-ie-overlay";
    overlay.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;z-index:2147483646;pointer-events:none;";
    const style = document.createElement("style");
    style.textContent = `
    .epiplex-box{position:fixed;border:2px solid transparent;box-sizing:border-box;pointer-events:auto;cursor:crosshair;transition:box-shadow .12s;}
    .epiplex-box:hover{box-shadow:0 0 0 2px rgba(0,0,0,.6), 0 4px 14px rgba(0,0,0,.35);z-index:1;}
    #epiplex-tip{position:fixed;z-index:2147483647;background:#0f1b2d;color:#e8eef7;font:11px/1.45 Consolas,Menlo,monospace;padding:8px 10px;border-radius:6px;max-width:420px;white-space:pre-wrap;word-break:break-word;pointer-events:none;box-shadow:0 6px 22px rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.15);}
    #epiplex-tip b{color:#ffd54f;}
    #epiplex-tip .k{color:#80cbc4;}
  `;
    document.documentElement.appendChild(style);
    document.documentElement.appendChild(overlay);
    return overlay;
  }
  function renderHighlight() {
    if (!highlightEnabled) return;
    const host = ensureOverlay();
    activeBoxes.forEach((b) => b.el.remove());
    activeBoxes = [];
    tooltip?.remove();
    tooltip = null;
    const win = window;
    const docEl = document.documentElement;
    for (const c of lastScan) {
      if (c.location.cssSelector.includes("iframe")) continue;
      let el = null;
      try {
        el = c.attributes.id ? document.getElementById(c.attributes.id) : null;
        if (!el) el = document.querySelector(c.location.cssSelector);
        if (!el) {
          const p = document.evaluate(c.location.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          el = p;
        }
      } catch {
        el = null;
      }
      if (!el || !el.isConnected || !visible(el)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      const box = document.createElement("div");
      box.className = "epiplex-box";
      box.style.borderColor = roleColor(c.role);
      box.style.background = roleColor(c.role) + "2e";
      box.style.left = rect.left + "px";
      box.style.top = rect.top + "px";
      box.style.width = rect.width + "px";
      box.style.height = rect.height + "px";
      const control = c;
      box.addEventListener("mouseenter", () => showTooltip(control, box));
      box.addEventListener("mouseleave", () => tooltip?.remove());
      host.appendChild(box);
      activeBoxes.push({ el: box, control: c });
    }
    const reposition = () => {
      if (!highlightEnabled) return;
      for (const b of activeBoxes) {
        let el = null;
        try {
          el = b.control.attributes.id ? document.getElementById(b.control.attributes.id) : null;
          if (!el) el = document.querySelector(b.control.location.cssSelector);
        } catch {
          el = null;
        }
        if (!el) {
          b.el.style.display = "none";
          continue;
        }
        const rect = el.getBoundingClientRect();
        b.el.style.left = rect.left + "px";
        b.el.style.top = rect.top + "px";
        b.el.style.width = rect.width + "px";
        b.el.style.height = rect.height + "px";
      }
    };
    const onScroll = () => {
      if (repositionRaf) cancelAnimationFrame(repositionRaf);
      repositionRaf = requestAnimationFrame(reposition);
    };
    win.removeEventListener("scroll", onScroll, true);
    win.addEventListener("scroll", onScroll, true);
    win.removeEventListener("resize", onScroll);
    win.addEventListener("resize", onScroll);
    void docEl;
  }
  function showTooltip(c, anchor) {
    tooltip?.remove();
    tooltip = document.createElement("div");
    tooltip.id = "epiplex-tip";
    const a = c.attributes;
    const ruleLine = c.traversalRule ? `Traversal: ${c.traversalRule.condition.className || c.traversalRule.condition.tagName || ""} \u2192 ${c.traversalRule.paths.map((p) => `${p.path}${p.operator === "recursive" ? "*" : ""}`).join(" ")}` : `Rule: ${c.reason}`;
    tooltip.textContent = "";
    tooltip.innerHTML = `<b>${c.roleName}</b> (role ${c.role}) \xB7 ${c.confidence}%<br><span class="k">Tag:</span> ${a.tagName}${a.type ? ` type="${a.type}"` : ""}<br><span class="k">Label:</span> ${(c.label || "\u2014").slice(0, 60)}<br><span class="k">Attrs:</span> ${[a.id && `id=${a.id}`, a.name && `name=${a.name}`, a.className && `class=${a.className.split(/\s+/).slice(0, 3).join(" ")}`].filter(Boolean).join(" ") || "\u2014"}<br><span class="k">Rule:</span> ${ruleLine}<br><span class="k">CSS:</span> ${c.location.cssSelector}<br><span class="k">XPath:</span> ${c.location.xpath}`;
    const rect = anchor.getBoundingClientRect();
    tooltip.style.left = Math.min(rect.left, window.innerWidth - 440) + "px";
    tooltip.style.top = (rect.top > 180 ? rect.top - tooltip.offsetHeight - 10 : rect.bottom + 10) + "px";
    document.documentElement.appendChild(tooltip);
  }
  function clearHighlight() {
    highlightEnabled = false;
    overlay?.remove();
    tooltip?.remove();
    activeBoxes = [];
  }
  function startLive(config, frameworks, enabledFw) {
    if (observer) return;
    let timer = 0;
    observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        const res = performScan(config, frameworks, enabledFw);
        chrome.runtime.sendMessage({ type: "EPIPLEX_LIVE_UPDATE", payload: res }).catch(() => void 0);
      }, 700);
    });
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
  }
  function stopLive() {
    observer?.disconnect();
    observer = null;
  }
  function performScan(config, frameworks, enabledFw) {
    frameId = 0;
    const ctx = { controls: [], config, frameworks, enabledFw, textCount: 0, iframePrefix: "" };
    walkTree(document, ctx);
    lastScan = ctx.controls;
    if (highlightEnabled) renderHighlight();
    return {
      controls: lastScan,
      frameworks: frameworks.map((f) => f.name),
      url: location.href,
      title: document.title,
      timestamp: Date.now()
    };
  }
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    void (async () => {
      const settings = await loadSettings();
      const baseConfig = resolveRoleMappings(settings);
      const config = {
        ...baseConfig,
        frameworkRoleMappings: baseConfig.frameworkRoleMappings.filter(
          (m) => settings.enabledFrameworks[m.framework] !== false
        )
      };
      const frameworks = detectFrameworks(document).filter((f) => settings.enabledFrameworks[f.key] !== false);
      const enabledFw = settings.enabledFrameworks;
      switch (msg?.type) {
        case "EPIPLEX_SCAN": {
          const res = performScan(config, frameworks, enabledFw);
          sendResponse({ ok: true, payload: res });
          break;
        }
        case "EPIPLEX_HIGHLIGHT": {
          highlightEnabled = !!msg.enabled;
          if (highlightEnabled) renderHighlight();
          else clearHighlight();
          sendResponse({ ok: true });
          break;
        }
        case "EPIPLEX_LIVE": {
          if (msg.enabled) startLive(config, frameworks, enabledFw);
          else stopLive();
          liveEnabled = !!msg.enabled;
          sendResponse({ ok: true, live: liveEnabled });
          break;
        }
        case "EPIPLEX_CLEAR_HIGHLIGHT": {
          clearHighlight();
          sendResponse({ ok: true });
          break;
        }
        default:
          sendResponse({ ok: false, error: "unknown message" });
      }
    })().catch((e) => sendResponse({ ok: false, error: String(e) }));
    return true;
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2ZyYW1ld29ya0RldGVjdG9yLnRzIiwgInNyYy9sYWJlbEVuZ2luZS50cyIsICJzcmMvdHlwZXMudHMiLCAic3JjL3J1bGVFbmdpbmUudHMiLCAic3JjL3JvbGVNYXBwaW5ncy5qc29uIiwgInNyYy9zZXR0aW5ncy50cyIsICJzcmMvdHJhdmVyc2FsRW5naW5lLnRzIiwgInNyYy9jb250ZW50LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIGZyYW1ld29ya0RldGVjdG9yLnRzIFx1MjAxNCBTbWFydCBmcmFtZXdvcmsgZGV0ZWN0aW9uLlxuICpcbiAqIERldGVjdHMgdGhlIFVJIGZyYW1ld29yayBvZiB0aGUgY3VycmVudCBwYWdlIChwYWdlLWxldmVsIHNpZ25hbHMpIGFuZCBvZlxuICogaW5kaXZpZHVhbCBlbGVtZW50cyAoY2xhc3MtbmFtZSBzaWduYWxzKS4gVGhlIGRldGVjdGVkIGZyYW1ld29yayBib29zdHNcbiAqIHJ1bGUgY29uZmlkZW5jZSBhbmQgZHJpdmVzIHNwZWNpYWxpc2VkIHJ1bGVzIChtYXQtKiwgc2xkcy0qLCBhcHBtYWdpYy0qXHUyMDI2KS5cbiAqL1xuaW1wb3J0IHR5cGUgeyBGcmFtZXdvcmtJbmZvIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBGcmFtZXdvcmsgc2lnbmF0dXJlIHRhYmxlLiBgY2xhc3NQYXR0ZXJuc2AgYXJlIHRlc3RlZCBhZ2FpbnN0IHRoZSBlbGVtZW50XG4gKiAgY2xhc3NOYW1lOyBgcGFnZVNpZ25hbHNgIGFnYWluc3QgdGhlIGRvY3VtZW50IChib2R5IGNsYXNzZXMsIHRhZ3MsIGF0dHJzKS4gKi9cbmV4cG9ydCBjb25zdCBGUkFNRVdPUktTOiBGcmFtZXdvcmtJbmZvW10gPSBbXG4gIHtcbiAgICBrZXk6ICdBbmd1bGFyIE1hdGVyaWFsJyxcbiAgICBuYW1lOiAnQW5ndWxhciBNYXRlcmlhbCcsXG4gICAgY2xhc3NQYXR0ZXJuczogWy9tYXQtW2Etei1dKy8sIC9tYXRJY29uLywgL25nLXN0YXItaW5zZXJ0ZWQvXSxcbiAgICBwYWdlU2lnbmFsczogWy9uZy12ZXJzaW9uLywgL25nLWFwcC8sIC88YXBwLVthLXotXSsvaSwgL19uZ2hvc3QtL10sXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdSZWFjdCcsXG4gICAgbmFtZTogJ1JlYWN0JyxcbiAgICBjbGFzc1BhdHRlcm5zOiBbL3JlYWN0LWNvbWJvYm94LXZpZXcvLCAvcmVhY3Qtc2VsZWN0LywgL3JlYWN0LWRhdGVwaWNrZXIvXSxcbiAgICBwYWdlU2lnbmFsczogWy9kYXRhLXJlYWN0cm9vdC9pLCAvX3JlYWN0Um9vdENvbnRhaW5lci8sIC9fX3JlYWN0RmliZXIvXSxcbiAgfSxcbiAge1xuICAgIGtleTogJ1Z1ZScsXG4gICAgbmFtZTogJ1Z1ZScsXG4gICAgY2xhc3NQYXR0ZXJuczogWy9kYXRhLXYtW2EtZjAtOV0rLywgL3Z1ZS0vXSxcbiAgICBwYWdlU2lnbmFsczogWy9kYXRhLXYtW2EtZjAtOV0rLywgL19fdnVlX18vLCAvdnVlLXJvb3QvXSxcbiAgfSxcbiAge1xuICAgIGtleTogJ1NhbGVzZm9yY2UgTGlnaHRuaW5nJyxcbiAgICBuYW1lOiAnU2FsZXNmb3JjZSBMaWdodG5pbmcnLFxuICAgIGNsYXNzUGF0dGVybnM6IFsvc2xkcy1bYS16LV0rLywgL2xpZ2h0bmluZy1bYS16LV0rLywgL2ZvcmNlLVthLXotXSsvXSxcbiAgICBwYWdlU2lnbmFsczogWy9mb3JjZS1hbG9oYS8sIC9saWdodG5pbmctb3V0LywgL2F1cmEvXSxcbiAgfSxcbiAge1xuICAgIGtleTogJ1Bvd2VyQXBwcycsXG4gICAgbmFtZTogJ1Bvd2VyQXBwcycsXG4gICAgY2xhc3NQYXR0ZXJuczogWy9hcHBtYWdpYy1bYS16LV0rLywgL3Bvd2VyYXBwcy1bYS16LV0rL10sXG4gICAgcGFnZVNpZ25hbHM6IFsvYXBwbWFnaWMtLywgL3Bvd2VyYXBwcy9dLFxuICB9LFxuICB7XG4gICAga2V5OiAnU0FQIFVJNScsXG4gICAgbmFtZTogJ1NBUCBVSTUnLFxuICAgIGNsYXNzUGF0dGVybnM6IFsvdWk1LVthLXotXSsvLCAvc2FwTVtBLVpdW2EtekEtWl0rLywgL3NhcFVpL10sXG4gICAgcGFnZVNpZ25hbHM6IFsvc2FwLXVpLWNvcmUvaSwgL3NhcFVpVmlldy8sIC91aTUtL10sXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdTZWxlY3QyJyxcbiAgICBuYW1lOiAnU2VsZWN0MiAoalF1ZXJ5KScsXG4gICAgY2xhc3NQYXR0ZXJuczogWy9zZWxlY3QyLVthLXotXSsvXSxcbiAgICBwYWdlU2lnbmFsczogWy9zZWxlY3QyL10sXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdCb290c3RyYXAnLFxuICAgIG5hbWU6ICdCb290c3RyYXAnLFxuICAgIGNsYXNzUGF0dGVybnM6IFsvZm9ybS1jb250cm9sLywgL2Ryb3Bkb3duLXRvZ2dsZS8sIC9cXGJidG5cXGIvLCAvbmF2LXRhYnMvLCAvY3VzdG9tLXNlbGVjdC9dLFxuICAgIHBhZ2VTaWduYWxzOiBbL2Jvb3RzdHJhcC9dLFxuICB9LFxuICB7XG4gICAga2V5OiAnUHJpbWVORycsXG4gICAgbmFtZTogJ1ByaW1lTkcnLFxuICAgIGNsYXNzUGF0dGVybnM6IFsvcC0oZHJvcGRvd258Y2hlY2tib3h8cmFkaW9idXR0b258Y2FsZW5kYXJ8YnV0dG9ufHRhYnZpZXd8aW5wdXQpL10sXG4gICAgcGFnZVNpZ25hbHM6IFsvcHJpbWVuZy8sIC9wLWRyb3Bkb3duL10sXG4gIH0sXG5dO1xuXG4vKiogUGFnZS1sZXZlbCBmcmFtZXdvcmsgZGV0ZWN0aW9uIFx1MjAxNCBzY2FucyB0aGUgZG9jdW1lbnQgb25jZSBwZXIgc2Nhbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RGcmFtZXdvcmtzKGRvYzogRG9jdW1lbnQpOiBGcmFtZXdvcmtJbmZvW10ge1xuICBjb25zdCBkZXRlY3RlZDogRnJhbWV3b3JrSW5mb1tdID0gW107XG4gIGNvbnN0IGhheXN0YWNrOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAoZG9jLmRvY3VtZW50RWxlbWVudCkge1xuICAgIGhheXN0YWNrLnB1c2goZG9jLmRvY3VtZW50RWxlbWVudC5vdXRlckhUTUwuc2xpY2UoMCwgNDAwMDApKTtcbiAgfVxuICBjb25zdCBtZXRhID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmctdmVyc2lvbl0nKTtcbiAgaWYgKG1ldGEpIGhheXN0YWNrLnB1c2goJ25nLXZlcnNpb24nKTtcbiAgaWYgKGRvYy5xdWVyeVNlbGVjdG9yKCcjX19uZXh0LCAjcm9vdFtkYXRhLXJlYWN0cm9vdF0nKSkgaGF5c3RhY2sucHVzaCgnZGF0YS1yZWFjdHJvb3QnKTtcblxuICBmb3IgKGNvbnN0IGZ3IG9mIEZSQU1FV09SS1MpIHtcbiAgICBjb25zdCBoaXQgPSBmdy5wYWdlU2lnbmFscy5zb21lKChyZSkgPT4gaGF5c3RhY2suc29tZSgoaCkgPT4gcmUudGVzdChoKSkpO1xuICAgIGlmIChoaXQpIGRldGVjdGVkLnB1c2goZncpO1xuICB9XG4gIC8vIE1lcmdlIG92ZXJsYXBwaW5nIGVudHJpZXMgKGUuZy4gQW5ndWxhciBNYXRlcmlhbCArIFNlbGVjdDIgb24gb25lIHBhZ2UpLlxuICByZXR1cm4gZGV0ZWN0ZWQ7XG59XG5cbi8qKlxuICogRnJhbWV3b3JrIGZvciBhIHNpbmdsZSBlbGVtZW50LCBvciBudWxsLiBSZXR1cm5zIHRoZSBmaXJzdCBmcmFtZXdvcmsgd2hvc2VcbiAqIGNsYXNzIHBhdHRlcm4gbWF0Y2hlcy4gYGZyYW1ld29ya3NgIGlzIHRoZSBwYWdlLWxldmVsIGRldGVjdGlvbiByZXN1bHQgXHUyMDE0XG4gKiBhIHBhZ2UgdGhhdCBkb2VzIG5vdCBoYXZlIHRoZSBmcmFtZXdvcmsgZmxhZ2dlZCBhdCBwYWdlIGxldmVsIHN0aWxsIGdldHNcbiAqIHBlci1lbGVtZW50IG1hdGNoZXMgKGZyYW1ld29yayBjbGFzcyBuYW1lcyBhcmUgc3Ryb25nIHNpZ25hbHMpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0RWxlbWVudEZyYW1ld29yayhcbiAgZWw6IEVsZW1lbnQsXG4gIGZyYW1ld29ya3M6IEZyYW1ld29ya0luZm9bXSB8IG51bGxcbik6IHsgZnJhbWV3b3JrOiBzdHJpbmc7IGNsYXNzTWF0Y2g6IHN0cmluZyB8IG51bGwgfSB8IG51bGwge1xuICBjb25zdCBjbGFzc05hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG4gIGNvbnN0IHRhZ05hbWUgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHBvb2wgPSBmcmFtZXdvcmtzICYmIGZyYW1ld29ya3MubGVuZ3RoID4gMCA/IGZyYW1ld29ya3MgOiBGUkFNRVdPUktTO1xuICBmb3IgKGNvbnN0IGZ3IG9mIHBvb2wpIHtcbiAgICBjb25zdCBtYXRjaCA9IGZ3LmNsYXNzUGF0dGVybnMuZmluZCgocmUpID0+IHJlLnRlc3QoY2xhc3NOYW1lKSB8fCByZS50ZXN0KHRhZ05hbWUpKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIGNvbnN0IG0gPSBjbGFzc05hbWUubWF0Y2gobWF0Y2gpO1xuICAgICAgcmV0dXJuIHsgZnJhbWV3b3JrOiBmdy5uYW1lLCBjbGFzc01hdGNoOiBtID8gbVswXSA6IHRhZ05hbWUgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG4iLCAiLyoqXG4gKiBsYWJlbEVuZ2luZS50cyBcdTIwMTQgTGFiZWwgaWRlbnRpZmljYXRpb24uXG4gKlxuICogRmluZHMgbGFiZWxzIGZvciBjb250cm9scyB1c2luZywgaW4gcHJpb3JpdHkgb3JkZXI6XG4gKiAgIGFyaWEtbGFiZWwgXHUyMTkyIGFyaWEtbGFiZWxsZWRieSBcdTIxOTIgbGFiZWxbZm9yPWlkXSBcdTIxOTIgcGFyZW50IDxsYWJlbD4gXHUyMTkyXG4gKiAgIHNpYmxpbmcgbGFiZWwgXHUyMTkyIG5lYXJlc3QgdGV4dCBub2RlIFx1MjE5MiB0YWJsZS1oZWFkZXIgYXNzb2NpYXRpb24gXHUyMTkyXG4gKiAgIGZvcm0tZ3JvdXAgYXNzb2NpYXRpb24uXG4gKlxuICogQWxzbyBidWlsZHMgdGhlIExhYmVsSWRlbnRpZmllciBydWxlcyAoU3RhbmRhcmRMb2dpYyArIFRyYXZlcnNlTG9naWMpIHRoYXRcbiAqIEVwaXBsZXggd2lsbCB1c2UgdG8gcmUtZGVyaXZlIGNvbnRyb2wgbmFtZXMgYXQgcnVudGltZS5cbiAqL1xuaW1wb3J0IHR5cGUge1xuICBEZXRlY3RlZENvbnRyb2wsXG4gIFJvbGVJZCxcbiAgU3RhbmRhcmRMYWJlbFJ1bGUsXG4gIFRyYXZlcnNhbFBhdGgsXG4gIFRyYXZlcnNlTGFiZWxSdWxlLFxufSBmcm9tICcuL3R5cGVzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBET00tbGV2ZWwgbGFiZWwgZGlzY292ZXJ5IChydW5zIGluIHRoZSBjb250ZW50IHNjcmlwdClcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgaW50ZXJmYWNlIExhYmVsUmVzdWx0IHtcbiAgdGV4dDogc3RyaW5nIHwgbnVsbDtcbiAgc3RyYXRlZ3k6IERldGVjdGVkQ29udHJvbFsnbGFiZWxTdHJhdGVneSddO1xufVxuXG4vKiogQ29sbGFwc2Ugd2hpdGVzcGFjZSBhbmQgY2FwIGxlbmd0aCAoRXBpcGxleCBjb250cm9sIG5hbWVzIGFyZSBzaG9ydCkuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5UZXh0KHQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCBudWxsIHtcbiAgaWYgKCF0KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgY2xlYW5lZCA9IHQucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKTtcbiAgaWYgKCFjbGVhbmVkKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNsZWFuZWQubGVuZ3RoID4gMTIwID8gY2xlYW5lZC5zbGljZSgwLCAxMjApICsgJ1x1MjAyNicgOiBjbGVhbmVkO1xufVxuXG5mdW5jdGlvbiBsYWJlbEZvcklkKGRvYzogRG9jdW1lbnQsIGlkOiBzdHJpbmcpOiBIVE1MTGFiZWxFbGVtZW50IHwgbnVsbCB7XG4gIHRyeSB7XG4gICAgY29uc3QgZXNjYXBlZCA9IHR5cGVvZiBDU1MgIT09ICd1bmRlZmluZWQnICYmIENTUy5lc2NhcGUgPyBDU1MuZXNjYXBlKGlkKSA6IGlkLnJlcGxhY2UoLyhbXmEtekEtWjAtOV8tXSkvZywgJ1xcXFwkMScpO1xuICAgIHJldHVybiBkb2MucXVlcnlTZWxlY3RvcihgbGFiZWxbZm9yPVwiJHtlc2NhcGVkfVwiXWApO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEZpbmQgdGhlIGJlc3QgbGFiZWwgZm9yIGFuIGVsZW1lbnQgdXNpbmcgYWxsIGRvY3VtZW50ZWQgc3RyYXRlZ2llcy5cbiAqIGBkb2NgIGlzIG9ubHkgdXNlZCBmb3IgbGFiZWxbZm9yXSBsb29rdXBzOyBldmVyeXRoaW5nIGVsc2UgaXMgbG9jYWwgRE9NLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZExhYmVsKGVsOiBFbGVtZW50LCBkb2M6IERvY3VtZW50KTogTGFiZWxSZXN1bHQge1xuICAvLyAxLiBhcmlhLWxhYmVsIChhdXRob3ItcHJvdmlkZWQsIGJlc3QpLlxuICBjb25zdCBhcmlhTGFiZWwgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcbiAgaWYgKGFyaWFMYWJlbCAmJiBhcmlhTGFiZWwudHJpbSgpKSB7XG4gICAgcmV0dXJuIHsgdGV4dDogY2xlYW5UZXh0KGFyaWFMYWJlbCksIHN0cmF0ZWd5OiAnYXJpYS1sYWJlbCcgfTtcbiAgfVxuXG4gIC8vIDIuIGFyaWEtbGFiZWxsZWRieSBcdTIxOTIgcmVmZXJlbmNlZCBlbGVtZW50IHRleHQuXG4gIGNvbnN0IGxhYmVsbGVkYnkgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScpO1xuICBpZiAobGFiZWxsZWRieSkge1xuICAgIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaWQgb2YgbGFiZWxsZWRieS5zcGxpdCgvXFxzKy8pKSB7XG4gICAgICBjb25zdCByZWYgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKHJlZikge1xuICAgICAgICBjb25zdCB0ID0gY2xlYW5UZXh0KHJlZi50ZXh0Q29udGVudCk7XG4gICAgICAgIGlmICh0KSBwYXJ0cy5wdXNoKHQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFydHMubGVuZ3RoKSByZXR1cm4geyB0ZXh0OiBwYXJ0cy5qb2luKCcgJyksIHN0cmF0ZWd5OiAnYXJpYS1sYWJlbGxlZGJ5JyB9O1xuICB9XG5cbiAgLy8gMy4gbGFiZWxbZm9yPWlkXS5cbiAgY29uc3QgaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gIGlmIChpZCkge1xuICAgIGNvbnN0IGxhYiA9IGxhYmVsRm9ySWQoZG9jLCBpZCk7XG4gICAgaWYgKGxhYikge1xuICAgICAgY29uc3QgdCA9IGNsZWFuVGV4dChsYWIudGV4dENvbnRlbnQpO1xuICAgICAgaWYgKHQpIHJldHVybiB7IHRleHQ6IHQsIHN0cmF0ZWd5OiAnbGFiZWwtZm9yJyB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIDQuIFdyYXBwaW5nIDxsYWJlbD4gKHBhcmVudCBsYWJlbCkuXG4gIGxldCBub2RlOiBFbGVtZW50IHwgbnVsbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIHdoaWxlIChub2RlICYmIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnbGFiZWwnICYmIG5vZGUgIT09IGVsLmNsb3Nlc3QoJ2Zvcm0sIGJvZHknKSkge1xuICAgIG5vZGUgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgaWYgKG5vZGUgJiYgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdsYWJlbCcpIHtcbiAgICBjb25zdCB0ID0gY2xlYW5UZXh0KG5vZGUudGV4dENvbnRlbnQpO1xuICAgIGlmICh0KSByZXR1cm4geyB0ZXh0OiB0LCBzdHJhdGVneTogJ3BhcmVudC1sYWJlbCcgfTtcbiAgfVxuXG4gIC8vIDUuIFNpYmxpbmcgbGFiZWwgKHByZXZpb3VzIG9yIG5leHQgZWxlbWVudCkuXG4gIGNvbnN0IHByZXYgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICBpZiAocHJldiAmJiBwcmV2LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2xhYmVsJykge1xuICAgIGNvbnN0IHQgPSBjbGVhblRleHQocHJldi50ZXh0Q29udGVudCk7XG4gICAgaWYgKHQpIHJldHVybiB7IHRleHQ6IHQsIHN0cmF0ZWd5OiAnc2libGluZy1sYWJlbCcgfTtcbiAgfVxuICBjb25zdCBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBpZiAobmV4dCAmJiBuZXh0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2xhYmVsJykge1xuICAgIGNvbnN0IHQgPSBjbGVhblRleHQobmV4dC50ZXh0Q29udGVudCk7XG4gICAgaWYgKHQpIHJldHVybiB7IHRleHQ6IHQsIHN0cmF0ZWd5OiAnc2libGluZy1sYWJlbCcgfTtcbiAgfVxuXG4gIC8vIDYuIFRhYmxlIGhlYWRlciBhc3NvY2lhdGlvbjogPHRkPi88dGg+IFx1MjE5MiBtYXRjaGluZyA8dGg+IGluIHRoZSBoZWFkZXIgcm93LlxuICBjb25zdCBjZWxsID0gZWwuY2xvc2VzdCgndGQsIHRoJyk7XG4gIGlmIChjZWxsICYmIGNlbGwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGQnKSB7XG4gICAgY29uc3Qgcm93ID0gY2VsbC5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBoZWFkZXJGb3JDZWxsKGNlbGwgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQpO1xuICAgIGlmIChoZWFkZXJUZXh0KSByZXR1cm4geyB0ZXh0OiBoZWFkZXJUZXh0LCBzdHJhdGVneTogJ3RhYmxlLWhlYWRlcicgfTtcbiAgICB2b2lkIHJvdztcbiAgfVxuXG4gIC8vIDcuIGZvcm0tZ3JvdXAgc3R5bGUgYXNzb2NpYXRpb246IC5mb3JtLWdyb3VwIC8gLmZvcm0tZmllbGQgLyAuc2xkcy1mb3JtLWVsZW1lbnQgLyAuZmllbGRcbiAgY29uc3QgZ3JvdXAgPSBlbC5jbG9zZXN0KCcuZm9ybS1ncm91cCwgLmZvcm0tZmllbGQsIC5mb3JtLWZpZWxkLXdyYXBwZXIsIC5zbGRzLWZvcm0tZWxlbWVudCwgLmZpZWxkLCAubWF0LWZvcm0tZmllbGQsIC5wLWZpZWxkJyk7XG4gIGlmIChncm91cCkge1xuICAgIGNvbnN0IGxhYiA9IGdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsLCAuc2xkcy1mb3JtLWVsZW1lbnRfX2xhYmVsLCAubWF0LWZvcm0tZmllbGQtbGFiZWwsIGxlZ2VuZCcpO1xuICAgIGlmIChsYWIpIHtcbiAgICAgIGNvbnN0IHQgPSBjbGVhblRleHQobGFiLnRleHRDb250ZW50KTtcbiAgICAgIGlmICh0KSByZXR1cm4geyB0ZXh0OiB0LCBzdHJhdGVneTogJ2Zvcm0tZ3JvdXAnIH07XG4gICAgfVxuICB9XG5cbiAgLy8gOC4gTmVhcmVzdCB0ZXh0IG5vZGU6IHByZXZpb3VzIHNpYmxpbmcgdGV4dCwgdGhlbiBwYXJlbnQncyBmaXJzdCB0ZXh0LlxuICBpZiAocHJldikge1xuICAgIGNvbnN0IHQgPSBjbGVhblRleHQocHJldi50ZXh0Q29udGVudCk7XG4gICAgaWYgKHQgJiYgdC5sZW5ndGggPD0gNjApIHJldHVybiB7IHRleHQ6IHQsIHN0cmF0ZWd5OiAnbmVhcmVzdC10ZXh0JyB9O1xuICB9XG4gIGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIGlmIChwYXJlbnQpIHtcbiAgICBjb25zdCBkaXJlY3QgPSBBcnJheS5mcm9tKHBhcmVudC5jaGlsZE5vZGVzKVxuICAgICAgLmZpbHRlcigobikgPT4gbi5ub2RlVHlwZSA9PT0gMykgLy8gTm9kZS5URVhUX05PREVcbiAgICAgIC5tYXAoKG4pID0+IG4udGV4dENvbnRlbnQgfHwgJycpXG4gICAgICAuam9pbignICcpO1xuICAgIGNvbnN0IHQgPSBjbGVhblRleHQoZGlyZWN0KTtcbiAgICBpZiAodCAmJiB0Lmxlbmd0aCA8PSA2MCkgcmV0dXJuIHsgdGV4dDogdCwgc3RyYXRlZ3k6ICduZWFyZXN0LXRleHQnIH07XG4gIH1cblxuICAvLyA5LiBQbGFjZWhvbGRlciAvIHRpdGxlIGZhbGxiYWNrIChub3QgYSBET00gd2FsayBidXQgYSB1c2VmdWwgbGFiZWwgc291cmNlKS5cbiAgY29uc3QgcGggPSBlbC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyk7XG4gIGlmIChwaCAmJiBwaC50cmltKCkpIHJldHVybiB7IHRleHQ6IGNsZWFuVGV4dChwaCksIHN0cmF0ZWd5OiAnbmVhcmVzdC10ZXh0JyB9O1xuXG4gIHJldHVybiB7IHRleHQ6IG51bGwsIHN0cmF0ZWd5OiAnbm9uZScgfTtcbn1cblxuLyoqIEZvciBhIDx0ZD4sIGZpbmQgdGhlIDx0aD4gaW4gdGhlIHNhbWUgY29sdW1uIG9mIHRoZSB0YWJsZSBoZWFkZXIuICovXG5mdW5jdGlvbiBoZWFkZXJGb3JDZWxsKGNlbGw6IEhUTUxUYWJsZUNlbGxFbGVtZW50KTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IHJvdyA9IGNlbGwucGFyZW50RWxlbWVudCBhcyBIVE1MVGFibGVSb3dFbGVtZW50IHwgbnVsbDtcbiAgaWYgKCFyb3cpIHJldHVybiBudWxsO1xuICBjb25zdCB0YWJsZSA9IGNlbGwuY2xvc2VzdCgndGFibGUnKTtcbiAgaWYgKCF0YWJsZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGNlbGxzID0gQXJyYXkuZnJvbShyb3cuY2VsbHMpO1xuICBjb25zdCBpbmRleCA9IGNlbGxzLmluZGV4T2YoY2VsbCk7XG4gIGlmIChpbmRleCA8IDApIHJldHVybiBudWxsO1xuICBjb25zdCBoZWFkID0gdGFibGUudEhlYWQ7XG4gIGlmICghaGVhZCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGhlYWRlclJvdyA9IGhlYWQucm93c1swXTtcbiAgaWYgKCFoZWFkZXJSb3cpIHJldHVybiBudWxsO1xuICBjb25zdCB0aCA9IGhlYWRlclJvdy5jZWxsc1tpbmRleF07XG4gIHJldHVybiB0aCA/IGNsZWFuVGV4dCh0aC50ZXh0Q29udGVudCkgOiBudWxsO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIExhYmVsIHJ1bGUgZ2VuZXJhdGlvbiAocnVucyBpbiB0aGUgcG9wdXApXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqIFN0YW5kYXJkTG9naWMgYmFzZSBydWxlcyBcdTIwMTQgYWx3YXlzIGVtaXR0ZWQgKG1hdGNoZXMgSUVBZGFwdG9yLnhtbCBkZWZhdWx0cykuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTdGFuZGFyZExhYmVsUnVsZXMoY29udHJvbHM6IERldGVjdGVkQ29udHJvbFtdKTogU3RhbmRhcmRMYWJlbFJ1bGVbXSB7XG4gIGNvbnN0IHJ1bGVzOiBTdGFuZGFyZExhYmVsUnVsZVtdID0gW1xuICAgIHtcbiAgICAgIGlkOiAnU0xfMScsXG4gICAgICBmcm9tOiAnaWQnLFxuICAgICAgdG86ICdodG1sZm9yJyxcbiAgICAgIG9wZXJhdG9yOiAnY29udGFpbnMnLFxuICAgICAgcmVhc29uOiAnU3RhbmRhcmQgRXBpcGxleCBhc3NvY2lhdGlvbjogY29udHJvbCBpZCBcdTIxOTQgPGxhYmVsIGZvcj4gKGxhYmVsW2Zvcj1pZF0pLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ1NMXzInLFxuICAgICAgZnJvbTogJ2FyaWEtbGFiZWxsZWRieScsXG4gICAgICB0bzogJ2lkJyxcbiAgICAgIG9wZXJhdG9yOiAnY29udGFpbnMnLFxuICAgICAgcmVhc29uOiAnQVJJQSBhc3NvY2lhdGlvbjogYXJpYS1sYWJlbGxlZGJ5IGxpc3RzIHRoZSBpZCBvZiB0aGUgbGFiZWxsaW5nIGVsZW1lbnQuJyxcbiAgICB9LFxuICBdO1xuICBjb25zdCBoYXNBcmlhTGFiZWwgPSBjb250cm9scy5zb21lKChjKSA9PiBjLmF0dHJpYnV0ZXMuYXJpYUxhYmVsKTtcbiAgaWYgKGhhc0FyaWFMYWJlbCkge1xuICAgIHJ1bGVzLnB1c2goe1xuICAgICAgaWQ6ICdTTF8zJyxcbiAgICAgIGZyb206ICdhcmlhLWxhYmVsJyxcbiAgICAgIHRvOiAndGl0bGUnLFxuICAgICAgb3BlcmF0b3I6ICdjb250YWlucycsXG4gICAgICByZWFzb246ICdhcmlhLWxhYmVsIGlzIHVzZWQgZGlyZWN0bHkgYXMgdGhlIGNvbnRyb2wgbmFtZS4nLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBydWxlcztcbn1cblxuZnVuY3Rpb24gYXR0cnNTdHJpbmcoYXR0cnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pOiBzdHJpbmcge1xuICByZXR1cm4gT2JqZWN0LmtleXMoYXR0cnMpLnNvcnQoKS5tYXAoKGspID0+IGAke2t9PSR7YXR0cnNba119YCkuam9pbignLCcpO1xufVxuXG5mdW5jdGlvbiBsYWJlbFRyYXZlcnNhbEZpbmdlcnByaW50KHI6IFRyYXZlcnNlTGFiZWxSdWxlKTogc3RyaW5nIHtcbiAgY29uc3QgcGF0aHMgPSByLnBhdGhzLm1hcCgocCkgPT4gYCR7cC5wYXRofToke3Aub3BlcmF0b3J9OiR7YXR0cnNTdHJpbmcocC5hdHRyaWJ1dGVzKX1gKS5qb2luKCc+Jyk7XG4gIHJldHVybiBgJHtyLnJvbGV9fCR7ci5wYXJlbnRSb2xlID8/ICcnfXwke2F0dHJzU3RyaW5nKHIuYXR0cmlidXRlcyl9fCR7cGF0aHN9fCR7ci5tZXRob2R9YDtcbn1cblxuLyoqXG4gKiBCdWlsZCBUcmF2ZXJzZUxvZ2ljIHJ1bGVzIGZyb20gdGhlIGxhYmVsIHN0cmF0ZWdpZXMgYWN0dWFsbHkgdXNlZCBvbiB0aGUgcGFnZS5cbiAqIFJ1bGVzIGFyZSBkZWR1cGxpY2F0ZWQ7IHN0YWJsZSBUTF8gaWRzIGFyZSBhc3NpZ25lZCBpbiByb2xlIG9yZGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRUcmF2ZXJzZUxhYmVsUnVsZXMoY29udHJvbHM6IERldGVjdGVkQ29udHJvbFtdKTogVHJhdmVyc2VMYWJlbFJ1bGVbXSB7XG4gIGNvbnN0IHNlZW4gPSBuZXcgTWFwPHN0cmluZywgVHJhdmVyc2VMYWJlbFJ1bGU+KCk7XG4gIGNvbnN0IHB1c2ggPSAocjogVHJhdmVyc2VMYWJlbFJ1bGUpID0+IHtcbiAgICBjb25zdCBrZXkgPSBsYWJlbFRyYXZlcnNhbEZpbmdlcnByaW50KHIpO1xuICAgIGlmICghc2Vlbi5oYXMoa2V5KSkgc2Vlbi5zZXQoa2V5LCByKTtcbiAgfTtcblxuICBjb25zdCBpbnB1dEF0dHJzID0gKGM6IERldGVjdGVkQ29udHJvbCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGE6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IFRhZ05hbWU6IGMuYXR0cmlidXRlcy50YWdOYW1lLnRvVXBwZXJDYXNlKCkgfTtcbiAgICBpZiAoYy5hdHRyaWJ1dGVzLnRhZ05hbWUgPT09ICdpbnB1dCcgJiYgYy5hdHRyaWJ1dGVzLnR5cGUgJiYgYy5hdHRyaWJ1dGVzLnR5cGUgIT09ICd0ZXh0Jykge1xuICAgICAgYS50eXBlID0gYy5hdHRyaWJ1dGVzLnR5cGU7XG4gICAgfVxuICAgIHJldHVybiBhO1xuICB9O1xuXG4gIGNvbnN0IGlubmVyVGV4dFBhdGggPSAocGF0aDogc3RyaW5nLCBvcGVyYXRvcjogJ3NpbXBsZScgfCAncmVjdXJzaXZlJywgYXR0cmlidXRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPik6IFRyYXZlcnNhbFBhdGhbXSA9PiBbXG4gICAgeyBwYXRoLCBvcGVyYXRvciwgYXR0cmlidXRlcyB9LFxuICBdO1xuXG4gIGZvciAoY29uc3QgYyBvZiBjb250cm9scykge1xuICAgIHN3aXRjaCAoYy5sYWJlbFN0cmF0ZWd5KSB7XG4gICAgICBjYXNlICdwYXJlbnQtbGFiZWwnOlxuICAgICAgICBwdXNoKHtcbiAgICAgICAgICBpZDogJycsIHJvbGU6IGMucm9sZSwgcGFyZW50Um9sZTogYy5wYXJlbnRSb2xlLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IGlucHV0QXR0cnMoYyksXG4gICAgICAgICAgcGF0aHM6IGlubmVyVGV4dFBhdGgoJ1BSJywgJ3NpbXBsZScsIHsgVGFnTmFtZTogJ2xhYmVsJyB9KSxcbiAgICAgICAgICBtZXRob2Q6ICdpbm5lclRleHQnLFxuICAgICAgICAgIHJlYXNvbjogYExhYmVsIGZvdW5kIGJ5IHdyYXBwaW5nIDxsYWJlbD4gKGUuZy4gJHtjLmxvY2F0aW9uLmNzc1NlbGVjdG9yfSkuYCxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2libGluZy1sYWJlbCc6XG4gICAgICAgIHB1c2goe1xuICAgICAgICAgIGlkOiAnJywgcm9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBjLnBhcmVudFJvbGUsXG4gICAgICAgICAgYXR0cmlidXRlczogaW5wdXRBdHRycyhjKSxcbiAgICAgICAgICBwYXRoczogaW5uZXJUZXh0UGF0aCgnUFMnLCAnc2ltcGxlJywgeyBUYWdOYW1lOiAnbGFiZWwnIH0pLFxuICAgICAgICAgIG1ldGhvZDogJ2lubmVyVGV4dCcsXG4gICAgICAgICAgcmVhc29uOiBgTGFiZWwgZm91bmQgYXMgc2libGluZyA8bGFiZWw+IChlLmcuICR7Yy5sb2NhdGlvbi5jc3NTZWxlY3Rvcn0pLmAsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ25lYXJlc3QtdGV4dCc6XG4gICAgICAgIHB1c2goe1xuICAgICAgICAgIGlkOiAnJywgcm9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBjLnBhcmVudFJvbGUsXG4gICAgICAgICAgYXR0cmlidXRlczogaW5wdXRBdHRycyhjKSxcbiAgICAgICAgICBwYXRoczogaW5uZXJUZXh0UGF0aCgnUFMnLCAnc2ltcGxlJywge30pLFxuICAgICAgICAgIG1ldGhvZDogJ2lubmVyVGV4dCcsXG4gICAgICAgICAgcmVhc29uOiBgTGFiZWwgdGFrZW4gZnJvbSB0aGUgbmVhcmVzdCBwcmVjZWRpbmcgdGV4dCBub2RlICgke2MubG9jYXRpb24uY3NzU2VsZWN0b3J9KS5gLFxuICAgICAgICB9KTtcbiAgICAgICAgcHVzaCh7XG4gICAgICAgICAgaWQ6ICcnLCByb2xlOiBjLnJvbGUsIHBhcmVudFJvbGU6IGMucGFyZW50Um9sZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBpbnB1dEF0dHJzKGMpLFxuICAgICAgICAgIHBhdGhzOiBpbm5lclRleHRQYXRoKCdQUicsICdyZWN1cnNpdmUnLCB7IFRhZ05hbWU6ICdsYWJlbCcgfSksXG4gICAgICAgICAgbWV0aG9kOiAnaW5uZXJUZXh0JyxcbiAgICAgICAgICByZWFzb246IGBGYWxsYmFjazogd2FsayBwYXJlbnRzIGZvciBhIDxsYWJlbD4gY29udGFpbmluZyB0aGUgY29udHJvbC5gLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0YWJsZS1oZWFkZXInOlxuICAgICAgICBwdXNoKHtcbiAgICAgICAgICBpZDogJycsIHJvbGU6IGMucm9sZSwgcGFyZW50Um9sZTogYy5wYXJlbnRSb2xlLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IGlucHV0QXR0cnMoYyksXG4gICAgICAgICAgcGF0aHM6IGlubmVyVGV4dFBhdGgoJ1BSJywgJ3JlY3Vyc2l2ZScsIHsgVGFnTmFtZTogJ3RyJyB9KSxcbiAgICAgICAgICBtZXRob2Q6ICdpbm5lclRleHQnLFxuICAgICAgICAgIHJlYXNvbjogYExhYmVsIGRlcml2ZWQgZnJvbSB0aGUgdGFibGUgaGVhZGVyIC8gcm93IHRleHQgKCR7Yy5sb2NhdGlvbi5jc3NTZWxlY3Rvcn0pLmAsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Zvcm0tZ3JvdXAnOlxuICAgICAgICBwdXNoKHtcbiAgICAgICAgICBpZDogJycsIHJvbGU6IGMucm9sZSwgcGFyZW50Um9sZTogYy5wYXJlbnRSb2xlLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IGlucHV0QXR0cnMoYyksXG4gICAgICAgICAgcGF0aHM6IGlubmVyVGV4dFBhdGgoJ1BSJywgJ3JlY3Vyc2l2ZScsIHsgVGFnTmFtZTogJ2xhYmVsJyB9KSxcbiAgICAgICAgICBtZXRob2Q6ICdpbm5lclRleHQnLFxuICAgICAgICAgIHJlYXNvbjogYExhYmVsIGluc2lkZSBhIGZvcm0tZ3JvdXAgd3JhcHBlciAoJHtjLmxvY2F0aW9uLmNzc1NlbGVjdG9yfSkuYCxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVsZXMgPSBbLi4uc2Vlbi52YWx1ZXMoKV0uc29ydCgoYSwgYikgPT4gYS5yb2xlIC0gYi5yb2xlIHx8IGEucGF0aHNbMF0ucGF0aC5sb2NhbGVDb21wYXJlKGIucGF0aHNbMF0ucGF0aCkpO1xuICBydWxlcy5mb3JFYWNoKChyLCBpKSA9PiB7IHIuaWQgPSBgVExfJHtpICsgMX1gOyB9KTtcbiAgcmV0dXJuIHJ1bGVzO1xufVxuXG4vKipcbiAqIFN1Z2dlc3QgbWlzc2luZyBsYWJlbCBydWxlcyAoYm9udXMgZmVhdHVyZSk6IGNvbnRyb2xzIHdpdGggbm8gbGFiZWwgYXQgYWxsLlxuICogUmV0dXJucyBodW1hbi1yZWFkYWJsZSBzdWdnZXN0aW9ucyBzaG93biBpbiB0aGUgZGlhZ25vc3RpY3MgcGFuZWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0TWlzc2luZ0xhYmVscyhjb250cm9sczogRGV0ZWN0ZWRDb250cm9sW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IG1pc3NpbmcgPSBjb250cm9scy5maWx0ZXIoKGMpID0+ICFjLmxhYmVsICYmIGMucm9sZSAhPT0gMjQgJiYgYy5yb2xlICE9PSAyOCAmJiBjLnJvbGUgIT09IDI5ICYmIGMucm9sZSAhPT0gMTApO1xuICByZXR1cm4gbWlzc2luZy5tYXAoXG4gICAgKGMpID0+XG4gICAgICBgQWRkIGFyaWEtbGFiZWwgb3IgPGxhYmVsIGZvcj1cIiR7Yy5hdHRyaWJ1dGVzLmlkIHx8ICdcdTIwMjYnfVwiPiBmb3IgdGhlICR7Yy5yb2xlTmFtZX0gYXQgJHtjLmxvY2F0aW9uLmNzc1NlbGVjdG9yfS5gXG4gICk7XG59XG4iLCAiLyoqXG4gKiB0eXBlcy50cyBcdTIwMTQgU2hhcmVkIHR5cGUgbW9kZWwgZm9yIHRoZSBFcGlwbGV4IElFIFJ1bGVzIEdlbmVyYXRvci5cbiAqXG4gKiBUaGVzZSB0eXBlcyBhcmUgdXNlZCBieSB0aGUgY29udGVudCBzY3JpcHQgKERPTSBzY2FubmluZyksIHRoZSBwb3B1cFxuICogKHJ1bGUgZ2VuZXJhdGlvbiAvIHByZXZpZXcpLCBhbmQgdGhlIHB1cmUgcnVsZSBlbmdpbmVzLiBFdmVyeXRoaW5nIGluXG4gKiB0aGlzIG1vZHVsZSBpcyBwbGFpbiBkYXRhIFx1MjAxNCBzYWZlIHRvIHBhc3MgdGhyb3VnaCBjaHJvbWUucnVudGltZSBtZXNzYWdlcy5cbiAqL1xuXG4vKiogRXBpcGxleCBDdXJyZW50Um9sZSBudW1lcmljIGNvZGVzIChzdGFibGUgYWNyb3NzIElFQWRhcHRvci54bWwgdmVyc2lvbnMpLiAqL1xuZXhwb3J0IHR5cGUgUm9sZUlkID1cbiAgfCAzICAgLy8gU2Nyb2xsIGJhclxuICB8IDEwICAvLyBDb250YWluZXIgLyBncm91cFxuICB8IDEyICAvLyBNZW51IGl0ZW1cbiAgfCAyNCAgLy8gVGFibGVcbiAgfCAyOCAgLy8gVGFibGUgcm93XG4gIHwgMjkgIC8vIFRhYmxlIGNlbGxcbiAgfCAzMCAgLy8gTGlua1xuICB8IDM0ICAvLyBMaXN0IGl0ZW0gLyBvcHRpb25cbiAgfCAzNyAgLy8gVGFiXG4gIHwgNDAgIC8vIEltYWdlXG4gIHwgNDEgIC8vIFRleHRcbiAgfCA0MiAgLy8gVGV4dCBib3hcbiAgfCA0MyAgLy8gQnV0dG9uXG4gIHwgNDQgIC8vIENoZWNrYm94XG4gIHwgNDUgIC8vIFJhZGlvIGJ1dHRvblxuICB8IDQ2ICAvLyBEcm9wZG93blxuICB8IDgyICAvLyBJY29uXG4gIHwgODYgIC8vIE1lbnVcbiAgfCA5MjsgLy8gRGF0ZSBjb250cm9sXG5cbi8qKiBIdW1hbi1yZWFkYWJsZSByb2xlIGluZm8sIGluY2x1ZGluZyB0aGUgaGlnaGxpZ2h0IGNvbG91ciB1c2VkIGZvciB2aXN1YWwgaW5zcGVjdGlvbi4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm9sZUluZm8ge1xuICBpZDogUm9sZUlkO1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvbG9yOiBzdHJpbmc7XG59XG5cbi8qKiBNYXN0ZXIgcm9sZSB0YWJsZS4gRnV0dXJlIHJvbGVzIGNhbiBiZSBhZGRlZCBoZXJlIG9yIHZpYSB0aGUgc2V0dGluZ3MgSlNPTi4gKi9cbmV4cG9ydCBjb25zdCBST0xFUzogUmVjb3JkPG51bWJlciwgUm9sZUluZm8+ID0ge1xuICAzOiAgeyBpZDogMywgIG5hbWU6ICdTY3JvbGwgYmFyJywgICAgICAgIGNvbG9yOiAnIzllOWU5ZScgfSxcbiAgMTA6IHsgaWQ6IDEwLCBuYW1lOiAnQ29udGFpbmVyIC8gR3JvdXAnLCBjb2xvcjogJyM4ZDZlNjMnIH0sXG4gIDEyOiB7IGlkOiAxMiwgbmFtZTogJ01lbnUgaXRlbScsICAgICAgICAgY29sb3I6ICcjNGExNDhjJyB9LFxuICAyNDogeyBpZDogMjQsIG5hbWU6ICdUYWJsZScsICAgICAgICAgICAgIGNvbG9yOiAnIzAwNjk1YycgfSxcbiAgMjg6IHsgaWQ6IDI4LCBuYW1lOiAnVGFibGUgcm93JywgICAgICAgICBjb2xvcjogJyMwMDg5N2InIH0sXG4gIDI5OiB7IGlkOiAyOSwgbmFtZTogJ1RhYmxlIGNlbGwnLCAgICAgICAgY29sb3I6ICcjMjZhNjlhJyB9LFxuICAzMDogeyBpZDogMzAsIG5hbWU6ICdMaW5rJywgICAgICAgICAgICAgIGNvbG9yOiAnIzE1NjVjMCcgfSxcbiAgMzQ6IHsgaWQ6IDM0LCBuYW1lOiAnTGlzdCBpdGVtIC8gT3B0aW9uJyxjb2xvcjogJyM1ZTM1YjEnIH0sXG4gIDM3OiB7IGlkOiAzNywgbmFtZTogJ1RhYicsICAgICAgICAgICAgICAgY29sb3I6ICcjZjU3ZjE3JyB9LFxuICA0MDogeyBpZDogNDAsIG5hbWU6ICdJbWFnZScsICAgICAgICAgICAgIGNvbG9yOiAnI2FkMTQ1NycgfSxcbiAgNDE6IHsgaWQ6IDQxLCBuYW1lOiAnVGV4dCcsICAgICAgICAgICAgICBjb2xvcjogJyM1NDZlN2EnIH0sXG4gIDQyOiB7IGlkOiA0MiwgbmFtZTogJ1RleHQgYm94JywgICAgICAgICAgY29sb3I6ICcjMDI3N2JkJyB9LFxuICA0MzogeyBpZDogNDMsIG5hbWU6ICdCdXR0b24nLCAgICAgICAgICAgIGNvbG9yOiAnI2QzMmYyZicgfSxcbiAgNDQ6IHsgaWQ6IDQ0LCBuYW1lOiAnQ2hlY2tib3gnLCAgICAgICAgICBjb2xvcjogJyMyZTdkMzInIH0sXG4gIDQ1OiB7IGlkOiA0NSwgbmFtZTogJ1JhZGlvIGJ1dHRvbicsICAgICAgY29sb3I6ICcjZjlhODI1JyB9LFxuICA0NjogeyBpZDogNDYsIG5hbWU6ICdEcm9wZG93bicsICAgICAgICAgIGNvbG9yOiAnI2U2NTEwMCcgfSxcbiAgODI6IHsgaWQ6IDgyLCBuYW1lOiAnSWNvbicsICAgICAgICAgICAgICBjb2xvcjogJyM2ZDRjNDEnIH0sXG4gIDg2OiB7IGlkOiA4NiwgbmFtZTogJ01lbnUnLCAgICAgICAgICAgICAgY29sb3I6ICcjN2IxZmEyJyB9LFxuICA5MjogeyBpZDogOTIsIG5hbWU6ICdEYXRlIGNvbnRyb2wnLCAgICAgIGNvbG9yOiAnIzAwODM4ZicgfSxcbn07XG5cbmV4cG9ydCBjb25zdCByb2xlTmFtZSA9IChpZDogUm9sZUlkIHwgbnVtYmVyKTogc3RyaW5nID0+XG4gIChST0xFU1tpZF0gJiYgUk9MRVNbaWRdLm5hbWUpIHx8IGBSb2xlICR7aWR9YDtcblxuZXhwb3J0IGNvbnN0IHJvbGVDb2xvciA9IChpZDogUm9sZUlkIHwgbnVtYmVyKTogc3RyaW5nID0+XG4gIChST0xFU1tpZF0gJiYgUk9MRVNbaWRdLmNvbG9yKSB8fCAnIzYwN2Q4Yic7XG5cbi8qKiBBdHRyaWJ1dGVzIGNhcHR1cmVkIGZyb20gYSBET00gZWxlbWVudCAoc2FmZSBzdWJzZXQsIHNlcmlhbGl6YWJsZSkuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xBdHRyaWJ1dGVzIHtcbiAgdGFnTmFtZTogc3RyaW5nO1xuICB0eXBlPzogc3RyaW5nO1xuICByb2xlPzogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIGFyaWFMYWJlbGxlZGJ5Pzogc3RyaW5nO1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHZhbHVlPzogc3RyaW5nO1xuICBocmVmPzogc3RyaW5nO1xuICBhbHQ/OiBzdHJpbmc7XG4gIGNoZWNrZWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRvbmx5PzogYm9vbGVhbjtcbiAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG4gIGNvbnRlbnRFZGl0YWJsZT86IGJvb2xlYW47XG4gIC8qKiBBcmJpdHJhcnkgZGF0YS0qIGF0dHJpYnV0ZXMgKGNhbWVsLWNhc2VkIHN1ZmZpeCBcdTIxOTIgdmFsdWUpLiAqL1xuICBkYXRhPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgLyoqIFNob3J0IGlubmVyVGV4dCBzbmlwcGV0IGZvciBwcmV2aWV3IC8gZGlhZ25vc3RpY3MuICovXG4gIHRleHQ/OiBzdHJpbmc7XG59XG5cbi8qKiBYUGF0aCArIENTUyBzZWxlY3RvciB0aGF0IHVuaXF1ZWx5IGxvY2F0ZXMgYSBjb250cm9sIG9uIHRoZSBwYWdlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb250cm9sTG9jYXRpb24ge1xuICB4cGF0aDogc3RyaW5nO1xuICBjc3NTZWxlY3Rvcjogc3RyaW5nO1xufVxuXG4vKiogSG93IHRoZSBjb25maWRlbmNlIHNjb3JlIHdhcyBkZXJpdmVkIFx1MjAxNCBzaG93biBpbiB0aGUgZGlhZ25vc3RpY3MgcGFuZWwuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZGVuY2VCcmVha2Rvd24ge1xuICB0YWc6IG51bWJlciB8IG51bGw7ICAgICAgICAvLyBlLmcuIDk1IFx1MjAxNCBtYXRjaGVkIGJ5IHRhZyBuYW1lICsgdHlwZVxuICByb2xlQXR0cjogbnVtYmVyIHwgbnVsbDsgICAvLyBlLmcuIDg4IFx1MjAxNCBtYXRjaGVkIGJ5IHJvbGU9XCJcIiBhdHRyaWJ1dGVcbiAga2xhc3M6IG51bWJlciB8IG51bGw7ICAgICAgLy8gZS5nLiA3NiBcdTIwMTQgbWF0Y2hlZCBieSBjbGFzcyBuYW1lXG4gIGZyYW1ld29yazogbnVtYmVyIHwgbnVsbDsgIC8vIGUuZy4gOTAgXHUyMDE0IG1hdGNoZWQgYnkgZnJhbWV3b3JrLXNwZWNpZmljIGNsYXNzXG4gIGFyaWE6IG51bWJlciB8IG51bGw7ICAgICAgIC8vIGUuZy4gNzAgXHUyMDE0IG1hdGNoZWQgYnkgQVJJQSBhdHRyaWJ1dGVzXG59XG5cbi8qKiBBIHNpbmdsZSBjb250cm9sIGRldGVjdGVkIG9uIHRoZSBwYWdlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZXRlY3RlZENvbnRyb2wge1xuICAvKiogVW5pcXVlIGluc3RhbmNlIGlkICh1c2VkIGJ5IHRoZSBoaWdobGlnaHQgb3ZlcmxheSArIHBvcHVwIHRhYmxlKS4gKi9cbiAgdWlkOiBzdHJpbmc7XG4gIHJvbGU6IFJvbGVJZDtcbiAgcm9sZU5hbWU6IHN0cmluZztcbiAgLyoqIE92ZXJhbGwgY29uZmlkZW5jZSAwXHUyMDEzMTAwIChoaWdoZXN0IGNvbnRyaWJ1dGluZyBzaWduYWwpLiAqL1xuICBjb25maWRlbmNlOiBudW1iZXI7XG4gIGNvbmZpZGVuY2VCcmVha2Rvd246IENvbmZpZGVuY2VCcmVha2Rvd247XG4gIGF0dHJpYnV0ZXM6IENvbnRyb2xBdHRyaWJ1dGVzO1xuICAvKiogUmVzb2x2ZWQgaHVtYW4tcmVhZGFibGUgbGFiZWwsIGlmIGFueS4gKi9cbiAgbGFiZWw6IHN0cmluZyB8IG51bGw7XG4gIC8qKiBEZXNjcmlwdGlvbiBvZiB0aGUgbGFiZWwgc3RyYXRlZ3kgdGhhdCBzdWNjZWVkZWQgKGRpYWdub3N0aWNzKS4gKi9cbiAgbGFiZWxNZXRob2Q6IHN0cmluZztcbiAgbG9jYXRpb246IENvbnRyb2xMb2NhdGlvbjtcbiAgLyoqIEZyYW1ld29yayBrZXkgZGV0ZWN0ZWQgZm9yIHRoaXMgZWxlbWVudCwgZS5nLiBcIkFuZ3VsYXIgTWF0ZXJpYWxcIi4gKi9cbiAgZnJhbWV3b3JrOiBzdHJpbmcgfCBudWxsO1xuICAvKiogVGhlIGZyYW1ld29yayBjbGFzcyB0aGF0IHRyaWdnZXJlZCByb2xlIGRldGVjdGlvbiwgZS5nLiBcIm1hdC1zZWxlY3RcIi4gKi9cbiAgZnJhbWV3b3JrQ2xhc3M6IHN0cmluZyB8IG51bGw7XG4gIC8qKiBIdW1hbi1yZWFkYWJsZSByZWFzb24gdGhpcyBydWxlIHdhcyBnZW5lcmF0ZWQgKGRpYWdub3N0aWNzKS4gKi9cbiAgcmVhc29uOiBzdHJpbmc7XG4gIC8qKiBQYXJlbnQgY29udGFpbmVyIHJvbGUsIHdoZW4gdGhlIGVsZW1lbnQgbGl2ZXMgaW5zaWRlIGEga25vd24gY29udGFpbmVyLiAqL1xuICBwYXJlbnRSb2xlOiBSb2xlSWQgfCBudWxsO1xuICAvKiogVmlzaWJsZSB0ZXh0IChmb3IgdGFibGVzOiB0aGUgY2VsbCB0ZXh0KS4gKi9cbiAgZGlzcGxheVRleHQ6IHN0cmluZztcbiAgLyoqIFZpc2libGUgdGV4dCBvZiBhIG5laWdoYm91cmluZyBzaWJsaW5nIC8gcGFyZW50IHRleHQgbm9kZSAoYnJhbmQvbG9nbyBsYWJlbHMgc3VjaCBhcyBcIkNoYXRHUFRcIikuICovXG4gIGFkamFjZW50VGV4dD86IHN0cmluZztcbiAgLyoqIFdoaWNoIGxhYmVsIHN0cmF0ZWd5IGZvdW5kIHRoZSBsYWJlbCAoZGlhZ25vc3RpY3MgKyBsYWJlbC1ydWxlIGdlbmVyYXRpb24pLiAqL1xuICBsYWJlbFN0cmF0ZWd5OiAnYXJpYS1sYWJlbCcgfCAnYXJpYS1sYWJlbGxlZGJ5JyB8ICdsYWJlbC1mb3InIHwgJ3BhcmVudC1sYWJlbCcgfCAnc2libGluZy1sYWJlbCcgfCAnbmVhcmVzdC10ZXh0JyB8ICd0YWJsZS1oZWFkZXInIHwgJ2Zvcm0tZ3JvdXAnIHwgJ25vbmUnO1xuICAvKiogUHJlLWJ1aWx0IHRyYXZlcnNhbCBydWxlICh3cmFwcGVyIFx1MjE5MiByZWFsIGNvbnRyb2wpLCBkaXNjb3ZlcmVkIGJ5IGNvbnRlbnQudHMuICovXG4gIHRyYXZlcnNhbFJ1bGU/OiBUcmF2ZXJzYWxSdWxlO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJ1bGUgbW9kZWwgXHUyMDE0IHRoZSBpbnRlcm1lZGlhdGUgcmVwcmVzZW50YXRpb24gZnJvbSB3aGljaCBJRUFkYXB0b3IueG1sIGlzXG4vLyBnZW5lcmF0ZWQuIFJ1bGVzIGFyZSBkZWR1cGxpY2F0ZWQgYW5kIG1lcmdlZCBiZWZvcmUgWE1MIGVtaXNzaW9uLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCB0eXBlIE9wZXJhdG9yID0gJ2VxdWFscycgfCAnY29udGFpbnMnIHwgJ3N0YXJ0c3dpdGgnIHwgJ2VuZHN3aXRoJztcblxuLyoqIE9uZSA8Q29uZGl0aW9uPiBpbnNpZGUgYSB0YWctYmFzZWQgcnVsZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGFnQ29uZGl0aW9uIHtcbiAgLyoqIFBpcGUtZGVsaW1pdGVkIHRhZyBsaXN0LCBlLmcuIFwifElOUFVUfFRFWFRBUkVBfFwiLiAqL1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIC8qKiBQaXBlLWRlbGltaXRlZCB0eXBlIGxpc3QgZm9yIGlucHV0IGVsZW1lbnRzLCBlLmcuIFwifFRFWFR8UEFTU1dPUkR8XCIuICovXG4gIHR5cGU/OiBzdHJpbmc7XG59XG5cbi8qKiBSb2xlSWRlbnRpZmllciBydWxlIG1hdGNoZWQgcHVyZWx5IGJ5IHRhZyBuYW1lICgrIG9wdGlvbmFsIHR5cGUgbGlzdCkuICovXG5leHBvcnQgaW50ZXJmYWNlIFRhZ1J1bGUge1xuICBjdXJyZW50Um9sZTogUm9sZUlkO1xuICBwYXJlbnRSb2xlOiBSb2xlSWQgfCBudWxsO1xuICBjb25kaXRpb25zOiBUYWdDb25kaXRpb25bXTtcbiAgLyoqIEh1bWFuLXJlYWRhYmxlIG9yaWdpbiwgZS5nLiBcImlucHV0IHR5cGU9ZW1haWwgb24gYWNtZS5jb21cIi4gKi9cbiAgc291cmNlOiBzdHJpbmc7XG4gIGZyYW1ld29yaz86IHN0cmluZztcbiAgY29uZmlkZW5jZTogbnVtYmVyO1xufVxuXG4vKiogUm9sZUlkZW50aWZpZXIgcnVsZSBtYXRjaGVkIGJ5IGFuIGF0dHJpYnV0ZSB2YWx1ZSAoY2xhc3MsIGlkLCBkYXRhLSosIFx1MjAyNikuICovXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZVJ1bGUge1xuICBjdXJyZW50Um9sZTogUm9sZUlkO1xuICBwYXJlbnRSb2xlOiBSb2xlSWQgfCBudWxsO1xuICAvKiogQXR0cmlidXRlIG5hbWUgYXMgd3JpdHRlbiBpbiB0aGUgWE1MOiBjbGFzc05hbWUsIGlkLCBhcmlhLWxhYmVsLCBkYXRhLSogXHUyMDI2ICovXG4gIGF0dHJpYnV0ZTogc3RyaW5nO1xuICAvKiogVmFsdWVzIE9SLWVkIHRvZ2V0aGVyIGluIG9uZSBwaXBlLWRlbGltaXRlZCBDb25kaXRpb24uICovXG4gIHZhbHVlczogc3RyaW5nW107XG4gIG9wZXJhdG9yOiBPcGVyYXRvcjtcbiAgc291cmNlOiBzdHJpbmc7XG4gIGZyYW1ld29yaz86IHN0cmluZztcbiAgY29uZmlkZW5jZTogbnVtYmVyO1xufVxuXG4vKiogT25lIHRyYXZlcnNhbCBzdGVwIGluc2lkZSBhIFRyYXZlcnNhbEluZm8gPFBhdGg+LiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmF2ZXJzYWxQYXRoIHtcbiAgLyoqIFBSIHwgQ0ggfCBQUyB8IE5TLCBvciBhIGNvbXBvdW5kIGxpa2UgUFMtQ0ggKG1hdGNoaW5nIEVwaXBsZXggc3ludGF4KS4gKi9cbiAgcGF0aDogc3RyaW5nO1xuICBvcGVyYXRvcjogJ3NpbXBsZScgfCAncmVjdXJzaXZlJztcbiAgLyoqIEF0dHJpYnV0ZSBmaWx0ZXJzIGZvciB0aGUgdHJhdmVyc2FsIHRhcmdldCwgZS5nLiB7IFRhZ05hbWU6ICdpbnB1dCcsIHR5cGU6ICdjaGVja2JveCcgfS4gKi9cbiAgYXR0cmlidXRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgLyoqIE9wdGlvbmFsIGVxdWFsaXR5IGNoZWNrIG9uIHRoZSB0YXJnZXQgKEVwaXBsZXggYENoZWNrYCBhdHRyaWJ1dGUpLiAqL1xuICBjaGVjaz86IHN0cmluZztcbn1cblxuLyoqIFJvbGVJZGVudGlmaWVyIHJ1bGUgYW5jaG9yZWQgb24gYSB2aXNpYmxlIHdyYXBwZXIgdGhhdCBtdXN0IGJlIHRyYXZlcnNlZCB0byBmaW5kIHRoZSByZWFsIGNvbnRyb2wuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYXZlcnNhbFJ1bGUge1xuICBjdXJyZW50Um9sZTogUm9sZUlkO1xuICBwYXJlbnRSb2xlOiBSb2xlSWQgfCBudWxsO1xuICAvKiogVGhlIGNvbmRpdGlvbiB0aGF0IGlkZW50aWZpZXMgdGhlIGFuY2hvciBlbGVtZW50ICh3cmFwcGVyIC8gdmlzdWFsIGNvbnRyb2wpLiAqL1xuICBjb25kaXRpb246IENvbmRpdGlvbjtcbiAgcGF0aHM6IFRyYXZlcnNhbFBhdGhbXTtcbiAgc291cmNlOiBzdHJpbmc7XG4gIGZyYW1ld29yaz86IHN0cmluZztcbiAgY29uZmlkZW5jZTogbnVtYmVyO1xufVxuXG4vKiogQSBtYXRjaCBjb25kaXRpb246IHRhZyBsaXN0LCB0eXBlIGxpc3QgYW5kL29yIGF0dHJpYnV0ZSB2YWx1ZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZGl0aW9uIHtcbiAgdGFnTmFtZT86IHN0cmluZzsgICAgIC8vIHBpcGUtZGVsaW1pdGVkXG4gIHR5cGU/OiBzdHJpbmc7ICAgICAgICAvLyBwaXBlLWRlbGltaXRlZFxuICBjbGFzc05hbWU/OiBzdHJpbmc7ICAgLy8gcGlwZS1kZWxpbWl0ZWRcbiAgYXR0cmlidXRlPzogc3RyaW5nOyAgIC8vIGUuZy4gZGF0YS1jb21wLWlkLCBpZCwgbmFtZVxuICB2YWx1ZT86IHN0cmluZzsgICAgICAgLy8gcGlwZS1kZWxpbWl0ZWQgdmFsdWUgZm9yIGBhdHRyaWJ1dGVgXG4gIG9wZXJhdG9yPzogT3BlcmF0b3I7XG59XG5cbi8qKiBMYWJlbElkZW50aWZpZXIgXHUyMDE0IFN0YW5kYXJkTG9naWMgcnVsZSAoaWQgXHUyMTk0IGxhYmVsW2Zvcl0gc3R5bGUgYXNzb2NpYXRpb25zKS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhbmRhcmRMYWJlbFJ1bGUge1xuICBpZDogc3RyaW5nO1xuICBmcm9tOiBzdHJpbmc7XG4gIHRvOiBzdHJpbmc7XG4gIG9wZXJhdG9yOiBPcGVyYXRvcjtcbiAgcmVhc29uOiBzdHJpbmc7XG59XG5cbi8qKiBMYWJlbElkZW50aWZpZXIgXHUyMDE0IFRyYXZlcnNlTG9naWMgcnVsZSAod2FsayB0aGUgRE9NIHRvIGZpbmQgdGhlIGxhYmVsIHRleHQpLiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmF2ZXJzZUxhYmVsUnVsZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHJvbGU6IFJvbGVJZDtcbiAgcGFyZW50Um9sZTogUm9sZUlkIHwgbnVsbDtcbiAgLyoqIFdoZW5Ub0NvbnNpZGVyIGF0dHJpYnV0ZXMsIGUuZy4geyBUYWdOYW1lOiAnaW5wdXQnIH0uICovXG4gIGF0dHJpYnV0ZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIC8qKiBXaGVyZVRvR28gcGF0aHMuICovXG4gIHBhdGhzOiBUcmF2ZXJzYWxQYXRoW107XG4gIC8qKiBXaGF0VG9DYWxsIG1ldGhvZCwgZS5nLiAnaW5uZXJUZXh0Jy4gKi9cbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHJlYXNvbjogc3RyaW5nO1xufVxuXG4vKiogRnVsbCBnZW5lcmF0aW9uIHJlc3VsdCBoYW5kZWQgdG8gdGhlIFhNTCB3cml0ZXIuICovXG5leHBvcnQgaW50ZXJmYWNlIFJ1bGVNb2RlbCB7XG4gIGJhc2VkT25UYWdzOiBUYWdSdWxlW107XG4gIGJhc2VkT25BdHRyaWJ1dGVzOiBBdHRyaWJ1dGVSdWxlW107XG4gIGJhc2VkT25UcmF2ZXJzZUxvZ2ljOiBUcmF2ZXJzYWxSdWxlW107XG4gIHN0YW5kYXJkTG9naWM6IFN0YW5kYXJkTGFiZWxSdWxlW107XG4gIHRyYXZlcnNlTG9naWM6IFRyYXZlcnNlTGFiZWxSdWxlW107XG4gIC8qKiBTaXRlcyB0aGUgcnVsZXMgd2VyZSBvYnNlcnZlZCBvbiAodXNlZCBmb3IgWE1MIGNvbW1lbnRzKS4gKi9cbiAgc2l0ZXM6IHN0cmluZ1tdO1xuICAvKiogRGlhZ25vc3RpY3M6IGV2ZXJ5IGdlbmVyYXRlZCBydWxlIHdpdGggaXRzIHJhdGlvbmFsZS4gKi9cbiAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNFbnRyeVtdO1xufVxuXG4vKiogT25lIGRpYWdub3N0aWNzIHJvdzogYSBydWxlICsgd2h5IGl0IHdhcyBnZW5lcmF0ZWQgKyB0ZXN0IGNhc2UgKyBzZWxlY3RvcnMuICovXG5leHBvcnQgaW50ZXJmYWNlIERpYWdub3N0aWNFbnRyeSB7XG4gIGtpbmQ6ICd0YWcnIHwgJ2F0dHJpYnV0ZScgfCAndHJhdmVyc2FsJyB8ICdsYWJlbC1zdGFuZGFyZCcgfCAnbGFiZWwtdHJhdmVyc2UnO1xuICBydWxlSWQ6IHN0cmluZztcbiAgcm9sZTogUm9sZUlkO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgY29uZmlkZW5jZTogbnVtYmVyO1xuICBmcmFtZXdvcms/OiBzdHJpbmc7XG4gIC8qKiBTYW1wbGUgcGFnZSBpbnN0YW5jZSB0aGlzIHJ1bGUgY2FtZSBmcm9tLiAqL1xuICBzYW1wbGVTZWxlY3Rvcjogc3RyaW5nO1xuICBzYW1wbGVYUGF0aDogc3RyaW5nO1xuICAvKiogR2VuZXJhdGVkIHVuaXQtdGVzdCBzbmlwcGV0IChKU0RPTS1zdHlsZSBhc3NlcnRpb24pLiAqL1xuICB0ZXN0Q2FzZTogc3RyaW5nO1xufVxuXG4vKiogU2NhbiByZXF1ZXN0L3Jlc3BvbnNlIHBheWxvYWRzIGV4Y2hhbmdlZCBiZXR3ZWVuIHBvcHVwIGFuZCBjb250ZW50IHNjcmlwdC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2NhblJlc3BvbnNlIHtcbiAgY29udHJvbHM6IERldGVjdGVkQ29udHJvbFtdO1xuICBmcmFtZXdvcmtzOiBzdHJpbmdbXTtcbiAgdXJsOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZyYW1ld29yayBkZXRlY3Rpb25cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgaW50ZXJmYWNlIEZyYW1ld29ya0luZm8ge1xuICBrZXk6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICAvKiogQ2xhc3MgbmFtZSBmcmFnbWVudHMgdGhhdCBpZGVudGlmeSB0aGUgZnJhbWV3b3JrIG9uIGEgc2luZ2xlIGVsZW1lbnQuICovXG4gIGNsYXNzUGF0dGVybnM6IFJlZ0V4cFtdO1xuICAvKiogUGFnZS1sZXZlbCBzaWduYWxzIChtZXRhIHRhZ3MsIGF0dHJpYnV0ZXMsIHRhZyBuYW1lcykuICovXG4gIHBhZ2VTaWduYWxzOiBSZWdFeHBbXTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSb2xlIG1hcHBpbmdzIFx1MjAxNCBjb25maWd1cmFibGUgdGhyb3VnaCByb2xlTWFwcGluZ3MuanNvbiAvIHNldHRpbmdzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGludGVyZmFjZSBGcmFtZXdvcmtSb2xlTWFwcGluZyB7XG4gIC8qKiBSZWdleCBmcmFnbWVudCBtYXRjaGVkIGFnYWluc3QgdGhlIGVsZW1lbnQgY2xhc3MgYXR0cmlidXRlLiAqL1xuICBjbGFzc1BhdHRlcm46IHN0cmluZztcbiAgcm9sZTogUm9sZUlkO1xuICBmcmFtZXdvcms6IHN0cmluZztcbiAgLyoqIENvbmZpZGVuY2UgYm9udXMgKGUuZy4gOTApLiAqL1xuICBjb25maWRlbmNlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXR0cmlidXRlUm9sZU1hcHBpbmcge1xuICAvKiogQXR0cmlidXRlIG5hbWU6IGNsYXNzTmFtZSwgcm9sZSwgYXJpYS1oYXNwb3B1cCwgZGF0YS1jb21wLWlkIFx1MjAyNiAqL1xuICBhdHRyaWJ1dGU6IHN0cmluZztcbiAgLyoqIFJlZ2V4IGZyYWdtZW50IG1hdGNoZWQgYWdhaW5zdCB0aGUgYXR0cmlidXRlIHZhbHVlLiAqL1xuICB2YWx1ZVBhdHRlcm46IHN0cmluZztcbiAgcm9sZTogUm9sZUlkO1xuICBjb25maWRlbmNlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9sZU1hcHBpbmdDb25maWcge1xuICAvKiogRWxlbWVudCB0aGF0IGNhbiBiZSBzY2FubmVkIGFuZCBpdHMgY29udGFpbmVyIHJvbGUsIGUuZy4geyA0MjogMTAgfS4gKi9cbiAgZGVmYXVsdFBhcmVudFJvbGVzPzogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgZnJhbWV3b3JrUm9sZU1hcHBpbmdzOiBGcmFtZXdvcmtSb2xlTWFwcGluZ1tdO1xuICBhdHRyaWJ1dGVSb2xlTWFwcGluZ3M6IEF0dHJpYnV0ZVJvbGVNYXBwaW5nW107XG4gIC8qKiBFeHRyYSBpbnB1dCB0eXBlcyBcdTIxOTIgcm9sZSBvdmVycmlkZXMgKGUuZy4gdHlwZT1yYW5nZSBcdTIxOTIgNDYpLiAqL1xuICBpbnB1dFR5cGVSb2xlcz86IFJlY29yZDxzdHJpbmcsIFJvbGVJZD47XG4gIC8qKiBFeHRyYSB0YWcgXHUyMTkyIHJvbGUgb3ZlcnJpZGVzLiAqL1xuICB0YWdSb2xlcz86IFJlY29yZDxzdHJpbmcsIFJvbGVJZD47XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ29tcGFyZSAvIG1lcmdlXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wYXJlUmVzdWx0IHtcbiAgbmV3UnVsZXM6IENvbXBhcmVSdWxlW107XG4gIG1vZGlmaWVkUnVsZXM6IENvbXBhcmVSdWxlW107XG4gIGR1cGxpY2F0ZVJ1bGVzOiBDb21wYXJlUnVsZVtdO1xuICBvYnNvbGV0ZVJ1bGVzOiBDb21wYXJlUnVsZVtdO1xuICAvKiogUnVsZXMgcHJlc2VudCBpbiB0aGUgZXhpc3RpbmcgWE1MIHRoYXQgbWF0Y2ggZ2VuZXJhdGVkIG9uZXMgMToxLiAqL1xuICBtYXRjaGVkOiBudW1iZXI7XG59XG5cbi8qKiBBIHJ1bGUgd2l0aCBlbm91Z2ggaW5mbyB0byByZW5kZXIgaW4gdGhlIGNvbXBhcmUgdGFibGUuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmVSdWxlIHtcbiAgZmluZ2VycHJpbnQ6IHN0cmluZztcbiAgcm9sZTogbnVtYmVyO1xuICBraW5kOiAndGFnJyB8ICdhdHRyaWJ1dGUnIHwgJ3RyYXZlcnNhbCcgfCAnbGFiZWwtc3RhbmRhcmQnIHwgJ2xhYmVsLXRyYXZlcnNlJztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaW5HZW5lcmF0ZWQ6IGJvb2xlYW47XG4gIGluRXhpc3Rpbmc6IGJvb2xlYW47XG59XG4iLCAiLyoqXG4gKiBydWxlRW5naW5lLnRzIFx1MjAxNCBDb3JlIHJ1bGUgZW5naW5lLlxuICpcbiAqIFB1cmUsIERPTS1saWdodCBtb2R1bGUgaW1wbGVtZW50aW5nIHRoZSBFcGlwbGV4IHJ1bGUgcGlwZWxpbmU6XG4gKiAgIGRldGVjdENvbnRyb2xSb2xlKCkgIFx1MjAxNCBpbmZlciBDdXJyZW50Um9sZSBmcm9tIHRhZ3MgLyBjbGFzc2VzIC8gcm9sZSBhdHRycyAvIGFyaWFcbiAqICAgZXh0cmFjdEF0dHJpYnV0ZXMoKSAgXHUyMDE0IGNhcHR1cmUgc2VyaWFsaXphYmxlIGF0dHJpYnV0ZXMgZm9yIHJ1bGUgYnVpbGRpbmdcbiAqICAgYnVpbGRUYWdSdWxlKCkgICAgICAgXHUyMDE0IFJvbGVJZGVudGlmaWVyIFx1MjE5MiBCYXNlZE9uVGFncyBydWxlc1xuICogICBidWlsZEF0dHJpYnV0ZVJ1bGUoKSBcdTIwMTQgUm9sZUlkZW50aWZpZXIgXHUyMTkyIEJhc2VkT25BdHRyaWJ1dGVzIHJ1bGVzXG4gKiAgIGRlZHVwbGljYXRlUnVsZXMoKSAgIFx1MjAxNCBtZXJnZSBpZGVudGljYWwgcnVsZXMsIHVuaW9uIGNvbmRpdGlvbnNcbiAqICAgZ2VuZXJhdGVSdWxlTW9kZWwoKSAgXHUyMDE0IG9yY2hlc3RyYXRlIGV2ZXJ5dGhpbmcgaW50byBhIFJ1bGVNb2RlbCBmb3IgdGhlIFhNTCB3cml0ZXJcbiAqXG4gKiBUaGUgbW9kdWxlIG9ubHkgZGVwZW5kcyBvbiBhIG1pbmltYWwgYEVsZW1lbnRMaWtlYCBzdXJmYWNlLCBzbyB0aGUgc2FtZSBjb2RlXG4gKiBydW5zIGluIHRoZSBjb250ZW50IHNjcmlwdCBhbmQgaW4gTm9kZSB1bml0IHRlc3RzLlxuICovXG5pbXBvcnQgdHlwZSB7XG4gIEF0dHJpYnV0ZVJvbGVNYXBwaW5nLFxuICBBdHRyaWJ1dGVSdWxlLFxuICBDb25maWRlbmNlQnJlYWtkb3duLFxuICBDb250cm9sQXR0cmlidXRlcyxcbiAgRGV0ZWN0ZWRDb250cm9sLFxuICBGcmFtZXdvcmtSb2xlTWFwcGluZyxcbiAgT3BlcmF0b3IsXG4gIFJvbGVJZCxcbiAgUm9sZU1hcHBpbmdDb25maWcsXG4gIFJ1bGVNb2RlbCxcbiAgU3RhbmRhcmRMYWJlbFJ1bGUsXG4gIFRhZ1J1bGUsXG4gIFRhZ0NvbmRpdGlvbixcbiAgVHJhdmVyc2VMYWJlbFJ1bGUsXG4gIFRyYXZlcnNhbFJ1bGUsXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgcm9sZU5hbWUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIE1pbmltYWwgZWxlbWVudCBzdXJmYWNlIHVzZWQgYnkgdGhlIGVuZ2luZSAocmVhbCBFbGVtZW50IHNhdGlzZmllcyB0aGlzKS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRWxlbWVudExpa2Uge1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgZ2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IG51bGw7XG4gIGdldEF0dHJpYnV0ZU5hbWVzPygpOiBzdHJpbmdbXTtcbn1cblxuLyoqIFRhZ3Mgd2hvc2UgbmF0aXZlIHNlbWFudGljcyBmdWxseSBkZXRlcm1pbmUgdGhlIHJvbGUgKHRhZyB3aW5zIG92ZXIgY2xhc3NlcykuICovXG5jb25zdCBTVFJPTkdfVEFHUyA9IG5ldyBTZXQoW1xuICAnaW5wdXQnLCAnc2VsZWN0JywgJ3RleHRhcmVhJywgJ2J1dHRvbicsICdhJywgJ2ltZycsICd0YWJsZScsICd0Ym9keScsXG4gICd0cicsICd0ZCcsICd0aCcsICdsaScsICdvcHRpb24nLCAnb3B0Z3JvdXAnLCAnc3ZnJywgJ2knLCAnbmF2JywgJ2Zvcm0nLFxuICAnZmllbGRzZXQnLFxuXSk7XG5cbi8qKiBSb2xlcyB0aGF0IGNhbiBvbmx5IGNvbWUgZnJvbSBhIHdpZGdldCBjbGFzcyAobmV2ZXIgZnJvbSBhIHBsYWluIHRleHQgdGFnKS4gKi9cbmNvbnN0IFdJREdFVF9ST0xFUyA9IG5ldyBTZXQ8Um9sZUlkPihbNDYsIDkyLCA0NCwgNDUsIDM0LCAzN10pO1xuXG4vKiogRXBpcGxleCB0eXBlIG5vcm1hbGl6YXRpb24gXHUyMDE0IG1pcnJvcnMgdGhlIGNhc2luZyB1c2VkIGluIElFQWRhcHRvci54bWwuICovXG5jb25zdCBVUFBFUl9UWVBFUyA9IG5ldyBTZXQoW1xuICAnVEVYVCcsICdQQVNTV09SRCcsICdGSUxFJywgJ05VTUJFUicsICdDT0xPUicsICdTRUFSQ0gnLCAnQ0hFQ0tCT1gnLCAnUkFESU8nLFxuICAnU1VCTUlUJywgJ1JFU0VUJywgJ0JVVFRPTicsICdJTUFHRScsICdEQVRFJywgJ1RJTUUnLCAnTU9OVEgnLCAnV0VFSycsXG5dKTtcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVUeXBlKHR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBVUFBFUl9UWVBFUy5oYXModHlwZS50b1VwcGVyQ2FzZSgpKSA/IHR5cGUudG9VcHBlckNhc2UoKSA6IHR5cGUudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqIFRhZyBuYW1lIGFzIHdyaXR0ZW4gaW4gRXBpcGxleCBjb25kaXRpb25zOiBzdGFuZGFyZCB0YWdzIHVwcGVyY2FzZSwgY3VzdG9tIGVsZW1lbnRzIGxvd2VyY2FzZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVUYWdOYW1lKHRhZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdCA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBTVEFOREFSRCA9IG5ldyBTZXQoW1xuICAgICdpbnB1dCcsICd0ZXh0YXJlYScsICdzZWxlY3QnLCAnYnV0dG9uJywgJ2EnLCAnYXJlYScsICdpbWcnLCAndGFibGUnLFxuICAgICd0cicsICd0ZCcsICd0aCcsICdsaScsICdvcHRpb24nLCAnbGFiZWwnLCAnc3BhbicsICdkaXYnLCAncCcsICdpJywgJ3N2ZycsXG4gICAgJ25hdicsICdmb3JtJywgJ2ZpZWxkc2V0JywgJ3VsJywgJ29sJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JyxcbiAgICAnbWFyaycsICdjYXB0aW9uJywgJ2xlZ2VuZCcsICdzZWN0aW9uJywgJ2FydGljbGUnLCAnaGVhZGVyJywgJ2Zvb3RlcicsXG4gICAgJ21haW4nLCAndGJvZHknLCAndGhlYWQnLCAndGZvb3QnLCAnZGQnLCAnZHQnLCAnZGwnLCAnZW0nLCAnc3Ryb25nJywgJ2InLFxuICBdKTtcbiAgcmV0dXJuIFNUQU5EQVJELmhhcyh0KSA/IHQudG9VcHBlckNhc2UoKSA6IHQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQXR0cmlidXRlIGV4dHJhY3Rpb25cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBLTk9XTl9EQVRBX0FUVFJTID0gWydkYXRhLWNvbXAtaWQnLCAnZGF0YS1jb21wb25lbnQtdHlwZScsICdkYXRhLXRlc3RpZCcsICdkYXRhLXJvbGUnLCAnZGF0YS10b2dnbGUnXTtcblxuLyoqIENhcHR1cmUgdGhlIHNlcmlhbGl6YWJsZSBhdHRyaWJ1dGUgc3VyZmFjZSBvZiBhIGNvbnRyb2wuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEF0dHJpYnV0ZXMoZWw6IEVsZW1lbnRMaWtlKTogQ29udHJvbEF0dHJpYnV0ZXMge1xuICBjb25zdCBhdHRyczogQ29udHJvbEF0dHJpYnV0ZXMgPSB7XG4gICAgdGFnTmFtZTogZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICB9O1xuICBjb25zdCBnZXQgPSAobjogc3RyaW5nKSA9PiBlbC5nZXRBdHRyaWJ1dGUobik7XG4gIGNvbnN0IHZhbCA9IChuOiBzdHJpbmcpID0+IHsgY29uc3QgdiA9IGdldChuKTsgcmV0dXJuIHYgPT09IG51bGwgPyB1bmRlZmluZWQgOiB2OyB9O1xuXG4gIGF0dHJzLnR5cGUgPSB2YWwoJ3R5cGUnKTtcbiAgYXR0cnMucm9sZSA9IHZhbCgncm9sZScpO1xuICBhdHRycy5pZCA9IHZhbCgnaWQnKTtcbiAgYXR0cnMuYXJpYUxhYmVsID0gdmFsKCdhcmlhLWxhYmVsJyk7XG4gIGF0dHJzLmFyaWFMYWJlbGxlZGJ5ID0gdmFsKCdhcmlhLWxhYmVsbGVkYnknKTtcbiAgYXR0cnMucGxhY2Vob2xkZXIgPSB2YWwoJ3BsYWNlaG9sZGVyJyk7XG4gIGF0dHJzLnRpdGxlID0gdmFsKCd0aXRsZScpO1xuICBhdHRycy5uYW1lID0gdmFsKCduYW1lJyk7XG4gIGF0dHJzLnZhbHVlID0gdmFsKCd2YWx1ZScpO1xuICBhdHRycy5ocmVmID0gdmFsKCdocmVmJyk7XG4gIGF0dHJzLmFsdCA9IHZhbCgnYWx0Jyk7XG4gIGF0dHJzLmNoZWNrZWQgPSBnZXQoJ2NoZWNrZWQnKSAhPT0gbnVsbDtcbiAgYXR0cnMuZGlzYWJsZWQgPSBnZXQoJ2Rpc2FibGVkJykgIT09IG51bGw7XG4gIGF0dHJzLnJlYWRvbmx5ID0gZ2V0KCdyZWFkb25seScpICE9PSBudWxsO1xuICBhdHRycy5zZWxlY3RlZCA9IGdldCgnc2VsZWN0ZWQnKSAhPT0gbnVsbDtcbiAgYXR0cnMubXVsdGlwbGUgPSBnZXQoJ211bHRpcGxlJykgIT09IG51bGw7XG4gIGF0dHJzLmNvbnRlbnRFZGl0YWJsZSA9IChlbCBhcyB7IGlzQ29udGVudEVkaXRhYmxlPzogYm9vbGVhbiB9KS5pc0NvbnRlbnRFZGl0YWJsZSB8fCBnZXQoJ2NvbnRlbnRlZGl0YWJsZScpID09PSAndHJ1ZSc7XG5cbiAgY29uc3QgY2xzID0gZWwuY2xhc3NOYW1lICE9PSB1bmRlZmluZWQgJiYgZWwuY2xhc3NOYW1lICE9PSBudWxsXG4gICAgPyBTdHJpbmcoZWwuY2xhc3NOYW1lKVxuICAgIDogKGdldCgnY2xhc3MnKSB8fCAnJyk7XG4gIGF0dHJzLmNsYXNzTmFtZSA9IGNscyB8fCB1bmRlZmluZWQ7XG5cbiAgY29uc3QgZGF0YTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBpZiAoZWwuZ2V0QXR0cmlidXRlTmFtZXMpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgZWwuZ2V0QXR0cmlidXRlTmFtZXMoKSkge1xuICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnZGF0YS0nKSkgZGF0YVtuYW1lLnJlcGxhY2UoL15kYXRhLS8sICcnKS5yZXBsYWNlKC8tKFthLXpdKS9nLCAoXywgYykgPT4gYy50b1VwcGVyQ2FzZSgpKV0gPSBnZXQobmFtZSkgfHwgJyc7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiBLTk9XTl9EQVRBX0FUVFJTKSB7XG4gICAgICBjb25zdCB2ID0gZ2V0KG5hbWUpO1xuICAgICAgaWYgKHYgIT09IG51bGwpIGRhdGFbbmFtZV0gPSB2O1xuICAgIH1cbiAgfVxuICBpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID4gMCkgYXR0cnMuZGF0YSA9IGRhdGE7XG5cbiAgcmV0dXJuIGF0dHJzO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJvbGUgZGV0ZWN0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGludGVyZmFjZSBSb2xlRGV0ZWN0aW9uIHtcbiAgcm9sZTogUm9sZUlkO1xuICBjb25maWRlbmNlOiBudW1iZXI7XG4gIGJyZWFrZG93bjogQ29uZmlkZW5jZUJyZWFrZG93bjtcbiAgcmVhc29uOiBzdHJpbmc7XG4gIGZyYW1ld29yazogc3RyaW5nIHwgbnVsbDtcbiAgZnJhbWV3b3JrQ2xhc3M6IHN0cmluZyB8IG51bGw7XG59XG5cbmZ1bmN0aW9uIGNsZWFuQnJlYWtkb3duKCk6IENvbmZpZGVuY2VCcmVha2Rvd24ge1xuICByZXR1cm4geyB0YWc6IG51bGwsIHJvbGVBdHRyOiBudWxsLCBrbGFzczogbnVsbCwgZnJhbWV3b3JrOiBudWxsLCBhcmlhOiBudWxsIH07XG59XG5cbmZ1bmN0aW9uIG1hdGNoRnJhbWV3b3JrQ2xhc3MoXG4gIGVsOiBFbGVtZW50TGlrZSxcbiAgY29uZmlnOiBSb2xlTWFwcGluZ0NvbmZpZ1xuKTogeyBtYXBwaW5nOiBGcmFtZXdvcmtSb2xlTWFwcGluZzsgY2xhc3NUb2tlbjogc3RyaW5nIH0gfCBudWxsIHtcbiAgY29uc3QgY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICE9PSB1bmRlZmluZWQgJiYgZWwuY2xhc3NOYW1lICE9PSBudWxsID8gU3RyaW5nKGVsLmNsYXNzTmFtZSkgOiAoZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnKTtcbiAgaWYgKCFjbGFzc05hbWUpIHJldHVybiBudWxsO1xuICBsZXQgYmVzdDogeyBtYXBwaW5nOiBGcmFtZXdvcmtSb2xlTWFwcGluZzsgY2xhc3NUb2tlbjogc3RyaW5nOyBzY29yZTogbnVtYmVyIH0gfCBudWxsID0gbnVsbDtcbiAgZm9yIChjb25zdCBtIG9mIGNvbmZpZy5mcmFtZXdvcmtSb2xlTWFwcGluZ3MpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKG0uY2xhc3NQYXR0ZXJuKTtcbiAgICAgIGNvbnN0IG0yID0gY2xhc3NOYW1lLm1hdGNoKHJlKTtcbiAgICAgIGlmICghbTIpIGNvbnRpbnVlO1xuICAgICAgLy8gUHJlZmVyIHRoZSBoaWdoZXN0LWNvbmZpZGVuY2UgbWFwcGluZzsgdGllLWJyZWFrIGJ5IGxvbmdlc3QgbWF0Y2hlZFxuICAgICAgLy8gdG9rZW4gKGUuZy4gXCJzbGRzLWNvbWJvYm94X19pbnB1dFwiIFx1MjE5MiBjb21ib2JveCwgbm90IHNsZHMtaW5wdXQpLlxuICAgICAgY29uc3Qgc2NvcmUgPSBtLmNvbmZpZGVuY2UgKiAxMDAwICsgKG0yWzBdPy5sZW5ndGggfHwgMCk7XG4gICAgICBpZiAoIWJlc3QgfHwgc2NvcmUgPiBiZXN0LnNjb3JlKSBiZXN0ID0geyBtYXBwaW5nOiBtLCBjbGFzc1Rva2VuOiBtMlswXSwgc2NvcmUgfTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIG1hbGZvcm1lZCBwYXR0ZXJuIGluIHVzZXIgSlNPTiBcdTIwMTQgc2tpcFxuICAgIH1cbiAgfVxuICByZXR1cm4gYmVzdCA/IHsgbWFwcGluZzogYmVzdC5tYXBwaW5nLCBjbGFzc1Rva2VuOiBiZXN0LmNsYXNzVG9rZW4gfSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIG1hdGNoQXR0cmlidXRlUm9sZShlbDogRWxlbWVudExpa2UsIGNvbmZpZzogUm9sZU1hcHBpbmdDb25maWcpOiB7IG1hcHBpbmc6IEF0dHJpYnV0ZVJvbGVNYXBwaW5nOyB2YWx1ZTogc3RyaW5nIH0gfCBudWxsIHtcbiAgZm9yIChjb25zdCBtIG9mIGNvbmZpZy5hdHRyaWJ1dGVSb2xlTWFwcGluZ3MpIHtcbiAgICBjb25zdCB2ID0gZWwuZ2V0QXR0cmlidXRlKG0uYXR0cmlidXRlKTtcbiAgICBpZiAodiA9PT0gbnVsbCB8fCB2ID09PSAnJykgY29udGludWU7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChuZXcgUmVnRXhwKG0udmFsdWVQYXR0ZXJuKS50ZXN0KHYpKSByZXR1cm4geyBtYXBwaW5nOiBtLCB2YWx1ZTogdiB9O1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gbWFsZm9ybWVkIHBhdHRlcm4gaW4gdXNlciBKU09OIFx1MjAxNCBza2lwXG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKiogVGFnICsgdHlwZSBiYXNlZCByb2xlICg5NSUgY29uZmlkZW5jZSkuICovXG5mdW5jdGlvbiBkZXRlY3RCeVRhZyhlbDogRWxlbWVudExpa2UsIGNvbmZpZzogUm9sZU1hcHBpbmdDb25maWcpOiBSb2xlRGV0ZWN0aW9uIHwgbnVsbCB7XG4gIGNvbnN0IHRhZyA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgdGFnUm9sZXMgPSBjb25maWcudGFnUm9sZXMgfHwge307XG4gIGNvbnN0IGlucHV0VHlwZVJvbGVzID0gY29uZmlnLmlucHV0VHlwZVJvbGVzIHx8IHt9O1xuXG4gIC8vIGlucHV0IFx1MjE5MiByb2xlIGZyb20gdHlwZVxuICBpZiAodGFnID09PSAnaW5wdXQnKSB7XG4gICAgY29uc3QgdHlwZSA9IChlbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSB8fCAndGV4dCcpLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3Qgcm9sZSA9IGlucHV0VHlwZVJvbGVzW3R5cGVdO1xuICAgIGlmIChyb2xlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByb2xlLCBjb25maWRlbmNlOiA5NSxcbiAgICAgICAgYnJlYWtkb3duOiB7IC4uLmNsZWFuQnJlYWtkb3duKCksIHRhZzogOTUgfSxcbiAgICAgICAgcmVhc29uOiBgTWF0Y2hlZCA8aW5wdXQgdHlwZT1cIiR7dHlwZX1cIj4gXHUyMTkyICR7cm9sZU5hbWUocm9sZSl9ICgke3JvbGV9KWAsXG4gICAgICAgIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBpZiAodGFnID09PSAndGV4dGFyZWEnKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogNDIsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDx0ZXh0YXJlYT4gXHUyMTkyICR7cm9sZU5hbWUoNDIpfSAoNDIpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdzZWxlY3QnKSB7XG4gICAgY29uc3QgbXVsdGlwbGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ211bHRpcGxlJykgIT09IG51bGw7XG4gICAgcmV0dXJuIHsgcm9sZTogNDYsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDxzZWxlY3Qke211bHRpcGxlID8gJyBtdWx0aXBsZScgOiAnJ30+IFx1MjE5MiBEcm9wZG93biAoNDYpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdidXR0b24nKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogNDMsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDxidXR0b24+IFx1MjE5MiBCdXR0b24gKDQzKWAsIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwgfTtcbiAgfVxuICBpZiAodGFnID09PSAnYScpIHtcbiAgICByZXR1cm4geyByb2xlOiAzMCwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPGE+IFx1MjE5MiBMaW5rICgzMClgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gIH1cbiAgaWYgKHRhZyA9PT0gJ2ltZycpIHtcbiAgICByZXR1cm4geyByb2xlOiA0MCwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPGltZz4gXHUyMTkyIEltYWdlICg0MClgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gIH1cbiAgaWYgKHRhZyA9PT0gJ3RhYmxlJyB8fCB0YWcgPT09ICd0Ym9keScpIHtcbiAgICByZXR1cm4geyByb2xlOiAyNCwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPCR7dGFnfT4gXHUyMTkyIFRhYmxlICgyNClgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gIH1cbiAgaWYgKHRhZyA9PT0gJ3RyJykge1xuICAgIHJldHVybiB7IHJvbGU6IDI4LCBjb25maWRlbmNlOiA5NSwgYnJlYWtkb3duOiB7IC4uLmNsZWFuQnJlYWtkb3duKCksIHRhZzogOTUgfSwgcmVhc29uOiBgTWF0Y2hlZCA8dHI+IFx1MjE5MiBUYWJsZSByb3cgKDI4KWAsIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwgfTtcbiAgfVxuICBpZiAodGFnID09PSAndGQnIHx8IHRhZyA9PT0gJ3RoJykge1xuICAgIHJldHVybiB7IHJvbGU6IDI5LCBjb25maWRlbmNlOiA5NSwgYnJlYWtkb3duOiB7IC4uLmNsZWFuQnJlYWtkb3duKCksIHRhZzogOTUgfSwgcmVhc29uOiBgTWF0Y2hlZCA8JHt0YWd9PiBcdTIxOTIgVGFibGUgY2VsbCAoMjkpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdsaScgfHwgdGFnID09PSAnb3B0aW9uJyB8fCB0YWcgPT09ICdvcHRncm91cCcpIHtcbiAgICByZXR1cm4geyByb2xlOiAzNCwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPCR7dGFnfT4gXHUyMTkyIExpc3QgaXRlbSAvIG9wdGlvbiAoMzQpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdsYWJlbCcpIHtcbiAgICByZXR1cm4geyByb2xlOiA0MSwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPGxhYmVsPiBcdTIxOTIgVGV4dCAoNDEpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdzdmcnIHx8IHRhZyA9PT0gJ2knKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogODIsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDwke3RhZ30+IFx1MjE5MiBJY29uICg4MilgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gIH1cbiAgaWYgKHRhZyA9PT0gJ25hdicgfHwgdGFnID09PSAnZm9ybScgfHwgdGFnID09PSAnZmllbGRzZXQnKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogMTAsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDwke3RhZ30+IFx1MjE5MiBDb250YWluZXIgKDEwKWAsIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwgfTtcbiAgfVxuICBjb25zdCBjdXN0b20gPSB0YWdSb2xlc1t0YWddO1xuICBpZiAoY3VzdG9tKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogY3VzdG9tLCBjb25maWRlbmNlOiA5NSwgYnJlYWtkb3duOiB7IC4uLmNsZWFuQnJlYWtkb3duKCksIHRhZzogOTUgfSwgcmVhc29uOiBgTWF0Y2hlZCA8JHt0YWd9PiBcdTIxOTIgJHtyb2xlTmFtZShjdXN0b20pfSAoJHtjdXN0b219KWAsIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwgfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBNYWluIHJvbGUgZGV0ZWN0aW9uLiBQcmlvcml0eSAobWlycm9ycyBFcGlwbGV4IGV2YWx1YXRpb246IGF0dHJpYnV0ZS9jbGFzc1xuICogcnVsZXMgYXJlIGNvbnN1bHRlZCBiZWZvcmUgdGFnIHJ1bGVzKTpcbiAqICAgMS4gcm9sZT1cIlwiIGF0dHJpYnV0ZSAoODgpICAgICAgICAgICAgICBcdTIwMTQgYXV0aG9yIGludGVudCAoQVJJQSB3aWRnZXRzKVxuICogICAyLiB3aWRnZXQgY2xhc3Mgb24gYSB0ZXh0LWlzaCBjb250cm9sICBcdTIwMTQgaW5wdXRbdHlwZT10ZXh0XS5kYXRlcGlja2VyIFx1MjE5MiA5MlxuICogICAzLiBzdHJvbmcgdGFnICsgdHlwZSAoOTUpICAgICAgICAgICAgICBcdTIwMTQgaW5wdXQvc2VsZWN0L2J1dHRvbi9hL2ltZy90YWJsZS9cdTIwMjZcbiAqICAgNC4gZnJhbWV3b3JrIGNsYXNzICg5MFx1MjAxMzk1KSAgICAgICAgICAgICBcdTIwMTQgbWF0LXNlbGVjdCwgc2xkcy1idXR0b24sIFx1MjAyNlxuICogICA1LiBnZW5lcmljIGNsYXNzICg3MFx1MjAxMzgwKSAgICAgICAgICAgICAgIFx1MjAxNCBjb21ib2JveCwgY2hlY2tib3gsIGNhbGVuZGFyXHUyMDI2XG4gKiAgIDYuIEFSSUEgaGludHMgKDcwXHUyMDEzODIpICAgICAgICAgICAgICAgICAgXHUyMDE0IGFyaWEtaGFzcG9wdXAvbGlzdGJveFx1MjAyNlxuICogICA3LiBkZWZhdWx0IHRhZyByb2xlICg0MSB0ZXh0IC8gMTAgY29udGFpbmVyKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0Q29udHJvbFJvbGUoXG4gIGVsOiBFbGVtZW50TGlrZSxcbiAgY29uZmlnOiBSb2xlTWFwcGluZ0NvbmZpZyxcbiAgZnJhbWV3b3JrS2V5OiBzdHJpbmcgfCBudWxsXG4pOiBSb2xlRGV0ZWN0aW9uIHtcbiAgY29uc3QgdGFnID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBicmVha2Rvd24gPSBjbGVhbkJyZWFrZG93bigpO1xuXG4gIC8vIDEuIEV4cGxpY2l0IHJvbGUgYXR0cmlidXRlIChhdXRob3IgaW50ZW50KS5cbiAgY29uc3QgYnlBdHRyID0gbWF0Y2hBdHRyaWJ1dGVSb2xlKGVsLCBjb25maWcpO1xuICBpZiAoYnlBdHRyKSB7XG4gICAgY29uc3QgeyBtYXBwaW5nLCB2YWx1ZSB9ID0gYnlBdHRyO1xuICAgIGJyZWFrZG93bi5yb2xlQXR0ciA9IG1hcHBpbmcuY29uZmlkZW5jZTtcbiAgICBpZiAobWFwcGluZy5hdHRyaWJ1dGUgPT09ICdhcmlhLWhhc3BvcHVwJyB8fCBtYXBwaW5nLmF0dHJpYnV0ZSA9PT0gJ2FyaWEtZXhwYW5kZWQnKSBicmVha2Rvd24uYXJpYSA9IG1hcHBpbmcuY29uZmlkZW5jZTtcbiAgICByZXR1cm4ge1xuICAgICAgcm9sZTogbWFwcGluZy5yb2xlLCBjb25maWRlbmNlOiBtYXBwaW5nLmNvbmZpZGVuY2UsIGJyZWFrZG93bixcbiAgICAgIHJlYXNvbjogYE1hdGNoZWQgJHttYXBwaW5nLmF0dHJpYnV0ZX09XCIke3ZhbHVlfVwiIFx1MjE5MiAke3JvbGVOYW1lKG1hcHBpbmcucm9sZSl9ICgke21hcHBpbmcucm9sZX0pYCxcbiAgICAgIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIC8vIENsYXNzIG1hcHBpbmcgKGZyYW1ld29yay1zcGVjaWZpYyBvciBnZW5lcmljIHdpZGdldCBjbGFzc2VzKS5cbiAgY29uc3QgYnlDbGFzcyA9IG1hdGNoRnJhbWV3b3JrQ2xhc3MoZWwsIGNvbmZpZyk7XG5cbiAgLy8gMi8zLiBTdHJvbmcgbmF0aXZlIHRhZ3MgXHUyMDE0IGJ1dCBhIHdpZGdldCBjbGFzcyBvbiBhIHRleHQtaXNoIGNvbnRyb2wgd2luc1xuICAvLyAoaW5wdXRbdHlwZT10ZXh0XSB3aXRoIGNsYXNzIFwiZGF0ZXBpY2tlclwiL1wiY29tYm9ib3hcIi9cIm1hdC1zZWxlY3RcIiBpcyBhXG4gIC8vIGRhdGUvZHJvcGRvd24sIG5vdCBhIHBsYWluIHRleHQgYm94KS5cbiAgaWYgKFNUUk9OR19UQUdTLmhhcyh0YWcpKSB7XG4gICAgY29uc3QgYnlUYWcgPSBkZXRlY3RCeVRhZyhlbCwgY29uZmlnKTtcbiAgICBpZiAoYnlUYWcpIHtcbiAgICAgIGlmIChieUNsYXNzICYmIGJ5VGFnLnJvbGUgPT09IDQyICYmIFdJREdFVF9ST0xFUy5oYXMoYnlDbGFzcy5tYXBwaW5nLnJvbGUpKSB7XG4gICAgICAgIGJyZWFrZG93bi5mcmFtZXdvcmsgPSBieUNsYXNzLm1hcHBpbmcuY29uZmlkZW5jZTtcbiAgICAgICAgYnJlYWtkb3duLmtsYXNzID0gYnlDbGFzcy5tYXBwaW5nLmNvbmZpZGVuY2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcm9sZTogYnlDbGFzcy5tYXBwaW5nLnJvbGUsIGNvbmZpZGVuY2U6IGJ5Q2xhc3MubWFwcGluZy5jb25maWRlbmNlLCBicmVha2Rvd24sXG4gICAgICAgICAgcmVhc29uOiBgTWF0Y2hlZCB3aWRnZXQgY2xhc3MgXCIke2J5Q2xhc3MuY2xhc3NUb2tlbn1cIiAoJHtieUNsYXNzLm1hcHBpbmcuZnJhbWV3b3JrfSkgb24gPCR7dGFnfT4gXHUyMTkyICR7cm9sZU5hbWUoYnlDbGFzcy5tYXBwaW5nLnJvbGUpfSAoJHtieUNsYXNzLm1hcHBpbmcucm9sZX0pYCxcbiAgICAgICAgICBmcmFtZXdvcms6IGZyYW1ld29ya0tleSB8fCBieUNsYXNzLm1hcHBpbmcuZnJhbWV3b3JrLFxuICAgICAgICAgIGZyYW1ld29ya0NsYXNzOiBieUNsYXNzLmNsYXNzVG9rZW4sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gYnlUYWc7XG4gICAgfVxuICB9XG5cbiAgLy8gNC81LiBGcmFtZXdvcmstc3BlY2lmaWMgLyBnZW5lcmljIGNsYXNzIG9uIGEgZ2VuZXJpYyBvciBjdXN0b20gZWxlbWVudC5cbiAgaWYgKGJ5Q2xhc3MpIHtcbiAgICBjb25zdCB7IG1hcHBpbmcsIGNsYXNzVG9rZW4gfSA9IGJ5Q2xhc3M7XG4gICAgYnJlYWtkb3duLmZyYW1ld29yayA9IG1hcHBpbmcuY29uZmlkZW5jZTtcbiAgICBicmVha2Rvd24ua2xhc3MgPSBtYXBwaW5nLmNvbmZpZGVuY2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvbGU6IG1hcHBpbmcucm9sZSwgY29uZmlkZW5jZTogbWFwcGluZy5jb25maWRlbmNlLCBicmVha2Rvd24sXG4gICAgICByZWFzb246IGBNYXRjaGVkIGZyYW1ld29yayBjbGFzcyBcIiR7Y2xhc3NUb2tlbn1cIiAoJHttYXBwaW5nLmZyYW1ld29ya30pIFx1MjE5MiAke3JvbGVOYW1lKG1hcHBpbmcucm9sZSl9ICgke21hcHBpbmcucm9sZX0pYCxcbiAgICAgIGZyYW1ld29yazogZnJhbWV3b3JrS2V5IHx8IG1hcHBpbmcuZnJhbWV3b3JrLFxuICAgICAgZnJhbWV3b3JrQ2xhc3M6IGNsYXNzVG9rZW4sXG4gICAgfTtcbiAgfVxuXG4gIC8vIDYuIEFSSUEgYXR0cmlidXRlIGhpbnRzIChjb21ib2JveCwgZGF0ZXBpY2tlclx1MjAyNikuXG4gIGZvciAoY29uc3QgW2F0dHIsIHJlLCByb2xlLCBjb25mXSBvZiBbXG4gICAgWydhcmlhLWhhc3BvcHVwJywgL2xpc3Rib3h8bWVudXx0cnVlL2ksIDQ2LCA4Ml0sXG4gICAgWydhcmlhLWV4cGFuZGVkJywgL3RydWV8ZmFsc2UvaSwgNDYsIDcwXSxcbiAgICBbJ2FyaWEtYXV0b2NvbXBsZXRlJywgL2xpc3R8aW5saW5lL2ksIDQyLCA3MF0sXG4gIF0gYXMgY29uc3QpIHtcbiAgICBjb25zdCB2ID0gZWwuZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgIGlmICh2ICYmIHJlLnRlc3QodikpIHtcbiAgICAgIGJyZWFrZG93bi5hcmlhID0gY29uZjtcbiAgICAgIHJldHVybiB7IHJvbGUsIGNvbmZpZGVuY2U6IGNvbmYsIGJyZWFrZG93biwgcmVhc29uOiBgTWF0Y2hlZCAke2F0dHJ9PVwiJHt2fVwiIFx1MjE5MiAke3JvbGVOYW1lKHJvbGUpfSAoJHtyb2xlfSlgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gICAgfVxuICB9XG5cbiAgLy8gNy4gRGVmYXVsdDogcm9sZSBmcm9tIHRoZSB0YWctbWFwcGluZyB0YWJsZSAodGV4dCB0YWdzLCBjdXN0b20gZWxlbWVudHMsXG4gIC8vIHNlbWFudGljIGNvbnRhaW5lcnMpLCBlbHNlIHBsYWluIFRleHQgKDQxKS5cbiAgY29uc3QgZGVmID0gY29uZmlnLnRhZ1JvbGVzPy5bdGFnXTtcbiAgYnJlYWtkb3duLnRhZyA9IDYwO1xuICBpZiAoZGVmICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcm9sZTogZGVmLCBjb25maWRlbmNlOiA2MCwgYnJlYWtkb3duLFxuICAgICAgcmVhc29uOiBgRGVmYXVsdCA8JHt0YWd9PiBcdTIxOTIgJHtyb2xlTmFtZShkZWYpfSAoJHtkZWZ9KWAsXG4gICAgICBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHtcbiAgICByb2xlOiA0MSwgY29uZmlkZW5jZTogNjAsIGJyZWFrZG93bixcbiAgICByZWFzb246IGBEZWZhdWx0IDwke3RhZ30+IFx1MjE5MiBUZXh0ICg0MSlgLFxuICAgIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwsXG4gIH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUnVsZSBidWlsZGluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHBpcGUodmFsdWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGNvbnN0IHVuaXEgPSBbLi4ubmV3IFNldCh2YWx1ZXMuZmlsdGVyKEJvb2xlYW4pKV07XG4gIHJldHVybiBgfCR7dW5pcS5qb2luKCd8Jyl9fGA7XG59XG5cbi8qKiBCdWlsZCBhIEJhc2VkT25UYWdzIHJ1bGUgZnJvbSBhIGNvbnRyb2wgZGV0ZWN0ZWQgYnkgdGFnLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVGFnUnVsZShjOiBEZXRlY3RlZENvbnRyb2wpOiBUYWdSdWxlIHwgbnVsbCB7XG4gIGNvbnN0IHRhZyA9IGMuYXR0cmlidXRlcy50YWdOYW1lO1xuICBjb25zdCBjb25kczogVGFnQ29uZGl0aW9uW10gPSBbXTtcbiAgLy8gSWNvbnMgKHN2Zy9pL21hdC1pY29uKSBvbmx5IGdldCBhIHRhZyBydWxlIHVuZGVyIGEgY29udGFpbmVyIChQYXJlbnRSb2xlPTEwKSxcbiAgLy8gZXhhY3RseSBsaWtlIHRoZSB3b3JraW5nIHJlZmVyZW5jZSAofGl8c3ZnfG1hdC1pY29ufCBcdTIxOTIgODIsIFBhcmVudFJvbGU9XCIxMFwiKS5cbiAgLy8gVGhpcyBrZWVwcyBpY29ucyBuZXN0ZWQgaW5zaWRlIGxpbmtzL2J1dHRvbnMgZnJvbSBvdmVycmlkaW5nIHRob3NlIGNvbnRyb2xzLlxuICBpZiAoYy5yb2xlID09PSA4MiAmJiAodGFnID09PSAnc3ZnJyB8fCB0YWcgPT09ICdpJyB8fCB0YWcgPT09ICdtYXQtaWNvbicpICYmIGMucGFyZW50Um9sZSAhPT0gMTApIHJldHVybiBudWxsO1xuICBpZiAodGFnID09PSAnaW5wdXQnKSB7XG4gICAgY29uc3QgdHlwZSA9IGMuYXR0cmlidXRlcy50eXBlIHx8ICd0ZXh0JztcbiAgICBjb25zdCB0ID0gbm9ybWFsaXplVHlwZSh0eXBlKTtcbiAgICBjb25kcy5wdXNoKHsgdGFnTmFtZTogJ3xJTlBVVHwnLCB0eXBlOiBwaXBlKFt0XSkgfSk7XG4gIH0gZWxzZSBpZiAodGFnID09PSAnc2VsZWN0Jykge1xuICAgIGNvbnN0IG11bHRpcGxlID0gYy5hdHRyaWJ1dGVzLm11bHRpcGxlID09PSB0cnVlO1xuICAgIGNvbmRzLnB1c2goeyB0YWdOYW1lOiAnfFNFTEVDVHwnLCB0eXBlOiBwaXBlKFttdWx0aXBsZSA/ICdTRUxFQ1QtTVVMVElQTEUnIDogJ1NFTEVDVC1PTkUnXSkgfSk7XG4gIH0gZWxzZSBpZiAodGFnID09PSAndGV4dGFyZWEnKSB7XG4gICAgY29uZHMucHVzaCh7IHRhZ05hbWU6ICd8VEVYVEFSRUF8JyB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25kcy5wdXNoKHsgdGFnTmFtZTogcGlwZShbbm9ybWFsaXplVGFnTmFtZSh0YWcpXSkgfSk7XG4gIH1cbiAgLy8gSW1hZ2VzIG1hdGNoIHRoZSByZWZlcmVuY2UncyB1bnJlc3RyaWN0ZWQgfElNR3wgXHUyMTkyIDQwIChQYXJlbnRSb2xlPVwiXCIpLCBzbyBhbnlcbiAgLy8gcGFyZW50LWJhc2VkIGltZyBydWxlIGlzIG5vcm1hbGl6ZWQgYXdheSB0byBrZWVwIHBhcml0eS5cbiAgY29uc3QgcGFyZW50ID0gdGFnID09PSAnaW1nJyAmJiBjLnJvbGUgPT09IDQwID8gbnVsbCA6IGMucGFyZW50Um9sZTtcbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50Um9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBwYXJlbnQsIGNvbmRpdGlvbnM6IGNvbmRzLFxuICAgIHNvdXJjZTogYy5yZWFzb24sIGZyYW1ld29yazogYy5mcmFtZXdvcmsgPz8gdW5kZWZpbmVkLCBjb25maWRlbmNlOiBjLmNvbmZpZGVuY2UsXG4gIH07XG59XG5cbi8qKiBJbnRlcmFjdGl2ZSBhbmNlc3RvciByb2xlcyB0aGF0IG93biB0aGVpciBuZXN0ZWQgaWNvbnMvaW1hZ2VzIChsaW5rL2J1dHRvbi9cdTIwMjYpLiAqL1xuY29uc3QgSU5URVJBQ1RJVkVfUEFSRU5UX1JPTEVTID0gbmV3IFNldDxSb2xlSWQ+KFszMCwgNDMsIDEyLCAzNywgNDIsIDQ0LCA0NSwgNDYsIDkyLCAzNF0pO1xuXG4vKiogQnVpbGQgYSBCYXNlZE9uQXR0cmlidXRlcyBydWxlIGZyb20gYSBjb250cm9sIGRldGVjdGVkIGJ5IGNsYXNzIC8gcm9sZSAvIGFyaWEuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBdHRyaWJ1dGVSdWxlKGM6IERldGVjdGVkQ29udHJvbCwgY29uZmlnOiBSb2xlTWFwcGluZ0NvbmZpZyk6IEF0dHJpYnV0ZVJ1bGUgfCBudWxsIHtcbiAgY29uc3QgYSA9IGMuYXR0cmlidXRlcztcbiAgLy8gR3VhcmQ6IGljb25zL2ltYWdlcyBuZXN0ZWQgaW5zaWRlIGludGVyYWN0aXZlIGNvbnRyb2xzIChsaW5rcywgYnV0dG9ucywgXHUyMDI2KVxuICAvLyBiZWxvbmcgdG8gdGhhdCBjb250cm9sIFx1MjAxNCBuZXZlciBlbWl0IGEgc3RhbmRhbG9uZSBydWxlIHRoYXQgY291bGQgc3RlYWwgaXRzXG4gIC8vIGNsaWNrIChtaXJyb3JzIHRoZSB0YWctcnVsZSByZXN0cmljdGlvbiBmb3Igc3ZnL2kvbWF0LWljb24pLlxuICBpZiAoKGMucm9sZSA9PT0gODIgfHwgYy5yb2xlID09PSA0MCkgJiYgYy5wYXJlbnRSb2xlICE9IG51bGwgJiYgSU5URVJBQ1RJVkVfUEFSRU5UX1JPTEVTLmhhcyhjLnBhcmVudFJvbGUpKSByZXR1cm4gbnVsbDtcbiAgLy8gUm9sZSBhdHRyaWJ1dGUgbWF0Y2guXG4gIGlmIChhLnJvbGUpIHtcbiAgICBjb25zdCByb2xlTWFwcGluZyA9IGNvbmZpZy5hdHRyaWJ1dGVSb2xlTWFwcGluZ3MuZmluZChcbiAgICAgIChtKSA9PiBtLmF0dHJpYnV0ZSA9PT0gJ3JvbGUnICYmIG5ldyBSZWdFeHAobS52YWx1ZVBhdHRlcm4pLnRlc3QoYS5yb2xlIHx8ICcnKVxuICAgICk7XG4gICAgaWYgKHJvbGVNYXBwaW5nKSB7XG4gICAgICByZXR1cm4geyBjdXJyZW50Um9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBjLnBhcmVudFJvbGUsIGF0dHJpYnV0ZTogJ3JvbGUnLCB2YWx1ZXM6IFthLnJvbGVdLCBvcGVyYXRvcjogJ2VxdWFscycsIHNvdXJjZTogYy5yZWFzb24sIGZyYW1ld29yazogYy5mcmFtZXdvcmsgPz8gdW5kZWZpbmVkLCBjb25maWRlbmNlOiBjLmNvbmZpZGVuY2UgfTtcbiAgICB9XG4gIH1cbiAgLy8gRnJhbWV3b3JrIC8gZ2VuZXJpYyBjbGFzcyBtYXRjaC5cbiAgY29uc3QgY2xzID0gYS5jbGFzc05hbWU7XG4gIGlmIChjbHMpIHtcbiAgICBjb25zdCB0b2tlbnMgPSBjbHMuc3BsaXQoL1xccysvKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgY29uc3QgbWFwcGVkID0gdG9rZW5zLmZpbHRlcigodCkgPT4ge1xuICAgICAgdHJ5IHsgcmV0dXJuIGNvbmZpZy5mcmFtZXdvcmtSb2xlTWFwcGluZ3Muc29tZSgobSkgPT4gbmV3IFJlZ0V4cChtLmNsYXNzUGF0dGVybikudGVzdCh0KSk7IH1cbiAgICAgIGNhdGNoIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfSk7XG4gICAgaWYgKG1hcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4geyBjdXJyZW50Um9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBjLnBhcmVudFJvbGUsIGF0dHJpYnV0ZTogJ2NsYXNzTmFtZScsIHZhbHVlczogbWFwcGVkLCBvcGVyYXRvcjogJ2NvbnRhaW5zJywgc291cmNlOiBjLnJlYXNvbiwgZnJhbWV3b3JrOiBjLmZyYW1ld29yayA/PyB1bmRlZmluZWQsIGNvbmZpZGVuY2U6IGMuY29uZmlkZW5jZSB9O1xuICAgIH1cbiAgfVxuICAvLyBkYXRhLSogaGludHMgKGUuZy4gZGF0YS1jb21wLWlkPVwiZGF0ZS1waWNrZXJcIikuXG4gIGlmIChhLmRhdGEpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhhLmRhdGEpKSB7XG4gICAgICBjb25zdCBmdWxsID0gYGRhdGEtJHtrZXkucmVwbGFjZSgvKFtBLVpdKS9nLCAnLSQxJykudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgY29uc3QgdiA9IGEuZGF0YVtrZXldO1xuICAgICAgaWYgKC8oZGF0ZXxjYWxlbmRhcikvaS50ZXN0KHYpKSB7XG4gICAgICAgIHJldHVybiB7IGN1cnJlbnRSb2xlOiBjLnJvbGUsIHBhcmVudFJvbGU6IGMucGFyZW50Um9sZSwgYXR0cmlidXRlOiBmdWxsLCB2YWx1ZXM6IFt2XSwgb3BlcmF0b3I6ICdjb250YWlucycsIHNvdXJjZTogYy5yZWFzb24sIGZyYW1ld29yazogYy5mcmFtZXdvcmsgPz8gdW5kZWZpbmVkLCBjb25maWRlbmNlOiBjLmNvbmZpZGVuY2UgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRGVkdXBsaWNhdGlvbiAmIG1lcmdpbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiB1bmlxUGlwZShsaXN0OiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIFsuLi5uZXcgU2V0KGxpc3QpXTtcbn1cblxuLyoqIE1lcmdlIHRhZyBydWxlcyB3aXRoIGlkZW50aWNhbCAocm9sZSwgcGFyZW50KSBieSB1bmlvbmluZyBjb25kaXRpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZHVwbGljYXRlVGFnUnVsZXMocnVsZXM6IFRhZ1J1bGVbXSk6IFRhZ1J1bGVbXSB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBUYWdSdWxlPigpO1xuICBmb3IgKGNvbnN0IHIgb2YgcnVsZXMpIHtcbiAgICBjb25zdCBrZXkgPSBgJHtyLmN1cnJlbnRSb2xlfXwke3IucGFyZW50Um9sZSA/PyAnJ31gO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gbWFwLmdldChrZXkpO1xuICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgIG1hcC5zZXQoa2V5LCB7IC4uLnIsIGNvbmRpdGlvbnM6IFsuLi5yLmNvbmRpdGlvbnNdIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAoY29uc3QgY29uZCBvZiByLmNvbmRpdGlvbnMpIHtcbiAgICAgIGNvbnN0IGhpdCA9IGV4aXN0aW5nLmNvbmRpdGlvbnMuZmluZCgoYzIpID0+IGMyLnRhZ05hbWUgPT09IGNvbmQudGFnTmFtZSAmJiBjMi50eXBlID09PSBjb25kLnR5cGUpO1xuICAgICAgaWYgKCFoaXQpIGV4aXN0aW5nLmNvbmRpdGlvbnMucHVzaCh7IC4uLmNvbmQgfSk7XG4gICAgfVxuICAgIGV4aXN0aW5nLmNvbmZpZGVuY2UgPSBNYXRoLm1heChleGlzdGluZy5jb25maWRlbmNlLCByLmNvbmZpZGVuY2UpO1xuICAgIGV4aXN0aW5nLnNvdXJjZSA9IFtleGlzdGluZy5zb3VyY2UsIHIuc291cmNlXS5maWx0ZXIoKHMsIGksIGFycikgPT4gYXJyLmluZGV4T2YocykgPT09IGkpLmpvaW4oJyBcdTAwQjcgJyk7XG4gIH1cbiAgLy8gTWVyZ2UgY29uZGl0aW9ucyB3aXRoIHNhbWUgdGFnTmFtZSBieSB1bmlvbmluZyB0eXBlcy5cbiAgZm9yIChjb25zdCByIG9mIG1hcC52YWx1ZXMoKSkge1xuICAgIGNvbnN0IGJ5VGFnID0gbmV3IE1hcDxzdHJpbmcsIFRhZ0NvbmRpdGlvbj4oKTtcbiAgICBmb3IgKGNvbnN0IGNvbmQgb2Ygci5jb25kaXRpb25zKSB7XG4gICAgICBjb25zdCBoaXQgPSBieVRhZy5nZXQoY29uZC50YWdOYW1lKTtcbiAgICAgIGlmICghaGl0KSB7IGJ5VGFnLnNldChjb25kLnRhZ05hbWUsIHsgLi4uY29uZCB9KTsgY29udGludWU7IH1cbiAgICAgIGlmIChjb25kLnR5cGUpIGhpdC50eXBlID0gaGl0LnR5cGUgPyBgfCR7dW5pcVBpcGUoWy4uLmhpdC50eXBlLnNsaWNlKDEsIC0xKS5zcGxpdCgnfCcpLCAuLi5jb25kLnR5cGUuc2xpY2UoMSwgLTEpLnNwbGl0KCd8JyldKS5qb2luKCd8Jyl9fGAgOiBjb25kLnR5cGU7XG4gICAgfVxuICAgIHIuY29uZGl0aW9ucyA9IFsuLi5ieVRhZy52YWx1ZXMoKV07XG4gIH1cbiAgcmV0dXJuIFsuLi5tYXAudmFsdWVzKCldO1xufVxuXG4vKiogTWVyZ2UgYXR0cmlidXRlIHJ1bGVzIHdpdGggaWRlbnRpY2FsIChyb2xlLCBwYXJlbnQsIGF0dHJpYnV0ZSwgb3BlcmF0b3IpIGJ5IHVuaW9uaW5nIHZhbHVlcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWR1cGxpY2F0ZUF0dHJpYnV0ZVJ1bGVzKHJ1bGVzOiBBdHRyaWJ1dGVSdWxlW10pOiBBdHRyaWJ1dGVSdWxlW10ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgQXR0cmlidXRlUnVsZT4oKTtcbiAgZm9yIChjb25zdCByIG9mIHJ1bGVzKSB7XG4gICAgY29uc3Qga2V5ID0gYCR7ci5jdXJyZW50Um9sZX18JHtyLnBhcmVudFJvbGUgPz8gJyd9fCR7ci5hdHRyaWJ1dGV9fCR7ci5vcGVyYXRvcn1gO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gbWFwLmdldChrZXkpO1xuICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgIG1hcC5zZXQoa2V5LCB7IC4uLnIsIHZhbHVlczogWy4uLnIudmFsdWVzXSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBleGlzdGluZy52YWx1ZXMgPSB1bmlxUGlwZShbLi4uZXhpc3RpbmcudmFsdWVzLCAuLi5yLnZhbHVlc10pO1xuICAgIGV4aXN0aW5nLmNvbmZpZGVuY2UgPSBNYXRoLm1heChleGlzdGluZy5jb25maWRlbmNlLCByLmNvbmZpZGVuY2UpO1xuICAgIGV4aXN0aW5nLnNvdXJjZSA9IFtleGlzdGluZy5zb3VyY2UsIHIuc291cmNlXS5maWx0ZXIoKHMsIGksIGFycikgPT4gYXJyLmluZGV4T2YocykgPT09IGkpLmpvaW4oJyBcdTAwQjcgJyk7XG4gIH1cbiAgcmV0dXJuIFsuLi5tYXAudmFsdWVzKCldO1xufVxuXG4vKiogR2VuZXJpYyBkZWR1cCBmb3IgcnVsZXMgd2l0aCBhIGNvbXB1dGVkIGZpbmdlcnByaW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZHVwbGljYXRlUnVsZXM8VCBleHRlbmRzIHsgY3VycmVudFJvbGU6IFJvbGVJZDsgcGFyZW50Um9sZTogUm9sZUlkIHwgbnVsbCB9PihcbiAgcnVsZXM6IFRbXSxcbiAgZmluZ2VycHJpbnQ6IChyOiBUKSA9PiBzdHJpbmdcbik6IFRbXSB7XG4gIGNvbnN0IHNlZW4gPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcbiAgZm9yIChjb25zdCByIG9mIHJ1bGVzKSB7XG4gICAgY29uc3Qga2V5ID0gZmluZ2VycHJpbnQocik7XG4gICAgaWYgKCFzZWVuLmhhcyhrZXkpKSBzZWVuLnNldChrZXksIHIpO1xuICB9XG4gIHJldHVybiBbLi4uc2Vlbi52YWx1ZXMoKV07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3JjaGVzdHJhdGlvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVsZUdlbkNvbnRleHQge1xuICBjb25maWc6IFJvbGVNYXBwaW5nQ29uZmlnO1xuICB1cmw6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgbWluQ29uZmlkZW5jZTogbnVtYmVyO1xuICBlbWl0VHJhdmVyc2FsUnVsZXM6IGJvb2xlYW47XG4gIGVtaXRMYWJlbFJ1bGVzOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIHRoZSBmdWxsIHJ1bGUgbW9kZWwgZnJvbSBkZXRlY3RlZCBjb250cm9scy5cbiAqIE9yZGVyIG9mIGVtaXNzaW9uIG1hdGNoZXMgSUVBZGFwdG9yLnhtbDogQmFzZWRPblRhZ3MgXHUyMTkyIEJhc2VkT25BdHRyaWJ1dGVzIFx1MjE5MlxuICogQmFzZWRPblRyYXZlcnNlTG9naWMgXHUyMTkyIExhYmVsSWRlbnRpZmllciAoU3RhbmRhcmRMb2dpYyArIFRyYXZlcnNlTG9naWMpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVSdWxlTW9kZWwoXG4gIGNvbnRyb2xzOiBEZXRlY3RlZENvbnRyb2xbXSxcbiAgY3R4OiBSdWxlR2VuQ29udGV4dCxcbiAgZXh0cmE/OiB7IHRyYXZlcnNhbFJ1bGVzPzogVHJhdmVyc2FsUnVsZVtdOyBsYWJlbFJ1bGVzPzogeyBzdGFuZGFyZDogU3RhbmRhcmRMYWJlbFJ1bGVbXTsgdHJhdmVyc2U6IFRyYXZlcnNlTGFiZWxSdWxlW10gfSB9XG4pOiBSdWxlTW9kZWwge1xuICBjb25zdCB0YWdSdWxlczogVGFnUnVsZVtdID0gW107XG4gIGNvbnN0IGF0dHJSdWxlczogQXR0cmlidXRlUnVsZVtdID0gW107XG5cbiAgZm9yIChjb25zdCBjIG9mIGNvbnRyb2xzKSB7XG4gICAgaWYgKGMuY29uZmlkZW5jZSA8IGN0eC5taW5Db25maWRlbmNlKSBjb250aW51ZTtcbiAgICAvLyBUYWcgcnVsZXMgY29tZSBmcm9tIHRhZy1iYXNlZCBkZXRlY3Rpb25zIG9ubHkgKGF2b2lkIGRvdWJsZSBydWxlcyBmb3IgY2xhc3MtbWF0Y2hlZCBpbnB1dHMpLlxuICAgIGlmICghYy5mcmFtZXdvcmtDbGFzcykge1xuICAgICAgY29uc3QgdHIgPSBidWlsZFRhZ1J1bGUoYyk7XG4gICAgICBpZiAodHIpIHRhZ1J1bGVzLnB1c2godHIpO1xuICAgIH1cbiAgICBjb25zdCBhciA9IGJ1aWxkQXR0cmlidXRlUnVsZShjLCBjdHguY29uZmlnKTtcbiAgICBpZiAoYXIpIGF0dHJSdWxlcy5wdXNoKGFyKTtcbiAgfVxuXG4gIGNvbnN0IGRlZHVwVGFncyA9IGRlZHVwbGljYXRlVGFnUnVsZXModGFnUnVsZXMpO1xuICBjb25zdCBkZWR1cEF0dHJzID0gZGVkdXBsaWNhdGVBdHRyaWJ1dGVSdWxlcyhhdHRyUnVsZXMpO1xuICBjb25zdCB0cmF2ZXJzYWwgPSBleHRyYT8udHJhdmVyc2FsUnVsZXMgPyBkZWR1cGxpY2F0ZVJ1bGVzKGV4dHJhLnRyYXZlcnNhbFJ1bGVzLCB0cmF2ZXJzYWxGaW5nZXJwcmludCkgOiBbXTtcbiAgY29uc3Qgc3RhbmRhcmQgPSBleHRyYT8ubGFiZWxSdWxlcyA/IGV4dHJhLmxhYmVsUnVsZXMuc3RhbmRhcmQgOiBbXTtcbiAgY29uc3QgdHJhdmVyc2UgPSBleHRyYT8ubGFiZWxSdWxlcyA/IGV4dHJhLmxhYmVsUnVsZXMudHJhdmVyc2UgOiBbXTtcblxuICByZXR1cm4ge1xuICAgIGJhc2VkT25UYWdzOiBkZWR1cFRhZ3Muc29ydCgoYSwgYikgPT4gYS5jdXJyZW50Um9sZSAtIGIuY3VycmVudFJvbGUpLFxuICAgIGJhc2VkT25BdHRyaWJ1dGVzOiBkZWR1cEF0dHJzLnNvcnQoKGEsIGIpID0+IGEuY3VycmVudFJvbGUgLSBiLmN1cnJlbnRSb2xlKSxcbiAgICBiYXNlZE9uVHJhdmVyc2VMb2dpYzogdHJhdmVyc2FsLnNvcnQoKGEsIGIpID0+IGEuY3VycmVudFJvbGUgLSBiLmN1cnJlbnRSb2xlKSxcbiAgICBzdGFuZGFyZExvZ2ljOiBzdGFuZGFyZCxcbiAgICB0cmF2ZXJzZUxvZ2ljOiB0cmF2ZXJzZSxcbiAgICBzaXRlczogW2Ake2N0eC51cmx9JHtjdHgudGl0bGUgPyBgIFx1MjAxNCAke2N0eC50aXRsZX1gIDogJyd9YF0sXG4gICAgZGlhZ25vc3RpY3M6IFtdLFxuICB9O1xufVxuXG4vKiogRmluZ2VycHJpbnQgZm9yIHRyYXZlcnNhbCBydWxlcyAoZGVkdXAga2V5KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzYWxGaW5nZXJwcmludChyOiBUcmF2ZXJzYWxSdWxlKTogc3RyaW5nIHtcbiAgY29uc3QgY29uZCA9IFtyLmNvbmRpdGlvbi50YWdOYW1lLCByLmNvbmRpdGlvbi50eXBlLCByLmNvbmRpdGlvbi5jbGFzc05hbWUsIHIuY29uZGl0aW9uLmF0dHJpYnV0ZSwgci5jb25kaXRpb24udmFsdWVdLmpvaW4oJ3wnKTtcbiAgY29uc3QgcGF0aHMgPSByLnBhdGhzLm1hcCgocCkgPT4gYCR7cC5wYXRofToke3Aub3BlcmF0b3J9OiR7SlNPTi5zdHJpbmdpZnkocC5hdHRyaWJ1dGVzKX1gKS5qb2luKCc+Jyk7XG4gIHJldHVybiBgdHJhdmVyc2FsfCR7ci5jdXJyZW50Um9sZX18JHtyLnBhcmVudFJvbGUgPz8gJyd9fCR7Y29uZH18JHtwYXRoc31gO1xufVxuXG4vKiogT3BlcmF0b3Igbm9ybWFsaXphdGlvbiBoZWxwZXIgKG1hdGNoZXMgRXBpcGxleCBhdHRyaWJ1dGUgb3BlcmF0b3JzKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0VwaXBsZXhPcGVyYXRvcihvcDogT3BlcmF0b3IpOiBzdHJpbmcge1xuICByZXR1cm4gb3AgPT09ICdzdGFydHN3aXRoJyA/ICdzdGFydHMtd2l0aCcgOiBvcCA9PT0gJ2VuZHN3aXRoJyA/ICdlbmRzLXdpdGgnIDogb3A7XG59XG4iLCAie1xuICBcIl9jb21tZW50XCI6IFwiRXBpcGxleCBJRSBSdWxlcyBHZW5lcmF0b3IgXHUyMDE0IGNvbmZpZ3VyYWJsZSByb2xlIG1hcHBpbmdzLiBFZGl0IHZhbHVlcyBoZXJlIG9yIGltcG9ydCBhbiBvdmVycmlkZSBKU09OIGZyb20gdGhlIGV4dGVuc2lvbiBTZXR0aW5ncyB0YWIuIEVhY2ggbWFwcGluZyBpcyBtYXRjaGVkIGFnYWluc3QgdGhlIGVsZW1lbnQ7IHRoZSBmaXJzdCBtYXRjaCB3aW5zLiBjb25maWRlbmNlIGlzIGEgMC0xMDAgc2NvcmUgdXNlZCBpbiB0aGUgcnVsZSBkaWFnbm9zdGljcy5cIixcbiAgXCJkZWZhdWx0UGFyZW50Um9sZXNcIjoge1xuICAgIFwiNDJcIjogMTAsXG4gICAgXCI0M1wiOiAxMCxcbiAgICBcIjQ0XCI6IDEwLFxuICAgIFwiNDVcIjogMTAsXG4gICAgXCI0NlwiOiAxMCxcbiAgICBcIjkyXCI6IDEwLFxuICAgIFwiMjlcIjogMTAsXG4gICAgXCIyOFwiOiAxMCxcbiAgICBcIjM0XCI6IDQ2LFxuICAgIFwiMzRfb3B0aW9uX2luX3NlbGVjdFwiOiA0NlxuICB9LFxuICBcImZyYW1ld29ya1JvbGVNYXBwaW5nc1wiOiBbXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcIlxcXFxibWF0LXNlbGVjdFxcXFxiXCIsIFwicm9sZVwiOiA0NiwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5NSB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtc2VsZWN0LVwiLCBcInJvbGVcIjogNDYsIFwiZnJhbWV3b3JrXCI6IFwiQW5ndWxhciBNYXRlcmlhbFwiLCBcImNvbmZpZGVuY2VcIjogOTAgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwibWF0LW9wdGlvblwiLCBcInJvbGVcIjogMzQsIFwiZnJhbWV3b3JrXCI6IFwiQW5ndWxhciBNYXRlcmlhbFwiLCBcImNvbmZpZGVuY2VcIjogOTAgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwibWF0LWNoZWNrYm94XCIsIFwicm9sZVwiOiA0NCwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtc2xpZGUtdG9nZ2xlXCIsIFwicm9sZVwiOiA0NCwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtcmFkaW9cIiwgXCJyb2xlXCI6IDQ1LCBcImZyYW1ld29ya1wiOiBcIkFuZ3VsYXIgTWF0ZXJpYWxcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcIm1hdC1kYXRlcGlja2VyXCIsIFwicm9sZVwiOiA5MiwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtY2FsZW5kYXItYm9keS1jZWxsXCIsIFwicm9sZVwiOiAyOSwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtdGFiLWxhYmVsXCIsIFwicm9sZVwiOiAzNywgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtdGFiLWxpbmtcIiwgXCJyb2xlXCI6IDM3LCBcImZyYW1ld29ya1wiOiBcIkFuZ3VsYXIgTWF0ZXJpYWxcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcIm1hdC1idXR0b258bWF0LXJhaXNlZC1idXR0b258bWF0LWljb24tYnV0dG9ufG1hdC1mYWJ8bWF0LW1pbmktZmFiXCIsIFwicm9sZVwiOiA0MywgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtZm9ybS1maWVsZFwiLCBcInJvbGVcIjogNDIsIFwiZnJhbWV3b3JrXCI6IFwiQW5ndWxhciBNYXRlcmlhbFwiLCBcImNvbmZpZGVuY2VcIjogODAgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwibWF0LW1lbnUtaXRlbVwiLCBcInJvbGVcIjogMTIsIFwiZnJhbWV3b3JrXCI6IFwiQW5ndWxhciBNYXRlcmlhbFwiLCBcImNvbmZpZGVuY2VcIjogODUgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwic2VsZWN0Mi1zZWxlY3Rpb258c2VsZWN0Mi1jb250YWluZXJcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlNlbGVjdDIgKGpRdWVyeSlcIiwgXCJjb25maWRlbmNlXCI6IDkzIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNlbGVjdDItcmVzdWx0c19fb3B0aW9uXCIsIFwicm9sZVwiOiAzNCwgXCJmcmFtZXdvcmtcIjogXCJTZWxlY3QyIChqUXVlcnkpXCIsIFwiY29uZmlkZW5jZVwiOiA5MCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJyZWFjdC1jb21ib2JveC12aWV3fHJlYWN0LXNlbGVjdFwiLCBcInJvbGVcIjogNDYsIFwiZnJhbWV3b3JrXCI6IFwiUmVhY3RcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInJlYWN0LWNvbWJvYm94LW9wdGlvblwiLCBcInJvbGVcIjogMzQsIFwiZnJhbWV3b3JrXCI6IFwiUmVhY3RcIiwgXCJjb25maWRlbmNlXCI6IDg4IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNsZHMtYnV0dG9uXCIsIFwicm9sZVwiOiA0MywgXCJmcmFtZXdvcmtcIjogXCJTYWxlc2ZvcmNlIExpZ2h0bmluZ1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwic2xkcy1pbnB1dFwiLCBcInJvbGVcIjogNDIsIFwiZnJhbWV3b3JrXCI6IFwiU2FsZXNmb3JjZSBMaWdodG5pbmdcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNsZHMtY2hlY2tib3hcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIlNhbGVzZm9yY2UgTGlnaHRuaW5nXCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJzbGRzLXJhZGlvXCIsIFwicm9sZVwiOiA0NSwgXCJmcmFtZXdvcmtcIjogXCJTYWxlc2ZvcmNlIExpZ2h0bmluZ1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwic2xkcy1jb21ib2JveHxzbGRzLXNlbGVjdFwiLCBcInJvbGVcIjogNDYsIFwiZnJhbWV3b3JrXCI6IFwiU2FsZXNmb3JjZSBMaWdodG5pbmdcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNsZHMtZGF0ZXBpY2tlclwiLCBcInJvbGVcIjogOTIsIFwiZnJhbWV3b3JrXCI6IFwiU2FsZXNmb3JjZSBMaWdodG5pbmdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNsZHMtdGFic1wiLCBcInJvbGVcIjogMzcsIFwiZnJhbWV3b3JrXCI6IFwiU2FsZXNmb3JjZSBMaWdodG5pbmdcIiwgXCJjb25maWRlbmNlXCI6IDg1IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImxpZ2h0bmluZy1idXR0b25cIiwgXCJyb2xlXCI6IDQzLCBcImZyYW1ld29ya1wiOiBcIlNhbGVzZm9yY2UgTGlnaHRuaW5nXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJsaWdodG5pbmctaW5wdXRcIiwgXCJyb2xlXCI6IDQyLCBcImZyYW1ld29ya1wiOiBcIlNhbGVzZm9yY2UgTGlnaHRuaW5nXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJsaWdodG5pbmctY29tYm9ib3hcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlNhbGVzZm9yY2UgTGlnaHRuaW5nXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJhcHBtYWdpYy1idXR0b25cIiwgXCJyb2xlXCI6IDQzLCBcImZyYW1ld29ya1wiOiBcIlBvd2VyQXBwc1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiYXBwbWFnaWMtY2hlY2tib3hcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIlBvd2VyQXBwc1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiYXBwbWFnaWMtY29tYm9ib3hcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlBvd2VyQXBwc1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiYXBwbWFnaWMtdGV4dFwiLCBcInJvbGVcIjogNDIsIFwiZnJhbWV3b3JrXCI6IFwiUG93ZXJBcHBzXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJhcHBtYWdpYy1kYXRlcGlja2VyXCIsIFwicm9sZVwiOiA5MiwgXCJmcmFtZXdvcmtcIjogXCJQb3dlckFwcHNcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImFwcG1hZ2ljLXJhZGlvXCIsIFwicm9sZVwiOiA0NSwgXCJmcmFtZXdvcmtcIjogXCJQb3dlckFwcHNcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInVpNS1pbnB1dHxzYXBNSW5wdXRcIiwgXCJyb2xlXCI6IDQyLCBcImZyYW1ld29ya1wiOiBcIlNBUCBVSTVcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInVpNS1kYXRlcGlja2VyfHNhcE1EYXRlUGlja2VyXCIsIFwicm9sZVwiOiA5MiwgXCJmcmFtZXdvcmtcIjogXCJTQVAgVUk1XCIsIFwiY29uZmlkZW5jZVwiOiA5MCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJ1aTUtc2VsZWN0fHVpLWRyb3Bkb3duXCIsIFwicm9sZVwiOiA0NiwgXCJmcmFtZXdvcmtcIjogXCJTQVAgVUk1XCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJ1aTUtb3B0aW9uXCIsIFwicm9sZVwiOiAzNCwgXCJmcmFtZXdvcmtcIjogXCJTQVAgVUk1XCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJ1aTUtYnV0dG9ufHNhcE1CdG5cIiwgXCJyb2xlXCI6IDQzLCBcImZyYW1ld29ya1wiOiBcIlNBUCBVSTVcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInVpNS1jaGVja2JveHxzYXBNQ2JcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIlNBUCBVSTVcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInVpNS1yYWRpb2J1dHRvbnxzYXBNUmJcIiwgXCJyb2xlXCI6IDQ1LCBcImZyYW1ld29ya1wiOiBcIlNBUCBVSTVcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtZHJvcGRvd25cIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtY2hlY2tib3hcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtcmFkaW9idXR0b25cIiwgXCJyb2xlXCI6IDQ1LCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtY2FsZW5kYXJcIiwgXCJyb2xlXCI6IDkyLCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtYnV0dG9uXCIsIFwicm9sZVwiOiA0MywgXCJmcmFtZXdvcmtcIjogXCJQcmltZU5HXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJwLXRhYnZpZXdcIiwgXCJyb2xlXCI6IDM3LCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDg1IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImRyb3Bkb3duLXRvZ2dsZXxidG5cIiwgXCJyb2xlXCI6IDQzLCBcImZyYW1ld29ya1wiOiBcIkJvb3RzdHJhcFwiLCBcImNvbmZpZGVuY2VcIjogNzggfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiZm9ybS1jb250cm9sXCIsIFwicm9sZVwiOiA0MiwgXCJmcmFtZXdvcmtcIjogXCJCb290c3RyYXBcIiwgXCJjb25maWRlbmNlXCI6IDcwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImN1c3RvbS1zZWxlY3RcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIkJvb3RzdHJhcFwiLCBcImNvbmZpZGVuY2VcIjogNzYgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiY3VzdG9tLWNoZWNrYm94XCIsIFwicm9sZVwiOiA0NCwgXCJmcmFtZXdvcmtcIjogXCJCb290c3RyYXBcIiwgXCJjb25maWRlbmNlXCI6IDc2IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImN1c3RvbS1yYWRpb1wiLCBcInJvbGVcIjogNDUsIFwiZnJhbWV3b3JrXCI6IFwiQm9vdHN0cmFwXCIsIFwiY29uZmlkZW5jZVwiOiA3NiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJjdXN0b20tc3dpdGNoXCIsIFwicm9sZVwiOiA0NCwgXCJmcmFtZXdvcmtcIjogXCJCb290c3RyYXBcIiwgXCJjb25maWRlbmNlXCI6IDc2IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcIm5hdi10YWJzfG5hdi1saW5rXCIsIFwicm9sZVwiOiAzNywgXCJmcmFtZXdvcmtcIjogXCJCb290c3RyYXBcIiwgXCJjb25maWRlbmNlXCI6IDc0IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImNob3Nlbi1zaW5nbGV8Y2hvc2VuLWNob2ljZXNcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIkNob3NlbiAoalF1ZXJ5KVwiLCBcImNvbmZpZGVuY2VcIjogOTAgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiZ29vZy1tZW51fGdvb2ctbWVudWl0ZW1cIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIkdvb2dsZVwiLCBcImNvbmZpZGVuY2VcIjogODIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwidWktZHJvcGRvd25cIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlByaW1lRmFjZXMgLyBTQVBcIiwgXCJjb25maWRlbmNlXCI6IDgyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImNhbGVuZGFyfGRhdGVwaWNrZXJcIiwgXCJyb2xlXCI6IDkyLCBcImZyYW1ld29ya1wiOiBcIkdlbmVyaWNcIiwgXCJjb25maWRlbmNlXCI6IDc2IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImNvbWJvYm94XCIsIFwicm9sZVwiOiA0NiwgXCJmcmFtZXdvcmtcIjogXCJHZW5lcmljXCIsIFwiY29uZmlkZW5jZVwiOiA3NiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtZW51LWJ1dHRvblwiLCBcInJvbGVcIjogNDYsIFwiZnJhbWV3b3JrXCI6IFwiR2VuZXJpY1wiLCBcImNvbmZpZGVuY2VcIjogNzYgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiY2hlY2tib3hcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIkdlbmVyaWNcIiwgXCJjb25maWRlbmNlXCI6IDcwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInJhZGlvXCIsIFwicm9sZVwiOiA0NSwgXCJmcmFtZXdvcmtcIjogXCJHZW5lcmljXCIsIFwiY29uZmlkZW5jZVwiOiA3MCB9XG4gIF0sXG4gIFwiYXR0cmlidXRlUm9sZU1hcHBpbmdzXCI6IFtcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4oYnV0dG9uKSRcIiwgXCJyb2xlXCI6IDQzLCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4oY2hlY2tib3h8c3dpdGNoKSRcIiwgXCJyb2xlXCI6IDQ0LCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4ocmFkaW8pJFwiLCBcInJvbGVcIjogNDUsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihjb21ib2JveHxsaXN0Ym94fG1lbnUpJFwiLCBcInJvbGVcIjogNDYsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihvcHRpb24pJFwiLCBcInJvbGVcIjogMzQsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihsaW5rKSRcIiwgXCJyb2xlXCI6IDMwLCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4odGFiKSRcIiwgXCJyb2xlXCI6IDM3LCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4obWVudWl0ZW0pJFwiLCBcInJvbGVcIjogMTIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihpbWd8aW1hZ2UpJFwiLCBcInJvbGVcIjogNDAsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihncmlkY2VsbHxjZWxsKSRcIiwgXCJyb2xlXCI6IDI5LCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4ocm93KSRcIiwgXCJyb2xlXCI6IDI4LCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4odGFibGV8Z3JpZCkkXCIsIFwicm9sZVwiOiAyNCwgXCJjb25maWRlbmNlXCI6IDg4IH0sXG4gICAgeyBcImF0dHJpYnV0ZVwiOiBcInJvbGVcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCJeKHRleHRib3h8c2VhcmNoYm94KSRcIiwgXCJyb2xlXCI6IDQyLCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4oc2Nyb2xsYmFyKSRcIiwgXCJyb2xlXCI6IDMsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJhcmlhLWhhc3BvcHVwXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihsaXN0Ym94fG1lbnV8dHJ1ZSkkXCIsIFwicm9sZVwiOiA0NiwgXCJjb25maWRlbmNlXCI6IDgyIH0sXG4gICAgeyBcImF0dHJpYnV0ZVwiOiBcImFyaWEtZXhwYW5kZWRcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCJeKHRydWV8ZmFsc2UpJFwiLCBcInJvbGVcIjogNDYsIFwiY29uZmlkZW5jZVwiOiA3MCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJkYXRhLWNvbXAtaWRcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCIoZGF0ZS1waWNrZXJ8Y2FsZW5kYXIpXCIsIFwicm9sZVwiOiA5MiwgXCJjb25maWRlbmNlXCI6IDg0IH0sXG4gICAgeyBcImF0dHJpYnV0ZVwiOiBcImRhdGEtY29tcG9uZW50LXR5cGVcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCIoZGF0ZXxjYWxlbmRhcilcIiwgXCJyb2xlXCI6IDkyLCBcImNvbmZpZGVuY2VcIjogODQgfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwiZGF0YS10ZXN0aWRcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCIoZGF0ZXxjYWxlbmRhcilcIiwgXCJyb2xlXCI6IDkyLCBcImNvbmZpZGVuY2VcIjogNzYgfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwiZGF0YS10ZXN0aWRcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCIoZHJvcGRvd258Y29tYm9ib3gpXCIsIFwicm9sZVwiOiA0NiwgXCJjb25maWRlbmNlXCI6IDc2IH1cbiAgXSxcbiAgXCJpbnB1dFR5cGVSb2xlc1wiOiB7XG4gICAgXCJ0ZXh0XCI6IDQyLFxuICAgIFwicGFzc3dvcmRcIjogNDIsXG4gICAgXCJlbWFpbFwiOiA0MixcbiAgICBcInRlbFwiOiA0MixcbiAgICBcIm51bWJlclwiOiA0MixcbiAgICBcInVybFwiOiA0MixcbiAgICBcInNlYXJjaFwiOiA0MixcbiAgICBcImNvbG9yXCI6IDQyLFxuICAgIFwiZmlsZVwiOiA0MixcbiAgICBcImRhdGVcIjogOTIsXG4gICAgXCJ0aW1lXCI6IDkyLFxuICAgIFwiZGF0ZXRpbWUtbG9jYWxcIjogOTIsXG4gICAgXCJtb250aFwiOiA5MixcbiAgICBcIndlZWtcIjogOTIsXG4gICAgXCJjaGVja2JveFwiOiA0NCxcbiAgICBcInJhZGlvXCI6IDQ1LFxuICAgIFwicmFuZ2VcIjogNDYsXG4gICAgXCJidXR0b25cIjogNDMsXG4gICAgXCJzdWJtaXRcIjogNDMsXG4gICAgXCJyZXNldFwiOiA0MyxcbiAgICBcImltYWdlXCI6IDQzXG4gIH0sXG4gIFwidGFnUm9sZXNcIjoge1xuICAgIFwiaW5wdXRcIjogNDIsXG4gICAgXCJ0ZXh0YXJlYVwiOiA0MixcbiAgICBcInNlbGVjdFwiOiA0NixcbiAgICBcImJ1dHRvblwiOiA0MyxcbiAgICBcImFcIjogMzAsXG4gICAgXCJhcmVhXCI6IDMwLFxuICAgIFwiaW1nXCI6IDQwLFxuICAgIFwidGFibGVcIjogMjQsXG4gICAgXCJ0Ym9keVwiOiAyNCxcbiAgICBcInRyXCI6IDI4LFxuICAgIFwidGRcIjogMjksXG4gICAgXCJ0aFwiOiAyOSxcbiAgICBcImxpXCI6IDM0LFxuICAgIFwib3B0aW9uXCI6IDM0LFxuICAgIFwib3B0Z3JvdXBcIjogMzQsXG4gICAgXCJzdmdcIjogODIsXG4gICAgXCJpXCI6IDgyLFxuICAgIFwibWF0LWljb25cIjogODIsXG4gICAgXCJsYWJlbFwiOiA0MSxcbiAgICBcInNwYW5cIjogNDEsXG4gICAgXCJkaXZcIjogNDEsXG4gICAgXCJwXCI6IDQxLFxuICAgIFwiaDFcIjogNDEsXG4gICAgXCJoMlwiOiA0MSxcbiAgICBcImgzXCI6IDQxLFxuICAgIFwiaDRcIjogNDEsXG4gICAgXCJoNVwiOiA0MSxcbiAgICBcImg2XCI6IDQxLFxuICAgIFwibmF2XCI6IDEwLFxuICAgIFwiZm9ybVwiOiAxMCxcbiAgICBcImZpZWxkc2V0XCI6IDEwLFxuICAgIFwic2VjdGlvblwiOiAxMCxcbiAgICBcImFydGljbGVcIjogMTAsXG4gICAgXCJoZWFkZXJcIjogMTAsXG4gICAgXCJmb290ZXJcIjogMTAsXG4gICAgXCJtYWluXCI6IDEwLFxuICAgIFwidWxcIjogMTAsXG4gICAgXCJvbFwiOiAxMFxuICB9XG59XG4iLCAiLyoqXG4gKiBzZXR0aW5ncy50cyBcdTIwMTQgVXNlciBzZXR0aW5ncyArIGNvbmZpZ3VyYWJsZSByb2xlIG1hcHBpbmdzLlxuICpcbiAqIERlZmF1bHRzIGNvbWUgZnJvbSByb2xlTWFwcGluZ3MuanNvbiAoYnVuZGxlZCkuIFVzZXJzIGNhbiBpbXBvcnQgYW5cbiAqIG92ZXJyaWRlIEpTT04gZnJvbSB0aGUgU2V0dGluZ3MgdGFiOyBpdCBpcyBtZXJnZWQgKGFycmF5cyBhcmUgcmVwbGFjZWQsXG4gKiBvYmplY3RzIGFyZSBzaGFsbG93LW1lcmdlZCkgYW5kIHBlcnNpc3RlZCBpbiBjaHJvbWUuc3RvcmFnZS5sb2NhbC5cbiAqL1xuaW1wb3J0IGRlZmF1bHRNYXBwaW5ncyBmcm9tICcuL3JvbGVNYXBwaW5ncy5qc29uJztcbmltcG9ydCB0eXBlIHsgUm9sZU1hcHBpbmdDb25maWcgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBFeHRlbnNpb25TZXR0aW5ncyB7XG4gIC8qKiBGcmFtZXdvcmsgZGV0ZWN0aW9uIHRvZ2dsZSAocGVyIGZyYW1ld29yayBrZXkpLiAqL1xuICBlbmFibGVkRnJhbWV3b3JrczogUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG4gIC8qKiBIaWdobGlnaHRpbmcgb3B0aW9ucyBmb3IgdmlzdWFsIGluc3BlY3Rpb24uICovXG4gIGhpZ2hsaWdodEVuYWJsZWQ6IGJvb2xlYW47XG4gIC8qKiBJbmNsdWRlIGxvdy1jb25maWRlbmNlICg8IDYwKSBydWxlcyBpbiB0aGUgZ2VuZXJhdGVkIFhNTC4gKi9cbiAgaW5jbHVkZUxvd0NvbmZpZGVuY2U6IGJvb2xlYW47XG4gIC8qKiBNaW5pbXVtIGNvbmZpZGVuY2UgZm9yIGEgcnVsZSB0byBiZSBlbWl0dGVkICgwXHUyMDEzMTAwKS4gKi9cbiAgbWluQ29uZmlkZW5jZTogbnVtYmVyO1xuICAvKiogRW1pdCB0cmF2ZXJzYWwgcnVsZXMgZXZlbiB3aGVuIGEgcGxhaW4gdGFnIHJ1bGUgYWxyZWFkeSBjb3ZlcnMgdGhlIGNvbnRyb2wuICovXG4gIGVtaXRUcmF2ZXJzYWxSdWxlczogYm9vbGVhbjtcbiAgLyoqIEVtaXQgbGFiZWwgVHJhdmVyc2VMb2dpYyBydWxlcyBmb3IgY29udHJvbHMgd2l0aG91dCBhIGRpcmVjdCBsYWJlbC4gKi9cbiAgZW1pdExhYmVsUnVsZXM6IGJvb2xlYW47XG4gIC8qKiBSb2xlIG1hcHBpbmcgb3ZlcnJpZGVzIChyZXBsYWNlcyBidW5kbGVkIGNvbmZpZyB3aGVuIGltcG9ydGVkKS4gKi9cbiAgcm9sZU1hcHBpbmdzOiBSb2xlTWFwcGluZ0NvbmZpZyB8IG51bGw7XG4gIC8qKiBDb250cm9scyB0byBzY2FuIGJ5IGRlZmF1bHQ6IGFsbCB0YWdzIHZzLiBpbnRlcmFjdGl2ZSBvbmx5LiAqL1xuICBzY2FuQWxsVGFnczogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEV4dGVuc2lvblNldHRpbmdzID0ge1xuICBlbmFibGVkRnJhbWV3b3Jrczoge1xuICAgICdBbmd1bGFyIE1hdGVyaWFsJzogdHJ1ZSxcbiAgICAnUmVhY3QnOiB0cnVlLFxuICAgICdWdWUnOiB0cnVlLFxuICAgICdTYWxlc2ZvcmNlIExpZ2h0bmluZyc6IHRydWUsXG4gICAgJ1Bvd2VyQXBwcyc6IHRydWUsXG4gICAgJ1NBUCBVSTUnOiB0cnVlLFxuICAgICdTZWxlY3QyJzogdHJ1ZSxcbiAgICAnQm9vdHN0cmFwJzogdHJ1ZSxcbiAgICAnUHJpbWVORyc6IHRydWUsXG4gIH0sXG4gIGhpZ2hsaWdodEVuYWJsZWQ6IHRydWUsXG4gIGluY2x1ZGVMb3dDb25maWRlbmNlOiB0cnVlLFxuICBtaW5Db25maWRlbmNlOiA1NSxcbiAgZW1pdFRyYXZlcnNhbFJ1bGVzOiB0cnVlLFxuICBlbWl0TGFiZWxSdWxlczogdHJ1ZSxcbiAgcm9sZU1hcHBpbmdzOiBudWxsLFxuICBzY2FuQWxsVGFnczogdHJ1ZSxcbn07XG5cbi8qKiBSZXNvbHZlZCBtYXBwaW5nIGNvbmZpZzogb3ZlcnJpZGVzIGlmIHByZXNlbnQsIGVsc2UgdGhlIGJ1bmRsZWQgZGVmYXVsdHMuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVJvbGVNYXBwaW5ncyhzZXR0aW5nczogRXh0ZW5zaW9uU2V0dGluZ3MpOiBSb2xlTWFwcGluZ0NvbmZpZyB7XG4gIGlmIChzZXR0aW5ncy5yb2xlTWFwcGluZ3MpIHJldHVybiBzZXR0aW5ncy5yb2xlTWFwcGluZ3M7XG4gIHJldHVybiBkZWZhdWx0TWFwcGluZ3MgYXMgdW5rbm93biBhcyBSb2xlTWFwcGluZ0NvbmZpZztcbn1cblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnZXBpcGxleEllU2V0dGluZ3MnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNldHRpbmdzKCk6IFByb21pc2U8RXh0ZW5zaW9uU2V0dGluZ3M+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoU1RPUkFHRV9LRVkpO1xuICAgIGlmIChyYXcgJiYgcmF3W1NUT1JBR0VfS0VZXSkge1xuICAgICAgcmV0dXJuIHsgLi4uREVGQVVMVF9TRVRUSU5HUywgLi4ucmF3W1NUT1JBR0VfS0VZXSB9O1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gc3RvcmFnZSB1bmF2YWlsYWJsZSAodW5pdCB0ZXN0cyAvIGZpbGU6Ly8gcGFnZXMpIFx1MjAxNCBmYWxsIGJhY2sgdG8gZGVmYXVsdHMuXG4gIH1cbiAgcmV0dXJuIHsgLi4uREVGQVVMVF9TRVRUSU5HUyB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKHNldHRpbmdzOiBFeHRlbnNpb25TZXR0aW5ncyk6IFByb21pc2U8dm9pZD4ge1xuICB0cnkge1xuICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFtTVE9SQUdFX0tFWV06IHNldHRpbmdzIH0pO1xuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmUgXHUyMDE0IG5vbi1wZXJzaXN0ZW50IGZhbGxiYWNrIChwb3B1cCBrZWVwcyBzdGF0ZSBpbiBtZW1vcnkpLlxuICB9XG59XG5cbi8qKiBWYWxpZGF0ZSBhIHVzZXItc3VwcGxpZWQgcm9sZS1tYXBwaW5nIEpTT04uIFJldHVybnMgZXJyb3Igc3RyaW5nIG9yIG51bGwuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVNYXBwaW5nSnNvbih0ZXh0OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHRleHQpIGFzIFJvbGVNYXBwaW5nQ29uZmlnO1xuICAgIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09ICdvYmplY3QnKSByZXR1cm4gJ0pTT04gbXVzdCBiZSBhbiBvYmplY3QuJztcbiAgICBjb25zdCBhcnJzID0gWydmcmFtZXdvcmtSb2xlTWFwcGluZ3MnLCAnYXR0cmlidXRlUm9sZU1hcHBpbmdzJ107XG4gICAgZm9yIChjb25zdCBrZXkgb2YgYXJycykge1xuICAgICAgaWYgKHBhcnNlZFtrZXkgYXMga2V5b2YgUm9sZU1hcHBpbmdDb25maWddICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAhQXJyYXkuaXNBcnJheShwYXJzZWRba2V5IGFzIGtleW9mIFJvbGVNYXBwaW5nQ29uZmlnXSkpIHtcbiAgICAgICAgcmV0dXJuIGBcIiR7a2V5fVwiIG11c3QgYmUgYW4gYXJyYXkuYDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gYEludmFsaWQgSlNPTjogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gO1xuICB9XG59XG4iLCAiLyoqXG4gKiB0cmF2ZXJzYWxFbmdpbmUudHMgXHUyMDE0IFRyYXZlcnNhbCBsb2dpYyBnZW5lcmF0aW9uLlxuICpcbiAqIEdlbmVyYXRlcyBCYXNlZE9uVHJhdmVyc2VMb2dpYyBydWxlcyB0aGF0IHRlbGwgRXBpcGxleCBob3cgdG8gcmVhY2ggYSByZWFsXG4gKiBjb250cm9sIGZyb20gYSB2aXNpYmxlIHdyYXBwZXIgLyB2aXN1YWwgd2lkZ2V0OlxuICpcbiAqICAgQW5ndWxhciBNYXRlcmlhbCA6IG1hdC1mb3JtLWZpZWxkIFx1MjE5MiBDSCByZWN1cnNpdmUgPGlucHV0PiB8IDxtYXQtc2VsZWN0PlxuICogICBTYWxlc2ZvcmNlICAgICAgICA6IHNsZHMtZm9ybS1lbGVtZW50IFx1MjE5MiBDSCByZWN1cnNpdmUgPGlucHV0Pi88c2VsZWN0PlxuICogICBQb3dlckFwcHMgICAgICAgICA6IGFwcG1hZ2ljLSogd2lkZ2V0IFx1MjE5MiBDSCByZWN1cnNpdmUgPGlucHV0PlxuICogICBTQVAgVUk1ICAgICAgICAgICA6IHVpNS0qIHdpZGdldCBcdTIxOTIgQ0ggcmVjdXJzaXZlIDxpbnB1dD5cbiAqICAgU2VsZWN0MiAvIENob3NlbiAgOiB3aWRnZXQgXHUyMTkyIFBTL1BSIHJlY3Vyc2l2ZSA8c2VsZWN0PlxuICogICBCb290c3RyYXAgICAgICAgICA6IGN1c3RvbSBjaGVja2JveC9zd2l0Y2ggXHUyMTkyIFBTL1BSIHJlY3Vyc2l2ZSA8aW5wdXQgdHlwZT1jaGVja2JveD5cbiAqICAgY3VzdG9tIHdpZGdldHMgICAgOiBkaXZbcm9sZT1jb21ib2JveF0gXHUyMTkyIENIIHJlY3Vyc2l2ZSA8c2VsZWN0Pi88aW5wdXQ+XG4gKiAgIFNWRyBjb250cm9scyAgICAgIDogc3ZnIGljb24gc2libGluZyBcdTIxOTIgUFMgcmVjdXJzaXZlIDxidXR0b24+LzxpbnB1dD5cbiAqXG4gKiBTdXBwb3J0ZWQgcGF0aHM6IFBSIChwYXJlbnQpLCBDSCAoY2hpbGQpLCBQUyAocHJldmlvdXMgc2libGluZyksIE5TIChuZXh0XG4gKiBzaWJsaW5nKSwgYW5kIHJlY3Vyc2l2ZSB0cmF2ZXJzYWwgb24gYW55IG9mIHRoZW0uXG4gKlxuICogVGhlIERPTS1zaWRlIGRpc2NvdmVyeSAoZmluZGluZyB3cmFwcGVycyBpbiB0aGUgbGl2ZSBwYWdlKSBsaXZlcyBpblxuICogY29udGVudC50czsgdGhpcyBtb2R1bGUgY29udmVydHMgYSBkaXNjb3ZlcnkgaW50byBhIHByb3BlciBydWxlIGFuZFxuICogY29sbGVjdHMvZGVkdXBzIGFsbCBydWxlcyBmb3IgWE1MIGVtaXNzaW9uLlxuICovXG5pbXBvcnQgdHlwZSB7IENvbmRpdGlvbiwgRGV0ZWN0ZWRDb250cm9sLCBSb2xlSWQsIFRyYXZlcnNhbFBhdGgsIFRyYXZlcnNhbFJ1bGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIFdoYXQgY29udGVudC50cyBkaXNjb3ZlcmVkOiBhbiBhbmNob3IgZWxlbWVudCArIGhvdyB0byByZWFjaCB0aGUgcmVhbCBjb250cm9sLiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmF2ZXJzYWxEaXNjb3Zlcnkge1xuICAvKiogQW5jaG9yIGNvbmRpdGlvbiAod2hhdCBFcGlwbGV4IHNob3VsZCBtYXRjaCkuICovXG4gIGNvbmRpdGlvbjogQ29uZGl0aW9uO1xuICAvKiogVGFyZ2V0IGZpbHRlciBhdHRyaWJ1dGVzLCBlLmcuIHsgVGFnTmFtZTogJ2lucHV0JywgdHlwZTogJ2NoZWNrYm94JyB9LiAqL1xuICB0YXJnZXQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIC8qKiBEaXJlY3Rpb24gZnJvbSBhbmNob3IgdG8gdGFyZ2V0LiAqL1xuICBkaXJlY3Rpb246ICdDSCcgfCAnUFInIHwgJ1BTJyB8ICdOUyc7XG4gIC8qKiBXaGV0aGVyIHRoZSB0cmF2ZXJzYWwgaXMgcmVjdXJzaXZlLiAqL1xuICByZWN1cnNpdmU6IGJvb2xlYW47XG4gIGZyYW1ld29yazogc3RyaW5nIHwgbnVsbDtcbiAgcmVhc29uOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQ29udmVydCBhIGRpc2NvdmVyeSBpbnRvIGFuIEVwaXBsZXggVHJhdmVyc2FsUnVsZS4gVGhlIGFuY2hvciBiZWNvbWVzIHRoZVxuICogcnVsZSdzIDxDb25kaXRpb24+LCB0aGUgdGFyZ2V0IGJlY29tZXMgdGhlIDxQYXRoPiA8QXR0cmlidXRlcz4gZmlsdGVyLCBhbmRcbiAqIHRoZSBkaXJlY3Rpb24gYmVjb21lcyB0aGUgUGF0aD1cIlBTXCJ8XCJDSFwifFx1MjAyNiBhdHRyaWJ1dGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFRyYXZlcnNhbFJ1bGUoXG4gIGRpc2NvdmVyeTogVHJhdmVyc2FsRGlzY292ZXJ5LFxuICBjdXJyZW50Um9sZTogUm9sZUlkLFxuICBwYXJlbnRSb2xlOiBSb2xlSWQgfCBudWxsLFxuICBjb25maWRlbmNlOiBudW1iZXJcbik6IFRyYXZlcnNhbFJ1bGUge1xuICBjb25zdCBwYXRoczogVHJhdmVyc2FsUGF0aFtdID0gW1xuICAgIHtcbiAgICAgIHBhdGg6IGRpc2NvdmVyeS5kaXJlY3Rpb24sXG4gICAgICBvcGVyYXRvcjogZGlzY292ZXJ5LnJlY3Vyc2l2ZSA/ICdyZWN1cnNpdmUnIDogJ3NpbXBsZScsXG4gICAgICBhdHRyaWJ1dGVzOiBkaXNjb3ZlcnkudGFyZ2V0LFxuICAgIH0sXG4gIF07XG4gIHJldHVybiB7XG4gICAgY3VycmVudFJvbGUsXG4gICAgcGFyZW50Um9sZSxcbiAgICBjb25kaXRpb246IGRpc2NvdmVyeS5jb25kaXRpb24sXG4gICAgcGF0aHMsXG4gICAgc291cmNlOiBkaXNjb3ZlcnkucmVhc29uLFxuICAgIGZyYW1ld29yazogZGlzY292ZXJ5LmZyYW1ld29yayA/PyB1bmRlZmluZWQsXG4gICAgY29uZmlkZW5jZSxcbiAgfTtcbn1cblxuLyoqXG4gKiBDb2xsZWN0IHRyYXZlcnNhbCBydWxlcyB0aGF0IGNvbnRlbnQudHMgYXR0YWNoZWQgdG8gZGV0ZWN0ZWQgY29udHJvbHNcbiAqIChgY29udHJvbC50cmF2ZXJzYWxSdWxlYCkuIFJldHVybnMgdGhlIGRlZHVwbGljYXRlZCBsaXN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVUcmF2ZXJzYWxSdWxlcyhjb250cm9sczogRGV0ZWN0ZWRDb250cm9sW10pOiBUcmF2ZXJzYWxSdWxlW10ge1xuICBjb25zdCBzZWVuID0gbmV3IE1hcDxzdHJpbmcsIFRyYXZlcnNhbFJ1bGU+KCk7XG4gIGZvciAoY29uc3QgYyBvZiBjb250cm9scykge1xuICAgIGNvbnN0IHIgPSBjLnRyYXZlcnNhbFJ1bGU7XG4gICAgaWYgKCFyKSBjb250aW51ZTtcbiAgICBjb25zdCBrZXkgPSBmaW5nZXJwcmludChyKTtcbiAgICBpZiAoIXNlZW4uaGFzKGtleSkpIHNlZW4uc2V0KGtleSwgcik7XG4gIH1cbiAgcmV0dXJuIFsuLi5zZWVuLnZhbHVlcygpXS5zb3J0KChhLCBiKSA9PiBhLmN1cnJlbnRSb2xlIC0gYi5jdXJyZW50Um9sZSk7XG59XG5cbi8qKiBDYW5vbmljYWwgZmluZ2VycHJpbnQgdXNlZCBmb3IgZGVkdXAgKyBjb21wYXJlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmdlcnByaW50KHI6IFRyYXZlcnNhbFJ1bGUpOiBzdHJpbmcge1xuICBjb25zdCBjb25kID0gW3IuY29uZGl0aW9uLnRhZ05hbWUsIHIuY29uZGl0aW9uLnR5cGUsIHIuY29uZGl0aW9uLmNsYXNzTmFtZSwgci5jb25kaXRpb24uYXR0cmlidXRlLCByLmNvbmRpdGlvbi52YWx1ZV0uam9pbignfCcpO1xuICBjb25zdCBwYXRocyA9IHIucGF0aHMubWFwKChwKSA9PiBgJHtwLnBhdGh9OiR7cC5vcGVyYXRvcn06JHtPYmplY3Qua2V5cyhwLmF0dHJpYnV0ZXMpLnNvcnQoKS5tYXAoKGspID0+IGAke2t9PSR7cC5hdHRyaWJ1dGVzW2tdfWApLmpvaW4oJywnKX1gKS5qb2luKCc+Jyk7XG4gIHJldHVybiBgdHJhdmVyc2FsfCR7ci5jdXJyZW50Um9sZX18JHtyLnBhcmVudFJvbGUgPz8gJyd9fCR7Y29uZH18JHtwYXRoc31gO1xufVxuXG4vKipcbiAqIEJvbnVzOiBzdWdnZXN0IHRyYXZlcnNhbCBpbXByb3ZlbWVudHMgZm9yIGNvbnRyb2xzIHRoYXQgYXJlIGNvdmVyZWQgYnkgYVxuICogdGFnL2F0dHJpYnV0ZSBydWxlIGJ1dCBjb3VsZCBiZW5lZml0IGZyb20gYSB3cmFwcGVyLWFuY2hvcmVkIHJ1bGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0VHJhdmVyc2FsSW1wcm92ZW1lbnRzKGNvbnRyb2xzOiBEZXRlY3RlZENvbnRyb2xbXSk6IHN0cmluZ1tdIHtcbiAgY29uc3Qgc3VnZ2VzdGlvbnM6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3QgYyBvZiBjb250cm9scykge1xuICAgIGlmIChjLnRyYXZlcnNhbFJ1bGUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHRhZyA9IGMuYXR0cmlidXRlcy50YWdOYW1lO1xuICAgIGNvbnN0IGNscyA9IGMuYXR0cmlidXRlcy5jbGFzc05hbWUgfHwgJyc7XG4gICAgaWYgKCh0YWcgPT09ICdpbnB1dCcgfHwgdGFnID09PSAnc2VsZWN0JykgJiYgL1xcYihoaWRkZW58c3Itb25seXx2aXN1YWxseS1oaWRkZW4pXFxiLy50ZXN0KGNscykpIHtcbiAgICAgIHN1Z2dlc3Rpb25zLnB1c2goXG4gICAgICAgIGBUaGUgJHtjLnJvbGVOYW1lfSBhdCAke2MubG9jYXRpb24uY3NzU2VsZWN0b3J9IGlzIHZpc3VhbGx5IGhpZGRlbiBcdTIwMTQgY29uc2lkZXIgYSB0cmF2ZXJzYWwgcnVsZSBhbmNob3JlZCBvbiBpdHMgdmlzaWJsZSB3cmFwcGVyIChjaGVja2JveC9zZWxlY3QyL2NvbWJvYm94KS5gXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYy50cmF2ZXJzYWxSdWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHN1Z2dlc3Rpb25zLnB1c2goXG4gICAgICAgIGBUaGUgJHtjLnJvbGVOYW1lfSBhdCAke2MubG9jYXRpb24uY3NzU2VsZWN0b3J9IGlzIGNvdmVyZWQgYnkgYSB0YWcgcnVsZSBidXQgc2l0cyBpbiBhIGZyYW1ld29yayB3cmFwcGVyIFx1MjAxNCB2ZXJpZnkgYSB0cmF2ZXJzYWwgcnVsZSBmcm9tIHRoYXQgd3JhcHBlciBpcyBkZXNpcmVkLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBbLi4ubmV3IFNldChzdWdnZXN0aW9ucyldLnNsaWNlKDAsIDIwKTtcbn1cbiIsICIvKipcbiAqIGNvbnRlbnQudHMgXHUyMDE0IENvbnRlbnQgc2NyaXB0LlxuICpcbiAqIFNjYW5zIHRoZSBsaXZlIERPTSAoaW5jbHVkaW5nIHNoYWRvdyByb290cyBhbmQgc2FtZS1vcmlnaW4gaWZyYW1lcyksXG4gKiBkZXRlY3RzIEVwaXBsZXggcm9sZXMsIGZpbmRzIGxhYmVscywgZGlzY292ZXJzIGZyYW1ld29yayB3cmFwcGVycyBmb3JcbiAqIHRyYXZlcnNhbCBydWxlcywgYW5kIHJlbmRlcnMgdGhlIHZpc3VhbC1pbnNwZWN0aW9uIGhpZ2hsaWdodCBvdmVybGF5LlxuICpcbiAqIE1lc3NhZ2UgcHJvdG9jb2wgKHBvcHVwIFx1MjE5MiBjb250ZW50KTpcbiAqICAgeyB0eXBlOiAnRVBJUExFWF9TQ0FOJyB9ICAgICAgICAgICAgICAgICAgICAgICAgXHUyMTkyIFNjYW5SZXNwb25zZVxuICogICB7IHR5cGU6ICdFUElQTEVYX0hJR0hMSUdIVCcsIGVuYWJsZWQ6IGJvb2xlYW4gfSBcdTIxOTIgdG9nZ2xlIG92ZXJsYXlcbiAqICAgeyB0eXBlOiAnRVBJUExFWF9MSVZFJywgZW5hYmxlZDogYm9vbGVhbiB9ICAgICAgXHUyMTkyIHRvZ2dsZSBNdXRhdGlvbk9ic2VydmVyXG4gKiAgIHsgdHlwZTogJ0VQSVBMRVhfQ0xFQVJfSElHSExJR0hUJyB9ICAgICAgICAgICAgIFx1MjE5MiByZW1vdmUgb3ZlcmxheVxuICovXG5pbXBvcnQgeyBkZXRlY3RFbGVtZW50RnJhbWV3b3JrLCBkZXRlY3RGcmFtZXdvcmtzIH0gZnJvbSAnLi9mcmFtZXdvcmtEZXRlY3Rvcic7XG5pbXBvcnQgeyBmaW5kTGFiZWwgfSBmcm9tICcuL2xhYmVsRW5naW5lJztcbmltcG9ydCB7IGRldGVjdENvbnRyb2xSb2xlLCBleHRyYWN0QXR0cmlidXRlcywgdHlwZSBFbGVtZW50TGlrZSB9IGZyb20gJy4vcnVsZUVuZ2luZSc7XG5pbXBvcnQgeyBsb2FkU2V0dGluZ3MsIHJlc29sdmVSb2xlTWFwcGluZ3MgfSBmcm9tICcuL3NldHRpbmdzJztcbmltcG9ydCB7IGJ1aWxkVHJhdmVyc2FsUnVsZSwgdHlwZSBUcmF2ZXJzYWxEaXNjb3ZlcnkgfSBmcm9tICcuL3RyYXZlcnNhbEVuZ2luZSc7XG5pbXBvcnQgdHlwZSB7IERldGVjdGVkQ29udHJvbCwgRnJhbWV3b3JrSW5mbywgUm9sZUlkLCBSb2xlTWFwcGluZ0NvbmZpZywgU2NhblJlc3BvbnNlLCBUcmF2ZXJzYWxSdWxlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyByb2xlQ29sb3IsIHJvbGVOYW1lIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IEVYQ0xVREVEX1RBR1MgPSBuZXcgU2V0KFsnc2NyaXB0JywgJ3N0eWxlJywgJ3RlbXBsYXRlJywgJ25vc2NyaXB0JywgJ21ldGEnLCAnbGluaycsICd0aXRsZScsICdoZWFkJywgJ2lmcmFtZScsICdicicsICdociddKTtcbmNvbnN0IE1BWF9DT05UUk9MUyA9IDMwMDA7XG5jb25zdCBNQVhfVEVYVF9DT05UUk9MUyA9IDgwMDtcblxuLy8gRnJhbWV3b3JrIHdyYXBwZXIgcGF0dGVybnMgXHUyMTkyIHRyYXZlcnNhbCBydWxlcyAod3JhcHBlciBcdTIxOTIgcmVhbCBjb250cm9sKS5cbmNvbnN0IFdSQVBQRVJfUEFUVEVSTlM6IHsgcmU6IFJlZ0V4cDsgZnJhbWV3b3JrOiBzdHJpbmcgfVtdID0gW1xuICB7IHJlOiAvbWF0LWZvcm0tZmllbGR8bWF0LWNoZWNrYm94fG1hdC1zbGlkZS10b2dnbGV8bWF0LXJhZGlvLWdyb3VwLywgZnJhbWV3b3JrOiAnQW5ndWxhciBNYXRlcmlhbCcgfSxcbiAgeyByZTogL3NsZHMtZm9ybS1lbGVtZW50fHNsZHMtY2hlY2tib3h8c2xkcy1yYWRpby8sIGZyYW1ld29yazogJ1NhbGVzZm9yY2UgTGlnaHRuaW5nJyB9LFxuICB7IHJlOiAvc2VsZWN0Mi1jb250YWluZXIvLCBmcmFtZXdvcms6ICdTZWxlY3QyJyB9LFxuICB7IHJlOiAvdWk1LShjb21ib2JveHxzZWxlY3R8ZGF0ZXBpY2tlcnxjaGVja2JveHxyYWRpb2J1dHRvbikvLCBmcmFtZXdvcms6ICdTQVAgVUk1JyB9LFxuICB7IHJlOiAvcC0oZHJvcGRvd258Y2hlY2tib3h8cmFkaW9idXR0b258Y2FsZW5kYXIpLywgZnJhbWV3b3JrOiAnUHJpbWVORycgfSxcbiAgeyByZTogL2FwcG1hZ2ljLShjb21ib2JveHxjaGVja2JveHxyYWRpb3xkYXRlcGlja2VyKS8sIGZyYW1ld29yazogJ1Bvd2VyQXBwcycgfSxcbl07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU3RhdGVcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5sZXQgbGFzdFNjYW46IERldGVjdGVkQ29udHJvbFtdID0gW107XG5sZXQgaGlnaGxpZ2h0RW5hYmxlZCA9IGZhbHNlO1xubGV0IGxpdmVFbmFibGVkID0gZmFsc2U7XG5sZXQgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbmxldCBvdmVybGF5OiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xubGV0IHRvb2x0aXA6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5sZXQgcmVwb3NpdGlvblJhZiA9IDA7XG5sZXQgYWN0aXZlQm94ZXM6IHsgZWw6IEhUTUxEaXZFbGVtZW50OyBjb250cm9sOiBEZXRlY3RlZENvbnRyb2wgfVtdID0gW107XG5sZXQgZnJhbWVJZCA9IDA7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTG9jYXRpb24gaGVscGVyc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHhwYXRoRm9yKGVsOiBFbGVtZW50KTogc3RyaW5nIHtcbiAgaWYgKGVsLmlkKSByZXR1cm4gYC8vKltAaWQ9XCIke2VsLmlkLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKX1cIl1gO1xuICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgbGV0IG5vZGU6IEVsZW1lbnQgfCBudWxsID0gZWw7XG4gIHdoaWxlIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBjb25zdCB0YWcgPSBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgaWR4ID0gMTtcbiAgICBsZXQgc2liOiBFbGVtZW50IHwgbnVsbCA9IG5vZGUucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICB3aGlsZSAoc2liKSB7XG4gICAgICBpZiAoc2liLnRhZ05hbWUgPT09IG5vZGUudGFnTmFtZSkgaWR4Kys7XG4gICAgICBzaWIgPSBzaWIucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICB9XG4gICAgcGFydHMudW5zaGlmdChgJHt0YWd9WyR7aWR4fV1gKTtcbiAgICBub2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiAnLycgKyBwYXJ0cy5qb2luKCcvJyk7XG59XG5cbmZ1bmN0aW9uIGNzc0ZvcihlbDogRWxlbWVudCk6IHN0cmluZyB7XG4gIGNvbnN0IGlkID0gZWwuaWQ7XG4gIGlmIChpZCAmJiAvXlthLXpBLVpdW1xcdy1dKiQvLnRlc3QoaWQpKSByZXR1cm4gYCMke2lkfWA7XG4gIGNvbnN0IGNscyA9IEFycmF5LmZyb20oZWwuY2xhc3NMaXN0IHx8IFtdKS5maWx0ZXIoKGMpID0+IC9eW2EtekEtWl1bXFx3LV0qJC8udGVzdChjKSk7XG4gIGlmIChjbHMubGVuZ3RoKSByZXR1cm4gYCR7ZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpfS4ke2Nscy5qb2luKCcuJyl9YDtcbiAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcbiAgaWYgKHBhcmVudCkge1xuICAgIGNvbnN0IHNpYmxpbmdzID0gQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmZpbHRlcigoYykgPT4gYy50YWdOYW1lID09PSBlbC50YWdOYW1lKTtcbiAgICBjb25zdCBpZHggPSBzaWJsaW5ncy5pbmRleE9mKGVsKSArIDE7XG4gICAgcmV0dXJuIGAke2VsLnRhZ05hbWUudG9Mb3dlckNhc2UoKX06bnRoLW9mLXR5cGUoJHtpZHh9KWA7XG4gIH1cbiAgcmV0dXJuIGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gdmlzaWJsZShlbDogRWxlbWVudCk6IGJvb2xlYW4ge1xuICB0cnkge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgaWYgKHN0eWxlLmRpc3BsYXkgPT09ICdub25lJyB8fCBzdHlsZS52aXNpYmlsaXR5ID09PSAnaGlkZGVuJykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gcmVjdC53aWR0aCA+IDEgJiYgcmVjdC5oZWlnaHQgPiAxO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBWaXNpYmxlIHRleHQgYWRqYWNlbnQgdG8gaWNvbi9sb2dvL2J1dHRvbiBlbGVtZW50cyAoZS5nLiB0aGUgXCJDaGF0R1BUXCJcbiAqIGxhYmVsIG5leHQgdG8gdGhlIENoYXRHUFQgU1ZHKS4gVXNlZCBmb3IgaHVtYW4tcmVhZGFibGUgc3RlcCBzZW50ZW5jZXMuXG4gKi9cbmZ1bmN0aW9uIGNhcHR1cmVBZGphY2VudFRleHQoZWw6IEVsZW1lbnQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHJvbGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgY29uc3QgY2xpY2thYmxlID1cbiAgICB0YWcgPT09ICdzdmcnIHx8IHRhZyA9PT0gJ2ltZycgfHwgdGFnID09PSAnaScgfHwgdGFnID09PSAnYScgfHwgdGFnID09PSAnYnV0dG9uJyB8fFxuICAgIHRhZyA9PT0gJ21hdC1pY29uJyB8fCByb2xlID09PSAnYnV0dG9uJyB8fCByb2xlID09PSAnbGluayc7XG4gIGlmICghY2xpY2thYmxlKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGNvbnN0IHRha2UgPSAodDogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgY2xlYW5lZCA9ICh0IHx8ICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpO1xuICAgIGlmICghY2xlYW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY2xlYW5lZC5sZW5ndGggPiA2MCA/IGNsZWFuZWQuc2xpY2UoMCwgNTkpLnRyaW1FbmQoKSArICdcdTIwMjYnIDogY2xlYW5lZDtcbiAgfTtcblxuICAvLyBMZWFmIHNpYmxpbmcgZmlyc3QgKHRleHQtb25seSBzaWJsaW5nIGVsZW1lbnQpLlxuICBmb3IgKGNvbnN0IHNpYiBvZiBbZWwucHJldmlvdXNFbGVtZW50U2libGluZywgZWwubmV4dEVsZW1lbnRTaWJsaW5nXSkge1xuICAgIGlmIChzaWIgJiYgc2liLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgdCA9IHRha2Uoc2liLnRleHRDb250ZW50KTtcbiAgICAgIGlmICh0KSByZXR1cm4gdDtcbiAgICB9XG4gIH1cbiAgLy8gRGlyZWN0IHRleHQgbm9kZSBpbiB0aGUgcGFyZW50IChlLmcuIDxzdmcvPiBDaGF0R1BUKS5cbiAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcbiAgaWYgKHBhcmVudCkge1xuICAgIGNvbnN0IGRpcmVjdCA9IEFycmF5LmZyb20ocGFyZW50LmNoaWxkTm9kZXMpXG4gICAgICAuZmlsdGVyKChuKSA9PiBuLm5vZGVUeXBlID09PSAzKVxuICAgICAgLm1hcCgobikgPT4gbi50ZXh0Q29udGVudCB8fCAnJylcbiAgICAgIC5qb2luKCcgJyk7XG4gICAgY29uc3QgdCA9IHRha2UoZGlyZWN0KTtcbiAgICBpZiAodCkgcmV0dXJuIHQ7XG4gICAgLy8gRmlyc3Qgc2hvcnQtdGV4dCBzaWJsaW5nIGVsZW1lbnQgKG5vIG5lc3RlZCBjb250cm9scykuXG4gICAgZm9yIChjb25zdCBzaWIgb2YgQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pKSB7XG4gICAgICBpZiAoc2liID09PSBlbCkgY29udGludWU7XG4gICAgICBpZiAoc2liLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIGEnKSkgY29udGludWU7XG4gICAgICBjb25zdCB0MiA9IHRha2Uoc2liLnRleHRDb250ZW50KTtcbiAgICAgIGlmICh0MiAmJiB0Mi5sZW5ndGggPD0gNDApIHJldHVybiB0MjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSb2xlIGhlbHBlcnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIFRydWUgd2hlbiB0aGUgZWxlbWVudCBzaXRzIGluc2lkZSBhbiBpbnRlcmFjdGl2ZSBhbmNlc3RvciAobGluaywgYnV0dG9uLFxuICogZm9ybSBmaWVsZCwgbWVudSBpdGVtXHUyMDI2KS4gSWNvbnMgbmVzdGVkIHRoZXJlIGFyZSBwYXJ0IG9mIHRoYXQgY29udHJvbCBcdTIwMTQgdGhleVxuICogbXVzdCBub3QgYmUgc2Nhbm5lZCBhcyBzZXBhcmF0ZSBpY29uIGNvbnRyb2xzLCBvciB0aGV5IHdvdWxkIHN0ZWFsIHRoZVxuICogY2xpY2sgZnJvbSB0aGUgbGluay9idXR0b24gKG1hdGNoZXMgdGhlIHdvcmtpbmcgSUVBZGFwdG9yLnhtbCwgd2hpY2ggb25seVxuICogbWFwcyBpY29ucyB1bmRlciBhIGNvbnRhaW5lciB3aXRoIFBhcmVudFJvbGU9MTApLlxuICovXG5mdW5jdGlvbiBoYXNJbnRlcmFjdGl2ZUFuY2VzdG9yKGVsOiBFbGVtZW50KTogYm9vbGVhbiB7XG4gIGNvbnN0IHNlbCA9ICdhLCBidXR0b24sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBsYWJlbCwgW3JvbGU9XCJidXR0b25cIl0sIFtyb2xlPVwibGlua1wiXSwgW3JvbGU9XCJtZW51aXRlbVwiXSwgW3JvbGU9XCJtZW51aXRlbWNoZWNrYm94XCJdLCBbcm9sZT1cIm1lbnVpdGVtcmFkaW9cIl0nO1xuICBsZXQgcCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIGZvciAobGV0IGkgPSAwOyBwICYmIGkgPCA4OyBpKyssIHAgPSBwLnBhcmVudEVsZW1lbnQpIHtcbiAgICBpZiAocC5tYXRjaGVzICYmIHAubWF0Y2hlcyhzZWwpKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCByID0gcC5nZXRBdHRyaWJ1dGUgJiYgcC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgICBpZiAociAmJiAvXihidXR0b258bGlua3xtZW51aXRlbXxtZW51aXRlbWNoZWNrYm94fG1lbnVpdGVtcmFkaW8pJC9pLnRlc3QocikpIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcGFyZW50Um9sZUZvcihlbDogRWxlbWVudCwgcm9sZTogUm9sZUlkKTogUm9sZUlkIHwgbnVsbCB7XG4gIGlmIChyb2xlID09PSA0MiB8fCByb2xlID09PSA0NCB8fCByb2xlID09PSA0NSB8fCByb2xlID09PSA0NiB8fCByb2xlID09PSA5MiB8fCByb2xlID09PSAyOSB8fCByb2xlID09PSAyOCB8fCByb2xlID09PSA0Mykge1xuICAgIHJldHVybiAxMDtcbiAgfVxuICBpZiAocm9sZSA9PT0gMzQpIHtcbiAgICBjb25zdCBpbkxpc3QgPSBlbC5jbG9zZXN0KCdzZWxlY3QsIFtyb2xlPVwibGlzdGJveFwiXSwgW3JvbGU9XCJjb21ib2JveFwiXScpO1xuICAgIHJldHVybiBpbkxpc3QgPyA0NiA6IDEwO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRyYXZlcnNhbCBkaXNjb3ZlcnkgKHdyYXBwZXIgXHUyMTkyIHJlYWwgY29udHJvbClcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBkaXNjb3ZlclRyYXZlcnNhbChcbiAgZWw6IEVsZW1lbnQsXG4gIHJvbGU6IFJvbGVJZCxcbiAgZnJhbWV3b3JrQ2xhc3M6IHN0cmluZyB8IG51bGwsXG4gIGVuYWJsZWRGcmFtZXdvcmtzOiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPlxuKTogVHJhdmVyc2FsUnVsZSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHRhcmdldEF0dHJzID0gKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IFRhZ05hbWU6IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSB9O1xuICAgIGNvbnN0IHR5cGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKTtcbiAgICBpZiAodHlwZSkgdC50eXBlID0gdHlwZTtcbiAgICByZXR1cm4gdDtcbiAgfTtcblxuICAvLyAxLiBGcmFtZXdvcmsgd3JhcHBlciBhbmNlc3RvciBcdTIxOTIgQ0ggcmVjdXJzaXZlLlxuICBsZXQgd2Fsa2VyOiBFbGVtZW50IHwgbnVsbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIGxldCBob3BzID0gMDtcbiAgd2hpbGUgKHdhbGtlciAmJiBob3BzIDwgMykge1xuICAgIGNvbnN0IGNscyA9IHdhbGtlci5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG4gICAgZm9yIChjb25zdCBwIG9mIFdSQVBQRVJfUEFUVEVSTlMpIHtcbiAgICAgIGNvbnN0IG0gPSBjbHMubWF0Y2gocC5yZSk7XG4gICAgICBpZiAobSAmJiBlbmFibGVkRnJhbWV3b3Jrc1twLmZyYW1ld29ya10gIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGRpc2NvdmVyeTogVHJhdmVyc2FsRGlzY292ZXJ5ID0ge1xuICAgICAgICAgIGNvbmRpdGlvbjogeyBjbGFzc05hbWU6IGB8JHttWzBdfXxgLCBvcGVyYXRvcjogJ2NvbnRhaW5zJyB9LFxuICAgICAgICAgIHRhcmdldDogdGFyZ2V0QXR0cnMoKSxcbiAgICAgICAgICBkaXJlY3Rpb246ICdDSCcsXG4gICAgICAgICAgcmVjdXJzaXZlOiB0cnVlLFxuICAgICAgICAgIGZyYW1ld29yazogcC5mcmFtZXdvcmssXG4gICAgICAgICAgcmVhc29uOiBgJHtwLmZyYW1ld29ya306IDwke3dhbGtlci50YWdOYW1lLnRvTG93ZXJDYXNlKCl9IGNsYXNzPVwiJHttWzBdfVwiPiB3cmFwcyB0aGUgcmVhbCBjb250cm9sYCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkVHJhdmVyc2FsUnVsZShkaXNjb3ZlcnksIHJvbGUsIDEwLCA5MCk7XG4gICAgICB9XG4gICAgfVxuICAgIHdhbGtlciA9IHdhbGtlci5wYXJlbnRFbGVtZW50O1xuICAgIGhvcHMrKztcbiAgfVxuXG4gIC8vIDIuIFZpc3VhbGx5IGhpZGRlbiBuYXRpdmUgY29udHJvbCB3aXRoIGEgdmlzaWJsZSBzaWJsaW5nIHdpZGdldCAoY3VzdG9tIGNoZWNrYm94ZXMgLyBzZWxlY3QyKS5cbiAgaWYgKChyb2xlID09PSA0NCB8fCByb2xlID09PSA0NSB8fCByb2xlID09PSA0NikgJiYgKGVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnR5cGUgJiYgIXZpc2libGUoZWwpKSB7XG4gICAgY29uc3QgcHJldiA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgY29uc3QgbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZztcbiAgICBjb25zdCB3aWRnZXQgPSAocHJldiAmJiB2aXNpYmxlKHByZXYpKSA/IHByZXYgOiAobmV4dCAmJiB2aXNpYmxlKG5leHQpKSA/IG5leHQgOiBudWxsO1xuICAgIGlmICh3aWRnZXQpIHtcbiAgICAgIGNvbnN0IHdDbGFzcyA9IHdpZGdldC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG4gICAgICBjb25zdCB3VGFnID0gd2lkZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHByZXYgJiYgdmlzaWJsZShwcmV2KSA/ICdQUycgOiAnTlMnO1xuICAgICAgY29uc3QgZGlzY292ZXJ5OiBUcmF2ZXJzYWxEaXNjb3ZlcnkgPSB7XG4gICAgICAgIGNvbmRpdGlvbjpcbiAgICAgICAgICB3VGFnID09PSAnbGFiZWwnXG4gICAgICAgICAgICA/IHsgdGFnTmFtZTogJ3xsYWJlbHwnIH1cbiAgICAgICAgICAgIDogeyBjbGFzc05hbWU6IGB8JHt3Q2xhc3Muc3BsaXQoL1xccysvKS5maWx0ZXIoQm9vbGVhbikuc2xpY2UoMCwgMikuam9pbignfCcpfXxgLCBvcGVyYXRvcjogJ2NvbnRhaW5zJyB9LFxuICAgICAgICB0YXJnZXQ6IHsgVGFnTmFtZTogJ2lucHV0JywgdHlwZTogKGVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnR5cGUgfSxcbiAgICAgICAgZGlyZWN0aW9uLCByZWN1cnNpdmU6IHRydWUsXG4gICAgICAgIGZyYW1ld29yazogbnVsbCxcbiAgICAgICAgcmVhc29uOiBgQ3VzdG9tICR7cm9sZU5hbWUocm9sZSkudG9Mb3dlckNhc2UoKX06IHZpc2libGUgPCR7d1RhZ30+IHdpZGdldCBuZXh0IHRvIHRoZSBoaWRkZW4gaW5wdXRgLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBidWlsZFRyYXZlcnNhbFJ1bGUoZGlzY292ZXJ5LCByb2xlLCAxMCwgODUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDMuIEN1c3RvbSB3aWRnZXQgZWxlbWVudCBpdHNlbGYgKGxhYmVsL2Rpdi9zcGFuIG1hdGNoZWQgYnkgY2hlY2tib3h8cmFkaW98c3dpdGNofGNvbWJvYm94IGNsYXNzKS5cbiAgY29uc3QgdGFnID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoKHRhZyA9PT0gJ2xhYmVsJyB8fCB0YWcgPT09ICdkaXYnIHx8IHRhZyA9PT0gJ3NwYW4nKSAmJiBmcmFtZXdvcmtDbGFzcyAmJiAvY2hlY2tib3h8c3dpdGNofHJhZGlvfGNvbWJvYm94L2kudGVzdChmcmFtZXdvcmtDbGFzcykpIHtcbiAgICBjb25zdCBpbnB1dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBzZWxlY3QnKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGNvbnN0IHRhcmdldDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgVGFnTmFtZTogaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpIH07XG4gICAgICBjb25zdCB0eXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJyk7XG4gICAgICBpZiAodHlwZSkgdGFyZ2V0LnR5cGUgPSB0eXBlO1xuICAgICAgY29uc3QgZGlzY292ZXJ5OiBUcmF2ZXJzYWxEaXNjb3ZlcnkgPSB7XG4gICAgICAgIGNvbmRpdGlvbjogeyBjbGFzc05hbWU6IGB8JHtmcmFtZXdvcmtDbGFzc318YCwgb3BlcmF0b3I6ICdjb250YWlucycgfSxcbiAgICAgICAgdGFyZ2V0LFxuICAgICAgICBkaXJlY3Rpb246ICdDSCcsIHJlY3Vyc2l2ZTogdHJ1ZSxcbiAgICAgICAgZnJhbWV3b3JrOiBudWxsLFxuICAgICAgICByZWFzb246IGBDdXN0b20gd2lkZ2V0IDwke3RhZ30+IHdpdGggY2xhc3MgXCIke2ZyYW1ld29ya0NsYXNzfVwiIGNvbnRhaW5zIHRoZSByZWFsIGNvbnRyb2xgLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBidWlsZFRyYXZlcnNhbFJ1bGUoZGlzY292ZXJ5LCByb2xlLCAxMCwgODUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2NhblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmludGVyZmFjZSBTY2FuQ29udGV4dCB7XG4gIGNvbnRyb2xzOiBEZXRlY3RlZENvbnRyb2xbXTtcbiAgY29uZmlnOiBSb2xlTWFwcGluZ0NvbmZpZztcbiAgZnJhbWV3b3JrczogRnJhbWV3b3JrSW5mb1tdO1xuICBlbmFibGVkRnc6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xuICB0ZXh0Q291bnQ6IG51bWJlcjtcbiAgaWZyYW1lUHJlZml4OiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHdhbGtUcmVlKHJvb3Q6IE5vZGUsIGN0eDogU2NhbkNvbnRleHQpOiB2b2lkIHtcbiAgaWYgKGN0eC5jb250cm9scy5sZW5ndGggPj0gTUFYX0NPTlRST0xTKSByZXR1cm47XG4gIGNvbnN0IG5vZGVzID0gcm9vdCBpbnN0YW5jZW9mIERvY3VtZW50IHx8IHJvb3QgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50IHx8IHJvb3QgaW5zdGFuY2VvZiBTaGFkb3dSb290XG4gICAgPyBBcnJheS5mcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbCgnKicpKVxuICAgIDogQXJyYXkuZnJvbSgocm9vdCBhcyBFbGVtZW50KS5xdWVyeVNlbGVjdG9yQWxsKCcqJykpO1xuICBjb25zdCB2aXNpdGVkID0gbmV3IFNldDxFbGVtZW50PigpO1xuXG4gIGZvciAoY29uc3QgZWwgb2Ygbm9kZXMpIHtcbiAgICBpZiAoY3R4LmNvbnRyb2xzLmxlbmd0aCA+PSBNQVhfQ09OVFJPTFMpIGJyZWFrO1xuICAgIGlmICghKGVsIGluc3RhbmNlb2YgRWxlbWVudCkpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHRhZyA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoRVhDTFVERURfVEFHUy5oYXModGFnKSkgY29udGludWU7XG4gICAgaWYgKGVsLmlkID09PSAnZXBpcGxleC1pZS1vdmVybGF5JyB8fCBlbC5jbGFzc0xpc3Q/LmNvbnRhaW5zKCdlcGlwbGV4LWJveCcpKSBjb250aW51ZTtcbiAgICBpZiAodmlzaXRlZC5oYXMoZWwpKSBjb250aW51ZTtcbiAgICB2aXNpdGVkLmFkZChlbCk7XG5cbiAgICAvLyBSZWN1cnNlIGludG8gc2hhZG93IHJvb3RzICsgc2FtZS1vcmlnaW4gaWZyYW1lcy5cbiAgICBjb25zdCBzaGFkb3cgPSAoZWwgYXMgSFRNTEVsZW1lbnQgJiB7IHNoYWRvd1Jvb3Q6IFNoYWRvd1Jvb3QgfCBudWxsIH0pLnNoYWRvd1Jvb3Q7XG4gICAgaWYgKHNoYWRvdykgd2Fsa1RyZWUoc2hhZG93LCB7IC4uLmN0eCwgaWZyYW1lUHJlZml4OiBjdHguaWZyYW1lUHJlZml4IH0pO1xuICAgIGlmICh0YWcgPT09ICdpZnJhbWUnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpZG9jID0gKGVsIGFzIEhUTUxJRnJhbWVFbGVtZW50KS5jb250ZW50RG9jdW1lbnQ7XG4gICAgICAgIGlmIChpZG9jKSB3YWxrVHJlZShpZG9jLCB7IC4uLmN0eCwgaWZyYW1lUHJlZml4OiBgJHtjdHguaWZyYW1lUHJlZml4fWlmcmFtZSMke2VsLmlkIHx8ICcnfSBgIH0pO1xuICAgICAgfSBjYXRjaCB7IC8qIGNyb3NzLW9yaWdpbiAqLyB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBEZXRlY3Qgcm9sZS5cbiAgICBjb25zdCBlbExpa2U6IEVsZW1lbnRMaWtlID0gZWwgYXMgdW5rbm93biBhcyBFbGVtZW50TGlrZTtcbiAgICBjb25zdCBkZXQgPSBkZXRlY3RDb250cm9sUm9sZShlbExpa2UsIGN0eC5jb25maWcsIG51bGwpO1xuICAgIGNvbnN0IGZ3RWwgPSBkZXRlY3RFbGVtZW50RnJhbWV3b3JrKGVsLCBjdHguZnJhbWV3b3Jrcyk7XG5cbiAgICBjb25zdCByb2xlID0gZGV0LnJvbGU7XG4gICAgY29uc3QgY29uZmlkZW5jZSA9IGRldC5jb25maWRlbmNlO1xuICAgIGNvbnN0IGJyZWFrZG93biA9IGRldC5icmVha2Rvd247XG4gICAgY29uc3QgcmVhc29uID0gZGV0LnJlYXNvbjtcbiAgICBjb25zdCBmcmFtZXdvcmtDbGFzcyA9IGRldC5mcmFtZXdvcmtDbGFzcztcblxuICAgIC8vIEljb25zIG5lc3RlZCBpbnNpZGUgYW4gaW50ZXJhY3RpdmUgY29udHJvbCAobGluay9idXR0b24vbWVudSBpdGVtXHUyMDI2KSBhcmVcbiAgICAvLyBwYXJ0IG9mIHRoYXQgY29udHJvbCBcdTIwMTQgbmV2ZXIgc2NhbiB0aGVtIGFzIHNlcGFyYXRlIGljb24gY29udHJvbHMgc28gdGhlXG4gICAgLy8gbGluay9idXR0b24ga2VlcHMgcHJpb3JpdHkuXG4gICAgaWYgKCh0YWcgPT09ICdzdmcnIHx8IHRhZyA9PT0gJ2knIHx8IHRhZyA9PT0gJ21hdC1pY29uJykgJiYgaGFzSW50ZXJhY3RpdmVBbmNlc3RvcihlbCkpIGNvbnRpbnVlO1xuXG4gICAgLy8gU2tpcCBub2lzeSB0ZXh0L2NvbnRhaW5lciBkZWZhdWx0cyB1bmxlc3MgbWVhbmluZ2Z1bC5cbiAgICBpZiAocm9sZSA9PT0gMTAgJiYgIVsnZm9ybScsICdmaWVsZHNldCcsICduYXYnLCAnc2VjdGlvbicsICdhcnRpY2xlJywgJ2hlYWRlcicsICdmb290ZXInLCAnbWFpbiddLmluY2x1ZGVzKHRhZykpIGNvbnRpbnVlO1xuICAgIGlmIChyb2xlID09PSA0MSkge1xuICAgICAgY29uc3QgdGV4dCA9IChlbC50ZXh0Q29udGVudCB8fCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKTtcbiAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8IDIpIGNvbnRpbnVlO1xuICAgICAgaWYgKGVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIGEsIGltZywgdGFibGUnKSkgY29udGludWU7IC8vIGNvbnRhaW5lciBvZiBjb250cm9scywgbm90IHRleHRcbiAgICAgIGlmIChjdHgudGV4dENvdW50ID49IE1BWF9URVhUX0NPTlRST0xTKSBjb250aW51ZTtcbiAgICAgIGN0eC50ZXh0Q291bnQrKztcbiAgICB9XG4gICAgaWYgKHJvbGUgPT09IDgyICYmIGVsLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgIWVsLnRleHRDb250ZW50KSBjb250aW51ZTsgLy8gc3ZnIGNvbnRhaW5lcnNcblxuICAgIGNvbnN0IGxhYmVsUmVzdWx0ID0gZmluZExhYmVsKGVsLCByb290Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpO1xuICAgIGNvbnN0IGF0dHJzID0gZXh0cmFjdEF0dHJpYnV0ZXMoZWxMaWtlKTtcbiAgICBjb25zdCB0cmF2ZXJzYWwgPSBkaXNjb3ZlclRyYXZlcnNhbChlbCwgcm9sZSwgZnJhbWV3b3JrQ2xhc3MsIGN0eC5lbmFibGVkRncpO1xuXG4gICAgY29uc3QgY29udHJvbDogRGV0ZWN0ZWRDb250cm9sID0ge1xuICAgICAgdWlkOiBgYyR7ZnJhbWVJZCsrfWAsXG4gICAgICByb2xlLFxuICAgICAgcm9sZU5hbWU6IHJvbGVOYW1lKHJvbGUpLFxuICAgICAgY29uZmlkZW5jZSxcbiAgICAgIGNvbmZpZGVuY2VCcmVha2Rvd246IGJyZWFrZG93bixcbiAgICAgIGF0dHJpYnV0ZXM6IGF0dHJzLFxuICAgICAgbGFiZWw6IGxhYmVsUmVzdWx0LnRleHQsXG4gICAgICBsYWJlbFN0cmF0ZWd5OiBsYWJlbFJlc3VsdC5zdHJhdGVneSxcbiAgICAgIGxhYmVsTWV0aG9kOiBsYWJlbFJlc3VsdC5zdHJhdGVneSxcbiAgICAgIGxvY2F0aW9uOiB7IHhwYXRoOiBjdHguaWZyYW1lUHJlZml4ICsgeHBhdGhGb3IoZWwpLCBjc3NTZWxlY3RvcjogY3R4LmlmcmFtZVByZWZpeCArIGNzc0ZvcihlbCkgfSxcbiAgICAgIGZyYW1ld29yazogZndFbCA/IGZ3RWwuZnJhbWV3b3JrIDogbnVsbCxcbiAgICAgIGZyYW1ld29ya0NsYXNzLFxuICAgICAgcmVhc29uLFxuICAgICAgcGFyZW50Um9sZTogcGFyZW50Um9sZUZvcihlbCwgcm9sZSksXG4gICAgICBkaXNwbGF5VGV4dDogKGVsLnRleHRDb250ZW50IHx8ICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpLnNsaWNlKDAsIDgwKSxcbiAgICAgIGFkamFjZW50VGV4dDogY2FwdHVyZUFkamFjZW50VGV4dChlbCksXG4gICAgICB0cmF2ZXJzYWxSdWxlOiB0cmF2ZXJzYWwsXG4gICAgfTtcbiAgICBjdHguY29udHJvbHMucHVzaChjb250cm9sKTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEhpZ2hsaWdodCBvdmVybGF5XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gZW5zdXJlT3ZlcmxheSgpOiBIVE1MRGl2RWxlbWVudCB7XG4gIGlmIChvdmVybGF5ICYmIG92ZXJsYXkuaXNDb25uZWN0ZWQpIHJldHVybiBvdmVybGF5O1xuICBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG92ZXJsYXkuaWQgPSAnZXBpcGxleC1pZS1vdmVybGF5JztcbiAgb3ZlcmxheS5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDowO3otaW5kZXg6MjE0NzQ4MzY0Njtwb2ludGVyLWV2ZW50czpub25lOyc7XG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgLmVwaXBsZXgtYm94e3Bvc2l0aW9uOmZpeGVkO2JvcmRlcjoycHggc29saWQgdHJhbnNwYXJlbnQ7Ym94LXNpemluZzpib3JkZXItYm94O3BvaW50ZXItZXZlbnRzOmF1dG87Y3Vyc29yOmNyb3NzaGFpcjt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjEyczt9XG4gICAgLmVwaXBsZXgtYm94OmhvdmVye2JveC1zaGFkb3c6MCAwIDAgMnB4IHJnYmEoMCwwLDAsLjYpLCAwIDRweCAxNHB4IHJnYmEoMCwwLDAsLjM1KTt6LWluZGV4OjE7fVxuICAgICNlcGlwbGV4LXRpcHtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjIxNDc0ODM2NDc7YmFja2dyb3VuZDojMGYxYjJkO2NvbG9yOiNlOGVlZjc7Zm9udDoxMXB4LzEuNDUgQ29uc29sYXMsTWVubG8sbW9ub3NwYWNlO3BhZGRpbmc6OHB4IDEwcHg7Ym9yZGVyLXJhZGl1czo2cHg7bWF4LXdpZHRoOjQyMHB4O3doaXRlLXNwYWNlOnByZS13cmFwO3dvcmQtYnJlYWs6YnJlYWstd29yZDtwb2ludGVyLWV2ZW50czpub25lO2JveC1zaGFkb3c6MCA2cHggMjJweCByZ2JhKDAsMCwwLC41KTtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjE1KTt9XG4gICAgI2VwaXBsZXgtdGlwIGJ7Y29sb3I6I2ZmZDU0Zjt9XG4gICAgI2VwaXBsZXgtdGlwIC5re2NvbG9yOiM4MGNiYzQ7fVxuICBgO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG4gIHJldHVybiBvdmVybGF5O1xufVxuXG5mdW5jdGlvbiByZW5kZXJIaWdobGlnaHQoKTogdm9pZCB7XG4gIGlmICghaGlnaGxpZ2h0RW5hYmxlZCkgcmV0dXJuO1xuICBjb25zdCBob3N0ID0gZW5zdXJlT3ZlcmxheSgpO1xuICBhY3RpdmVCb3hlcy5mb3JFYWNoKChiKSA9PiBiLmVsLnJlbW92ZSgpKTtcbiAgYWN0aXZlQm94ZXMgPSBbXTtcbiAgdG9vbHRpcD8ucmVtb3ZlKCk7XG4gIHRvb2x0aXAgPSBudWxsO1xuXG4gIGNvbnN0IHdpbiA9IHdpbmRvdztcbiAgY29uc3QgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIGZvciAoY29uc3QgYyBvZiBsYXN0U2Nhbikge1xuICAgIGlmIChjLmxvY2F0aW9uLmNzc1NlbGVjdG9yLmluY2x1ZGVzKCdpZnJhbWUnKSkgY29udGludWU7IC8vIGNyb3NzLWZyYW1lIGNvbnRyb2xzIGFyZW4ndCBwb3NpdGlvbmFibGUgaGVyZVxuICAgIGxldCBlbDogRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBlbCA9IGMuYXR0cmlidXRlcy5pZCA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGMuYXR0cmlidXRlcy5pZCkgOiBudWxsO1xuICAgICAgaWYgKCFlbCkgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGMubG9jYXRpb24uY3NzU2VsZWN0b3IpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuZXZhbHVhdGUoYy5sb2NhdGlvbi54cGF0aCwgZG9jdW1lbnQsIG51bGwsIFhQYXRoUmVzdWx0LkZJUlNUX09SREVSRURfTk9ERV9UWVBFLCBudWxsKS5zaW5nbGVOb2RlVmFsdWUgYXMgRWxlbWVudCB8IG51bGw7XG4gICAgICAgIGVsID0gcDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHsgZWwgPSBudWxsOyB9XG4gICAgaWYgKCFlbCB8fCAhZWwuaXNDb25uZWN0ZWQgfHwgIXZpc2libGUoZWwpKSBjb250aW51ZTtcblxuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAocmVjdC53aWR0aCA8IDIgfHwgcmVjdC5oZWlnaHQgPCAyKSBjb250aW51ZTtcbiAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib3guY2xhc3NOYW1lID0gJ2VwaXBsZXgtYm94JztcbiAgICBib3guc3R5bGUuYm9yZGVyQ29sb3IgPSByb2xlQ29sb3IoYy5yb2xlKTtcbiAgICBib3guc3R5bGUuYmFja2dyb3VuZCA9IHJvbGVDb2xvcihjLnJvbGUpICsgJzJlJztcbiAgICBib3guc3R5bGUubGVmdCA9IHJlY3QubGVmdCArICdweCc7XG4gICAgYm94LnN0eWxlLnRvcCA9IHJlY3QudG9wICsgJ3B4JztcbiAgICBib3guc3R5bGUud2lkdGggPSByZWN0LndpZHRoICsgJ3B4JztcbiAgICBib3guc3R5bGUuaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKyAncHgnO1xuICAgIGNvbnN0IGNvbnRyb2wgPSBjO1xuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gc2hvd1Rvb2x0aXAoY29udHJvbCwgYm94KSk7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB0b29sdGlwPy5yZW1vdmUoKSk7XG4gICAgaG9zdC5hcHBlbmRDaGlsZChib3gpO1xuICAgIGFjdGl2ZUJveGVzLnB1c2goeyBlbDogYm94LCBjb250cm9sOiBjIH0pO1xuICB9XG5cbiAgY29uc3QgcmVwb3NpdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoIWhpZ2hsaWdodEVuYWJsZWQpIHJldHVybjtcbiAgICBmb3IgKGNvbnN0IGIgb2YgYWN0aXZlQm94ZXMpIHtcbiAgICAgIGxldCBlbDogRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZWwgPSBiLmNvbnRyb2wuYXR0cmlidXRlcy5pZCA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGIuY29udHJvbC5hdHRyaWJ1dGVzLmlkKSA6IG51bGw7XG4gICAgICAgIGlmICghZWwpIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihiLmNvbnRyb2wubG9jYXRpb24uY3NzU2VsZWN0b3IpO1xuICAgICAgfSBjYXRjaCB7IGVsID0gbnVsbDsgfVxuICAgICAgaWYgKCFlbCkgeyBiLmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IGNvbnRpbnVlOyB9XG4gICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBiLmVsLnN0eWxlLmxlZnQgPSByZWN0LmxlZnQgKyAncHgnO1xuICAgICAgYi5lbC5zdHlsZS50b3AgPSByZWN0LnRvcCArICdweCc7XG4gICAgICBiLmVsLnN0eWxlLndpZHRoID0gcmVjdC53aWR0aCArICdweCc7XG4gICAgICBiLmVsLnN0eWxlLmhlaWdodCA9IHJlY3QuaGVpZ2h0ICsgJ3B4JztcbiAgICB9XG4gIH07XG4gIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmIChyZXBvc2l0aW9uUmFmKSBjYW5jZWxBbmltYXRpb25GcmFtZShyZXBvc2l0aW9uUmFmKTtcbiAgICByZXBvc2l0aW9uUmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlcG9zaXRpb24pO1xuICB9O1xuICB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHRydWUpO1xuICB3aW4uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHRydWUpO1xuICB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25TY3JvbGwpO1xuICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25TY3JvbGwpO1xuICB2b2lkIGRvY0VsO1xufVxuXG5mdW5jdGlvbiBzaG93VG9vbHRpcChjOiBEZXRlY3RlZENvbnRyb2wsIGFuY2hvcjogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcbiAgdG9vbHRpcD8ucmVtb3ZlKCk7XG4gIHRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG9vbHRpcC5pZCA9ICdlcGlwbGV4LXRpcCc7XG4gIGNvbnN0IGEgPSBjLmF0dHJpYnV0ZXM7XG4gIGNvbnN0IHJ1bGVMaW5lID0gYy50cmF2ZXJzYWxSdWxlXG4gICAgPyBgVHJhdmVyc2FsOiAke2MudHJhdmVyc2FsUnVsZS5jb25kaXRpb24uY2xhc3NOYW1lIHx8IGMudHJhdmVyc2FsUnVsZS5jb25kaXRpb24udGFnTmFtZSB8fCAnJ30gXHUyMTkyICR7Yy50cmF2ZXJzYWxSdWxlLnBhdGhzLm1hcCgocCkgPT4gYCR7cC5wYXRofSR7cC5vcGVyYXRvciA9PT0gJ3JlY3Vyc2l2ZScgPyAnKicgOiAnJ31gKS5qb2luKCcgJyl9YFxuICAgIDogYFJ1bGU6ICR7Yy5yZWFzb259YDtcbiAgdG9vbHRpcC50ZXh0Q29udGVudCA9ICcnO1xuICB0b29sdGlwLmlubmVySFRNTCA9XG4gICAgYDxiPiR7Yy5yb2xlTmFtZX08L2I+IChyb2xlICR7Yy5yb2xlfSkgXHUwMEI3ICR7Yy5jb25maWRlbmNlfSU8YnI+YCArXG4gICAgYDxzcGFuIGNsYXNzPVwia1wiPlRhZzo8L3NwYW4+ICR7YS50YWdOYW1lfSR7YS50eXBlID8gYCB0eXBlPVwiJHthLnR5cGV9XCJgIDogJyd9PGJyPmAgK1xuICAgIGA8c3BhbiBjbGFzcz1cImtcIj5MYWJlbDo8L3NwYW4+ICR7KGMubGFiZWwgfHwgJ1x1MjAxNCcpLnNsaWNlKDAsIDYwKX08YnI+YCArXG4gICAgYDxzcGFuIGNsYXNzPVwia1wiPkF0dHJzOjwvc3Bhbj4gJHtbYS5pZCAmJiBgaWQ9JHthLmlkfWAsIGEubmFtZSAmJiBgbmFtZT0ke2EubmFtZX1gLCBhLmNsYXNzTmFtZSAmJiBgY2xhc3M9JHthLmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLnNsaWNlKDAsIDMpLmpvaW4oJyAnKX1gXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpIHx8ICdcdTIwMTQnfTxicj5gICtcbiAgICBgPHNwYW4gY2xhc3M9XCJrXCI+UnVsZTo8L3NwYW4+ICR7cnVsZUxpbmV9PGJyPmAgK1xuICAgIGA8c3BhbiBjbGFzcz1cImtcIj5DU1M6PC9zcGFuPiAke2MubG9jYXRpb24uY3NzU2VsZWN0b3J9PGJyPmAgK1xuICAgIGA8c3BhbiBjbGFzcz1cImtcIj5YUGF0aDo8L3NwYW4+ICR7Yy5sb2NhdGlvbi54cGF0aH1gO1xuICBjb25zdCByZWN0ID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB0b29sdGlwLnN0eWxlLmxlZnQgPSBNYXRoLm1pbihyZWN0LmxlZnQsIHdpbmRvdy5pbm5lcldpZHRoIC0gNDQwKSArICdweCc7XG4gIHRvb2x0aXAuc3R5bGUudG9wID0gKHJlY3QudG9wID4gMTgwID8gcmVjdC50b3AgLSB0b29sdGlwLm9mZnNldEhlaWdodCAtIDEwIDogcmVjdC5ib3R0b20gKyAxMCkgKyAncHgnO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodG9vbHRpcCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFySGlnaGxpZ2h0KCk6IHZvaWQge1xuICBoaWdobGlnaHRFbmFibGVkID0gZmFsc2U7XG4gIG92ZXJsYXk/LnJlbW92ZSgpO1xuICB0b29sdGlwPy5yZW1vdmUoKTtcbiAgYWN0aXZlQm94ZXMgPSBbXTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBMaXZlIGNhcHR1cmUgKE11dGF0aW9uT2JzZXJ2ZXIpXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gc3RhcnRMaXZlKGNvbmZpZzogUm9sZU1hcHBpbmdDb25maWcsIGZyYW1ld29ya3M6IEZyYW1ld29ya0luZm9bXSwgZW5hYmxlZEZ3OiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPik6IHZvaWQge1xuICBpZiAob2JzZXJ2ZXIpIHJldHVybjtcbiAgbGV0IHRpbWVyID0gMDtcbiAgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IHBlcmZvcm1TY2FuKGNvbmZpZywgZnJhbWV3b3JrcywgZW5hYmxlZEZ3KTtcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ0VQSVBMRVhfTElWRV9VUERBVEUnLCBwYXlsb2FkOiByZXMgfSkuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcbiAgICB9LCA3MDApO1xuICB9KTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xufVxuXG5mdW5jdGlvbiBzdG9wTGl2ZSgpOiB2b2lkIHtcbiAgb2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgb2JzZXJ2ZXIgPSBudWxsO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFNjYW4gb3JjaGVzdHJhdGlvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHBlcmZvcm1TY2FuKGNvbmZpZzogUm9sZU1hcHBpbmdDb25maWcsIGZyYW1ld29ya3M6IEZyYW1ld29ya0luZm9bXSwgZW5hYmxlZEZ3OiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPik6IFNjYW5SZXNwb25zZSB7XG4gIGZyYW1lSWQgPSAwO1xuICBjb25zdCBjdHg6IFNjYW5Db250ZXh0ID0geyBjb250cm9sczogW10sIGNvbmZpZywgZnJhbWV3b3JrcywgZW5hYmxlZEZ3LCB0ZXh0Q291bnQ6IDAsIGlmcmFtZVByZWZpeDogJycgfTtcbiAgd2Fsa1RyZWUoZG9jdW1lbnQsIGN0eCk7XG4gIGxhc3RTY2FuID0gY3R4LmNvbnRyb2xzO1xuICBpZiAoaGlnaGxpZ2h0RW5hYmxlZCkgcmVuZGVySGlnaGxpZ2h0KCk7XG4gIHJldHVybiB7XG4gICAgY29udHJvbHM6IGxhc3RTY2FuLFxuICAgIGZyYW1ld29ya3M6IGZyYW1ld29ya3MubWFwKChmKSA9PiBmLm5hbWUpLFxuICAgIHVybDogbG9jYXRpb24uaHJlZixcbiAgICB0aXRsZTogZG9jdW1lbnQudGl0bGUsXG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICB9O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE1lc3NhZ2VzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2csIF9zZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBsb2FkU2V0dGluZ3MoKTtcbiAgICBjb25zdCBiYXNlQ29uZmlnID0gcmVzb2x2ZVJvbGVNYXBwaW5ncyhzZXR0aW5ncyk7XG4gICAgLy8gUmVzcGVjdCBwZXItZnJhbWV3b3JrIHRvZ2dsZXM6IGRyb3AgbWFwcGluZ3MgZm9yIGRpc2FibGVkIGZyYW1ld29ya3MuXG4gICAgY29uc3QgY29uZmlnOiBSb2xlTWFwcGluZ0NvbmZpZyA9IHtcbiAgICAgIC4uLmJhc2VDb25maWcsXG4gICAgICBmcmFtZXdvcmtSb2xlTWFwcGluZ3M6IGJhc2VDb25maWcuZnJhbWV3b3JrUm9sZU1hcHBpbmdzLmZpbHRlcihcbiAgICAgICAgKG0pID0+IHNldHRpbmdzLmVuYWJsZWRGcmFtZXdvcmtzW20uZnJhbWV3b3JrXSAhPT0gZmFsc2VcbiAgICAgICksXG4gICAgfTtcbiAgICBjb25zdCBmcmFtZXdvcmtzID0gZGV0ZWN0RnJhbWV3b3Jrcyhkb2N1bWVudCkuZmlsdGVyKChmKSA9PiBzZXR0aW5ncy5lbmFibGVkRnJhbWV3b3Jrc1tmLmtleV0gIT09IGZhbHNlKTtcbiAgICBjb25zdCBlbmFibGVkRncgPSBzZXR0aW5ncy5lbmFibGVkRnJhbWV3b3JrcztcblxuICAgIHN3aXRjaCAobXNnPy50eXBlKSB7XG4gICAgICBjYXNlICdFUElQTEVYX1NDQU4nOiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHBlcmZvcm1TY2FuKGNvbmZpZywgZnJhbWV3b3JrcywgZW5hYmxlZEZ3KTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgb2s6IHRydWUsIHBheWxvYWQ6IHJlcyB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdFUElQTEVYX0hJR0hMSUdIVCc6IHtcbiAgICAgICAgaGlnaGxpZ2h0RW5hYmxlZCA9ICEhbXNnLmVuYWJsZWQ7XG4gICAgICAgIGlmIChoaWdobGlnaHRFbmFibGVkKSByZW5kZXJIaWdobGlnaHQoKTtcbiAgICAgICAgZWxzZSBjbGVhckhpZ2hsaWdodCgpO1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBvazogdHJ1ZSB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdFUElQTEVYX0xJVkUnOiB7XG4gICAgICAgIGlmIChtc2cuZW5hYmxlZCkgc3RhcnRMaXZlKGNvbmZpZywgZnJhbWV3b3JrcywgZW5hYmxlZEZ3KTtcbiAgICAgICAgZWxzZSBzdG9wTGl2ZSgpO1xuICAgICAgICBsaXZlRW5hYmxlZCA9ICEhbXNnLmVuYWJsZWQ7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IG9rOiB0cnVlLCBsaXZlOiBsaXZlRW5hYmxlZCB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdFUElQTEVYX0NMRUFSX0hJR0hMSUdIVCc6IHtcbiAgICAgICAgY2xlYXJIaWdobGlnaHQoKTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgb2s6IHRydWUgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgb2s6IGZhbHNlLCBlcnJvcjogJ3Vua25vd24gbWVzc2FnZScgfSk7XG4gICAgfVxuICB9KSgpLmNhdGNoKChlKSA9PiBzZW5kUmVzcG9uc2UoeyBvazogZmFsc2UsIGVycm9yOiBTdHJpbmcoZSkgfSkpO1xuICByZXR1cm4gdHJ1ZTsgLy8gYXN5bmMgcmVzcG9uc2Vcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBV08sTUFBTSxhQUE4QjtBQUFBLElBQ3pDO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixlQUFlLENBQUMsZUFBZSxXQUFXLGtCQUFrQjtBQUFBLE1BQzVELGFBQWEsQ0FBQyxjQUFjLFVBQVUsaUJBQWlCLFVBQVU7QUFBQSxJQUNuRTtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLGVBQWUsQ0FBQyx1QkFBdUIsZ0JBQWdCLGtCQUFrQjtBQUFBLE1BQ3pFLGFBQWEsQ0FBQyxtQkFBbUIsdUJBQXVCLGNBQWM7QUFBQSxJQUN4RTtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLGVBQWUsQ0FBQyxvQkFBb0IsTUFBTTtBQUFBLE1BQzFDLGFBQWEsQ0FBQyxvQkFBb0IsV0FBVyxVQUFVO0FBQUEsSUFDekQ7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixlQUFlLENBQUMsZ0JBQWdCLHFCQUFxQixlQUFlO0FBQUEsTUFDcEUsYUFBYSxDQUFDLGVBQWUsaUJBQWlCLE1BQU07QUFBQSxJQUN0RDtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLGVBQWUsQ0FBQyxvQkFBb0IsbUJB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
