import React, { useState, useEffect } from 'react';
import { CupSize, CartItem } from '../types/menu';
import { CUP_SIZES, ACCOMPANIMENTS, TOPPINGS, EXTRA_ACCOMPANIMENT_PRICE, STORE_INFO } from '../data/menuData';
import { soundFx } from '../utils/soundEffects';
import { CupIllustration } from './CupIllustration';
import {
  Gamepad2,
  Sparkles,
  Trophy,
  Flame,
  Check,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShoppingBag,
  MessageCircle,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MinigameBuilderProps {
  onAddToCart: (item: CartItem) => void;
  onDirectWhatsApp: (item: CartItem) => void;
  initialCup?: CupSize | null;
}

type GameState = 'idle' | 'loading' | 'stage1' | 'stage2' | 'stage3' | 'victory';

export const MinigameBuilder: React.FC<MinigameBuilderProps> = ({
  onAddToCart,
  onDirectWhatsApp,
  initialCup,
}) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Resfriando polpa pura...');
  
  // Game selections
  const [selectedCup, setSelectedCup] = useState<CupSize>(initialCup || CUP_SIZES[1]);
  const [selectedAccompaniments, setSelectedAccompaniments] = useState<string[]>([]);
  const [selectedTopping, setSelectedTopping] = useState<string>('Leite Condensado');
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  // XP & Combo System
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (initialCup) {
      setSelectedCup(initialCup);
      startGameDirectly(initialCup);
    }
  }, [initialCup]);

  const toggleSound = () => {
    soundFx.enabled = !soundFx.enabled;
    setIsMuted(!soundFx.enabled);
  };

  const startGameDirectly = (cupToUse?: CupSize) => {
    soundFx.playStartGame();
    setGameState('loading');
    setLoadingProgress(0);

    const steps = [
      { p: 25, text: '❄️ Resfriando açaí super cremoso a -4°C...' },
      { p: 55, text: '🌿 Removendo 100% de xarope, glúten e lactose...' },
      { p: 85, text: '✨ Carregando acompanhamentos da Praia do Francês...' },
      { p: 100, text: '🎮 100% PRONTO! VAMOS MONTAR O AÇAÍ!' },
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setLoadingProgress(steps[stepIdx].p);
        setLoadingText(steps[stepIdx].text);
        stepIdx++;
      } else {
        clearInterval(interval);
        soundFx.playLevelUp();
        if (cupToUse) {
          setSelectedCup(cupToUse);
        }
        setGameState('stage1');
        setScore(300);
      }
    }, 450);
  };

  const handleStartButton = () => {
    startGameDirectly();
  };

  // Stage 1 -> Stage 2
  const goToStage2 = () => {
    soundFx.playLevelUp();
    setScore((prev) => prev + selectedCup.volume);
    setGameState('stage2');
  };

  // Stage 2 -> Stage 3
  const goToStage3 = () => {
    soundFx.playLevelUp();
    setScore((prev) => prev + selectedAccompaniments.length * 150);
    setGameState('stage3');
  };

  // Stage 3 -> Victory
  const finishGame = () => {
    soundFx.playVictory();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {}
    setScore((prev) => prev + 500);
    setGameState('victory');
  };

  const resetGame = () => {
    soundFx.playClick();
    setSelectedAccompaniments([]);
    setSelectedTopping('Leite Condensado');
    setNotes('');
    setScore(0);
    setCombo(0);
    setGameState('idle');
  };

  const toggleAccompaniment = (name: string) => {
    if (selectedAccompaniments.includes(name)) {
      soundFx.playClick();
      setSelectedAccompaniments(selectedAccompaniments.filter((i) => i !== name));
      setCombo((prev) => Math.max(0, prev - 1));
    } else {
      soundFx.playCoin();
      setSelectedAccompaniments([...selectedAccompaniments, name]);
      setCombo((prev) => prev + 1);
      setScore((prev) => prev + 100);
    }
  };

  const selectToppingItem = (name: string) => {
    soundFx.playCoin();
    setSelectedTopping(name);
    setScore((prev) => prev + 80);
  };

  // Calculations
  const includedLimit = selectedCup.includedToppings;
  const totalChosen = selectedAccompaniments.length;
  const extraCount = Math.max(0, totalChosen - includedLimit);
  const extraCost = extraCount * EXTRA_ACCOMPANIMENT_PRICE;
  const unitPrice = selectedCup.price + extraCost;
  const totalPrice = unitPrice * quantity;

  const buildCartItem = (): CartItem => {
    const included = selectedAccompaniments.slice(0, includedLimit);
    const extras = selectedAccompaniments.slice(includedLimit);

    return {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      cupSize: selectedCup,
      accompaniments: included,
      extraAccompaniments: extras,
      topping: selectedTopping,
      notes: notes.trim(),
      unitPrice,
      quantity,
    };
  };

  const handleAddToCartClick = () => {
    const item = buildCartItem();
    soundFx.playCoin();
    onAddToCart(item);
  };

  const handleWhatsAppClick = () => {
    const item = buildCartItem();
    onDirectWhatsApp(item);
  };

  const filteredAccompaniments = ACCOMPANIMENTS.filter((acc) => {
    if (activeCategory === 'todos') return true;
    return acc.category === activeCategory;
  });

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900/90 to-purple-950 border-2 sm:border-4 border-lime-400 shadow-[0_0_35px_rgba(163,230,53,0.3)] text-white">
      {/* Arcade Scanlines / Header HUD */}
      <div className="p-4 sm:p-5 bg-purple-950 border-b-2 border-purple-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-lime-400 to-amber-300 text-purple-950 flex items-center justify-center font-black shadow-lg">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black font-display text-white">
                MINIGAME: MONTE SEU AÇAÍ
              </span>
              <span className="text-[10px] bg-lime-400 text-purple-950 px-2 py-0.5 rounded-full font-black uppercase">
                Arcade
              </span>
            </div>
            <div className="text-[11px] text-purple-300 flex items-center gap-3 mt-0.5">
              <span>⭐ XP: <strong className="text-lime-400">{score} pts</strong></span>
              {combo > 1 && (
                <span className="text-amber-300 font-bold animate-pulse">
                  ⚡ COMBO x{combo}!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Audio Toggle & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-purple-900 border border-purple-700 hover:border-lime-400 text-purple-200 transition cursor-pointer"
            title={isMuted ? 'Ativar Sons' : 'Desativar Sons'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-purple-400" /> : <Volume2 className="w-4 h-4 text-lime-400" />}
          </button>

          {gameState !== 'idle' && (
            <button
              onClick={resetGame}
              className="p-2 rounded-xl bg-purple-900 border border-purple-700 hover:border-lime-400 text-purple-200 transition cursor-pointer"
              title="Reiniciar Minigame"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* --- 1. TELA INICIAL (START SCREEN) --- */}
      {gameState === 'idle' && (
        <div className="p-8 sm:p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[380px]">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-lime-400 via-fuchsia-500 to-amber-400 blur-xl opacity-80 animate-pulse" />
            <div className="relative w-24 h-24 rounded-3xl bg-purple-950 border-2 border-lime-400 flex items-center justify-center text-5xl shadow-2xl">
              🍨
            </div>
          </div>

          <div className="space-y-2 max-w-lg">
            <h3 className="text-2xl sm:text-4xl font-black font-display text-white">
              Pronto para a Missão do Açaí?
            </h3>
            <p className="text-xs sm:text-sm text-purple-200">
              Passe pelas 3 fases: escolha seu copo, desbloqueie acompanhamentos deliciosos e finalize com sua calda mágica!
            </p>
          </div>

          {/* O GRANDE BOTÃO START GAME */}
          <button
            onClick={handleStartButton}
            className="btn-shine-effect glow-lime px-8 sm:px-12 py-4 sm:py-5 rounded-3xl bg-gradient-to-r from-lime-400 via-lime-300 to-lime-500 hover:from-lime-300 hover:to-lime-400 text-purple-950 font-black font-display text-base sm:text-lg uppercase tracking-wider shadow-2xl active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <Zap className="w-6 h-6 fill-purple-950 text-purple-950" />
            <span>START GAME • MONTAR AÇAÍ</span>
          </button>

          <div className="text-[11px] text-purple-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <span>● 3 FASES INTERATIVAS</span>
            <span>● SONS DE ARCADE</span>
            <span>● PEDIDO NO WHATSAPP</span>
          </div>
        </div>
      )}

      {/* --- 2. TELA DE CARREGAMENTO (LOADING SCREEN) --- */}
      {gameState === 'loading' && (
        <div className="p-8 sm:p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[380px]">
          <div className="w-16 h-16 border-4 border-purple-700 border-t-lime-400 rounded-full animate-spin shadow-lg" />

          <div className="space-y-3 w-full max-w-md">
            <div className="flex items-center justify-between text-xs font-black uppercase text-lime-400 font-display">
              <span>CARREGANDO AÇAÍ EXPRESO...</span>
              <span>{loadingProgress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 rounded-full bg-purple-950 border-2 border-purple-700 p-0.5 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(163,230,53,0.8)]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <p className="text-xs text-purple-200 italic font-medium">
              {loadingText}
            </p>
          </div>
        </div>
      )}

      {/* --- 3. ETAPA 1: ESCOLHA O COPÃO (LEVEL 1) --- */}
      {gameState === 'stage1' && (
        <div className="p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800 pb-3">
            <div>
              <div className="text-xs font-black text-lime-400 uppercase tracking-wider font-display flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-lime-400 text-purple-950 flex items-center justify-center text-xs font-black">
                  1
                </span>
                FASE 1: ESCOLHA O NÍVEL DO SEU COPÃO
              </div>
              <h3 className="text-lg sm:text-2xl font-black font-display text-white mt-1">
                Qual o tamanho da sua sede hoje?
              </h3>
            </div>
            <div className="text-xs text-purple-300">
              Copos incluem acompanhamentos grátis!
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CUP_SIZES.map((cup) => {
              const isSelected = selectedCup.id === cup.id;
              return (
                <button
                  key={cup.id}
                  onClick={() => {
                    soundFx.playCoin();
                    setSelectedCup(cup);
                  }}
                  className={`p-4 rounded-3xl border-2 text-center transition-all flex flex-col items-center justify-between relative cursor-pointer ${
                    isSelected
                      ? 'border-lime-400 bg-purple-900/90 shadow-[0_0_25px_rgba(163,230,53,0.3)] ring-2 ring-lime-400'
                      : 'border-purple-800 bg-purple-900/30 hover:border-purple-600'
                  }`}
                >
                  {cup.popular && (
                    <span className="absolute -top-2.5 right-3 text-[10px] bg-gradient-to-r from-amber-400 to-orange-400 text-purple-950 font-black px-2 py-0.5 rounded-full uppercase">
                      ★ Mais Pedido
                    </span>
                  )}

                  <div className="my-2">
                    <CupIllustration volume={cup.volume} highlight={isSelected} />
                  </div>

                  <div className="w-full mt-2 space-y-1">
                    <div className="text-lg font-black font-display text-white">
                      {cup.size}
                    </div>
                    <div className="text-xl font-black text-lime-400 font-display">
                      R$ {cup.price.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-xs text-purple-200">
                      Inclui {cup.includedToppings} acompanhamentos
                    </div>
                  </div>

                  <div
                    className={`mt-3 w-full py-2 rounded-xl text-xs font-black uppercase font-display transition-all ${
                      isSelected
                        ? 'bg-lime-400 text-purple-950 shadow'
                        : 'bg-purple-800 text-white'
                    }`}
                  >
                    {isSelected ? '✓ Selecionado' : 'Escolher'}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={goToStage2}
              className="btn-shine-effect glow-lime px-6 py-3.5 rounded-2xl bg-gradient-to-r from-lime-400 to-lime-500 text-purple-950 font-black font-display text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl active:scale-95 transition cursor-pointer"
            >
              <span>AVANÇAR PARA FASE 2: ACOMPANHAMENTOS</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* --- 4. ETAPA 2: ACOMPANHAMENTOS (LEVEL 2) --- */}
      {gameState === 'stage2' && (
        <div className="p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800 pb-3">
            <div>
              <div className="text-xs font-black text-lime-400 uppercase tracking-wider font-display flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-lime-400 text-purple-950 flex items-center justify-center text-xs font-black">
                  2
                </span>
                FASE 2: COMBO DE ACOMPANHAMENTOS
              </div>
              <h3 className="text-lg sm:text-2xl font-black font-display text-white mt-1">
                Copo {selectedCup.size} • Escolha os seus favoritos
              </h3>
            </div>

            {/* Status counter pill */}
            <div className="text-xs px-3.5 py-1.5 rounded-full bg-purple-950 border border-lime-400 text-lime-300 font-black">
              {totalChosen} de {includedLimit} inclusos
              {extraCount > 0 && (
                <span className="text-amber-300 ml-1.5">
                  (+{extraCount} extras: +R$ {extraCost.toFixed(2).replace('.', ',')})
                </span>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'todos', label: 'Todos (17)' },
              { id: 'crocante', label: 'Crocantes' },
              { id: 'doce', label: 'Doces & Chocolates' },
              { id: 'fruta', label: 'Frutas' },
              { id: 'especial', label: 'Especiais' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-lime-400 text-purple-950'
                    : 'bg-purple-900/60 text-purple-300 hover:bg-purple-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accompaniments Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {filteredAccompaniments.map((acc) => {
              const isSelected = selectedAccompaniments.includes(acc.name);
              return (
                <button
                  key={acc.id}
                  onClick={() => toggleAccompaniment(acc.name)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between text-xs cursor-pointer ${
                    isSelected
                      ? 'border-lime-400 bg-lime-400/20 text-lime-200 ring-2 ring-lime-400/50 shadow-md'
                      : 'border-purple-800/80 bg-purple-900/40 text-purple-200 hover:border-purple-600'
                  }`}
                >
                  <div className="min-w-0 pr-1">
                    <div className="font-bold truncate">{acc.name}</div>
                    {acc.badge && (
                      <div className="text-[10px] text-amber-300 font-bold">★ {acc.badge}</div>
                    )}
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-lime-400 text-purple-950 font-black'
                        : 'border border-purple-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-3">
            <button
              onClick={() => setGameState('stage1')}
              className="px-4 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-purple-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar Fase 1
            </button>

            <button
              onClick={goToStage3}
              className="btn-shine-effect glow-lime px-6 py-3.5 rounded-2xl bg-gradient-to-r from-lime-400 to-lime-500 text-purple-950 font-black font-display text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl active:scale-95 transition cursor-pointer"
            >
              <span>AVANÇAR PARA FASE 3: CALDA MÁGICA</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* --- 5. ETAPA 3: CALDA MÁGICA & FINALIZAÇÃO (LEVEL 3) --- */}
      {gameState === 'stage3' && (
        <div className="p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800 pb-3">
            <div>
              <div className="text-xs font-black text-lime-400 uppercase tracking-wider font-display flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-lime-400 text-purple-950 flex items-center justify-center text-xs font-black">
                  3
                </span>
                FASE 3: CALDA MÁGICA / COBERTURA
              </div>
              <h3 className="text-lg sm:text-2xl font-black font-display text-white mt-1">
                O toque supremo do seu açaí expresso
              </h3>
            </div>
            <div className="text-xs text-lime-400 font-bold">
              1 Cobertura inclusa!
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {TOPPINGS.map((top) => {
              const isSelected = selectedTopping === top.name;
              return (
                <button
                  key={top.id}
                  onClick={() => selectToppingItem(top.name)}
                  className={`p-3.5 rounded-2xl border text-left transition-all text-xs cursor-pointer ${
                    isSelected
                      ? 'border-lime-400 bg-purple-900/90 text-white ring-2 ring-lime-400 shadow-lg'
                      : 'border-purple-800 bg-purple-900/30 text-purple-300 hover:border-purple-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: top.color }}
                      />
                      {top.name}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-lime-400 stroke-[3]" />}
                  </div>
                  {top.description && (
                    <div className="text-[10px] text-purple-300/80 truncate">
                      {top.description}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Cheat code / Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-300 font-display">
              Código Secreto / Observação para o Mestre do Quiosque (opcional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: bastante leite condensado no fundo, capricha no leite em pó..."
              className="w-full px-3.5 py-2.5 bg-purple-900/50 border border-purple-800 rounded-xl text-xs text-white placeholder-purple-400/50 focus:border-lime-400 focus:outline-none"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-3">
            <button
              onClick={() => setGameState('stage2')}
              className="px-4 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-purple-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar Fase 2
            </button>

            <button
              onClick={finishGame}
              className="btn-shine-effect glow-lime px-8 py-4 rounded-2xl bg-gradient-to-r from-lime-400 via-amber-300 to-lime-400 text-purple-950 font-black font-display text-base uppercase tracking-wider flex items-center gap-2 shadow-2xl active:scale-95 transition cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-purple-950" />
              <span>DESBLOQUEAR AÇAÍ LENDÁRIO!</span>
            </button>
          </div>
        </div>
      )}

      {/* --- 6. TELA FINAL DE VITÓRIA (VICTORY / GAME CLEAR!) --- */}
      {gameState === 'victory' && (
        <div className="p-6 sm:p-10 space-y-6 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400 text-purple-950 font-black text-xs uppercase tracking-wider font-display shadow-lg animate-bounce">
              <Trophy className="w-4 h-4 fill-purple-950" />
              <span>MISSION COMPLETE! AÇAÍ LENDÁRIO DESBLOQUEADO</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black font-display text-white">
              Parabéns! Seu Açaí Perfeito Está Pronto! 🍨✨
            </h3>
            <p className="text-xs sm:text-sm text-purple-200">
              Você marcou <strong>{score} XP</strong> e conquistou a combinação suprema de sabor na Praia do Francês!
            </p>
          </div>

          {/* Cup Summary Card */}
          <div className="max-w-md mx-auto p-5 rounded-3xl bg-purple-950/80 border-2 border-lime-400 text-left space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-purple-800 pb-2">
              <div className="font-black text-base text-white font-display">
                Açaí {selectedCup.size}
              </div>
              <div className="text-xl font-black text-lime-400 font-display">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </div>
            </div>

            <div className="text-xs text-purple-200 space-y-1">
              <div>
                <strong className="text-purple-300">Acompanhamentos: </strong>
                {selectedAccompaniments.length > 0 ? selectedAccompaniments.join(', ') : 'Nenhum selecionado'}
              </div>
              <div>
                <strong className="text-purple-300">Cobertura: </strong>
                {selectedTopping}
              </div>
              {notes && (
                <div className="italic text-purple-300/90">
                  <strong>Obs: </strong> "{notes}"
                </div>
              )}
            </div>
          </div>

          {/* Victory Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleWhatsAppClick}
              className="btn-shine-effect glow-emerald w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black font-display text-sm uppercase tracking-wider shadow-xl active:scale-95 transition cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Enviar Pedido Pronto no WhatsApp</span>
            </button>

            <button
              onClick={handleAddToCartClick}
              className="btn-shine-effect glow-lime w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-lime-400 to-lime-500 text-purple-950 font-black font-display text-sm uppercase tracking-wider shadow-xl active:scale-95 transition cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Adicionar ao Carrinho</span>
            </button>

            <button
              onClick={resetGame}
              className="w-full sm:w-auto px-4 py-4 rounded-2xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Montar Outro Copão</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
