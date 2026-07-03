# 🏛️ معمارية نظام إدارة المحتوى – Rohamaa CMS

> **الإصدار:** 2.0 | **الحالة:** Production Ready | **تاريخ التحديث:** 2025-06-23

---

## 📑 فهرس المحتويات

1. [الهدف المؤسسي](#1-الهدف-المؤسسي)
2. [المبادئ المعمارية](#2-المبادئ-المعمارية)
3. [Stack التقني المعتمد](#3-stack-التقني-المعتمد)
4. [النطاقات الوظيفية (Domain Modules)](#4-النطاقات-الوظيفية)
5. [قواعد تصميم قاعدة البيانات](#5-قواعد-تصميم-قاعدة-البيانات)
6. [معايير تصميم API](#6-معايير-تصميم-api)
7. [معمارية الواجهة الأمامية](#7-معمارية-الواجهة-الأمامية)
8. [معايير الأداء](#8-معايير-الأداء)
9. [المراقبة والرصد](#9-المراقبة-والرصد)
10. [فلسفة الذكاء الاصطناعي](#10-فلسفة-الذكاء-الاصطناعي)
11. [معمارية النشر](#11-معمارية-النشر)
12. [تعريف الاكتمال (Definition of Done)](#12-تعريف-الاكتمال)

---

## 1. 🎯 الهدف المؤسسي

نظام إدارة محتوى مؤسسي عالي الاعتمادية مصمم خصيصًا لمؤسسة إنسانية لإدارة:

| المجال | الوصف |
|--------|-------|
| **الأخبار** | المقالات والتغطيات الإعلامية والبيانات الصحفية |
| **المشاريع** | البرامج التنموية والإغاثية ومتابعة التنفيذ |
| **التبرعات** | إدارة الحملات والمانحين والمعاملات المالية |
| **الصفحات** | منشئ صفحات ديناميكي (Headless Page Builder) |
| **الوسائط** | صور وفيديو ومستندات مع CDN |
| **فرق التحرير** | إدارة المستخدمين وسير العمل |
| **المحتوى التسويقي** | تحسين محركات البحث (SEO) |

### ضوابط الجودة الإلزامية

| الضابط | المعيار |
|--------|---------|
| ✔ **الاستقرار** | Uptime ≥ 99.5% |
| ✔ **الأمان** | OWASP Top 10 mitigated |
| ✔ **التوسعية** | Modular + Feature-First |
| ✔ **الحوكمة** | Approval workflow موحّد |
| ✔ **التدقيق** | Immutable audit trail |
| ✔ **الأداء** | Core Web Vitals محسّنة |

---

## 2. 🧱 المبادئ المعمارية (Core Principles)

### 2.1 Clean Architecture + Feature-First Organization

```
src/
├── app/
│   ├── App.tsx                 # Root Component
│   └── components/             # App-Level Components
├── features/                   # Domain-Driven تقسيم حسب المجال
│   ├── news/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── projects/
│   ├── donations/
│   ├── media/
│   └── dashboard/
├── shared/                     # مكونات مشتركة
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
└── styles/                     # نظام التصميم الموحد
```

**الفصل بين الطبقات:**

| الطبقة | المسؤولية |
|--------|-----------|
| **Presentation** | React Components + UI System |
| **Application** | Services + State Management |
| **Domain** | Business Logic + Entities |
| **Infrastructure** | APIs + Storage + External Services |

### 2.2 Multi-Tenant Ready

- كل مؤسسة: `Organization` entity منفصلة
- عزل البيانات على مستوى قاعدة البيانات (`tenant_id`)
- Shared infrastructure مع isolated data
- قابل للتوسع لأكثر من مؤسسة

### 2.3 Event-Driven Content Flow

```
Content Change
    ↓
Event Emitted (ContentEvent)
    ↓
Audit Log (Immutable)
    ↓
Notification (Team)
    ↓
AI Processing (Optional)
    ↓
Cache Invalidation
```

---

## 3. 🛠️ Stack التقني المعتمد (Production Stack)

### 3.1 الواجهة الأمامية (Frontend)

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| **React** | 18.3.x | Core UI Framework |
| **TypeScript** | 5.6.x | Type Safety – Strict Mode |
| **Vite** | 6.3.x | Build Tool + HMR |
| **Tailwind CSS** | 4.1.x | Utility-First Styling |
| **Material-UI** | 7.3.x | Component Library |
| **React Router** | 7.13.x | Client-Side Routing |
| **Motion** | 12.23.x | Animations (Framer) |
| **Recharts** | 2.15.x | Data Visualization |
| **React Hook Form** | 7.55.x | Form Management |
| **Radix UI** | Latest | Accessible Primitives |

### 3.2 إدارة الحالة (State Management)

| الأداة | الاستخدام |
|--------|-----------|
| **React Context API** | Global State (Auth, Theme, Settings) |
| **React Hook Form** | Form State + Validation |
| **TanStack Query** *(Future)* | Server State + Caching |

### 3.3 Build & Deployment

| الأداة | الغرض |
|--------|-------|
| **Vite** | Development & Production Build |
| **Vercel** | Hosting + Edge Network + CI/CD |
| **pnpm** | Package Manager (Monorepo) |

### 3.4 نظام التصميم (Styling Architecture)

```
┌─────────────────────────────────────────────┐
│ Design Tokens (CSS Variables)               │
├─────────────────────────────────────────────┤
│ Tailwind CSS 4.x (Utility Classes)          │
├─────────────────────────────────────────────┤
│ Material-UI Components (Complex UI)         │
├─────────────────────────────────────────────┤
│ Custom CSS (Animations + RTL)               │
└─────────────────────────────────────────────┘
```

---

## 4. 🧠 النطاقات الوظيفية (Domain Modules)

### 4.1 📊 Dashboard Domain (Read-Optimized)

**Architecture Pattern:** CQRS – Read Model Only

**المقاييس المتتبعة:**
- User Activity & Engagement
- Content Status Distribution
- Donations Flow & Trends
- Projects Progress
- System Health

**API:**
```
/api/v1/dashboard/metrics
/api/v1/dashboard/activity
/api/v1/dashboard/kpi
```

---

### 4.2 📰 Content Domain (News Engine)

**State Machine (Critical):**
```
DRAFT → REVIEW → APPROVED → SCHEDULED → PUBLISHED → ARCHIVED
```

**قواعد عمل لا تُخترق:**
- ❌ لا نشر بدون `APPROVED`
- ❌ لا حذف فعلي لـ `PUBLISHED` (Soft Delete فقط)
- ✅ كل تعديل يُنتج `ContentVersion` جديد
- ✅ حقول SEO إلزامية قبل النشر

**Content Model:**
```typescript
interface ContentItem {
  id: string;
  title: string;
  slug: string;           // unique, indexed
  content: string;
  excerpt: string;
  featuredImage: string;
  category: Category;
  tags: string[];
  status: ContentStatus;
  authorId: string;
  reviewerId?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  versions: ContentVersion[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  deletedAt?: Date;       // Soft Delete
}
```

---

### 4.3 🤖 AI Content Intelligence Layer

> **تنبيه:** هذا service مستقل وغير حرج – النظام يعمل بدونه

**الخدمات:**

| الخدمة | الوصف |
|--------|-------|
| Content Scoring | تقييم جودة المحتوى (0–100) |
| Language Quality | فحص الأخطاء اللغوية |
| SEO Optimization | اقتراحات تحسين SEO |
| Category Prediction | تصنيف تلقائي |
| Title Rewriter | اقتراح عناوين بديلة |
| Keyword Generator | توليد كلمات مفتاحية |

**AI Contract (Interface):**
```typescript
interface AIAnalysisResult {
  contentId: string;
  score: number;                          // 0-100
  riskFlags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    readabilityScore: number;
  };
  categorySuggestion: string;
  readinessLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'READY';
  suggestions: string[];
  processedAt: Date;
}
```

**Fallback Strategy:**
```
AI Available? → Show AI suggestions
AI Down?      → Hide AI panel, continue normally
AI Slow?      → Show loading, timeout after 5s
```

---

### 4.4 🔁 Workflow Engine (Approval System)

**Pattern:** State Machine + Role-Based Transitions

**تسلسل الأدوار:**
```
SYSTEM_ADMIN
  └── ORG_MANAGER
      └── CONTENT_MANAGER
          ├── EDITOR
          │   ├── WRITER
          │   └── REVIEWER
          └── PROJECT_MANAGER
```

**جدول انتقالات الحالة:**

| من | إلى | الأدوار المسموحة |
|-----|-----|-----------------|
| DRAFT | REVIEW | WRITER, EDITOR |
| REVIEW | APPROVED | REVIEWER, EDITOR |
| REVIEW | DRAFT | REVIEWER (مع سبب الرفض) |
| APPROVED | SCHEDULED | EDITOR, CONTENT_MANAGER |
| SCHEDULED | PUBLISHED | SYSTEM (Cron job) |
| PUBLISHED | ARCHIVED | CONTENT_MANAGER |

**سجل التدقيق (Immutable):**
```typescript
interface ContentAuditLog {
  id: string;
  contentId: string;
  userId: string;
  action: ContentAction;
  fromStatus?: ContentStatus;
  toStatus?: ContentStatus;
  comment: string;            // إلزامي عند الرفض
  metadata: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
}
// ⚠️ لا تعديل، لا حذف – Append Only
```

---

### 4.5 🗂 Media Domain (Digital Asset Management)

**قواعد صارمة:**
- ✅ كل ملف مرتبط بـ `ownerId` + `contextId` + `tags`
- ❌ لا "ملف حر" غير مرتبط
- ✅ فحص نوع الملف تلقائياً

**تنظيم الملفات:**
```
/uploads/
├── news/{year}/{month}/
├── projects/{projectId}/
├── pages/{pageSlug}/
└── documents/
```

**الإمكانيات:**
- WebP / AVIF تلقائي
- Responsive srcset generation
- Thumbnail automation
- CDN-ready URLs

---

### 4.6 📄 Pages System (Headless Page Builder)

**المبدأ:** الصفحة = JSON Schema وليس HTML

**Block Types:**
```typescript
type PageBlock =
  | HeroBlock
  | TextBlock
  | ImageBlock
  | StatsBlock
  | CTABlock
  | VideoBlock
  | GalleryBlock
  | FormBlock
  | FAQBlock
  | TimelineBlock;

// مثال:
interface HeroBlock {
  type: 'hero';
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaLabel: string;
  ctaLink: string;
  overlay?: number;   // 0-100
}
```

---

### 4.7 🏗 Projects Domain

**دورة الحياة:**
```
PLANNING → ACTIVE → PAUSED → COMPLETED → ARCHIVED
```

**Business Rules:**
- التمويل منفصل عن المشروع (Donations mapping)
- كل تحديث = `ProjectUpdate` event
- تنبيهات الميزانية عند 75%, 90%

```typescript
interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  budget: number;
  spentBudget: number;
  beneficiaries: number;
  startDate: Date;
  endDate?: Date;
  location: Location;
  updates: ProjectUpdate[];
}
```

---

### 4.8 💰 Donor & Donations Domain

**المبدأ:** `Donor ≠ Donation` (Separation of Concerns)

```typescript
interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'INDIVIDUAL' | 'CORPORATE' | 'INSTITUTION';
  totalDonations: number;
  firstDonationDate: Date;
  lastDonationDate: Date;
}

interface Donation {
  id: string;
  donorId: string;
  projectId?: string;       // Optional targeting
  amount: number;
  currency: 'USD' | 'SAR' | 'YER';
  paymentMethod: PaymentMethod;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transactionId: string;
  isRecurring: boolean;
  receiptUrl: string;
  createdAt: Date;
}
```

**التقارير:**
- ملخص التبرعات الشهري
- قائمة كبار المانحين
- نسبة تمويل المشاريع
- تحليل الاتجاهات

---

### 4.9 🔍 Search System (Unified Search)

**Engine:** PostgreSQL Full-Text + Trigram
**Future Scaling:** Meilisearch / Elasticsearch

**نطاق البحث:**
- News & Articles
- Projects & Programs
- Media Library
- Pages

**الميزات:**
- Fuzzy search (تحمل الأخطاء الإملائية)
- Faceted filtering
- Relevance ranking (recency + popularity)

---

### 4.10 👥 User & RBAC System

**نموذج الصلاحيات:**
```
Permission = Resource + Action + Conditions
```

```typescript
interface Permission {
  resource: 'news' | 'projects' | 'donations' | 'media' | 'pages';
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve' | 'publish')[];
  conditions?: {
    ownOnly?: boolean;
    department?: string[];
    status?: string[];
  };
}
```

**تدفق الوصول:**
```
HTTP Request
    → Authenticate (JWT Verify)
    → Authorize (RBAC Check)
    → Enforce Policy
    → Log Access
    → Serve Response
```

---

### 4.11 🔐 Security Architecture

**طبقات الحماية:**

**1. المصادقة (Authentication):**
- JWT + httpOnly cookies
- CSRF tokens
- Refresh token rotation (access: 15min, refresh: 7 days)
- MFA إلزامي للأدوار العليا

**2. التحقق من البيانات:**
- Zod schemas على كل المدخلات
- SQL injection prevention (parameterized queries)
- XSS prevention (React + sanitization)

**3. تحديد المعدل:**
- API: 100 req/min/user
- Auth: 5 req/min/IP
- File Upload: 10 req/min/user

**4. الامتثال:**
- OWASP Top 10 mitigated
- GDPR compliant
- PCI DSS for payments
- WCAG 2.1 AA

---

## 5. 🧬 قواعد تصميم قاعدة البيانات

### 5.1 مبادئ التصميم

| المبدأ | التطبيق |
|--------|---------|
| **Normalization** | 3NF كحد أدنى |
| **No JSON Abuse** | كيانات النواة fully normalized |
| **Soft Delete** | `deleted_at` في جميع الجداول |
| **Versioning** | جداول `*_versions` للمحتوى |
| **Indexing** | إلزامي على المفاتيح وحقول البحث |

### 5.2 أنماط حرجة

```sql
-- نمط الحذف الناعم (Soft Delete)
ALTER TABLE news ADD COLUMN deleted_at TIMESTAMP NULL;
CREATE INDEX idx_news_active ON news(deleted_at)
  WHERE deleted_at IS NULL;

-- نمط التحكم في الإصدارات (Versioning)
CREATE TABLE news_versions (
  id          SERIAL PRIMARY KEY,
  news_id     INT REFERENCES news(id),
  version_no  INT NOT NULL,
  content     JSONB NOT NULL,
  changed_by  INT REFERENCES users(id),
  changed_at  TIMESTAMP DEFAULT NOW()
);

-- سجل التدقيق (Immutable Audit Log)
CREATE TABLE audit_logs (
  id           SERIAL PRIMARY KEY,
  entity_type  VARCHAR(50) NOT NULL,
  entity_id    INT NOT NULL,
  action       VARCHAR(50) NOT NULL,
  actor_id     INT REFERENCES users(id),
  metadata     JSONB,
  ip_address   INET,
  created_at   TIMESTAMP DEFAULT NOW()
) PARTITION BY RANGE (created_at);
-- ⚠️ No UPDATE, No DELETE allowed on this table
```

### 5.3 فهرسة الأداء

```sql
-- حقول الفهرسة الإلزامية
CREATE INDEX ON news(slug);
CREATE INDEX ON news(status);
CREATE INDEX ON news(created_at DESC);
CREATE INDEX ON news(author_id);
CREATE INDEX ON news(tenant_id);

-- البحث النصي (Arabic Full-Text)
CREATE INDEX idx_news_fts ON news
  USING GIN (to_tsvector('arabic', title || ' ' || content));
```

---

## 6. 🔌 معايير تصميم API

### 6.1 هيكل URL

```
# Pattern
/api/v{version}/{domain}/{resource}
/api/v{version}/{domain}/{resource}/{id}
/api/v{version}/{domain}/{resource}/{id}/actions/{action}

# أمثلة
GET    /api/v1/news
GET    /api/v1/news/123
POST   /api/v1/news
PUT    /api/v1/news/123
DELETE /api/v1/news/123              # Soft delete
POST   /api/v1/news/123/actions/publish
POST   /api/v1/workflow/news/123/approve
GET    /api/v1/ai/analyze
```

### 6.2 تنسيق الاستجابة (Standardized)

```typescript
// نجاح
interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// خطأ
interface ApiError {
  success: false;
  error: {
    code: string;        // e.g. "CONTENT_NOT_FOUND"
    message: string;
    details?: Record<string, any>;
  };
}
```

### 6.3 قواعد المعمارية
- ✅ RESTful فقط
- ✅ Service Layer إلزامي (لا business logic في controllers)
- ✅ DTOs للمدخلات والمخرجات
- ✅ Zod validation على كل المدخلات
- ✅ Error handling مركزي
- ✅ Rate limiting على كل endpoint
- ✅ Cache headers للـ CDN

---

## 7. 🧩 معمارية الواجهة الأمامية

### 7.1 تنظيم المكونات

```
src/app/components/
├── ui/                         # Design System (atomic)
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   ├── Card/
│   ├── Input/
│   ├── Modal/
│   └── ...
│
├── layout/                     # Layout Components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── Navigation.tsx
│
├── features/                   # Feature Components
│   ├── news/
│   │   ├── NewsCard.tsx
│   │   ├── NewsList.tsx
│   │   ├── NewsFilter.tsx
│   │   └── NewsEditor.tsx
│   ├── projects/
│   ├── donations/
│   ├── media/
│   └── dashboard/
│
└── shared/                     # Shared Business Components
    ├── DataTable.tsx
    ├── SearchBar.tsx
    ├── Pagination.tsx
    ├── FileUpload.tsx
    └── StatusBadge.tsx
```

### 7.2 مبادئ المكونات
- **Composition over inheritance**
- **TypeScript interfaces** لجميع الـ props
- **Compound components** للـ UI المعقد
- **Custom hooks** لفصل المنطق عن العرض

### 7.3 Design Tokens

```typescript
// tokens/index.ts
export const tokens = {
  colors: {
    brand: {
      primary:   '#006C35',   // أخضر إسلامي
      secondary: '#8B4513',   // بني دافئ
      accent:    '#F4B400',   // ذهبي
    },
    semantic: {
      success: '#4CAF50',
      warning: '#FF9800',
      error:   '#F44336',
      info:    '#2196F3',
    },
  },
  typography: {
    fontFamily: {
      arabic:  ['Tajawal', 'Cairo', 'sans-serif'],
      english: ['Inter', 'Roboto', 'sans-serif'],
    },
    fontSize: {
      xs:   '0.75rem',    // 12px
      sm:   '0.875rem',   // 14px
      base: '1rem',       // 16px
      lg:   '1.125rem',   // 18px
      xl:   '1.25rem',    // 20px
      '2xl':'1.5rem',     // 24px
      '3xl':'1.875rem',   // 30px
      '4xl':'2.25rem',    // 36px
    },
  },
  spacing: {
    1:  '0.25rem',
    2:  '0.5rem',
    4:  '1rem',
    8:  '2rem',
    16: '4rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};
```

### 7.4 إدارة الحالة

| نوع الحالة | الأداة | الاستخدام |
|-----------|--------|-----------|
| **Global** | Context API | Auth, Theme, Language |
| **Form** | React Hook Form | Input validation |
| **Local UI** | useState/useReducer | Modal, dropdown |
| **Server** | TanStack Query *(Future)* | API data + caching |

---

## 8. 📈 معايير الأداء

### 8.1 Core Web Vitals Targets

| Metric | Target | ✅ Good | ❌ Poor |
|--------|--------|---------|---------|
| **LCP** | < 2.5s | ≤ 2.5s | > 4.0s |
| **FID** | < 100ms | ≤ 100ms | > 300ms |
| **CLS** | < 0.1 | ≤ 0.1 | > 0.25 |
| **TTFB** | < 300ms | ≤ 300ms | > 600ms |
| **FCP** | < 1.8s | ≤ 1.8s | > 3.0s |

### 8.2 تقنيات التحسين

**Code Splitting:**
```typescript
// Lazy loading للـ routes
const ProjectsPage = lazy(() => import('./features/projects/ProjectsPage'));
const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'));
```

**Image Optimization:**
- WebP / AVIF auto-conversion
- Responsive `srcset` generation
- Intersection Observer للـ lazy loading
- Blur placeholder (LQIP)

**Bundle Optimization:**
- Tree shaking (ES modules)
- Dynamic imports
- Vendor chunk splitting
- Gzip / Brotli compression

---

## 9. 📊 المراقبة والرصد (Observability)

### 9.1 نظام التسجيل (Structured Logging)

```typescript
interface LogEntry {
  timestamp: string;          // ISO 8601
  level: 'debug' | 'info' | 'warn' | 'error';
  service: string;            // e.g. 'cms-api'
  traceId: string;
  spanId: string;
  userId?: string;
  message: string;
  metadata?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack: string;
  };
}
```

### 9.2 Stack المراقبة

| الطبقة | الأداة |
|--------|--------|
| **Error Tracking** | Sentry |
| **Performance** | Vercel Analytics |
| **Uptime** | UptimeRobot |
| **Audit Trail** | Custom Admin Viewer |

### 9.3 حدود التنبيه

| الحدث | المستوى | الإجراء |
|-------|---------|---------|
| Error rate > 1% | Critical 🔴 | PagerDuty |
| API response > 500ms | Warning 🟡 | Slack |
| Disk usage > 80% | Info 🔵 | Email |
| Login failures > 10/min | Security 🛡️ | Immediate block |

---

## 10. 🧠 فلسفة الذكاء الاصطناعي

### 10.1 AI كـ Non-Critical Service

```
┌────────────────────────────────────────────┐
│            Main CMS Application            │
│  ┌──────────────────────────────────────┐  │
│  │    Content Workflow (Always Works)   │  │
│  └──────────────────────────────────────┘  │
│              ↓ (Optional, Async)            │
│  ┌──────────────────────────────────────┐  │
│  │      AI Enhancement Service          │  │
│  │  • Content Analysis                  │  │
│  │  • SEO Suggestions                   │  │
│  │  • Language Quality                  │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

### 10.2 القواعد الثابتة

| القاعدة | التطبيق |
|--------|---------|
| النظام يعمل بدون AI | Graceful degradation |
| AI يقترح فقط | Human-in-the-loop |
| لا يتحكم في النشر | Final approval = Human |
| خصوصية البيانات | No sensitive data to AI |
| Cache النتائج | 24h caching |

---

## 11. ☁️ معمارية النشر (Deployment)

### 11.1 Stack الإنتاج الموصى به