import React from 'react';
import { STORE_INFO, INSTAGRAM_POSTS } from '../data/menuData';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  return (
    <section id="instagram" className="py-8 sm:py-12 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-purple-800/80 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider font-display">
            <Instagram className="w-3.5 h-3.5" /> Seção Instagram
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Siga-nos no Instagram
          </h2>
          <p className="text-xs sm:text-sm text-purple-200">
            Fique por dentro das novidades, promoções e fotos do nosso açaí super cremoso!
          </p>
        </div>

        {/* Profile Card Action */}
        <a
          href={STORE_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider font-display shadow-lg shadow-pink-900/30 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Instagram className="w-4 h-4" />
          <span>@{STORE_INFO.instagramHandle}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Profile Bio Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-900/60 to-purple-950/80 border border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 shrink-0">
            <div className="w-full h-full rounded-full bg-purple-950 border-2 border-purple-950 flex items-center justify-center text-xl overflow-hidden font-display font-black text-lime-400">
              🟣
            </div>
          </div>
          <div>
            <div className="font-bold text-white text-base font-display">
              Açaí mais Francês (@{STORE_INFO.instagramHandle})
            </div>
            <div className="text-xs text-purple-300 flex flex-wrap gap-x-3 gap-y-1 mt-0.5">
              <span><strong>123</strong> posts</span>
              <span><strong>410</strong> seguidores</span>
              <span>Praia do Francês 🌊</span>
            </div>
            <div className="text-[11px] text-lime-300 mt-1">
              "O Melhor Açaí da cidade 😋 Localizado na Praça do Skate 🛹 Av. Caravelas • 16h às 22h"
            </div>
          </div>
        </div>

        <a
          href={STORE_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-purple-800 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0"
        >
          Seguir Perfil
        </a>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INSTAGRAM_POSTS.map((post) => (
          <div
            key={post.id}
            className="rounded-3xl bg-purple-900/40 border border-purple-800/80 hover:border-purple-600 transition-all p-4 flex flex-col justify-between space-y-3 shadow-lg group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-800 text-lime-300">
                  {post.tag}
                </span>
                <span className="text-xs text-purple-400 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" /> {post.likes}
                </span>
              </div>

              <h3 className="font-bold text-sm text-white group-hover:text-lime-300 transition-colors font-display">
                {post.title}
              </h3>

              <p className="text-xs text-purple-200/80 leading-relaxed">
                {post.text}
              </p>
            </div>

            <div className="pt-2 border-t border-purple-800/60 flex items-center justify-between text-xs text-purple-400">
              <span className="text-[11px]">Praia do Francês</span>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1 text-[11px]"
              >
                Ver post <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
