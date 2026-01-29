import React from 'react';

const TeamLogo = ({ src, alt = "Team Logo", fallbackText = "VS" }) => {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-white/10 flex items-center justify-center relative shadow-lg border border-white/10 backdrop-blur-sm">
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover object-center" 
          /* object-cover: Riempie tutto il cerchio (croppa gli eccessi)
             object-center: Mantiene il centro dell'immagine visibile
          */
        />
      ) : (
        // Placeholder se non c'è immagine
        <div className="flex items-center justify-center w-full h-full">
           <span className="text-white/20 font-black text-xl uppercase tracking-widest">
             {fallbackText}
           </span>
        </div>
      )}
    </div>
  );
};

export default TeamLogo;