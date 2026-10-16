import React, { useRef, useState } from 'react';
import { STORE_INFO, GOOGLE_REVIEWS } from '../data/menuData';
import { Star, MessageSquarePlus, ExternalLink, ThumbsUp, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const GoogleReviewsSection: React.FC = () => {
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
    <section id="avaliacoes" className="py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-purple-800/80 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider font-display">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> Avaliações no Google
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            O que nossos clientes dizem
          </h2>
          <p className="text-xs sm:text-sm text-purple-200">
            Sua opinião é muito importante para nós! Venha conferir as notas na Praia do Francês.
          </p>
        </div>

        {/* Action Button: Avaliar no Google */}
        <a
          href={STORE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-purple-950 font-black text-xs uppercase tracking-wider font-display shadow-lg shadow-amber-900/30 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Avaliar no Google</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Big Rating Summary Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/80 via-purple-950/90 to-purple-900/80 border border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-purple-950 border border-purple-700 shadow-inner">
            <span className="text-3xl sm:text-4xl font-black text-white font-display leading-none">
              {STORE_INFO.googleRating.toString().replace('.', ',')}
            </span>
            <div className="flex items-center gap-0.5 text-amber-400 my-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < 4
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-amber-400/50 text-amber-400/50'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-purple-300 font-semibold">
              {STORE_INFO.googleReviewCount} avaliações
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-display">
              Google Meu Negócio • Ficha Oficial
            </h3>
            <p className="text-xs text-purple-200 leading-relaxed max-w-md">
              Açaí + Mais Expresso na Praça do Skate. Já experimentou nosso açaí super cremoso sem xarope? Deixe sua avaliação e nos ajude a crescer!
            </p>
          </div>
        </div>

        <a
          href={STORE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center px-5 py-3 rounded-2xl bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider font-display border border-purple-600 transition flex items-center justify-center gap-2"
        >
          <ThumbsUp className="w-4 h-4 text-lime-400" />
          <span>Clique aqui para nos avaliar no Google</span>
        </a>
      </div>

      {/* VÍDEO NORMAL NA SEÇÃO GOOGLE (Mulher animada pisca e balança) */}
      <div className="rounded-3xl bg-gradient-to-b from-purple-900/60 to-purple-950/90 border-2 border-lime-400/80 p-4 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-lime-400 text-purple-950 flex items-center justify-center font-black">
              <Sparkles className="w-4 h-4 text-purple-950" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white font-display">
                A Alegria de Saborear o Melhor Açaí da Praia! 🍧
              </h3>
              <p className="text-xs text-purple-300">
                Quem conhece recomenda: super cremoso, sem xarope e sem lactose.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-lime-300 bg-purple-950 px-3 py-1 rounded-full border border-purple-700 self-start sm:self-auto">
            ★ Vídeo Oficial
          </span>
        </div>

        {/* Normal Video Player Container */}
        <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden bg-black border border-purple-700 shadow-xl">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1791931280/Mulher_animada_pisca_e_balan%C3%A7a_20261013193042_vc6fjg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Floating Controls Overlay */}
          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 bg-purple-950/85 backdrop-blur-md p-1.5 rounded-xl border border-purple-700/80 shadow-lg">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg bg-purple-900 hover:bg-lime-400 hover:text-purple-950 text-white transition cursor-pointer"
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-purple-900 hover:bg-lime-400 hover:text-purple-950 text-white transition cursor-pointer"
              title={isMuted ? 'Ativar som' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Top Badge */}
          <div className="absolute top-3 left-3 z-20 bg-purple-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-lime-400/60 text-[11px] font-black text-lime-300 uppercase tracking-wide">
            Açaí + Mais Expresso
          </div>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GOOGLE_REVIEWS.map((review) => (
          <div
            key={review.id}
            className="rounded-3xl bg-purple-900/40 border border-purple-800/80 p-4 flex flex-col justify-between space-y-3 shadow-lg hover:border-purple-600 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-purple-800 border border-purple-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                    {review.author[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white truncate max-w-[120px]">
                      {review.author}
                    </div>
                    <div className="text-[10px] text-purple-400">{review.time}</div>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-purple-200/90 leading-relaxed italic">
                "{review.text}"
              </p>
            </div>

            <div className="text-[10px] text-lime-400 font-semibold flex items-center gap-1 pt-2 border-t border-purple-800/60">
              <span>✓ Visita confirmada no Quiosque</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
