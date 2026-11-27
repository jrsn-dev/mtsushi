import catalog from "../components/cardapio.json";

export type FilterKey = string;
export const brl = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const categories = catalog.map((group, index) => ({
  num: String(index + 1).padStart(2, "0"), title: group.name, sub: `${group.items.length} opções`,
  jump: "menu", filter: group.slug,
}));
export const menuFilters = [{ key: "todos", label: "Todos" }, ...catalog.map(group => ({ key: group.slug, label: group.name }))];
export const dishes = catalog.flatMap(group => group.items.map((item, index) => ({
  id: `${group.slug}-${index + 1}`, name: item.name, cat: group.name, filter: group.slug,
  price: item.price / 100, img: `/images/cardapio/${item.image}.webp`, alt: item.name,
  desc: [item.detail, item.portion].filter(Boolean).join(" · "), ingredients: [item.detail],
  width: 600, height: 600, pieces: item.portion, badge: "", tone: "",
})));
const combined = dishes.filter(dish => dish.filter === "combos");
export const featuredCombo = combined[0];
export const combos = combined.slice(1, 3);
export const searchCatalog = dishes;
export type SearchEntry = (typeof dishes)[number];
