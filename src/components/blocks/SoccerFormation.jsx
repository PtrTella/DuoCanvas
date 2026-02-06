import React from 'react';
import { Layout, Users, ClipboardList } from 'lucide-react';

// --- CONFIGURAZIONE MODULI CALCIO A 7 ---
const FORMATIONS_7V7 = {
  '3-2-1': [3, 2, 1],
  '2-3-1': [2, 3, 1],
  '3-1-2': [3, 1, 2],
  '2-2-2': [2, 2, 2],
  '3-3':   [3, 3],
  '1-4-1': [1, 4, 1]
};

// --- STILI COMUNI ---
const IMPACT_FONT = { fontFamily: 'Impact, sans-serif' };

// --- SOTTO-COMPONENTI UI ---

const FieldPlayer = ({ number, name, theme }) => (
  <div className="flex flex-col items-center justify-center group relative z-10">
    <div 
      className="w-24 h-24 md:w-24 md:h-24 flex items-center justify-center rounded-2xl border-l-4 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md bg-gradient-to-br from-gray-900/95 to-gray-800/70 transition-transform hover:scale-110"
      style={{ borderColor: theme?.hex || '#10b981' }} 
    >
        <span className="text-3xl md:text-4xl font-black italic text-white tracking-tighter" style={IMPACT_FONT}>
            {number}
        </span>
    </div>
    
    <div className="mt-1.5 px-4 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg text-center max-w-[220px] shadow-xl">
        <span className="text-sm md:text-base font-black text-white uppercase tracking-wider block truncate leading-tight">
            {name}
        </span>
    </div>
  </div>
);

const BenchPlayer = ({ number, name, theme }) => (
  <div 
    className="flex items-center gap-5 py-3.5 px-5 mb-2.5 bg-[#141414] border-l-[6px] relative overflow-hidden group hover:bg-white/10 transition-all shadow-lg"
    style={{ borderLeftColor: theme?.hex || '#10b981' }}
  >
      <div className="text-2xl font-black italic text-white/90 w-10 text-right shrink-0 drop-shadow-md" style={IMPACT_FONT}>
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-2xl font-black text-white uppercase tracking-tight truncate leading-tight">
          {name}
        </span>
      </div>
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-y-0 left-0 w-1 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

const SoccerField = () => (
    <div className="absolute inset-0 z-0 bg-[#064e3b]">
        {/* Stripe pattern (Grass cut) */}
        <div className="absolute inset-0 opacity-20" 
            style={{ 
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(0,0,0,0.2) 80px, rgba(0,0,0,0.2) 160px)` 
            }} 
        />
        
        {/* Fine texture for grass realism */}
        <div className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                backgroundSize: '5px 5px'
            }}
        />

        {/* Linee Tattiche */}
        <div className="absolute inset-4 border-2 border-white/20 rounded-lg" />
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white/20 rounded-full" />
        
        {/* Area di rigore alta-bassa */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1/2 h-24 border-x-2 border-b-2 border-white/10 rounded-b-xl" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-24 border-x-2 border-t-2 border-white/10 rounded-t-xl" />
        
        {/* Vignetta per profondità */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
    </div>
);

// --- HELPER LOGICA ---
const parseRoster = (text) => {
    if (!text) return [];
    return text.split('\n').map(line => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        const firstSpace = trimmed.indexOf(' ');
        if (firstSpace === -1) return { num: '', name: trimmed };
        return {
            num: trimmed.substring(0, firstSpace),
            name: trimmed.substring(firstSpace + 1)
        };
    }).filter(Boolean);
};

// --- LAYOUT PRINCIPALE ---
export const SoccerFormation = ({ data, theme, className = "" }) => {
  const { teamFormation, module, mister, labelMister = "Allenatore", labelBench = "Panchina" } = data;
  
  const allPlayers = parseRoster(teamFormation);
  const starters = allPlayers.slice(0, 7);
  const bench = allPlayers.slice(7);

  const currentModule = module || '3-2-1';
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
    <div className={`relative flex flex-col h-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-white/5 backdrop-blur-md ${className}`}>
        
        {/* HEADER */}
        <div className="relative z-20 flex items-center justify-between px-6 py-3 bg-black/50 border-b border-white/10 backdrop-blur-md">
             <div className="flex items-center gap-6">
                {/* Modulo e Titolari */}
                <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded bg-gradient-to-r ${theme?.primary || 'from-emerald-600 to-green-600'} text-white font-black italic text-xl shadow-lg border border-white/20 text-center min-w-[80px]`}>
                        {currentModule}
                    </div>
                    <span className="text-white font-black uppercase tracking-[0.1em] text-base md:text-lg">Titolari</span>
                </div>

                {/* Separatore Verticale */}
                <div className="w-px h-8 bg-white/30 hidden md:block"></div>

                {/* Allenatore Spostato qui e affiancato */}
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.1em]">{labelMister}:</span>
                    <span className="text-lg font-black text-white uppercase tracking-wider leading-none">{mister || '---'}</span>
                </div>
            </div>
            
            {/* Titolo Panchina in alto a DX */}
            <div className="flex flex-col items-end">
                <span className="text-base md:text-lg font-black text-white uppercase tracking-[0.2em]">{labelBench}</span>
            </div>
        </div>

        {/* CORPO: CAMPO + PANCHINA */}
        <div className="relative z-10 flex-1 flex min-h-0">
            
            {/* --- COLONNA SX: CAMPO (65%) --- */}
            <div className="w-[65%] relative border-r border-white/20">
                <SoccerField />

                {/* Griglia Giocatori */}
                <div className="relative z-10 h-full flex flex-col-reverse justify-between py-8 px-8">
                    {/* Portiere */}
                    <div className="flex justify-center w-full min-h-[110px] items-center">
                        {gk ? (
                            <FieldPlayer number={gk.num} name={gk.name} theme={theme} />
                        ) : (
                            <div className="w-16 h-16 rounded-full border-4 border-white/10 flex items-center justify-center text-lg font-black text-white/20 uppercase tracking-tighter" style={IMPACT_FONT}>GK</div>
                        )}
                    </div>

                    {/* Righe Movimento */}
                    {tacticalRows.map((row, idx) => (
                        <div key={idx} className="flex justify-evenly items-center w-full min-h-[110px]">
                            {row.length > 0 && row.map((p, pIdx) => (
                                <FieldPlayer key={pIdx} number={p.num} name={p.name} theme={theme} />
                            ))}
                        </div>
                    ))}
                    <div className="h-2" />
                </div>
            </div>

            {/* --- COLONNA DX: PANCHINA (35%) --- */}
            <div className="flex-1 max-w-[400px] bg-black/60 backdrop-blur-2xl flex flex-col">
                {/* Header rimosso per dare spazio a più giocatori */}
                <div className="flex-1 p-5 space-y-1 overflow-y-auto">
                    {bench.length > 0 ? (
                        bench.map((p, idx) => <BenchPlayer key={idx} number={p.num} name={p.name} theme={theme} />)
                    ) : (
                        <div className="text-center text-white/20 text-xs font-black uppercase tracking-widest mt-16 p-6 border border-white/5 rounded-2xl mx-4">
                            Nessuna<br/>riserva
                        </div>
                    )}
                </div>
            </div>

        </div>
    </div>
  );
};

