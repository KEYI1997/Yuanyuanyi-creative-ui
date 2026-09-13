"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowDownRight } from "lucide-react";

type MotionTarget = { x: number; y: number; scale: number };

function GlassIcon() {
  const stageRef = useRef<HTMLDivElement>(null);
  const target = useRef<MotionTarget>({ x: 0, y: 0, scale: 1 });
  const current = useRef<MotionTarget>({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let frame = 0;
    let orbit = -8;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      const easing = reducedMotion ? 1 : 0.085;
      current.current.x += (target.current.x - current.current.x) * easing;
      current.current.y += (target.current.y - current.current.y) * easing;
      current.current.scale += (target.current.scale - current.current.scale) * easing;
      if (!reducedMotion) orbit += 0.18;
      stage.style.setProperty("--tilt-x", `${current.current.x.toFixed(2)}deg`);
      stage.style.setProperty("--tilt-y", `${current.current.y.toFixed(2)}deg`);
      stage.style.setProperty("--glass-scale", current.current.scale.toFixed(3));
      stage.style.setProperty("--orbit", `${orbit.toFixed(2)}deg`);
      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      target.current = { x: -y * 18, y: x * 24, scale: 1.035 };
    };
    const reset = () => { target.current = { x: 0, y: 0, scale: 1 }; };
    const onPointerDown = () => { target.current.scale = 1.075; };

    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", reset);
    stage.addEventListener("pointerdown", onPointerDown, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", reset);
      stage.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div ref={stageRef} className="glass-icon-stage" role="img" aria-label="YUANYUANYI 玻璃環互動標誌，會緩慢旋轉並回應滑鼠移動">
      <div className="glass-icon-stage__backdrop" aria-hidden="true">YUANYUANYI</div>
      <div className="glass-icon-stage__halo" aria-hidden="true" />
      <div className="glass-icon" aria-hidden="true">
        <div className="glass-icon__body">
          <span className="glass-icon__sheen glass-icon__sheen--one" />
          <span className="glass-icon__sheen glass-icon__sheen--two" />
          <span className="glass-icon__rim" />
        </div>
      </div>
      <p className="glass-icon-stage__label">YUANYUANYI</p>
    </div>
  );
}

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
          <GlassIcon />
          <div className="brand-hero__coordinate" aria-hidden="true">FIELD 24.9912°N<br />121.3092°E</div>
        </div>
      </div>
      <div className="brand-hero__scroll" aria-hidden="true"><span /> SCROLL TO EXPLORE</div>
    </section>
  );
}
