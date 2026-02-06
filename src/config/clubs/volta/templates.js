import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { customizeForClub } from '../../../utils/template-builder';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = {
  basket_result: customizeForClub(BasketResult, {
    defaultTheme: 'gold' 
  }),
  
  basket_roster: customizeForClub(BasketLineup, {
    defaultTheme: 'gold'
  }),

  basket_ranking: customizeForClub(BasketRanking, {
    defaultTheme: 'gold',
    defaultData: {
      highlightTeam: "La Volta"
    }
  }),

  week_recap: customizeForClub(WeekRecap, {
    defaultTheme: 'gold',
    defaultData: {
      headerTitle: "VOLTA",
      headerValue: "WEEK",
      weekEvents: [
        { sport: 'Basket', homeTeam: 'La Volta', color: 'purple' }
      ]
    }
  })
};
