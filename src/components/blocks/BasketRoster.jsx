import React from 'react';

// --- MARKER GIOCATORE (CAMPO) ---
// Stile Cyber/NBA per i titolari
const CourtPlayer = ({ number, name, theme, positionStyle }) => {
  const accentColor = theme?.accentColor || '#ea580c';
  const shadowColor = theme?.primary?.split(' ')[1]?.replace('to-', '') || accentColor;

  return (
    <div 
      className="absolute flex flex-col items-center justify-center z-20"
      style={{ ...positionStyle, transform: 'translate(-50%, -50%)' }}
    >
      {/* Number Card (Squircle) */}
      <div 
        className="w-24 h-24 md:w-30 md:h-30 flex items-center justify-center bg-black/90 backdrop-blur-md relative overflow-hidden shadow-2xl border-2"
        style={{ 
          borderColor: accentColor,
          borderRadius: '28px',
          boxShadow: `0 0 25px ${shadowColor}40`
        }} 
      >
          {/* Top Accent Line */}
          <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme?.primary || 'from-orange-500 to-red-600'}`}></div>
          <span className="text-6xl md:text-7xl font-black italic text-white tracking-tighter z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Impact, sans-serif' }}>
              {number}
          </span>
      </div>
      
      {/* Name Badge */}
      <div className="mt-3 relative">
         <div className={`px-5 py-2 bg-gradient-to-r ${theme?.primary || 'from-orange-600 to-red-700'} skew-x-[-12deg] shadow-xl border border-white/20 relative`}>
            {/* Glow effect behind badge */}
            <div className={`absolute inset-0 blur-sm opacity-30 bg-white`}></div>
            <span className="relative block text-lg font-black text-white uppercase tracking-[0.1em] leading-none skew-x-[12deg] truncate max-w-[180px]">
               {name}
            </span>
         </div>
      </div>
    </div>
  );
};

// --- MARKER PANCHINA (LISTA) ---
const BenchPlayer = ({ number, name, theme }) => (
  <div 
    className="flex items-center gap-5 py-3.5 px-5 mb-2.5 bg-[#141414] border-l-[6px] relative overflow-hidden shadow-lg"
    style={{ borderLeftColor: theme?.accentColor || '#ea580c' }}
  >
      {/* Number */}
      <div className="w-12 text-right shrink-0 relative">
         <span className="text-3xl font-black italic text-white/90 drop-shadow-md" style={{ fontFamily: 'Impact, sans-serif' }}>
            {number}
         </span>
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
         <span className="block text-2xl font-black text-white uppercase tracking-tight truncate leading-tight">
            {name}
         </span>
      </div>
  </div>
);

// --- VISUALIZZAZIONE CAMPO BASKET (Mezzo Campo - Zoom Area) ---
const HalfCourt = ({ children, theme }) => {
    const isOrange = theme?.primary?.includes('orange');
    const paintColor = isOrange ? 'rgba(234, 88, 12, 0.1)' : 'rgba(255,255,255,0.04)';
    const paintBorder = isOrange ? 'rgba(234, 88, 12, 0.4)' : 'rgba(255,255,255,0.15)';

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#050505]">
            {/* Grid/Texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ 
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px' 
            }}></div>

            {/* --- LINEE DEL CAMPO --- */}
            {/* Three Point Line */}
            <div className="absolute top-[-35%] left-[-15%] right-[-15%] h-[95%] border-[3px] border-white/10 rounded-b-full shadow-[0_0_30px_rgba(255,255,255,0.03)]" 
                 style={{ borderTop: 'none' }}></div>

            {/* The Paint (Rounded Bottom) */}
            <div className="absolute top-[-10%] left-[22%] right-[22%] h-[58%] border-x-[3px] border-b-[3px] bg-gradient-to-b from-transparent to-white/5 rounded-b-[40px]" 
                 style={{ borderColor: paintBorder, backgroundColor: paintColor }}>
                 {/* Internal FT Hash */}
                 <div className="absolute bottom-[20%] left-0 right-0 h-[2px] bg-white/10"></div>
            </div>

             {/* Basket / Rim - Neon Style */}
            <div className="absolute top-[8%] left-[38%] right-[38%] h-2 bg-white/90 shadow-[0_0_20px_white] z-10 rounded-full"></div>
            <div className="absolute top-[10%] left-[44%] right-[44%] h-8 border-[4px] border-orange-500 rounded-full shadow-[0_0_25px_orange] z-10"></div>

            {children}
        </div>
    );
};

// --- STAFF BOX COMPONENT ---
// Stile "Broadcast Tag" per Coach e DS
const StaffBox = ({ label, name, theme }) => (
  <div className="flex flex-col items-center min-w-[220px] relative px-4">
    {/* Label Badge (Skewed) */}
    <div className={`px-5 py-px bg-gradient-to-r ${theme?.primary || 'from-orange-600 to-red-700'} skew-x-[-12deg] mb-1.5 shadow-xl border border-white/20`}>
      <span className="skew-x-[12deg] block text-[11px] font-black text-white uppercase tracking-[0.25em] leading-tight">
        {label}
      </span>
    </div>
    {/* Name Text */}
    <div className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'Impact, sans-serif' }}>
      {name}
    </div>
  </div>
);

// --- COMPONENTE PRINCIPALE ---
export const BasketRoster = ({ data, theme, className = "" }) => {
  const labelCoach = data.labelCoach || "Allenatore";
  const labelBench = data.labelBench || "Panchina";

  const parsePlayer = (line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      const match = trimmed.match(/^(\d+)?\s*(.*)$/);
      return {
        num: match ? (match[1] || '-') : '-',
        name: match ? match[2] : trimmed
      };
  };

  const allPlayers = data.rosterList ? data.rosterList.split('\n').map(parsePlayer).filter(Boolean) : [];
  const starters = allPlayers.slice(0, 5);
  const bench = allPlayers.slice(5).slice(0, 7); // Hard limit for alignment

  const positionsFinal = [
      { top: '35%', left: '50%' }, // Center
      { top: '34%', left: '16%' }, // Forward Left (Allargato)
      { top: '34%', left: '84%' }, // Forward Right (Allargato)
      { top: '65%', left: '32%' }, // Guard Left
      { top: '65%', left: '68%' }, // Guard Right
  ];

  return (
    <div className={`relative flex w-full h-full gap-8 p-5 rounded-2xl bg-black/20 ${className}`}>
        
        {/* -- SECTION 1: FIELD -- */}
        <div className="relative w-[65%] h-full border border-white/15 rounded-[50px] overflow-hidden shadow-2xl bg-black">
            <HalfCourt theme={theme}>
                {starters.map((player, idx) => (
                    <CourtPlayer 
                        key={idx}
                        number={player.num}
                        name={player.name}
                        theme={theme}
                        positionStyle={positionsFinal[idx] || { top: '50%', left: '50%' }}
                    />
                ))}
            </HalfCourt>

            {/* Staff Section - Omogenous bar at the bottom */}
            <div className="absolute bottom-0 inset-x-0 z-30 bg-[#0a0a0a] border-t-2 border-white/5 py-4 flex justify-center gap-16 items-center shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                 <StaffBox label={labelCoach} name={data.coach || '---'} theme={theme} />
                 {data.director && <StaffBox label="Dir. Sportivo" name={data.director} theme={theme} />}
            </div>
        </div>

        {/* -- SECTION 2: BENCH -- */}
        <div className="flex-1 h-full flex flex-col relative px-2">
            <div className="mb-5 pl-4 relative">
                <div className={`absolute left-0 top-1.5 bottom-1.5 w-1.5 bg-gradient-to-b ${theme.primary} rounded-full`}></div>
                <h3 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">
                    {labelBench}
                </h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-1">
                {bench.map((player, idx) => (
                    <BenchPlayer key={idx} number={player.num} name={player.name} theme={theme} />
                ))}
            </div>
        </div>
    </div>
  );
};

// -- CONTROLS (Reused Reuse simplified version of BasketRosterControls or pure text area) --
export const BasketRosterControls = ({ data, onChange }) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Coach</label>
                    <input 
                        type="text"
                        value={data.coach || ''}
                        onChange={(e) => onChange('coach', e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                        placeholder="Nome Coach"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Dir. Sportivo</label>
                    <input 
                        type="text"
                        value={data.director || ''}
                        onChange={(e) => onChange('director', e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                        placeholder="Nome DS (Opzionale)"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lista Giocatori</label>
                    <span className="text-[10px] text-gray-400">I primi 5 sono titolari</span>
                </div>
                <textarea
                    value={data.rosterList || ''}
                    onChange={(e) => onChange('rosterList', e.target.value)}
                    rows={10}
                    className="w-full text-xs font-mono bg-white border border-gray-200 rounded-lg p-3 focus:border-orange-500 outline-none resize-none"
                    placeholder="23 Michael Jordan..."
                />
            </div>
             <p className="text-[10px] text-gray-400 leading-tight italic">
                La panchina mostra i primi 7 giocatori dopo i titolari per mantenere l'allineamento grafico.
            </p>
        </div>
    );
};
