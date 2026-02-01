// src/hooks/useCsi.js
import { useState, useEffect } from 'react';
import { calculateClassifica, getTeamMatches } from '../utils/csiUtils';

// URL del file JS con i dati (Basket Faenza)
const CSI_DATA_URL = "https://www.csifaenza.it/combasket/listapar.js";

// Helper Function per caricare lo script ed estrarre i dati globali
const loadCsiDataFromScript = () => {
    return new Promise((resolve, reject) => {
        // Rimuovi eventuali script precedenti per forzare il refresh
        const existingScript = document.getElementById('csi-data-script');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = CSI_DATA_URL; // Caricamento diretto NO PROXY (bypass CORS tramite <script>)
        script.id = 'csi-data-script';
        script.async = true;

        script.onload = () => {
            try {
                // Estrae i dati dalle variabili globali window.sq1 e window.nu1
                const teamsMap = window.sq1 || [];
                // nu1 è un array di stringhe pipe-separated. Lo convertiamo in array di array per compatibilità
                const rawMatchesOriginal = window.nu1 || []; 
                const rawMatches = rawMatchesOriginal
                    .filter(line => line && typeof line === 'string') // Rimuove slot vuoti
                    .map(line => line.split('|'));

                resolve({ teamsMap, rawMatches });
            } catch (e) {
                reject(new Error("Errore nel parsing dei dati globali CSI: " + e.message));
            }
        };

        script.onerror = () => {
            reject(new Error("Errore caricamento script CSI (controlla connessione o blocchi adblock)"));
        };

        document.body.appendChild(script);
    });
};

// --- HOOK 1: Classifica ---
export const useClassifica = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCsiDataFromScript()
      .then(({ teamsMap, rawMatches }) => {
        // Calcoliamo classifica (Silver Ovest = Girone 3)
        const ranking = calculateClassifica(teamsMap, rawMatches, "3");
        setData(ranking);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore script CSI:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { classifica: data, loading, error };
};

// --- HOOK 2: Partite Duo Ligones ---
export const usePartiteDuoLigones = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCsiDataFromScript()
      .then(({ teamsMap, rawMatches }) => {
        const teamMatches = getTeamMatches(teamsMap, rawMatches);
        setMatches(teamMatches);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore script CSI:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { partite: matches, loading, error };
};