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
var UPPER_TYPES = /* @__PURE__ */ new Set([
  "TEXT",
  "PASSWORD",
  "FILE",
  "NUMBER",
  "COLOR",
  "SEARCH",
  "CHECKBOX",
  "RADIO",
  "SUBMIT",
  "RESET",
  "BUTTON",
  "IMAGE",
  "DATE",
  "TIME",
  "MONTH",
  "WEEK"
]);
function normalizeType(type) {
  return UPPER_TYPES.has(type.toUpperCase()) ? type.toUpperCase() : type.toLowerCase();
}
function normalizeTagName(tag) {
  const t = tag.toLowerCase();
  const STANDARD = /* @__PURE__ */ new Set([
    "input",
    "textarea",
    "select",
    "button",
    "a",
    "area",
    "img",
    "table",
    "tr",
    "td",
    "th",
    "li",
    "option",
    "label",
    "span",
    "div",
    "p",
    "i",
    "svg",
    "nav",
    "form",
    "fieldset",
    "ul",
    "ol",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "mark",
    "caption",
    "legend",
    "section",
    "article",
    "header",
    "footer",
    "main",
    "tbody",
    "thead",
    "tfoot",
    "dd",
    "dt",
    "dl",
    "em",
    "strong",
    "b"
  ]);
  return STANDARD.has(t) ? t.toUpperCase() : t;
}
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
  for (const [attr2, re, role, conf] of [
    ["aria-haspopup", /listbox|menu|true/i, 46, 82],
    ["aria-expanded", /true|false/i, 46, 70],
    ["aria-autocomplete", /list|inline/i, 42, 70]
  ]) {
    const v = el.getAttribute(attr2);
    if (v && re.test(v)) {
      breakdown.aria = conf;
      return { role, confidence: conf, breakdown, reason: `Matched ${attr2}="${v}" \u2192 ${roleName(role)} (${role})`, framework: null, frameworkClass: null };
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
function pipe(values) {
  const uniq = [...new Set(values.filter(Boolean))];
  return `|${uniq.join("|")}|`;
}
function buildTagRule(c) {
  const tag = c.attributes.tagName;
  const conds = [];
  if (c.role === 82 && (tag === "svg" || tag === "i" || tag === "mat-icon") && c.parentRole !== 10) return null;
  if (tag === "input") {
    const type = c.attributes.type || "text";
    const t = normalizeType(type);
    conds.push({ tagName: "|INPUT|", type: pipe([t]) });
  } else if (tag === "select") {
    const multiple = c.attributes.multiple === true;
    conds.push({ tagName: "|SELECT|", type: pipe([multiple ? "SELECT-MULTIPLE" : "SELECT-ONE"]) });
  } else if (tag === "textarea") {
    conds.push({ tagName: "|TEXTAREA|" });
  } else {
    conds.push({ tagName: pipe([normalizeTagName(tag)]) });
  }
  const parent = tag === "img" && c.role === 40 ? null : c.parentRole;
  return {
    currentRole: c.role,
    parentRole: parent,
    conditions: conds,
    source: c.reason,
    framework: c.framework ?? void 0,
    confidence: c.confidence
  };
}
var INTERACTIVE_PARENT_ROLES = /* @__PURE__ */ new Set([30, 43, 12, 37, 42, 44, 45, 46, 92, 34]);
function buildAttributeRule(c, config) {
  const a = c.attributes;
  if ((c.role === 82 || c.role === 40) && c.parentRole != null && INTERACTIVE_PARENT_ROLES.has(c.parentRole)) return null;
  if (a.role) {
    const roleMapping = config.attributeRoleMappings.find(
      (m) => m.attribute === "role" && new RegExp(m.valuePattern).test(a.role || "")
    );
    if (roleMapping) {
      return { currentRole: c.role, parentRole: c.parentRole, attribute: "role", values: [a.role], operator: "equals", source: c.reason, framework: c.framework ?? void 0, confidence: c.confidence };
    }
  }
  const cls = a.className;
  if (cls) {
    const tokens = cls.split(/\s+/).filter(Boolean);
    const mapped = tokens.filter((t) => {
      try {
        return config.frameworkRoleMappings.some((m) => new RegExp(m.classPattern).test(t));
      } catch {
        return false;
      }
    });
    if (mapped.length > 0) {
      return { currentRole: c.role, parentRole: c.parentRole, attribute: "className", values: mapped, operator: "contains", source: c.reason, framework: c.framework ?? void 0, confidence: c.confidence };
    }
  }
  if (a.data) {
    for (const key of Object.keys(a.data)) {
      const full = `data-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      const v = a.data[key];
      if (/(date|calendar)/i.test(v)) {
        return { currentRole: c.role, parentRole: c.parentRole, attribute: full, values: [v], operator: "contains", source: c.reason, framework: c.framework ?? void 0, confidence: c.confidence };
      }
    }
  }
  return null;
}
function uniqPipe(list) {
  return [...new Set(list)];
}
function deduplicateTagRules(rules) {
  const map = /* @__PURE__ */ new Map();
  for (const r of rules) {
    const key = `${r.currentRole}|${r.parentRole ?? ""}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { ...r, conditions: [...r.conditions] });
      continue;
    }
    for (const cond of r.conditions) {
      const hit = existing.conditions.find((c2) => c2.tagName === cond.tagName && c2.type === cond.type);
      if (!hit) existing.conditions.push({ ...cond });
    }
    existing.confidence = Math.max(existing.confidence, r.confidence);
    existing.source = [existing.source, r.source].filter((s, i, arr) => arr.indexOf(s) === i).join(" \xB7 ");
  }
  for (const r of map.values()) {
    const byTag = /* @__PURE__ */ new Map();
    for (const cond of r.conditions) {
      const hit = byTag.get(cond.tagName);
      if (!hit) {
        byTag.set(cond.tagName, { ...cond });
        continue;
      }
      if (cond.type) hit.type = hit.type ? `|${uniqPipe([...hit.type.slice(1, -1).split("|"), ...cond.type.slice(1, -1).split("|")]).join("|")}|` : cond.type;
    }
    r.conditions = [...byTag.values()];
  }
  return [...map.values()];
}
function deduplicateAttributeRules(rules) {
  const map = /* @__PURE__ */ new Map();
  for (const r of rules) {
    const key = `${r.currentRole}|${r.parentRole ?? ""}|${r.attribute}|${r.operator}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { ...r, values: [...r.values] });
      continue;
    }
    existing.values = uniqPipe([...existing.values, ...r.values]);
    existing.confidence = Math.max(existing.confidence, r.confidence);
    existing.source = [existing.source, r.source].filter((s, i, arr) => arr.indexOf(s) === i).join(" \xB7 ");
  }
  return [...map.values()];
}
function deduplicateRules(rules, fingerprint2) {
  const seen = /* @__PURE__ */ new Map();
  for (const r of rules) {
    const key = fingerprint2(r);
    if (!seen.has(key)) seen.set(key, r);
  }
  return [...seen.values()];
}
function generateRuleModel(controls, ctx, extra) {
  const tagRules = [];
  const attrRules = [];
  for (const c of controls) {
    if (c.confidence < ctx.minConfidence) continue;
    if (!c.frameworkClass) {
      const tr = buildTagRule(c);
      if (tr) tagRules.push(tr);
    }
    const ar = buildAttributeRule(c, ctx.config);
    if (ar) attrRules.push(ar);
  }
  const dedupTags = deduplicateTagRules(tagRules);
  const dedupAttrs = deduplicateAttributeRules(attrRules);
  const traversal = extra?.traversalRules ? deduplicateRules(extra.traversalRules, traversalFingerprint) : [];
  const standard = extra?.labelRules ? extra.labelRules.standard : [];
  const traverse = extra?.labelRules ? extra.labelRules.traverse : [];
  return {
    basedOnTags: dedupTags.sort((a, b) => a.currentRole - b.currentRole),
    basedOnAttributes: dedupAttrs.sort((a, b) => a.currentRole - b.currentRole),
    basedOnTraverseLogic: traversal.sort((a, b) => a.currentRole - b.currentRole),
    standardLogic: standard,
    traverseLogic: traverse,
    sites: [`${ctx.url}${ctx.title ? ` \u2014 ${ctx.title}` : ""}`],
    diagnostics: []
  };
}
function traversalFingerprint(r) {
  const cond = [r.condition.tagName, r.condition.type, r.condition.className, r.condition.attribute, r.condition.value].join("|");
  const paths = r.paths.map((p) => `${p.path}:${p.operator}:${JSON.stringify(p.attributes)}`).join(">");
  return `traversal|${r.currentRole}|${r.parentRole ?? ""}|${cond}|${paths}`;
}
function toEpiplexOperator(op) {
  return op === "startswith" ? "starts-with" : op === "endswith" ? "ends-with" : op;
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
function buildStandardLabelRules(controls) {
  const rules = [
    {
      id: "SL_1",
      from: "id",
      to: "htmlfor",
      operator: "contains",
      reason: "Standard Epiplex association: control id \u2194 <label for> (label[for=id])."
    },
    {
      id: "SL_2",
      from: "aria-labelledby",
      to: "id",
      operator: "contains",
      reason: "ARIA association: aria-labelledby lists the id of the labelling element."
    }
  ];
  const hasAriaLabel = controls.some((c) => c.attributes.ariaLabel);
  if (hasAriaLabel) {
    rules.push({
      id: "SL_3",
      from: "aria-label",
      to: "title",
      operator: "contains",
      reason: "aria-label is used directly as the control name."
    });
  }
  return rules;
}
function attrsString(attrs) {
  return Object.keys(attrs).sort().map((k) => `${k}=${attrs[k]}`).join(",");
}
function labelTraversalFingerprint(r) {
  const paths = r.paths.map((p) => `${p.path}:${p.operator}:${attrsString(p.attributes)}`).join(">");
  return `${r.role}|${r.parentRole ?? ""}|${attrsString(r.attributes)}|${paths}|${r.method}`;
}
function buildTraverseLabelRules(controls) {
  const seen = /* @__PURE__ */ new Map();
  const push = (r) => {
    const key = labelTraversalFingerprint(r);
    if (!seen.has(key)) seen.set(key, r);
  };
  const inputAttrs = (c) => {
    const a = { TagName: c.attributes.tagName.toUpperCase() };
    if (c.attributes.tagName === "input" && c.attributes.type && c.attributes.type !== "text") {
      a.type = c.attributes.type;
    }
    return a;
  };
  const innerTextPath = (path, operator, attributes) => [
    { path, operator, attributes }
  ];
  for (const c of controls) {
    switch (c.labelStrategy) {
      case "parent-label":
        push({
          id: "",
          role: c.role,
          parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath("PR", "simple", { TagName: "label" }),
          method: "innerText",
          reason: `Label found by wrapping <label> (e.g. ${c.location.cssSelector}).`
        });
        break;
      case "sibling-label":
        push({
          id: "",
          role: c.role,
          parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath("PS", "simple", { TagName: "label" }),
          method: "innerText",
          reason: `Label found as sibling <label> (e.g. ${c.location.cssSelector}).`
        });
        break;
      case "nearest-text":
        push({
          id: "",
          role: c.role,
          parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath("PS", "simple", {}),
          method: "innerText",
          reason: `Label taken from the nearest preceding text node (${c.location.cssSelector}).`
        });
        push({
          id: "",
          role: c.role,
          parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath("PR", "recursive", { TagName: "label" }),
          method: "innerText",
          reason: `Fallback: walk parents for a <label> containing the control.`
        });
        break;
      case "table-header":
        push({
          id: "",
          role: c.role,
          parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath("PR", "recursive", { TagName: "tr" }),
          method: "innerText",
          reason: `Label derived from the table header / row text (${c.location.cssSelector}).`
        });
        break;
      case "form-group":
        push({
          id: "",
          role: c.role,
          parentRole: c.parentRole,
          attributes: inputAttrs(c),
          paths: innerTextPath("PR", "recursive", { TagName: "label" }),
          method: "innerText",
          reason: `Label inside a form-group wrapper (${c.location.cssSelector}).`
        });
        break;
      default:
        break;
    }
  }
  const rules = [...seen.values()].sort((a, b) => a.role - b.role || a.paths[0].path.localeCompare(b.paths[0].path));
  rules.forEach((r, i) => {
    r.id = `TL_${i + 1}`;
  });
  return rules;
}
function suggestMissingLabels(controls) {
  const missing = controls.filter((c) => !c.label && c.role !== 24 && c.role !== 28 && c.role !== 29 && c.role !== 10);
  return missing.map(
    (c) => `Add aria-label or <label for="${c.attributes.id || "\u2026"}"> for the ${c.roleName} at ${c.location.cssSelector}.`
  );
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
function generateTraversalRules(controls) {
  const seen = /* @__PURE__ */ new Map();
  for (const c of controls) {
    const r = c.traversalRule;
    if (!r) continue;
    const key = fingerprint(r);
    if (!seen.has(key)) seen.set(key, r);
  }
  return [...seen.values()].sort((a, b) => a.currentRole - b.currentRole);
}
function fingerprint(r) {
  const cond = [r.condition.tagName, r.condition.type, r.condition.className, r.condition.attribute, r.condition.value].join("|");
  const paths = r.paths.map((p) => `${p.path}:${p.operator}:${Object.keys(p.attributes).sort().map((k) => `${k}=${p.attributes[k]}`).join(",")}`).join(">");
  return `traversal|${r.currentRole}|${r.parentRole ?? ""}|${cond}|${paths}`;
}
function suggestTraversalImprovements(controls) {
  const suggestions = [];
  for (const c of controls) {
    if (c.traversalRule) continue;
    const tag = c.attributes.tagName;
    const cls = c.attributes.className || "";
    if ((tag === "input" || tag === "select") && /\b(hidden|sr-only|visually-hidden)\b/.test(cls)) {
      suggestions.push(
        `The ${c.roleName} at ${c.location.cssSelector} is visually hidden \u2014 consider a traversal rule anchored on its visible wrapper (checkbox/select2/combobox).`
      );
    }
    if (c.traversalRule === void 0) {
      suggestions.push(
        `The ${c.roleName} at ${c.location.cssSelector} is covered by a tag rule but sits in a framework wrapper \u2014 verify a traversal rule from that wrapper is desired.`
      );
    }
  }
  return [...new Set(suggestions)].slice(0, 20);
}

// src/stepSentence.ts
var UTILITY_PATTERNS = [
  /^text-/i,
  /^bg-/i,
  /^h-/i,
  /^w-/i,
  /^p-/i,
  /^m-/i,
  /^opacity-/i,
  /^duration-/i,
  /^transition-/i,
  /^flex$/i,
  /^grid$/i,
  /^rounded/i,
  /^shadow/i,
  /^hover:/i,
  /^focus:/i,
  /^dark:/i,
  /^md:/i,
  /^lg:/i,
  /^xl:/i,
  /^sm:/i,
  /^2xl:/i,
  /^(relative|absolute|fixed|sticky)$/i,
  /^(block|inline|inline-block|hidden)$/i,
  /^(border|border-.*)$/i
];
function isUtilityClass(token) {
  const t = token.trim();
  if (!t) return false;
  return UTILITY_PATTERNS.some((re) => re.test(t));
}
function cleanName(raw) {
  if (!raw) return null;
  const cleaned = raw.replace(/\s+/g, " ").replace(/^[\s"'“”‘’([{]+|[\s"'“”‘’)\]}]+$/g, "").trim();
  if (!cleaned || cleaned.length < 1) return null;
  return cleaned.length > 48 ? cleaned.slice(0, 47).trimEnd() + "\u2026" : cleaned;
}
function usableName(raw) {
  const name = cleanName(raw);
  if (!name) return null;
  const tokens = name.split(/\s+/);
  if (tokens.length > 0 && tokens.every(isUtilityClass)) return null;
  return name;
}
function clickKind(c) {
  const tag = c.attributes.tagName;
  const role = c.attributes.role;
  const cls = c.attributes.className || "";
  const isLogo = /logo|brand/i.test(cls);
  if (role === "button" || tag === "button" || c.role === 43) return "button";
  if (tag === "a" || role === "link" || c.role === 30) return "link";
  if (c.role === 82 || tag === "svg" || tag === "i" || tag === "mat-icon") return isLogo ? "logo" : "icon";
  if (tag === "img") return isLogo ? "logo" : "icon";
  if (c.role === 44) return "checkbox";
  if (c.role === 45) return "radio";
  if (c.role === 46) return "dropdown";
  if (c.role === 42) return "textbox";
  if (c.role === 92) return "date";
  if (c.role === 37) return "tab";
  return "other";
}
function computeControlName(c) {
  const a = c.attributes;
  const visible = usableName(c.displayText);
  if (visible) return visible;
  const aria = usableName(a.ariaLabel);
  if (aria) return aria;
  const title = usableName(a.title);
  if (title) return title;
  const alt = usableName(a.alt);
  if (alt) return alt;
  const label = usableName(c.label);
  if (label) return label;
  const adjacent = usableName(c.adjacentText);
  if (adjacent) return adjacent;
  return "element";
}
function stepDescription(c) {
  return computeControlName(c);
}
function generateStepSentence(c) {
  const name = computeControlName(c);
  switch (clickKind(c)) {
    case "button":
      return `Click ${name} button.`;
    case "link":
      return `Click ${name} link.`;
    case "icon":
      return `Click ${name} Icon.`;
    case "logo":
      return `Click ${name} logo.`;
    case "checkbox":
      return `Check ${name} checkbox.`;
    case "radio":
      return `Select ${name} radio.`;
    case "dropdown":
      return `Select ${name} dropdown.`;
    case "textbox":
      return `Type into ${name} textbox.`;
    case "date":
      return `Pick date in ${name}.`;
    case "tab":
      return `Click ${name} tab.`;
    default:
      return `Click ${name}.`;
  }
}

// src/xmlGenerator.ts
var EXTENSION_NAME = "Epiplex IE Rules Generator";
var EXTENSION_VERSION = "1.0.0";
function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
var T = "	";
function comment(text, indent) {
  return `${T.repeat(indent)}<!-- ${text} -->`;
}
function renderTagRule(rule, indent) {
  const out = [];
  const parent = rule.parentRole === null ? "" : String(rule.parentRole);
  out.push(`${T.repeat(indent)}<Rule Enable="1" CurrentRole="${rule.currentRole}" ParentRole="${parent}">`);
  out.push(`${T.repeat(indent + 1)}<CurrentInfo>`);
  for (const cond of rule.conditions) {
    const type = cond.type ? ` Type="${escapeXml(cond.type)}"` : "";
    out.push(`${T.repeat(indent + 2)}<Condition TagName="${escapeXml(cond.tagName)}"${type}/>`);
  }
  if (rule.source) out.push(comment(escapeXml(rule.source), indent + 2));
  out.push(`${T.repeat(indent + 1)}</CurrentInfo>`);
  out.push(`${T.repeat(indent)}</Rule>`);
  return out.join("\n");
}
function renderAttributeRule(rule, indent) {
  const out = [];
  const parent = rule.parentRole === null ? "" : String(rule.parentRole);
  const values = `|${[...new Set(rule.values)].join("|")}|`;
  out.push(`${T.repeat(indent)}<Rule Enable="1" CurrentRole="${rule.currentRole}" ParentRole="${parent}">`);
  out.push(`${T.repeat(indent + 1)}<CurrentInfo>`);
  out.push(`${T.repeat(indent + 2)}<Condition Operator="${rule.operator}" ${escapeXml(rule.attribute)}="${escapeXml(values)}"/>`);
  if (rule.framework) out.push(comment(`framework: ${escapeXml(rule.framework)}`, indent + 2));
  if (rule.source) out.push(comment(escapeXml(rule.source), indent + 2));
  out.push(`${T.repeat(indent + 1)}</CurrentInfo>`);
  out.push(`${T.repeat(indent)}</Rule>`);
  return out.join("\n");
}
function renderTraversalRule(rule, indent) {
  const out = [];
  const parent = rule.parentRole === null ? "" : String(rule.parentRole);
  out.push(`${T.repeat(indent)}<Rule Enable="1" CurrentRole="${rule.currentRole}" ParentRole="${parent}">`);
  out.push(`${T.repeat(indent + 1)}<CurrentInfo>`);
  const cond = rule.condition;
  if (cond.tagName) {
    out.push(`${T.repeat(indent + 2)}<Condition TagName="${escapeXml(cond.tagName)}"/>`);
  } else if (cond.className) {
    out.push(`${T.repeat(indent + 2)}<Condition className="${escapeXml(cond.className)}" Operator="${cond.operator || "contains"}"/>`);
  } else if (cond.attribute) {
    out.push(`${T.repeat(indent + 2)}<Condition ${escapeXml(cond.attribute)}="${escapeXml(cond.value || "")}" Operator="${cond.operator || "contains"}"/>`);
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
    const attrs = Object.entries(path.attributes).map(([k, v]) => `${k}="${escapeXml(v)}"`).join(" ");
    out.push(`${T.repeat(indent + 4)}<Attributes ${attrs}/>`);
    out.push(`${T.repeat(indent + 3)}</Condition>`);
    out.push(`${T.repeat(indent + 2)}</Path>`);
  }
  out.push(`${T.repeat(indent + 1)}</TraversalInfo>`);
  out.push(`${T.repeat(indent)}</Rule>`);
  return out.join("\n");
}
function renderStandardRule(rule, indent) {
  return [
    `${T.repeat(indent)}<Rule Id="${rule.id}">`,
    `${T.repeat(indent + 1)}<Attributes From="${rule.from}" To="${rule.to}" Operator="${rule.operator}"/>`,
    `${T.repeat(indent)}</Rule>`
  ].join("\n");
}
function renderTraverseLabelRule(rule, indent) {
  const out = [];
  const parent = rule.parentRole === null ? "" : String(rule.parentRole);
  out.push(`${T.repeat(indent)}<Rule Id="${rule.id}" Enable="1">`);
  out.push(`${T.repeat(indent + 1)}<WhenToConsider Role="${rule.role}" ParentRole="${parent}">`);
  const attrs = Object.entries(rule.attributes).map(([k, v]) => `${k}="${escapeXml(v)}"`).join(" ");
  out.push(`${T.repeat(indent + 2)}<Attributes ${attrs}/>`);
  out.push(`${T.repeat(indent + 1)}</WhenToConsider>`);
  out.push(`${T.repeat(indent + 1)}<WhereToGo>`);
  for (const path of rule.paths) {
    out.push(`${T.repeat(indent + 2)}<Path Path="${path.path}">`);
    out.push(`${T.repeat(indent + 3)}<Condition Operator="${path.operator}">`);
    const pAttrs = Object.entries(path.attributes).map(([k, v]) => `${k}="${escapeXml(v)}"`).join(" ");
    out.push(`${T.repeat(indent + 4)}<Attributes ${pAttrs}/>`);
    out.push(`${T.repeat(indent + 3)}</Condition>`);
    out.push(`${T.repeat(indent + 2)}</Path>`);
  }
  out.push(`${T.repeat(indent + 1)}</WhereToGo>`);
  out.push(`${T.repeat(indent + 1)}<WhatToCall>`);
  out.push(`${T.repeat(indent + 2)}<Method Name="${rule.method}"/>`);
  out.push(`${T.repeat(indent + 1)}</WhatToCall>`);
  out.push(`${T.repeat(indent)}</Rule>`);
  return out.join("\n");
}
var DEFAULT_LOGIC = [
  { id: "DL_6", name: "title" },
  { id: "DL_7", name: "alt" },
  { id: "DL_2", name: "Id" },
  { id: "DL_3", name: "className" },
  { id: "DL_4", name: "type" }
];
function generateXML(model) {
  const out = [];
  const sites = [...new Set(model.sites)].join("; ");
  out.push('<?xml version="1.0" encoding="utf-8"?>');
  out.push(`<IEFilters ExcludedDomain="">`);
  out.push(comment(`Generated by ${EXTENSION_NAME} v${EXTENSION_VERSION}`, 1));
  if (sites) out.push(comment(`Scanned: ${escapeXml(sites)}`, 1));
  out.push(`${T}<General Enable="1" QueryHeader="0" QueryTag="H1">`);
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
  out.push("</IEFilters>");
  return out.join("\n");
}
function validateXML(xml) {
  const errors = [];
  const warnings = [];
  if (typeof DOMParser !== "undefined") {
    try {
      const doc = new DOMParser().parseFromString(xml, "text/xml");
      const perr = doc.querySelector("parsererror");
      if (perr) {
        errors.push(perr.textContent ? perr.textContent.trim().slice(0, 300) : "XML parse error");
        return { valid: false, errors, warnings };
      }
      const root = doc.documentElement;
      if (!root || root.tagName !== "IEFilters") {
        errors.push(`Root element must be <IEFilters>, found <${root ? root.tagName : "none"}>.`);
      }
      if (!root.querySelector("General RoleIdentifier")) warnings.push("Missing <General><RoleIdentifier>.");
      if (!root.querySelector("General LabelIdentifier")) warnings.push("Missing <General><LabelIdentifier>.");
    } catch (e) {
      errors.push(`XML parse failed: ${e.message}`);
    }
    return { valid: errors.length === 0, errors, warnings };
  }
  const opens = xml.match(/<[A-Za-z][\w-]*(\s[^>]*)?>/g) || [];
  const closes = xml.match(/<\/[A-Za-z][\w-]*>/g) || [];
  if (!xml.startsWith("<?xml")) errors.push("Missing XML declaration.");
  if (!xml.includes("<IEFilters")) errors.push("Missing <IEFilters> root.");
  if (opens.length === 0) errors.push("No elements found.");
  if ((xml.match(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;)/g) || []).length > 0) errors.push('Unescaped "&" found.');
  return { valid: errors.length === 0, errors, warnings };
}
function generateGpsMappings(controls) {
  const out = [];
  out.push('<?xml version="1.0" encoding="utf-8"?>');
  out.push("<!-- Sample GPS mappings generated by " + EXTENSION_NAME + " \u2014 import into Epiplex Capture -->");
  out.push("<GPSMappings>");
  for (const c of controls.slice(0, 200)) {
    const base = computeControlName(c);
    const name = (base === "element" ? c.attributes.id || c.attributes.name || base : base).slice(0, 60);
    out.push(
      `${T}<Mapping ControlName="${escapeXml(name)}" Role="${c.role}" Tag="${escapeXml(c.attributes.tagName.toUpperCase())}" Selector="${escapeXml(c.location.cssSelector)}" XPath="${escapeXml(c.location.xpath)}"/>`
    );
  }
  out.push("</GPSMappings>");
  return out.join("\n");
}
function generateTestCases(model) {
  const out = [];
  out.push("// Auto-generated test cases for the Epiplex IE Rules Generator");
  out.push("// Run with: node --test (uses jsdom). One test per generated rule.");
  out.push('import { JSDOM } from "jsdom";');
  out.push('import { detectControlRole } from "../src/ruleEngine";');
  out.push("");
  out.push("function makeEl(tag, attrs = {}) {");
  out.push("  const { window } = new JSDOM(`<${tag}></${tag}>`);");
  out.push("  const el = window.document.createElement(tag);");
  out.push("  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);");
  out.push("  return el;");
  out.push("}");
  out.push("");
  out.push("export const cases = [");
  for (const rule of model.basedOnTags) {
    for (const cond of rule.conditions) {
      const tags = cond.tagName.replace(/\|/g, "").split("|")[0] || "div";
      const types = cond.type ? cond.type.replace(/\|/g, "").split("|").slice(0, 1)[0] : null;
      const attrs = types ? `{ type: "${types}" }` : "{}";
      out.push(`  { name: "Tag rule \u2192 role ${rule.currentRole} on <${tags}>${types ? ` type=${types}` : ""}", tag: "${tags}", attrs: ${attrs}, expect: ${rule.currentRole} },`);
    }
  }
  out.push("];");
  out.push("");
  out.push("export function runCase(c) {");
  out.push("  const el = makeEl(c.tag, c.attrs);");
  out.push("  const det = detectControlRole(el, { frameworkRoleMappings: [], attributeRoleMappings: [], tagRoles: {}, inputTypeRoles: { text: 42 } });");
  out.push('  return det.role === c.expect ? "PASS" : `FAIL expected ${c.expect} got ${det.role}`;');
  out.push("}");
  return out.join("\n");
}

// src/compareEngine.ts
function attr(name, block) {
  const m = block.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : null;
}
function extractBlocks(xml) {
  const blocks = [];
  const re = /<Rule\b[^>]*>[\s\S]*?<\/Rule>/g;
  let m;
  while ((m = re.exec(xml)) !== null) blocks.push(m[0]);
  return blocks;
}
function section(xml, name) {
  const open = new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`);
  const m = xml.match(open);
  return m ? m[1] : "";
}
function parseExistingRules(xml) {
  const result = { tagRules: [], attrRules: [], traversalRules: [], standardRules: [], traverseLabelRules: [] };
  const ri = section(xml, "RoleIdentifier");
  const tags = section(ri, "BasedOnTags");
  const attrs = section(ri, "BasedOnAttributes");
  const traverse = section(ri, "BasedOnTraverseLogic");
  const li = section(xml, "LabelIdentifier");
  const standard = section(li, "StandardLogic");
  const traverseLabel = section(li, "TraverseLogic");
  for (const block of extractBlocks(tags)) {
    const role = Number(attr("CurrentRole", block) || 0);
    const parent = attr("ParentRole", block) === "" || attr("ParentRole", block) === null ? null : Number(attr("ParentRole", block));
    const conds = [];
    const condRe = /<Condition\b([^>]*)\/?>/g;
    let m;
    while ((m = condRe.exec(block)) !== null) {
      const c = m[1];
      const tn = attr("TagName", `<x ${c}/>`);
      const ty = attr("Type", `<x ${c}/>`);
      if (tn) conds.push({ tagName: tn, type: ty || void 0 });
    }
    const fp = `tag|${role}|${parent ?? ""}|${conds.map((c) => `${c.tagName}:${c.type || ""}`).join(",")}`;
    result.tagRules.push({
      fingerprint: fp,
      role,
      parent,
      description: conds.map((c) => `${c.tagName}${c.type ? " type=" + c.type : ""}`).join(" \xB7 "),
      raw: block,
      conds: conds.map((c) => ({ tagName: c.tagName, type: c.type || "" }))
    });
  }
  for (const block of extractBlocks(attrs)) {
    const role = Number(attr("CurrentRole", block) || 0);
    const parent = attr("ParentRole", block) === "" || attr("ParentRole", block) === null ? null : Number(attr("ParentRole", block));
    const m = block.match(/<Condition\b([^>]*)\/?>/);
    const c = m ? m[1] : "";
    const operator = attr("Operator", `<x ${c}/>`) || "contains";
    const attribute = c.match(/\s([a-zA-Z-]+)="\|/)?.[1] || "className";
    const rawValues = c.match(/="\|([^|]*\|[^|]*)\|?"/)?.[1] || "";
    const values = rawValues.split("|").filter(Boolean);
    const fp = `attr|${role}|${parent ?? ""}|${attribute}|${operator}|${[...values].sort().join("|")}`;
    result.attrRules.push({ fingerprint: fp, role, parent, description: `${attribute} ${operator}`, raw: block, values });
  }
  for (const block of extractBlocks(traverse)) {
    const role = Number(attr("CurrentRole", block) || 0);
    const parent = attr("ParentRole", block) === "" || attr("ParentRole", block) === null ? null : Number(attr("ParentRole", block));
    const cond = block.match(/<CurrentInfo>([\s\S]*?)<\/CurrentInfo>/);
    const condSrc = cond ? cond[1] : "";
    const paths = [];
    const pathRe = /<Path Path="([^"]+)">([\s\S]*?)<\/Path>/g;
    let pm;
    while ((pm = pathRe.exec(block)) !== null) {
      const inner = pm[2];
      const op = attr("Operator", inner) || "simple";
      const at = inner.match(/<Attributes\b([^>]*)\/?>/);
      paths.push(`${pm[1]}:${op}:${at ? at[1].trim() : ""}`);
    }
    const fp = `traversal|${role}|${parent ?? ""}|${condSrc.replace(/\s+/g, " ").trim()}|${paths.join(">")}`;
    result.traversalRules.push({ fingerprint: fp, role, parent, description: `${role} via ${paths.join(" \u2192 ")}`, raw: block });
  }
  for (const block of extractBlocks(standard)) {
    const id = attr("Id", block) || "";
    const m = block.match(/<Attributes\b([^>]*)\/?>/);
    const c = m ? m[1] : "";
    const from = attr("From", `<x ${c}/>`) || "";
    const to = attr("To", `<x ${c}/>`) || "";
    const op = attr("Operator", `<x ${c}/>`) || "";
    result.standardRules.push({ fingerprint: `sl|${from}|${to}|${op}`, description: `${from} \u2192 ${to} (${op})`, raw: block });
    void id;
  }
  for (const block of extractBlocks(traverseLabel)) {
    const m = block.match(/<WhenToConsider\b([^>]*)\/?>/);
    const role = Number(attr("Role", `<x ${m ? m[1] : ""}/>`) || 0);
    const paths = [];
    const pathRe = /<Path Path="([^"]+)">([\s\S]*?)<\/Path>/g;
    let pm;
    while ((pm = pathRe.exec(block)) !== null) {
      const op = attr("Operator", pm[2]) || "simple";
      const at = pm[2].match(/<Attributes\b([^>]*)\/?>/);
      paths.push(`${pm[1]}:${op}:${at ? at[1].trim() : ""}`);
    }
    const method = block.match(/<Method Name="([^"]*)"/)?.[1] || "innerText";
    result.traverseLabelRules.push({
      fingerprint: `tl|${role}|${m ? m[1].trim() : ""}|${paths.join(">")}|${method}`,
      role,
      description: `role ${role} via ${paths.join(" \u2192 ")}`,
      raw: block
    });
  }
  return result;
}
function tagFingerprint(r) {
  const conds = r.conditions.map((c) => `${c.tagName}:${c.type || ""}`).join(",");
  return `tag|${r.currentRole}|${r.parentRole ?? ""}|${conds}`;
}
function attrFingerprint(r) {
  return `attr|${r.currentRole}|${r.parentRole ?? ""}|${r.attribute}|${r.operator}|${[...r.values].sort().join("|")}`;
}
function traversalFingerprint2(r) {
  const cond = [
    r.condition.tagName ? `TagName="${r.condition.tagName}"` : "",
    r.condition.type ? `Type="${r.condition.type}"` : "",
    r.condition.className ? `className="${r.condition.className}"` : "",
    r.condition.attribute ? `${r.condition.attribute}="${r.condition.value || ""}"` : ""
  ].filter(Boolean).join(" ");
  const paths = r.paths.map((p) => {
    const at = Object.entries(p.attributes).map(([k, v]) => `${k}="${v}"`).join(" ");
    return `${p.path}:${p.operator}:${at}`;
  }).join(">");
  return `traversal|${r.currentRole}|${r.parentRole ?? ""}|${cond}|${paths}`;
}
function standardFingerprint(r) {
  return `sl|${r.from}|${r.to}|${r.operator}`;
}
function labelTraversalFingerprint2(r) {
  const attrs = Object.entries(r.attributes).map(([k, v]) => `${k}="${v}"`).join(" ");
  const paths = r.paths.map((p) => {
    const at = Object.entries(p.attributes).map(([k, v]) => `${k}="${v}"`).join(" ");
    return `${p.path}:${p.operator}:${at}`;
  }).join(">");
  return `tl|${r.role}|${attrs}|${paths}|${r.method}`;
}
function typeTokens(pipeList) {
  return pipeList.slice(1, -1).split("|").filter(Boolean);
}
function existingTagCovers(existing, gen) {
  return existing.some((e) => {
    if (e.role !== gen.currentRole || (e.parent ?? null) !== (gen.parentRole ?? null)) return false;
    return gen.conditions.every(
      (gc) => e.conds.some((ec) => {
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
function existingAttrCovers(existing, gen) {
  return existing.some(
    (e) => e.role === gen.currentRole && (e.parent ?? null) === (gen.parentRole ?? null) && e.values.length > 0 && gen.values.every((v) => e.values.includes(v))
  );
}
function compareRules(model, existing) {
  const result = { newRules: [], modifiedRules: [], duplicateRules: [], obsoleteRules: [], matched: 0 };
  const existingTraversal = new Map(existing.traversalRules.map((r) => [r.fingerprint, r]));
  const existingStd = new Map(existing.standardRules.map((r) => [r.fingerprint, r]));
  const existingTl = new Map(existing.traverseLabelRules.map((r) => [r.fingerprint, r]));
  const toCompare = (kind, role, description, fingerprint2, inG, inE) => ({
    kind,
    role,
    description,
    fingerprint: fingerprint2,
    inGenerated: inG,
    inExisting: inE
  });
  for (const r of model.basedOnTags) {
    const fp = tagFingerprint(r);
    const covered = existingTagCovers(existing.tagRules, r);
    if (covered) {
      result.duplicateRules.push(toCompare("tag", r.currentRole, `role ${r.currentRole}: ${r.conditions.map((c) => c.tagName + (c.type ? " " + c.type : "")).join(", ")}`, fp, true, true));
      result.matched++;
    } else result.newRules.push(toCompare("tag", r.currentRole, `role ${r.currentRole}: ${r.conditions.map((c) => c.tagName + (c.type ? " " + c.type : "")).join(", ")}`, fp, true, false));
  }
  for (const r of model.basedOnAttributes) {
    const fp = attrFingerprint(r);
    const covered = existingAttrCovers(existing.attrRules, r);
    const desc = `role ${r.currentRole}: ${r.attribute} ${r.operator} |${r.values.join("|")}|`;
    if (covered) {
      result.duplicateRules.push(toCompare("attribute", r.currentRole, desc, fp, true, true));
      result.matched++;
    } else result.newRules.push(toCompare("attribute", r.currentRole, desc, fp, true, false));
  }
  for (const r of model.basedOnTraverseLogic) {
    const fp = traversalFingerprint2(r);
    const exists = existingTraversal.has(fp);
    const desc = `role ${r.currentRole}: traverse ${r.paths.map((p) => p.path).join(" \u2192 ")}`;
    if (exists) {
      result.duplicateRules.push(toCompare("traversal", r.currentRole, desc, fp, true, true));
      result.matched++;
    } else result.newRules.push(toCompare("traversal", r.currentRole, desc, fp, true, false));
  }
  for (const r of model.standardLogic) {
    const fp = standardFingerprint(r);
    const exists = existingStd.has(fp);
    if (exists) {
      result.duplicateRules.push(toCompare("label-standard", 0, `${r.from} \u2192 ${r.to}`, fp, true, true));
      result.matched++;
    } else result.newRules.push(toCompare("label-standard", 0, `${r.from} \u2192 ${r.to}`, fp, true, false));
  }
  for (const r of model.traverseLogic) {
    const fp = labelTraversalFingerprint2(r);
    const exists = existingTl.has(fp);
    const desc = `role ${r.role}: ${r.paths.map((p) => p.path).join(" \u2192 ")}`;
    if (exists) {
      result.duplicateRules.push(toCompare("label-traverse", r.role, desc, fp, true, true));
      result.matched++;
    } else result.newRules.push(toCompare("label-traverse", r.role, desc, fp, true, false));
  }
  const attrSuperseded = (role, parent) => model.basedOnTags.some((g) => g.currentRole === role && (g.parentRole ?? null) === parent) || model.basedOnTraverseLogic.some((g) => g.currentRole === role && (g.parentRole ?? null) === parent);
  for (const r of existing.tagRules) {
    if (!model.basedOnTags.some((g) => g.currentRole === r.role && (g.parentRole ?? null) === r.parent)) {
      result.obsoleteRules.push(toCompare("tag", r.role, `role ${r.role}: ${r.description}`, r.fingerprint, false, true));
    }
  }
  for (const r of existing.attrRules) {
    if (attrSuperseded(r.role, r.parent)) {
      result.modifiedRules.push(toCompare("attribute", r.role, `role ${r.role}: ${r.description} (superseded by a tag/traversal rule)`, r.fingerprint, false, true));
    } else if (!model.basedOnAttributes.some((g) => g.currentRole === r.role && (g.parentRole ?? null) === r.parent)) {
      result.obsoleteRules.push(toCompare("attribute", r.role, `role ${r.role}: ${r.description}`, r.fingerprint, false, true));
    }
  }
  for (const r of existing.traversalRules) {
    if (!model.basedOnTraverseLogic.some((g) => g.currentRole === r.role && (g.parentRole ?? null) === r.parent)) {
      result.obsoleteRules.push(toCompare("traversal", r.role, `role ${r.role}: ${r.description}`, r.fingerprint, false, true));
    }
  }
  for (const r of existing.standardRules) {
    if (!model.standardLogic.some((g) => `${g.from}|${g.to}|${g.operator}` === r.fingerprint.split("|").slice(1).join("|"))) {
      result.obsoleteRules.push(toCompare("label-standard", 0, r.description, r.fingerprint, false, true));
    }
  }
  for (const r of existing.traverseLabelRules) {
    if (!model.traverseLogic.some((g) => labelTraversalFingerprint2(g) === r.fingerprint)) {
      result.obsoleteRules.push(toCompare("label-traverse", r.role, r.description, r.fingerprint, false, true));
    }
  }
  return result;
}
function renderTagBlock(r) {
  const parent = r.parentRole === null ? "" : String(r.parentRole);
  const out = [];
  out.push(`				<Rule Enable="1" CurrentRole="${r.currentRole}" ParentRole="${parent}">`);
  out.push(`					<CurrentInfo>`);
  for (const c of r.conditions) out.push(`						<Condition TagName="${c.tagName}"${c.type ? ` Type="${c.type}"` : ""}/>`);
  out.push(`					</CurrentInfo>`);
  out.push(`				</Rule>`);
  return out.join("\n");
}
function renderAttrBlock(r) {
  const parent = r.parentRole === null ? "" : String(r.parentRole);
  const values = `|${[...new Set(r.values)].join("|")}|`;
  return [
    `				<Rule Enable="1" CurrentRole="${r.currentRole}" ParentRole="${parent}">`,
    `					<CurrentInfo>`,
    `						<Condition Operator="${r.operator}" ${r.attribute}="${values}"/>`,
    `					</CurrentInfo>`,
    `				</Rule>`
  ].join("\n");
}
function mergeXML(model, existingXml) {
  const existing = parseExistingRules(existingXml);
  const existingTraversal = new Set(existing.traversalRules.map((r) => r.fingerprint));
  const existingStd = new Set(existing.standardRules.map((r) => r.fingerprint));
  const existingTl = new Set(existing.traverseLabelRules.map((r) => r.fingerprint));
  let added = 0;
  let xml = existingXml;
  const insertBefore = (xmlStr, sectionName, blocks) => {
    if (blocks.length === 0) return xmlStr;
    const close = new RegExp(`(<\\/${sectionName}>)`);
    const m = xmlStr.match(close);
    if (!m || m.index === void 0) return xmlStr;
    const insertion = blocks.join("\n") + "\n";
    added += blocks.length;
    return xmlStr.slice(0, m.index) + insertion + xmlStr.slice(m.index);
  };
  const newTags = model.basedOnTags.filter((r) => !existingTagCovers(existing.tagRules, r)).map(renderTagBlock);
  xml = insertBefore(xml, "BasedOnTags", newTags);
  const newAttrs = model.basedOnAttributes.filter((r) => !existingAttrCovers(existing.attrRules, r)).map(renderAttrBlock);
  xml = insertBefore(xml, "BasedOnAttributes", newAttrs);
  const newTraversal = model.basedOnTraverseLogic.filter((r) => !existingTraversal.has(traversalFingerprint2(r)));
  const traversalBlocks = newTraversal.map((r) => renderTraversalBlock(r));
  xml = insertBefore(xml, "BasedOnTraverseLogic", traversalBlocks);
  const newStd = model.standardLogic.filter((r) => !existingStd.has(standardFingerprint(r))).map((r) => `				<Rule Id="${r.id}">
					<Attributes From="${r.from}" To="${r.to}" Operator="${r.operator}"/>
				</Rule>`);
  xml = insertBefore(xml, "StandardLogic", newStd);
  const newTl = model.traverseLogic.filter((r) => !existingTl.has(labelTraversalFingerprint2(r))).map(renderTraverseLabelBlock);
  xml = insertBefore(xml, "TraverseLogic", newTl);
  return { xml, added };
}
function renderTraversalBlock(r) {
  const parent = r.parentRole === null ? "" : String(r.parentRole);
  const out = [];
  out.push(`				<Rule Enable="1" CurrentRole="${r.currentRole}" ParentRole="${parent}">`);
  out.push(`					<CurrentInfo>`);
  const cond = r.condition;
  if (cond.className) out.push(`						<Condition className="${cond.className}" Operator="${cond.operator || "contains"}"/>`);
  else if (cond.tagName) out.push(`						<Condition TagName="${cond.tagName}"/>`);
  out.push(`					</CurrentInfo>`);
  out.push(`					<TraversalInfo>`);
  for (const p of r.paths) {
    out.push(`						<Path Path="${p.path}">`);
    out.push(`							<Condition Operator="${p.operator}">`);
    const attrs = Object.entries(p.attributes).map(([k, v]) => `${k}="${v}"`).join(" ");
    out.push(`								<Attributes ${attrs}/>`);
    out.push(`							</Condition>`);
    out.push(`						</Path>`);
  }
  out.push(`					</TraversalInfo>`);
  out.push(`				</Rule>`);
  return out.join("\n");
}
function renderTraverseLabelBlock(r) {
  const parent = r.parentRole === null ? "" : String(r.parentRole);
  const out = [];
  out.push(`				<Rule Id="${r.id}" Enable="1">`);
  out.push(`					<WhenToConsider Role="${r.role}" ParentRole="${parent}">`);
  const attrs = Object.entries(r.attributes).map(([k, v]) => `${k}="${v}"`).join(" ");
  out.push(`						<Attributes ${attrs}/>`);
  out.push(`					</WhenToConsider>`);
  out.push(`					<WhereToGo>`);
  for (const p of r.paths) {
    out.push(`						<Path Path="${p.path}">`);
    out.push(`							<Condition Operator="${p.operator}">`);
    const pAttrs = Object.entries(p.attributes).map(([k, v]) => `${k}="${v}"`).join(" ");
    out.push(`								<Attributes ${pAttrs}/>`);
    out.push(`							</Condition>`);
    out.push(`						</Path>`);
  }
  out.push(`					</WhereToGo>`);
  out.push(`					<WhatToCall>`);
  out.push(`						<Method Name="${r.method}"/>`);
  out.push(`					</WhatToCall>`);
  out.push(`				</Rule>`);
  return out.join("\n");
}

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
async function saveSettings(settings) {
  try {
    await chrome.storage.local.set({ [STORAGE_KEY]: settings });
  } catch {
  }
}
function validateMappingJson(text) {
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") return "JSON must be an object.";
    const arrs = ["frameworkRoleMappings", "attributeRoleMappings"];
    for (const key of arrs) {
      if (parsed[key] !== void 0 && !Array.isArray(parsed[key])) {
        return `"${key}" must be an array.`;
      }
    }
    return null;
  } catch (e) {
    return `Invalid JSON: ${e.message}`;
  }
}
export {
  DEFAULT_SETTINGS,
  EXTENSION_NAME,
  EXTENSION_VERSION,
  FRAMEWORKS,
  ROLES,
  buildAttributeRule,
  buildStandardLabelRules,
  buildTagRule,
  buildTraversalRule,
  buildTraverseLabelRules,
  cleanText,
  clickKind,
  compareRules,
  computeControlName,
  deduplicateAttributeRules,
  deduplicateRules,
  deduplicateTagRules,
  roleMappings_default as defaultMappings,
  detectControlRole,
  detectElementFramework,
  detectFrameworks,
  escapeXml,
  extractAttributes,
  findLabel,
  fingerprint,
  generateGpsMappings,
  generateRuleModel,
  generateStepSentence,
  generateTestCases,
  generateTraversalRules,
  generateXML,
  isUtilityClass,
  loadSettings,
  mergeXML,
  normalizeTagName,
  normalizeType,
  parseExistingRules,
  resolveRoleMappings,
  roleColor,
  roleName,
  saveSettings,
  stepDescription,
  suggestMissingLabels,
  suggestTraversalImprovements,
  toEpiplexOperator,
  traversalFingerprint,
  validateMappingJson,
  validateXML
};
