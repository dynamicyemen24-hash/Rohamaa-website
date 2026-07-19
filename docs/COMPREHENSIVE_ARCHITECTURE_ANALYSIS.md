# التقرير الهندسي الشامل - مؤسسة رحماء بينهم

## الأولاً: المعمارية العامة

### نوع المعمارية المستخدمة
- **SPA (Single Page Application)** مع React 19 و Vite
- **Headless CMS Architecture** - Sanity كمصدر محتوى مركزي
- **Component-Based Architecture** - مبنية على مكونات قابلة لإعادة الاستخدام
- **Frontend-Only Architecture** - لا يوجد Backend مُنفذ حالياً (يعتمد على seed data)

### طبقات النظام
```
┌─────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                         │
│  React Components + Pages + Hooks + Services                     │
├─────────────────────────────────────────────────────────────────┤
│                      Business Logic Layer                       │
│  Sanity Client + Helper Functions + Validation                    │
├─────────────────────────────────────────────────────────────────┤
│                         Data Layer                                │
│  Sanity CMS (Content) + Static Seed Data (Fallback)               │
└─────────────────────────────────────────────────────────────────┘
```

### طبقات مفصلة:
1. **Layer 0 - Infrastructure**: Vite, PWA, Service Workers
2. **Layer 1 - Routing**: React Router DOM v6
3. **Layer 2 - State Management**: React useState/useContext + Custom Hooks
4. **Layer 3 - Services**: Sanity Client, Import/Export, Data Service
5. **Layer 4 - Components**: UI Components, Page Components
6. **Layer 5 - Content**: Sanity Schemas + Static Data

### نقاط الدخول والخروج
- **Entry Point**: `main.tsx` → `App.tsx` → React Router
- **Exit points**: 
  - Static file downloads (export)
  - Navigation (client-side routing)
  - External links (social media, YouTube)

### الخدمات الموجودة
1. **Sanity Service** (`sanity.service.ts`) - استعلامات CMS
2. **Sanity Client** (`client.ts`) - اتصال Sanity
3. **Data Service** (`data.service.ts`) - واجهة عامة للبيانات
4. **Import-Export Service** - استيراد/تصدير البيانات
5. **SEO Helper** - تحسين محركات البحث
6. **PWA Service Worker** - وظائف العمل بلا اتصال

### الخدمات المفقودة
1. **Authentication Service** - لا يوجد بالكامل (يعتمد على Mock)
2. **Payment Gateway Integration** - لا يوجد تكامل مالي
3. **Database Service** - PostgreSQL مُعرّف لكن غير مُستَخدم
4. **Email Service** - لا خدمة بريد إلكتروني
5. **Notification Service** - لا إشعارات موقع حقيقي
6. **Analytics Service** - لا تحليلات موقع

---

## ثانياً: قاعدة البيانات (PostgreSQL)

### ملاحظة مهمة
قاعدة PostgreSQL مُعرّفة في الأكواد لكن **غير مُستَخدمة فعلياً**. النظام يعتمد حالياً على:
- Seed Data ثابت في ملفات TypeScript
- Sanity CMS كمصدر محتوى

### مخطط الجداول المتوقع (من data.service.ts)
| الجدول | الوصف | الحالة |
|--------|-------|-------|
| `rh_projects_data` | بيانات المشاريع | غير مُستَخدم |
| `rh_news_data` | الأخبار | غير مُستَخدم |
| `rh_partners_data` | الشركاء | غير مُستَخدم |
| `rh_donations_data` | التبرعات | غير مُستَخدم |
| `rh_volunteers_data` | المتطوعون | غير مُستَخدم |
| `rh_subscriber_accounts` | المشتركون | غير مُستَخدم |
| `rh_requests_data` | طلبات التواصل | غير مُستَخدم |
| `rh_reports_data` | التقارير | غير مُستَخدم |
| `rh_media_data` | الوسائط | غير مُستَخدم |

