import React from 'react';
import { ArrowLeftRight, Users } from 'lucide-react';
import ControlSection from '../ui/ControlSection';
import { Input, ImageUploader } from '../ui/EditorFields';

const TeamControls = ({ data, onChange, onSwap }) => {
  const handleSwapTeams = () => {
    // Store current values
    const tempHomeTeam = data.homeTeam;
    const tempAwayTeam = data.awayTeam;
    const tempHomeLogo = data.homeLogo;
    const tempAwayLogo = data.awayLogo;
    
    // Swap teams and logos
    onChange('homeTeam', tempAwayTeam);
    onChange('awayTeam', tempHomeTeam);
    onChange('homeLogo', tempAwayLogo);
    onChange('awayLogo', tempHomeLogo);

    // Call optional extra swap (e.g. for scores)
    if (onSwap) onSwap();
  };

  return (
    <ControlSection title="Squadre & Loghi" icon={Users}>
      <div className="relative not-italic">
        <div className="flex gap-3">
          <Input 
            value={data.homeTeam} 
            onChange={(e) => onChange('homeTeam', e.target.value)} 
            placeholder="Casa" 
          />
          <Input 
            value={data.awayTeam} 
            onChange={(e) => onChange('awayTeam', e.target.value)} 
            placeholder="Ospiti" 
            align="right"
          />
        </div>
        {/* Swap Button */}
        <button
          onClick={handleSwapTeams}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-md hover:bg-gray-950 hover:border-gray-950 hover:text-white transition-all z-20 group"
          title="Inverti squadre (Casa ↔ Trasferta)"
        >
          <ArrowLeftRight size={14} strokeWidth={2.5} className="group-active:scale-125 transition-transform" />
        </button>
      </div>
      
      {/* Logo Uploaders */}
      <div className="flex gap-3 mt-3">
        <ImageUploader 
          value={data.homeLogo} 
          onChange={(val) => onChange('homeLogo', val)} 
          label="Logo Casa" 
        />
        <ImageUploader 
          value={data.awayLogo} 
          onChange={(val) => onChange('awayLogo', val)} 
          label="Logo Ospiti" 
          className="text-right"
        />
      </div>
    </ControlSection>
  );
};

export default TeamControls;
