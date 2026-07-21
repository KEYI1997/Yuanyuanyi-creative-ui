"use client";
import { useEffect, useRef, ReactNode } from "react";

export default function AnimateOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = window.setTimeout(() => el.classList.add("is-visible"), delay);
          el.dataset.animationTimer = String(timer);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (el.dataset.animationTimer) window.clearTimeout(Number(el.dataset.animationTimer));
    };
  }, [delay]);

  const animClass =
    direction === "left"
      ? "animate-from-left"
      : direction === "right"
      ? "animate-from-right"
      : "animate-on-scroll";

  return (
    <div ref={ref} className={`${animClass} ${className}`}>
      {children}
    </div>
  );
}
