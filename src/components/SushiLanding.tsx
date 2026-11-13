"use client";

import { useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Facebook, Instagram, Menu, MessageCircle, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { BusinessHours } from "./BusinessHours";
import { useCinematicScroll } from "./useCinematicScroll";
import { ChefSpecial } from "./SushiExperiments";
import { SushiDelivery } from "./SushiDelivery";
import { SushiTestimonials } from "./SushiTestimonials";
import { SushiMenu, Photo, gallery, type OrderLink } from "./SushiMenu";

const instagram = "https://www.instagram.com/mtsushiarte/";
const direct = "https://ig.me/m/mtsushiarte";
const nav = [["Experiência", "#experiencia"], ["Cardápio", "#cardapio"], ["Depoimentos", "#depoimentos"], ["Delivery", "#reservas"]];
const ingredients = [
  ["Salmão fresco", "Corte diário"],
  ["Arroz no ponto", "Vinagre de arroz"],
  ["Nori crocante", ""],
  ["Gergelim tostado", ""],
];

export default function SushiLanding({ whatsapp, facebook }: { whatsapp: string; facebook: string }) {
  const order: OrderLink = (subject) => whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de ${subject} na MT Sushi Arte.`)}`
    : direct;
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const direction = useRef({ up: true, start: 0 });
  const main = useRef<HTMLElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  useCinematicScroll(main);

  useMotionValueEvent(scrollY, "change", (y) => {
    const up = y < (scrollY.getPrevious() ?? y);
    if (direction.current.up !== up) direction.current = { up, start: y };
    if (y < 90) setHidden(false);
    else if (Math.abs(y - direction.current.start) > 16) setHidden(!up);
  });

  return (
    <div className="site">
      <a className="skip-link" href="#inicio">Pular para o conteúdo</a>
      <motion.header className="header" animate={{ y: hidden && !menuOpen && !reduce ? "-105%" : "0%" }}
        transition={{ duration: reduce ? 0 : .32, ease: [.22, 1, .36, 1] }}
        onFocusCapture={() => setHidden(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuToggle.current?.focus();
          }
        }}>
        <div className="shell header-inner">
          <a className="brand" href="#inicio" onClick={() => setMenuOpen(false)} aria-label="MT Sushi Arte">
            <img src="/images/mt-sushi-logo.svg" alt="" width="1575" height="401" />
          </a>
          <nav id="navigation" aria-label="Navegação principal" className={menuOpen ? "nav is-open" : "nav"}>
            {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <a className="button button-outline header-order" href="/cardapio">
            Fazer pedido <ArrowUpRight aria-hidden="true" />
          </a>
          <button ref={menuToggle} type="button" className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      <main ref={main} id="inicio">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-scene">
            <Photo image="hero" alt="Uramaki de salmão com gergelim sobre prato preto" priority className="hero-image" />
            <div className="hero-shade" />
            <div className="shell hero-copy">
              <p className="mono eyebrow">Jacarezinho, PR <span /> Somente delivery</p>
              <div className="hero-title-wrap"><h1 id="hero-title">Sushi que se vê,<br />se sente,<br />se lembra.</h1></div>
              <div className="hero-support">
                <p>Sushis, temakis e combinados preparados à mão.</p>
                <BusinessHours />
                <a className="button button-red" href="/cardapio">Ver cardápio <ArrowDown aria-hidden="true" /></a>
              </div>
            </div>
            <span className="hero-ring" aria-hidden="true" />
          </div>
        </section>

        <section className="macro" id="experiencia" aria-labelledby="macro-title">
          <div className="macro-scene">
            <Photo image="macro" alt="Corte de um uramaki com salmão, arroz, nori e gergelim" className="macro-image" />
            <div className="shell macro-inner">
              <div className="macro-title"><h2 id="macro-title">De perto.</h2></div>
              <ul className="callouts">
                {ingredients.map(([name, detail], index) => (
                  <li key={name} style={{ "--callout": index } as CSSProperties}>
                    <span className="callout-line" aria-hidden="true" />
                    <span>{name}{detail && <small>{detail}</small>}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="gallery-section" aria-labelledby="gallery-title">
          <div className="gallery-scene">
            <div className="shell section-heading"><div><h2 id="gallery-title">À mesa.</h2></div>
            </div>
            <div className="gallery-window" tabIndex={0} aria-label="Galeria de pratos">
              <div className="gallery-track">
                {gallery.map(({ image, name }, index) => (
                  <figure key={name}><Photo image={image} alt={name} /><figcaption><span>{String(index + 1).padStart(2, "0")}</span>{name}</figcaption></figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SushiMenu />
        <ChefSpecial />
        <SushiTestimonials href={order("deixar um depoimento")} />
      </main>

      <footer className="reservations" id="reservas">
        <SushiDelivery order={order} />
        <div className="shell footer-line">
          <a className="brand" href="#inicio" aria-label="Voltar ao início">
            <img src="/images/mt-sushi-logo.svg" alt="MT Sushi Arte" width="1575" height="401" />
          </a>
          <div className="footer-socials" role="group" aria-label="Redes sociais">
            <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram aria-hidden="true" /></a>
            {facebook ? (
              <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook aria-hidden="true" /></a>
            ) : (
              <span role="img" aria-label="Facebook indisponível" title="Facebook indisponível"><Facebook aria-hidden="true" /></span>
            )}
            <a href={`https://wa.me/${whatsapp || "5543999268358"}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle aria-hidden="true" />
            </a>
          </div>
          <a className="footer-credit" href="https://fluidy.site" target="_blank" rel="noreferrer">
            <span>Desenvolvido por</span>
            <img src="/images/fluidy-logo.svg" alt="Fluidy" width="1027" height="289" />
          </a>
        </div>
      </footer>
    </div>
  );
}
