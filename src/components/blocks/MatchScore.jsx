import React from 'react';
import TeamDisplay from '../UI/TeamDisplay';
import { CONTROL_THEMES } from '../../data/templateRegistry';

// --- LAYOUT ---
export const MatchScore = ({ data, theme, className = "", children }) => {
  return (
    <div className={`flex items-center justify-between w-full px-2 ${className}`}>
      {/* Team Left */}
      <div className="w-[35%]">
         <TeamDisplay 
            name={data.homeTeam} 
            logoSrc={data.homeLogo}
            theme={theme}
         />
      </div>

      {/* Score Center */}
      <div className="w-[30%] flex flex-col items-center justify-center">
         <div className="text-[120px] font-black leading-none text-white drop-shadow-2xl flex items-center gap-3">
            <span>{data.homeScore}</span>
            <span className="text-white/40 text-7xl">:</span>
            <span>{data.awayScore}</span>
         </div>
         <div className="mt-3 px-4 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
            Finale
         </div>
         {/* Optional children (e.g., topScorer) */}
         {children}
      </div>

      {/* Team Right */}
      <div className="w-[35%]">
         <TeamDisplay 
            name={data.awayTeam} 
            logoSrc={data.awayLogo} 
            theme={theme} 
         />
      </div>
    </div>
  );
};

// --- CONTROLS ---
export const MatchScoreControls = ({ data, onChange, accentColor = "orange" }) => {
  const colors = CONTROL_THEMES[accentColor] || CONTROL_THEMES.orange;

  return (
    <div className={`p-3 rounded-xl border mb-4 ${colors.wrapper}`}>
      <label className={`text-xs font-bold uppercase mb-2 block text-center ${colors.label}`}>Punteggio</label>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          value={data.homeScore}
          onChange={(e) => onChange('homeScore', e.target.value)}
          className={`p-3 text-center text-2xl font-black border-2 border-white rounded-xl shadow-sm ${colors.focus}`}
          placeholder="0"
        />
        <input
          type="number"
          value={data.awayScore}
          onChange={(e) => onChange('awayScore', e.target.value)}
          className={`p-3 text-center text-2xl font-black border-2 border-white rounded-xl shadow-sm ${colors.focus}`}
          placeholder="0"
        />
      </div>
    </div>
  );
};
