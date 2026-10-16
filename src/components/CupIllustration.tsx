import React from 'react';

interface CupIllustrationProps {
  volume: number;
  highlight?: boolean;
}

export const CupIllustration: React.FC<CupIllustrationProps> = ({ volume, highlight }) => {
  // Height and scale proportion based on volume: 200, 300, 400, 500 ml
  const scaleMap: Record<number, { height: number; width: number; fontSize: string }> = {
    200: { height: 95, width: 70, fontSize: 'text-xs' },
    300: { height: 115, width: 78, fontSize: 'text-sm' },
    400: { height: 130, width: 85, fontSize: 'text-sm' },
    500: { height: 145, width: 92, fontSize: 'text-base' },
  };

  const current = scaleMap[volume] || scaleMap[300];

  return (
    <div className="relative flex flex-col items-center justify-end h-40">
      {/* Decorative creamy swirl on top of cup */}
      <div
        className="relative z-10 -mb-2 transition-transform duration-300 group-hover:scale-105"
        style={{ width: `${current.width + 8}px` }}
      >
        <svg viewBox="0 0 100 45" className="w-full drop-shadow-md">
          {/* Swirled açaí peak */}
          <path
            d="M 12 35 C 10 20, 35 12, 50 6 C 65 12, 90 20, 88 35 C 75 42, 25 42, 12 35 Z"
            fill="#3b0764"
          />
          {/* Swirl lines */}
          <path
            d="M 22 28 Q 50 15 78 28"
            fill="none"
            stroke="#581c87"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 32 20 Q 50 12 68 20"
            fill="none"
            stroke="#7e22ce"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Condensed milk / topping ribbon drizzle */}
          <path
            d="M 25 32 Q 35 22 45 30 Q 55 20 65 30 Q 75 22 80 32"
            fill="none"
            stroke={highlight ? '#fef08a' : '#fbcfe8'}
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Tiny fruit pieces / colorful sprinkles */}
          <circle cx="35" cy="20" r="2.5" fill="#facc15" />
          <circle cx="52" cy="14" r="2.5" fill="#ef4444" />
          <circle cx="68" cy="22" r="2.5" fill="#a3e635" />
        </svg>
      </div>

      {/* The Cup Body */}
      <div
        className={`relative rounded-b-2xl overflow-hidden transition-all duration-300 border-2 ${
          highlight
            ? 'border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.35)]'
            : 'border-purple-600/60 shadow-lg'
        }`}
        style={{
          width: `${current.width}px`,
          height: `${current.height}px`,
          background: 'linear-gradient(180deg, #2e0854 0%, #1e0538 100%)',
        }}
      >
        {/* Cup Rim */}
        <div className="w-full h-3 bg-purple-700/80 border-b border-purple-500/50 flex items-center justify-center">
          <div className="w-1/2 h-0.5 bg-lime-400/40 rounded-full" />
        </div>

        {/* Cup Inner Depth Gradient */}
        <div className="absolute inset-x-2 top-4 bottom-2 rounded-b-xl bg-gradient-to-b from-purple-900 to-purple-950/80 flex flex-col items-center justify-center p-1 text-center">
          {/* Logo badge in center of cup */}
          <div className="w-8 h-8 rounded-full bg-purple-950 border border-lime-400/60 flex items-center justify-center shadow-inner mb-1">
            <span className="text-lime-300 font-black text-[11px] leading-none">A+</span>
          </div>

          <span className="text-white font-extrabold text-xs tracking-wider uppercase font-display leading-none">
            Açaí
          </span>
          <span className="text-lime-400 font-black text-sm tracking-tighter leading-tight">
            {volume}ml
          </span>

          {/* Ice / freshness waves */}
          <div className="mt-1 flex gap-0.5 opacity-60">
            <span className="w-1 h-1 rounded-full bg-lime-300"></span>
            <span className="w-1.5 h-1 rounded-full bg-purple-400"></span>
            <span className="w-1 h-1 rounded-full bg-lime-300"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
