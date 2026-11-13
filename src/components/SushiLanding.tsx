"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Instagram, Menu, X } from "lucide-react";
import { useCinematicScroll } from "./useCinematicScroll";
import AnimatedContent from "./react-bits/AnimatedContent";

const instagram = "https://www.instagram.com/mtsushiarte/";
const instagramDirect = "https://ig.me/m/mtsushiarte";

function orderLink(whatsapp: string, subject: string) {
  const message = encodeURIComponent(`Olá! Gostaria de ${subject} na MT Sushi Arte.`);
  return whatsapp ? `https://wa.me/${whatsapp}?text=${message}` : instagramDirect;
}

const navigation = [
  ["Cardápio", "#cardapio"],
  ["Combos", "#combos"],
  ["Instagram", "#instagram"],
  ["Contato", "#contato"],
];

const categories = [
  { name: "Sushis", description: "Sushis artesanais preparados na hora.", image: "sushis", alt: "Uramakis de salmão" },
  { name: "Temakis", description: "Temakis enrolados à mão.", image: "temakis", alt: "Temakis em uma travessa vermelha" },
  { name: "Combos", description: "Seleções de sushi para compartilhar.", image: "combos", alt: "Combinado de sushis e sashimis" },
  { name: "Porções", description: "Acompanhamentos para o seu pedido.", image: "porcoes", alt: "Foto ilustrativa de uma porção de guiozas douradas" },
  { name: "Bebidas", description: "Bebidas para acompanhar o sushi.", image: "bebidas", alt: "Foto ilustrativa de chá gelado em um copo com gelo" },
];

const gallery = [
  { image: "bastidores", alt: "Mesa servida pela MT Sushi Arte" },
  { image: "nigiri", alt: "Nigiri de salmão com hashis" },
  { image: "temakis", alt: "Temakis preparados pela MT Sushi Arte" },
];

function Photo({ image, alt, priority = false, className = "" }: {
  image: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span className={`photo ${className}`} data-frame>
      <img
        src={`/images/${image}.webp`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        data-camera
      />
    </span>
  );
}

export default function SushiLanding({ whatsapp }: { whatsapp: string }) {
  const contactLink = (subject: string) => orderLink(whatsapp, subject);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<(typeof categories)[number] | null>(null);
  const main = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useCinematicScroll(main);

  return (
    <>
      <a className="skip-link" href="#inicio">Pular para o conteúdo</a>
      <header className="header" onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          toggle.current?.focus();
        }
      }}>
        <div className="shell header-inner">
          <a className="brand" href="#inicio" onClick={() => setMenuOpen(false)}>
            <img src="/images/logo.png" alt="MT Sushi Arte" width="279" height="89" />
          </a>
          <nav id="navigation" aria-label="Navegação principal" className={menuOpen ? "nav is-open" : "nav"}>
            {navigation.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <a className="button header-order" href={contactLink("fazer um pedido")} target="_blank" rel="noreferrer">
            Fazer pedido <ArrowUpRight aria-hidden="true" />
          </a>
          <button ref={toggle} type="button" className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main ref={main}>
        <section className="shell hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow"><span className="red-mark" /> Jacarezinho, PR</span>
            <AnimatedContent trigger="mount" distance={12} initialOpacity={0.82} duration={0.65}>
              <h1 id="hero-title">Sushi <span>artesanal.</span></h1>
            </AnimatedContent>
            <p>Temakis, sushis e combos preparados à mão.</p>
            <a className="button button-red" href="#cardapio">
              Ver cardápio <ArrowDownRight aria-hidden="true" />
            </a>
            <a className="scroll-link" href="#cardapio" aria-label="Rolar até o cardápio"><ArrowDown aria-hidden="true" /></a>
          </div>
          <figure className="hero-shot">
            <Photo image="hero-temaki" alt="Close de um temaki recheado com salmão e cebolinha" priority />
          </figure>
        </section>

        <section className="shell section" id="cardapio" aria-labelledby="menu-title">
          <AnimatedContent className="section-heading" distance={18} initialOpacity={0.6} duration={0.7}>
            <h2 id="menu-title">Cardápio</h2>
            <a className="text-link" href={contactLink("consultar o cardápio")} target="_blank" rel="noreferrer">
              Consultar opções <ArrowUpRight aria-hidden="true" />
            </a>
          </AnimatedContent>
          <div className="menu-grid">
            {categories.map((item) => (
              <button className="menu-card" type="button" key={item.name}
                aria-pressed={category === item} aria-controls="category-details"
                onClick={() => setCategory(category === item ? null : item)}>
                <Photo image={item.image} alt={item.alt} className={`menu-photo menu-photo-${item.image}`} />
                <span className="menu-label">{item.name} <ArrowUpRight aria-hidden="true" /></span>
              </button>
            ))}
          </div>
          <p className="menu-note">Imagens ilustrativas. Consulte as opções disponíveis.</p>
          <div id="category-details" aria-live="polite">
            {category && (
              <div className="category-details">
                <p><strong>{category.name}</strong> {category.description}</p>
                <a className="text-link" href={contactLink(`conhecer as opções de ${category.name.toLowerCase()}`)}
                  target="_blank" rel="noreferrer">Consultar {category.name.toLowerCase()} <ArrowUpRight aria-hidden="true" /></a>
              </div>
            )}
          </div>
        </section>

        <section className="shell section combo" id="combos" aria-labelledby="combo-title">
          <Photo image="combos" alt="Combinado com sushis e sashimis de salmão" className="combo-photo" />
          <div className="combo-copy">
            <AnimatedContent distance={18} initialOpacity={0.6} duration={0.7}>
              <h2 id="combo-title">Combos para<br />compartilhar.</h2>
              <a className="button button-red" href={contactLink("conhecer os combos")} target="_blank" rel="noreferrer">
                Consultar combos <ArrowUpRight aria-hidden="true" />
              </a>
            </AnimatedContent>
          </div>
        </section>

        <section className="shell section" id="instagram" aria-labelledby="instagram-title">
          <AnimatedContent className="section-heading" distance={18} initialOpacity={0.6} duration={0.7}>
            <h2 id="instagram-title">Instagram</h2>
            <a className="text-link" href={instagram} target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" /> @mtsushiarte <ArrowUpRight aria-hidden="true" />
            </a>
          </AnimatedContent>
          <div className="gallery">
            {gallery.map((item) => (
              <a key={item.image} href={instagram} target="_blank" rel="noreferrer" aria-label={`${item.alt} no Instagram`}>
                <Photo image={item.image} alt={item.alt} />
              </a>
            ))}
          </div>
        </section>

        <section className="contact section" id="contato" aria-labelledby="contact-title">
          <div className="shell contact-inner">
            <AnimatedContent distance={18} initialOpacity={0.6} duration={0.7}>
              <h2 id="contact-title">Faça seu pedido.</h2>
              <p>Delivery em Jacarezinho, PR</p>
            </AnimatedContent>
            <a className="button button-red" href={contactLink("fazer um pedido")} target="_blank" rel="noreferrer">
              {whatsapp ? "Pedir no WhatsApp" : "Pedir pelo Instagram"} <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <a className="brand" href="#inicio"><img src="/images/logo.png" alt="MT Sushi Arte" width="279" height="89" /></a>
        <a className="text-link" href={instagram} target="_blank" rel="noreferrer"><Instagram aria-hidden="true" /> @mtsushiarte</a>
      </footer>
    </>
  );
}
