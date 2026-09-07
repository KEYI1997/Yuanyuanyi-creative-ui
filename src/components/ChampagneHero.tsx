"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";

const CYCLE_SECONDS = 36;

const vertexShader = `#version 300 es
precision highp float;
in vec2 aLogo;
in vec2 aNebula;
in float aSeed;
in float aSize;
in float aTone;
uniform float uTime;
uniform float uMorph;
uniform float uAspect;
uniform float uPixelRatio;
uniform vec2 uMouse;
uniform float uMouseActive;
uniform vec2 uShockCenter;
uniform float uShockAge;
out float vTone;
out float vAlpha;

float ease(float t) { return t * t * (3.0 - 2.0 * t); }

void main() {
  float morph = ease(clamp(uMorph, 0.0, 1.0));
  vec2 p = mix(aLogo, aNebula, morph);
  float radius = length(p);
  float phase = aSeed * 6.2831853;

  float drift = 0.006 + morph * 0.018;
  p += vec2(
    sin(uTime * (0.34 + aSeed * 0.19) + phase + p.y * 5.0),
    cos(uTime * (0.29 + aSeed * 0.17) + phase + p.x * 5.0)
  ) * drift;

  float spin = (0.018 + 0.035 * aSeed) * uTime * (aSeed > 0.48 ? 1.0 : -0.72) * morph;
  float cs = cos(spin);
  float sn = sin(spin);
  p = mat2(cs, -sn, sn, cs) * p;
  p *= 1.0 + sin(uTime * 0.48 + phase + radius * 7.0) * (0.004 + morph * 0.012);

  vec2 mouseDelta = p - uMouse;
  float mouseDistance = length(mouseDelta);
  float push = smoothstep(0.29, 0.0, mouseDistance) * uMouseActive;
  vec2 direction = mouseDistance > 0.001 ? mouseDelta / mouseDistance : vec2(1.0, 0.0);
  p += direction * push * 0.115;
  p += vec2(-direction.y, direction.x) * push * (0.028 + aSeed * 0.024);

  if (uShockAge >= 0.0 && uShockAge < 3.6) {
    vec2 shockDelta = p - uShockCenter;
    float shockDistance = length(shockDelta);
    float ring = uShockAge * 0.42;
    float wave = exp(-pow((shockDistance - ring) / 0.055, 2.0)) * exp(-uShockAge * 0.58);
    vec2 shockDirection = shockDistance > 0.001 ? shockDelta / shockDistance : vec2(0.0, 1.0);
    p += shockDirection * wave * (0.16 + 0.07 * aSeed);
  }

  gl_Position = vec4(p.x / uAspect, p.y, 0.0, 1.0);
  gl_PointSize = aSize * uPixelRatio * (1.0 + push * 0.42);
  vTone = aTone;
  vAlpha = 0.72 + 0.28 * sin(phase + uTime * (0.7 + aSeed));
}`;

const fragmentShader = `#version 300 es
precision highp float;
in float vTone;
in float vAlpha;
out vec4 outColor;

void main() {
  vec2 point = gl_PointCoord - 0.5;
  float distanceFromCenter = length(point);
  if (distanceFromCenter > 0.5) discard;
  float core = smoothstep(0.22, 0.02, distanceFromCenter);
  float glow = smoothstep(0.5, 0.12, distanceFromCenter);
  vec3 coffee = vec3(0.31, 0.17, 0.095);
  vec3 base = coffee;
  vec3 color = mix(base, base * 1.16, core * 0.22);
  float alpha = (glow * 0.56 + core * 0.96) * vAlpha;
  outColor = vec4(color, alpha);
}`;

type ParticleControls = {
  morph: number;
  shockAt: number;
  shockCenter: [number, number];
};

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("shader unavailable");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "shader compile failed");
  return shader;
}

function autoMorph(time: number) {
  const phase = time % CYCLE_SECONDS;
  if (phase < 7) return 0;
  if (phase < 15) return (phase - 7) / 8;
  if (phase < 22) return 1;
  if (phase < 31) return 1 - (phase - 22) / 9;
  return 0;
}

