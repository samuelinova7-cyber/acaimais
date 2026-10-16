import React from 'react';
import { STORE_INFO } from '../data/menuData';

export const MascotLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dimensions = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
  }[size];

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${dimensions} ${className}`}>
      {/* Glowing Neon Aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-lime-400 via-fuchsia-500 to-purple-600 blur-md opacity-80 animate-pulse-subtle" />

      {/* Official Brand Logo Container */}
      <div className="relative w-full h-full rounded-full border-2 sm:border-4 border-lime-400/90 shadow-[0_0_25px_rgba(163,230,53,0.6)] overflow-hidden bg-purple-950 flex items-center justify-center p-0.5">
        <img
          src={STORE_INFO.logoUrl}
          alt="Açaí + Mais Expresso Logo Oficial"
          className="w-full h-full object-cover rounded-full select-none"
          loading="eager"
        />
      </div>

      {/* Decorative Plus Badge */}
      <div className="absolute -bottom-1 -right-1 bg-lime-400 text-purple-950 font-black text-xs px-2 py-0.5 rounded-full border-2 border-purple-950 shadow-lg">
        +
      </div>
    </div>
  );
};
