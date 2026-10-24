import React, { useState, useEffect } from 'react';
import { MascotLogo } from './MascotLogo';
import { QualityBadges } from './QualityBadges';
import { STORE_INFO } from '../data/menuData';
import { soundFx } from '../utils/soundEffects';
import {
  MessageCircle,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  ShoppingBag,
  Share2,
  Volume2,
  VolumeX,
  Flame,
} from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
  cartCount: number;
  onOpenWhatsAppChooser: () => void;
  onShare: () => void;
  isSoundMuted?: boolean;
  onToggleSound?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  cartCount,
  onOpenWhatsAppChooser,
  onShare,
  isSoundMuted = false,
  onToggleSound,
}) => {
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Maceio',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
        hour12: false,
      });
      const parts = formatter.formatToParts(now);
      const hourPart = parts.find((p) => p.type === 'hour')?.value;
      const weekdayPart = parts.find((p) => p.type === 'weekday')?.value?.toLowerCase() || '';

      const hour = hourPart ? parseInt(hourPart, 10) : now.getHours();
      const isTuesday = weekdayPart.includes('ter');

      if (!isTuesday && hour >= 15 && hour < 22) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    } catch {
      setIsOpenNow(true);
    }
  }, []);

  const marqueeItems = [
    '🟣 AÇAÍ + MAIS EXPRESSO',
    '🌊 PRAIA DO FRANCÊS - AL',
    '🍌 BANANA SUBSTITUI O AÇÚCAR (100% NATURAL)',
    '🌿 NÃO TEM GLÚTEN NEM LACTOSE NEM XAROPE',
    '⚡ SUPER CREMOSO & ARTESANAL',
    '⏰ QUARTA A SEGUNDA DAS 15H ÀS 22H (TERÇA-FEIRA: FECHADO)',
    '🛹 QUIOSQUE NA PRAÇA DO SKATE (AV. CARAVELAS)',
    '🟢 PEDIDOS WHATSAPP: (82) 99648-5515',
    '🔴 PEÇA TAMBÉM PELO IFOOD',
    '⭐ AVALIAÇÃO 4,2 NO GOOGLE',
  ];

  return (
    <header className="relative overflow-hidden bg-purple-950 text-white border-b-2 border-purple-800/80 shadow-2xl">
      {/* 1. FAIXA QUE ANDA NO CABEÇALHO (Infinite Marquee) */}
      <div className="relative z-30 bg-gradient-to-r from-lime-400 via-amber-300 to-lime-400 text-purple-950 py-2 overflow-hidden shadow-md font-black text-xs font-display tracking-wider border-b border-lime-500/60">
        <div className="animate-marquee flex items-center space-x-8 whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((item, index) => (
            <span key={index} className="flex items-center gap-3 shrink-0">
              <span>{item}</span>
              <span className="text-purple-800 text-[10px]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. HERO BACKGROUND VIDEO (Mulher animada pisca e balança) - Sem camada roxa */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
          src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1791931280/Mulher_animada_pisca_e_balan%C3%A7a_20261013193042_vc6fjg.mp4"
        />
      </div>

      {/* Main Header Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-4 pb-8 space-y-6">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between gap-2 text-xs">
          {/* Status pill */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-wide uppercase shadow-lg backdrop-blur-md transition-all ${
                isOpenNow
                  ? 'bg-emerald-500/25 text-emerald-300 border-2 border-emerald-400/60 glow-emerald'
                  : 'bg-amber-500/25 text-amber-300 border-2 border-amber-400/60'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOpenNow ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                }`}
              />
              <Clock className="w-3.5 h-3.5" />
              {isOpenNow ? 'Aberto Agora • Até 22h' : 'Quarta a Seg: 15h às 22h (Terça Fechado)'}
            </span>

            <span className="hidden sm:inline-flex text-purple-200 items-center gap-1.5 bg-purple-900/60 px-3 py-1 rounded-full border border-purple-700/60">
              <MapPin className="w-3.5 h-3.5 text-lime-400" /> Praça do Skate • Francês
            </span>
          </div>

          {/* Right Action Icons: Sound toggle, Share & Cart */}
          <div className="flex items-center gap-2.5">
            {onToggleSound && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggleSound();
                }}
                title={isSoundMuted ? 'Ativar Sons do Jogo' : 'Desativar Sons'}
                className="p-2.5 rounded-2xl bg-purple-900/80 border-2 border-purple-700 hover:border-lime-400 text-lime-300 hover:text-white transition-all shadow-md active:scale-95"
              >
                {isSoundMuted ? (
                  <VolumeX className="w-4 h-4 text-purple-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-lime-400 animate-pulse-subtle" />
                )}
              </button>
            )}

            <button
              onClick={() => {
                soundFx.playClick();
                onShare();
              }}
              title="Compartilhar Cardápio"
              className="p-2.5 rounded-2xl bg-purple-900/80 border-2 border-purple-700 hover:border-lime-400 text-purple-200 hover:text-white transition-all shadow-md active:scale-95"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onOpenCart();
              }}
              className="btn-shine-effect glow-lime relative flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-lime-400 via-lime-300 to-lime-500 text-purple-950 font-black font-display text-xs border-2 border-lime-300 hover:from-lime-300 hover:to-lime-400 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Meu Pedido</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-purple-950 text-lime-300 text-[11px] flex items-center justify-center font-black shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Hero Brand Identity Center with Specular Text Shine Effect */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left pt-2 p-4 sm:p-6 rounded-3xl bg-purple-950/70 backdrop-blur-md border border-purple-700/60 shadow-2xl">
          <MascotLogo size="lg" className="mx-auto sm:mx-0 shadow-2xl" />

          <div className="space-y-2.5 flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/90 text-lime-300 text-xs font-black tracking-wide uppercase border-2 border-lime-400/50 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" /> Praia do Francês • Alagoas
            </div>

            {/* O NOME AÇAÍ MAIS EXPRESSO COM EFEITO BRILHANTE DE REFLEXO */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display leading-tight drop-shadow-2xl">
              <span className="text-reflect-shine">Açaí</span>{' '}
              <span className="text-lime-shine inline-block transform hover:scale-105 transition-transform">
                + Mais
              </span>{' '}
              <span className="text-reflect-shine">Expresso</span>
            </h1>

            <p className="text-sm sm:text-base text-purple-100 font-medium italic max-w-xl drop-shadow">
              "{STORE_INFO.slogan}"
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lime-400/25 text-lime-300 border border-lime-400/50 text-xs font-black tracking-wide font-display shadow-md">
                <span>🍌</span> Banana substitui o açúcar
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-900/80 text-purple-200 border border-purple-700/80 text-xs font-bold shadow-md">
                Sem Glúten • Sem Lactose • Sem Xarope
              </span>
            </div>
          </div>
        </div>

        {/* 3. BOTÕES MAIS BRILHANTES E BONITOS (Ação Rápida Topo) */}
        <div className="pt-2">
          <div className="text-[11px] font-black uppercase tracking-wider text-lime-400 mb-2.5 font-display flex items-center gap-2">
            <Flame className="w-4 h-4 text-lime-400 fill-lime-400" />
            <span>Peça Agora com 1 Clique</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* 🟢 WhatsApp Button Brilhante */}
            <button
              onClick={() => {
                soundFx.playCoin();
                onOpenWhatsAppChooser();
              }}
              className="btn-shine-effect glow-emerald flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-white font-black font-display border-2 border-emerald-300 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/25 border border-white/30 flex items-center justify-center backdrop-blur-md shadow-inner group-hover:rotate-12 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-white text-emerald-700" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-wider text-green-100 font-black">
                    Atendimento Rápido
                  </div>
                  <div className="text-sm sm:text-base leading-tight mt-0.5 drop-shadow">
                    Fazer Pedido via WhatsApp
                  </div>
                </div>
              </div>
              <span className="text-xs font-black bg-white/25 px-2.5 py-1 rounded-xl border border-white/30 shadow-sm">
                (82) 99648-5515
              </span>
            </button>

            {/* 🔴 iFood Button Brilhante */}
            <a
              href={STORE_INFO.ifoodUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="btn-shine-effect glow-red flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black font-display border-2 border-red-400 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/25 border border-white/30 flex items-center justify-center backdrop-blur-md shadow-inner group-hover:rotate-12 transition-transform">
                  <span className="text-2xl drop-shadow">🛵</span>
                </div>
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-wider text-red-100 font-black">
                    Cardápio iFood Style
                  </div>
                  <div className="text-sm sm:text-base leading-tight mt-0.5 drop-shadow">
                    Pedir pelo iFood
                  </div>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-white/90" />
            </a>

            {/* 📍 Quiosque Físico / Rota Brilhante */}
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="btn-shine-effect glow-purple flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 hover:from-purple-700 hover:to-indigo-700 border-2 border-purple-500 text-white font-black font-display shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-purple-950/90 flex items-center justify-center border-2 border-lime-400 shadow-inner group-hover:rotate-12 transition-transform">
                  <MapPin className="w-5 h-5 text-lime-400" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-purple-300 font-black">
                    Praia do Francês
                  </div>
                  <div className="text-xs sm:text-sm leading-tight text-white font-bold truncate">
                    Praça do Skate
                  </div>
                </div>
              </div>
              <span className="text-xs text-lime-300 bg-purple-950/90 border border-lime-400/50 px-2.5 py-1 rounded-xl font-black">
                GPS Rota
              </span>
            </a>
          </div>
        </div>

        {/* Quality Badges */}
        <QualityBadges />
      </div>
    </header>
  );
};
