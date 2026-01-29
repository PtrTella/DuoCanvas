import React from 'react';

// Definisci qui i percorsi dei loghi (che hai messo in /public/logos/)
const SPONSORS = [
  '/DuoCanvas/logos/sponsor1.png', 
  '/DuoCanvas/logos/sponsor2.png',
  '/DuoCanvas/logos/sponsor3.png'
];

const BaseCard = React.forwardRef(({ theme, children, scale = 1, backgroundUrl }, ref) => {
  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden flex flex-col items-center shadow-2xl ${theme.bg} text-white transition-all duration-300`}
      style={{ 
        width: '1080px', 
        height: '1350px', 
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* 1. LAYER SFONDO (Overlay Sfumato) */}
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.primary} opacity-40 mix-blend-multiply pointer-events-none`}></div>

      {/* 2. LAYER DECORAZIONI (Solo se no img sfondo) */}
      {!backgroundUrl && (
        <>
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
              backgroundImage: 'radial-gradient(circle at 4px 4px, rgba(255,255,255,0.15) 2px, transparent 0)',
              backgroundSize: '40px 40px' 
            }}></div>
          <div className={`absolute top-0 left-0 w-96 h-96 bg-gradient-to-br ${theme.primary} opacity-30 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2`}></div>
        </>
      )}
      
      {/* 3. LAYER CONTENUTO (Dinamico) */}
      {/* flex-1 spinge questo div a occupare tutto lo spazio disponibile, 
          spingendo gli sponsor in basso */}
      <div className="relative z-10 w-full flex-1 flex flex-col p-8">
        {children}
      </div>

      {/* 4. LAYER SPONSOR (Fisso e Comune a tutti) */}
      <div className="relative z-20 w-full px-12 py-6 flex flex-col items-center gap-4 bg-gradient-to-t from-black/60 to-transparent">
        
        {/* Linea separatrice sottile */}
        <div className="w-full h-px bg-white/20 mb-2"></div>
        
        <div className="flex items-center justify-center gap-12 w-full">
            {SPONSORS.map((logo, index) => (
              <img 
                key={index} 
                src={logo} 
                alt="Sponsor" 
                className="h-16 object-contain opacity-90" 
                /* NOTA SULLO STILE:
                   - h-16: Altezza fissa (regolala tu)
                   - object-contain: Mantiene le proporzioni
                */
              />
            ))}
        </div>
      </div>

      {/* 5. FOOTER UFFICIALE (La striscia nera in fondo) */}
      <div className="relative w-full p-6 z-20 border-t border-white/10 flex justify-between items-center bg-black/90 backdrop-blur-md">
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