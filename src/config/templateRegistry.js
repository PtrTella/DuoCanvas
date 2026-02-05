import { BasketResult, BasketLineup, BasketRanking } from '../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../templates/SoccerTemplates';
import { WeekRecap } from '../templates/WeekRecap';

import { THEMES as COLOR_THEMES, CONTROL_THEMES } from './constants';
import { THEME_ASSETS } from './defaults';

// Merge color configuration with asset defaults
export const THEMES = Object.keys(COLOR_THEMES).reduce((acc, key) => {
  acc[key] = { 
    ...COLOR_THEMES[key], 
    ...(THEME_ASSETS[key] || {}) 
  };
  return acc;
}, {});

export { CONTROL_THEMES };

export const TEMPLATES = [
  BasketResult,
  BasketLineup,
  BasketRanking,
  SoccerResult,
  SoccerFormation,
  SoccerRanking,
  WeekRecap
];
