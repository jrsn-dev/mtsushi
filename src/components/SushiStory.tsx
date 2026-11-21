"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SushiStory.css";

gsap.registerPlugin(ScrollTrigger);

type Piece = { name: string; japanese: string; description: string; image: string; note: string };
const pieces: Piece[] = [
  { name: "Salmão", japanese: "鮭", description: "Salmão fresco, preparado à mão para valorizar o corte e a textura.", image: "jyo-salmao", note: "Corte diário" },
  { name: "Uramaki", japanese: "巻", description: "Arroz no ponto, nori e um equilíbrio de sabores a cada mordida.", image: "uramakis-hd", note: "Arroz no ponto" },
  { name: "Hot roll", japanese: "熱", description: "Crocância por fora, intensidade e sabor no interior.", image: "hot-roll-salmao", note: "Crocante" },
  { name: "Temaki", japanese: "手", description: "Nori crocante e ingredientes frescos, preparados na hora.", image: "temakis-hd", note: "Feito à mão" },
  { name: "Jyo", japanese: "上", description: "Peças delicadas, finalizadas com atenção a cada detalhe.", image: "jyos-2", note: "Arte em cada peça" },
  { name: "Combinado", japanese: "鮨", description: "Uma seleção da casa para transformar a refeição em experiência.", image: "pecas", note: "Para compartilhar" },
];

export default function SushiStory() {
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const [hasMotion, setHasMotion] = useState(false);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const stage = node.querySelector<HTMLElement>(".mt-story-stage");
    if (!stage) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    setHasMotion(true);
    const ctx = gsap.context(() => {
      const heroTitle = node.querySelector(".mt-story-title");
      const heroFood = node.querySelector(".mt-story-hero-food");
      const intro = node.querySelector(".mt-story-intro");
      const caption = node.querySelector(".mt-story-caption");
      const heading = node.querySelector(".mt-story-detail-title");
      const details = node.querySelector(".mt-story-details");
      const controls = node.querySelector(".mt-story-controls");
      const images = gsap.utils.toArray<HTMLElement>(".mt-story-piece", node);
      const spread = [
        [-.29, -.19, -15, .95],
        [.29, -.23, 12, .84],
        [-.06, -.07, -18, .75],
        [.20, .15, 18, .85],
        [-.29, .18, -10, .78],
        [.01, .28, 8, .7],
      ];
      const offsets = () => ({
        w: stage.clientWidth,
        h: stage.clientHeight,
        unit: Math.min(stage.clientWidth, stage.clientHeight),
      });
      gsap.set(images, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: .35 });
      gsap.set([caption, heading, details, controls], { autoAlpha: 0 });
      gsap.set(heroFood, { xPercent: -50, yPercent: -50 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: node, start: "top top", end: () => "+=" + Math.round(window.innerHeight * 4.5),
          scrub: .55, pin: stage, pinSpacing: true, anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      // 0–1: pause on the hero and its layered photography.
      tl.to({}, { duration: .75 })
        .to([heroTitle, intro], { yPercent: -115, autoAlpha: 0, duration: .7 }, .75)
        .to(heroFood, { y: () => -offsets().h * .78, scale: .7, autoAlpha: 0, duration: .9 }, .83)
        // 1–2: independent parallax entrances of six photographed pieces.
        .to(images, {
          autoAlpha: 1, scale: (i) => spread[i][3],
          x: (i) => spread[i][0] * offsets().w,
          y: (i) => spread[i][1] * offsets().h,
          rotation: (i) => spread[i][2],
          duration: 1.1, stagger: .06,
        }, 1.23)
        .fromTo(caption, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .45 }, 1.75)
        .to({}, { duration: .6 })
        // 2–3: pieces converge into a compact central vertical sequence.
        .to(caption, { y: -55, autoAlpha: 0, duration: .33 }, 2.85)
        .to(images, {
          x: 0, y: (i) => (i - 2.5) * Math.min(75, offsets().h * .105),
          scale: .32, rotation: 0, duration: .9, stagger: .015,
        }, 3.02)
        .to({}, { duration: .35 })
        // 3–4: first ingredient expands while the others become miniatures.
        .to(images.slice(1), { y: () => offsets().h * .39, x: (i) => (i - 2) * Math.min(72, offsets().w * .12), scale: .24, duration: .72 }, 4.1)
        .to(images[0], { y: () => -offsets().h * .025, x: 0, scale: 1.48, rotation: 0, duration: .85 }, 4.1)
        .fromTo(heading, { y: 65, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .5 }, 4.45)
        .fromTo([details, controls], { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .45, stagger: .12 }, 4.68)
        .to({}, { duration: 1.05 });
      return () => tl.kill();
    }, node);
    return () => { ctx.revert(); };
  }, []);

  return (
    <section className="mt-story" ref={root} id="experiencia" aria-label="Experiência MT Sushi Arte">
      <div className="mt-story-stage">
        <div className="mt-story-head">
          <p className="mt-story-kicker">MT Sushi Arte <span>·</span> Jacarezinho, PR</p>
          <a href="/cardapio" className="mt-story-order">Fazer pedido <span aria-hidden="true">↗</span></a>
        </div>
        <div className="mt-story-title-block">
          <h1 className="mt-story-title">MT SUSHI<span>ARTE</span></h1>
          <div className="mt-story-hero-food" aria-hidden="true">
            <img src="/images/cardapio/uramakis-hd.webp" alt="" fetchPriority="high" />
          </div>
        </div>
        <div className="mt-story-intro">
          <p>Uma experiência, peça por peça.</p>
          <div className="mt-story-numbers"><span><b>01</b> Frescor</span><span><b>06</b> Escolhas</span></div>
          <span className="mt-story-hint">Role para descobrir ↓</span>
        </div>
        <div className="mt-story-orbit" aria-label="Seis seleções da MT Sushi Arte">
          {pieces.map((item, index) => (
            <figure className={"mt-story-piece mt-story-piece-" + index} key={item.name}>
              <img src={"/images/cardapio/" + (index === 0 ? pieces[selected].image : item.image) + ".webp"} alt={item.name} loading={index < 3 ? "eager" : "lazy"} />
            </figure>
          ))}
        </div>
        <p className="mt-story-caption"><strong>Seis peças.</strong><br/>Cada detalhe, uma arte.</p>
        <h2 className="mt-story-detail-title">{pieces[selected].name}</h2>
        <div className="mt-story-details">
          <div><span className="mt-story-kanji">{pieces[selected].japanese}</span><p>{pieces[selected].description}</p></div>
          <div className="mt-story-detail-note"><b>MT</b><span>Arte em cada peça</span></div>
        </div>
        <div className="mt-story-controls" aria-label="Explore as peças">
          {pieces.map((item, index) => <button key={item.name} type="button" aria-label={"Ver " + item.name}
            className={selected === index ? "is-active" : ""} onClick={() => setSelected(index)}>
            <img src={"/images/cardapio/" + item.image + ".webp"} alt="" />
          </button>)}
          <div className="mt-story-selected" aria-live="polite"><strong>{pieces[selected].name}</strong><span>{pieces[selected].note}</span></div>
          <a href="/cardapio">Ver cardápio ↗</a>
        </div>
        {!hasMotion && <div className="mt-story-fallback"><p>Conheça a arte de cada peça.</p><a href="/cardapio">Explorar cardápio ↗</a></div>}
      </div>
    </section>
  );
}
