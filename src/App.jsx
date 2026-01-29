import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Layout, Download, ChevronRight } from 'lucide-react';
import { TEMPLATES, THEMES } from './data/templateRegistry';

const App = () => {
  const [activeTemplateId, setActiveTemplateId] = useState('result');
  const [themeColor, setThemeColor] = useState('orange');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const cardRef = useRef(null);

  const [data, setData] = useState({
    homeTeam: "Duo Ligones",
    awayTeam: "Avversari",
    homeScore: 85,
    awayScore: 72,
    matchDay: "1",
    date: "Sab 21 Ottobre",
    time: "21:30",
    arena: "PalaDuo",
    coach: "Coach Smith",
    rosterList: "04 Rossi M.\n10 Bianchi L."
  });

  const handleDataChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 1 });
      download(dataUrl, `duoligones-${activeTemplateId}.png`);
    } catch (err) {
      console.error('Errore:', err);
      alert("Errore generazione immagine");
    } finally {
      setIsGenerating(false);
    }
  };

  const ActiveTemplate = TEMPLATES.find(t => t.id === activeTemplateId);
  const CurrentTheme = THEMES[themeColor];

  return (
    <div className="h-screen bg-gray-100 text-slate-800 font-sans flex overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-[400px] bg-white border-r flex flex-col shadow-xl z-20 h-full">
        <div className="p-6 border-b bg-white">
          <h1 className="text-xl font-black flex items-center gap-2 text-gray-900">
            <Layout className="text-orange-600"/> DuoCanvas
          </h1>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Selettore Template */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-gray-400">Template</h3>
            <div className="grid grid-cols-1 gap-2">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTemplateId(t.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors
                    ${activeTemplateId === t.id ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}
                >
                  <t.icon size={18} />
                  <span className="font-bold text-sm">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dati Comuni */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-gray-400">Squadre</h3>
            <div className="grid grid-cols-2 gap-2">
               <input type="text" value={data.homeTeam} onChange={(e) => handleDataChange('homeTeam', e.target.value)} className="p-2 border rounded text-sm font-bold" placeholder="Casa" />
               <input type="text" value={data.awayTeam} onChange={(e) => handleDataChange('awayTeam', e.target.value)} className="p-2 border rounded text-sm font-bold" placeholder="Ospiti" />
            </div>
          </div>

          {/* Controlli Specifici */}
          <div className="p-4 bg-gray-50 rounded-xl border">
            {ActiveTemplate && <ActiveTemplate.Controls data={data} onChange={handleDataChange} />}
          </div>

          {/* Temi */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-gray-400">Colore</h3>
            <div className="flex gap-2">
               {Object.keys(THEMES).map(color => (
                  <button
                    key={color}
                    onClick={() => setThemeColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${themeColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: color === 'black' ? '#333' : color }}
                  />
               ))}
            </div>
          </div>
        </div>

        {/* Pulsante Download */}
        <div className="p-6 border-t bg-white">
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 active:scale-95 transition-all shadow-lg"
          >
            {isGenerating ? 'Generazione...' : <><Download size={20} /> Scarica PNG</>}
          </button>
        </div>
      </div>

      {/* PREVIEW AREA */}
      <div className="flex-1 bg-gray-200 flex items-center justify-center p-10 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Container scalabile */}
        <div className="origin-center transition-transform duration-300 shadow-2xl" style={{ transform: 'scale(0.35)' }}>
           {ActiveTemplate && (
             <ActiveTemplate.Render 
                data={data} 
                theme={CurrentTheme} 
                cardRef={cardRef} 
             />
           )}
        </div>
      </div>
    </div>
  );
};

export default App;