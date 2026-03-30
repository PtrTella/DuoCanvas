import React from 'react';
import { Trophy } from 'lucide-react';
import ControlSection from '../ui/ControlSection';
import { Input } from '../ui/EditorFields';

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
    <ControlSection title="Testata Grafica" icon={Trophy}>
      <div className="flex gap-3 -mt-1">
        <Input 
            label="Parte Bianca"
            value={data.headerTitle || ''} 
            onChange={(e) => onChange('headerTitle', e.target.value)} 
            placeholder="GIORNATA"
            className="font-black uppercase italic tracking-tight"
        />
        <Input 
            label="Parte Colorata"
            align="right"
            value={data.headerValue || ''} 
            onChange={(e) => onChange('headerValue', e.target.value)} 
            placeholder="1"
            className="font-black uppercase italic tracking-tight"
        />
      </div>

      <div className="pt-2">
        <Input 
            label="Campionato"
            icon={Trophy}
            value={data.championship || ''} 
            onChange={(e) => onChange('championship', e.target.value)} 
            placeholder="Nome competizione"
        />
      </div>
    </ControlSection>
  );
};