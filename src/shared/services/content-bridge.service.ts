// ============================================================
// Content Bridge Service - حل مشكلة CORS والاتصال بـ Sanity
// ============================================================
import { 
  SEED_NEWS_ITEMS, 
  SEED_SUCCESS_STORIES, 
  SEED_PARTNERS,
  SEED_PROJECTS,
  SEED_IMPACT,
  SEED_REPORTS,
  SEED_MEDIA,
} from '@/content/website';

type ContentSource = 'sanity' | 'static' | 'hybrid';
type ContentType = 'news' | 'stories' | 'partners' | 'projects' | 'impact' | 'reports' | 'media';

interface ContentResult<T> {
  data: T[];
  source: ContentSource;
  isDynamic: boolean;
  lastUpdated: Date;
  error?: string;
}

class ContentBridgeService {
  private static instance: ContentBridgeService;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 دقائق
  private pendingFetches = new Map<string, Promise<ContentResult<any>>>();
  private sanityBaseUrl = '/api/sanity/v2024-01-01/data/query/production';

  private staticDataMap: Record<string, any[]> = {
    news: SEED_NEWS_ITEMS as any[],
    stories: SEED_SUCCESS_STORIES as any[],
    partners: SEED_PARTNERS as any[],
    projects: SEED_PROJECTS as any[],
    impact: [SEED_IMPACT] as any[],
    reports: SEED_REPORTS as any[],
    media: SEED_MEDIA as any[],
  };

  private sanityQueries: Record<string, string> = {
    news: `*[_type == "news" && status == "PUBLISHED"] | order(publishDate desc) {_id, title, excerpt, category, status, "mainImage": mainImage, publishDate, tags, views, featured}`,
    stories: `*[_type == "successStory" && status == "published"] {_id, title, name, program, "mainImage": mainImage, content, category, year, location, rating, quote, featured}`,
    partners: `*[_type == "partner" && status == "active"] {_id, name, type, "logo": logo, website, status}`,
    projects: `*[_type == "project" && status != "archived"] | order(_createdAt desc) {_id, title, category, status, beneficiaries, budget, progress, location, description, "mainImage": mainImage, insights, achievements, featured, slug}`,
    impact: `*[_type == "siteSettings"][0]`,
    reports: `*[_type == "report"] | order(date desc) {_id, title, type, "file": file, status, date, size}`,
    media: `*[_type == "media"] | order(_createdAt desc) {_id, title, type, "file": file, date, size, altText}`,
  };

  static getInstance(): ContentBridgeService {
    if (!ContentBridgeService.instance) {
      ContentBridgeService.instance = new ContentBridgeService();
    }
    return ContentBridgeService.instance;
  }

  async getContent<T>(contentType: ContentType): Promise<ContentResult<T>> {
    // Check cache first
    const cached = this.cache.get(contentType);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    // Deduplicate concurrent requests
    if (this.pendingFetches.has(contentType)) {
      return this.pendingFetches.get(contentType)!;
    }

    const fetchPromise = this.fetchContent<T>(contentType);
    this.pendingFetches.set(contentType, fetchPromise);

    try {
      const result = await fetchPromise;
      return result;
    } finally {
      this.pendingFetches.delete(contentType);
    }
  }

  private async fetchContent<T>(contentType: ContentType): Promise<ContentResult<T>> {
    const query = this.sanityQueries[contentType];
    const encodedQuery = encodeURIComponent(query);
    const url = `${this.sanityBaseUrl}?query=${encodedQuery}&returnQuery=false&perspective=published`;

    // Option 1: Try via Vite proxy (localhost)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const json = await response.json();
        const sanityData = json?.result;

        if (sanityData && (Array.isArray(sanityData) ? sanityData.length > 0 : sanityData)) {
          const result: ContentResult<T> = {
            data: Array.isArray(sanityData) ? sanityData : [sanityData],
            source: 'sanity',
            isDynamic: true,
            lastUpdated: new Date(),
          };
          this.cache.set(contentType, { data: result, timestamp: Date.now() });
          return result;
        }
      }
    } catch (error) {
      console.warn(`[ContentBridge] Proxy fetch failed for ${contentType}, trying direct:`, error);
    }

    // Option 2: Try direct Sanity API with CORS mode
    try {
      const directUrl = `https://xd0ohyiz.api.sanity.io/v2024-01-01/data/query/production?query=${encodedQuery}&returnQuery=false&perspective=published`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(directUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const json = await response.json();
        const sanityData = json?.result;

        if (sanityData && (Array.isArray(sanityData) ? sanityData.length > 0 : sanityData)) {
          const result: ContentResult<T> = {
            data: Array.isArray(sanityData) ? sanityData : [sanityData],
            source: 'sanity',
            isDynamic: true,
            lastUpdated: new Date(),
          };
          this.cache.set(contentType, { data: result, timestamp: Date.now() });
          return result;
        }
      }
    } catch (error) {
      console.warn(`[ContentBridge] Direct Sanity fetch failed for ${contentType}:`, error);
    }

    // Fallback: Static content
    return this.getStaticContent<T>(contentType);
  }

  private getStaticContent<T>(contentType: ContentType): ContentResult<T> {
    const staticData = this.staticDataMap[contentType] || [];
    return {
      data: staticData as T[],
      source: 'static',
      isDynamic: false,
      lastUpdated: new Date(),
    };
  }

  async refreshContent(contentType: ContentType): Promise<void> {
    this.cache.delete(contentType);
  }

  getStaticData<T>(contentType: ContentType): T[] {
    return (this.staticDataMap[contentType] || []) as T[];
  }

  // Force clear cache and retry
  async forceRefresh<T>(contentType: ContentType): Promise<ContentResult<T>> {
    this.cache.delete(contentType);
    this.pendingFetches.delete(contentType);
    return this.getContent<T>(contentType);
  }
}

export const contentBridge = ContentBridgeService.getInstance();