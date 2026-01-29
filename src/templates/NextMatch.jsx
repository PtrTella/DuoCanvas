import React from 'react';
import { Calendar, MapPin, Clock, Upload, Trophy, Users, Navigation } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import TeamLogo from '../components/UI/TeamLogo';

export const NextMatch = {
  id: 'fixture',
  name: 'Convocazioni (Big Teams)',
  icon: Users,

  Render: ({ data, theme, cardRef }) => {
    // Parser ottimizzato per dividere numero e nome
    const parsePlayer = (line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      const firstSpaceIndex = trimmed.indexOf(' ');
      if (firstSpaceIndex === -1) return { num: '', name: trimmed };
      return {
        num: trimmed.substring(0, firstSpaceIndex),
        name: trimmed.substring(firstSpaceIndex + 1)
      };
    };

    const players = data.rosterList 
      ? data.rosterList.split('\n').map(parsePlayer).filter(Boolean) 
      : [];

    return (
      <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full relative z-10">
            
            {/* 1. HEADER: MATCH DAY + CAMPIONATO */}
            <div className="text-center mb-4 pt-2 border-b border-white/20 pb-4">
                <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg transform -skew-x-6">
                    MATCH DAY <span className="text-orange-500">{data.matchDay}</span>
                </h1>
                <div className="flex justify-center items-center gap-3 text-white/80 mt-1 font-bold uppercase tracking-[0.2em] text-sm">
                    <Trophy size={16} className="text-orange-500" />
                    <span>{data.championship}</span>
                </div>
            </div>

            {/* 2. SQUADRE (Massicce e Centrate) */}
            <div className="flex items-center justify-between w-full mb-8 px-2">
              
              {/* Home */}
              <div className="flex flex-col items-center justify-center w-[40%] gap-2">
                 <div className="w-32 h-32 md:w-40 md:h-40 bg-black/20 rounded-full p-4 backdrop-blur-sm shadow-xl border border-white/5"> 
                     <TeamLogo src="/DuoCanvas/logos/duoligones.png" alt="Home" />
                 </div>
                 <h2 className="text-3xl font-black uppercase text-white leading-none tracking-tighter text-center drop-shadow-md">
                    {data.homeTeam}
                 </h2>
              </div>

              {/* VS */}
              <div className="w-[20%] flex flex-col items-center justify-center">
                 <div className="text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 transform -skew-x-12">
                   VS
                 </div>
              </div>

              {/* Away */}
              <div className="flex flex-col items-center justify-center w-[40%] gap-2">
                 <div className="w-32 h-32 md:w-40 md:h-40 bg-black/20 rounded-full p-4 backdrop-blur-sm shadow-xl border border-white/5">
                     <TeamLogo src={data.awayLogo} fallbackText="VS" />
                 </div>
                 <h2 className="text-3xl font-black uppercase text-white leading-none tracking-tighter text-center drop-shadow-md">
                    {data.awayTeam}
                 </h2>
              </div>
            </div>

            {/* 3. ROSTER (Più grande e spaziato) */}
            <div className="flex-1 w-full relative bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col justify-center overflow-hidden">
                
                {/* Etichetta laterale (FIXED: Ora usa writing-mode nativo) */}
                <div 
                    className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center border-r border-white/10 bg-white/5"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        Official Roster
                    </span>
                </div>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 pl-10 pr-4">
                    {players.map((p, index) => (
                        <div key={index} className="flex items-center gap-4 border-b border-white/10 pb-2">
                            {/* Numero Enorme */}
                            <div className={`text-4xl font-black italic ${theme.text} w-14 text-right tracking-tighter leading-none`}>
                                {p.num}
                            </div>
                            {/* Nome Grande */}
                            <div className="text-white font-bold uppercase tracking-tight text-xl truncate leading-none pt-1">
                                {p.name}
                            </div>
                        </div>
                    ))}
                    
                    {/* Empty State */}
                    {players.length === 0 && (
                        <div className="col-span-2 text-center text-white/30 py-10 font-mono text-sm">
                            Inserisci i giocatori...
                        </div>
                    )}
                </div>

                {/* Coach (Integrato nel box roster in basso) */}
                <div className="mt-6 flex justify-end items-center gap-3 opacity-90 border-t border-white/10 pt-4 mr-2">
                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Head Coach</span>
                    <span className="text-xl font-black text-white uppercase italic">{data.coach}</span>
                </div>
            </div>

            {/* 4. FOOTER INFO (Formattato come richiesto) */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                
                {/* Riga 1: Data e Ora */}
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.primary} shadow-lg`}>
                         <Calendar size={20} className="text-white"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-none">Data</span>
                        <span className="text-lg font-bold text-white uppercase">{data.date}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.primary} shadow-lg`}>
                         <Clock size={20} className="text-white"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-none">Ora</span>
                        <span className="text-lg font-bold text-white uppercase">{data.time}</span>
                    </div>
                </div>

                {/* Riga 2: Arena e Indirizzo (Stesso stile) */}
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.primary} shadow-lg`}>
                         <MapPin size={20} className="text-white"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-none">Arena</span>
                        <span className="text-lg font-bold text-white uppercase truncate max-w-[140px]">{data.arena}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.primary} shadow-lg`}>
                         <Navigation size={20} className="text-white"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-none">Indirizzo</span>
                        <span className="text-sm font-bold text-white uppercase leading-tight">{data.arenaAddress || "Via..."}</span>
                    </div>
                </div>

            </div>

        </div>
      </BaseCard>
    );
  },

  Controls: ({ data, onChange }) => (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* SEZIONE 1: Match Info */}
      <div>
         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-1 mb-3">Info Match</h3>
         <div className="space-y-3">
            <div>
                <label className="text-xs font-bold text-gray-500">CAMPIONATO</label>
                <input type="text" value={data.championship || ''} onChange={(e) => onChange('championship', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" placeholder="Serie D" />
            </div>
            
            {/* Upload Logo Away (FIXED: Usa FileReader per Base64) */}
            <div className="pt-2">
                <label className="text-xs font-bold text-gray-500 mb-1 block">LOGO AVVERSARIO</label>
                <div className="flex items-center gap-2">
                    <label className="cursor-pointer flex-1 flex items-center justify-center gap-2 p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-bold text-gray-700 transition-colors">
                        <Upload size={16} />
                        {data.awayLogo ? 'Sostituisci' : 'Carica Logo'}
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    // FIX CRUCIALE: Convertiamo in Base64 per evitare errori di download
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        onChange('awayLogo', reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} 
                        />
                    </label>
                    {data.awayLogo && <div className="w-10 h-10 border rounded bg-white p-0.5"><img src={data.awayLogo} className="w-full h-full object-contain"/></div>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-xs font-bold text-gray-500">MATCH DAY</label>
                    <input type="text" value={data.matchDay} onChange={(e) => onChange('matchDay', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500">DATA</label>
                    <input type="text" value={data.date} onChange={(e) => onChange('date', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500">ORA</label>
                    <input type="text" value={data.time} onChange={(e) => onChange('time', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500">ARENA</label>
                    <input type="text" value={data.arena} onChange={(e) => onChange('arena', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" />
                </div>
                <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-500">INDIRIZZO ARENA</label>
                    <input type="text" value={data.arenaAddress || ''} onChange={(e) => onChange('arenaAddress', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" placeholder="Via dello Sport 10, Città" />
                </div>
            </div>
         </div>
      </div>

      {/* SEZIONE 2: Roster */}
      <div>
         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-1 mb-3">Team List</h3>
         
         <div className="space-y-3">
             <div>
                <label className="text-xs font-bold text-gray-500 flex justify-between mb-1">
                    <span>GIOCATORI (Num + Nome)</span>
                    <span className="text-orange-600 text-[10px]">Uno per riga</span>
                </label>
                <textarea 
                    value={data.rosterList || ''} 
                    onChange={(e) => onChange('rosterList', e.target.value)} 
                    className="w-full p-3 bg-white border rounded-lg text-sm font-mono h-48 focus:ring-2 focus:ring-orange-500 outline-none resize-none leading-relaxed"
                    placeholder={"04 Rossi\n10 Bianchi\n23 Jordan"}
                />
             </div>
             
             <div>
                <label className="text-xs font-bold text-gray-500">HEAD COACH</label>
                <input type="text" value={data.coach} onChange={(e) => onChange('coach', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" />
             </div>
         </div>
      </div>

    </div>
  )
};