"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import EnergyColumns from "@/components/EnergyColumns";
import HudDecor from "@/components/HudDecor";

const heroConfig = {
  parallaxMax: 12,
  parallaxLerp: 0.08,
  colors: {
    background: "#FAF8F4",
    white: "#FFFFFF",
    champagne: "#D9B77E",
    creamGold: "#F3E6CF",
    ink: "#202326",
    muted: "#737373",
  },
  fogOpacity: 0.58,
};

type ParallaxState = {
  tx: number;
  ty: number;
  x: number;
  y: number;
  raf: number;
};

export default function ChampagneHero() {
  const rootRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<ParallaxState>({ tx: 0, ty: 0, x: 0, y: 0, raf: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const parallaxTargets = root.querySelectorAll<HTMLElement>("[data-hero-parallax]");
    const magnetTargets = root.querySelectorAll<HTMLAnchorElement>("[data-hero-magnet]");

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power1.out" } })
        .fromTo(".champagne-hero-reveal", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.78, stagger: 0.12 })
        .fromTo(".champagne-fog", { autoAlpha: 0, y: 22 }, { autoAlpha: heroConfig.fogOpacity, y: 0, duration: 1.1 }, 0.4);

      if (!reducedMotion.matches) {
        gsap.to(".champagne-fog", {
          x: 26,
          opacity: heroConfig.fogOpacity - 0.1,
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(".champagne-wave-ribbon", {
          x: 34,
          y: -16,
          opacity: 0.62,
          duration: 8.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, root);

    if (!reducedMotion.matches && finePointer.matches) {
      const state = parallaxRef.current;

      const render = () => {
        state.x += (state.tx - state.x) * heroConfig.parallaxLerp;
        state.y += (state.ty - state.y) * heroConfig.parallaxLerp;

        parallaxTargets.forEach((target) => {
          const depth = Number(target.dataset.heroParallax || "1");
          target.style.transform = `translate3d(${state.x * depth}px, ${state.y * depth}px, 0)`;
        });

        state.raf = window.requestAnimationFrame(render);
      };

      const onMove = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        state.tx = px * heroConfig.parallaxMax;
        state.ty = py * heroConfig.parallaxMax;
      };

      const reset = () => {
        state.tx = 0;
        state.ty = 0;
        magnetTargets.forEach((target) => gsap.to(target, { x: 0, y: 0, duration: 0.35, ease: "power1.out" }));
      };

      const onMagnetMove = (event: MouseEvent) => {
        const target = event.currentTarget as HTMLAnchorElement;
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
        gsap.to(target, { x, y, duration: 0.28, ease: "power1.out" });
      };

      root.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", reset);
      magnetTargets.forEach((target) => {
        target.addEventListener("mousemove", onMagnetMove);
        target.addEventListener("mouseleave", reset);
      });
      state.raf = window.requestAnimationFrame(render);

      return () => {
        ctx.revert();
        window.cancelAnimationFrame(state.raf);
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", reset);
        magnetTargets.forEach((target) => {
          target.removeEventListener("mousemove", onMagnetMove);
          target.removeEventListener("mouseleave", reset);
        });
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="champagne-hero relative isolate min-h-screen overflow-hidden">
      <div className="champagne-base" />
      <div data-hero-parallax="0.35">
        <HudDecor />
      </div>
      <div className="champagne-wave-ribbon" data-hero-parallax="0.12" aria-hidden="true" />
      <div data-hero-parallax="0.18">
        <EnergyColumns />
      </div>
      <div className="champagne-fog" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="champagne-hero-reveal champagne-badge">Real estate creative studio</p>
          <h1 className="champagne-hero-reveal my-8 text-[clamp(2.65rem,7vw,7rem)] font-medium leading-[0.94] text-[#202326] sm:my-10">
            建築品牌內容設計<br />與銷售轉換系統
          </h1>
          <p className="champagne-hero-reveal mx-auto max-w-2xl text-base leading-8 text-[#737373] sm:text-lg">
            以策略、影像、廣告與網站整合，為建築與不動產品牌打造清晰、克制且能被記住的數位體驗。
          </p>
          <div className="champagne-hero-reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="#contact" data-hero-magnet className="champagne-cta champagne-cta-primary">
              預約專案諮詢 <ArrowUpRight size={17} />
            </Link>
            <Link href="/solutions" data-hero-magnet className="champagne-cta champagne-cta-secondary">
              查看服務內容
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
