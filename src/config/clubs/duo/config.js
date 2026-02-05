export const BRANDING = {
  branding: {
    name: "Duo Ligones",
    tagline: "Official Matchday",
    sponsors: [
      '/DuoCanvas/clubs/duo/sponsors/sponsor1.png', 
      '/DuoCanvas/clubs/duo/sponsors/sponsor2.png',
      '/DuoCanvas/clubs/duo/sponsors/sponsor3.png'
    ]
  },
  globalDefaults: {
    homeTeam: "Duo Ligones",
    homeLogo: "/DuoCanvas/clubs/duo/logos/duoligones.png"
  },
  themeAssets: {
    orange: { bgImage: "/DuoCanvas/clubs/duo/themes/basketTeam.jpeg" },
    green:  { bgImage: "/DuoCanvas/clubs/duo/themes/soccerTeam.jpeg" },
    purple: { bgImage: "/DuoCanvas/clubs/duo/themes/imola.jpeg" }
  }
};

export const TEMPLATE_DATA = {
  basket_result: {
    defaultData: {
      headerTitle: "GIORNATA",
      csiTeamId: 32,
      csiGironeId: "3",
      homeScore: "", awayScore: ""
    },
    defaultTheme: 'orange'
  },
  basket_roster: {
    defaultData: {
      headerTitle: "GARA",
      rosterList: ""
    },
    defaultTheme: 'orange'
  },
  basket_ranking: {
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "Duo Ligones",
      csiGironeId: "3",
      ranking: []
    },
    defaultTheme: 'orange'
  },
  soccer_result: {
    defaultData: {
      headerTitle: "GIORNATA",
      homeScore: "", awayScore: ""
    },
    defaultTheme: 'green'
  },
  soccer_roster: {
    defaultData: {
      headerTitle: "GIORNATA",
      module: "",
      rosterList: ""
    },
    defaultTheme: 'green'
  },
  soccer_ranking: {
    defaultData: {
      headerTitle: "CLASSIFICA",
      highlightTeam: "Duo Ligones",
      ranking: []
    },
    defaultTheme: 'green'
  },
  week_recap: {
    defaultData: {
      headerTitle: "PROGRAMMA",
      weekEvents: []
    },
    defaultTheme: 'purple'
  }
};
