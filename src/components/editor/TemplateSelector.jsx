import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { TEMPLATES } from '../../data/templateRegistry'; // Nota il percorso ../../

const TemplateSelector = ({ activeTemplateId, setActiveTemplateId, isOpen, setIsOpen, currentTheme, activeTemplate }) => (
  <div className="relative z-30">
    <h3 className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Scegli Grafica</h3>
    
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full text-white bg-gradient-to-br ${currentTheme.primary}`}>
          {activeTemplate && <activeTemplate.icon size={16} />}
        </div>
        <span className="font-bold text-gray-800">{activeTemplate?.name}</span>
      </div>
      <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>

    {isOpen && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-60 overflow-y-auto z-40">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTemplateId(t.id);
              setIsOpen(false);
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

export default TemplateSelector;