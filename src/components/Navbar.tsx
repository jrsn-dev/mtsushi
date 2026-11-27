"use client";

import { Search, ShoppingBag, X, Menu, ArrowRight } from "lucide-react";

import { useStore } from "@/components/StoreProvider";

export default function Navbar() {
  const { count, panel, openPanel, togglePanel } = useStore();

  return (
    <div className="home-navbar-frame">
    <header className="navbar" id="navbar">
      <a className="brand brand--original" href="#inicio" aria-label="MTSUSHI ARTE — início">
        <img className="navbar__logo" src="/images/mt-sushi-logo-static.svg" width={1575} height={401} alt="MTSUSHI ARTE" decoding="async" />
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
          <Search aria-hidden="true" />
        </button>
        <button
          className="cart-btn"
          id="cartBtn"
          aria-label="Abrir carrinho"
          aria-expanded={panel === "cart"}
          aria-controls="cartDrawer"
          onClick={() => openPanel("cart")}
        >
          <ShoppingBag aria-hidden="true" />
          <span className="cart-count" data-cart-count>
            {count}
          </span>
        </button>
        <a className="btn btn--red btn--sm nav-cta" href="#delivery">
          Pedir agora <span className="btn__arrow" aria-hidden="true"><ArrowRight aria-hidden="true" size="1em" style={{ display: "inline-block", verticalAlign: "-0.1em" }} /></span>
        </a>
        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label={panel === "menu" ? "Fechar menu" : "Abrir menu"}
          aria-expanded={panel === "menu"}
          aria-controls="mobileMenu"
          onClick={() => togglePanel("menu")}
        >
          {panel === "menu" ? <X aria-hidden="true" /> : <Menu aria-hidden="true" /> }
        </button>
      </div>
    </header>
    </div>
  );
}
