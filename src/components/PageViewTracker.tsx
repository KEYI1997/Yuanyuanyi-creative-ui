"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 排除後台頁面和 API 路由
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    const sendTrack = () => {
      fetch("/api/pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: pathname,
          referrer: document.referrer || "",
        }),
      }).catch(() => {
        // 靜默失敗，不影響使用者體驗
      });
    };

    sendTrack();
  }, [pathname]);

  return null;
}
