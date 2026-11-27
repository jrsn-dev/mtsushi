import { site } from "./site";
export type CartItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  cat: string;
  qty: number;
};

export const CART_KEY = "mtsushi-cart-v2";
export const MIN_ORDER = 60;
export const FREE_SHIPPING = 150;
export const WHATSAPP_NUMBER = site.whatsapp;

export const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const cartCount = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.qty, 0);

export const cartTotal = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.price * item.qty, 0);

export function addItem(cart: CartItem[], item: Omit<CartItem, "qty">): CartItem[] {
  const existing = cart.find((entry) => entry.id === item.id);
  if (existing) {
    return cart.map((entry) =>
      entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry
    );
  }
  return [...cart, { ...item, qty: 1 }];
}

export function changeQty(cart: CartItem[], id: string, delta: number): CartItem[] {
  return cart
    .map((entry) => (entry.id === id ? { ...entry, qty: entry.qty + delta } : entry))
    .filter((entry) => entry.qty > 0);
}

export function removeItem(cart: CartItem[], id: string): CartItem[] {
  return cart.filter((entry) => entry.id !== id);
}

export function parseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        Boolean(item) &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.img === "string" &&
        typeof item.cat === "string" &&
        typeof item.qty === "number" &&
        item.qty > 0
    );
  } catch {
    return [];
  }
}

export const missingForMinimum = (total: number) =>
  Math.max(0, MIN_ORDER - total);

export const missingForFreeShipping = (total: number) =>
  Math.max(0, FREE_SHIPPING - total);

export function shippingMessage(total: number): string {
  if (total >= FREE_SHIPPING) return "Delivery grátis para este pedido.";
  return `Faltam ${money(missingForFreeShipping(total))} para o delivery grátis.`;
}

export function checkoutMessage(cart: CartItem[]): string {
  const lines = cart.map(
    (item) => `• ${item.qty}x ${item.name} — ${money(item.price * item.qty)}`
  );
  return [
    "Olá! Quero fazer um pedido no MTSUSHI ARTE:",
    "",
    ...lines,
    "",
    `Total: ${money(cartTotal(cart))}`,
    "Pode confirmar a disponibilidade e o tempo de entrega?",
  ].join("\n");
}

export function checkoutUrl(cart: CartItem[]): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    checkoutMessage(cart)
  )}`;
}

export const canCheckout = (cart: CartItem[]) =>
  cart.length > 0;
