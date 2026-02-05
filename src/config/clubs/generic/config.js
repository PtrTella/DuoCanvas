/**
 * 🎨 Generic/Default Branding & Data
 */

// 1. Identity & Logos
export const CLUB_INFO = {
  name: "DuoCanvas",
  tagline: "Sports Graphics Generator",
  sponsors: ["/DuoCanvas/clubs/generic/sponsors/generic-sponsor.png"]
};

// 2. Global Defaults for matches
export const GLOBAL_DEFAULTS = {
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
};

// 3. Theme Specific Assets (Backgrounds, Decorations)
export const THEME_ASSETS = {
  orange: { decoration: "/DuoCanvas/clubs/generic/themes/basketball.png" },
  blue:   { decoration: "/DuoCanvas/clubs/generic/themes/volleyball.png" },
  green:  { decoration: "/DuoCanvas/clubs/generic/themes/football.png" },
  purple: { decoration: "/DuoCanvas/clubs/generic/themes/imola.jpeg" }
};

// 4. Ranking Synchronization settings
export const RANKING_SYNC = { 
  enabled: false 
};

// 5. Default Data & Themes for each Template type
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
