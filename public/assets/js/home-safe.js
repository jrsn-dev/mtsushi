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
    el, lane: Math.random(), spacing: Math.random(),
    rot: Number(el.dataset.rot || 0) + (Math.random() - .5) * 22,
    phase: Math.random() * Math.PI * 2, floatRate: .25 + Math.random() * .3,
    sway: 5 + Math.random() * 10,
    elastic: 0, elasticVelocity: 0, spring: 72 + Math.random() * 30,
    damping: 8 + Math.random() * 3, bounceGain: .65 + Math.random() * .35
  })) : [];
  // Shuffle the silhouettes once per visit.
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }
  const activeLinks = Array.from(document.querySelectorAll(".nav-link"));
  const targets = activeLinks.map(link => ({link, section: document.getElementById(link.hash.slice(1))})).filter(item => item.section);
  let width = 0, height = 0, travel = 1, offset = 0, desiredOffset = 0;
  let lastScroll = window.scrollY, frame = 0, previousTime = 0, time = 0, overscan = 0;
  let scrollVelocity = 0, lastMotion = -1, releaseSpeed = 0, bounceStart = -10, bounceStrength = 0;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const easeIn = t => t * t;
  function easeOutBounce(t) {
    const n = 7.5625, d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) { t -= 1.5 / d; return n * t * t + .75; }
    if (t < 2.5 / d) { t -= 2.25 / d; return n * t * t + .9375; }
    t -= 2.625 / d; return n * t * t + .984375;
  }
  function measure() {
    width = stage?.clientWidth || 0;
    height = window.innerHeight;
    const oldTravel = travel;
    let maxHalf = 0;
    for (const piece of pieces) {
      piece.w = piece.el.offsetWidth;
      piece.h = piece.el.offsetHeight;
      const r = piece.rot * Math.PI / 180;
      piece.halfY = (Math.abs(Math.sin(r)) * piece.w + Math.abs(Math.cos(r)) * piece.h) / 2;
      maxHalf = Math.max(maxHalf, Math.hypot(piece.w, piece.h) / 2);
    }
    // Irregular spacing with more breathing room between silhouettes.
    let cursor = 0;
    pieces.forEach((piece, index) => {
      piece.centerY = cursor;
      const next = pieces[(index + 1) % pieces.length];
      cursor += Math.max(42, (piece.halfY + next.halfY) * (.78 + piece.spacing * .30));
    });
    overscan = maxHalf + 30;
    travel = Math.max(1, height + overscan * 2, cursor);
    const stretch = cursor ? travel / cursor : 1;
    pieces.forEach(p => { p.centerY *= stretch; });
    if (oldTravel > 1) {
      offset *= travel / oldTravel;
      desiredOffset *= travel / oldTravel;
    } else {
      offset = desiredOffset = overscan + height * .07;
    }
  }
  function updateNavigation() {
    const scroll = window.scrollY;
    navbar?.classList.toggle("is-scrolled", scroll > 40);
    if (progress) progress.style.transform = "scaleY(" + Math.min(1, scroll / Math.max(1, doc.scrollHeight - window.innerHeight)) + ")";
    let active = targets[0];
    for (const item of targets) if (item.section.getBoundingClientRect().top <= window.innerHeight * .45) active = item;
    for (const item of targets) item.link.classList.toggle("is-active", item === active);
  }
  function render(now = performance.now()) {
    const dt = previousTime ? Math.min(.05, Math.max(0, (now - previousTime) / 1000)) : 1 / 60;
    previousTime = now;
    const scroll = window.scrollY;
    if (!reduced) {
      time += dt;
      const delta = scroll - lastScroll;
      const rawVelocity = clamp(delta / Math.max(dt, .001), -2400, 2400);
      scrollVelocity += (rawVelocity - scrollVelocity) * (1 - Math.exp(-dt * 12));
      if (Math.abs(delta) > .05) {
        lastMotion = time;
        releaseSpeed = scrollVelocity;
      } else if (lastMotion >= 0 && time - lastMotion >= .12) {
        bounceStart = time;
        bounceStrength = clamp(releaseSpeed * .018, -8, 8);
        lastMotion = -1;
      }
      // Ease-in only on decorative drift; scroll stays responsive.
      desiredOffset += delta * .36 + dt * 9 * easeIn(Math.min(1, time / 1.4));
      offset += (desiredOffset - offset) * (1 - Math.exp(-dt * 7));
      if (Math.abs(offset) > travel * 8) {
        const shift = Math.trunc(offset / travel) * travel;
        offset -= shift;
        desiredOffset -= shift;
      }
    }
    lastScroll = scroll;
    for (const p of pieces) {
      const wave = reduced ? 0 : Math.sin(time * p.floatRate + p.phase);
      let springOffset = 0, bounce = 0;
      if (!reduced) {
        const target = clamp(scrollVelocity * -.012, -11, 11);
        // Small integration steps keep the damped elastic response stable.
        const steps = Math.max(1, Math.ceil(dt * 120));
        const step = dt / steps;
        for (let i = 0; i < steps; i++) {
          p.elasticVelocity += ((target - p.elastic) * p.spring - p.elasticVelocity * p.damping) * step;
          p.elastic += p.elasticVelocity * step;
        }
        springOffset = clamp(p.elastic, -14, 14);
        const t = clamp((time - bounceStart) / .65, 0, 1);
        bounce = bounceStrength * p.bounceGain * Math.min(1, t / .1) * (1 - easeOutBounce(t));
      }
      const rot = p.rot + wave * 5 + springOffset * .18;
      const r = rot * Math.PI / 180;
      const halfX = (Math.abs(Math.cos(r)) * p.w + Math.abs(Math.sin(r)) * p.h) / 2;
      const right = width - 10 - halfX;
      const left = Math.min(halfX + 4, right - Math.min(width * .3, 65));
      const center = Math.min(right, left + (right - left) * p.lane + wave * p.sway);
      const x = center - p.w / 2;
      const centerY = ((p.centerY + offset) % travel + travel) % travel - overscan;
      const y = centerY - p.h / 2 + wave * 5 + springOffset + bounce;
      p.el.style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0) rotate(" + rot.toFixed(2) + "deg)";
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
  window.addEventListener("pagehide", () => { cancelAnimationFrame(frame); frame = 0; });
  window.addEventListener("pageshow", event => { if (event.persisted && !reduced && !frame) { previousTime = 0; frame = requestAnimationFrame(render); } });
})();
