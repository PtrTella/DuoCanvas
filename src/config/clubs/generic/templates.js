// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = {
  basket_result: { 
    ...BasketResult,  
    defaultTheme: 'orange'
  },
  basket_roster: { 
    ...BasketLineup,  
    defaultTheme: 'orange'
  },
  basket_ranking: { 
    ...BasketRanking, 
    defaultTheme: 'orange',
    defaultData: {
      ...BasketRanking.defaultData,
      showAverages: true,
      showStats: true,
      rankingSync: {
        enabled: false,
        label: ""
      }
    }
  },
  soccer_result: { 
    ...SoccerResult,  
    defaultTheme: 'green'
  },
  soccer_roster: { 
    ...SoccerFormation, 
    defaultTheme: 'green'
  },
  soccer_ranking: { 
    ...SoccerRanking, 
    defaultTheme: 'green',
    defaultData: {
      ...SoccerRanking.defaultData,
      rankingSync: {
        enabled: false,
        label: ""
      }
    }
  },
  week_recap: { 
    ...WeekRecap,     
    defaultTheme: 'blue'
  }
};
