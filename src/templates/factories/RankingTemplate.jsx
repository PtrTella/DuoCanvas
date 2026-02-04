import React from 'react';
import { RefreshCw } from 'lucide-react';
import BaseCard from '../../components/ui/BaseCard';
import { MatchInfo } from '../../components/blocks/MatchInfo';
import { TeamsRanking, TeamsRankingControls } from '../../components/blocks/TeamsRanking';
import { parseManualRanking } from '../../utils/rankingUtils';
import { SPORTS } from '../../config/sportsRegistry';

export const createRankingTemplate = (sportKey) => {
  const sport = SPORTS[sportKey];
  const block = sport.templates.ranking.blocks.config;
  const config = block.options; // Access the closure options exposed by factory

  return {
    Render: ({ data, theme, cardRef }) => {
      const headerData = {
          championship: `${data.leagueName} - ${data.season}`
      };

      return (
        <BaseCard theme={theme} ref={cardRef}>
          <div className="flex flex-col h-full w-full relative z-10 gap-4">
            <MatchInfo 
                  data={headerData} 
                  theme={theme} 
                  labels={sport.labels}
                  matchDayLabel={sport.labels.ranking} 
              /> 

            <div className="flex-1 w-full relative px-6 pb-6 pt-2">
               {/* Use the Configured Render Block */}
               <block.Render 
                  data={data} 
                  theme={theme}
                  // Override specific visual toggles from data if present
                  showStats={data.showStats ?? true}
                  showAverages={data.showAverages ?? config.showAverages}
               />
            </div>
          </div>
        </BaseCard>
      );
    },

    Controls: ({ data, onChange, themeColor }) => {
      // Use the hook specified in the sports registry
      const { classifica: csiData, loading, refresh } = sport.hooks.useRanking();

      const handleSync = () => {
        if (csiData && csiData.length > 0) {
          onChange('ranking', csiData);
          onChange('isManual', false);
        }
      };

      const handleManualChange = (val) => {
        onChange('manualText', val);
        const parsed = parseManualRanking(val, { 
          showDraws: config.showDraws,
          sport: sportKey
        });
        
        // Extract only the ranking array from the parser results
        onChange('ranking', parsed.ranking);
        
        // Auto-update toggles based on detected columns in text
        onChange('showStats', parsed.hasStats);
        onChange('showAverages', parsed.hasAverages);
      };

      return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Titolo Lega</label>
              <input 
                className="w-full p-2 text-xs border rounded-lg"
                value={data.leagueName || ''} 
                onChange={e => onChange('leagueName', e.target.value)} 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Stagione</label>
              <input 
                className="w-full p-2 text-xs border rounded-lg"
                value={data.season || ''} 
                onChange={e => onChange('season', e.target.value)} 
              />
            </div>
          </div>

          {/* Sync / Manual Toggle */}
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
             <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Origine Dati</span>
                <button 
                  onClick={() => onChange('isManual', !data.isManual)}
                  className={`text-[9px] px-2 py-1 rounded-full font-bold transition-colors ${data.isManual ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}
                >
                  {data.isManual ? 'MODALITÀ MANUALE' : 'MODALITÀ CSI SYNC'}
                </button>
             </div>

             {data.isManual ? (
                <div className="space-y-2">
                   <textarea 
                      className="w-full h-32 p-3 text-[11px] font-mono border rounded-lg bg-white"
                      placeholder="Squadra Punti G V N P MPF MPS"
                      value={data.manualText || ''}
                      onChange={(e) => handleManualChange(e.target.value)}
                   />
                   <p className="text-[9px] text-gray-400 leading-tight italic">
                      Incolla i dati direttamente dal sito. Il sistema riconoscerà automaticamente le colonne.
                   </p>
                </div>
             ) : (
                <button 
                  onClick={handleSync}
                  disabled={loading}
                  className="w-full py-3 bg-white border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 transition-all font-bold text-xs"
                >
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                  {loading ? 'Sincronizzazione...' : 'Sincronizza Classifica CSI'}
                </button>
             )}
          </div>

          <TeamsRankingControls data={data} onChange={onChange} showAveragesOption={config.showAverages} />
        </div>
      );
    },

    defaultData: sport.templates.ranking.defaults
  };
};
