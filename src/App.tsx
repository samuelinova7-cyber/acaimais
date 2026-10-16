import React, { useState, useEffect } from 'react';
import { CupSize, CartItem } from './types/menu';
import { CUP_SIZES, STORE_INFO } from './data/menuData';
import { soundFx } from './utils/soundEffects';
import { Header } from './components/Header';
import { MenuSection } from './components/MenuSection';
import { MenuVideoSection } from './components/MenuVideoSection';
import { InstagramSection } from './components/InstagramSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { CustomizerModal } from './components/CustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppChooserModal } from './components/WhatsAppChooserModal';
import { ShareModal } from './components/ShareModal';
import { QuickActionFloat } from './components/QuickActionFloat';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('acai_mais_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedCupForCustomizer, setSelectedCupForCustomizer] = useState<CupSize | null>(null);
  const [selectedCupForMinigame, setSelectedCupForMinigame] = useState<CupSize | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppChooserOpen, setIsWhatsAppChooserOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('acai_mais_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleSound = () => {
    soundFx.enabled = !soundFx.enabled;
    setIsSoundMuted(!soundFx.enabled);
  };

  const handleSelectCup = (cup: CupSize) => {
    setSelectedCupForMinigame(cup);
    // Smoothly scroll to the minigame builder
    const cardapioElem = document.getElementById('cardapio');
    if (cardapioElem) {
      cardapioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenGeneralCustomizer = () => {
    setSelectedCupForCustomizer(CUP_SIZES[1]); // 300ml default
    setIsCustomizerOpen(true);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`Açaí ${item.cupSize.size} adicionado ao pedido! 🍨`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removido do pedido.');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Carrinho esvaziado.');
  };

  const handleDirectWhatsApp = (item: CartItem) => {
    let msg = `🟣 *PEDIDO DE AÇAÍ - AÇAÍ + MAIS EXPRESSO*\n`;
    msg += `📍 *Praia do Francês - AL*\n\n`;
    msg += `🍨 *Item:* Açaí ${item.cupSize.size} (${item.quantity}x)\n`;
    msg += `  • Acompanhamentos: ${item.accompaniments.join(', ') || 'Nenhum'}\n`;
    if (item.extraAccompaniments.length > 0) {
      msg += `  • Extras: ${item.extraAccompaniments.join(', ')}\n`;
    }
    msg += `  • Cobertura: ${item.topping}\n`;
    if (item.notes) {
      msg += `  • Observação: ${item.notes}\n`;
    }
    msg += `\n💰 *Total:* R$ ${(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    msg += `Olá! Gostaria de confirmar esse pedido montado no cardápio digital! 😋💜`;

    const url = `https://wa.me/${STORE_INFO.whatsappPrincipal}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const cartTotalCups = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-purple-950 text-white flex flex-col font-sans selection:bg-lime-400 selection:text-purple-950">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 inset-x-4 sm:inset-x-auto sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-lime-400 to-lime-300 text-purple-950 font-black text-xs font-display shadow-2xl border border-white/40 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-purple-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Marquee, Anime Video Background, Specular Text Shine & Glowing Buttons */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartTotalCups}
        onOpenWhatsAppChooser={() => setIsWhatsAppChooserOpen(true)}
        onShare={() => setIsShareOpen(true)}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-12 py-4">
        {/* Menu Section com as 3 etapas como Minigame com sons, botão START e carregamento */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onDirectWhatsApp={handleDirectWhatsApp}
          selectedCupForMinigame={selectedCupForMinigame}
        />

        {/* VÍDEO DO CARDÁPIO OCUPANDO TODA A SEÇÃO LOGO ABAIXO DO CARDÁPIO */}
        <MenuVideoSection
          onOpenWhatsApp={() => setIsWhatsAppChooserOpen(true)}
        />

        {/* Instagram Section */}
        <InstagramSection />

        {/* Google Reviews Section */}
        <GoogleReviewsSection />

        {/* Location & Hours Section */}
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Actions */}
      <QuickActionFloat
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartTotalCups}
        onOpenCustomizer={handleOpenGeneralCustomizer}
        onOpenWhatsAppChooser={() => setIsWhatsAppChooserOpen(true)}
      />

      {/* Modals */}
      <CustomizerModal
        initialCupSize={selectedCupForCustomizer}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={handleAddToCart}
        onDirectWhatsApp={handleDirectWhatsApp}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <WhatsAppChooserModal
        isOpen={isWhatsAppChooserOpen}
        onClose={() => setIsWhatsAppChooserOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
