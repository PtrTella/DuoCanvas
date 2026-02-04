import React from 'react';
import BaseCard from '../../components/ui/BaseCard';
import { MatchInfo, MatchInfoControls } from '../../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../../components/blocks/MatchDetails';
import { MatchScore, MatchScoreControls } from '../../components/blocks/MatchScore';
import TeamControls from '../../components/editor/TeamControls';
import { SPORTS } from '../../config/sportsRegistry';

export const createResultTemplate = (sportKey) => {
  const sport = SPORTS[sportKey];
  
  return {
    Render: ({ data, theme, cardRef }) => (
      <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col items-center h-full w-full relative z-10">
          <MatchInfo 
            data={data} 
            theme={theme} 
            className="w-full mb-8" 
            matchDayLabel={sport.labels.matchDay} 
          />

          <div className="flex-1 flex flex-col items-center justify-start pt-16 w-full">
            <MatchScore data={data} theme={theme} className="mb-8" />
            
            {/* Sport Specific Extra (MVP or Goal Timeline) */}
            {sport.blocks.resultExtra && (
              <sport.blocks.resultExtra.Render data={data} theme={theme} />
            )}
          </div>

          <MatchDetails data={data} theme={theme} />
        </div>
      </BaseCard>
    ),

    Controls: ({ data, onChange, themeColor }) => (
      <div className="space-y-1 animate-in fade-in">
        <TeamControls data={data} onChange={onChange} />
        <MatchInfoControls data={data} onChange={onChange} />
        
        <MatchScoreControls data={data} onChange={onChange} accentColor={themeColor} />
        
        {/* Sport Specific Extra Controls */}
        {sport.blocks.resultExtra && (
          <sport.blocks.resultExtra.Controls data={data} onChange={onChange} />
        )}
        
        <MatchDetailsControls data={data} onChange={onChange} />
      </div>
    )
  };
};
