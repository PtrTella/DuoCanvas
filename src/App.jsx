import React, { useState, useRef } from 'react';
import { Layout, Download, Eye, Edit3 } from 'lucide-react';

import { TEMPLATES, TEMPLATES_LIST, THEMES, GLOBAL_DEFAULTS, CLUB_INFO, TEMPLATE_DEFAULTS } from './config';
import { useScale } from './hooks/useScale';
import { useDownload } from './hooks/useDownload'; 

import ControlsPanel from './components/editor/ControlsPanel';

const App = () => {
  // --- STATI ---
  const firstId = Object.keys(TEMPLATES)[0];
  const [activeTemplateId, setActiveTemplateId] = useState(firstId);
  const [themeColor, setThemeColor] = useState(TEMPLATES[firstId].defaultTheme);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);

  // Update document title based on club info
  React.useEffect(() => {
    document.title = `${CLUB_INFO.name} - Canvas`;
  }, []);

  // Global Session Data
  const [sessionData, setSessionData] = useState(GLOBAL_DEFAULTS);

  // Per-template Persistent Data Map
  const [templateDataMap, setTemplateDataMap] = useState(TEMPLATE_DEFAULTS);

  // Refs
  const cardRef = useRef(null);
  const previewWrapperRef = useRef(null);
  const scale = useScale(previewWrapperRef, showMobilePreview);

  // --- HOOK DOWNLOAD ---
  const { downloadSnapshot, isGenerating: isProcessing } = useDownload(cardRef);

  // --- LOGICA ---
  const activeTemplate = TEMPLATES[activeTemplateId] || TEMPLATES[firstId];
  const currentTheme = THEMES[themeColor] || THEMES['orange'];
  
  // Combined data for rendering
  const currentTemplateData = templateDataMap[activeTemplateId] || {};
  const data = { ...sessionData, ...currentTemplateData };

  const handleTemplateChange = (newId) => {
    const newTemplate = TEMPLATES[newId];
    if (!newTemplate) return;

    setActiveTemplateId(newId);
    
    // Switch theme if template has a preference and it's not already set
    if (newTemplate.defaultTheme && themeColor !== newTemplate.defaultTheme) {
      setThemeColor(newTemplate.defaultTheme);
    }
    
    setIsTemplateSelectorOpen(false);
  };

  const handleDataChange = (key, value) => {
    // ROUTING LOGIC:
    // 1. If key is explicitly defined in template's defaultData, it's TEMPLATE SPECIFIC.
    // 2. Otherwise, if it's in GLOBAL_DEFAULTS, it's SESSION WIDE.
    // 3. Fallback: treat as TEMPLATE SPECIFIC.
    
    const isTemplateSpecific = activeTemplate.defaultData && (key in activeTemplate.defaultData);
    const isGlobal = key in GLOBAL_DEFAULTS;

    if (isTemplateSpecific) {
      setTemplateDataMap(prev => ({
        ...prev,
        [activeTemplateId]: { ...prev[activeTemplateId], [key]: value }
      }));
    } else if (isGlobal) {
      setSessionData(prev => ({ ...prev, [key]: value }));
    } else {
      setTemplateDataMap(prev => ({
        ...prev,
        [activeTemplateId]: { ...prev[activeTemplateId], [key]: value }
      }));
    }
  };

  const handleDownloadClick = () => {
    // On mobile, force preview mode first to ensure ref is visible and layout is correct
    if (!showMobilePreview && window.innerWidth < 768) {
        setShowMobilePreview(true);
        setTimeout(() => {
            downloadSnapshot(`duocanvas-${activeTemplateId}`);
        }, 150);
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
        <div className="hidden md:flex p-6 border-b border-gray-100 items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Layout className="text-white" size={24} strokeWidth={2.5}/>
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter uppercase italic leading-none">{CLUB_INFO.name}</h1>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none">Studio Editor</span>
            </div>
          </div>
          <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">v2.0</span>
          </div>
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
              
              // --- CORREZIONE IMPORTANTE QUI ---
              // Passiamo le variabili di stato vere, non 'false' statico!
              isTemplateSelectorOpen={isTemplateSelectorOpen}
              setIsTemplateSelectorOpen={setIsTemplateSelectorOpen}
              
              isGenerating={isProcessing} 
              handleDownload={handleDownloadClick} 
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