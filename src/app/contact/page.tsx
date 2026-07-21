"use client";
import { useState } from "react";
import { Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const serviceTypes = [
  "建案整體企劃",
  "廣告投放",
  "建案短影音",
  "建案響應式網站",
  "官方 LINE 經營",
  "全案整合服務",
  "其他",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service_type: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (!formData.name || !formData.phone) {
      setErrorMsg("請填寫姓名與電話");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "提交失敗");
      }

      setStatus("success");
      setFormData({ name: "", phone: "", email: "", company: "", service_type: "", description: "" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "提交失敗，請稍後再試");
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <p className="text-cta font-medium text-sm uppercase tracking-widest mb-3">
              Contact Us
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              聯絡我們
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              無論是建案企劃、廣告投放或任何行銷需求，歡迎與我們聯繫。
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 表單區塊 */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* 左側聯絡資訊 */}
            <AnimateOnScroll direction="left">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    聯繫方式
                  </h2>
                  <p className="text-muted leading-relaxed">
                    歡迎透過電話或表單與我們聯絡，我們將在 24 小時內回覆您的需求。
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cta/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-cta" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">電話</p>
                      <a
                        href="tel:03-4229123"
                        className="text-cta hover:text-cta-hover transition-colors"
                      >
                        03-4229123
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cta/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-cta" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">地區</p>
                      <p className="text-muted">桃園市</p>
                    </div>
                  </div>
                </div>

                {/* 服務時間 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h3 className="font-semibold text-primary mb-3">服務時間</h3>
                  <div className="space-y-2 text-sm text-muted">
                    <p>週一至週五：09:00 - 18:00</p>
                    <p>週六：預約制</p>
                    <p>週日：休息</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* 右側表單 */}
            <AnimateOnScroll direction="right" className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-border">
                {status === "success" ? (
                  <div className="text-center py-12">
                    <CheckCircle2 size={48} className="text-cta mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-primary mb-3">
                      感謝您的諮詢！
                    </h3>
                    <p className="text-muted mb-6">
                      我們已收到您的訊息，將在 24 小時內與您聯繫。
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-cta font-medium hover:text-cta-hover transition-colors cursor-pointer"
                    >
                      再次填寫
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* 姓名 */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                          您的姓名 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="例：王先生…"
                          className="w-full px-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors bg-bg"
                        />
                      </div>

                      {/* 電話 */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                          聯絡電話 <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="例：0912-345-678…"
                          className="w-full px-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors bg-bg"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@mail.com…"
                          className="w-full px-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors bg-bg"
                          spellCheck={false}
                        />
                      </div>

                      {/* 公司名稱 */}
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
                          公司名稱
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="例：XX建設…"
                          className="w-full px-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors bg-bg"
                        />
                      </div>
                    </div>

                    {/* 服務類型 */}
                    <div>
                      <label htmlFor="service_type" className="block text-sm font-medium text-primary mb-2">
                        需求類型
                      </label>
                      <select
                        id="service_type"
                        name="service_type"
                        value={formData.service_type}
                        onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors bg-bg cursor-pointer"
                      >
                        <option value="">請選擇服務類型…</option>
                        {serviceTypes.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    {/* 需求說明 */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-primary mb-2">
                        需求說明
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="請簡述您的建案或行銷需求…"
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition-colors bg-bg resize-none"
                      />
                    </div>

                    {/* 錯誤訊息 */}
                    {status === "error" && (
                      <p className="text-red-500 text-sm">{errorMsg}</p>
                    )}

                    {/* 提交按鈕 */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cta text-white px-8 py-4 rounded-lg hover:bg-cta-hover transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          送出中…
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          送出諮詢
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
