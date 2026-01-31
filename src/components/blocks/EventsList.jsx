import React from 'react';
import { Plus, Trash2, Calendar, MapPin, Trophy } from 'lucide-react';
import { THEMES } from '../../data/templateRegistry';

// --- VISUALIZZAZIONE EVENTO SINGOLO ---
const EventItem = ({ event, theme, index }) => {
  // Se l'evento ha un colore personalizzato, usalo. Altrimenti usa il tema globale.
  const eventTheme = event.color && THEMES[event.color] ? THEMES[event.color] : theme;

  return (
    <div className="relative overflow-hidden bg-black/40 border border-white/10 rounded-2xl p-5 backdrop-blur-sm flex flex-col gap-3 group">
        
        {/* Barra decorativa laterale */}
        <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${eventTheme.primary || 'from-gray-500 to-gray-700'}`}></div>

        {/* Header: Sport & Data */}
        <div className="flex justify-between items-start pl-3 mb-1">
            <span className="text-2xl font-black italic uppercase text-white tracking-widest drop-shadow-md">
              {event.sport}
            </span>
            <div className="flex flex-col items-end text-right">
                <span className={`text-lg font-bold ${eventTheme.accent} uppercase tracking-tight`}>
                  {event.date}
                </span>
                <span className="text-white/90 font-medium text-base tracking-wider">
                  {event.time}
                </span>
            </div>
        </div>

        {/* VERSUS: Home vs Away (Solo Nomi) */}
        <div className="pl-3 py-2 border-t border-b border-white/5 flex items-center justify-between gap-4">
             <div className="flex-1 text-right">
                <span className="font-bold uppercase text-white tracking-wide text-lg leading-tight">
                  {event.homeTeam || 'Home'}
                </span>
             </div>
             
             <div className={`font-black italic text-sm text-white/40 px-2`}>VS</div>
             
             <div className="flex-1 text-left">
                <span className="font-bold uppercase text-white tracking-wide text-lg leading-tight">
                  {event.awayTeam || 'Guest'}
                </span>
             </div>
        </div>

        {/* Dettagli: Luogo + Campionato */}
        <div className="flex items-center justify-between gap-2 pl-3 pt-1 text-white/50">
            <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-white/40" />
                <span className="font-bold uppercase tracking-wider text-[10px]">{event.location}</span>
            </div>
            {event.championship && (
               <div className="flex items-center gap-1.5">
                  <Trophy size={14} className={eventTheme.accent} />
                  <span className="font-medium uppercase tracking-wide text-[10px]">{event.championship}</span>
              </div>
            )}
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