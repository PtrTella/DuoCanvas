// 1. IMPORT ALL CLUB BLUEPRINTS
import * as GenericConfig from './clubs/generic/config';
import * as GenericTemplates from './clubs/generic/templates';

import * as DuoConfig from './clubs/duo/config';
import * as DuoTemplates from './clubs/duo/templates';

import * as VoltaConfig from './clubs/volta/config';
import * as VoltaTemplates from './clubs/volta/templates';

// 2. REGISTRY OF CLUBS
const CLUBS = {
  duo: { config: DuoConfig, templates: DuoTemplates.TEMPLATES },
  volta: { config: VoltaConfig, templates: VoltaTemplates.TEMPLATES }
};

/**
 * 🚀 RESOLVED PROFILE
 * Extracts the active key from URL and returns the club config + templates.
 */
const getProfile = () => {
  if (typeof window === 'undefined') return { config: GenericConfig, templates: GenericTemplates.TEMPLATES };
  
  const params = new URLSearchParams(window.location.search);
  const key = params.get('d') || params.get('domain') || params.get('p');
  
  return CLUBS[key] || { config: GenericConfig, templates: GenericTemplates.TEMPLATES };
};

export const ACTIVE_PROFILE = getProfile();
