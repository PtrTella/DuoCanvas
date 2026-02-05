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
    clubInfo: DuoConfig.CLUB_INFO,
    globalDefaults: DuoConfig.GLOBAL_DEFAULTS,
    colorThemes: DuoConfig.COLOR_THEMES,
    themeAssets: DuoConfig.THEME_ASSETS,
    rankingSync: DuoConfig.RANKING_SYNC,
    templates: DuoTemplates.TEMPLATES 
  },
  volta: { 
    clubInfo: VoltaConfig.CLUB_INFO,
    globalDefaults: VoltaConfig.GLOBAL_DEFAULTS,
    colorThemes: VoltaConfig.COLOR_THEMES,
    themeAssets: VoltaConfig.THEME_ASSETS,
    rankingSync: VoltaConfig.RANKING_SYNC,
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
  clubInfo: GenericConfig.CLUB_INFO,
  globalDefaults: GenericConfig.GLOBAL_DEFAULTS,
  colorThemes: GenericConfig.COLOR_THEMES,
  themeAssets: GenericConfig.THEME_ASSETS,
  rankingSync: GenericConfig.RANKING_SYNC,
  templates: GenericTemplates.TEMPLATES
};
