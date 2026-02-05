// 1. IMPORT ALL CLUB BLUEPRINTS
import * as GenericConfig from './clubs/generic/config';
import * as GenericTemplates from './clubs/generic/templates';

import * as DuoConfig from './clubs/duo/config';
import * as DuoTemplates from './clubs/duo/templates';

import * as VoltaConfig from './clubs/volta/config';
import * as VoltaTemplates from './clubs/volta/templates';

// 2. REGISTRY OF CLUBS
const CLUBS = {
  duo: { 
    branding: DuoConfig.BRANDING, 
    templates: DuoTemplates.TEMPLATES 
  },
  volta: { 
    branding: VoltaConfig.BRANDING, 
    templates: VoltaTemplates.TEMPLATES 
  }
};

const getActiveKey = () => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const key = params.get('d') || params.get('domain') || params.get('p');
  return key;
};

const activeKey = getActiveKey();

/**
 * 🚀 RESOLVED PROFILE
 * If no key matches, use the Generic blueprint.
 */
export const ACTIVE_PROFILE = CLUBS[activeKey] || {
  branding: GenericConfig.BRANDING,
  templates: GenericTemplates.TEMPLATES
};
