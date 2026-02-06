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

// 3. EXPORTS FOR APP
export const { CLUB_INFO, GLOBAL_DEFAULTS, THEMES } = active.config;

const REGISTRY = active.templates.TEMPLATES || { map: {}, list: [], defaults: {} };

export const TEMPLATES         = REGISTRY.map;
export const TEMPLATES_LIST    = REGISTRY.list;
export const TEMPLATE_DEFAULTS = REGISTRY.defaults;
