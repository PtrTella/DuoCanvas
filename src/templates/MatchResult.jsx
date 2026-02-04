import React from 'react';
import { Trophy } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../components/blocks/MatchDetails';
import { MatchScore, MatchScoreControls } from '../components/blocks/MatchScore';
import TeamControls from '../components/editor/TeamControls';

export const MatchResult = {
  id: 'basket_result', // Deve corrispondere alla chiave in defaults.js
  name: 'Risultato Basket',
  icon: Trophy,
  defaultTheme: 'orange',

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
      <div className="flex flex-col items-center h-full w-full relative z-10">
        <MatchInfo data={data} theme={theme} className="w-full mb-8" matchDayLabel="MATCH DAY" />

        <div className="flex-1 flex items-start pt-20 w-full">
          <MatchScore data={data} theme={theme}>
            {data.topScorer && (
              <div className="mt-8 text-white text-xl font-black bg-black/40 px-6 py-2 rounded-xl backdrop-blur-md border border-white/10 uppercase tracking-widest shadow-xl text-center">
                {data.topScorer}
              </div>
            )}
          </MatchScore>
        </div>

        <MatchDetails data={data} theme={theme} />
      </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange, themeColor }) => (
    <div className="space-y-1 animate-in fade-in">
      <TeamControls data={data} onChange={onChange} />
      <MatchInfoControls data={data} onChange={onChange} />
      
      {/* Punteggio */}
      <MatchScoreControls data={data} onChange={onChange} accentColor={themeColor} />
      
      {/* Top Scorer / MVP */}
      <div className="pb-3 mb-3 border-b border-gray-100">
        <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">MVP / Note</label>
        <input 
          type="text" 
          value={data.topScorer} 
          onChange={(e) => onChange('topScorer', e.target.value)} 
          className="w-full p-2 text-center text-sm border rounded-lg bg-white" 
          placeholder="MVP: Rossi (20pt)" 
        />
      </div>

      <MatchDetailsControls data={data} onChange={onChange} />
    </div>
  )
};