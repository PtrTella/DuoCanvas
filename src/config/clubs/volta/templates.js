import { BasketResult, BasketLineup, BasketRanking } from '../../../templates/BasketTemplates';
import { WeekRecap } from '../../../templates/WeekRecap';
import { customizeForClub, buildTemplateRegistry } from '../../../utils/template-builder';

// 1. TEMPLATES REGISTRY
export const TEMPLATES = buildTemplateRegistry([
  customizeForClub(BasketResult, {
    defaultTheme: 'gold' 
  }),
  
  customizeForClub(BasketLineup, {
    defaultTheme: 'gold'
  }),

  customizeForClub(BasketRanking, {
    defaultTheme: 'gold',
    defaultData: {
      highlightTeam: "La Volta"
    }
  }),

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
