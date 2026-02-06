// Import base templates from the library
import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { SoccerResult, SoccerFormation, SoccerRanking } from '../../../templates/SoccerTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { customizeForClub, buildTemplateRegistry, configureClubTemplate } from '../../../utils/template-builder';
import { SPORT_DEFAULTS } from './config';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = buildTemplateRegistry([
  
  // BASKET
  configureClubTemplate(BasketResult, SPORT_DEFAULTS.basket, {
    defaultData: { headerTitle: "MATCH DAY" }
  }),

  configureClubTemplate(BasketLineup, SPORT_DEFAULTS.basket, {
    defaultData: { headerTitle: "GARA" }
  }),

  configureClubTemplate(BasketRanking, SPORT_DEFAULTS.basket, {
    defaultData: {
      headerTitle: "CLASSIFICA",
      showAverages: true,
      showStats: true
    }
  }),

  // SOCCER
  configureClubTemplate(SoccerResult, SPORT_DEFAULTS.soccer, {
    defaultData: { headerTitle: "MATCH DAY" }
  }),

  configureClubTemplate(SoccerFormation, SPORT_DEFAULTS.soccer, {
    defaultData: { headerTitle: "GARA", module: "3-2-1" }
  }),

  configureClubTemplate(SoccerRanking, SPORT_DEFAULTS.soccer, {
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "Squadra Casa",
      rankingSync: { enabled: false, label: "" }
    }
  }),

  // GENERIC
  customizeForClub(WeekRecap, {
    defaultTheme: 'blue'
  })
]);
