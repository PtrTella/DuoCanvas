import React from 'react';
import BaseCard from '../../components/ui/BaseCard';
import { MatchInfo, MatchInfoControls } from '../../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../../components/blocks/MatchDetails';
import { TeamMatchup, TeamMatchupControls } from '../../components/blocks/TeamMatchup';

export const createLineupTemplate = (sport, config = {}) => {
  const block = config.extraBlock;
  const baseDefaults = {
    ...config.defaultData
  };

  return {
    defaultData: baseDefaults,
    Render: ({ data, theme, cardRef }) => (
      <BaseCard theme={theme} ref={cardRef}>
          <div className="flex flex-col h-full w-full relative z-10">
              <MatchInfo 
                data={data} 
                theme={theme} 
                className="mb-2" 
              />
              
              <TeamMatchup data={data} theme={theme} />
              
              {/* Sport Specific Lineup/Formation */}
              <div className="flex-1 w-full my-2 min-h-0">
                {block?.Render && (
                  <block.Render 
                    data={data} 
                    theme={theme} 
                  />
                )}
              </div>
              
              <MatchDetails data={data} theme={theme} className="mt-auto shrink-0" />
          </div>
      </BaseCard>
    ),

    Controls: ({ data, onChange, themeColor }) => (
      <div className="space-y-1 animate-in fade-in">
        <MatchInfoControls data={data} onChange={onChange} />
        <TeamMatchupControls data={data} onChange={onChange} />

        {/* Sport Specific Lineup Controls */}
        {block?.Controls && <block.Controls data={data} onChange={onChange} />}
        
        <MatchDetailsControls data={data} onChange={onChange} />
      </div>
    )
  };
};
