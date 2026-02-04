import React from 'react';
import BaseCard from '../../components/ui/BaseCard';
import { MatchInfo, MatchInfoControls } from '../../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../../components/blocks/MatchDetails';
import { VersusTeams, VersusTeamsControls } from '../../components/blocks/VersusTeams';
import TeamControls from '../../components/editor/TeamControls';
import { SPORTS } from '../../config/sportsRegistry';

export const createLineupTemplate = (sportKey) => {
  const sport = SPORTS[sportKey];

  return {
    Render: ({ data, theme, cardRef }) => (
      <BaseCard theme={theme} ref={cardRef}>
          <div className="flex flex-col h-full w-full relative z-10">
              <MatchInfo 
                data={data} 
                theme={theme} 
                className="mb-4" 
                matchDayLabel={sport.labels.matchDay} 
              />
              
              <VersusTeams data={data} theme={theme} />
              
              {/* Sport Specific Lineup/Formation */}
              <sport.blocks.lineupExtra.Render 
                data={data} 
                theme={theme} 
                className="flex-1 w-full my-4 min-h-0" 
              />
              
              <MatchDetails data={data} theme={theme} className="mt-auto shrink-0" />
          </div>
      </BaseCard>
    ),

    Controls: ({ data, onChange, themeColor }) => (
      <div className="space-y-1 animate-in fade-in">
        <TeamControls data={data} onChange={onChange} />
        <MatchInfoControls data={data} onChange={onChange} />
        <VersusTeamsControls data={data} onChange={onChange} />

        {/* Sport Specific Lineup Controls */}
        <sport.blocks.lineupExtra.Controls data={data} onChange={onChange} />
        
        <MatchDetailsControls data={data} onChange={onChange} />
      </div>
    )
  };
};
