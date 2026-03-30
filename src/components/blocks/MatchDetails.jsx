import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import ControlSection from '../ui/ControlSection';
import { Input } from '../ui/EditorFields';

// --- LAYOUT ---
export const MatchDetails = ({ data, theme, className = "" }) => {
  const {
      labelDate = "Data",
      labelTime = "Ora",
      labelBuilding = "Impianto",
      labelAddress = "Indirizzo"
  } = data;

  // Configurazione icone
  const items = [
      { icon: Calendar, label: "Data", value: data.date },
      { icon: Clock, label: "Ora", value: data.time },
      { icon: MapPin, label: "Arena", value: data.building },
      { icon: Navigation, label: "Indirizzo", value: data.address }
  ];

  return (
    <div className={`mt-auto pt-4 pb-1 w-full flex items-center justify-center ${className}`}>
        {/* Layout distribuito ma non agli estremi */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
            {items.map((item, idx) => {
                // Saltiamo se non c'è valore
                if (!item.value || !item.value.trim()) return null;
                
                const Icon = item.icon;
                return (
                    <div key={idx} className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md bg-gradient-to-br ${theme?.primary || 'from-orange-500 to-red-600'} shadow-md`}>
                             <Icon size={34} className="text-white"/>
                        </div>
                        <div className="flex flex-col">
                            {/* Etichetta piccola sopra */}
                            <span className="text-[18px] text-white/50 font-bold uppercase tracking-widest leading-none mb-0.5">
                                {item.label}
                            </span>
                            {/* Valore grande sotto */}
                            <span className="text-sm font-bold text-white uppercase leading-none whitespace-nowrap">
                                {item.value}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};

// --- CONTROLS ---
export const MatchDetailsControls = ({ data, onChange }) => {
  return (
    <ControlSection title="Logistica" icon={MapPin}>
      <div className="flex gap-3 -mt-1">
        <Input 
            label="Data"
            icon={Calendar}
            value={data.date} 
            onChange={(e) => onChange('date', e.target.value)} 
            placeholder="Sabato 15 Feb"
        />
        <Input 
            label="Orario"
            icon={Clock}
            value={data.time} 
            onChange={(e) => onChange('time', e.target.value)} 
            placeholder="20:30"
        />
      </div>
      
      <div className="pt-2">
        <Input 
            label="Impianto"
            icon={MapPin}
            value={data.building} 
            onChange={(e) => onChange('building', e.target.value)} 
            placeholder="PalaDozza"
        />
      </div>

      <div className="pt-2">
        <Input 
            label="Indirizzo"
            icon={Navigation}
            value={data.address || ''} 
            onChange={(e) => onChange('address', e.target.value)} 
            placeholder="Via Calori 1, Bologna"
        />
      </div>
    </ControlSection>
  );
};