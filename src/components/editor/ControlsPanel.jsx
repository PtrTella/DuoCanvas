import React from 'react';
import { Palette, Download, Check } from 'lucide-react';
import { THEMES } from '../../config';
import TemplateSelector from './TemplateSelector';
import ControlSection from '../ui/ControlSection';

const ControlsPanel = ({ 
  data, handleDataChange, 
  activeTemplateId, setActiveTemplateId, 
  themeColor, setThemeColor, 
  activeTemplate, currentTheme,
  isGenerating, handleDownload,
  // Queste due props arrivano da App.jsx
  isTemplateSelectorOpen, setIsTemplateSelectorOpen 
}) => {
  
  return (
    <div className="space-y-2">
      
      {/* 1. SELETTORE TEMPLATE */}
      <TemplateSelector 
        activeTemplateId={activeTemplateId}
        setActiveTemplateId={setActiveTemplateId}
        activeTemplate={activeTemplate}
        isOpen={isTemplateSelectorOpen}
        setIsOpen={setIsTemplateSelectorOpen}
      />

      {/* 2. CONTROLLI SPECIFICI DEL TEMPLATE SCELTO */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTemplate && <activeTemplate.Controls data={data} onChange={handleDataChange} themeColor={themeColor} />}
      </div>

      {/* 3. SELETTORE COLORE */}
      <ControlSection title="Colore Dominante" icon={Palette}>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide touch-pan-x px-1 -mt-2">
           {Object.keys(THEMES).map(color => (
              <button
                key={color}
                onClick={() => setThemeColor(color)}
                className={`flex-shrink-0 w-12 h-12 rounded-2xl border-4 transition-all duration-300 relative ${themeColor === color ? 'border-gray-950 scale-110 shadow-xl' : 'border-white hover:scale-105 shadow-md hover:border-gray-100'}`}
                style={{ backgroundColor: THEMES[color].hex }}
              >
                 {themeColor === color && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl">
                        <Check size={16} className="text-white" strokeWidth={4} />
                    </div>
                 )}
              </button>
           ))}
        </div>
      </ControlSection>

      {/* 5. DOWNLOAD */}
      <div className="hidden md:block pt-8">
          <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full h-16 bg-gray-950 text-white rounded-2xl font-black uppercase text-[15px] italic tracking-tight flex items-center justify-center gap-3 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-gray-200 group"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generazione...</span>
                </div>
              ) : (
                <>
                  <Download size={20} strokeWidth={3} className="group-hover:translate-y-0.5 transition-transform" /> 
                  Scarica Progetto
                </>
              )}
          </button>
      </div>

    </div>
  );
};

export default ControlsPanel;