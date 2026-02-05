import React from 'react';
import TeamDisplay from '../ui/TeamDisplay';
import TeamControls from '../editor/TeamControls';

// --- LAYOUT ---
export const TeamMatchup = ({ data, theme }) => {
  return (
    <div className="flex items-start justify-between w-full px-2 mb-6">
      {/* Home */}
      <div className="w-[40%] flex flex-col items-center">
         <TeamDisplay 
            name={data.homeTeam} 
            logoSrc={data.homeLogo}
            theme={theme}
         />
      </div>

      {/* VS */}
      <div className="w-[20%] flex flex-col items-center">
         <div className="h-32 md:h-40 flex items-center justify-center">
            <div className="text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 transform -skew-x-12">
              VS
            </div>
         </div>
      </div>

      {/* Away */}
      <div className="w-[40%] flex flex-col items-center">
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
