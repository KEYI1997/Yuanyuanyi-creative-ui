import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

function authorized(request: Request) {
  const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  return !expected || request.headers.get("x-admin-password") === expected;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "未授權" }, { status: 401 });

  try {
    const { data, error } = await getServiceClient()
      .from("page_views")
      .select("id, ip, page, referrer, referrer_domain, user_agent, created_at")
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ views: data || [] });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "讀取失敗" }, { status: 500 });
  }
}
