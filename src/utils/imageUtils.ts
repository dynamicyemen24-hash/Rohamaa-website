// src/utils/imageUtils.ts

/**
 * أدوات معالجة الصور للمؤسسة
 * توفر صور افتراضية ذكية في حالة عدم توفر صور من لوحة التحكم
 */

// ألوان المؤسسة حسب التصنيفات
const CATEGORY_COLORS: Record<string, string> = {
  'تعليم': '2563EB',
  'إغاثة': 'E74C3C',
  'تنمية': '10B981',
  'شراكات': '7C3AED',
  'تدريب': 'F59E0B',
  'رعاية': 'EC4899',
  'تطوع': '14B8A6',
  'عام': '6B7280'
};

// أيقونات التصنيفات
const CATEGORY_ICONS: Record<string, string> = {
  'تعليم': '📚',
  'إغاثة': '🆘',
  'تنمية': '🌱',
  'شراكات': '🤝',
  'تدريب': '🎯',
  'رعاية': '💝',
  'تطوع': '🤲',
  'عام': '📰'
};

// صور افتراضية عالية الجودة متنوعة حسب مسارات العمل الخيري للمؤسسة
// (إغاثة، تعليم، مياه، مجتمع، أيتام، تمكين، وتحفيظ قرآني) — بطابع لائق غير شخصي
const HIGH_QUALITY_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&crop=center', // يد عطاء ومساعدة
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&crop=center', // تعليم وكتاب
  'https://images.unsplash.com/photo-1642425149556-b6f90e946859?w=800&h=600&fit=crop&crop=center', // مياه شرب نقية
  'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop&crop=center', // تنمية مجتمعية
  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop&crop=center', // أطفال وأيتام
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop&crop=center', // تمكين المرأة (تدريب)
  'https://images.unsplash.com/photo-1542815391-5e04e9682458?w=800&h=600&fit=crop&crop=center', // مصحف شريف (تحفيظ)
  'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&h=600&fit=crop&crop=center', // قوافل إغاثة
];

// صور خاصة بالمؤسسة
const CUSTOM_FALLBACK_IMAGES = [
  '/images/charity-1.jpg',
  '/images/charity-2.jpg',
  '/images/charity-3.jpg',
  '/images/charity-4.jpg',
  '/images/charity-5.jpg',
];

// مولد أرقام عشوائية ثابت لتجنب المشاكل في render
let placeholderCounter = 0;
let imageCounter = 0;

/**
 * الحصول على صورة placeholder مع نص مخصص
 * تستخدم خدمات متعددة كبدائل لتجنب المشاكل
 */
export const getPlaceholderImage = (
  text: string = 'رحماء بينهم',
  category?: string,
  width: number = 800,
  height: number = 600
): string => {
  // اختيار اللون حسب التصنيف
  const color = category && CATEGORY_COLORS[category] 
    ? CATEGORY_COLORS[category] 
    : '10B981';
  
  // تنسيق النص
  const cleanText = text
    .substring(0, 20)
    .replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, ' ')
    .trim();
  
  const encodedText = encodeURIComponent(cleanText || 'رحماء بينهم');
  
  // استخدام عداد ثابت بدلاً من Math.random لتجنب المشاكل
  placeholderCounter = (placeholderCounter + 1) % (HIGH_QUALITY_FALLBACK_IMAGES.length + 3);
  
  // خدمات الصور البديلة (بدون Math.random) - بطابع خيري متنوع
  const placeholders = [
    `https://source.unsplash.com/random/${width}x${height}/?charity,help,yemen,community`,
    `https://picsum.photos/${width}/${height}?random=${placeholderCounter}`,
    `https://placehold.co/${width}x${height}/${color}/FFFFFF/png?text=${encodedText}`,
    ...HIGH_QUALITY_FALLBACK_IMAGES,
  ];
  
  // استخدام العداد للاختيار
  return placeholders[placeholderCounter] || HIGH_QUALITY_FALLBACK_IMAGES[0];
};

/**
 * الحصول على صورة افتراضية عشوائية عالية الجودة
 * تستخدم عداد ثابت لتجنب المشاكل في render
 */
export const getRandomImage = (category?: string): string => {
  // استخدام العداد الثابت بدلاً من Math.random
  imageCounter = (imageCounter + 1) % HIGH_QUALITY_FALLBACK_IMAGES.length;
  
  // إذا كان هناك تصنيف، حاول العثور على صورة مناسبة لنوع المشروع
  if (category) {
    const categoryImages: Record<string, string[]> = {
      'تعليم': [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
      ],
      'إغاثة': [
        'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop',
      ],
      'تنمية': [
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1642425149556-b6f90e946859?w=800&h=600&fit=crop',
      ],
      'رعاية': [
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop',
      ],
    };
    
    const images = categoryImages[category] || HIGH_QUALITY_FALLBACK_IMAGES;
    return images[imageCounter % images.length];
  }
  
  // استخدام العداد الثابت
  return HIGH_QUALITY_FALLBACK_IMAGES[imageCounter];
};

/**
 * الحصول على صورة آمنة مع fallback ذكي
 */
export const getSafeImage = (
  imageUrl?: string,
  title?: string,
  category?: string,
  usePlaceholder: boolean = true
): string => {
  // إذا كانت الصورة موجودة، استخدمها
  if (imageUrl && imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // إذا كانت الصورة محلية (تبدأ بـ /)
  if (imageUrl && imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  // استخدام صورة عشوائية عالية الجودة
  if (!usePlaceholder) {
    return getRandomImage(category);
  }
  
  // استخدام placeholder مع النص
  return getPlaceholderImage(title || 'رحماء بينهم', category);
};

/**
 * معالج خطأ تحميل الصور
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackImage?: string
): void => {
  const img = event.currentTarget;
  if (img.src !== fallbackImage) {
    // محاولة استخدام صورة بديلة
    if (fallbackImage) {
      img.src = fallbackImage;
    } else {
      // استخدام placeholder
      img.src = getPlaceholderImage('صورة غير متوفرة');
    }
  }
};

/**
 * الحصول على صورة مصغرة (Thumbnail)
 */
export const getThumbnail = (url: string, size: number = 300): string => {
  if (!url) return getPlaceholderImage('', undefined, size, size);
  
  // إذا كانت من Unsplash، أضف معامل الحجم
  if (url.includes('unsplash.com')) {
    return url.replace(/w=\d+/, `w=${size}`).replace(/h=\d+/, `h=${size}`);
  }
  
  return url;
};

/**
 * قائمة الصور الموصى بها للمؤسسة
 */
export const RECOMMENDED_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=800&fit=crop',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
  relief: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&h=600&fit=crop',
  development: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop',
  partnership: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop',
  volunteer: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop',
  children: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop',
  community: 'https://images.unsplash.com/photo-1642425149556-b6f90e946859?w=800&h=600&fit=crop',
};

export default {
  getPlaceholderImage,
  getRandomImage,
  getSafeImage,
  handleImageError,
  getThumbnail,
  RECOMMENDED_IMAGES,
};