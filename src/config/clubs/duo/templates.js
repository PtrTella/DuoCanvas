// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { customizeForClub, buildTemplateRegistry } from '../../../utils/template-builder';
import { useCsiRanking } from './hooks/useCsiRanking';
import { SPORT_DEFAULTS } from './config';

// --- LEVEL 2: TEMPLATE REGISTRY (Specific Customization) ---
export const TEMPLATES = buildTemplateRegistry([
  
  // BASKET
  customizeForClub(BasketResult, SPORT_DEFAULTS.basket, {
    defaultData: { headerTitle: "MATCH DAY" }
  }),
  
  customizeForClub(BasketLineup, SPORT_DEFAULTS.basket, {
    defaultData: { headerTitle: "GARA" }
  }),

  customizeForClub(BasketRanking, SPORT_DEFAULTS.basket, {
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "Duo Ligones",
      rankingSync: useCsiRanking
    }
  }),

  // SOCCER
  customizeForClub(SoccerResult, SPORT_DEFAULTS.soccer, {
    defaultData: { headerTitle: "MATCH DAY" }
  }),

  customizeForClub(SoccerFormation, SPORT_DEFAULTS.soccer, {
    defaultData: { 
      headerTitle: "GARA",
      module: "3-2-1" 
    }
  }),

  customizeForClub(SoccerRanking, SPORT_DEFAULTS.soccer, {
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "Duo Ligones"
    }
  }),

  // GENERIC
  customizeForClub(WeekRecap, {
    defaultTheme: 'purple'
  })
]);
