import React from 'react';
import { Plus, Trash2, Calendar, MapPin, Trophy } from 'lucide-react';
import { THEMES, GLOBAL_DEFAULTS } from '../../config';

// --- VISUALIZZAZIONE EVENTO SINGOLO ---
const EventItem = ({ event, theme, index }) => {
  // Se l'evento ha un colore personalizzato, usalo. Altrimenti usa il tema globale.
  const eventTheme = event.color && THEMES[event.color] ? THEMES[event.color] : theme;

  // Check which team is the "home" team of the current domain to apply accent color
  const isTargetTeam = (name) => {
    if (!name) return false;
    const homeTeam = GLOBAL_DEFAULTS.homeTeam.toLowerCase();
    const cleanName = name.toLowerCase();
    // Match if it contains the home team name or vice versa (e.g. "Duo" matches "Duo Ligones")
    return cleanName.includes(homeTeam) || homeTeam.includes(cleanName);
  };

  return (
    <div className="relative group w-full">
        {/* Card Body */}
        <div className="relative overflow-hidden bg-[#0f0f0f] border border-white/10 rounded-3xl flex items-stretch shadow-2xl">
            
            {/* Left: Date Block + Vertical Sport Bar */}
            <div className="w-48 flex items-stretch border-r border-white/10 bg-white/5 relative shrink-0">
                 
                 {/* Vertical Sport Bar (Thicker & Colored) */}
                 <div className={`w-14 flex items-center justify-center bg-gradient-to-b ${eventTheme.primary} relative overflow-hidden`}>
                     <div className="absolute inset-0 bg-black/10"></div>
                     <span className="-rotate-180 [writing-mode:vertical-rl] text-lg font-black uppercase text-white tracking-[0.3em] whitespace-nowrap py-4 shrink-0 drop-shadow-md opacity-90">
                        {event.sport}
                     </span>
                 </div>

                 {/* Date Info */}
                 <div className="flex-1 flex flex-col items-center justify-center p-2">
                     <span className="text-3xl font-black uppercase text-white/50 tracking-widest mb-0 leading-none">
                        {event.date.split(' ')[0]} 
                     </span>
                     <span className={`text-[70px] font-black italic text-white leading-[0.8] tracking-tighter drop-shadow-xl my-1`}>
                        {event.date.split(' ')[1] || event.date.slice(0,2)} 
                     </span>
                     <span className="text-lg font-bold uppercase text-white/40 tracking-[0.2em] leading-none">
                        {event.date.split(' ').slice(2).join(' ')}
                     </span>
                     
                     <div className={`mt-3 px-3 py-1 rounded bg-white/10 text-2xl font-black text-white tracking-widest`}>
                        {event.time}
                     </div>
                 </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center py-6 px-8 relative z-10">
                
                {/* Row 2: Teams - Massive & Stacked */}
                <div className="flex flex-col gap-1 w-full">
                    {/* Team 1 */}
                    <div className="flex items-center relative">
                        <span className={`text-6xl font-black uppercase leading-[0.85] tracking-tight truncate ${
                            isTargetTeam(event.homeTeam) ? eventTheme.accent : 'text-white'
                        }`}>
                            {event.homeTeam}
                        </span>
                    </div>

                    {/* Subtle Divider */}
                    <div className="w-full h-px bg-white/10 my-1"></div>

                    {/* Team 2 */}
                     <div className="flex items-center relative">
                        <span className={`text-6xl font-black uppercase leading-[0.85] tracking-tight truncate ${
                            isTargetTeam(event.awayTeam) ? eventTheme.accent : 'text-white'
                        }`}>
                            {event.awayTeam}
                        </span>
                    </div>
                </div>

                 {/* Row 3: Footer - Location + Championship (Combined & Bigger) */}
                <div className="flex items-center gap-5 mt-5 pt-3 border-t border-white/10 opacity-90">
                    <div className="flex items-center gap-2 min-w-0 shrink-0">
                        <MapPin size={22} className={eventTheme.accent || "text-white"} />
                        <span className="font-extrabold uppercase tracking-tight text-xl text-white truncate max-w-[320px]">
                            {event.location}
                        </span>
                    </div>

                    {event.championship && (
                        <>
                             <div className="h-5 w-0.5 bg-white/20 rounded-full shrink-0"></div>
                             <span className="font-bold uppercase tracking-wide text-xl text-white/70 whitespace-nowrap truncate">
                                {event.championship}
                             </span>
                        </>
                    )}
                 </div>
            </div>
        </div>
    </div>
  );
};


// --- RENDER BLOCK ---
export const EventsList = ({ data, theme, className = "" }) => {
  const events = data.weekEvents || [];

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
        {events.length > 0 ? (
           events.map((evt, idx) => (
             <EventItem key={idx} event={evt} theme={theme} index={idx} />
           ))
        ) : (
            <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl text-white/30 font-mono uppercase tracking-widest">
                Nessun evento in programma
            </div>
        )}
    </div>
  );
};

