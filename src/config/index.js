import { THEMES as COLOR_THEMES } from './constants';
import { ACTIVE_PROFILE } from './profile-resolver';

/**
 * 🚀 DuoCanvas - Final Registry for UI
 * Bridges resolved data with Template components.
 */

// 1. BRANDING (Identity, Sponsors, Sync)
export const BRANDING = {
  ...ACTIVE_PROFILE.clubInfo,
  rankingSync: ACTIVE_PROFILE.rankingSync
};

// 2. SESSION DEFAULTS (Teams, Arena, etc.)
export const GLOBAL_DEFAULTS = ACTIVE_PROFILE.globalDefaults;

// 3. THEME REGISTRY (Dynamic Backgrounds)
export const THEMES = Object.keys(COLOR_THEMES).reduce((acc, key) => {
  const clubThemeAssets = ACTIVE_PROFILE.themeAssets || {};
  acc[key] = { 
    ...COLOR_THEMES[key], 
    ...(clubThemeAssets[key] || {}) 
  };
  return acc;
}, {});

// 4. TEMPLATES REGISTRY
export const TEMPLATES = ACTIVE_PROFILE.templates;

// Helper: map template defaults for state initialization
export const TEMPLATE_DEFAULTS = ACTIVE_PROFILE.templates.reduce((acc, t) => {
  acc[t.id] = t.defaultData;
  return acc;
}, {});
