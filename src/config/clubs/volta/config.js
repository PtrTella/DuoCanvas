export const CLUB_INFO = {
  name: "La Volta",
  tagline: "Official Matchday",
  sponsors: []
};

export const GLOBAL_DEFAULTS = {
  homeTeam: "La Volta",
  homeLogo: "/DuoCanvas/clubs/volta/logos/volta.png",
  championship: "Divisione Regionale 3 FIP",
  arena: "TOSCA BEACH"
};

export const THEME_ASSETS = {};

export const RANKING_SYNC = { enabled: false };

export const TEMPLATE_DATA = {
  basket_result: {
    defaultData: {
      headerTitle: "GIORNATA",
      homeScore: "", awayScore: ""
    },
    defaultTheme: 'gold'
  },
  basket_roster: {
    defaultData: {
      headerTitle: "GIORNATA",
      rosterList: ""
    },
    defaultTheme: 'gold'
  },
  basket_ranking: {
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "La Volta",
      ranking: []
    },
    defaultTheme: 'gold'
  },
  week_recap: {
    defaultData: {
      headerTitle: "VOLTA",
      headerValue: "WEEK",
      weekEvents: [
        { sport: 'Basket', homeTeam: 'La Volta', color: 'purple' }
      ]
    },
    defaultTheme: 'gold'
  }
};
