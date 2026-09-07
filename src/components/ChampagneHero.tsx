"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";

const vertexShader = `#version 300 es
precision highp float;
in vec2 aPosition;
in float aSeed;
in float aSize;
uniform float uTime;
uniform float uAspect;
uniform float uPixelRatio;
uniform vec2 uMouse;
uniform float uMouseActive;
out float vAlpha;
out float vSeed;

void main() {
  vec2 p = aPosition;
  float phase = aSeed * 6.2831853;

  // Keep the field almost still until the pointer arrives: no automatic logo-to-nebula morph.
  p += vec2(
    sin(uTime * (0.2 + aSeed * 0.12) + phase + p.y * 3.0),
    cos(uTime * (0.17 + aSeed * 0.1) + phase + p.x * 3.0)
  ) * 0.0035;

  vec2 mouseDelta = p - uMouse;
  float mouseDistance = length(mouseDelta);
  float push = smoothstep(0.3, 0.0, mouseDistance) * uMouseActive;
  vec2 direction = mouseDistance > 0.001 ? mouseDelta / mouseDistance : vec2(1.0, 0.0);
  p += direction * push * 0.18;
  p += vec2(-direction.y, direction.x) * push * (0.04 + aSeed * 0.035);

  gl_Position = vec4(p.x / uAspect, p.y, 0.0, 1.0);
  gl_PointSize = aSize * uPixelRatio * (1.0 + push * 0.65);
  float reveal = smoothstep(0.9, 0.24, length(uMouse)) * uMouseActive;
  vAlpha = reveal * (0.62 + 0.38 * sin(phase + uTime * (0.45 + aSeed * 0.35)));
  vSeed = aSeed;
}`;

const fragmentShader = `#version 300 es
precision highp float;
in float vAlpha;
in float vSeed;
out vec4 outColor;

void main() {
  vec2 point = gl_PointCoord - 0.5;
  float distanceFromCenter = length(point);
  if (distanceFromCenter > 0.5) discard;
  float core = smoothstep(0.22, 0.02, distanceFromCenter);
  float glow = smoothstep(0.5, 0.12, distanceFromCenter);
  vec3 blue = vec3(0.08, 0.2, 0.95);
  vec3 cyan = vec3(0.06, 0.78, 1.0);
  vec3 violet = vec3(0.35, 0.2, 0.98);
  vec3 color = mix(blue, cyan, smoothstep(0.18, 0.82, vSeed));
  color = mix(color, violet, smoothstep(0.82, 1.0, vSeed) * 0.52);
  float alpha = (glow * 0.52 + core * 0.92) * vAlpha;
  outColor = vec4(color, alpha);
}`;

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("shader unavailable");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "shader compile failed");
  return shader;
}

