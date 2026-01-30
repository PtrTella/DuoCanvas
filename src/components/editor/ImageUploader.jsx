import React from 'react';
import { Upload, RefreshCw } from 'lucide-react';

const ImageUploader = ({ value, onChange, label = "Carica Immagine" }) => {
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Qui avviene la magia: restituisce SEMPRE Base64
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pt-2">
      <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">{label}</label>
      <div className="flex items-center gap-2">
        <label className="cursor-pointer flex-1 flex items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 text-sm font-bold text-gray-700 transition-all active:scale-95 shadow-sm">
          {value ? <RefreshCw size={16} /> : <Upload size={16} />}
          {value ? 'Sostituisci' : 'Seleziona File'}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        
        {value && (
          <div className="w-12 h-12 border rounded-xl bg-white p-1 shadow-sm shrink-0">
             <img src={value} className="w-full h-full object-contain" alt="Preview"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;