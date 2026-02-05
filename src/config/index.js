import { THEMES as COLOR_THEMES, CONTROL_THEMES } from './constants';
import { ACTIVE_CONFIG } from './profile-resolver';
import { MASTER_REGISTRY } from './clubs/master-registry';

/**
 * 🚀 DuoCanvas - Final Registry for UI
 * Bridges resolved data with Template components.
 */

// 1. BRANDING & SESSION
export const BRANDING = ACTIVE_CONFIG.branding.branding;
export const GLOBAL_DEFAULTS = ACTIVE_CONFIG.branding.globalDefaults;
export const CSI_CONFIG = ACTIVE_CONFIG.branding.csiConfig;

// 2. THEMES REGISTRY
export const THEMES = Object.keys(COLOR_THEMES).reduce((acc, key) => {
  acc[key] = { 
    ...COLOR_THEMES[key], 
    ...(ACTIVE_CONFIG.branding.themeAssets[key] || {}) 
  };
  return acc;
}, {});

export { CONTROL_THEMES };

// 3. TEMPLATES REGISTRY
export const TEMPLATES = Object.keys(MASTER_REGISTRY)
  .filter(id => !ACTIVE_CONFIG.templates.activeIds || ACTIVE_CONFIG.templates.activeIds.includes(id))
  .map(id => {
    const template = MASTER_REGISTRY[id];
    return {
      ...template,
      defaultData: ACTIVE_CONFIG.templates.data[id] || {}
    };
  });

export const TEMPLATE_DEFAULTS = ACTIVE_CONFIG.templates.data;
