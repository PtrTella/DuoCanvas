import React from 'react';
import { Palette, Download } from 'lucide-react';
import { THEMES } from '../../data/templateRegistry';
import TemplateSelector from './TemplateSelector';

const ControlsPanel = ({ 
  data, handleDataChange, 
  activeTemplateId, setActiveTemplateId, 
  themeColor, setThemeColor, 
  isTemplateSelectorOpen, setIsTemplateSelectorOpen,
  activeTemplate, currentTheme,
  isGenerating, handleDownload, isDesktop 
}) => {
  
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      
      <TemplateSelector 
        activeTemplateId={activeTemplateId}
        setActiveTemplateId={setActiveTemplateId}
        isOpen={isTemplateSelectorOpen}
        setIsOpen={setIsTemplateSelectorOpen}
        currentTheme={currentTheme}
        activeTemplate={activeTemplate}
      />

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
        {activeTemplate && <activeTemplate.Controls data={data} onChange={handleDataChange} />}
      </div>

      {/* Selettore Colore */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
            <Palette size={14}/> Tema
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide touch-pan-x">
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

      {/* Bottone Download Desktop */}
      {isDesktop && (
        <div className="hidden md:block pt-6">
          <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
            >
              {isGenerating ? 'Generazione...' : <><Download size={20} /> Scarica Immagine</>}
          </button>
        </div>
      )}
    </div>
  );
};

export default ControlsPanel;