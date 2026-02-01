import React, { useEffect } from 'react';
import { ListOrdered, RefreshCw } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo } from '../components/blocks/MatchInfo';
import { useClassifica } from '../hooks/useCsi';

export const BasketRanking = {
  id: 'basket_ranking',
  name: 'Classifica Basket',
  icon: ListOrdered,
  defaultTheme: 'orange',

  Render: ({ data, theme, cardRef }) => {
    // Adattiamo i dati per MatchInfo: 
    // matchDay -> "CLASSIFICA"
    // championship -> leagueName + season
    const headerData = {
        matchDay: "CLASSIFICA", // Scritta fissa grande
        championship: `${data.leagueName} - ${data.season}` // Sottotitolo
    };

    return (
      <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full relative z-10 gap-4">
            
          {/* Header standard MatchInfo */}
          <MatchInfo 
                data={headerData} 
                theme={theme} 
                matchDayLabel="" // Nascondiamo "MATCH DAY" sopra il titolo grande
            /> 

          <div className="flex-1 w-full relative px-6 py-4">
            {/* Table Container con effetto Glassmorphism più spinto */}
            <div className={`h-full overflow-hidden rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl relative flex flex-col ${theme.bg === 'bg-white' ? 'bg-black/80' : 'bg-black/40'}`}>
              
              {/* Table Header Styles */}
              <div className={`grid grid-cols-[3.5rem_1fr_4rem_3rem_3rem_3rem_3rem] gap-2 p-4 text-xs font-black tracking-widest uppercase opacity-80 border-b border-white/10 bg-white/5`}>
                 <div className="text-center">#</div>
                 <div className="text-left pl-2">Team</div>
                 <div className="text-center bg-white/20 rounded">PT</div>
                 <div className="text-center opacity-60">G</div>
                 <div className="text-center opacity-60">V</div>
                 <div className="text-center opacity-60">P</div>
                 <div className="text-center opacity-60">S</div>
              </div>

              {/* Table Body */}
              <div className="overflow-y-auto flex-1 remove-scrollbar">
                {data.ranking && data.ranking.length > 0 ? (
                    data.ranking.map((team, index) => {
                      const isHighlighted = data.highlightTeam === team.name;
                      const isTop3 = index < 3;
                      
                      return (
                        <div 
                          key={team.id} 
                          className={`
                            grid grid-cols-[3.5rem_1fr_4rem_3rem_3rem_3rem_3rem] gap-2 items-center 
                            py-3 px-4 border-b border-white/5 transition-all
                            ${isHighlighted 
                                ? `bg-gradient-to-r ${theme.primary} text-white font-bold scale-[1.02] shadow-lg border-y border-white/30 relative z-10` 
                                : 'hover:bg-white/5'
                            }
                          `}
                        >
                          <div className={`
                            flex items-center justify-center w-8 h-8 rounded-full mx-auto font-mono text-lg font-bold
                            ${isTop3 && !isHighlighted ? 'bg-white text-black' : isHighlighted ? 'bg-white text-black' : 'bg-white/10 text-white/70'}
                          `}>
                            {index + 1}
                          </div>
                          
                          <div className="pl-2 pr-2 font-bold uppercase tracking-wide text-lg truncate flex items-center gap-2">
                             {team.name}
                             {isTop3 && !isHighlighted && <span className="text-[10px] bg-yellow-400 text-black px-1.5 py-0.5 rounded font-black">TOP</span>}
                          </div>

                          <div className={`text-center font-black text-2xl tracking-tighter ${isHighlighted ? 'scale-110' : ''}`}>
                            {team.points}
                          </div>

                          <div className="text-center font-mono opacity-80 text-lg">{team.played}</div>
                          <div className="text-center font-mono opacity-60">{team.won}</div>
                          <div className="text-center font-mono opacity-60">{team.drawn}</div>
                          <div className="text-center font-mono opacity-60">{team.lost}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full opacity-50 p-10 text-center gap-4">
                        <ListOrdered size={48} className="opacity-20" />
                        <div>
                            <p className="text-xl font-bold">Nessun dato</p>
                            <p className="text-sm">Usa il bottone "Importa" nei controlli</p>
                        </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
          
          <div className="mb-6 px-10 flex justify-between items-center opacity-60 mt-2">
             <div className="flex gap-4 text-[10px] uppercase tracking-wider font-semibold">
               <span>V • Vittorie (3/2pt)</span>
               <span>S • Sconfitte (1/0pt)</span> 
               <span>P • Pari (1pt)</span>
             </div>
             <div className="text-right">
                <p className="font-bold text-xs uppercase tracking-widest">{data.season}</p>
             </div>
          </div>
        </div>
      </BaseCard>
    );
  },

  Controls: ({ data, onChange }) => {
    const { classifica, loading } = useClassifica();

    // Funzione manuale per aggiornare i dati
    const handleSync = () => {
        if (classifica && classifica.length > 0) {
            onChange('ranking', classifica);
            // Auto-seleziona Duo Ligones se presente e non c'è selezione
            if (!data.highlightTeam) {
                 const myTeam = classifica.find(t => t.name.toLowerCase().includes('duo') || t.name.toLowerCase().includes('ligones'));
                 if (myTeam) onChange('highlightTeam', myTeam.name);
            }
        }
    };

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        
        {/* Controls Intestazione riadattati */}
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Intestazione</h3>
             <div className="space-y-3">
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Nome Campionato (es. Serie D)</label>
                    <input 
                        value={data.leagueName}
                        onChange={(e) => onChange('leagueName', e.target.value)}
                        className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-lg transition-all"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Stagione (es. 2024/25)</label>
                    <input 
                        value={data.season}
                        onChange={(e) => onChange('season', e.target.value)}
                        className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-lg transition-all"
                    />
                </div>
             </div>
        </div>

        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
             <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    Sorgente Dati CSI
                </h4>
                {loading && <span className="text-[10px] font-bold text-blue-500 uppercase">Caricamento...</span>}
             </div>
             
             <div className="text-xs text-blue-700 mb-4 bg-blue-100/50 p-2 rounded-lg">
                {loading 
                    ? "Connessione al portale CSI in corso..." 
                    : classifica && classifica.length > 0 
                        ? `✅ Trovate ${classifica.length} squadre nel database.` 
                        : "⚠️ Nessun dato trovato. Controlla la connessione."}
             </div>

             <button 
                onClick={handleSync}
                disabled={loading || !classifica || classifica.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-sm font-bold shadow-blue-200 shadow-lg transition-all disabled:opacity-50 disabled:shadow-none disabled:transform-none"
             >
                <RefreshCw size={16} className={`${loading ? 'animate-spin' : ''}`} />
                Importa Classifica
             </button>
        </div>
        
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Evidenzia Squadra</label>
              <select 
                  className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-lg"
                  value={data.highlightTeam}
                  onChange={(e) => onChange('highlightTeam', e.target.value)}
              >
                  <option value="">Nessuna selezione</option>
                  {data.ranking && data.ranking.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
              </select>
        </div>
      </div>
    );
  }
};
