"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, FileText, LayoutDashboard, LockKeyhole } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!authed) {
    return (
      <div className="grid min-h-screen bg-dark lg:grid-cols-[1fr_1fr]">
        <div className="paper-grid relative hidden overflow-hidden border-r border-white/10 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <Link href="/" className="flex items-center gap-3 text-sm text-white/60 hover:text-white"><ArrowLeft size={16} />回到網站</Link>
          <div><p className="eyebrow !text-warm">Studio console</p><h1 className="mt-7 max-w-xl text-6xl leading-[1.05]">把每一個詢問，<br />接成下一段合作。</h1></div>
          <p className="text-xs tracking-[.12em] text-white/35">圓圓乙創意留名 · INTERNAL USE ONLY</p>
        </div>
        <div className="flex items-center justify-center bg-bg px-5 py-16">
          <div className="w-full max-w-sm">
            <div className="mb-10 flex h-12 w-12 items-center justify-center border border-primary"><LockKeyhole size={20} /></div>
            <p className="mb-2 text-xs font-bold tracking-[.16em] text-cta">WELCOME BACK</p>
            <h2 className="text-4xl">登入工作台</h2>
            <p className="mt-3 text-sm text-muted">請輸入管理密碼以查看客戶詢問。</p>
            <form className="mt-9" onSubmit={(e) => { e.preventDefault(); if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) { setAuthed(true); setError(""); } else setError("密碼不正確，請再試一次。"); }}>
              <label htmlFor="admin-password" className="mb-2 block text-xs font-semibold tracking-wide text-primary">管理密碼</label>
              <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-border bg-white px-4 py-3.5 outline-none transition focus:border-cta focus:ring-1 focus:ring-cta" placeholder="輸入密碼" autoComplete="current-password" />
              <div aria-live="polite" className="min-h-8 pt-2 text-sm text-red-700">{error}</div>
              <button type="submit" className="mt-2 w-full bg-cta py-3.5 text-sm font-semibold text-white transition hover:bg-cta-hover">進入工作台</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const links = [
    { href: "/admin", label: "總覽", icon: LayoutDashboard },
    { href: "/admin/contacts", label: "聯絡表單", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#f3f1ec] text-primary md:grid md:grid-cols-[230px_1fr]">
      <aside className="border-b border-border bg-dark px-5 py-5 text-white md:fixed md:inset-y-0 md:w-[230px] md:border-b-0 md:px-6 md:py-8">
        <div className="flex items-center justify-between md:block">
          <Link href="/admin" className="font-heading text-lg tracking-[.08em]">圓圓乙<span className="ml-2 font-body text-[9px] tracking-[.18em] text-warm">ADMIN</span></Link>
          <Link href="/" className="text-white/45 hover:text-white md:hidden"><ArrowLeft size={18} /></Link>
        </div>
        <nav className="mt-5 flex gap-2 md:mt-12 md:block md:space-y-2" aria-label="後台導覽">
          {links.map((link) => { const active = pathname === link.href; return <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-3 text-sm transition ${active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"}`}><link.icon size={17} />{link.label}</Link>; })}
        </nav>
        <Link href="/" className="absolute bottom-7 hidden items-center gap-2 text-xs text-white/40 hover:text-white md:flex"><ArrowLeft size={14} />回到前台網站</Link>
      </aside>
      <main className="md:col-start-2">
        <div className="border-b border-border bg-white/70 px-5 py-4 backdrop-blur sm:px-8"><p className="text-xs font-semibold tracking-[.12em] text-muted">CLIENT INQUIRY CONSOLE</p></div>
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">{children}</div>
      </main>
    </div>
  );
}
