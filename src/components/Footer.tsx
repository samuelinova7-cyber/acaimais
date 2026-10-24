import React from 'react';
import { STORE_INFO } from '../data/menuData';
import { MascotLogo } from './MascotLogo';
import { Heart, Instagram, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-950 border-t border-purple-800 text-purple-200 py-10 pb-24 sm:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 sm:border-3 border-lime-400 overflow-hidden shadow-[0_0_20px_rgba(163,230,53,0.6)] bg-purple-950 shrink-0">
              <img
                src={STORE_INFO.logoUrl}
                alt="Açaí + Mais Expresso"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-display">
                {STORE_INFO.name}
              </div>
              <div className="text-xs text-lime-400 font-semibold">
                Praia do Francês • Marechal Deodoro - AL
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="#cardapio"
              className="text-purple-300 hover:text-white transition"
            >
              Cardápio
            </a>
            <span>•</span>
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white transition flex items-center gap-1"
            >
              <Instagram className="w-3 h-3 text-pink-400" /> @{STORE_INFO.instagramHandle}
            </a>
            <span>•</span>
            <a
              href={STORE_INFO.ifoodUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white transition flex items-center gap-1"
            >
              iFood
            </a>
            <span>•</span>
            <a
              href="#avaliacoes"
              className="text-purple-300 hover:text-white transition"
            >
              Avaliar 4,2 ⭐
            </a>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-900/30 border border-purple-800/60 text-xs text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-purple-300">
            <MapPin className="w-4 h-4 text-lime-400 shrink-0" />
            <span>Praça do Skate – Av. Caravelas, R. Caravelas - Praia do Francês</span>
          </div>

          <div className="text-lime-300 font-bold">
            Quarta a Segunda: 15h às 22h (Terça: Fechado)
          </div>
        </div>

        <div className="pt-4 border-t border-purple-800/40 text-center text-xs text-purple-400 space-y-1">
          <p className="flex items-center justify-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> para os amantes de açaí cremoso na Praia do Francês!
          </p>
          <p className="text-xs font-semibold text-lime-300">
            Não tem glúten • Nem lactose • Nem xarope • Banana substitui o açúcar! 🍌
          </p>
          <p className="text-[11px] opacity-75">
            100% Puro, Artesanal & Super Cremoso na Praia do Francês
          </p>
        </div>
      </div>
    </footer>
  );
};
