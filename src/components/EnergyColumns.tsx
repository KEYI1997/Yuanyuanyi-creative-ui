"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

export type EnergyColumnConfig = {
  desktopCount: number;
  mobileCount: number;
  baseDuration: number;
  phaseOffset: number;
  amplitude: number;
  colors: {
    cream: string;
    champagne: string;
  };
};

const config: EnergyColumnConfig = {
  desktopCount: 11,
  mobileCount: 7,
  baseDuration: 6.8,
  phaseOffset: 0.62,
  amplitude: 0.28,
  colors: {
    cream: "rgba(243, 230, 207, 0.48)",
    champagne: "rgba(217, 183, 126, 0.42)",
  },
};

type ColumnSpec = {
  id: number;
  left: number;
  width: number;
  minScale: number;
  maxScale: number;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  height: number;
};

function buildColumns(count: number): ColumnSpec[] {
  return Array.from({ length: count }, (_, index) => {
    const wave = Math.sin(index * config.phaseOffset);
    const secondary = Math.sin(index * 1.7) * 0.08;

    return {
      id: index,
      left: count === 1 ? 50 : (index / (count - 1)) * 94 + 3,
      width: 6 + ((index * 5) % 8),
      minScale: 0.64 + secondary,
      maxScale: 1.02 + wave * config.amplitude,
      opacity: 0.26 + ((index * 7) % 18) / 100,
      blur: 10 + ((index * 3) % 10),
      duration: config.baseDuration + (index % 5) * 0.45,
      delay: index * 0.18,
      height: 48 + ((index * 11) % 34),
    };
  });
}

export default function EnergyColumns() {
  const rootRef = useRef<HTMLDivElement>(null);
  const columns = useMemo(() => buildColumns(config.desktopCount), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    if (reducedMotion.matches) {
      gsap.set(root.querySelectorAll(".champagne-column"), { opacity: 0.32, scaleY: 0.82 });
      return;
    }

    const activeCount = mobile.matches ? config.mobileCount : config.desktopCount;
    const columnEls = Array.from(root.querySelectorAll<HTMLElement>(".champagne-column"));
    const visibleEls = columnEls.slice(0, activeCount);

    columnEls.forEach((el, index) => {
      el.style.display = index < activeCount ? "block" : "none";
    });

    const ctx = gsap.context(() => {
      visibleEls.forEach((el, index) => {
        const spec = columns[index];
        const phaseScale = 0.5 + Math.sin(index * config.phaseOffset) * 0.5;

        gsap.fromTo(
          el,
          { opacity: 0, scaleY: 0.18 },
          {
            opacity: spec.opacity,
            scaleY: 0.72 + phaseScale * 0.34,
            duration: 1.45,
            delay: 0.28 + spec.delay,
            ease: "power1.out",
          },
        );

        gsap.to(el, {
          scaleY: spec.maxScale,
          opacity: spec.opacity + 0.12,
          duration: spec.duration,
          delay: spec.delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      gsap.to(root, {
        "--champagne-wave-x": "18px",
        duration: 8.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => ctx.revert();
  }, [columns]);

  return (
    <div ref={rootRef} className="champagne-energy" aria-hidden="true">
      {columns.map((column) => (
        <span
          key={column.id}
          className="champagne-column"
          style={{
            left: `${column.left}%`,
            width: `${column.width}vw`,
            height: `${column.height}vh`,
            opacity: column.opacity,
            filter: `blur(${column.blur}px)`,
            background: `linear-gradient(to top, transparent 0%, ${config.colors.champagne} 18%, ${config.colors.cream} 52%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  );
}
