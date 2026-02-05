import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

// --- LAYOUT ---
export const MatchDetails = ({ data, theme, className = "" }) => {
  const {
      labelDate = "Data",
      labelTime = "Ora",
      labelArena = "Arena",
      labelAddress = "Indirizzo"
  } = data;

  // Configurazione icone
  const items = [
      { icon: Calendar, label: labelDate, value: data.date },
      { icon: Clock, label: labelTime, value: data.time },
      { icon: MapPin, label: labelArena, value: data.arena },
      { icon: Navigation, label: labelAddress, value: data.arenaAddress }
  ];

  return (
    <div className={`mt-auto pt-4 pb-1 w-full ${className}`}>
        {/* Layout distribuito ma non agli estremi */}
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-evenly gap-x-8 gap-y-3">
            {items.map((item, idx) => {
                // Saltiamo se non c'è valore (es. indirizzo vuoto)
                if (!item.value) return null;
                
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
  const {
      labelSectionDetails = "Info Evento",
      labelDate = "Data",
      labelTime = "Ora",
      labelArena = "Arena",
      labelAddress = "Indirizzo"
  } = data;

  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
        <Clock size={14} className="text-gray-300" />
        {labelSectionDetails}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase">{labelDate}</label>
          <input 
              type="text" value={data.date} 
              onChange={(e) => onChange('date', e.target.value)} 
              className="w-full p-2 bg-gray-50 border rounded-lg text-sm" 
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase">{labelTime}</label>
          <input 
              type="text" value={data.time} 
              onChange={(e) => onChange('time', e.target.value)} 
              className="w-full p-2 bg-gray-50 border rounded-lg text-sm" 
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase">{labelArena}</label>
          <input 
              type="text" value={data.arena} 
              onChange={(e) => onChange('arena', e.target.value)} 
              className="w-full p-2 bg-gray-50 border rounded-lg text-sm" 
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase">{labelAddress}</label>
          <input 
              type="text" value={data.arenaAddress || ''} 
              onChange={(e) => onChange('arenaAddress', e.target.value)} 
              className="w-full p-2 bg-gray-50 border rounded-lg text-sm" 
          />
        </div>
      </div>
    </div>
  );
};