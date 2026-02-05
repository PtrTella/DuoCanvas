export const TEMPLATES_CONFIG = {
  activeTemplates: [
    'basket_result',
    'basket_roster',
    'basket_ranking',
    'week_recap'
  ],
  templateOverrides: {
    basket_ranking: { highlightTeam: "La Volta" },
    week_recap: { 
      headerValue: "VOLTA WEEK",
      weekEvents: [
        { sport: 'Basket', homeTeam: 'La Volta', color: 'orange' }
      ]
    }
  }
};
