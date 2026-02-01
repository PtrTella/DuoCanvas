// src/hooks/useCsi.js
import { useState, useEffect } from 'react';
import { parseCsiData, calculateClassifica, getTeamMatches } from '../utils/csiUtils';

// URL del file JS con i dati (Basket Faenza)
const CSI_DATA_URL = "https://www.csifaenza.it/combasket/listapar.js";

// Proxy per GitHub Pages (CORS) - Utilizziamo corsproxy per accedere ai dati da browser
const PROXY_URL = "https://corsproxy.io/?" + encodeURIComponent(CSI_DATA_URL);

// --- HOOK 1: Classifica ---
export const useClassifica = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(PROXY_URL)
      .then(res => res.text())
      .then(jsContent => {
        // Passiamo il contenuto JS al parser
        const { teamsMap, rawMatches } = parseCsiData(jsContent);
        // Calcoliamo classifica (Silver Ovest = Girone 3)
        const ranking = calculateClassifica(teamsMap, rawMatches, "3");
        setData(ranking);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore fetch CSI:", err);
        setLoading(false);
      });
  }, []);

  return { classifica: data, loading };
};

// --- HOOK 2: Partite Duo Ligones ---
export const usePartiteDuoLigones = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(PROXY_URL)
      .then(res => res.text())
      .then(jsContent => {
        const { teamsMap, rawMatches } = parseCsiData(jsContent);
        const teamMatches = getTeamMatches(teamsMap, rawMatches);
        setMatches(teamMatches);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore fetch CSI:", err);
        setLoading(false);
      });
  }, []);

  return { partite: matches, loading };
};