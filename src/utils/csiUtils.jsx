// src/csiUtils.js

// ID della tua squadra (Duo Ligones = 32)
const MY_TEAM_ID = 32; 
const MY_GIRONE_ID = "3"; // Girone 3 (Silver Ovest)

// Logica Punti Basket CSI Faenza
const POINTS_WIN = 3; 
const POINTS_WIN_OT = 2;
const POINTS_LOSS_OT = 1;
const POINTS_LOSS = 0;

// Aggiorniamo la logica di parsing per il file JS
export const parseCsiData = (jsContent) => {
  // 1. Estrai Mappa Squadre (sq1)
  // sq1="...".split('|')
  const sq1Match = jsContent.match(/sq1\s*=\s*"([^"]+)"/);
  const teamsMap = sq1Match ? sq1Match[1].split('|') : [];

  // 1b. Estrai Mappa Gironi (gir1)
  // gir1="...".split('|')
  const gir1Match = jsContent.match(/gir1\s*=\s*"([^"]+)"/);
  const groupsMap = gir1Match ? gir1Match[1].split('|') : [];

  // 2. Estrai Partite (nu1)
  // nu1[1]="..."
  const matchRegex = /nu1\[\d+\]\s*=\s*"([^"]+)"/g;
  let match;
  const rawMatches = [];
  while ((match = matchRegex.exec(jsContent)) !== null) {
    rawMatches.push(match[1].split('|'));
  }

  return { teamsMap, rawMatches, groupsMap };
};

export const calculateClassifica = (teamsMap, rawMatches, targetGironeId = MY_GIRONE_ID) => {
  const ranking = {};

  rawMatches.forEach(m => {
    // Indici Listapar: 6=Girone, 8=Casa, 9=Fuori, 10=PuntiCasa, 11=PuntiFuori, 15=Note/Overtime (s=supplementari)
    const gironeId = m[6];
    const idHome = parseInt(m[8]);
    const idAway = parseInt(m[9]);
    const scoreHome = parseInt(m[10]);
    const scoreAway = parseInt(m[11]);
    const isOvertime = m[15] === 's'; // Controlla il flag dei supplementari
    
    // Controlla se la partita è del girone e se è stata giocata (punteggi validi)
    if (gironeId === targetGironeId && !isNaN(scoreHome) && !isNaN(scoreAway)) {
      
      // Inizializza squadre se non esistono
      [idHome, idAway].forEach(id => {
        if (!ranking[id]) {
          ranking[id] = { 
            id, 
            name: teamsMap[id] || `Team ${id}`, 
            points: 0, 
            played: 0, 
            won: 0, lost: 0, drawn: 0 
          };
        }
      });

      ranking[idHome].played++;
      ranking[idAway].played++;

      if (scoreHome > scoreAway) {
        // VITTORIA CASA
        if (isOvertime) {
             ranking[idHome].points += POINTS_WIN_OT; 
             ranking[idHome].won++; // Vinta (anche se ai supplementari conta come Vinta?)
        } else {
             ranking[idHome].points += POINTS_WIN; 
             ranking[idHome].won++;
        }

        // SCONFITTA FUORI
        if (isOvertime) {
             ranking[idAway].points += POINTS_LOSS_OT;
             ranking[idAway].lost++; // Persa
        } else {
             ranking[idAway].points += POINTS_LOSS;
             ranking[idAway].lost++;
        }

      } else if (scoreAway > scoreHome) {
        // VITTORIA FUORI
        if (isOvertime) {
             ranking[idAway].points += POINTS_WIN_OT;
             ranking[idAway].won++;
        } else {
             ranking[idAway].points += POINTS_WIN;
             ranking[idAway].won++;
        }

        // SCONFITTA CASA
        if (isOvertime) {
             ranking[idHome].points += POINTS_LOSS_OT;
             ranking[idHome].lost++;
        } else {
             ranking[idHome].points += POINTS_LOSS;
             ranking[idHome].lost++;
        }
      } else {
        // PAREGGIO (Caso raro/impossibile nel basket CSI Faenza, ma per sicurezza)
        ranking[idHome].points += 1; 
        ranking[idHome].drawn++;
        ranking[idAway].points += 1; 
        ranking[idAway].drawn++;
      }
    }
  });

  return Object.values(ranking).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    // Differenza canestri o scontri diretti qui sarebbe ideale
    return 0; 
  });
};

export const getTeamMatches = (teamsMap, rawMatches) => {
  const matches = [];

  rawMatches.forEach(m => {
    const gironeId = m[6];
    const idHome = parseInt(m[8]);
    const idAway = parseInt(m[9]);
    const scoreHome = m[10]; // Stringa per controllare se è vuota
    const scoreAway = m[11];
    
    // Filtra solo le partite giocate (punteggio non vuoto) dove c'è la Duo Ligones
    if (gironeId === MY_GIRONE_ID && scoreHome !== "" && scoreAway !== "" && (idHome === MY_TEAM_ID || idAway === MY_TEAM_ID)) {
      
      const isHome = idHome === MY_TEAM_ID;
      const opponentId = isHome ? idAway : idHome;
      const myScore = parseInt(isHome ? scoreHome : scoreAway);
      const oppScore = parseInt(isHome ? scoreAway : scoreHome);

      // Data formato YYYY|MM|DD -> DD/MM/YYYY
      const dateStr = `${m[2]}/${m[1]}/${m[0]}`; 

      matches.push({
        date: dateStr,
        originalDate: new Date(`${m[0]}-${m[1]}-${m[2]}`), // Utile per ordinare
        opponent: teamsMap[opponentId],
        result: `${myScore} - ${oppScore}`,
        outcome: myScore > oppScore ? 'V' : (myScore === oppScore ? 'P' : 'S'), // Vinta, Pari, Persa
        isHome: isHome
      });
    }
  });

  // Ordina: Dalla più vecchia alla più recente (ultima in fondo)
  return matches.sort((a, b) => a.originalDate - b.originalDate);
};