export default function ChampagneHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<ParticleControls>({ morph: 0, shockAt: -100, shockCenter: [0, 0] });
  const [failed, setFailed] = useState(false);

  const triggerShock = useCallback((x = 0, y = 0) => {
    const state = controlsRef.current;
    state.shockAt = performance.now() / 1000;
    state.shockCenter = [x, y];
  }, []);

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

      const image = new Image();
      image.src = "/brand-logo.svg";
      image.onload = () => {
        if (disposed) return;
        const sampleCanvas = document.createElement("canvas");
        const sampleSize = 420;
        sampleCanvas.width = sampleSize;
        sampleCanvas.height = sampleSize;
        const context = sampleCanvas.getContext("2d", { willReadFrequently: true });
        if (!context) { setFailed(true); return; }
        context.drawImage(image, 0, 0, sampleSize, sampleSize);
        const pixels = context.getImageData(0, 0, sampleSize, sampleSize).data;
        const candidates: [number, number][] = [];
        for (let y = 3; y < sampleSize - 3; y += 2) {
          for (let x = 3; x < sampleSize - 3; x += 2) {
            if (pixels[(y * sampleSize + x) * 4 + 3] > 72) candidates.push([x, y]);
          }
        }
        if (!candidates.length) { setFailed(true); return; }
        const bounds = candidates.reduce((box, [x, y]) => ({
          minX: Math.min(box.minX, x), maxX: Math.max(box.maxX, x),
          minY: Math.min(box.minY, y), maxY: Math.max(box.maxY, y),
        }), { minX: sampleSize, maxX: 0, minY: sampleSize, maxY: 0 });

        const screenWidth = window.innerWidth;
        const coarse = window.matchMedia("(pointer: coarse)").matches;
        const count = Math.round((reducedMotion ? 3600 : coarse || screenWidth < 720 ? 5200 : screenWidth < 1200 ? 8200 : 11800) * 0.64);
        const logoSpanX = screenWidth < 720 ? 0.82 : screenWidth < 1200 ? 0.9 : 0.98;
        const logoSpanY = screenWidth < 720 ? 0.84 : 0.95;
        const logo = new Float32Array(count * 2);
        const nebula = new Float32Array(count * 2);
        const seed = new Float32Array(count);
        const size = new Float32Array(count);
        const tone = new Float32Array(count);

        for (let i = 0; i < count; i++) {
          const source = candidates[(Math.random() * candidates.length) | 0];
          const jitterX = (Math.random() - 0.5) * 1.8;
          const jitterY = (Math.random() - 0.5) * 1.8;
          logo[i * 2] = ((((source[0] + jitterX) - bounds.minX) / (bounds.maxX - bounds.minX)) - 0.5) * 2 * logoSpanX;
          logo[i * 2 + 1] = (0.5 - (((source[1] + jitterY) - bounds.minY) / (bounds.maxY - bounds.minY))) * 2 * logoSpanY;
          const s = Math.random();
          const arm = i % 4;
          const theta = Math.random() * Math.PI * 2 + arm * 1.38;
          const radius = Math.pow(Math.random(), 0.58) * (0.62 + Math.random() * 0.22);
          const spiral = theta + radius * (5.0 + arm * 0.56);
          nebula[i * 2] = Math.cos(spiral) * radius * (1.05 + Math.sin(theta * 3.0) * 0.1);
          nebula[i * 2 + 1] = Math.sin(spiral) * radius * 0.76 + Math.sin(theta * 2.0) * 0.055;
          seed[i] = s;
          size[i] = s > 0.965 ? 20.0 + Math.random() * 10.4 : s > 0.76 ? 10.0 + Math.random() * 6.4 : 6.0 + Math.random() * 4.8;
          tone[i] = Math.random();
        }

        const bind = (name: string, values: Float32Array, widthPerVertex: number) => {
          const location = gl.getAttribLocation(program, name);
          const buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW);
          gl.enableVertexAttribArray(location);
          gl.vertexAttribPointer(location, widthPerVertex, gl.FLOAT, false, 0, 0);
        };
        bind("aLogo", logo, 2);
        bind("aNebula", nebula, 2);
        bind("aSeed", seed, 1);
        bind("aSize", size, 1);
        bind("aTone", tone, 1);

        const uniforms = {
          time: gl.getUniformLocation(program, "uTime"), morph: gl.getUniformLocation(program, "uMorph"),
          aspect: gl.getUniformLocation(program, "uAspect"), pixelRatio: gl.getUniformLocation(program, "uPixelRatio"),
          mouse: gl.getUniformLocation(program, "uMouse"), mouseActive: gl.getUniformLocation(program, "uMouseActive"),
          shockCenter: gl.getUniformLocation(program, "uShockCenter"), shockAge: gl.getUniformLocation(program, "uShockAge"),
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
        const onDown = (event: PointerEvent) => { onPointer(event); triggerShock(pointer.x, pointer.y); };
        const onContextLost = (event: Event) => { event.preventDefault(); setFailed(true); };

        resize();
        window.addEventListener("resize", resize, { passive: true });
        canvas.addEventListener("pointermove", onPointer, { passive: true });
        canvas.addEventListener("pointerleave", onLeave);
        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("webglcontextlost", onContextLost);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        const render = (milliseconds: number) => {
          if (disposed) return;
          const now = milliseconds / 1000;
          const state = controlsRef.current;
          const elapsed = now - startedAt;
          const target = reducedMotion ? 0 : autoMorph(elapsed);
          state.morph += (target - state.morph) * 0.025;
          const rect = canvas.getBoundingClientRect();
          const dpr = canvas.width / Math.max(rect.width, 1);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform1f(uniforms.time, reducedMotion ? 0 : elapsed);
          gl.uniform1f(uniforms.morph, state.morph);
          gl.uniform1f(uniforms.aspect, rect.width / Math.max(rect.height, 1));
          gl.uniform1f(uniforms.pixelRatio, dpr);
          gl.uniform2f(uniforms.mouse, pointer.x, pointer.y);
          gl.uniform1f(uniforms.mouseActive, pointer.active);
          gl.uniform2f(uniforms.shockCenter, state.shockCenter[0], state.shockCenter[1]);
          gl.uniform1f(uniforms.shockAge, now - state.shockAt);
          gl.drawArrays(gl.POINTS, 0, count);
          frame = requestAnimationFrame(render);
        };
        frame = requestAnimationFrame(render);
      };
      image.onerror = () => setFailed(true);
    } catch { setFailed(true); }
    return () => { disposed = true; cancelAnimationFrame(frame); };
  }, [triggerShock]);

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
          <canvas ref={canvasRef} className="brand-hero__canvas" aria-label="由圓圓乙品牌標誌聚合變形的互動粒子動畫" />
          {failed && <div className="brand-hero__fallback" role="status"><NextImage src="/brand-logo.svg" alt="圓圓乙品牌標誌" width={390} height={390} /><p>你的瀏覽器目前無法顯示互動粒子。</p></div>}
          <div className="brand-hero__coordinate" aria-hidden="true">FIELD 24.9912°N<br />121.3092°E</div>
        </div>
      </div>
      <div className="brand-hero__scroll" aria-hidden="true"><span /> SCROLL TO EXPLORE</div>
    </section>
  );
}
