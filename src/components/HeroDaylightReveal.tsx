"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

type HeroRevealStyle = CSSProperties & {
  "--hero-x": string;
  "--hero-y": string;
  "--hero-reveal": string;
  "--hero-radius": string;
};

const initialStyle: HeroRevealStyle = {
  "--hero-x": "72%",
  "--hero-y": "48%",
  "--hero-reveal": "0",
  "--hero-radius": "clamp(150px, 16vw, 250px)",
};

export default function HeroDaylightReveal() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!reveal || !finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const hideReveal = () => {
      reveal.style.setProperty("--hero-reveal", "0");
    };

    const paint = () => {
      frame = 0;
      const bounds = reveal.getBoundingClientRect();
      const isInside =
        pointerX >= bounds.left &&
        pointerX <= bounds.right &&
        pointerY >= bounds.top &&
        pointerY <= bounds.bottom;

      if (!isInside) {
        hideReveal();
        return;
      }

      reveal.style.setProperty("--hero-x", `${pointerX - bounds.left}px`);
      reveal.style.setProperty("--hero-y", `${pointerY - bounds.top}px`);
      reveal.style.setProperty("--hero-reveal", "1");
    };

    const trackPointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("blur", hideReveal);
    document.documentElement.addEventListener("mouseleave", hideReveal);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("blur", hideReveal);
      document.documentElement.removeEventListener("mouseleave", hideReveal);
    };
  }, []);

  const mask =
    "radial-gradient(circle var(--hero-radius) at var(--hero-x) var(--hero-y), #000 0%, rgba(0,0,0,.98) 44%, rgba(0,0,0,.72) 64%, rgba(0,0,0,.28) 82%, transparent 100%)";

  return (
    <div
      ref={revealRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={initialStyle}
    >
      <Image
        src="/images/hero-tower-night.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />

      <Image
        src="/images/hero-tower-day.png"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover object-center transition-opacity duration-500 ease-out"
        style={{
          opacity: "var(--hero-reveal)",
          maskImage: mask,
          WebkitMaskImage: mask,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          willChange: "opacity, mask-image",
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: "var(--hero-reveal)",
          background:
            "radial-gradient(circle calc(var(--hero-radius) * .9) at var(--hero-x) var(--hero-y), rgba(255,245,213,.16), transparent 72%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