### ملاحظات قاعدة البيانات
- جميع الجداول مُعرّفة لكن لا توجد Migration Scripts
- لا توجد Foreign Keys أو Relationships مُنفذة
- لا توجد Indexes مُنشأة
- البيانات الحساسة غير مُخزنة (مُتَوقع أن تُخزن في Sanity)

---

## ثالثاً: Sanity CMS

### أنواع المحتوى (Schemas)
| النوع | الحقول | الحالة |
|-------|--------|-------|
| `project` | title, slug, description, category, status, progress, budget, beneficiaries, location, mainImage, gallery, startDate, endDate, team, seo | ✅ مُنفذ |
| `news` | title, slug, content, excerpt, author, category, status, mainImage, publishDate, tags, views, featured, seo | ✅ مُنفذ |
| `successStory` | title, slug, name, content, quote, mainImage, gallery, status, featured, seo | ✅ مُنفذ |
| `partner` | name, slug, type, description, logo, website, contactPerson, contactEmail, status | ✅ مُنفذ |
| `media` | title, type, file/imageFile, altText, category, tags, isFeatured, order, status, publishDate, seo | ✅ مُنفذ |
| `report` | title, type, file, status, date | ✅ مُنفذ |
| `contactRequest` | name, email, phone, type, subject, message, status, date | ✅ مُنفذ |
| `volunteer` | name, email, phone, field, motivation, status, hours, date | ✅ مُنفذ |
| `user` | name, email, role, avatar, phone, bio, status, permissions, lastLogin, createdAt | ✅ مُنفذ |
| `donation` | donor, email, phone, amount, currency, project, method, type, status, date, notes, anonymous | ✅ مُنفذ |
| `subscriber` | name, email, phone, interests, source, status, confirmedAt, createdAt | ✅ مُنفذ |
| `video` | title, slug, description, thumbnail, videoFile/videoUrl, duration, category, isFeatured, isStoryVideo, tags, publishDate, views, likes, chapters, seo | ✅ مُنفذ |
| `event` | title, slug, description, content, mainImage, type, startDate, endDate, location, registrationUrl, status, featured, capacity, registeredCount, seo | ✅ مُنفذ |
| `testimonial` | name, role, quote, photo, project, rating, status | ✅ مُنفذ |
| `faq` | question, answer, category, order, helpful | ✅ مُنفذ |
| `siteSettings` | siteName, tagline, description, logo, socialLinks, contactInfo, seo | ✅ مُنفذ |
| `dashboard` | title, metrics | ✅ مُنفذ |

### العلاقات بين الوثائق
- `donation.project` → `project` (Reference)
- `testimonial.project` → `project` (Reference)
- `partner.website` → String URL
- `media.project` → لا يوجد (مُقترح تحسين)

---

## رابعاً: الربط

### تدفق البيانات الحالي
```
Static Seed Data (website.ts)
    ↓
Sanity Client (client.ts)
    ↓
React Components/Pages
    ↓
Browser Rendering
```

### تدفق محتوى Sanity للموقع
```
Sanity CMS (Production)
    ↓
GROQ Queries (VIDEO_QUERY, NEWS_QUERY, etc)
    ↓
sanityClient.fetch()
    ↓
Component State (useState)
    ↓
useDynamicContent Hook
    ↓
UI Components
```

### المسؤوليات حسب الطبقات
1. **Sanity** - تخزين وإدارة المحتوى
2. **Components** - جلب البيانات من Sanity أو استخدام البيانات الثابتة
3. **Hooks** - تحسين الأداء وإضافة Real-time updates

---

## خامساً: تحليل المحتوى

### تصنيف البيانات

