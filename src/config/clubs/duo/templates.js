// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { customizeForClub } from '../../../utils/template-builder';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = {
  basket_result: customizeForClub(BasketResult, {
    defaultTheme: 'orange',
    defaultData: {
      csiTeamId: 32,
      csiGironeId: "3"
    }
  }),
  
  basket_roster: customizeForClub(BasketLineup, {
    defaultTheme: 'orange'
  }),

  basket_ranking: customizeForClub(BasketRanking, {
    defaultTheme: 'orange',
    defaultData: {
      highlightTeam: "Duo Ligones",
      csiGironeId: "3",
      rankingSync: {
        enabled: true,
        label: "CSI Faenza"
      }
    }
  }),

  soccer_result: customizeForClub(SoccerResult, {
    defaultTheme: 'green'
  }),

  soccer_roster: customizeForClub(SoccerFormation, {
    defaultTheme: 'green'
  }),

  soccer_ranking: customizeForClub(SoccerRanking, {
    defaultTheme: 'green',
    defaultData: {
      highlightTeam: "Duo Ligones",
      rankingSync: {
        enabled: true,
        label: "CSI Faenza"
      }
    }
  }),

  week_recap: customizeForClub(WeekRecap, {
    defaultTheme: 'purple'
  })
};
