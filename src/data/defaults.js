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
  coach: "Coach Smith"
};

// --- 2. DATI SPECIFICI (Template) ---
// Questi dati sono esclusivi per ogni template.
// Quando cambi grafica, questi vengono caricati (o resettati).
export const TEMPLATE_DEFAULTS = {
  // ID del template (deve corrispondere a quello nel file del template)
  basket_result: {
    homeScore: 0,
    awayScore: 0,
    topScorer: "MVP: Rossi (20pt)"
  },
  
  basket_roster: {
    rosterList: "23 Jordan\n34 Bryant\n45 James\n50 Davis\n77 Doncic\n80 Curry\n71 Harden\n3 Irving\n11 Paul\n6 Antetokounmpo\n13 George\n2 Leonard",
  },

  soccer_result: {
    homeScore: 0,
    awayScore: 0,
    homeGoals: "45' Rossi",
    awayGoals: ""
  },

  soccer_formation: {
    module: "3-2-1",
    rosterList: "1 Rossi (GK)\n5 Bianchi\n6 Verdi\n3 Neri\n8 Gialli\n4 Blu\n9 Bomber\n12 Riserva1\n13 Riserva2\n14 Riserva3\n15 Riserva4\n16 Riserva5"
  },

  week_recap: {
    weekEvents: [
       { 
         sport: 'Basket', 
         date: 'Sab 12', 
         time: '21:00', 
         location: 'Palazzetto', 
         championship: 'Serie D',
         homeTeam: 'Duo Ligones',
         awayTeam: 'Virtus',
         color: 'orange'
       },
       { 
         sport: 'Calcio a 7', 
         date: 'Lun 14', 
         time: '20:30', 
         location: 'Campo Sportivo', 
         championship: 'CSI',
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
  }

};