import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = {
  basket_result: { 
    ...BasketResult,  
    defaultTheme: 'gold' 
  },
  basket_roster: { 
    ...BasketLineup,  
    defaultTheme: 'gold'
  },
  basket_ranking: { 
    ...BasketRanking, 
    defaultTheme: 'gold',
    defaultData: {
      ...BasketRanking.defaultData,
      highlightTeam: "La Volta"
    }
  },
  week_recap: { 
    ...WeekRecap,     
    defaultTheme: 'gold',
    defaultData: {
      ...WeekRecap.defaultData,
      headerTitle: "VOLTA",
      headerValue: "WEEK",
      weekEvents: [
        { sport: 'Basket', homeTeam: 'La Volta', color: 'purple' }
      ]
    }
  }
};
