import React from 'react';
import { CupSize, CartItem } from '../types/menu';
import { MinigameBuilder } from './MinigameBuilder';
import { Gamepad2 } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: CartItem) => void;
  onDirectWhatsApp: (item: CartItem) => void;
  selectedCupForMinigame?: CupSize | null;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onDirectWhatsApp,
  selectedCupForMinigame,
}) => {
  return (
    <section id="cardapio" className="py-6 sm:py-10 space-y-8">
      {/* Section Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900 to-indigo-900 border-2 border-lime-400 text-lime-300 text-xs font-black uppercase tracking-wider font-display shadow-lg">
          <Gamepad2 className="w-4 h-4 text-lime-400 animate-pulse" />
          <span>Cardápio Interativo Gamificado</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight drop-shadow">
          🍨 Monte seu Açaí no Minigame
        </h2>

        <p className="text-xs sm:text-base text-purple-200 max-w-xl mx-auto">
          Pressione <strong className="text-lime-300">START</strong> e passe pelas 3 etapas interativas com efeitos sonoros para montar o seu açaí expresso super cremoso!
        </p>
      </div>

      {/* --- MINIGAME ARCADE BUILDER --- */}
      <div className="w-full">
        <MinigameBuilder
          onAddToCart={onAddToCart}
          onDirectWhatsApp={onDirectWhatsApp}
          initialCup={selectedCupForMinigame}
        />
      </div>
    </section>
  );
};
