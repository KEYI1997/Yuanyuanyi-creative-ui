"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import CustomCursor from "@/components/CustomCursor";
import CookieConsent from "@/components/CookieConsent";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <main>{children}</main>;

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </>
  );
}
