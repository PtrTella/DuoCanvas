import React from 'react';
import { Shield } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../components/blocks/MatchDetails';
import { VersusTeams, VersusTeamsControls } from '../components/blocks/VersusTeams';
import { SoccerFormation, SoccerFormationControls } from '../components/blocks/SoccerFormation';
import TeamControls from '../components/editor/TeamControls';

export const SoccerMatch = {
  id: 'soccer_formation',
  name: 'Formazione Calcio',
  icon: Shield,
  defaultTheme: 'green',

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full relative z-10">
            <MatchInfo data={data} theme={theme} className="mb-4" matchDayLabel="GIORNATA" />
            <VersusTeams data={data} theme={theme} />
            
            {/* Campo + Panchina */}
            <SoccerFormation data={data} theme={theme} className="flex-1 my-4" />
            
            <MatchDetails data={data} theme={theme} />
        </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange, themeColor }) => (
      <div className="space-y-1 animate-in fade-in">
          <TeamControls data={data} onChange={onChange} />
          <MatchInfoControls data={data} onChange={onChange} />
          <VersusTeamsControls data={data} onChange={onChange} />
          <SoccerFormationControls data={data} onChange={onChange} />
          <MatchDetailsControls data={data} onChange={onChange} />
      </div>
  )
};