"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import LiquidGlassCluster from "./OriginkitGlassIcon";

export default function ChampagneHero() {
  return (
    <section className="brand-hero" aria-labelledby="hero-title">
      <div className="brand-hero__grain" aria-hidden="true" />
      <div className="brand-hero__inner">
        <div className="brand-hero__copy">
          <p className="brand-hero__kicker"><span /> REAL ESTATE MARKETING</p>
          <h1 id="hero-title">建案行銷<br /><span className="brand-hero__subheading">從定位，到來客。</span></h1>
          <p className="brand-hero__lead">整合企劃、廣告、影音、網站與 LINE，讓建案定位更清楚，行銷更有效。</p>
          <div className="brand-hero__actions">
            <Link href="/solutions" className="brand-hero__primary">查看服務 <ArrowDownRight size={18} /></Link>
            <Link href="#contact" className="brand-hero__link">洽談建案</Link>
          </div>
          <p className="brand-hero__note">桃園｜建案整合行銷</p>
        </div>
        <div className="brand-hero__field">
          <div className="glass-icon-stage" role="img" aria-label="YUANYUANYI 玻璃環互動標誌，持續自主旋轉">
            <LiquidGlassCluster
              className="glass-icon-mcp"
              background="#050403"
              shape="Torus"
              depth={56}
              size={94}
              speed={112.5}
              direction="Clockwise"
              followPointer={false}
              backdrop={{
                type: "Text",
                text: "YUAN\nYUAN\nYI",
                font: { fontFamily: "Arial, Helvetica, sans-serif", fontSize: 112, fontWeight: 800, letterSpacing: 2, lineHeight: 1 },
                textColor: "#FFFFFF",
              }}
              glass={{ tint: "#FFFFFF", chromatic: 52, frost: 3 }}
              orient={{ angleX: 0, angleY: 0, angleZ: 0, offsetX: 0, offsetY: 0 }}
            />
            <p className="glass-icon-stage__label">YUANYUANYI</p>
          </div>
          <div className="brand-hero__coordinate" aria-hidden="true">FIELD 24.9912°N<br />121.3092°E</div>
        </div>
      </div>
      <div className="brand-hero__scroll" aria-hidden="true"><span /> SCROLL TO EXPLORE</div>
    </section>
  );
}
