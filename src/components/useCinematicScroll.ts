import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

      };
    }, page);
    return () => media.revert();
  }, [scope]);
}
