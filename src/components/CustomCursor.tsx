"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 檢查是否為觸控裝置
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      cursor.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // 檢查游標下方是否有可點擊元素
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], input[type='submit'], .cursor-pointer");

      if (isClickable) {
        cursor.classList.add("is-hovering");
      } else {
        cursor.classList.remove("is-hovering");
      }
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    // 平滑跟隨動畫
    let animationId: number;
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
      style={{ width: 40, height: 40 }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="cursor-svg">
        <circle cx="20" cy="20" r="18" stroke="#c84b32" strokeWidth="2" fill="none" className="cursor-circle" />
      </svg>
    </div>
  );
}
