import React from 'react';
import { ListOrdered, FileText, RefreshCw } from 'lucide-react';
import ControlSection from '../ui/ControlSection';
import { Input, Select, TextArea } from '../ui/EditorFields';
import { parseManualRanking } from '../../utils/rankingUtils';

/**
 * Blocco generico per la classifica.
 * Supporta qualsiasi sport delegando la logica del layout a rankingFormat.
 * 
 * Props:
 * - rankingFormat: (obj) Configurazione del formato (colonne, labels, etc)
 * - showDraws: (bool) Override UI per pareggi
 * - showAverages: (bool) Override UI per medie
 * - showStats: (bool) Mostra o nasconde le statistiche (G V P S)
 */
export const TeamsRanking = ({ 
  data, 
  theme, 
  className = "",
  rankingFormat,
  showDraws: propShowDraws,
  showAverages: propShowAverages,
  showStats = true
}) => {
  if (!rankingFormat) {
     return <div className="p-4 text-white opacity-50">Ranking Format non definito.</div>;
  }

  // Derive display flags from format if not overridden
  const showDraws = propShowDraws ?? rankingFormat.showDraws;
  const showAverages = propShowAverages ?? rankingFormat.showAverages;

  // Derive Labels directly from the format configuration
  const L = rankingFormat.columns.reduce((acc, col) => ({ ...acc, [col.key]: col.label }), {});

  // Determine Grid Columns Logic based on format columns
  // Rank(4rem) + Team(1fr) + Points(5rem) + Stats + Averages
  let gridCols = "4rem 1fr 5rem"; 
  
  if (showStats) {
      rankingFormat.columns.forEach(col => {
          if (col.isStat) {
             if (col.key === 'drawn' && !showDraws) return;
             gridCols += " 3rem";
          }
      });
  }

  if (showAverages) {
      rankingFormat.columns.forEach(col => {
          if (col.isAverage) gridCols += " 4.5rem"; // slightly larger for averages
      });
  }

  const columnsString = rankingFormat.columns.map(c => `${c.label} • ${c.key.charAt(0).toUpperCase() + c.key.slice(1)}`).join('  ');

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
                <div className="text-center bg-white/20 rounded shadow-inner text-white text-lg">{L.points || 'PT'}</div>
                
                {showStats && rankingFormat.columns.filter(c => c.isStat).map(col => {
                   if (col.key === 'drawn' && !showDraws) return null;
                   const colorMap = { won: 'text-green-400', drawn: 'text-yellow-400', lost: 'text-red-400' };
                   return (
                     <div key={col.key} className={`text-center opacity-60 text-lg ${colorMap[col.key] || ''}`}>{col.label}</div>
                   );
                })}
                
                {showAverages && rankingFormat.columns.filter(c => c.isAverage).map(col => {
                   const colorMap = { scored: 'text-cyan-400', conceded: 'text-orange-400' };
                   return (
                     <div key={col.key} className={`text-center opacity-60 text-lg ${colorMap[col.key] || ''}`}>{col.label}</div>
                   );
                })}
            </div>
          </div>

          {/* Table Body - Flexible List */}
        <div className="overflow-y-auto flex-1 remove-scrollbar p-1">
          {data.ranking && data.ranking.length > 0 ? (
            data.ranking.map((team, index) => {
              const isHighlighted = data.highlightTeam === team.name;
              const isTop3 = index < 3;
              
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
                  {showStats && rankingFormat.columns.filter(c => c.isStat).map(col => {
                     if (col.key === 'drawn' && !showDraws) return null;
                     return (
                        <div key={col.key} className="text-center font-mono opacity-80 text-xl font-bold">{team[col.key]}</div>
                     );
                  })}

                  {/* Averages */}
                  {showAverages && rankingFormat.columns.filter(c => c.isAverage).map(col => {
                     const val = team[col.key] || 0;
                     const displayVal = typeof val === 'number' && val < 50 ? val.toFixed(1) : val;
                     return (
                        <div key={col.key} className="text-center font-mono font-bold text-lg tracking-tight">{displayVal}</div>
                     );
                  })}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-50 p-10 text-center gap-4 text-white">
                <ListOrdered size={64} className="opacity-20" />
                <div>
                    <p className="text-2xl font-bold">Nessun dato</p>
                    <p className="text-base">Inserisci i dati dai controlli</p>
                </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Legend */}
      <div className="mb-2 px-6 flex justify-between items-center opacity-70 mt-3 text-white">
         <div className="flex gap-4 text-[11px] uppercase tracking-wider font-bold truncate pr-4">
            {rankingFormat.columnsString || columnsString}
         </div>
         <div className="text-right whitespace-nowrap">
            <p className="font-bold text-xs uppercase tracking-widest text-white/80">{data.season}</p>
         </div>
      </div>
    </div>
  );
};

// --- TeamsRankingControls ---
export const TeamsRankingControls = ({ data, onChange, rankingFormat }) => {
    // rankingSync now expects just the hook function or null
    const useRankingHook = data.rankingSync;
    const hasSync = typeof useRankingHook === 'function';

    // Hook execution (condizionale via componente shell o interno)
    const rankingState = hasSync ? useRankingHook() : { classifica: [], loading: false, refresh: () => {} };
    const { classifica: syncData, loading, refresh } = rankingState;

    const handleSync = () => {
      refresh(); // Ricarica dati dal web
      if (syncData && syncData.length > 0) {
        onChange('ranking', syncData);
        onChange('isManual', false);
      }
    };

    const handleManualChange = (val) => {
      onChange('manualText', val);
      const parsed = parseManualRanking(val, { rankingFormat });
      
      // Extract only the ranking array from the parser results
      onChange('ranking', parsed.ranking);
      
      // Auto-update toggles based on detected columns in text
      onChange('showStats', parsed.hasStats);
      onChange('showAverages', parsed.hasAverages);
    };

    const formatLabels = rankingFormat?.columns.map(f => f.label).join(' ') || "";
    const formatPlaceholders = rankingFormat?.columns.map(f => f.placeholder).join(' ') || "";

    return (
        <div className="space-y-4">
            <ControlSection title="Parametri Classifica" icon={ListOrdered}>
                <div className="flex gap-3 not-italic -mt-1">
                    <Input 
                        label="Stagione"
                        value={data.season || ''} 
                        onChange={(e) => onChange('season', e.target.value)} 
                        placeholder="2025/26"
                    />
                    <Select 
                        label="Evidenzia Squadra"
                        value={data.highlightTeam}
                        onChange={(e) => onChange('highlightTeam', e.target.value)}
                    >
                        <option value="">Nessuna</option>
                        {data.ranking && data.ranking.map((t, i) => (
                            <option key={t.id || i} value={t.name}>{t.name}</option>
                        ))}
                    </Select>
                </div>
            </ControlSection>

            <ControlSection 
               title="Importazione Dati" 
               icon={FileText}
               extra={hasSync && (
                   <button 
                       onClick={handleSync}
                       disabled={loading}
                       className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                           loading ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-white/20 text-white hover:bg-white/30 active:scale-95'
                       }`}
                   >
                       <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                       {loading ? 'Sincronizzazione...' : 'Sincronizza Web'}
                   </button>
               )}
            >
                <div className="mt-2">
                    <TextArea 
                        label={`Classifica Manuale (Nome ${formatLabels})`}
                        value={data.manualText || ''}
                        onChange={(e) => handleManualChange(e.target.value)}
                        placeholder={`Inserisci dati... es: Team ${formatPlaceholders}`}
                        rows={6}
                        className="font-mono text-xs leading-relaxed"
                    />
                    <p className="text-[10px] opacity-40 mt-2 italic px-1">
                        Incolla il testo direttamente dal sito dei risultati. Il parser riconoscerà automaticamente le colonne.
                    </p>
                </div>
            </ControlSection>
        </div>
    );
};
