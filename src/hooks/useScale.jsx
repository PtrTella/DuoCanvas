import { useState, useEffect } from 'react';

export const useScale = (ref) => {
  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      // Calcola lo spazio disponibile
      const { clientWidth, clientHeight } = ref.current;
      // Target: 1080x1350 + un po' di margine (40px)
      const scaleX = (clientWidth - 40) / 1080;
      const scaleY = (clientHeight - 40) / 1350;
      // Prendi il più piccolo per far stare tutto
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return scale;
};