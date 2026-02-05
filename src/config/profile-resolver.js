// 1. BASE FALLBACKS
import { BASE_BRANDING } from './clubs/base-branding';
import { BASE_TEMPLATE_DATA } from './clubs/base-template-data';

// 2. CLUB DEFINITIONS (Pure data, NO template imports here)
import * as DuoBranding from './clubs/duo/branding';
import * as DuoTemplates from './clubs/duo/templates';
import * as VoltaBranding from './clubs/volta/branding';
import * as VoltaTemplates from './clubs/volta/templates';

const CLUBS = {
  duo: { branding: DuoBranding.BRANDING, templates: DuoTemplates.TEMPLATES_CONFIG },
  volta: { branding: VoltaBranding.BRANDING, templates: VoltaTemplates.TEMPLATES_CONFIG }
};

const getActiveKey = () => {
  if (typeof window === 'undefined') return 'duo';
  const params = new URLSearchParams(window.location.search);
  const key = params.get('d') || params.get('domain') || params.get('p') || 'duo';
  return CLUBS[key] ? key : 'duo';
};

const activeKey = getActiveKey();
const club = CLUBS[activeKey];

/**
 * 🚀 ACTIVE_CONFIG (Data Only)
 * Resolved at runtime. Exported for csiUtils and hooks.
 */
export const ACTIVE_CONFIG = {
  branding: {
    ...BASE_BRANDING,
    ...club.branding,
    branding: { ...BASE_BRANDING.branding, ...club.branding.branding },
    globalDefaults: { ...BASE_BRANDING.globalDefaults, ...club.branding.globalDefaults },
    csiConfig: { ...BASE_BRANDING.csiConfig, ...club.branding.csiConfig },
    themeAssets: { ...BASE_BRANDING.themeAssets, ...club.branding.themeAssets }
  },
  templates: {
    activeIds: club.templates.activeTemplates || null,
    data: Object.keys(BASE_TEMPLATE_DATA).reduce((acc, key) => {
       acc[key] = {
         ...BASE_TEMPLATE_DATA[key],
         ...(club.templates.templateOverrides[key] || {})
       };
       return acc;
    }, {})
  }
};
