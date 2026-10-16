import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

export const MenuVideoSection: React.FC<{ onOpenWhatsApp: () => void }> = ({ onOpenWhatsApp }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="w-full py-8 sm:py-12 space-y-5">
      {/* Section Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-900 to-indigo-900 border-2 border-lime-400/60 text-lime-300 text-xs font-black uppercase tracking-wider font-display shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-spin" />
          <span>Experiência Visual Exclusiva</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight drop-shadow">
          Veja o Nosso Cardápio Digital em Ação! 🍨✨
        </h2>

        <p className="text-xs sm:text-sm text-purple-200">
          O sabor inconfundível, cremosidade artesanal e acompanhamentos caprichados direto da Praia do Francês.
        </p>
      </div>

      {/* Full-width Video Container */}
      <div className="w-full relative rounded-3xl overflow-hidden border-2 sm:border-4 border-lime-400/80 shadow-[0_0_40px_rgba(163,230,53,0.35)] bg-purple-950">
        {/* Glow ambient background aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-lime-500/20 pointer-events-none z-10" />

        {/* Video Element */}
        <div className="relative aspect-video w-full max-h-[75vh] flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1791931284/Menu_digital_com_a%C3%A7a%C3%AD_20261013193625_alw1bm.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain sm:object-cover"
          />

          {/* Floating Controls Overlay */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-purple-950/80 backdrop-blur-md p-2 rounded-2xl border border-purple-700/80 shadow-2xl">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-xl bg-purple-900 hover:bg-lime-400 hover:text-purple-950 text-white transition-all cursor-pointer"
              title={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-xl bg-purple-900 hover:bg-lime-400 hover:text-purple-950 text-white transition-all cursor-pointer"
              title={isMuted ? 'Ativar som' : 'Silenciar som'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Top Left Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-purple-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-lime-400/60 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs font-black text-white font-display uppercase tracking-wide">
              Açaí + Mais Expresso
            </span>
          </div>
        </div>

        {/* Video Footer Banner with Fast Ordering */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 border-t border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-0.5">
            <div className="text-sm sm:text-base font-black text-white font-display">
              Ficou com água na boca? Não passe vontade!
            </div>
            <div className="text-xs text-lime-300 font-medium">
              Entrega rápida na Praia do Francês ou retire na Praça do Skate.
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onOpenWhatsApp}
              className="btn-shine-effect glow-emerald flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black font-display text-xs uppercase tracking-wider shadow-lg active:scale-95 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Pedir no WhatsApp</span>
            </button>

            <a
              href={STORE_INFO.ifoodUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine-effect glow-red flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black font-display text-xs uppercase tracking-wider shadow-lg active:scale-95 transition cursor-pointer"
            >
              <span>iFood</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
