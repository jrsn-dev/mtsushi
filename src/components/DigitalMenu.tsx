"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { categories, categoryAliases, formatPrice, menuNotes } from "./cardapio.js";
import { SushiCart } from "./SushiCart";

const storageKey = "mt-sushi-cart";
const itemNames = categories.flatMap(({ items }) => items.map(({ name }) => name));
type Cart = Record<string, number>;

export function DigitalMenu({ selected, whatsapp }: { selected: string; whatsapp: string }) {
  const slug = categoryAliases[selected as keyof typeof categoryAliases] ?? selected;
  const category = categories.find((entry) => entry.slug === slug) ?? categories[0];
  const [cart, setCart] = useState<Cart>({});
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
      // The cart remains usable when browser storage is unavailable.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      // Keep the current cart in memory.
    }
  }, [cart, ready]);

  function change(name: string, delta: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = Math.min(99, (current[name] ?? 0) + delta);
      if (quantity > 0) next[name] = quantity;
      else delete next[name];
      return next;
    });
  }

  return (
    <main className="catalog-page shell" id="catalogo">
      <header className="catalog-top">
        <Link className="text-link" href="/#cardapio"><ArrowLeft aria-hidden="true" /> Voltar ao site</Link>
        <Link className="brand" href="/" aria-label="MT Sushi Arte"><img src="/images/mt-sushi-logo.svg" alt="" width="279" height="89" /></Link>
        <SushiCart cart={cart} change={change} whatsapp={whatsapp} direct="https://ig.me/m/mtsushiarte" />
      </header>
      <div className="catalog-intro">
        <h1>Cardápio digital</h1>
        <p>Delivery em Jacarezinho, PR. Escolha os itens e revise seu pedido antes de enviar à loja.</p>
      </div>
      <nav className="catalog-categories" aria-label="Categorias do cardápio">
        {categories.map(({ slug, name }) => (
          <Link key={slug} href={`/cardapio?categoria=${slug}`} scroll={false}
            className="button button-outline" aria-current={category.slug === slug ? "page" : undefined}>{name}</Link>
        ))}
      </nav>
      <section className="catalog-section" aria-labelledby="catalog-category">
        <h2 id="catalog-category">{category.name}</h2>
        <div className="catalog-items">
          {category.items.map((item) => {
            const quantity = cart[item.name] ?? 0;
            return (
              <article className="catalog-item" key={item.name}>
                <div className="catalog-item-photo">
                  <Image src={`/images/${item.image}.webp`} alt={`Imagem ilustrativa da categoria ${category.name}`}
                    width={900} height={675} sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 384px" />
                </div>
                <div className="catalog-item-copy">
                  <h3>{item.name}</h3>
                  {item.detail && <p>{item.detail}</p>}
                  {item.portion && <p className="catalog-ingredients">{item.portion}</p>}
                  <div className="catalog-item-action">
                    <strong>{formatPrice(item.price)}</strong>
                    <button className="button button-red" type="button" disabled={!ready || quantity >= 99}
                      aria-label={`Adicionar ${item.name} ao pedido`}
                      onClick={() => { change(item.name, 1); setLastAdded(item.name); }}>
                      {quantity ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
                      {quantity ? `Adicionar mais · ${quantity}` : "Adicionar"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <p className="catalog-image-note">Imagens ilustrativas das categorias. A apresentação e os ingredientes variam conforme o item escolhido.</p>
      <ul className="catalog-notes">
        {menuNotes.map((note) => <li key={note}>{note}</li>)}
        {category.slug === "sobremesas" && <li>Todas as sobremesas são fritas.</li>}
      </ul>
      <p className="visually-hidden" role="status">{lastAdded && `${lastAdded}: ${cart[lastAdded] ?? 0} no pedido`}</p>
    </main>
  );
}
