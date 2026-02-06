/**
 * 🎨 Generic/Default Club Info & Data
 */

// 1. Identity & Logos
export const CLUB_INFO = {
  name: "Legue Canvas",
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
  building: "Arena",
  address: "Indirizzo"
};

// Sport-Specific Overrides
export const SPORT_DEFAULTS = {
  basket: { 
    defaultTheme: 'orange',
    defaultData: { championship: "Campionato Basket" }
  },
  soccer: { 
    defaultTheme: 'green',
    defaultData: { championship: "Campionato Calcio" } 
  }
};

// 3. Visual Themes
export const THEMES = {
  orange: { hex: "#ea580c", primary: "from-orange-600 to-red-600", bg: "bg-orange-950", accent: "text-orange-400", decoration: "/DuoCanvas/clubs/generic/themes/basketball.png" },
  blue:   { hex: "#2563eb", primary: "from-blue-600 to-cyan-600", bg: "bg-blue-950", accent: "text-blue-400", decoration: "/DuoCanvas/clubs/generic/themes/volleyball.png" },
  gold:   { hex: "#f59e0b", primary: "from-amber-500 via-yellow-500 to-yellow-600", bg: "bg-stone-900", accent: "text-amber-400" },
  green:  { hex: "#16a34a", primary: "from-green-600 to-emerald-600", bg: "bg-green-950", accent: "text-green-400", decoration: "/DuoCanvas/clubs/generic/themes/football.png" },
  purple: { hex: "#9333ea", primary: "from-purple-600 to-indigo-600", bg: "bg-purple-950", accent: "text-purple-400", bgImage: "/DuoCanvas/clubs/generic/themes/imola.jpeg" },
  black:  { hex: "#111827", primary: "from-gray-700 to-black", bg: "bg-gray-900", accent: "text-gray-400" },
  white:  { hex: "#f3f4f6", primary: "from-gray-200 to-white", bg: "bg-white", accent: "text-gray-600" }
};
