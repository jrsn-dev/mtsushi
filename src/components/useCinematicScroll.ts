import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function useCinematicScroll(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const page = scope.current;
    if (!page) return;
    const media = gsap.matchMedia();

    media.add({
      desktop: "(min-width: 900px) and (min-height: 650px) and (hover: hover) and (pointer: fine)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      if (!context.conditions?.motion) return;

      if (!context.conditions.desktop) {
        // Touch scrolling stays native. Small transforms run without pins,
        // clipping, blur filters or a second horizontal scroll controller.
        // Numeric scrub interpolates each gesture rather than jumping between frames.
        gsap.fromTo("#hero-title", { y: 10, opacity: .85 },
          { y: 0, opacity: 1, duration: .65, ease: "power2.out" });
        gsap.fromTo(".hero-image img", { scale: 1 }, {
          scale: 1.08, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .65, invalidateOnRefresh: true },
        });
        gsap.fromTo(".macro-image img", { scale: 1 }, {
          scale: 1.12, ease: "none",
          scrollTrigger: { trigger: ".macro", start: "top bottom", end: "bottom top", scrub: .65, invalidateOnRefresh: true },
        });
        gsap.fromTo(".callout-line", { scaleX: .65 }, {
          scaleX: 1, duration: .6, stagger: .08, ease: "none",
          scrollTrigger: { trigger: ".callouts", start: "top 90%", end: "top 62%", scrub: .5, invalidateOnRefresh: true },
        });
        gsap.fromTo(".callouts li > span:last-child", { y: 8, opacity: .75 }, {
          y: 0, opacity: 1, duration: .5, stagger: .08, ease: "none",
          scrollTrigger: { trigger: ".callouts", start: "top 90%", end: "top 62%", scrub: .5, invalidateOnRefresh: true },
        });
        page.querySelectorAll(".menu-card, .chef-panel, .gallery-window").forEach((element) => {
          gsap.fromTo(element, { y: 20, opacity: .82 }, {
            y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: element, start: "top 94%", end: "top 65%", scrub: .55, invalidateOnRefresh: true },
          });
        });
        return;
      }

      page.dataset.cinematic = "desktop";
      const lenis = new Lenis({ anchors: true, smoothWheel: true, lerp: .085, wheelMultiplier: .85 });
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const title = SplitText.create("#hero-title", { type: "lines,chars" });
      gsap.from(title.lines, { y: 24, opacity: 0, duration: .8, stagger: .105, ease: "power3.out" });
      const exit = gsap.timeline({
        scrollTrigger: { trigger: ".hero", start: "top top", end: "+=110%", pin: ".hero-scene", scrub: .65, invalidateOnRefresh: true },
      });
      exit.to(".hero-support, .eyebrow", { opacity: 0, duration: .3 }, 0)
        .to(title.chars, { opacity: 0, y: -12, duration: .32, stagger: { amount: .14, from: "start" } }, .16)
        .fromTo(".hero-ring", { scale: 1.55, opacity: 0 }, { scale: 1, opacity: 1, duration: .19 }, .28)
        .to(".hero-ring", { scale: .01, duration: .55, ease: "sine.inOut" }, .47)
        .to(".hero-image img", { scale: 1.1, duration: .75, ease: "sine.inOut" }, .24)
        .to(".hero-image", { clipPath: "circle(0% at 68% 50%)", duration: .55, ease: "sine.inOut" }, .47)
        .to(".hero-ring, .hero-copy", { opacity: 0, duration: .1 }, .92);

      const macro = gsap.timeline({
        scrollTrigger: { trigger: ".macro", start: "top top", end: "+=130%", pin: ".macro-scene", scrub: .65, invalidateOnRefresh: true },
      });
      macro.fromTo(".macro-image img", { scale: 1.05 }, { scale: 1.28, xPercent: -4, duration: 1, ease: "none" }, 0)
        .from(".callout-line", { scaleX: 0, stagger: .13, duration: .15, ease: "power3.out" }, .12)
        .from(".callouts li > span:last-child", { opacity: 0, y: 8, stagger: .13, duration: .15 }, .17);

      const track = page.querySelector<HTMLElement>(".gallery-track");
      const windowElement = page.querySelector<HTMLElement>(".gallery-window");
      if (track && windowElement) {
        const travel = () => Math.max(0, track.scrollWidth - windowElement.clientWidth);
        gsap.to(track, {
          x: () => -travel(), ease: "none",
          scrollTrigger: { trigger: ".gallery-section", start: "top top", end: () => `+=${travel()}`, pin: ".gallery-scene", scrub: .65, invalidateOnRefresh: true },
        });
      }

      const menu = page.querySelector<HTMLElement>(".menu-overview");
      if (menu) {
        const heading = menu.querySelector<HTMLElement>(".section-heading")!;
        const grid = menu.querySelector<HTMLElement>(".menu-grid")!;
        const chips = menu.querySelector<HTMLElement>(".menu-chips")!;
        const cards = grid.querySelectorAll(".menu-card");
        const stagger = () => Math.min(72, window.innerHeight * .08);
        const headerHeight = () => document.querySelector(".header")?.getBoundingClientRect().height ?? 0;
        const centeredTop = () => {
          const height = heading.offsetHeight + parseFloat(getComputedStyle(heading).marginBottom)
            + grid.offsetHeight + parseFloat(getComputedStyle(chips).marginTop) + chips.offsetHeight;
          return Math.max(headerHeight() + 12, (window.innerHeight + headerHeight() - height) / 2);
        };
        const align = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: menu,
            start: () => `top ${centeredTop()}px`,
            end: () => `+=${stagger() * 2}`,
            pin: true,
            scrub: .65,
            invalidateOnRefresh: true,
          },
        });
        align.fromTo(cards, { y: (index) => index * stagger() }, { y: 0, duration: 1 }, 0)
          .fromTo(chips, { y: () => stagger() * 2 }, { y: 0, duration: 1 }, 0);
      }

      return () => {
        delete page.dataset.cinematic;
        title.revert();
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      };
    }, page);
    return () => media.revert();
  }, [scope]);
}
