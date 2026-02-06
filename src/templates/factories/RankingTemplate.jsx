import React from 'react';
import { RefreshCw } from 'lucide-react';
import BaseCard from '../../components/ui/BaseCard';
import { MatchInfo, MatchInfoControls } from '../../components/blocks/MatchInfo';
import { TeamsRanking, TeamsRankingControls } from '../../components/blocks/TeamsRanking';
import { parseManualRanking } from '../../utils/rankingUtils';
import { GLOBAL_DEFAULTS } from '../../config';

export const createRankingTemplate = (config = {}) => {
  const options = config.options || {};
  const RenderBlock = config.RenderBlock || TeamsRanking;
  const baseDefaults = {
    ...config.defaultData
  };

  return {
    defaultData: baseDefaults,
    Render: ({ data, theme, cardRef }) => {
      return (
        <BaseCard theme={theme} ref={cardRef}>
          <div className="flex flex-col h-full w-full relative z-10 gap-2">
            <MatchInfo 
                  data={data} 
                  theme={theme} 
              /> 

            <div className="flex-1 w-full relative px-6 pb-6 pt-0">
               {/* Use the Configured Render Block */}
               <RenderBlock 
                  data={data} 
                  theme={theme}
                  showDraws={options.showDraws}
                  showStats={data.showStats ?? true}
                  showAverages={data.showAverages ?? options.showAverages}
               />
            </div>
          </div>
        </BaseCard>
      );
    },

    Controls: ({ data, onChange }) => {
      const syncConfig = data.rankingSync || { enabled: false };
      
      // Use the hook specified in the club config
      const useRankingHook = syncConfig.customHook;

      // Se non c'è hook (gestito a livello club), lo stato è vuoto
      const rankingState = useRankingHook ? useRankingHook(data.csiGironeId) : { classifica: [], loading: false, refresh: () => {} };
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
        const parsed = parseManualRanking(val, { 
          showDraws: options.showDraws,
          sport: config.sportId 
        });
        
        // Extract only the ranking array from the parser results
        onChange('ranking', parsed.ranking);
        
        // Auto-update toggles based on detected columns in text
        onChange('showStats', parsed.hasStats);
        onChange('showAverages', parsed.hasAverages);
      };

      return (
        <div className="space-y-1 animate-in fade-in">
          {/* Standardized Header Controls */}
          <MatchInfoControls data={data} onChange={onChange} />

          {/* Ranking Specific Parameters */}
          <TeamsRankingControls data={data} onChange={onChange} />

          {/* Sync / Manual Toggle Block */}
          <div className="py-5 border-b border-gray-100 italic">
             {syncConfig.enabled ? (
               <>
                <div className="flex items-center justify-between mb-4 not-italic">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origine Dati</span>
                    <button 
                      onClick={() => onChange('isManual', !data.isManual)}
                      className="text-[10px] font-black uppercase text-gray-900 border-b-2 border-gray-900"
                    >
                      {data.isManual ? `Switch to ${syncConfig.label || 'Sync'}` : 'Switch to Manual'}
                    </button>
                </div>

                {!data.isManual ? (
                    <button 
                      onClick={handleSync}
                      disabled={loading}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center gap-3 text-gray-900 hover:bg-white hover:shadow-md transition-all font-bold text-xs not-italic"
                    >
                      <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                      {loading ? 'Sincronizzazione...' : `Sincronizza Classifica ${syncConfig.label || ''}`}
                    </button>
                ) : (
                    <div className="not-italic space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase block ml-1 tracking-tighter text-gray-400">Inserimento Manuale (Nome PT G V P S GF GS)</label>
                      <textarea 
                          className="w-full h-32 p-4 text-[11px] font-mono bg-gray-50 border-transparent focus:bg-white focus:border-gray-900 border rounded-2xl transition-all"
                          placeholder={`${GLOBAL_DEFAULTS.homeTeam} 24 10 8 0 2 34 12...`}
                          value={data.manualText || ''}
                          onChange={(e) => handleManualChange(e.target.value)}
                      />
                    </div>
                )}
               </>
             ) : (
               /* Solo Manuale se Sync non abilitato */
               <div className="not-italic space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Dati Classifica</span>
                  <label className="text-[10px] font-bold text-gray-400 uppercase block ml-1 tracking-tighter text-gray-400">Inserimento Manuale (Nome PT G V P S GF GS)</label>
                  <textarea 
                      className="w-full h-32 p-4 text-[11px] font-mono bg-gray-50 border-transparent focus:bg-white focus:border-gray-900 border rounded-2xl transition-all"
                      placeholder={`${GLOBAL_DEFAULTS.homeTeam} 24 10 8 0 2 34 12...`}
                      value={data.manualText || ''}
                      onChange={(e) => handleManualChange(e.target.value)}
                  />
               </div>
             )}
          </div>
        </div>
      );
    }
  };
};
