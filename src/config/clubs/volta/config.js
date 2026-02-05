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

export const THEMES = {
  orange: { hex: "#ea580c", primary: "from-orange-600 to-red-600", bg: "bg-orange-950", accent: "text-orange-400" },
  blue:   { hex: "#2563eb", primary: "from-blue-600 to-cyan-600", bg: "bg-blue-950", accent: "text-blue-400" },
  gold:   { hex: "#f59e0b", primary: "from-amber-500 via-yellow-500 to-yellow-600", bg: "bg-stone-900", accent: "text-amber-400" },
  green:  { hex: "#16a34a", primary: "from-green-600 to-emerald-600", bg: "bg-green-950", accent: "text-green-400" },
  purple: { hex: "#9333ea", primary: "from-purple-600 to-indigo-600", bg: "bg-purple-950", accent: "text-purple-400" },
  black:  { hex: "#111827", primary: "from-gray-700 to-black", bg: "bg-gray-900", accent: "text-gray-400" },
  white:  { hex: "#f3f4f6", primary: "from-gray-200 to-white", bg: "bg-white", accent: "text-gray-600" }
};

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