export default function ChampagneHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, powerPreference: "high-performance" });
    if (!gl) { setFailed(true); return; }

    let frame = 0;
    let disposed = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, active: 0 };
    const startedAt = performance.now() / 1000;

    try {
      const program = gl.createProgram();
      if (!program) throw new Error("program unavailable");
      gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShader));
      gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "program link failed");
      gl.useProgram(program);

      const screenWidth = window.innerWidth;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const count = reducedMotion ? 1500 : coarse || screenWidth < 720 ? 2100 : screenWidth < 1200 ? 2800 : 3600;
      const positions = new Float32Array(count * 2);
      const seed = new Float32Array(count);
      const size = new Float32Array(count);

      // An interaction-only halo around the solid mark. It is invisible until the pointer enters it.
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.56) * 0.92;
        positions[i * 2] = Math.cos(angle) * radius * (0.95 + Math.random() * 0.28) + (Math.random() - 0.5) * 0.08;
        positions[i * 2 + 1] = Math.sin(angle) * radius * (0.68 + Math.random() * 0.2) + (Math.random() - 0.5) * 0.06;
        const s = Math.random();
        seed[i] = s;
        size[i] = s > 0.97 ? 10.0 + Math.random() * 5.2 : s > 0.78 ? 5.0 + Math.random() * 3.2 : 3.0 + Math.random() * 2.4;
      }

      const bind = (name: string, values: Float32Array, widthPerVertex: number) => {
        const location = gl.getAttribLocation(program, name);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, widthPerVertex, gl.FLOAT, false, 0, 0);
      };
      bind("aPosition", positions, 2);
      bind("aSeed", seed, 1);
      bind("aSize", size, 1);

      const uniforms = {
        time: gl.getUniformLocation(program, "uTime"), aspect: gl.getUniformLocation(program, "uAspect"),
        pixelRatio: gl.getUniformLocation(program, "uPixelRatio"), mouse: gl.getUniformLocation(program, "uMouse"),
        mouseActive: gl.getUniformLocation(program, "uMouseActive"),
      };

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.35 : 1.85);
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      const onPointer = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const aspect = rect.width / rect.height;
        pointer.x = (((event.clientX - rect.left) / rect.width) * 2 - 1) * aspect;
        pointer.y = 1 - ((event.clientY - rect.top) / rect.height) * 2;
        pointer.active = 1;
      };
      const onLeave = () => { pointer.active = 0; };
      const onContextLost = (event: Event) => { event.preventDefault(); setFailed(true); };

      resize();
      window.addEventListener("resize", resize, { passive: true });
      canvas.addEventListener("pointermove", onPointer, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);
      canvas.addEventListener("webglcontextlost", onContextLost);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const render = (milliseconds: number) => {
        if (disposed) return;
        const now = milliseconds / 1000;
        const elapsed = now - startedAt;
        const rect = canvas.getBoundingClientRect();
        const dpr = canvas.width / Math.max(rect.width, 1);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uniforms.time, reducedMotion ? 0 : elapsed);
        gl.uniform1f(uniforms.aspect, rect.width / Math.max(rect.height, 1));
        gl.uniform1f(uniforms.pixelRatio, dpr);
        gl.uniform2f(uniforms.mouse, pointer.x, pointer.y);
        gl.uniform1f(uniforms.mouseActive, pointer.active);
        gl.drawArrays(gl.POINTS, 0, count);
        frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("pointermove", onPointer);
        canvas.removeEventListener("pointerleave", onLeave);
        canvas.removeEventListener("webglcontextlost", onContextLost);
      };
    } catch { setFailed(true); }

    return () => { disposed = true; cancelAnimationFrame(frame); };
  }, []);

  return (
    <section className="brand-hero" aria-labelledby="hero-title">
      <div className="brand-hero__grain" aria-hidden="true" />
      <div className="brand-hero__inner">
        <div className="brand-hero__copy">
          <p className="brand-hero__kicker"><span /> Real estate creative studio</p>
          <h1 id="hero-title">讓好建築，<br />被市場看見。</h1>
          <p className="brand-hero__lead">我們整合品牌策略、數位廣告、影像與網站，為每一座建築找到最有力量的說法。</p>
          <div className="brand-hero__actions">
            <Link href="#contact" className="brand-hero__primary">開始聊聊 <ArrowDownRight size={18} /></Link>
            <Link href="/solutions" className="brand-hero__link">查看服務內容</Link>
          </div>
          <p className="brand-hero__note">桃園 · 建築品牌與銷售溝通</p>
        </div>
        <div className="brand-hero__field">
          <canvas ref={canvasRef} className="brand-hero__canvas" aria-label="滑鼠靠近圓圓乙品牌標誌時會散開的互動粒子" />
          <NextImage src="/brand-logo.svg" alt="圓圓乙品牌標誌" width={620} height={620} priority className="brand-hero__solid-logo" />
          {failed && <div className="brand-hero__fallback" role="status"><p>你的瀏覽器目前無法顯示互動粒子，品牌標誌仍可正常瀏覽。</p></div>}
          <div className="brand-hero__coordinate" aria-hidden="true">FIELD 24.9912°N<br />121.3092°E</div>
        </div>
      </div>
      <div className="brand-hero__scroll" aria-hidden="true"><span /> SCROLL TO EXPLORE</div>
    </section>
  );
}
