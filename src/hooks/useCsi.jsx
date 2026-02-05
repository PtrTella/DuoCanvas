// src/hooks/useCsi.js
import { useState, useEffect, useCallback } from 'react';
import { calculateClassifica, getTeamMatches } from '../utils/csiUtils';

// URL del file JS con i dati (Basket Faenza)
const CSI_DATA_URL = "https://www.csifaenza.it/combasket/listapar.js";

let loadingPromise = null;

// Helper Function per caricare lo script ed estrarre i dati globali
const loadCsiDataFromScript = () => {
    // Se c'è già una richiesta in corso, restituisci quella
    if (loadingPromise) return loadingPromise;

    loadingPromise = new Promise((resolve, reject) => {
        // Rimuovi eventuali script precedenti
        const existingScript = document.getElementById('csi-data-script');
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.src = `${CSI_DATA_URL}?t=${Date.now()}`; // Cache bust
        script.id = 'csi-data-script';
        script.async = true;

        script.onload = () => {
            try {
                const teamsMap = window.sq1 || [];
                const rawMatchesOriginal = window.nu1 || []; 
                const rawMatches = rawMatchesOriginal
                    .filter(line => line && typeof line === 'string')
                    .map(line => line.split('|'));

                resolve({ teamsMap, rawMatches });
            } catch (e) {
                reject(new Error("Errore nel parsing dei dati globali CSI: " + e.message));
            } finally {
                loadingPromise = null; // Reset per permettere ricaricamenti futuri
            }
        };

        script.onerror = () => {
            loadingPromise = null;
            reject(new Error("Errore caricamento script CSI"));
        };

        document.body.appendChild(script);
    });

    return loadingPromise;
};

// --- HOOK 1: Classifica ---
export const useClassifica = (gironeId = "3") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    loadCsiDataFromScript()
      .then(({ teamsMap, rawMatches }) => {
        // Calcoliamo classifica per il girone specificato
        const ranking = calculateClassifica(teamsMap, rawMatches, gironeId);
        setData(ranking);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore script CSI:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [gironeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { classifica: data, loading, error, refresh: fetchData };
};

// --- HOOK 2: Partite Recenti ---
export const useRecentMatches = (teamId = 328, gironeId = "3") => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCsiDataFromScript()
      .then(({ teamsMap, rawMatches }) => {
        const teamMatches = getTeamMatches(teamsMap, rawMatches, teamId, gironeId);
        setMatches(teamMatches);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore script CSI:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [teamId, gironeId]);

  return { partite: matches, loading, error };
};