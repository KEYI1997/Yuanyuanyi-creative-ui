"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";

export type EnergyColumnConfig = {
  desktopCount: number;
  mobileCount: number;
  baseDuration: number;
  phaseOffset: number;
  amplitude: number;
  ribbonTravel: number;
  colors: {
    cream: string;
    champagne: string;
  };
};

const config: EnergyColumnConfig = {
  desktopCount: 11,
  mobileCount: 7,
  baseDuration: 7.4,
  phaseOffset: 0.58,
  amplitude: 22,
  ribbonTravel: 18,
  colors: {
    cream: "rgba(243, 230, 207, 0.88)",
    champagne: "rgba(217, 183, 126, 0.72)",
  },
};

type ColumnSpec = {
  id: number;
  left: number;
  width: number;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  panelHeight: number;
  bandY: number;
  bandHeight: number;
};

type ColumnStyle = CSSProperties & {
  "--column-blur": string;
  "--column-band-y": string;
  "--column-band-height": string;
  "--column-panel-opacity": string;
  "--column-cream": string;
  "--column-champagne": string;
};

function buildColumns(count: number): ColumnSpec[] {
  return Array.from({ length: count }, (_, index) => {
    const wave = Math.sin(index * config.phaseOffset - 1.1);
    const secondary = Math.sin(index * 1.37) * 8;

    return {
      id: index,
      left: count === 1 ? 50 : (index / (count - 1)) * 94 + 3,
      width: 6 + ((index * 5) % 8),
      opacity: 0.42 + ((index * 7) % 18) / 100,
      blur: 6 + ((index * 3) % 8),
      duration: config.baseDuration + (index % 5) * 0.45,
      delay: index * 0.18,
      panelHeight: 100,
      bandY: 58 + wave * config.amplitude + secondary,
      bandHeight: 30 + ((index * 4) % 16),
    };
  });
}

function getColumnStyle(column: ColumnSpec): ColumnStyle {
  return {
    left: `${column.left}%`,
    width: `${column.width}vw`,
    height: `${column.panelHeight}vh`,
    opacity: column.opacity,
    "--column-blur": `${column.blur}px`,
    "--column-band-y": `${column.bandY}%`,
    "--column-band-height": `${column.bandHeight}%`,
    "--column-panel-opacity": `${column.opacity}`,
    "--column-cream": config.colors.cream,
    "--column-champagne": config.colors.champagne,
  };
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
      gsap.set(root.querySelectorAll(".champagne-column"), { opacity: 0.36 });
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
        const phase = index * config.phaseOffset;
        const band = el.querySelector<HTMLElement>(".champagne-column-band");
        const glow = el.querySelector<HTMLElement>(".champagne-column-glow");

        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          {
            opacity: spec.opacity,
            y: 0,
            duration: 1.45,
            delay: 0.28 + spec.delay,
            ease: "power1.out",
          },
        );

        if (band) {
          gsap.to(band, {
            yPercent: Math.sin(phase) * config.ribbonTravel,
            scaleY: 1.08 + Math.cos(phase) * 0.12,
            opacity: spec.opacity + 0.18,
            duration: spec.duration,
            delay: spec.delay,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        if (glow) {
          gsap.to(glow, {
            opacity: 0.34 + Math.sin(phase) * 0.12,
            scaleX: 1.08,
            duration: spec.duration * 0.86,
            delay: spec.delay * 0.7,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      });

      gsap.to(root, {
        "--champagne-wave-x": "18px",
        duration: 10.5,
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
          style={getColumnStyle(column)}
        >
          <span className="champagne-column-band" />
          <span className="champagne-column-glow" />
        </span>
      ))}
    </div>
  );
}
