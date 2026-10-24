import { CupSize, Accompaniment, Topping } from '../types/menu';

export const STORE_INFO = {
  name: 'Açaí + Mais Expresso',
  subtitle: 'Praia do Francês - Marechal Deodoro / AL',
  slogan: 'Sabor que transforma o seu dia! Você merece o sabor inconfundível do nosso açaí super cremoso.',
  differentials: [
    { title: 'Sem Glúten', icon: '🌾' },
    { title: 'Sem Lactose', icon: '🥛' },
    { title: 'Sem Xarope', icon: '🚫' },
    { title: 'Banana substitui o açúcar', icon: '🍌' },
    { title: 'Super Cremoso', icon: '✨' },
  ],
  whatsappPrincipal: '5582996485515',
  whatsappFormatado: '(82) 99648-5515',
  ifoodUrl: 'https://www.ifood.com.br/delivery/marechal-deodoro-al/acai-mais-expresso-praia-do-frances/d0a7d606-52d5-4b76-ac37-a8af1cf5a370?UTM_Medium=share',
  instagramHandle: 'acaimaisfran6',
  instagramUrl: 'https://instagram.com/acaimaisfran6',
  googleRating: 4.2,
  googleReviewCount: 6,
  googleMapsUrl: 'https://maps.google.com/?q=Praça+do+Skate+Av+Caravelas+Praia+do+Frances+Marechal+Deodoro+AL',
  googleReviewUrl: 'https://share.google/IjfyDr6U7d4GKld9n',
  address: 'Praça do Skate – Av. Caravelas, R. Caravelas - Praia do Francês, Mal. Deodoro - AL, 57160-000',
  scheduleNotice: 'Quarta a Segunda: 15h às 22h (Terça-feira: Fechado)',
  logoUrl: 'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1791933174/WhatsApp_Image_2026-10-13_at_8.05.08_PM_mqyndl.jpg',
};

export const CUP_SIZES: CupSize[] = [
  {
    id: 'copo-200ml',
    size: '200 ml',
    volume: 200,
    price: 10.0,
    includedToppings: 2,
    description: 'O tamanho ideal para uma pausa rápida e refrescante na praia.',
  },
  {
    id: 'copo-300ml',
    size: '300 ml',
    volume: 300,
    price: 14.0,
    includedToppings: 3,
    popular: true,
    description: 'A porção perfeita para matar a vontade com 3 acompanhamentos à sua escolha.',
  },
  {
    id: 'copo-400ml',
    size: '400 ml',
    volume: 400,
    price: 16.0,
    includedToppings: 4,
    description: 'Generoso e delicioso! Escolha até 4 acompanhamentos para turbinar.',
  },
  {
    id: 'copo-500ml',
    size: '500 ml',
    volume: 500,
    price: 20.0,
    includedToppings: 5,
    description: 'Para quem ama açaí de verdade! 5 acompanhamentos inclusos e muita cremosidade.',
  },
];

export const ACCOMPANIMENTS: Accompaniment[] = [
  { id: 'leite-po', name: 'Leite em Pó', category: 'especial', badge: 'Favorito' },
  { id: 'banana', name: 'Banana', category: 'fruta', badge: 'Natural' },
  { id: 'granola', name: 'Granola', category: 'crocante' },
  { id: 'pacoca', name: 'Paçoca', category: 'doce', badge: 'Mais pedido' },
  { id: 'm-ms', name: "M&M's / Confete", category: 'doce' },
  { id: 'gotas-chocolate', name: 'Gotas de Chocolate', category: 'doce' },
  { id: 'ovomaltine', name: 'Ovomaltine', category: 'crocante' },
  { id: 'chocoball', name: 'Chocoball', category: 'crocante' },
  { id: 'amendoim', name: 'Amendoim Triturado / Granulado', category: 'crocante' },
  { id: 'castanha', name: 'Castanha', category: 'crocante', badge: 'Nobre' },
  { id: 'flocos-arroz', name: 'Flocos de Arroz', category: 'crocante' },
  { id: 'cereal-nescal', name: 'Cereal Nescal', category: 'crocante' },
  { id: 'granulado-colorido', name: 'Granulado Colorido', category: 'doce' },
  { id: 'jujuba', name: 'Jujuba', category: 'doce' },
  { id: 'sucrilhos', name: 'Sucrilhos', category: 'crocante' },
  { id: 'biscoito-granulado', name: 'Biscoito Granulado', category: 'crocante' },
  { id: 'farinha-lactea', name: 'Farinha Láctea', category: 'especial' },
];

