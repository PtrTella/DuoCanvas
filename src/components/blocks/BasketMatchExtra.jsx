import React from 'react';

/**
 * BasketMatchExtra - Renders extra info for basket match results.
 * Includes MVP/Top Scorer and potentially other notes.
 */
export const BasketMatchExtra = ({ data, theme, labels }) => {
  if (!data.topScorer && !data.matchNote) return null;

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
              {labels?.mvp || "MVP / Top Scorer"}
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
    <div className="space-y-4 py-4 border-b border-gray-100">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-1 w-1 rounded-full bg-orange-500" />
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Informazioni Extra</h3>
      </div>
      
      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase mb-1.5 block">MVP / Miglior Marcatore</label>
        <input 
          type="text" 
          className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-200 border rounded-xl transition-all"
          placeholder="Esempio: Tellarini (24 pt)"
          value={data.topScorer || ''} 
          onChange={(e) => onChange('topScorer', e.target.value)}
        />
      </div>

      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase mb-1.5 block">Nota Partita</label>
        <textarea 
          className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-200 border rounded-xl transition-all h-20"
          placeholder="Esempio: Vittoria voluta e sudata dopo un tempo supplementare..."
          value={data.matchNote || ''} 
          onChange={(e) => onChange('matchNote', e.target.value)}
        />
      </div>
    </div>
  );
};
