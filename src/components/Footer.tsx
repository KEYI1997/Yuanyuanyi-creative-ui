import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-22">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.3fr_.7fr_.7fr] lg:gap-20">
          <div>
            <p className="eyebrow !text-warm">Start a project</p>
            <h2 className="mt-7 max-w-2xl text-4xl leading-[1.2] sm:text-5xl">好土地<br />就該有一個好故事</h2>
            <Link href="/contact" className="mt-9 inline-flex items-center gap-3 border-b border-warm pb-2 text-warm transition-colors hover:border-white hover:text-white">
              告訴我們你的建案 <ArrowUpRight size={18} />
            </Link>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold tracking-[.16em] text-white/45">SITEMAP</p>
            <div className="space-y-3 text-sm text-white/70">
              <Link className="block hover:text-white" href="/solutions">服務內容</Link>
              <Link className="block hover:text-white" href="/about">關於我們</Link>
              <Link className="block hover:text-white" href="/contact">聯絡洽詢</Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold tracking-[.16em] text-white/45">CONTACT</p>
            <div className="space-y-4 text-sm text-white/70">
              <a href="tel:03-4229123" className="flex items-center gap-3 hover:text-white"><Phone size={15} />03-4229123</a>
              <p className="flex items-center gap-3"><MapPin size={15} />桃園市</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} 圓圓乙創意留名</p>
          <p>策略 × 創意 × 成效</p>
        </div>
      </div>
    </footer>
  );
}
