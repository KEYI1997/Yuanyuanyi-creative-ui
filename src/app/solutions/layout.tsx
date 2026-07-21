import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服務內容",
  description:
    "圓圓乙創意留名提供建案整體企劃、廣告投放、建案短影音、響應式一頁式網站、官方 LINE 五大服務，全方位解決建設公司的行銷需求。",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
