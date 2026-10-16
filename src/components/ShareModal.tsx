import React, { useState, useId } from 'react';
import { STORE_INFO } from '../data/menuData';
import { X, Copy, Check, Share2, MessageCircle, Send } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const modalHeadingId = useId();

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://acaimais.com';
  const shareText = `🟣 *Açaí + Mais Expresso - Praia do Francês*\nConfira o Cardápio Digital do açaí super cremoso sem xarope, sem lactose e sem glúten na Praça do Skate!\n${currentUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Açaí + Mais Expresso - Praia do Francês',
          text: 'Sabor que transforma o seu dia! Cardápio Digital do Açaí Expresso.',
          url: currentUrl,
        });
        onClose();
      } catch {
        // cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalHeadingId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-sm bg-purple-950 border border-purple-800 rounded-3xl p-5 shadow-2xl text-white space-y-4">
        <div className="flex items-center justify-between border-b border-purple-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-900 text-lime-400">
              <Share2 className="w-5 h-5" />
            </div>
            <h2 id={modalHeadingId} className="font-bold text-base font-display text-white">
              Compartilhar Cardápio
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar janela de compartilhamento"
            className="p-1.5 rounded-full hover:bg-purple-800 text-purple-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-purple-200">
          Envie o cardápio para amigos, grupos da pousada ou da praia e peçam juntos!
        </p>

        <div className="space-y-2">
          <button
            onClick={handleShareWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider font-display shadow-md transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            Compartilhar no WhatsApp
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider font-display transition"
            >
              <Send className="w-4 h-4" />
              Mais Opções de Compartilhar
            </button>
          )}

          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-purple-900/60 border border-purple-700 hover:bg-purple-800 text-purple-200 text-xs font-semibold transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-lime-400" />
                <span className="text-lime-300">Link Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Link do Cardápio</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
