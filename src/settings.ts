/**
 * settings.ts — User settings + configurable role mappings.
 *
 * Defaults come from roleMappings.json (bundled). Users can import an
 * override JSON from the Settings tab; it is merged (arrays are replaced,
 * objects are shallow-merged) and persisted in chrome.storage.local.
 */
import defaultMappings from './roleMappings.json';
import type { RoleMappingConfig } from './types';

export interface ExtensionSettings {
  /** Framework detection toggle (per framework key). */
  enabledFrameworks: Record<string, boolean>;
  /** Highlighting options for visual inspection. */
  highlightEnabled: boolean;
  /** Include low-confidence (< 60) rules in the generated XML. */
  includeLowConfidence: boolean;
  /** Minimum confidence for a rule to be emitted (0–100). */
  minConfidence: number;
  /** Emit traversal rules even when a plain tag rule already covers the control. */
  emitTraversalRules: boolean;
  /** Emit label TraverseLogic rules for controls without a direct label. */
  emitLabelRules: boolean;
  /** Role mapping overrides (replaces bundled config when imported). */
  roleMappings: RoleMappingConfig | null;
  /** Controls to scan by default: all tags vs. interactive only. */
  scanAllTags: boolean;
}

export const DEFAULT_SETTINGS: ExtensionSettings = {
  enabledFrameworks: {
    'Angular Material': true,
    'React': true,
    'Vue': true,
    'Salesforce Lightning': true,
    'PowerApps': true,
    'SAP UI5': true,
    'Select2': true,
    'Bootstrap': true,
    'PrimeNG': true,
  },
  highlightEnabled: true,
  includeLowConfidence: true,
  minConfidence: 55,
  emitTraversalRules: true,
  emitLabelRules: true,
  roleMappings: null,
  scanAllTags: true,
};

/** Resolved mapping config: overrides if present, else the bundled defaults. */
export function resolveRoleMappings(settings: ExtensionSettings): RoleMappingConfig {
  if (settings.roleMappings) return settings.roleMappings;
  return defaultMappings as unknown as RoleMappingConfig;
}

const STORAGE_KEY = 'epiplexIeSettings';

export async function loadSettings(): Promise<ExtensionSettings> {
  try {
    const raw = await chrome.storage.local.get(STORAGE_KEY);
    if (raw && raw[STORAGE_KEY]) {
      return { ...DEFAULT_SETTINGS, ...raw[STORAGE_KEY] };
    }
  } catch {
    // storage unavailable (unit tests / file:// pages) — fall back to defaults.
  }
  return { ...DEFAULT_SETTINGS };
}

export async function saveSettings(settings: ExtensionSettings): Promise<void> {
  try {
    await chrome.storage.local.set({ [STORAGE_KEY]: settings });
  } catch {
    // ignore — non-persistent fallback (popup keeps state in memory).
  }
}

/** Validate a user-supplied role-mapping JSON. Returns error string or null. */
export function validateMappingJson(text: string): string | null {
  try {
    const parsed = JSON.parse(text) as RoleMappingConfig;
    if (!parsed || typeof parsed !== 'object') return 'JSON must be an object.';
    const arrs = ['frameworkRoleMappings', 'attributeRoleMappings'];
    for (const key of arrs) {
      if (parsed[key as keyof RoleMappingConfig] !== undefined &&
          !Array.isArray(parsed[key as keyof RoleMappingConfig])) {
        return `"${key}" must be an array.`;
      }
    }
    return null;
  } catch (e) {
    return `Invalid JSON: ${(e as Error).message}`;
  }
}
