import React from 'react';
import { Users } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import TeamDisplay from '../components/UI/TeamDisplay';
import ImageUploader from '../components/editor/ImageUploader';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../components/blocks/MatchDetails';
import { GoalTimeline, GoalTimelineControls } from '../components/blocks/GoalTimeline';

export const FootballResult = {
  id: 'football',
  name: 'Calcio',
  icon: Users,
  defaultTheme: 'green',

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
      <div className="flex flex-col items-center h-full w-full relative z-10">
        <MatchInfo data={data} theme={theme} className="w-full mb-6" />

        {/* Squadre e Punteggio */}
        <div className="flex-1 flex flex-col items-center justify-center w-full px-2 mb-4">
          <div className="flex items-center justify-between w-full mb-6">
            <div className="w-1/3 flex justify-center">
              <TeamDisplay name={data.homeTeam} logoSrc="/DuoCanvas/logos/duoligones.png" theme={theme} />
            </div>
            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="text-[100px] font-black leading-none text-white drop-shadow-2xl flex items-center gap-3">
                <span>{data.homeScore}</span>
                <span className="text-white/40 text-6xl">:</span>
                <span>{data.awayScore}</span>
              </div>
              <div className="mt-3 px-4 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
                Finale
              </div>
            </div>
            <div className="w-1/3 flex justify-center">
              <TeamDisplay name={data.awayTeam} logoSrc={data.awayLogo} theme={theme} />
            </div>
          </div>

          {/* Goal Timeline - Centered */}
          <GoalTimeline data={data} theme={theme} className="w-full max-w-md" />
        </div>

        <MatchDetails data={data} theme={theme} />
      </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange }) => (
    <div className="space-y-1 animate-in fade-in">
      <MatchInfoControls data={data} onChange={onChange} />

      {/* Punteggio */}
      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 mb-4">
        <label className="text-xs font-bold text-blue-800 uppercase mb-2 block text-center">Punteggio</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            value={data.homeScore}
            onChange={(e) => onChange('homeScore', e.target.value)}
            className="p-3 text-center text-2xl font-black border-2 border-white rounded-xl shadow-sm focus:border-blue-500"
            placeholder="0"
          />
          <input
            type="number"
            value={data.awayScore}
            onChange={(e) => onChange('awayScore', e.target.value)}
            className="p-3 text-center text-2xl font-black border-2 border-white rounded-xl shadow-sm focus:border-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      {/* Goal Timeline Controls */}
      <GoalTimelineControls data={data} onChange={onChange} />

      {/* Logo */}
      <ImageUploader value={data.awayLogo} onChange={(val) => onChange('awayLogo', val)} label="Logo Avversario" />

      {/* Match Details */}
      <MatchDetailsControls data={data} onChange={onChange} />
    </div>
  )
};
