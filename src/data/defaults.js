// --- 1. DATI GLOBALI (Sessione) ---
// Questi dati sono condivisi tra tutti i template.
// Se li modifichi in un template, restano modificati anche negli altri.
export const GLOBAL_DEFAULTS = {
  homeTeam: "Duo Ligones",
  awayTeam: "Avversari",
  homeLogo: "/DuoCanvas/logos/duoligones.png",
  awayLogo: null, 
  matchDay: "1",
  championship: "Serie D",
  date: "Sab 21 Ott",
  time: "21:30",
  arena: "PalaDuo",
  arenaAddress: "Via dello Sport 10",
  coach: "Coach"
};

// --- 2. DATI SPECIFICI (Template) ---
// Questi dati sono esclusivi per ogni template.
// Quando cambi grafica, questi vengono caricati (o resettati).
export const TEMPLATE_DEFAULTS = {
  // ID del template (deve corrispondere a quello nel file del template)
  basket_result: {
    homeScore: 0,
    awayScore: 0,
    topScorer: ""
  },
  
  basket_roster: {
    rosterList: "1 Martini\n 4 Rubbi Alfi\n 5 Dino\n6 Ricci Lucchi\n7 Tellarini\n8 Gardenghi\n9 Lambertucci\n10 Pieri\n12 Camaggi\n14 Bonifazio\n15 Cavini\n16 Monti\n18 Tassoni\n20 Gamez\n21 Piani Gentile\n22 Biavati\n25 Ferrante\n27 Lancieri",
  },

  soccer_result: {
    homeScore: 0,
    awayScore: 0,
    homeGoals: "",
    awayGoals: ""
  },

  soccer_formation: {
    module: "3-2-1",
    rosterList: "1 Voda\n 4 Gentilini\n 5 Ceroni\n 6 Neri\n 7 Costa\n 8 Mondini\n 9 Alpi\n 10 Forti\n12 Poli\n15 Sarro A.\n17 Carbone\n20 Collina\n21 Dalle Fabbriche\n22 Tomba\n23 Sarro M."
  },

  week_recap: {
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
  },

  basket_ranking: {
    leagueName: "Campionato CSI Imola, Girone Ovest",
    season: "Stagione 2025/26",
    ranking: [],
    highlightTeam: "Duo Ligones"
  },

  soccer_ranking: {
    leagueName: "Campionato Calcio a 7 - Girone B",
    season: "Stagione 2025/26",
    ranking: [],
    highlightTeam: "Duo Ligones",
    showAverages: false,
    showStats: true
  }

};