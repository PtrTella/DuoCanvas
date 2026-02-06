// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = {
  basket_result: { 
    ...BasketResult,  
    defaultTheme: 'orange',
    defaultData: {
      ...BasketResult.defaultData,
      csiTeamId: 32,
      csiGironeId: "3"
    }
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
      highlightTeam: "Duo Ligones",
      csiGironeId: "3",
      rankingSync: {
        enabled: true,
        label: "CSI Faenza"
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
      highlightTeam: "Duo Ligones",
      rankingSync: {
        enabled: true,
        label: "CSI Faenza"
      }
    }
  },
  week_recap: { 
    ...WeekRecap,     
    defaultTheme: 'purple'
  }
};
