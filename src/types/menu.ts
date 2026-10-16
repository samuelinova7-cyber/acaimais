export interface CupSize {
  id: string;
  size: string;
  volume: number; // in ml
  price: number;
  includedToppings: number;
  popular?: boolean;
  description: string;
}

export interface Accompaniment {
  id: string;
  name: string;
  category: 'crocante' | 'fruta' | 'doce' | 'especial';
  icon?: string;
  badge?: string;
}

export interface Topping {
  id: string;
  name: string;
  description?: string;
  color: string;
}

export interface CartItem {
  id: string;
  cupSize: CupSize;
  accompaniments: string[]; // names of chosen accompaniments
  extraAccompaniments: string[]; // extra ones beyond included count (e.g. +R$ 2 each)
  topping: string; // chosen calda/cobertura
  notes: string;
  unitPrice: number;
  quantity: number;
}

export interface CustomerOrder {
  items: CartItem[];
  customerName: string;
  orderType: 'retirada' | 'entrega';
  address?: string;
  paymentMethod: 'pix' | 'cartao' | 'dinheiro';
  needChange?: string;
  phoneContact: '82' | '45';
}
