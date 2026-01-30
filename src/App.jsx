import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Layout, Download, Eye, Edit3 } from 'lucide-react';

import { TEMPLATES, THEMES } from './data/templateRegistry';
import { GLOBAL_DEFAULTS, TEMPLATE_DEFAULTS } from './data/defaults';
import { useScale } from './hooks/useScale'; // Il tuo hook esistente

import ControlsPanel from './components/editor/ControlsPanel';

const App = () => {
  // --- STATI DATI ---
  const [activeTemplateId, setActiveTemplateId] = useState(TEMPLATES[0].id);
  const [themeColor, setThemeColor] = useState('orange');
  const [sessionData, setSessionData] = useState(GLOBAL_DEFAULTS);
  const [templateData, setTemplateData] = useState(TEMPLATE_DEFAULTS[activeTemplateId]);

  // --- STATI UI ---
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false); // TRUE = Vedo Anteprima, FALSE = Vedo Editor
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false); // Stato dropdown

  // --- REFS & HOOKS ---
  const cardRef = useRef(null);
  const previewWrapperRef = useRef(null);
  const scale = useScale(previewWrapperRef); // Il tuo hook lavora qui

  // --- LOGICA ---
  const activeTemplate = TEMPLATES.find(t => t.id === activeTemplateId);
  const currentTheme = THEMES[themeColor] || THEMES['orange'];
  const data = { ...sessionData, ...templateData };

  const handleTemplateChange = (newId) => {
    const newTemplate = TEMPLATES.find(t => t.id === newId);
    setActiveTemplateId(newId);
    setTemplateData(TEMPLATE_DEFAULTS[newId]);
    if (newTemplate.defaultTheme) setThemeColor(newTemplate.defaultTheme);
    setIsTemplateSelectorOpen(false); // Chiude il dropdown dopo la scelta
  };

  const handleDataChange = (key, value) => {
    if (key in GLOBAL_DEFAULTS) setSessionData(prev => ({ ...prev, [key]: value }));
    else setTemplateData(prev => ({ ...prev, [key]: value }));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    // Nota: html-to-image a volte fa i capricci se l'elemento è "display: none".
    // Ma React qui gestisce il DOM. Se hai problemi su mobile, forza showMobilePreview(true) prima.
    try {
        const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
        download(dataUrl, `duocanvas-${activeTemplateId}.png`);
    } catch (e) {
        console.error(e);
        alert("Errore. Prova ad andare in Anteprima prima di scaricare.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-gray-100 overflow-hidden font-sans">
      
      {/* =========================================================================
          1. ZONA PREVIEW 
          - Mobile: Visibile SOLO se showMobilePreview è TRUE.
          - Desktop: SEMPRE visibile (md:flex).
      ========================================================================== */}
      <div 
        ref={previewWrapperRef}
        className={`
            flex-1 bg-gray-200/50 items-center justify-center p-4 overflow-hidden relative order-1 md:order-2
            ${showMobilePreview ? 'flex' : 'hidden md:flex'} 
        `}
      >
        {/* Label Mobile */}
        <div className="md:hidden absolute top-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            Anteprima Finale
        </div>

        {/* Canvas Scalato */}
        <div 
          style={{ width: 1080, height: 1350, transform: `scale(${scale})` }}
          className="shadow-2xl bg-white transition-transform duration-200 ease-out origin-center"
        >
           {activeTemplate && <activeTemplate.Render data={data} theme={currentTheme} cardRef={cardRef} />}
        </div>
      </div>

      {/* =========================================================================
          2. ZONA CONTROLLI 
          - Mobile: Visibile SOLO se showMobilePreview è FALSE.
          - Desktop: SEMPRE visibile.
      ========================================================================== */}
      <div className={`
          w-full md:w-[400px] bg-white border-r border-gray-200 flex-col z-10 shadow-xl order-2 md:order-1 h-full
          ${!showMobilePreview ? 'flex' : 'hidden md:flex'}
      `}>
        <div className="hidden md:flex p-5 border-b items-center gap-2 bg-white">
          <Layout className="text-orange-600" size={24}/>
          <h1 className="font-black text-xl tracking-tight">DuoCanvas</h1>
        </div>

        {/* Scrollable Panel (pb-32 per non coprire l'ultimo input con la barra flottante) */}
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
              isTemplateSelectorOpen={isTemplateSelectorOpen}
              setIsTemplateSelectorOpen={setIsTemplateSelectorOpen}
              isGenerating={isGenerating}
              handleDownload={handleDownload}
           />
        </div>
      </div>

      {/* =========================================================================
          3. BARRA FLOTTANTE MOBILE (Solo Mobile)
      ========================================================================== */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-900/95 backdrop-blur-md p-2 pl-3 rounded-full shadow-2xl border border-white/10 ring-1 ring-black/5">
          
          {/* Tasto Toggle (Edit / Preview) */}
          <button 
             onClick={() => setShowMobilePreview(!showMobilePreview)}
             className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-gray-900 font-bold text-sm transition-transform active:scale-95 shadow-sm"
          >
              {showMobilePreview ? (
                  <><Edit3 size={18} /> Modifica</>
              ) : (
                  <><Eye size={18} /> Anteprima</>
              )}
          </button>

          {/* Divisore */}
          <div className="w-px h-6 bg-white/20"></div>

          {/* Tasto Download */}
          <button 
             onClick={handleDownload}
             disabled={isGenerating}
             className={`
                w-11 h-11 flex items-center justify-center rounded-full text-white transition-all active:scale-90
                ${isGenerating ? 'bg-gray-700' : 'bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-900/50'}
             `}
          >
              {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Download size={20}/>}
          </button>

      </div>

    </div>
  );
};

export default App;