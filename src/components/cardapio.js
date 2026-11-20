import catalog from "./cardapio.json";
export const categories = catalog;
export const menuNotes = [
  "Todos os pedidos acompanham: 2 shoyu, 2 tare.",
  "Combos com sashimi incluem: Wasabi e Gengibre.",
];
export const categoryAliases = { sushis: "uramakis", porcoes: "entradas" };
const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
/** @param {number} cents */
export function formatPrice(cents) {
  return currency.format(cents / 100);
}
export const prices = new Map(categories.flatMap(({ items }) => items.map(({ name, price }) => [name, price])));
