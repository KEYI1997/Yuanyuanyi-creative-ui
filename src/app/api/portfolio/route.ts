import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import type { PortfolioProject } from "@/app/portfolio/page";

const CONTENT_KEY = "portfolio_projects";

function authorized(request: Request) {
  const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  return !expected || request.headers.get("x-admin-password") === expected;
}

const fallback: PortfolioProject[] = [
  { id: "yanmei-qianying", title: "岩美芊映", image: "/images/portfolio/yanmei-qianying.png", alt: "岩美芊映主視覺", positionX: 69.1396, positionY: 57.8362, scale: 1 },
  { id: "le-more", title: "樂MORE", image: "/images/portfolio/le-more.jpg", alt: "樂MORE主視覺", positionX: 50, positionY: 50, scale: 1 },
  { id: "hongtai-zhongli", title: "竑泰中壢山上段", image: "/images/portfolio/hongtai-zhongli.png", alt: "竑泰中壢山上段主視覺", positionX: 61.4528, positionY: 58.2381, scale: 1.02306 },
];

async function readProjects(supabase: ReturnType<typeof getServiceClient>) {
  const { data } = await supabase.from("site_content").select("value").eq("key", CONTENT_KEY).maybeSingle();
  if (!data?.value) return fallback;
  try {
    const parsed = JSON.parse(data.value) as PortfolioProject[];
    return Array.isArray(parsed) && parsed.length ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export async function GET() {
  try {
    const projects = await readProjects(getServiceClient());
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ projects: fallback });
  }
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "未授權" }, { status: 401 });

  try {
    const form = await request.formData();
    const id = String(form.get("id") || crypto.randomUUID());
    const title = String(form.get("title") || "未命名建案").trim();
    const positionX = Math.max(0, Math.min(100, Number(form.get("positionX") || 50)));
    const positionY = Math.max(0, Math.min(100, Number(form.get("positionY") || 50)));
    const scale = Math.max(0.5, Math.min(2, Number(form.get("scale") || 1)));
    const image = form.get("image");
    const supabase = getServiceClient();
    const projects = await readProjects(supabase);
    const existing = projects.find((project) => project.id === id);
    let imageUrl = existing?.image || "";

    if (image instanceof File && image.size > 0) {
      if (!image.type.startsWith("image/")) return NextResponse.json({ error: "請上傳圖片檔案" }, { status: 400 });
      if (image.size > 12 * 1024 * 1024) return NextResponse.json({ error: "圖片請小於 12MB" }, { status: 400 });
      const ext = image.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const path = `${id}.${ext}`;
      let upload = await supabase.storage.from("portfolio").upload(path, image, { upsert: true, contentType: image.type, cacheControl: "3600" });
      if (upload.error) {
        await supabase.storage.createBucket("portfolio", { public: true });
        upload = await supabase.storage.from("portfolio").upload(path, image, { upsert: true, contentType: image.type, cacheControl: "3600" });
      }
      if (upload.error) return NextResponse.json({ error: `圖片上傳失敗：${upload.error.message}` }, { status: 500 });
      imageUrl = supabase.storage.from("portfolio").getPublicUrl(path).data.publicUrl;
    }

    if (!imageUrl) return NextResponse.json({ error: "請先選擇一張圖片" }, { status: 400 });
    const project: PortfolioProject = { id, title, image: imageUrl, alt: `${title}主視覺`, positionX, positionY, scale };
    const nextProjects = existing ? projects.map((item) => item.id === id ? project : item) : [...projects, project];
    const { error } = await supabase.from("site_content").upsert({ key: CONTENT_KEY, value: JSON.stringify(nextProjects), updated_at: new Date().toISOString() }, { onConflict: "key" });
    if (error) return NextResponse.json({ error: `儲存失敗：${error.message}` }, { status: 500 });
    return NextResponse.json({ project, projects: nextProjects });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "儲存失敗" }, { status: 500 });
  }
}
