import React from 'react';
import { Upload, RefreshCw } from 'lucide-react';

/**
 * Common styles for our editor inputs
 */
export const inputStyles = {
  base: "w-full p-3 bg-gray-50 border-2 border-transparent transition-all outline-none rounded-xl text-sm font-bold shadow-sm focus:bg-white focus:border-gray-950",
  interactive: "cursor-pointer flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 active:scale-95",
  mono: "font-mono text-[13px]",
  italic: "italic",
  error: "border-red-500 bg-red-50",
};

export const labelStyles = {
  base: "text-[10px] font-black text-gray-500 uppercase block ml-1 tracking-widest mb-1.5",
  right: "text-right mr-1",
};

/**
 * Standard Form Label
 */
export const Label = ({ children, className = "", align = 'left' }) => (
  <label className={`${labelStyles.base} ${align === 'right' ? labelStyles.right : ''} ${className}`}>
    {children}
  </label>
);

/**
 * Standard Text Input with optional Icon
 */
export const Input = ({ icon: Icon, label, align = 'left', className = "", ...props }) => (
  <div className="space-y-1.5 flex-1">
    {label && <Label align={align}>{label}</Label>}
    <div className="relative group">
      {Icon && (
        <Icon 
          size={14} 
          strokeWidth={2.5} 
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-950 transition-colors" 
        />
      )}
      <input 
        className={`
          ${inputStyles.base} 
          ${Icon ? 'pl-10' : ''} 
          ${align === 'right' ? 'text-right' : ''} 
          ${className}
        `} 
        {...props} 
      />
    </div>
  </div>
);

/**
 * Standard Select Input
 */
export const Select = ({ label, children, className = "", ...props }) => (
  <div className="space-y-1.5 flex-1">
    {label && <Label>{label}</Label>}
    <select 
      className={`${inputStyles.base} appearance-none ${className}`}
      {...props}
    >
      {children}
    </select>
  </div>
);

/**
 * Standard Text Area
 */
export const TextArea = ({ label, className = "", ...props }) => (
  <div className="space-y-1.5">
    {label && <Label>{label}</Label>}
    <textarea 
      className={`${inputStyles.base} ${inputStyles.mono} min-h-[120px] resize-none leading-relaxed p-4 h-56 ${className}`}
      {...props}
    />
  </div>
);

/**
 * Image Uploader Component
 */
export const ImageUploader = ({ value, onChange, label = "Immagine", className = "" }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`space-y-1.5 flex-1 ${className}`}>
      {label && <Label>{label}</Label>}
      <div className="flex items-center gap-2">
        <label className={`${inputStyles.base} ${inputStyles.interactive} overflow-hidden min-w-0 flex-1`}>
          {value ? <RefreshCw size={14} strokeWidth={2.5} /> : <Upload size={14} strokeWidth={2.5} />}
          <span className="truncate">{value ? 'Sostituisci' : 'Scegli'}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        
        {value && (
          <div className="w-12 h-12 border rounded-xl bg-white p-1 shadow-sm flex-shrink-0 animate-in zoom-in-50 duration-200">
             <img src={value} className="w-full h-full object-contain" alt="Preview"/>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Informative Box
 */
export const InfoBox = ({ children, icon: Icon, color = 'blue' }) => {
  const colors = {
    blue: "bg-blue-50/50 border-blue-100 text-blue-700",
    orange: "bg-orange-50/50 border-orange-100 text-orange-700",
  };
  
  return (
    <div className={`border rounded-xl p-3 mb-4 flex gap-3 ${colors[color] || colors.blue}`}>
      {Icon && <Icon size={16} className="shrink-0 mt-0.5 opacity-80" />}
      <div className="text-[10px] leading-tight font-medium">
        {children}
      </div>
    </div>
  );
};
