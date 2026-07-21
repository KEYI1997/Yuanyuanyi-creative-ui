"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      // 延遲顯示，避免干擾首屏體驗
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie 使用同意"
      className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50
                 bg-primary text-white/90 px-6 py-5
                 border border-white/10
                 animate-[revealUp_.4s_cubic-bezier(.2,.75,.25,1)_forwards]"
    >
      <p className="text-sm leading-relaxed mb-4">
        本站使用 Cookies 以提升瀏覽體驗並進行流量分析。繼續使用即表示您同意我們的{" "}
        <a
          href="/privacy"
          className="underline underline-offset-2 hover:text-white transition-colors duration-200"
        >
          隱私權政策
        </a>
        。
      </p>
      <button
        onClick={accept}
        className="w-full py-2.5 text-sm font-medium tracking-wide
                   border border-white/30 hover:bg-white hover:text-primary
                   transition-colors duration-200"
      >
        我瞭解了
      </button>
    </div>
  );
}
