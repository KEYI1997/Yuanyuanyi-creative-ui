import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, company, service_type, description } = body;

    // 驗證必填欄位
    if (!name || !phone) {
      return NextResponse.json(
        { error: "姓名和電話為必填欄位" },
        { status: 400 }
      );
    }

    // 寫入 Supabase
    const supabase = getServiceClient();
    const { error } = await supabase.from("contacts").insert({
      name,
      phone,
      email: email || null,
      company: company || null,
      service_type: service_type || null,
      description: description || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "提交失敗" }, { status: 500 });
    }

    // 發送通知信（如果有設定 Resend API Key）
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        // 取得通知信箱
        let notifyEmail = "default@example.com";
        const { data: setting } = await supabase
          .from("site_content")
          .select("value")
          .eq("key", "notification_email")
          .single();
        if (setting?.value) notifyEmail = setting.value;

        await resend.emails.send({
          from: "圓圓乙創意留名 <onboarding@resend.dev>",
          to: notifyEmail,
          subject: `【新諮詢】${name} - ${service_type || "一般諮詢"}`,
          html: `
            <h2>📋 新的客戶諮詢</h2>
            <table style="border-collapse:collapse;width:100%;max-width:500px;">
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>姓名</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>電話</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>
              ${email ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Email</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>` : ""}
              ${company ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>公司</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${company}</td></tr>` : ""}
              ${service_type ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>需求類型</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${service_type}</td></tr>` : ""}
              ${description ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>需求說明</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${description}</td></tr>` : ""}
            </table>
          `,
        });
      } catch (emailError) {
        // 郵件發送失敗不影響表單提交
        console.error("Email send error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "提交失敗" }, { status: 500 });
  }
}
