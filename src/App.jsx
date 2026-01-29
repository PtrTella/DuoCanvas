import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { 
  Layout, Download, ChevronDown, Check, 
  Edit3, X, Palette, Share2 
} from 'lucide-react';
import { TEMPLATES, THEMES } from './data/templateRegistry';

const App = () => {
  // Stati
  const [activeTemplateId, setActiveTemplateId] = useState('result');
  const [themeColor, setThemeColor] = useState('orange');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Nuovo stato per mobile
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false); // Per il dropdown

  const [scale, setScale] = useState(0.45);
  const cardRef = useRef(null);
  // NUOVO: Calcolo dinamico della dimensione per adattarsi a OGNI schermo
  useEffect(() => {
    const calculateScale = () => {
      const screenWidth = window.innerWidth;
      // Se siamo su mobile (meno di 768px)
      if (screenWidth < 768) {
        // La card è larga 1080px.
        // Vogliamo lasciare 40px di margine totale (20px a dx, 20px a sx).
        // La formula è: (LarghezzaSchermo - Margine) / LarghezzaCard
        const newScale = (screenWidth - 40) / 1080;
        setScale(newScale);
        setIsMobileMenuOpen(false); // Chiudiamo menu se si ridimensiona
      } else {
        // Su desktop scala fissa comoda
        setScale(0.45);
        setIsMobileMenuOpen(false);
      }
    };

    // Calcola subito
    calculateScale();
    
    // Ricalcola se l'utente ruota il telefono o ridimensiona
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // Dati
  const [data, setData] = useState({
    homeTeam: "Duo Ligones",
    awayTeam: "Avversari",
    homeScore: 85,
    awayScore: 72,
    matchDay: "1",
    date: "Sab 21 Ott",
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
      // Aspettiamo un attimo per assicurare che il rendering sia finito
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
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

  // Chiude il menu mobile se si allarga la finestra (resize desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- COMPONENTI UI INTERNI ---
  
  // 1. Selettore Template (Stile Dropdown/Compact)
  const TemplateSelector = () => (
    <div className="relative z-30">
      <h3 className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Scegli Grafica</h3>
      
      {/* Bottone che apre/chiude la lista */}
      <button 
        onClick={() => setIsTemplateSelectorOpen(!isTemplateSelectorOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full text-white bg-gradient-to-br ${CurrentTheme.primary}`}>
            {ActiveTemplate && <ActiveTemplate.icon size={16} />}
          </div>
          <span className="font-bold text-gray-800">{ActiveTemplate?.name}</span>
        </div>
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isTemplateSelectorOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Lista Dropdown */}
      {isTemplateSelectorOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTemplateId(t.id);
                setIsTemplateSelectorOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors
                ${activeTemplateId === t.id ? 'bg-gray-50 text-black font-bold' : 'text-gray-600'}`}
            >
              <t.icon size={18} className={activeTemplateId === t.id ? 'text-orange-600' : 'text-gray-400'} />
              <span>{t.name}</span>
              {activeTemplateId === t.id && <Check size={16} className="ml-auto text-orange-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // 2. Pannello Controlli (Sidebar / Bottom Sheet)
  const ControlsPanel = () => (
    <div className="space-y-6 pb-20 md:pb-0">
      
      {/* Selettore Template Compatto */}
      <TemplateSelector />

      {/* Dati Comuni */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Squadre</h3>
        <div className="grid grid-cols-2 gap-3">
           <div className="space-y-1">
             <input type="text" value={data.homeTeam} onChange={(e) => handleDataChange('homeTeam', e.target.value)} className="w-full p-3 bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-xl text-sm font-bold transition-all" placeholder="Casa" />
           </div>
           <div className="space-y-1">
             <input type="text" value={data.awayTeam} onChange={(e) => handleDataChange('awayTeam', e.target.value)} className="w-full p-3 bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 border rounded-xl text-sm font-bold transition-all" placeholder="Ospiti" />
           </div>
        </div>
      </div>

      {/* Controlli Specifici del Template */}
      <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
        {ActiveTemplate && <ActiveTemplate.Controls data={data} onChange={handleDataChange} />}
      </div>

      {/* Selettore Colore */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
            <Palette size={14}/> Tema
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
           {Object.keys(THEMES).map(color => (
              <button
                key={color}
                onClick={() => setThemeColor(color)}
                className={`flex-shrink-0 w-10 h-10 rounded-full border-[3px] transition-all duration-200 ${themeColor === color ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                style={{ backgroundColor: color === 'black' ? '#222' : color }}
              />
           ))}
        </div>
      </div>

      {/* Bottone Download Desktop (Nascosto su mobile qui, mostrato in sticky bar) */}
      <div className="hidden md:block pt-6">
        <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
          >
            {isGenerating ? 'Generazione...' : <><Download size={20} /> Scarica Immagine</>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] bg-gray-100 text-slate-800 font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* === DESKTOP SIDEBAR (Visibile solo su schermi grandi) === */}
      <div className="hidden md:flex w-[400px] bg-white border-r flex-col shadow-2xl z-20 h-full relative">
        <div className="p-6 border-b bg-white/80 backdrop-blur sticky top-0 z-10">
          <h1 className="text-xl font-black flex items-center gap-2 text-gray-900 tracking-tight">
            <Layout className="text-orange-600"/> DuoCanvas
          </h1>
        </div>
        <div className="p-6 flex-1 overflow-y-auto scrollbar-thin">
           <ControlsPanel />
        </div>
      </div>

      {/* === PREVIEW AREA (Centrale) === */}
      <div className="flex-1 bg-gray-200/50 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Header Mobile (Visibile solo su mobile) */}
        <div className="md:hidden absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
           <h1 className="text-white font-black flex items-center gap-2 drop-shadow-md">
             <Layout size={18}/> DuoCanvas
           </h1>
           {/* Bottone Download Rapido Mobile */}
           <button 
             onClick={handleDownload}
             className="pointer-events-auto bg-white/20 backdrop-blur-md text-white p-2 rounded-full active:scale-90 transition-transform"
           >
             <Download size={20} />
           </button>
        </div>

        {/* Canvas Scalabile */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Il contenitore esterno gestisce il posizionamento.
             Il div interno ha dimensione FISSA (1080x1350) ma viene scalato visivamente.
          */}
          <div 
            className="origin-center shadow-2xl transition-transform duration-300 ease-out flex-shrink-0" 
            style={{ 
               width: '1080px',   // Forza larghezza reale
               height: '1350px',  // Forza altezza reale
               transform: `scale(${scale})`, // Usa la scala calcolata matematicamente
            }}
          >
             {ActiveTemplate && (
               <ActiveTemplate.Render 
                  data={data} 
                  theme={CurrentTheme} 
                  cardRef={cardRef} 
               />
             )}
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 -z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>

      {/* === MOBILE CONTROLS (FAB & SHEET) === */}
      
      {/* 1. Floating Action Button (FAB) - Apre il menu su mobile */}
      {!isMobileMenuOpen && (
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-40 bg-gray-900 text-white w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center animate-in zoom-in duration-300 active:scale-90"
        >
          <Edit3 size={24} />
        </button>
      )}

      {/* 2. Mobile Sheet (Il pannello che sale dal basso) */}
      <div className={`md:hidden fixed inset-0 z-50 flex flex-col justify-end transition-visibility duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        
        {/* Backdrop Scuro (clicca per chiudere) */}
        <div 
           onClick={() => setIsMobileMenuOpen(false)}
           className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        ></div>

        {/* Contenuto Sheet */}
        <div className={`relative bg-white w-full rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] max-h-[85vh] flex flex-col transition-transform duration-300 cubic-bezier(0.32, 0.72, 0, 1) ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
           
           {/* Maniglia per trascinare (visiva) */}
           <div className="w-full flex justify-center pt-3 pb-1" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
           </div>

           {/* Header Sheet */}
           <div className="px-6 py-2 flex justify-between items-center border-b border-gray-100">
              <span className="font-bold text-lg">Modifica</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <X size={18} />
              </button>
           </div>

           {/* Corpo Scrollabile */}
           <div className="p-6 overflow-y-auto overflow-x-hidden flex-1 safe-area-bottom">
              <ControlsPanel />
              
              {/* Spazio extra in basso per non coprire l'ultimo input */}
              <div className="h-10"></div> 
           </div>

           {/* Sticky Footer Mobile per Download */}
           <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 safe-area-bottom">
             <button 
                onClick={() => {
                  setIsMobileMenuOpen(false); // Chiudi menu per vedere l'effetto
                  setTimeout(handleDownload, 300); // Aspetta chiusura
                }}
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-orange-200"
              >
                <Download size={20} /> Salva Immagine
             </button>
           </div>

        </div>
      </div>

    </div>
  );
};

export default App;