import React from 'react';
import { Trophy, Upload } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import TeamLogo from '../components/UI/TeamLogo'; // <--- Importa il nuovo componente

export const MatchResult = {
  id: 'result',
  name: 'Risultato',
  icon: Trophy,

  Render: ({ data, theme, cardRef }) => (
    <BaseCard theme={theme} ref={cardRef}>
      <div className="flex flex-col items-center justify-center h-full w-full gap-8">
        
        {/* Header Giornata */}
        <div className="text-xl font-bold uppercase tracking-[0.3em] text-white/60 border-b border-white/20 pb-2 mb-4">
          Match Day {data.matchDay}
        </div>

        {/* --- AREA PUNTEGGIO E LOGHI --- */}
        <div className="flex items-center justify-between w-full px-4">
          
          {/* SQUADRA CASA */}
          <div className="flex flex-col items-center gap-6 w-1/3">
            <div className="w-40 h-40">
                <TeamLogo src="/DuoCanvas/logos/duoligones.png" alt="Duo Ligones" />
            </div>
            <h2 className="text-2xl font-black uppercase text-center text-white leading-tight">
              {data.homeTeam}
            </h2>
          </div>

          {/* PUNTEGGIO CENTRALE */}
          <div className="flex flex-col items-center justify-center w-1/3 relative">
             <div className="text-[140px] font-black leading-none text-white drop-shadow-2xl flex items-center gap-4">
                <span>{data.homeScore}</span>
                <span className="text-white/40 text-8xl">:</span>
                <span>{data.awayScore}</span>
             </div>
             <div className="mt-4 px-6 py-1 bg-white/20 rounded-full text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md">
                Finale
             </div>
          </div>

          {/* SQUADRA OSPITE */}
          <div className="flex flex-col items-center gap-6 w-1/3">
            <div className="w-40 h-40">
                <TeamLogo src={data.awayLogo} fallbackText="VS" />
            </div>
            <h2 className="text-2xl font-black uppercase text-center text-white leading-tight">
              {data.awayTeam}
            </h2>
          </div>

        </div>

        {/* Footer/MVP */}
        <div className="mt-12 text-center space-y-2">
            <div className="text-white/50 text-sm font-bold uppercase tracking-wider">Top Scorer</div>
            <div className="text-white text-xl font-bold bg-white/10 px-6 py-2 rounded-xl inline-block">
               {data.topScorer || "Nome Giocatore"}
            </div>
        </div>

      </div>
    </BaseCard>
  ),

  Controls: ({ data, onChange }) => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="font-bold text-gray-700 border-b pb-2">Dettagli Partita</h3>
      
      {/* Input Giornata */}
      <div>
        <label className="text-xs font-bold text-gray-500">MATCH DAY</label>
        <input 
          type="text" 
          value={data.matchDay} 
          onChange={(e) => onChange('matchDay', e.target.value)} 
          className="w-full p-2 bg-white border rounded-lg text-sm" 
        />
      </div>

      {/* Input Punteggi */}
      <div className="grid grid-cols-2 gap-4">
        <div>
           <label className="text-xs font-bold text-gray-500 text-center block mb-1">PUNTI CASA</label>
           <input 
             type="number" 
             value={data.homeScore} 
             onChange={(e) => onChange('homeScore', e.target.value)} 
             className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl font-black focus:border-orange-500 focus:ring-0" 
           />
        </div>
        <div>
           <label className="text-xs font-bold text-gray-500 text-center block mb-1">PUNTI OSPITI</label>
           <input 
             type="number" 
             value={data.awayScore} 
             onChange={(e) => onChange('awayScore', e.target.value)} 
             className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl font-black focus:border-orange-500 focus:ring-0" 
           />
        </div>
      </div>

      {/* UPLOAD LOGO */}
      <div className="pt-2">
        <label className="text-xs font-bold text-gray-500 mb-2 block">LOGO AVVERSARIO</label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center justify-center gap-2 w-full p-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors font-bold text-sm">
            <Upload size={18} />
            {data.awayLogo ? 'Cambia Logo' : 'Carica Logo'}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  onChange('awayLogo', url);
                }
              }} 
            />
          </label>
          {data.awayLogo && (
            <div className="w-12 h-12 border rounded-lg p-1 bg-white shrink-0">
               <TeamLogo src={data.awayLogo} />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500">TOP SCORER</label>
        <input 
          type="text" 
          value={data.topScorer || ''} 
          onChange={(e) => onChange('topScorer', e.target.value)} 
          className="w-full p-2 bg-white border rounded-lg text-sm" 
          placeholder="Es. Rossi (20pt)"
        />
      </div>

    </div>
  )
};