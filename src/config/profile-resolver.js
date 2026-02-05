// 1. IMPORT ALL CLUB BLUEPRINTS
import * as GenericBranding from './clubs/generic/branding';
import * as GenericTemplates from './clubs/generic/templates';

import * as DuoBranding from './clubs/duo/branding';
import * as DuoTemplates from './clubs/duo/templates';

import * as VoltaBranding from './clubs/volta/branding';
import * as VoltaTemplates from './clubs/volta/templates';

// 2. REGISTRY OF CLUBS
const CLUBS = {
  duo: { 
    branding: DuoBranding.BRANDING, 
    templates: DuoTemplates.TEMPLATES 
  },
  volta: { 
    branding: VoltaBranding.BRANDING, 
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
  branding: GenericBranding.BRANDING,
  templates: GenericTemplates.TEMPLATES
};
