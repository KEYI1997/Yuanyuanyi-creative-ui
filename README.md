# 圓圓乙創意留名｜官方網站

> 建案不只被看見　更被記住

圓圓乙創意留名，專注於建案品牌與數位行銷。從策略定位、廣告投放到影音與網站，為建案打造能被記住、也能帶來詢問的完整行銷體驗。

🌐 **Live Site**: [renyi-creative-ui.vercel.app](https://renyi-creative-ui.vercel.app)

---

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS 4 |
| 資料庫 | Supabase (PostgreSQL + RLS) |
| 郵件通知 | Resend |
| 圖示 | Lucide React |
| 部署 | Vercel |

---

## 頁面結構

```
/              首頁（Hero + 服務 + 流程 + CTA）
/about         關於我們
/solutions     服務內容
/contact       聯絡洽詢
/admin         後台管理（評論、案例、聯絡表單）
```

---

## 開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置
npm run build
```

---

## 環境變數

建立 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

---

## 部署

推送至 `master` 分支即自動觸發 Vercel 部署。

---

## 專案特色

- 🎬 Hero 日夜切換動畫（HeroDaylightReveal）
- 🖱️ 自訂游標（CustomCursor）
- 📱 Mobile-first 響應式設計
- 🎭 滾動觸發動畫（AnimateOnScroll）
- 🍪 Cookie 同意提示
- 📞 浮動快捷按鈕（LINE / 電話 / 回頂部）
- 🔒 後台管理系統（密碼保護）
- ✉️ 表單提交 + Email 即時通知
