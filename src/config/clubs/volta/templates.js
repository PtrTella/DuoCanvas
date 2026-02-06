import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
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
      highlightTeam: "La Volta"
    }
  }),

  // GENERIC
  customizeForClub(WeekRecap, {
    defaultTheme: 'gold',
    defaultData: {
      headerTitle: "VOLTA",
      headerValue: "WEEK",
      weekEvents: [
        { sport: 'Basket', homeTeam: 'La Volta', color: 'purple' }
      ]
    }
  })
]);
