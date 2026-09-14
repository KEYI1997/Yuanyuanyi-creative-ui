"use client";

import { useEffect, useState } from "react";
import { Check, ImagePlus, Move, Plus, Save, Upload } from "lucide-react";

type PortfolioProject = {
  id: string;
  title: string;
  image: string;
  alt: string;
  positionX: number;
  positionY: number;
  scale: number;
};

type DragState = { id: string; x: number; y: number; originX: number; originY: number } | null;

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [drag, setDrag] = useState<DragState>(null);
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

  useEffect(() => {
    fetch("/api/portfolio")
      .then((response) => response.json())
      .then((data: { projects?: PortfolioProject[] }) => setProjects(data.projects || []))
      .catch(() => setNotice("目前無法載入實績，請稍後再試。"))
      .finally(() => setLoading(false));
  }, []);

  function updateProject(id: string, patch: Partial<PortfolioProject>) {
    setProjects((current) => current.map((project) => project.id === id ? { ...project, ...patch } : project));
  }

  function startDrag(id: string, event: React.PointerEvent<HTMLDivElement>) {
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ id, x: event.clientX, y: event.clientY, originX: project.positionX, originY: project.positionY });
  }

  function moveDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag || drag.id === "") return;
    const rect = event.currentTarget.getBoundingClientRect();
    updateProject(drag.id, {
      positionX: Math.max(0, Math.min(100, drag.originX - ((event.clientX - drag.x) / Math.max(rect.width, 1)) * 100)),
      positionY: Math.max(0, Math.min(100, drag.originY - ((event.clientY - drag.y) / Math.max(rect.height, 1)) * 100)),
    });
  }

  async function saveProject(project: PortfolioProject) {
    setSaving(project.id);
    setNotice("");
    const form = new FormData();
    form.set("id", project.id);
    form.set("title", project.title);
    form.set("positionX", String(project.positionX));
    form.set("positionY", String(project.positionY));
    form.set("scale", String(project.scale));
    if (files[project.id]) form.set("image", files[project.id]);
    try {
      const response = await fetch("/api/portfolio", { method: "POST", headers: adminPassword ? { "x-admin-password": adminPassword } : undefined, body: form });
      const data = await response.json() as { projects?: PortfolioProject[]; error?: string };
      if (!response.ok) throw new Error(data.error || "儲存失敗");
      setProjects(data.projects || projects);
      setNotice(`「${project.title}」已儲存，公開頁面將同步更新。`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "儲存失敗，請稍後再試。");
    } finally {
      setSaving(null);
    }
  }

  function addProject() {
    const id = `project-${Date.now()}`;
    setProjects((current) => [...current, { id, title: "新建案", image: "", alt: "建案主視覺", positionX: 50, positionY: 50, scale: 1 }]);
  }

  if (loading) return <div className="py-20 text-center text-muted">載入實績中…</div>;

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold tracking-[.14em] text-cta">PORTFOLIO MANAGER</p><h1 className="mt-2 text-3xl sm:text-4xl">經典實績</h1><p className="mt-3 max-w-xl text-sm leading-7 text-muted">上傳建案主視覺，拖曳圖片調整位置，並用縮放滑桿控制圖片大小。</p></div>
        <button type="button" onClick={addProject} className="inline-flex items-center justify-center gap-2 bg-cta px-4 py-3 text-sm font-semibold text-white transition hover:bg-cta-hover"><Plus size={17} />新增案例</button>
      </div>

      <div aria-live="polite" className="min-h-8 py-4 text-sm text-muted">{notice}</div>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="border border-border bg-white p-5 sm:p-6">
            <div
              className="portfolio-media relative aspect-[4/3] cursor-move overflow-hidden bg-bg-alt touch-none"
              onPointerDown={(event) => startDrag(project.id, event)}
              onPointerMove={moveDrag}
              onPointerUp={() => setDrag(null)}
              onPointerCancel={() => setDrag(null)}
            >
              {project.image ? <img src={project.image} alt={project.alt} className="portfolio-media absolute inset-0 h-full w-full object-cover" style={{ objectPosition: `${project.positionX}% ${project.positionY}%`, transform: `scale(${project.scale})` }} /> : <div className="grid h-full place-items-center text-muted"><ImagePlus size={32} /></div>}
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-dark/80 px-2 py-1 text-xs text-white"><Move size={12} />拖曳調整位置</span>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="text-sm font-semibold text-primary">案例名稱<input value={project.title} onChange={(event) => updateProject(project.id, { title: event.target.value })} className="mt-2 w-full border border-border bg-bg px-3 py-2.5 outline-none focus:border-cta" /></label>
              <label className="flex cursor-pointer items-center gap-2 border border-dashed border-border px-3 py-3 text-sm text-muted hover:border-cta hover:text-cta"><Upload size={16} />{files[project.id]?.name || "選擇新的圖片"}<input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) { setFiles((current) => ({ ...current, [project.id]: file })); updateProject(project.id, { image: URL.createObjectURL(file) }); } }} /></label>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="text-xs font-semibold text-muted">水平位置 {Math.round(project.positionX)}%<input type="range" min="0" max="100" value={project.positionX} onChange={(event) => updateProject(project.id, { positionX: Number(event.target.value) })} className="mt-2 w-full accent-[#D6B866]" /></label>
                <label className="text-xs font-semibold text-muted">垂直位置 {Math.round(project.positionY)}%<input type="range" min="0" max="100" value={project.positionY} onChange={(event) => updateProject(project.id, { positionY: Number(event.target.value) })} className="mt-2 w-full accent-[#D6B866]" /></label>
                <label className="text-xs font-semibold text-muted">圖片大小 {Math.round(project.scale * 100)}%<input type="range" min="0.5" max="2" step="0.05" value={project.scale} onChange={(event) => updateProject(project.id, { scale: Number(event.target.value) })} className="mt-2 w-full accent-[#D6B866]" /></label>
              </div>
              <button type="button" onClick={() => void saveProject(project)} disabled={saving === project.id} className="inline-flex items-center justify-center gap-2 bg-dark px-4 py-3 text-sm font-semibold text-white transition hover:bg-cta disabled:opacity-50">{saving === project.id ? "儲存中…" : <><Save size={16} />儲存案例</>}</button>
            </div>
          </article>
        ))}
      </div>

      {projects.length > 0 && <p className="mt-8 flex items-center gap-2 text-xs text-muted"><Check size={14} className="text-cta" />公開頁面會依目前順序排列案例。</p>}
    </div>
  );
}
