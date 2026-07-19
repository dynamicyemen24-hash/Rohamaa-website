/**
 * SEO Helper Utilities
 */

export const seoConfig = {
  // إضافة بدائل للصور
  imageFallback: '/images/fallback.jpg',
  ogImage: '/og-image.jpg',
  
  // تحسين meta tags
  generateMeta: (data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  } = {}) => ({
    title: data.title || 'Rahmaa Baynahum',
    description: data.description || 'منصة الخير والإحسان - مؤسسة رحماء بينهم الخيرية',
    image: data.image || '/images/default-og.jpg',
    url: data.url || 'https://rohamaa.org',
  }),
  
  // هيكلة البيانات JSON-LD
  generateSchema: (data: {
    name?: string;
    url?: string;
  } = {}) => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name || 'Rahmaa Baynahum',
    url: data.url || 'https://rohamaa.org',
    logo: '/images/logo.png',
    sameAs: [
      'https://facebook.com/rohamaa',
      'https://twitter.com/rohamaa',
      'https://youtube.com/rohamaa',
    ],
  }),
};

/**
 * توليد Schema للمنظمات الخيرية
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'مؤسسة رحماء بينهم',
    alternateName: 'Rohamaa Foundation',
    url: 'https://rohamaa.org',
    logo: 'https://rohamaa.org/favicon.svg',
    description: 'منظمة إنسانية تنموية تعمل على تخفيف معاناة الإنسان وتحقيق التنمية المستدامة',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'YE'
    },
    sameAs: [
      'https://facebook.com/rohamaa',
      'https://twitter.com/rohamaa'
    ]
  };
}

/**
 * توليد Schema للمقالات
 */
export function generateArticleSchema(data: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image || '/images/default-og.jpg',
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Organization',
      name: 'مؤسسة رحماء بينهم'
    }
  };
}