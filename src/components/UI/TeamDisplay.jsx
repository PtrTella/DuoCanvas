import React from 'react';

const TeamLogo = ({ src, alt = "Team Logo", fallbackText = "VS", className = "" }) => {
  return (
    <div className={`rounded-full overflow-hidden bg-white/10 flex items-center justify-center relative shadow-lg border border-white/10 backdrop-blur-sm ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover object-center" 
        />
      ) : (
        // Placeholder se non c'è immagine
        <div className="flex items-center justify-center w-full h-full">
           <span className="text-white/20 font-black text-xl uppercase tracking-widest">
             {fallbackText}
           </span>
        </div>
      )}
    </div>
  );
};

const TeamDisplay = ({ 
  name, 
  logoSrc, 
  reverse = false, 
  theme, 
  logoSize = "w-32 h-32 md:w-40 md:h-40", // Default grande
  textSize = "text-3xl" // Default grande
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${reverse ? 'order-last' : ''}`}>
       <div className={`${logoSize} relative z-10`}> 
           <TeamLogo src={logoSrc} alt={name} className="w-full h-full shadow-xl" />
       </div>
       <h2 className={`${textSize} font-black uppercase text-white leading-none tracking-tighter text-center drop-shadow-md max-w-[200px]`}>
          {name}
       </h2>
    </div>
  );
};

export default TeamDisplay;