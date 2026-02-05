import React from 'react';
import BaseCard from '../../components/ui/BaseCard';
import { MatchInfo, MatchInfoControls } from '../../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../../components/blocks/MatchDetails';
import { MatchScore, MatchScoreControls } from '../../components/blocks/MatchScore';

export const createResultTemplate = (sport, config = {}) => {
  const block = config.extraBlock;
  const baseDefaults = {
    ...config.defaultData
  };
  
  return {
    defaultData: baseDefaults,
    Render: ({ data, theme, cardRef }) => (
      <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col items-center h-full w-full relative z-10">
          <MatchInfo 
            data={data} 
            theme={theme} 
            className="w-full mb-2" 
          />

          <div className="flex-1 flex flex-col items-center justify-start pt-2 w-full">
            <MatchScore data={data} theme={theme} className="mb-4" />

            {/* Configured Block */}
            {block?.Render && <block.Render data={data} theme={theme} />}
          </div>

          <MatchDetails data={data} theme={theme} />
        </div>
      </BaseCard>
    ),

    Controls: ({ data, onChange, themeColor }) => (
      <div className="space-y-1 animate-in fade-in">
        <MatchInfoControls data={data} onChange={onChange} />
        
        <MatchScoreControls data={data} onChange={onChange} accentColor={themeColor} />
        
        {/* Configured Block Controls */}
        {block?.Controls && <block.Controls data={data} onChange={onChange} />}
        
        <MatchDetailsControls data={data} onChange={onChange} />
      </div>
    )
  };
};