| الفئة | الأنواع | مثال |
|-------|--------|------|
| **بيانات تشغيلية** | `siteSettings`, `dashboard` | إعدادات الموقع، المقاييس |
| **بيانات مؤسسية** | `user`, `partner` | المستخدمون، الشركاء |
| **بيانات للنشر** | `news`, `project`, `successStory`, `event`, `video`, `media` | المحتوى العام |
| **بيانات داخلية** | `faq`, `testimonial` | الأسئلة الشائعة، الشهادات |
| **بيانات حساسة** | `donation`, `contactRequest`, `subscriber` | التبرعات، الطلبات، المشتركون |
| **بيانات سرية** | `volunteer` (معلومات شخصية) | بيانات المتطوعين |
| **بيانات عامة** | `report` | التقارير العامة |

### تصنيف حساسية البيانات

| الحساسية | البيانات | ملاحظات |
|-----------|---------|---------|
| **عالية** | `donation` (donor contact info, amounts) | لا تُظهر في الواجهة |
| **متوسطة** | `user` (permissions, roles) | محمية بـ RBAC |
| **منخفضة** | `volunteer`, `contactRequest` | يجب تشفيرها |
| **عامة** | `news`, `project`, `successStory`, `media`, `report` | محتوى عام |

---

## سادساً: دورة حياة البيانات

### دورة حياة المشروع
```
إنشاء (Create) 
    → Sanity Studio (draft)
    → مراجعة (by manager/editor)
    → نشر (publish status)
    → عرض على الموقع
    → تحديث (draft → published updates)
    → أرشفة (archived status)
```

### دورة حياة الخبر
```
إنشاء (Create)
    → Sanity Studio (DRAFT)
    → مراجعة المحتوى
    → PUBLISHED
    → عرض في الصفحة الرئيسية
    → تحديث/تعديل
    → ARCHIVED
```

### دورة حياة التبرع
```
إدخال (من الواجهة)
    → لا يُخزن في PostgreSQL
    → يُقدّم كـ Intent فقط
    → لا توجد حفظ حالياً
```

---

## سابعاً: الصلاحيات

### الأدوار المُعرّفة
| الدور | الصلاحيات |
|-------|----------|
| `ADMIN` | `manage_users`, `manage_content`, `publish_content`, `view_reports`, `manage_projects` |
| `MANAGER` | `manage_content`, `publish_content`, `view_reports` |
| `EDITOR` | `manage_content` |
| `VIEWER` | (عرض فقط) |

### نقاط التحكم
- **Sanity Studio** - لوحة إدارة المحتوى (محميت بـ role-based)
- **AdminPage** - لوحة تحكم محلية (غير مُتصل بالواقع)
- **Auth Context** - Context للمصادقة (Mock)

### آلية النشر
- **Draft → Published** من خلال Sanity Studio
- لا توجد مراجعة خارجية
- لا توجد Workflow مُعرّف

---

## ثامناً: الأداء

### نقاط الاختناق
1. **PWA Service Worker** - يملأ مساحة التخزين
2. **Large Bundle Size** - 386KB للمنتجات الرئيسية (index-CVl35mc1.js)
3. **3000+ modules transformed** - تحويل كبير جداً
4. **No lazy loading** لبعض المكونات الثابتة

### الاستعلامات الزائدة
- لا توجد استعلامات قاعدة بيانات (PostgreSQL غير مُستَخدم)
- Sanity Queries مباشرة دون تخزين مؤقت

### البيانات المكررة
- Seed Data مكرر في `website.ts`
- Components تحمل نفس الأنماط

---

## تاسعاً: جودة المعمارية

### تقييم حسب المعايير

