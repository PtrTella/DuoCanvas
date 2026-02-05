import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { BASE_TEMPLATE_DATA } from '../generic/template-data';

export const TEMPLATES = [
  { ...BasketResult,  defaultData: { ...BASE_TEMPLATE_DATA.basket_result, csiTeamId: 32, csiGironeId: "3" } },
  { ...BasketLineup,  defaultData: { ...BASE_TEMPLATE_DATA.basket_roster } },
  { 
    ...BasketRanking, 
    defaultData: { ...BASE_TEMPLATE_DATA.basket_ranking, highlightTeam: "Duo Ligones", csiGironeId: "3" } 
  },
  { ...SoccerResult,  defaultData: { ...BASE_TEMPLATE_DATA.soccer_result } },
  { ...SoccerFormation, defaultData: { ...BASE_TEMPLATE_DATA.soccer_roster } },
  { 
    ...SoccerRanking, 
    defaultData: { ...BASE_TEMPLATE_DATA.soccer_ranking, highlightTeam: "Duo Ligones" } 
  },
  { ...WeekRecap,     defaultData: { ...BASE_TEMPLATE_DATA.week_recap } }
];
