import { ACTIVE_PROFILE } from './profile-resolver';

/**
 * 🚀 DuoCanvas - Final Registry for UI
 * Bridges resolved data with Template components.
 */
const { config, templates } = ACTIVE_PROFILE;

// 1. BRANDING & SESSION
export const BRANDING = { ...config.CLUB_INFO, rankingSync: config.RANKING_SYNC };
export const GLOBAL_DEFAULTS = config.GLOBAL_DEFAULTS;
export const TEMPLATES = templates;

// 2. THEME REGISTRY
export const THEMES = config.THEMES;

// 3. TEMPLATE DEFAULTS MAP
export const TEMPLATE_DEFAULTS = Object.fromEntries(
  templates.map(t => [t.id, t.defaultData || {}])
);
