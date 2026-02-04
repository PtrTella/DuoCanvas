import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { TEMPLATES } from '../../config/templateRegistry';

const TemplateSelector = ({ activeTemplateId, setActiveTemplateId, isOpen, setIsOpen, activeTemplate }) => {
  
  return (
    <div className="mb-6 relative z-50">
      <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block tracking-wider">
        Seleziona Grafica
      </label>
      
      {/* 1. Il Bottone che vedi sempre */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white border-2 border-gray-100 rounded-xl hover:border-orange-200 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
             {activeTemplate && <activeTemplate.icon size={18} />}
          </div>
          <span className="font-bold text-gray-800 text-sm">
             {activeTemplate?.name || "Seleziona..."}
          </span>
        </div>
        <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 2. La Lista a tendina */}
      {isOpen && (
        <>
          {/* Overlay invisibile per chiudere cliccando fuori */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden max-h-60 overflow-y-auto p-1 animate-in fade-in zoom-in-95 duration-100">
            {TEMPLATES.map(t => {
              const isActive = activeTemplateId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTemplateId(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${isActive ? 'bg-orange-50 text-orange-700' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <t.icon size={18} className={isActive ? 'text-orange-600' : 'text-gray-400'}/>
                  <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{t.name}</span>
                  {isActive && <Check size={16} className="ml-auto text-orange-600"/>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateSelector;