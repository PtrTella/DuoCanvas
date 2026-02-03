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
      {/* 0. LAYER THEME IMAGE (Solo se no user background) */}
      {!backgroundUrl && theme.bgImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={theme.bgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-15 mix-blend-luminosity grayscale"
          />
        </div>
      )}

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
          
          {/* THEME DECORATION (Ball in lower right corner) */}
          {theme.decoration && (
            <div className="absolute bottom-[-10%] right-[-10%] w-[70%] aspect-square pointer-events-none z-0">
               <img 
                 src={theme.decoration} 
                 alt="" 
                 className="w-full h-full object-contain opacity-30 mix-blend-overlay"
               />
            </div>
          )}
        </>
      )}
      
      {/* 3. LAYER CONTENUTO (Dinamico) */}
      {/* flex-1 spinge questo div a occupare tutto lo spazio disponibile, 
          spingendo gli sponsor in basso */}
      <div className="relative z-10 w-full flex-1 flex flex-col p-8 pb-8">
        {children}
      </div>

      {/* 4. FOOTER (Clean, Dark, Impactful) */}
      <div className="relative z-20 w-full bg-[#101010] flex items-center justify-between px-12 py-8 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
          {/* Left: Brand Identity - Aligned with App Style */}
          <div className="flex flex-col items-end">
             <span className="text-3xl font-black uppercase text-white tracking-[0.15em] leading-none">
               Duo Ligones
             </span>
             <span className="text-[10px] text-gray-400 font-bold tracking-[0.6em] uppercase mt-1">
               Official
             </span>
          </div>

          {/* Graphical Divider: Thin vertical line */}
          <div className="h-14 w-px bg-white/10 mx-8"></div>

          {/* Right: Sponsors - Big but balanced */}
          <div className="flex items-center justify-start gap-12 flex-1">
              {SPONSORS.map((logo, index) => (
                <img 
                  key={index} 
                  src={logo} 
                  alt="Sponsor" 
                  className="h-24 object-contain" 
                />
              ))}
          </div>
      </div>
    </div>
  );
});

export default BaseCard;