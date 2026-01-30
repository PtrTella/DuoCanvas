import { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

export const useDownload = (ref) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadSnapshot = useCallback(async (fileName) => {
    if (!ref.current) return;

    setIsGenerating(true);

    try {
      // 1. CONFIGURAZIONE OTTIMALE
      const options = {
        cacheBust: true, // Forza il ricaricamento delle immagini (evita cache vuote)
        pixelRatio: 2,    // Alta qualità (Retina)
        skipAutoScale: true,
        style: {
           // Forza l'opacità al massimo nel caso ci siano transizioni CSS in corso
           opacity: '1', 
           visibility: 'visible'
        }
      };

      // 2. TRUCCO DEL "DOUBLE SHOT" (Salva la vita su Mobile e Safari)
      // Facciamo un primo render a vuoto. Questo obbliga il browser a
      // decodificare tutte le immagini e i font nel canvas.
      await toPng(ref.current, options);
      
      // 3. PICCOLO DELAY DI SICUREZZA
      // Diamo 100ms al browser per respirare dopo il primo render
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 4. SCATTO REALE
      const dataUrl = await toPng(ref.current, options);
      
      // 5. DOWNLOAD
      download(dataUrl, `${fileName}.png`);

    } catch (err) {
      console.error('Errore generazione immagine:', err);
      alert("Errore durante il salvataggio. Riprova.");
    } finally {
      setIsGenerating(false);
    }
  }, [ref]);

  return { downloadSnapshot, isGenerating };
};