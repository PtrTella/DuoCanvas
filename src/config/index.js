// 1. PROFILE RESOLUTION
const getProfile = () => {
  if (typeof window === 'undefined') return 'generic';
  const params = new URLSearchParams(window.location.search);
  return params.get('d') || params.get('domain') || params.get('p') || 'generic';
};

const profile = getProfile();

// 2. DYNAMIC IMPORTS (handled by Vite/Bundler at compile time via standard imports)
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

const active = PROFILES[profile] || PROFILES.generic;

// 3. CORE EXPORTS
export const CLUB_INFO       = active.config.CLUB_INFO;
export const GLOBAL_DEFAULTS = active.config.GLOBAL_DEFAULTS;
export const THEMES          = active.templates.THEMES;
export const TEMPLATES       = active.templates.TEMPLATES;

// Map for initial template states (ID -> Default Data)
export const TEMPLATE_DEFAULTS = Object.fromEntries(
  active.templates.TEMPLATES.map(t => [t.id, t.defaultData || {}])
);
