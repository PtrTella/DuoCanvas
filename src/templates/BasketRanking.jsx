import React, { useEffect } from 'react';
import { ListOrdered, RefreshCw } from 'lucide-react';
import BaseCard from '../components/UI/BaseCard';
import { useClassifica } from '../hooks/useCsi';

export const BasketRanking = {
  id: 'basket_ranking',
  name: 'Classifica Basket',
  icon: ListOrdered,
  defaultTheme: 'orange',

  Render: ({ data, theme, cardRef }) => {
    return (
      <BaseCard theme={theme} ref={cardRef}>
        <div className="flex flex-col h-full w-full px-8 py-10 relative z-10 text-white">
          <div className="text-center mb-8">
            <h2 className={`text-5xl font-black italic tracking-tighter uppercase mb-2 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent filter drop-shadow-sm`}>
              {data.leagueName}
            </h2>
            <div className={`inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-lg font-medium`}>
              {data.season}
            </div>
          </div>

          <div className="flex-1 w-full relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl -z-10" />
            
            <div className="h-full overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm bg-black/20">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className={`text-white bg-white/10 border-b border-white/10`}>
                    <th className="p-4 text-center w-14 font-bold text-lg">#</th>
                    <th className="p-4 text-left font-bold text-lg">SQUADRA</th>
                    <th className="p-4 text-center font-bold text-lg w-20 bg-white/10">PT</th>
                    <th className="p-4 text-center font-bold w-14 opacity-80">G</th>
                    <th className="p-4 text-center font-bold w-14 opacity-80">V</th>
                    <th className="p-4 text-center font-bold w-14 opacity-80">P</th>
                    <th className="p-4 text-center font-bold w-14 opacity-80">S</th>
                  </tr>
                </thead>
                <tbody className="">
                  {data.ranking && data.ranking.length > 0 ? (
                    data.ranking.map((team, index) => {
                      const isHighlighted = data.highlightTeam === team.name;
                      return (
                        <tr 
                          key={team.id} 
                          className={`
                            border-b border-white/5 last:border-0 transition-colors
                            ${isHighlighted ? 'bg-white/20' : index % 2 === 0 ? 'bg-transparent' : 'bg-white/5'}
                          `}
                        >
                          <td className={`p-3 text-center font-mono text-lg ${index < 3 ? 'text-yellow-400 font-bold' : 'opacity-70'}`}>
                            {index + 1}
                          </td>
                          <td className="p-3 font-semibold uppercase tracking-wide text-base truncate max-w-[280px]">
                            {team.name}
                          </td>
                          <td className={`p-3 text-center font-black text-2xl ${isHighlighted ? 'text-white' : 'text-white'}`}>
                            {team.points}
                          </td>
                          <td className="p-3 text-center text-lg opacity-80 font-mono">{team.played}</td>
                          <td className="p-3 text-center text-lg opacity-60 font-mono">{team.won}</td>
                          <td className="p-3 text-center text-lg opacity-60 font-mono">{team.drawn}</td>
                          <td className="p-3 text-center text-lg opacity-60 font-mono">{team.lost}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-12 text-center opacity-50 text-xl">
                        Nessun dato disponibile.<br/>
                        <span className="text-sm mt-2 block">Usa i controlli per importare la classifica CSI.</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-end opacity-70">
             <div className="text-xs space-y-1">
               <p>Legenda: PT=Punti, G=Giocate, V=Vinte, P=Pari, S=Perse</p>
               <p>Dati ufficiali CSI</p>
             </div>
             <div className="text-right">
                <p className="font-bold text-sm">Duo Ligones</p>
                <p className="text-xs">duoligones.it</p>
             </div>
          </div>
        </div>
      </BaseCard>
    );
  },

  Controls: ({ data, onChange }) => {
    const { classifica, loading } = useClassifica();

    // Funzione manuale per aggiornare i dati
    const handleSync = () => {
        if (classifica && classifica.length > 0) {
            onChange('ranking', classifica);
            // Auto-seleziona Duo Ligones se presente e non c'è selezione
            if (!data.highlightTeam) {
                 const myTeam = classifica.find(t => t.name.toLowerCase().includes('duo') || t.name.toLowerCase().includes('ligones'));
                 if (myTeam) onChange('highlightTeam', myTeam.name);
            }
        }
    };

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Intestazione</label>
          <div className="space-y-3">
            <div>
                <label className="text-xs text-gray-500 mb-1 block">Nome Campionato</label>
                <input 
                    value={data.leagueName}
                    onChange={(e) => onChange('leagueName', e.target.value)}
                    className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-lg transition-all"
                    placeholder="Es. CAMPIONATO CSI"
                />
            </div>
            <div>
                <label className="text-xs text-gray-500 mb-1 block">Sottotitolo / Stagione</label>
                <input 
                    value={data.season}
                    onChange={(e) => onChange('season', e.target.value)}
                    className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-lg transition-all"
                    placeholder="Es. Stagione 2024/25"
                />
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
             <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    Sorgente Dati CSI
                </h4>
                {loading && <span className="text-[10px] font-bold text-blue-500 uppercase">Caricamento...</span>}
             </div>
             
             <div className="text-xs text-blue-700 mb-4 bg-blue-100/50 p-2 rounded-lg">
                {loading 
                    ? "Connessione al portale CSI in corso..." 
                    : classifica && classifica.length > 0 
                        ? `✅ Trovate ${classifica.length} squadre nel database.` 
                        : "⚠️ Nessun dato trovato. Controlla la connessione."}
             </div>

             <button 
                onClick={handleSync}
                disabled={loading || !classifica || classifica.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-sm font-bold shadow-blue-200 shadow-lg transition-all disabled:opacity-50 disabled:shadow-none disabled:transform-none"
             >
                <RefreshCw size={16} className={`${loading ? 'animate-spin' : ''}`} />
                Importa Classifica
             </button>
        </div>
        
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Evidenzia Squadra</label>
              <select 
                  className="w-full p-2.5 text-sm bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-lg"
                  value={data.highlightTeam}
                  onChange={(e) => onChange('highlightTeam', e.target.value)}
              >
                  <option value="">Nessuna selezione</option>
                  {data.ranking && data.ranking.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
              </select>
        </div>
      </div>
    );
  }
};
