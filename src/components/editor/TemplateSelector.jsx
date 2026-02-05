import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { TEMPLATES } from '../../config';

const TemplateSelector = ({ activeTemplateId, setActiveTemplateId, isOpen, setIsOpen, activeTemplate }) => {
  
  return (
    <div className="mb-6 relative z-50 italic">
      <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block tracking-widest not-italic">
        Modello Grafico
      </label>
      
      {/* 1. Il Bottone che vedi sempre */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-900 transition-all shadow-sm active:scale-[0.98] not-italic"
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gray-900 text-white rounded-xl shadow-lg shadow-gray-200">
             {activeTemplate && <activeTemplate.icon size={20} />}
          </div>
          <span className="font-black text-gray-900 text-[15px] uppercase tracking-tight italic">
             {activeTemplate?.name || "Seleziona..."}
          </span>
        </div>
        <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 2. La Lista a tendina */}
      {isOpen && (
        <>
          {/* Overlay invisibile per chiudere cliccando fuori */}
          <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
          
          <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden max-h-80 overflow-y-auto p-1.5 animate-in fade-in zoom-in-95 duration-200 not-italic">
            {TEMPLATES.map(t => {
              const isActive = activeTemplateId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTemplateId(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all ${isActive ? 'bg-gray-900 text-white shadow-lg' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/10' : 'bg-gray-100'}`}>
                    <t.icon size={18} className={isActive ? 'text-white' : 'text-gray-400'}/>
                  </div>
                  <span className={`text-[13px] uppercase tracking-tight italic ${isActive ? 'font-black' : 'font-bold'}`}>{t.name}</span>
                  {isActive && <Check size={16} className="ml-auto text-white"/>}
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