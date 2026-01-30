import React from 'react';
import { Shield } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../components/blocks/MatchDetails';
import { VersusTeams, VersusTeamsControls } from '../components/blocks/VersusTeams';
import { SoccerFormation, SoccerFormationControls } from '../components/blocks/SoccerFormation';

export const SoccerMatch = {
  id: 'soccer_formation',
  name: 'Calcio a 7',
  icon: Shield,

  initialData: {
     module: "3-2-1",
     // 7 Titolari + 5 Riserve
     rosterList: "1 Rossi (GK)\n5 Bianchi\n6 Verdi\n3 Neri\n8 Gialli\n4 Blu\n9 Bomber\n12 Riserva1\n13 Riserva2\n14 Riserva3\n15 Riserva4\n16 Riserva5",
     coach: "Mister Bianchi"
  },

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full relative z-10">
            <MatchInfo data={data} theme={theme} className="mb-4" />
            <VersusTeams data={data} theme={theme} />
            
            {/* Campo + Panchina */}
            <SoccerFormation data={data} theme={theme} className="flex-1 my-4" />
            
            <MatchDetails data={data} theme={theme} />
        </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange }) => (
      <div className="space-y-1 animate-in fade-in">
          <MatchInfoControls data={data} onChange={onChange} />
          <VersusTeamsControls data={data} onChange={onChange} />
          <SoccerFormationControls data={data} onChange={onChange} />
          <MatchDetailsControls data={data} onChange={onChange} />
      </div>
  )
};