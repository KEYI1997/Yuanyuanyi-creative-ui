import Link from "next/link";
import { ArrowRight, BarChart3, Compass, Layers3, Search, Phone } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我們",
  description: "圓圓乙創意留名專注建案行銷，整合企劃、廣告、影音、網站與 LINE。",
};

const values = [
  { icon: Search, title: "看懂市場", desc: "策略從市場與產品開始。" },
  { icon: Compass, title: "說清價值", desc: "把複雜條件整理成市場聽得懂的賣點。" },
  { icon: Layers3, title: "整合執行", desc: "讓企劃、視覺與媒體保持一致。" },
  { icon: BarChart3, title: "數據優化", desc: "用結果決定下一步。" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-bg-alt px-5 pb-20 pt-32 lg:px-12 lg:pb-28 lg:pt-44">
        <div className="mx-auto max-w-[1440px]">
          <AnimateOnScroll>
            <p className="eyebrow">ABOUT US</p>
            <h1 className="mt-8 max-w-4xl text-5xl leading-[1.12] sm:text-6xl lg:text-8xl">我們專注一件事：<br />把建案行銷做好。</h1>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-muted">市場不是缺廣告。<br />缺的是清楚的定位、一致的溝通，以及能持續優化的執行。</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:px-12">
          <AnimateOnScroll direction="left">
            <p className="eyebrow">ABOUT</p>
            <h2 className="mt-7 text-4xl leading-tight sm:text-5xl">圓圓乙創意留名</h2>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <div className="max-w-3xl space-y-6 text-lg leading-9 text-muted">
              <p>我們專做建案行銷。</p>
              <p>從市場定位、企劃、廣告，到影音、網站與 LINE，協助建設公司把產品說清楚，把行銷做有效。</p>
              <p>不為了好看而行銷。每一個策略、畫面與廣告，最後都要回到一件事：</p>
              <p className="text-2xl font-semibold text-primary">讓市場理解，讓客戶行動。</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="bg-bg-alt py-20 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <AnimateOnScroll>
            <p className="eyebrow">核心價值</p>
            <h2 className="mt-7 text-4xl sm:text-5xl">讓每一個環節<br />都朝銷售目標前進。</h2>
          </AnimateOnScroll>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <AnimateOnScroll key={value.title} delay={index * 90}>
                <article className="border border-border bg-white p-7">
                  <value.icon size={24} className="text-cta" />
                  <h3 className="mt-8 text-2xl">{value.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{value.desc}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark py-16 text-white lg:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <div>
            <p className="eyebrow !text-warm">CONTACT</p>
            <h2 className="mt-5 text-3xl sm:text-4xl">有建案，就來聊聊。</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-cta px-6 py-3 font-semibold text-dark hover:bg-cta-hover">洽談建案 <ArrowRight size={18} /></Link>
            <a href="tel:03-4229123" className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-semibold hover:border-white"><Phone size={17} />03-4229123</a>
          </div>
        </div>
      </section>
    </>
  );
}
