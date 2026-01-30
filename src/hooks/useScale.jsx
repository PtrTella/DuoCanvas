import { useState, useEffect } from 'react';

// Aggiungiamo il parametro 'trigger' (es. showMobilePreview)
export const useScale = (ref, trigger) => {
  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      
      const { clientWidth, clientHeight } = ref.current;
      
      // Se l'elemento è nascosto (width=0), non calcolare nulla o tieni un default
      if (clientWidth === 0 || clientHeight === 0) return;

      const scaleX = (clientWidth - 40) / 1080;
      const scaleY = (clientHeight - 40) / 1350;
      
      // Calcolo normale
      setScale(Math.min(scaleX, scaleY));
    };

    // Ritardiamo leggermente il calcolo per dare tempo al CSS di applicare il 'flex'
    const timeoutId = setTimeout(handleResize, 50);

    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeoutId);
    };
    
    // Ricalcola quando cambia il 'ref' O quando cambia il 'trigger' (mostra/nascondi)
  }, [ref, trigger]); 

  return scale;
};