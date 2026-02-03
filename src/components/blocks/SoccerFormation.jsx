import React from 'react';

// --- CONFIGURAZIONE MODULI CALCIO A 7 ---
const FORMATIONS_7V7 = {
  '3-2-1': [3, 2, 1],
  '2-3-1': [2, 3, 1],
  '3-1-2': [3, 1, 2],
  '2-2-2': [2, 2, 2],
  '3-3':   [3, 3],
  '1-4-1': [1, 4, 1]
};

// --- MARKER GIOCATORE (CAMPO) ---
const FieldPlayer = ({ number, name, theme }) => (
  <div className="flex flex-col items-center justify-center group relative z-10">
    {/* Cerchio/Card */}
    <div 
      className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border-l-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md bg-gradient-to-br from-gray-900/90 to-gray-800/60 transition-transform hover:scale-110"
      style={{ borderColor: theme?.accentColor || '#10b981' }} 
    >
        <span className="text-3xl md:text-4xl font-black italic text-white tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
            {number}
        </span>
    </div>
    
    {/* Nome - MODIFICATO PER ESSERE PIÙ GRANDE */}
    {/* max-w aumentato a 170px per far stare nomi più lunghi */}
    <div className="mt-2 px-4 py-1.5 bg-black/70 backdrop-blur-sm border border-white/10 rounded text-center max-w-[170px] shadow-sm">
        {/* Font passato da text-xs (12px) a text-sm (14px) e text-sm (14px) a text-base (16px) */}
        <span className="text-sm md:text-base font-bold text-white uppercase tracking-wider block truncate leading-tight">
            {name}
        </span>
    </div>
  </div>
);

// --- MARKER PANCHINA (LISTA) ---
const BenchPlayer = ({ number, name, theme }) => (
  <div className="flex items-center gap-3 p-2 border-b border-white/10 last:border-0">
      <div className="text-xl font-black italic text-white/50 w-6 text-right" style={{ fontFamily: 'Impact, sans-serif' }}>
        {number}
      </div>
      {/* Anche qui ho aumentato leggermente il font base */}
      <div className="text-base font-bold text-white uppercase tracking-wide truncate">
        {name}
      </div>
  </div>
);

// --- LAYOUT PRINCIPALE ---
export const SoccerFormation = ({ data, theme, className = "" }) => {
  
  // 1. Parser
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

  const allPlayers = data.rosterList ? data.rosterList.split('\n').map(parsePlayer).filter(Boolean) : [];
  
  // 2. Divisione Titolari (7) vs Panchina (Resto)
  const starters = allPlayers.slice(0, 7);
  const bench = allPlayers.slice(7);

  // 3. Logica Modulo
  const currentModule = data.module || '3-2-1';
  const schema = FORMATIONS_7V7[currentModule] || FORMATIONS_7V7['3-2-1'];
  
  const gk = starters[0]; 
  const fieldPlayers = starters.slice(1); 
  
  let currentIndex = 0;
  const tacticalRows = schema.map(count => {
      const rowPlayers = fieldPlayers.slice(currentIndex, currentIndex + count);
      currentIndex += count;
      return rowPlayers;
  });

  return (
    <div className={`relative flex flex-col flex-1 overflow-hidden rounded-3xl border border-white/10 shadow-2xl ${className}`}>
        
        {/* HEADER */}
        <div className="relative z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/90 to-black/40 border-b border-white/10">
             <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded bg-gradient-to-r ${theme?.primary || 'from-emerald-600 to-green-600'} text-white font-black italic text-xl shadow-lg border border-white/20`}>
                    {currentModule}
                </div>
                <span className="text-white/80 font-bold uppercase tracking-widest text-xs md:text-sm">Starting VII</span>
            </div>
            
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] mb-0.5">Mister</span>
                <span className="text-lg font-bold text-white uppercase tracking-wider">{data.coach}</span>
            </div>
        </div>

        {/* CORPO: CAMPO + PANCHINA */}
        <div className="relative z-10 flex-1 flex">
            
            {/* --- COLONNA SX: CAMPO (75%) --- */}
            <div className="flex-1 relative border-r border-white/10">
                {/* Sfondo Campo */}
                <div className="absolute inset-0 z-0 bg-emerald-950">
                    <div className="absolute inset-0 opacity-30" 
                        style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.05) 49px, rgba(255,255,255,0.05) 50px)` }}>
                    </div>
                    {/* Linee Tattiche */}
                    <div className="absolute inset-2 border-2 border-white/10 rounded-lg"></div>
                    <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-white/10"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/10 rounded-full"></div>
                    
                    {/* Vignetta */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
                </div>

                {/* Griglia Giocatori */}
                <div className="relative z-10 h-full flex flex-col-reverse justify-between py-10 px-6">
                    {/* Portiere */}
                    <div className="flex justify-center w-full">
                        {gk ? <FieldPlayer number={gk.num} name={gk.name} theme={theme} /> : <span className="text-xs text-white/20">GK...</span>}
                    </div>

                    {/* Righe Movimento */}
                    {tacticalRows.map((row, idx) => (
                        <div key={idx} className="flex justify-evenly items-center w-full">
                            {row.map((p, pIdx) => (
                                <FieldPlayer key={pIdx} number={p.num} name={p.name} theme={theme} />
                            ))}
                        </div>
                    ))}
                    <div className="h-2"></div>
                </div>
            </div>

            {/* --- COLONNA DX: PANCHINA (25%) --- */}
            <div className="w-1/4 max-w-[250px] bg-black/40 backdrop-blur-xl flex flex-col">
                <div className="px-4 py-3 bg-white/5 border-b border-white/10">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Bench</span>
                </div>
                
                <div className="flex-1 p-4 space-y-2 overflow-hidden">
                    {bench.length > 0 ? bench.map((p, idx) => (
                        <BenchPlayer key={idx} number={p.num} name={p.name} theme={theme} />
                    )) : (
                        <div className="text-center text-white/20 text-xs italic mt-10">Nessuna riserva</div>
                    )}
                </div>
            </div>

        </div>
    </div>
  );
};

// --- CONTROLS ---
export const SoccerFormationControls = ({ data, onChange }) => (
  <div className="pt-4 border-t border-gray-100">
     
     {/* Modulo */}
     <div className="mb-4">
        <label className="text-xs font-bold text-gray-500 block mb-1">MODULO (Calcio a 7)</label>
        <div className="grid grid-cols-3 gap-2">
            {Object.keys(FORMATIONS_7V7).map(mod => (
                <button 
                    key={mod}
                    onClick={() => onChange('module', mod)}
                    className={`p-2 text-xs font-bold rounded border transition-all ${data.module === mod ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400'}`}
                >
                    {mod}
                </button>
            ))}
        </div>
     </div>

     {/* Textarea */}
     <label className="text-xs font-bold text-gray-500 flex justify-between mb-1">
        <span>CONVOCATI</span>
        <span className="text-emerald-600 text-[10px]">Primi 7 = Titolari</span>
    </label>
    <textarea 
        value={data.rosterList || ''} 
        onChange={(e) => onChange('rosterList', e.target.value)} 
        className="w-full p-3 bg-white border rounded-lg text-sm font-mono h-48 resize-none focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed shadow-sm"
        placeholder={"1 Buffon (GK)\n3 Maldini\n...\n-- Panchina --\n10 Del Piero\n9 Inzaghi"}
    />
     <div className="mt-2">
        <label className="text-[10px] font-bold text-gray-500 uppercase">Allenatore</label>
        <input type="text" value={data.coach} onChange={(e) => onChange('coach', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" placeholder="Mister Rossi" />
     </div>
  </div>
);