"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Search,
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
  { no: "02", label: "廣告投放" },
  { no: "03", label: "建案短影音" },
  { no: "04", label: "響應式網站" },
  { no: "05", label: "官方 LINE" },
];

const tabContents = [
  {
    title: "建案整體企劃",
    desc: "從零到一的全案企劃服務。我們不只是寫文案做設計，更從市場面出發，為建案找到最精準的定位與切入點。從市場調研、品牌定位、案名策略到銷售期全程規劃，打造建案獨特的市場識別度與銷售動能。",
    features: [
      { icon: Search, title: "市場調研分析", desc: "深入研究區域市場供需、競品分析、目標客群輪廓，建立精準的市場定位基礎。" },
      { icon: Compass, title: "品牌定位策略", desc: "依據建案特色與目標客群，制定獨特的品牌定位、核心訴求與差異化策略。" },
      { icon: PenTool, title: "案名與文案規劃", desc: "富有記憶點的案名命名、品牌故事、廣告文案與銷售說辭的系統化規劃。" },
      { icon: BarChart3, title: "銷售輔助設計", desc: "DM、海報、接待中心視覺、模型說明、工地圍籬等全套銷售輔助物設計。" },
    ],
  },
  {
    title: "廣告投放",
    desc: "Meta、Google Ads、LINE LAP 多渠道精準投放，透過數據分析持續優化，讓每一分預算都花在刀口上。",
    features: [
      { icon: TrendingUp, title: "數據驅動", desc: "即時監控，每日優化，確保預算效益最大化。" },
      { icon: Eye, title: "精準受眾", desc: "多維度鎖定目標客群，找到真正可能走進接待中心的人。" },
      { icon: MousePointerClick, title: "高轉換率", desc: "A/B 測試最大化點擊價值，持續提升轉換表現。" },
      { icon: BarChart3, title: "透明報表", desc: "清楚掌握預算去向，每一筆花費都有據可查。" },
    ],
  },
  {
    title: "建案短影音",
    desc: "影音時代，讓建案動起來。專業攝影團隊搭配社群趨勢分析，製作高質感影片與短影音，抓住目標客群的注意力。",
    features: [
      { icon: Film, title: "建案形象影片", desc: "以電影級質感呈現建案空間美學、周邊環境與生活氛圍。" },
      { icon: Camera, title: "社群短影音", desc: "針對 IG Reels、TikTok 趨勢製作高互動率的社群內容。" },
      { icon: Plane, title: "空拍攝影", desc: "專業無人機空拍，俯瞰基地全貌，展現區域優勢。" },
      { icon: Clapperboard, title: "工地紀錄片", desc: "記錄施工歷程，展現建設品質，增強購屋者信心。" },
    ],
  },
  {
    title: "建案響應式網站",
    desc: "針對建案特性設計的高轉換率響應式網站。手機優先、快速載入，在一個頁面內完整呈現建案所有特色與聯絡管道。",
    features: [
      { icon: Smartphone, title: "RWD 響應式設計", desc: "手機、平板、桌機完美適配，任何裝置都能流暢瀏覽。" },
      { icon: Zap, title: "快速載入", desc: "3 秒內完成載入，降低跳出率，提升使用者體驗。" },
      { icon: Search, title: "SEO 優化", desc: "搜尋引擎友善架構，在 Google 搜尋中脫穎而出。" },
      { icon: MousePointerClick, title: "高轉換架構", desc: "引導訪客從瀏覽到諮詢，每一步都經過精心設計。" },
    ],
  },
  {
    title: "官方 LINE",
    desc: "LINE 是台灣最普及的通訊工具。透過官方帳號經營，建立與潛在購屋者的深度連結，從認識到成交持續經營。",
    features: [
      { icon: LayoutGrid, title: "圖文選單設計", desc: "符合建案品牌調性，清晰引導用戶找到所需資訊。" },
      { icon: Bot, title: "自動化回覆", desc: "關鍵字自動回覆、新好友歡迎訊息，24 小時不漏接。" },
      { icon: Send, title: "定期推播管理", desc: "工程進度、優惠活動等重要訊息的策略性推播。" },
      { icon: UserPlus, title: "好友招募策略", desc: "線上線下多渠道好友招募，持續擴大潛客名單。" },
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
              Services
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              服務內容
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12">
              五大服務領域全面涵蓋建案行銷所需，從策略到執行一站整合。
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
              找到適合的服務了嗎？
            </h2>
            <p className="text-white/70 mb-8">
              讓我們一起討論您的建案行銷需求，量身打造最佳策略。
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
