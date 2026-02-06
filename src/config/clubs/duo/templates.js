// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { customizeForClub, buildTemplateRegistry } from '../../../utils/template-builder';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = buildTemplateRegistry([
  // --- BASKET ---
  customizeForClub(BasketResult, {
    defaultTheme: 'orange',
    defaultData: {
      csiTeamId: 32,
      csiGironeId: "3"
    }
  }),
  
  customizeForClub(BasketLineup, {
    defaultTheme: 'orange'
  }),

  customizeForClub(BasketRanking, {
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
      highlightTeam: "Duo Ligones",
      rankingSync: {
        enabled: false,
        label: "CSI Faenza"
      }
    }
  }),

  // --- GENERIC ---
  customizeForClub(WeekRecap, {
    defaultTheme: 'purple'
  })
]);
