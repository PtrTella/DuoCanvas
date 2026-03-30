import React from 'react';
import BaseCard from '../../components/ui/BaseCard';
import { MatchInfo, MatchInfoControls } from '../../components/blocks/MatchInfo';
import { TeamsRanking, TeamsRankingControls } from '../../components/blocks/TeamsRanking';

export const createRankingTemplate = (config = {}) => {
  const { 
    rankingFormat, 
    rankingBlock = { Render: TeamsRanking, Controls: TeamsRankingControls }
  } = config;
  
  const baseDefaults = {
    ...config.defaultData
  };

  return {
    defaultData: baseDefaults,
    Render: ({ data, theme, cardRef }) => {
      // Specific Template Defaults merged with Sport Defaults
      const showDraws = data.showDraws ?? rankingFormat?.showDraws ?? true;
      const showAverages = data.showAverages ?? rankingFormat?.showAverages ?? false;

      return (
        <BaseCard theme={theme} ref={cardRef}>
          <div className="flex flex-col h-full w-full relative z-10 gap-2">
            <MatchInfo 
                  data={data} 
                  theme={theme} 
              /> 

            <div className="flex-1 w-full relative px-6 pb-6 pt-0">
               {rankingBlock?.Render && (
                 <rankingBlock.Render 
                    data={data} 
                    theme={theme}
                    rankingFormat={rankingFormat}
                    showDraws={showDraws}
                    showStats={data.showStats ?? true}
                    showAverages={showAverages}
                 />
               )}
            </div>
          </div>
        </BaseCard>
      );
    },

    Controls: ({ data, onChange }) => {
      return (
        <div className="animate-in fade-in space-y-4">
           {/* Standardized Header Controls */}
           <MatchInfoControls data={data} onChange={onChange} />

           {/* Configured Ranking Block Controls */}
           {rankingBlock?.Controls && (
             <rankingBlock.Controls 
                data={data} 
                onChange={onChange}
                rankingFormat={rankingFormat}
              />
           )}
        </div>
      );
    }
  };
};
