// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';

// Import base data
import { BASE_TEMPLATE_DATA } from './template-data';

/**
 * 📄 Generic/Default Templates Configuration
 * Copy and modify this file for specific clubs to choose which templates
 * to show and with what specific default data.
 */
export const TEMPLATES = [
  { ...BasketResult,  defaultData: BASE_TEMPLATE_DATA.basket_result },
  { ...BasketLineup,  defaultData: BASE_TEMPLATE_DATA.basket_roster },
  { ...BasketRanking, defaultData: BASE_TEMPLATE_DATA.basket_ranking },
  { ...SoccerResult,  defaultData: BASE_TEMPLATE_DATA.soccer_result },
  { ...SoccerFormation, defaultData: BASE_TEMPLATE_DATA.soccer_roster },
  { ...SoccerRanking, defaultData: BASE_TEMPLATE_DATA.soccer_ranking },
  { ...WeekRecap,     defaultData: BASE_TEMPLATE_DATA.week_recap }
];
