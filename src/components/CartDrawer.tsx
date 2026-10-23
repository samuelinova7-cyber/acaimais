import React, { useState, useId } from 'react';
import { CartItem } from '../types/menu';
import { STORE_INFO } from '../data/menuData';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ExternalLink,
  MapPin,
  Store,
  CreditCard,
  QrCode,
  Banknote,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'retirada' | 'entrega'>('retirada');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [needChange, setNeedChange] = useState('');
  const drawerHeadingId = useId();

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalCups = items.reduce((sum, item) => sum + item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `🟣 *NOVO PEDIDO - AÇAÍ + MAIS EXPRESSO*\n`;
    msg += `📍 *Praia do Francês - AL*\n`;
    msg += `--------------------------------------\n\n`;

    if (customerName.trim()) {
      msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    }

    msg += `🛵 *Tipo:* ${
      orderType === 'retirada'
        ? 'Retirada no Quiosque (Praça do Skate)'
        : `Entrega: ${address.trim() || 'A combinar'}`
    }\n`;

    msg += `💳 *Pagamento:* ${
      paymentMethod === 'pix'
        ? 'Pix'
        : paymentMethod === 'cartao'
        ? 'Cartão (Levar maquininha)'
        : `Dinheiro ${needChange.trim() ? `(Troco para: ${needChange.trim()})` : ''}`
    }\n\n`;

    msg += `🍨 *ITENS DO PEDIDO:*\n`;

    items.forEach((item, index) => {
      msg += `\n*${index + 1}. Açaí ${item.cupSize.size}* (${item.quantity}x)\n`;
      msg += `  • Acompanhamentos: ${item.accompaniments.join(', ') || 'Nenhum'}\n`;
      if (item.extraAccompaniments.length > 0) {
        msg += `  • Extras: ${item.extraAccompaniments.join(', ')}\n`;
      }
      msg += `  • Cobertura: ${item.topping}\n`;
      if (item.notes) {
        msg += `  • Obs: ${item.notes}\n`;
      }
      msg += `  • Subtotal: R$ ${(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    msg += `\n--------------------------------------\n`;
    msg += `💰 *TOTAL DO PEDIDO: R$ ${totalAmount.toFixed(2).replace('.', ',')}*\n`;
    msg += `\nObrigado! Aguardo a confirmação do pedido! 😋💜`;

    return encodeURIComponent(msg);
  };

  const handleSendOrder = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }

    const phone = STORE_INFO.whatsappPrincipal;
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={drawerHeadingId}
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg h-full bg-purple-950 border-l border-purple-800 shadow-2xl flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-purple-800 bg-purple-900/60 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-lime-400 text-purple-950 font-black">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 id={drawerHeadingId} className="text-base sm:text-lg font-bold font-display text-white">
                Seu Pedido
              </h2>
              <p className="text-xs text-purple-300">
                {totalCups} {totalCups === 1 ? 'copo selecionado' : 'copos selecionados'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="p-2 rounded-full hover:bg-purple-800 text-purple-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-purple-900/50 border border-purple-800 flex items-center justify-center text-4xl shadow-inner">
              🍨
            </div>
            <div className="max-w-xs">
              <h3 className="font-bold text-lg font-display text-white">
                Seu carrinho está vazio
              </h3>
              <p className="text-xs text-purple-300 mt-1">
                Escolha o tamanho do seu açaí, selecione os acompanhamentos cremosos e monte o seu copo!
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-lime-400 text-purple-950 font-bold text-xs uppercase tracking-wider font-display hover:bg-lime-300 transition"
            >
              Ver Cardápio
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-purple-300 font-bold uppercase tracking-wider">
                <span>Itens ({items.length})</span>
                <button
                  onClick={onClearCart}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 font-normal text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Limpar tudo
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-800/80 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-black text-sm text-white font-display flex items-center gap-2">
                        Açaí {item.cupSize.size}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-800 text-lime-300 font-semibold">
                          R$ {item.unitPrice.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <div className="text-[11px] text-purple-200 mt-1">
                        <span className="font-semibold text-purple-300">Acompanhamentos: </span>
                        {item.accompaniments.length > 0
                          ? item.accompaniments.join(', ')
                          : 'Nenhum'}
                      </div>
                      {item.extraAccompaniments.length > 0 && (
                        <div className="text-[11px] text-amber-300">
                          <span className="font-semibold">Extras (+R$): </span>
                          {item.extraAccompaniments.join(', ')}
                        </div>
                      )}
                      <div className="text-[11px] text-purple-300">
                        <span className="font-semibold">Cobertura: </span>
                        {item.topping}
                      </div>
                      {item.notes && (
                        <div className="text-[11px] text-purple-300/80 italic">
                          "Obs: {item.notes}"
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remover item"
                      className="p-1.5 rounded-lg text-purple-400 hover:text-red-400 hover:bg-purple-800/50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-purple-800/60">
                    <div className="flex items-center gap-2 bg-purple-950/80 rounded-xl p-1 border border-purple-800">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label="Diminuir quantidade do item"
                        className="w-6 h-6 rounded-lg bg-purple-800 flex items-center justify-center text-white hover:bg-purple-700"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-lime-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label="Aumentar quantidade do item"
                        className="w-6 h-6 rounded-lg bg-purple-800 flex items-center justify-center text-white hover:bg-purple-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-purple-300">Total: </span>
                      <span className="font-black text-sm text-lime-400 font-display">
                        R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer & Delivery Form */}
            <div className="space-y-4 pt-2 border-t border-purple-800/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-lime-400 font-display">
                Detalhes da Entrega & Pedido
              </h3>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs text-purple-300">Seu Nome / Como te chamamos:</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Maria Clara"
                  className="w-full px-3 py-2 bg-purple-900/40 border border-purple-800 rounded-xl text-xs text-white placeholder-purple-400/50 focus:border-lime-400 focus:outline-none"
                />
              </div>

              {/* Order Type */}
              <div className="space-y-1">
                <label className="text-xs text-purple-300">Onde você vai receber?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderType('retirada')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      orderType === 'retirada'
                        ? 'border-lime-400 bg-lime-400/20 text-lime-300'
                        : 'border-purple-800 bg-purple-900/30 text-purple-300'
                    }`}
                  >
                    <Store className="w-4 h-4 shrink-0" />
                    <span>Retirada (Praça)</span>
                  </button>
                  <button
                    onClick={() => setOrderType('entrega')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      orderType === 'entrega'
                        ? 'border-lime-400 bg-lime-400/20 text-lime-300'
                        : 'border-purple-800 bg-purple-900/30 text-purple-300'
                    }`}
                  >
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Delivery Francês</span>
                  </button>
                </div>
              </div>

              {orderType === 'entrega' && (
                <div className="space-y-1">
                  <label className="text-xs text-purple-300">
                    Endereço completo (Rua, Pousada, Apto, Ponto de ref.):
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ex: Pousada Hibiscus, Quarto 12 ou Rua Caravelas nº 40"
                    className="w-full px-3 py-2 bg-purple-900/40 border border-purple-800 rounded-xl text-xs text-white placeholder-purple-400/50 focus:border-lime-400 focus:outline-none"
                  />
                </div>
              )}

              {/* Payment Method */}
              <div className="space-y-1">
                <label className="text-xs text-purple-300">Forma de Pagamento:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'pix', label: 'Pix', icon: <QrCode className="w-3.5 h-3.5" /> },
                    { id: 'cartao', label: 'Cartão', icon: <CreditCard className="w-3.5 h-3.5" /> },
                    { id: 'dinheiro', label: 'Dinheiro', icon: <Banknote className="w-3.5 h-3.5" /> },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-semibold transition-all ${
                        paymentMethod === p.id
                          ? 'border-lime-400 bg-lime-400/20 text-lime-300'
                          : 'border-purple-800 bg-purple-900/30 text-purple-300'
                      }`}
                    >
                      {p.icon}
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === 'dinheiro' && (
                <div className="space-y-1">
                  <label className="text-xs text-purple-300">Precisa de troco para quanto?</label>
                  <input
                    type="text"
                    value={needChange}
                    onChange={(e) => setNeedChange(e.target.value)}
                    placeholder="Ex: Troco para R$ 50,00 ou Não preciso"
                    className="w-full px-3 py-2 bg-purple-900/40 border border-purple-800 rounded-xl text-xs text-white placeholder-purple-400/50 focus:border-lime-400 focus:outline-none"
                  />
                </div>
              )}

              {/* WhatsApp Oficial de Atendimento */}
              <div className="p-3 rounded-2xl bg-purple-900/60 border border-purple-800 flex items-center justify-between text-xs">
                <span className="text-purple-300 flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  WhatsApp Oficial:
                </span>
                <span className="font-display font-black text-lime-400">
                  {STORE_INFO.whatsappFormatado}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-purple-800 bg-purple-950 sticky bottom-0 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-300">Total do Pedido:</span>
                <div className="text-2xl font-black text-lime-400 font-display">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </div>
              </div>
              <div className="text-right text-[11px] text-purple-300">
                <span>{orderType === 'retirada' ? 'Retirada grátis' : 'Taxa entrega a combinar'}</span>
              </div>
            </div>

            <button
              onClick={handleSendOrder}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black font-display text-sm tracking-wide shadow-xl shadow-green-900/40 active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              Finalizar e Enviar no WhatsApp
            </button>

            <div className="flex items-center justify-center gap-2 pt-1 text-xs text-purple-300">
              <span>Prefere pedir no iFood?</span>
              <a
                href={STORE_INFO.ifoodUrl}
                target="_blank"
                rel="noreferrer"
                className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 underline"
              >
                Abrir iFood <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
