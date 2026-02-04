import React, { useEffect, useState } from 'react';
import { ListOrdered, RefreshCw } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo } from '../components/blocks/MatchInfo';
import { TeamsRanking, TeamsRankingControls } from '../components/blocks/TeamsRanking';
import { useClassifica } from '../hooks/useCsi';
import { parseManualRanking } from '../utils/rankingUtils';

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
        championship: `${data.leagueName} - ${data.season}`
    };

    const showAverages = data.showAverages ?? true;
    const showStats = data.showStats ?? true;

    return (
      <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full relative z-10 gap-4">
            
          {/* Header standard MatchInfo */}
          <MatchInfo 
                data={headerData} 
                theme={theme} 
                matchDayLabel="CLASSIFICA" 
            /> 

          <div className="flex-1 w-full relative px-6 pb-6 pt-2">
             <TeamsRanking 
                data={data} 
                theme={theme}
                columnsString="V•Win(3/2) S•Loss(1/0) MPF•Med.PuntiFatti"
                showDraws={false}
                showStats={showStats}
                showAverages={showAverages}
                labels={{ scored: "MPF", conceded: "MPS" }}
             />
          </div>
        </div>
      </BaseCard>
    );
  },

  Controls: ({ data, onChange, themeColor }) => {
    const { classifica, loading, error } = useClassifica();
    const [mode, setMode] = useState('manual'); // 'csi' | 'manual'. Default to manual as requested or 'csi'? 'csi' was default. Let's start with 'csi'.
    const [manualText, setManualText] = useState('');

    // Set initial mode based on data/preference? 
    // Just toggle. 

    // Funzione manuale per aggiornare i dati da CSI
    const handleSync = () => {
        if (classifica && classifica.length > 0) {
            onChange('ranking', classifica);
            // Reset flags when syncing from CSI
            onChange('showStats', true);
            onChange('showAverages', true);
            // Auto-seleziona Duo Ligones se presente e non c'è selezione
            if (!data.highlightTeam) {
                 const myTeam = classifica.find(t => t.name.toLowerCase().includes('duo') || t.name.toLowerCase().includes('ligones'));
                 if (myTeam) onChange('highlightTeam', myTeam.name);
            }
        }
    };

    const handleManualParse = () => {
        if (!manualText) return;
        
        const { ranking, hasStats, hasAverages } = parseManualRanking(manualText, { showDraws: false });

        if (ranking.length > 0) {
            onChange('ranking', ranking);
            onChange('showStats', hasStats);
            onChange('showAverages', hasAverages);
            setManualText(''); 
        }
    };

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        
        {/* Controls Intestazione */}
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Intestazione</h3>
             <div className="space-y-3">
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Nome Campionato</label>
                    <input 
                        value={data.leagueName}
                        onChange={(e) => onChange('leagueName', e.target.value)}
                        className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-lg transition-all"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Stagione</label>
                    <input 
                        value={data.season}
                        onChange={(e) => onChange('season', e.target.value)}
                        className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-lg transition-all"
                    />
                </div>
                {/* Toggle Show Averages */}
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                    <input 
                        type="checkbox"
                        id="showAvg"
                        checked={data.showAverages ?? true}
                        onChange={(e) => onChange('showAverages', e.target.checked)}
                        className="rounded text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="showAvg" className="text-xs font-bold text-gray-600 select-none cursor-pointer">
                        Mostra Medie (MPF / MPS)
                    </label>
                </div>
                <div className="flex items-center gap-2 pt-2">
                    <input 
                        type="checkbox"
                        id="showStats"
                        checked={data.showStats ?? true}
                        onChange={(e) => onChange('showStats', e.target.checked)}
                        className="rounded text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="showStats" className="text-xs font-bold text-gray-600 select-none cursor-pointer">
                        Mostra Statistiche (G, V, S)
                    </label>
                </div>
             </div>
        </div>

        {/* CSI Fetch Control */}
        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
             <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    Sorgente Dati
                </h4>
             </div>
             
             {/* Tabs Toggle */}
             <div className="flex bg-white/50 p-1 rounded-lg mb-4 border border-blue-100">
                <button 
                   onClick={() => setMode('csi')}
                   className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'csi' ? 'bg-blue-600 text-white shadow-md' : 'text-blue-900 hover:bg-blue-100'}`}
                >
                   Automatico (CSI)
                </button>
                <button 
                   onClick={() => setMode('manual')}
                   className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'manual' ? 'bg-blue-600 text-white shadow-md' : 'text-blue-900 hover:bg-blue-100'}`}
                >
                   Manuale
                </button>
             </div>

             {mode === 'csi' ? (
                <>
                 <div className={`text-xs mb-4 p-2 rounded-lg ${error ? 'bg-red-100 text-red-700' : 'bg-blue-100/50 text-blue-700'}`}>
                    {loading 
                        ? "Connessione al portale CSI in corso..." 
                        : error 
                            ? `❌ Errore CSI: ${error}`
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
                    Importa Classifica CSI
                 </button>
                </>
             ) : (
                <div className="space-y-3">
                   <div className="bg-blue-100/30 p-2 rounded text-[10px] text-blue-800 leading-tight">
                      Incolla qui la classifica (es. da Excel o sito).<br/>
                      Formato: <b>Nome Pt G V P [MPF MPS]</b>
                   </div>
                   <textarea
                      value={manualText}
                      onChange={(e) => setManualText(e.target.value)}
                      placeholder={`Esempio:\nTeam A 20 10 10 0\nTeam B 18 10 9 1 75.5 60.2`}
                      className="w-full h-32 p-2 text-xs font-mono border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   />
                   <button 
                      onClick={handleManualParse}
                      disabled={!manualText}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 disabled:opacity-50"
                   >
                      Elabora e Aggiorna
                   </button>
                </div>
             )}
        </div>
        
        {/* Generic Team Controls */}
        <TeamsRankingControls data={data} onChange={onChange} />

      </div>
    );
  }
};
