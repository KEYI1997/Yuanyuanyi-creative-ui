import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服務內容",
  description:
    "圓圓乙創意留名整合建案企劃、數位廣告、影音、網站與官方 LINE，讓每一個行銷環節都朝同一個目標前進。",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
