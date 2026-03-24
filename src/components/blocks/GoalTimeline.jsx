import React from 'react';
import { Goal, Target } from 'lucide-react';

// --- LAYOUT (Visualizzazione Grafica) ---
export const GoalTimeline = ({ data, theme, className = "" }) => {
  const labelGoals = data.labelGoals || "Gol";
  // Parsing goals: "45' Rossi\n67' Bianchi" → [{minute: "45", player: "Rossi"}, ...]
  const parseGoals = (goalsText) => {
    if (!goalsText || !goalsText.trim()) return [];
    return goalsText
      .split('\n')
      .map(line => {
        const match = line.match(/^(\d+)['']?\s+(.+)$/);
        if (match) {
          return { minute: match[1], player: match[2].trim() };
        }
        return null;
      })
      .filter(Boolean);
  };

  const homeGoals = parseGoals(data.homeGoals);
  const awayGoals = parseGoals(data.awayGoals);

  if (homeGoals.length === 0 && awayGoals.length === 0) {
    return null; // Non mostrare timeline se non ci sono gol
  }

  return (
    <div className={`w-full px-12 ${className}`}>
      <div className="grid grid-cols-2 gap-16 relative">
        {/* Central Vertical Decorative Line */}
        <div className="absolute left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

        {/* Gol Casa */}
        <div className="space-y-6">
          {homeGoals.length > 0 && homeGoals.map((goal, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-6"
            >
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-xl relative overflow-hidden group`}>
                <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${theme.primary} opacity-20`} />
                <span className={`text-2xl font-black italic ${theme.accent} drop-shadow-md`}>
                  {goal.minute}
                  <span className="text-xs ml-0.5">'</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white uppercase tracking-tight drop-shadow-2xl leading-none">
                  {goal.player}
                </span>
                <div className={`h-1.5 w-12 mt-2 rounded-full bg-gradient-to-r ${theme.primary} opacity-40`} />
              </div>
            </div>
          ))}
        </div>

        {/* Gol Ospiti */}
        <div className="space-y-6">
          {awayGoals.length > 0 && awayGoals.map((goal, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-end gap-6 text-right"
            >
              <div className="flex flex-col items-end">
                <span className="text-3xl font-black text-white uppercase tracking-tight drop-shadow-2xl leading-none">
                  {goal.player}
                </span>
                <div className={`h-1.5 w-12 mt-2 rounded-full bg-gradient-to-l ${theme.primary} opacity-40`} />
              </div>
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-xl relative overflow-hidden group`}>
                <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${theme.primary} opacity-20`} />
                <span className={`text-2xl font-black italic ${theme.accent} drop-shadow-md`}>
                  {goal.minute}
                  <span className="text-xs ml-0.5">'</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- CONTROLS (Pannello Editor) ---
export const GoalTimelineControls = ({ data, onChange }) => (
  <div className="py-4 border-b border-gray-100 last:border-0">
    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
      <Goal size={14} className="text-gray-300" />
      Marcatori
    </h3>

    {/* Istruzioni */}
    <p className="text-[10px] text-gray-400 mb-3 italic bg-gray-50 p-2 rounded-lg border border-gray-100">
      Formato: <span className="font-bold text-gray-600">minuto' nome</span> (uno per riga).<br/>
      Esempio: <span className="font-mono text-[9px] bg-white px-1 border rounded">45' Rossi</span>
    </p>

    <div className="grid grid-cols-2 gap-3">
      {/* Gol Casa */}
      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">{data.homeTeam || 'Casa'} - Gol</label>
        <textarea
          value={data.homeGoals || ''}
          onChange={(e) => onChange('homeGoals', e.target.value)}
          className="w-full p-2 bg-gray-50 border rounded-lg text-xs font-mono resize-none h-24"
          placeholder="45' Rossi&#10;67' Bianchi"
        />
      </div>

      {/* Gol Ospiti */}
      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">{data.awayTeam || 'Ospiti'} - Gol</label>
        <textarea
          value={data.awayGoals || ''}
          onChange={(e) => onChange('awayGoals', e.target.value)}
          className="w-full p-2 bg-gray-50 border rounded-lg text-xs font-mono resize-none h-24"
          placeholder="23' Verdi&#10;89' Neri"
        />
      </div>
    </div>
  </div>
);
