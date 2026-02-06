import React from 'react';
import { Trophy } from 'lucide-react';

// --- LAYOUT (Visualizzazione Grafica) ---
/**
 * MatchInfo - The header block of graphics
 * @param {Object} data - All template data
 * @param {Object} theme - Visual theme
 */
export const MatchInfo = ({ data, theme, className = "" }) => {
  // NEW: Flexible title parts
  const mainTitle = data.headerTitle || "TITLE";
  const accentTitle = data.headerValue || "";

  return (
    <div className={`relative text-center ${className}`}>
        {/* Glow effect for background */}
        <div className={`absolute left-1/2 top-0 -translate-x-1/2 w-64 h-24 blur-[80px] opacity-20 rounded-full bg-gradient-to-r ${theme?.primary || 'from-orange-500 to-red-600'}`}></div>

        <div className="relative z-10 flex flex-col items-center">
            {/* Title Section with skew and improved spacing */}
            <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl flex items-baseline gap-3 leading-none">
                <span className="inline-block transform -skew-x-8">{mainTitle}</span>
                {accentTitle && (
                  <span className={`inline-block transform -skew-x-8 ${theme?.accent || "text-orange-500"} drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
                    {accentTitle}
                  </span>
                )}
            </h1>
            
            {/* Championship / Subtitle bar with better styling */}
            {data.championship && (
                <div className="flex justify-center items-center gap-2.5 mt-1.5 px-6 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Trophy size={14} className={theme?.accent || "text-orange-500"} />
                    <span className="text-white/90 font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
                        {data.championship}
                    </span>
                </div>
            )}
        </div>

        {/* Bottom decorative line - reduced margin */}
        <div className="w-1/3 h-px mx-auto mt-3 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
};

// --- CONTROLS (Pannello Editor) ---
export const MatchInfoControls = ({ data, onChange }) => {
  return (
    <div className="py-5 border-b border-gray-100 italic">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 not-italic">
        <Trophy size={14} className="text-gray-900" />
        Testata Grafica
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4 not-italic">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase block tracking-tighter ml-1">Parte Bianca</label>
          <input 
              type="text" 
              value={data.headerTitle || ''} 
              onChange={(e) => onChange('headerTitle', e.target.value)} 
              className="w-full p-3 bg-gray-50 border-transparent focus:bg-white focus:border-gray-900 border rounded-xl text-xs font-black uppercase italic tracking-tight transition-all" 
              placeholder="GIORNATA"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase block tracking-tighter ml-1 text-right mr-1">Parte Colorata</label>
          <input 
              type="text" 
              value={data.headerValue || ''} 
              onChange={(e) => onChange('headerValue', e.target.value)} 
              className="w-full p-3 bg-gray-50 border-transparent focus:bg-white focus:border-gray-900 border rounded-xl text-xs font-black uppercase italic tracking-tight transition-all text-right" 
              placeholder="1"
          />
        </div>
      </div>

      <div className="not-italic space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase block ml-1 tracking-tighter">Campionato</label>
        <div className="relative group">
          <Trophy size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
          <input 
              type="text" 
              value={data.championship || ''} 
              onChange={(e) => onChange('championship', e.target.value)} 
              className="w-full pl-10 p-3 bg-gray-50 border-transparent focus:bg-white focus:border-gray-900 border rounded-xl text-xs font-bold transition-all" 
              placeholder="Nome competizione"
          />
        </div>
      </div>
    </div>
  );
};