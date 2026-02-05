/**
 * 📔 DuoCanvas - Global & Template Defaults
 * Centralized state configuration for the entire application.
 */

// --- 1. SESSION DEFAULTS (Shared across all templates) ---
export const GLOBAL_DEFAULTS = {
  homeTeam: "Duo Ligones",
  awayTeam: "Avversari",
  homeLogo: "/DuoCanvas/logos/duoligones.png",
  awayLogo: "",
  championship: "BAsket CSI - Silver Ovest",
  matchDay: "12^ GIORNATA",
  date: "DOM 12 MARZO",
  time: "21:30",
  arena: "Pala Penazzi, Imola",
  coach: ""
};

// --- 2. BRANDING & ASSETS ---
export const BRANDING = {
  name: "Duo Ligones",
  tagline: "Official Matchday",
  sponsors: [
    '/DuoCanvas/logos/sponsor1.png', 
    '/DuoCanvas/logos/sponsor2.png',
    '/DuoCanvas/logos/sponsor3.png'
  ]
};

// --- 3. THEME ASSETS (Backgrounds & Decorations) ---
export const THEME_ASSETS = {
  orange: { bgImage: "/DuoCanvas/themes/basketTeam.jpeg" },
  blue:   { decoration: "/DuoCanvas/themes/volleyball.png" },
  green:  { bgImage: "/DuoCanvas/themes/soccerTeam.jpeg" },
  purple: { bgImage: "/DuoCanvas/themes/imola.jpeg" },
  gold:   { bgImage: "" }, // Placeholder for gold
  black:  { bgImage: "" }
};

// --- 4. TEMPLATE-SPECIFIC DEFAULTS ---
// Note: headerTitle and headerValue are often template-specific to allow 
// different labels (e.g., "GARA" vs "CLASSIFICA") while keeping values local.
// If a key is NOT here, it will fall back to GLOBAL_DEFAULTS.

export const TEMPLATE_DEFAULTS = {
  // --- BASKET ---
  basket_result: {
    headerTitle: "RISULTATO",
    headerValue: "FINALE",
    leagueName: "CSI Imola, Girone Ovest",
    labelMvp: "MVP",
    topScorer: "",
    homeScore: "0",
    awayScore: "0"
  },
  basket_roster: {
    headerTitle: "CONVOCAZIONI",
    headerValue: "",
    leagueName: "CSI Imola, Girone Ovest",
    labelCoach: "Allenatore",
    labelBench: "Panchina",
    rosterList: "1 Martini\n4 Rubbi Alfi\n5 Dino\n6 Ricci Lucchi\n7 Tellarini\n8 Gardenghi\n9 Lambertucci\n10 Pieri\n12 Camaggi\n14 Bonifazio\n15 Cavini\n16 Monti\n18 Tassoni\n20 Gamez\n21 Piani Gentile\n22 Biavati\n25 Ferrante\n27 Lancieri",
  },
  basket_ranking: {
    headerTitle: "CLASSIFICA",
    headerValue: "BASKET",
    championship: "CSI Imola, Silver Ovest",
    season: "2025/26",
    ranking: [],
    highlightTeam: "Duo Ligones",
    showAverages: true,
    showStats: true
  },

  // --- CALCIO ---
  soccer_result: {
    headerTitle: "GIORNATA",
    headerValue: "",
    labelGoals: "GOL",
    homeGoals: "",
    awayGoals: "",
    homeScore: "0",
    awayScore: "0"
  },
  soccer_roster: {
    headerTitle: "FORMAZIONE",
    headerValue: "",
    module: "3-2-1",
    labelCoach: "Mister",
    labelBench: "A Disposizione",
    rosterList: "1 Voda\n4 Gentilini\n5 Ceroni\n6 Neri\n7 Costa\n8 Mondini\n9 Alpi\n10 Forti\n12 Poli\n15 Sarro A.\n17 Carbone\n20 Collina\n21 Dalle Fabbriche\n22 Tomba\n23 Sarro M."
  },
  soccer_ranking: {
    headerTitle: "CLASSIFICA",
    headerValue: "CALCIO",
    championship: "Calcio a 7 - Girone B",
    season: "2025/26",
    ranking: [],
    highlightTeam: "Duo Ligones",
    showAverages: false,
    showStats: true
  },

  // --- MULTI ---
  week_recap: {
    headerTitle: "PROGRAMMA",
    headerValue: "SETTIMANA",
    weekEvents: [
       { 
         sport: 'Basket', 
         date: 'Ven 12', 
         time: '21:30', 
         location: 'Pala Penazzi', 
         championship: 'Serie B Ovest',
         homeTeam: 'Duo Ligones',
         awayTeam: 'Avversari',
         color: 'orange'
       },
       { 
         sport: 'Calcio a 7', 
         date: 'Ven 14',
         time: '20:30', 
         location: 'Casa del Fanciullo', 
         championship: 'Coppa CSI Imola',
         homeTeam: 'Atletico',
         awayTeam: 'Duo Ligones',
         color: 'green'
       }
    ]
  }
};