// --- CONTROLS BLOCK ---
export const EventsListControls = ({ data, onChange }) => {
  const events = data.weekEvents || [];
  
  // Lista dei colori disponibili (chiavi di THEMES)
  const availableColors = Object.keys(THEMES);

  const addEvent = () => {
    const newEvent = {
        sport: 'Sport',
        date: 'Data',
        time: '21:00',
        location: 'Luogo',
        championship: 'Campionato',
        homeTeam: GLOBAL_DEFAULTS.homeTeam,
        awayTeam: 'Avversario',
        color: 'orange'
    };
    onChange('weekEvents', [...events, newEvent]);
  };

  const removeEvent = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    onChange('weekEvents', newEvents);
  };

  const updateEvent = (index, field, value) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    onChange('weekEvents', newEvents);
  };

  return (
    <div className="py-4 border-b border-gray-100 last:border-0 italic">
        <div className="flex justify-between items-center mb-4 not-italic">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} className="text-gray-300" />
                Eventi Settimanali ({events.length})
            </h3>
            <button 
                onClick={addEvent}
                className="flex items-center gap-1 text-[10px] bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-black font-bold uppercase transition-all active:scale-95 shadow-md"
            >
                <Plus size={12} strokeWidth={3} /> Aggiungi
            </button>
        </div>

        <div className="space-y-4 not-italic">
            {events.map((evt, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 relative group transition-all hover:bg-white hover:shadow-xl hover:border-orange-200">
                    {/* Header Controls: Trash + Color */}
                    <div className="absolute top-3 right-3 flex gap-3 z-10">
                         <div className="relative">
                            <select 
                                value={evt.color || 'orange'}
                                onChange={(e) => updateEvent(idx, 'color', e.target.value)}
                                className="appearance-none text-[9px] font-black uppercase bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:border-gray-900 outline-none transition-all shadow-sm cursor-pointer"
                            >
                                {availableColors.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                         </div>
                        <button 
                            onClick={() => removeEvent(idx)}
                            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>

                    {/* SPORT NAME */}
                    <div className="mb-4 pr-32">
                         <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Sport</label>
                         <input 
                            value={evt.sport} 
                            onChange={(e) => updateEvent(idx, 'sport', e.target.value)}
                            className="w-full text-base font-black italic bg-transparent border-b-2 border-gray-200 focus:border-gray-900 outline-none pb-1 text-gray-900 uppercase tracking-tight"
                            placeholder="BASKET, CALCIO, ETC..."
                         />
                    </div>

                    {/* TEAMS (Home vs Away) */}
                    <div className="grid grid-cols-2 gap-4 mb-4 bg-white/50 p-3 rounded-xl border border-gray-50 shadow-inner">
                         <div className="space-y-1">
                             <label className="text-[8px] font-black text-gray-400 uppercase tracking-tighter block">Casa</label>
                             <input 
                                value={evt.homeTeam || ''} 
                                onChange={(e) => updateEvent(idx, 'homeTeam', e.target.value)}
                                className="w-full text-xs font-black uppercase border-b border-gray-100 focus:border-gray-900 outline-none pb-1 bg-transparent"
                             />
                        </div>
                        <div className="space-y-1">
                             <label className="text-[8px] font-black text-gray-400 uppercase tracking-tighter block text-right">Trasferta</label>
                             <input 
                                value={evt.awayTeam || ''} 
                                onChange={(e) => updateEvent(idx, 'awayTeam', e.target.value)}
                                className="w-full text-xs font-black uppercase border-b border-gray-100 focus:border-gray-900 outline-none pb-1 bg-transparent text-right"
                             />
                        </div>
                    </div>

                    {/* DETAILS: Date, Time, Location */}
                    <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="space-y-1">
                             <label className="text-[8px] font-black text-gray-400 uppercase block">Data</label>
                             <input 
                                value={evt.date} 
                                onChange={(e) => updateEvent(idx, 'date', e.target.value)}
                                className="w-full text-[11px] bg-white border border-gray-100 rounded-lg p-2 font-bold shadow-sm focus:border-gray-900 outline-none"
                             />
                        </div>
                        <div className="space-y-1">
                             <label className="text-[8px] font-black text-gray-400 uppercase block">Ora</label>
                             <input 
                                value={evt.time} 
                                onChange={(e) => updateEvent(idx, 'time', e.target.value)}
                                className="w-full text-[11px] bg-white border border-gray-100 rounded-lg p-2 font-bold shadow-sm focus:border-gray-900 outline-none"
                             />
                        </div>
                         <div className="space-y-1">
                             <label className="text-[8px] font-black text-gray-400 uppercase block">Luogo</label>
                             <input 
                                value={evt.location} 
                                onChange={(e) => updateEvent(idx, 'location', e.target.value)}
                                className="w-full text-[11px] bg-white border border-gray-100 rounded-lg p-2 font-bold shadow-sm focus:border-gray-900 outline-none"
                             />
                        </div>
                    </div>
                    
                     <div className="space-y-1">
                         <label className="text-[8px] font-black text-gray-400 uppercase block">Campionato</label>
                         <input 
                            value={evt.championship || ''} 
                            onChange={(e) => updateEvent(idx, 'championship', e.target.value)}
                            className="w-full text-[11px] bg-white border border-gray-100 rounded-lg p-2 font-bold shadow-sm focus:border-gray-900 outline-none"
                            placeholder="Es. Serie D"
                         />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};