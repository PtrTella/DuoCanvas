import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Layout, Download, Edit3 } from 'lucide-react';

// Import Dati
import { TEMPLATES, THEMES } from './data/templateRegistry';

// Import Componenti Separati (ORA USIAMO SOLO QUESTI)
import ControlsPanel from './components/editor/ControlsPanel';
import MobileSheet from './components/UI/MobileSheet';

const App = () => {
  const [activeTemplateId, setActiveTemplateId] = useState('result');
  const [themeColor, setThemeColor] = useState('orange');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // isTemplateSelectorOpen serve a ControlsPanel, lo passiamo come prop
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [scale, setScale] = useState(0.45);
  
  const cardRef = useRef(null);
  const prevWidth = useRef(window.innerWidth);

const [data, setData] = useState({
    homeTeam: "Duo Ligones",
    awayTeam: "Avversari",
    homeScore: 85,
    awayScore: 72,
    matchDay: "12", // Usato per la giornata
    championship: "Serie B - Girone Silver",
    date: "Sab 21 Ott",
    time: "21:30",
    arena: "Pala Penazzi",
    arenaAddress: "Via dello Sport, 10", // <--- Aggiungiamo anche l'indirizzo se vuoi
    coach: "Coach Smith",
    rosterList: "00 Rossi M.\n04 Bianchi L.\n09 Verdi G.\n11 Neri P.\n13 Gialli A.\n23 Jordan M.\n24 Bryant K.\n30 Curry S.\n34 O'Neal S.\n41 Nowitzki D.\n77 Doncic L.\n99 Wembanyama V."
  });

  const handleDataChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    setIsGenerating(true);
    try {
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

  // LOGICA "ANTI-LAG" RESIZE + PERCENTUALE
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      
      // Blocca il ricalcolo se cambia solo l'altezza (es. tastiera mobile)
      if (currentWidth === prevWidth.current) return;
      prevWidth.current = currentWidth; 

      if (currentWidth < 768) {
        // === MODIFICA PERCENTUALE QUI ===
        // 0.85 significa: l'immagine occupa l'85% della larghezza dello schermo.
        // Il restante 15% diventa bordo laterale automaticamente.
        const newScale = (currentWidth * 0.85) / 1080;
        
        setScale(newScale);
      } else {
        setScale(0.45);
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sharedControlProps = {
    data, handleDataChange,
    activeTemplateId, setActiveTemplateId,
    themeColor, setThemeColor,
    isTemplateSelectorOpen, setIsTemplateSelectorOpen,
    activeTemplate: ActiveTemplate,
    currentTheme: CurrentTheme,
    isGenerating,
    handleDownload
  };

  return (
    <div className="h-[100dvh] bg-gray-100 text-slate-800 font-sans flex flex-col md:flex-row overflow-hidden fixed inset-0">
      
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex w-[400px] bg-white border-r flex-col shadow-2xl z-20 h-full relative">
        <div className="p-6 border-b bg-white/80 backdrop-blur sticky top-0 z-10">
          <h1 className="text-xl font-black flex items-center gap-2 text-gray-900 tracking-tight">
            <Layout className="text-orange-600"/> DuoCanvas
          </h1>
        </div>
        <div className="p-6 flex-1 overflow-y-auto scrollbar-thin">
           <ControlsPanel {...sharedControlProps} isDesktop={true} />
        </div>
      </div>

      {/* PREVIEW AREA */}
      <div className="flex-1 bg-gray-200/50 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
           <h1 className="text-white font-black flex items-center gap-2 drop-shadow-md">
             <Layout size={18}/> DuoCanvas
           </h1>
           <button onClick={handleDownload} className="pointer-events-auto bg-white/20 backdrop-blur-md text-white p-2 rounded-full active:scale-90 transition-transform">
             <Download size={20} />
           </button>
        </div>

        {/* Canvas */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div 
            className="origin-center shadow-2xl transition-transform duration-300 ease-out flex-shrink-0" 
            style={{ width: '1080px', height: '1350px', transform: `scale(${scale})` }}
          >
             {ActiveTemplate && <ActiveTemplate.Render data={data} theme={CurrentTheme} cardRef={cardRef} />}
          </div>
        </div>
        <div className="absolute inset-0 opacity-5 -z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>

      {/* MOBILE FAB */}
      {!isMobileMenuOpen && (
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-40 bg-gray-900 text-white w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center animate-in zoom-in duration-300 active:scale-90"
        >
          <Edit3 size={24} />
        </button>
      )}

      {/* MOBILE SHEET (Componente Isolato) */}
      <MobileSheet 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onDownload={handleDownload}
      >
        <ControlsPanel {...sharedControlProps} isDesktop={false} />
      </MobileSheet>
    </div>
  );
};

export default App;