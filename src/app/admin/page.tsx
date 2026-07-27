import Link from "next/link";
import { ArrowUpRight, BarChart3, FileText, Inbox } from "lucide-react";

export default function AdminPage() {
  return (
    <div>
      <p className="text-xs font-bold tracking-[.14em] text-cta">OVERVIEW</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">工作台總覽</h1>
      <p className="mt-3 text-sm text-muted">集中查看網站收到的客戶詢問與後續狀態。</p>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/contacts" className="group border border-border bg-white p-6 transition hover:border-cta sm:p-8">
          <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center bg-bg-alt text-cta"><Inbox size={20} /></span><ArrowUpRight size={18} className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cta" /></div>
          <h2 className="mt-10 text-2xl">聯絡表單</h2><p className="mt-2 text-sm text-muted">查看、標記與整理所有專案詢問。</p>
        </Link>
        <Link href="/admin/analytics" className="group border border-border bg-white p-6 transition hover:border-cta sm:p-8">
          <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center bg-bg-alt text-cta"><BarChart3 size={20} /></span><ArrowUpRight size={18} className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cta" /></div>
          <h2 className="mt-10 text-2xl">網站數據</h2><p className="mt-2 text-sm text-muted">瀏覽量、獨立訪客與熱門頁面追蹤。</p>
        </Link>
        <div className="border border-dashed border-border p-6 text-muted sm:p-8"><FileText size={20} /><p className="mt-10 text-sm">後續可在這裡加入專案、內容或成效報表模組。</p></div>
      </div>
    </div>
  );
}
