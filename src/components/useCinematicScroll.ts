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
      portrait: "(orientation: portrait)",
    }, (context) => {
      if (!context.conditions?.motion) return;

      const desktop = Boolean(context.conditions.desktop);
      page.dataset.cinematic = desktop ? "desktop" : "mobile";
      // Touch uses native scrolling; both devices share the same scene timelines.
      const lenis = desktop ? new Lenis({ anchors: true, smoothWheel: true, lerp: .085, wheelMultiplier: .85 }) : null;
      const tick = (seconds: number) => lenis?.raf(seconds * 1000);
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }
      const pinScene = (selector: string) => {
        const scene = page.querySelector<HTMLElement>(selector);
        return desktop || (scene && scene.offsetHeight <= window.innerHeight + 1) ? selector : false;
      };

      const heroScene = page.querySelector<HTMLElement>(".hero-scene");
      const revealedLogo = page.querySelector<HTMLElement>(".hero-logo-reveal");
      const nextScene = page.querySelector<HTMLElement>(".macro");
      const originalNextMargin = nextScene?.style.marginTop ?? "";
      const updateHeroHandoff = () => {
        if (desktop || !heroScene || !revealedLogo || !nextScene || !pinScene(".hero-scene")) return;
        // Keep the next section below the logo, rather than below the entire
        // empty viewport. Both then move upward together after the hero unpins.
        const gap = Math.min(40, Math.max(24, window.innerHeight * .04));
        const logoBottom = revealedLogo.offsetTop + revealedLogo.offsetHeight / 2;
        const emptyTail = Math.max(0, heroScene.offsetHeight - logoBottom - gap);
        nextScene.style.marginTop = `${-emptyTail}px`;
      };
      updateHeroHandoff();

      const title = SplitText.create("#hero-title", { type: "lines,chars" });
      gsap.from(title.lines, { y: 24, opacity: 0, duration: .8, stagger: .105, ease: "power3.out" });
      // Reserve the hero's scroll space so the next section pushes the revealed
      // logo upward in normal flow instead of overlaying it.
      const exit = gsap.timeline({
        scrollTrigger: { trigger: ".hero", start: "top top", end: desktop ? "+=110%" : "+=65%", pin: pinScene(".hero-scene"), pinSpacing: true, scrub: desktop ? .65 : .45, invalidateOnRefresh: true, onRefreshInit: updateHeroHandoff },
      });
      exit.to(".hero-support, .eyebrow", { opacity: 0, duration: .3 }, 0)
        .to(title.chars, { opacity: 0, y: -12, duration: .32, stagger: { amount: .14, from: "start" } }, .16)
        .fromTo(".hero-image img", { scale: 1 }, { scale: desktop ? 1.1 : 1.03, duration: .6, ease: "sine.inOut" }, .16)
        .fromTo(".hero-svg-cutout", { opacity: 0 }, { opacity: 1, duration: .08, ease: "none" }, .34)
        .to(".hero-image, .hero-shade", { opacity: 0, duration: .32, ease: "sine.inOut" }, .36)
        .fromTo(".hero-logo-reveal", { opacity: 0 }, { opacity: 1, duration: .25, ease: "sine.out" }, .6)
        .to(".hero-svg-cutout", { opacity: 0, duration: .25, ease: "sine.inOut" }, .68)
        .to(".hero-copy", { opacity: 0, duration: .08 }, .68)
        .to(".hero-logo-reveal", { opacity: 1, duration: .07 }, .93);

      const macro = gsap.timeline({
        scrollTrigger: { trigger: ".macro", start: "top top", end: desktop ? "+=130%" : "+=65%", pin: pinScene(".macro-scene"), pinSpacing: desktop, scrub: desktop ? .65 : .45, invalidateOnRefresh: true },
      });
      macro.fromTo(".macro-image img", { scale: desktop ? 1.05 : 1 }, { scale: desktop ? 1.28 : 1.08, xPercent: desktop ? -4 : 0, duration: 1, ease: "none" }, 0)
        .from(".callout-line", { scaleX: 0, stagger: .13, duration: .15, ease: "power3.out" }, .12)
        .from(".callouts li > span:last-child", { opacity: 0, y: 8, stagger: .13, duration: .15 }, .17);

      const track = page.querySelector<HTMLElement>(".gallery-track");
      const windowElement = page.querySelector<HTMLElement>(".gallery-window");
      const gallerySection = page.querySelector<HTMLElement>(".gallery-section");
      const galleryScene = page.querySelector<HTMLElement>(".gallery-scene");
      const menuSection = page.querySelector<HTMLElement>(".menu-section");
      const menuHoldTop = () => {
        const header = document.querySelector(".header")?.getBoundingClientRect().height ?? 0;
        return Math.max(header + 12, Math.min(galleryScene?.offsetHeight ?? 0,
          window.innerHeight - Math.min(180, window.innerHeight * .25)));
      };
      let galleryScroll: ScrollTrigger | undefined;
      let restoreGallerySpacing: (() => void) | undefined;
      if (track && windowElement && gallerySection && galleryScene) {
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
            pin: galleryScene, pinSpacing: false, scrub: desktop ? .65 : .35,
            invalidateOnRefresh: true, onRefreshInit: updateGallerySpacing,
            onLeave: (self) => { self.animation?.progress(1); },
          },
        });
        galleryScroll = galleryAnimation.scrollTrigger;
      }

      if (menuSection && galleryScroll) {
        const horizontalScroll = galleryScroll;
        ScrollTrigger.create({
          trigger: menuSection, start: () => `top ${menuHoldTop()}px`,
          end: () => horizontalScroll.end,
          pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
        });
      }

      const menu = page.querySelector<HTMLElement>(".menu-overview");
      if (menu && desktop) {
        const grid = menu.querySelector<HTMLElement>(".menu-grid")!;
        const chips = menu.querySelector<HTMLElement>(".menu-chips")!;
        const cards = grid.querySelectorAll(".menu-card");
        const stagger = () => Math.min(48, window.innerHeight * .06);
        const align = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: menuSection ?? menu,
            start: "top 95%", end: () => `top ${menuHoldTop()}px`,
            scrub: .65, invalidateOnRefresh: true,
          },
        });
        align.fromTo(cards, { y: (index) => index * stagger() }, { y: 0, duration: 1 }, 0)
          .fromTo(chips, { y: () => stagger() * 2 }, { y: 0, duration: 1 }, 0);
      }

      if (menu && !desktop) {
        // Stacked mobile cards cannot fit in the desktop's single pinned viewport.
        menu.querySelectorAll(".menu-card").forEach((card) => {
          gsap.fromTo(card, { y: 32, opacity: .8 }, {
            y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: card, pinnedContainer: menuSection ?? undefined, start: "top 94%", end: "top 60%", scrub: .65, invalidateOnRefresh: true },
          });
        });
      }

      return () => {
        delete page.dataset.cinematic;
        restoreGallerySpacing?.();
        if (nextScene) nextScene.style.marginTop = originalNextMargin;
        title.revert();
        if (lenis) {
          gsap.ticker.remove(tick);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
        }
      };
    }, page);
    return () => media.revert();
  }, [scope]);
}
