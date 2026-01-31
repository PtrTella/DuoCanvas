import React from 'react';

// --- COMPONENTE SCHEDA GIOCATORE ---
const PlayerCard = ({ number, name, theme }) => (
  <div className={`
      relative group flex items-center 
      bg-gradient-to-r from-black/40 via-black/20 to-transparent
      backdrop-blur-sm border-l-[3px] 
      py-2 px-3 gap-3
      transition-all duration-300
  `}
  style={{ 
      borderColor: theme?.accentColor || '#ea580c',
  }} 
  >
    {/* Numero: Increased width and added right padding to fix italic clipping */}
    <div className="flex-shrink-0 w-16 text-right flex justify-end pr-2">
       <span className="font-black italic text-4xl leading-none text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 block transform translate-y-[2px] pr-1"
             style={{ fontFamily: 'Impact, sans-serif' }}>
         {number}
       </span>
    </div>

    {/* Vertical Separator */}
    <div className="h-8 w-px bg-white/20 rounded-full"></div>

    {/* Nome: Truncate per evitare overflow orizzontale */}
    <div className="flex-1 min-w-0">
      <span className="block font-bold uppercase text-white text-lg truncate tracking-wider drop-shadow-sm">
        {name}
      </span>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPALE ---
export const BasketRoster = ({ data, theme, className = "" }) => {
  
  // 1. Parsing dei dati
  const parsePlayer = (line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      // Regex: cattura numero iniziale opzionale (es. "23") e il resto come nome
      const match = trimmed.match(/^(\d+)?\s*(.*)$/);
      if (!match) return { num: '', name: trimmed };
      
      return {
        num: match[1] || '-',
        name: match[2]
      };
  };

  const players = data.rosterList ? data.rosterList.split('\n').map(parsePlayer).filter(p => p && p.name) : [];
  
  // 2. Configurazione Layout (Target: 8-12 players)
  const isSingleColumn = players.length > 0 && players.length <= 6;
  const gridCols = isSingleColumn ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-2';

  return (
    <div className={`relative flex flex-col min-h-0 overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0a0a0a] ${className}`}>
        
        {/* SFONDO CON GLOW (Restaurato stile originale) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Texture diagonale tecnica */}
             <div className="absolute inset-0 opacity-10" 
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 10px)' }}>
            </div>
            {/* Glow centrale colorato sferico - come richiesto */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r ${theme?.primary || 'from-orange-600 to-red-600'} opacity-25 blur-[90px] rounded-full mix-blend-screen`}></div>
        </div>

        {/* HEADER */}
        <div className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/30 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
                <div className={`w-1.5 h-8 bg-gradient-to-b ${theme?.primary || 'from-orange-500 to-red-600'}`}></div>
                <h2 className="text-3xl font-black italic uppercase tracking-[0.15em] text-white drop-shadow-md">
                    Roster
                </h2>
            </div>
            
            {data.coach && (
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em]">Head Coach</span>
                    <span className="text-xl font-bold text-white uppercase tracking-wider leading-none mt-1">{data.coach}</span>
                </div>
            )}
        </div>

        {/* CORPO LISTA */}
        <div className={`relative z-10 flex-1 p-6 flex flex-col ${players.length > 8 ? 'justify-start overflow-y-auto' : 'justify-center overflow-hidden'}`}>
             {/* Grid Container */}
             <div className={`w-full grid ${gridCols} gap-x-8 gap-y-3 auto-rows-min`}>
                {players.map((p, index) => (
                    <PlayerCard 
                        key={index} 
                        number={p.num} 
                        name={p.name} 
                        theme={theme} 
                    />
                ))}

                {players.length === 0 && (
                    <div className="col-span-full py-16 text-center border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                        <span className="text-white/40 text-sm font-mono uppercase tracking-widest">Inserisci lista</span>
                    </div>
                )}
            </div>
        </div>

         {/* FOOTER DECORATIVO (Stile originale) */}
         <div className={`shrink-0 h-1.5 w-full bg-gradient-to-r ${theme?.primary || 'from-orange-600 to-red-600'}`}></div>
    </div>
  );
};

// --- CONTROLS (Standard) ---
export const BasketRosterControls = ({ data, onChange }) => (
  <div className="pt-4 border-t border-gray-100">
     <label className="text-xs font-bold text-gray-500 flex justify-between mb-1">
        <span>LISTA GIOCATORI</span>
        <span className="text-orange-600 text-[10px]">Num Nome (Uno per riga)</span>
    </label>
    <textarea 
        value={data.rosterList || ''} 
        onChange={(e) => onChange('rosterList', e.target.value)} 
        className="w-full p-3 bg-white border rounded-lg text-sm font-mono h-40 resize-none focus:ring-2 focus:ring-orange-500 outline-none leading-relaxed shadow-sm transition-all"
        placeholder={"23 Jordan\n33 Pippen\n91 Rodman"}
    />
     <div className="mt-2">
        <label className="text-[10px] font-bold text-gray-500 uppercase">Head Coach</label>
        <input type="text" value={data.coach || ''} onChange={(e) => onChange('coach', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" placeholder="Coach Phil" />
     </div>
  </div>
);