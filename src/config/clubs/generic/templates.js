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
      headerValue: "",
      leagueName: "",
      homeScore: "", awayScore: ""
    }
  },
  basket_roster: { 
    ...BasketLineup,  
    defaultTheme: 'orange',
    defaultData: {
      headerTitle: "GARA",
      headerValue: "",
      rosterList: "",
    }
  },
  basket_ranking: { 
    ...BasketRanking, 
    defaultTheme: 'orange',
    defaultData: {
      headerTitle: "CLASSIFICA",
      season: "",
      ranking: [],
      highlightTeam: "",
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
      season: "",
      ranking: [],
      highlightTeam: "",
      rankingSync: {
        enabled: false,
        label: ""
      }
    }
  },
  week_recap: { 
    ...WeekRecap,     
    defaultTheme: 'blue',
    defaultData: {
      headerTitle: "PROGRAMMA",
      headerValue: "",
      weekEvents: []
    }
  }
};
