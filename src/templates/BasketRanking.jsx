import React, { useEffect } from 'react';
import { ListOrdered, RefreshCw } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo } from '../components/blocks/MatchInfo';
import { TeamsRanking, TeamsRankingControls } from '../components/blocks/TeamsRanking';
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
        championship: `${data.leagueName} - ${data.season}`
    };

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
                showAverages={true}
                labels={{ scored: "MPF", conceded: "MPS" }}
             />
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
        
        {/* Controls Intestazione */}
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

        {/* CSI Fetch Control */}
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
        
        {/* Generic Team Controls */}
        <TeamsRankingControls data={data} onChange={onChange} />

      </div>
    );
  }
};
