import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

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
      { icon: Calendar, label: labelDate, value: data.date },
      { icon: Clock, label: labelTime, value: data.time },
      { icon: MapPin, label: labelBuilding, value: data.building },
      { icon: Navigation, label: labelAddress, value: data.address }
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
  const inputStyle = "w-full p-3 bg-gray-50 border-transparent focus:bg-white focus:border-gray-900 border rounded-xl text-xs font-bold transition-all";
  const labelStyle = "text-[10px] font-bold text-gray-400 uppercase block mb-1 tracking-tighter ml-1";

  return (
    <div className="py-5 border-b border-gray-100 last:border-0">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <MapPin size={14} className="text-gray-900" />
        LOGISTICA
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={labelStyle}>Data</label>
          <div className="relative group">
            <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
            <input 
                type="text" value={data.date} 
                onChange={(e) => onChange('date', e.target.value)} 
                className={`${inputStyle} pl-10`} 
                placeholder="Sabato 15 Feb"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className={labelStyle}>Orario</label>
          <div className="relative group">
            <Clock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
            <input 
                type="text" value={data.time} 
                onChange={(e) => onChange('time', e.target.value)} 
                className={`${inputStyle} pl-10`} 
                placeholder="20:30"
            />
          </div>
        </div>
        <div className="space-y-1 col-span-2">
          <label className={labelStyle}>Impianto</label>
          <div className="relative group">
            <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
            <input 
                type="text" value={data.building} 
                onChange={(e) => onChange('building', e.target.value)} 
                className={`${inputStyle} pl-10`} 
                placeholder="PalaDozza"
            />
          </div>
        </div>
        <div className="space-y-1 col-span-2">
          <label className={labelStyle}>Indirizzo</label>
          <div className="relative group">
            <Navigation size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
            <input 
                type="text" value={data.address || ''} 
                onChange={(e) => onChange('address', e.target.value)} 
                className={`${inputStyle} pl-10`} 
                placeholder="Via Calori 1, Bologna"
            />
          </div>
        </div>
      </div>
    </div>
  );
};