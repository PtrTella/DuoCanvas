import React from 'react';

const BaseCard = React.forwardRef(({ theme, children, scale = 1, backgroundUrl }, ref) => {
  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden flex flex-col items-center justify-between shadow-2xl ${theme.bg} text-white transition-all duration-300`}
      style={{ 
        width: '1080px', // Formato quadrato/portrait alta risoluzione
        height: '1350px', // 4:5 ratio ottimale per Instagram
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay Sfumato */}
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.primary} opacity-40 mix-blend-multiply pointer-events-none`}></div>

      {/* Decorazioni Sfondo (se non c'è img personalizzata) */}
      {!backgroundUrl && (
        <>
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
              backgroundImage: 'radial-gradient(circle at 4px 4px, rgba(255,255,255,0.15) 2px, transparent 0)',
              backgroundSize: '40px 40px' 
            }}></div>
          <div className={`absolute top-0 left-0 w-96 h-96 bg-gradient-to-br ${theme.primary} opacity-30 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2`}></div>
        </>
      )}
      
      {/* Contenuto del Template */}
      <div className="relative z-10 w-full h-full flex flex-col p-8">
        {children}
      </div>

      {/* Footer Comune */}
      <div className="relative w-full p-6 z-20 mt-auto border-t border-white/10 flex justify-between items-center bg-black/40 backdrop-blur-md">
          <span className="text-xl uppercase text-white/80 font-bold tracking-[0.2em]">Duo Ligones Official</span>
          <div className="flex gap-3">
              <div className="w-4 h-4 rounded-full bg-white/50"></div>
              <div className="w-4 h-4 rounded-full bg-white/20"></div>
          </div>
      </div>
    </div>
  );
});

export default BaseCard;