import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Building2, Check, Globe, MessageCircle, Target, Video } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import HeroDaylightReveal from "@/components/HeroDaylightReveal";

const services = [
  { no: "01", icon: Building2, title: "建案整體企劃", desc: "從市場研究、品牌定位到案名與銷售溝通，建立一套能說服市場的完整敘事。", href: "/solutions#planning" },
  { no: "02", icon: Target, title: "數位廣告投放", desc: "整合 Meta、Google 與 LINE，以數據找到真正可能走進接待中心的人。", href: "/solutions#advertising" },
  { no: "03", icon: Video, title: "建案影音製作", desc: "不只拍漂亮畫面，更把地段、空間與生活想像剪成願意看完的內容。", href: "/solutions#short-video" },
  { no: "04", icon: Globe, title: "建案網站設計", desc: "手機優先、資訊清楚、轉換順暢，讓每一次點擊都更接近一次有效詢問。", href: "/solutions#website" },
  { no: "05", icon: MessageCircle, title: "LINE 私域經營", desc: "從好友招募到分眾溝通，把短暫流量沉澱成可持續經營的客戶關係。", href: "/solutions#line" },
];

const process = [
  ["01", "看見問題", "市場、產品、客群一起讀，不急著先做一張漂亮的圖。"],
  ["02", "找出主張", "把建案最值得被記住的那件事，整理成清楚的溝通核心。"],
  ["03", "整合執行", "企劃、視覺、媒體與數位體驗同步推進，避免訊息各說各話。"],
  ["04", "持續修正", "以真實回饋與數據判斷，讓行銷不是交件，而是一段持續優化。"],
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[75vh] items-end overflow-hidden bg-dark pb-14 pt-32 text-white lg:min-h-[85vh] lg:pb-20 lg:pt-40">
        <HeroDaylightReveal />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,22,19,.94)_0%,rgba(16,22,19,.72)_42%,rgba(16,22,19,.12)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <AnimateOnScroll>
            <p className="eyebrow !text-warm">Real estate creative studio</p>
            <h1 className="my-10 max-w-5xl text-[clamp(2.5rem,6vw,6.5rem)] font-medium leading-[.94] tracking-[-.055em] text-white lg:my-14">
              建案不只被看見<br />更被記住
            </h1>
          </AnimateOnScroll>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <AnimateOnScroll delay={280} className="lg:justify-self-end">
              <div className="flex flex-wrap gap-3">
                <Link href="#contact" className="inline-flex items-center gap-3 bg-cta px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-cta-hover">預約專案諮詢 <ArrowUpRight size={17} /></Link>
                <Link href="/solutions" className="inline-flex items-center gap-3 border border-white/55 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-dark">查看服務內容</Link>
              </div>
            </AnimateOnScroll>
          </div>


        </div>
      </section>

      <section id="services" className="py-22 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <AnimateOnScroll>
            <div className="border-b border-primary pb-10">
              <p className="eyebrow">What we do</p>
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

      <section className="border-y border-border bg-bg-alt py-22 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <AnimateOnScroll>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="eyebrow">Selected perspectives</p><h2 className="mt-6 text-4xl sm:text-5xl">讓每一次心動，<br />都變成一次賞屋。</h2></div>
              <p className="max-w-md text-sm leading-7 text-muted">以建築與生活感為主角的視覺提案。不是堆疊華麗效果，而是建立一眼就能辨認的建案氣質。</p>
            </div>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <AnimateOnScroll direction="left">
              <figure className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-dark"><Image src="/images/project-brick-house.png" alt="磚紅立面的台灣當代住宅建築" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></div>
                <figcaption className="flex items-start justify-between border-t border-primary pt-4"><div><p className="text-xs font-bold tracking-[.14em] text-cta">VISUAL DIRECTION 01</p><h3 className="mt-2 text-2xl">城市裡的垂直庭院</h3></div><span className="text-xs text-muted">建築形象</span></figcaption>
              </figure>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <figure className="group lg:mb-16">
                <div className="relative aspect-[4/3] overflow-hidden bg-dark"><Image src="/images/project-interior.png" alt="自然光灑落的溫潤住宅室內空間" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></div>
                <figcaption className="flex items-start justify-between border-t border-primary pt-4"><div><p className="text-xs font-bold tracking-[.14em] text-cta">VISUAL DIRECTION 02</p><h3 className="mt-2 text-2xl">把日常的光留在家裡</h3></div><span className="text-xs text-muted">生活情境</span></figcaption>
              </figure>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-dark py-22 text-white lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <AnimateOnScroll direction="left"><p className="eyebrow !text-warm">How we work</p><h2 className="mt-7 text-4xl leading-tight sm:text-5xl lg:text-6xl">好的合作<br />從問對問題開始。</h2><p className="mt-7 max-w-md leading-8 text-white/55">提出答案以前，先把市場、產品與真正想溝通的人看清楚。</p></AnimateOnScroll>
            <div>
              {process.map(([no, title, desc], index) => (
                <AnimateOnScroll key={no} delay={index * 80}>
                  <div className="grid grid-cols-[42px_1fr] gap-4 border-t border-white/20 py-7 sm:grid-cols-[60px_180px_1fr]">
                    <span className="text-xs font-bold text-warm">{no}</span><h3 className="text-xl font-medium text-white">{title}</h3><p className="col-start-2 text-sm leading-7 text-white/50 sm:col-start-auto">{desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-22 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <AnimateOnScroll>
            <div className="grid gap-6 border-b border-primary pb-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <p className="eyebrow">What you get</p>
            </div>
          </AnimateOnScroll>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-stretch">
            <AnimateOnScroll direction="left">
              <div className="relative min-h-[360px] overflow-hidden bg-bg-alt sm:min-h-[520px]">
                <Image src="/images/studio-process.png" alt="團隊共同檢視建築圖面、材質與視覺提案" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
                <div className="absolute bottom-0 left-0 bg-dark px-5 py-4 text-xs font-semibold tracking-[.14em] text-warm">STRATEGY / CREATIVE / PERFORMANCE</div>
              </div>
            </AnimateOnScroll>
            <div className="flex flex-col justify-between">
              {[
                ["01", "定位變得清楚", "把建案的條件、價值與目標客群整理成一句能被理解、也能被記住的核心主張。"],
                ["02", "溝通保持一致", "從文案、視覺到廣告與網站，每一個接觸點都說著同一個品牌故事。"],
                ["03", "成效有跡可循", "讓執行不只憑感覺，透過詢問、互動與轉換數據持續修正下一步。"],
              ].map(([no, title, desc], index) => (
                <AnimateOnScroll key={no} delay={index * 100}>
                  <div className="border-t border-border py-7 lg:py-9">
                    <div className="flex items-baseline gap-5"><span className="text-xs font-bold text-cta">{no}</span><h3 className="text-2xl font-medium">{title}</h3></div>
                    <p className="mt-4 pl-10 text-sm leading-7 text-muted">{desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
              <div className="border-t border-primary pt-7"><Link href="/solutions" className="inline-flex items-center gap-3 text-sm font-semibold text-cta transition-colors hover:text-cta-hover">看看我們如何整合服務 <ArrowUpRight size={17} /></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* 關於我們 */}
      <section id="about" className="scroll-mt-24 py-22 lg:py-32 bg-bg-alt">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <AnimateOnScroll>
            <div className="grid gap-10 lg:grid-cols-[.6fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow">About us</p>
                <h2 className="mt-7 text-4xl leading-tight sm:text-5xl">圓圓乙創意留名</h2>
              </div>
              <div className="max-w-2xl">
                <p className="text-lg leading-9 text-muted">
                  我們是一間專注建案行銷的創意團隊，從品牌定位、廣告投放到影音與網站製作，協助建設公司把建案的價值，用對的方式傳達給對的人。
                </p>
                <p className="mt-5 leading-8 text-muted">
                  不做華而不實的包裝，只做能帶來詢問與記憶的溝通。每一個建案都值得被好好說一次。
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
              <p className="eyebrow !text-warm">Contact</p>
              <h2 className="mt-7 text-4xl leading-tight sm:text-5xl">有想法？<br />聊聊就是開始。</h2>
              <p className="mt-7 max-w-md leading-8 text-white/55">不論是剛起步的建案企劃，或是正在尋找行銷夥伴，都歡迎填寫表單，我們會盡快回覆。</p>
              <div className="mt-8 space-y-3 text-sm text-white/50">
                <p>桃園市楊梅區</p>
                <p>03-4229123</p>
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
        <input type="email" id="email" name="email" className="w-full border-b border-white/25 bg-transparent px-0 py-3 text-white placeholder:text-white/30 focus:border-warm" placeholder="your@email.com…" />
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
