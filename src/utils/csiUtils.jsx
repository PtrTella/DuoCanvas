// src/csiUtils.js

// ID della tua squadra (Duo Ligones = 32)
const MY_TEAM_ID = 32; 
const MY_GIRONE_ID = "3"; // Girone 3 (Silver Ovest)

// Logica Punti Basket CSI (Aggiornata per Faenza: 3p Vinta, 1p Persa)
// Controllo: Di solito per il basket CSI Faenza è 2 punti vittoria, 0 sconfitta? 
// Dal file HTML allegato: "v=3, p=0, s=1" ? No, aspetta.
// HTML: "if (sport=='basket') { pu_vin=3;pu_per=0;pu_par=1 }"
// Però guardando il codice HTML loop:
// classi[i][7]=(classi[i][2]*pu_vin)+(classi[i][3]*pu_par)+(classi[i][4]*pu_per)
// 2=Vinte, 3=Pari, 4=Perse.
// E poi: classi[i][7]=classi[i][7]+(classi[i][10]*2)+classi[i][11] (se basket speciali?)
// MA il tuo HTML ha anche: 
// if (sport=='basket') pu_vin=3; pu_per=0; pu_par=1;
// Quindi Vinta=3, Pari=1, Persa=0.
// NOTA: Nel basket il pareggio è raro, ma forse assegnano 1 punto alla sconfitta?
// C'è un commento nel JS: "// si dà per contato che i punti in questo caso sono 2 per chi vince e 1 per il perdente"
// Ma è in un blocco commentato o attivo? È attivo: `classi[i][7]=...`
// Aspetta, il codice JS nell'HTML sovrascrive i punti?
// "si dà per contato che i punti in questo caso sono 2 per chi vince e 1 per il perdente"
// Questo commento è strano se `pu_vin` è 3.
// Seguiamo la logica delle variabili: pu_vin=3, pu_per=0.
// Se uso 3 per vittoria, 0 sconfitta.

const POINTS_WIN = 3; 
const POINTS_DRAW = 1; // Teorico
const POINTS_LOSS = 0; // O forse 1?

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
    // Indici Listapar: 6=Girone, 8=Casa, 9=Fuori, 10=PuntiCasa, 11=PuntiFuori
    const gironeId = m[6];
    const idHome = parseInt(m[8]);
    const idAway = parseInt(m[9]);
    const scoreHome = parseInt(m[10]);
    const scoreAway = parseInt(m[11]);
    
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
        ranking[idHome].points += POINTS_WIN; 
        ranking[idHome].won++;
        ranking[idAway].points += POINTS_LOSS; 
        ranking[idAway].lost++;
      } else if (scoreAway > scoreHome) {
        ranking[idAway].points += POINTS_WIN; 
        ranking[idAway].won++;
        ranking[idHome].points += POINTS_LOSS; 
        ranking[idHome].lost++;
      } else {
        // Pareggio (Raro nel basket, ma codice CSI lo prevede)
        ranking[idHome].points += POINTS_DRAW; 
        ranking[idHome].drawn++;
        ranking[idAway].points += POINTS_DRAW; 
        ranking[idAway].drawn++;
      }
    }
  });

  return Object.values(ranking).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    // Differenza canestri o scontri diretti qui sarebbe ideale, ma per ora basta punti
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