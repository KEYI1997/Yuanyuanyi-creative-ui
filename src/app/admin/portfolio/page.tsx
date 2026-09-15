"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, ImagePlus, Move, Plus, RotateCcw, Save, Upload, X } from "lucide-react";

type PortfolioProject = {
  id: string;
  title: string;
  image: string;
  alt: string;
  positionX: number;
  positionY: number;
  scale: number;
};

type Gesture = {
  id: string;
  mode: "pan" | "scale";
  startX: number;
  startY: number;
  positionX: number;
  positionY: number;
  scale: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [gesture, setGesture] = useState<Gesture | null>(null);
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";
  const editingProject = projects.find((project) => project.id === editingId) ?? null;

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

  function startPan(projectId: string, event: React.PointerEvent<HTMLDivElement>) {
    const project = projects.find((item) => item.id === projectId);
    if (!project?.image) return;
    event.preventDefault();
    const crop = event.currentTarget.closest("[data-portfolio-crop]") as HTMLDivElement | null;
    crop?.setPointerCapture(event.pointerId);
    setGesture({ id: projectId, mode: "pan", startX: event.clientX, startY: event.clientY, positionX: project.positionX, positionY: project.positionY, scale: project.scale });
  }

  function startScale(projectId: string, event: React.PointerEvent<HTMLButtonElement>) {
    const project = projects.find((item) => item.id === projectId);
    if (!project?.image) return;
    event.preventDefault();
    event.stopPropagation();
    const crop = event.currentTarget.closest("[data-portfolio-crop]") as HTMLDivElement | null;
    crop?.setPointerCapture(event.pointerId);
    setGesture({ id: projectId, mode: "scale", startX: event.clientX, startY: event.clientY, positionX: project.positionX, positionY: project.positionY, scale: project.scale });
  }

  function moveGesture(event: React.PointerEvent<HTMLDivElement>) {
    if (!gesture) return;
    const crop = event.currentTarget.getBoundingClientRect();
    if (gesture.mode === "pan") {
      updateProject(gesture.id, {
        positionX: clamp(gesture.positionX - ((event.clientX - gesture.startX) / Math.max(crop.width, 1)) * 100, 0, 100),
        positionY: clamp(gesture.positionY - ((event.clientY - gesture.startY) / Math.max(crop.height, 1)) * 100, 0, 100),
      });
    } else {
      const delta = ((event.clientX - gesture.startX) + (event.clientY - gesture.startY)) / 2;
      updateProject(gesture.id, { scale: clamp(gesture.scale + (delta / Math.max(crop.width, 1)) * 1.75, 0.5, 3) });
    }
  }

  function endGesture(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setGesture(null);
  }

  function chooseFile(projectId: string, file: File) {
    setFiles((current) => ({ ...current, [projectId]: file }));
    updateProject(projectId, { image: URL.createObjectURL(file) });
    setEditingId(projectId);
  }

  function resetCrop(project: PortfolioProject) {
    updateProject(project.id, { positionX: 50, positionY: 50, scale: 1 });
  }

  async function saveProject(project: PortfolioProject): Promise<boolean> {
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
      return true;
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "儲存失敗，請稍後再試。");
      return false;
    } finally {
      setSaving(null);
    }
  }

  function addProject() {
    const id = `project-${Date.now()}`;
    const project = { id, title: "新建案", image: "", alt: "建案主視覺", positionX: 50, positionY: 50, scale: 1 };
    setProjects((current) => [...current, project]);
    setEditingId(id);
  }

  if (loading) return <div className="py-20 text-center text-muted">載入實績中…</div>;

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold tracking-[.14em] text-cta">PORTFOLIO MANAGER</p><h1 className="mt-2 text-3xl sm:text-4xl">經典實績</h1><p className="mt-3 max-w-xl text-sm leading-7 text-muted">上傳建案主視覺，開啟圖片編輯器後直接拖曳移動與縮放。</p></div>
        <button type="button" onClick={addProject} className="inline-flex items-center justify-center gap-2 bg-cta px-4 py-3 text-sm font-semibold text-white transition hover:bg-cta-hover"><Plus size={17} />新增案例</button>
      </div>

      <div aria-live="polite" className="min-h-8 py-4 text-sm text-muted">{notice}</div>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="border border-border bg-white p-5 sm:p-6">
            <div className="portfolio-media relative aspect-[4/3] overflow-hidden bg-bg-alt">
              {project.image ? <img src={project.image} alt={project.alt} className="portfolio-media absolute inset-0 h-full w-full object-cover" style={{ objectPosition: `${project.positionX}% ${project.positionY}%`, transform: `scale(${project.scale})` }} /> : <div className="grid h-full place-items-center text-muted"><ImagePlus size={32} /></div>}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-dark/80 px-3 py-2 text-xs text-white/80"><span className="inline-flex items-center gap-1"><Move size={12} />目前裁切預覽</span><button type="button" onClick={() => setEditingId(project.id)} className="inline-flex items-center gap-1 font-semibold text-warm hover:text-white">編輯圖片 <ChevronDown size={13} className="-rotate-90" /></button></div>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="text-sm font-semibold text-primary">案例名稱<input value={project.title} onChange={(event) => updateProject(project.id, { title: event.target.value })} className="mt-2 w-full border border-border bg-bg px-3 py-2.5 outline-none focus:border-cta" /></label>
              <label className="flex cursor-pointer items-center gap-2 border border-dashed border-border px-3 py-3 text-sm text-muted hover:border-cta hover:text-cta"><Upload size={16} />{files[project.id]?.name || "選擇新的圖片"}<input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) chooseFile(project.id, file); }} /></label>
              <button type="button" onClick={() => setEditingId(project.id)} className="inline-flex items-center justify-center gap-2 border border-border px-4 py-3 text-sm font-semibold text-primary transition hover:border-cta hover:text-cta"><Move size={16} />開啟視覺編輯器</button>
            </div>
          </article>
        ))}
      </div>

      {projects.length > 0 && <p className="mt-8 flex items-center gap-2 text-xs text-muted"><Check size={14} className="text-cta" />公開頁面會依目前順序排列案例。</p>}

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="portfolio-editor-title">
          <div className="w-full max-w-4xl border border-white/15 bg-bg-alt shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7"><div><p className="text-xs font-bold tracking-[.16em] text-cta">IMAGE EDITOR</p><h2 id="portfolio-editor-title" className="mt-1 text-2xl text-primary">編輯圖片</h2></div><button type="button" onClick={() => { setEditingId(null); setGesture(null); }} className="grid h-10 w-10 place-items-center text-muted transition hover:bg-white/10 hover:text-white" aria-label="關閉圖片編輯器"><X size={20} /></button></div>
            <div className="p-5 sm:p-7">
              <p className="mb-4 text-sm text-muted">拖曳圖片移動位置，拖曳右下角控制點自由放大或縮小。</p>
              <div className="mb-4 flex flex-wrap items-center gap-3"><label className="inline-flex cursor-pointer items-center gap-2 border border-dashed border-border px-3 py-2.5 text-sm text-muted transition hover:border-cta hover:text-cta"><Upload size={16} />{files[editingProject.id]?.name || "選擇圖片"}<input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) chooseFile(editingProject.id, file); }} /></label><span className="text-xs text-muted/70">建議使用與公開卡片比例接近的圖片</span></div>
              <div className="paper-grid relative overflow-hidden bg-dark p-3 sm:p-6">
                <div data-portfolio-crop className="portfolio-media relative mx-auto aspect-[4/3] w-[84%] max-w-3xl cursor-grab overflow-hidden border border-white/80 bg-[#252018] shadow-[0_0_0_999px_rgba(0,0,0,.28)] touch-none active:cursor-grabbing" onPointerDown={(event) => startPan(editingProject.id, event)} onPointerMove={moveGesture} onPointerUp={endGesture} onPointerCancel={endGesture}>
                  {editingProject.image ? <img src={editingProject.image} alt={editingProject.alt} draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" style={{ objectPosition: `${editingProject.positionX}% ${editingProject.positionY}%`, transform: `scale(${editingProject.scale})` }} /> : <div className="grid h-full place-items-center text-muted"><ImagePlus size={42} /><span className="sr-only">尚未選擇圖片</span></div>}
                  <div className="pointer-events-none absolute inset-0 border-2 border-cta/90" />
                  <span className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l-2 border-t-2 border-cta" /><span className="pointer-events-none absolute right-2 top-2 h-5 w-5 border-r-2 border-t-2 border-cta" /><span className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-cta" />
                  <button type="button" onPointerDown={(event) => startScale(editingProject.id, event)} disabled={!editingProject.image} className="absolute bottom-1 right-1 grid h-10 w-10 cursor-se-resize place-items-center bg-cta text-dark shadow-lg disabled:cursor-not-allowed disabled:opacity-40" aria-label="拖曳以調整圖片大小"><span className="text-lg leading-none">↘</span></button>
                </div>
                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 bg-dark/75 px-3 py-1.5 text-xs tracking-wide text-white/75 sm:bottom-5">拖曳圖片移動 · 拖曳右下角縮放</div>
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => resetCrop(editingProject)} className="inline-flex items-center justify-center gap-2 self-start text-sm text-muted transition hover:text-primary"><RotateCcw size={15} />重設裁切位置</button><div className="flex gap-3"><button type="button" onClick={() => { setEditingId(null); setGesture(null); }} className="border border-border px-5 py-3 text-sm font-semibold text-muted transition hover:border-primary hover:text-primary">取消</button><button type="button" onClick={async () => { const saved = await saveProject(editingProject); if (saved) setEditingId(null); }} disabled={saving === editingProject.id} className="inline-flex items-center justify-center gap-2 bg-cta px-5 py-3 text-sm font-semibold text-dark transition hover:bg-cta-hover disabled:opacity-50">{saving === editingProject.id ? "儲存中…" : <><Save size={16} />儲存圖片</>}</button></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
