"use client";

import { useMemo, useRef, useState } from "react";
import { useStore } from "@/components/StoreProvider";
import { useFocusTrap } from "@/lib/useFocusTrap";
import {
  canCheckout,
  checkoutUrl,
  money,
} from "@/lib/cart";
import { searchCatalog, type SearchEntry } from "@/lib/menu";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function findEntries(query: string): SearchEntry[] {
  const term = normalize(query.trim());
  if (!term) return searchCatalog.slice(0, 4);
  return searchCatalog
    .filter((entry) =>
      normalize(
        [entry.name, entry.cat, entry.desc, ...entry.ingredients].join(" ")
      ).includes(term)
    )
    .slice(0, 7);
}

export default function Overlays() {
  const {
    cart,
    panel,
    closePanels,
    increment,
    decrement,
    remove,
    total,
    toast,
  } = useStore();

  const cartRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const cartOpen = panel === "cart";
  const searchOpen = panel === "search";

  useFocusTrap(cartOpen, cartRef, closePanels);
  useFocusTrap(searchOpen, searchRef, closePanels);

  const entries = useMemo(() => findEntries(query), [query]);

  const ready = canCheckout(cart);

  function selectEntry(entry: SearchEntry) {
    closePanels();
    window.location.assign(`/cardapio?categoria=${encodeURIComponent(entry.filter)}#${encodeURIComponent(entry.id)}`);
  }

  return (
    <>
      <div
        className={`overlay${panel ? " is-open" : ""}`}
        id="overlay"
        aria-hidden="true"
        onClick={closePanels}
      />

      <div
        className={`cart-drawer${cartOpen ? " is-open" : ""}`}
        id="cartDrawer"
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de pedidos"
        aria-hidden={!cartOpen}
        inert={!cartOpen}
        ref={cartRef}
      >
        <div className="cart-drawer__head">
          <div>
            <span className="cart-drawer__eyebrow">Seu pedido</span>
            <h2>
              Carrinho <span>{cart.length}</span>
            </h2>
          </div>
          <button className="icon-btn" onClick={closePanels} aria-label="Fechar carrinho">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon">
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <path d="M12 17h24l-2 20H14l-2-20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M18 17v-3a6 6 0 0 1 12 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M20 26c2.5 2.2 5.5 2.2 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
                </svg>
              </span>
              <h3>Seu carrinho está vazio</h3>
              <p>Escolha suas peças favoritas e monte um pedido à altura.</p>
              <a className="btn btn--ghost btn--sm" href="/cardapio">Ver cardápio</a>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item__img">
                    <img src={item.img} alt="" loading="lazy" />
                  </div>
                  <div className="cart-item__info">
                    <h4>{item.name}</h4>
                    <span>{money(item.price)}</span>
                    <div className="cart-qty">
                      <button
                        type="button"
                        onClick={() => decrement(item.id)}
                        aria-label={`Diminuir quantidade de ${item.name}`}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => increment(item.id)}
                        aria-label={`Aumentar quantidade de ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => remove(item.id)}
                    aria-label={`Remover ${item.name}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M5 7h14M9.5 7V5.5h5V7M7.5 7l.8 12h7.4l.8-12M10.5 10.5v5M13.5 10.5v5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-drawer__foot" hidden={cart.length === 0}>
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <strong>{money(total)}</strong>
          </div>
          <p className="cart-note">Consulte a entrega pelo WhatsApp.</p>
          <a
            className="btn btn--red cart-checkout"
            href={ready ? checkoutUrl(cart) : undefined}
            target="_blank"
            rel="noopener"
            aria-disabled={!ready}
            onClick={(event) => {
              if (!ready) event.preventDefault();
            }}
          >
            Finalizar no WhatsApp <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
          <p className="cart-note">Pagamento na entrega · Pix, cartão ou dinheiro</p>
        </div>
      </div>

      <div
        className={`search-panel${searchOpen ? " is-open" : ""}`}
        id="searchPanel"
        role="dialog"
        aria-modal="true"
        aria-label="Buscar no cardápio"
        aria-hidden={!searchOpen}
        inert={!searchOpen}
        ref={searchRef}
      >
        <div className="search-panel__box">
          <div className="search-panel__top">
            <span className="search-panel__label">Buscar no cardápio</span>
            <button className="icon-btn" onClick={closePanels} aria-label="Fechar busca">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="search-field">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              id="searchInput"
              type="search"
              placeholder="Salmão, cream cheese, combo…"
              autoComplete="off"
              aria-label="Buscar pratos"
              aria-controls="searchResults"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveIndex((index) => Math.min(index + 1, entries.length - 1));
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveIndex((index) => Math.max(index - 1, 0));
                } else if (event.key === "Enter" && entries[activeIndex]) {
                  event.preventDefault();
                  selectEntry(entries[activeIndex]);
                }
              }}
            />
            <kbd>ESC</kbd>
          </div>
          <div className="search-results" id="searchResults">
            {entries.length === 0 ? (
              <p className="search-empty">
                Nenhuma peça encontrada. Tente “salmão”, “cream cheese” ou “combo”.
              </p>
            ) : (
              entries.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  className={`search-result${index === activeIndex ? " is-active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectEntry(entry)}
                >
                  <span className="search-result__img">
                    <img src={entry.img} alt="" />
                  </span>
                  <span className="search-result__info">
                    <strong>{entry.name}</strong>
                    <span>{entry.cat}</span>
                  </span>
                  <span className="search-result__price">{money(entry.price)}</span>
                  <span className="search-result__arrow">↗</span>
                </button>
              ))
            )}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {entries.length} resultado{entries.length === 1 ? "" : "s"} encontrado
            {entries.length === 1 ? "" : "s"}
          </p>
          <p className="search-hint">
            Dica: tente “salmão”, “cream cheese” ou “combo”.
          </p>
        </div>
      </div>

      <div
        className={`toast${toast ? " is-visible" : ""}`}
        id="toast"
        role="status"
        aria-live="polite"
      >
        <span className="toast__icon">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="toast__text">{toast ?? "Adicionado ao carrinho"}</span>
      </div>
    </>
  );
}
