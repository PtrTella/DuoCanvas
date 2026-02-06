export const CLUB_INFO = {
  name: "Volta Baloncesto",
  tagline: "Official",
  sponsors: []
};

export const GLOBAL_DEFAULTS = {
  homeTeam: "Playground Volta Dozza",
  homeLogo: "/DuoCanvas/clubs/volta/logos/volta.png"
};

// Sport-Specific Overrides
export const SPORT_DEFAULTS = {
  basket: {
    defaultTheme: 'gold',
    defaultData: {
      homeTeam: "Playground Volta Dozza",
      championship: "Divisione Regionale 3 FIP",
      building: "TOSCA BEACH"
    }
  }
};

// Visual Themes
export const THEMES = {
  gold:   { hex: "#f59e0b", primary: "from-amber-500 via-yellow-500 to-yellow-600", bg: "bg-stone-900", accent: "text-amber-400" },
  purple: { hex: "#9333ea", primary: "from-purple-600 to-indigo-600", bg: "bg-purple-950", accent: "text-purple-400" },
  black:  { hex: "#111827", primary: "from-gray-700 to-black", bg: "bg-gray-900", accent: "text-gray-400" },
  white:  { hex: "#f3f4f6", primary: "from-gray-200 to-white", bg: "bg-white", accent: "text-gray-600" }
};
