import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';

const MobileSheet = ({ isOpen, onClose, children, onDownload }) => {
  // Blocco scroll del body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div className={`md:hidden fixed inset-0 z-50 flex flex-col justify-end transition-visibility duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        
        {/* Backdrop */}
        <div 
           onClick={onClose}
           className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        ></div>

        {/* Content */}
        <div 
          className={`relative bg-white w-full rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] flex flex-col transition-transform duration-300 cubic-bezier(0.32, 0.72, 0, 1) ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
          style={{ height: '85vh', maxHeight: '85dvh' }} 
        >
           <div className="w-full flex justify-center pt-3 pb-1 flex-shrink-0" onClick={onClose}>
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
           </div>

           <div className="px-6 py-2 flex justify-between items-center border-b border-gray-100 flex-shrink-0">
              <span className="font-bold text-lg">Modifica</span>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <X size={18} />
              </button>
           </div>

           {/* Area Scrollabile */}
           <div className="p-6 overflow-y-auto overflow-x-hidden flex-1 safe-area-bottom overscroll-contain">
              {children}
              <div className="h-20"></div> 
           </div>

           {/* Footer Fisso */}
           <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 safe-area-bottom flex-shrink-0">
             <button 
                onClick={() => {
                  onClose();
                  setTimeout(onDownload, 300);
                }}
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-orange-200"
              >
                <Download size={20} /> Salva Immagine
             </button>
           </div>
        </div>
      </div>
  );
};

export default MobileSheet;