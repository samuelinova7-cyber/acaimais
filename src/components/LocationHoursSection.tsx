import React, { useState } from 'react';
import { STORE_INFO } from '../data/menuData';
import {
  MapPin,
  Clock,
  Phone,
  Copy,
  Check,
  Navigation,
  MessageCircle,
  ExternalLink,
  Calendar,
} from 'lucide-react';

export const LocationHoursSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="localizacao" className="py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="border-b border-purple-800/80 pb-5 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/20 border border-lime-500/40 text-lime-300 text-xs font-bold uppercase tracking-wider font-display">
          <MapPin className="w-3.5 h-3.5" /> Informações & Contato
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Localização e Funcionamento
        </h2>
        <p className="text-xs sm:text-sm text-purple-200">
          Venha nos visitar no coração da Praia do Francês ou faça seu pedido para entrega!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: Endereço & Como Chegar */}
        <div className="rounded-3xl bg-purple-900/40 border border-purple-800/80 p-5 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-700 flex items-center justify-center text-lime-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white font-display text-base">
                  Endereço do Quiosque
                </h3>
                <span className="text-xs text-lime-300 font-semibold">Praça do Skate</span>
              </div>
            </div>

            <p className="text-xs text-purple-200 leading-relaxed">
              {STORE_INFO.address}
            </p>

            <div className="p-2.5 rounded-xl bg-purple-950/70 border border-purple-800/80 text-[11px] text-purple-300 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-lime-400 shrink-0" />
              <span>Ponto de referência: Em frente às mesas de xadrez na Praça do Skate.</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-purple-950 font-black text-xs uppercase tracking-wider font-display shadow-md transition"
            >
              <Navigation className="w-4 h-4" />
              Abrir no Google Maps / GPS
            </a>

            <button
              onClick={handleCopyAddress}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-purple-800/80 hover:bg-purple-700 text-white text-xs font-semibold transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-lime-400" />
                  <span className="text-lime-300">Endereço Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Endereço Completo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: Horário de Funcionamento */}
        <div className="rounded-3xl bg-purple-900/40 border border-purple-800/80 p-5 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-700 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white font-display text-base">
                  Horário de Funcionamento
                </h3>
                <span className="text-xs text-amber-300 font-semibold">Tarde & Noite</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-purple-950/60 border border-purple-800/60">
                <span className="text-white font-semibold">Terça a Domingo:</span>
                <span className="text-lime-400 font-bold">15h às 22h</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-purple-950/60 border border-purple-800/60">
                <span className="text-purple-300">Segunda-feira:</span>
                <span className="text-purple-400 font-medium">Fechado para descanso</span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-start gap-2">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Feriados e temporada de verão: horários especiais com abertura estendida.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="p-3 rounded-2xl bg-purple-950 border border-purple-800 text-center">
              <div className="text-[10px] uppercase font-bold text-purple-400">
                Praia do Francês • Marechal Deodoro
              </div>
              <div className="text-sm font-extrabold text-white mt-0.5">
                Açaí geladinho e cremoso até às 22:00!
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Telefones & Contatos */}
        <div className="rounded-3xl bg-purple-900/40 border border-purple-800/80 p-5 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-700 flex items-center justify-center text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white font-display text-base">
                  Telefones & WhatsApp
                </h3>
                <span className="text-xs text-emerald-300 font-semibold">Canais de Atendimento</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {/* WhatsApp Principal */}
              <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Principal (Alagoas)
                  </span>
                  <a
                    href={`tel:+${STORE_INFO.whatsappPrincipal}`}
                    className="text-purple-300 hover:text-white underline text-[11px]"
                  >
                    Ligar
                  </a>
                </div>
                <div className="text-sm font-black text-lime-400 font-display">
                  {STORE_INFO.whatsappFormatado}
                </div>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappPrincipal}?text=${encodeURIComponent(
                    'Olá! Gostaria de fazer um pedido no Açaí + Mais Expresso.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Chamar no WhatsApp
                </a>
              </div>

              {/* Contato Alternativo */}
              <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Alternativo
                  </span>
                  <a
                    href={`tel:+${STORE_INFO.whatsappSecundario}`}
                    className="text-purple-300 hover:text-white underline text-[11px]"
                  >
                    Ligar
                  </a>
                </div>
                <div className="text-sm font-black text-lime-400 font-display">
                  {STORE_INFO.whatsappSecundarioFormatado}
                </div>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappSecundario}?text=${encodeURIComponent(
                    'Olá! Gostaria de fazer um pedido no Açaí + Mais Expresso.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Chamar no WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${STORE_INFO.whatsappPrincipal}?text=${encodeURIComponent(
                'Olá! Gostaria de fazer um pedido no Açaí + Mais Expresso.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs uppercase tracking-wider font-display shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              Chamar Agora no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
