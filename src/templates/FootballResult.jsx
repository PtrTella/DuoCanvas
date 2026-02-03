import React from 'react';
import { PartyPopper } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../components/blocks/MatchDetails';
import { GoalTimeline, GoalTimelineControls } from '../components/blocks/GoalTimeline';
import { MatchScore, MatchScoreControls } from '../components/blocks/MatchScore';
import TeamControls from '../components/editor/TeamControls';

export const FootballResult = {
  id: 'soccer_result', // Deve corrispondere alla chiave in defaults.js
  name: 'Risultato Calcio',
  icon: PartyPopper,
  defaultTheme: 'green',

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
      <div className="flex flex-col items-center h-full w-full relative z-10">
        <MatchInfo data={data} theme={theme} className="w-full mb-6" matchDayLabel="GIORNATA" />

        {/* Squadre e Punteggio */}
        <div className="flex-1 flex flex-col items-center justify-start pt-16 w-full mb-4">
          <MatchScore data={data} theme={theme} className="mb-8" accentColor={FootballResult.defaultTheme} />

          {/* Goal Timeline - Centered */}
          <div className="w-full flex justify-center mt-6">
            <GoalTimeline data={data} theme={theme} className="w-full max-w-xl scale-110" />
          </div>
        </div>

        <MatchDetails data={data} theme={theme} />
      </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange }) => (
    <div className="space-y-1 animate-in fade-in">
      <TeamControls data={data} onChange={onChange} />
      <MatchInfoControls data={data} onChange={onChange} />

      {/* Punteggio */}
      <MatchScoreControls data={data} onChange={onChange} accentColor="green" />

      {/* Goal Timeline Controls */}
      <GoalTimelineControls data={data} onChange={onChange} />

      {/* Match Details */}
      <MatchDetailsControls data={data} onChange={onChange} />
    </div>
  )
};
