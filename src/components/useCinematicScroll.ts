import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function useCinematicScroll(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const page = scope.current;
    if (!page) return;
    const media = gsap.matchMedia();

    media.add({
      desktop: "(min-width: 900px) and (min-height: 650px) and (hover: hover) and (pointer: fine)",
      motion: "(prefers-reduced-motion: no-preference)",
      portrait: "(orientation: portrait)",
    }, (context) => {
      if (!context.conditions?.motion) return;

      const desktop = Boolean(context.conditions.desktop);
      page.dataset.cinematic = desktop ? "desktop" : "mobile";
      if (desktop) gsap.set(".hero-logo-reveal", { opacity: 1 });
      // Hero and macro pin only on desktop. The gallery also pins on touch screens.
      const pinScene = (selector: string) => desktop ? selector : false;

      const title = SplitText.create("#hero-title", { type: "lines,chars" });
      gsap.from(title.lines, {
        y: 96, autoAlpha: 0, rotationX: -18, transformPerspective: 1100,
        duration: 1.15, stagger: .1, ease: "expo.out",
      });
      // Objects fly into the frame from opposing sides and settle into the
      // actual layout. These are entrance tweens, not scroll blockers.
      gsap.from(".hero-image", {
        x: () => Math.min(240, window.innerWidth * .22), y: 90,
        rotationY: -15, scale: .78,
        transformPerspective: 1200, duration: 1.4, delay: .08,
        ease: "expo.out", clearProps: "transform",
      });
      gsap.from(".eyebrow, .hero-support > *", {
        x: -90, y: 52, autoAlpha: 0, rotationY: 9,
        duration: 1.0, stagger: .095, delay: .3,
        ease: "power4.out", clearProps: "transform,opacity,visibility",
      });
      gsap.from(".hero-flight-chip", {
        x: (index: number) => [190, 145, -110][index] ?? 130,
        y: (index: number) => [-90, 95, 150][index] ?? 85,
        rotationY: (index: number) => [24, -19, 16][index] ?? 16,
        rotationX: -13, scale: .55, autoAlpha: 0,
        transformPerspective: 1200,
        duration: 1.45, stagger: .15, delay: .42,
        ease: "expo.out", clearProps: "transform,opacity,visibility",
      });
      // Reserve the hero's scroll space so the next section pushes the revealed
      // logo upward in normal flow instead of overlaying it.
      const exit = gsap.timeline({
        scrollTrigger: { trigger: ".hero", start: "top top", end: desktop ? "+=82%" : "+=42%", pin: pinScene(".hero-scene"), pinSpacing: desktop, scrub: desktop ? .25 : .15, invalidateOnRefresh: true },
      });
      exit.to(".hero-support, .eyebrow", { opacity: 0, duration: .3 }, 0)
        .to(title.chars, { opacity: 0, y: -12, duration: .32, stagger: { amount: .14, from: "start" } }, .16)
        .fromTo(".hero-image img", { scale: 1 }, { scale: desktop ? 1.1 : 1.03, duration: .6, ease: "sine.inOut" }, .16)
        .to(".hero-image, .hero-shade", { opacity: 0, duration: .32, ease: "sine.inOut" }, .36)
        .to(".hero-copy", { opacity: 0, duration: .08 }, .68);
      if (!desktop) {
        exit.fromTo(".hero-svg-cutout", { opacity: 0 }, { opacity: 1, duration: .08, ease: "none" }, .34)
          .fromTo(".hero-logo-reveal", { opacity: 0 }, { opacity: 1, duration: .25, ease: "sine.out" }, .6)
          .to(".hero-svg-cutout", { opacity: 0, duration: .25, ease: "sine.inOut" }, .68)
          .to(".hero-logo-reveal", { opacity: 1, duration: .07 }, .93);
      } else {
        // Preserve the hero's scroll timing without animating the desktop logo.
        exit.to({}, { duration: .24 }, .76);
      }

      const macro = gsap.timeline({
        scrollTrigger: { trigger: ".macro", start: "top top", end: desktop ? "+=90%" : "+=45%", pin: pinScene(".macro-scene"), pinSpacing: desktop, scrub: desktop ? .28 : .12, invalidateOnRefresh: true },
      });
      gsap.from(".macro-image", {
        x: desktop ? 160 : 60, y: 75, scale: .86, rotationY: -12,
        transformPerspective: 1200, opacity: .45,
        duration: 1.15, ease: "power4.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".macro", start: "top 87%", once: true },
      });
      macro.fromTo(".macro-image img", { scale: desktop ? 1.04 : 1 }, { scale: desktop ? 1.22 : 1.045, xPercent: desktop ? -3 : 0, duration: 1, ease: "none" }, 0)
        .from(".callout-line", { scaleX: 0, stagger: .12, duration: .19, ease: "power3.out" }, .13)
        .from(".callouts li > span:last-child", {
          x: (index: number) => (index % 2 ? 105 : -95), y: 55,
          opacity: 0, rotationY: (index: number) => (index % 2 ? -18 : 18),
          scale: .8, transformPerspective: 900, stagger: .12, duration: .22,
        }, .14);

      const track = page.querySelector<HTMLElement>(".gallery-track");
      const windowElement = page.querySelector<HTMLElement>(".gallery-window");
      const gallerySection = page.querySelector<HTMLElement>(".gallery-section");
      const galleryScene = page.querySelector<HTMLElement>(".gallery-scene");
      const menuSection = page.querySelector<HTMLElement>(".menu-section");
      if (track && windowElement && gallerySection && galleryScene) {
        const travel = () => Math.max(0, track.offsetWidth - windowElement.clientWidth);
        if (travel() > 0) {
          gallerySection.dataset.scrollControlled = "";
          gsap.to(track, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: gallerySection,
              start: "top top",
              end: () => `+=${Math.max(1, Math.round(travel() * .65))}`,
              pin: galleryScene,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // The cards arrive in perspective while the gallery moves, instead
      // of appearing already arranged as a static horizontal strip.
      if (desktop && gallerySection) {
        const galleryPictures = gsap.utils.toArray<HTMLElement>(".gallery-track figure .photo");
        gsap.from(galleryPictures, {
          x: (index: number) => index % 2 ? 130 : -140,
          y: (index: number) => 60 + index * 7,
          rotateY: (index: number) => index % 2 ? -18 : 18,
          rotateX: 9, scale: .78, autoAlpha: 0,
          transformPerspective: 1300, stagger: .07,
          duration: 1.2, ease: "expo.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: gallerySection, start: "top 85%", once: true },
        });
      }
      if (!desktop && gallerySection) {
        gsap.from(".gallery-track figure .photo", {
          x: 85, y: 52, scale: .86, autoAlpha: 0,
          duration: 1.0, stagger: .055, ease: "power4.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: gallerySection, start: "top 88%", once: true },
        });
      }

      const menu = page.querySelector<HTMLElement>(".menu-overview");
      if (menu && desktop) {
        const grid = menu.querySelector<HTMLElement>(".menu-grid")!;
        const chips = menu.querySelector<HTMLElement>(".menu-chips")!;
        const cards = grid.querySelectorAll(".menu-card");
        // Distinct cards fly in from left / behind / right, then compose
        // their original three-column layout without changing hit targets.
        const align = gsap.timeline({
          scrollTrigger: {
            trigger: menuSection ?? menu,
            start: "top 96%", end: "top 25%",
            scrub: .22, invalidateOnRefresh: true,
          },
        });
        align.fromTo(cards,
          { x: (index: number) => (index - 1) * 175, y: (index: number) => 110 + index * 24,
            scale: .72, rotationY: (index: number) => (1 - index) * 20,
            rotationX: 12, opacity: .24, transformPerspective: 1100 },
          { x: 0, y: 0, scale: 1, rotationY: 0, rotationX: 0,
            opacity: 1, duration: 1, ease: "none" }, 0)
          .fromTo(chips, { y: 65, opacity: .25 }, { y: 0, opacity: 1, duration: .8 }, .15);
      }

      if (menu && !desktop) {
        // Stacked mobile cards cannot fit in the desktop's single pinned viewport.
        menu.querySelectorAll(".menu-card").forEach((card, index) => {
          gsap.from(card, {
            x: index % 2 ? 72 : -72, y: 85, scale: .83,
            rotationY: index % 2 ? -13 : 13, autoAlpha: 0,
            transformPerspective: 900, duration: 1.0,
            ease: "expo.out", clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          });
        });
      }

      // Animate content inside the scenes, leaving pinned containers and their
      // scroll-driven transforms under the existing timelines' control.
      const site = page.closest(".site") ?? page;
      site.querySelectorAll<HTMLElement>([
        ".macro-title", ".gallery-scene .section-heading",
        ".menu-overview .section-heading", ".chef-copy", ".chef-panel > .photo",
        ".testimonials-heading", ".delivery-copy", ".delivery-map",
      ].join(",")).forEach((content, index) => {
        gsap.from(content, {
          x: index % 2 ? 115 : -95, y: 65, scale: .89,
          rotationY: index % 2 ? -12 : 12, autoAlpha: 0,
          transformPerspective: 1000, duration: 1.1, ease: "expo.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: content, start: "top 92%", once: true },
        });
      });

      return () => {
        delete page.dataset.cinematic;
        if (gallerySection) delete gallerySection.dataset.scrollControlled;
        title.revert();
      };
    }, page);
    return () => media.revert();
  }, [scope]);
}
