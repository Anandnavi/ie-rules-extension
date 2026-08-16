var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/roleMappings.json
var roleMappings_default;
var init_roleMappings = __esm({
  "src/roleMappings.json"() {
    roleMappings_default = {
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
  }
});

// src/settings.ts
var settings_exports = {};
__export(settings_exports, {
  DEFAULT_SETTINGS: () => DEFAULT_SETTINGS,
  loadSettings: () => loadSettings,
  resolveRoleMappings: () => resolveRoleMappings,
  saveSettings: () => saveSettings,
  validateMappingJson: () => validateMappingJson
});
function resolveRoleMappings(settings) {
  if (settings.roleMappings) return settings.roleMappings;
  return roleMappings_default;
}
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
var DEFAULT_SETTINGS, STORAGE_KEY;
var init_settings = __esm({
  "src/settings.ts"() {
    "use strict";
    init_roleMappings();
    DEFAULT_SETTINGS = {
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
    STORAGE_KEY = "epiplexIeSettings";
  }
});

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
function traversalFingerprint(r) {
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
function labelTraversalFingerprint(r) {
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
    const fp = traversalFingerprint(r);
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
    const fp = labelTraversalFingerprint(r);
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
    if (!model.traverseLogic.some((g) => labelTraversalFingerprint(g) === r.fingerprint)) {
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
  const newTraversal = model.basedOnTraverseLogic.filter((r) => !existingTraversal.has(traversalFingerprint(r)));
  const traversalBlocks = newTraversal.map((r) => renderTraversalBlock(r));
  xml = insertBefore(xml, "BasedOnTraverseLogic", traversalBlocks);
  const newStd = model.standardLogic.filter((r) => !existingStd.has(standardFingerprint(r))).map((r) => `				<Rule Id="${r.id}">
					<Attributes From="${r.from}" To="${r.to}" Operator="${r.operator}"/>
				</Rule>`);
  xml = insertBefore(xml, "StandardLogic", newStd);
  const newTl = model.traverseLogic.filter((r) => !existingTl.has(labelTraversalFingerprint(r))).map(renderTraverseLabelBlock);
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

// src/labelEngine.ts
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
function labelTraversalFingerprint2(r) {
  const paths = r.paths.map((p) => `${p.path}:${p.operator}:${attrsString(p.attributes)}`).join(">");
  return `${r.role}|${r.parentRole ?? ""}|${attrsString(r.attributes)}|${paths}|${r.method}`;
}
function buildTraverseLabelRules(controls) {
  const seen = /* @__PURE__ */ new Map();
  const push = (r) => {
    const key = labelTraversalFingerprint2(r);
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
  const traversal = extra?.traversalRules ? deduplicateRules(extra.traversalRules, traversalFingerprint2) : [];
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
function traversalFingerprint2(r) {
  const cond = [r.condition.tagName, r.condition.type, r.condition.className, r.condition.attribute, r.condition.value].join("|");
  const paths = r.paths.map((p) => `${p.path}:${p.operator}:${JSON.stringify(p.attributes)}`).join(">");
  return `traversal|${r.currentRole}|${r.parentRole ?? ""}|${cond}|${paths}`;
}

// src/popup.ts
init_settings();

// src/traversalEngine.ts
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

// src/popup.ts
var $ = (id) => document.getElementById(id);
var state = {
  settings: await loadSettings(),
  scan: null,
  model: null,
  xml: "",
  gpsXml: "",
  testCases: "",
  existingXml: "",
  existingFileName: "",
  compare: null,
  mergedXml: null,
  mergedCount: 0,
  tabId: null
};
var esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
async function getActiveTab() {
  const res = await chrome.runtime.sendMessage({ type: "EPIPLEX_GET_TAB" });
  if (res?.ok && res.tab) {
    state.tabId = res.tab.id;
    return res.tab;
  }
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    state.tabId = tab?.id ?? null;
    return tab ? { id: tab.id, url: tab.url, title: tab.title } : null;
  } catch {
    return null;
  }
}
async function sendToTab(type, extra = {}) {
  if (state.tabId === null) await getActiveTab();
  if (state.tabId === null) return null;
  try {
    const res = await chrome.tabs.sendMessage(state.tabId, { type, ...extra });
    return res?.ok ? res : null;
  } catch (e) {
    setStatus("scanStatus", `Cannot reach the page \u2014 open a normal web page first (${e.message})`, "err");
    return null;
  }
}
async function runScan() {
  const tab = await getActiveTab();
  if (!tab || !tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
    setStatus("scanStatus", "Open a normal web page to scan (chrome:// and store pages are blocked).", "err");
    return;
  }
  setStatus("scanStatus", "Scanning page\u2026", "");
  const res = await sendToTab("EPIPLEX_SCAN");
  if (!res) return;
  state.scan = res.payload;
  const ctrl = res.payload.controls;
  const s = state.settings;
  const ctx = {
    config: await Promise.resolve().then(() => (init_settings(), settings_exports)).then((m) => m.resolveRoleMappings(state.settings)),
    url: res.payload.url,
    title: res.payload.title,
    minConfidence: s.minConfidence,
    emitTraversalRules: s.emitTraversalRules,
    emitLabelRules: s.emitLabelRules
  };
  const traversal = s.emitTraversalRules ? generateTraversalRules(ctrl) : [];
  const labels = s.emitLabelRules ? { standard: buildStandardLabelRules(ctrl), traverse: buildTraverseLabelRules(ctrl) } : { standard: buildStandardLabelRules(ctrl), traverse: [] };
  state.model = generateRuleModel(ctrl, ctx, { traversalRules: traversal, labelRules: labels });
  state.xml = generateXML(state.model);
  state.gpsXml = generateGpsMappings(ctrl);
  state.testCases = generateTestCases(state.model);
  if (state.existingXml) refreshCompare();
  renderFrameworks();
  renderRoleSummary();
  renderControls();
  renderRules();
  renderXml();
  renderDiagnostics();
  document.querySelector("#siteInfo").textContent = `${res.payload.title} \u2014 ${res.payload.url}`;
  setStatus("scanStatus", `Scanned ${ctrl.length} controls in ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`, "ok");
  switchTab("scan");
}
function renderFrameworks() {
  const host = $("frameworkChips");
  const fws = state.scan?.frameworks || [];
  host.innerHTML = fws.length ? fws.map((f) => `<span class="chip">${esc(f)}</span>`).join("") : '<span class="muted">No known framework detected (still generating tag/attribute rules).</span>';
}
function renderRoleSummary() {
  const host = $("roleSummary");
  const counts = /* @__PURE__ */ new Map();
  for (const c of state.scan?.controls || []) counts.set(c.role, (counts.get(c.role) || 0) + 1);
  host.innerHTML = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(
    ([role, n]) => `<span class="chip"><span style="color:${roleColor(role)}">\u25CF</span> ${esc(roleName(role))}<span class="n">${n}</span></span>`
  ).join("");
  $("summaryRow").hidden = false;
}
function roleFilterOptions() {
  const roles = /* @__PURE__ */ new Set();
  for (const c of state.scan?.controls || []) roles.add(c.role);
  return [...roles].sort((a, b) => a - b).map((r) => `<option value="${r}">${esc(roleName(r))} (${r})</option>`).join("");
}
function renderControls() {
  const filter = $("roleFilter");
  const prev = filter.value;
  filter.innerHTML = '<option value="">All control types</option>' + roleFilterOptions();
  filter.value = prev;
  const tbody = $("controlsTable").querySelector("tbody");
  const search = $("searchBox").value.toLowerCase();
  const role = filter.value;
  const rows = (state.scan?.controls || []).filter((c) => {
    if (role && String(c.role) !== role) return false;
    if (search) {
      const hay = [c.attributes.tagName, c.attributes.id, c.attributes.name, c.attributes.className, c.label, c.reason, c.location.cssSelector, c.location.xpath].join(" ").toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  });
  $("controlCount").textContent = `${rows.length} shown / ${state.scan?.controls.length ?? 0}`;
  tbody.innerHTML = rows.map((c) => {
    const a = c.attributes;
    const conf = Math.round(c.confidence);
    const attrs = [a.type && `type=${a.type}`, a.name && `name=${a.name}`, a.className && `class=${a.className.split(/\s+/).slice(0, 2).join(" ")}`].filter(Boolean).join("<br>");
    return `<tr>
        <td><span class="role-chip" style="background:${roleColor(c.role)}">${c.roleName}</span></td>
        <td>${esc(c.label || "\u2014")}</td>
        <td class="mono">&lt;${esc(a.tagName)}&gt;${attrs ? `<br><span class="muted">${attrs}</span>` : ""}</td>
        <td><span class="conf-bar"><i style="width:${conf}%"></i></span> ${conf}%</td>
        <td class="mono">${esc(c.labelStrategy)}</td>
        <td class="mono" title="${esc(c.reason)}">${esc(short(c.reason, 60))}</td>
        <td class="mono">${esc(short(c.location.cssSelector, 34))}</td>
        <td class="mono" title="${esc(generateStepSentence(c))}">${esc(short(generateStepSentence(c), 46))}</td>
      </tr>`;
  }).join("") || '<tr><td colspan="8" class="muted">No controls match the current filter.</td></tr>';
}
function renderDiagnostics() {
  const host = $("diagList");
  const ctrl = state.scan?.controls || [];
  const suggestions = [...suggestMissingLabels(ctrl), ...suggestTraversalImprovements(ctrl)];
  const unique = [...new Set(suggestions)];
  const html = unique.slice(0, 25).map((s) => `<div class="d-item"><span>\u{1F4A1}</span> ${esc(s)}</div>`).join("");
  host.innerHTML = html || '<p class="muted">No suggestions \u2014 all controls have labels or are structural.</p>';
  $("suggestionList").innerHTML = unique.slice(0, 25).map((s) => `<li>${esc(s)}</li>`).join("");
}
function ruleKindBadge(kind) {
  const map = {
    tag: "kind-tag",
    attribute: "kind-attribute",
    traversal: "kind-traversal",
    "label-standard": "kind-label-standard",
    "label-traverse": "kind-label-traverse"
  };
  const label = {
    tag: "BasedOnTags",
    attribute: "BasedOnAttributes",
    traversal: "TraverseLogic",
    "label-standard": "StandardLogic",
    "label-traverse": "TraverseLogic"
  };
  return `<span class="kind-badge ${map[kind] || ""}">${label[kind] || kind}</span>`;
}
function renderRules() {
  const host = $("ruleList");
  const model = state.model;
  const filter = $("ruleKindFilter").value;
  if (!model) {
    host.innerHTML = '<p class="muted">Scan a page first.</p>';
    return;
  }
  const items = [];
  for (const r of model.basedOnTags) {
    items.push({ kind: "tag", desc: `Role ${r.currentRole} ${r.parentRole !== null ? `(parent ${r.parentRole})` : ""}: ${r.conditions.map((c) => `${c.tagName}${c.type ? " " + c.type : ""}`).join(" \xB7 ")}`, conf: r.confidence, src: r.source, fw: r.framework });
  }
  for (const r of model.basedOnAttributes) {
    items.push({ kind: "attribute", desc: `Role ${r.currentRole}: ${r.attribute} ${r.operator} |${r.values.join("|")}|`, conf: r.confidence, src: r.source, fw: r.framework });
  }
  for (const r of model.basedOnTraverseLogic) {
    items.push({ kind: "traversal", desc: `Role ${r.currentRole}: ${r.condition.className || r.condition.tagName || r.condition.attribute || "?"} \u2192 ${r.paths.map((p) => `${p.path}${p.operator === "recursive" ? "*" : ""} ${Object.values(p.attributes).join(" ")}`).join(" \u2192 ")}`, conf: r.confidence, src: r.source, fw: r.framework });
  }
  for (const r of model.standardLogic) {
    items.push({ kind: "label-standard", desc: `${r.id}: ${r.from} \u2192 ${r.to} (${r.operator})`, conf: 95, src: r.reason });
  }
  for (const r of model.traverseLogic) {
    items.push({ kind: "label-traverse", desc: `${r.id}: role ${r.role} ${r.attributes.TagName || ""} \u2192 ${r.paths.map((p) => `${p.path} ${Object.values(p.attributes).join(" ")}`).join(" \u2192 ")} (${r.method})`, conf: 90, src: r.reason });
  }
  const filtered = filter ? items.filter((i) => i.kind === filter) : items;
  $("ruleCount").textContent = `${filtered.length} rules`;
  host.innerHTML = filtered.map(
    (i) => `<div class="rule-item">
        <div class="r-head">${ruleKindBadge(i.kind)}<b>${i.conf}%</b>${i.fw ? `<span class="chip">${esc(i.fw)}</span>` : ""}</div>
        <div class="r-desc">${esc(i.desc)}</div>
        <div class="r-src">${esc(i.src)}</div>
      </div>`
  ).join("") || '<p class="muted">No rules.</p>';
}
function renderXml() {
  $("xmlPreview").textContent = state.xml || "Scan a page to generate IEAdaptor.xml\u2026";
  if (!state.xml) {
    $("xmlValid").textContent = "";
    return;
  }
  const v = validateXML(state.xml);
  $("xmlValid").textContent = v.valid ? `\u2713 Valid XML (${(state.xml.length / 1024).toFixed(1)} KB)` : `\u2717 Invalid: ${v.errors.join("; ")}`;
  $("xmlValid").className = "status " + (v.valid ? "ok" : "err");
}
function refreshCompare() {
  if (!state.model || !state.existingXml) return;
  state.compare = compareRules(state.model, parseExistingRules(state.existingXml));
  const merged = mergeXML(state.model, state.existingXml);
  state.mergedXml = merged.xml;
  state.mergedCount = merged.added;
  renderCompare();
  $("btnMerge").disabled = false;
  $("btnDownloadMerged").disabled = state.mergedCount === 0;
}
function renderCompare() {
  const c = state.compare;
  const host = $("compareSummary");
  if (!c) {
    host.innerHTML = "";
    $("compareTable").querySelector("tbody").innerHTML = "";
    return;
  }
  host.innerHTML = `
    <div class="cmp new"><b>${c.newRules.length}</b> new</div>
    <div class="cmp modified"><b>${c.modifiedRules.length}</b> modified</div>
    <div class="cmp duplicate"><b>${c.duplicateRules.length}</b> duplicates</div>
    <div class="cmp obsolete"><b>${c.obsoleteRules.length}</b> obsolete</div>
    <div class="cmp matched"><b>${c.matched}</b> matched</div>
    <div class="cmp">+ <b>${state.mergedCount}</b> rules to merge</div>`;
  const filter = $("compareFilter").value;
  const statusOf = (r) => r.inGenerated && !r.inExisting ? "new" : r.inGenerated && r.inExisting ? "duplicate" : "obsolete";
  const rows = [
    ...c.newRules.map((r) => ({ ...r, status: "new" })),
    ...c.modifiedRules.map((r) => ({ ...r, status: "modified" })),
    ...c.duplicateRules.map((r) => ({ ...r, status: "duplicate" })),
    ...c.obsoleteRules.map((r) => ({ ...r, status: "obsolete" }))
  ].filter((r) => !filter || r.status === filter);
  $("compareTable").querySelector("tbody").innerHTML = rows.map(
    (r) => `<tr>
        <td><span class="cmp ${r.status}" style="padding:2px 8px;margin:0">${r.status}</span></td>
        <td>${ruleKindBadge(r.kind)}</td>
        <td>${r.role || "\u2014"}</td>
        <td class="mono">${esc(r.description)}</td>
      </tr>`
  ).join("") || '<tr><td colspan="4" class="muted">No differences.</td></tr>';
}
function renderSettings() {
  const s = state.settings;
  const fwHost = $("frameworkToggles");
  fwHost.innerHTML = Object.entries(s.enabledFrameworks).map(([name, on]) => `<label><input type="checkbox" data-fw="${esc(name)}" ${on ? "checked" : ""}/> ${esc(name)}</label>`).join("");
  $("minConf").value = String(s.minConfidence);
  $("minConfVal").textContent = String(s.minConfidence);
  $("optTraversal").checked = s.emitTraversalRules;
  $("optLabelRules").checked = s.emitLabelRules;
  $("optHighlight").checked = s.highlightEnabled;
  $("mappingJson").value = JSON.stringify(s.roleMappings ?? null, null, 2);
}
async function updateSettings(patch) {
  state.settings = { ...state.settings, ...patch };
  await saveSettings(state.settings);
}
function short(s, n) {
  return s.length > n ? s.slice(0, n - 1) + "\u2026" : s;
}
function setStatus(id, text, cls) {
  const el = $(id);
  el.textContent = text;
  el.className = "status " + cls;
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}
async function downloadText(filename, text, mime = "application/xml;charset=utf-8") {
  try {
    const res = await chrome.runtime.sendMessage({ type: "EPIPLEX_DOWNLOAD", filename, data: text, mime });
    if (res?.ok) return;
  } catch {
  }
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1e4);
}
function switchTab(name) {
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.getAttribute("data-tab") === name));
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${name}`));
}
function wireEvents() {
  document.querySelectorAll(".tab-btn").forEach((b) => b.addEventListener("click", () => switchTab(b.getAttribute("data-tab"))));
  $("btnScan").addEventListener("click", runScan);
  $("btnCopySteps").addEventListener("click", async () => {
    const lines = (state.scan?.controls || []).map((c) => generateStepSentence(c));
    const ok = await copyText(lines.join("\n"));
    setStatus("scanStatus", ok ? `\u2713 Copied ${lines.length} step sentences` : "Copy failed", ok ? "ok" : "err");
  });
  $("roleFilter").addEventListener("change", renderControls);
  $("searchBox").addEventListener("input", renderControls);
  $("ruleKindFilter").addEventListener("change", renderRules);
  $("compareFilter").addEventListener("change", renderCompare);
  $("btnHighlight").addEventListener("click", async () => {
    const btn = $("btnHighlight");
    const next = btn.dataset.state === "on" ? false : true;
    btn.dataset.state = next ? "on" : "off";
    await sendToTab("EPIPLEX_HIGHLIGHT", { enabled: next });
    setStatus("scanStatus", next ? "Highlight overlay ON \u2014 hover a box for details." : "Highlight OFF", next ? "ok" : "");
  });
  $("btnLive").addEventListener("click", async () => {
    const btn = $("btnLive");
    const next = btn.dataset.state !== "on";
    btn.dataset.state = next ? "on" : "off";
    const res = await sendToTab("EPIPLEX_LIVE", { enabled: next });
    setStatus("scanStatus", res?.live ? "Live capture ON \u2014 rules update as the DOM changes." : "Live capture OFF.", res?.live ? "ok" : "");
    if (next) runScan();
  });
  $("btnCopyXml").addEventListener("click", async () => {
    const ok = await copyText(state.xml);
    setStatus("xmlValid", ok ? "\u2713 Copied" : "Copy failed", ok ? "ok" : "err");
  });
  $("btnDownloadXml").addEventListener("click", () => downloadText("IEAdaptor.xml", state.xml));
  $("btnCopyGps").addEventListener("click", async () => copyText(state.gpsXml));
  $("btnDownloadGps").addEventListener("click", () => downloadText("GPS-Mappings.xml", state.gpsXml));
  $("btnCopyTests").addEventListener("click", async () => copyText(state.testCases));
  $("btnLoadExisting").addEventListener("click", () => $("existingXmlInput").click());
  $("existingXmlInput").addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    state.existingXml = await file.text();
    state.existingFileName = file.name;
    $("existingFile").textContent = `${file.name} (${(state.existingXml.length / 1024).toFixed(1)} KB) loaded`;
    refreshCompare();
    switchTab("compare");
  });
  $("btnMerge").addEventListener("click", async () => {
    setStatus("scanStatus", `Merged \u2014 ${state.mergedCount} new rules added, ${state.compare?.duplicateRules.length ?? 0} duplicates skipped.`, "ok");
    renderCompare();
  });
  $("btnDownloadMerged").addEventListener("click", () => {
    if (state.mergedXml) downloadText("IEAdaptor-merged.xml", state.mergedXml);
  });
  $("frameworkToggles").addEventListener("change", async (e) => {
    const input = e.target;
    if (!input.dataset.fw) return;
    const fw = { ...state.settings.enabledFrameworks };
    fw[input.dataset.fw] = input.checked;
    await updateSettings({ enabledFrameworks: fw });
  });
  $("minConf").addEventListener("input", async (e) => {
    const v = Number(e.target.value);
    $("minConfVal").textContent = String(v);
    await updateSettings({ minConfidence: v });
  });
  $("optTraversal").addEventListener("change", (e) => updateSettings({ emitTraversalRules: e.target.checked }));
  $("optLabelRules").addEventListener("change", (e) => updateSettings({ emitLabelRules: e.target.checked }));
  $("optHighlight").addEventListener("change", async (e) => {
    const v = e.target.checked;
    await updateSettings({ highlightEnabled: v });
    if (v && state.tabId) await sendToTab("EPIPLEX_HIGHLIGHT", { enabled: true });
  });
  $("btnLoadMappings").addEventListener("click", async () => {
    const text = $("mappingJson").value;
    const err = validateMappingJson(text);
    if (err) {
      setStatus("mappingStatus", err, "err");
      return;
    }
    const parsed = text.trim() ? JSON.parse(text) : null;
    await updateSettings({ roleMappings: parsed });
    setStatus("mappingStatus", "Role mappings updated \u2014 re-scan the page to apply.", "ok");
  });
  $("btnExportMappings").addEventListener("click", async () => {
    const current = state.settings.roleMappings ?? (await Promise.resolve().then(() => (init_settings(), settings_exports))).resolveRoleMappings(state.settings);
    await downloadText("roleMappings.json", JSON.stringify(current, null, 2), "application/json");
  });
  $("btnResetMappings").addEventListener("click", async () => {
    await updateSettings({ roleMappings: null });
    $("mappingJson").value = "null";
    setStatus("mappingStatus", "Defaults restored.", "ok");
  });
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type === "EPIPLEX_LIVE_UPDATE" && msg.payload) {
      state.scan = msg.payload;
      renderRoleSummary();
      renderControls();
      setStatus("scanStatus", `Live: ${msg.payload.controls.length} controls`, "ok");
    }
  });
}
renderSettings();
wireEvents();
renderControls();
renderRules();
renderXml();
document.querySelector("#panel-settings .card:last-child .muted").textContent = `Epiplex IE Rules Generator v${EXTENSION_VERSION} \u2014 Manifest V3 \xB7 TypeScript \xB7 DOM scanning incl. shadow DOM. Generates IEAdaptor.xml compatible with Epiplex Capture / NetOn.`;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL3JvbGVNYXBwaW5ncy5qc29uIiwgInNyYy9zZXR0aW5ncy50cyIsICJzcmMvY29tcGFyZUVuZ2luZS50cyIsICJzcmMvbGFiZWxFbmdpbmUudHMiLCAic3JjL3R5cGVzLnRzIiwgInNyYy9ydWxlRW5naW5lLnRzIiwgInNyYy9wb3B1cC50cyIsICJzcmMvdHJhdmVyc2FsRW5naW5lLnRzIiwgInNyYy9zdGVwU2VudGVuY2UudHMiLCAic3JjL3htbEdlbmVyYXRvci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsie1xuICBcIl9jb21tZW50XCI6IFwiRXBpcGxleCBJRSBSdWxlcyBHZW5lcmF0b3IgXHUyMDE0IGNvbmZpZ3VyYWJsZSByb2xlIG1hcHBpbmdzLiBFZGl0IHZhbHVlcyBoZXJlIG9yIGltcG9ydCBhbiBvdmVycmlkZSBKU09OIGZyb20gdGhlIGV4dGVuc2lvbiBTZXR0aW5ncyB0YWIuIEVhY2ggbWFwcGluZyBpcyBtYXRjaGVkIGFnYWluc3QgdGhlIGVsZW1lbnQ7IHRoZSBmaXJzdCBtYXRjaCB3aW5zLiBjb25maWRlbmNlIGlzIGEgMC0xMDAgc2NvcmUgdXNlZCBpbiB0aGUgcnVsZSBkaWFnbm9zdGljcy5cIixcbiAgXCJkZWZhdWx0UGFyZW50Um9sZXNcIjoge1xuICAgIFwiNDJcIjogMTAsXG4gICAgXCI0M1wiOiAxMCxcbiAgICBcIjQ0XCI6IDEwLFxuICAgIFwiNDVcIjogMTAsXG4gICAgXCI0NlwiOiAxMCxcbiAgICBcIjkyXCI6IDEwLFxuICAgIFwiMjlcIjogMTAsXG4gICAgXCIyOFwiOiAxMCxcbiAgICBcIjM0XCI6IDQ2LFxuICAgIFwiMzRfb3B0aW9uX2luX3NlbGVjdFwiOiA0NlxuICB9LFxuICBcImZyYW1ld29ya1JvbGVNYXBwaW5nc1wiOiBbXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcIlxcXFxibWF0LXNlbGVjdFxcXFxiXCIsIFwicm9sZVwiOiA0NiwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5NSB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtc2VsZWN0LVwiLCBcInJvbGVcIjogNDYsIFwiZnJhbWV3b3JrXCI6IFwiQW5ndWxhciBNYXRlcmlhbFwiLCBcImNvbmZpZGVuY2VcIjogOTAgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwibWF0LW9wdGlvblwiLCBcInJvbGVcIjogMzQsIFwiZnJhbWV3b3JrXCI6IFwiQW5ndWxhciBNYXRlcmlhbFwiLCBcImNvbmZpZGVuY2VcIjogOTAgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwibWF0LWNoZWNrYm94XCIsIFwicm9sZVwiOiA0NCwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtc2xpZGUtdG9nZ2xlXCIsIFwicm9sZVwiOiA0NCwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtcmFkaW9cIiwgXCJyb2xlXCI6IDQ1LCBcImZyYW1ld29ya1wiOiBcIkFuZ3VsYXIgTWF0ZXJpYWxcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcIm1hdC1kYXRlcGlja2VyXCIsIFwicm9sZVwiOiA5MiwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtY2FsZW5kYXItYm9keS1jZWxsXCIsIFwicm9sZVwiOiAyOSwgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtdGFiLWxhYmVsXCIsIFwicm9sZVwiOiAzNywgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtdGFiLWxpbmtcIiwgXCJyb2xlXCI6IDM3LCBcImZyYW1ld29ya1wiOiBcIkFuZ3VsYXIgTWF0ZXJpYWxcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcIm1hdC1idXR0b258bWF0LXJhaXNlZC1idXR0b258bWF0LWljb24tYnV0dG9ufG1hdC1mYWJ8bWF0LW1pbmktZmFiXCIsIFwicm9sZVwiOiA0MywgXCJmcmFtZXdvcmtcIjogXCJBbmd1bGFyIE1hdGVyaWFsXCIsIFwiY29uZmlkZW5jZVwiOiA5MCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtYXQtZm9ybS1maWVsZFwiLCBcInJvbGVcIjogNDIsIFwiZnJhbWV3b3JrXCI6IFwiQW5ndWxhciBNYXRlcmlhbFwiLCBcImNvbmZpZGVuY2VcIjogODAgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwibWF0LW1lbnUtaXRlbVwiLCBcInJvbGVcIjogMTIsIFwiZnJhbWV3b3JrXCI6IFwiQW5ndWxhciBNYXRlcmlhbFwiLCBcImNvbmZpZGVuY2VcIjogODUgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwic2VsZWN0Mi1zZWxlY3Rpb258c2VsZWN0Mi1jb250YWluZXJcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlNlbGVjdDIgKGpRdWVyeSlcIiwgXCJjb25maWRlbmNlXCI6IDkzIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNlbGVjdDItcmVzdWx0c19fb3B0aW9uXCIsIFwicm9sZVwiOiAzNCwgXCJmcmFtZXdvcmtcIjogXCJTZWxlY3QyIChqUXVlcnkpXCIsIFwiY29uZmlkZW5jZVwiOiA5MCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJyZWFjdC1jb21ib2JveC12aWV3fHJlYWN0LXNlbGVjdFwiLCBcInJvbGVcIjogNDYsIFwiZnJhbWV3b3JrXCI6IFwiUmVhY3RcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInJlYWN0LWNvbWJvYm94LW9wdGlvblwiLCBcInJvbGVcIjogMzQsIFwiZnJhbWV3b3JrXCI6IFwiUmVhY3RcIiwgXCJjb25maWRlbmNlXCI6IDg4IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNsZHMtYnV0dG9uXCIsIFwicm9sZVwiOiA0MywgXCJmcmFtZXdvcmtcIjogXCJTYWxlc2ZvcmNlIExpZ2h0bmluZ1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwic2xkcy1pbnB1dFwiLCBcInJvbGVcIjogNDIsIFwiZnJhbWV3b3JrXCI6IFwiU2FsZXNmb3JjZSBMaWdodG5pbmdcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNsZHMtY2hlY2tib3hcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIlNhbGVzZm9yY2UgTGlnaHRuaW5nXCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJzbGRzLXJhZGlvXCIsIFwicm9sZVwiOiA0NSwgXCJmcmFtZXdvcmtcIjogXCJTYWxlc2ZvcmNlIExpZ2h0bmluZ1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwic2xkcy1jb21ib2JveHxzbGRzLXNlbGVjdFwiLCBcInJvbGVcIjogNDYsIFwiZnJhbWV3b3JrXCI6IFwiU2FsZXNmb3JjZSBMaWdodG5pbmdcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNsZHMtZGF0ZXBpY2tlclwiLCBcInJvbGVcIjogOTIsIFwiZnJhbWV3b3JrXCI6IFwiU2FsZXNmb3JjZSBMaWdodG5pbmdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInNsZHMtdGFic1wiLCBcInJvbGVcIjogMzcsIFwiZnJhbWV3b3JrXCI6IFwiU2FsZXNmb3JjZSBMaWdodG5pbmdcIiwgXCJjb25maWRlbmNlXCI6IDg1IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImxpZ2h0bmluZy1idXR0b25cIiwgXCJyb2xlXCI6IDQzLCBcImZyYW1ld29ya1wiOiBcIlNhbGVzZm9yY2UgTGlnaHRuaW5nXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJsaWdodG5pbmctaW5wdXRcIiwgXCJyb2xlXCI6IDQyLCBcImZyYW1ld29ya1wiOiBcIlNhbGVzZm9yY2UgTGlnaHRuaW5nXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJsaWdodG5pbmctY29tYm9ib3hcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlNhbGVzZm9yY2UgTGlnaHRuaW5nXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJhcHBtYWdpYy1idXR0b25cIiwgXCJyb2xlXCI6IDQzLCBcImZyYW1ld29ya1wiOiBcIlBvd2VyQXBwc1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiYXBwbWFnaWMtY2hlY2tib3hcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIlBvd2VyQXBwc1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiYXBwbWFnaWMtY29tYm9ib3hcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlBvd2VyQXBwc1wiLCBcImNvbmZpZGVuY2VcIjogOTIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiYXBwbWFnaWMtdGV4dFwiLCBcInJvbGVcIjogNDIsIFwiZnJhbWV3b3JrXCI6IFwiUG93ZXJBcHBzXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJhcHBtYWdpYy1kYXRlcGlja2VyXCIsIFwicm9sZVwiOiA5MiwgXCJmcmFtZXdvcmtcIjogXCJQb3dlckFwcHNcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImFwcG1hZ2ljLXJhZGlvXCIsIFwicm9sZVwiOiA0NSwgXCJmcmFtZXdvcmtcIjogXCJQb3dlckFwcHNcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInVpNS1pbnB1dHxzYXBNSW5wdXRcIiwgXCJyb2xlXCI6IDQyLCBcImZyYW1ld29ya1wiOiBcIlNBUCBVSTVcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInVpNS1kYXRlcGlja2VyfHNhcE1EYXRlUGlja2VyXCIsIFwicm9sZVwiOiA5MiwgXCJmcmFtZXdvcmtcIjogXCJTQVAgVUk1XCIsIFwiY29uZmlkZW5jZVwiOiA5MCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJ1aTUtc2VsZWN0fHVpLWRyb3Bkb3duXCIsIFwicm9sZVwiOiA0NiwgXCJmcmFtZXdvcmtcIjogXCJTQVAgVUk1XCIsIFwiY29uZmlkZW5jZVwiOiA5MiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJ1aTUtb3B0aW9uXCIsIFwicm9sZVwiOiAzNCwgXCJmcmFtZXdvcmtcIjogXCJTQVAgVUk1XCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJ1aTUtYnV0dG9ufHNhcE1CdG5cIiwgXCJyb2xlXCI6IDQzLCBcImZyYW1ld29ya1wiOiBcIlNBUCBVSTVcIiwgXCJjb25maWRlbmNlXCI6IDkyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInVpNS1jaGVja2JveHxzYXBNQ2JcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIlNBUCBVSTVcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInVpNS1yYWRpb2J1dHRvbnxzYXBNUmJcIiwgXCJyb2xlXCI6IDQ1LCBcImZyYW1ld29ya1wiOiBcIlNBUCBVSTVcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtZHJvcGRvd25cIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtY2hlY2tib3hcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtcmFkaW9idXR0b25cIiwgXCJyb2xlXCI6IDQ1LCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtY2FsZW5kYXJcIiwgXCJyb2xlXCI6IDkyLCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDkwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInAtYnV0dG9uXCIsIFwicm9sZVwiOiA0MywgXCJmcmFtZXdvcmtcIjogXCJQcmltZU5HXCIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJwLXRhYnZpZXdcIiwgXCJyb2xlXCI6IDM3LCBcImZyYW1ld29ya1wiOiBcIlByaW1lTkdcIiwgXCJjb25maWRlbmNlXCI6IDg1IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImRyb3Bkb3duLXRvZ2dsZXxidG5cIiwgXCJyb2xlXCI6IDQzLCBcImZyYW1ld29ya1wiOiBcIkJvb3RzdHJhcFwiLCBcImNvbmZpZGVuY2VcIjogNzggfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiZm9ybS1jb250cm9sXCIsIFwicm9sZVwiOiA0MiwgXCJmcmFtZXdvcmtcIjogXCJCb290c3RyYXBcIiwgXCJjb25maWRlbmNlXCI6IDcwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImN1c3RvbS1zZWxlY3RcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIkJvb3RzdHJhcFwiLCBcImNvbmZpZGVuY2VcIjogNzYgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiY3VzdG9tLWNoZWNrYm94XCIsIFwicm9sZVwiOiA0NCwgXCJmcmFtZXdvcmtcIjogXCJCb290c3RyYXBcIiwgXCJjb25maWRlbmNlXCI6IDc2IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImN1c3RvbS1yYWRpb1wiLCBcInJvbGVcIjogNDUsIFwiZnJhbWV3b3JrXCI6IFwiQm9vdHN0cmFwXCIsIFwiY29uZmlkZW5jZVwiOiA3NiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJjdXN0b20tc3dpdGNoXCIsIFwicm9sZVwiOiA0NCwgXCJmcmFtZXdvcmtcIjogXCJCb290c3RyYXBcIiwgXCJjb25maWRlbmNlXCI6IDc2IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcIm5hdi10YWJzfG5hdi1saW5rXCIsIFwicm9sZVwiOiAzNywgXCJmcmFtZXdvcmtcIjogXCJCb290c3RyYXBcIiwgXCJjb25maWRlbmNlXCI6IDc0IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImNob3Nlbi1zaW5nbGV8Y2hvc2VuLWNob2ljZXNcIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIkNob3NlbiAoalF1ZXJ5KVwiLCBcImNvbmZpZGVuY2VcIjogOTAgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiZ29vZy1tZW51fGdvb2ctbWVudWl0ZW1cIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIkdvb2dsZVwiLCBcImNvbmZpZGVuY2VcIjogODIgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwidWktZHJvcGRvd25cIiwgXCJyb2xlXCI6IDQ2LCBcImZyYW1ld29ya1wiOiBcIlByaW1lRmFjZXMgLyBTQVBcIiwgXCJjb25maWRlbmNlXCI6IDgyIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImNhbGVuZGFyfGRhdGVwaWNrZXJcIiwgXCJyb2xlXCI6IDkyLCBcImZyYW1ld29ya1wiOiBcIkdlbmVyaWNcIiwgXCJjb25maWRlbmNlXCI6IDc2IH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcImNvbWJvYm94XCIsIFwicm9sZVwiOiA0NiwgXCJmcmFtZXdvcmtcIjogXCJHZW5lcmljXCIsIFwiY29uZmlkZW5jZVwiOiA3NiB9LFxuICAgIHsgXCJjbGFzc1BhdHRlcm5cIjogXCJtZW51LWJ1dHRvblwiLCBcInJvbGVcIjogNDYsIFwiZnJhbWV3b3JrXCI6IFwiR2VuZXJpY1wiLCBcImNvbmZpZGVuY2VcIjogNzYgfSxcbiAgICB7IFwiY2xhc3NQYXR0ZXJuXCI6IFwiY2hlY2tib3hcIiwgXCJyb2xlXCI6IDQ0LCBcImZyYW1ld29ya1wiOiBcIkdlbmVyaWNcIiwgXCJjb25maWRlbmNlXCI6IDcwIH0sXG4gICAgeyBcImNsYXNzUGF0dGVyblwiOiBcInJhZGlvXCIsIFwicm9sZVwiOiA0NSwgXCJmcmFtZXdvcmtcIjogXCJHZW5lcmljXCIsIFwiY29uZmlkZW5jZVwiOiA3MCB9XG4gIF0sXG4gIFwiYXR0cmlidXRlUm9sZU1hcHBpbmdzXCI6IFtcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4oYnV0dG9uKSRcIiwgXCJyb2xlXCI6IDQzLCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4oY2hlY2tib3h8c3dpdGNoKSRcIiwgXCJyb2xlXCI6IDQ0LCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4ocmFkaW8pJFwiLCBcInJvbGVcIjogNDUsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihjb21ib2JveHxsaXN0Ym94fG1lbnUpJFwiLCBcInJvbGVcIjogNDYsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihvcHRpb24pJFwiLCBcInJvbGVcIjogMzQsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihsaW5rKSRcIiwgXCJyb2xlXCI6IDMwLCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4odGFiKSRcIiwgXCJyb2xlXCI6IDM3LCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4obWVudWl0ZW0pJFwiLCBcInJvbGVcIjogMTIsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihpbWd8aW1hZ2UpJFwiLCBcInJvbGVcIjogNDAsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJyb2xlXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihncmlkY2VsbHxjZWxsKSRcIiwgXCJyb2xlXCI6IDI5LCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4ocm93KSRcIiwgXCJyb2xlXCI6IDI4LCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4odGFibGV8Z3JpZCkkXCIsIFwicm9sZVwiOiAyNCwgXCJjb25maWRlbmNlXCI6IDg4IH0sXG4gICAgeyBcImF0dHJpYnV0ZVwiOiBcInJvbGVcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCJeKHRleHRib3h8c2VhcmNoYm94KSRcIiwgXCJyb2xlXCI6IDQyLCBcImNvbmZpZGVuY2VcIjogODggfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwicm9sZVwiLCBcInZhbHVlUGF0dGVyblwiOiBcIl4oc2Nyb2xsYmFyKSRcIiwgXCJyb2xlXCI6IDMsIFwiY29uZmlkZW5jZVwiOiA4OCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJhcmlhLWhhc3BvcHVwXCIsIFwidmFsdWVQYXR0ZXJuXCI6IFwiXihsaXN0Ym94fG1lbnV8dHJ1ZSkkXCIsIFwicm9sZVwiOiA0NiwgXCJjb25maWRlbmNlXCI6IDgyIH0sXG4gICAgeyBcImF0dHJpYnV0ZVwiOiBcImFyaWEtZXhwYW5kZWRcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCJeKHRydWV8ZmFsc2UpJFwiLCBcInJvbGVcIjogNDYsIFwiY29uZmlkZW5jZVwiOiA3MCB9LFxuICAgIHsgXCJhdHRyaWJ1dGVcIjogXCJkYXRhLWNvbXAtaWRcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCIoZGF0ZS1waWNrZXJ8Y2FsZW5kYXIpXCIsIFwicm9sZVwiOiA5MiwgXCJjb25maWRlbmNlXCI6IDg0IH0sXG4gICAgeyBcImF0dHJpYnV0ZVwiOiBcImRhdGEtY29tcG9uZW50LXR5cGVcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCIoZGF0ZXxjYWxlbmRhcilcIiwgXCJyb2xlXCI6IDkyLCBcImNvbmZpZGVuY2VcIjogODQgfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwiZGF0YS10ZXN0aWRcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCIoZGF0ZXxjYWxlbmRhcilcIiwgXCJyb2xlXCI6IDkyLCBcImNvbmZpZGVuY2VcIjogNzYgfSxcbiAgICB7IFwiYXR0cmlidXRlXCI6IFwiZGF0YS10ZXN0aWRcIiwgXCJ2YWx1ZVBhdHRlcm5cIjogXCIoZHJvcGRvd258Y29tYm9ib3gpXCIsIFwicm9sZVwiOiA0NiwgXCJjb25maWRlbmNlXCI6IDc2IH1cbiAgXSxcbiAgXCJpbnB1dFR5cGVSb2xlc1wiOiB7XG4gICAgXCJ0ZXh0XCI6IDQyLFxuICAgIFwicGFzc3dvcmRcIjogNDIsXG4gICAgXCJlbWFpbFwiOiA0MixcbiAgICBcInRlbFwiOiA0MixcbiAgICBcIm51bWJlclwiOiA0MixcbiAgICBcInVybFwiOiA0MixcbiAgICBcInNlYXJjaFwiOiA0MixcbiAgICBcImNvbG9yXCI6IDQyLFxuICAgIFwiZmlsZVwiOiA0MixcbiAgICBcImRhdGVcIjogOTIsXG4gICAgXCJ0aW1lXCI6IDkyLFxuICAgIFwiZGF0ZXRpbWUtbG9jYWxcIjogOTIsXG4gICAgXCJtb250aFwiOiA5MixcbiAgICBcIndlZWtcIjogOTIsXG4gICAgXCJjaGVja2JveFwiOiA0NCxcbiAgICBcInJhZGlvXCI6IDQ1LFxuICAgIFwicmFuZ2VcIjogNDYsXG4gICAgXCJidXR0b25cIjogNDMsXG4gICAgXCJzdWJtaXRcIjogNDMsXG4gICAgXCJyZXNldFwiOiA0MyxcbiAgICBcImltYWdlXCI6IDQzXG4gIH0sXG4gIFwidGFnUm9sZXNcIjoge1xuICAgIFwiaW5wdXRcIjogNDIsXG4gICAgXCJ0ZXh0YXJlYVwiOiA0MixcbiAgICBcInNlbGVjdFwiOiA0NixcbiAgICBcImJ1dHRvblwiOiA0MyxcbiAgICBcImFcIjogMzAsXG4gICAgXCJhcmVhXCI6IDMwLFxuICAgIFwiaW1nXCI6IDQwLFxuICAgIFwidGFibGVcIjogMjQsXG4gICAgXCJ0Ym9keVwiOiAyNCxcbiAgICBcInRyXCI6IDI4LFxuICAgIFwidGRcIjogMjksXG4gICAgXCJ0aFwiOiAyOSxcbiAgICBcImxpXCI6IDM0LFxuICAgIFwib3B0aW9uXCI6IDM0LFxuICAgIFwib3B0Z3JvdXBcIjogMzQsXG4gICAgXCJzdmdcIjogODIsXG4gICAgXCJpXCI6IDgyLFxuICAgIFwibWF0LWljb25cIjogODIsXG4gICAgXCJsYWJlbFwiOiA0MSxcbiAgICBcInNwYW5cIjogNDEsXG4gICAgXCJkaXZcIjogNDEsXG4gICAgXCJwXCI6IDQxLFxuICAgIFwiaDFcIjogNDEsXG4gICAgXCJoMlwiOiA0MSxcbiAgICBcImgzXCI6IDQxLFxuICAgIFwiaDRcIjogNDEsXG4gICAgXCJoNVwiOiA0MSxcbiAgICBcImg2XCI6IDQxLFxuICAgIFwibmF2XCI6IDEwLFxuICAgIFwiZm9ybVwiOiAxMCxcbiAgICBcImZpZWxkc2V0XCI6IDEwLFxuICAgIFwic2VjdGlvblwiOiAxMCxcbiAgICBcImFydGljbGVcIjogMTAsXG4gICAgXCJoZWFkZXJcIjogMTAsXG4gICAgXCJmb290ZXJcIjogMTAsXG4gICAgXCJtYWluXCI6IDEwLFxuICAgIFwidWxcIjogMTAsXG4gICAgXCJvbFwiOiAxMFxuICB9XG59XG4iLCAiLyoqXG4gKiBzZXR0aW5ncy50cyBcdTIwMTQgVXNlciBzZXR0aW5ncyArIGNvbmZpZ3VyYWJsZSByb2xlIG1hcHBpbmdzLlxuICpcbiAqIERlZmF1bHRzIGNvbWUgZnJvbSByb2xlTWFwcGluZ3MuanNvbiAoYnVuZGxlZCkuIFVzZXJzIGNhbiBpbXBvcnQgYW5cbiAqIG92ZXJyaWRlIEpTT04gZnJvbSB0aGUgU2V0dGluZ3MgdGFiOyBpdCBpcyBtZXJnZWQgKGFycmF5cyBhcmUgcmVwbGFjZWQsXG4gKiBvYmplY3RzIGFyZSBzaGFsbG93LW1lcmdlZCkgYW5kIHBlcnNpc3RlZCBpbiBjaHJvbWUuc3RvcmFnZS5sb2NhbC5cbiAqL1xuaW1wb3J0IGRlZmF1bHRNYXBwaW5ncyBmcm9tICcuL3JvbGVNYXBwaW5ncy5qc29uJztcbmltcG9ydCB0eXBlIHsgUm9sZU1hcHBpbmdDb25maWcgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBFeHRlbnNpb25TZXR0aW5ncyB7XG4gIC8qKiBGcmFtZXdvcmsgZGV0ZWN0aW9uIHRvZ2dsZSAocGVyIGZyYW1ld29yayBrZXkpLiAqL1xuICBlbmFibGVkRnJhbWV3b3JrczogUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG4gIC8qKiBIaWdobGlnaHRpbmcgb3B0aW9ucyBmb3IgdmlzdWFsIGluc3BlY3Rpb24uICovXG4gIGhpZ2hsaWdodEVuYWJsZWQ6IGJvb2xlYW47XG4gIC8qKiBJbmNsdWRlIGxvdy1jb25maWRlbmNlICg8IDYwKSBydWxlcyBpbiB0aGUgZ2VuZXJhdGVkIFhNTC4gKi9cbiAgaW5jbHVkZUxvd0NvbmZpZGVuY2U6IGJvb2xlYW47XG4gIC8qKiBNaW5pbXVtIGNvbmZpZGVuY2UgZm9yIGEgcnVsZSB0byBiZSBlbWl0dGVkICgwXHUyMDEzMTAwKS4gKi9cbiAgbWluQ29uZmlkZW5jZTogbnVtYmVyO1xuICAvKiogRW1pdCB0cmF2ZXJzYWwgcnVsZXMgZXZlbiB3aGVuIGEgcGxhaW4gdGFnIHJ1bGUgYWxyZWFkeSBjb3ZlcnMgdGhlIGNvbnRyb2wuICovXG4gIGVtaXRUcmF2ZXJzYWxSdWxlczogYm9vbGVhbjtcbiAgLyoqIEVtaXQgbGFiZWwgVHJhdmVyc2VMb2dpYyBydWxlcyBmb3IgY29udHJvbHMgd2l0aG91dCBhIGRpcmVjdCBsYWJlbC4gKi9cbiAgZW1pdExhYmVsUnVsZXM6IGJvb2xlYW47XG4gIC8qKiBSb2xlIG1hcHBpbmcgb3ZlcnJpZGVzIChyZXBsYWNlcyBidW5kbGVkIGNvbmZpZyB3aGVuIGltcG9ydGVkKS4gKi9cbiAgcm9sZU1hcHBpbmdzOiBSb2xlTWFwcGluZ0NvbmZpZyB8IG51bGw7XG4gIC8qKiBDb250cm9scyB0byBzY2FuIGJ5IGRlZmF1bHQ6IGFsbCB0YWdzIHZzLiBpbnRlcmFjdGl2ZSBvbmx5LiAqL1xuICBzY2FuQWxsVGFnczogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEV4dGVuc2lvblNldHRpbmdzID0ge1xuICBlbmFibGVkRnJhbWV3b3Jrczoge1xuICAgICdBbmd1bGFyIE1hdGVyaWFsJzogdHJ1ZSxcbiAgICAnUmVhY3QnOiB0cnVlLFxuICAgICdWdWUnOiB0cnVlLFxuICAgICdTYWxlc2ZvcmNlIExpZ2h0bmluZyc6IHRydWUsXG4gICAgJ1Bvd2VyQXBwcyc6IHRydWUsXG4gICAgJ1NBUCBVSTUnOiB0cnVlLFxuICAgICdTZWxlY3QyJzogdHJ1ZSxcbiAgICAnQm9vdHN0cmFwJzogdHJ1ZSxcbiAgICAnUHJpbWVORyc6IHRydWUsXG4gIH0sXG4gIGhpZ2hsaWdodEVuYWJsZWQ6IHRydWUsXG4gIGluY2x1ZGVMb3dDb25maWRlbmNlOiB0cnVlLFxuICBtaW5Db25maWRlbmNlOiA1NSxcbiAgZW1pdFRyYXZlcnNhbFJ1bGVzOiB0cnVlLFxuICBlbWl0TGFiZWxSdWxlczogdHJ1ZSxcbiAgcm9sZU1hcHBpbmdzOiBudWxsLFxuICBzY2FuQWxsVGFnczogdHJ1ZSxcbn07XG5cbi8qKiBSZXNvbHZlZCBtYXBwaW5nIGNvbmZpZzogb3ZlcnJpZGVzIGlmIHByZXNlbnQsIGVsc2UgdGhlIGJ1bmRsZWQgZGVmYXVsdHMuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVJvbGVNYXBwaW5ncyhzZXR0aW5nczogRXh0ZW5zaW9uU2V0dGluZ3MpOiBSb2xlTWFwcGluZ0NvbmZpZyB7XG4gIGlmIChzZXR0aW5ncy5yb2xlTWFwcGluZ3MpIHJldHVybiBzZXR0aW5ncy5yb2xlTWFwcGluZ3M7XG4gIHJldHVybiBkZWZhdWx0TWFwcGluZ3MgYXMgdW5rbm93biBhcyBSb2xlTWFwcGluZ0NvbmZpZztcbn1cblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnZXBpcGxleEllU2V0dGluZ3MnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNldHRpbmdzKCk6IFByb21pc2U8RXh0ZW5zaW9uU2V0dGluZ3M+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoU1RPUkFHRV9LRVkpO1xuICAgIGlmIChyYXcgJiYgcmF3W1NUT1JBR0VfS0VZXSkge1xuICAgICAgcmV0dXJuIHsgLi4uREVGQVVMVF9TRVRUSU5HUywgLi4ucmF3W1NUT1JBR0VfS0VZXSB9O1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gc3RvcmFnZSB1bmF2YWlsYWJsZSAodW5pdCB0ZXN0cyAvIGZpbGU6Ly8gcGFnZXMpIFx1MjAxNCBmYWxsIGJhY2sgdG8gZGVmYXVsdHMuXG4gIH1cbiAgcmV0dXJuIHsgLi4uREVGQVVMVF9TRVRUSU5HUyB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKHNldHRpbmdzOiBFeHRlbnNpb25TZXR0aW5ncyk6IFByb21pc2U8dm9pZD4ge1xuICB0cnkge1xuICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFtTVE9SQUdFX0tFWV06IHNldHRpbmdzIH0pO1xuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmUgXHUyMDE0IG5vbi1wZXJzaXN0ZW50IGZhbGxiYWNrIChwb3B1cCBrZWVwcyBzdGF0ZSBpbiBtZW1vcnkpLlxuICB9XG59XG5cbi8qKiBWYWxpZGF0ZSBhIHVzZXItc3VwcGxpZWQgcm9sZS1tYXBwaW5nIEpTT04uIFJldHVybnMgZXJyb3Igc3RyaW5nIG9yIG51bGwuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVNYXBwaW5nSnNvbih0ZXh0OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHRleHQpIGFzIFJvbGVNYXBwaW5nQ29uZmlnO1xuICAgIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09ICdvYmplY3QnKSByZXR1cm4gJ0pTT04gbXVzdCBiZSBhbiBvYmplY3QuJztcbiAgICBjb25zdCBhcnJzID0gWydmcmFtZXdvcmtSb2xlTWFwcGluZ3MnLCAnYXR0cmlidXRlUm9sZU1hcHBpbmdzJ107XG4gICAgZm9yIChjb25zdCBrZXkgb2YgYXJycykge1xuICAgICAgaWYgKHBhcnNlZFtrZXkgYXMga2V5b2YgUm9sZU1hcHBpbmdDb25maWddICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAhQXJyYXkuaXNBcnJheShwYXJzZWRba2V5IGFzIGtleW9mIFJvbGVNYXBwaW5nQ29uZmlnXSkpIHtcbiAgICAgICAgcmV0dXJuIGBcIiR7a2V5fVwiIG11c3QgYmUgYW4gYXJyYXkuYDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gYEludmFsaWQgSlNPTjogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gO1xuICB9XG59XG4iLCAiLyoqXG4gKiBjb21wYXJlRW5naW5lLnRzIFx1MjAxNCBDb21wYXJlICYgbWVyZ2UgYWdhaW5zdCBhbiBleGlzdGluZyBJRUFkYXB0b3IueG1sLlxuICpcbiAqIENvbXBhcmlzb24gaXMgZmluZ2VycHJpbnQtYmFzZWQ6XG4gKiAgIC0gbmV3IHJ1bGVzICAgICA6IGluIGdlbmVyYXRlZCwgbm90IGluIGV4aXN0aW5nXG4gKiAgIC0gbW9kaWZpZWQgcnVsZXM6IHNhbWUgKGtpbmQsIHJvbGUsIHBhcmVudCkgYnV0IGRpZmZlcmVudCBjb25kaXRpb24gdmFsdWVzXG4gKiAgIC0gZHVwbGljYXRlIHJ1bGVzOiBleGFjdCBmaW5nZXJwcmludCBtYXRjaCBpbiBib3RoXG4gKiAgIC0gb2Jzb2xldGUgcnVsZXM6IGluIGV4aXN0aW5nLCBub3QgaW4gZ2VuZXJhdGVkXG4gKlxuICogTWVyZ2luZyBpcyB0ZXh0LWxldmVsOiBuZXcgcnVsZSBibG9ja3MgYXJlIHNwbGljZWQgaW50byB0aGUgZXhpc3RpbmcgWE1MXG4gKiBzdHJpbmcgYmVmb3JlIHRoZSBjbG9zaW5nIHRhZyBvZiB0aGVpciBzZWN0aW9uLiBUaGlzIHByZXNlcnZlcyBhbGwgZXhpc3RpbmdcbiAqIGZvcm1hdHRpbmcsIGNvbW1lbnRzIGFuZCBjdXN0b20gcnVsZXMgYnl0ZS1mb3ItYnl0ZS5cbiAqL1xuaW1wb3J0IHR5cGUge1xuICBBdHRyaWJ1dGVSdWxlLFxuICBDb21wYXJlUmVzdWx0LFxuICBSdWxlTW9kZWwsXG4gIFRhZ0NvbmRpdGlvbixcbiAgVGFnUnVsZSxcbiAgVHJhdmVyc2VMYWJlbFJ1bGUsXG4gIFRyYXZlcnNhbFJ1bGUsXG59IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV4aXN0aW5nUnVsZXMge1xuICB0YWdSdWxlczogeyBmaW5nZXJwcmludDogc3RyaW5nOyByb2xlOiBudW1iZXI7IHBhcmVudDogbnVtYmVyIHwgbnVsbDsgZGVzY3JpcHRpb246IHN0cmluZzsgcmF3OiBzdHJpbmc7IGNvbmRzOiB7IHRhZ05hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nIH1bXSB9W107XG4gIGF0dHJSdWxlczogeyBmaW5nZXJwcmludDogc3RyaW5nOyByb2xlOiBudW1iZXI7IHBhcmVudDogbnVtYmVyIHwgbnVsbDsgZGVzY3JpcHRpb246IHN0cmluZzsgcmF3OiBzdHJpbmc7IHZhbHVlczogc3RyaW5nW10gfVtdO1xuICB0cmF2ZXJzYWxSdWxlczogeyBmaW5nZXJwcmludDogc3RyaW5nOyByb2xlOiBudW1iZXI7IHBhcmVudDogbnVtYmVyIHwgbnVsbDsgZGVzY3JpcHRpb246IHN0cmluZzsgcmF3OiBzdHJpbmcgfVtdO1xuICBzdGFuZGFyZFJ1bGVzOiB7IGZpbmdlcnByaW50OiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IHJhdzogc3RyaW5nIH1bXTtcbiAgdHJhdmVyc2VMYWJlbFJ1bGVzOiB7IGZpbmdlcnByaW50OiBzdHJpbmc7IHJvbGU6IG51bWJlcjsgZGVzY3JpcHRpb246IHN0cmluZzsgcmF3OiBzdHJpbmcgfVtdO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIExpZ2h0d2VpZ2h0IFhNTCBydWxlIGV4dHJhY3Rpb24gKHdvcmtzIGluIGJyb3dzZXIgKyBOb2RlKVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGF0dHIobmFtZTogc3RyaW5nLCBibG9jazogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IG0gPSBibG9jay5tYXRjaChuZXcgUmVnRXhwKGAke25hbWV9PVwiKFteXCJdKilcImApKTtcbiAgcmV0dXJuIG0gPyBtWzFdIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdEJsb2Nrcyh4bWw6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgY29uc3QgYmxvY2tzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCByZSA9IC88UnVsZVxcYltePl0qPltcXHNcXFNdKj88XFwvUnVsZT4vZztcbiAgbGV0IG06IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGw7XG4gIHdoaWxlICgobSA9IHJlLmV4ZWMoeG1sKSkgIT09IG51bGwpIGJsb2Nrcy5wdXNoKG1bMF0pO1xuICByZXR1cm4gYmxvY2tzO1xufVxuXG5mdW5jdGlvbiBzZWN0aW9uKHhtbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBvcGVuID0gbmV3IFJlZ0V4cChgPCR7bmFtZX0+KFtcXFxcc1xcXFxTXSo/KTxcXFxcLyR7bmFtZX0+YCk7XG4gIGNvbnN0IG0gPSB4bWwubWF0Y2gob3Blbik7XG4gIHJldHVybiBtID8gbVsxXSA6ICcnO1xufVxuXG4vKiogUGFyc2UgYWxsIGV4aXN0aW5nIHJ1bGVzIG91dCBvZiBhbiBJRUFkYXB0b3IueG1sIGRvY3VtZW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRXhpc3RpbmdSdWxlcyh4bWw6IHN0cmluZyk6IEV4aXN0aW5nUnVsZXMge1xuICBjb25zdCByZXN1bHQ6IEV4aXN0aW5nUnVsZXMgPSB7IHRhZ1J1bGVzOiBbXSwgYXR0clJ1bGVzOiBbXSwgdHJhdmVyc2FsUnVsZXM6IFtdLCBzdGFuZGFyZFJ1bGVzOiBbXSwgdHJhdmVyc2VMYWJlbFJ1bGVzOiBbXSB9O1xuICBjb25zdCByaSA9IHNlY3Rpb24oeG1sLCAnUm9sZUlkZW50aWZpZXInKTtcbiAgY29uc3QgdGFncyA9IHNlY3Rpb24ocmksICdCYXNlZE9uVGFncycpO1xuICBjb25zdCBhdHRycyA9IHNlY3Rpb24ocmksICdCYXNlZE9uQXR0cmlidXRlcycpO1xuICBjb25zdCB0cmF2ZXJzZSA9IHNlY3Rpb24ocmksICdCYXNlZE9uVHJhdmVyc2VMb2dpYycpO1xuICBjb25zdCBsaSA9IHNlY3Rpb24oeG1sLCAnTGFiZWxJZGVudGlmaWVyJyk7XG4gIGNvbnN0IHN0YW5kYXJkID0gc2VjdGlvbihsaSwgJ1N0YW5kYXJkTG9naWMnKTtcbiAgY29uc3QgdHJhdmVyc2VMYWJlbCA9IHNlY3Rpb24obGksICdUcmF2ZXJzZUxvZ2ljJyk7XG5cbiAgZm9yIChjb25zdCBibG9jayBvZiBleHRyYWN0QmxvY2tzKHRhZ3MpKSB7XG4gICAgY29uc3Qgcm9sZSA9IE51bWJlcihhdHRyKCdDdXJyZW50Um9sZScsIGJsb2NrKSB8fCAwKTtcbiAgICBjb25zdCBwYXJlbnQgPSBhdHRyKCdQYXJlbnRSb2xlJywgYmxvY2spID09PSAnJyB8fCBhdHRyKCdQYXJlbnRSb2xlJywgYmxvY2spID09PSBudWxsID8gbnVsbCA6IE51bWJlcihhdHRyKCdQYXJlbnRSb2xlJywgYmxvY2spKTtcbiAgICBjb25zdCBjb25kczogVGFnQ29uZGl0aW9uW10gPSBbXTtcbiAgICBjb25zdCBjb25kUmUgPSAvPENvbmRpdGlvblxcYihbXj5dKilcXC8/Pi9nO1xuICAgIGxldCBtOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsO1xuICAgIHdoaWxlICgobSA9IGNvbmRSZS5leGVjKGJsb2NrKSkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGMgPSBtWzFdO1xuICAgICAgY29uc3QgdG4gPSBhdHRyKCdUYWdOYW1lJywgYDx4ICR7Y30vPmApO1xuICAgICAgY29uc3QgdHkgPSBhdHRyKCdUeXBlJywgYDx4ICR7Y30vPmApO1xuICAgICAgaWYgKHRuKSBjb25kcy5wdXNoKHsgdGFnTmFtZTogdG4sIHR5cGU6IHR5IHx8IHVuZGVmaW5lZCB9KTtcbiAgICB9XG4gICAgY29uc3QgZnAgPSBgdGFnfCR7cm9sZX18JHtwYXJlbnQgPz8gJyd9fCR7Y29uZHMubWFwKChjKSA9PiBgJHtjLnRhZ05hbWV9OiR7Yy50eXBlIHx8ICcnfWApLmpvaW4oJywnKX1gO1xuICAgIHJlc3VsdC50YWdSdWxlcy5wdXNoKHtcbiAgICAgIGZpbmdlcnByaW50OiBmcCwgcm9sZSwgcGFyZW50LFxuICAgICAgZGVzY3JpcHRpb246IGNvbmRzLm1hcCgoYykgPT4gYCR7Yy50YWdOYW1lfSR7Yy50eXBlID8gJyB0eXBlPScgKyBjLnR5cGUgOiAnJ31gKS5qb2luKCcgXHUwMEI3ICcpLFxuICAgICAgcmF3OiBibG9jayxcbiAgICAgIGNvbmRzOiBjb25kcy5tYXAoKGMpID0+ICh7IHRhZ05hbWU6IGMudGFnTmFtZSwgdHlwZTogYy50eXBlIHx8ICcnIH0pKSxcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAoY29uc3QgYmxvY2sgb2YgZXh0cmFjdEJsb2NrcyhhdHRycykpIHtcbiAgICBjb25zdCByb2xlID0gTnVtYmVyKGF0dHIoJ0N1cnJlbnRSb2xlJywgYmxvY2spIHx8IDApO1xuICAgIGNvbnN0IHBhcmVudCA9IGF0dHIoJ1BhcmVudFJvbGUnLCBibG9jaykgPT09ICcnIHx8IGF0dHIoJ1BhcmVudFJvbGUnLCBibG9jaykgPT09IG51bGwgPyBudWxsIDogTnVtYmVyKGF0dHIoJ1BhcmVudFJvbGUnLCBibG9jaykpO1xuICAgIGNvbnN0IG0gPSBibG9jay5tYXRjaCgvPENvbmRpdGlvblxcYihbXj5dKilcXC8/Pi8pO1xuICAgIGNvbnN0IGMgPSBtID8gbVsxXSA6ICcnO1xuICAgIGNvbnN0IG9wZXJhdG9yID0gYXR0cignT3BlcmF0b3InLCBgPHggJHtjfS8+YCkgfHwgJ2NvbnRhaW5zJztcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSAoYy5tYXRjaCgvXFxzKFthLXpBLVotXSspPVwiXFx8Lyk/LlsxXSkgfHwgJ2NsYXNzTmFtZSc7XG4gICAgY29uc3QgcmF3VmFsdWVzID0gYy5tYXRjaCgvPVwiXFx8KFtefF0qXFx8W158XSopXFx8P1wiLyk/LlsxXSB8fCAnJztcbiAgICBjb25zdCB2YWx1ZXMgPSByYXdWYWx1ZXMuc3BsaXQoJ3wnKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgY29uc3QgZnAgPSBgYXR0cnwke3JvbGV9fCR7cGFyZW50ID8/ICcnfXwke2F0dHJpYnV0ZX18JHtvcGVyYXRvcn18JHtbLi4udmFsdWVzXS5zb3J0KCkuam9pbignfCcpfWA7XG4gICAgcmVzdWx0LmF0dHJSdWxlcy5wdXNoKHsgZmluZ2VycHJpbnQ6IGZwLCByb2xlLCBwYXJlbnQsIGRlc2NyaXB0aW9uOiBgJHthdHRyaWJ1dGV9ICR7b3BlcmF0b3J9YCwgcmF3OiBibG9jaywgdmFsdWVzIH0pO1xuICB9XG5cbiAgZm9yIChjb25zdCBibG9jayBvZiBleHRyYWN0QmxvY2tzKHRyYXZlcnNlKSkge1xuICAgIGNvbnN0IHJvbGUgPSBOdW1iZXIoYXR0cignQ3VycmVudFJvbGUnLCBibG9jaykgfHwgMCk7XG4gICAgY29uc3QgcGFyZW50ID0gYXR0cignUGFyZW50Um9sZScsIGJsb2NrKSA9PT0gJycgfHwgYXR0cignUGFyZW50Um9sZScsIGJsb2NrKSA9PT0gbnVsbCA/IG51bGwgOiBOdW1iZXIoYXR0cignUGFyZW50Um9sZScsIGJsb2NrKSk7XG4gICAgY29uc3QgY29uZCA9IGJsb2NrLm1hdGNoKC88Q3VycmVudEluZm8+KFtcXHNcXFNdKj8pPFxcL0N1cnJlbnRJbmZvPi8pO1xuICAgIGNvbnN0IGNvbmRTcmMgPSBjb25kID8gY29uZFsxXSA6ICcnO1xuICAgIGNvbnN0IHBhdGhzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHBhdGhSZSA9IC88UGF0aCBQYXRoPVwiKFteXCJdKylcIj4oW1xcc1xcU10qPyk8XFwvUGF0aD4vZztcbiAgICBsZXQgcG06IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGw7XG4gICAgd2hpbGUgKChwbSA9IHBhdGhSZS5leGVjKGJsb2NrKSkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGlubmVyID0gcG1bMl07XG4gICAgICBjb25zdCBvcCA9IGF0dHIoJ09wZXJhdG9yJywgaW5uZXIpIHx8ICdzaW1wbGUnO1xuICAgICAgY29uc3QgYXQgPSBpbm5lci5tYXRjaCgvPEF0dHJpYnV0ZXNcXGIoW14+XSopXFwvPz4vKTtcbiAgICAgIHBhdGhzLnB1c2goYCR7cG1bMV19OiR7b3B9OiR7YXQgPyBhdFsxXS50cmltKCkgOiAnJ31gKTtcbiAgICB9XG4gICAgY29uc3QgZnAgPSBgdHJhdmVyc2FsfCR7cm9sZX18JHtwYXJlbnQgPz8gJyd9fCR7Y29uZFNyYy5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpfXwke3BhdGhzLmpvaW4oJz4nKX1gO1xuICAgIHJlc3VsdC50cmF2ZXJzYWxSdWxlcy5wdXNoKHsgZmluZ2VycHJpbnQ6IGZwLCByb2xlLCBwYXJlbnQsIGRlc2NyaXB0aW9uOiBgJHtyb2xlfSB2aWEgJHtwYXRocy5qb2luKCcgXHUyMTkyICcpfWAsIHJhdzogYmxvY2sgfSk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGJsb2NrIG9mIGV4dHJhY3RCbG9ja3Moc3RhbmRhcmQpKSB7XG4gICAgY29uc3QgaWQgPSBhdHRyKCdJZCcsIGJsb2NrKSB8fCAnJztcbiAgICBjb25zdCBtID0gYmxvY2subWF0Y2goLzxBdHRyaWJ1dGVzXFxiKFtePl0qKVxcLz8+Lyk7XG4gICAgY29uc3QgYyA9IG0gPyBtWzFdIDogJyc7XG4gICAgY29uc3QgZnJvbSA9IGF0dHIoJ0Zyb20nLCBgPHggJHtjfS8+YCkgfHwgJyc7XG4gICAgY29uc3QgdG8gPSBhdHRyKCdUbycsIGA8eCAke2N9Lz5gKSB8fCAnJztcbiAgICBjb25zdCBvcCA9IGF0dHIoJ09wZXJhdG9yJywgYDx4ICR7Y30vPmApIHx8ICcnO1xuICAgIHJlc3VsdC5zdGFuZGFyZFJ1bGVzLnB1c2goeyBmaW5nZXJwcmludDogYHNsfCR7ZnJvbX18JHt0b318JHtvcH1gLCBkZXNjcmlwdGlvbjogYCR7ZnJvbX0gXHUyMTkyICR7dG99ICgke29wfSlgLCByYXc6IGJsb2NrIH0pO1xuICAgIHZvaWQgaWQ7XG4gIH1cblxuICBmb3IgKGNvbnN0IGJsb2NrIG9mIGV4dHJhY3RCbG9ja3ModHJhdmVyc2VMYWJlbCkpIHtcbiAgICBjb25zdCBtID0gYmxvY2subWF0Y2goLzxXaGVuVG9Db25zaWRlclxcYihbXj5dKilcXC8/Pi8pO1xuICAgIGNvbnN0IHJvbGUgPSBOdW1iZXIoYXR0cignUm9sZScsIGA8eCAke20gPyBtWzFdIDogJyd9Lz5gKSB8fCAwKTtcbiAgICBjb25zdCBwYXRoczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBwYXRoUmUgPSAvPFBhdGggUGF0aD1cIihbXlwiXSspXCI+KFtcXHNcXFNdKj8pPFxcL1BhdGg+L2c7XG4gICAgbGV0IHBtOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsO1xuICAgIHdoaWxlICgocG0gPSBwYXRoUmUuZXhlYyhibG9jaykpICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBvcCA9IGF0dHIoJ09wZXJhdG9yJywgcG1bMl0pIHx8ICdzaW1wbGUnO1xuICAgICAgY29uc3QgYXQgPSBwbVsyXS5tYXRjaCgvPEF0dHJpYnV0ZXNcXGIoW14+XSopXFwvPz4vKTtcbiAgICAgIHBhdGhzLnB1c2goYCR7cG1bMV19OiR7b3B9OiR7YXQgPyBhdFsxXS50cmltKCkgOiAnJ31gKTtcbiAgICB9XG4gICAgY29uc3QgbWV0aG9kID0gYmxvY2subWF0Y2goLzxNZXRob2QgTmFtZT1cIihbXlwiXSopXCIvKT8uWzFdIHx8ICdpbm5lclRleHQnO1xuICAgIHJlc3VsdC50cmF2ZXJzZUxhYmVsUnVsZXMucHVzaCh7XG4gICAgICBmaW5nZXJwcmludDogYHRsfCR7cm9sZX18JHttID8gbVsxXS50cmltKCkgOiAnJ318JHtwYXRocy5qb2luKCc+Jyl9fCR7bWV0aG9kfWAsXG4gICAgICByb2xlLCBkZXNjcmlwdGlvbjogYHJvbGUgJHtyb2xlfSB2aWEgJHtwYXRocy5qb2luKCcgXHUyMTkyICcpfWAsIHJhdzogYmxvY2ssXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZpbmdlcnByaW50cyBmb3IgZ2VuZXJhdGVkIHJ1bGVzIChtdXN0IG1hdGNoIHBhcnNlRXhpc3RpbmdSdWxlcylcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiB0YWdGaW5nZXJwcmludChyOiBUYWdSdWxlKTogc3RyaW5nIHtcbiAgY29uc3QgY29uZHMgPSByLmNvbmRpdGlvbnMubWFwKChjKSA9PiBgJHtjLnRhZ05hbWV9OiR7Yy50eXBlIHx8ICcnfWApLmpvaW4oJywnKTtcbiAgcmV0dXJuIGB0YWd8JHtyLmN1cnJlbnRSb2xlfXwke3IucGFyZW50Um9sZSA/PyAnJ318JHtjb25kc31gO1xufVxuXG5mdW5jdGlvbiBhdHRyRmluZ2VycHJpbnQocjogQXR0cmlidXRlUnVsZSk6IHN0cmluZyB7XG4gIHJldHVybiBgYXR0cnwke3IuY3VycmVudFJvbGV9fCR7ci5wYXJlbnRSb2xlID8/ICcnfXwke3IuYXR0cmlidXRlfXwke3Iub3BlcmF0b3J9fCR7Wy4uLnIudmFsdWVzXS5zb3J0KCkuam9pbignfCcpfWA7XG59XG5cbmZ1bmN0aW9uIHRyYXZlcnNhbEZpbmdlcnByaW50KHI6IFRyYXZlcnNhbFJ1bGUpOiBzdHJpbmcge1xuICBjb25zdCBjb25kID0gW1xuICAgIHIuY29uZGl0aW9uLnRhZ05hbWUgPyBgVGFnTmFtZT1cIiR7ci5jb25kaXRpb24udGFnTmFtZX1cImAgOiAnJyxcbiAgICByLmNvbmRpdGlvbi50eXBlID8gYFR5cGU9XCIke3IuY29uZGl0aW9uLnR5cGV9XCJgIDogJycsXG4gICAgci5jb25kaXRpb24uY2xhc3NOYW1lID8gYGNsYXNzTmFtZT1cIiR7ci5jb25kaXRpb24uY2xhc3NOYW1lfVwiYCA6ICcnLFxuICAgIHIuY29uZGl0aW9uLmF0dHJpYnV0ZSA/IGAke3IuY29uZGl0aW9uLmF0dHJpYnV0ZX09XCIke3IuY29uZGl0aW9uLnZhbHVlIHx8ICcnfVwiYCA6ICcnLFxuICBdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyk7XG4gIGNvbnN0IHBhdGhzID0gci5wYXRocy5tYXAoKHApID0+IHtcbiAgICBjb25zdCBhdCA9IE9iamVjdC5lbnRyaWVzKHAuYXR0cmlidXRlcykubWFwKChbaywgdl0pID0+IGAke2t9PVwiJHt2fVwiYCkuam9pbignICcpO1xuICAgIHJldHVybiBgJHtwLnBhdGh9OiR7cC5vcGVyYXRvcn06JHthdH1gO1xuICB9KS5qb2luKCc+Jyk7XG4gIHJldHVybiBgdHJhdmVyc2FsfCR7ci5jdXJyZW50Um9sZX18JHtyLnBhcmVudFJvbGUgPz8gJyd9fCR7Y29uZH18JHtwYXRoc31gO1xufVxuXG5mdW5jdGlvbiBzdGFuZGFyZEZpbmdlcnByaW50KHI6IHsgZnJvbTogc3RyaW5nOyB0bzogc3RyaW5nOyBvcGVyYXRvcjogc3RyaW5nIH0pOiBzdHJpbmcge1xuICByZXR1cm4gYHNsfCR7ci5mcm9tfXwke3IudG99fCR7ci5vcGVyYXRvcn1gO1xufVxuXG5mdW5jdGlvbiBsYWJlbFRyYXZlcnNhbEZpbmdlcnByaW50KHI6IFRyYXZlcnNlTGFiZWxSdWxlKTogc3RyaW5nIHtcbiAgY29uc3QgYXR0cnMgPSBPYmplY3QuZW50cmllcyhyLmF0dHJpYnV0ZXMpLm1hcCgoW2ssIHZdKSA9PiBgJHtrfT1cIiR7dn1cImApLmpvaW4oJyAnKTtcbiAgY29uc3QgcGF0aHMgPSByLnBhdGhzLm1hcCgocCkgPT4ge1xuICAgIGNvbnN0IGF0ID0gT2JqZWN0LmVudHJpZXMocC5hdHRyaWJ1dGVzKS5tYXAoKFtrLCB2XSkgPT4gYCR7a309XCIke3Z9XCJgKS5qb2luKCcgJyk7XG4gICAgcmV0dXJuIGAke3AucGF0aH06JHtwLm9wZXJhdG9yfToke2F0fWA7XG4gIH0pLmpvaW4oJz4nKTtcbiAgcmV0dXJuIGB0bHwke3Iucm9sZX18JHthdHRyc318JHtwYXRoc318JHtyLm1ldGhvZH1gO1xufVxuXG4vKiogVHlwZSB0b2tlbiBsaXN0IGZyb20gYSBwaXBlIHN0cmluZywgZS5nLiBcInxURVhUfFBBU1NXT1JEfFwiIFx1MjE5MiBbXCJURVhUXCIsXCJQQVNTV09SRFwiXS4gKi9cbmZ1bmN0aW9uIHR5cGVUb2tlbnMocGlwZUxpc3Q6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIHBpcGVMaXN0LnNsaWNlKDEsIC0xKS5zcGxpdCgnfCcpLmZpbHRlcihCb29sZWFuKTtcbn1cblxuLyoqIFRydWUgd2hlbiBhbiBleGlzdGluZyB0YWcgcnVsZSBhbHJlYWR5IGNvdmVycyBhIGdlbmVyYXRlZCB0YWcgcnVsZVxuICogIChzYW1lIHJvbGUvcGFyZW50LCBldmVyeSBnZW5lcmF0ZWQgY29uZGl0aW9uIG1hdGNoZWQgYnkgdGFnTmFtZSBhbmQgYVxuICogIHR5cGUgbGlzdCB0aGF0IGluY2x1ZGVzIHRoZSBnZW5lcmF0ZWQgdHlwZSkuICovXG5mdW5jdGlvbiBleGlzdGluZ1RhZ0NvdmVycyhcbiAgZXhpc3Rpbmc6IEV4aXN0aW5nUnVsZXNbJ3RhZ1J1bGVzJ10sXG4gIGdlbjogVGFnUnVsZVxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBleGlzdGluZy5zb21lKChlKSA9PiB7XG4gICAgaWYgKGUucm9sZSAhPT0gZ2VuLmN1cnJlbnRSb2xlIHx8IChlLnBhcmVudCA/PyBudWxsKSAhPT0gKGdlbi5wYXJlbnRSb2xlID8/IG51bGwpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGdlbi5jb25kaXRpb25zLmV2ZXJ5KChnYykgPT5cbiAgICAgIGUuY29uZHMuc29tZSgoZWMpID0+IHtcbiAgICAgICAgaWYgKGVjLnRhZ05hbWUgIT09IGdjLnRhZ05hbWUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCFnYy50eXBlKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKCFlYy50eXBlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IGdlblR5cGVzID0gdHlwZVRva2VucyhnYy50eXBlKTtcbiAgICAgICAgY29uc3QgZXhUeXBlcyA9IHR5cGVUb2tlbnMoZWMudHlwZSk7XG4gICAgICAgIHJldHVybiBnZW5UeXBlcy5ldmVyeSgodCkgPT4gZXhUeXBlcy5pbmNsdWRlcyh0KSk7XG4gICAgICB9KVxuICAgICk7XG4gIH0pO1xufVxuXG4vKiogVHJ1ZSB3aGVuIGFuIGV4aXN0aW5nIGF0dHJpYnV0ZSBydWxlIGNvdmVycyBhIGdlbmVyYXRlZCBvbmUgKHNhbWUgcm9sZS9wYXJlbnQvXG4gKiAgYXR0cmlidXRlL29wZXJhdG9yIGFuZCBhbGwgZ2VuZXJhdGVkIHZhbHVlcyBwcmVzZW50IGluIHRoZSBleGlzdGluZyB2YWx1ZXMpLiAqL1xuZnVuY3Rpb24gZXhpc3RpbmdBdHRyQ292ZXJzKFxuICBleGlzdGluZzogRXhpc3RpbmdSdWxlc1snYXR0clJ1bGVzJ10sXG4gIGdlbjogQXR0cmlidXRlUnVsZVxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBleGlzdGluZy5zb21lKChlKSA9PlxuICAgIGUucm9sZSA9PT0gZ2VuLmN1cnJlbnRSb2xlICYmIChlLnBhcmVudCA/PyBudWxsKSA9PT0gKGdlbi5wYXJlbnRSb2xlID8/IG51bGwpICYmXG4gICAgZS52YWx1ZXMubGVuZ3RoID4gMCAmJiBnZW4udmFsdWVzLmV2ZXJ5KCh2KSA9PiBlLnZhbHVlcy5pbmNsdWRlcyh2KSlcbiAgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBDb21wYXJlXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVSdWxlcyhtb2RlbDogUnVsZU1vZGVsLCBleGlzdGluZzogRXhpc3RpbmdSdWxlcyk6IENvbXBhcmVSZXN1bHQge1xuICBjb25zdCByZXN1bHQ6IENvbXBhcmVSZXN1bHQgPSB7IG5ld1J1bGVzOiBbXSwgbW9kaWZpZWRSdWxlczogW10sIGR1cGxpY2F0ZVJ1bGVzOiBbXSwgb2Jzb2xldGVSdWxlczogW10sIG1hdGNoZWQ6IDAgfTtcblxuICBjb25zdCBleGlzdGluZ1RyYXZlcnNhbCA9IG5ldyBNYXAoZXhpc3RpbmcudHJhdmVyc2FsUnVsZXMubWFwKChyKSA9PiBbci5maW5nZXJwcmludCwgcl0pKTtcbiAgY29uc3QgZXhpc3RpbmdTdGQgPSBuZXcgTWFwKGV4aXN0aW5nLnN0YW5kYXJkUnVsZXMubWFwKChyKSA9PiBbci5maW5nZXJwcmludCwgcl0pKTtcbiAgY29uc3QgZXhpc3RpbmdUbCA9IG5ldyBNYXAoZXhpc3RpbmcudHJhdmVyc2VMYWJlbFJ1bGVzLm1hcCgocikgPT4gW3IuZmluZ2VycHJpbnQsIHJdKSk7XG5cbiAgY29uc3QgdG9Db21wYXJlID0gKGtpbmQ6ICd0YWcnIHwgJ2F0dHJpYnV0ZScgfCAndHJhdmVyc2FsJyB8ICdsYWJlbC1zdGFuZGFyZCcgfCAnbGFiZWwtdHJhdmVyc2UnLCByb2xlOiBudW1iZXIsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIGZpbmdlcnByaW50OiBzdHJpbmcsIGluRzogYm9vbGVhbiwgaW5FOiBib29sZWFuKSA9PiAoe1xuICAgIGtpbmQsIHJvbGUsIGRlc2NyaXB0aW9uLCBmaW5nZXJwcmludCwgaW5HZW5lcmF0ZWQ6IGluRywgaW5FeGlzdGluZzogaW5FLFxuICB9KTtcblxuICBmb3IgKGNvbnN0IHIgb2YgbW9kZWwuYmFzZWRPblRhZ3MpIHtcbiAgICBjb25zdCBmcCA9IHRhZ0ZpbmdlcnByaW50KHIpO1xuICAgIGNvbnN0IGNvdmVyZWQgPSBleGlzdGluZ1RhZ0NvdmVycyhleGlzdGluZy50YWdSdWxlcywgcik7XG4gICAgaWYgKGNvdmVyZWQpIHsgcmVzdWx0LmR1cGxpY2F0ZVJ1bGVzLnB1c2godG9Db21wYXJlKCd0YWcnLCByLmN1cnJlbnRSb2xlLCBgcm9sZSAke3IuY3VycmVudFJvbGV9OiAke3IuY29uZGl0aW9ucy5tYXAoKGMpID0+IGMudGFnTmFtZSArIChjLnR5cGUgPyAnICcgKyBjLnR5cGUgOiAnJykpLmpvaW4oJywgJyl9YCwgZnAsIHRydWUsIHRydWUpKTsgcmVzdWx0Lm1hdGNoZWQrKzsgfVxuICAgIGVsc2UgcmVzdWx0Lm5ld1J1bGVzLnB1c2godG9Db21wYXJlKCd0YWcnLCByLmN1cnJlbnRSb2xlLCBgcm9sZSAke3IuY3VycmVudFJvbGV9OiAke3IuY29uZGl0aW9ucy5tYXAoKGMpID0+IGMudGFnTmFtZSArIChjLnR5cGUgPyAnICcgKyBjLnR5cGUgOiAnJykpLmpvaW4oJywgJyl9YCwgZnAsIHRydWUsIGZhbHNlKSk7XG4gIH1cbiAgZm9yIChjb25zdCByIG9mIG1vZGVsLmJhc2VkT25BdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgZnAgPSBhdHRyRmluZ2VycHJpbnQocik7XG4gICAgY29uc3QgY292ZXJlZCA9IGV4aXN0aW5nQXR0ckNvdmVycyhleGlzdGluZy5hdHRyUnVsZXMsIHIpO1xuICAgIGNvbnN0IGRlc2MgPSBgcm9sZSAke3IuY3VycmVudFJvbGV9OiAke3IuYXR0cmlidXRlfSAke3Iub3BlcmF0b3J9IHwke3IudmFsdWVzLmpvaW4oJ3wnKX18YDtcbiAgICBpZiAoY292ZXJlZCkgeyByZXN1bHQuZHVwbGljYXRlUnVsZXMucHVzaCh0b0NvbXBhcmUoJ2F0dHJpYnV0ZScsIHIuY3VycmVudFJvbGUsIGRlc2MsIGZwLCB0cnVlLCB0cnVlKSk7IHJlc3VsdC5tYXRjaGVkKys7IH1cbiAgICBlbHNlIHJlc3VsdC5uZXdSdWxlcy5wdXNoKHRvQ29tcGFyZSgnYXR0cmlidXRlJywgci5jdXJyZW50Um9sZSwgZGVzYywgZnAsIHRydWUsIGZhbHNlKSk7XG4gIH1cbiAgZm9yIChjb25zdCByIG9mIG1vZGVsLmJhc2VkT25UcmF2ZXJzZUxvZ2ljKSB7XG4gICAgY29uc3QgZnAgPSB0cmF2ZXJzYWxGaW5nZXJwcmludChyKTtcbiAgICBjb25zdCBleGlzdHMgPSBleGlzdGluZ1RyYXZlcnNhbC5oYXMoZnApO1xuICAgIGNvbnN0IGRlc2MgPSBgcm9sZSAke3IuY3VycmVudFJvbGV9OiB0cmF2ZXJzZSAke3IucGF0aHMubWFwKChwKSA9PiBwLnBhdGgpLmpvaW4oJyBcdTIxOTIgJyl9YDtcbiAgICBpZiAoZXhpc3RzKSB7IHJlc3VsdC5kdXBsaWNhdGVSdWxlcy5wdXNoKHRvQ29tcGFyZSgndHJhdmVyc2FsJywgci5jdXJyZW50Um9sZSwgZGVzYywgZnAsIHRydWUsIHRydWUpKTsgcmVzdWx0Lm1hdGNoZWQrKzsgfVxuICAgIGVsc2UgcmVzdWx0Lm5ld1J1bGVzLnB1c2godG9Db21wYXJlKCd0cmF2ZXJzYWwnLCByLmN1cnJlbnRSb2xlLCBkZXNjLCBmcCwgdHJ1ZSwgZmFsc2UpKTtcbiAgfVxuICBmb3IgKGNvbnN0IHIgb2YgbW9kZWwuc3RhbmRhcmRMb2dpYykge1xuICAgIGNvbnN0IGZwID0gc3RhbmRhcmRGaW5nZXJwcmludChyKTtcbiAgICBjb25zdCBleGlzdHMgPSBleGlzdGluZ1N0ZC5oYXMoZnApO1xuICAgIGlmIChleGlzdHMpIHsgcmVzdWx0LmR1cGxpY2F0ZVJ1bGVzLnB1c2godG9Db21wYXJlKCdsYWJlbC1zdGFuZGFyZCcsIDAsIGAke3IuZnJvbX0gXHUyMTkyICR7ci50b31gLCBmcCwgdHJ1ZSwgdHJ1ZSkpOyByZXN1bHQubWF0Y2hlZCsrOyB9XG4gICAgZWxzZSByZXN1bHQubmV3UnVsZXMucHVzaCh0b0NvbXBhcmUoJ2xhYmVsLXN0YW5kYXJkJywgMCwgYCR7ci5mcm9tfSBcdTIxOTIgJHtyLnRvfWAsIGZwLCB0cnVlLCBmYWxzZSkpO1xuICB9XG4gIGZvciAoY29uc3QgciBvZiBtb2RlbC50cmF2ZXJzZUxvZ2ljKSB7XG4gICAgY29uc3QgZnAgPSBsYWJlbFRyYXZlcnNhbEZpbmdlcnByaW50KHIpO1xuICAgIGNvbnN0IGV4aXN0cyA9IGV4aXN0aW5nVGwuaGFzKGZwKTtcbiAgICBjb25zdCBkZXNjID0gYHJvbGUgJHtyLnJvbGV9OiAke3IucGF0aHMubWFwKChwKSA9PiBwLnBhdGgpLmpvaW4oJyBcdTIxOTIgJyl9YDtcbiAgICBpZiAoZXhpc3RzKSB7IHJlc3VsdC5kdXBsaWNhdGVSdWxlcy5wdXNoKHRvQ29tcGFyZSgnbGFiZWwtdHJhdmVyc2UnLCByLnJvbGUsIGRlc2MsIGZwLCB0cnVlLCB0cnVlKSk7IHJlc3VsdC5tYXRjaGVkKys7IH1cbiAgICBlbHNlIHJlc3VsdC5uZXdSdWxlcy5wdXNoKHRvQ29tcGFyZSgnbGFiZWwtdHJhdmVyc2UnLCByLnJvbGUsIGRlc2MsIGZwLCB0cnVlLCBmYWxzZSkpO1xuICB9XG5cbiAgLy8gTW9kaWZpZWQ6IHNhbWUgKGtpbmQsIHJvbGUsIHBhcmVudCkgYnV0IGRpZmZlcmVudCBmaW5nZXJwcmludCBcdTIwMTQgdGhlIGV4aXN0aW5nXG4gIC8vIHJ1bGUgZm9yIHRoYXQgcm9sZSB3YXMgc3VwZXJzZWRlZCBieSBhIGRpZmZlcmVudCAoc3Ryb25nZXIpIGdlbmVyYXRlZCBydWxlLlxuICBjb25zdCBhdHRyU3VwZXJzZWRlZCA9IChyb2xlOiBudW1iZXIsIHBhcmVudDogbnVtYmVyIHwgbnVsbCkgPT5cbiAgICBtb2RlbC5iYXNlZE9uVGFncy5zb21lKChnKSA9PiBnLmN1cnJlbnRSb2xlID09PSByb2xlICYmIChnLnBhcmVudFJvbGUgPz8gbnVsbCkgPT09IHBhcmVudCkgfHxcbiAgICBtb2RlbC5iYXNlZE9uVHJhdmVyc2VMb2dpYy5zb21lKChnKSA9PiBnLmN1cnJlbnRSb2xlID09PSByb2xlICYmIChnLnBhcmVudFJvbGUgPz8gbnVsbCkgPT09IHBhcmVudCk7XG5cbiAgLy8gT2Jzb2xldGU6IGV4aXN0aW5nIHJ1bGVzIHdob3NlIChraW5kLCByb2xlLCBwYXJlbnQpIGlzIGFic2VudCBmcm9tIGdlbmVyYXRlZC5cbiAgZm9yIChjb25zdCByIG9mIGV4aXN0aW5nLnRhZ1J1bGVzKSB7XG4gICAgaWYgKCFtb2RlbC5iYXNlZE9uVGFncy5zb21lKChnKSA9PiBnLmN1cnJlbnRSb2xlID09PSByLnJvbGUgJiYgKGcucGFyZW50Um9sZSA/PyBudWxsKSA9PT0gci5wYXJlbnQpKSB7XG4gICAgICByZXN1bHQub2Jzb2xldGVSdWxlcy5wdXNoKHRvQ29tcGFyZSgndGFnJywgci5yb2xlLCBgcm9sZSAke3Iucm9sZX06ICR7ci5kZXNjcmlwdGlvbn1gLCByLmZpbmdlcnByaW50LCBmYWxzZSwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IHIgb2YgZXhpc3RpbmcuYXR0clJ1bGVzKSB7XG4gICAgaWYgKGF0dHJTdXBlcnNlZGVkKHIucm9sZSwgci5wYXJlbnQpKSB7XG4gICAgICByZXN1bHQubW9kaWZpZWRSdWxlcy5wdXNoKHRvQ29tcGFyZSgnYXR0cmlidXRlJywgci5yb2xlLCBgcm9sZSAke3Iucm9sZX06ICR7ci5kZXNjcmlwdGlvbn0gKHN1cGVyc2VkZWQgYnkgYSB0YWcvdHJhdmVyc2FsIHJ1bGUpYCwgci5maW5nZXJwcmludCwgZmFsc2UsIHRydWUpKTtcbiAgICB9IGVsc2UgaWYgKCFtb2RlbC5iYXNlZE9uQXR0cmlidXRlcy5zb21lKChnKSA9PiBnLmN1cnJlbnRSb2xlID09PSByLnJvbGUgJiYgKGcucGFyZW50Um9sZSA/PyBudWxsKSA9PT0gci5wYXJlbnQpKSB7XG4gICAgICByZXN1bHQub2Jzb2xldGVSdWxlcy5wdXNoKHRvQ29tcGFyZSgnYXR0cmlidXRlJywgci5yb2xlLCBgcm9sZSAke3Iucm9sZX06ICR7ci5kZXNjcmlwdGlvbn1gLCByLmZpbmdlcnByaW50LCBmYWxzZSwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IHIgb2YgZXhpc3RpbmcudHJhdmVyc2FsUnVsZXMpIHtcbiAgICBpZiAoIW1vZGVsLmJhc2VkT25UcmF2ZXJzZUxvZ2ljLnNvbWUoKGcpID0+IGcuY3VycmVudFJvbGUgPT09IHIucm9sZSAmJiAoZy5wYXJlbnRSb2xlID8/IG51bGwpID09PSByLnBhcmVudCkpIHtcbiAgICAgIHJlc3VsdC5vYnNvbGV0ZVJ1bGVzLnB1c2godG9Db21wYXJlKCd0cmF2ZXJzYWwnLCByLnJvbGUsIGByb2xlICR7ci5yb2xlfTogJHtyLmRlc2NyaXB0aW9ufWAsIHIuZmluZ2VycHJpbnQsIGZhbHNlLCB0cnVlKSk7XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgciBvZiBleGlzdGluZy5zdGFuZGFyZFJ1bGVzKSB7XG4gICAgaWYgKCFtb2RlbC5zdGFuZGFyZExvZ2ljLnNvbWUoKGcpID0+IGAke2cuZnJvbX18JHtnLnRvfXwke2cub3BlcmF0b3J9YCA9PT0gci5maW5nZXJwcmludC5zcGxpdCgnfCcpLnNsaWNlKDEpLmpvaW4oJ3wnKSkpIHtcbiAgICAgIHJlc3VsdC5vYnNvbGV0ZVJ1bGVzLnB1c2godG9Db21wYXJlKCdsYWJlbC1zdGFuZGFyZCcsIDAsIHIuZGVzY3JpcHRpb24sIHIuZmluZ2VycHJpbnQsIGZhbHNlLCB0cnVlKSk7XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgciBvZiBleGlzdGluZy50cmF2ZXJzZUxhYmVsUnVsZXMpIHtcbiAgICBpZiAoIW1vZGVsLnRyYXZlcnNlTG9naWMuc29tZSgoZykgPT4gbGFiZWxUcmF2ZXJzYWxGaW5nZXJwcmludChnKSA9PT0gci5maW5nZXJwcmludCkpIHtcbiAgICAgIHJlc3VsdC5vYnNvbGV0ZVJ1bGVzLnB1c2godG9Db21wYXJlKCdsYWJlbC10cmF2ZXJzZScsIHIucm9sZSwgci5kZXNjcmlwdGlvbiwgci5maW5nZXJwcmludCwgZmFsc2UsIHRydWUpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE1lcmdlICh0ZXh0LWxldmVsLCBwcmVzZXJ2ZXMgZm9ybWF0dGluZyArIGNvbW1lbnRzKVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKiBSZW5kZXIgb25lIGdlbmVyYXRlZCB0YWcgcnVsZSBhcyBYTUwgdGV4dCAodXNlZCBieSBtZXJnZSkuICovXG5mdW5jdGlvbiByZW5kZXJUYWdCbG9jayhyOiBUYWdSdWxlKTogc3RyaW5nIHtcbiAgY29uc3QgcGFyZW50ID0gci5wYXJlbnRSb2xlID09PSBudWxsID8gJycgOiBTdHJpbmcoci5wYXJlbnRSb2xlKTtcbiAgY29uc3Qgb3V0OiBzdHJpbmdbXSA9IFtdO1xuICBvdXQucHVzaChgXFx0XFx0XFx0XFx0PFJ1bGUgRW5hYmxlPVwiMVwiIEN1cnJlbnRSb2xlPVwiJHtyLmN1cnJlbnRSb2xlfVwiIFBhcmVudFJvbGU9XCIke3BhcmVudH1cIj5gKTtcbiAgb3V0LnB1c2goYFxcdFxcdFxcdFxcdFxcdDxDdXJyZW50SW5mbz5gKTtcbiAgZm9yIChjb25zdCBjIG9mIHIuY29uZGl0aW9ucykgb3V0LnB1c2goYFxcdFxcdFxcdFxcdFxcdFxcdDxDb25kaXRpb24gVGFnTmFtZT1cIiR7Yy50YWdOYW1lfVwiJHtjLnR5cGUgPyBgIFR5cGU9XCIke2MudHlwZX1cImAgOiAnJ30vPmApO1xuICBvdXQucHVzaChgXFx0XFx0XFx0XFx0XFx0PC9DdXJyZW50SW5mbz5gKTtcbiAgb3V0LnB1c2goYFxcdFxcdFxcdFxcdDwvUnVsZT5gKTtcbiAgcmV0dXJuIG91dC5qb2luKCdcXG4nKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQXR0ckJsb2NrKHI6IEF0dHJpYnV0ZVJ1bGUpOiBzdHJpbmcge1xuICBjb25zdCBwYXJlbnQgPSByLnBhcmVudFJvbGUgPT09IG51bGwgPyAnJyA6IFN0cmluZyhyLnBhcmVudFJvbGUpO1xuICBjb25zdCB2YWx1ZXMgPSBgfCR7Wy4uLm5ldyBTZXQoci52YWx1ZXMpXS5qb2luKCd8Jyl9fGA7XG4gIHJldHVybiBbXG4gICAgYFxcdFxcdFxcdFxcdDxSdWxlIEVuYWJsZT1cIjFcIiBDdXJyZW50Um9sZT1cIiR7ci5jdXJyZW50Um9sZX1cIiBQYXJlbnRSb2xlPVwiJHtwYXJlbnR9XCI+YCxcbiAgICBgXFx0XFx0XFx0XFx0XFx0PEN1cnJlbnRJbmZvPmAsXG4gICAgYFxcdFxcdFxcdFxcdFxcdFxcdDxDb25kaXRpb24gT3BlcmF0b3I9XCIke3Iub3BlcmF0b3J9XCIgJHtyLmF0dHJpYnV0ZX09XCIke3ZhbHVlc31cIi8+YCxcbiAgICBgXFx0XFx0XFx0XFx0XFx0PC9DdXJyZW50SW5mbz5gLFxuICAgIGBcXHRcXHRcXHRcXHQ8L1J1bGU+YCxcbiAgXS5qb2luKCdcXG4nKTtcbn1cblxuLyoqXG4gKiBNZXJnZSBnZW5lcmF0ZWQgcnVsZXMgaW50byBhbiBleGlzdGluZyBJRUFkYXB0b3IueG1sIHN0cmluZy5cbiAqIE9ubHkgTkVXIHJ1bGVzIGFyZSBpbnNlcnRlZCAoZHVwbGljYXRlcyBza2lwcGVkKTsgZXhpc3RpbmcgZm9ybWF0dGluZyBhbmRcbiAqIGNvbW1lbnRzIGFyZSBwcmVzZXJ2ZWQgYnl0ZS1mb3ItYnl0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlWE1MKG1vZGVsOiBSdWxlTW9kZWwsIGV4aXN0aW5nWG1sOiBzdHJpbmcpOiB7IHhtbDogc3RyaW5nOyBhZGRlZDogbnVtYmVyIH0ge1xuICBjb25zdCBleGlzdGluZyA9IHBhcnNlRXhpc3RpbmdSdWxlcyhleGlzdGluZ1htbCk7XG4gIGNvbnN0IGV4aXN0aW5nVHJhdmVyc2FsID0gbmV3IFNldChleGlzdGluZy50cmF2ZXJzYWxSdWxlcy5tYXAoKHIpID0+IHIuZmluZ2VycHJpbnQpKTtcbiAgY29uc3QgZXhpc3RpbmdTdGQgPSBuZXcgU2V0KGV4aXN0aW5nLnN0YW5kYXJkUnVsZXMubWFwKChyKSA9PiByLmZpbmdlcnByaW50KSk7XG4gIGNvbnN0IGV4aXN0aW5nVGwgPSBuZXcgU2V0KGV4aXN0aW5nLnRyYXZlcnNlTGFiZWxSdWxlcy5tYXAoKHIpID0+IHIuZmluZ2VycHJpbnQpKTtcblxuICBsZXQgYWRkZWQgPSAwO1xuICBsZXQgeG1sID0gZXhpc3RpbmdYbWw7XG5cbiAgY29uc3QgaW5zZXJ0QmVmb3JlID0gKHhtbFN0cjogc3RyaW5nLCBzZWN0aW9uTmFtZTogc3RyaW5nLCBibG9ja3M6IHN0cmluZ1tdKTogc3RyaW5nID0+IHtcbiAgICBpZiAoYmxvY2tzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHhtbFN0cjtcbiAgICBjb25zdCBjbG9zZSA9IG5ldyBSZWdFeHAoYCg8XFxcXC8ke3NlY3Rpb25OYW1lfT4pYCk7XG4gICAgY29uc3QgbSA9IHhtbFN0ci5tYXRjaChjbG9zZSk7XG4gICAgaWYgKCFtIHx8IG0uaW5kZXggPT09IHVuZGVmaW5lZCkgcmV0dXJuIHhtbFN0cjtcbiAgICBjb25zdCBpbnNlcnRpb24gPSBibG9ja3Muam9pbignXFxuJykgKyAnXFxuJztcbiAgICBhZGRlZCArPSBibG9ja3MubGVuZ3RoO1xuICAgIHJldHVybiB4bWxTdHIuc2xpY2UoMCwgbS5pbmRleCkgKyBpbnNlcnRpb24gKyB4bWxTdHIuc2xpY2UobS5pbmRleCk7XG4gIH07XG5cbiAgLy8gQmFzZWRPblRhZ3MgXHUyMDE0IGNvdmVyYWdlLWF3YXJlOiBhbiBleGlzdGluZyBydWxlIGZvciB0aGUgc2FtZSAocm9sZSwgcGFyZW50KVxuICAvLyB0aGF0IGFscmVhZHkgbWF0Y2hlcyBldmVyeSBnZW5lcmF0ZWQgY29uZGl0aW9uIGlzIGEgZHVwbGljYXRlLlxuICBjb25zdCBuZXdUYWdzID0gbW9kZWwuYmFzZWRPblRhZ3MuZmlsdGVyKChyKSA9PiAhZXhpc3RpbmdUYWdDb3ZlcnMoZXhpc3RpbmcudGFnUnVsZXMsIHIpKS5tYXAocmVuZGVyVGFnQmxvY2spO1xuICB4bWwgPSBpbnNlcnRCZWZvcmUoeG1sLCAnQmFzZWRPblRhZ3MnLCBuZXdUYWdzKTtcblxuICAvLyBCYXNlZE9uQXR0cmlidXRlcyBcdTIwMTQgdmFsdWUtYXdhcmU6IGFuIGV4aXN0aW5nIHJ1bGUgd2l0aCB0aGUgc2FtZVxuICAvLyAocm9sZSwgcGFyZW50LCBhdHRyaWJ1dGUsIG9wZXJhdG9yKSB0aGF0IGFscmVhZHkgY292ZXJzIGFsbCBnZW5lcmF0ZWRcbiAgLy8gdmFsdWVzIGlzIGEgZHVwbGljYXRlOyBvdGhlcndpc2UgdGhlIHJ1bGUgaXMgYWRkZWQuXG4gIGNvbnN0IG5ld0F0dHJzID0gbW9kZWwuYmFzZWRPbkF0dHJpYnV0ZXMuZmlsdGVyKChyKSA9PiAhZXhpc3RpbmdBdHRyQ292ZXJzKGV4aXN0aW5nLmF0dHJSdWxlcywgcikpLm1hcChyZW5kZXJBdHRyQmxvY2spO1xuICB4bWwgPSBpbnNlcnRCZWZvcmUoeG1sLCAnQmFzZWRPbkF0dHJpYnV0ZXMnLCBuZXdBdHRycyk7XG5cbiAgLy8gQmFzZWRPblRyYXZlcnNlTG9naWMgXHUyMDE0IHJldXNlIHJlbmRlclRyYXZlcnNhbFJ1bGUgYXQgaW5kZW50IDQuXG4gIGNvbnN0IG5ld1RyYXZlcnNhbCA9IG1vZGVsLmJhc2VkT25UcmF2ZXJzZUxvZ2ljLmZpbHRlcigocikgPT4gIWV4aXN0aW5nVHJhdmVyc2FsLmhhcyh0cmF2ZXJzYWxGaW5nZXJwcmludChyKSkpO1xuICBjb25zdCB0cmF2ZXJzYWxCbG9ja3MgPSBuZXdUcmF2ZXJzYWwubWFwKChyKSA9PiByZW5kZXJUcmF2ZXJzYWxCbG9jayhyKSk7XG4gIHhtbCA9IGluc2VydEJlZm9yZSh4bWwsICdCYXNlZE9uVHJhdmVyc2VMb2dpYycsIHRyYXZlcnNhbEJsb2Nrcyk7XG5cbiAgLy8gU3RhbmRhcmRMb2dpY1xuICBjb25zdCBuZXdTdGQgPSBtb2RlbC5zdGFuZGFyZExvZ2ljLmZpbHRlcigocikgPT4gIWV4aXN0aW5nU3RkLmhhcyhzdGFuZGFyZEZpbmdlcnByaW50KHIpKSkubWFwKChyKSA9PiBgXFx0XFx0XFx0XFx0PFJ1bGUgSWQ9XCIke3IuaWR9XCI+XFxuXFx0XFx0XFx0XFx0XFx0PEF0dHJpYnV0ZXMgRnJvbT1cIiR7ci5mcm9tfVwiIFRvPVwiJHtyLnRvfVwiIE9wZXJhdG9yPVwiJHtyLm9wZXJhdG9yfVwiLz5cXG5cXHRcXHRcXHRcXHQ8L1J1bGU+YCk7XG4gIHhtbCA9IGluc2VydEJlZm9yZSh4bWwsICdTdGFuZGFyZExvZ2ljJywgbmV3U3RkKTtcblxuICAvLyBUcmF2ZXJzZUxvZ2ljIChsYWJlbHMpXG4gIGNvbnN0IG5ld1RsID0gbW9kZWwudHJhdmVyc2VMb2dpYy5maWx0ZXIoKHIpID0+ICFleGlzdGluZ1RsLmhhcyhsYWJlbFRyYXZlcnNhbEZpbmdlcnByaW50KHIpKSkubWFwKHJlbmRlclRyYXZlcnNlTGFiZWxCbG9jayk7XG4gIHhtbCA9IGluc2VydEJlZm9yZSh4bWwsICdUcmF2ZXJzZUxvZ2ljJywgbmV3VGwpO1xuXG4gIHJldHVybiB7IHhtbCwgYWRkZWQgfTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVHJhdmVyc2FsQmxvY2socjogVHJhdmVyc2FsUnVsZSk6IHN0cmluZyB7XG4gIGNvbnN0IHBhcmVudCA9IHIucGFyZW50Um9sZSA9PT0gbnVsbCA/ICcnIDogU3RyaW5nKHIucGFyZW50Um9sZSk7XG4gIGNvbnN0IG91dDogc3RyaW5nW10gPSBbXTtcbiAgb3V0LnB1c2goYFxcdFxcdFxcdFxcdDxSdWxlIEVuYWJsZT1cIjFcIiBDdXJyZW50Um9sZT1cIiR7ci5jdXJyZW50Um9sZX1cIiBQYXJlbnRSb2xlPVwiJHtwYXJlbnR9XCI+YCk7XG4gIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHQ8Q3VycmVudEluZm8+YCk7XG4gIGNvbnN0IGNvbmQgPSByLmNvbmRpdGlvbjtcbiAgaWYgKGNvbmQuY2xhc3NOYW1lKSBvdXQucHVzaChgXFx0XFx0XFx0XFx0XFx0XFx0PENvbmRpdGlvbiBjbGFzc05hbWU9XCIke2NvbmQuY2xhc3NOYW1lfVwiIE9wZXJhdG9yPVwiJHtjb25kLm9wZXJhdG9yIHx8ICdjb250YWlucyd9XCIvPmApO1xuICBlbHNlIGlmIChjb25kLnRhZ05hbWUpIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHRcXHQ8Q29uZGl0aW9uIFRhZ05hbWU9XCIke2NvbmQudGFnTmFtZX1cIi8+YCk7XG4gIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHQ8L0N1cnJlbnRJbmZvPmApO1xuICBvdXQucHVzaChgXFx0XFx0XFx0XFx0XFx0PFRyYXZlcnNhbEluZm8+YCk7XG4gIGZvciAoY29uc3QgcCBvZiByLnBhdGhzKSB7XG4gICAgb3V0LnB1c2goYFxcdFxcdFxcdFxcdFxcdFxcdDxQYXRoIFBhdGg9XCIke3AucGF0aH1cIj5gKTtcbiAgICBvdXQucHVzaChgXFx0XFx0XFx0XFx0XFx0XFx0XFx0PENvbmRpdGlvbiBPcGVyYXRvcj1cIiR7cC5vcGVyYXRvcn1cIj5gKTtcbiAgICBjb25zdCBhdHRycyA9IE9iamVjdC5lbnRyaWVzKHAuYXR0cmlidXRlcykubWFwKChbaywgdl0pID0+IGAke2t9PVwiJHt2fVwiYCkuam9pbignICcpO1xuICAgIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQ8QXR0cmlidXRlcyAke2F0dHJzfS8+YCk7XG4gICAgb3V0LnB1c2goYFxcdFxcdFxcdFxcdFxcdFxcdFxcdDwvQ29uZGl0aW9uPmApO1xuICAgIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHRcXHQ8L1BhdGg+YCk7XG4gIH1cbiAgb3V0LnB1c2goYFxcdFxcdFxcdFxcdFxcdDwvVHJhdmVyc2FsSW5mbz5gKTtcbiAgb3V0LnB1c2goYFxcdFxcdFxcdFxcdDwvUnVsZT5gKTtcbiAgcmV0dXJuIG91dC5qb2luKCdcXG4nKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVHJhdmVyc2VMYWJlbEJsb2NrKHI6IFRyYXZlcnNlTGFiZWxSdWxlKTogc3RyaW5nIHtcbiAgY29uc3QgcGFyZW50ID0gci5wYXJlbnRSb2xlID09PSBudWxsID8gJycgOiBTdHJpbmcoci5wYXJlbnRSb2xlKTtcbiAgY29uc3Qgb3V0OiBzdHJpbmdbXSA9IFtdO1xuICBvdXQucHVzaChgXFx0XFx0XFx0XFx0PFJ1bGUgSWQ9XCIke3IuaWR9XCIgRW5hYmxlPVwiMVwiPmApO1xuICBvdXQucHVzaChgXFx0XFx0XFx0XFx0XFx0PFdoZW5Ub0NvbnNpZGVyIFJvbGU9XCIke3Iucm9sZX1cIiBQYXJlbnRSb2xlPVwiJHtwYXJlbnR9XCI+YCk7XG4gIGNvbnN0IGF0dHJzID0gT2JqZWN0LmVudHJpZXMoci5hdHRyaWJ1dGVzKS5tYXAoKFtrLCB2XSkgPT4gYCR7a309XCIke3Z9XCJgKS5qb2luKCcgJyk7XG4gIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHRcXHQ8QXR0cmlidXRlcyAke2F0dHJzfS8+YCk7XG4gIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHQ8L1doZW5Ub0NvbnNpZGVyPmApO1xuICBvdXQucHVzaChgXFx0XFx0XFx0XFx0XFx0PFdoZXJlVG9Hbz5gKTtcbiAgZm9yIChjb25zdCBwIG9mIHIucGF0aHMpIHtcbiAgICBvdXQucHVzaChgXFx0XFx0XFx0XFx0XFx0XFx0PFBhdGggUGF0aD1cIiR7cC5wYXRofVwiPmApO1xuICAgIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHRcXHRcXHQ8Q29uZGl0aW9uIE9wZXJhdG9yPVwiJHtwLm9wZXJhdG9yfVwiPmApO1xuICAgIGNvbnN0IHBBdHRycyA9IE9iamVjdC5lbnRyaWVzKHAuYXR0cmlidXRlcykubWFwKChbaywgdl0pID0+IGAke2t9PVwiJHt2fVwiYCkuam9pbignICcpO1xuICAgIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQ8QXR0cmlidXRlcyAke3BBdHRyc30vPmApO1xuICAgIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHRcXHRcXHQ8L0NvbmRpdGlvbj5gKTtcbiAgICBvdXQucHVzaChgXFx0XFx0XFx0XFx0XFx0XFx0PC9QYXRoPmApO1xuICB9XG4gIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHQ8L1doZXJlVG9Hbz5gKTtcbiAgb3V0LnB1c2goYFxcdFxcdFxcdFxcdFxcdDxXaGF0VG9DYWxsPmApO1xuICBvdXQucHVzaChgXFx0XFx0XFx0XFx0XFx0XFx0PE1ldGhvZCBOYW1lPVwiJHtyLm1ldGhvZH1cIi8+YCk7XG4gIG91dC5wdXNoKGBcXHRcXHRcXHRcXHRcXHQ8L1doYXRUb0NhbGw+YCk7XG4gIG91dC5wdXNoKGBcXHRcXHRcXHRcXHQ8L1J1bGU+YCk7XG4gIHJldHVybiBvdXQuam9pbignXFxuJyk7XG59XG4iLCAiLyoqXG4gKiBsYWJlbEVuZ2luZS50cyBcdTIwMTQgTGFiZWwgaWRlbnRpZmljYXRpb24uXG4gKlxuICogRmluZHMgbGFiZWxzIGZvciBjb250cm9scyB1c2luZywgaW4gcHJpb3JpdHkgb3JkZXI6XG4gKiAgIGFyaWEtbGFiZWwgXHUyMTkyIGFyaWEtbGFiZWxsZWRieSBcdTIxOTIgbGFiZWxbZm9yPWlkXSBcdTIxOTIgcGFyZW50IDxsYWJlbD4gXHUyMTkyXG4gKiAgIHNpYmxpbmcgbGFiZWwgXHUyMTkyIG5lYXJlc3QgdGV4dCBub2RlIFx1MjE5MiB0YWJsZS1oZWFkZXIgYXNzb2NpYXRpb24gXHUyMTkyXG4gKiAgIGZvcm0tZ3JvdXAgYXNzb2NpYXRpb24uXG4gKlxuICogQWxzbyBidWlsZHMgdGhlIExhYmVsSWRlbnRpZmllciBydWxlcyAoU3RhbmRhcmRMb2dpYyArIFRyYXZlcnNlTG9naWMpIHRoYXRcbiAqIEVwaXBsZXggd2lsbCB1c2UgdG8gcmUtZGVyaXZlIGNvbnRyb2wgbmFtZXMgYXQgcnVudGltZS5cbiAqL1xuaW1wb3J0IHR5cGUge1xuICBEZXRlY3RlZENvbnRyb2wsXG4gIFJvbGVJZCxcbiAgU3RhbmRhcmRMYWJlbFJ1bGUsXG4gIFRyYXZlcnNhbFBhdGgsXG4gIFRyYXZlcnNlTGFiZWxSdWxlLFxufSBmcm9tICcuL3R5cGVzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBET00tbGV2ZWwgbGFiZWwgZGlzY292ZXJ5IChydW5zIGluIHRoZSBjb250ZW50IHNjcmlwdClcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgaW50ZXJmYWNlIExhYmVsUmVzdWx0IHtcbiAgdGV4dDogc3RyaW5nIHwgbnVsbDtcbiAgc3RyYXRlZ3k6IERldGVjdGVkQ29udHJvbFsnbGFiZWxTdHJhdGVneSddO1xufVxuXG4vKiogQ29sbGFwc2Ugd2hpdGVzcGFjZSBhbmQgY2FwIGxlbmd0aCAoRXBpcGxleCBjb250cm9sIG5hbWVzIGFyZSBzaG9ydCkuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5UZXh0KHQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCBudWxsIHtcbiAgaWYgKCF0KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgY2xlYW5lZCA9IHQucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKTtcbiAgaWYgKCFjbGVhbmVkKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNsZWFuZWQubGVuZ3RoID4gMTIwID8gY2xlYW5lZC5zbGljZSgwLCAxMjApICsgJ1x1MjAyNicgOiBjbGVhbmVkO1xufVxuXG5mdW5jdGlvbiBsYWJlbEZvcklkKGRvYzogRG9jdW1lbnQsIGlkOiBzdHJpbmcpOiBIVE1MTGFiZWxFbGVtZW50IHwgbnVsbCB7XG4gIHRyeSB7XG4gICAgY29uc3QgZXNjYXBlZCA9IHR5cGVvZiBDU1MgIT09ICd1bmRlZmluZWQnICYmIENTUy5lc2NhcGUgPyBDU1MuZXNjYXBlKGlkKSA6IGlkLnJlcGxhY2UoLyhbXmEtekEtWjAtOV8tXSkvZywgJ1xcXFwkMScpO1xuICAgIHJldHVybiBkb2MucXVlcnlTZWxlY3RvcihgbGFiZWxbZm9yPVwiJHtlc2NhcGVkfVwiXWApO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEZpbmQgdGhlIGJlc3QgbGFiZWwgZm9yIGFuIGVsZW1lbnQgdXNpbmcgYWxsIGRvY3VtZW50ZWQgc3RyYXRlZ2llcy5cbiAqIGBkb2NgIGlzIG9ubHkgdXNlZCBmb3IgbGFiZWxbZm9yXSBsb29rdXBzOyBldmVyeXRoaW5nIGVsc2UgaXMgbG9jYWwgRE9NLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZExhYmVsKGVsOiBFbGVtZW50LCBkb2M6IERvY3VtZW50KTogTGFiZWxSZXN1bHQge1xuICAvLyAxLiBhcmlhLWxhYmVsIChhdXRob3ItcHJvdmlkZWQsIGJlc3QpLlxuICBjb25zdCBhcmlhTGFiZWwgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcbiAgaWYgKGFyaWFMYWJlbCAmJiBhcmlhTGFiZWwudHJpbSgpKSB7XG4gICAgcmV0dXJuIHsgdGV4dDogY2xlYW5UZXh0KGFyaWFMYWJlbCksIHN0cmF0ZWd5OiAnYXJpYS1sYWJlbCcgfTtcbiAgfVxuXG4gIC8vIDIuIGFyaWEtbGFiZWxsZWRieSBcdTIxOTIgcmVmZXJlbmNlZCBlbGVtZW50IHRleHQuXG4gIGNvbnN0IGxhYmVsbGVkYnkgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScpO1xuICBpZiAobGFiZWxsZWRieSkge1xuICAgIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgaWQgb2YgbGFiZWxsZWRieS5zcGxpdCgvXFxzKy8pKSB7XG4gICAgICBjb25zdCByZWYgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKHJlZikge1xuICAgICAgICBjb25zdCB0ID0gY2xlYW5UZXh0KHJlZi50ZXh0Q29udGVudCk7XG4gICAgICAgIGlmICh0KSBwYXJ0cy5wdXNoKHQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFydHMubGVuZ3RoKSByZXR1cm4geyB0ZXh0OiBwYXJ0cy5qb2luKCcgJyksIHN0cmF0ZWd5OiAnYXJpYS1sYWJlbGxlZGJ5JyB9O1xuICB9XG5cbiAgLy8gMy4gbGFiZWxbZm9yPWlkXS5cbiAgY29uc3QgaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gIGlmIChpZCkge1xuICAgIGNvbnN0IGxhYiA9IGxhYmVsRm9ySWQoZG9jLCBpZCk7XG4gICAgaWYgKGxhYikge1xuICAgICAgY29uc3QgdCA9IGNsZWFuVGV4dChsYWIudGV4dENvbnRlbnQpO1xuICAgICAgaWYgKHQpIHJldHVybiB7IHRleHQ6IHQsIHN0cmF0ZWd5OiAnbGFiZWwtZm9yJyB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIDQuIFdyYXBwaW5nIDxsYWJlbD4gKHBhcmVudCBsYWJlbCkuXG4gIGxldCBub2RlOiBFbGVtZW50IHwgbnVsbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIHdoaWxlIChub2RlICYmIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnbGFiZWwnICYmIG5vZGUgIT09IGVsLmNsb3Nlc3QoJ2Zvcm0sIGJvZHknKSkge1xuICAgIG5vZGUgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgaWYgKG5vZGUgJiYgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdsYWJlbCcpIHtcbiAgICBjb25zdCB0ID0gY2xlYW5UZXh0KG5vZGUudGV4dENvbnRlbnQpO1xuICAgIGlmICh0KSByZXR1cm4geyB0ZXh0OiB0LCBzdHJhdGVneTogJ3BhcmVudC1sYWJlbCcgfTtcbiAgfVxuXG4gIC8vIDUuIFNpYmxpbmcgbGFiZWwgKHByZXZpb3VzIG9yIG5leHQgZWxlbWVudCkuXG4gIGNvbnN0IHByZXYgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICBpZiAocHJldiAmJiBwcmV2LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2xhYmVsJykge1xuICAgIGNvbnN0IHQgPSBjbGVhblRleHQocHJldi50ZXh0Q29udGVudCk7XG4gICAgaWYgKHQpIHJldHVybiB7IHRleHQ6IHQsIHN0cmF0ZWd5OiAnc2libGluZy1sYWJlbCcgfTtcbiAgfVxuICBjb25zdCBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBpZiAobmV4dCAmJiBuZXh0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2xhYmVsJykge1xuICAgIGNvbnN0IHQgPSBjbGVhblRleHQobmV4dC50ZXh0Q29udGVudCk7XG4gICAgaWYgKHQpIHJldHVybiB7IHRleHQ6IHQsIHN0cmF0ZWd5OiAnc2libGluZy1sYWJlbCcgfTtcbiAgfVxuXG4gIC8vIDYuIFRhYmxlIGhlYWRlciBhc3NvY2lhdGlvbjogPHRkPi88dGg+IFx1MjE5MiBtYXRjaGluZyA8dGg+IGluIHRoZSBoZWFkZXIgcm93LlxuICBjb25zdCBjZWxsID0gZWwuY2xvc2VzdCgndGQsIHRoJyk7XG4gIGlmIChjZWxsICYmIGNlbGwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGQnKSB7XG4gICAgY29uc3Qgcm93ID0gY2VsbC5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBoZWFkZXJGb3JDZWxsKGNlbGwgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQpO1xuICAgIGlmIChoZWFkZXJUZXh0KSByZXR1cm4geyB0ZXh0OiBoZWFkZXJUZXh0LCBzdHJhdGVneTogJ3RhYmxlLWhlYWRlcicgfTtcbiAgICB2b2lkIHJvdztcbiAgfVxuXG4gIC8vIDcuIGZvcm0tZ3JvdXAgc3R5bGUgYXNzb2NpYXRpb246IC5mb3JtLWdyb3VwIC8gLmZvcm0tZmllbGQgLyAuc2xkcy1mb3JtLWVsZW1lbnQgLyAuZmllbGRcbiAgY29uc3QgZ3JvdXAgPSBlbC5jbG9zZXN0KCcuZm9ybS1ncm91cCwgLmZvcm0tZmllbGQsIC5mb3JtLWZpZWxkLXdyYXBwZXIsIC5zbGRzLWZvcm0tZWxlbWVudCwgLmZpZWxkLCAubWF0LWZvcm0tZmllbGQsIC5wLWZpZWxkJyk7XG4gIGlmIChncm91cCkge1xuICAgIGNvbnN0IGxhYiA9IGdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsLCAuc2xkcy1mb3JtLWVsZW1lbnRfX2xhYmVsLCAubWF0LWZvcm0tZmllbGQtbGFiZWwsIGxlZ2VuZCcpO1xuICAgIGlmIChsYWIpIHtcbiAgICAgIGNvbnN0IHQgPSBjbGVhblRleHQobGFiLnRleHRDb250ZW50KTtcbiAgICAgIGlmICh0KSByZXR1cm4geyB0ZXh0OiB0LCBzdHJhdGVneTogJ2Zvcm0tZ3JvdXAnIH07XG4gICAgfVxuICB9XG5cbiAgLy8gOC4gTmVhcmVzdCB0ZXh0IG5vZGU6IHByZXZpb3VzIHNpYmxpbmcgdGV4dCwgdGhlbiBwYXJlbnQncyBmaXJzdCB0ZXh0LlxuICBpZiAocHJldikge1xuICAgIGNvbnN0IHQgPSBjbGVhblRleHQocHJldi50ZXh0Q29udGVudCk7XG4gICAgaWYgKHQgJiYgdC5sZW5ndGggPD0gNjApIHJldHVybiB7IHRleHQ6IHQsIHN0cmF0ZWd5OiAnbmVhcmVzdC10ZXh0JyB9O1xuICB9XG4gIGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIGlmIChwYXJlbnQpIHtcbiAgICBjb25zdCBkaXJlY3QgPSBBcnJheS5mcm9tKHBhcmVudC5jaGlsZE5vZGVzKVxuICAgICAgLmZpbHRlcigobikgPT4gbi5ub2RlVHlwZSA9PT0gMykgLy8gTm9kZS5URVhUX05PREVcbiAgICAgIC5tYXAoKG4pID0+IG4udGV4dENvbnRlbnQgfHwgJycpXG4gICAgICAuam9pbignICcpO1xuICAgIGNvbnN0IHQgPSBjbGVhblRleHQoZGlyZWN0KTtcbiAgICBpZiAodCAmJiB0Lmxlbmd0aCA8PSA2MCkgcmV0dXJuIHsgdGV4dDogdCwgc3RyYXRlZ3k6ICduZWFyZXN0LXRleHQnIH07XG4gIH1cblxuICAvLyA5LiBQbGFjZWhvbGRlciAvIHRpdGxlIGZhbGxiYWNrIChub3QgYSBET00gd2FsayBidXQgYSB1c2VmdWwgbGFiZWwgc291cmNlKS5cbiAgY29uc3QgcGggPSBlbC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyk7XG4gIGlmIChwaCAmJiBwaC50cmltKCkpIHJldHVybiB7IHRleHQ6IGNsZWFuVGV4dChwaCksIHN0cmF0ZWd5OiAnbmVhcmVzdC10ZXh0JyB9O1xuXG4gIHJldHVybiB7IHRleHQ6IG51bGwsIHN0cmF0ZWd5OiAnbm9uZScgfTtcbn1cblxuLyoqIEZvciBhIDx0ZD4sIGZpbmQgdGhlIDx0aD4gaW4gdGhlIHNhbWUgY29sdW1uIG9mIHRoZSB0YWJsZSBoZWFkZXIuICovXG5mdW5jdGlvbiBoZWFkZXJGb3JDZWxsKGNlbGw6IEhUTUxUYWJsZUNlbGxFbGVtZW50KTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IHJvdyA9IGNlbGwucGFyZW50RWxlbWVudCBhcyBIVE1MVGFibGVSb3dFbGVtZW50IHwgbnVsbDtcbiAgaWYgKCFyb3cpIHJldHVybiBudWxsO1xuICBjb25zdCB0YWJsZSA9IGNlbGwuY2xvc2VzdCgndGFibGUnKTtcbiAgaWYgKCF0YWJsZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGNlbGxzID0gQXJyYXkuZnJvbShyb3cuY2VsbHMpO1xuICBjb25zdCBpbmRleCA9IGNlbGxzLmluZGV4T2YoY2VsbCk7XG4gIGlmIChpbmRleCA8IDApIHJldHVybiBudWxsO1xuICBjb25zdCBoZWFkID0gdGFibGUudEhlYWQ7XG4gIGlmICghaGVhZCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGhlYWRlclJvdyA9IGhlYWQucm93c1swXTtcbiAgaWYgKCFoZWFkZXJSb3cpIHJldHVybiBudWxsO1xuICBjb25zdCB0aCA9IGhlYWRlclJvdy5jZWxsc1tpbmRleF07XG4gIHJldHVybiB0aCA/IGNsZWFuVGV4dCh0aC50ZXh0Q29udGVudCkgOiBudWxsO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIExhYmVsIHJ1bGUgZ2VuZXJhdGlvbiAocnVucyBpbiB0aGUgcG9wdXApXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqIFN0YW5kYXJkTG9naWMgYmFzZSBydWxlcyBcdTIwMTQgYWx3YXlzIGVtaXR0ZWQgKG1hdGNoZXMgSUVBZGFwdG9yLnhtbCBkZWZhdWx0cykuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTdGFuZGFyZExhYmVsUnVsZXMoY29udHJvbHM6IERldGVjdGVkQ29udHJvbFtdKTogU3RhbmRhcmRMYWJlbFJ1bGVbXSB7XG4gIGNvbnN0IHJ1bGVzOiBTdGFuZGFyZExhYmVsUnVsZVtdID0gW1xuICAgIHtcbiAgICAgIGlkOiAnU0xfMScsXG4gICAgICBmcm9tOiAnaWQnLFxuICAgICAgdG86ICdodG1sZm9yJyxcbiAgICAgIG9wZXJhdG9yOiAnY29udGFpbnMnLFxuICAgICAgcmVhc29uOiAnU3RhbmRhcmQgRXBpcGxleCBhc3NvY2lhdGlvbjogY29udHJvbCBpZCBcdTIxOTQgPGxhYmVsIGZvcj4gKGxhYmVsW2Zvcj1pZF0pLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ1NMXzInLFxuICAgICAgZnJvbTogJ2FyaWEtbGFiZWxsZWRieScsXG4gICAgICB0bzogJ2lkJyxcbiAgICAgIG9wZXJhdG9yOiAnY29udGFpbnMnLFxuICAgICAgcmVhc29uOiAnQVJJQSBhc3NvY2lhdGlvbjogYXJpYS1sYWJlbGxlZGJ5IGxpc3RzIHRoZSBpZCBvZiB0aGUgbGFiZWxsaW5nIGVsZW1lbnQuJyxcbiAgICB9LFxuICBdO1xuICBjb25zdCBoYXNBcmlhTGFiZWwgPSBjb250cm9scy5zb21lKChjKSA9PiBjLmF0dHJpYnV0ZXMuYXJpYUxhYmVsKTtcbiAgaWYgKGhhc0FyaWFMYWJlbCkge1xuICAgIHJ1bGVzLnB1c2goe1xuICAgICAgaWQ6ICdTTF8zJyxcbiAgICAgIGZyb206ICdhcmlhLWxhYmVsJyxcbiAgICAgIHRvOiAndGl0bGUnLFxuICAgICAgb3BlcmF0b3I6ICdjb250YWlucycsXG4gICAgICByZWFzb246ICdhcmlhLWxhYmVsIGlzIHVzZWQgZGlyZWN0bHkgYXMgdGhlIGNvbnRyb2wgbmFtZS4nLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBydWxlcztcbn1cblxuZnVuY3Rpb24gYXR0cnNTdHJpbmcoYXR0cnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pOiBzdHJpbmcge1xuICByZXR1cm4gT2JqZWN0LmtleXMoYXR0cnMpLnNvcnQoKS5tYXAoKGspID0+IGAke2t9PSR7YXR0cnNba119YCkuam9pbignLCcpO1xufVxuXG5mdW5jdGlvbiBsYWJlbFRyYXZlcnNhbEZpbmdlcnByaW50KHI6IFRyYXZlcnNlTGFiZWxSdWxlKTogc3RyaW5nIHtcbiAgY29uc3QgcGF0aHMgPSByLnBhdGhzLm1hcCgocCkgPT4gYCR7cC5wYXRofToke3Aub3BlcmF0b3J9OiR7YXR0cnNTdHJpbmcocC5hdHRyaWJ1dGVzKX1gKS5qb2luKCc+Jyk7XG4gIHJldHVybiBgJHtyLnJvbGV9fCR7ci5wYXJlbnRSb2xlID8/ICcnfXwke2F0dHJzU3RyaW5nKHIuYXR0cmlidXRlcyl9fCR7cGF0aHN9fCR7ci5tZXRob2R9YDtcbn1cblxuLyoqXG4gKiBCdWlsZCBUcmF2ZXJzZUxvZ2ljIHJ1bGVzIGZyb20gdGhlIGxhYmVsIHN0cmF0ZWdpZXMgYWN0dWFsbHkgdXNlZCBvbiB0aGUgcGFnZS5cbiAqIFJ1bGVzIGFyZSBkZWR1cGxpY2F0ZWQ7IHN0YWJsZSBUTF8gaWRzIGFyZSBhc3NpZ25lZCBpbiByb2xlIG9yZGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRUcmF2ZXJzZUxhYmVsUnVsZXMoY29udHJvbHM6IERldGVjdGVkQ29udHJvbFtdKTogVHJhdmVyc2VMYWJlbFJ1bGVbXSB7XG4gIGNvbnN0IHNlZW4gPSBuZXcgTWFwPHN0cmluZywgVHJhdmVyc2VMYWJlbFJ1bGU+KCk7XG4gIGNvbnN0IHB1c2ggPSAocjogVHJhdmVyc2VMYWJlbFJ1bGUpID0+IHtcbiAgICBjb25zdCBrZXkgPSBsYWJlbFRyYXZlcnNhbEZpbmdlcnByaW50KHIpO1xuICAgIGlmICghc2Vlbi5oYXMoa2V5KSkgc2Vlbi5zZXQoa2V5LCByKTtcbiAgfTtcblxuICBjb25zdCBpbnB1dEF0dHJzID0gKGM6IERldGVjdGVkQ29udHJvbCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGE6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IFRhZ05hbWU6IGMuYXR0cmlidXRlcy50YWdOYW1lLnRvVXBwZXJDYXNlKCkgfTtcbiAgICBpZiAoYy5hdHRyaWJ1dGVzLnRhZ05hbWUgPT09ICdpbnB1dCcgJiYgYy5hdHRyaWJ1dGVzLnR5cGUgJiYgYy5hdHRyaWJ1dGVzLnR5cGUgIT09ICd0ZXh0Jykge1xuICAgICAgYS50eXBlID0gYy5hdHRyaWJ1dGVzLnR5cGU7XG4gICAgfVxuICAgIHJldHVybiBhO1xuICB9O1xuXG4gIGNvbnN0IGlubmVyVGV4dFBhdGggPSAocGF0aDogc3RyaW5nLCBvcGVyYXRvcjogJ3NpbXBsZScgfCAncmVjdXJzaXZlJywgYXR0cmlidXRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPik6IFRyYXZlcnNhbFBhdGhbXSA9PiBbXG4gICAgeyBwYXRoLCBvcGVyYXRvciwgYXR0cmlidXRlcyB9LFxuICBdO1xuXG4gIGZvciAoY29uc3QgYyBvZiBjb250cm9scykge1xuICAgIHN3aXRjaCAoYy5sYWJlbFN0cmF0ZWd5KSB7XG4gICAgICBjYXNlICdwYXJlbnQtbGFiZWwnOlxuICAgICAgICBwdXNoKHtcbiAgICAgICAgICBpZDogJycsIHJvbGU6IGMucm9sZSwgcGFyZW50Um9sZTogYy5wYXJlbnRSb2xlLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IGlucHV0QXR0cnMoYyksXG4gICAgICAgICAgcGF0aHM6IGlubmVyVGV4dFBhdGgoJ1BSJywgJ3NpbXBsZScsIHsgVGFnTmFtZTogJ2xhYmVsJyB9KSxcbiAgICAgICAgICBtZXRob2Q6ICdpbm5lclRleHQnLFxuICAgICAgICAgIHJlYXNvbjogYExhYmVsIGZvdW5kIGJ5IHdyYXBwaW5nIDxsYWJlbD4gKGUuZy4gJHtjLmxvY2F0aW9uLmNzc1NlbGVjdG9yfSkuYCxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2libGluZy1sYWJlbCc6XG4gICAgICAgIHB1c2goe1xuICAgICAgICAgIGlkOiAnJywgcm9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBjLnBhcmVudFJvbGUsXG4gICAgICAgICAgYXR0cmlidXRlczogaW5wdXRBdHRycyhjKSxcbiAgICAgICAgICBwYXRoczogaW5uZXJUZXh0UGF0aCgnUFMnLCAnc2ltcGxlJywgeyBUYWdOYW1lOiAnbGFiZWwnIH0pLFxuICAgICAgICAgIG1ldGhvZDogJ2lubmVyVGV4dCcsXG4gICAgICAgICAgcmVhc29uOiBgTGFiZWwgZm91bmQgYXMgc2libGluZyA8bGFiZWw+IChlLmcuICR7Yy5sb2NhdGlvbi5jc3NTZWxlY3Rvcn0pLmAsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ25lYXJlc3QtdGV4dCc6XG4gICAgICAgIHB1c2goe1xuICAgICAgICAgIGlkOiAnJywgcm9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBjLnBhcmVudFJvbGUsXG4gICAgICAgICAgYXR0cmlidXRlczogaW5wdXRBdHRycyhjKSxcbiAgICAgICAgICBwYXRoczogaW5uZXJUZXh0UGF0aCgnUFMnLCAnc2ltcGxlJywge30pLFxuICAgICAgICAgIG1ldGhvZDogJ2lubmVyVGV4dCcsXG4gICAgICAgICAgcmVhc29uOiBgTGFiZWwgdGFrZW4gZnJvbSB0aGUgbmVhcmVzdCBwcmVjZWRpbmcgdGV4dCBub2RlICgke2MubG9jYXRpb24uY3NzU2VsZWN0b3J9KS5gLFxuICAgICAgICB9KTtcbiAgICAgICAgcHVzaCh7XG4gICAgICAgICAgaWQ6ICcnLCByb2xlOiBjLnJvbGUsIHBhcmVudFJvbGU6IGMucGFyZW50Um9sZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBpbnB1dEF0dHJzKGMpLFxuICAgICAgICAgIHBhdGhzOiBpbm5lclRleHRQYXRoKCdQUicsICdyZWN1cnNpdmUnLCB7IFRhZ05hbWU6ICdsYWJlbCcgfSksXG4gICAgICAgICAgbWV0aG9kOiAnaW5uZXJUZXh0JyxcbiAgICAgICAgICByZWFzb246IGBGYWxsYmFjazogd2FsayBwYXJlbnRzIGZvciBhIDxsYWJlbD4gY29udGFpbmluZyB0aGUgY29udHJvbC5gLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0YWJsZS1oZWFkZXInOlxuICAgICAgICBwdXNoKHtcbiAgICAgICAgICBpZDogJycsIHJvbGU6IGMucm9sZSwgcGFyZW50Um9sZTogYy5wYXJlbnRSb2xlLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IGlucHV0QXR0cnMoYyksXG4gICAgICAgICAgcGF0aHM6IGlubmVyVGV4dFBhdGgoJ1BSJywgJ3JlY3Vyc2l2ZScsIHsgVGFnTmFtZTogJ3RyJyB9KSxcbiAgICAgICAgICBtZXRob2Q6ICdpbm5lclRleHQnLFxuICAgICAgICAgIHJlYXNvbjogYExhYmVsIGRlcml2ZWQgZnJvbSB0aGUgdGFibGUgaGVhZGVyIC8gcm93IHRleHQgKCR7Yy5sb2NhdGlvbi5jc3NTZWxlY3Rvcn0pLmAsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Zvcm0tZ3JvdXAnOlxuICAgICAgICBwdXNoKHtcbiAgICAgICAgICBpZDogJycsIHJvbGU6IGMucm9sZSwgcGFyZW50Um9sZTogYy5wYXJlbnRSb2xlLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IGlucHV0QXR0cnMoYyksXG4gICAgICAgICAgcGF0aHM6IGlubmVyVGV4dFBhdGgoJ1BSJywgJ3JlY3Vyc2l2ZScsIHsgVGFnTmFtZTogJ2xhYmVsJyB9KSxcbiAgICAgICAgICBtZXRob2Q6ICdpbm5lclRleHQnLFxuICAgICAgICAgIHJlYXNvbjogYExhYmVsIGluc2lkZSBhIGZvcm0tZ3JvdXAgd3JhcHBlciAoJHtjLmxvY2F0aW9uLmNzc1NlbGVjdG9yfSkuYCxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVsZXMgPSBbLi4uc2Vlbi52YWx1ZXMoKV0uc29ydCgoYSwgYikgPT4gYS5yb2xlIC0gYi5yb2xlIHx8IGEucGF0aHNbMF0ucGF0aC5sb2NhbGVDb21wYXJlKGIucGF0aHNbMF0ucGF0aCkpO1xuICBydWxlcy5mb3JFYWNoKChyLCBpKSA9PiB7IHIuaWQgPSBgVExfJHtpICsgMX1gOyB9KTtcbiAgcmV0dXJuIHJ1bGVzO1xufVxuXG4vKipcbiAqIFN1Z2dlc3QgbWlzc2luZyBsYWJlbCBydWxlcyAoYm9udXMgZmVhdHVyZSk6IGNvbnRyb2xzIHdpdGggbm8gbGFiZWwgYXQgYWxsLlxuICogUmV0dXJucyBodW1hbi1yZWFkYWJsZSBzdWdnZXN0aW9ucyBzaG93biBpbiB0aGUgZGlhZ25vc3RpY3MgcGFuZWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdWdnZXN0TWlzc2luZ0xhYmVscyhjb250cm9sczogRGV0ZWN0ZWRDb250cm9sW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IG1pc3NpbmcgPSBjb250cm9scy5maWx0ZXIoKGMpID0+ICFjLmxhYmVsICYmIGMucm9sZSAhPT0gMjQgJiYgYy5yb2xlICE9PSAyOCAmJiBjLnJvbGUgIT09IDI5ICYmIGMucm9sZSAhPT0gMTApO1xuICByZXR1cm4gbWlzc2luZy5tYXAoXG4gICAgKGMpID0+XG4gICAgICBgQWRkIGFyaWEtbGFiZWwgb3IgPGxhYmVsIGZvcj1cIiR7Yy5hdHRyaWJ1dGVzLmlkIHx8ICdcdTIwMjYnfVwiPiBmb3IgdGhlICR7Yy5yb2xlTmFtZX0gYXQgJHtjLmxvY2F0aW9uLmNzc1NlbGVjdG9yfS5gXG4gICk7XG59XG4iLCAiLyoqXG4gKiB0eXBlcy50cyBcdTIwMTQgU2hhcmVkIHR5cGUgbW9kZWwgZm9yIHRoZSBFcGlwbGV4IElFIFJ1bGVzIEdlbmVyYXRvci5cbiAqXG4gKiBUaGVzZSB0eXBlcyBhcmUgdXNlZCBieSB0aGUgY29udGVudCBzY3JpcHQgKERPTSBzY2FubmluZyksIHRoZSBwb3B1cFxuICogKHJ1bGUgZ2VuZXJhdGlvbiAvIHByZXZpZXcpLCBhbmQgdGhlIHB1cmUgcnVsZSBlbmdpbmVzLiBFdmVyeXRoaW5nIGluXG4gKiB0aGlzIG1vZHVsZSBpcyBwbGFpbiBkYXRhIFx1MjAxNCBzYWZlIHRvIHBhc3MgdGhyb3VnaCBjaHJvbWUucnVudGltZSBtZXNzYWdlcy5cbiAqL1xuXG4vKiogRXBpcGxleCBDdXJyZW50Um9sZSBudW1lcmljIGNvZGVzIChzdGFibGUgYWNyb3NzIElFQWRhcHRvci54bWwgdmVyc2lvbnMpLiAqL1xuZXhwb3J0IHR5cGUgUm9sZUlkID1cbiAgfCAzICAgLy8gU2Nyb2xsIGJhclxuICB8IDEwICAvLyBDb250YWluZXIgLyBncm91cFxuICB8IDEyICAvLyBNZW51IGl0ZW1cbiAgfCAyNCAgLy8gVGFibGVcbiAgfCAyOCAgLy8gVGFibGUgcm93XG4gIHwgMjkgIC8vIFRhYmxlIGNlbGxcbiAgfCAzMCAgLy8gTGlua1xuICB8IDM0ICAvLyBMaXN0IGl0ZW0gLyBvcHRpb25cbiAgfCAzNyAgLy8gVGFiXG4gIHwgNDAgIC8vIEltYWdlXG4gIHwgNDEgIC8vIFRleHRcbiAgfCA0MiAgLy8gVGV4dCBib3hcbiAgfCA0MyAgLy8gQnV0dG9uXG4gIHwgNDQgIC8vIENoZWNrYm94XG4gIHwgNDUgIC8vIFJhZGlvIGJ1dHRvblxuICB8IDQ2ICAvLyBEcm9wZG93blxuICB8IDgyICAvLyBJY29uXG4gIHwgODYgIC8vIE1lbnVcbiAgfCA5MjsgLy8gRGF0ZSBjb250cm9sXG5cbi8qKiBIdW1hbi1yZWFkYWJsZSByb2xlIGluZm8sIGluY2x1ZGluZyB0aGUgaGlnaGxpZ2h0IGNvbG91ciB1c2VkIGZvciB2aXN1YWwgaW5zcGVjdGlvbi4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm9sZUluZm8ge1xuICBpZDogUm9sZUlkO1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvbG9yOiBzdHJpbmc7XG59XG5cbi8qKiBNYXN0ZXIgcm9sZSB0YWJsZS4gRnV0dXJlIHJvbGVzIGNhbiBiZSBhZGRlZCBoZXJlIG9yIHZpYSB0aGUgc2V0dGluZ3MgSlNPTi4gKi9cbmV4cG9ydCBjb25zdCBST0xFUzogUmVjb3JkPG51bWJlciwgUm9sZUluZm8+ID0ge1xuICAzOiAgeyBpZDogMywgIG5hbWU6ICdTY3JvbGwgYmFyJywgICAgICAgIGNvbG9yOiAnIzllOWU5ZScgfSxcbiAgMTA6IHsgaWQ6IDEwLCBuYW1lOiAnQ29udGFpbmVyIC8gR3JvdXAnLCBjb2xvcjogJyM4ZDZlNjMnIH0sXG4gIDEyOiB7IGlkOiAxMiwgbmFtZTogJ01lbnUgaXRlbScsICAgICAgICAgY29sb3I6ICcjNGExNDhjJyB9LFxuICAyNDogeyBpZDogMjQsIG5hbWU6ICdUYWJsZScsICAgICAgICAgICAgIGNvbG9yOiAnIzAwNjk1YycgfSxcbiAgMjg6IHsgaWQ6IDI4LCBuYW1lOiAnVGFibGUgcm93JywgICAgICAgICBjb2xvcjogJyMwMDg5N2InIH0sXG4gIDI5OiB7IGlkOiAyOSwgbmFtZTogJ1RhYmxlIGNlbGwnLCAgICAgICAgY29sb3I6ICcjMjZhNjlhJyB9LFxuICAzMDogeyBpZDogMzAsIG5hbWU6ICdMaW5rJywgICAgICAgICAgICAgIGNvbG9yOiAnIzE1NjVjMCcgfSxcbiAgMzQ6IHsgaWQ6IDM0LCBuYW1lOiAnTGlzdCBpdGVtIC8gT3B0aW9uJyxjb2xvcjogJyM1ZTM1YjEnIH0sXG4gIDM3OiB7IGlkOiAzNywgbmFtZTogJ1RhYicsICAgICAgICAgICAgICAgY29sb3I6ICcjZjU3ZjE3JyB9LFxuICA0MDogeyBpZDogNDAsIG5hbWU6ICdJbWFnZScsICAgICAgICAgICAgIGNvbG9yOiAnI2FkMTQ1NycgfSxcbiAgNDE6IHsgaWQ6IDQxLCBuYW1lOiAnVGV4dCcsICAgICAgICAgICAgICBjb2xvcjogJyM1NDZlN2EnIH0sXG4gIDQyOiB7IGlkOiA0MiwgbmFtZTogJ1RleHQgYm94JywgICAgICAgICAgY29sb3I6ICcjMDI3N2JkJyB9LFxuICA0MzogeyBpZDogNDMsIG5hbWU6ICdCdXR0b24nLCAgICAgICAgICAgIGNvbG9yOiAnI2QzMmYyZicgfSxcbiAgNDQ6IHsgaWQ6IDQ0LCBuYW1lOiAnQ2hlY2tib3gnLCAgICAgICAgICBjb2xvcjogJyMyZTdkMzInIH0sXG4gIDQ1OiB7IGlkOiA0NSwgbmFtZTogJ1JhZGlvIGJ1dHRvbicsICAgICAgY29sb3I6ICcjZjlhODI1JyB9LFxuICA0NjogeyBpZDogNDYsIG5hbWU6ICdEcm9wZG93bicsICAgICAgICAgIGNvbG9yOiAnI2U2NTEwMCcgfSxcbiAgODI6IHsgaWQ6IDgyLCBuYW1lOiAnSWNvbicsICAgICAgICAgICAgICBjb2xvcjogJyM2ZDRjNDEnIH0sXG4gIDg2OiB7IGlkOiA4NiwgbmFtZTogJ01lbnUnLCAgICAgICAgICAgICAgY29sb3I6ICcjN2IxZmEyJyB9LFxuICA5MjogeyBpZDogOTIsIG5hbWU6ICdEYXRlIGNvbnRyb2wnLCAgICAgIGNvbG9yOiAnIzAwODM4ZicgfSxcbn07XG5cbmV4cG9ydCBjb25zdCByb2xlTmFtZSA9IChpZDogUm9sZUlkIHwgbnVtYmVyKTogc3RyaW5nID0+XG4gIChST0xFU1tpZF0gJiYgUk9MRVNbaWRdLm5hbWUpIHx8IGBSb2xlICR7aWR9YDtcblxuZXhwb3J0IGNvbnN0IHJvbGVDb2xvciA9IChpZDogUm9sZUlkIHwgbnVtYmVyKTogc3RyaW5nID0+XG4gIChST0xFU1tpZF0gJiYgUk9MRVNbaWRdLmNvbG9yKSB8fCAnIzYwN2Q4Yic7XG5cbi8qKiBBdHRyaWJ1dGVzIGNhcHR1cmVkIGZyb20gYSBET00gZWxlbWVudCAoc2FmZSBzdWJzZXQsIHNlcmlhbGl6YWJsZSkuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xBdHRyaWJ1dGVzIHtcbiAgdGFnTmFtZTogc3RyaW5nO1xuICB0eXBlPzogc3RyaW5nO1xuICByb2xlPzogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIGFyaWFMYWJlbGxlZGJ5Pzogc3RyaW5nO1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHZhbHVlPzogc3RyaW5nO1xuICBocmVmPzogc3RyaW5nO1xuICBhbHQ/OiBzdHJpbmc7XG4gIGNoZWNrZWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRvbmx5PzogYm9vbGVhbjtcbiAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG4gIGNvbnRlbnRFZGl0YWJsZT86IGJvb2xlYW47XG4gIC8qKiBBcmJpdHJhcnkgZGF0YS0qIGF0dHJpYnV0ZXMgKGNhbWVsLWNhc2VkIHN1ZmZpeCBcdTIxOTIgdmFsdWUpLiAqL1xuICBkYXRhPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgLyoqIFNob3J0IGlubmVyVGV4dCBzbmlwcGV0IGZvciBwcmV2aWV3IC8gZGlhZ25vc3RpY3MuICovXG4gIHRleHQ/OiBzdHJpbmc7XG59XG5cbi8qKiBYUGF0aCArIENTUyBzZWxlY3RvciB0aGF0IHVuaXF1ZWx5IGxvY2F0ZXMgYSBjb250cm9sIG9uIHRoZSBwYWdlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb250cm9sTG9jYXRpb24ge1xuICB4cGF0aDogc3RyaW5nO1xuICBjc3NTZWxlY3Rvcjogc3RyaW5nO1xufVxuXG4vKiogSG93IHRoZSBjb25maWRlbmNlIHNjb3JlIHdhcyBkZXJpdmVkIFx1MjAxNCBzaG93biBpbiB0aGUgZGlhZ25vc3RpY3MgcGFuZWwuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZGVuY2VCcmVha2Rvd24ge1xuICB0YWc6IG51bWJlciB8IG51bGw7ICAgICAgICAvLyBlLmcuIDk1IFx1MjAxNCBtYXRjaGVkIGJ5IHRhZyBuYW1lICsgdHlwZVxuICByb2xlQXR0cjogbnVtYmVyIHwgbnVsbDsgICAvLyBlLmcuIDg4IFx1MjAxNCBtYXRjaGVkIGJ5IHJvbGU9XCJcIiBhdHRyaWJ1dGVcbiAga2xhc3M6IG51bWJlciB8IG51bGw7ICAgICAgLy8gZS5nLiA3NiBcdTIwMTQgbWF0Y2hlZCBieSBjbGFzcyBuYW1lXG4gIGZyYW1ld29yazogbnVtYmVyIHwgbnVsbDsgIC8vIGUuZy4gOTAgXHUyMDE0IG1hdGNoZWQgYnkgZnJhbWV3b3JrLXNwZWNpZmljIGNsYXNzXG4gIGFyaWE6IG51bWJlciB8IG51bGw7ICAgICAgIC8vIGUuZy4gNzAgXHUyMDE0IG1hdGNoZWQgYnkgQVJJQSBhdHRyaWJ1dGVzXG59XG5cbi8qKiBBIHNpbmdsZSBjb250cm9sIGRldGVjdGVkIG9uIHRoZSBwYWdlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZXRlY3RlZENvbnRyb2wge1xuICAvKiogVW5pcXVlIGluc3RhbmNlIGlkICh1c2VkIGJ5IHRoZSBoaWdobGlnaHQgb3ZlcmxheSArIHBvcHVwIHRhYmxlKS4gKi9cbiAgdWlkOiBzdHJpbmc7XG4gIHJvbGU6IFJvbGVJZDtcbiAgcm9sZU5hbWU6IHN0cmluZztcbiAgLyoqIE92ZXJhbGwgY29uZmlkZW5jZSAwXHUyMDEzMTAwIChoaWdoZXN0IGNvbnRyaWJ1dGluZyBzaWduYWwpLiAqL1xuICBjb25maWRlbmNlOiBudW1iZXI7XG4gIGNvbmZpZGVuY2VCcmVha2Rvd246IENvbmZpZGVuY2VCcmVha2Rvd247XG4gIGF0dHJpYnV0ZXM6IENvbnRyb2xBdHRyaWJ1dGVzO1xuICAvKiogUmVzb2x2ZWQgaHVtYW4tcmVhZGFibGUgbGFiZWwsIGlmIGFueS4gKi9cbiAgbGFiZWw6IHN0cmluZyB8IG51bGw7XG4gIC8qKiBEZXNjcmlwdGlvbiBvZiB0aGUgbGFiZWwgc3RyYXRlZ3kgdGhhdCBzdWNjZWVkZWQgKGRpYWdub3N0aWNzKS4gKi9cbiAgbGFiZWxNZXRob2Q6IHN0cmluZztcbiAgbG9jYXRpb246IENvbnRyb2xMb2NhdGlvbjtcbiAgLyoqIEZyYW1ld29yayBrZXkgZGV0ZWN0ZWQgZm9yIHRoaXMgZWxlbWVudCwgZS5nLiBcIkFuZ3VsYXIgTWF0ZXJpYWxcIi4gKi9cbiAgZnJhbWV3b3JrOiBzdHJpbmcgfCBudWxsO1xuICAvKiogVGhlIGZyYW1ld29yayBjbGFzcyB0aGF0IHRyaWdnZXJlZCByb2xlIGRldGVjdGlvbiwgZS5nLiBcIm1hdC1zZWxlY3RcIi4gKi9cbiAgZnJhbWV3b3JrQ2xhc3M6IHN0cmluZyB8IG51bGw7XG4gIC8qKiBIdW1hbi1yZWFkYWJsZSByZWFzb24gdGhpcyBydWxlIHdhcyBnZW5lcmF0ZWQgKGRpYWdub3N0aWNzKS4gKi9cbiAgcmVhc29uOiBzdHJpbmc7XG4gIC8qKiBQYXJlbnQgY29udGFpbmVyIHJvbGUsIHdoZW4gdGhlIGVsZW1lbnQgbGl2ZXMgaW5zaWRlIGEga25vd24gY29udGFpbmVyLiAqL1xuICBwYXJlbnRSb2xlOiBSb2xlSWQgfCBudWxsO1xuICAvKiogVmlzaWJsZSB0ZXh0IChmb3IgdGFibGVzOiB0aGUgY2VsbCB0ZXh0KS4gKi9cbiAgZGlzcGxheVRleHQ6IHN0cmluZztcbiAgLyoqIFZpc2libGUgdGV4dCBvZiBhIG5laWdoYm91cmluZyBzaWJsaW5nIC8gcGFyZW50IHRleHQgbm9kZSAoYnJhbmQvbG9nbyBsYWJlbHMgc3VjaCBhcyBcIkNoYXRHUFRcIikuICovXG4gIGFkamFjZW50VGV4dD86IHN0cmluZztcbiAgLyoqIFdoaWNoIGxhYmVsIHN0cmF0ZWd5IGZvdW5kIHRoZSBsYWJlbCAoZGlhZ25vc3RpY3MgKyBsYWJlbC1ydWxlIGdlbmVyYXRpb24pLiAqL1xuICBsYWJlbFN0cmF0ZWd5OiAnYXJpYS1sYWJlbCcgfCAnYXJpYS1sYWJlbGxlZGJ5JyB8ICdsYWJlbC1mb3InIHwgJ3BhcmVudC1sYWJlbCcgfCAnc2libGluZy1sYWJlbCcgfCAnbmVhcmVzdC10ZXh0JyB8ICd0YWJsZS1oZWFkZXInIHwgJ2Zvcm0tZ3JvdXAnIHwgJ25vbmUnO1xuICAvKiogUHJlLWJ1aWx0IHRyYXZlcnNhbCBydWxlICh3cmFwcGVyIFx1MjE5MiByZWFsIGNvbnRyb2wpLCBkaXNjb3ZlcmVkIGJ5IGNvbnRlbnQudHMuICovXG4gIHRyYXZlcnNhbFJ1bGU/OiBUcmF2ZXJzYWxSdWxlO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJ1bGUgbW9kZWwgXHUyMDE0IHRoZSBpbnRlcm1lZGlhdGUgcmVwcmVzZW50YXRpb24gZnJvbSB3aGljaCBJRUFkYXB0b3IueG1sIGlzXG4vLyBnZW5lcmF0ZWQuIFJ1bGVzIGFyZSBkZWR1cGxpY2F0ZWQgYW5kIG1lcmdlZCBiZWZvcmUgWE1MIGVtaXNzaW9uLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCB0eXBlIE9wZXJhdG9yID0gJ2VxdWFscycgfCAnY29udGFpbnMnIHwgJ3N0YXJ0c3dpdGgnIHwgJ2VuZHN3aXRoJztcblxuLyoqIE9uZSA8Q29uZGl0aW9uPiBpbnNpZGUgYSB0YWctYmFzZWQgcnVsZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGFnQ29uZGl0aW9uIHtcbiAgLyoqIFBpcGUtZGVsaW1pdGVkIHRhZyBsaXN0LCBlLmcuIFwifElOUFVUfFRFWFRBUkVBfFwiLiAqL1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIC8qKiBQaXBlLWRlbGltaXRlZCB0eXBlIGxpc3QgZm9yIGlucHV0IGVsZW1lbnRzLCBlLmcuIFwifFRFWFR8UEFTU1dPUkR8XCIuICovXG4gIHR5cGU/OiBzdHJpbmc7XG59XG5cbi8qKiBSb2xlSWRlbnRpZmllciBydWxlIG1hdGNoZWQgcHVyZWx5IGJ5IHRhZyBuYW1lICgrIG9wdGlvbmFsIHR5cGUgbGlzdCkuICovXG5leHBvcnQgaW50ZXJmYWNlIFRhZ1J1bGUge1xuICBjdXJyZW50Um9sZTogUm9sZUlkO1xuICBwYXJlbnRSb2xlOiBSb2xlSWQgfCBudWxsO1xuICBjb25kaXRpb25zOiBUYWdDb25kaXRpb25bXTtcbiAgLyoqIEh1bWFuLXJlYWRhYmxlIG9yaWdpbiwgZS5nLiBcImlucHV0IHR5cGU9ZW1haWwgb24gYWNtZS5jb21cIi4gKi9cbiAgc291cmNlOiBzdHJpbmc7XG4gIGZyYW1ld29yaz86IHN0cmluZztcbiAgY29uZmlkZW5jZTogbnVtYmVyO1xufVxuXG4vKiogUm9sZUlkZW50aWZpZXIgcnVsZSBtYXRjaGVkIGJ5IGFuIGF0dHJpYnV0ZSB2YWx1ZSAoY2xhc3MsIGlkLCBkYXRhLSosIFx1MjAyNikuICovXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZVJ1bGUge1xuICBjdXJyZW50Um9sZTogUm9sZUlkO1xuICBwYXJlbnRSb2xlOiBSb2xlSWQgfCBudWxsO1xuICAvKiogQXR0cmlidXRlIG5hbWUgYXMgd3JpdHRlbiBpbiB0aGUgWE1MOiBjbGFzc05hbWUsIGlkLCBhcmlhLWxhYmVsLCBkYXRhLSogXHUyMDI2ICovXG4gIGF0dHJpYnV0ZTogc3RyaW5nO1xuICAvKiogVmFsdWVzIE9SLWVkIHRvZ2V0aGVyIGluIG9uZSBwaXBlLWRlbGltaXRlZCBDb25kaXRpb24uICovXG4gIHZhbHVlczogc3RyaW5nW107XG4gIG9wZXJhdG9yOiBPcGVyYXRvcjtcbiAgc291cmNlOiBzdHJpbmc7XG4gIGZyYW1ld29yaz86IHN0cmluZztcbiAgY29uZmlkZW5jZTogbnVtYmVyO1xufVxuXG4vKiogT25lIHRyYXZlcnNhbCBzdGVwIGluc2lkZSBhIFRyYXZlcnNhbEluZm8gPFBhdGg+LiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmF2ZXJzYWxQYXRoIHtcbiAgLyoqIFBSIHwgQ0ggfCBQUyB8IE5TLCBvciBhIGNvbXBvdW5kIGxpa2UgUFMtQ0ggKG1hdGNoaW5nIEVwaXBsZXggc3ludGF4KS4gKi9cbiAgcGF0aDogc3RyaW5nO1xuICBvcGVyYXRvcjogJ3NpbXBsZScgfCAncmVjdXJzaXZlJztcbiAgLyoqIEF0dHJpYnV0ZSBmaWx0ZXJzIGZvciB0aGUgdHJhdmVyc2FsIHRhcmdldCwgZS5nLiB7IFRhZ05hbWU6ICdpbnB1dCcsIHR5cGU6ICdjaGVja2JveCcgfS4gKi9cbiAgYXR0cmlidXRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgLyoqIE9wdGlvbmFsIGVxdWFsaXR5IGNoZWNrIG9uIHRoZSB0YXJnZXQgKEVwaXBsZXggYENoZWNrYCBhdHRyaWJ1dGUpLiAqL1xuICBjaGVjaz86IHN0cmluZztcbn1cblxuLyoqIFJvbGVJZGVudGlmaWVyIHJ1bGUgYW5jaG9yZWQgb24gYSB2aXNpYmxlIHdyYXBwZXIgdGhhdCBtdXN0IGJlIHRyYXZlcnNlZCB0byBmaW5kIHRoZSByZWFsIGNvbnRyb2wuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYXZlcnNhbFJ1bGUge1xuICBjdXJyZW50Um9sZTogUm9sZUlkO1xuICBwYXJlbnRSb2xlOiBSb2xlSWQgfCBudWxsO1xuICAvKiogVGhlIGNvbmRpdGlvbiB0aGF0IGlkZW50aWZpZXMgdGhlIGFuY2hvciBlbGVtZW50ICh3cmFwcGVyIC8gdmlzdWFsIGNvbnRyb2wpLiAqL1xuICBjb25kaXRpb246IENvbmRpdGlvbjtcbiAgcGF0aHM6IFRyYXZlcnNhbFBhdGhbXTtcbiAgc291cmNlOiBzdHJpbmc7XG4gIGZyYW1ld29yaz86IHN0cmluZztcbiAgY29uZmlkZW5jZTogbnVtYmVyO1xufVxuXG4vKiogQSBtYXRjaCBjb25kaXRpb246IHRhZyBsaXN0LCB0eXBlIGxpc3QgYW5kL29yIGF0dHJpYnV0ZSB2YWx1ZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZGl0aW9uIHtcbiAgdGFnTmFtZT86IHN0cmluZzsgICAgIC8vIHBpcGUtZGVsaW1pdGVkXG4gIHR5cGU/OiBzdHJpbmc7ICAgICAgICAvLyBwaXBlLWRlbGltaXRlZFxuICBjbGFzc05hbWU/OiBzdHJpbmc7ICAgLy8gcGlwZS1kZWxpbWl0ZWRcbiAgYXR0cmlidXRlPzogc3RyaW5nOyAgIC8vIGUuZy4gZGF0YS1jb21wLWlkLCBpZCwgbmFtZVxuICB2YWx1ZT86IHN0cmluZzsgICAgICAgLy8gcGlwZS1kZWxpbWl0ZWQgdmFsdWUgZm9yIGBhdHRyaWJ1dGVgXG4gIG9wZXJhdG9yPzogT3BlcmF0b3I7XG59XG5cbi8qKiBMYWJlbElkZW50aWZpZXIgXHUyMDE0IFN0YW5kYXJkTG9naWMgcnVsZSAoaWQgXHUyMTk0IGxhYmVsW2Zvcl0gc3R5bGUgYXNzb2NpYXRpb25zKS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhbmRhcmRMYWJlbFJ1bGUge1xuICBpZDogc3RyaW5nO1xuICBmcm9tOiBzdHJpbmc7XG4gIHRvOiBzdHJpbmc7XG4gIG9wZXJhdG9yOiBPcGVyYXRvcjtcbiAgcmVhc29uOiBzdHJpbmc7XG59XG5cbi8qKiBMYWJlbElkZW50aWZpZXIgXHUyMDE0IFRyYXZlcnNlTG9naWMgcnVsZSAod2FsayB0aGUgRE9NIHRvIGZpbmQgdGhlIGxhYmVsIHRleHQpLiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmF2ZXJzZUxhYmVsUnVsZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHJvbGU6IFJvbGVJZDtcbiAgcGFyZW50Um9sZTogUm9sZUlkIHwgbnVsbDtcbiAgLyoqIFdoZW5Ub0NvbnNpZGVyIGF0dHJpYnV0ZXMsIGUuZy4geyBUYWdOYW1lOiAnaW5wdXQnIH0uICovXG4gIGF0dHJpYnV0ZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIC8qKiBXaGVyZVRvR28gcGF0aHMuICovXG4gIHBhdGhzOiBUcmF2ZXJzYWxQYXRoW107XG4gIC8qKiBXaGF0VG9DYWxsIG1ldGhvZCwgZS5nLiAnaW5uZXJUZXh0Jy4gKi9cbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHJlYXNvbjogc3RyaW5nO1xufVxuXG4vKiogRnVsbCBnZW5lcmF0aW9uIHJlc3VsdCBoYW5kZWQgdG8gdGhlIFhNTCB3cml0ZXIuICovXG5leHBvcnQgaW50ZXJmYWNlIFJ1bGVNb2RlbCB7XG4gIGJhc2VkT25UYWdzOiBUYWdSdWxlW107XG4gIGJhc2VkT25BdHRyaWJ1dGVzOiBBdHRyaWJ1dGVSdWxlW107XG4gIGJhc2VkT25UcmF2ZXJzZUxvZ2ljOiBUcmF2ZXJzYWxSdWxlW107XG4gIHN0YW5kYXJkTG9naWM6IFN0YW5kYXJkTGFiZWxSdWxlW107XG4gIHRyYXZlcnNlTG9naWM6IFRyYXZlcnNlTGFiZWxSdWxlW107XG4gIC8qKiBTaXRlcyB0aGUgcnVsZXMgd2VyZSBvYnNlcnZlZCBvbiAodXNlZCBmb3IgWE1MIGNvbW1lbnRzKS4gKi9cbiAgc2l0ZXM6IHN0cmluZ1tdO1xuICAvKiogRGlhZ25vc3RpY3M6IGV2ZXJ5IGdlbmVyYXRlZCBydWxlIHdpdGggaXRzIHJhdGlvbmFsZS4gKi9cbiAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNFbnRyeVtdO1xufVxuXG4vKiogT25lIGRpYWdub3N0aWNzIHJvdzogYSBydWxlICsgd2h5IGl0IHdhcyBnZW5lcmF0ZWQgKyB0ZXN0IGNhc2UgKyBzZWxlY3RvcnMuICovXG5leHBvcnQgaW50ZXJmYWNlIERpYWdub3N0aWNFbnRyeSB7XG4gIGtpbmQ6ICd0YWcnIHwgJ2F0dHJpYnV0ZScgfCAndHJhdmVyc2FsJyB8ICdsYWJlbC1zdGFuZGFyZCcgfCAnbGFiZWwtdHJhdmVyc2UnO1xuICBydWxlSWQ6IHN0cmluZztcbiAgcm9sZTogUm9sZUlkO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgY29uZmlkZW5jZTogbnVtYmVyO1xuICBmcmFtZXdvcms/OiBzdHJpbmc7XG4gIC8qKiBTYW1wbGUgcGFnZSBpbnN0YW5jZSB0aGlzIHJ1bGUgY2FtZSBmcm9tLiAqL1xuICBzYW1wbGVTZWxlY3Rvcjogc3RyaW5nO1xuICBzYW1wbGVYUGF0aDogc3RyaW5nO1xuICAvKiogR2VuZXJhdGVkIHVuaXQtdGVzdCBzbmlwcGV0IChKU0RPTS1zdHlsZSBhc3NlcnRpb24pLiAqL1xuICB0ZXN0Q2FzZTogc3RyaW5nO1xufVxuXG4vKiogU2NhbiByZXF1ZXN0L3Jlc3BvbnNlIHBheWxvYWRzIGV4Y2hhbmdlZCBiZXR3ZWVuIHBvcHVwIGFuZCBjb250ZW50IHNjcmlwdC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2NhblJlc3BvbnNlIHtcbiAgY29udHJvbHM6IERldGVjdGVkQ29udHJvbFtdO1xuICBmcmFtZXdvcmtzOiBzdHJpbmdbXTtcbiAgdXJsOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZyYW1ld29yayBkZXRlY3Rpb25cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgaW50ZXJmYWNlIEZyYW1ld29ya0luZm8ge1xuICBrZXk6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICAvKiogQ2xhc3MgbmFtZSBmcmFnbWVudHMgdGhhdCBpZGVudGlmeSB0aGUgZnJhbWV3b3JrIG9uIGEgc2luZ2xlIGVsZW1lbnQuICovXG4gIGNsYXNzUGF0dGVybnM6IFJlZ0V4cFtdO1xuICAvKiogUGFnZS1sZXZlbCBzaWduYWxzIChtZXRhIHRhZ3MsIGF0dHJpYnV0ZXMsIHRhZyBuYW1lcykuICovXG4gIHBhZ2VTaWduYWxzOiBSZWdFeHBbXTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSb2xlIG1hcHBpbmdzIFx1MjAxNCBjb25maWd1cmFibGUgdGhyb3VnaCByb2xlTWFwcGluZ3MuanNvbiAvIHNldHRpbmdzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGludGVyZmFjZSBGcmFtZXdvcmtSb2xlTWFwcGluZyB7XG4gIC8qKiBSZWdleCBmcmFnbWVudCBtYXRjaGVkIGFnYWluc3QgdGhlIGVsZW1lbnQgY2xhc3MgYXR0cmlidXRlLiAqL1xuICBjbGFzc1BhdHRlcm46IHN0cmluZztcbiAgcm9sZTogUm9sZUlkO1xuICBmcmFtZXdvcms6IHN0cmluZztcbiAgLyoqIENvbmZpZGVuY2UgYm9udXMgKGUuZy4gOTApLiAqL1xuICBjb25maWRlbmNlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXR0cmlidXRlUm9sZU1hcHBpbmcge1xuICAvKiogQXR0cmlidXRlIG5hbWU6IGNsYXNzTmFtZSwgcm9sZSwgYXJpYS1oYXNwb3B1cCwgZGF0YS1jb21wLWlkIFx1MjAyNiAqL1xuICBhdHRyaWJ1dGU6IHN0cmluZztcbiAgLyoqIFJlZ2V4IGZyYWdtZW50IG1hdGNoZWQgYWdhaW5zdCB0aGUgYXR0cmlidXRlIHZhbHVlLiAqL1xuICB2YWx1ZVBhdHRlcm46IHN0cmluZztcbiAgcm9sZTogUm9sZUlkO1xuICBjb25maWRlbmNlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9sZU1hcHBpbmdDb25maWcge1xuICAvKiogRWxlbWVudCB0aGF0IGNhbiBiZSBzY2FubmVkIGFuZCBpdHMgY29udGFpbmVyIHJvbGUsIGUuZy4geyA0MjogMTAgfS4gKi9cbiAgZGVmYXVsdFBhcmVudFJvbGVzPzogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgZnJhbWV3b3JrUm9sZU1hcHBpbmdzOiBGcmFtZXdvcmtSb2xlTWFwcGluZ1tdO1xuICBhdHRyaWJ1dGVSb2xlTWFwcGluZ3M6IEF0dHJpYnV0ZVJvbGVNYXBwaW5nW107XG4gIC8qKiBFeHRyYSBpbnB1dCB0eXBlcyBcdTIxOTIgcm9sZSBvdmVycmlkZXMgKGUuZy4gdHlwZT1yYW5nZSBcdTIxOTIgNDYpLiAqL1xuICBpbnB1dFR5cGVSb2xlcz86IFJlY29yZDxzdHJpbmcsIFJvbGVJZD47XG4gIC8qKiBFeHRyYSB0YWcgXHUyMTkyIHJvbGUgb3ZlcnJpZGVzLiAqL1xuICB0YWdSb2xlcz86IFJlY29yZDxzdHJpbmcsIFJvbGVJZD47XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ29tcGFyZSAvIG1lcmdlXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wYXJlUmVzdWx0IHtcbiAgbmV3UnVsZXM6IENvbXBhcmVSdWxlW107XG4gIG1vZGlmaWVkUnVsZXM6IENvbXBhcmVSdWxlW107XG4gIGR1cGxpY2F0ZVJ1bGVzOiBDb21wYXJlUnVsZVtdO1xuICBvYnNvbGV0ZVJ1bGVzOiBDb21wYXJlUnVsZVtdO1xuICAvKiogUnVsZXMgcHJlc2VudCBpbiB0aGUgZXhpc3RpbmcgWE1MIHRoYXQgbWF0Y2ggZ2VuZXJhdGVkIG9uZXMgMToxLiAqL1xuICBtYXRjaGVkOiBudW1iZXI7XG59XG5cbi8qKiBBIHJ1bGUgd2l0aCBlbm91Z2ggaW5mbyB0byByZW5kZXIgaW4gdGhlIGNvbXBhcmUgdGFibGUuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmVSdWxlIHtcbiAgZmluZ2VycHJpbnQ6IHN0cmluZztcbiAgcm9sZTogbnVtYmVyO1xuICBraW5kOiAndGFnJyB8ICdhdHRyaWJ1dGUnIHwgJ3RyYXZlcnNhbCcgfCAnbGFiZWwtc3RhbmRhcmQnIHwgJ2xhYmVsLXRyYXZlcnNlJztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaW5HZW5lcmF0ZWQ6IGJvb2xlYW47XG4gIGluRXhpc3Rpbmc6IGJvb2xlYW47XG59XG4iLCAiLyoqXG4gKiBydWxlRW5naW5lLnRzIFx1MjAxNCBDb3JlIHJ1bGUgZW5naW5lLlxuICpcbiAqIFB1cmUsIERPTS1saWdodCBtb2R1bGUgaW1wbGVtZW50aW5nIHRoZSBFcGlwbGV4IHJ1bGUgcGlwZWxpbmU6XG4gKiAgIGRldGVjdENvbnRyb2xSb2xlKCkgIFx1MjAxNCBpbmZlciBDdXJyZW50Um9sZSBmcm9tIHRhZ3MgLyBjbGFzc2VzIC8gcm9sZSBhdHRycyAvIGFyaWFcbiAqICAgZXh0cmFjdEF0dHJpYnV0ZXMoKSAgXHUyMDE0IGNhcHR1cmUgc2VyaWFsaXphYmxlIGF0dHJpYnV0ZXMgZm9yIHJ1bGUgYnVpbGRpbmdcbiAqICAgYnVpbGRUYWdSdWxlKCkgICAgICAgXHUyMDE0IFJvbGVJZGVudGlmaWVyIFx1MjE5MiBCYXNlZE9uVGFncyBydWxlc1xuICogICBidWlsZEF0dHJpYnV0ZVJ1bGUoKSBcdTIwMTQgUm9sZUlkZW50aWZpZXIgXHUyMTkyIEJhc2VkT25BdHRyaWJ1dGVzIHJ1bGVzXG4gKiAgIGRlZHVwbGljYXRlUnVsZXMoKSAgIFx1MjAxNCBtZXJnZSBpZGVudGljYWwgcnVsZXMsIHVuaW9uIGNvbmRpdGlvbnNcbiAqICAgZ2VuZXJhdGVSdWxlTW9kZWwoKSAgXHUyMDE0IG9yY2hlc3RyYXRlIGV2ZXJ5dGhpbmcgaW50byBhIFJ1bGVNb2RlbCBmb3IgdGhlIFhNTCB3cml0ZXJcbiAqXG4gKiBUaGUgbW9kdWxlIG9ubHkgZGVwZW5kcyBvbiBhIG1pbmltYWwgYEVsZW1lbnRMaWtlYCBzdXJmYWNlLCBzbyB0aGUgc2FtZSBjb2RlXG4gKiBydW5zIGluIHRoZSBjb250ZW50IHNjcmlwdCBhbmQgaW4gTm9kZSB1bml0IHRlc3RzLlxuICovXG5pbXBvcnQgdHlwZSB7XG4gIEF0dHJpYnV0ZVJvbGVNYXBwaW5nLFxuICBBdHRyaWJ1dGVSdWxlLFxuICBDb25maWRlbmNlQnJlYWtkb3duLFxuICBDb250cm9sQXR0cmlidXRlcyxcbiAgRGV0ZWN0ZWRDb250cm9sLFxuICBGcmFtZXdvcmtSb2xlTWFwcGluZyxcbiAgT3BlcmF0b3IsXG4gIFJvbGVJZCxcbiAgUm9sZU1hcHBpbmdDb25maWcsXG4gIFJ1bGVNb2RlbCxcbiAgU3RhbmRhcmRMYWJlbFJ1bGUsXG4gIFRhZ1J1bGUsXG4gIFRhZ0NvbmRpdGlvbixcbiAgVHJhdmVyc2VMYWJlbFJ1bGUsXG4gIFRyYXZlcnNhbFJ1bGUsXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgcm9sZU5hbWUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIE1pbmltYWwgZWxlbWVudCBzdXJmYWNlIHVzZWQgYnkgdGhlIGVuZ2luZSAocmVhbCBFbGVtZW50IHNhdGlzZmllcyB0aGlzKS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRWxlbWVudExpa2Uge1xuICB0YWdOYW1lOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgZ2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IG51bGw7XG4gIGdldEF0dHJpYnV0ZU5hbWVzPygpOiBzdHJpbmdbXTtcbn1cblxuLyoqIFRhZ3Mgd2hvc2UgbmF0aXZlIHNlbWFudGljcyBmdWxseSBkZXRlcm1pbmUgdGhlIHJvbGUgKHRhZyB3aW5zIG92ZXIgY2xhc3NlcykuICovXG5jb25zdCBTVFJPTkdfVEFHUyA9IG5ldyBTZXQoW1xuICAnaW5wdXQnLCAnc2VsZWN0JywgJ3RleHRhcmVhJywgJ2J1dHRvbicsICdhJywgJ2ltZycsICd0YWJsZScsICd0Ym9keScsXG4gICd0cicsICd0ZCcsICd0aCcsICdsaScsICdvcHRpb24nLCAnb3B0Z3JvdXAnLCAnc3ZnJywgJ2knLCAnbmF2JywgJ2Zvcm0nLFxuICAnZmllbGRzZXQnLFxuXSk7XG5cbi8qKiBSb2xlcyB0aGF0IGNhbiBvbmx5IGNvbWUgZnJvbSBhIHdpZGdldCBjbGFzcyAobmV2ZXIgZnJvbSBhIHBsYWluIHRleHQgdGFnKS4gKi9cbmNvbnN0IFdJREdFVF9ST0xFUyA9IG5ldyBTZXQ8Um9sZUlkPihbNDYsIDkyLCA0NCwgNDUsIDM0LCAzN10pO1xuXG4vKiogRXBpcGxleCB0eXBlIG5vcm1hbGl6YXRpb24gXHUyMDE0IG1pcnJvcnMgdGhlIGNhc2luZyB1c2VkIGluIElFQWRhcHRvci54bWwuICovXG5jb25zdCBVUFBFUl9UWVBFUyA9IG5ldyBTZXQoW1xuICAnVEVYVCcsICdQQVNTV09SRCcsICdGSUxFJywgJ05VTUJFUicsICdDT0xPUicsICdTRUFSQ0gnLCAnQ0hFQ0tCT1gnLCAnUkFESU8nLFxuICAnU1VCTUlUJywgJ1JFU0VUJywgJ0JVVFRPTicsICdJTUFHRScsICdEQVRFJywgJ1RJTUUnLCAnTU9OVEgnLCAnV0VFSycsXG5dKTtcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVUeXBlKHR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBVUFBFUl9UWVBFUy5oYXModHlwZS50b1VwcGVyQ2FzZSgpKSA/IHR5cGUudG9VcHBlckNhc2UoKSA6IHR5cGUudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqIFRhZyBuYW1lIGFzIHdyaXR0ZW4gaW4gRXBpcGxleCBjb25kaXRpb25zOiBzdGFuZGFyZCB0YWdzIHVwcGVyY2FzZSwgY3VzdG9tIGVsZW1lbnRzIGxvd2VyY2FzZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVUYWdOYW1lKHRhZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdCA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBTVEFOREFSRCA9IG5ldyBTZXQoW1xuICAgICdpbnB1dCcsICd0ZXh0YXJlYScsICdzZWxlY3QnLCAnYnV0dG9uJywgJ2EnLCAnYXJlYScsICdpbWcnLCAndGFibGUnLFxuICAgICd0cicsICd0ZCcsICd0aCcsICdsaScsICdvcHRpb24nLCAnbGFiZWwnLCAnc3BhbicsICdkaXYnLCAncCcsICdpJywgJ3N2ZycsXG4gICAgJ25hdicsICdmb3JtJywgJ2ZpZWxkc2V0JywgJ3VsJywgJ29sJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JyxcbiAgICAnbWFyaycsICdjYXB0aW9uJywgJ2xlZ2VuZCcsICdzZWN0aW9uJywgJ2FydGljbGUnLCAnaGVhZGVyJywgJ2Zvb3RlcicsXG4gICAgJ21haW4nLCAndGJvZHknLCAndGhlYWQnLCAndGZvb3QnLCAnZGQnLCAnZHQnLCAnZGwnLCAnZW0nLCAnc3Ryb25nJywgJ2InLFxuICBdKTtcbiAgcmV0dXJuIFNUQU5EQVJELmhhcyh0KSA/IHQudG9VcHBlckNhc2UoKSA6IHQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQXR0cmlidXRlIGV4dHJhY3Rpb25cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBLTk9XTl9EQVRBX0FUVFJTID0gWydkYXRhLWNvbXAtaWQnLCAnZGF0YS1jb21wb25lbnQtdHlwZScsICdkYXRhLXRlc3RpZCcsICdkYXRhLXJvbGUnLCAnZGF0YS10b2dnbGUnXTtcblxuLyoqIENhcHR1cmUgdGhlIHNlcmlhbGl6YWJsZSBhdHRyaWJ1dGUgc3VyZmFjZSBvZiBhIGNvbnRyb2wuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEF0dHJpYnV0ZXMoZWw6IEVsZW1lbnRMaWtlKTogQ29udHJvbEF0dHJpYnV0ZXMge1xuICBjb25zdCBhdHRyczogQ29udHJvbEF0dHJpYnV0ZXMgPSB7XG4gICAgdGFnTmFtZTogZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICB9O1xuICBjb25zdCBnZXQgPSAobjogc3RyaW5nKSA9PiBlbC5nZXRBdHRyaWJ1dGUobik7XG4gIGNvbnN0IHZhbCA9IChuOiBzdHJpbmcpID0+IHsgY29uc3QgdiA9IGdldChuKTsgcmV0dXJuIHYgPT09IG51bGwgPyB1bmRlZmluZWQgOiB2OyB9O1xuXG4gIGF0dHJzLnR5cGUgPSB2YWwoJ3R5cGUnKTtcbiAgYXR0cnMucm9sZSA9IHZhbCgncm9sZScpO1xuICBhdHRycy5pZCA9IHZhbCgnaWQnKTtcbiAgYXR0cnMuYXJpYUxhYmVsID0gdmFsKCdhcmlhLWxhYmVsJyk7XG4gIGF0dHJzLmFyaWFMYWJlbGxlZGJ5ID0gdmFsKCdhcmlhLWxhYmVsbGVkYnknKTtcbiAgYXR0cnMucGxhY2Vob2xkZXIgPSB2YWwoJ3BsYWNlaG9sZGVyJyk7XG4gIGF0dHJzLnRpdGxlID0gdmFsKCd0aXRsZScpO1xuICBhdHRycy5uYW1lID0gdmFsKCduYW1lJyk7XG4gIGF0dHJzLnZhbHVlID0gdmFsKCd2YWx1ZScpO1xuICBhdHRycy5ocmVmID0gdmFsKCdocmVmJyk7XG4gIGF0dHJzLmFsdCA9IHZhbCgnYWx0Jyk7XG4gIGF0dHJzLmNoZWNrZWQgPSBnZXQoJ2NoZWNrZWQnKSAhPT0gbnVsbDtcbiAgYXR0cnMuZGlzYWJsZWQgPSBnZXQoJ2Rpc2FibGVkJykgIT09IG51bGw7XG4gIGF0dHJzLnJlYWRvbmx5ID0gZ2V0KCdyZWFkb25seScpICE9PSBudWxsO1xuICBhdHRycy5zZWxlY3RlZCA9IGdldCgnc2VsZWN0ZWQnKSAhPT0gbnVsbDtcbiAgYXR0cnMubXVsdGlwbGUgPSBnZXQoJ211bHRpcGxlJykgIT09IG51bGw7XG4gIGF0dHJzLmNvbnRlbnRFZGl0YWJsZSA9IChlbCBhcyB7IGlzQ29udGVudEVkaXRhYmxlPzogYm9vbGVhbiB9KS5pc0NvbnRlbnRFZGl0YWJsZSB8fCBnZXQoJ2NvbnRlbnRlZGl0YWJsZScpID09PSAndHJ1ZSc7XG5cbiAgY29uc3QgY2xzID0gZWwuY2xhc3NOYW1lICE9PSB1bmRlZmluZWQgJiYgZWwuY2xhc3NOYW1lICE9PSBudWxsXG4gICAgPyBTdHJpbmcoZWwuY2xhc3NOYW1lKVxuICAgIDogKGdldCgnY2xhc3MnKSB8fCAnJyk7XG4gIGF0dHJzLmNsYXNzTmFtZSA9IGNscyB8fCB1bmRlZmluZWQ7XG5cbiAgY29uc3QgZGF0YTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBpZiAoZWwuZ2V0QXR0cmlidXRlTmFtZXMpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgZWwuZ2V0QXR0cmlidXRlTmFtZXMoKSkge1xuICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnZGF0YS0nKSkgZGF0YVtuYW1lLnJlcGxhY2UoL15kYXRhLS8sICcnKS5yZXBsYWNlKC8tKFthLXpdKS9nLCAoXywgYykgPT4gYy50b1VwcGVyQ2FzZSgpKV0gPSBnZXQobmFtZSkgfHwgJyc7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiBLTk9XTl9EQVRBX0FUVFJTKSB7XG4gICAgICBjb25zdCB2ID0gZ2V0KG5hbWUpO1xuICAgICAgaWYgKHYgIT09IG51bGwpIGRhdGFbbmFtZV0gPSB2O1xuICAgIH1cbiAgfVxuICBpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID4gMCkgYXR0cnMuZGF0YSA9IGRhdGE7XG5cbiAgcmV0dXJuIGF0dHJzO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJvbGUgZGV0ZWN0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGludGVyZmFjZSBSb2xlRGV0ZWN0aW9uIHtcbiAgcm9sZTogUm9sZUlkO1xuICBjb25maWRlbmNlOiBudW1iZXI7XG4gIGJyZWFrZG93bjogQ29uZmlkZW5jZUJyZWFrZG93bjtcbiAgcmVhc29uOiBzdHJpbmc7XG4gIGZyYW1ld29yazogc3RyaW5nIHwgbnVsbDtcbiAgZnJhbWV3b3JrQ2xhc3M6IHN0cmluZyB8IG51bGw7XG59XG5cbmZ1bmN0aW9uIGNsZWFuQnJlYWtkb3duKCk6IENvbmZpZGVuY2VCcmVha2Rvd24ge1xuICByZXR1cm4geyB0YWc6IG51bGwsIHJvbGVBdHRyOiBudWxsLCBrbGFzczogbnVsbCwgZnJhbWV3b3JrOiBudWxsLCBhcmlhOiBudWxsIH07XG59XG5cbmZ1bmN0aW9uIG1hdGNoRnJhbWV3b3JrQ2xhc3MoXG4gIGVsOiBFbGVtZW50TGlrZSxcbiAgY29uZmlnOiBSb2xlTWFwcGluZ0NvbmZpZ1xuKTogeyBtYXBwaW5nOiBGcmFtZXdvcmtSb2xlTWFwcGluZzsgY2xhc3NUb2tlbjogc3RyaW5nIH0gfCBudWxsIHtcbiAgY29uc3QgY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lICE9PSB1bmRlZmluZWQgJiYgZWwuY2xhc3NOYW1lICE9PSBudWxsID8gU3RyaW5nKGVsLmNsYXNzTmFtZSkgOiAoZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnKTtcbiAgaWYgKCFjbGFzc05hbWUpIHJldHVybiBudWxsO1xuICBsZXQgYmVzdDogeyBtYXBwaW5nOiBGcmFtZXdvcmtSb2xlTWFwcGluZzsgY2xhc3NUb2tlbjogc3RyaW5nOyBzY29yZTogbnVtYmVyIH0gfCBudWxsID0gbnVsbDtcbiAgZm9yIChjb25zdCBtIG9mIGNvbmZpZy5mcmFtZXdvcmtSb2xlTWFwcGluZ3MpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKG0uY2xhc3NQYXR0ZXJuKTtcbiAgICAgIGNvbnN0IG0yID0gY2xhc3NOYW1lLm1hdGNoKHJlKTtcbiAgICAgIGlmICghbTIpIGNvbnRpbnVlO1xuICAgICAgLy8gUHJlZmVyIHRoZSBoaWdoZXN0LWNvbmZpZGVuY2UgbWFwcGluZzsgdGllLWJyZWFrIGJ5IGxvbmdlc3QgbWF0Y2hlZFxuICAgICAgLy8gdG9rZW4gKGUuZy4gXCJzbGRzLWNvbWJvYm94X19pbnB1dFwiIFx1MjE5MiBjb21ib2JveCwgbm90IHNsZHMtaW5wdXQpLlxuICAgICAgY29uc3Qgc2NvcmUgPSBtLmNvbmZpZGVuY2UgKiAxMDAwICsgKG0yWzBdPy5sZW5ndGggfHwgMCk7XG4gICAgICBpZiAoIWJlc3QgfHwgc2NvcmUgPiBiZXN0LnNjb3JlKSBiZXN0ID0geyBtYXBwaW5nOiBtLCBjbGFzc1Rva2VuOiBtMlswXSwgc2NvcmUgfTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIG1hbGZvcm1lZCBwYXR0ZXJuIGluIHVzZXIgSlNPTiBcdTIwMTQgc2tpcFxuICAgIH1cbiAgfVxuICByZXR1cm4gYmVzdCA/IHsgbWFwcGluZzogYmVzdC5tYXBwaW5nLCBjbGFzc1Rva2VuOiBiZXN0LmNsYXNzVG9rZW4gfSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIG1hdGNoQXR0cmlidXRlUm9sZShlbDogRWxlbWVudExpa2UsIGNvbmZpZzogUm9sZU1hcHBpbmdDb25maWcpOiB7IG1hcHBpbmc6IEF0dHJpYnV0ZVJvbGVNYXBwaW5nOyB2YWx1ZTogc3RyaW5nIH0gfCBudWxsIHtcbiAgZm9yIChjb25zdCBtIG9mIGNvbmZpZy5hdHRyaWJ1dGVSb2xlTWFwcGluZ3MpIHtcbiAgICBjb25zdCB2ID0gZWwuZ2V0QXR0cmlidXRlKG0uYXR0cmlidXRlKTtcbiAgICBpZiAodiA9PT0gbnVsbCB8fCB2ID09PSAnJykgY29udGludWU7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChuZXcgUmVnRXhwKG0udmFsdWVQYXR0ZXJuKS50ZXN0KHYpKSByZXR1cm4geyBtYXBwaW5nOiBtLCB2YWx1ZTogdiB9O1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gbWFsZm9ybWVkIHBhdHRlcm4gaW4gdXNlciBKU09OIFx1MjAxNCBza2lwXG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKiogVGFnICsgdHlwZSBiYXNlZCByb2xlICg5NSUgY29uZmlkZW5jZSkuICovXG5mdW5jdGlvbiBkZXRlY3RCeVRhZyhlbDogRWxlbWVudExpa2UsIGNvbmZpZzogUm9sZU1hcHBpbmdDb25maWcpOiBSb2xlRGV0ZWN0aW9uIHwgbnVsbCB7XG4gIGNvbnN0IHRhZyA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgdGFnUm9sZXMgPSBjb25maWcudGFnUm9sZXMgfHwge307XG4gIGNvbnN0IGlucHV0VHlwZVJvbGVzID0gY29uZmlnLmlucHV0VHlwZVJvbGVzIHx8IHt9O1xuXG4gIC8vIGlucHV0IFx1MjE5MiByb2xlIGZyb20gdHlwZVxuICBpZiAodGFnID09PSAnaW5wdXQnKSB7XG4gICAgY29uc3QgdHlwZSA9IChlbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSB8fCAndGV4dCcpLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3Qgcm9sZSA9IGlucHV0VHlwZVJvbGVzW3R5cGVdO1xuICAgIGlmIChyb2xlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByb2xlLCBjb25maWRlbmNlOiA5NSxcbiAgICAgICAgYnJlYWtkb3duOiB7IC4uLmNsZWFuQnJlYWtkb3duKCksIHRhZzogOTUgfSxcbiAgICAgICAgcmVhc29uOiBgTWF0Y2hlZCA8aW5wdXQgdHlwZT1cIiR7dHlwZX1cIj4gXHUyMTkyICR7cm9sZU5hbWUocm9sZSl9ICgke3JvbGV9KWAsXG4gICAgICAgIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBpZiAodGFnID09PSAndGV4dGFyZWEnKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogNDIsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDx0ZXh0YXJlYT4gXHUyMTkyICR7cm9sZU5hbWUoNDIpfSAoNDIpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdzZWxlY3QnKSB7XG4gICAgY29uc3QgbXVsdGlwbGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ211bHRpcGxlJykgIT09IG51bGw7XG4gICAgcmV0dXJuIHsgcm9sZTogNDYsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDxzZWxlY3Qke211bHRpcGxlID8gJyBtdWx0aXBsZScgOiAnJ30+IFx1MjE5MiBEcm9wZG93biAoNDYpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdidXR0b24nKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogNDMsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDxidXR0b24+IFx1MjE5MiBCdXR0b24gKDQzKWAsIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwgfTtcbiAgfVxuICBpZiAodGFnID09PSAnYScpIHtcbiAgICByZXR1cm4geyByb2xlOiAzMCwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPGE+IFx1MjE5MiBMaW5rICgzMClgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gIH1cbiAgaWYgKHRhZyA9PT0gJ2ltZycpIHtcbiAgICByZXR1cm4geyByb2xlOiA0MCwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPGltZz4gXHUyMTkyIEltYWdlICg0MClgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gIH1cbiAgaWYgKHRhZyA9PT0gJ3RhYmxlJyB8fCB0YWcgPT09ICd0Ym9keScpIHtcbiAgICByZXR1cm4geyByb2xlOiAyNCwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPCR7dGFnfT4gXHUyMTkyIFRhYmxlICgyNClgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gIH1cbiAgaWYgKHRhZyA9PT0gJ3RyJykge1xuICAgIHJldHVybiB7IHJvbGU6IDI4LCBjb25maWRlbmNlOiA5NSwgYnJlYWtkb3duOiB7IC4uLmNsZWFuQnJlYWtkb3duKCksIHRhZzogOTUgfSwgcmVhc29uOiBgTWF0Y2hlZCA8dHI+IFx1MjE5MiBUYWJsZSByb3cgKDI4KWAsIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwgfTtcbiAgfVxuICBpZiAodGFnID09PSAndGQnIHx8IHRhZyA9PT0gJ3RoJykge1xuICAgIHJldHVybiB7IHJvbGU6IDI5LCBjb25maWRlbmNlOiA5NSwgYnJlYWtkb3duOiB7IC4uLmNsZWFuQnJlYWtkb3duKCksIHRhZzogOTUgfSwgcmVhc29uOiBgTWF0Y2hlZCA8JHt0YWd9PiBcdTIxOTIgVGFibGUgY2VsbCAoMjkpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdsaScgfHwgdGFnID09PSAnb3B0aW9uJyB8fCB0YWcgPT09ICdvcHRncm91cCcpIHtcbiAgICByZXR1cm4geyByb2xlOiAzNCwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPCR7dGFnfT4gXHUyMTkyIExpc3QgaXRlbSAvIG9wdGlvbiAoMzQpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdsYWJlbCcpIHtcbiAgICByZXR1cm4geyByb2xlOiA0MSwgY29uZmlkZW5jZTogOTUsIGJyZWFrZG93bjogeyAuLi5jbGVhbkJyZWFrZG93bigpLCB0YWc6IDk1IH0sIHJlYXNvbjogYE1hdGNoZWQgPGxhYmVsPiBcdTIxOTIgVGV4dCAoNDEpYCwgZnJhbWV3b3JrOiBudWxsLCBmcmFtZXdvcmtDbGFzczogbnVsbCB9O1xuICB9XG4gIGlmICh0YWcgPT09ICdzdmcnIHx8IHRhZyA9PT0gJ2knKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogODIsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDwke3RhZ30+IFx1MjE5MiBJY29uICg4MilgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gIH1cbiAgaWYgKHRhZyA9PT0gJ25hdicgfHwgdGFnID09PSAnZm9ybScgfHwgdGFnID09PSAnZmllbGRzZXQnKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogMTAsIGNvbmZpZGVuY2U6IDk1LCBicmVha2Rvd246IHsgLi4uY2xlYW5CcmVha2Rvd24oKSwgdGFnOiA5NSB9LCByZWFzb246IGBNYXRjaGVkIDwke3RhZ30+IFx1MjE5MiBDb250YWluZXIgKDEwKWAsIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwgfTtcbiAgfVxuICBjb25zdCBjdXN0b20gPSB0YWdSb2xlc1t0YWddO1xuICBpZiAoY3VzdG9tKSB7XG4gICAgcmV0dXJuIHsgcm9sZTogY3VzdG9tLCBjb25maWRlbmNlOiA5NSwgYnJlYWtkb3duOiB7IC4uLmNsZWFuQnJlYWtkb3duKCksIHRhZzogOTUgfSwgcmVhc29uOiBgTWF0Y2hlZCA8JHt0YWd9PiBcdTIxOTIgJHtyb2xlTmFtZShjdXN0b20pfSAoJHtjdXN0b219KWAsIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwgfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBNYWluIHJvbGUgZGV0ZWN0aW9uLiBQcmlvcml0eSAobWlycm9ycyBFcGlwbGV4IGV2YWx1YXRpb246IGF0dHJpYnV0ZS9jbGFzc1xuICogcnVsZXMgYXJlIGNvbnN1bHRlZCBiZWZvcmUgdGFnIHJ1bGVzKTpcbiAqICAgMS4gcm9sZT1cIlwiIGF0dHJpYnV0ZSAoODgpICAgICAgICAgICAgICBcdTIwMTQgYXV0aG9yIGludGVudCAoQVJJQSB3aWRnZXRzKVxuICogICAyLiB3aWRnZXQgY2xhc3Mgb24gYSB0ZXh0LWlzaCBjb250cm9sICBcdTIwMTQgaW5wdXRbdHlwZT10ZXh0XS5kYXRlcGlja2VyIFx1MjE5MiA5MlxuICogICAzLiBzdHJvbmcgdGFnICsgdHlwZSAoOTUpICAgICAgICAgICAgICBcdTIwMTQgaW5wdXQvc2VsZWN0L2J1dHRvbi9hL2ltZy90YWJsZS9cdTIwMjZcbiAqICAgNC4gZnJhbWV3b3JrIGNsYXNzICg5MFx1MjAxMzk1KSAgICAgICAgICAgICBcdTIwMTQgbWF0LXNlbGVjdCwgc2xkcy1idXR0b24sIFx1MjAyNlxuICogICA1LiBnZW5lcmljIGNsYXNzICg3MFx1MjAxMzgwKSAgICAgICAgICAgICAgIFx1MjAxNCBjb21ib2JveCwgY2hlY2tib3gsIGNhbGVuZGFyXHUyMDI2XG4gKiAgIDYuIEFSSUEgaGludHMgKDcwXHUyMDEzODIpICAgICAgICAgICAgICAgICAgXHUyMDE0IGFyaWEtaGFzcG9wdXAvbGlzdGJveFx1MjAyNlxuICogICA3LiBkZWZhdWx0IHRhZyByb2xlICg0MSB0ZXh0IC8gMTAgY29udGFpbmVyKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0Q29udHJvbFJvbGUoXG4gIGVsOiBFbGVtZW50TGlrZSxcbiAgY29uZmlnOiBSb2xlTWFwcGluZ0NvbmZpZyxcbiAgZnJhbWV3b3JrS2V5OiBzdHJpbmcgfCBudWxsXG4pOiBSb2xlRGV0ZWN0aW9uIHtcbiAgY29uc3QgdGFnID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBicmVha2Rvd24gPSBjbGVhbkJyZWFrZG93bigpO1xuXG4gIC8vIDEuIEV4cGxpY2l0IHJvbGUgYXR0cmlidXRlIChhdXRob3IgaW50ZW50KS5cbiAgY29uc3QgYnlBdHRyID0gbWF0Y2hBdHRyaWJ1dGVSb2xlKGVsLCBjb25maWcpO1xuICBpZiAoYnlBdHRyKSB7XG4gICAgY29uc3QgeyBtYXBwaW5nLCB2YWx1ZSB9ID0gYnlBdHRyO1xuICAgIGJyZWFrZG93bi5yb2xlQXR0ciA9IG1hcHBpbmcuY29uZmlkZW5jZTtcbiAgICBpZiAobWFwcGluZy5hdHRyaWJ1dGUgPT09ICdhcmlhLWhhc3BvcHVwJyB8fCBtYXBwaW5nLmF0dHJpYnV0ZSA9PT0gJ2FyaWEtZXhwYW5kZWQnKSBicmVha2Rvd24uYXJpYSA9IG1hcHBpbmcuY29uZmlkZW5jZTtcbiAgICByZXR1cm4ge1xuICAgICAgcm9sZTogbWFwcGluZy5yb2xlLCBjb25maWRlbmNlOiBtYXBwaW5nLmNvbmZpZGVuY2UsIGJyZWFrZG93bixcbiAgICAgIHJlYXNvbjogYE1hdGNoZWQgJHttYXBwaW5nLmF0dHJpYnV0ZX09XCIke3ZhbHVlfVwiIFx1MjE5MiAke3JvbGVOYW1lKG1hcHBpbmcucm9sZSl9ICgke21hcHBpbmcucm9sZX0pYCxcbiAgICAgIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIC8vIENsYXNzIG1hcHBpbmcgKGZyYW1ld29yay1zcGVjaWZpYyBvciBnZW5lcmljIHdpZGdldCBjbGFzc2VzKS5cbiAgY29uc3QgYnlDbGFzcyA9IG1hdGNoRnJhbWV3b3JrQ2xhc3MoZWwsIGNvbmZpZyk7XG5cbiAgLy8gMi8zLiBTdHJvbmcgbmF0aXZlIHRhZ3MgXHUyMDE0IGJ1dCBhIHdpZGdldCBjbGFzcyBvbiBhIHRleHQtaXNoIGNvbnRyb2wgd2luc1xuICAvLyAoaW5wdXRbdHlwZT10ZXh0XSB3aXRoIGNsYXNzIFwiZGF0ZXBpY2tlclwiL1wiY29tYm9ib3hcIi9cIm1hdC1zZWxlY3RcIiBpcyBhXG4gIC8vIGRhdGUvZHJvcGRvd24sIG5vdCBhIHBsYWluIHRleHQgYm94KS5cbiAgaWYgKFNUUk9OR19UQUdTLmhhcyh0YWcpKSB7XG4gICAgY29uc3QgYnlUYWcgPSBkZXRlY3RCeVRhZyhlbCwgY29uZmlnKTtcbiAgICBpZiAoYnlUYWcpIHtcbiAgICAgIGlmIChieUNsYXNzICYmIGJ5VGFnLnJvbGUgPT09IDQyICYmIFdJREdFVF9ST0xFUy5oYXMoYnlDbGFzcy5tYXBwaW5nLnJvbGUpKSB7XG4gICAgICAgIGJyZWFrZG93bi5mcmFtZXdvcmsgPSBieUNsYXNzLm1hcHBpbmcuY29uZmlkZW5jZTtcbiAgICAgICAgYnJlYWtkb3duLmtsYXNzID0gYnlDbGFzcy5tYXBwaW5nLmNvbmZpZGVuY2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcm9sZTogYnlDbGFzcy5tYXBwaW5nLnJvbGUsIGNvbmZpZGVuY2U6IGJ5Q2xhc3MubWFwcGluZy5jb25maWRlbmNlLCBicmVha2Rvd24sXG4gICAgICAgICAgcmVhc29uOiBgTWF0Y2hlZCB3aWRnZXQgY2xhc3MgXCIke2J5Q2xhc3MuY2xhc3NUb2tlbn1cIiAoJHtieUNsYXNzLm1hcHBpbmcuZnJhbWV3b3JrfSkgb24gPCR7dGFnfT4gXHUyMTkyICR7cm9sZU5hbWUoYnlDbGFzcy5tYXBwaW5nLnJvbGUpfSAoJHtieUNsYXNzLm1hcHBpbmcucm9sZX0pYCxcbiAgICAgICAgICBmcmFtZXdvcms6IGZyYW1ld29ya0tleSB8fCBieUNsYXNzLm1hcHBpbmcuZnJhbWV3b3JrLFxuICAgICAgICAgIGZyYW1ld29ya0NsYXNzOiBieUNsYXNzLmNsYXNzVG9rZW4sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gYnlUYWc7XG4gICAgfVxuICB9XG5cbiAgLy8gNC81LiBGcmFtZXdvcmstc3BlY2lmaWMgLyBnZW5lcmljIGNsYXNzIG9uIGEgZ2VuZXJpYyBvciBjdXN0b20gZWxlbWVudC5cbiAgaWYgKGJ5Q2xhc3MpIHtcbiAgICBjb25zdCB7IG1hcHBpbmcsIGNsYXNzVG9rZW4gfSA9IGJ5Q2xhc3M7XG4gICAgYnJlYWtkb3duLmZyYW1ld29yayA9IG1hcHBpbmcuY29uZmlkZW5jZTtcbiAgICBicmVha2Rvd24ua2xhc3MgPSBtYXBwaW5nLmNvbmZpZGVuY2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvbGU6IG1hcHBpbmcucm9sZSwgY29uZmlkZW5jZTogbWFwcGluZy5jb25maWRlbmNlLCBicmVha2Rvd24sXG4gICAgICByZWFzb246IGBNYXRjaGVkIGZyYW1ld29yayBjbGFzcyBcIiR7Y2xhc3NUb2tlbn1cIiAoJHttYXBwaW5nLmZyYW1ld29ya30pIFx1MjE5MiAke3JvbGVOYW1lKG1hcHBpbmcucm9sZSl9ICgke21hcHBpbmcucm9sZX0pYCxcbiAgICAgIGZyYW1ld29yazogZnJhbWV3b3JrS2V5IHx8IG1hcHBpbmcuZnJhbWV3b3JrLFxuICAgICAgZnJhbWV3b3JrQ2xhc3M6IGNsYXNzVG9rZW4sXG4gICAgfTtcbiAgfVxuXG4gIC8vIDYuIEFSSUEgYXR0cmlidXRlIGhpbnRzIChjb21ib2JveCwgZGF0ZXBpY2tlclx1MjAyNikuXG4gIGZvciAoY29uc3QgW2F0dHIsIHJlLCByb2xlLCBjb25mXSBvZiBbXG4gICAgWydhcmlhLWhhc3BvcHVwJywgL2xpc3Rib3h8bWVudXx0cnVlL2ksIDQ2LCA4Ml0sXG4gICAgWydhcmlhLWV4cGFuZGVkJywgL3RydWV8ZmFsc2UvaSwgNDYsIDcwXSxcbiAgICBbJ2FyaWEtYXV0b2NvbXBsZXRlJywgL2xpc3R8aW5saW5lL2ksIDQyLCA3MF0sXG4gIF0gYXMgY29uc3QpIHtcbiAgICBjb25zdCB2ID0gZWwuZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgIGlmICh2ICYmIHJlLnRlc3QodikpIHtcbiAgICAgIGJyZWFrZG93bi5hcmlhID0gY29uZjtcbiAgICAgIHJldHVybiB7IHJvbGUsIGNvbmZpZGVuY2U6IGNvbmYsIGJyZWFrZG93biwgcmVhc29uOiBgTWF0Y2hlZCAke2F0dHJ9PVwiJHt2fVwiIFx1MjE5MiAke3JvbGVOYW1lKHJvbGUpfSAoJHtyb2xlfSlgLCBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsIH07XG4gICAgfVxuICB9XG5cbiAgLy8gNy4gRGVmYXVsdDogcm9sZSBmcm9tIHRoZSB0YWctbWFwcGluZyB0YWJsZSAodGV4dCB0YWdzLCBjdXN0b20gZWxlbWVudHMsXG4gIC8vIHNlbWFudGljIGNvbnRhaW5lcnMpLCBlbHNlIHBsYWluIFRleHQgKDQxKS5cbiAgY29uc3QgZGVmID0gY29uZmlnLnRhZ1JvbGVzPy5bdGFnXTtcbiAgYnJlYWtkb3duLnRhZyA9IDYwO1xuICBpZiAoZGVmICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcm9sZTogZGVmLCBjb25maWRlbmNlOiA2MCwgYnJlYWtkb3duLFxuICAgICAgcmVhc29uOiBgRGVmYXVsdCA8JHt0YWd9PiBcdTIxOTIgJHtyb2xlTmFtZShkZWYpfSAoJHtkZWZ9KWAsXG4gICAgICBmcmFtZXdvcms6IG51bGwsIGZyYW1ld29ya0NsYXNzOiBudWxsLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHtcbiAgICByb2xlOiA0MSwgY29uZmlkZW5jZTogNjAsIGJyZWFrZG93bixcbiAgICByZWFzb246IGBEZWZhdWx0IDwke3RhZ30+IFx1MjE5MiBUZXh0ICg0MSlgLFxuICAgIGZyYW1ld29yazogbnVsbCwgZnJhbWV3b3JrQ2xhc3M6IG51bGwsXG4gIH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUnVsZSBidWlsZGluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHBpcGUodmFsdWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGNvbnN0IHVuaXEgPSBbLi4ubmV3IFNldCh2YWx1ZXMuZmlsdGVyKEJvb2xlYW4pKV07XG4gIHJldHVybiBgfCR7dW5pcS5qb2luKCd8Jyl9fGA7XG59XG5cbi8qKiBCdWlsZCBhIEJhc2VkT25UYWdzIHJ1bGUgZnJvbSBhIGNvbnRyb2wgZGV0ZWN0ZWQgYnkgdGFnLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVGFnUnVsZShjOiBEZXRlY3RlZENvbnRyb2wpOiBUYWdSdWxlIHwgbnVsbCB7XG4gIGNvbnN0IHRhZyA9IGMuYXR0cmlidXRlcy50YWdOYW1lO1xuICBjb25zdCBjb25kczogVGFnQ29uZGl0aW9uW10gPSBbXTtcbiAgLy8gSWNvbnMgKHN2Zy9pL21hdC1pY29uKSBvbmx5IGdldCBhIHRhZyBydWxlIHVuZGVyIGEgY29udGFpbmVyIChQYXJlbnRSb2xlPTEwKSxcbiAgLy8gZXhhY3RseSBsaWtlIHRoZSB3b3JraW5nIHJlZmVyZW5jZSAofGl8c3ZnfG1hdC1pY29ufCBcdTIxOTIgODIsIFBhcmVudFJvbGU9XCIxMFwiKS5cbiAgLy8gVGhpcyBrZWVwcyBpY29ucyBuZXN0ZWQgaW5zaWRlIGxpbmtzL2J1dHRvbnMgZnJvbSBvdmVycmlkaW5nIHRob3NlIGNvbnRyb2xzLlxuICBpZiAoYy5yb2xlID09PSA4MiAmJiAodGFnID09PSAnc3ZnJyB8fCB0YWcgPT09ICdpJyB8fCB0YWcgPT09ICdtYXQtaWNvbicpICYmIGMucGFyZW50Um9sZSAhPT0gMTApIHJldHVybiBudWxsO1xuICBpZiAodGFnID09PSAnaW5wdXQnKSB7XG4gICAgY29uc3QgdHlwZSA9IGMuYXR0cmlidXRlcy50eXBlIHx8ICd0ZXh0JztcbiAgICBjb25zdCB0ID0gbm9ybWFsaXplVHlwZSh0eXBlKTtcbiAgICBjb25kcy5wdXNoKHsgdGFnTmFtZTogJ3xJTlBVVHwnLCB0eXBlOiBwaXBlKFt0XSkgfSk7XG4gIH0gZWxzZSBpZiAodGFnID09PSAnc2VsZWN0Jykge1xuICAgIGNvbnN0IG11bHRpcGxlID0gYy5hdHRyaWJ1dGVzLm11bHRpcGxlID09PSB0cnVlO1xuICAgIGNvbmRzLnB1c2goeyB0YWdOYW1lOiAnfFNFTEVDVHwnLCB0eXBlOiBwaXBlKFttdWx0aXBsZSA/ICdTRUxFQ1QtTVVMVElQTEUnIDogJ1NFTEVDVC1PTkUnXSkgfSk7XG4gIH0gZWxzZSBpZiAodGFnID09PSAndGV4dGFyZWEnKSB7XG4gICAgY29uZHMucHVzaCh7IHRhZ05hbWU6ICd8VEVYVEFSRUF8JyB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25kcy5wdXNoKHsgdGFnTmFtZTogcGlwZShbbm9ybWFsaXplVGFnTmFtZSh0YWcpXSkgfSk7XG4gIH1cbiAgLy8gSW1hZ2VzIG1hdGNoIHRoZSByZWZlcmVuY2UncyB1bnJlc3RyaWN0ZWQgfElNR3wgXHUyMTkyIDQwIChQYXJlbnRSb2xlPVwiXCIpLCBzbyBhbnlcbiAgLy8gcGFyZW50LWJhc2VkIGltZyBydWxlIGlzIG5vcm1hbGl6ZWQgYXdheSB0byBrZWVwIHBhcml0eS5cbiAgY29uc3QgcGFyZW50ID0gdGFnID09PSAnaW1nJyAmJiBjLnJvbGUgPT09IDQwID8gbnVsbCA6IGMucGFyZW50Um9sZTtcbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50Um9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBwYXJlbnQsIGNvbmRpdGlvbnM6IGNvbmRzLFxuICAgIHNvdXJjZTogYy5yZWFzb24sIGZyYW1ld29yazogYy5mcmFtZXdvcmsgPz8gdW5kZWZpbmVkLCBjb25maWRlbmNlOiBjLmNvbmZpZGVuY2UsXG4gIH07XG59XG5cbi8qKiBJbnRlcmFjdGl2ZSBhbmNlc3RvciByb2xlcyB0aGF0IG93biB0aGVpciBuZXN0ZWQgaWNvbnMvaW1hZ2VzIChsaW5rL2J1dHRvbi9cdTIwMjYpLiAqL1xuY29uc3QgSU5URVJBQ1RJVkVfUEFSRU5UX1JPTEVTID0gbmV3IFNldDxSb2xlSWQ+KFszMCwgNDMsIDEyLCAzNywgNDIsIDQ0LCA0NSwgNDYsIDkyLCAzNF0pO1xuXG4vKiogQnVpbGQgYSBCYXNlZE9uQXR0cmlidXRlcyBydWxlIGZyb20gYSBjb250cm9sIGRldGVjdGVkIGJ5IGNsYXNzIC8gcm9sZSAvIGFyaWEuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBdHRyaWJ1dGVSdWxlKGM6IERldGVjdGVkQ29udHJvbCwgY29uZmlnOiBSb2xlTWFwcGluZ0NvbmZpZyk6IEF0dHJpYnV0ZVJ1bGUgfCBudWxsIHtcbiAgY29uc3QgYSA9IGMuYXR0cmlidXRlcztcbiAgLy8gR3VhcmQ6IGljb25zL2ltYWdlcyBuZXN0ZWQgaW5zaWRlIGludGVyYWN0aXZlIGNvbnRyb2xzIChsaW5rcywgYnV0dG9ucywgXHUyMDI2KVxuICAvLyBiZWxvbmcgdG8gdGhhdCBjb250cm9sIFx1MjAxNCBuZXZlciBlbWl0IGEgc3RhbmRhbG9uZSBydWxlIHRoYXQgY291bGQgc3RlYWwgaXRzXG4gIC8vIGNsaWNrIChtaXJyb3JzIHRoZSB0YWctcnVsZSByZXN0cmljdGlvbiBmb3Igc3ZnL2kvbWF0LWljb24pLlxuICBpZiAoKGMucm9sZSA9PT0gODIgfHwgYy5yb2xlID09PSA0MCkgJiYgYy5wYXJlbnRSb2xlICE9IG51bGwgJiYgSU5URVJBQ1RJVkVfUEFSRU5UX1JPTEVTLmhhcyhjLnBhcmVudFJvbGUpKSByZXR1cm4gbnVsbDtcbiAgLy8gUm9sZSBhdHRyaWJ1dGUgbWF0Y2guXG4gIGlmIChhLnJvbGUpIHtcbiAgICBjb25zdCByb2xlTWFwcGluZyA9IGNvbmZpZy5hdHRyaWJ1dGVSb2xlTWFwcGluZ3MuZmluZChcbiAgICAgIChtKSA9PiBtLmF0dHJpYnV0ZSA9PT0gJ3JvbGUnICYmIG5ldyBSZWdFeHAobS52YWx1ZVBhdHRlcm4pLnRlc3QoYS5yb2xlIHx8ICcnKVxuICAgICk7XG4gICAgaWYgKHJvbGVNYXBwaW5nKSB7XG4gICAgICByZXR1cm4geyBjdXJyZW50Um9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBjLnBhcmVudFJvbGUsIGF0dHJpYnV0ZTogJ3JvbGUnLCB2YWx1ZXM6IFthLnJvbGVdLCBvcGVyYXRvcjogJ2VxdWFscycsIHNvdXJjZTogYy5yZWFzb24sIGZyYW1ld29yazogYy5mcmFtZXdvcmsgPz8gdW5kZWZpbmVkLCBjb25maWRlbmNlOiBjLmNvbmZpZGVuY2UgfTtcbiAgICB9XG4gIH1cbiAgLy8gRnJhbWV3b3JrIC8gZ2VuZXJpYyBjbGFzcyBtYXRjaC5cbiAgY29uc3QgY2xzID0gYS5jbGFzc05hbWU7XG4gIGlmIChjbHMpIHtcbiAgICBjb25zdCB0b2tlbnMgPSBjbHMuc3BsaXQoL1xccysvKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgY29uc3QgbWFwcGVkID0gdG9rZW5zLmZpbHRlcigodCkgPT4ge1xuICAgICAgdHJ5IHsgcmV0dXJuIGNvbmZpZy5mcmFtZXdvcmtSb2xlTWFwcGluZ3Muc29tZSgobSkgPT4gbmV3IFJlZ0V4cChtLmNsYXNzUGF0dGVybikudGVzdCh0KSk7IH1cbiAgICAgIGNhdGNoIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfSk7XG4gICAgaWYgKG1hcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4geyBjdXJyZW50Um9sZTogYy5yb2xlLCBwYXJlbnRSb2xlOiBjLnBhcmVudFJvbGUsIGF0dHJpYnV0ZTogJ2NsYXNzTmFtZScsIHZhbHVlczogbWFwcGVkLCBvcGVyYXRvcjogJ2NvbnRhaW5zJywgc291cmNlOiBjLnJlYXNvbiwgZnJhbWV3b3JrOiBjLmZyYW1ld29yayA/PyB1bmRlZmluZWQsIGNvbmZpZGVuY2U6IGMuY29uZmlkZW5jZSB9O1xuICAgIH1cbiAgfVxuICAvLyBkYXRhLSogaGludHMgKGUuZy4gZGF0YS1jb21wLWlkPVwiZGF0ZS1waWNrZXJcIikuXG4gIGlmIChhLmRhdGEpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhhLmRhdGEpKSB7XG4gICAgICBjb25zdCBmdWxsID0gYGRhdGEtJHtrZXkucmVwbGFjZSgvKFtBLVpdKS9nLCAnLSQxJykudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgY29uc3QgdiA9IGEuZGF0YVtrZXldO1xuICAgICAgaWYgKC8oZGF0ZXxjYWxlbmRhcikvaS50ZXN0KHYpKSB7XG4gICAgICAgIHJldHVybiB7IGN1cnJlbnRSb2xlOiBjLnJvbGUsIHBhcmVudFJvbGU6IGMucGFyZW50Um9sZSwgYXR0cmlidXRlOiBmdWxsLCB2YWx1ZXM6IFt2XSwgb3BlcmF0b3I6ICdjb250YWlucycsIHNvdXJjZTogYy5yZWFzb24sIGZyYW1ld29yazogYy5mcmFtZXdvcmsgPz8gdW5kZWZpbmVkLCBjb25maWRlbmNlOiBjLmNvbmZpZGVuY2UgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRGVkdXBsaWNhdGlvbiAmIG1lcmdpbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiB1bmlxUGlwZShsaXN0OiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIFsuLi5uZXcgU2V0KGxpc3QpXTtcbn1cblxuLyoqIE1lcmdlIHRhZyBydWxlcyB3aXRoIGlkZW50aWNhbCAocm9sZSwgcGFyZW50KSBieSB1bmlvbmluZyBjb25kaXRpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZHVwbGljYXRlVGFnUnVsZXMocnVsZXM6IFRhZ1J1bGVbXSk6IFRhZ1J1bGVbXSB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBUYWdSdWxlPigpO1xuICBmb3IgKGNvbnN0IHIgb2YgcnVsZXMpIHtcbiAgICBjb25zdCBrZXkgPSBgJHtyLmN1cnJlbnRSb2xlfXwke3IucGFyZW50Um9sZSA/PyAnJ31gO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gbWFwLmdldChrZXkpO1xuICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgIG1hcC5zZXQoa2V5LCB7IC4uLnIsIGNvbmRpdGlvbnM6IFsuLi5yLmNvbmRpdGlvbnNdIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAoY29uc3QgY29uZCBvZiByLmNvbmRpdGlvbnMpIHtcbiAgICAgIGNvbnN0IGhpdCA9IGV4aXN0aW5nLmNvbmRpdGlvbnMuZmluZCgoYzIpID0+IGMyLnRhZ05hbWUgPT09IGNvbmQudGFnTmFtZSAmJiBjMi50eXBlID09PSBjb25kLnR5cGUpO1xuICAgICAgaWYgKCFoaXQpIGV4aXN0aW5nLmNvbmRpdGlvbnMucHVzaCh7IC4uLmNvbmQgfSk7XG4gICAgfVxuICAgIGV4aXN0aW5nLmNvbmZpZGVuY2UgPSBNYXRoLm1heChleGlzdGluZy5jb25maWRlbmNlLCByLmNvbmZpZGVuY2UpO1xuICAgIGV4aXN0aW5nLnNvdXJjZSA9IFtleGlzdGluZy5zb3VyY2UsIHIuc291cmNlXS5maWx0ZXIoKHMsIGksIGFycikgPT4gYXJyLmluZGV4T2YocykgPT09IGkpLmpvaW4oJyBcdTAwQjcgJyk7XG4gIH1cbiAgLy8gTWVyZ2UgY29uZGl0aW9ucyB3aXRoIHNhbWUgdGFnTmFtZSBieSB1bmlvbmluZyB0eXBlcy5cbiAgZm9yIChjb25zdCByIG9mIG1hcC52YWx1ZXMoKSkge1xuICAgIGNvbnN0IGJ5VGFnID0gbmV3IE1hcDxzdHJpbmcsIFRhZ0NvbmRpdGlvbj4oKTtcbiAgICBmb3IgKGNvbnN0IGNvbmQgb2Ygci5jb25kaXRpb25zKSB7XG4gICAgICBjb25zdCBoaXQgPSBieVRhZy5nZXQoY29uZC50YWdOYW1lKTtcbiAgICAgIGlmICghaGl0KSB7IGJ5VGFnLnNldChjb25kLnRhZ05hbWUsIHsgLi4uY29uZCB9KTsgY29udGludWU7IH1cbiAgICAgIGlmIChjb25kLnR5cGUpIGhpdC50eXBlID0gaGl0LnR5cGUgPyBgfCR7dW5pcVBpcGUoWy4uLmhpdC50eXBlLnNsaWNlKDEsIC0xKS5zcGxpdCgnfCcpLCAuLi5jb25kLnR5cGUuc2xpY2UoMSwgLTEpLnNwbGl0KCd8JyldKS5qb2luKCd8Jyl9fGAgOiBjb25kLnR5cGU7XG4gICAgfVxuICAgIHIuY29uZGl0aW9ucyA9IFsuLi5ieVRhZy52YWx1ZXMoKV07XG4gIH1cbiAgcmV0dXJuIFsuLi5tYXAudmFsdWVzKCldO1xufVxuXG4vKiogTWVyZ2UgYXR0cmlidXRlIHJ1bGVzIHdpdGggaWRlbnRpY2FsIChyb2xlLCBwYXJlbnQsIGF0dHJpYnV0ZSwgb3BlcmF0b3IpIGJ5IHVuaW9uaW5nIHZhbHVlcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWR1cGxpY2F0ZUF0dHJpYnV0ZVJ1bGVzKHJ1bGVzOiBBdHRyaWJ1dGVSdWxlW10pOiBBdHRyaWJ1dGVSdWxlW10ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgQXR0cmlidXRlUnVsZT4oKTtcbiAgZm9yIChjb25zdCByIG9mIHJ1bGVzKSB7XG4gICAgY29uc3Qga2V5ID0gYCR7ci5jdXJyZW50Um9sZX18JHtyLnBhcmVudFJvbGUgPz8gJyd9fCR7ci5hdHRyaWJ1dGV9fCR7ci5vcGVyYXRvcn1gO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gbWFwLmdldChrZXkpO1xuICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgIG1hcC5zZXQoa2V5LCB7IC4uLnIsIHZhbHVlczogWy4uLnIudmFsdWVzXSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBleGlzdGluZy52YWx1ZXMgPSB1bmlxUGlwZShbLi4uZXhpc3RpbmcudmFsdWVzLCAuLi5yLnZhbHVlc10pO1xuICAgIGV4aXN0aW5nLmNvbmZpZGVuY2UgPSBNYXRoLm1heChleGlzdGluZy5jb25maWRlbmNlLCByLmNvbmZpZGVuY2UpO1xuICAgIGV4aXN0aW5nLnNvdXJjZSA9IFtleGlzdGluZy5zb3VyY2UsIHIuc291cmNlXS5maWx0ZXIoKHMsIGksIGFycikgPT4gYXJyLmluZGV4T2YocykgPT09IGkpLmpvaW4oJyBcdTAwQjcgJyk7XG4gIH1cbiAgcmV0dXJuIFsuLi5tYXAudmFsdWVzKCldO1xufVxuXG4vKiogR2VuZXJpYyBkZWR1cCBmb3IgcnVsZXMgd2l0aCBhIGNvbXB1dGVkIGZpbmdlcnByaW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZHVwbGljYXRlUnVsZXM8VCBleHRlbmRzIHsgY3VycmVudFJvbGU6IFJvbGVJZDsgcGFyZW50Um9sZTogUm9sZUlkIHwgbnVsbCB9PihcbiAgcnVsZXM6IFRbXSxcbiAgZmluZ2VycHJpbnQ6IChyOiBUKSA9PiBzdHJpbmdcbik6IFRbXSB7XG4gIGNvbnN0IHNlZW4gPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcbiAgZm9yIChjb25zdCByIG9mIHJ1bGVzKSB7XG4gICAgY29uc3Qga2V5ID0gZmluZ2VycHJpbnQocik7XG4gICAgaWYgKCFzZWVuLmhhcyhrZXkpKSBzZWVuLnNldChrZXksIHIpO1xuICB9XG4gIHJldHVybiBbLi4uc2Vlbi52YWx1ZXMoKV07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3JjaGVzdHJhdGlvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVsZUdlbkNvbnRleHQge1xuICBjb25maWc6IFJvbGVNYXBwaW5nQ29uZmlnO1xuICB1cmw6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgbWluQ29uZmlkZW5jZTogbnVtYmVyO1xuICBlbWl0VHJhdmVyc2FsUnVsZXM6IGJvb2xlYW47XG4gIGVtaXRMYWJlbFJ1bGVzOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIHRoZSBmdWxsIHJ1bGUgbW9kZWwgZnJvbSBkZXRlY3RlZCBjb250cm9scy5cbiAqIE9yZGVyIG9mIGVtaXNzaW9uIG1hdGNoZXMgSUVBZGFwdG9yLnhtbDogQmFzZWRPblRhZ3MgXHUyMTkyIEJhc2VkT25BdHRyaWJ1dGVzIFx1MjE5MlxuICogQmFzZWRPblRyYXZlcnNlTG9naWMgXHUyMTkyIExhYmVsSWRlbnRpZmllciAoU3RhbmRhcmRMb2dpYyArIFRyYXZlcnNlTG9naWMpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVSdWxlTW9kZWwoXG4gIGNvbnRyb2xzOiBEZXRlY3RlZENvbnRyb2xbXSxcbiAgY3R4OiBSdWxlR2VuQ29udGV4dCxcbiAgZXh0cmE/OiB7IHRyYXZlcnNhbFJ1bGVzPzogVHJhdmVyc2FsUnVsZVtdOyBsYWJlbFJ1bGVzPzogeyBzdGFuZGFyZDogU3RhbmRhcmRMYWJlbFJ1bGVbXTsgdHJhdmVyc2U6IFRyYXZlcnNlTGFiZWxSdWxlW10gfSB9XG4pOiBSdWxlTW9kZWwge1xuICBjb25zdCB0YWdSdWxlczogVGFnUnVsZVtdID0gW107XG4gIGNvbnN0IGF0dHJSdWxlczogQXR0cmlidXRlUnVsZVtdID0gW107XG5cbiAgZm9yIChjb25zdCBjIG9mIGNvbnRyb2xzKSB7XG4gICAgaWYgKGMuY29uZmlkZW5jZSA8IGN0eC5taW5Db25maWRlbmNlKSBjb250aW51ZTtcbiAgICAvLyBUYWcgcnVsZXMgY29tZSBmcm9tIHRhZy1iYXNlZCBkZXRlY3Rpb25zIG9ubHkgKGF2b2lkIGRvdWJsZSBydWxlcyBmb3IgY2xhc3MtbWF0Y2hlZCBpbnB1dHMpLlxuICAgIGlmICghYy5mcmFtZXdvcmtDbGFzcykge1xuICAgICAgY29uc3QgdHIgPSBidWlsZFRhZ1J1bGUoYyk7XG4gICAgICBpZiAodHIpIHRhZ1J1bGVzLnB1c2godHIpO1xuICAgIH1cbiAgICBjb25zdCBhciA9IGJ1aWxkQXR0cmlidXRlUnVsZShjLCBjdHguY29uZmlnKTtcbiAgICBpZiAoYXIpIGF0dHJSdWxlcy5wdXNoKGFyKTtcbiAgfVxuXG4gIGNvbnN0IGRlZHVwVGFncyA9IGRlZHVwbGljYXRlVGFnUnVsZXModGFnUnVsZXMpO1xuICBjb25zdCBkZWR1cEF0dHJzID0gZGVkdXBsaWNhdGVBdHRyaWJ1dGVSdWxlcyhhdHRyUnVsZXMpO1xuICBjb25zdCB0cmF2ZXJzYWwgPSBleHRyYT8udHJhdmVyc2FsUnVsZXMgPyBkZWR1cGxpY2F0ZVJ1bGVzKGV4dHJhLnRyYXZlcnNhbFJ1bGVzLCB0cmF2ZXJzYWxGaW5nZXJwcmludCkgOiBbXTtcbiAgY29uc3Qgc3RhbmRhcmQgPSBleHRyYT8ubGFiZWxSdWxlcyA/IGV4dHJhLmxhYmVsUnVsZXMuc3RhbmRhcmQgOiBbXTtcbiAgY29uc3QgdHJhdmVyc2UgPSBleHRyYT8ubGFiZWxSdWxlcyA/IGV4dHJhLmxhYmVsUnVsZXMudHJhdmVyc2UgOiBbXTtcblxuICByZXR1cm4ge1xuICAgIGJhc2VkT25UYWdzOiBkZWR1cFRhZ3Muc29ydCgoYSwgYikgPT4gYS5jdXJyZW50Um9sZSAtIGIuY3VycmVudFJvbGUpLFxuICAgIGJhc2VkT25BdHRyaWJ1dGVzOiBkZWR1cEF0dHJzLnNvcnQoKGEsIGIpID0+IGEuY3VycmVudFJvbGUgLSBiLmN1cnJlbnRSb2xlKSxcbiAgICBiYXNlZE9uVHJhdmVyc2VMb2dpYzogdHJhdmVyc2FsLnNvcnQoKGEsIGIpID0+IGEuY3VycmVudFJvbGUgLSBiLmN1cnJlbnRSb2xlKSxcbiAgICBzdGFuZGFyZExvZ2ljOiBzdGFuZGFyZCxcbiAgICB0cmF2ZXJzZUxvZ2ljOiB0cmF2ZXJzZSxcbiAgICBzaXRlczogW2Ake2N0eC51cmx9JHtjdHgudGl0bGUgPyBgIFx1MjAxNCAke2N0eC50aXRsZX1gIDogJyd9YF0sXG4gICAgZGlhZ25vc3RpY3M6IFtdLFxuICB9O1xufVxuXG4vKiogRmluZ2VycHJpbnQgZm9yIHRyYXZlcnNhbCBydWxlcyAoZGVkdXAga2V5KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzYWxGaW5nZXJwcmludChyOiBUcmF2ZXJzYWxSdWxlKTogc3RyaW5nIHtcbiAgY29uc3QgY29uZCA9IFtyLmNvbmRpdGlvbi50YWdOYW1lLCByLmNvbmRpdGlvbi50eXBlLCByLmNvbmRpdGlvbi5jbGFzc05hbWUsIHIuY29uZGl0aW9uLmF0dHJpYnV0ZSwgci5jb25kaXRpb24udmFsdWVdLmpvaW4oJ3wnKTtcbiAgY29uc3QgcGF0aHMgPSByLnBhdGhzLm1hcCgocCkgPT4gYCR7cC5wYXRofToke3Aub3BlcmF0b3J9OiR7SlNPTi5zdHJpbmdpZnkocC5hdHRyaWJ1dGVzKX1gKS5qb2luKCc+Jyk7XG4gIHJldHVybiBgdHJhdmVyc2FsfCR7ci5jdXJyZW50Um9sZX18JHtyLnBhcmVudFJvbGUgPz8gJyd9fCR7Y29uZH18JHtwYXRoc31gO1xufVxuXG4vKiogT3BlcmF0b3Igbm9ybWFsaXphdGlvbiBoZWxwZXIgKG1hdGNoZXMgRXBpcGxleCBhdHRyaWJ1dGUgb3BlcmF0b3JzKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0VwaXBsZXhPcGVyYXRvcihvcDogT3BlcmF0b3IpOiBzdHJpbmcge1xuICByZXR1cm4gb3AgPT09ICdzdGFydHN3aXRoJyA/ICdzdGFydHMtd2l0aCcgOiBvcCA9PT0gJ2VuZHN3aXRoJyA/ICdlbmRzLXdpdGgnIDogb3A7XG59XG4iLCAiLyoqXG4gKiBwb3B1cC50cyBcdTIwMTQgUG9wdXAgY29udHJvbGxlci5cbiAqXG4gKiBPcmNoZXN0cmF0ZXM6IHNjYW4gcmVxdWVzdHMgdG8gdGhlIGNvbnRlbnQgc2NyaXB0LCBydWxlIGdlbmVyYXRpb25cbiAqIChydWxlRW5naW5lICsgbGFiZWxFbmdpbmUgKyB0cmF2ZXJzYWxFbmdpbmUpLCBYTUwgZ2VuZXJhdGlvbi92YWxpZGF0aW9uLFxuICogY29tcGFyZS9tZXJnZSB3aXRoIGFuIGV4aXN0aW5nIElFQWRhcHRvci54bWwsIEdQUyBtYXBwaW5ncywgdGVzdC1jYXNlXG4gKiBnZW5lcmF0aW9uLCB2aXN1YWwtaW5zcGVjdGlvbiB0b2dnbGVzLCBsaXZlIGNhcHR1cmUsIGFuZCBzZXR0aW5ncy5cbiAqL1xuaW1wb3J0IHsgY29tcGFyZVJ1bGVzLCBtZXJnZVhNTCwgcGFyc2VFeGlzdGluZ1J1bGVzIH0gZnJvbSAnLi9jb21wYXJlRW5naW5lJztcbmltcG9ydCB7IGJ1aWxkU3RhbmRhcmRMYWJlbFJ1bGVzLCBidWlsZFRyYXZlcnNlTGFiZWxSdWxlcywgc3VnZ2VzdE1pc3NpbmdMYWJlbHMgfSBmcm9tICcuL2xhYmVsRW5naW5lJztcbmltcG9ydCB7IGdlbmVyYXRlUnVsZU1vZGVsLCB0eXBlIFJ1bGVHZW5Db250ZXh0IH0gZnJvbSAnLi9ydWxlRW5naW5lJztcbmltcG9ydCB7IGxvYWRTZXR0aW5ncywgc2F2ZVNldHRpbmdzLCB2YWxpZGF0ZU1hcHBpbmdKc29uLCB0eXBlIEV4dGVuc2lvblNldHRpbmdzIH0gZnJvbSAnLi9zZXR0aW5ncyc7XG5pbXBvcnQgeyBnZW5lcmF0ZVRyYXZlcnNhbFJ1bGVzLCBzdWdnZXN0VHJhdmVyc2FsSW1wcm92ZW1lbnRzIH0gZnJvbSAnLi90cmF2ZXJzYWxFbmdpbmUnO1xuaW1wb3J0IHsgZ2VuZXJhdGVTdGVwU2VudGVuY2UgfSBmcm9tICcuL3N0ZXBTZW50ZW5jZSc7XG5pbXBvcnQgdHlwZSB7IENvbXBhcmVSZXN1bHQsIERldGVjdGVkQ29udHJvbCwgUnVsZU1vZGVsLCBTY2FuUmVzcG9uc2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHJvbGVDb2xvciwgcm9sZU5hbWUsIFJPTEVTIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1xuICBFWFRFTlNJT05fVkVSU0lPTixcbiAgZ2VuZXJhdGVHcHNNYXBwaW5ncyxcbiAgZ2VuZXJhdGVUZXN0Q2FzZXMsXG4gIGdlbmVyYXRlWE1MLFxuICB2YWxpZGF0ZVhNTCxcbn0gZnJvbSAnLi94bWxHZW5lcmF0b3InO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFN0YXRlXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW50ZXJmYWNlIEFwcFN0YXRlIHtcbiAgc2V0dGluZ3M6IEV4dGVuc2lvblNldHRpbmdzO1xuICBzY2FuOiBTY2FuUmVzcG9uc2UgfCBudWxsO1xuICBtb2RlbDogUnVsZU1vZGVsIHwgbnVsbDtcbiAgeG1sOiBzdHJpbmc7XG4gIGdwc1htbDogc3RyaW5nO1xuICB0ZXN0Q2FzZXM6IHN0cmluZztcbiAgZXhpc3RpbmdYbWw6IHN0cmluZztcbiAgZXhpc3RpbmdGaWxlTmFtZTogc3RyaW5nO1xuICBjb21wYXJlOiBDb21wYXJlUmVzdWx0IHwgbnVsbDtcbiAgbWVyZ2VkWG1sOiBzdHJpbmcgfCBudWxsO1xuICBtZXJnZWRDb3VudDogbnVtYmVyO1xuICB0YWJJZDogbnVtYmVyIHwgbnVsbDtcbn1cblxuY29uc3QgJCA9IDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQ+KGlkOiBzdHJpbmcpOiBUID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBUO1xuXG5jb25zdCBzdGF0ZTogQXBwU3RhdGUgPSB7XG4gIHNldHRpbmdzOiBhd2FpdCBsb2FkU2V0dGluZ3MoKSxcbiAgc2NhbjogbnVsbCxcbiAgbW9kZWw6IG51bGwsXG4gIHhtbDogJycsXG4gIGdwc1htbDogJycsXG4gIHRlc3RDYXNlczogJycsXG4gIGV4aXN0aW5nWG1sOiAnJyxcbiAgZXhpc3RpbmdGaWxlTmFtZTogJycsXG4gIGNvbXBhcmU6IG51bGwsXG4gIG1lcmdlZFhtbDogbnVsbCxcbiAgbWVyZ2VkQ291bnQ6IDAsXG4gIHRhYklkOiBudWxsLFxufTtcblxuY29uc3QgZXNjID0gKHM6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwpOiBzdHJpbmcgPT5cbiAgU3RyaW5nKHMgPz8gJycpLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ2hyb21lIG1lc3NhZ2luZyBoZWxwZXJzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QWN0aXZlVGFiKCk6IFByb21pc2U8eyBpZDogbnVtYmVyOyB1cmw/OiBzdHJpbmc7IHRpdGxlPzogc3RyaW5nIH0gfCBudWxsPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ0VQSVBMRVhfR0VUX1RBQicgfSk7XG4gIGlmIChyZXM/Lm9rICYmIHJlcy50YWIpIHtcbiAgICBzdGF0ZS50YWJJZCA9IHJlcy50YWIuaWQ7XG4gICAgcmV0dXJuIHJlcy50YWI7XG4gIH1cbiAgLy8gRmFsbGJhY2sgKGUuZy4gd2hlbiBiYWNrZ3JvdW5kIGhhc24ndCByZXBsaWVkKTogZGlyZWN0IHF1ZXJ5LlxuICB0cnkge1xuICAgIGNvbnN0IFt0YWJdID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSk7XG4gICAgc3RhdGUudGFiSWQgPSB0YWI/LmlkID8/IG51bGw7XG4gICAgcmV0dXJuIHRhYiA/IHsgaWQ6IHRhYi5pZCBhcyBudW1iZXIsIHVybDogdGFiLnVybCwgdGl0bGU6IHRhYi50aXRsZSB9IDogbnVsbDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VuZFRvVGFiPFQ+KHR5cGU6IHN0cmluZywgZXh0cmE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge30pOiBQcm9taXNlPFQgfCBudWxsPiB7XG4gIGlmIChzdGF0ZS50YWJJZCA9PT0gbnVsbCkgYXdhaXQgZ2V0QWN0aXZlVGFiKCk7XG4gIGlmIChzdGF0ZS50YWJJZCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2Uoc3RhdGUudGFiSWQsIHsgdHlwZSwgLi4uZXh0cmEgfSk7XG4gICAgcmV0dXJuIChyZXM/Lm9rID8gcmVzIDogbnVsbCkgYXMgVCB8IG51bGw7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzZXRTdGF0dXMoJ3NjYW5TdGF0dXMnLCBgQ2Fubm90IHJlYWNoIHRoZSBwYWdlIFx1MjAxNCBvcGVuIGEgbm9ybWFsIHdlYiBwYWdlIGZpcnN0ICgkeyhlIGFzIEVycm9yKS5tZXNzYWdlfSlgLCAnZXJyJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTY2FuICsgcnVsZSBnZW5lcmF0aW9uIHBpcGVsaW5lXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuYXN5bmMgZnVuY3Rpb24gcnVuU2NhbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgdGFiID0gYXdhaXQgZ2V0QWN0aXZlVGFiKCk7XG4gIGlmICghdGFiIHx8ICF0YWIudXJsIHx8IHRhYi51cmwuc3RhcnRzV2l0aCgnY2hyb21lOi8vJykgfHwgdGFiLnVybC5zdGFydHNXaXRoKCdlZGdlOi8vJykpIHtcbiAgICBzZXRTdGF0dXMoJ3NjYW5TdGF0dXMnLCAnT3BlbiBhIG5vcm1hbCB3ZWIgcGFnZSB0byBzY2FuIChjaHJvbWU6Ly8gYW5kIHN0b3JlIHBhZ2VzIGFyZSBibG9ja2VkKS4nLCAnZXJyJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHNldFN0YXR1cygnc2NhblN0YXR1cycsICdTY2FubmluZyBwYWdlXHUyMDI2JywgJycpO1xuICBjb25zdCByZXMgPSBhd2FpdCBzZW5kVG9UYWI8eyBwYXlsb2FkOiBTY2FuUmVzcG9uc2UgfT4oJ0VQSVBMRVhfU0NBTicpO1xuICBpZiAoIXJlcykgcmV0dXJuO1xuXG4gIHN0YXRlLnNjYW4gPSByZXMucGF5bG9hZDtcbiAgY29uc3QgY3RybCA9IHJlcy5wYXlsb2FkLmNvbnRyb2xzO1xuICBjb25zdCBzID0gc3RhdGUuc2V0dGluZ3M7XG5cbiAgLy8gQnVpbGQgdGhlIHJ1bGUgbW9kZWwuXG4gIGNvbnN0IGN0eDogUnVsZUdlbkNvbnRleHQgPSB7XG4gICAgY29uZmlnOiBhd2FpdCBpbXBvcnQoJy4vc2V0dGluZ3MnKS50aGVuKChtKSA9PiBtLnJlc29sdmVSb2xlTWFwcGluZ3Moc3RhdGUuc2V0dGluZ3MpKSxcbiAgICB1cmw6IHJlcy5wYXlsb2FkLnVybCxcbiAgICB0aXRsZTogcmVzLnBheWxvYWQudGl0bGUsXG4gICAgbWluQ29uZmlkZW5jZTogcy5taW5Db25maWRlbmNlLFxuICAgIGVtaXRUcmF2ZXJzYWxSdWxlczogcy5lbWl0VHJhdmVyc2FsUnVsZXMsXG4gICAgZW1pdExhYmVsUnVsZXM6IHMuZW1pdExhYmVsUnVsZXMsXG4gIH07XG4gIGNvbnN0IHRyYXZlcnNhbCA9IHMuZW1pdFRyYXZlcnNhbFJ1bGVzID8gZ2VuZXJhdGVUcmF2ZXJzYWxSdWxlcyhjdHJsKSA6IFtdO1xuICBjb25zdCBsYWJlbHMgPSBzLmVtaXRMYWJlbFJ1bGVzXG4gICAgPyB7IHN0YW5kYXJkOiBidWlsZFN0YW5kYXJkTGFiZWxSdWxlcyhjdHJsKSwgdHJhdmVyc2U6IGJ1aWxkVHJhdmVyc2VMYWJlbFJ1bGVzKGN0cmwpIH1cbiAgICA6IHsgc3RhbmRhcmQ6IGJ1aWxkU3RhbmRhcmRMYWJlbFJ1bGVzKGN0cmwpLCB0cmF2ZXJzZTogW10gfTtcblxuICBzdGF0ZS5tb2RlbCA9IGdlbmVyYXRlUnVsZU1vZGVsKGN0cmwsIGN0eCwgeyB0cmF2ZXJzYWxSdWxlczogdHJhdmVyc2FsLCBsYWJlbFJ1bGVzOiBsYWJlbHMgfSk7XG4gIHN0YXRlLnhtbCA9IGdlbmVyYXRlWE1MKHN0YXRlLm1vZGVsKTtcbiAgc3RhdGUuZ3BzWG1sID0gZ2VuZXJhdGVHcHNNYXBwaW5ncyhjdHJsKTtcbiAgc3RhdGUudGVzdENhc2VzID0gZ2VuZXJhdGVUZXN0Q2FzZXMoc3RhdGUubW9kZWwpO1xuXG4gIC8vIENvbXBhcmUgd2l0aCBhbnkgbG9hZGVkIGV4aXN0aW5nIFhNTC5cbiAgaWYgKHN0YXRlLmV4aXN0aW5nWG1sKSByZWZyZXNoQ29tcGFyZSgpO1xuXG4gIHJlbmRlckZyYW1ld29ya3MoKTtcbiAgcmVuZGVyUm9sZVN1bW1hcnkoKTtcbiAgcmVuZGVyQ29udHJvbHMoKTtcbiAgcmVuZGVyUnVsZXMoKTtcbiAgcmVuZGVyWG1sKCk7XG4gIHJlbmRlckRpYWdub3N0aWNzKCk7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpdGVJbmZvJykhLnRleHRDb250ZW50ID0gYCR7cmVzLnBheWxvYWQudGl0bGV9IFx1MjAxNCAke3Jlcy5wYXlsb2FkLnVybH1gO1xuICBzZXRTdGF0dXMoJ3NjYW5TdGF0dXMnLCBgU2Nhbm5lZCAke2N0cmwubGVuZ3RofSBjb250cm9scyBpbiAke25ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9YCwgJ29rJyk7XG4gIHN3aXRjaFRhYignc2NhbicpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJlbmRlcmluZzogc2NhbiB0YWJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiByZW5kZXJGcmFtZXdvcmtzKCk6IHZvaWQge1xuICBjb25zdCBob3N0ID0gJDxIVE1MRWxlbWVudD4oJ2ZyYW1ld29ya0NoaXBzJyk7XG4gIGNvbnN0IGZ3cyA9IHN0YXRlLnNjYW4/LmZyYW1ld29ya3MgfHwgW107XG4gIGhvc3QuaW5uZXJIVE1MID0gZndzLmxlbmd0aFxuICAgID8gZndzLm1hcCgoZikgPT4gYDxzcGFuIGNsYXNzPVwiY2hpcFwiPiR7ZXNjKGYpfTwvc3Bhbj5gKS5qb2luKCcnKVxuICAgIDogJzxzcGFuIGNsYXNzPVwibXV0ZWRcIj5ObyBrbm93biBmcmFtZXdvcmsgZGV0ZWN0ZWQgKHN0aWxsIGdlbmVyYXRpbmcgdGFnL2F0dHJpYnV0ZSBydWxlcykuPC9zcGFuPic7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclJvbGVTdW1tYXJ5KCk6IHZvaWQge1xuICBjb25zdCBob3N0ID0gJDxIVE1MRWxlbWVudD4oJ3JvbGVTdW1tYXJ5Jyk7XG4gIGNvbnN0IGNvdW50cyA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG4gIGZvciAoY29uc3QgYyBvZiBzdGF0ZS5zY2FuPy5jb250cm9scyB8fCBbXSkgY291bnRzLnNldChjLnJvbGUsIChjb3VudHMuZ2V0KGMucm9sZSkgfHwgMCkgKyAxKTtcbiAgaG9zdC5pbm5lckhUTUwgPSBbLi4uY291bnRzLmVudHJpZXMoKV1cbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLm1hcChcbiAgICAgIChbcm9sZSwgbl0pID0+XG4gICAgICAgIGA8c3BhbiBjbGFzcz1cImNoaXBcIj48c3BhbiBzdHlsZT1cImNvbG9yOiR7cm9sZUNvbG9yKHJvbGUpfVwiPlx1MjVDRjwvc3Bhbj4gJHtlc2Mocm9sZU5hbWUocm9sZSkpfTxzcGFuIGNsYXNzPVwiblwiPiR7bn08L3NwYW4+PC9zcGFuPmBcbiAgICApXG4gICAgLmpvaW4oJycpO1xuICAkPEhUTUxFbGVtZW50Pignc3VtbWFyeVJvdycpLmhpZGRlbiA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiByb2xlRmlsdGVyT3B0aW9ucygpOiBzdHJpbmcge1xuICBjb25zdCByb2xlcyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGMgb2Ygc3RhdGUuc2Nhbj8uY29udHJvbHMgfHwgW10pIHJvbGVzLmFkZChjLnJvbGUpO1xuICByZXR1cm4gWy4uLnJvbGVzXS5zb3J0KChhLCBiKSA9PiBhIC0gYikubWFwKChyKSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7cn1cIj4ke2VzYyhyb2xlTmFtZShyKSl9ICgke3J9KTwvb3B0aW9uPmApLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb250cm9scygpOiB2b2lkIHtcbiAgY29uc3QgZmlsdGVyID0gJDxIVE1MU2VsZWN0RWxlbWVudD4oJ3JvbGVGaWx0ZXInKTtcbiAgY29uc3QgcHJldiA9IGZpbHRlci52YWx1ZTtcbiAgZmlsdGVyLmlubmVySFRNTCA9ICc8b3B0aW9uIHZhbHVlPVwiXCI+QWxsIGNvbnRyb2wgdHlwZXM8L29wdGlvbj4nICsgcm9sZUZpbHRlck9wdGlvbnMoKTtcbiAgZmlsdGVyLnZhbHVlID0gcHJldjtcblxuICBjb25zdCB0Ym9keSA9ICQ8SFRNTFRhYmxlRWxlbWVudD4oJ2NvbnRyb2xzVGFibGUnKS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpITtcbiAgY29uc3Qgc2VhcmNoID0gJDxIVE1MSW5wdXRFbGVtZW50Pignc2VhcmNoQm94JykudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qgcm9sZSA9IGZpbHRlci52YWx1ZTtcblxuICBjb25zdCByb3dzID0gKHN0YXRlLnNjYW4/LmNvbnRyb2xzIHx8IFtdKS5maWx0ZXIoKGMpID0+IHtcbiAgICBpZiAocm9sZSAmJiBTdHJpbmcoYy5yb2xlKSAhPT0gcm9sZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChzZWFyY2gpIHtcbiAgICAgIGNvbnN0IGhheSA9IFtjLmF0dHJpYnV0ZXMudGFnTmFtZSwgYy5hdHRyaWJ1dGVzLmlkLCBjLmF0dHJpYnV0ZXMubmFtZSwgYy5hdHRyaWJ1dGVzLmNsYXNzTmFtZSwgYy5sYWJlbCwgYy5yZWFzb24sIGMubG9jYXRpb24uY3NzU2VsZWN0b3IsIGMubG9jYXRpb24ueHBhdGhdLmpvaW4oJyAnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCFoYXkuaW5jbHVkZXMoc2VhcmNoKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG5cbiAgJDxIVE1MRWxlbWVudD4oJ2NvbnRyb2xDb3VudCcpLnRleHRDb250ZW50ID0gYCR7cm93cy5sZW5ndGh9IHNob3duIC8gJHtzdGF0ZS5zY2FuPy5jb250cm9scy5sZW5ndGggPz8gMH1gO1xuXG4gIHRib2R5LmlubmVySFRNTCA9IHJvd3NcbiAgICAubWFwKChjKSA9PiB7XG4gICAgICBjb25zdCBhID0gYy5hdHRyaWJ1dGVzO1xuICAgICAgY29uc3QgY29uZiA9IE1hdGgucm91bmQoYy5jb25maWRlbmNlKTtcbiAgICAgIGNvbnN0IGF0dHJzID0gW2EudHlwZSAmJiBgdHlwZT0ke2EudHlwZX1gLCBhLm5hbWUgJiYgYG5hbWU9JHthLm5hbWV9YCwgYS5jbGFzc05hbWUgJiYgYGNsYXNzPSR7YS5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5zbGljZSgwLCAyKS5qb2luKCcgJyl9YF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJzxicj4nKTtcbiAgICAgIHJldHVybiBgPHRyPlxuICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJyb2xlLWNoaXBcIiBzdHlsZT1cImJhY2tncm91bmQ6JHtyb2xlQ29sb3IoYy5yb2xlKX1cIj4ke2Mucm9sZU5hbWV9PC9zcGFuPjwvdGQ+XG4gICAgICAgIDx0ZD4ke2VzYyhjLmxhYmVsIHx8ICdcdTIwMTQnKX08L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJtb25vXCI+Jmx0OyR7ZXNjKGEudGFnTmFtZSl9Jmd0OyR7YXR0cnMgPyBgPGJyPjxzcGFuIGNsYXNzPVwibXV0ZWRcIj4ke2F0dHJzfTwvc3Bhbj5gIDogJyd9PC90ZD5cbiAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiY29uZi1iYXJcIj48aSBzdHlsZT1cIndpZHRoOiR7Y29uZn0lXCI+PC9pPjwvc3Bhbj4gJHtjb25mfSU8L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJtb25vXCI+JHtlc2MoYy5sYWJlbFN0cmF0ZWd5KX08L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJtb25vXCIgdGl0bGU9XCIke2VzYyhjLnJlYXNvbil9XCI+JHtlc2Moc2hvcnQoYy5yZWFzb24sIDYwKSl9PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwibW9ub1wiPiR7ZXNjKHNob3J0KGMubG9jYXRpb24uY3NzU2VsZWN0b3IsIDM0KSl9PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwibW9ub1wiIHRpdGxlPVwiJHtlc2MoZ2VuZXJhdGVTdGVwU2VudGVuY2UoYykpfVwiPiR7ZXNjKHNob3J0KGdlbmVyYXRlU3RlcFNlbnRlbmNlKGMpLCA0NikpfTwvdGQ+XG4gICAgICA8L3RyPmA7XG4gICAgfSlcbiAgICAuam9pbignJykgfHwgJzx0cj48dGQgY29sc3Bhbj1cIjhcIiBjbGFzcz1cIm11dGVkXCI+Tm8gY29udHJvbHMgbWF0Y2ggdGhlIGN1cnJlbnQgZmlsdGVyLjwvdGQ+PC90cj4nO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEaWFnbm9zdGljcygpOiB2b2lkIHtcbiAgY29uc3QgaG9zdCA9ICQ8SFRNTEVsZW1lbnQ+KCdkaWFnTGlzdCcpO1xuICBjb25zdCBjdHJsID0gc3RhdGUuc2Nhbj8uY29udHJvbHMgfHwgW107XG4gIGNvbnN0IHN1Z2dlc3Rpb25zID0gWy4uLnN1Z2dlc3RNaXNzaW5nTGFiZWxzKGN0cmwpLCAuLi5zdWdnZXN0VHJhdmVyc2FsSW1wcm92ZW1lbnRzKGN0cmwpXTtcbiAgY29uc3QgdW5pcXVlID0gWy4uLm5ldyBTZXQoc3VnZ2VzdGlvbnMpXTtcbiAgY29uc3QgaHRtbCA9IHVuaXF1ZS5zbGljZSgwLCAyNSkubWFwKChzKSA9PiBgPGRpdiBjbGFzcz1cImQtaXRlbVwiPjxzcGFuPlx1RDgzRFx1RENBMTwvc3Bhbj4gJHtlc2Mocyl9PC9kaXY+YCkuam9pbignJyk7XG4gIGhvc3QuaW5uZXJIVE1MID0gaHRtbCB8fCAnPHAgY2xhc3M9XCJtdXRlZFwiPk5vIHN1Z2dlc3Rpb25zIFx1MjAxNCBhbGwgY29udHJvbHMgaGF2ZSBsYWJlbHMgb3IgYXJlIHN0cnVjdHVyYWwuPC9wPic7XG4gICQ8SFRNTEVsZW1lbnQ+KCdzdWdnZXN0aW9uTGlzdCcpLmlubmVySFRNTCA9IHVuaXF1ZS5zbGljZSgwLCAyNSkubWFwKChzKSA9PiBgPGxpPiR7ZXNjKHMpfTwvbGk+YCkuam9pbignJyk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUmVuZGVyaW5nOiBydWxlcyB0YWJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBydWxlS2luZEJhZGdlKGtpbmQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICB0YWc6ICdraW5kLXRhZycsIGF0dHJpYnV0ZTogJ2tpbmQtYXR0cmlidXRlJywgdHJhdmVyc2FsOiAna2luZC10cmF2ZXJzYWwnLFxuICAgICdsYWJlbC1zdGFuZGFyZCc6ICdraW5kLWxhYmVsLXN0YW5kYXJkJywgJ2xhYmVsLXRyYXZlcnNlJzogJ2tpbmQtbGFiZWwtdHJhdmVyc2UnLFxuICB9O1xuICBjb25zdCBsYWJlbDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICB0YWc6ICdCYXNlZE9uVGFncycsIGF0dHJpYnV0ZTogJ0Jhc2VkT25BdHRyaWJ1dGVzJywgdHJhdmVyc2FsOiAnVHJhdmVyc2VMb2dpYycsXG4gICAgJ2xhYmVsLXN0YW5kYXJkJzogJ1N0YW5kYXJkTG9naWMnLCAnbGFiZWwtdHJhdmVyc2UnOiAnVHJhdmVyc2VMb2dpYycsXG4gIH07XG4gIHJldHVybiBgPHNwYW4gY2xhc3M9XCJraW5kLWJhZGdlICR7bWFwW2tpbmRdIHx8ICcnfVwiPiR7bGFiZWxba2luZF0gfHwga2luZH08L3NwYW4+YDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUnVsZXMoKTogdm9pZCB7XG4gIGNvbnN0IGhvc3QgPSAkPEhUTUxFbGVtZW50PigncnVsZUxpc3QnKTtcbiAgY29uc3QgbW9kZWwgPSBzdGF0ZS5tb2RlbDtcbiAgY29uc3QgZmlsdGVyID0gJDxIVE1MU2VsZWN0RWxlbWVudD4oJ3J1bGVLaW5kRmlsdGVyJykudmFsdWU7XG4gIGlmICghbW9kZWwpIHsgaG9zdC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJtdXRlZFwiPlNjYW4gYSBwYWdlIGZpcnN0LjwvcD4nOyByZXR1cm47IH1cblxuICB0eXBlIEl0ZW0gPSB7IGtpbmQ6IHN0cmluZzsgZGVzYzogc3RyaW5nOyBjb25mOiBudW1iZXI7IHNyYzogc3RyaW5nOyBmdz86IHN0cmluZyB9O1xuICBjb25zdCBpdGVtczogSXRlbVtdID0gW107XG4gIGZvciAoY29uc3QgciBvZiBtb2RlbC5iYXNlZE9uVGFncykge1xuICAgIGl0ZW1zLnB1c2goeyBraW5kOiAndGFnJywgZGVzYzogYFJvbGUgJHtyLmN1cnJlbnRSb2xlfSAke3IucGFyZW50Um9sZSAhPT0gbnVsbCA/IGAocGFyZW50ICR7ci5wYXJlbnRSb2xlfSlgIDogJyd9OiAke3IuY29uZGl0aW9ucy5tYXAoKGMpID0+IGAke2MudGFnTmFtZX0ke2MudHlwZSA/ICcgJyArIGMudHlwZSA6ICcnfWApLmpvaW4oJyBcdTAwQjcgJyl9YCwgY29uZjogci5jb25maWRlbmNlLCBzcmM6IHIuc291cmNlLCBmdzogci5mcmFtZXdvcmsgfSk7XG4gIH1cbiAgZm9yIChjb25zdCByIG9mIG1vZGVsLmJhc2VkT25BdHRyaWJ1dGVzKSB7XG4gICAgaXRlbXMucHVzaCh7IGtpbmQ6ICdhdHRyaWJ1dGUnLCBkZXNjOiBgUm9sZSAke3IuY3VycmVudFJvbGV9OiAke3IuYXR0cmlidXRlfSAke3Iub3BlcmF0b3J9IHwke3IudmFsdWVzLmpvaW4oJ3wnKX18YCwgY29uZjogci5jb25maWRlbmNlLCBzcmM6IHIuc291cmNlLCBmdzogci5mcmFtZXdvcmsgfSk7XG4gIH1cbiAgZm9yIChjb25zdCByIG9mIG1vZGVsLmJhc2VkT25UcmF2ZXJzZUxvZ2ljKSB7XG4gICAgaXRlbXMucHVzaCh7IGtpbmQ6ICd0cmF2ZXJzYWwnLCBkZXNjOiBgUm9sZSAke3IuY3VycmVudFJvbGV9OiAke3IuY29uZGl0aW9uLmNsYXNzTmFtZSB8fCByLmNvbmRpdGlvbi50YWdOYW1lIHx8IHIuY29uZGl0aW9uLmF0dHJpYnV0ZSB8fCAnPyd9IFx1MjE5MiAke3IucGF0aHMubWFwKChwKSA9PiBgJHtwLnBhdGh9JHtwLm9wZXJhdG9yID09PSAncmVjdXJzaXZlJyA/ICcqJyA6ICcnfSAke09iamVjdC52YWx1ZXMocC5hdHRyaWJ1dGVzKS5qb2luKCcgJyl9YCkuam9pbignIFx1MjE5MiAnKX1gLCBjb25mOiByLmNvbmZpZGVuY2UsIHNyYzogci5zb3VyY2UsIGZ3OiByLmZyYW1ld29yayB9KTtcbiAgfVxuICBmb3IgKGNvbnN0IHIgb2YgbW9kZWwuc3RhbmRhcmRMb2dpYykge1xuICAgIGl0ZW1zLnB1c2goeyBraW5kOiAnbGFiZWwtc3RhbmRhcmQnLCBkZXNjOiBgJHtyLmlkfTogJHtyLmZyb219IFx1MjE5MiAke3IudG99ICgke3Iub3BlcmF0b3J9KWAsIGNvbmY6IDk1LCBzcmM6IHIucmVhc29uIH0pO1xuICB9XG4gIGZvciAoY29uc3QgciBvZiBtb2RlbC50cmF2ZXJzZUxvZ2ljKSB7XG4gICAgaXRlbXMucHVzaCh7IGtpbmQ6ICdsYWJlbC10cmF2ZXJzZScsIGRlc2M6IGAke3IuaWR9OiByb2xlICR7ci5yb2xlfSAke3IuYXR0cmlidXRlcy5UYWdOYW1lIHx8ICcnfSBcdTIxOTIgJHtyLnBhdGhzLm1hcCgocCkgPT4gYCR7cC5wYXRofSAke09iamVjdC52YWx1ZXMocC5hdHRyaWJ1dGVzKS5qb2luKCcgJyl9YCkuam9pbignIFx1MjE5MiAnKX0gKCR7ci5tZXRob2R9KWAsIGNvbmY6IDkwLCBzcmM6IHIucmVhc29uIH0pO1xuICB9XG5cbiAgY29uc3QgZmlsdGVyZWQgPSBmaWx0ZXIgPyBpdGVtcy5maWx0ZXIoKGkpID0+IGkua2luZCA9PT0gZmlsdGVyKSA6IGl0ZW1zO1xuICAkPEhUTUxFbGVtZW50PigncnVsZUNvdW50JykudGV4dENvbnRlbnQgPSBgJHtmaWx0ZXJlZC5sZW5ndGh9IHJ1bGVzYDtcbiAgaG9zdC5pbm5lckhUTUwgPSBmaWx0ZXJlZFxuICAgIC5tYXAoXG4gICAgICAoaSkgPT4gYDxkaXYgY2xhc3M9XCJydWxlLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInItaGVhZFwiPiR7cnVsZUtpbmRCYWRnZShpLmtpbmQpfTxiPiR7aS5jb25mfSU8L2I+JHtpLmZ3ID8gYDxzcGFuIGNsYXNzPVwiY2hpcFwiPiR7ZXNjKGkuZncpfTwvc3Bhbj5gIDogJyd9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyLWRlc2NcIj4ke2VzYyhpLmRlc2MpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwici1zcmNcIj4ke2VzYyhpLnNyYyl9PC9kaXY+XG4gICAgICA8L2Rpdj5gXG4gICAgKVxuICAgIC5qb2luKCcnKSB8fCAnPHAgY2xhc3M9XCJtdXRlZFwiPk5vIHJ1bGVzLjwvcD4nO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJlbmRlcmluZzogWE1MIHRhYlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHJlbmRlclhtbCgpOiB2b2lkIHtcbiAgJDxIVE1MRWxlbWVudD4oJ3htbFByZXZpZXcnKS50ZXh0Q29udGVudCA9IHN0YXRlLnhtbCB8fCAnU2NhbiBhIHBhZ2UgdG8gZ2VuZXJhdGUgSUVBZGFwdG9yLnhtbFx1MjAyNic7XG4gIGlmICghc3RhdGUueG1sKSB7ICQ8SFRNTEVsZW1lbnQ+KCd4bWxWYWxpZCcpLnRleHRDb250ZW50ID0gJyc7IHJldHVybjsgfVxuICBjb25zdCB2ID0gdmFsaWRhdGVYTUwoc3RhdGUueG1sKTtcbiAgJDxIVE1MRWxlbWVudD4oJ3htbFZhbGlkJykudGV4dENvbnRlbnQgPSB2LnZhbGlkXG4gICAgPyBgXHUyNzEzIFZhbGlkIFhNTCAoJHsoc3RhdGUueG1sLmxlbmd0aCAvIDEwMjQpLnRvRml4ZWQoMSl9IEtCKWBcbiAgICA6IGBcdTI3MTcgSW52YWxpZDogJHt2LmVycm9ycy5qb2luKCc7ICcpfWA7XG4gICQ8SFRNTEVsZW1lbnQ+KCd4bWxWYWxpZCcpLmNsYXNzTmFtZSA9ICdzdGF0dXMgJyArICh2LnZhbGlkID8gJ29rJyA6ICdlcnInKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBDb21wYXJlIC8gbWVyZ2Vcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiByZWZyZXNoQ29tcGFyZSgpOiB2b2lkIHtcbiAgaWYgKCFzdGF0ZS5tb2RlbCB8fCAhc3RhdGUuZXhpc3RpbmdYbWwpIHJldHVybjtcbiAgc3RhdGUuY29tcGFyZSA9IGNvbXBhcmVSdWxlcyhzdGF0ZS5tb2RlbCwgcGFyc2VFeGlzdGluZ1J1bGVzKHN0YXRlLmV4aXN0aW5nWG1sKSk7XG4gIGNvbnN0IG1lcmdlZCA9IG1lcmdlWE1MKHN0YXRlLm1vZGVsLCBzdGF0ZS5leGlzdGluZ1htbCk7XG4gIHN0YXRlLm1lcmdlZFhtbCA9IG1lcmdlZC54bWw7XG4gIHN0YXRlLm1lcmdlZENvdW50ID0gbWVyZ2VkLmFkZGVkO1xuICByZW5kZXJDb21wYXJlKCk7XG4gICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdidG5NZXJnZScpLmRpc2FibGVkID0gZmFsc2U7XG4gICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdidG5Eb3dubG9hZE1lcmdlZCcpLmRpc2FibGVkID0gc3RhdGUubWVyZ2VkQ291bnQgPT09IDA7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbXBhcmUoKTogdm9pZCB7XG4gIGNvbnN0IGMgPSBzdGF0ZS5jb21wYXJlO1xuICBjb25zdCBob3N0ID0gJDxIVE1MRWxlbWVudD4oJ2NvbXBhcmVTdW1tYXJ5Jyk7XG4gIGlmICghYykgeyBob3N0LmlubmVySFRNTCA9ICcnOyAkPEhUTUxUYWJsZUVsZW1lbnQ+KCdjb21wYXJlVGFibGUnKS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpIS5pbm5lckhUTUwgPSAnJzsgcmV0dXJuOyB9XG5cbiAgaG9zdC5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImNtcCBuZXdcIj48Yj4ke2MubmV3UnVsZXMubGVuZ3RofTwvYj4gbmV3PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNtcCBtb2RpZmllZFwiPjxiPiR7Yy5tb2RpZmllZFJ1bGVzLmxlbmd0aH08L2I+IG1vZGlmaWVkPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNtcCBkdXBsaWNhdGVcIj48Yj4ke2MuZHVwbGljYXRlUnVsZXMubGVuZ3RofTwvYj4gZHVwbGljYXRlczwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjbXAgb2Jzb2xldGVcIj48Yj4ke2Mub2Jzb2xldGVSdWxlcy5sZW5ndGh9PC9iPiBvYnNvbGV0ZTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjbXAgbWF0Y2hlZFwiPjxiPiR7Yy5tYXRjaGVkfTwvYj4gbWF0Y2hlZDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjbXBcIj4rIDxiPiR7c3RhdGUubWVyZ2VkQ291bnR9PC9iPiBydWxlcyB0byBtZXJnZTwvZGl2PmA7XG5cbiAgY29uc3QgZmlsdGVyID0gJDxIVE1MU2VsZWN0RWxlbWVudD4oJ2NvbXBhcmVGaWx0ZXInKS52YWx1ZTtcbiAgY29uc3Qgc3RhdHVzT2YgPSAocjogeyBpbkdlbmVyYXRlZDogYm9vbGVhbjsgaW5FeGlzdGluZzogYm9vbGVhbiB9KTogc3RyaW5nID0+XG4gICAgci5pbkdlbmVyYXRlZCAmJiAhci5pbkV4aXN0aW5nID8gJ25ldycgOiByLmluR2VuZXJhdGVkICYmIHIuaW5FeGlzdGluZyA/ICdkdXBsaWNhdGUnIDogJ29ic29sZXRlJztcblxuICBjb25zdCByb3dzID0gW1xuICAgIC4uLmMubmV3UnVsZXMubWFwKChyKSA9PiAoeyAuLi5yLCBzdGF0dXM6ICduZXcnIH0pKSxcbiAgICAuLi5jLm1vZGlmaWVkUnVsZXMubWFwKChyKSA9PiAoeyAuLi5yLCBzdGF0dXM6ICdtb2RpZmllZCcgfSkpLFxuICAgIC4uLmMuZHVwbGljYXRlUnVsZXMubWFwKChyKSA9PiAoeyAuLi5yLCBzdGF0dXM6ICdkdXBsaWNhdGUnIH0pKSxcbiAgICAuLi5jLm9ic29sZXRlUnVsZXMubWFwKChyKSA9PiAoeyAuLi5yLCBzdGF0dXM6ICdvYnNvbGV0ZScgfSkpLFxuICBdLmZpbHRlcigocikgPT4gIWZpbHRlciB8fCByLnN0YXR1cyA9PT0gZmlsdGVyKTtcblxuICAkPEhUTUxUYWJsZUVsZW1lbnQ+KCdjb21wYXJlVGFibGUnKS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpIS5pbm5lckhUTUwgPSByb3dzXG4gICAgLm1hcChcbiAgICAgIChyKSA9PiBgPHRyPlxuICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJjbXAgJHtyLnN0YXR1c31cIiBzdHlsZT1cInBhZGRpbmc6MnB4IDhweDttYXJnaW46MFwiPiR7ci5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgIDx0ZD4ke3J1bGVLaW5kQmFkZ2Uoci5raW5kKX08L3RkPlxuICAgICAgICA8dGQ+JHtyLnJvbGUgfHwgJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwibW9ub1wiPiR7ZXNjKHIuZGVzY3JpcHRpb24pfTwvdGQ+XG4gICAgICA8L3RyPmBcbiAgICApXG4gICAgLmpvaW4oJycpIHx8ICc8dHI+PHRkIGNvbHNwYW49XCI0XCIgY2xhc3M9XCJtdXRlZFwiPk5vIGRpZmZlcmVuY2VzLjwvdGQ+PC90cj4nO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFNldHRpbmdzIHJlbmRlcmluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHJlbmRlclNldHRpbmdzKCk6IHZvaWQge1xuICBjb25zdCBzID0gc3RhdGUuc2V0dGluZ3M7XG4gIGNvbnN0IGZ3SG9zdCA9ICQ8SFRNTEVsZW1lbnQ+KCdmcmFtZXdvcmtUb2dnbGVzJyk7XG4gIGZ3SG9zdC5pbm5lckhUTUwgPSBPYmplY3QuZW50cmllcyhzLmVuYWJsZWRGcmFtZXdvcmtzKVxuICAgIC5tYXAoKFtuYW1lLCBvbl0pID0+IGA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRhdGEtZnc9XCIke2VzYyhuYW1lKX1cIiAke29uID8gJ2NoZWNrZWQnIDogJyd9Lz4gJHtlc2MobmFtZSl9PC9sYWJlbD5gKVxuICAgIC5qb2luKCcnKTtcblxuICAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdtaW5Db25mJykudmFsdWUgPSBTdHJpbmcocy5taW5Db25maWRlbmNlKTtcbiAgJDxIVE1MRWxlbWVudD4oJ21pbkNvbmZWYWwnKS50ZXh0Q29udGVudCA9IFN0cmluZyhzLm1pbkNvbmZpZGVuY2UpO1xuICAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdvcHRUcmF2ZXJzYWwnKS5jaGVja2VkID0gcy5lbWl0VHJhdmVyc2FsUnVsZXM7XG4gICQ8SFRNTElucHV0RWxlbWVudD4oJ29wdExhYmVsUnVsZXMnKS5jaGVja2VkID0gcy5lbWl0TGFiZWxSdWxlcztcbiAgJDxIVE1MSW5wdXRFbGVtZW50Pignb3B0SGlnaGxpZ2h0JykuY2hlY2tlZCA9IHMuaGlnaGxpZ2h0RW5hYmxlZDtcbiAgJDxIVE1MVGV4dEFyZWFFbGVtZW50PignbWFwcGluZ0pzb24nKS52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHMucm9sZU1hcHBpbmdzID8/IG51bGwsIG51bGwsIDIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVTZXR0aW5ncyhwYXRjaDogUGFydGlhbDxFeHRlbnNpb25TZXR0aW5ncz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgc3RhdGUuc2V0dGluZ3MgPSB7IC4uLnN0YXRlLnNldHRpbmdzLCAuLi5wYXRjaCB9O1xuICBhd2FpdCBzYXZlU2V0dGluZ3Moc3RhdGUuc2V0dGluZ3MpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFV0aWxpdGllc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHNob3J0KHM6IHN0cmluZywgbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIHMubGVuZ3RoID4gbiA/IHMuc2xpY2UoMCwgbiAtIDEpICsgJ1x1MjAyNicgOiBzO1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0dXMoaWQ6IHN0cmluZywgdGV4dDogc3RyaW5nLCBjbHM6ICdvaycgfCAnZXJyJyB8ICcnKTogdm9pZCB7XG4gIGNvbnN0IGVsID0gJChpZCk7XG4gIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgZWwuY2xhc3NOYW1lID0gJ3N0YXR1cyAnICsgY2xzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb3B5VGV4dCh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCB7XG4gICAgY29uc3QgdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIHRhLnZhbHVlID0gdGV4dDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRhKTtcbiAgICB0YS5zZWxlY3QoKTtcbiAgICBjb25zdCBvayA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgdGEucmVtb3ZlKCk7XG4gICAgcmV0dXJuIG9rO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkVGV4dChmaWxlbmFtZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIG1pbWUgPSAnYXBwbGljYXRpb24veG1sO2NoYXJzZXQ9dXRmLTgnKTogUHJvbWlzZTx2b2lkPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiAnRVBJUExFWF9ET1dOTE9BRCcsIGZpbGVuYW1lLCBkYXRhOiB0ZXh0LCBtaW1lIH0pO1xuICAgIGlmIChyZXM/Lm9rKSByZXR1cm47XG4gIH0gY2F0Y2ggeyAvKiBmYWxsIGJhY2sgdG8gYW5jaG9yIGRvd25sb2FkICovIH1cbiAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt0ZXh0XSwgeyB0eXBlOiBtaW1lIH0pO1xuICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBhLmhyZWYgPSB1cmw7XG4gIGEuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgYS5jbGljaygpO1xuICBzZXRUaW1lb3V0KCgpID0+IFVSTC5yZXZva2VPYmplY3RVUkwodXJsKSwgMTBfMDAwKTtcbn1cblxuZnVuY3Rpb24gc3dpdGNoVGFiKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWJ0bicpLmZvckVhY2goKGIpID0+IGIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgYi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJykgPT09IG5hbWUpKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1wYW5lbCcpLmZvckVhY2goKHApID0+IHAuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgcC5pZCA9PT0gYHBhbmVsLSR7bmFtZX1gKSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXZlbnQgd2lyaW5nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gd2lyZUV2ZW50cygpOiB2b2lkIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1idG4nKS5mb3JFYWNoKChiKSA9PiBiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc3dpdGNoVGFiKGIuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpISkpKTtcblxuICAkPEhUTUxCdXR0b25FbGVtZW50PignYnRuU2NhbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuU2Nhbik7XG4gICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdidG5Db3B5U3RlcHMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBsaW5lcyA9IChzdGF0ZS5zY2FuPy5jb250cm9scyB8fCBbXSkubWFwKChjKSA9PiBnZW5lcmF0ZVN0ZXBTZW50ZW5jZShjKSk7XG4gICAgY29uc3Qgb2sgPSBhd2FpdCBjb3B5VGV4dChsaW5lcy5qb2luKCdcXG4nKSk7XG4gICAgc2V0U3RhdHVzKCdzY2FuU3RhdHVzJywgb2sgPyBgXHUyNzEzIENvcGllZCAke2xpbmVzLmxlbmd0aH0gc3RlcCBzZW50ZW5jZXNgIDogJ0NvcHkgZmFpbGVkJywgb2sgPyAnb2snIDogJ2VycicpO1xuICB9KTtcbiAgJDxIVE1MSW5wdXRFbGVtZW50Pigncm9sZUZpbHRlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHJlbmRlckNvbnRyb2xzKTtcbiAgJDxIVE1MSW5wdXRFbGVtZW50Pignc2VhcmNoQm94JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCByZW5kZXJDb250cm9scyk7XG4gICQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdydWxlS2luZEZpbHRlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHJlbmRlclJ1bGVzKTtcbiAgJDxIVE1MU2VsZWN0RWxlbWVudD4oJ2NvbXBhcmVGaWx0ZXInKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCByZW5kZXJDb21wYXJlKTtcblxuICAkPEhUTUxCdXR0b25FbGVtZW50PignYnRuSGlnaGxpZ2h0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYnRuID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J0bkhpZ2hsaWdodCcpO1xuICAgIGNvbnN0IG5leHQgPSBidG4uZGF0YXNldC5zdGF0ZSA9PT0gJ29uJyA/IGZhbHNlIDogdHJ1ZTtcbiAgICBidG4uZGF0YXNldC5zdGF0ZSA9IG5leHQgPyAnb24nIDogJ29mZic7XG4gICAgYXdhaXQgc2VuZFRvVGFiKCdFUElQTEVYX0hJR0hMSUdIVCcsIHsgZW5hYmxlZDogbmV4dCB9KTtcbiAgICBzZXRTdGF0dXMoJ3NjYW5TdGF0dXMnLCBuZXh0ID8gJ0hpZ2hsaWdodCBvdmVybGF5IE9OIFx1MjAxNCBob3ZlciBhIGJveCBmb3IgZGV0YWlscy4nIDogJ0hpZ2hsaWdodCBPRkYnLCBuZXh0ID8gJ29rJyA6ICcnKTtcbiAgfSk7XG5cbiAgJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J0bkxpdmUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBidG4gPSAkPEhUTUxCdXR0b25FbGVtZW50PignYnRuTGl2ZScpO1xuICAgIGNvbnN0IG5leHQgPSBidG4uZGF0YXNldC5zdGF0ZSAhPT0gJ29uJztcbiAgICBidG4uZGF0YXNldC5zdGF0ZSA9IG5leHQgPyAnb24nIDogJ29mZic7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgc2VuZFRvVGFiPHsgbGl2ZTogYm9vbGVhbiB9PignRVBJUExFWF9MSVZFJywgeyBlbmFibGVkOiBuZXh0IH0pO1xuICAgIHNldFN0YXR1cygnc2NhblN0YXR1cycsIHJlcz8ubGl2ZSA/ICdMaXZlIGNhcHR1cmUgT04gXHUyMDE0IHJ1bGVzIHVwZGF0ZSBhcyB0aGUgRE9NIGNoYW5nZXMuJyA6ICdMaXZlIGNhcHR1cmUgT0ZGLicsIHJlcz8ubGl2ZSA/ICdvaycgOiAnJyk7XG4gICAgaWYgKG5leHQpIHJ1blNjYW4oKTtcbiAgfSk7XG5cbiAgJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J0bkNvcHlYbWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBvayA9IGF3YWl0IGNvcHlUZXh0KHN0YXRlLnhtbCk7XG4gICAgc2V0U3RhdHVzKCd4bWxWYWxpZCcsIG9rID8gJ1x1MjcxMyBDb3BpZWQnIDogJ0NvcHkgZmFpbGVkJywgb2sgPyAnb2snIDogJ2VycicpO1xuICB9KTtcbiAgJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J0bkRvd25sb2FkWG1sJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkb3dubG9hZFRleHQoJ0lFQWRhcHRvci54bWwnLCBzdGF0ZS54bWwpKTtcbiAgJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J0bkNvcHlHcHMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IGNvcHlUZXh0KHN0YXRlLmdwc1htbCkpO1xuICAkPEhUTUxCdXR0b25FbGVtZW50PignYnRuRG93bmxvYWRHcHMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRvd25sb2FkVGV4dCgnR1BTLU1hcHBpbmdzLnhtbCcsIHN0YXRlLmdwc1htbCkpO1xuICAkPEhUTUxCdXR0b25FbGVtZW50PignYnRuQ29weVRlc3RzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiBjb3B5VGV4dChzdGF0ZS50ZXN0Q2FzZXMpKTtcblxuICAkPEhUTUxCdXR0b25FbGVtZW50PignYnRuTG9hZEV4aXN0aW5nJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdleGlzdGluZ1htbElucHV0JykuY2xpY2soKSk7XG4gICQ8SFRNTElucHV0RWxlbWVudD4oJ2V4aXN0aW5nWG1sSW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhc3luYyAoZSkgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuZmlsZXM/LlswXTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcbiAgICBzdGF0ZS5leGlzdGluZ1htbCA9IGF3YWl0IGZpbGUudGV4dCgpO1xuICAgIHN0YXRlLmV4aXN0aW5nRmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgJDxIVE1MRWxlbWVudD4oJ2V4aXN0aW5nRmlsZScpLnRleHRDb250ZW50ID0gYCR7ZmlsZS5uYW1lfSAoJHsoc3RhdGUuZXhpc3RpbmdYbWwubGVuZ3RoIC8gMTAyNCkudG9GaXhlZCgxKX0gS0IpIGxvYWRlZGA7XG4gICAgcmVmcmVzaENvbXBhcmUoKTtcbiAgICBzd2l0Y2hUYWIoJ2NvbXBhcmUnKTtcbiAgfSk7XG5cbiAgJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J0bk1lcmdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgc2V0U3RhdHVzKCdzY2FuU3RhdHVzJywgYE1lcmdlZCBcdTIwMTQgJHtzdGF0ZS5tZXJnZWRDb3VudH0gbmV3IHJ1bGVzIGFkZGVkLCAke3N0YXRlLmNvbXBhcmU/LmR1cGxpY2F0ZVJ1bGVzLmxlbmd0aCA/PyAwfSBkdXBsaWNhdGVzIHNraXBwZWQuYCwgJ29rJyk7XG4gICAgcmVuZGVyQ29tcGFyZSgpO1xuICB9KTtcbiAgJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J0bkRvd25sb2FkTWVyZ2VkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLm1lcmdlZFhtbCkgZG93bmxvYWRUZXh0KCdJRUFkYXB0b3ItbWVyZ2VkLnhtbCcsIHN0YXRlLm1lcmdlZFhtbCk7XG4gIH0pO1xuXG4gIC8vIFNldHRpbmdzXG4gICQ8SFRNTEVsZW1lbnQ+KCdmcmFtZXdvcmtUb2dnbGVzJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYXN5bmMgKGUpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKCFpbnB1dC5kYXRhc2V0LmZ3KSByZXR1cm47XG4gICAgY29uc3QgZncgPSB7IC4uLnN0YXRlLnNldHRpbmdzLmVuYWJsZWRGcmFtZXdvcmtzIH07XG4gICAgZndbaW5wdXQuZGF0YXNldC5md10gPSBpbnB1dC5jaGVja2VkO1xuICAgIGF3YWl0IHVwZGF0ZVNldHRpbmdzKHsgZW5hYmxlZEZyYW1ld29ya3M6IGZ3IH0pO1xuICB9KTtcbiAgJDxIVE1MSW5wdXRFbGVtZW50PignbWluQ29uZicpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgYXN5bmMgKGUpID0+IHtcbiAgICBjb25zdCB2ID0gTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gICAgJDxIVE1MRWxlbWVudD4oJ21pbkNvbmZWYWwnKS50ZXh0Q29udGVudCA9IFN0cmluZyh2KTtcbiAgICBhd2FpdCB1cGRhdGVTZXR0aW5ncyh7IG1pbkNvbmZpZGVuY2U6IHYgfSk7XG4gIH0pO1xuICAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdvcHRUcmF2ZXJzYWwnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4gdXBkYXRlU2V0dGluZ3MoeyBlbWl0VHJhdmVyc2FsUnVsZXM6IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkIH0pKTtcbiAgJDxIVE1MSW5wdXRFbGVtZW50Pignb3B0TGFiZWxSdWxlcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB1cGRhdGVTZXR0aW5ncyh7IGVtaXRMYWJlbFJ1bGVzOiAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCB9KSk7XG4gICQ8SFRNTElucHV0RWxlbWVudD4oJ29wdEhpZ2hsaWdodCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFzeW5jIChlKSA9PiB7XG4gICAgY29uc3QgdiA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkO1xuICAgIGF3YWl0IHVwZGF0ZVNldHRpbmdzKHsgaGlnaGxpZ2h0RW5hYmxlZDogdiB9KTtcbiAgICBpZiAodiAmJiBzdGF0ZS50YWJJZCkgYXdhaXQgc2VuZFRvVGFiKCdFUElQTEVYX0hJR0hMSUdIVCcsIHsgZW5hYmxlZDogdHJ1ZSB9KTtcbiAgfSk7XG5cbiAgJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J0bkxvYWRNYXBwaW5ncycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHRleHQgPSAkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdtYXBwaW5nSnNvbicpLnZhbHVlO1xuICAgIGNvbnN0IGVyciA9IHZhbGlkYXRlTWFwcGluZ0pzb24odGV4dCk7XG4gICAgaWYgKGVycikgeyBzZXRTdGF0dXMoJ21hcHBpbmdTdGF0dXMnLCBlcnIsICdlcnInKTsgcmV0dXJuOyB9XG4gICAgY29uc3QgcGFyc2VkID0gdGV4dC50cmltKCkgPyBKU09OLnBhcnNlKHRleHQpIDogbnVsbDtcbiAgICBhd2FpdCB1cGRhdGVTZXR0aW5ncyh7IHJvbGVNYXBwaW5nczogcGFyc2VkIH0pO1xuICAgIHNldFN0YXR1cygnbWFwcGluZ1N0YXR1cycsICdSb2xlIG1hcHBpbmdzIHVwZGF0ZWQgXHUyMDE0IHJlLXNjYW4gdGhlIHBhZ2UgdG8gYXBwbHkuJywgJ29rJyk7XG4gIH0pO1xuICAkPEhUTUxCdXR0b25FbGVtZW50PignYnRuRXhwb3J0TWFwcGluZ3MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50ID0gc3RhdGUuc2V0dGluZ3Mucm9sZU1hcHBpbmdzID8/IChhd2FpdCBpbXBvcnQoJy4vc2V0dGluZ3MnKSkucmVzb2x2ZVJvbGVNYXBwaW5ncyhzdGF0ZS5zZXR0aW5ncyk7XG4gICAgYXdhaXQgZG93bmxvYWRUZXh0KCdyb2xlTWFwcGluZ3MuanNvbicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnQsIG51bGwsIDIpLCAnYXBwbGljYXRpb24vanNvbicpO1xuICB9KTtcbiAgJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J0blJlc2V0TWFwcGluZ3MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB1cGRhdGVTZXR0aW5ncyh7IHJvbGVNYXBwaW5nczogbnVsbCB9KTtcbiAgICAkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdtYXBwaW5nSnNvbicpLnZhbHVlID0gJ251bGwnO1xuICAgIHNldFN0YXR1cygnbWFwcGluZ1N0YXR1cycsICdEZWZhdWx0cyByZXN0b3JlZC4nLCAnb2snKTtcbiAgfSk7XG5cbiAgLy8gTGl2ZSB1cGRhdGVzIGZyb20gY29udGVudCBzY3JpcHQuXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnOiB7IHR5cGU/OiBzdHJpbmc7IHBheWxvYWQ/OiBTY2FuUmVzcG9uc2UgfSkgPT4ge1xuICAgIGlmIChtc2c/LnR5cGUgPT09ICdFUElQTEVYX0xJVkVfVVBEQVRFJyAmJiBtc2cucGF5bG9hZCkge1xuICAgICAgc3RhdGUuc2NhbiA9IG1zZy5wYXlsb2FkO1xuICAgICAgcmVuZGVyUm9sZVN1bW1hcnkoKTtcbiAgICAgIHJlbmRlckNvbnRyb2xzKCk7XG4gICAgICBzZXRTdGF0dXMoJ3NjYW5TdGF0dXMnLCBgTGl2ZTogJHttc2cucGF5bG9hZC5jb250cm9scy5sZW5ndGh9IGNvbnRyb2xzYCwgJ29rJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbml0XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucmVuZGVyU2V0dGluZ3MoKTtcbndpcmVFdmVudHMoKTtcbnJlbmRlckNvbnRyb2xzKCk7XG5yZW5kZXJSdWxlcygpO1xucmVuZGVyWG1sKCk7XG5cbi8vIFNob3cgZXh0ZW5zaW9uIHZlcnNpb24gaW4gdGhlIGFib3V0IGNhcmQuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFuZWwtc2V0dGluZ3MgLmNhcmQ6bGFzdC1jaGlsZCAubXV0ZWQnKSEudGV4dENvbnRlbnQgPVxuICBgRXBpcGxleCBJRSBSdWxlcyBHZW5lcmF0b3IgdiR7RVhURU5TSU9OX1ZFUlNJT059IFx1MjAxNCBNYW5pZmVzdCBWMyBcdTAwQjcgVHlwZVNjcmlwdCBcdTAwQjcgRE9NIHNjYW5uaW5nIGluY2wuIHNoYWRvdyBET00uIEdlbmVyYXRlcyBJRUFkYXB0b3IueG1sIGNvbXBhdGlibGUgd2l0aCBFcGlwbGV4IENhcHR1cmUgLyBOZXRPbi5gO1xuIiwgIi8qKlxuICogdHJhdmVyc2FsRW5naW5lLnRzIFx1MjAxNCBUcmF2ZXJzYWwgbG9naWMgZ2VuZXJhdGlvbi5cbiAqXG4gKiBHZW5lcmF0ZXMgQmFzZWRPblRyYXZlcnNlTG9naWMgcnVsZXMgdGhhdCB0ZWxsIEVwaXBsZXggaG93IHRvIHJlYWNoIGEgcmVhbFxuICogY29udHJvbCBmcm9tIGEgdmlzaWJsZSB3cmFwcGVyIC8gdmlzdWFsIHdpZGdldDpcbiAqXG4gKiAgIEFuZ3VsYXIgTWF0ZXJpYWwgOiBtYXQtZm9ybS1maWVsZCBcdTIxOTIgQ0ggcmVjdXJzaXZlIDxpbnB1dD4gfCA8bWF0LXNlbGVjdD5cbiAqICAgU2FsZXNmb3JjZSAgICAgICAgOiBzbGRzLWZvcm0tZWxlbWVudCBcdTIxOTIgQ0ggcmVjdXJzaXZlIDxpbnB1dD4vPHNlbGVjdD5cbiAqICAgUG93ZXJBcHBzICAgICAgICAgOiBhcHBtYWdpYy0qIHdpZGdldCBcdTIxOTIgQ0ggcmVjdXJzaXZlIDxpbnB1dD5cbiAqICAgU0FQIFVJNSAgICAgICAgICAgOiB1aTUtKiB3aWRnZXQgXHUyMTkyIENIIHJlY3Vyc2l2ZSA8aW5wdXQ+XG4gKiAgIFNlbGVjdDIgLyBDaG9zZW4gIDogd2lkZ2V0IFx1MjE5MiBQUy9QUiByZWN1cnNpdmUgPHNlbGVjdD5cbiAqICAgQm9vdHN0cmFwICAgICAgICAgOiBjdXN0b20gY2hlY2tib3gvc3dpdGNoIFx1MjE5MiBQUy9QUiByZWN1cnNpdmUgPGlucHV0IHR5cGU9Y2hlY2tib3g+XG4gKiAgIGN1c3RvbSB3aWRnZXRzICAgIDogZGl2W3JvbGU9Y29tYm9ib3hdIFx1MjE5MiBDSCByZWN1cnNpdmUgPHNlbGVjdD4vPGlucHV0PlxuICogICBTVkcgY29udHJvbHMgICAgICA6IHN2ZyBpY29uIHNpYmxpbmcgXHUyMTkyIFBTIHJlY3Vyc2l2ZSA8YnV0dG9uPi88aW5wdXQ+XG4gKlxuICogU3VwcG9ydGVkIHBhdGhzOiBQUiAocGFyZW50KSwgQ0ggKGNoaWxkKSwgUFMgKHByZXZpb3VzIHNpYmxpbmcpLCBOUyAobmV4dFxuICogc2libGluZyksIGFuZCByZWN1cnNpdmUgdHJhdmVyc2FsIG9uIGFueSBvZiB0aGVtLlxuICpcbiAqIFRoZSBET00tc2lkZSBkaXNjb3ZlcnkgKGZpbmRpbmcgd3JhcHBlcnMgaW4gdGhlIGxpdmUgcGFnZSkgbGl2ZXMgaW5cbiAqIGNvbnRlbnQudHM7IHRoaXMgbW9kdWxlIGNvbnZlcnRzIGEgZGlzY292ZXJ5IGludG8gYSBwcm9wZXIgcnVsZSBhbmRcbiAqIGNvbGxlY3RzL2RlZHVwcyBhbGwgcnVsZXMgZm9yIFhNTCBlbWlzc2lvbi5cbiAqL1xuaW1wb3J0IHR5cGUgeyBDb25kaXRpb24sIERldGVjdGVkQ29udHJvbCwgUm9sZUlkLCBUcmF2ZXJzYWxQYXRoLCBUcmF2ZXJzYWxSdWxlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBXaGF0IGNvbnRlbnQudHMgZGlzY292ZXJlZDogYW4gYW5jaG9yIGVsZW1lbnQgKyBob3cgdG8gcmVhY2ggdGhlIHJlYWwgY29udHJvbC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhdmVyc2FsRGlzY292ZXJ5IHtcbiAgLyoqIEFuY2hvciBjb25kaXRpb24gKHdoYXQgRXBpcGxleCBzaG91bGQgbWF0Y2gpLiAqL1xuICBjb25kaXRpb246IENvbmRpdGlvbjtcbiAgLyoqIFRhcmdldCBmaWx0ZXIgYXR0cmlidXRlcywgZS5nLiB7IFRhZ05hbWU6ICdpbnB1dCcsIHR5cGU6ICdjaGVja2JveCcgfS4gKi9cbiAgdGFyZ2V0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICAvKiogRGlyZWN0aW9uIGZyb20gYW5jaG9yIHRvIHRhcmdldC4gKi9cbiAgZGlyZWN0aW9uOiAnQ0gnIHwgJ1BSJyB8ICdQUycgfCAnTlMnO1xuICAvKiogV2hldGhlciB0aGUgdHJhdmVyc2FsIGlzIHJlY3Vyc2l2ZS4gKi9cbiAgcmVjdXJzaXZlOiBib29sZWFuO1xuICBmcmFtZXdvcms6IHN0cmluZyB8IG51bGw7XG4gIHJlYXNvbjogc3RyaW5nO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSBkaXNjb3ZlcnkgaW50byBhbiBFcGlwbGV4IFRyYXZlcnNhbFJ1bGUuIFRoZSBhbmNob3IgYmVjb21lcyB0aGVcbiAqIHJ1bGUncyA8Q29uZGl0aW9uPiwgdGhlIHRhcmdldCBiZWNvbWVzIHRoZSA8UGF0aD4gPEF0dHJpYnV0ZXM+IGZpbHRlciwgYW5kXG4gKiB0aGUgZGlyZWN0aW9uIGJlY29tZXMgdGhlIFBhdGg9XCJQU1wifFwiQ0hcInxcdTIwMjYgYXR0cmlidXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRUcmF2ZXJzYWxSdWxlKFxuICBkaXNjb3Zlcnk6IFRyYXZlcnNhbERpc2NvdmVyeSxcbiAgY3VycmVudFJvbGU6IFJvbGVJZCxcbiAgcGFyZW50Um9sZTogUm9sZUlkIHwgbnVsbCxcbiAgY29uZmlkZW5jZTogbnVtYmVyXG4pOiBUcmF2ZXJzYWxSdWxlIHtcbiAgY29uc3QgcGF0aHM6IFRyYXZlcnNhbFBhdGhbXSA9IFtcbiAgICB7XG4gICAgICBwYXRoOiBkaXNjb3ZlcnkuZGlyZWN0aW9uLFxuICAgICAgb3BlcmF0b3I6IGRpc2NvdmVyeS5yZWN1cnNpdmUgPyAncmVjdXJzaXZlJyA6ICdzaW1wbGUnLFxuICAgICAgYXR0cmlidXRlczogZGlzY292ZXJ5LnRhcmdldCxcbiAgICB9LFxuICBdO1xuICByZXR1cm4ge1xuICAgIGN1cnJlbnRSb2xlLFxuICAgIHBhcmVudFJvbGUsXG4gICAgY29uZGl0aW9uOiBkaXNjb3ZlcnkuY29uZGl0aW9uLFxuICAgIHBhdGhzLFxuICAgIHNvdXJjZTogZGlzY292ZXJ5LnJlYXNvbixcbiAgICBmcmFtZXdvcms6IGRpc2NvdmVyeS5mcmFtZXdvcmsgPz8gdW5kZWZpbmVkLFxuICAgIGNvbmZpZGVuY2UsXG4gIH07XG59XG5cbi8qKlxuICogQ29sbGVjdCB0cmF2ZXJzYWwgcnVsZXMgdGhhdCBjb250ZW50LnRzIGF0dGFjaGVkIHRvIGRldGVjdGVkIGNvbnRyb2xzXG4gKiAoYGNvbnRyb2wudHJhdmVyc2FsUnVsZWApLiBSZXR1cm5zIHRoZSBkZWR1cGxpY2F0ZWQgbGlzdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlVHJhdmVyc2FsUnVsZXMoY29udHJvbHM6IERldGVjdGVkQ29udHJvbFtdKTogVHJhdmVyc2FsUnVsZVtdIHtcbiAgY29uc3Qgc2VlbiA9IG5ldyBNYXA8c3RyaW5nLCBUcmF2ZXJzYWxSdWxlPigpO1xuICBmb3IgKGNvbnN0IGMgb2YgY29udHJvbHMpIHtcbiAgICBjb25zdCByID0gYy50cmF2ZXJzYWxSdWxlO1xuICAgIGlmICghcikgY29udGludWU7XG4gICAgY29uc3Qga2V5ID0gZmluZ2VycHJpbnQocik7XG4gICAgaWYgKCFzZWVuLmhhcyhrZXkpKSBzZWVuLnNldChrZXksIHIpO1xuICB9XG4gIHJldHVybiBbLi4uc2Vlbi52YWx1ZXMoKV0uc29ydCgoYSwgYikgPT4gYS5jdXJyZW50Um9sZSAtIGIuY3VycmVudFJvbGUpO1xufVxuXG4vKiogQ2Fub25pY2FsIGZpbmdlcnByaW50IHVzZWQgZm9yIGRlZHVwICsgY29tcGFyZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5nZXJwcmludChyOiBUcmF2ZXJzYWxSdWxlKTogc3RyaW5nIHtcbiAgY29uc3QgY29uZCA9IFtyLmNvbmRpdGlvbi50YWdOYW1lLCByLmNvbmRpdGlvbi50eXBlLCByLmNvbmRpdGlvbi5jbGFzc05hbWUsIHIuY29uZGl0aW9uLmF0dHJpYnV0ZSwgci5jb25kaXRpb24udmFsdWVdLmpvaW4oJ3wnKTtcbiAgY29uc3QgcGF0aHMgPSByLnBhdGhzLm1hcCgocCkgPT4gYCR7cC5wYXRofToke3Aub3BlcmF0b3J9OiR7T2JqZWN0LmtleXMocC5hdHRyaWJ1dGVzKS5zb3J0KCkubWFwKChrKSA9PiBgJHtrfT0ke3AuYXR0cmlidXRlc1trXX1gKS5qb2luKCcsJyl9YCkuam9pbignPicpO1xuICByZXR1cm4gYHRyYXZlcnNhbHwke3IuY3VycmVudFJvbGV9fCR7ci5wYXJlbnRSb2xlID8/ICcnfXwke2NvbmR9fCR7cGF0aHN9YDtcbn1cblxuLyoqXG4gKiBCb251czogc3VnZ2VzdCB0cmF2ZXJzYWwgaW1wcm92ZW1lbnRzIGZvciBjb250cm9scyB0aGF0IGFyZSBjb3ZlcmVkIGJ5IGFcbiAqIHRhZy9hdHRyaWJ1dGUgcnVsZSBidXQgY291bGQgYmVuZWZpdCBmcm9tIGEgd3JhcHBlci1hbmNob3JlZCBydWxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VnZ2VzdFRyYXZlcnNhbEltcHJvdmVtZW50cyhjb250cm9sczogRGV0ZWN0ZWRDb250cm9sW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHN1Z2dlc3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGMgb2YgY29udHJvbHMpIHtcbiAgICBpZiAoYy50cmF2ZXJzYWxSdWxlKSBjb250aW51ZTtcbiAgICBjb25zdCB0YWcgPSBjLmF0dHJpYnV0ZXMudGFnTmFtZTtcbiAgICBjb25zdCBjbHMgPSBjLmF0dHJpYnV0ZXMuY2xhc3NOYW1lIHx8ICcnO1xuICAgIGlmICgodGFnID09PSAnaW5wdXQnIHx8IHRhZyA9PT0gJ3NlbGVjdCcpICYmIC9cXGIoaGlkZGVufHNyLW9ubHl8dmlzdWFsbHktaGlkZGVuKVxcYi8udGVzdChjbHMpKSB7XG4gICAgICBzdWdnZXN0aW9ucy5wdXNoKFxuICAgICAgICBgVGhlICR7Yy5yb2xlTmFtZX0gYXQgJHtjLmxvY2F0aW9uLmNzc1NlbGVjdG9yfSBpcyB2aXN1YWxseSBoaWRkZW4gXHUyMDE0IGNvbnNpZGVyIGEgdHJhdmVyc2FsIHJ1bGUgYW5jaG9yZWQgb24gaXRzIHZpc2libGUgd3JhcHBlciAoY2hlY2tib3gvc2VsZWN0Mi9jb21ib2JveCkuYFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGMudHJhdmVyc2FsUnVsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzdWdnZXN0aW9ucy5wdXNoKFxuICAgICAgICBgVGhlICR7Yy5yb2xlTmFtZX0gYXQgJHtjLmxvY2F0aW9uLmNzc1NlbGVjdG9yfSBpcyBjb3ZlcmVkIGJ5IGEgdGFnIHJ1bGUgYnV0IHNpdHMgaW4gYSBmcmFtZXdvcmsgd3JhcHBlciBcdTIwMTQgdmVyaWZ5IGEgdHJhdmVyc2FsIHJ1bGUgZnJvbSB0aGF0IHdyYXBwZXIgaXMgZGVzaXJlZC5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gWy4uLm5ldyBTZXQoc3VnZ2VzdGlvbnMpXS5zbGljZSgwLCAyMCk7XG59XG4iLCAiLyoqXG4gKiBzdGVwU2VudGVuY2UudHMgXHUyMDE0IEh1bWFuLXJlYWRhYmxlIGNvbnRyb2wgbmFtaW5nICsgc3RlcC1zZW50ZW5jZSBnZW5lcmF0aW9uLlxuICpcbiAqIFJ1bGVzIGVuZm9yY2VkIGhlcmU6XG4gKiAgIC0gQ1NTIGNsYXNzIG5hbWVzIGFyZSBORVZFUiB1c2VkIGFzIGEgY29udHJvbCBuYW1lLlxuICogICAtIFV0aWxpdHkvZnJhbWV3b3JrIGNsYXNzZXMgKFRhaWx3aW5kLXN0eWxlOiB0ZXh0LSosIGJnLSosIGgtKiwgdy0qLCBwLSosXG4gKiAgICAgbS0qLCBvcGFjaXR5LSosIGR1cmF0aW9uLSosIHRyYW5zaXRpb24tKiwgZmxleCwgZ3JpZCwgcm91bmRlZCwgc2hhZG93LFxuICogICAgIGhvdmVyOiosIGZvY3VzOiosIGRhcms6KiwgbWQ6KiwgbGc6KiwgeGw6KikgYXJlIGlnbm9yZWQuXG4gKiAgIC0gRm9yIGNsaWNrYWJsZSBlbGVtZW50cyB0aGUgbmFtZSBpcyByZXNvbHZlZCBieSBwcmlvcml0eTpcbiAqICAgICAgIDEuIFZpc2libGUgdGV4dCAoaW5uZXJUZXh0KVxuICogICAgICAgMi4gYXJpYS1sYWJlbFxuICogICAgICAgMy4gdGl0bGVcbiAqICAgICAgIDQuIGFsdFxuICogICAgICAgNS4gQXNzb2NpYXRlZCBsYWJlbFxuICogICAgICAgNi4gUGFyZW50IG9yIHNpYmxpbmcgdmlzaWJsZSB0ZXh0XG4gKiAgICAgICA3LiBCcmFuZCAvIGxvZ28gdGV4dCAoYWRqYWNlbnQgdGV4dCwgZS5nLiBcIkNoYXRHUFRcIilcbiAqICAgICAgIDguIEdlbmVyaWMgZmFsbGJhY2tcbiAqICAgLSBTdGVwIHNlbnRlbmNlczogXCJDbGljayA8TmFtZT4gYnV0dG9uL2xpbmsuXCIsIFwiQ2xpY2sgPE5hbWU+IEljb24uXCIsXG4gKiAgICAgXCJDbGljayA8TmFtZT4gbG9nby5cIiBcdTIwMTQgdGhlIG5hbWUgaW5zaWRlIHRoZSBzZW50ZW5jZSBhbHdheXMgbWF0Y2hlcyB0aGVcbiAqICAgICBodW1hbi1yZWFkYWJsZSBzdGVwIGRlc2NyaXB0aW9uLlxuICovXG5pbXBvcnQgdHlwZSB7IERldGVjdGVkQ29udHJvbCB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogVXRpbGl0eSAvIGZyYW1ld29yayBjbGFzcyBwYXR0ZXJucyB0aGF0IG11c3QgbmV2ZXIgbGVhayBpbnRvIGNvbnRyb2wgbmFtZXMuICovXG5jb25zdCBVVElMSVRZX1BBVFRFUk5TOiBSZWdFeHBbXSA9IFtcbiAgL150ZXh0LS9pLCAvXmJnLS9pLCAvXmgtL2ksIC9edy0vaSwgL15wLS9pLCAvXm0tL2ksXG4gIC9eb3BhY2l0eS0vaSwgL15kdXJhdGlvbi0vaSwgL150cmFuc2l0aW9uLS9pLFxuICAvXmZsZXgkL2ksIC9eZ3JpZCQvaSwgL15yb3VuZGVkL2ksIC9ec2hhZG93L2ksXG4gIC9eaG92ZXI6L2ksIC9eZm9jdXM6L2ksIC9eZGFyazovaSxcbiAgL15tZDovaSwgL15sZzovaSwgL154bDovaSwgL15zbTovaSwgL14yeGw6L2ksXG4gIC9eKHJlbGF0aXZlfGFic29sdXRlfGZpeGVkfHN0aWNreSkkL2ksXG4gIC9eKGJsb2NrfGlubGluZXxpbmxpbmUtYmxvY2t8aGlkZGVuKSQvaSxcbiAgL14oYm9yZGVyfGJvcmRlci0uKikkL2ksXG5dO1xuXG4vKiogVHJ1ZSB3aGVuIGEgd2hpdGVzcGFjZS1zZXBhcmF0ZWQgdG9rZW4gaXMgYSB1dGlsaXR5L2ZyYW1ld29yayBjbGFzcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1V0aWxpdHlDbGFzcyh0b2tlbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHQgPSB0b2tlbi50cmltKCk7XG4gIGlmICghdCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gVVRJTElUWV9QQVRURVJOUy5zb21lKChyZSkgPT4gcmUudGVzdCh0KSk7XG59XG5cbi8qKiBDb2xsYXBzZSB3aGl0ZXNwYWNlLCB0cmltIHF1b3Rlcy9icmFja2V0cywgY2FwIGxlbmd0aC4gUmV0dXJucyBudWxsIHdoZW4gdW51c2FibGUuICovXG5mdW5jdGlvbiBjbGVhbk5hbWUocmF3OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHwgbnVsbCB7XG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgY2xlYW5lZCA9IHJhd1xuICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAucmVwbGFjZSgvXltcXHNcIidcdTIwMUNcdTIwMURcdTIwMThcdTIwMTkoW3tdK3xbXFxzXCInXHUyMDFDXHUyMDFEXHUyMDE4XHUyMDE5KVxcXX1dKyQvZywgJycpXG4gICAgLnRyaW0oKTtcbiAgaWYgKCFjbGVhbmVkIHx8IGNsZWFuZWQubGVuZ3RoIDwgMSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBjbGVhbmVkLmxlbmd0aCA+IDQ4ID8gY2xlYW5lZC5zbGljZSgwLCA0NykudHJpbUVuZCgpICsgJ1x1MjAyNicgOiBjbGVhbmVkO1xufVxuXG4vKiogUmVqZWN0IG5hbWVzIHRoYXQgY29uc2lzdCBlbnRpcmVseSBvZiB1dGlsaXR5IGNsYXNzZXMgKGRlZmVuc2l2ZSBndWFyZCkuICovXG5mdW5jdGlvbiB1c2FibGVOYW1lKHJhdzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IG51bGwge1xuICBjb25zdCBuYW1lID0gY2xlYW5OYW1lKHJhdyk7XG4gIGlmICghbmFtZSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHRva2VucyA9IG5hbWUuc3BsaXQoL1xccysvKTtcbiAgaWYgKHRva2Vucy5sZW5ndGggPiAwICYmIHRva2Vucy5ldmVyeShpc1V0aWxpdHlDbGFzcykpIHJldHVybiBudWxsO1xuICByZXR1cm4gbmFtZTtcbn1cblxuZXhwb3J0IHR5cGUgQ2xpY2tLaW5kID1cbiAgfCAnYnV0dG9uJyB8ICdsaW5rJyB8ICdpY29uJyB8ICdsb2dvJ1xuICB8ICdjaGVja2JveCcgfCAncmFkaW8nIHwgJ2Ryb3Bkb3duJyB8ICd0ZXh0Ym94JyB8ICdkYXRlJyB8ICd0YWInIHwgJ290aGVyJztcblxuLyoqIFdoaWNoIHNlbnRlbmNlIHRlbXBsYXRlIGEgY29udHJvbCB1c2VzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrS2luZChjOiBEZXRlY3RlZENvbnRyb2wpOiBDbGlja0tpbmQge1xuICBjb25zdCB0YWcgPSBjLmF0dHJpYnV0ZXMudGFnTmFtZTtcbiAgY29uc3Qgcm9sZSA9IGMuYXR0cmlidXRlcy5yb2xlO1xuICBjb25zdCBjbHMgPSBjLmF0dHJpYnV0ZXMuY2xhc3NOYW1lIHx8ICcnO1xuICBjb25zdCBpc0xvZ28gPSAvbG9nb3xicmFuZC9pLnRlc3QoY2xzKTtcblxuICBpZiAocm9sZSA9PT0gJ2J1dHRvbicgfHwgdGFnID09PSAnYnV0dG9uJyB8fCBjLnJvbGUgPT09IDQzKSByZXR1cm4gJ2J1dHRvbic7XG4gIGlmICh0YWcgPT09ICdhJyB8fCByb2xlID09PSAnbGluaycgfHwgYy5yb2xlID09PSAzMCkgcmV0dXJuICdsaW5rJztcbiAgaWYgKGMucm9sZSA9PT0gODIgfHwgdGFnID09PSAnc3ZnJyB8fCB0YWcgPT09ICdpJyB8fCB0YWcgPT09ICdtYXQtaWNvbicpIHJldHVybiBpc0xvZ28gPyAnbG9nbycgOiAnaWNvbic7XG4gIGlmICh0YWcgPT09ICdpbWcnKSByZXR1cm4gaXNMb2dvID8gJ2xvZ28nIDogJ2ljb24nO1xuICBpZiAoYy5yb2xlID09PSA0NCkgcmV0dXJuICdjaGVja2JveCc7XG4gIGlmIChjLnJvbGUgPT09IDQ1KSByZXR1cm4gJ3JhZGlvJztcbiAgaWYgKGMucm9sZSA9PT0gNDYpIHJldHVybiAnZHJvcGRvd24nO1xuICBpZiAoYy5yb2xlID09PSA0MikgcmV0dXJuICd0ZXh0Ym94JztcbiAgaWYgKGMucm9sZSA9PT0gOTIpIHJldHVybiAnZGF0ZSc7XG4gIGlmIChjLnJvbGUgPT09IDM3KSByZXR1cm4gJ3RhYic7XG4gIHJldHVybiAnb3RoZXInO1xufVxuXG4vKipcbiAqIFJlc29sdmUgdGhlIGh1bWFuLXJlYWRhYmxlIGNvbnRyb2wgbmFtZSB1c2luZyB0aGUgZG9jdW1lbnRlZCBwcmlvcml0eS5cbiAqIENTUyBjbGFzcyBuYW1lcyBhcmUgbmV2ZXIgdXNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVDb250cm9sTmFtZShjOiBEZXRlY3RlZENvbnRyb2wpOiBzdHJpbmcge1xuICBjb25zdCBhID0gYy5hdHRyaWJ1dGVzO1xuXG4gIC8vIDEuIFZpc2libGUgdGV4dCAoaW5uZXJUZXh0IC8gdGV4dENvbnRlbnQgb2YgdGhlIGVsZW1lbnQgaXRzZWxmKS5cbiAgY29uc3QgdmlzaWJsZSA9IHVzYWJsZU5hbWUoYy5kaXNwbGF5VGV4dCk7XG4gIGlmICh2aXNpYmxlKSByZXR1cm4gdmlzaWJsZTtcblxuICAvLyAyLiBhcmlhLWxhYmVsXG4gIGNvbnN0IGFyaWEgPSB1c2FibGVOYW1lKGEuYXJpYUxhYmVsKTtcbiAgaWYgKGFyaWEpIHJldHVybiBhcmlhO1xuXG4gIC8vIDMuIHRpdGxlXG4gIGNvbnN0IHRpdGxlID0gdXNhYmxlTmFtZShhLnRpdGxlKTtcbiAgaWYgKHRpdGxlKSByZXR1cm4gdGl0bGU7XG5cbiAgLy8gNC4gYWx0XG4gIGNvbnN0IGFsdCA9IHVzYWJsZU5hbWUoYS5hbHQpO1xuICBpZiAoYWx0KSByZXR1cm4gYWx0O1xuXG4gIC8vIDUuIEFzc29jaWF0ZWQgbGFiZWwgKGxhYmVsW2Zvcl0sIHBhcmVudCBsYWJlbCwgZm9ybS1ncm91cFx1MjAyNilcbiAgY29uc3QgbGFiZWwgPSB1c2FibGVOYW1lKGMubGFiZWwpO1xuICBpZiAobGFiZWwpIHJldHVybiBsYWJlbDtcblxuICAvLyA2LiBQYXJlbnQgb3Igc2libGluZyB2aXNpYmxlIHRleHRcbiAgY29uc3QgYWRqYWNlbnQgPSB1c2FibGVOYW1lKGMuYWRqYWNlbnRUZXh0KTtcbiAgaWYgKGFkamFjZW50KSByZXR1cm4gYWRqYWNlbnQ7XG5cbiAgLy8gNy4gQnJhbmQgLyBsb2dvIHRleHQgXHUyMDE0IHNhbWUgYWRqYWNlbnQtdGV4dCBzb3VyY2UgYXMgIzY7IGFscmVhZHkgdHJpZWQuXG4gIC8vIDguIEdlbmVyaWMgZmFsbGJhY2sgXHUyMDE0IG5ldmVyIGEgY2xhc3MgbmFtZS5cbiAgcmV0dXJuICdlbGVtZW50Jztcbn1cblxuLyoqIFRoZSBodW1hbi1yZWFkYWJsZSBzdGVwIGRlc2NyaXB0aW9uIChjb250cm9sIG5hbWUpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0ZXBEZXNjcmlwdGlvbihjOiBEZXRlY3RlZENvbnRyb2wpOiBzdHJpbmcge1xuICByZXR1cm4gY29tcHV0ZUNvbnRyb2xOYW1lKGMpO1xufVxuXG4vKiogVGhlIGZ1bGwgc3RlcCBzZW50ZW5jZSwgZS5nLiBcIkNsaWNrIFNhdmUgYnV0dG9uLlwiIG9yIFwiQ2xpY2sgQ2hhdEdQVCBJY29uLlwiLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU3RlcFNlbnRlbmNlKGM6IERldGVjdGVkQ29udHJvbCk6IHN0cmluZyB7XG4gIGNvbnN0IG5hbWUgPSBjb21wdXRlQ29udHJvbE5hbWUoYyk7XG4gIHN3aXRjaCAoY2xpY2tLaW5kKGMpKSB7XG4gICAgY2FzZSAnYnV0dG9uJzogIHJldHVybiBgQ2xpY2sgJHtuYW1lfSBidXR0b24uYDtcbiAgICBjYXNlICdsaW5rJzogICAgcmV0dXJuIGBDbGljayAke25hbWV9IGxpbmsuYDtcbiAgICBjYXNlICdpY29uJzogICAgcmV0dXJuIGBDbGljayAke25hbWV9IEljb24uYDtcbiAgICBjYXNlICdsb2dvJzogICAgcmV0dXJuIGBDbGljayAke25hbWV9IGxvZ28uYDtcbiAgICBjYXNlICdjaGVja2JveCc6IHJldHVybiBgQ2hlY2sgJHtuYW1lfSBjaGVja2JveC5gO1xuICAgIGNhc2UgJ3JhZGlvJzogICByZXR1cm4gYFNlbGVjdCAke25hbWV9IHJhZGlvLmA7XG4gICAgY2FzZSAnZHJvcGRvd24nOiByZXR1cm4gYFNlbGVjdCAke25hbWV9IGRyb3Bkb3duLmA7XG4gICAgY2FzZSAndGV4dGJveCc6IHJldHVybiBgVHlwZSBpbnRvICR7bmFtZX0gdGV4dGJveC5gO1xuICAgIGNhc2UgJ2RhdGUnOiAgICByZXR1cm4gYFBpY2sgZGF0ZSBpbiAke25hbWV9LmA7XG4gICAgY2FzZSAndGFiJzogICAgIHJldHVybiBgQ2xpY2sgJHtuYW1lfSB0YWIuYDtcbiAgICBkZWZhdWx0OiAgICAgICAgcmV0dXJuIGBDbGljayAke25hbWV9LmA7XG4gIH1cbn1cbiIsICIvKipcbiAqIHhtbEdlbmVyYXRvci50cyBcdTIwMTQgSUVBZGFwdG9yLnhtbCBnZW5lcmF0aW9uICsgdmFsaWRhdGlvbi5cbiAqXG4gKiBQcm9kdWNlcyBhIHZhbGlkLCBwcmV0dHktcHJpbnRlZCBJRUFkYXB0b3IueG1sIGV4YWN0bHkgbWF0Y2hpbmcgdGhlXG4gKiBFcGlwbGV4IHN0cnVjdHVyZSBhbmQgbmFtaW5nIGNvbnZlbnRpb25zIChzZWUgdGhlIHJlZmVyZW5jZSBJRUFkYXB0b3IueG1sKTpcbiAqXG4gKiAgIDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cInV0Zi04XCI/PlxuICogICA8SUVGaWx0ZXJzIEV4Y2x1ZGVkRG9tYWluPVwiXCI+XG4gKiAgICAgPEdlbmVyYWwgRW5hYmxlPVwiMVwiIFF1ZXJ5SGVhZGVyPVwiMFwiIFF1ZXJ5VGFnPVwiSDFcIj5cbiAqICAgICAgIDxSb2xlSWRlbnRpZmllcj5cbiAqICAgICAgICAgPEJhc2VkT25UYWdzPlx1MjAyNjwvQmFzZWRPblRhZ3M+XG4gKiAgICAgICAgIDxCYXNlZE9uQXR0cmlidXRlcz5cdTIwMjY8L0Jhc2VkT25BdHRyaWJ1dGVzPlxuICogICAgICAgICA8QmFzZWRPblRyYXZlcnNlTG9naWM+XHUyMDI2PC9CYXNlZE9uVHJhdmVyc2VMb2dpYz5cbiAqICAgICAgIDwvUm9sZUlkZW50aWZpZXI+XG4gKiAgICAgICA8TGFiZWxJZGVudGlmaWVyIHJvbGVzZm9ycmVjdGFuZGllbG9naWM9XCI0Mnw0NHw0NXw0NnwzM3wzNHwzMHwxMHw0MHw4Mnw0M3wzN1wiPlxuICogICAgICAgICA8U3RhbmRhcmRMb2dpYz5cdTIwMjY8L1N0YW5kYXJkTG9naWM+XG4gKiAgICAgICAgIDxUcmF2ZXJzZUxvZ2ljPlx1MjAyNjwvVHJhdmVyc2VMb2dpYz5cbiAqICAgICAgICAgPERlZmF1bHRMb2dpYz5cdTIwMjY8L0RlZmF1bHRMb2dpYz5cbiAqICAgICAgIDwvTGFiZWxJZGVudGlmaWVyPlxuICogICAgIDwvR2VuZXJhbD5cbiAqICAgPC9JRUZpbHRlcnM+XG4gKi9cbmltcG9ydCB0eXBlIHtcbiAgQXR0cmlidXRlUnVsZSxcbiAgRGV0ZWN0ZWRDb250cm9sLFxuICBSdWxlTW9kZWwsXG4gIFN0YW5kYXJkTGFiZWxSdWxlLFxuICBUYWdSdWxlLFxuICBUcmF2ZXJzYWxSdWxlLFxuICBUcmF2ZXJzZUxhYmVsUnVsZSxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBjb21wdXRlQ29udHJvbE5hbWUgfSBmcm9tICcuL3N0ZXBTZW50ZW5jZSc7XG5cbmV4cG9ydCBjb25zdCBFWFRFTlNJT05fTkFNRSA9ICdFcGlwbGV4IElFIFJ1bGVzIEdlbmVyYXRvcic7XG5leHBvcnQgY29uc3QgRVhURU5TSU9OX1ZFUlNJT04gPSAnMS4wLjAnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFhNTCBoZWxwZXJzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVhtbChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc1xuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgLnJlcGxhY2UoLycvZywgJyZhcG9zOycpO1xufVxuXG5jb25zdCBUID0gJ1xcdCc7XG5cbi8qKiBSZW5kZXIgYSBjb21tZW50IGxpbmUuICovXG5mdW5jdGlvbiBjb21tZW50KHRleHQ6IHN0cmluZywgaW5kZW50OiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7VC5yZXBlYXQoaW5kZW50KX08IS0tICR7dGV4dH0gLS0+YDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSb2xlSWRlbnRpZmllciBydWxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHJlbmRlclRhZ1J1bGUocnVsZTogVGFnUnVsZSwgaW5kZW50OiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBvdXQ6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHBhcmVudCA9IHJ1bGUucGFyZW50Um9sZSA9PT0gbnVsbCA/ICcnIDogU3RyaW5nKHJ1bGUucGFyZW50Um9sZSk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCl9PFJ1bGUgRW5hYmxlPVwiMVwiIEN1cnJlbnRSb2xlPVwiJHtydWxlLmN1cnJlbnRSb2xlfVwiIFBhcmVudFJvbGU9XCIke3BhcmVudH1cIj5gKTtcbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMSl9PEN1cnJlbnRJbmZvPmApO1xuICBmb3IgKGNvbnN0IGNvbmQgb2YgcnVsZS5jb25kaXRpb25zKSB7XG4gICAgY29uc3QgdHlwZSA9IGNvbmQudHlwZSA/IGAgVHlwZT1cIiR7ZXNjYXBlWG1sKGNvbmQudHlwZSl9XCJgIDogJyc7XG4gICAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMil9PENvbmRpdGlvbiBUYWdOYW1lPVwiJHtlc2NhcGVYbWwoY29uZC50YWdOYW1lKX1cIiR7dHlwZX0vPmApO1xuICB9XG4gIGlmIChydWxlLnNvdXJjZSkgb3V0LnB1c2goY29tbWVudChlc2NhcGVYbWwocnVsZS5zb3VyY2UpLCBpbmRlbnQgKyAyKSk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDEpfTwvQ3VycmVudEluZm8+YCk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCl9PC9SdWxlPmApO1xuICByZXR1cm4gb3V0LmpvaW4oJ1xcbicpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJBdHRyaWJ1dGVSdWxlKHJ1bGU6IEF0dHJpYnV0ZVJ1bGUsIGluZGVudDogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3Qgb3V0OiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBwYXJlbnQgPSBydWxlLnBhcmVudFJvbGUgPT09IG51bGwgPyAnJyA6IFN0cmluZyhydWxlLnBhcmVudFJvbGUpO1xuICBjb25zdCB2YWx1ZXMgPSBgfCR7Wy4uLm5ldyBTZXQocnVsZS52YWx1ZXMpXS5qb2luKCd8Jyl9fGA7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCl9PFJ1bGUgRW5hYmxlPVwiMVwiIEN1cnJlbnRSb2xlPVwiJHtydWxlLmN1cnJlbnRSb2xlfVwiIFBhcmVudFJvbGU9XCIke3BhcmVudH1cIj5gKTtcbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMSl9PEN1cnJlbnRJbmZvPmApO1xuICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQgKyAyKX08Q29uZGl0aW9uIE9wZXJhdG9yPVwiJHtydWxlLm9wZXJhdG9yfVwiICR7ZXNjYXBlWG1sKHJ1bGUuYXR0cmlidXRlKX09XCIke2VzY2FwZVhtbCh2YWx1ZXMpfVwiLz5gKTtcbiAgaWYgKHJ1bGUuZnJhbWV3b3JrKSBvdXQucHVzaChjb21tZW50KGBmcmFtZXdvcms6ICR7ZXNjYXBlWG1sKHJ1bGUuZnJhbWV3b3JrKX1gLCBpbmRlbnQgKyAyKSk7XG4gIGlmIChydWxlLnNvdXJjZSkgb3V0LnB1c2goY29tbWVudChlc2NhcGVYbWwocnVsZS5zb3VyY2UpLCBpbmRlbnQgKyAyKSk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDEpfTwvQ3VycmVudEluZm8+YCk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCl9PC9SdWxlPmApO1xuICByZXR1cm4gb3V0LmpvaW4oJ1xcbicpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUcmF2ZXJzYWxSdWxlKHJ1bGU6IFRyYXZlcnNhbFJ1bGUsIGluZGVudDogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3Qgb3V0OiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCBwYXJlbnQgPSBydWxlLnBhcmVudFJvbGUgPT09IG51bGwgPyAnJyA6IFN0cmluZyhydWxlLnBhcmVudFJvbGUpO1xuICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQpfTxSdWxlIEVuYWJsZT1cIjFcIiBDdXJyZW50Um9sZT1cIiR7cnVsZS5jdXJyZW50Um9sZX1cIiBQYXJlbnRSb2xlPVwiJHtwYXJlbnR9XCI+YCk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDEpfTxDdXJyZW50SW5mbz5gKTtcbiAgY29uc3QgY29uZCA9IHJ1bGUuY29uZGl0aW9uO1xuICBpZiAoY29uZC50YWdOYW1lKSB7XG4gICAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMil9PENvbmRpdGlvbiBUYWdOYW1lPVwiJHtlc2NhcGVYbWwoY29uZC50YWdOYW1lKX1cIi8+YCk7XG4gIH0gZWxzZSBpZiAoY29uZC5jbGFzc05hbWUpIHtcbiAgICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQgKyAyKX08Q29uZGl0aW9uIGNsYXNzTmFtZT1cIiR7ZXNjYXBlWG1sKGNvbmQuY2xhc3NOYW1lKX1cIiBPcGVyYXRvcj1cIiR7Y29uZC5vcGVyYXRvciB8fCAnY29udGFpbnMnfVwiLz5gKTtcbiAgfSBlbHNlIGlmIChjb25kLmF0dHJpYnV0ZSkge1xuICAgIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDIpfTxDb25kaXRpb24gJHtlc2NhcGVYbWwoY29uZC5hdHRyaWJ1dGUpfT1cIiR7ZXNjYXBlWG1sKGNvbmQudmFsdWUgfHwgJycpfVwiIE9wZXJhdG9yPVwiJHtjb25kLm9wZXJhdG9yIHx8ICdjb250YWlucyd9XCIvPmApO1xuICB9IGVsc2UgaWYgKGNvbmQudHlwZSkge1xuICAgIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDIpfTxDb25kaXRpb24gVGFnTmFtZT1cIiR7ZXNjYXBlWG1sKGNvbmQudHlwZSl9XCIvPmApO1xuICB9XG4gIGlmIChydWxlLmZyYW1ld29yaykgb3V0LnB1c2goY29tbWVudChgZnJhbWV3b3JrOiAke2VzY2FwZVhtbChydWxlLmZyYW1ld29yayl9YCwgaW5kZW50ICsgMikpO1xuICBpZiAocnVsZS5zb3VyY2UpIG91dC5wdXNoKGNvbW1lbnQoZXNjYXBlWG1sKHJ1bGUuc291cmNlKSwgaW5kZW50ICsgMikpO1xuICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQgKyAxKX08L0N1cnJlbnRJbmZvPmApO1xuICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQgKyAxKX08VHJhdmVyc2FsSW5mbz5gKTtcbiAgZm9yIChjb25zdCBwYXRoIG9mIHJ1bGUucGF0aHMpIHtcbiAgICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQgKyAyKX08UGF0aCBQYXRoPVwiJHtwYXRoLnBhdGh9XCI+YCk7XG4gICAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMyl9PENvbmRpdGlvbiBPcGVyYXRvcj1cIiR7cGF0aC5vcGVyYXRvcn1cIj5gKTtcbiAgICBjb25zdCBhdHRycyA9IE9iamVjdC5lbnRyaWVzKHBhdGguYXR0cmlidXRlcylcbiAgICAgIC5tYXAoKFtrLCB2XSkgPT4gYCR7a309XCIke2VzY2FwZVhtbCh2KX1cImApXG4gICAgICAuam9pbignICcpO1xuICAgIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDQpfTxBdHRyaWJ1dGVzICR7YXR0cnN9Lz5gKTtcbiAgICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQgKyAzKX08L0NvbmRpdGlvbj5gKTtcbiAgICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQgKyAyKX08L1BhdGg+YCk7XG4gIH1cbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMSl9PC9UcmF2ZXJzYWxJbmZvPmApO1xuICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQpfTwvUnVsZT5gKTtcbiAgcmV0dXJuIG91dC5qb2luKCdcXG4nKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBMYWJlbElkZW50aWZpZXIgcnVsZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiByZW5kZXJTdGFuZGFyZFJ1bGUocnVsZTogU3RhbmRhcmRMYWJlbFJ1bGUsIGluZGVudDogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIFtcbiAgICBgJHtULnJlcGVhdChpbmRlbnQpfTxSdWxlIElkPVwiJHtydWxlLmlkfVwiPmAsXG4gICAgYCR7VC5yZXBlYXQoaW5kZW50ICsgMSl9PEF0dHJpYnV0ZXMgRnJvbT1cIiR7cnVsZS5mcm9tfVwiIFRvPVwiJHtydWxlLnRvfVwiIE9wZXJhdG9yPVwiJHtydWxlLm9wZXJhdG9yfVwiLz5gLFxuICAgIGAke1QucmVwZWF0KGluZGVudCl9PC9SdWxlPmAsXG4gIF0uam9pbignXFxuJyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRyYXZlcnNlTGFiZWxSdWxlKHJ1bGU6IFRyYXZlcnNlTGFiZWxSdWxlLCBpbmRlbnQ6IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IG91dDogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgcGFyZW50ID0gcnVsZS5wYXJlbnRSb2xlID09PSBudWxsID8gJycgOiBTdHJpbmcocnVsZS5wYXJlbnRSb2xlKTtcbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50KX08UnVsZSBJZD1cIiR7cnVsZS5pZH1cIiBFbmFibGU9XCIxXCI+YCk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDEpfTxXaGVuVG9Db25zaWRlciBSb2xlPVwiJHtydWxlLnJvbGV9XCIgUGFyZW50Um9sZT1cIiR7cGFyZW50fVwiPmApO1xuICBjb25zdCBhdHRycyA9IE9iamVjdC5lbnRyaWVzKHJ1bGUuYXR0cmlidXRlcykubWFwKChbaywgdl0pID0+IGAke2t9PVwiJHtlc2NhcGVYbWwodil9XCJgKS5qb2luKCcgJyk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDIpfTxBdHRyaWJ1dGVzICR7YXR0cnN9Lz5gKTtcbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMSl9PC9XaGVuVG9Db25zaWRlcj5gKTtcbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMSl9PFdoZXJlVG9Hbz5gKTtcbiAgZm9yIChjb25zdCBwYXRoIG9mIHJ1bGUucGF0aHMpIHtcbiAgICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQgKyAyKX08UGF0aCBQYXRoPVwiJHtwYXRoLnBhdGh9XCI+YCk7XG4gICAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMyl9PENvbmRpdGlvbiBPcGVyYXRvcj1cIiR7cGF0aC5vcGVyYXRvcn1cIj5gKTtcbiAgICBjb25zdCBwQXR0cnMgPSBPYmplY3QuZW50cmllcyhwYXRoLmF0dHJpYnV0ZXMpLm1hcCgoW2ssIHZdKSA9PiBgJHtrfT1cIiR7ZXNjYXBlWG1sKHYpfVwiYCkuam9pbignICcpO1xuICAgIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDQpfTxBdHRyaWJ1dGVzICR7cEF0dHJzfS8+YCk7XG4gICAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMyl9PC9Db25kaXRpb24+YCk7XG4gICAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMil9PC9QYXRoPmApO1xuICB9XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDEpfTwvV2hlcmVUb0dvPmApO1xuICBvdXQucHVzaChgJHtULnJlcGVhdChpbmRlbnQgKyAxKX08V2hhdFRvQ2FsbD5gKTtcbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50ICsgMil9PE1ldGhvZCBOYW1lPVwiJHtydWxlLm1ldGhvZH1cIi8+YCk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KGluZGVudCArIDEpfTwvV2hhdFRvQ2FsbD5gKTtcbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoaW5kZW50KX08L1J1bGU+YCk7XG4gIHJldHVybiBvdXQuam9pbignXFxuJyk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVsbCBkb2N1bWVudCBnZW5lcmF0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgREVGQVVMVF9MT0dJQyA9IFtcbiAgeyBpZDogJ0RMXzYnLCBuYW1lOiAndGl0bGUnIH0sXG4gIHsgaWQ6ICdETF83JywgbmFtZTogJ2FsdCcgfSxcbiAgeyBpZDogJ0RMXzInLCBuYW1lOiAnSWQnIH0sXG4gIHsgaWQ6ICdETF8zJywgbmFtZTogJ2NsYXNzTmFtZScgfSxcbiAgeyBpZDogJ0RMXzQnLCBuYW1lOiAndHlwZScgfSxcbl07XG5cbi8qKiBHZW5lcmF0ZSB0aGUgZnVsbCBJRUFkYXB0b3IueG1sIGRvY3VtZW50IGZyb20gYSBSdWxlTW9kZWwuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVYTUwobW9kZWw6IFJ1bGVNb2RlbCk6IHN0cmluZyB7XG4gIGNvbnN0IG91dDogc3RyaW5nW10gPSBbXTtcbiAgY29uc3Qgc2l0ZXMgPSBbLi4ubmV3IFNldChtb2RlbC5zaXRlcyldLmpvaW4oJzsgJyk7XG5cbiAgb3V0LnB1c2goJzw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cInV0Zi04XCI/PicpO1xuICBvdXQucHVzaChgPElFRmlsdGVycyBFeGNsdWRlZERvbWFpbj1cIlwiPmApO1xuICBvdXQucHVzaChjb21tZW50KGBHZW5lcmF0ZWQgYnkgJHtFWFRFTlNJT05fTkFNRX0gdiR7RVhURU5TSU9OX1ZFUlNJT059YCwgMSkpO1xuICBpZiAoc2l0ZXMpIG91dC5wdXNoKGNvbW1lbnQoYFNjYW5uZWQ6ICR7ZXNjYXBlWG1sKHNpdGVzKX1gLCAxKSk7XG4gIG91dC5wdXNoKGAke1R9PEdlbmVyYWwgRW5hYmxlPVwiMVwiIFF1ZXJ5SGVhZGVyPVwiMFwiIFF1ZXJ5VGFnPVwiSDFcIj5gKTtcblxuICAvLyAtLS0tIFJvbGVJZGVudGlmaWVyIC0tLS1cbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoMil9PFJvbGVJZGVudGlmaWVyPmApO1xuXG4gIG91dC5wdXNoKGAke1QucmVwZWF0KDMpfTxCYXNlZE9uVGFncz5gKTtcbiAgZm9yIChjb25zdCBydWxlIG9mIG1vZGVsLmJhc2VkT25UYWdzKSBvdXQucHVzaChyZW5kZXJUYWdSdWxlKHJ1bGUsIDQpKTtcbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoMyl9PC9CYXNlZE9uVGFncz5gKTtcblxuICBvdXQucHVzaChgJHtULnJlcGVhdCgzKX08QmFzZWRPbkF0dHJpYnV0ZXM+YCk7XG4gIGZvciAoY29uc3QgcnVsZSBvZiBtb2RlbC5iYXNlZE9uQXR0cmlidXRlcykgb3V0LnB1c2gocmVuZGVyQXR0cmlidXRlUnVsZShydWxlLCA0KSk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KDMpfTwvQmFzZWRPbkF0dHJpYnV0ZXM+YCk7XG5cbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoMyl9PEJhc2VkT25UcmF2ZXJzZUxvZ2ljPmApO1xuICBmb3IgKGNvbnN0IHJ1bGUgb2YgbW9kZWwuYmFzZWRPblRyYXZlcnNlTG9naWMpIG91dC5wdXNoKHJlbmRlclRyYXZlcnNhbFJ1bGUocnVsZSwgNCkpO1xuICBvdXQucHVzaChgJHtULnJlcGVhdCgzKX08L0Jhc2VkT25UcmF2ZXJzZUxvZ2ljPmApO1xuXG4gIG91dC5wdXNoKGAke1QucmVwZWF0KDIpfTwvUm9sZUlkZW50aWZpZXI+YCk7XG5cbiAgLy8gLS0tLSBMYWJlbElkZW50aWZpZXIgLS0tLVxuICAvLyBSb2xlIHNldCBtYXRjaGVzIHRoZSB3b3JraW5nIHJlZmVyZW5jZSBmaWxlJ3MgZmluYWwgTGFiZWxJZGVudGlmaWVyIHNvXG4gIC8vIEVwaXBsZXggaGl0LXRlc3RzIGJ5IHJlY3QgZm9yIGxpbmtzICgzMCksIG5hdiAoMTApLCBpbWFnZXMgKDQwKSwgaWNvbnMgKDgyKSxcbiAgLy8gYnV0dG9ucyAoNDMpIGFuZCB0YWJzICgzNykgdG9vIFx1MjAxNCB3aXRob3V0IDQwfDgyLCBjbGlja2luZyBhIGxvZ28vaWNvblxuICAvLyAoZS5nLiB0aGUgQ2hhdEdQVCBsb2dvKSBpcyBuZXZlciByZWNvcmRlZC5cbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoMil9PExhYmVsSWRlbnRpZmllciByb2xlc2ZvcnJlY3RhbmRpZWxvZ2ljPVwiNDJ8NDR8NDV8NDZ8MzN8MzR8MzB8MTB8NDB8ODJ8NDN8MzdcIj5gKTtcbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoMyl9PFN0YW5kYXJkTG9naWM+YCk7XG4gIGZvciAoY29uc3QgcnVsZSBvZiBtb2RlbC5zdGFuZGFyZExvZ2ljKSBvdXQucHVzaChyZW5kZXJTdGFuZGFyZFJ1bGUocnVsZSwgNCkpO1xuICBvdXQucHVzaChgJHtULnJlcGVhdCgzKX08L1N0YW5kYXJkTG9naWM+YCk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KDMpfTxUcmF2ZXJzZUxvZ2ljPmApO1xuICBmb3IgKGNvbnN0IHJ1bGUgb2YgbW9kZWwudHJhdmVyc2VMb2dpYykgb3V0LnB1c2gocmVuZGVyVHJhdmVyc2VMYWJlbFJ1bGUocnVsZSwgNCkpO1xuICBvdXQucHVzaChgJHtULnJlcGVhdCgzKX08L1RyYXZlcnNlTG9naWM+YCk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KDMpfTxEZWZhdWx0TG9naWM+YCk7XG4gIGZvciAoY29uc3QgZGwgb2YgREVGQVVMVF9MT0dJQykge1xuICAgIG91dC5wdXNoKGAke1QucmVwZWF0KDQpfTxSdWxlIElkPVwiJHtkbC5pZH1cIj5gKTtcbiAgICBvdXQucHVzaChgJHtULnJlcGVhdCg1KX08QXR0cmlidXRlcyBOYW1lPVwiJHtkbC5uYW1lfVwiLz5gKTtcbiAgICBvdXQucHVzaChgJHtULnJlcGVhdCg0KX08L1J1bGU+YCk7XG4gIH1cbiAgb3V0LnB1c2goYCR7VC5yZXBlYXQoMyl9PC9EZWZhdWx0TG9naWM+YCk7XG4gIG91dC5wdXNoKGAke1QucmVwZWF0KDIpfTwvTGFiZWxJZGVudGlmaWVyPmApO1xuXG4gIG91dC5wdXNoKGAke1R9PC9HZW5lcmFsPmApO1xuICBvdXQucHVzaCgnPC9JRUZpbHRlcnM+Jyk7XG4gIHJldHVybiBvdXQuam9pbignXFxuJyk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVmFsaWRhdGlvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvblJlc3VsdCB7XG4gIHZhbGlkOiBib29sZWFuO1xuICBlcnJvcnM6IHN0cmluZ1tdO1xuICB3YXJuaW5nczogc3RyaW5nW107XG59XG5cbi8qKlxuICogVmFsaWRhdGUgdGhlIGdlbmVyYXRlZCBYTUwuIFVzZXMgRE9NUGFyc2VyIHdoZW4gYXZhaWxhYmxlIChicm93c2VyIHBvcHVwKSxcbiAqIGZhbGxzIGJhY2sgdG8gYSBzdHJ1Y3R1cmFsIHdlbGwtZm9ybWVkbmVzcyBjaGVjayAoTm9kZSB0ZXN0cykuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVhNTCh4bWw6IHN0cmluZyk6IFZhbGlkYXRpb25SZXN1bHQge1xuICBjb25zdCBlcnJvcnM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHdhcm5pbmdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8vIDEuIERPTVBhcnNlciBwYXRoIChicm93c2VyKS5cbiAgaWYgKHR5cGVvZiBET01QYXJzZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoeG1sLCAndGV4dC94bWwnKTtcbiAgICAgIGNvbnN0IHBlcnIgPSBkb2MucXVlcnlTZWxlY3RvcigncGFyc2VyZXJyb3InKTtcbiAgICAgIGlmIChwZXJyKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKHBlcnIudGV4dENvbnRlbnQgPyBwZXJyLnRleHRDb250ZW50LnRyaW0oKS5zbGljZSgwLCAzMDApIDogJ1hNTCBwYXJzZSBlcnJvcicpO1xuICAgICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIGVycm9ycywgd2FybmluZ3MgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgaWYgKCFyb290IHx8IHJvb3QudGFnTmFtZSAhPT0gJ0lFRmlsdGVycycpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goYFJvb3QgZWxlbWVudCBtdXN0IGJlIDxJRUZpbHRlcnM+LCBmb3VuZCA8JHtyb290ID8gcm9vdC50YWdOYW1lIDogJ25vbmUnfT4uYCk7XG4gICAgICB9XG4gICAgICBpZiAoIXJvb3QucXVlcnlTZWxlY3RvcignR2VuZXJhbCBSb2xlSWRlbnRpZmllcicpKSB3YXJuaW5ncy5wdXNoKCdNaXNzaW5nIDxHZW5lcmFsPjxSb2xlSWRlbnRpZmllcj4uJyk7XG4gICAgICBpZiAoIXJvb3QucXVlcnlTZWxlY3RvcignR2VuZXJhbCBMYWJlbElkZW50aWZpZXInKSkgd2FybmluZ3MucHVzaCgnTWlzc2luZyA8R2VuZXJhbD48TGFiZWxJZGVudGlmaWVyPi4nKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnJvcnMucHVzaChgWE1MIHBhcnNlIGZhaWxlZDogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsaWQ6IGVycm9ycy5sZW5ndGggPT09IDAsIGVycm9ycywgd2FybmluZ3MgfTtcbiAgfVxuXG4gIC8vIDIuIFN0cnVjdHVyYWwgZmFsbGJhY2sgKE5vZGUpLlxuICBjb25zdCBvcGVucyA9IHhtbC5tYXRjaCgvPFtBLVphLXpdW1xcdy1dKihcXHNbXj5dKik/Pi9nKSB8fCBbXTtcbiAgY29uc3QgY2xvc2VzID0geG1sLm1hdGNoKC88XFwvW0EtWmEtel1bXFx3LV0qPi9nKSB8fCBbXTtcbiAgaWYgKCF4bWwuc3RhcnRzV2l0aCgnPD94bWwnKSkgZXJyb3JzLnB1c2goJ01pc3NpbmcgWE1MIGRlY2xhcmF0aW9uLicpO1xuICBpZiAoIXhtbC5pbmNsdWRlcygnPElFRmlsdGVycycpKSBlcnJvcnMucHVzaCgnTWlzc2luZyA8SUVGaWx0ZXJzPiByb290LicpO1xuICBpZiAob3BlbnMubGVuZ3RoID09PSAwKSBlcnJvcnMucHVzaCgnTm8gZWxlbWVudHMgZm91bmQuJyk7XG4gIGlmICgoeG1sLm1hdGNoKC8mKD8hYW1wO3xsdDt8Z3Q7fHF1b3Q7fGFwb3M7fCNcXGQrOykvZykgfHwgW10pLmxlbmd0aCA+IDApIGVycm9ycy5wdXNoKCdVbmVzY2FwZWQgXCImXCIgZm91bmQuJyk7XG4gIHJldHVybiB7IHZhbGlkOiBlcnJvcnMubGVuZ3RoID09PSAwLCBlcnJvcnMsIHdhcm5pbmdzIH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQm9udXMgZmVhdHVyZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKiogR2VuZXJhdGUgc2FtcGxlIEdQUyAoR2xvYmFsIFBvc2l0aW9uaW5nKSBtYXBwaW5ncyBmb3IgdGhlIGRldGVjdGVkIGNvbnRyb2xzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlR3BzTWFwcGluZ3MoY29udHJvbHM6IERldGVjdGVkQ29udHJvbFtdKTogc3RyaW5nIHtcbiAgY29uc3Qgb3V0OiBzdHJpbmdbXSA9IFtdO1xuICBvdXQucHVzaCgnPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwidXRmLThcIj8+Jyk7XG4gIG91dC5wdXNoKCc8IS0tIFNhbXBsZSBHUFMgbWFwcGluZ3MgZ2VuZXJhdGVkIGJ5ICcgKyBFWFRFTlNJT05fTkFNRSArICcgXHUyMDE0IGltcG9ydCBpbnRvIEVwaXBsZXggQ2FwdHVyZSAtLT4nKTtcbiAgb3V0LnB1c2goJzxHUFNNYXBwaW5ncz4nKTtcbiAgZm9yIChjb25zdCBjIG9mIGNvbnRyb2xzLnNsaWNlKDAsIDIwMCkpIHtcbiAgICAvLyBIdW1hbi1yZWFkYWJsZSBuYW1lIFx1MjAxNCBuZXZlciBhIENTUyBjbGFzcyAoc2VlIHN0ZXBTZW50ZW5jZS50cykuXG4gICAgY29uc3QgYmFzZSA9IGNvbXB1dGVDb250cm9sTmFtZShjKTtcbiAgICBjb25zdCBuYW1lID0gKGJhc2UgPT09ICdlbGVtZW50JyA/IChjLmF0dHJpYnV0ZXMuaWQgfHwgYy5hdHRyaWJ1dGVzLm5hbWUgfHwgYmFzZSkgOiBiYXNlKS5zbGljZSgwLCA2MCk7XG4gICAgb3V0LnB1c2goXG4gICAgICBgJHtUfTxNYXBwaW5nIENvbnRyb2xOYW1lPVwiJHtlc2NhcGVYbWwobmFtZSl9XCIgUm9sZT1cIiR7Yy5yb2xlfVwiIFRhZz1cIiR7ZXNjYXBlWG1sKGMuYXR0cmlidXRlcy50YWdOYW1lLnRvVXBwZXJDYXNlKCkpfVwiIFNlbGVjdG9yPVwiJHtlc2NhcGVYbWwoYy5sb2NhdGlvbi5jc3NTZWxlY3Rvcil9XCIgWFBhdGg9XCIke2VzY2FwZVhtbChjLmxvY2F0aW9uLnhwYXRoKX1cIi8+YFxuICAgICk7XG4gIH1cbiAgb3V0LnB1c2goJzwvR1BTTWFwcGluZ3M+Jyk7XG4gIHJldHVybiBvdXQuam9pbignXFxuJyk7XG59XG5cbi8qKiBHZW5lcmF0ZSBhIHRlc3QtY2FzZSBzbmlwcGV0IChKU0RPTS1zdHlsZSBhc3NlcnRpb25zKSBmb3IgZXZlcnkgcnVsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVRlc3RDYXNlcyhtb2RlbDogUnVsZU1vZGVsKTogc3RyaW5nIHtcbiAgY29uc3Qgb3V0OiBzdHJpbmdbXSA9IFtdO1xuICBvdXQucHVzaCgnLy8gQXV0by1nZW5lcmF0ZWQgdGVzdCBjYXNlcyBmb3IgdGhlIEVwaXBsZXggSUUgUnVsZXMgR2VuZXJhdG9yJyk7XG4gIG91dC5wdXNoKCcvLyBSdW4gd2l0aDogbm9kZSAtLXRlc3QgKHVzZXMganNkb20pLiBPbmUgdGVzdCBwZXIgZ2VuZXJhdGVkIHJ1bGUuJyk7XG4gIG91dC5wdXNoKCdpbXBvcnQgeyBKU0RPTSB9IGZyb20gXCJqc2RvbVwiOycpO1xuICBvdXQucHVzaCgnaW1wb3J0IHsgZGV0ZWN0Q29udHJvbFJvbGUgfSBmcm9tIFwiLi4vc3JjL3J1bGVFbmdpbmVcIjsnKTtcbiAgb3V0LnB1c2goJycpO1xuICBvdXQucHVzaCgnZnVuY3Rpb24gbWFrZUVsKHRhZywgYXR0cnMgPSB7fSkgeycpO1xuICBvdXQucHVzaCgnICBjb25zdCB7IHdpbmRvdyB9ID0gbmV3IEpTRE9NKGA8JHt0YWd9PjwvJHt0YWd9PmApOycpO1xuICBvdXQucHVzaCgnICBjb25zdCBlbCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Jyk7XG4gIG91dC5wdXNoKCcgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKGF0dHJzKSkgZWwuc2V0QXR0cmlidXRlKGssIHYpOycpO1xuICBvdXQucHVzaCgnICByZXR1cm4gZWw7Jyk7XG4gIG91dC5wdXNoKCd9Jyk7XG4gIG91dC5wdXNoKCcnKTtcbiAgb3V0LnB1c2goJ2V4cG9ydCBjb25zdCBjYXNlcyA9IFsnKTtcbiAgZm9yIChjb25zdCBydWxlIG9mIG1vZGVsLmJhc2VkT25UYWdzKSB7XG4gICAgZm9yIChjb25zdCBjb25kIG9mIHJ1bGUuY29uZGl0aW9ucykge1xuICAgICAgY29uc3QgdGFncyA9IGNvbmQudGFnTmFtZS5yZXBsYWNlKC9cXHwvZywgJycpLnNwbGl0KCd8JylbMF0gfHwgJ2Rpdic7XG4gICAgICBjb25zdCB0eXBlcyA9IGNvbmQudHlwZSA/IGNvbmQudHlwZS5yZXBsYWNlKC9cXHwvZywgJycpLnNwbGl0KCd8Jykuc2xpY2UoMCwgMSlbMF0gOiBudWxsO1xuICAgICAgY29uc3QgYXR0cnMgPSB0eXBlcyA/IGB7IHR5cGU6IFwiJHt0eXBlc31cIiB9YCA6ICd7fSc7XG4gICAgICBvdXQucHVzaChgICB7IG5hbWU6IFwiVGFnIHJ1bGUgXHUyMTkyIHJvbGUgJHtydWxlLmN1cnJlbnRSb2xlfSBvbiA8JHt0YWdzfT4ke3R5cGVzID8gYCB0eXBlPSR7dHlwZXN9YCA6ICcnfVwiLCB0YWc6IFwiJHt0YWdzfVwiLCBhdHRyczogJHthdHRyc30sIGV4cGVjdDogJHtydWxlLmN1cnJlbnRSb2xlfSB9LGApO1xuICAgIH1cbiAgfVxuICBvdXQucHVzaCgnXTsnKTtcbiAgb3V0LnB1c2goJycpO1xuICBvdXQucHVzaCgnZXhwb3J0IGZ1bmN0aW9uIHJ1bkNhc2UoYykgeycpO1xuICBvdXQucHVzaCgnICBjb25zdCBlbCA9IG1ha2VFbChjLnRhZywgYy5hdHRycyk7Jyk7XG4gIG91dC5wdXNoKCcgIGNvbnN0IGRldCA9IGRldGVjdENvbnRyb2xSb2xlKGVsLCB7IGZyYW1ld29ya1JvbGVNYXBwaW5nczogW10sIGF0dHJpYnV0ZVJvbGVNYXBwaW5nczogW10sIHRhZ1JvbGVzOiB7fSwgaW5wdXRUeXBlUm9sZXM6IHsgdGV4dDogNDIgfSB9KTsnKTtcbiAgb3V0LnB1c2goJyAgcmV0dXJuIGRldC5yb2xlID09PSBjLmV4cGVjdCA/IFwiUEFTU1wiIDogYEZBSUwgZXhwZWN0ZWQgJHtjLmV4cGVjdH0gZ290ICR7ZGV0LnJvbGV9YDsnKTtcbiAgb3V0LnB1c2goJ30nKTtcbiAgcmV0dXJuIG91dC5qb2luKCdcXG4nKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQ0UsVUFBWTtBQUFBLE1BQ1osb0JBQXNCO0FBQUEsUUFDcEIsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFB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LE9BQU8sVUFBVTtBQUFBLEVBQzFELElBQUksRUFBRSxJQUFJLElBQUksTUFBTSxTQUFxQixPQUFPLFVBQVU7QUFBQSxFQUMxRCxJQUFJLEVBQUUsSUFBSSxJQUFJLE1BQU0sYUFBcUIsT0FBTyxVQUFVO0FBQUEsRUFDMUQsSUFBSSxFQUFFLElBQUksSUFBSSxNQUFNLGNBQXFCLE9BQU8sVUFBVTtBQUFBLEVBQzFELElBQUksRUFBRSxJQUFJLElBQUksTUFBTSxRQUFxQixPQUFPLFVBQVU7QUFBQSxFQUMxRCxJQUFJLEVBQUUsSUFBSSxJQUFJLE1BQU0sc0JBQXFCLE9BQU8sVUFBVTtBQUFBLEVBQzFELElBQUksRUFBRSxJQUFJLElBQUksTUFBTSxPQUFxQixPQUFPLFVBQVU7QUFBQSxFQUMxRCxJQUFJLEVBQUUsSUFBSSxJQUFJLE1BQU0sU0FBcUIsT0FBTyxVQUFVO0FBQUEsRUFDMUQsSUFBSSxFQUFFLElBQUksSUFBSSxNQUFNLFFBQXFCLE9BQU8sVUFBVTtBQUFBLEVBQzFELElBQUksRUFBRSxJQUFJLElBQUksTUFBTSxZQUFxQixPQUFPLFVBQVU7QUFBQSxFQUMxRCxJQUFJLEVBQUUsSUFBSSxJQUFJLE1BQU0sVUFBcUIsT0FBTyxVQUFVO0FBQUEsRUFDMUQsSUFBSSxFQUFFLElBQUksSUFBSSxNQUFNLFlBQXFCLE9BQU8sVUFBVTtBQUFBLEVBQzFELElBQUksRUFBRSxJQUFJLElBQUksTUFBTSxnQkFBcUIsT0FBTyxVQUFVO0FBQUEsRUFDMUQsSUFBSSxFQUFFLElBQUksSUFBSSxNQUFNLFlBQXFCLE9BQU8sVUFBVTtBQUFBLEVBQzFELElBQUksRUFBRSxJQUFJLElBQUksTUFBTSxRQUFxQixPQUFPLFVBQVU7QUFBQSxFQUMxRCxJQUFJLEVBQUUsSUFBSSxJQUFJLE1BQU0sUUFBcUIsT0FBTyxVQUFVO0FBQUEsRUFDMUQsSUFBSSxFQUFFLElBQUksSUFBSSxNQUFNLGdCQUFxQixPQUFPLFVBQVU7QUFDNUQ7QUFFTyxJQUFNLFdBQVcsQ0FBQyxPQUN0QixNQUFNLEVBQUUsS0FBSyxNQUFNLEVB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USxDQUFDLENBQUM7QUFDcEosSUFBb0IsZUFBZSxFQUFFLGlCQUFpQixVQUFVLENBQUMsTUFBTSxlQUFlLEVBQUUsZ0JBQWlCLEVBQUUsT0FBNEIsUUFBUSxDQUFDLENBQUM7QUFDakosSUFBb0IsY0FBYyxFQUFFLGlCQUFpQixVQUFVLE9BQU8sTUFBTTtBQUMxRSxVQUFNLElBQUssRUFBRSxPQUE0QjtBQUN6QyxVQUFNLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0FBQzVDLFFBQUksS0FBSyxNQUFNLE1BQU8sT0FBTSxVQUFVLHFCQUFxQixFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQUEsRUFDOUUsQ0FBQztBQUVELElBQXFCLGlCQUFpQixFQUFFLGlCQUFpQixTQUFTLFlBQVk7QUFDNUUsVUFBTSxPQUFPLEVBQXVCLGFBQWEsRUFBRTtBQUNuRCxVQUFNLE1BQU0sb0JBQW9CLElBQUk7QUFDcEMsUUFBSSxLQUFLO0FBQUUsZ0JBQVUsaUJBQWlCLEtBQUssS0FBSztBQUFHO0FBQUEsSUFBUTtBQUMzRCxVQUFNLFNBQVMsS0FBSyxLQUFLLElBQUksS0FBSyxNQUFNLElBQUksSUFBSTtBQUNoRCxVQUFNLGVBQWUsRUFBRSxjQUFjLE9BQU8sQ0FBQztBQUM3QyxjQUFVLGlCQUFpQiwyREFBc0QsSUFBSTtBQUFBLEVBQ3ZGLENBQUM7QUFDRCxJQUFxQixtQkFBbUIsRUFBRSxpQkFBaUIsU0FBUyxZQUFZO0FBQzlFLFVBQU0sVUFBVSxNQUFNLFNBQVMsaUJBQWlCLE1BQU0sbUVBQXNCLG9CQUFvQixNQUFNLFFBQVE7QUFDOUcsVUFBTSxhQUFhLHFCQUFxQixLQUFLLFVBQVUsU0FBUyxNQUFNLENBQUMsR0FBRyxrQkFBa0I7QUFBQSxFQUM5RixDQUFDO0FBQ0QsSUFBcUIsa0JBQWtCLEVBQUUsaUJBQWlCLFNBQVMsWUFBWTtBQUM3RSxVQUFNLGVBQWUsRUFBRSxjQUFjLEtBQUssQ0FBQztBQUMzQyxNQUF1QixhQUFhLEVBQUUsUUFBUTtBQUM5QyxjQUFVLGlCQUFpQixzQkFBc0IsSUFBSTtBQUFBLEVBQ3ZELENBQUM7QUFHRCxTQUFPLFFBQVEsVUFBVSxZQUFZLENBQUMsUUFBbUQ7QUFDdkYsUUFBSSxLQUFLLFNBQVMseUJBQXlCLElBQUksU0FBUztBQUN0RCxZQUFNLE9BQU8sSUFBSTtBQUNqQix3QkFBa0I7QUFDbEIscUJBQWU7QUFDZixnQkFBVSxjQUFjLFNBQVMsSUFBSSxRQUFRLFNBQVMsTUFBTSxhQUFhLElBQUk7QUFBQSxJQUMvRTtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBTUEsZUFBZTtBQUNmLFdBQVc7QUFDWCxlQUFlO0FBQ2YsWUFBWTtBQUNaLFVBQVU7QUFHVixTQUFTLGNBQWMseUNBQXlDLEVBQUcsY0FDakUsK0JBQStCLGlCQUFpQjsiLAogICJuYW1lcyI6IFsiZmluZ2VycHJpbnQiLCAibGFiZWxUcmF2ZXJzYWxGaW5nZXJwcmludCIsICJmaW5nZXJwcmludCIsICJ0cmF2ZXJzYWxGaW5nZXJwcmludCJdCn0K
