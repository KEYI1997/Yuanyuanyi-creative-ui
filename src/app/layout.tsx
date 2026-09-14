import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import PageViewTracker from "@/components/PageViewTracker";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "圓圓乙創意留名｜建案行銷與品牌企劃",
    template: "%s｜圓圓乙創意留名",
  },
  description: "整合企劃、廣告、影音、網站與 LINE，讓建案定位更清楚，行銷更有效。",
  keywords: ["建案行銷", "建案企劃", "房地產廣告", "建案網站", "桃園行銷公司"],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: "圓圓乙創意留名",
    images: [{ url: "/og.png", width: 1792, height: 921, alt: "圓圓乙創意留名—讓建案被看見，更被記住。" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <body className="antialiased overflow-x-hidden">
        <PageViewTracker />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
