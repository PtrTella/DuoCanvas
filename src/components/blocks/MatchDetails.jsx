import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

// --- LAYOUT ---
export const MatchDetails = ({ data, theme, className = "" }) => {
  // Configurazione icone
  const items = [
      { icon: Calendar, label: "Data", value: data.date },
      { icon: Clock, label: "Ora", value: data.time },
      { icon: MapPin, label: "Arena", value: data.arena },
      { icon: Navigation, label: "Indirizzo", value: data.arenaAddress }
  ];

  return (
    <div className={`mt-auto pt-4 border-t border-white/20 w-full ${className}`}>
        {/* Layout a riga unica (flex) distribuito */}
        <div className="flex flex-wrap items-center justify-between gap-4">
            {items.map((item, idx) => {
                // Saltiamo se non c'è valore (es. indirizzo vuoto)
                if (!item.value) return null;
                
                const Icon = item.icon;
                return (
                    <div key={idx} className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md bg-gradient-to-br ${theme?.primary || 'from-orange-500 to-red-600'} shadow-md`}>
                             <Icon size={14} className="text-white"/>
                        </div>
                        <div className="flex flex-col">
                            {/* Etichetta piccola sopra */}
                            <span className="text-[8px] text-white/50 font-bold uppercase tracking-widest leading-none mb-0.5">
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
export const MatchDetailsControls = ({ data, onChange }) => (
  <div className="pt-4 border-t border-gray-100">
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Info Evento</h3>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase">Data</label>
        <input 
            type="text" value={data.date} 
            onChange={(e) => onChange('date', e.target.value)} 
            className="w-full p-2 bg-gray-50 border rounded-lg text-sm" 
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase">Ora</label>
        <input 
            type="text" value={data.time} 
            onChange={(e) => onChange('time', e.target.value)} 
            className="w-full p-2 bg-gray-50 border rounded-lg text-sm" 
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase">Arena</label>
        <input 
            type="text" value={data.arena} 
            onChange={(e) => onChange('arena', e.target.value)} 
            className="w-full p-2 bg-gray-50 border rounded-lg text-sm" 
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase">Indirizzo</label>
        <input 
            type="text" value={data.arenaAddress || ''} 
            onChange={(e) => onChange('arenaAddress', e.target.value)} 
            className="w-full p-2 bg-gray-50 border rounded-lg text-sm" 
        />
      </div>
    </div>
  </div>
);