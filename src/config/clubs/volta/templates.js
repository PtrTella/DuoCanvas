import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { BASE_TEMPLATE_DATA } from '../generic/template-data';

export const TEMPLATES = [
  { ...BasketResult,  defaultData: { ...BASE_TEMPLATE_DATA.basket_result } },
  { ...BasketLineup,  defaultData: { ...BASE_TEMPLATE_DATA.basket_roster } },
  { 
    ...BasketRanking, 
    defaultData: { ...BASE_TEMPLATE_DATA.basket_ranking, highlightTeam: "La Volta" } 
  },
  { 
    ...WeekRecap, 
    defaultData: { 
      ...BASE_TEMPLATE_DATA.week_recap,
      headerValue: "VOLTA WEEK",
      weekEvents: [
        { sport: 'Basket', homeTeam: 'La Volta', color: 'orange' }
      ]
    } 
  }
];
