/* Native, non-blocking home motion. Never hide the actual page. */
(() => {
  "use strict";
  const doc = document.documentElement;
  doc.classList.remove("js");
  document.body.classList.remove("is-loading");
  const navbar = document.getElementById("navbar");
  const stage = document.getElementById("sushiStage");
  const progress = document.querySelector(".page-progress__bar");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pieces = stage ? Array.from(stage.querySelectorAll(".sushi-piece")).map(el => ({
    el, x: Number(el.dataset.x || 50), start: Number(el.dataset.start || 0),
    rot: Number(el.dataset.rot || 0)
  })) : [];
  const activeLinks = Array.from(document.querySelectorAll(".nav-link"));
  const targets = activeLinks.map(link => ({link, section: document.getElementById(link.hash.slice(1))})).filter(item => item.section);
  let width = 0, height = 0, travel = 1, offset = 0, lastScroll = window.scrollY, frame = 0;
  function measure() {
    width = stage?.clientWidth || 0;
    height = window.innerHeight;
    let max = 0;
    for (const piece of pieces) {
      piece.w = piece.el.offsetWidth;
      piece.h = piece.el.offsetHeight;
      max = Math.max(max, Math.hypot(piece.w, piece.h));
    }
    travel = Math.max(1, height + max, pieces.length * (max + 8));
  }
  function updateNavigation() {
    const scroll = window.scrollY;
    navbar?.classList.toggle("is-scrolled", scroll > 40);
    if (progress) progress.style.transform = "scaleY(" + Math.min(1, scroll / Math.max(1, doc.scrollHeight - window.innerHeight)) + ")";
    let active = targets[0];
    for (const item of targets) if (item.section.getBoundingClientRect().top <= window.innerHeight * .45) active = item;
    for (const item of targets) item.link.classList.toggle("is-active", item === active);
  }
  function render() {
    const scroll = window.scrollY;
    if (!reduced) offset = (offset + (scroll - lastScroll) * .31 + .13) % travel;
    lastScroll = scroll;
    for (const p of pieces) {
      const center = width * p.x / 100;
      const r = p.rot * Math.PI / 180;
      const half = (Math.abs(Math.cos(r)) * p.w + Math.abs(Math.sin(r)) * p.h) / 2;
      const edge = Math.min(width / 2, half + 4);
      const x = Math.max(edge, Math.min(width - edge, center)) - p.w / 2;
      const y = ((p.start * travel + offset) % travel + travel) % travel - (travel - height) / 2 - p.h / 2;
      p.el.style.transform = "translate3d(" + x + "px," + y + "px,0) rotate(" + p.rot + "deg)";
    }
    if (!reduced) frame = requestAnimationFrame(render);
  }
  window.__mtsushi = {
    scrollTo(target) {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - (navbar?.offsetHeight || 76) - 24, behavior: reduced ? "auto" : "smooth"});
    },
    lock() {}
  };
  window.addEventListener("scroll", updateNavigation, {passive: true});
  window.addEventListener("resize", () => { measure(); if (reduced) render(); updateNavigation(); }, {passive: true});
  measure(); updateNavigation(); render();
  window.addEventListener("pagehide", () => cancelAnimationFrame(frame), {once:true});
})();
