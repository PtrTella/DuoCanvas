// --- 1. DATI GLOBALI (Sessione) ---
// Questi dati sono condivisi tra tutti i template.
// Se li modifichi in un template, restano modificati anche negli altri.
export const GLOBAL_DEFAULTS = {
  homeTeam: "Duo Ligones",
  awayTeam: "Avversari",
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
  result: {
    homeScore: 0,
    awayScore: 0,
    topScorer: "MVP: Rossi (20pt)"
  },
  
  fixture: {
    rosterList: "00 Rossi\n01 Bianchi\n02 Verdi\n11 Neri\n23 Jordan"
  },

  football: {
    homeScore: 0,
    awayScore: 0,
    homeGoals: "45' Rossi",
    awayGoals: ""
  }
};