"use client";

import { useStore } from "@/components/StoreProvider";

export default function Navbar() {
  const { count, panel, openPanel, togglePanel } = useStore();

  return (
    <header className="navbar" id="navbar">
      <a className="brand" href="#inicio" aria-label="MTSUSHI ARTE — início">
        <span className="brand__seal">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path
              d="M7 12.8c5.8-1.7 12.1-2.5 17-2.5s11.2.8 17 2.5"
              stroke="currentColor"
              strokeWidth="3.1"
              strokeLinecap="round"
            />
            <path
              d="M10.4 18.7c4.6-.9 9.4-1.4 13.6-1.4s9 .5 13.6 1.4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M14.2 19.6 15.7 38M33.8 19.6 32.3 38"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M21.2 20.4v8.4M26.8 20.4v8.4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity=".8"
            />
          </svg>
        </span>
        <span className="brand__type">
          <strong>MTSUSHI</strong>
          <span>ARTE</span>
        </span>
      </a>

      <nav className="nav-links" aria-label="Navegação principal">
        <a className="nav-link is-active" href="#inicio">
          Início
        </a>
        <a className="nav-link" href="#cardapio">
          Cardápio
        </a>
        <a className="nav-link" href="#combos">
          Combos
        </a>
        <a className="nav-link" href="#arte">
          Nossa arte
        </a>
        <a className="nav-link" href="#contato">
          Contato
        </a>
      </nav>

      <div className="nav-actions">
        <button
          className="icon-btn"
          id="searchBtn"
          aria-label="Buscar no cardápio"
          aria-expanded={panel === "search"}
          aria-controls="searchPanel"
          onClick={() => togglePanel("search")}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="cart-btn"
          id="cartBtn"
          aria-label="Abrir carrinho"
          aria-expanded={panel === "cart"}
          aria-controls="cartDrawer"
          onClick={() => openPanel("cart")}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5.5 8.5h13l-1 11h-11l-1-11Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="cart-count" data-cart-count>
            {count}
          </span>
        </button>
        <a className="btn btn--red btn--sm nav-cta" href="#delivery">
          Pedir agora <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label={panel === "menu" ? "Fechar menu" : "Abrir menu"}
          aria-expanded={panel === "menu"}
          aria-controls="mobileMenu"
          onClick={() => togglePanel("menu")}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
