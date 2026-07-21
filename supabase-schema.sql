-- ========================================
-- 人義創意有限公司 — Supabase Schema
-- 在 Supabase Dashboard > SQL Editor 中執行此檔案
-- ========================================

-- 1. 聯絡表單
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company TEXT,
  service_type TEXT,
  description TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 網站內容（Key-Value）
CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================
-- RLS 政策
-- ========================================

-- 開啟 RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- contacts: 任何人可 INSERT（提交表單）
CREATE POLICY "Public insert" ON contacts
  FOR INSERT WITH CHECK (true);

-- contacts: 前台不可讀取（僅後台用 service_role）
-- 如需前台讀取統計數字，可另加 policy

-- site_content: 前台可讀取
CREATE POLICY "Public read" ON site_content
  FOR SELECT USING (true);

-- ========================================
-- 初始資料
-- ========================================

INSERT INTO site_content (key, value) VALUES
  ('company_name', '圓圓乙創意留名'),
  ('company_phone', '03-4229123'),
  ('company_address', '桃園市'),
  ('notification_email', 'your-email@example.com'),
  ('hero_title', '讓每一個建案都成為話題'),
  ('hero_subtitle', '從整體企劃到廣告投放、短影音製作、響應式網站與 LINE 經營，圓圓乙創意留名為建設公司量身打造全方位行銷策略。');
