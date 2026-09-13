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
          <p className="brand-hero__kicker"><span /> Real estate creative studio</p>
          <h1 id="hero-title">讓好建築<br />被市場看見</h1>
          <p className="brand-hero__lead">整合品牌策略、數位廣告、影像與網站，為每一座建築找到最有力量的說法</p>
          <div className="brand-hero__actions">
            <Link href="#contact" className="brand-hero__primary">開始聊聊 <ArrowDownRight size={18} /></Link>
            <Link href="/solutions" className="brand-hero__link">查看服務內容</Link>
          </div>
          <p className="brand-hero__note">桃園 · 建築品牌與銷售溝通</p>
        </div>
        <div className="brand-hero__field">
          <div className="glass-icon-stage" role="img" aria-label="YUANYUANYI 玻璃環互動標誌，會緩慢旋轉並回應滑鼠拖曳">
            <LiquidGlassCluster
              className="glass-icon-mcp"
              background="#050403"
              shape="Torus"
              depth={56}
              size={94}
              speed={0}
              direction="Clockwise"
              backdrop={{
                type: "Text",
                text: "YUANYUANYI",
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
