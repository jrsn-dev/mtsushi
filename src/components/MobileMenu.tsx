"use client";

import { Instagram, Facebook, MessageCircle, X } from "lucide-react";

import { useRef } from "react";
import { useStore } from "@/components/StoreProvider";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { site } from "@/lib/site";

const socials = [
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: (
      <Instagram aria-hidden="true" />
    ),
  },
  {
    label: "Facebook",
    href: site.social.facebook,
    icon: (
      <Facebook aria-hidden="true" />
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${site.whatsapp}`,
    icon: (
      <MessageCircle aria-hidden="true" />
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
          <X aria-hidden="true" />
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
