export const CLUB_INFO = {
  name: "Duo Ligones",
  tagline: "Official Matchday",
  sponsors: [
    '/DuoCanvas/clubs/duo/sponsors/sponsor1.png', 
    '/DuoCanvas/clubs/duo/sponsors/sponsor2.png',
    '/DuoCanvas/clubs/duo/sponsors/sponsor3.png'
  ]
};

export const GLOBAL_DEFAULTS = {
  homeTeam: "Duo Ligones",
  homeLogo: "/DuoCanvas/clubs/duo/logos/duoligones.png"
};

export const THEMES = {
  orange: { hex: "#ea580c", primary: "from-orange-600 to-red-600", bg: "bg-orange-950", accent: "text-orange-400", bgImage: "/DuoCanvas/clubs/duo/themes/basketTeam.jpeg" },
  blue:   { hex: "#2563eb", primary: "from-blue-600 to-cyan-600", bg: "bg-blue-950", accent: "text-blue-400" },
  gold:   { hex: "#f59e0b", primary: "from-amber-500 via-yellow-500 to-yellow-600", bg: "bg-stone-900", accent: "text-amber-400" },
  green:  { hex: "#16a34a", primary: "from-green-600 to-emerald-600", bg: "bg-green-950", accent: "text-green-400", bgImage: "/DuoCanvas/clubs/duo/themes/soccerTeam.jpeg" },
  purple: { hex: "#9333ea", primary: "from-purple-600 to-indigo-600", bg: "bg-purple-950", accent: "text-purple-400", bgImage: "/DuoCanvas/clubs/duo/themes/imola.jpeg" },
  black:  { hex: "#111827", primary: "from-gray-700 to-black", bg: "bg-gray-900", accent: "text-gray-400" },
  white:  { hex: "#f3f4f6", primary: "from-gray-200 to-white", bg: "bg-white", accent: "text-gray-600" }
};

export const RANKING_SYNC = {
  enabled: true,
  label: "CSI Faenza"
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
