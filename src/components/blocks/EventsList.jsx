import React from 'react';
import { Plus, Trash2, Calendar, MapPin, Trophy } from 'lucide-react';
import { THEMES } from '../../config/templateRegistry';

// --- VISUALIZZAZIONE EVENTO SINGOLO ---
const EventItem = ({ event, theme, index }) => {
  // Se l'evento ha un colore personalizzato, usalo. Altrimenti usa il tema globale.
  const eventTheme = event.color && THEMES[event.color] ? THEMES[event.color] : theme;

  // Check which team is "Duo Ligones" (or variation) to apply color
  const isDuo = (name) => name && (name.toLowerCase().includes('duo') || name.toLowerCase().includes('ligones'));

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
                            isDuo(event.homeTeam) ? eventTheme.accent : 'text-white'
                        }`}>
                            {event.homeTeam}
                        </span>
                    </div>

                    {/* Subtle Divider */}
                    <div className="w-full h-px bg-white/10 my-1"></div>

                    {/* Team 2 */}
                     <div className="flex items-center relative">
                        <span className={`text-6xl font-black uppercase leading-[0.85] tracking-tight truncate ${
                            isDuo(event.awayTeam) ? eventTheme.accent : 'text-white'
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
        homeTeam: 'Duo Ligones',
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
    <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
            <label className="text-xs font-bold text-gray-500">LISTA EVENTI ({events.length})</label>
            <button 
                onClick={addEvent}
                className="flex items-center gap-1 text-[10px] bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 font-bold uppercase transition-colors"
            >
                <Plus size={12} /> Aggiungi
            </button>
        </div>

        <div className="space-y-4">
            {events.map((evt, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200 relative group">
                    {/* Header Controls: Trash + Color */}
                    <div className="absolute top-2 right-2 flex gap-2">
                         <div className="relative">
                            <select 
                                value={evt.color || 'orange'}
                                onChange={(e) => updateEvent(idx, 'color', e.target.value)}
                                className="appearance-none text-[10px] font-bold uppercase bg-white border border-gray-300 rounded px-2 py-0.5 pr-4 focus:ring-1 focus:ring-orange-500 outline-none"
                            >
                                {availableColors.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                         </div>
                        <button 
                            onClick={() => removeEvent(idx)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>

                    {/* SPORT NAME */}
                    <div className="mb-3 pr-24">
                         <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Sport</label>
                         <input 
                            value={evt.sport} 
                            onChange={(e) => updateEvent(idx, 'sport', e.target.value)}
                            className="w-full text-sm font-black italic bg-transparent border-b border-gray-300 focus:border-orange-500 outline-none pb-1 text-gray-800"
                            placeholder="BASKET, CALCIO, ETC..."
                         />
                    </div>

                    {/* TEAMS (Home vs Away) */}
                    <div className="grid grid-cols-2 gap-2 mb-3 bg-white p-2 rounded border border-gray-100">
                         <div>
                             <label className="text-[9px] font-bold text-gray-400 uppercase block mb-0.5">Casa</label>
                             <input 
                                value={evt.homeTeam || ''} 
                                onChange={(e) => updateEvent(idx, 'homeTeam', e.target.value)}
                                className="w-full text-xs font-bold border-b border-gray-200 focus:border-orange-500 outline-none pb-0.5"
                             />
                        </div>
                        <div className="text-right">
                             <label className="text-[9px] font-bold text-gray-400 uppercase block mb-0.5">Trasferta</label>
                             <input 
                                value={evt.awayTeam || ''} 
                                onChange={(e) => updateEvent(idx, 'awayTeam', e.target.value)}
                                className="w-full text-xs font-bold border-b border-gray-200 focus:border-orange-500 outline-none pb-0.5 text-right"
                             />
                        </div>
                    </div>

                    {/* DETAILS: Date, Time, Location */}
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="col-span-1">
                             <label className="text-[9px] font-bold text-gray-400 uppercase block">Data</label>
                             <input 
                                value={evt.date} 
                                onChange={(e) => updateEvent(idx, 'date', e.target.value)}
                                className="w-full text-xs bg-white border border-gray-200 rounded p-1 font-medium"
                             />
                        </div>
                        <div className="col-span-1">
                             <label className="text-[9px] font-bold text-gray-400 uppercase block">Ora</label>
                             <input 
                                value={evt.time} 
                                onChange={(e) => updateEvent(idx, 'time', e.target.value)}
                                className="w-full text-xs bg-white border border-gray-200 rounded p-1 font-medium"
                             />
                        </div>
                         <div className="col-span-1">
                             <label className="text-[9px] font-bold text-gray-400 uppercase block">Luogo</label>
                             <input 
                                value={evt.location} 
                                onChange={(e) => updateEvent(idx, 'location', e.target.value)}
                                className="w-full text-xs bg-white border border-gray-200 rounded p-1 font-medium"
                             />
                        </div>
                    </div>
                    
                     <div>
                         <label className="text-[9px] font-bold text-gray-400 uppercase block">Campionato</label>
                         <input 
                            value={evt.championship || ''} 
                            onChange={(e) => updateEvent(idx, 'championship', e.target.value)}
                            className="w-full text-xs bg-white border border-gray-200 rounded p-1 font-medium"
                            placeholder="Es. Serie D"
                         />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};