// --- CONTROLS ---

const ControlSection = ({ title, icon: Icon, children, description, className = "not-italic mb-4" }) => (
    <div className={className}>
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            {Icon && <Icon size={14} className="text-gray-300" />}
            {title}
        </h3>
        {description && (
            <p className="text-[10px] text-gray-400 mb-3 italic bg-gray-50 p-2 rounded-lg border border-gray-100">
                {description}
            </p>
        )}
        {children}
    </div>
);

export const SoccerFormationControls = ({ data, onChange }) => (
  <div className="py-4 border-b border-gray-100 last:border-0 italic">
     
     <ControlSection title="Schema Tattico" icon={Layout}>
        <div className="grid grid-cols-3 gap-2">
            {Object.keys(FORMATIONS_7V7).map(mod => (
                <button 
                    key={mod}
                    onClick={() => onChange('module', mod)}
                    className={`p-2 text-xs font-bold rounded-xl border-2 transition-all ${data.module === mod ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'}`}
                >
                    {mod}
                </button>
            ))}
        </div>
     </ControlSection>

     <ControlSection 
        title="Rosa Convocati" 
        icon={Users}
        description={<>I <span className="font-bold text-gray-600">primi 7</span> in lista appariranno in campo come titolari.</>}
     >
        <textarea 
            value={data.teamFormation || ''} 
            onChange={(e) => onChange('teamFormation', e.target.value)} 
            className="w-full p-3 bg-gray-50/50 border rounded-2xl text-xs font-mono h-48 resize-none focus:bg-white focus:border-gray-900 transition-all outline-none leading-relaxed"
            placeholder={"1 Voda\n4 Gentilini\n..."}
        />
     </ControlSection>
     
     <ControlSection title="Staff" icon={ClipboardList} className="mt-4 not-italic">
        <input 
            type="text" 
            value={data.mister || ''} 
            onChange={(e) => onChange('mister', e.target.value)} 
            className="w-full p-3 bg-gray-50/50 border rounded-xl text-xs transition-all focus:bg-white focus:border-gray-900" 
            placeholder="Mister / Allenatore" 
        />
     </ControlSection>
  </div>
);
