// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { customizeForClub, buildTemplateRegistry } from '../../../utils/template-builder';
import { useCsiRanking } from './hooks/useCsiRanking';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = buildTemplateRegistry([
  // --- BASKET ---
  customizeForClub(BasketResult, {
    defaultTheme: 'orange'
  }),
  
  customizeForClub(BasketLineup, {
    defaultTheme: 'orange'
  }),

  customizeForClub(BasketRanking, {
    defaultTheme: 'orange',
    defaultData: {
      highlightTeam: "Duo Ligones",
      rankingSync: useCsiRanking
    }
  }),

  // --- SOCCER ---
  customizeForClub(SoccerResult, {
    defaultTheme: 'green'
  }),

  customizeForClub(SoccerFormation, {
    defaultTheme: 'green'
  }),

  customizeForClub(SoccerRanking, {
    defaultTheme: 'green',
    defaultData: {
      highlightTeam: "Duo Ligones"
    }
  }),

  // --- GENERIC ---
  customizeForClub(WeekRecap, {
    defaultTheme: 'purple'
  })
]);
