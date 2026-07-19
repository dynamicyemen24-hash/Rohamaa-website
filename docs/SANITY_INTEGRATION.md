# تكامل Sanity.io مع منصة رحماء بينهم

## مقدمة
تم دمج Sanity.io كنظام إدارة محتوى (CMS) رئيسي مع الموقع، ليس فقط لوحة تحكم مخصصة.

## البنية
```
src/
├── sanity/
│   ├── schema.ts          # مخططات المحتوى
│   ├── client.ts          # عميل Sanity
│   ├── index.ts           # تصدير المكونات
│   └── components/
│       └── PortableText.tsx  # مكون النص الغني
├── shared/
│   ├── services/
│   │   └── sanity.service.ts  # خدمة التكامل
│   └── hooks/
│       └── useSanityData.ts   # React Hooks
```

## طريقة الاستخدام

### 1. إعداد متغيرات البيئة
```bash
# .env.local أو .env.production
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_READ_TOKEN=your-read-token
VITE_SANITY_WRITE_TOKEN=your-write-token
```

### 2. جلب البيانات في المكونات
```tsx
import { useSanityNews, useSanityProjects } from '@/shared/hooks/useSanityData';

function MyComponent() {
  const { news, loading, error } = useSanityNews(true);
  
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {news.map(item => (
        <article key={item._id}>
          <h2>{item.title}</h2>
          <PortableText value={item.content} />
        </article>
      ))}
    </div>
  );
}
```

### 3. عرض الصور
```tsx
import { urlFor } from '@/sanity/client';

function ProjectImage({ project }: { project: SanityProject }) {
  const imageUrl = urlFor(project.mainImage)
    .width(600)
    .height(400)
    .url();
    
  return <img src={imageUrl} alt={project.title} />;
}
```

### 4. الوصول إلى لوحة التحكم
- **URL:** `https://rohamaa.org/admin/studio`
- أو محلياً: `http://localhost:3000/admin/studio`

## أنواع المحتوى المتاحة

| النوع | التفسير | الحقول الرئيسية |
|-------|---------|----------------|
| project | المشروع | title, description, category, status, progress, budget |
| news | الخبر | title, content, excerpt, category, status, mainImage |
| successStory | قصة نجاح | title, name, program, content, mainImage |
| partner | شريك | name, type, description, logo, website |
| media | وسائط | title, file, type, altText |
| report | تقرير | title, type, file, status |
| contactRequest | طلب تواصل | name, email, message, status |
| volunteer | متطوع | name, email, field, status |

## النشر على Vercel

### 1. الخطوات الأولية
```bash
# تثبيت الحزم
pnpm install

# بناء الموقع
pnpm build

# نشر على Vercel
vercel --prod
```

### 2. إعداد Webhook للتحديث التلقائي
```typescript
// في Vercel Dashboard → Settings → Environment Variables
SANITY_WEBHOOK_SECRET=secret-for-revalidate-webhook
```

## النشر على GitHub

### Secrets المطلوبة في GitHub
- `SANITY_AUTH_TOKEN` - رمز المصادقة
- `VERCEL_ORG_ID` - معرف المؤسسة
- `VERCEL_PROJECT_ID` - معرف المشروع
- `VERCEL_TOKEN` - رمز Vercel API

## مزايا Sanity مقارنة باللوحة القديمة

✅ **تحرير محتوى مرئي** - Portable Text Editor
✅ **إدارة الصور الذكية** - CDN خارجي + تحويل تلقائي
✅ **نظام الإصدارات** - نسخة ومستندات مرمزة
✅ **Webhook للتحديث** - تحديث فوري عند التغيير
✅ **تكامل Git** - التحكم في الإصدارات
✅ **أمان مميزات** - توكنز وتحكم في الوصول
✅ **دعم متعدد اللغات** - i18n جاهز
✅ **API موثوق** - GROQ query language

## الروابط السريعة
- **Studio URL:** https://rohamaa.sanity.studio
- **API Docs:** https://www.sanity.io/docs
- **GROQ Reference:** https://www.sanity.io/docs/groq