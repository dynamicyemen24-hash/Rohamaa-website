# إعداد Sanity.io للموقع - الخطوات النهائية

## ✅ ما تم إنشاؤه

### 1. مخططات المحتوى (Schemas)
- `src/sanity/schema.ts` - جميع مخططات المحتوى
- أنواع: project, news, successStory, partner, media, report, contactRequest, volunteer, user, donation, subscriber

### 2. عميل Sanity
- `src/sanity/client.ts` - عميل Sanity مع GROQ queries
- واجهة برمة للخصائص والواجهات

### 3. خدمة التكامل
- `src/shared/services/sanity.service.ts` - خدمة البيانات
- `src/shared/hooks/useSanityData.ts` - React Hooks

### 4. مكونات واجهة المستخدم
- `src/sanity/components/PortableText.tsx` - مكون النص الغني

### 5. ملفات النشر
- `vercel.json` - إعدادات النشر مع Headers أمان
- `.github/workflows/sanity-deploy.yml` - CI/CD للـ GitHub Actions
- `.env.example` - متغيرات البيئة المحدثة

## خطوات الإعداد النهائية

### الخطوة 1: تثبيت الحزم
```bash
pnpm install
```

### الخطوة 2: إنشاء مشروع Sanity
```bash
# قم بزيارة https://www.sanity.io/manage لإنشاء مشروع جديد
# ثم استبدل القيم في .env
```

### الخطوة 3: تحديث .env
```bash
# احصل على القيم من لوحة تحكم Sanity:
# Settings → API → Tokens

cp .env.example .env.local
# ثم عدل القيم
```

### الخطوة 4: اختبار التكامل
```bash
pnpm dev
# افتح المتصفح على http://localhost:5173
```

### الخطوة 5: النشر على Vercel
```bash
# تأكد من وجود متغيرات البيئة في Vercel Dashboard
vercel --prod
```

## 🔄 كيفية استبدال اللوحة القديمة

### في المكونات الحالية
استبدل الاستيرادات من:
```tsx
import { postgresService } from '@/shared/services/postgres.service';
```

بـ:
```tsx
import { sanityService } from '@/shared/services/sanity.service';
```

### مثال على التحديث
```tsx
// قبل (من اللوحة القديمة)
const donations = await postgresService.getDonations();

// بعد (مع Sanity)
const donations = await sanityService.getDonations();
```

## 🔗 الروابط المهمة
- **الوثائع الا:** https://www.sanity.io/docs
- **GROQ Reference:** https://www.sanity.io/docs/groq
- **Studio:** https://rohamaa.sanity.studio (بعد النشر)

## 🚨 ملاحظات مهمة
1. استخدم `VITE_SANITY_READ_TOKEN` في المتصفح
2. استخدم `SANITY_AUTH_TOKEN` للنشر من سطر الأوامر
3. تأكد من تفعيل CORS في لوحة تحكم Sanity للنطاقين المحليين والإنتاج