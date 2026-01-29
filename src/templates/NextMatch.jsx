import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';

export const NextMatch = {
  id: 'fixture',
  name: 'Prossimo Turno',
  icon: Calendar,

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
       <div className="mt-10 flex flex-col items-center w-full z-10 px-6 h-full justify-start">
          
          {/* Header */}
          <div className="text-xl font-bold uppercase tracking-[0.5em] text-white/60 mb-8 border-b border-white/20 pb-4 w-full text-center">
            Next Match
          </div>

          {/* VS Section */}
          <div className="flex flex-col items-center justify-center w-full flex-1 mb-10">
            <h2 className="text-5xl font-black uppercase text-white drop-shadow-lg text-center leading-tight">
              {data.homeTeam}
            </h2>
            <div className={`text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 my-4 transform -skew-x-12`}>
              VS
            </div>
            <h2 className="text-5xl font-black uppercase text-white drop-shadow-lg text-center leading-tight">
              {data.awayTeam}
            </h2>
          </div>

          {/* Info Box */}
          <div className="w-full bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-10 space-y-8 mb-10">
            
            {/* Data */}
            <div className="flex items-center gap-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${theme.primary} shadow-lg`}>
                <Calendar size={32} className="text-white" />
              </div>
              <div>
                <div className="text-xs uppercase text-white/50 font-bold tracking-widest mb-1">Data</div>
                <div className="text-3xl font-bold text-white">{data.date}</div>
              </div>
            </div>

            {/* Ora */}
            <div className="flex items-center gap-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${theme.primary} shadow-lg`}>
                <Clock size={32} className="text-white" />
              </div>
              <div>
                <div className="text-xs uppercase text-white/50 font-bold tracking-widest mb-1">Ora</div>
                <div className="text-3xl font-bold text-white">{data.time}</div>
              </div>
            </div>

            {/* Luogo */}
             <div className="flex items-center gap-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${theme.primary} shadow-lg`}>
                <MapPin size={32} className="text-white" />
              </div>
              <div>
                <div className="text-xs uppercase text-white/50 font-bold tracking-widest mb-1">Arena</div>
                <div className="text-2xl font-bold text-white uppercase leading-tight">{data.arena}</div>
              </div>
            </div>

          </div>
       </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange }) => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="font-bold text-gray-700 border-b pb-2">Dettagli Evento</h3>
      
      <div>
        <label className="text-xs font-bold text-gray-500">DATA</label>
        <input type="text" value={data.date} onChange={(e) => onChange('date', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" placeholder="Es. Sab 21 Ott" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
            <label className="text-xs font-bold text-gray-500">ORA</label>
            <input type="text" value={data.time} onChange={(e) => onChange('time', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" placeholder="Es. 21:00" />
        </div>
        <div>
            <label className="text-xs font-bold text-gray-500">LUOGO</label>
            <input type="text" value={data.arena} onChange={(e) => onChange('arena', e.target.value)} className="w-full p-2 bg-white border rounded-lg text-sm" placeholder="Palazzetto" />
        </div>
      </div>
    </div>
  )
};