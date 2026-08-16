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
  92: { id: 92, name: "Date control", color: "#00838f" }
};
var roleName = (id) => ROLES[id] && ROLES[id].name || `Role ${id}`;

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
function pipe(values) {
  const uniq = [...new Set(values.filter(Boolean))];
  return `|${uniq.join("|")}|`;
}
function buildTagRule(c) {
  const tag = c.attributes.tagName;
  const conds = [];
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
  return {
    currentRole: c.role,
    parentRole: c.parentRole,
    conditions: conds,
    source: c.reason,
    framework: c.framework ?? void 0,
    confidence: c.confidence
  };
}
function buildAttributeRule(c, config) {
  const a = c.attributes;
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
function deduplicateRules(rules, fingerprint) {
  const seen = /* @__PURE__ */ new Map();
  for (const r of rules) {
    const key = fingerprint(r);
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
export {
  EXTENSION_NAME,
  EXTENSION_VERSION,
  buildAttributeRule,
  buildTagRule,
  deduplicateAttributeRules,
  deduplicateRules,
  deduplicateTagRules,
  detectControlRole,
  escapeXml,
  extractAttributes,
  generateGpsMappings,
  generateRuleModel,
  generateTestCases,
  generateXML,
  normalizeTagName,
  normalizeType,
  toEpiplexOperator,
  traversalFingerprint,
  validateXML
};
