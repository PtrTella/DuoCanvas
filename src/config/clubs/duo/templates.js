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
      headerTitle: "GIORNATA",
      csiTeamId: 32,
      csiGironeId: "3",
      homeScore: "", awayScore: ""
    }
  },
  basket_roster: { 
    ...BasketLineup,  
    defaultTheme: 'orange',
    defaultData: {
      headerTitle: "GARA",
      rosterList: ""
    }
  },
  basket_ranking: { 
    ...BasketRanking, 
    defaultTheme: 'orange',
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "Duo Ligones",
      csiGironeId: "3",
      ranking: [],
      rankingSync: {
        enabled: true,
        label: "CSI Faenza"
      }
    }
  },
  soccer_result: { 
    ...SoccerResult,  
    defaultTheme: 'green',
    defaultData: {
      headerTitle: "GIORNATA",
      homeScore: "", awayScore: ""
    }
  },
  soccer_roster: { 
    ...SoccerFormation, 
    defaultTheme: 'green',
    defaultData: {
      headerTitle: "GIORNATA",
      module: "",
      rosterList: ""
    }
  },
  soccer_ranking: { 
    ...SoccerRanking, 
    defaultTheme: 'green',
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "Duo Ligones",
      ranking: [],
      rankingSync: {
        enabled: true,
        label: "CSI Faenza"
      }
    }
  },
  week_recap: { 
    ...WeekRecap,     
    defaultTheme: 'purple',
    defaultData: {
      headerTitle: "PROGRAMMA",
      weekEvents: []
    }
  }
};
