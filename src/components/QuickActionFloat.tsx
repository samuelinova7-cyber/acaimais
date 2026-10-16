import React from 'react';
import { STORE_INFO } from '../data/menuData';
import { MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';

interface QuickActionFloatProps {
  onOpenCart: () => void;
  cartCount: number;
  onOpenCustomizer: () => void;
  onOpenWhatsAppChooser: () => void;
}

export const QuickActionFloat: React.FC<QuickActionFloatProps> = ({
  onOpenCart,
  cartCount,
  onOpenCustomizer,
  onOpenWhatsAppChooser,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:hidden bg-gradient-to-t from-purple-950 via-purple-950/95 to-transparent backdrop-blur-md border-t border-purple-800/80">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* WhatsApp Direct */}
        <button
          onClick={onOpenWhatsAppChooser}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 active:scale-95 text-white font-black font-display text-xs shadow-lg shadow-green-950/50 transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </button>

        {/* Monte seu Copo */}
        <button
          onClick={onOpenCustomizer}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-gradient-to-r from-lime-400 to-lime-500 active:scale-95 text-purple-950 font-black font-display text-xs shadow-lg shadow-lime-500/20 transition cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Montar Copo</span>
        </button>

        {/* Carrinho */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center justify-center p-3 rounded-2xl bg-purple-900 border border-purple-700 active:scale-95 text-white transition cursor-pointer"
          aria-label="Ver Carrinho"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-lime-400 text-purple-950 text-[10px] font-black flex items-center justify-center shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
