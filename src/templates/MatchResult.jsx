import React from 'react';
import { Trophy } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';

const TeamLogo = ({ name, isWinner }) => (
  <div className="flex flex-col items-center text-center z-10 mx-4">
    <div className={`w-40 h-40 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black border-4 ${isWinner ? 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.6)]' : 'border-gray-600'}`}>
      <span className="text-5xl font-black text-white">{name.substring(0, 2).toUpperCase()}</span>
    </div>
    <h2 className="text-3xl font-bold leading-tight uppercase text-white max-w-[200px] drop-shadow-md">{name}</h2>
  </div>
);

export const MatchResult = {
  id: 'result',
  name: 'Risultato Partita',
  icon: Trophy,
  
  Render: ({ data, theme, cardRef }) => {
    const winner = parseInt(data.homeScore) > parseInt(data.awayScore) ? 'home' : parseInt(data.awayScore) > parseInt(data.homeScore) ? 'away' : 'draw';
    
    return (
      <BaseCard theme={theme} ref={cardRef}>
        <div className="mt-12 flex flex-col items-center w-full h-full justify-center pb-20">
           <div className={`px-10 py-3 rounded-full font-black italic uppercase tracking-tighter text-3xl shadow-lg bg-gradient-to-r ${theme.primary} text-white mb-12 transform -skew-x-12`}>
            {winner === 'home' && data.homeTeam.toLowerCase().includes('duo') ? 'VITTORIA!' : 'RISULTATO FINALE'}
          </div>
          
          <div className="flex items-center justify-center w-full">
            <TeamLogo name={data.homeTeam} isWinner={winner === 'home'} />
            
            <div className="flex flex-col items-center mx-6">
               <div className="text-[150px] font-black tabular-nums tracking-tighter flex items-center gap-4 drop-shadow-2xl leading-none">
                  <span className={winner === 'home' ? 'text-white scale-110' : 'text-white/60'}>{data.homeScore}</span>
                  <span className="text-white/40 text-6xl">-</span>
                  <span className={winner === 'away' ? 'text-white scale-110' : 'text-white/60'}>{data.awayScore}</span>
               </div>
               <span className="text-xl uppercase tracking-[0.3em] text-white/80 mt-8 bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                 Giornata {data.matchDay}
               </span>
            </div>
            
            <TeamLogo name={data.awayTeam} isWinner={winner === 'away'} />
          </div>
        </div>
      </BaseCard>
    );
  },

  Controls: ({ data, onChange }) => (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-1">
            <label className="text-xs font-bold text-gray-500">CASA</label>
            <input type="number" value={data.homeScore} onChange={(e) => onChange('homeScore', e.target.value)} className="w-full p-3 bg-white border rounded-lg text-center font-black text-xl" />
        </div>
        <div className="flex-1">
            <label className="text-xs font-bold text-gray-500">OSPITI</label>
            <input type="number" value={data.awayScore} onChange={(e) => onChange('awayScore', e.target.value)} className="w-full p-3 bg-white border rounded-lg text-center font-black text-xl" />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-gray-500">GIORNATA / INFO</label>
        <input type="text" value={data.matchDay} onChange={(e) => onChange('matchDay', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" />
      </div>
    </div>
  )
};