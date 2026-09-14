import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "經典實績",
  description: "圓圓乙創意留名的建案行銷實績，案例整理中。",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-[78vh] bg-dark px-5 pb-24 pt-36 text-white sm:px-8 lg:px-12 lg:pt-48">
      <div className="mx-auto max-w-[1440px]">
        <AnimateOnScroll>
          <p className="eyebrow !text-warm">經典實績</p>
          <h1 className="mt-8 max-w-4xl text-5xl leading-[1.1] sm:text-7xl lg:text-8xl">把每一個建案<br />說到市場心裡。</h1>
          <p className="mt-8 max-w-xl text-lg leading-9 text-white/60">經典建案案例整理中，敬請期待。</p>
          <Link href="/#contact" className="mt-10 inline-flex items-center gap-3 border-b border-warm pb-2 text-warm transition-colors hover:border-white hover:text-white">洽談建案 <ArrowRight size={18} /></Link>
        </AnimateOnScroll>
      </div>
    </main>
  );
}
