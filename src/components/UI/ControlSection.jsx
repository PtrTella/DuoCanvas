import React from 'react';

/**
 * ControlSection - Unified header for editor sections
 * @param {string} title - Section title (uppercase)
 * @param {React.ElementType} icon - Lucide icon component
 * @param {React.ReactNode} children - Section content
 * @param {boolean} showBorder - Whether to show bottom border (default: true)
 */
export const ControlSection = ({ title, icon: Icon, children, showBorder = true }) => {
  return (
    <div className={`py-6 ${showBorder ? 'border-b border-gray-100 shadow-[0_1px_0_0_rgba(255,255,255,0.5)]' : ''}`}>
      <div className="flex items-center gap-2.5 mb-5 px-1 group">
        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gray-950/5 group-hover:bg-gray-950/10 transition-colors duration-200">
          {Icon && (
            <Icon 
              size={14} 
              strokeWidth={3} 
              className="text-gray-950" 
            />
          )}
        </div>
        <h3 className="text-[11px] font-[900] text-gray-950 uppercase tracking-[0.15em] leading-none">
          {title}
        </h3>
      </div>
      
      <div className="space-y-4 px-0.5">
        {children}
      </div>
    </div>
  );
};

export default ControlSection;