"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Fish, IceCreamBowl, Layers3, Minus, Plus, Soup, UtensilsCrossed, Menu as MenuIcon, Instagram, ArrowUpRight, ShoppingCart } from "lucide-react";
import { categories, categoryAliases, formatPrice, menuNotes } from "./cardapio.js";
import { SushiCart } from "./SushiCart";

const storageKey = "mt-sushi-cart";
const itemNames = categories.flatMap(({ items }) => items.map(({ name }) => name));
type Cart = Record<string, number>;

const groups = [
  { slug: "sushis", name: "Sushis", icon: Fish, slugs: ["uramakis", "uramakis-premium", "hossomakis", "hot-rolls", "jyos", "niguiris"], description: "Peças frescas, preparadas com ingredientes selecionados." },
  { slug: "temakis", name: "Temakis", icon: UtensilsCrossed, slugs: ["temakis"], description: "Temakis preparados na hora, com sabor em cada mordida." },
  { slug: "combos", name: "Combos", icon: Layers3, slugs: ["combos"], description: "Combinados para compartilhar ou aproveitar sozinho." },
  { slug: "entradas", name: "Porções", icon: Soup, slugs: ["entradas"], description: "Entradas e acompanhamentos para completar seu pedido." },
  { slug: "sobremesas", name: "Sobremesas", icon: IceCreamBowl, slugs: ["sobremesas"], description: "Para encerrar o pedido com um toque doce." },
];

