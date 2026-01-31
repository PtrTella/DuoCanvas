import React from 'react';
import { Trophy } from 'lucide-react';

// --- LAYOUT (Visualizzazione Grafica) ---
export const MatchInfo = ({ data, theme, className = "", matchDayLabel = "MATCH DAY", hideChampionship = false }) => {
  return (
    <div className={`text-center border-b border-white/20 pb-4 ${className}`}>
        {/* Titolo Principale */}
        <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg transform -skew-x-6">
            {matchDayLabel} <span className={theme?.accent || "text-orange-500"}>{data.matchDay}</span>
        </h1>
        
        {/* Sottotitolo Campionato (Opzionale) */}
        {!hideChampionship && (
            <div className="flex justify-center items-center gap-3 text-white/80 mt-1 font-bold uppercase tracking-[0.2em] text-sm">
                <Trophy size={16} className={theme?.accent || "text-orange-500"} />
                <span>{data.championship}</span>
            </div>
        )}
    </div>
  );
};

// --- CONTROLS (Pannello Editor) ---
export const MatchInfoControls = ({ data, onChange }) => (
  <div className="pb-4 mb-4 border-b border-gray-100">
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Intestazione</h3>
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-1">
        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Giornata</label>
        <input 
            type="text" 
            value={data.matchDay} 
            onChange={(e) => onChange('matchDay', e.target.value)} 
            className="w-full p-2 bg-white border rounded-lg text-sm text-center font-bold" 
            placeholder="12"
        />
      </div>
      <div className="col-span-2">
        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Campionato</label>
        <input 
            type="text" 
            value={data.championship} 
            onChange={(e) => onChange('championship', e.target.value)} 
            className="w-full p-2 bg-white border rounded-lg text-sm" 
            placeholder="Serie D"
        />
      </div>
    </div>
  </div>
);