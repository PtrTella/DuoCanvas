import { THEMES as COLOR_THEMES, CONTROL_THEMES } from './constants';
import { ACTIVE_PROFILE } from './profile-resolver';

/**
 * 🚀 DuoCanvas - Final Registry for UI
 * Bridges resolved data with Template components.
 */

// 1. BRANDING & SESSION
export const BRANDING = {
  ...ACTIVE_PROFILE.branding?.branding,
  sponsors: ACTIVE_PROFILE.branding?.branding?.sponsors || []
};
export const GLOBAL_DEFAULTS = ACTIVE_PROFILE.branding?.globalDefaults || {};

// 2. THEMES REGISTRY
export const THEMES = Object.keys(COLOR_THEMES).reduce((acc, key) => {
  const clubThemeAssets = ACTIVE_PROFILE.branding?.themeAssets || {};
  acc[key] = { 
    ...COLOR_THEMES[key], 
    ...(clubThemeAssets[key] || {}) 
  };
  return acc;
}, {});

export { CONTROL_THEMES };

// 3. TEMPLATES REGISTRY
// The profile already provides the full template list with specific defaultData
export const TEMPLATES = ACTIVE_PROFILE.templates;

// Keep this for backward compatibility in App.jsx if needed, 
// though TEMPLATES already contains defaultData
export const TEMPLATE_DEFAULTS = ACTIVE_PROFILE.templates.reduce((acc, t) => {
  acc[t.id] = t.defaultData;
  return acc;
}, {});
