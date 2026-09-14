"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Search,
  Target,
  Compass,
  PenTool,
  BarChart3,
  TrendingUp,
  Eye,
  MousePointerClick,
  Camera,
  Film,
  Plane,
  Clapperboard,
  Smartphone,
  Zap,
  LayoutGrid,
  Bot,
  Send,
  UserPlus,
  Phone,
} from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const tabs = [
  { no: "01", label: "建案整體企劃" },
  { no: "02", label: "數位廣告" },
  { no: "03", label: "建案影音" },
  { no: "04", label: "建案網站" },
  { no: "05", label: "官方 LINE" },
];

const tabContents = [
  {
    title: "建案整體企劃",
    headline: "",
    desc: "從市場研究到銷售執行，建立建案清楚的市場定位。",
    features: [
      { icon: Search, title: "市場研究", desc: "分析區域、競品、產品與目標客群。" },
      { icon: Compass, title: "品牌定位", desc: "找出核心賣點與市場差異。" },
      { icon: PenTool, title: "案名與文案", desc: "建立案名、主訴求、品牌語言與銷售說法。" },
      { icon: BarChart3, title: "銷售物設計", desc: "整合 DM、海報、圍籬、接待中心與銷售素材。" },
    ],
  },
  {
    title: "數位廣告",
    headline: "把預算\n花在有效來客上。",
    desc: "整合 Meta、Google Ads 與 LINE LAP，持續測試受眾、素材與轉換成效。",
    features: [
      { icon: Target, title: "受眾策略", desc: "鎖定真正可能購屋的目標客群。" },
      { icon: Eye, title: "素材測試", desc: "持續測試文案、視覺與廣告組合。" },
      { icon: TrendingUp, title: "成效優化", desc: "依點擊、名單與轉換調整投放。" },
      { icon: BarChart3, title: "數據報表", desc: "清楚掌握預算與廣告成效。" },
    ],
  },
  {
    title: "建案影音",
    headline: "把建案賣點\n變成願意看完的內容。",
    desc: "把建案賣點變成願意看完的內容。",
    features: [
      { icon: Film, title: "建案形象影片", desc: "呈現建築、空間、環境與品牌形象。" },
      { icon: Camera, title: "社群短影音", desc: "以短影音放大地段、產品與生活賣點。" },
      { icon: Plane, title: "空拍影像", desc: "呈現基地位置、環境與區域條件。" },
      { icon: Clapperboard, title: "工程紀錄", desc: "記錄施工與建築品質。" },
    ],
  },
  {
    title: "建案網站",
    headline: "讓流量進來\n也讓詢問留下來。",
    desc: "依建案定位規劃網站內容與瀏覽動線，讓訪客快速理解產品並完成詢問。",
    features: [
      { icon: Smartphone, title: "RWD", desc: "支援手機、平板與桌機。" },
      { icon: LayoutGrid, title: "資訊架構", desc: "快速找到房型、地段、產品與建案資訊。" },
      { icon: Search, title: "SEO 基礎", desc: "建立搜尋引擎友善網站架構。" },
      { icon: MousePointerClick, title: "轉換設計", desc: "清楚安排預約、電話與 LINE 行動入口。" },
    ],
  },
  {
    title: "官方 LINE",
    headline: "把廣告流量\n變成自己的名單。",
    desc: "把廣告流量變成自己的名單。",
    features: [
      { icon: LayoutGrid, title: "圖文選單", desc: "建立清楚的建案資訊入口。" },
      { icon: Bot, title: "自動回覆", desc: "快速回應常見問題與基本需求。" },
      { icon: Send, title: "分眾推播", desc: "依客群與需求傳遞適合的內容。" },
      { icon: UserPlus, title: "好友經營", desc: "持續累積可再次溝通的潛在客戶。" },
    ],
  },
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const goTo = (index: number) => {
    if (index === activeTab) return;
    setActiveTab(index);
  };

  const goPrev = () => goTo(activeTab > 0 ? activeTab - 1 : tabs.length - 1);
  const goNext = () => goTo(activeTab < tabs.length - 1 ? activeTab + 1 : 0);

  return (
    <>
      {/* Hero + Tabs */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <p className="text-warm font-medium text-sm uppercase tracking-widest mb-4">
              SERVICES
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              建案整合行銷
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12">
              從策略到執行，讓每一個行銷環節都朝同一個目標前進。
            </p>
          </AnimateOnScroll>

          {/* Tab 按鈕 */}
        </div>
      </section>

      {/* 內容區域 */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-16 sm:px-20 lg:px-28">
          {/* Tab 按鈕 */}
          <div className="group/tabs flex flex-wrap items-center justify-center gap-8 mb-14">
            {tabs.map((tab, index) => (
              <button
                key={tab.no}
                onClick={() => goTo(index)}
                className={`group/tab relative pb-3 text-sm transition-colors cursor-pointer ${
                  activeTab === index ? "text-primary" : "text-muted hover:text-primary"
                }`}
              >
                <span>{tab.no} / {tab.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-300 ${
                    activeTab === index
                      ? "w-full group-hover/tabs:w-0 group-hover/tab:!w-full"
                      : "w-0 group-hover/tab:w-full"
                  }`}
                />
              </button>
            ))}
          </div>
          {/* 左箭頭 */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-muted hover:text-primary transition-colors cursor-pointer"
            aria-label="上一個服務"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* 右箭頭 */}
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-muted hover:text-primary transition-colors cursor-pointer"
            aria-label="下一個服務"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-800 ease-out"
              style={{ transform: `translateX(-${activeTab * 100}%)` }}
            >
              {tabContents.map((content, index) => (
                <div key={index} className="w-full shrink-0">
                  <div className="mb-10">
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">{content.title}</h2>
                    {content.headline && <p className="mb-5 whitespace-pre-line text-3xl leading-tight text-primary lg:text-4xl">{content.headline}</p>}
                    <p className="text-muted leading-relaxed max-w-3xl">{content.desc}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.features.map((feat) => (
                      <div key={feat.title} className="border border-border p-6 hover:border-cta transition-colors">
                        <div className="w-10 h-10 bg-cta/10 flex items-center justify-center mb-3">
                          <feat.icon size={20} className="text-cta" />
                        </div>
                        <h3 className="font-semibold text-primary mb-2">{feat.title}</h3>
                        <p className="text-muted text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="py-16 bg-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              有建案就來聊聊。
            </h2>
            <p className="text-white/70 mb-8">
              無論是新案前期定位、廣告投放，或整體行銷整合，都歡迎與我們聯繫。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-white text-cta px-8 py-4 font-semibold hover:bg-bg-alt transition-colors"
              >
                免費諮詢 <ArrowRight size={18} />
              </Link>
              <a
                href="tel:03-4229123"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 font-semibold hover:border-white transition-colors"
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
