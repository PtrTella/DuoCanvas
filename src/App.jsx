import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Layout, Download, Edit3 } from 'lucide-react';

import { TEMPLATES, THEMES } from './data/templateRegistry';
// IMPORTA I NUOVI DEFAULTS
import { GLOBAL_DEFAULTS, TEMPLATE_DEFAULTS } from './data/defaults';

import ControlsPanel from './components/editor/ControlsPanel';
import MobileSheet from './components/UI/MobileSheet';

const App = () => {
  const [activeTemplateId, setActiveTemplateId] = useState(TEMPLATES[0].id);
  const [themeColor, setThemeColor] = useState('orange');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [scale, setScale] = useState(0.45);
  
  const cardRef = useRef(null);
  const prevWidth = useRef(window.innerWidth);

  // --- 1. STATO GLOBALE (Inizializzato dal file esterno) ---
  const [sessionData, setSessionData] = useState(GLOBAL_DEFAULTS);

  // --- 2. STATO TEMPLATE (Inizializzato dal file esterno in base all'ID) ---
  const [templateData, setTemplateData] = useState(TEMPLATE_DEFAULTS[activeTemplateId] || {});

  // --- 3. MERGE (Unione dei dati per i componenti) ---
  const data = { ...sessionData, ...templateData };

  // GESTORE INTELLIGENTE
  const handleDataChange = (key, value) => {
    // Se la chiave esiste nei Global Defaults, aggiorna la sessione
    if (key in GLOBAL_DEFAULTS) {
      setSessionData(prev => ({ ...prev, [key]: value }));
    } else {
      // Altrimenti è un dato specifico del template
      setTemplateData(prev => ({ ...prev, [key]: value }));
    }
  };

  // CAMBIO TEMPLATE
  const handleTemplateChange = (newId) => {
    setActiveTemplateId(newId);
    // Carica i default specifici dal file esterno (resetta punteggi/roster)
    setTemplateData(TEMPLATE_DEFAULTS[newId] || {});
    const newTemplate = TEMPLATES.find(t => t.id === newId);
    if (newTemplate && newTemplate.defaultTheme) {
        setThemeColor(newTemplate.defaultTheme);
    }
    setIsTemplateSelectorOpen(false);
  };

  // ... (Il resto delle funzioni Download, Resize e Render rimane uguale) ...
  const handleDownload = async () => {
    if (cardRef.current === null) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      download(dataUrl, `duocanvas-${activeTemplateId}.png`);
    } catch (err) {
      console.error('Errore:', err);
      alert("Errore generazione immagine");
    } finally {
      setIsGenerating(false);
    }
  };

  const activeTemplate = TEMPLATES.find(t => t.id === activeTemplateId);
  const CurrentTheme = THEMES[themeColor];

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth === prevWidth.current) return;
      prevWidth.current = currentWidth; 
      if (currentWidth < 768) {
        setScale((currentWidth * 0.85) / 1080);
      } else {
        setScale(0.45);
        setIsMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sharedProps = {
    data, 
    handleDataChange,
    activeTemplateId, 
    setActiveTemplateId: handleTemplateChange,
    themeColor, 
    setThemeColor,
    isTemplateSelectorOpen, 
    setIsTemplateSelectorOpen,
    activeTemplate, 
    currentTheme: CurrentTheme,
    isGenerating,
    handleDownload
  };

  return (
    <div className="h-[100dvh] bg-gray-100 text-slate-800 font-sans flex flex-col md:flex-row overflow-hidden fixed inset-0">
      <div className="hidden md:flex w-[400px] bg-white border-r flex-col shadow-2xl z-20 h-full relative">
        <div className="p-6 border-b bg-white/80 backdrop-blur sticky top-0 z-10">
          <h1 className="text-xl font-black flex items-center gap-2 text-gray-900 tracking-tight">
            <Layout className="text-orange-600"/> DuoCanvas
          </h1>
        </div>
        <div className="p-6 flex-1 overflow-y-auto scrollbar-thin">
           <ControlsPanel {...sharedProps} isDesktop={true} />
        </div>
      </div>

      <div className="flex-1 bg-gray-200/50 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="md:hidden absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
           <h1 className="text-white font-black flex items-center gap-2 drop-shadow-md"><Layout size={18}/> DuoCanvas</h1>
           <button onClick={handleDownload} className="pointer-events-auto bg-white/20 backdrop-blur-md text-white p-2 rounded-full"><Download size={20} /></button>
        </div>
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="origin-center shadow-2xl transition-transform duration-300 ease-out flex-shrink-0" style={{ width: '1080px', height: '1350px', transform: `scale(${scale})` }}>
             {activeTemplate && <activeTemplate.Render data={data} theme={CurrentTheme} cardRef={cardRef} />}
          </div>
        </div>
      </div>

      {!isMobileMenuOpen && (
        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden fixed bottom-6 right-6 z-40 bg-gray-900 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform">
          <Edit3 size={24} />
        </button>
      )}

      <MobileSheet isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onDownload={handleDownload}>
        <ControlsPanel {...sharedProps} isDesktop={false} />
      </MobileSheet>
    </div>
  );
};

export default App;