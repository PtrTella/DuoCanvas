// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';

// Import config
import { TEMPLATE_DATA } from './config';

/**
 * 📄 Generic/Default Templates Configuration
 * Copy and modify this file for specific clubs to choose which templates
 * to show and with what specific default data.
 */
export const TEMPLATES = [
  { ...BasketResult,  defaultData: TEMPLATE_DATA.basket_result.defaultData, defaultTheme: TEMPLATE_DATA.basket_result.defaultTheme },
  { ...BasketLineup,  defaultData: TEMPLATE_DATA.basket_roster.defaultData, defaultTheme: TEMPLATE_DATA.basket_roster.defaultTheme },
  { ...BasketRanking, defaultData: TEMPLATE_DATA.basket_ranking.defaultData, defaultTheme: TEMPLATE_DATA.basket_ranking.defaultTheme },
  { ...SoccerResult,  defaultData: TEMPLATE_DATA.soccer_result.defaultData, defaultTheme: TEMPLATE_DATA.soccer_result.defaultTheme },
  { ...SoccerFormation, defaultData: TEMPLATE_DATA.soccer_roster.defaultData, defaultTheme: TEMPLATE_DATA.soccer_roster.defaultTheme },
  { ...SoccerRanking, defaultData: TEMPLATE_DATA.soccer_ranking.defaultData, defaultTheme: TEMPLATE_DATA.soccer_ranking.defaultTheme },
  { ...WeekRecap,     defaultData: TEMPLATE_DATA.week_recap.defaultData, defaultTheme: TEMPLATE_DATA.week_recap.defaultTheme }
];
