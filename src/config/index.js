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
const resolveActiveProfile = () => {
  if (typeof window === 'undefined') return PROFILES.generic;
  const params = new URLSearchParams(window.location.search);
  const clubKey = params.get('d') || params.get('domain') || params.get('p');
  return PROFILES[clubKey] || PROFILES.generic;
};

const active = resolveActiveProfile();

// 3. CORE EXPORTS
export const CLUB_INFO        = active.config.CLUB_INFO;
export const GLOBAL_DEFAULTS  = active.config.GLOBAL_DEFAULTS;
export const THEMES           = active.config.THEMES;
export const TEMPLATES        = active.templates.TEMPLATES;

// Helper: Array of templates for selectors/loops
export const TEMPLATES_LIST   = Object.values(active.templates.TEMPLATES);

// Initial state for all templates (ID -> defaultData)
export const TEMPLATE_DEFAULTS = Object.fromEntries(
  Object.entries(active.templates.TEMPLATES).map(([id, t]) => [id, t.defaultData || {}])
);
