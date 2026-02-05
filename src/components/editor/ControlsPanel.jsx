import React from 'react';
import { Palette, Download, Check } from 'lucide-react';
import { THEMES } from '../../config/templateRegistry';
import TemplateSelector from './TemplateSelector';

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
    <div className="space-y-6">
      
      {/* 1. SELETTORE TEMPLATE */}
      <TemplateSelector 
        activeTemplateId={activeTemplateId}
        setActiveTemplateId={setActiveTemplateId}
        activeTemplate={activeTemplate}
        isOpen={isTemplateSelectorOpen}
        setIsOpen={setIsTemplateSelectorOpen}
      />

      {/* 2. CONTROLLI SPECIFICI DEL TEMPLATE SCELTO */}
      <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 shadow-inner">
        {activeTemplate && <activeTemplate.Controls data={data} onChange={handleDataChange} themeColor={themeColor} />}
      </div>

      {/* 3. SELETTORE COLORE */}
      <div className="space-y-3 pt-6 border-t border-gray-100 italic">
        <h3 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest flex items-center gap-2 not-italic">
            <Palette size={14} className="text-gray-300" /> Colore Dominante
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide touch-pan-x px-1">
           {Object.keys(THEMES).map(color => (
              <button
                key={color}
                onClick={() => setThemeColor(color)}
                className={`flex-shrink-0 w-12 h-12 rounded-2xl border-4 transition-all duration-300 relative ${themeColor === color ? 'border-gray-900 scale-110 shadow-xl' : 'border-white hover:scale-105 shadow-md'}`}
                style={{ backgroundColor: THEMES[color].preview }}
              >
                 {themeColor === color && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl">
                        <Check size={16} className="text-white" strokeWidth={4} />
                    </div>
                 )}
              </button>
           ))}
        </div>
      </div>

      {/* 5. DOWNLOAD */}
      <div className="hidden md:block pt-4">
          <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full h-16 bg-gray-900 text-white rounded-2xl font-black uppercase text-[15px] italic tracking-tight flex items-center justify-center gap-3 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-gray-200"
            >
              {isGenerating ? 'Generazione...' : <><Download size={22} /> Scarica Progetto</>}
          </button>
      </div>

    </div>
  );
};

export default ControlsPanel;