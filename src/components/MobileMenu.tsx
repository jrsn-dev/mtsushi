"use client";

import { useRef } from "react";
import { useStore } from "@/components/StoreProvider";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { site } from "@/lib/site";

const socials = [
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: site.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 21v-7h2.6l.4-3H14V9.2c0-.9.3-1.5 1.6-1.5H17V5.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v7H14Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${site.whatsapp}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 8.5c.3 2.8 1.7 4.6 4.4 5.4l1-1.4 1.8.7c-.2 1.6-1.1 2.3-2.5 2.3-3.2-.2-5.8-2.8-6.1-6.2 0-1.2.8-2 2.2-2.1l.6 1.8L9 8.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
].filter((social) => social.href);

export default function MobileMenu() {
  const { panel, closePanels } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const open = panel === "menu";

  useFocusTrap(open, ref, closePanels);

  return (
    <div
      className={`mobile-menu${open ? " is-open" : ""}`}
      id="mobileMenu"
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      inert={!open}
      ref={ref}
    >
      <div className="mobile-menu__top">
        <span className="mobile-menu__label">MTSUSHI ARTE</span>
        <button
          className="icon-btn mobile-menu__close"
          onClick={closePanels}
          aria-label="Fechar menu"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <nav className="mobile-menu__links" aria-label="Menu mobile">
        <a href="#inicio" onClick={closePanels}>
          <span>01</span>Início
        </a>
        <a href="#cardapio" onClick={closePanels}>
          <span>02</span>Cardápio
        </a>
        <a href="#combos" onClick={closePanels}>
          <span>03</span>Combos
        </a>
        <a href="#arte" onClick={closePanels}>
          <span>04</span>Nossa arte
        </a>
        <a href="#delivery" onClick={closePanels}>
          <span>05</span>Delivery
        </a>
        <a href="#contato" onClick={closePanels}>
          <span>06</span>Contato
        </a>
      </nav>
      <div className="mobile-menu__foot">
        <p>
          {site.address.street} — {site.address.city}
        </p>
        <p>Seg–Sex · 18h às 23h</p>
        <div className="socials">
          {socials.map((social) => (
            <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener">
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
