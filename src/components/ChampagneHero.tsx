"use client";

import LiquidGlassCluster from "./OriginkitGlassIcon";

export default function ChampagneHero() {
  return (
    <section className="brand-hero" aria-labelledby="hero-title">
      <div className="brand-hero__grain" aria-hidden="true" />
      <div className="brand-hero__inner">
        <div className="brand-hero__copy">
          <p className="brand-hero__kicker"><span /> REAL ESTATE MARKETING</p>
          <h1 id="hero-title">讓好建築<br /><span className="brand-hero__nowrap">被市場看見</span></h1>
          <p className="brand-hero__lead">整合企劃、廣告、影音、網站與 LINE<br />讓建案定位更清楚，行銷更有效。</p>
        </div>
        <div className="brand-hero__field">
          <div className="glass-icon-stage" role="img" aria-label="YUANYUANYI 玻璃環互動標誌，持續自主旋轉">
            <LiquidGlassCluster
              className="glass-icon-mcp"
              background="#242424"
              shape="Torus"
              depth={56}
              size={94}
              speed={112.5}
              direction="Clockwise"
              followPointer={false}
              backdrop={{
                type: "Image",
                image: "/yuanyuanyi-wordmark.svg",
              }}
              glass={{ tint: "#FFFFFF", chromatic: 52, frost: 3 }}
              orient={{ angleX: 0, angleY: 0, angleZ: 0, offsetX: 0, offsetY: 0 }}
            />
          </div>
          <div className="brand-hero__coordinate" aria-hidden="true">FIELD 24.9912°N<br />121.3092°E</div>
        </div>
      </div>
    </section>
  );
}
