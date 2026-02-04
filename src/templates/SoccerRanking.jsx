import React, { useState } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo } from '../components/blocks/MatchInfo';
import { TeamsRanking, TeamsRankingControls } from '../components/blocks/TeamsRanking';
import { parseManualRanking } from '../utils/rankingUtils';

// Hook Placeholder per Classifica Calcio
// In futuro questo hook userà un URL diverso e un parser specifico per il calcio
const useSoccerClassifica = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // TODO: Implementare fetch da nuova sorgente
    // const SOCCER_DATA_URL = "https://...";
    
    return { classifica: data, loading, error };
};

export const SoccerRanking = {
  id: 'soccer_ranking',
  name: 'Classifica Calcio',
  icon: Trophy, // Icona diversa per distinguerla
  defaultTheme: 'green',

  Render: ({ data, theme, cardRef }) => {
    // Adattiamo i dati per MatchInfo: 
    // matchDay -> "CLASSIFICA"
    // championship -> leagueName + season
    const headerData = {
        championship: `${data.leagueName} - ${data.season}`
    };

    const showAverages = data.showAverages ?? false; // Default false per calcio
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
                columnsString="V•Win N•Draw P•Loss"
                showDraws={true}
                showStats={showStats}
                showAverages={showAverages}
                labels={{ 
                    points: "PT",
                    played: "G",
                    won: "V",
                    drawn: "N",
                    lost: "P",
                    scored: "GF", 
                    conceded: "GS" 
                }}
             />
          </div>
        </div>
      </BaseCard>
    );
  },

  Controls: ({ data, onChange, themeColor }) => {
    const { classifica, loading, error } = useSoccerClassifica();
    const [mode, setMode] = useState('manual');
    const [manualText, setManualText] = useState('');

    // Funzione manuale per aggiornare i dati da CSI (placeholder)
    const handleSync = () => {
        if (classifica && classifica.length > 0) {
            onChange('ranking', classifica);
            onChange('showStats', true);
            onChange('showAverages', false);
            
            if (!data.highlightTeam) {
                 const myTeam = classifica.find(t => t.name.toLowerCase().includes('duo') || t.name.toLowerCase().includes('ligones'));
                 if (myTeam) onChange('highlightTeam', myTeam.name);
            }
        }
    };

    const handleManualParse = () => {
        if (!manualText) return;

        const { ranking, hasStats, hasAverages } = parseManualRanking(manualText, { showDraws: true });

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
                        className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-0 border rounded-lg transition-all"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Stagione</label>
                    <input 
                        value={data.season}
                        onChange={(e) => onChange('season', e.target.value)}
                        className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-0 border rounded-lg transition-all"
                    />
                </div>
                {/* Toggles */}
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                    <input 
                        type="checkbox"
                        id="showAvg"
                        checked={data.showAverages ?? false}
                        onChange={(e) => onChange('showAverages', e.target.checked)}
                        className="rounded text-green-500 focus:ring-green-500"
                    />
                    <label htmlFor="showAvg" className="text-xs font-bold text-gray-600 select-none cursor-pointer">
                        Mostra GF / GS
                    </label>
                </div>
                <div className="flex items-center gap-2 pt-2">
                    <input 
                        type="checkbox"
                        id="showStats"
                        checked={data.showStats ?? true}
                        onChange={(e) => onChange('showStats', e.target.checked)}
                        className="rounded text-green-500 focus:ring-green-500"
                    />
                    <label htmlFor="showStats" className="text-xs font-bold text-gray-600 select-none cursor-pointer">
                        Mostra Statistiche (G, V, N, P)
                    </label>
                </div>
             </div>
        </div>

        {/* Fetch Control */}
        <div className="p-4 bg-green-50/50 border border-green-100 rounded-xl">
             <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-green-900 text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Sorgente Dati
                </h4>
             </div>
             
             {/* Tabs Toggle */}
             <div className="flex bg-white/50 p-1 rounded-lg mb-4 border border-green-100">
                <button 
                   onClick={() => setMode('csi')}
                   className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'csi' ? 'bg-green-600 text-white shadow-md' : 'text-green-900 hover:bg-green-100'}`}
                >
                   Automatico (WIP)
                </button>
                <button 
                   onClick={() => setMode('manual')}
                   className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'manual' ? 'bg-green-600 text-white shadow-md' : 'text-green-900 hover:bg-green-100'}`}
                >
                   Manuale
                </button>
             </div>

             {mode === 'csi' ? (
                <>
                 <div className={`text-xs mb-4 p-2 rounded-lg ${error ? 'bg-red-100 text-red-700' : 'bg-green-100/50 text-green-700'}`}>
                    {loading 
                        ? "Connessione in corso..." 
                        : "⚠️ Importazione automatica non configurata per questo campionato."}
                 </div>

                 <button 
                    onClick={handleSync}
                    disabled={true} // Disabled for now
                    className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg text-sm font-bold opacity-50 cursor-not-allowed"
                 >
                    <RefreshCw size={16} />
                    Importa Classifica Calcio
                 </button>
                </>
             ) : (
                <div className="space-y-3">
                   <div className="bg-green-100/30 p-2 rounded text-[10px] text-green-800 leading-tight">
                      Incolla qui la classifica.<br/>
                      Formato: <b>Nome Pt G V N P [GF GS]</b>
                   </div>
                   <textarea
                      value={manualText}
                      onChange={(e) => setManualText(e.target.value)}
                      placeholder={`Esempio:\nDuo Ligones 20 10 5 5 0\nTeam B 18 10 4 6 0 20 10`}
                      className="w-full h-32 p-2 text-xs font-mono border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                   />
                   <button 
                      onClick={handleManualParse}
                      disabled={!manualText}
                      className="w-full py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 disabled:opacity-50"
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
