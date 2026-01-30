import React from 'react';

// --- ELEMENTO GIOCATORE (CARD) ---
const PlayerCard = ({ number, name, theme, isCompact }) => (
  <div className={`
      relative group flex items-center gap-4 
      bg-gradient-to-r from-black/60 to-black/20 
      backdrop-blur-md border-l-4 border-white/10
      ${isCompact ? 'py-2 px-3' : 'py-4 px-6'}
      transition-all duration-300
  `}
  style={{ borderColor: theme?.accentColor || '#ea580c' }} // Usa il colore del tema se disponibile, default arancio
  >
    {/* Numero: Grande, Font Impact/Heavy, Colore Accento */}
    <div className={`
        font-black italic tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60
        ${isCompact ? 'text-4xl w-16' : 'text-6xl w-28'} 
        text-right pr-2 py-1
    `}
    style={{ fontFamily: 'Impact, sans-serif' }}
    >
      {number}
    </div>

    {/* Separatore Verticale */}
    <div className={`h-full w-px bg-white/20 ${isCompact ? 'h-8' : 'h-12'}`}></div>

    {/* Nome: Uppercase, Bold */}
    <div className={`
        font-bold uppercase tracking-tight text-white
        ${isCompact ? 'text-lg' : 'text-3xl'}
        truncate
    `}>
      {name}
    </div>
  </div>
);

// --- LAYOUT PRINCIPALE ---
export const BasketRoster = ({ data, theme, className = "" }) => {
  
  // Parser Giocatori
  const parsePlayer = (line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      const firstSpaceIndex = trimmed.indexOf(' ');
      if (firstSpaceIndex === -1) return { num: '', name: trimmed };
      return {
        num: trimmed.substring(0, firstSpaceIndex),
        name: trimmed.substring(firstSpaceIndex + 1)
      };
  };

  const players = data.rosterList ? data.rosterList.split('\n').map(parsePlayer).filter(Boolean) : [];

  // --- LOGICA ELASTICA ---
  // Se sono più di 6, usiamo 2 colonne. Altrimenti 1 colonna centrale massiccia.
  const isGrid = players.length > 6;
  
  // Se sono tantissimi (es. > 10), riduciamo un po' il padding (isCompact)
  const isCompact = players.length > 8;

  return (
    <div className={`relative flex flex-col flex-1 overflow-hidden rounded-3xl border border-white/10 shadow-2xl ${className}`}>
        
        {/* SFONDO TECNICO */}
        <div className="absolute inset-0 z-0 bg-gray-900">
            {/* Pattern a righe diagonali sottili */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 10px)' }}>
            </div>
            {/* Glow centrale colorato in base al tema */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${theme?.primary || 'from-orange-600 to-red-600'} opacity-20 blur-[100px] rounded-full`}></div>
        </div>

        {/* HEADER: ROSTER (SX) - COACH (DX) */}
        <div className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
                {/* Icona decorativa */}
                <div className={`w-1.5 h-8 bg-gradient-to-b ${theme?.primary || 'from-orange-500 to-red-600'}`}></div>
                <h2 className="text-3xl font-black italic uppercase tracking-widest text-white drop-shadow-md">
                    Roster
                </h2>
            </div>
            
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] mb-0.5">Head Coach</span>
                <span className="text-xl font-bold text-white uppercase tracking-wider">{data.coach}</span>
            </div>
        </div>

        {/* CORPO: LISTA GIOCATORI */}
        <div className="relative z-10 flex-1 p-6 flex items-center justify-center">
            
            <div className={`
                w-full grid gap-4
                ${isGrid ? 'grid-cols-2 content-start' : 'grid-cols-1 max-w-2xl content-center'}
            `}>
                {players.map((p, index) => (
                    <PlayerCard 
                        key={index} 
                        number={p.num} 
                        name={p.name} 
                        theme={theme} 
                        isCompact={isCompact} 
                    />
                ))}

                {players.length === 0 && (
                    <div className="col-span-2 text-center text-white/30 py-20 font-mono text-sm border-2 border-dashed border-white/10 rounded-xl">
                        Inserisci la lista giocatori...
                    </div>
                )}
            </div>

        </div>

        {/* FOOTER DECORATIVO (Opzionale, barra sottile) */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${theme?.primary || 'from-orange-600 to-red-600'}`}></div>

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
        className="w-full p-3 bg-white border rounded-lg text-sm font-mono h-40 resize-none focus:ring-2 focus:ring-orange-500 outline-none leading-relaxed shadow-sm"
        placeholder={"23 Jordan\n33 Pippen\n91 Rodman"}
    />
     <div className="mt-2">
        <label className="text-[10px] font-bold text-gray-500 uppercase">Head Coach</label>
        <input type="text" value={data.coach} onChange={(e) => onChange('coach', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" placeholder="Coach Phil" />
     </div>
  </div>
);