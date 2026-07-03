import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'organization';
}

export function useSEO({
  title,
  description,
  keywords,
  image = '/favicon.svg',
  url = 'https://rohamaa.org',
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | مؤسسة رحماء بينهم`;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'مؤسسة رحماء بينهم');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph / Facebook
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', 'ar_YE', true);
    updateMetaTag('og:site_name', 'مؤسسة رحماء بينهم', true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // JSON-LD Structured Data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'مؤسسة رحماء بينهم',
      description,
      url: 'https://rohamaa.org',
      logo: '/favicon.svg',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'صنعاء',
        addressCountry: 'YE',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@rohamaa.org',
        telephone: '+96712345678',
        contactType: 'customer service',
      },
      sameAs: [],
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);

  }, [title, description, keywords, image, url, type]);
}