| المعيار | التقييم | الملاحظات |
|--------|--------|----------|
| **SOLID** | ⭐⭐☆☆☆ | مباعثثرة جزئية، لكن فقدان OCP |
| **Clean Architecture** | ⭐⭐⭐☆☆ | فصل جيد بين الطبقات، لكن Domain Layer ناقص |
| **DDD** | ⭐⭐☆☆☆ | Domain Models موجودة لكن غير مُنفذة بالكامل |
| **CQRS** | ⭐☆☆☆☆ | لا فصل بين الأوامر والاستعلامات |
| **Event Driven** | ⭐☆☆☆☆ | لا أحداث مُعرّفة |
| **Separation of Concerns** | ⭐⭐⭐⭐☆ | تمييز جيد بين Components والخدمات |
| **Security by Design** | ⭐⭐☆☆☆ | مصادقة مباشرة، لكن لا تشفير |
| **Zero Trust** | ⭐☆☆☆☆ | لا مفهوم Zero Trust مُطبق |
| **Enterprise Content Governance** | ⭐⭐⭐☆☆ | Sanity يوفر Content Governance أساسي |

---

## التقرير النهائي

### النقاط القوة
1. ✅ تركيبة Headless CMS متكاملة
2. ✅ تصميم متجاوب بالكامل (RTL support)
3. ✅ PWA مُدمج
4. ✅ مكونات UI قابلة لإعادة الاستخدام
5. ✅ SEO مُحسّن
6. ✅ TypeScript مع Type Safety جزئي
7. ✅ Build ناجح بدون أخطاء

### النقاط الضعف
1. ❌ PostgreSQL غير مُستَخدم فعلياً
2. ❌ لا خدمات مصادقة حقيقية
3. ❌ لا دفع إلكتروني
4. ❌ Seed Data مكرر ولا خطة ترحيل
5. ❌ لا Integration Tests
6. ❌ Bundle size كبير
7. ❌ لا Caching مُحسّن
8. ❌ لا Analytics

### المخاطر
1. **عالية**: فقدان البيانات الحساسة إذا تم نشرها بدون تشفير
2. **متوسطة**: الاعتماد على Seed Data قد يؤدي للانقسام
3. **منخفضة**: الأداء قد يتدهور مع زيادة المحتوى

### الفرص
1. توصيل PostgreSQL لتخزين البيانات الحساسة
2. إضافة Stripe/PayPal للدفع الإلكتروني
3. تحسين الأداء باستخدام React Query
4. إضافة نظام مراجعة محتوى

### أولويات التحسين (مرتبة)

| الأولوية | المهمة | الوصف |
|----------|-------|-------|
| 1 | توصيل PostgreSQL | تفعيل قاعدة البيانات الحقيقية |
| 2 | نظام المصادقة | Auth حقيقي مكوّن على Supabase |
| 3 | نظام الدفع | تكامل مع بوابة دفع |
| 4 | تخطيط البيانات | نقل البيانات الحساسة للـ PostgreSQL |
| 5 | تحسين الأداء | تقسيم الـ Bundle، Lazy Loading أفضل |
| 6 | Analytics | Google Analytics أو Plausible |
| 7 | Testing | Jest + React Testing Library |
| 8 | CI/CD | GitHub Actions للنشر التلقائي |

---

## الخريطة العامة للمعمارية

```
┌─────────────────────────────────────────────────────────────────┐
│                           BROWSER                                │
│  React SPA (Vite) ←→ Service Worker (PWA) ←→ Cache API            │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                        SANITY CMS                                │
│  Schemas: project, news, partner, donation, volunteer, etc.      │
│  GROQ Queries ←→ CDN (images, files)                             │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND SERVICES                             │
│  sanity.service.ts ←→ data.service.ts ←→ import-export.service.ts  │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    STATIC SEED DATA                              │
│  src/content/website.ts (Fallback when Sanity unavailable)        │
└─────────────────────────────────────────────────────────────────┘
```

### PostgreSQL (غير مُستَخدم حالياً)
```
┌─────────────────────────────────────────────────────────────────┐
│                     POSTGRESQL DATABASE                          │
│  Tables: rh_*_data (ما زالت غير مُنفذة)                         │
│  Relationships: لا توجد (لم تُنشأ)                              │
└─────────────────────────────────────────────────────────────────┘