export function DigitalMenu({ selected, whatsapp }: { selected: string; whatsapp: string }) {
  const slug = groups.some((entry) => entry.slug === selected) ? selected : (categoryAliases[selected as keyof typeof categoryAliases] ?? selected);
  const activeCategory = categories.find((entry) => entry.slug === slug);
  const group = groups.find((entry) => entry.slug === slug || entry.slugs.includes(slug)) ?? groups[0];
  const visibleCategories = activeCategory ? [activeCategory] : categories.filter((entry) => group.slugs.includes(entry.slug));
  const items = visibleCategories.flatMap((entry) => entry.items);
  const [cart, setCart] = useState<Cart>({});
  const [quantities, setQuantities] = useState<Cart>({});
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState("");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) ?? "{}") as Cart | null;
      const valid = Object.fromEntries(itemNames.flatMap((name) => {
        const quantity = stored?.[name];
        return typeof quantity === "number" && Number.isSafeInteger(quantity) && quantity > 0 && quantity <= 99
          ? [[name, quantity]] : [];
      }));
      setCart(valid);
    } catch {
      // Local storage is optional; the cart remains usable in memory.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      // Keep the cart in memory when browser storage is unavailable.
    }
  }, [cart, ready]);

  function change(name: string, delta: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = Math.max(0, Math.min(99, (current[name] ?? 0) + delta));
      if (quantity > 0) next[name] = quantity;
      else delete next[name];
      return next;
    });
  }

  function adjustQuantity(name: string, delta: number) {
    setQuantities((current) => ({
      ...current,
      [name]: Math.max(1, Math.min(99, (current[name] ?? 1) + delta)),
    }));
  }

  function addToCart(name: string) {
    const available = 99 - (cart[name] ?? 0);
    if (!ready || available <= 0) return;
    const amount = Math.min(available, quantities[name] ?? 1);
    change(name, amount);
    setQuantities((current) => ({ ...current, [name]: 1 }));
    setLastAdded(name);
  }

  return (
    <main className="catalog-page shell" id="catalogo">
      <header className="catalog-top">
        <details className="catalog-menu">
          <summary aria-label="Abrir menu"><MenuIcon aria-hidden="true" /></summary>
          <nav className="catalog-menu-links" aria-label="Navegação principal">
            <Link href="/">Página inicial</Link>
            <Link href="/#cardapio">Conheça o cardápio</Link>
            <Link href="/#delivery">Entrega</Link>
            <a href="https://www.instagram.com/mtsushiarte/" target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" /> Instagram <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        </details>
        <Link className="catalog-brand" href="/" aria-label="MT Sushi Arte - página inicial">
          <img src="/images/mt-sushi-logo-stacked.svg" width="320" height="230" alt="MT Sushi Arte" />
        </Link>
        <SushiCart cart={cart} change={change} whatsapp={whatsapp} />
      </header>

      <section className="catalog-hero" aria-labelledby="catalog-title">
        <div className="catalog-intro">
          <span className="catalog-eyebrow">ESCOLHA SEUS FAVORITOS</span>
          <h1 id="catalog-title">Cardápio Digital</h1>
          <p>Escolha, adicione ao carrinho e finalize seu pedido!</p>
          <span className="catalog-accent" aria-hidden="true" />
        </div>
      </section>

      <nav className="catalog-categories" aria-label="Categorias do cardápio">
        {groups.map(({ slug: groupSlug, name, icon: Icon }) => (
          <Link key={groupSlug} href={"/cardapio?categoria=" + groupSlug} scroll={false}
            className="catalog-category" aria-current={group.slug === groupSlug ? "page" : undefined}>
            <Icon aria-hidden="true" strokeWidth={1.65} />
            <span>{name}</span>
          </Link>
        ))}
      </nav>

      {group.slug === "sushis" && (
        <nav className="catalog-subcategories" aria-label="Tipos de sushi">
          <Link href="/cardapio?categoria=sushis" scroll={false} aria-current={!activeCategory ? "page" : undefined}>Todos os sushis</Link>
          {categories.filter((entry) => group.slugs.includes(entry.slug)).map((entry) => (
            <Link key={entry.slug} href={"/cardapio?categoria=" + entry.slug} scroll={false}
              aria-current={activeCategory?.slug === entry.slug ? "page" : undefined}>{entry.name}</Link>
          ))}
        </nav>
      )}

      <section className="catalog-section" aria-labelledby="catalog-category">
        <div className="catalog-section-heading">
          <h2 id="catalog-category">{activeCategory ? activeCategory.name : group.name}</h2>
          <p>{group.description}</p>
        </div>
        <div className="catalog-items">
          {items.map((item) => {
            const quantity = quantities[item.name] ?? 1;
            const inCart = cart[item.name] ?? 0;
            const available = 99 - inCart;
            return (
              <article className="catalog-item" key={item.name}>
                <div className="catalog-item-photo">
                  <Image src={"/images/" + item.image + ".webp"} alt={"Foto ilustrativa do tipo de prato: " + item.name}
                    width={500} height={350} sizes="(max-width: 520px) 120px, (max-width: 860px) 160px, 230px" />
                </div>
                <div className="catalog-item-copy">
                  <h3>{item.name}</h3>
                  {item.detail && <p className="catalog-description">{item.detail}</p>}
                  {item.portion && <p className="catalog-portion">{item.portion}</p>}
                  <strong className="catalog-price">{formatPrice(item.price)}</strong>
                </div>
                <div className="catalog-item-purchase">
                  <div className="catalog-quantity" aria-label={"Selecionar quantidade de " + item.name}>
                    <button type="button" onClick={() => adjustQuantity(item.name, -1)}
                      disabled={quantity <= 1 || !ready} aria-label={"Diminuir quantidade de " + item.name}><Minus aria-hidden="true" /></button>
                    <output aria-live="off">{quantity}</output>
                    <button className="catalog-quantity-plus" type="button" onClick={() => adjustQuantity(item.name, 1)}
                      disabled={quantity >= available || !ready} aria-label={"Aumentar quantidade de " + item.name}><Plus aria-hidden="true" /></button>
                  </div>
                  <button className="catalog-add" type="button" onClick={() => addToCart(item.name)}
                    disabled={!ready || available <= 0}>
                    <ShoppingCart aria-hidden="true" /> {available <= 0 ? "Limite atingido" : "Adicionar"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <footer className="catalog-footer">
        <p>Fotos ilustrativas dos tipos de prato. A apresentação pode variar conforme o item.</p>
        {menuNotes.map((note) => <p key={note}>{note}</p>)}
        {group.slug === "sobremesas" && <p>Todas as sobremesas são fritas.</p>}
      </footer>
      <p className="visually-hidden" role="status">{lastAdded && (lastAdded + ": " + (cart[lastAdded] ?? 0) + " no pedido")}</p>
    </main>
  );
}
