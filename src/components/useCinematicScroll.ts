import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCinematicScroll(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const page = scope.current;
    if (!page) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const hero = page.querySelector(".hero");
      const heroPhoto = hero?.querySelector("[data-camera]");
      if (hero && heroPhoto) {
        gsap.to(heroPhoto, {
          scale: 1.24,
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.55 },
        });
      }

      page.querySelectorAll<HTMLElement>("[data-frame]").forEach((frame) => {
        const photo = frame.querySelector("[data-camera]");
        if (!photo || photo === heroPhoto) return;

        gsap.timeline({
          scrollTrigger: { trigger: frame, start: "top 97%", end: "top 38%", scrub: 0.45 },
          defaults: { ease: "none" },
        })
          .fromTo(frame, { clipPath: "inset(8% 0 16% 0)", opacity: 0.35 },
            { clipPath: "inset(0% 0 0% 0)", opacity: 1, duration: 0.62 }, 0)
          .fromTo(photo, { scale: 1, yPercent: 0 }, { scale: 1.16, yPercent: -2, duration: 1 }, 0);
      });

      const observer = new ResizeObserver(() => ScrollTrigger.refresh());
      observer.observe(page);
      return () => observer.disconnect();
    }, page);

    return () => media.revert();
  }, [scope]);
}
