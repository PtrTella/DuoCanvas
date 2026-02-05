import React from 'react';
import TeamDisplay from '../ui/TeamDisplay';
import TeamControls from '../editor/TeamControls';

// --- LAYOUT ---
export const TeamMatchup = ({ data, theme }) => {
  return (
    <div className="flex items-center justify-between w-full px-2 mb-6">
      {/* Home */}
      <div className="w-[40%]">
         <TeamDisplay 
            name={data.homeTeam} 
            logoSrc={data.homeLogo}
            theme={theme}
         />
      </div>

      {/* VS */}
      <div className="w-[20%] flex flex-col items-center justify-center">
         <div className="text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 transform -skew-x-12">
           VS
         </div>
      </div>

      {/* Away */}
      <div className="w-[40%]">
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
export const TeamMatchupControls = ({ data, onChange }) => (
  <TeamControls data={data} onChange={onChange} />
);
