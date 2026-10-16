import React, { useState, useId } from 'react';
import { CupSize, CartItem } from '../types/menu';
import { CUP_SIZES, ACCOMPANIMENTS, TOPPINGS, EXTRA_ACCOMPANIMENT_PRICE, STORE_INFO } from '../data/menuData';
import { X, Check, Plus, Minus, Sparkles, MessageCircle, ShoppingBag, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomizerModalProps {
  initialCupSize?: CupSize | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onDirectWhatsApp: (item: CartItem) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  initialCupSize,
  isOpen,
  onClose,
  onAddToCart,
  onDirectWhatsApp,
}) => {
  const [selectedCup, setSelectedCup] = useState<CupSize>(
    initialCupSize || CUP_SIZES[1] // default 300ml
  );
  const [selectedAccompaniments, setSelectedAccompaniments] = useState<string[]>([]);
  const [selectedTopping, setSelectedTopping] = useState<string>('Leite Condensado');
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const modalHeadingId = useId();

  // Reset or update state when initialCupSize changes
  React.useEffect(() => {
    if (initialCupSize) {
      setSelectedCup(initialCupSize);
    }
  }, [initialCupSize]);

  if (!isOpen) return null;

  const includedLimit = selectedCup.includedToppings;
  const totalChosen = selectedAccompaniments.length;
  const extraCount = Math.max(0, totalChosen - includedLimit);
  const extraCost = extraCount * EXTRA_ACCOMPANIMENT_PRICE;
  const unitPrice = selectedCup.price + extraCost;
  const totalPrice = unitPrice * quantity;

  const toggleAccompaniment = (name: string) => {
    if (selectedAccompaniments.includes(name)) {
      setSelectedAccompaniments(selectedAccompaniments.filter((item) => item !== name));
    } else {
      setSelectedAccompaniments([...selectedAccompaniments, name]);
    }
  };

  const handleCreateItem = (): CartItem => {
    const includedItems = selectedAccompaniments.slice(0, includedLimit);
    const extraItems = selectedAccompaniments.slice(includedLimit);

    return {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      cupSize: selectedCup,
      accompaniments: includedItems,
      extraAccompaniments: extraItems,
      topping: selectedTopping,
      notes: notes.trim(),
      unitPrice,
      quantity,
    };
  };

  const handleAdd = () => {
    const item = handleCreateItem();
    onAddToCart(item);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // fallback
    }
    onClose();
  };

  const handleWhatsAppInstant = () => {
    const item = handleCreateItem();
    onDirectWhatsApp(item);
  };

  const filteredAccompaniments = ACCOMPANIMENTS.filter((acc) => {
    if (activeCategory === 'todos') return true;
    return acc.category === activeCategory;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalHeadingId}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-purple-950 border border-purple-800/80 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-purple-800/60 bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-lime-400 text-purple-950 font-black flex items-center justify-center shadow-md font-display text-lg">
              🍧
            </div>
            <div>
              <h2 id={modalHeadingId} className="text-lg sm:text-xl font-bold font-display text-white flex items-center gap-2">
                Monte seu Açaí Expresso
                <span className="text-xs px-2 py-0.5 rounded-full bg-lime-400 text-purple-950 font-black tracking-wide">
                  {selectedCup.size}
                </span>
              </h2>
              <p className="text-xs text-purple-200/80">
                Praia do Francês • Super cremoso e sem xarope
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar janela"
            className="p-2 rounded-full hover:bg-purple-800/60 text-purple-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* 1. Escolha de Tamanho */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold uppercase tracking-wider text-lime-400 font-display flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-lime-400 text-purple-950 text-xs flex items-center justify-center font-black">
                  1
                </span>
                Tamanho do Copo
              </label>
              <span className="text-xs text-purple-300">
                {selectedCup.includedToppings} acompanhamentos inclusos
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CUP_SIZES.map((cup) => {
                const isSelected = selectedCup.id === cup.id;
                return (
                  <button
                    key={cup.id}
                    onClick={() => setSelectedCup(cup)}
                    className={`relative p-3 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-lime-400 bg-purple-900/90 shadow-[0_0_15px_rgba(163,230,53,0.25)] ring-1 ring-lime-400'
                        : 'border-purple-800/70 bg-purple-900/30 hover:border-purple-600'
                    }`}
                  >
                    {cup.popular && (
                      <span className="absolute -top-2 right-2 text-[9px] bg-gradient-to-r from-amber-400 to-orange-400 text-purple-950 font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                        Mais Pedido
                      </span>
                    )}
                    <div className="text-base font-black font-display text-white">
                      {cup.size}
                    </div>
                    <div className="text-lime-300 font-bold text-sm">
                      R$ {cup.price.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-[10px] text-purple-300 mt-0.5">
                      {cup.includedToppings} acompanhamentos
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Escolha dos Acompanhamentos */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <label className="text-sm font-bold uppercase tracking-wider text-lime-400 font-display flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-lime-400 text-purple-950 text-xs flex items-center justify-center font-black">
                    2
                  </span>
                  Acompanhamentos
                </label>
                <p className="text-xs text-purple-300 mt-0.5">
                  Seu copo de {selectedCup.size} inclui {includedLimit} acompanhamentos grátis!
                </p>
              </div>

              {/* Status pill */}
              <div
                className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                  extraCount > 0
                    ? 'bg-amber-400 text-purple-950'
                    : totalChosen === includedLimit
                    ? 'bg-lime-400 text-purple-950'
                    : 'bg-purple-800 text-purple-200'
                }`}
              >
                <span>
                  {totalChosen} de {includedLimit} inclusos
                </span>
                {extraCount > 0 && (
                  <span className="text-[11px] font-black underline">
                    (+{extraCount} extra = +R$ {extraCost.toFixed(2).replace('.', ',')})
                  </span>
                )}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'todos', label: 'Todos (17)' },
                { id: 'crocante', label: 'Crocantes' },
                { id: 'doce', label: 'Doces & Chocolates' },
                { id: 'fruta', label: 'Frutas' },
                { id: 'especial', label: 'Especiais' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-xl font-medium transition-all shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-lime-400 text-purple-950 font-bold'
                      : 'bg-purple-900/60 text-purple-300 hover:bg-purple-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid of accompaniments */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredAccompaniments.map((acc) => {
                const isSelected = selectedAccompaniments.includes(acc.name);
                return (
                  <button
                    key={acc.id}
                    onClick={() => toggleAccompaniment(acc.name)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all text-xs font-medium ${
                      isSelected
                        ? 'border-lime-400 bg-lime-400/15 text-lime-200 ring-1 ring-lime-400/50'
                        : 'border-purple-800/80 bg-purple-900/30 text-purple-200 hover:bg-purple-800/50'
                    }`}
                  >
                    <div className="flex flex-col min-w-0 pr-1">
                      <span className="font-semibold truncate">{acc.name}</span>
                      {acc.badge && (
                        <span className="text-[9px] text-amber-300 font-bold">
                          ★ {acc.badge}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-lime-400 text-purple-950 font-black'
                          : 'border border-purple-600 bg-purple-950/60'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {extraCount > 0 && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Você escolheu {extraCount} acompanhamento(s) além do limite incluso. Valor extra:{' '}
                  <strong>+R$ {extraCost.toFixed(2).replace('.', ',')}</strong>
                </span>
              </div>
            )}
          </section>

          {/* 3. Escolha da Cobertura / Calda Especial */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold uppercase tracking-wider text-lime-400 font-display flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-lime-400 text-purple-950 text-xs flex items-center justify-center font-black">
                  3
                </span>
                Cobertura / Calda Especial
              </label>
              <span className="text-xs text-lime-300 font-semibold">1 inclusa</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TOPPINGS.map((top) => {
                const isSelected = selectedTopping === top.name;
                return (
                  <button
                    key={top.id}
                    onClick={() => setSelectedTopping(top.name)}
                    className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                      isSelected
                        ? 'border-lime-400 bg-purple-900/90 text-white ring-1 ring-lime-400 shadow-sm'
                        : 'border-purple-800/80 bg-purple-900/30 text-purple-300 hover:bg-purple-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: top.color }}
                        />
                        {top.name}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-lime-400 text-purple-950 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    {top.description && (
                      <p className="text-[10px] text-purple-300/70 mt-1 truncate">
                        {top.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 4. Observações */}
          <section className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-300 font-display">
              Observações do Preparo (opcional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: pouco leite condensado, leite em pó no meio e por cima..."
              className="w-full px-3 py-2.5 bg-purple-900/40 border border-purple-800 rounded-xl text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
            />
          </section>
        </div>

        {/* Footer with Quantity & Actions */}
        <div className="p-4 sm:p-5 border-t border-purple-800/80 bg-purple-950/95 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between">
            {/* Quantity Counter */}
            <div className="flex items-center gap-2 bg-purple-900/70 border border-purple-800 rounded-2xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                aria-label="Diminuir quantidade"
                className="w-8 h-8 rounded-xl bg-purple-800 flex items-center justify-center text-white disabled:opacity-40 hover:bg-purple-700 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-lime-300 font-display">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Aumentar quantidade"
                className="w-8 h-8 rounded-xl bg-purple-800 flex items-center justify-center text-white hover:bg-purple-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total Price preview */}
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
                Subtotal
              </div>
              <div className="text-xl sm:text-2xl font-black text-lime-400 font-display">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-300 hover:to-lime-400 text-purple-950 font-black font-display text-sm tracking-wide shadow-lg shadow-lime-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Adicionar ao Carrinho
            </button>

            <button
              onClick={handleWhatsAppInstant}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black font-display text-sm tracking-wide shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir Direto no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
