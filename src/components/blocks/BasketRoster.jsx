import React from 'react';

// --- LAYOUT (Visualizzazione) ---
export const BasketRoster = ({ data, theme, className = "" }) => {
  // Logica di parsing interna al componente (così il template resta pulito)
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

  return (
    <div className={`relative bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col justify-center overflow-hidden flex-1 ${className}`}>
        {/* Etichetta laterale */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center border-r border-white/10 bg-white/5">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 rotate-180" style={{ writingMode: 'vertical-rl' }}>
                Official Roster
            </span>
        </div>
        
        {/* Griglia Giocatori */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 pl-10 pr-4">
            {players.map((p, index) => (
                <div key={index} className="flex items-center gap-4 border-b border-white/10 pb-2">
                    <div className={`text-4xl font-black italic ${theme?.accent || 'text-orange-400'} w-14 text-right tracking-tighter leading-none`}>
                        {p.num}
                    </div>
                    <div className="text-white font-bold uppercase tracking-tight text-xl truncate leading-none pt-1">
                        {p.name}
                    </div>
                </div>
            ))}
             {players.length === 0 && (
                <div className="col-span-2 text-center text-white/30 py-10 font-mono text-sm">
                    Lista vuota...
                </div>
            )}
        </div>

        {/* Coach Footer */}
        <div className="mt-auto pt-6 flex justify-end items-center gap-3 opacity-90 border-t border-white/10 mr-2">
            <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Head Coach</span>
            <span className="text-xl font-black text-white uppercase italic">{data.coach}</span>
        </div>
    </div>
  );
};

// --- CONTROLS (Input) ---
export const BasketRosterControls = ({ data, onChange }) => (
  <div className="pt-4 border-t border-gray-100">
     <label className="text-xs font-bold text-gray-500 flex justify-between mb-1">
        <span>LISTA GIOCATORI</span>
        <span className="text-orange-600 text-[10px]">Num Nome (Uno per riga)</span>
    </label>
    <textarea 
        value={data.rosterList || ''} 
        onChange={(e) => onChange('rosterList', e.target.value)} 
        className="w-full p-3 bg-white border rounded-lg text-sm font-mono h-40 resize-none focus:ring-2 focus:ring-orange-500 outline-none"
        placeholder={"04 Rossi\n10 Bianchi..."}
    />
     <div className="mt-2">
        <label className="text-[10px] font-bold text-gray-500 uppercase">Head Coach</label>
        <input type="text" value={data.coach} onChange={(e) => onChange('coach', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" />
     </div>
  </div>
);