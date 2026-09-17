import Link from "next/link";
import { ArrowUpRight, Building2, Globe, MessageCircle, Target, Video } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ChampagneHero from "@/components/ChampagneHero";
import "@/styles/champagne-hero.css";

const services = [
  { no: "01", icon: Building2, title: "建案整體企劃", desc: "市場研究、產品定位、案名與銷售策略，找出建案最清楚的市場切入點。", href: "/solutions#planning" },
  { no: "02", icon: Target, title: "數位廣告", desc: "整合 Meta、Google、LINE LAP，從受眾、素材到轉換持續優化。", href: "/solutions#advertising" },
  { no: "03", icon: Video, title: "建案影音", desc: "形象影片、短影音、空拍與工程紀錄，用影像放大建案賣點。", href: "/solutions#short-video" },
  { no: "04", icon: Globe, title: "建案網站", desc: "手機優先、資訊清楚、轉換導向，讓瀏覽更接近一次有效詢問。", href: "/solutions#website" },
  { no: "05", icon: MessageCircle, title: "官方 LINE", desc: "整合選單、自動回覆、分眾推播與名單經營，把一次流量變成持續溝通。", href: "/solutions#line" },
];

export default function Home() {
  return (
    <>
      <ChampagneHero />

      <section id="services" className="py-22 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <AnimateOnScroll>
            <div className="border-b border-primary pb-10">
              <p className="eyebrow">WHAT WE DO</p>
              <h2 className="mt-7 text-4xl sm:text-5xl">建案整合行銷</h2>
              <p className="mt-5 max-w-2xl text-muted">從策略到執行，讓每一個行銷環節都朝同一個目標前進。</p>
            </div>
          </AnimateOnScroll>

          <div className="mt-2">
            {services.map((service, index) => (
              <AnimateOnScroll key={service.no} delay={index * 150} direction="left">
                <Link href={service.href} className="group grid gap-4 border-b border-border py-8 transition-colors hover:border-cta sm:grid-cols-[70px_1fr_auto] sm:items-center lg:grid-cols-[100px_1fr_1fr_auto]">
                  <span className="text-xs font-light tracking-[.16em] text-cta transition-transform duration-300 origin-left group-hover:scale-[4]">{service.no}</span>
                  <span><strong className="relative inline-block pb-2 font-heading text-2xl font-medium lg:text-3xl">{service.title}<span className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" /></strong></span>
                  <p className="max-w-lg text-sm leading-7 text-muted sm:col-start-2 lg:col-start-auto">{service.desc}</p>
                  <ArrowUpRight className="hidden transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" size={20} />
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 關於我們 */}
      <section id="about" className="scroll-mt-24 py-22 lg:py-32 bg-bg-alt">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <AnimateOnScroll>
            <div className="grid gap-10 lg:grid-cols-[.6fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow">ABOUT</p>
                <h2 className="mt-7 text-4xl leading-tight sm:text-5xl">圓圓乙創意留名</h2>
              </div>
              <div className="max-w-2xl">
                <p className="text-lg leading-9 text-muted">
                  協助建設公司把產品說清楚，把行銷做有效。每一個策略、畫面與廣告，最後都要回到一件事：讓市場理解，讓客戶行動。
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 聯絡表單 */}
      <section id="contact" className="scroll-mt-24 bg-dark py-22 text-white lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <AnimateOnScroll direction="left">
              <p className="eyebrow !text-warm">CONTACT</p>
              <h2 className="mt-7 text-4xl leading-tight sm:text-5xl">有建案<br />就來聊聊。</h2>
              <p className="mt-7 max-w-md leading-8 text-white/55">無論是新案前期定位、廣告投放，或整體行銷整合，都歡迎與我們聯繫。</p>
              <div className="mt-8 space-y-3 text-sm text-white/50">
                <p>電話｜03-4229123</p>
                <p>地區｜桃園市</p>
                <a href="mailto:y.yuanyi001@gmail.com" className="block hover:text-white">Email｜y.yuanyi001@gmail.com</a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <ContactForm />
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  return (
    <form action="/api/contact" method="POST" className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/70">姓名 *</label>
          <input type="text" id="name" name="name" required className="w-full border-b border-white/25 bg-transparent px-0 py-3 text-white placeholder:text-white/30 focus:border-warm" placeholder="您的姓名…" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/70">電話 *</label>
          <input type="tel" id="phone" name="phone" required className="w-full border-b border-white/25 bg-transparent px-0 py-3 text-white placeholder:text-white/30 focus:border-warm" placeholder="0912-345-678…" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">Email</label>
        <input type="email" id="email" name="email" className="w-full border-b border-white/25 bg-transparent px-0 py-3 text-white placeholder:text-white/30 focus:border-warm" placeholder="y.yuanyi001@gmail.com…" />
      </div>
      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-white/70">訊息</label>
        <textarea id="description" name="description" rows={4} className="w-full border-b border-white/25 bg-transparent px-0 py-3 text-white placeholder:text-white/30 focus:border-warm" placeholder="簡單描述您的需求或想討論的內容…" />
      </div>
      <button type="submit" className="mt-4 inline-flex items-center gap-3 bg-cta px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-cta-hover">
        送出表單 <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
