import React from 'react';
import BaseCard from '../../components/ui/BaseCard';
import { MatchInfo, MatchInfoControls } from '../../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../../components/blocks/MatchDetails';
import { MatchScore, MatchScoreControls } from '../../components/blocks/MatchScore';
import TeamControls from '../../components/editor/TeamControls';
import { SPORTS } from '../../config/sportsRegistry';

export const createResultTemplate = (sportKey) => {
  const sport = SPORTS[sportKey];
  const block = sport.templates.result.blocks.extra;
  
  return {
    Render: ({ data, theme, cardRef }) => (
      <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col items-center h-full w-full relative z-10">
          <MatchInfo 
            data={data} 
            theme={theme} 
            className="w-full mb-8" 
            labels={sport.labels}
          />

          <div className="flex-1 flex flex-col items-center justify-start pt-16 w-full">
            <MatchScore data={data} theme={theme} className="mb-8" />

            {/* Configured Block */}
            <block.Render data={data} theme={theme} labels={sport.labels} />
          </div>

          <MatchDetails data={data} theme={theme} labels={sport.labels} />
        </div>
      </BaseCard>
    ),

    Controls: ({ data, onChange, themeColor }) => (
      <div className="space-y-1 animate-in fade-in">
        <TeamControls data={data} onChange={onChange} />
        <MatchInfoControls data={data} onChange={onChange} labels={sport.labels} />
        
        <MatchScoreControls data={data} onChange={onChange} accentColor={themeColor} />
        
        {/* Configured Block Controls */}
        <block.Controls data={data} onChange={onChange} />
        
        <MatchDetailsControls data={data} onChange={onChange} labels={sport.labels} />
      </div>
    ),

    defaultData: sport.templates.result.defaults
  };
};
