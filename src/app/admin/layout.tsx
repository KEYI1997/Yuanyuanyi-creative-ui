"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, BarChart3, FileText, Images, LayoutDashboard, LockKeyhole } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!authed) {
    return (
      <div className="admin-login flex min-h-screen items-center justify-center bg-[#f3f4f6] px-5 py-12">
        <div className="w-full max-w-md border border-[#e1e5ea] bg-white px-7 py-9 shadow-sm sm:px-10 sm:py-11">
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-[#52647b] transition hover:text-[#0e2a4d]"><ArrowLeft size={16} />回到網站</Link>
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-md bg-[#dbeafe] text-[#155eef]"><LockKeyhole size={20} /></div>
          <p className="mb-2 text-xs font-bold tracking-[.16em] text-[#155eef]">WELCOME BACK</p>
          <h1 className="text-4xl font-semibold text-[#0e2a4d]">登入工作台</h1>
          <p className="mt-3 text-sm text-[#52647b]">請輸入管理密碼以查看客戶詢問。</p>
          <form className="mt-9" onSubmit={(e) => { e.preventDefault(); if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) { setAuthed(true); setError(""); } else setError("密碼不正確，請再試一次。"); }}>
            <label htmlFor="admin-password" className="mb-2 block text-xs font-semibold tracking-wide text-[#0e2a4d]">管理密碼</label>
            <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-[#cfd7e3] bg-white px-4 py-3.5 text-[#0e2a4d] outline-none transition focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]/20" placeholder="輸入密碼" autoComplete="current-password" />
            <div aria-live="polite" className="min-h-8 pt-2 text-sm text-red-700">{error}</div>
            <button type="submit" className="mt-2 w-full rounded-md bg-[#1d63ed] py-3.5 text-sm font-semibold text-white transition hover:bg-[#155eef]">進入工作台</button>
          </form>
        </div>
      </div>
    );
  }

  const links = [
    { href: "/admin", label: "總覽", icon: LayoutDashboard },
    { href: "/admin/portfolio", label: "案例管理", icon: Images },
    { href: "/admin/contacts", label: "表單查看", icon: FileText },
    { href: "/admin/analytics", label: "網站數據", icon: BarChart3 },
  ];

  return (
    <div className="admin-shell min-h-screen bg-[#f3f4f6] text-[#0e2a4d] md:grid md:grid-cols-[278px_1fr]">
      <aside className="border-b border-[#e1e5ea] bg-white px-5 py-5 text-[#0e2a4d] md:fixed md:inset-y-0 md:w-[278px] md:border-b-0 md:border-r md:px-5 md:py-7">
        <div className="flex items-center justify-between md:block">
          <Link href="/admin" className="font-heading text-xl font-semibold tracking-[.04em]">圓圓乙後台</Link>
          <Link href="/" className="text-[#52647b] hover:text-[#0e2a4d] md:hidden"><ArrowLeft size={18} /></Link>
        </div>
        <nav className="mt-5 flex gap-2 overflow-x-auto md:mt-10 md:block md:space-y-1" aria-label="後台導覽">
          {links.map((link) => { const active = pathname === link.href; return <Link key={link.href} href={link.href} className={`flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-sm transition ${active ? "bg-[#dbeafe] font-semibold text-[#155eef]" : "text-[#16324f] hover:bg-[#f3f6fa]"}`}><link.icon size={17} />{link.label}</Link>; })}
        </nav>
        <Link href="/" className="absolute bottom-7 hidden items-center gap-2 text-xs text-[#728196] hover:text-[#0e2a4d] md:flex"><ArrowLeft size={14} />回到前台網站</Link>
      </aside>
      <main className="md:col-start-2">
        <div className="border-b border-[#e1e5ea] bg-white px-5 py-5 sm:px-8"><p className="text-sm font-semibold text-[#52647b]">網站總覽</p></div>
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">{children}</div>
      </main>
    </div>
  );
}
