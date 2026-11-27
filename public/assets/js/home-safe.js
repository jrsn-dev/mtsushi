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
    el, lane: Math.random(), gap: 18 + Math.random() * 90,
    rot: Number(el.dataset.rot || 0)
  })) : [];
  const activeLinks = Array.from(document.querySelectorAll(".nav-link"));
  const targets = activeLinks.map(link => ({link, section: document.getElementById(link.hash.slice(1))})).filter(item => item.section);
  let width = 0, height = 0, travel = 1, offset = 0, lastScroll = window.scrollY, frame = 0;
  function measure() {
    width = stage?.clientWidth || 0;
    height = window.innerHeight;
    const oldTravel = travel;
    let cursor = 0;
    for (const piece of pieces) {
      piece.w = piece.el.offsetWidth;
      piece.h = piece.el.offsetHeight;
      const r = piece.rot * Math.PI / 180;
      piece.halfX = (Math.abs(Math.cos(r)) * piece.w + Math.abs(Math.sin(r)) * piece.h) / 2;
      piece.halfY = (Math.abs(Math.sin(r)) * piece.w + Math.abs(Math.cos(r)) * piece.h) / 2;
      // Individual visual heights and random gaps, rather than equal slots.
      piece.centerY = cursor + piece.halfY;
      cursor += piece.halfY * 2 + piece.gap;
    }
    travel = Math.max(1, height + 64, cursor);
    offset = oldTravel > 1 ? offset * travel / oldTravel : -Math.min(60, pieces[0]?.halfY || 0);
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
      // Clamp the actual rotated right edge. Oversized pieces may bleed
      // out to the left, never into the content or against the right clip.
      const right = width - 8 - p.halfX;
      const left = Math.min(p.halfX + 8, right);
      const center = left + (right - left) * p.lane;
      const inset = Math.min(18, width * .06) * p.lane;
      const x = center - inset - p.w / 2;
      const y = ((p.centerY + offset + p.halfY) % travel + travel) % travel - p.halfY * 2;
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
