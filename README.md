# رحمة بينهم - منصة المؤسسة الإنسانية

منصة ويب متكاملة لإدارة المؤسسات الإنسانية والخيرية، تتضمن لوحة تحكم متقدمة لإدارة المحتوى والبيانات.

## 🚀 المميزات

### الواجهة العامة
- ✅ صفحة رئيسية ديناميكية
- ✅ عرض الأخبار والفعاليات
- ✅ إدارة المشاريع والبرامج
- ✅ قصص نجاح ملهمة
- ✅ معرض الوسائط
- ✅ نموذج التبرع الإلكتروني
- ✅ نموذج التطوع
- ✅ صفحة الاتصال

### لوحة التحكم الإدارية
- ✅ إدارة الأخبار (CRUD)
- ✅ إدارة قصص النجاح
- ✅ إدارة المشاريع والميزانيات
- ✅ إدارة التقارير والإصدارات
- ✅ إدارة الوسائط والصور
- ✅ إدارة الشركاء
- ✅ تسجيل ومتابعة التبرعات
- ✅ إدارة طلبات التواصل
- ✅ إدارة المتطوعين
- ✅ إدارة حسابات المشتركين
- ✅ إدارة المستخدمين والصلاحيات
- ✅ إحصائيات ورسوم بيانية

## 🛠️ التقنيات المستخدمة

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| React | 18.3.1 | مكتبة الواجهات |
| TypeScript | 5.6 |	type safety |
| Vite | 6.3.5 | أداة البناء |
| Tailwind CSS | 4.1.12 | تصميم متجاوب |
| Supabase | 2.108 | قاعدة البيانات والمصادقة |
| Lucide React | 0.487 | الأيقونات |
| Recharts | 2.15 | الرسوم البيانية |

## 📦 البنية المشروع

```
src/
├── app/
│   ├── components/
│   │   ├── AdminDashboard.tsx    # لوحة التحكم الرئيسية
│   │   ├── Toast.tsx             # نظام الإشعارات
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   └── App.tsx                   # المكون الرئيسي
├── features/
│   ├── auth/                     # نظام المصادقة
│   │   ├── contexts/
│   │   ├── services/
│   │   └── components/
│   └── news/                     # ميزة الأخبار
├── shared/
│   ├── services/
│   │   ├── supabase.service.ts   # خدمة قاعدة البيانات الشاملة
│   │   ├── supabase.client.ts    # عميل Supabase
│   │   ├── data.service.ts       # خدمة البيانات مع Cache
│   │   └── dashboard.service.ts  # خدمات لوحة التحكم
│   ├── types/
│   │   ├── database.ts           # أنواع جميع الجداول
│   │   └── dashboard.ts
│   ├── utils/
│   │   ├── errors.ts             # معالجة الأخطاء
│   │   ├── security.ts
│   │   └── performance.ts
│   └── constants/
│       ├── api.ts
│       └── seed.ts
└── main.tsx                      # نقطة الدخول
```

## 🔐 الأمان

### نظام المصادقة المتقدم
- **تسجيل دخول آمن** مع تشفير كلمات المرور
- **جلسات محدودة زمنياً** (ساعة واحدة)
- **حماية من القوة الغاشمة**: إغلاق الحساب بعد 5 محاولات فاشلة
- **صلاحيات متدرجة (RBAC)**:
  - ADMIN - صلاحية كاملة
  - MANAGER - إدارة المحتوى
  - EDITOR - إضافة وتعديل
  - VIEWER - عرض فقط

### حماية البيانات
- تشفير الجلسات في localStorage
- التحقق من صحة المدخلات
- حماية من XSS و CSRF
- RLS (Row Level Security) في Supabase

## ⚡ الأداء

### تحسينات السرعة
- **Code Splitting**: تقسيم الكود تلقائياً
- **Lazy Loading**: تحميل لوحة التحكم عند الطلب
- **Memory Cache**: تخزين مؤقت في الذاكرة
- **LocalStorage Fallback**: نسخة احتياطية محلية
- **Image Lazy Loading**: تحميل الصور عند الحاجة

### أحجام الملفات (Production)
```
index.html                     1.90 KB
assets/index-*.css            18.16 KB  (gzipped)
assets/ui-*.js                 7.52 KB  (lucide icons)
assets/AdminDashboard-*.js    11.30 KB  (gzipped)
assets/vendor-*.js            43.22 KB  (React/DOM)
assets/index-*.js             31.62 KB  (gzipped)
────────────────────────────────────────
Total: ~111 KB gzipped ✅
```

## � التثبيت والتشغيل

### المتطلبات
- Node.js 18+ 
- pnpm أو npm أو yarn
- حساب Supabase

