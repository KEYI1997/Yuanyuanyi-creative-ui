"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/solutions", label: "服務內容" },
  { href: "/#about", label: "關於我們" },
  { href: "/#contact", label: "聯絡洽詢" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const darkHeroPages = ["/solutions"];
  const homeAtTop = darkHeroPages.includes(pathname) && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-bg/95 border-b border-border backdrop-blur-lg" : "bg-transparent"}`}>
      <div className="mx-auto flex h-18 max-w-[1440px] items-center px-5 sm:px-8 lg:h-22 lg:px-12">
        <Link href="/" className={`group flex items-center gap-3 ${homeAtTop ? "text-white" : "text-primary"}`} aria-label="圓圓乙創意留名首頁">
          <span className={`grid h-9 w-9 place-items-center border border-current font-heading text-lg transition-colors group-hover:bg-cta group-hover:text-white ${homeAtTop ? "text-white" : "text-cta"}`}>乙</span>
          <span className="leading-none">
            <strong className="block font-heading text-base tracking-[.12em]">圓圓乙創意留名</strong>
            <small className={`mt-1 block text-[9px] font-semibold tracking-[.2em] ${homeAtTop ? "text-white/55" : "text-muted"}`}>REAL ESTATE CREATIVE</small>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-9 lg:flex" aria-label="主要導覽">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-cta after:transition-transform ${pathname === link.href ? "text-cta after:scale-x-100" : homeAtTop ? "text-white/80 after:scale-x-0 hover:text-white hover:after:scale-x-100" : "text-primary after:scale-x-0 hover:text-cta hover:after:scale-x-100"}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" className={`inline-flex items-center gap-2 border px-5 py-3 text-sm font-semibold transition-colors hover:border-cta hover:bg-cta hover:text-white ${homeAtTop ? "border-white/55 text-white" : "border-primary text-primary"}`}>
            開始聊聊 <ArrowUpRight size={16} />
          </Link>
        </nav>

        <button type="button" onClick={() => setOpen(!open)} className={`ml-auto grid h-11 w-11 place-items-center lg:hidden ${homeAtTop ? "text-white" : "text-primary"}`} aria-label={open ? "關閉選單" : "開啟選單"} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="border-t border-border px-5 py-5" aria-label="行動版導覽">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-4 text-lg font-medium text-primary">
              <span><span className="mr-4 text-xs text-cta">0{index + 1}</span>{link.label}</span>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
