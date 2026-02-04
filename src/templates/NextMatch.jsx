import React from 'react';
import { Users } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../components/blocks/MatchDetails';
import { BasketRosterVisual, BasketRosterVisualControls } from '../components/blocks/BasketRosterVisual';
import { VersusTeams, VersusTeamsControls } from '../components/blocks/VersusTeams';
import TeamControls from '../components/editor/TeamControls';

export const NextMatch = {
  id: 'basket_roster', // Deve corrispondere alla chiave in defaults.js
  name: 'Convocazioni Basket',
  icon: Users,
  defaultTheme: 'orange',

  // NESSUN initialData QUI! Tutto è in defaults.js

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full relative z-10 gap-4">
            <MatchInfo data={data} theme={theme} className="mb-0" matchDayLabel="MATCH DAY" />
            <VersusTeams data={data} theme={theme} />
            {/* BasketRosterVisual fills space */}
            <BasketRosterVisual data={data} theme={theme} className="flex-1 w-full my-2 min-h-0" />
            {/* MatchDetails pushed to bottom */}
            <MatchDetails data={data} theme={theme} className="mt-auto shrink-0" />
        </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange, themeColor }) => (
      <div className="space-y-1 animate-in fade-in">
          <TeamControls data={data} onChange={onChange} />
          <MatchInfoControls data={data} onChange={onChange} />
          <VersusTeamsControls data={data} onChange={onChange} />
          <BasketRosterVisualControls data={data} onChange={onChange} />
          <MatchDetailsControls data={data} onChange={onChange} />
      </div>
  )
};