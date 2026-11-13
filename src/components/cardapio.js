// Fonte: Cardapio MT Sushi Arte.pdf. Valores das porções em centavos.
/** @typedef {{name: string, price: number, detail: string, portion: string, image?: string}} MenuItem */
/** @typedef {{slug: string, name: string, items: MenuItem[]}} MenuCategory */
/** @param {string} slug @param {string} name @param {string} portion @param {[string, number, string?, string?][]} rows @returns {MenuCategory} */
function category(slug, name, portion, rows) {
  return { slug, name, items: rows.map(([name, price, detail = "", itemPortion = portion]) => ({
    name, price: price * 100, detail, portion: itemPortion,
  })) };
}

export const categories = [
  category("entradas", "Entradas", "", [
    ["Sunomono", 13, "Vinagre de arroz, açúcar e sal"],
    ["Sunomono especial", 16, "Vinagre de arroz, açúcar, sal e kani"],
    ["Ceviche de salmão", 45, "Salmão em cubos, levemente apimentado, marinado com limão, sal, pimentão e cebola roxa"],
    ["Ceviche de tilápia", 40, "Tilápia em cubos, levemente apimentada, marinada com limão, sal, pimentão e cebola roxa"],
    ["Sashimi de salmão", 50, "Fatias do lombo", "10 fatias"],
    ["Carpaccio de salmão", 60, "Molho de ostras, limão, cebola roxa e alho-poró", "15 fatias"],
    ["Kit refeição", 20, "Gengibre, wasabi, 4 sachês de tare e 4 sachês de shoyu"],
  ]),
  category("uramakis", "Uramakis", "10 peças", [
    ["Uramaki Filadélfia", 25, "Salmão e cream cheese"],
    ["Uramaki Filadélfia especial", 30, "Salmão, cream cheese e salmão por cima"],
    ["Uramaki salmão grelhado", 27, "Salmão grelhado e cream cheese"],
    ["Uramaki salmão grelhado especial", 32, "Salmão grelhado e cream cheese, coberto com salmão grelhado"],
    ["Uramaki skin pele frita", 26, "Pele frita e cream cheese"],
    ["Uramaki skin especial", 29, "Pele frita e cream cheese, coberto com salmão maçaricado"],
    ["Uramaki kani", 22, "Kani e cream cheese"],
    ["Uramaki kani crocante", 25, "Kani frito e cream cheese"],
    ["Uramaki kani crocante especial", 29, "Kani frito e cream cheese, coberto com salmão"],
    ["Uramaki Califórnia", 24, "Manga, pepino e kani"],
  ]),
  category("uramakis-premium", "Uramakis premium", "10 peças", [
    ["Uramaki camarão", 26, "Camarão e cream cheese"],
    ["Uramaki camarão especial", 30, "Camarão e cream cheese, coberto com camarão"],
    ["Uramaki bola de neve", 35, "Camarão e cream cheese, coberto com salmão e camarão"],
    ["Uramaki peixe frito", 25, "Peixe frito do dia e cream cheese"],
    ["Uramaki makimono", 30, "Salmão, cream cheese e geleia"],
    ["Uramaki Filadélfia (crispy couve)", 26, "Salmão, cream cheese e couve crispy"],
    ["Uramaki Filadélfia (batata crispy)", 26, "Salmão, cream cheese e batata-doce crispy"],
    ["Uramaki ebiten", 28, "Camarão, cream cheese e cebola crispy"],
  ]),
  category("hossomakis", "Hossomakis", "", [
    ["Hossomaki salmão", 21],
    ["Hossomaki pepino", 16],
    ["Hossomaki kani", 19],
    ["Hossomaki Califórnia", 21, "Manga, pepino e kani"],
    ["Hossomaki kani crocante", 20, "Kani frito"],
  ]),
  category("hot-rolls", "Hot rolls", "10 peças", [
    ["Hot roll salmão", 25, "Salmão, cebolinha e cream cheese"],
    ["Hot roll salmão especial", 30, "Salmão, cream cheese e cebolinha, coberto com salmão picado"],
    ["Big hot roll salmão", 35, "Versão abrasileirada e gigante do sushi hot roll"],
    ["Hot roll kani", 21, "Kani e cream cheese"],
  ]),
  category("temakis", "Temakis", "", [
    ["Temaki salmão", 29, "Salmão, cream cheese, cebolinha e gergelim"],
    ["Temaki salmão grelhado", 30, "Salmão grelhado, cream cheese e cebolinha"],
    ["Temaki camarão", 35, "Camarão, cream cheese e cebolinha"],
    ["Temaki hot (salmão)", 32, "Salmão, cream cheese e cebolinha, empanado e frito"],
    ["Temaki hot (salmão e camarão)", 35, "Salmão, camarão, cream cheese e cebolinha, empanado e frito"],
    ["Temaki Califórnia", 25, "Manga, pepino e kani"],
    ["Temaki sem arroz (salmão)", 35],
  ]),
  category("jyos", "Jyos", "2 unidades", [
    ["Jyo salmão", 18, "Salmão e cream cheese"],
    ["Jyo salmão especial", 19, "Salmão e cream cheese, coberto com salmão"],
    ["Jyo salmão maçaricado", 19, "Salmão maçaricado e cream cheese"],
    ["Jyo camarão", 20, "Salmão, cream cheese e camarão"],
    ["Jyo camarão maçaricado", 21, "Salmão maçaricado, cream cheese e camarão"],
  ]),
  category("niguiris", "Niguiris", "2 unidades", [
    ["Niguiri salmão", 17],
    ["Niguiri salmão maçaricado", 18],
    ["Niguiri especial", 20, "Salmão e camarão"],
  ]),
  category("combos", "Combinados", "", [
    ["Combinado 1", 84, "10 Uramaki Filadélfia, 10 Uramaki salmão grelhado, 10 Uramaki kani e 10 Hot roll", "40 peças"],
    ["Combinado 2", 99, "10 Uramaki Filadélfia, 10 Uramaki peixe frito, 10 Uramaki kani crocante, 10 Hossomaki de salmão e 5 Sashimi de salmão", "45 peças"],
    ["Combinado 3", 58, "10 Uramaki Filadélfia, 10 Uramaki kani crocante e 10 Hot roll", "30 peças"],
    ["Combinado 4", 68, "1 Temaki salmão, 10 Uramaki Filadélfia especial e 5 Sashimi"],
    ["Combinado 5", 98, "10 Uramaki Filadélfia, 10 Uramaki peixe grelhado, 10 Uramaki kani crocante, 10 Hot roll, 10 Hossomaki salmão, 5 Hossomaki kani e 5 Hossomaki de pepino", "60 peças"],
    ["Combinado 6", 75, "20 Uramaki Filadélfia e 20 Hot roll", "40 peças"],
    ["Combinado 7", 55, "30 Hot roll", "30 peças"],
    ["Combinado 8", 65, "10 Uramaki Filadélfia, 10 Uramaki peixe grelhado, 10 Uramaki kani, 10 Hot roll e 10 Hossomaki de pepino", "50 peças"],
    ["Combinado 9 especial", 129, "10 Uramaki Filadélfia, 10 Uramaki salmão grelhado, 10 Uramaki camarão, 10 Uramaki kani crocante e 10 Hot roll", "50 peças"],
    ["Combinado 10", 135, "10 Uramaki Filadélfia especial, 10 Uramaki camarão especial, 10 Hot roll especial, 10 Hossomaki de salmão, 5 Niguiri, 5 Jyo e 5 Sashimi", "55 peças"],
    ["Combinado 11", 89, "10 Uramaki Filadélfia especial, 10 Hot roll especial e 10 Sashimi", "30 peças"],
    ["Combinado 12", 73, "10 Uramaki Filadélfia, 5 Niguiri, 5 Jyo e 8 Sashimi"],
  ]),
  category("sobremesas", "Sobremesas", "10 peças", [
    ["Hot roll morango com Nutella", 28, "Morango, Nutella e leite condensado"],
    ["Hot roll Kit Kat", 25, "Kit Kat e leite condensado"],
    ["Hot roll Romeu e Julieta", 25, "Goiabada, cream cheese e leite condensado"],
    ["Spring roll (banana)", 25, "Banana frita com leite condensado"],
  ]),
];

export const menuNotes = [
  "Todos os pedidos acompanham 2 shoyu e 2 tare.",
  "Combinados com sashimi incluem wasabi e gengibre.",
];

export const categoryAliases = {
  sushis: "niguiris",
  porcoes: "entradas",
};

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
/** @param {number} cents */
export function formatPrice(cents) {
  return currency.format(cents / 100);
}

export const prices = new Map(categories.flatMap(({ items }) => items.map(({ name, price }) => [name, price])));
