import React from 'react';
import { ListOrdered } from 'lucide-react';

/**
 * Blocco generico per la classifica.
 * Supporta qualsiasi sport che abbia una lista di squadre con punti/statistiche.
 * 
 * Props:
 * - showDraws: (bool) Mostra colonna pareggi. Default: true
 * - showAverages: (bool) Mostra colonne medie (PF/PS). Default: false
 * - labels: (obj) Sovrascrittura etichette colonne { points, played, won, drawn, lost, scored, conceded }
 */
export const TeamsRanking = ({ 
  data, 
  theme, 
  className = "",
  columnsString = "V • Vittorie  P • Perse  S • Pari",
  showDraws = true,
  showAverages = false,
  labels = {}
}) => {
  // Default Labels
  const L = {
     points: "PT",
     played: "G",
     won: "V",
     drawn: "P",
     lost: "S",
     scored: "PF",
     conceded: "PS",
     ...labels 
  };

  // Determine Grid Columns Logic
  // Base: Rank(4rem) Team(1fr) Points(5rem) Played(3rem) Won(3rem)
  // Optional: Drawn(3rem), Lost(3rem) - Lost is usually always shown but let's assume base structure.
  
  // Let's build the grid template string dynamically
  let gridCols = "4rem 1fr 5rem 3rem 3rem"; // # Team PT G V
  if (showDraws) gridCols += " 3rem"; // P
  gridCols += " 3rem"; // S (Lost) is standard
  if (showAverages) gridCols += " 4rem 4rem"; // PF PS (larger for decimals/hundreds)

  return (
    <div className={`flex flex-col h-full w-full relative ${className}`}>
    {/* Table Container con effetto Glassmorphism Spinto */}
        <div className={`flex-1 overflow-hidden rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl relative flex flex-col ${theme.bg === 'bg-white' ? 'bg-black/90' : 'bg-black/40'}`}>
          
          {/* Table Header Wrapper */}
          <div className="p-1 bg-white/5 border-b border-white/10">
            <div 
                className="grid gap-2 p-3 text-sm font-black tracking-widest uppercase opacity-80"
                style={{ gridTemplateColumns: gridCols }}
            >
                <div className="text-center text-lg">#</div>
                <div className="text-left pl-2 text-lg">Squadra</div>
                <div className="text-center bg-white/20 rounded shadow-inner text-white text-lg">{L.points}</div>
                <div className="text-center opacity-60 text-lg">{L.played}</div>
                <div className="text-center opacity-60 text-green-400 text-lg">{L.won}</div>
                {showDraws && <div className="text-center opacity-60 text-yellow-400 text-lg">{L.drawn}</div>}
                <div className="text-center opacity-60 text-red-400 text-lg">{L.lost}</div>
                
                {showAverages && (
                <>
                  <div className="text-center opacity-60 text-cyan-400 text-lg">{L.scored}</div>
                  <div className="text-center opacity-60 text-orange-400 text-lg">{L.conceded}</div>
                </>
                )}
            </div>
          </div>

          {/* Table Body - Flexible List */}
        <div className="overflow-y-auto flex-1 remove-scrollbar p-1">
          {data.ranking && data.ranking.length > 0 ? (
            data.ranking.map((team, index) => {
              const isHighlighted = data.highlightTeam === team.name;
              const isTop3 = index < 3;
              
              // Calcolo medie se necessario (solo se giocate > 0)
              const avgScored = showAverages && team.played > 0 
                    ? (team.scored / team.played).toFixed(1) 
                    : "0.0";
              const avgConceded = showAverages && team.played > 0 
                    ? (team.conceded / team.played).toFixed(1) 
                    : "0.0";

              return (
                <div 
                  key={team.id || index} 
                  className={`
                    grid gap-2 items-center 
                    py-3 px-2 border-b border-white/5 transition-all mb-1 rounded-xl
                    ${isHighlighted 
                        ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg relative z-10 border border-white/20` 
                        : 'hover:bg-white/5 text-white/90'
                    }
                  `}
                  style={{ gridTemplateColumns: gridCols }}
                >
                  {/* Rank Badge */}
                  <div className="flex justify-center">
                      <div className={`
                        flex items-center justify-center w-9 h-9 rounded-full font-mono text-xl font-bold
                        ${isTop3 && !isHighlighted 
                            ? 'bg-white text-black shadow-white/50 shadow-md' 
                            : isHighlighted 
                                ? 'bg-white text-black' 
                                : 'bg-white/10 text-white/50'
                        }
                      `}>
                        {index + 1}
                      </div>
                  </div>
                  
                  {/* Team Name - BIGGER & BOLDER */}
                  <div className="pl-2 pr-2 font-black uppercase tracking-tight text-2xl truncate flex items-center gap-2 drop-shadow-sm">
                     {team.name}
                     {isTop3 && !isHighlighted && (
                        <span className="text-[9px] bg-yellow-400 text-black px-1.5 py-0.5 rounded font-black tracking-tighter self-start mt-1">
                            TOP
                        </span>
                     )}
                  </div>

                  {/* Points - HUGE */}
                  <div className={`text-center font-black text-3xl tracking-tighter filter drop-shadow-md ${isHighlighted ? 'scale-110' : 'text-white'}`}>
                    {team.points}
                  </div>

                  {/* Stats */}
                  <div className="text-center font-mono opacity-80 text-xl font-bold">{team.played}</div>
                  <div className="text-center font-mono opacity-60 text-lg">{team.won}</div>
                  {showDraws && <div className="text-center font-mono opacity-60 text-lg">{team.drawn}</div>}
                  <div className="text-center font-mono opacity-60 text-lg">{team.lost}</div>

                  {/* Averages */}
                  {showAverages && (
                    <>
                       <div className="text-center font-mono font-bold text-lg tracking-tight">{avgScored}</div>
                       <div className="text-center font-mono opacity-80 text-lg tracking-tight">{avgConceded}</div>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-50 p-10 text-center gap-4 text-white">
                <ListOrdered size={64} className="opacity-20" />
                <div>
                    <p className="text-2xl font-bold">Nessun dato</p>
                    <p className="text-base">Importa la classifica dai controlli</p>
                </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Legend */}
      <div className="mb-2 px-6 flex justify-between items-center opacity-70 mt-3 text-white">
         <div className="flex gap-4 text-[11px] uppercase tracking-wider font-bold">
            {columnsString}
         </div>
         <div className="text-right">
            <p className="font-bold text-xs uppercase tracking-widest text-white/80">{data.season}</p>
         </div>
      </div>
    </div>
  );
};

// --- Controls Generic ---
export const TeamsRankingControls = ({ data, onChange }) => {
    return (
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Evidenzia Squadra</label>
              <select 
                  className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-lg"
                  value={data.highlightTeam}
                  onChange={(e) => onChange('highlightTeam', e.target.value)}
              >
                  <option value="">Nessuna selezione</option>
                  {data.ranking && data.ranking.map((t, i) => (
                      <option key={t.id || i} value={t.name}>{t.name}</option>
                  ))}
              </select>
        </div>
    );
};
