import React from 'react';
import TeamDisplay from '../ui/TeamDisplay';
import { Trophy } from 'lucide-react';
import TeamControls from '../editor/TeamControls';

// --- LAYOUT ---
export const MatchScore = ({ data, theme, className = "", children }) => {
  return (
    <div className={`flex items-start justify-between w-full px-6 ${className}`}>
      {/* Team Left */}
      <div className="w-[28%] flex flex-col items-center">
         <TeamDisplay 
            name={data.homeTeam} 
            logoSrc={data.homeLogo}
            theme={theme}
            logoSize="w-40 h-40 md:w-48 md:h-48"
            textSize="text-4xl"
         />
      </div>

      {/* Score Center */}
      <div className="w-[44%] flex flex-col items-center">
         <div className="h-40 md:h-48 flex items-center justify-center">
            <div 
               className="text-[170px] font-black leading-none text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex items-center gap-2"
               style={{ fontFamily: 'Impact, sans-serif' }}
            >
               <span className="tracking-tighter">{data.homeScore || "0"}</span>
               <span className="text-white/20 text-8xl -mt-4">:</span>
               <span className="tracking-tighter">{data.awayScore || "0"}</span>
            </div>
         </div>
         <div className={`mt-5 px-8 py-2 bg-gradient-to-r ${theme?.primary || 'from-emerald-600 to-green-600'} rounded-full text-base font-black uppercase tracking-[0.3em] text-white shadow-xl border border-white/20 backdrop-blur-sm`}>
            Finale
         </div>
         {/* Optional children (e.g., topScorer) */}
         {children}
      </div>

      {/* Team Right */}
      <div className="w-[28%] flex flex-col items-center">
         <TeamDisplay 
            name={data.awayTeam} 
            logoSrc={data.awayLogo} 
            theme={theme} 
            logoSize="w-40 h-40 md:w-48 md:h-48"
            textSize="text-4xl"
         />
      </div>
    </div>
  );
};

// --- CONTROLS ---
export const MatchScoreControls = ({ data, onChange }) => {
  const handleScoreSwap = () => {
    const tempHome = data.homeScore;
    onChange('homeScore', data.awayScore);
    onChange('awayScore', tempHome);
  };

  return (
    <div className="space-y-1">
      {/* 1. Teams & Logos included here */}
      <TeamControls data={data} onChange={onChange} onSwap={handleScoreSwap} />

      {/* 2. Score Specific Controls */}
      <div className="py-4 border-b border-gray-100 italic">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2 not-italic">
          <Trophy size={14} className="text-gray-300" />
          Punteggio Match
        </h3>
        <div className="grid grid-cols-2 gap-4 not-italic">
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[9px] font-bold text-gray-400 uppercase tracking-tighter z-10">Casa</span>
            <input
              type="number"
              value={data.homeScore}
              onChange={(e) => onChange('homeScore', e.target.value)}
              className="w-full p-3 text-center text-3xl font-black bg-gray-50 border-2 border-transparent focus:bg-white focus:border-gray-900 rounded-2xl transition-all"
              placeholder="0"
            />
          </div>
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[9px] font-bold text-gray-400 uppercase tracking-tighter z-10">Ospiti</span>
            <input
              type="number"
              value={data.awayScore}
              onChange={(e) => onChange('awayScore', e.target.value)}
              className="w-full p-3 text-center text-3xl font-black bg-gray-50 border-2 border-transparent focus:bg-white focus:border-gray-900 rounded-2xl transition-all"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
