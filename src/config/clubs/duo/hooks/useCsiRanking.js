import { useState, useEffect, useCallback } from 'react';

// --- CONFIGURAZIONE SPECIFICA DUO LIGONES / CSI FAENZA ---
const CSI_DATA_URL = "https://www.csifaenza.it/combasket/listapar.js";
const GIRONE_ID = "3"; // ID del girone di interesse (es. Girone A)

const PT_W = 3;
const PT_W_OT = 2; // Vittoria OT
const PT_L_OT = 1; // Sconfitta OT
const PT_L = 0;    // Sconfitta Regolamentare

let loadingPromise = null;

// --- LOGICA DI CALCOLO PURA ---
const calculateClassifica = (teamsMap, rawMatches) => {
  const ranking = {};

  rawMatches.forEach(m => {
    // Indici Listapar: 6=Girone, 8=Casa, 9=Fuori, 10=PuntiCasa, 11=PuntiFuori, 15=Note/Overtime (s=supplementari)
    const gId = m[6];
    const idHome = parseInt(m[8]);
    const idAway = parseInt(m[9]);
    const scoreHome = parseInt(m[10]);
    const scoreAway = parseInt(m[11]);
    const isOvertime = m[15] === 's'; 
    
    // Filtro per Girone e Partita Giocata
    if (gId === GIRONE_ID && !isNaN(scoreHome) && !isNaN(scoreAway)) {
      
      // Init Teams
      [idHome, idAway].forEach(id => {
        if (!ranking[id]) {
          ranking[id] = { 
            id, 
            name: teamsMap[id] || `Team ${id}`, 
            points: 0, played: 0, won: 0, lost: 0, drawn: 0, // draws not used in basket but schema requires it
            scored: 0, conceded: 0 
          };
        }
      });

      const rh = ranking[idHome];
      const ra = ranking[idAway];

      rh.played++;
      ra.played++;
      
      rh.scored += scoreHome;
      rh.conceded += scoreAway;
      
      ra.scored += scoreAway;
      ra.conceded += scoreHome;

      if (scoreHome > scoreAway) {
        // VITTORIA CASA
        rh.won++;
        ra.lost++;
        if (isOvertime) {
             rh.points += PT_W_OT; 
             ra.points += PT_L_OT;
        } else {
             rh.points += PT_W; 
             ra.points += PT_L;
        }
      } else if (scoreAway > scoreHome) {
        // VITTORIA FUORI
        ra.won++;
        rh.lost++;
        if (isOvertime) {
             ra.points += PT_W_OT;
             rh.points += PT_L_OT;
        } else {
             ra.points += PT_W;
             rh.points += PT_L;
        }
      }
    }
  });

  return Object.values(ranking)
    .map(team => ({
        ...team,
        avgScored: team.played > 0 ? (team.scored / team.played).toFixed(1) : 0,
        avgConceded: team.played > 0 ? (team.conceded / team.played).toFixed(1) : 0
    }))
    .sort((a, b) => {
        // 1. Punti
        if (b.points !== a.points) return b.points - a.points;
        // 2. Diff Canestri (Approssimativa, scontro diretto servirebbe)
        const diffA = a.scored - a.conceded;
        const diffB = b.scored - b.conceded;
        return diffB - diffA;
    });
};


// --- DATA LOADER ---
const loadCsiData = () => {
    if (loadingPromise) return loadingPromise;

    loadingPromise = new Promise((resolve, reject) => {
        const existingScript = document.getElementById('csi-data-script');
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.src = `${CSI_DATA_URL}?t=${Date.now()}`;
        script.id = 'csi-data-script';
        script.async = true;

        script.onload = () => {
            try {
                // sq1 = Mappa Teams, nu1 = Array Match Strings
                const teamsMap = window.sq1 || [];
                const rawMatchesOriginal = window.nu1 || []; 
                const rawMatches = rawMatchesOriginal
                    .filter(line => line && typeof line === 'string')
                    .map(line => line.split('|')); 

                resolve({ teamsMap, rawMatches });
            } catch (err) {
                reject(err);
            } finally {
                loadingPromise = null; 
            }
        };
        script.onerror = () => {
            loadingPromise = null;
            reject(new Error("Failed to load CSI script"));
        };
        document.body.appendChild(script);
    });

    return loadingPromise;
};


// --- PUBLIC HOOK ---
export const useCsiRanking = () => {
    const [classifica, setClassifica] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const { teamsMap, rawMatches } = await loadCsiData();
            const ranking = calculateClassifica(teamsMap, rawMatches);
            setClassifica(ranking);
        } catch (err) {
            console.error("CSI Sync Error:", err);
            setError("Errore sincronizzazione CSI");
            setClassifica([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto-fetch on mount
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { 
        classifica, 
        loading, 
        error,
        refresh: fetchData 
    };
};
