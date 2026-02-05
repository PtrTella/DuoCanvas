/**
 * 🎨 Generic/Default Branding & Data
 */
export const BRANDING = {
  branding: {
    name: "DuoCanvas",
    tagline: "Sports Graphics Generator",
    sponsors: ["/DuoCanvas/clubs/generic/sponsors/generic-sponsor.png"]
  },
  globalDefaults: {
    homeTeam: "Squadra Casa",
    awayTeam: "Ospiti",
    homeLogo: "/DuoCanvas/clubs/generic/logos/generic.png",
    awayLogo: "",
    championship: "Campionato",
    matchDay: "",
    date: "DD/MM/YYYY",
    time: "HH:MM",
    arena: "Arena",
    arenaAddress: "Indirizzo"
  },
  themeAssets: {
    orange: { decoration: "/DuoCanvas/clubs/generic/themes/basketball.png" },
    blue:   { decoration: "/DuoCanvas/clubs/generic/themes/volleyball.png" },
    green:  { decoration: "/DuoCanvas/clubs/generic/themes/football.png" },
    purple: { decoration: "/DuoCanvas/clubs/generic/themes/imola.jpeg" }
  }
};

export const TEMPLATE_DATA = {
  basket_result: {
    defaultData: {
      headerTitle: "GIORNATA",
      headerValue: "",
      leagueName: "",
      homeScore: "", awayScore: ""
    },
    defaultTheme: 'orange'
  },
  basket_roster: {
    defaultData: {
      headerTitle: "GARA",
      headerValue: "",
      rosterList: "",
    },
    defaultTheme: 'orange'
  },
  basket_ranking: {
    defaultData: {
      headerTitle: "CLASSIFICA",
      season: "",
      ranking: [],
      highlightTeam: "",
      showAverages: true,
      showStats: true
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
      season: "",
      ranking: [],
      highlightTeam: ""
    },
    defaultTheme: 'green'
  },
  week_recap: {
    defaultData: {
      headerTitle: "PROGRAMMA",
      headerValue: "",
      weekEvents: []
    },
    defaultTheme: 'blue'
  }
};
