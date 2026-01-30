import React, { useState, useRef } from 'react';
// import { toPng } from 'html-to-image'; <-- RIMUOVI QUESTO
// import download from 'downloadjs';     <-- RIMUOVI QUESTO
import { Layout, Download, Eye, Edit3 } from 'lucide-react';

import { TEMPLATES, THEMES } from './data/templateRegistry';
import { GLOBAL_DEFAULTS, TEMPLATE_DEFAULTS } from './data/defaults';
import { useScale } from './hooks/useScale';
// IMPORTA IL NUOVO HOOK
import { useDownload } from './hooks/useDownload'; 

import ControlsPanel from './components/editor/ControlsPanel';

const App = () => {
  // --- STATI ---
  const [activeTemplateId, setActiveTemplateId] = useState(TEMPLATES[0].id);
  const [themeColor, setThemeColor] = useState('orange');
  const [isGenerating, setIsGenerating] = useState(false); // Puoi rimuoverlo se usi quello dell'hook, ma vedi sotto
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Dati
  const [sessionData, setSessionData] = useState(GLOBAL_DEFAULTS);
  const [templateData, setTemplateData] = useState(TEMPLATE_DEFAULTS[activeTemplateId]);

  // Refs
  const cardRef = useRef(null);
  const previewWrapperRef = useRef(null);
  const scale = useScale(previewWrapperRef, showMobilePreview);

  // --- USA IL NUOVO HOOK ---
  // Rinominiamo isGenerating dell'hook per non fare confusione
  const { downloadSnapshot, isGenerating: isProcessing } = useDownload(cardRef);

  // --- LOGICA ---
  const activeTemplate = TEMPLATES.find(t => t.id === activeTemplateId);
  const currentTheme = THEMES[themeColor] || THEMES['orange'];
  const data = { ...sessionData, ...templateData };

  const handleTemplateChange = (newId) => {
    const newTemplate = TEMPLATES.find(t => t.id === newId);
    setActiveTemplateId(newId);
    setTemplateData(TEMPLATE_DEFAULTS[newId]);
    if (newTemplate.defaultTheme) setThemeColor(newTemplate.defaultTheme);
  };

  const handleDataChange = (key, value) => {
    if (key in GLOBAL_DEFAULTS) setSessionData(prev => ({ ...prev, [key]: value }));
    else setTemplateData(prev => ({ ...prev, [key]: value }));
  };

  // Funzione Wrapper Semplice
  const handleDownloadClick = () => {
    // Se siamo su mobile e in modalità editor, l'anteprima è nascosta (display:none o hidden).
    // html-to-image fallisce su elementi nascosti.
    // FORZIAMO la visibilità prima di scattare se necessario.
    if (!showMobilePreview && window.innerWidth < 768) {
        setShowMobilePreview(true);
        // Aspettiamo un attimo che il CSS applichi il 'flex' invece di 'hidden'
        setTimeout(() => {
            downloadSnapshot(`duocanvas-${activeTemplateId}`);
        }, 100);
    } else {
        downloadSnapshot(`duocanvas-${activeTemplateId}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-gray-100 overflow-hidden font-sans">
      
      {/* 1. AREA PREVIEW */}
      <div 
        ref={previewWrapperRef}
        className={`
            flex-1 bg-gray-200/50 items-center justify-center p-4 overflow-hidden relative order-1 md:order-2
            ${showMobilePreview ? 'flex' : 'hidden md:flex'} 
        `}
      >
        <div className="md:hidden absolute top-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            Anteprima Finale
        </div>

        <div 
          style={{ width: 1080, height: 1350, transform: `scale(${scale})` }}
          className="shadow-2xl bg-white transition-transform duration-200 ease-out origin-center"
        >
           {activeTemplate && <activeTemplate.Render data={data} theme={currentTheme} cardRef={cardRef} />}
        </div>
      </div>

      {/* 2. AREA CONTROLLI */}
      <div className={`
          w-full md:w-[400px] bg-white border-r border-gray-200 flex-col z-10 shadow-xl order-2 md:order-1 h-full
          ${!showMobilePreview ? 'flex' : 'hidden md:flex'}
      `}>
        <div className="hidden md:flex p-5 border-b items-center gap-2 bg-white">
          <Layout className="text-orange-600" size={24}/>
          <h1 className="font-black text-xl tracking-tight">DuoCanvas</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin pb-32 md:pb-5">
           <ControlsPanel 
              data={data} 
              handleDataChange={handleDataChange}
              activeTemplateId={activeTemplateId}
              setActiveTemplateId={handleTemplateChange}
              themeColor={themeColor}
              setThemeColor={setThemeColor}
              activeTemplate={activeTemplate}
              currentTheme={currentTheme}
              isTemplateSelectorOpen={false} // Props opzionali
              setIsTemplateSelectorOpen={() => {}}
              isGenerating={isProcessing} // Passiamo lo stato dell'hook
              handleDownload={handleDownloadClick} // Passiamo il nuovo handler
              isDesktop={true}
           />
        </div>
      </div>

      {/* 3. BARRA MOBILE */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-900/95 backdrop-blur-md p-2 pl-3 rounded-full shadow-2xl border border-white/10 ring-1 ring-black/5">
          <button 
             onClick={() => setShowMobilePreview(!showMobilePreview)}
             className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-gray-900 font-bold text-sm transition-transform active:scale-95 shadow-sm"
          >
              {showMobilePreview ? <><Edit3 size={18} /> Modifica</> : <><Eye size={18} /> Anteprima</>}
          </button>
          <div className="w-px h-6 bg-white/20"></div>
          <button 
             onClick={handleDownloadClick}
             disabled={isProcessing}
             className={`
                w-11 h-11 flex items-center justify-center rounded-full text-white transition-all active:scale-90
                ${isProcessing ? 'bg-gray-700' : 'bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-900/50'}
             `}
          >
              {isProcessing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Download size={20}/>}
          </button>
      </div>

    </div>
  );
};

export default App;