export const TOPPINGS: Topping[] = [
  { id: 'leite-condensado', name: 'Leite Condensado', color: '#fef08a', description: 'Clássico doce e cremoso' },
  { id: 'chocolate', name: 'Chocolate', color: '#78350f', description: 'Calda especial encorpada' },
  { id: 'mel', name: 'Mel', color: '#f59e0b', description: 'Mel puro e natural' },
  { id: 'morango', name: 'Morango', color: '#e11d48', description: 'Calda frutada de morango' },
  { id: 'banana-caramelizada', name: 'Banana Caramelizada', color: '#d97706', description: 'Especial artesanal' },
  { id: 'kiwi', name: 'Kiwi', color: '#65a30d', description: 'Calda tropical refrescante' },
  { id: 'nenhuma', name: 'Sem Cobertura', color: '#6b7280', description: 'Apenas a pureza do açaí puro' },
];

export const EXTRA_ACCOMPANIMENT_PRICE = 2.0;

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    tag: 'Sabor Raiz',
    title: 'Pode chover, pode esfriar... 🌧️💜',
    text: 'A vontade de tomar açaí não tem tempo ruim! Aquece o corpo, alegra o dia e é sempre a melhor escolha na Praia do Francês.',
    likes: '142',
    iconColor: 'bg-purple-600',
  },
  {
    id: 2,
    tag: 'Energia',
    title: 'Não passe vontade! Recarregue as baterias! ⚡',
    text: 'Cremoso, refrescante e irresistível! Feito com a polpa mais pura do açaí, sem aditivos químicos e sem xaropes pesados.',
    likes: '189',
    iconColor: 'bg-lime-500',
  },
  {
    id: 3,
    tag: 'Sextou',
    title: 'Sextou e a vontade de açaí só aumenta! 🛹🌊',
    text: 'Choveu? Praia com sol? Passa no quiosque da Praça do Skate e vem garantir o copão caprichado com muita fruta e granola!',
    likes: '215',
    iconColor: 'bg-emerald-600',
  },
  {
    id: 4,
    tag: 'Saudável',
    title: '100% Livre de Glúten, Lactose e Xarope 🍃',
    text: 'Aqui o protagonista é o próprio fruto. Textura cremosa que você sente logo na primeira colherada!',
    likes: '168',
    iconColor: 'bg-amber-500',
  },
];

export const GOOGLE_REVIEWS = [
  {
    id: 1,
    author: 'Matheus Albuquerque',
    time: 'Há 2 semanas',
    rating: 5,
    text: 'Melhor açaí da Praia do Francês com folga! Cremoso demais, não tem aquele gosto enjoativo de xarope artificial. O atendimento na Praça do Skate é nota 10!',
  },
  {
    id: 2,
    author: 'Camila Vasconcelos',
    time: 'Há 1 mês',
    rating: 5,
    text: 'Sensacional! Amei a opção sem glúten e sem lactose, copo vem super recheado com os acompanhamentos. A banana caramelizada é divina.',
  },
  {
    id: 3,
    author: 'Rodrigo Medeiros',
    time: 'Há 1 mês',
    rating: 5,
    text: 'Parada obrigatória depois de um dia de surfe e praia. O açaí expresso sai na hora, consistência perfeita!',
  },
  {
    id: 4,
    author: 'Larissa Ferreira',
    time: 'Há 3 meses',
    rating: 4,
    text: 'Muito saboroso e preço justo! Fica bem localizado na praça, ambiente bem gostoso para sentar e conversar.',
  },
];
