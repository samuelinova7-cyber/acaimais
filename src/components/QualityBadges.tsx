import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, Leaf, Banana } from 'lucide-react';

export const QualityBadges: React.FC = () => {
  const badges = [
    {
      title: 'BANANA NO LUGAR DO AÇÚCAR',
      subtitle: 'Adoçado Naturalmente',
      icon: <span className="text-base leading-none">🍌</span>,
      color: 'border-yellow-400/50 bg-yellow-950/40 text-yellow-200',
    },
    {
      title: 'SEM GLÚTEN',
      subtitle: '100% Seguro',
      icon: <Leaf className="w-4 h-4 text-lime-400" />,
      color: 'border-lime-500/40 bg-lime-950/40 text-lime-200',
    },
    {
      title: 'SEM LACTOSE',
      subtitle: 'Fácil Digestão',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200',
    },
    {
      title: 'SEM XAROPE',
      subtitle: 'Sabor Raiz Puro',
      icon: <HeartHandshake className="w-4 h-4 text-fuchsia-400" />,
      color: 'border-fuchsia-500/40 bg-fuchsia-950/40 text-fuchsia-200',
    },
    {
      title: 'SUPER CREMOSO',
      subtitle: 'Textura Expresso',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-950/40 text-amber-200',
    },
  ];

  return (
    <div className="w-full space-y-2.5">
      {/* Featured Highlight Bar */}
      <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-lime-500/20 to-purple-500/20 border-2 border-lime-400/70 text-center shadow-lg backdrop-blur-md">
        <p className="text-xs sm:text-sm font-black text-lime-300 font-display tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span>🌿 NÃO TEM GLÚTEN</span>
          <span className="text-purple-400">•</span>
          <span>🥛 NEM LACTOSE</span>
          <span className="text-purple-400">•</span>
          <span>🚫 NEM XAROPE</span>
          <span className="text-purple-400">•</span>
          <span className="text-yellow-300">🍌 BANANA SUBSTITUI O AÇÚCAR!</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {badges.map((b, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border backdrop-blur-sm transition-all hover:scale-[1.02] ${b.color}`}
          >
            <div className="p-1.5 rounded-xl bg-purple-900/60 shadow-inner shrink-0 flex items-center justify-center">
              {b.icon}
            </div>
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs font-black tracking-wide uppercase leading-tight font-display">
                {b.title}
              </div>
              <div className="text-[10px] opacity-75 font-medium truncate">
                {b.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
