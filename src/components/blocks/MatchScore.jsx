import React from 'react';
import TeamDisplay from '../UI/TeamDisplay';
import { CONTROL_THEMES } from '../../data/templateRegistry';

// --- LAYOUT ---
export const MatchScore = ({ data, theme, className = "", children }) => {
  return (
    <div className={`flex items-center justify-between w-full px-6 ${className}`}>
      {/* Team Left */}
      <div className="w-[35%]">
         <TeamDisplay 
            name={data.homeTeam} 
            logoSrc={data.homeLogo}
            theme={theme}
            logoSize="w-40 h-40 md:w-48 md:h-48"
            textSize="text-4xl"
         />
      </div>

      {/* Score Center */}
      <div className="w-[30%] flex flex-col items-center justify-center">
         <div className="text-[140px] font-black leading-none text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center gap-3">
            <span>{data.homeScore}</span>
            <span className="text-white/30 text-7xl">:</span>
            <span>{data.awayScore}</span>
         </div>
         <div className={`mt-4 px-6 py-1.5 bg-gradient-to-r ${theme?.primary || 'from-emerald-600 to-green-600'} rounded-full text-sm font-black uppercase tracking-[0.2em] text-white shadow-lg border border-white/20 backdrop-blur-sm`}>
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
            logoSize="w-40 h-40 md:w-48 md:h-48"
            textSize="text-4xl"
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
