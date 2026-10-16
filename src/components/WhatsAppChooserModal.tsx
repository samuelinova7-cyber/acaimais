import React, { useState, useId } from 'react';
import { STORE_INFO } from '../data/menuData';
import { X, MessageCircle, Phone, ArrowRight, Sparkles } from 'lucide-react';

interface WhatsAppChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppChooserModal: React.FC<WhatsAppChooserModalProps> = ({ isOpen, onClose }) => {
  const [selectedNumber, setSelectedNumber] = useState<'82' | '45'>('82');
  const [selectedIntent, setSelectedIntent] = useState<string>(
    'Olá! Gostaria de fazer um pedido de açaí expresso.'
  );
  const modalHeadingId = useId();

  if (!isOpen) return null;

  const handleOpenWhatsApp = () => {
    const phone =
      selectedNumber === '82' ? STORE_INFO.whatsappPrincipal : STORE_INFO.whatsappSecundario;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(selectedIntent)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const intents = [
    { label: 'Fazer Pedido Agora', text: 'Olá! Gostaria de fazer um pedido de açaí expresso na Praia do Francês.' },
    { label: 'Consultar Entrega / Delivery', text: 'Olá! Vocês fazem entrega agora na Praia do Francês?' },
    { label: 'Informações do Quiosque', text: 'Olá! Gostaria de saber o horário de funcionamento na Praça do Skate.' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalHeadingId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-purple-950 border border-purple-800 rounded-3xl p-5 sm:p-6 shadow-2xl text-white space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
            </div>
            <div>
              <h2 id={modalHeadingId} className="font-bold text-base sm:text-lg font-display text-white">
                Fazer Pedido via WhatsApp
              </h2>
              <p className="text-xs text-purple-300">
                Açaí + Mais Expresso • Praia do Francês
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar janela de contato"
            className="p-1.5 rounded-full hover:bg-purple-800 text-purple-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Escolha do Número */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-lime-400 font-display">
            1. Selecione o Número de Contato:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedNumber('82')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedNumber === '82'
                  ? 'border-emerald-400 bg-emerald-950/60 ring-1 ring-emerald-400'
                  : 'border-purple-800 bg-purple-900/30 hover:border-purple-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Principal (Alagoas)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  Recomendado
                </span>
              </div>
              <div className="text-sm font-black text-lime-300 font-display mt-1">
                {STORE_INFO.whatsappFormatado}
              </div>
            </button>

            <button
              onClick={() => setSelectedNumber('45')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedNumber === '45'
                  ? 'border-emerald-400 bg-emerald-950/60 ring-1 ring-emerald-400'
                  : 'border-purple-800 bg-purple-900/30 hover:border-purple-700'
              }`}
            >
              <span className="text-xs font-bold text-white">Alternativo</span>
              <div className="text-sm font-black text-lime-300 font-display mt-1">
                {STORE_INFO.whatsappSecundarioFormatado}
              </div>
            </button>
          </div>
        </div>

        {/* Assunto / Mensagem rápida */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-lime-400 font-display">
            2. Mensagem Inicial:
          </label>
          <div className="space-y-1.5">
            {intents.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIntent(item.text)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedIntent === item.text
                    ? 'border-lime-400 bg-purple-900/80 text-white font-semibold'
                    : 'border-purple-800/80 bg-purple-900/20 text-purple-300 hover:bg-purple-900/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleOpenWhatsApp}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black font-display text-sm tracking-wide shadow-xl shadow-green-950/40 active:scale-95 transition-all cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span>Iniciar Conversa no WhatsApp</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
