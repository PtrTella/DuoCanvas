// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { customizeForClub, buildTemplateRegistry } from '../../../utils/template-builder';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = buildTemplateRegistry([
  customizeForClub(BasketResult, {
    defaultTheme: 'orange'
  }),

  customizeForClub(BasketLineup, {
    defaultTheme: 'orange'
  }),

  customizeForClub(BasketRanking, {
    defaultTheme: 'orange',
    defaultData: {
      showAverages: true,
      showStats: true,
      rankingSync: {
        enabled: false,
        label: ""
      }
    }
  }),

  customizeForClub(SoccerResult, {
    defaultTheme: 'green'
  }),

  customizeForClub(SoccerFormation, {
    defaultTheme: 'green'
  }),

  customizeForClub(SoccerRanking, {
    defaultTheme: 'green',
    defaultData: {
      rankingSync: {
        enabled: false,
        label: ""
      }
    }
  }),

  customizeForClub(WeekRecap, {
    defaultTheme: 'blue'
  })
]);
