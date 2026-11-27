"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CategoryIcon } from "./CategoryIcon";
import { Minus, Plus, Menu as MenuIcon, Instagram, ArrowUpRight, ShoppingCart } from "lucide-react";
import { categories, categoryAliases, formatPrice, menuNotes } from "./cardapio.js";
import { SushiCart } from "./SushiCart";

const storageKey = "mt-sushi-cart";
const itemNames = categories.flatMap(({ items }) => items.map(({ name }) => name));
const cartNames = new Map(itemNames.map((name) => [name.replace(/ \(\d+ peças\)$/, ""), name]));
cartNames.set("SUNOMONO ESPECIAL", "SUNOMONO (ESPECIAL)");
cartNames.set("SASHIMI DE SALMÃO", "SASHIMI (SALMÃO)");
cartNames.set("HOT ROLL MORANGO COM NUTELLA", "HOT ROLL MORANGO C/ NUTELLA");
type Cart = Record<string, number>;


export function DigitalMenu({ selected, whatsapp }: { selected: string; whatsapp: string }) {
  const slug = categoryAliases[selected as keyof typeof categoryAliases] ?? selected;
  const group = categories.find((entry) => entry.slug === slug) ?? categories[0];
  const items = group.items;
  const [cart, setCart] = useState<Cart>({});
  const [quantities, setQuantities] = useState<Cart>({});
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState("");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) ?? "{}") as Cart | null;
      const valid = Object.fromEntries(Object.entries(stored ?? {}).flatMap(([key, quantity]) => {
        const name = itemNames.includes(key) ? key : cartNames.get(key.toLocaleUpperCase("pt-BR"));
        return name && typeof quantity === "number" && Number.isSafeInteger(quantity) && quantity > 0 && quantity <= 99
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
            <a href="/">Página inicial</a>
            <a href="/#cardapio">Conheça o cardápio</a>
            <a href="/#delivery">Entrega</a>
            <a href="https://www.instagram.com/mtsushiarte/" target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" /> Instagram <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        </details>
        <a className="catalog-brand" href="/" aria-label="MT Sushi Arte - página inicial">
          <img src="/images/mt-sushi-logo-stacked.svg" width="320" height="230" alt="MT Sushi Arte" />
        </a>
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
        {categories.map(({ slug: groupSlug, name }) => {

          return (
          <Link key={groupSlug} href={"/cardapio?categoria=" + groupSlug} scroll={false}
            className="catalog-category" aria-current={group.slug === groupSlug ? "page" : undefined}>
            <CategoryIcon slug={groupSlug} />
            <span>{name}</span>
          </Link>
        ); })}
      </nav>

      <section className="catalog-section" aria-labelledby="catalog-category">
        <div className="catalog-section-heading">
          <h2 id="catalog-category">{group.name}</h2>
          {group.slug === "sobremesas" && <p>Todas as sobremesas são fritas!</p>}
        </div>
        <div className="catalog-items">
          {items.map((item, index) => {
            const quantity = quantities[item.name] ?? 1;
            const inCart = cart[item.name] ?? 0;
            const available = 99 - inCart;
            return (
              <article id={`${group.slug}-${index + 1}`} className="catalog-item" key={item.name}>
                <div className="catalog-item-photo">
                  <Image src={"/images/cardapio/" + item.image + ".webp"} alt={(item.recreated ? "Reconstituição de " : "") + item.name}
                    width={500} height={350} sizes="(max-width: 520px) 120px, (max-width: 860px) 160px, 230px" />
                </div>
                <div className="catalog-item-copy">
                  <h3>{item.name}</h3>
                  {item.detail && <p className="catalog-description">{item.detail}</p>}
                  {item.recreated && <small>Imagem ilustrativa</small>}
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
        {menuNotes.map((note) => <p key={note}>{note}</p>)}
      </footer>
      <p className="visually-hidden" role="status">{lastAdded && (lastAdded + ": " + (cart[lastAdded] ?? 0) + " no pedido")}</p>
    </main>
  );
}
