import React from 'react';
import { Trophy } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import TeamDisplay from '../components/UI/TeamDisplay';
import ImageUploader from '../components/editor/ImageUploader';
import { MatchInfo, MatchInfoControls } from '../components/blocks/MatchInfo';
import { MatchDetails, MatchDetailsControls } from '../components/blocks/MatchDetails';

export const MatchResult = {
  id: 'result', // Deve corrispondere alla chiave in defaults.js
  name: 'Risultato',
  icon: Trophy,

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
      <div className="flex flex-col items-center h-full w-full relative z-10">
        <MatchInfo data={data} theme={theme} className="w-full mb-8" />

        <div className="flex-1 flex items-center justify-between w-full px-2">
          <div className="w-1/3">
             <TeamDisplay name={data.homeTeam} logoSrc="/DuoCanvas/logos/duoligones.png" theme={theme} />
          </div>
          <div className="flex flex-col items-center justify-center w-1/3">
             <div className="text-[120px] md:text-[140px] font-black leading-none text-white drop-shadow-2xl flex items-center gap-2">
                <span>{data.homeScore}</span>
                <span className="text-white/40 text-7xl mb-4">:</span>
                <span>{data.awayScore}</span>
             </div>
             <div className="mt-2 px-6 py-1 bg-white/20 rounded-full text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md">
                Finale
             </div>
             <div className="mt-6 text-white text-lg font-bold bg-black/20 px-4 py-1 rounded-lg">
               {data.topScorer}
             </div>
          </div>
          <div className="w-1/3">
             <TeamDisplay name={data.awayTeam} logoSrc={data.awayLogo} theme={theme} />
          </div>
        </div>

        <MatchDetails data={data} theme={theme} />
      </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange }) => (
    <div className="space-y-1 animate-in fade-in">
      <MatchInfoControls data={data} onChange={onChange} />
      
      <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 mb-4">
          <label className="text-xs font-bold text-orange-800 uppercase mb-2 block text-center">Punteggio</label>
          <div className="grid grid-cols-2 gap-4">
             <input type="number" value={data.homeScore} onChange={(e) => onChange('homeScore', e.target.value)} className="p-3 text-center text-2xl font-black border-2 border-white rounded-xl shadow-sm focus:border-orange-500" placeholder="0" />
             <input type="number" value={data.awayScore} onChange={(e) => onChange('awayScore', e.target.value)} className="p-3 text-center text-2xl font-black border-2 border-white rounded-xl shadow-sm focus:border-orange-500" placeholder="0" />
          </div>
          <input type="text" value={data.topScorer} onChange={(e) => onChange('topScorer', e.target.value)} className="w-full mt-2 p-2 text-center text-sm border rounded bg-white" placeholder="MVP / Note" />
      </div>

      <ImageUploader value={data.awayLogo} onChange={(val) => onChange('awayLogo', val)} label="Logo Avversario" />
      <MatchDetailsControls data={data} onChange={onChange} />
    </div>
  )
};