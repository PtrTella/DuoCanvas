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

// 3. Theme Colors
export const COLOR_THEMES = {
  orange: { hex: "#ea580c", primary: "from-orange-600 to-red-600", bg: "bg-orange-950", accent: "text-orange-400" },
  blue:   { hex: "#2563eb", primary: "from-blue-600 to-cyan-600", bg: "bg-blue-950", accent: "text-blue-400" },
  gold:   { hex: "#f59e0b", primary: "from-amber-500 via-yellow-500 to-yellow-600", bg: "bg-stone-900", accent: "text-amber-400" },
  green:  { hex: "#16a34a", primary: "from-green-600 to-emerald-600", bg: "bg-green-950", accent: "text-green-400" },
  purple: { hex: "#9333ea", primary: "from-purple-600 to-indigo-600", bg: "bg-purple-950", accent: "text-purple-400" },
  black:  { hex: "#111827", primary: "from-gray-700 to-black", bg: "bg-gray-900", accent: "text-gray-400" },
  white:  { hex: "#f3f4f6", primary: "from-gray-200 to-white", bg: "bg-white", accent: "text-gray-600" }
};

// 4. Theme Specific Assets (Backgrounds, Decorations)
export const THEME_ASSETS = {
  orange: { decoration: "/DuoCanvas/clubs/generic/themes/basketball.png" },
  blue:   { decoration: "/DuoCanvas/clubs/generic/themes/volleyball.png" },
  green:  { decoration: "/DuoCanvas/clubs/generic/themes/football.png" },
  purple: { bgImage: "/DuoCanvas/clubs/generic/themes/imola.jpeg" }
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
