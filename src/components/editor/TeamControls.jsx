import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import ImageUploader from './ImageUploader';

const TeamControls = ({ data, onChange }) => {
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
  };

  return (
    <div className="space-y-2 pb-4 border-b border-gray-100">
      <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Squadre</h3>
      <div className="relative">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <input 
              type="text" 
              value={data.homeTeam} 
              onChange={(e) => onChange('homeTeam', e.target.value)} 
              className="w-full p-3 bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-xl text-sm font-bold transition-all" 
              placeholder="Casa" 
            />
          </div>
          <div className="space-y-1">
            <input 
              type="text" 
              value={data.awayTeam} 
              onChange={(e) => onChange('awayTeam', e.target.value)} 
              className="w-full p-3 bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-xl text-sm font-bold transition-all" 
              placeholder="Ospiti" 
            />
          </div>
        </div>
        {/* Swap Button */}
        <button
          onClick={handleSwapTeams}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-md hover:bg-orange-500 hover:border-orange-600 hover:text-white transition-all"
          title="Inverti squadre (Casa ↔ Trasferta)"
        >
          <ArrowLeftRight size={16} />
        </button>
      </div>
      
      {/* Logo Uploaders */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <ImageUploader 
          value={data.homeLogo} 
          onChange={(val) => onChange('homeLogo', val)} 
          label="Logo Casa" 
        />
        <ImageUploader 
          value={data.awayLogo} 
          onChange={(val) => onChange('awayLogo', val)} 
          label="Logo Ospiti" 
        />
      </div>
    </div>
  );
};

export default TeamControls;
