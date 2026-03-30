import React from 'react';
import { Star, Trophy } from 'lucide-react';
import ControlSection from '../ui/ControlSection';
import { Input } from '../ui/EditorFields';

/**
 * BasketMatchExtra - Renders extra info for basket match results.
 * Includes MVP/Top Scorer and potentially other notes.
 */
export const BasketMatchExtra = ({ data, theme }) => {
  const labelMvp = data.labelMvp || "MVP / Top Scorer";
  
  const homeParts = (data.homePartials || "").split('-').filter(p => p.trim());
  const awayParts = (data.awayPartials || "").split('-').filter(p => p.trim());
  const count = Math.max(homeParts.length, awayParts.length);

  // Helper per ridimensionare dinamicamente in base al numero di elementi
  const getStyles = () => {
    if (count > 5) return { 
      box: "px-3 py-2 gap-2", 
      text: "text-2xl", 
      label: "text-xl", 
      gap: "gap-4", 
      line: "h-6",
      container: "max-w-full" 
    };
    if (count > 4) return { 
      box: "px-4 py-2 gap-3", 
      text: "text-3xl", 
      label: "text-2xl", 
      gap: "gap-6", 
      line: "h-7",
      container: "max-w-5xl"
    };
    return { 
      box: "px-5 py-3 gap-3", 
      text: "text-4xl", 
      label: "text-4xl", 
      gap: "gap-10", 
      line: "h-8",
      container: "max-w-4xl"
    };
  };

  const styles = getStyles();

  if (count === 0 && !data.topScorer) return null;

  return (
    <div className="flex flex-col items-center gap-8 mt-2 w-full px-12">
      {/* Punti Parziali (Quarti/OT) */}
      {count > 0 && (
        <div className={`w-full ${styles.container}`}>
           <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center ${styles.gap} flex-wrap`}>
                {Array.from({ length: count }).map((_, idx) => {
                  const homeP = homeParts[idx] || "0";
                  const awayP = awayParts[idx] || "0";
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <span className={`${styles.label} font-black uppercase tracking-tighter mb-1 ${theme.accent} drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] italic`}>
                        {idx >= 4 ? (idx === 4 ? 'OT' : `OT${idx-3}`) : `${idx + 1}°Q`}
                      </span>
                      <div className={`flex items-center ${styles.box} bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl overflow-hidden relative`}>
                        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${theme.primary} opacity-40`} />
                        <span className={`text-white font-black ${styles.text} tracking-tighter tabular-nums drop-shadow-md`}>
                          {homeP}
                        </span>
                        <div className={`w-px ${styles.line} bg-white/10`} />
                        <span className={`text-white font-black ${styles.text} tracking-tighter tabular-nums drop-shadow-md`}>
                          {awayP}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
           </div>
        </div>
      )}

      {/* MVP Section */}
      {data.topScorer && (
        <div 
          className="px-12 py-4 rounded-[2rem] backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden"
          style={{ 
            background: theme.bg === 'bg-white' ? 'white' : 'rgba(0,0,0,0.5)',
          }}
        >
          {/* Light Glow background */}
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.primary} opacity-10`} />
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[11px] font-black tracking-[0.3em] opacity-40 text-white uppercase mb-1">
              {labelMvp}
            </span>
            <span className="text-4xl font-black text-white uppercase tracking-tight drop-shadow-lg italic">
              {data.topScorer}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const BasketMatchExtraControls = ({ data, onChange }) => {
  return (
    <ControlSection title="Dettagli Basket" icon={Star}>
      <div className="space-y-4 not-italic -mt-1">
        <div className="flex gap-3">
          <Input 
            label="Parziali Casa"
            placeholder="15-20-10-25"
            className="font-mono"
            value={data.homePartials || ''} 
            onChange={(e) => onChange('homePartials', e.target.value)}
          />
          <Input 
            label="Parziali Ospiti"
            placeholder="12-18-15-20"
            className="font-mono text-right"
            labelClassName="text-right mr-1"
            value={data.awayPartials || ''} 
            onChange={(e) => onChange('awayPartials', e.target.value)}
          />
        </div>

        <Input 
          label="MVP / Top Scorer"
          icon={Trophy}
          placeholder="Esempio: Tellarini (24 pt)"
          value={data.topScorer || ''} 
          onChange={(e) => onChange('topScorer', e.target.value)}
        />
      </div>
    </ControlSection>
  );
};
