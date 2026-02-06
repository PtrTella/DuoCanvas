// 1. IMPORTS (Club Blueprints)
import * as GenericConfig from './clubs/generic/config';
import * as GenericTemplates from './clubs/generic/templates';
import * as DuoConfig from './clubs/duo/config';
import * as DuoTemplates from './clubs/duo/templates';
import * as VoltaConfig from './clubs/volta/config';
import * as VoltaTemplates from './clubs/volta/templates';

const PROFILES = {
  generic: { config: GenericConfig, templates: GenericTemplates },
  duo:     { config: DuoConfig,     templates: DuoTemplates },
  volta:   { config: VoltaConfig,   templates: VoltaTemplates }
};

// 2. PROFILE RESOLUTION
const getActiveProfile = () => {
  if (typeof window === 'undefined') return PROFILES.generic;
  const params = new URLSearchParams(window.location.search);
  const key = params.get('d') || params.get('domain') || params.get('p') || 'generic';
  return PROFILES[key] || PROFILES.generic;
};

const active = getActiveProfile();

// 3. EXPORTS
export const { CLUB_INFO, GLOBAL_DEFAULTS, THEMES, SPORT_DEFAULTS = {} } = active.config;
export const TEMPLATES = active.templates.TEMPLATES || {};

// Derived Helpers
export const TEMPLATES_LIST    = Object.values(TEMPLATES);
export const TEMPLATE_DEFAULTS = Object.fromEntries(
  TEMPLATES_LIST.map(t => [t.id, { ...t.defaultData }])
);
