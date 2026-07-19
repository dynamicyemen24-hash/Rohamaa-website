-- إضافة حقول جديدة لجدول الرسائل
ALTER TABLE messages 
  ADD COLUMN IF NOT EXISTS device_info JSONB,
  ADD COLUMN IF NOT EXISTS geo_location JSONB,
  ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45),
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT;

-- إنشاء فهرس للأداء
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_device_info ON messages USING GIN(device_info);

-- تحديث الرسائل الموجودة بقيم افتراضية
UPDATE messages 
SET 
  device_info = '{"browser": "Chrome", "os": "Windows", "device": "desktop"}'::jsonb,
  ip_address = '192.168.1.' || (random() * 255)::int::text,
  user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
WHERE device_info IS NULL;

-- إضافة رسائل تجريبية ذكية
INSERT INTO messages (
  name, email, phone, country_code, country, subject, message, status, is_read,
  device_info, geo_location, ip_address, user_agent, referrer
) VALUES 
(
  'أحمد محمد',
  'ahmed@example.com',
  '+967 771 234 567',
  '+967',
  'اليمن',
  'استفسار عن التبرع',
  'السلام عليكم، أريد التبرع لمشروع التعليم',
  'new',
  false,
  '{"browser":"Chrome","os":"Windows","device":"desktop","screen":"1920x1080","language":"ar-YE"}'::jsonb,
  '{"lat":15.3694,"lng":44.1914,"city":"صنعاء","country":"اليمن"}'::jsonb,
  '192.168.1.101',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'https://rohamaa.org/donate'
),
(
  'فاطمة علي',
  'fatima@example.com',
  '+967 777 123 456',
  '+967',
  'اليمن',
  'رغبة في التطوع',
  'أريد التطوع في مجال التعليم',
  'read',
  true,
  '{"browser":"Safari","os":"iOS","device":"mobile","screen":"390x844","language":"ar-YE"}'::jsonb,
  '{"lat":12.7855,"lng":45.0185,"city":"عدن","country":"اليمن"}'::jsonb,
  '192.168.1.102',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
  'https://rohamaa.org/volunteer'
),
(
  'محمد حسن',
  'mohammed@example.com',
  '+966 50 123 4567',
  '+966',
  'السعودية',
  'شراكة',
  'نريد الشراكة معكم في مشروع الإغاثة',
  'replied',
  true,
  '{"browser":"Firefox","os":"Linux","device":"desktop","screen":"2560x1440","language":"ar-SA"}'::jsonb,
  '{"lat":24.7136,"lng":46.6753,"city":"الرياض","country":"السعودية"}'::jsonb,
  '192.168.1.103',
  'Mozilla/5.0 (X11; Linux x86_64; rv:109.0)',
  'https://rohamaa.org/partners'
),
(
  'سارة أحمد',
  'sara@example.com',
  '+968 99 123 456',
  '+968',
  'عُمان',
  'تبرع عاجل',
  'أريد التبرع عاجل لمشروع الإغاثة',
  'new',
  false,
  '{"browser":"Chrome","os":"Android","device":"mobile","screen":"412x915","language":"ar-OM"}'::jsonb,
  '{"lat":23.5880,"lng":58.3829,"city":"مسقط","country":"عُمان"}'::jsonb,
  '192.168.1.104',
  'Mozilla/5.0 (Linux; Android 13; SM-G998B)',
  'https://rohamaa.org/donate'
),
(
  'خالد عبدالله',
  'khaled@example.com',
  '+20 100 123 4567',
  '+20',
  'مصر',
  'مشروع تعليمي',
  'أريد المشاركة في مشروع التعليم',
  'archived',
  true,
  '{"browser":"Edge","os":"Windows","device":"desktop","screen":"1366x768","language":"ar-EG"}'::jsonb,
  '{"lat":30.0444,"lng":31.2357,"city":"القاهرة","country":"مصر"}'::jsonb,
  '192.168.1.105',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'https://rohamaa.org/programs'
);

-- إحصائيات
SELECT 
  COUNT(*) as total_messages,
  COUNT(*) FILTER (WHERE status = 'new') as new_messages,
  COUNT(*) FILTER (WHERE status = 'read') as read_messages,
  COUNT(*) FILTER (WHERE status = 'replied') as replied_messages,
  COUNT(*) FILTER (WHERE status = 'archived') as archived_messages,
  COUNT(DISTINCT country) as countries,
  COUNT(DISTINCT ip_address) as unique_visitors
FROM messages;