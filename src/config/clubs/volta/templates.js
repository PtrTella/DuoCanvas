import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = {
  basket_result: { 
    ...BasketResult,  
    defaultTheme: 'gold', 
    defaultData: {
      headerTitle: "GIORNATA",
      homeScore: "", awayScore: ""
    } 
  },
  basket_roster: { 
    ...BasketLineup,  
    defaultTheme: 'gold',
    defaultData: {
      headerTitle: "GIORNATA",
      rosterList: ""
    }
  },
  basket_ranking: { 
    ...BasketRanking, 
    defaultTheme: 'gold',
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "La Volta",
      ranking: []
    }
  },
  week_recap: { 
    ...WeekRecap,     
    defaultTheme: 'gold',
    defaultData: {
      headerTitle: "VOLTA",
      headerValue: "WEEK",
      weekEvents: [
        { sport: 'Basket', homeTeam: 'La Volta', color: 'purple' }
      ]
    }
  }
};
