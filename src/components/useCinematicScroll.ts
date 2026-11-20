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
      const pinScene = (selector: string) => desktop ? selector : false;

      const title = SplitText.create("#hero-title", { type: "lines" });
      gsap.from(title.lines, {
        y: 32, autoAlpha: 0, duration: .65, stagger: .08, ease: "power3.out",
      });

      const hero = page.querySelector<HTMLElement>(".hero-scene");
      const pieces = gsap.utils.toArray<HTMLElement>(".hero-piece", page);
      if (hero && pieces.length) {
        gsap.set(".hero-assembly", { autoAlpha: 1 });
        gsap.set(".hero-combo", { opacity: 0 });
        gsap.set(pieces, { yPercent: -28, opacity: 0 });

        const assembly = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: () => "+=" + Math.round(gsap.utils.clamp(420, 780, window.innerHeight * .85)),
            pin: hero,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        assembly.to(".hero-assembly-hint", { opacity: 0, duration: .14 }, 0)
          .to(pieces, { yPercent: 0, opacity: 1, duration: .26, stagger: .16 }, 0)
          .to(".hero-combo", { opacity: 1, duration: .12 })
          .to(".hero-assembly", { autoAlpha: 0, duration: .12 }, "<");
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
      const menuHoldTop = () => {
        const header = document.querySelector(".header")?.getBoundingClientRect().height ?? 0;
        const original = Math.max(header + 12, Math.min(galleryScene?.offsetHeight ?? 0,
          window.innerHeight - Math.min(180, window.innerHeight * .25)));
        // Short desktop viewports must keep the menu below every caption,
        // including the staggered and enlarged gallery cards.
        const photosBottom = desktop && windowElement && galleryScene
          ? windowElement.getBoundingClientRect().bottom - galleryScene.getBoundingClientRect().top
          : 0;
        return Math.max(original, photosBottom);
      };
      let galleryScroll: ScrollTrigger | undefined;
      let restoreGallerySpacing: (() => void) | undefined;
      if (desktop && track && windowElement && gallerySection && galleryScene) {
        const travel = () => Math.max(0, track.scrollWidth - windowElement.clientWidth);
        const secondImageProgress = () => {
          const figures = track.querySelectorAll<HTMLElement>("figure");
          if (figures.length < 2 || !travel()) return 0;
          return Math.min(.85, (figures[1].offsetLeft - figures[0].offsetLeft) / travel());
        };
        // Bring the next section in at image two, then hold it below the photos
        // until the gallery's final horizontal frame.
        const scrollDistance = () => {
          const original = desktop ? travel() : Math.min(travel() * .5, window.innerHeight);
          const progress = secondImageProgress();
          const minimumHold = (window.innerHeight - menuHoldTop() + 120) / (1 - progress);
          return Math.max(1, minimumHold, Math.min(original, window.innerHeight / (1 - progress)));
        };
        const originalPadding = gallerySection.style.paddingBottom;
        const updateGallerySpacing = () => {
          const entry = scrollDistance() * secondImageProgress();
          gallerySection.style.paddingBottom = `${Math.max(0, window.innerHeight + entry - galleryScene.offsetHeight)}px`;
        };
        updateGallerySpacing();
        restoreGallerySpacing = () => { gallerySection.style.paddingBottom = originalPadding; };
        const galleryAnimation = gsap.to(track, {
          x: () => -travel(), ease: "none",
          scrollTrigger: {
            trigger: gallerySection, start: "top top", end: () => `+=${scrollDistance()}`,
            pin: galleryScene, pinSpacing: false, scrub: .28,
            invalidateOnRefresh: true, onRefreshInit: updateGallerySpacing,
          },
        });
        galleryScroll = galleryAnimation.scrollTrigger;
      }

      if (desktop && menuSection && galleryScroll) {
        const horizontalScroll = galleryScroll;
        ScrollTrigger.create({
          trigger: menuSection, start: () => `top ${menuHoldTop()}px`,
          end: () => horizontalScroll.end,
          pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
        });
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
        // Mobile keeps native horizontal swiping; cards still fly in once.
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
            start: "top 96%", end: () => `top ${menuHoldTop()}px`,
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
        restoreGallerySpacing?.();
        title.revert();
      };
    }, page);
    return () => media.revert();
  }, [scope]);
}
