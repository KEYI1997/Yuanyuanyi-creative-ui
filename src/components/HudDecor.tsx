"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const hudItems = [
  { label: "Secured", x: "8%", y: "34%" },
  { label: "Encrypted", x: "78%", y: "28%" },
  { label: "Local HUB", x: "6%", y: "68%" },
  { label: "Synced", x: "84%", y: "62%" },
  { label: "Light Speed", x: "64%", y: "76%" },
];

const nodeItems = [
  { x: "16%", y: "42%" },
  { x: "28%", y: "72%" },
  { x: "72%", y: "38%" },
  { x: "88%", y: "48%" },
  { x: "54%", y: "82%" },
  { x: "10%", y: "82%" },
];

export default function HudDecor() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".champagne-hud-node", {
        opacity: 0.55,
        duration: 3.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.32,
      });

      gsap.to(".champagne-hud-label", {
        opacity: 0.38,
        duration: 4.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="champagne-hud" aria-hidden="true">
      <div className="champagne-hud-grid" />
      <div className="champagne-hud-line champagne-hud-line-a" />
      <div className="champagne-hud-line champagne-hud-line-b" />
      <div className="champagne-hud-line champagne-hud-line-c" />

      {nodeItems.map((node, index) => (
        <span
          key={`${node.x}-${node.y}`}
          className="champagne-hud-node"
          style={{ left: node.x, top: node.y }}
        >
          {index % 2 === 0 && <span />}
        </span>
      ))}

      {hudItems.map((item) => (
        <span
          key={item.label}
          className="champagne-hud-label"
          style={{ left: item.x, top: item.y }}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}
