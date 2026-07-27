import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { page, referrer } = await request.json();

    if (!page) {
      return NextResponse.json({ error: "page is required" }, { status: 400 });
    }

    // 取得訪客 IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown";

    // 解析來源網域
    let referrer_domain = "";
    if (referrer) {
      try {
        const url = new URL(referrer);
        referrer_domain = url.hostname;
      } catch {
        referrer_domain = "";
      }
    }

    const user_agent = request.headers.get("user-agent") || "";

    const supabase = getServiceClient();
    const { error } = await supabase.from("page_views").insert({
      ip,
      page: page || "/",
      referrer: referrer || "",
      referrer_domain,
      user_agent,
    });

    if (error) {
      console.error("Track error:", error);
      return NextResponse.json({ error: "Failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
