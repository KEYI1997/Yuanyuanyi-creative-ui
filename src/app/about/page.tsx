import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Heart,
  Lightbulb,
  Award,
  Users,
  Building2,
  TrendingUp,
  Phone,
} from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我們",
  description:
    "認識圓圓乙創意留名 — 專注建案企劃的行銷團隊，以策略思維為建設公司打造最佳行銷方案。",
};

const values = [
  {
    icon: Target,
    title: "精準策略",
    desc: "每一個行銷動作都基於數據與市場分析，不做無效的投入。",
  },
  {
    icon: Heart,
    title: "用心服務",
    desc: "把客戶的建案當成自己的作品，用心對待每一個細節。",
  },
  {
    icon: Lightbulb,
    title: "創意驅動",
    desc: "在專業框架中注入創意元素，讓建案在市場中脫穎而出。",
  },
  {
    icon: TrendingUp,
    title: "結果導向",
    desc: "一切以成果說話，持續追蹤優化直到達成目標。",
  },
];

const milestones = [
  { year: "成立", desc: "圓圓乙創意留名成立，專注建案企劃領域" },
  { year: "深耕", desc: "持續深耕房地產行銷，累積豐富建案經驗" },
  { year: "整合", desc: "建立完整服務鏈：企劃、投放、影音、網站、LINE" },
  { year: "展望", desc: "持續擴大服務版圖，成為建案行銷的首選夥伴" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-cta font-medium text-sm uppercase tracking-widest mb-3">
                About Us
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
                關於圓圓乙創意留名
              </h1>
              <p className="text-muted text-lg leading-relaxed">
                我們是一群熱愛房地產行銷的專業團隊，
                致力於為建設公司提供最完整的行銷解決方案。
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll direction="left">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                  在平凡世界中
                  <br />
                  <span className="text-cta">無限思考</span>
                </h2>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>
                    我們相信每一個建案都有它獨特的故事，
                    而我們的使命就是找到那個故事，並用最精準的方式傳達給對的人。
                  </p>
                  <p>
                    從建案整體企劃到數位行銷執行，圓圓乙創意留名整合了策略規劃、廣告投放、
                    影音製作、網站設計與 LINE 經營五大服務，
                    為建設公司提供一站式的行銷解決方案。
                  </p>
                  <p>
                    我們不做千篇一律的行銷，而是深入了解每個建案的特色、每塊土地的故事，
                    量身打造最適合的行銷策略，讓每一個建案都被正確的人看見。
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden bg-dark">
                  <Image src="/images/studio-process.png" alt="團隊在木桌上討論建築圖面與材質提案" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="grid grid-cols-2 border-l border-t border-border">
                  {[[Building2, "50+", "合作建案"], [Users, "30+", "合作夥伴"], [Award, "10 年+", "行銷經驗"], [TrendingUp, "95%", "客戶滿意度"]].map(([Icon, value, label]) => {
                    const StatIcon = Icon as typeof Building2;
                    return <div key={String(label)} className="border-b border-r border-border bg-white p-5"><StatIcon size={17} className="text-cta" /><p className="mt-4 font-heading text-3xl text-primary">{String(value)}</p><p className="mt-1 text-xs text-muted">{String(label)}</p></div>;
                  })}
                </figcaption>
              </figure>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 核心價值 */}
      <section className="py-20 lg:py-28 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                核心價值
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                這些是我們團隊堅持的信念，也是每一次服務的基礎。
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <AnimateOnScroll key={val.title} delay={i * 100}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-cta/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <val.icon size={28} className="text-cta" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{val.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{val.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 里程碑 */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-primary text-center mb-14">
              發展歷程
            </h2>
          </AnimateOnScroll>

          <div className="space-y-8">
            {milestones.map((ms, i) => (
              <AnimateOnScroll key={ms.year} delay={i * 100}>
                <div className="flex items-start gap-6">
                  <div className="w-20 shrink-0">
                    <span className="text-cta font-bold text-lg">{ms.year}</span>
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-border">
                    <p className="text-primary">{ms.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              與我們一起走出不凡的路
            </h2>
            <p className="text-white/60 mb-8">
              讓圓圓乙創意留名成為您下一個建案的行銷夥伴。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-cta text-white px-8 py-4 rounded-lg hover:bg-cta-hover transition-colors font-semibold"
              >
                聯絡我們 <ArrowRight size={18} />
              </Link>
              <a
                href="tel:03-4229123"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg hover:border-warm transition-colors font-semibold"
              >
                <Phone size={18} /> 03-4229123
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
