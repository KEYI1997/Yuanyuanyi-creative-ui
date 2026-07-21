"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 sm:bottom-7 sm:right-7">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`grid h-11 w-11 place-items-center border border-border bg-bg text-primary shadow-sm transition-all ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`} aria-label="回到頁首">
        <ArrowUp size={17} />
      </button>
      <a href="tel:03-4229123" className="inline-flex h-11 items-center gap-2 bg-cta px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cta-hover" aria-label="撥打電話 03-4229123">
        <Phone size={16} /><span className="hidden sm:inline">直接來電</span>
      </a>
    </div>
  );
}