### خطوات التثبيت

```bash
# 1. استنساخ المشروع
git clone https://github.com/username/rohamaa-website.git
cd rohamaa-website

# 2. تثبيت التبعيات
pnpm install

# 3. إعداد متغيرات البيئة
cp .env.example .env.local
# قم بتعديل .env.local مع بيانات Supabase

# 4. تشغيل في وضع التطوير
pnpm dev

# 5. بناء الإنتاج
pnpm build

# 6. معاينة الإنتاج
pnpm preview

# 7. تهيئة قاعدة البيانات
يمكنك تشغيل سكربت التهيئة باستخدام متغيرات البيئة أو تمريرها مباشرة:

```bash
pnpm run seed:postgres -- --db-url="postgresql://your_db_user:your_db_password@your_db_host:5432/your_db_name?sslmode=require&channel_binding=require" --schema=gs_website
```

أو إذا أنشأت ملف `.env.local` مستنسخاً من `.env.example` وملأته بالقيم الصحيحة:

```bash
set "DATABASE_URL=postgresql://your_db_user:your_db_password@your_db_host:5432/your_db_name?sslmode=require&channel_binding=require"
set "PG_SCHEMA=gs_website"
pnpm run seed:postgres
```

> في PowerShell أو CMD يجب أن يتحاط عنوان URL المكون من `&` بعلامات اقتباس مزدوجة.

### متغيرات البيئة المطلوبة

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SCHEMA=gs_website

# Database seed helper
DATABASE_URL=postgresql://your_db_user:your_db_password@your_db_host:5432/your_db_name?sslmode=require&channel_binding=require
PG_SCHEMA=gs_website
```

## 🗄️ قاعدة البيانات

### الجداول المدعومة (33 جدول)
- **المحتوى**: posts, pages, content_items, page_sections
- **المشاريع**: projects, donations, volunteers, success_stories
- **التسويق**: subscribers, testimonials, clients, events
- **التواصل**: service_requests, faqs, knowledge_base
- **SEO**: seo_meta, content_analytics
- **الإدارة**: users, roles, permissions, admin_notifications
- **القوائم**: menus, menu_items, media_library
- **الإعدادات**: website_settings, categories, tags

### مخطط Schema
```
gs_website
├── posts
├── pages
├── page_sections
├── projects
├── donations
├── volunteers
├── subscribers
├── service_requests
├── success_stories
├── testimonials
├── events
├── careers
├── faqs
├── knowledge_base
├── media_library
├── menus
├── menu_items
├── categories
├── tags
├── authors
├── seo_meta
├── content_analytics
├── admin_notifications
├── website_settings
└── ...
```

## � الإعداد الأولي

### 1. إعداد Supabase
```sql
-- تشغيل migrations
-- src/shared/constants/seed.ts يحتوي على البيانات الأولية

-- تفعيل RLS Policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
-- ... etc
```

### 2. إنشاء مستخدم إداري
استخدم أحد حسابات الاختبار:
- `admin@rohamaa.org` / `admin123`
- `manager@rohamaa.org` / `rohamaa123`
- `editor@rohamaa.org` / `rohamaa123`

## 🎨 التصميم

### نظام الألوان
- **اللون الرئيسي**: `var(--brand-green)` - أخضر إسلامي
- **اللون الثانوي**: `var(--brand-gold)` - ذهبي
- **خلفية**: `var(--background)`
- **نص**: `var(--foreground)`

### الخطوط
```css
font-family: 'Cairo', sans-serif;
```

## 🔧 التكوين

### Vite Configuration
- ✅ React Plugin
- ✅ Tailwind Plugin
- ✅ Path Aliases (@/)
- ✅ Manual Chunks (vendor/ui splitting)
- ✅ Asset Optimization

### Vercel Configuration
- ✅ SPA Fallback (rewrites)
- ✅ Cache Headers (assets)
- ✅ Security Headers (XSS, Frame, Content-Type)

## 📊 المراقبة والتحليلات

### uptime monitoring
- Health checks في `/api/health`
- Error tracking (Sentry integration ready)

### Analytics
- Google Analytics ready
- Content Analytics في `content_analytics` table
- Supabase logs

## 🧪 الاختبارات

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

## � النشر

### Vercel (موصى به)
```bash
# Connect GitHub repo to Vercel
# Add environment variables in Vercel dashboard
# Deploy automatically on push
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE)

## 📞 الدعم

- البريد الإلكتروني: info@rohamaa.org
- الموقع: https://rohamaa.org

## ✨ المساهمون

- فريق التطوير - [GitHub](https://github.com/rohamaa)

---

**تم التطوير بـ ❤️ لمؤسسة رحمة بينهم**