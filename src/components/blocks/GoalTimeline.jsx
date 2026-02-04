import React from 'react';
import { Goal, Target } from 'lucide-react';

// --- LAYOUT (Visualizzazione Grafica) ---
export const GoalTimeline = ({ data, theme, labels, className = "" }) => {
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
    <div className={`w-full px-5 py-3 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/15 to-white/5 border-2 border-white/30 shadow-2xl ${className}`}>
      {/* Header con titolo */}
      <div className="text-center mb-3 pb-2 border-b border-white/20">
        <h3 className="text-xs font-black text-white uppercase tracking-widest drop-shadow-lg">{labels?.goals || "Gol"}</h3>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {/* Gol Casa */}
        <div className="space-y-2">
          {homeGoals.length > 0 ? (
            homeGoals.map((goal, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-white/10 to-transparent border border-white/20"
              >
                {/* Goal Icon - Target for home */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${theme.primary} flex items-center justify-center shadow-lg`}>
                  <Target size={16} className="text-white drop-shadow-lg" />
                </div>
                
                {/* Goal Info - Single Line */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-extrabold text-yellow-200 drop-shadow-md whitespace-nowrap">{goal.minute}'</span>
                    <span className="text-xs font-black text-white truncate drop-shadow-lg">{goal.player}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-2 px-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs text-white/40 uppercase font-bold">-</span>
            </div>
          )}
        </div>

        {/* Gol Ospiti */}
        <div className="space-y-2">
          {awayGoals.length > 0 ? (
            awayGoals.map((goal, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-l from-white/10 to-transparent border border-white/20"
              >
                {/* Goal Info - Single Line */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 justify-end">
                    <span className="text-xs font-black text-white truncate drop-shadow-lg">{goal.player}</span>
                    <span className="text-xs font-extrabold text-yellow-200 drop-shadow-md whitespace-nowrap">{goal.minute}'</span>
                  </div>
                </div>

                {/* Goal Icon - Ball for away */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${theme.primary} flex items-center justify-center shadow-lg`}>
                  <Goal size={16} className="text-white drop-shadow-lg" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-2 px-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs text-white/40 uppercase font-bold">-</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- CONTROLS (Pannello Editor) ---
export const GoalTimelineControls = ({ data, onChange }) => (
  <div className="pt-4 border-t border-gray-100">
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Cronologia Gol</h3>

    {/* Istruzioni */}
    <p className="text-[10px] text-gray-500 mb-3 italic">
      Formato: minuto' nomegiocatore (uno per riga). Es: 45' Rossi
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
