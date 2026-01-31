import React from 'react';
import { Users } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../components/blocks/MatchDetails';
import { BasketRoster, BasketRosterControls } from '../components/blocks/BasketRoster';
import { VersusTeams, VersusTeamsControls } from '../components/blocks/VersusTeams';
import TeamControls from '../components/editor/TeamControls';

export const NextMatch = {
  id: 'fixture', // Deve corrispondere alla chiave in defaults.js
  name: 'Convocazioni',
  icon: Users,
  defaultTheme: 'orange',

  // NESSUN initialData QUI! Tutto è in defaults.js

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full relative z-10">
            <MatchInfo data={data} theme={theme} className="mb-4" />
            <VersusTeams data={data} theme={theme} />
            <BasketRoster data={data} theme={theme} className="flex-1 my-4" />
            <MatchDetails data={data} theme={theme} />
        </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange }) => (
      <div className="space-y-1 animate-in fade-in">
          <TeamControls data={data} onChange={onChange} />
          <MatchInfoControls data={data} onChange={onChange} />
          <VersusTeamsControls data={data} onChange={onChange} />
          <BasketRosterControls data={data} onChange={onChange} />
          <MatchDetailsControls data={data} onChange={onChange} />
      </div>
  )
};