import React from 'react';
import { Star } from 'lucide-react';

/**
 * BasketMatchExtra - Renders extra info for basket match results.
 * Includes MVP/Top Scorer and potentially other notes.
 */
export const BasketMatchExtra = ({ data, theme }) => {
  if (!data.topScorer && !data.matchNote) return null;

  const labelMvp = data.labelMvp || "MVP / Top Scorer";

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      {data.topScorer && (
        <div 
          className="px-8 py-2.5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden group"
          style={{ 
            background: theme.bg === 'bg-white' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)',
          }}
        >
          {/* Animated Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.primary} opacity-20 group-hover:opacity-30 transition-opacity`} />
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[0.2em] opacity-60 text-white uppercase mb-0.5">
              {labelMvp}
            </span>
            <span className="text-2xl font-black text-white uppercase tracking-tight drop-shadow-sm">
              {data.topScorer}
            </span>
          </div>
        </div>
      )}

      {data.matchNote && (
        <div className="max-w-[80%] text-center">
            <p className="text-white/70 text-sm font-medium italic leading-tight">
                "{data.matchNote}"
            </p>
        </div>
      )}
    </div>
  );
};

export const BasketMatchExtraControls = ({ data, onChange }) => {
  return (
    <div className="py-4 border-b border-gray-100 italic">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2 not-italic">
        <Star size={14} className="text-gray-300" />
        Dettagli Risultato
      </h3>
      
      <div className="space-y-3 not-italic">
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase mb-1.5 block">MVP / Top Scorer</label>
          <input 
            type="text" 
            className="w-full p-3 text-xs bg-gray-50 border rounded-xl focus:bg-white focus:border-gray-900 transition-all outline-none"
            placeholder="Esempio: Tellarini (24 pt)"
            value={data.topScorer || ''} 
            onChange={(e) => onChange('topScorer', e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase mb-1.5 block">Nota Partita</label>
          <textarea 
            className="w-full p-3 text-xs bg-gray-50 border rounded-xl focus:bg-white focus:border-gray-900 transition-all outline-none h-20 resize-none"
            placeholder="Esempio: Vittoria voluta e sudata dopo un tempo supplementare..."
            value={data.matchNote || ''} 
            onChange={(e) => onChange('matchNote', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
