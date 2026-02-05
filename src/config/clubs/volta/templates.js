import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { TEMPLATE_DATA } from './config';

export const TEMPLATES = [
  { ...BasketResult,  defaultData: TEMPLATE_DATA.basket_result.defaultData, defaultTheme: TEMPLATE_DATA.basket_result.defaultTheme },
  { ...BasketLineup,  defaultData: TEMPLATE_DATA.basket_roster.defaultData, defaultTheme: TEMPLATE_DATA.basket_roster.defaultTheme },
  { ...BasketRanking, defaultData: TEMPLATE_DATA.basket_ranking.defaultData, defaultTheme: TEMPLATE_DATA.basket_ranking.defaultTheme },
  { ...WeekRecap,     defaultData: TEMPLATE_DATA.week_recap.defaultData, defaultTheme: TEMPLATE_DATA.week_recap.defaultTheme }
];
