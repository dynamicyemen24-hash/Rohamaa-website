/**
 * React Hook for Sanity Data Fetching
 * Integrates with Vite + React Query for caching
 */

import { useState, useEffect } from 'react';

import { sanityService } from '../services/sanity.service';

interface UseSanityOptions<T> {
  initialValue?: T;
  fetchOnMount?: boolean;
}

export function useSanityProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await sanityService.getProjects();
        if (!cancelled) {
          setProjects(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProjects();
    
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, error };
}

export function useSanityNews(publishedOnly = true) {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchNews() {
      setLoading(true);
      try {
const data = await sanityService.getNews();
        if (!cancelled) {
          setNews(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchNews();
    
    return () => { cancelled = true; };
  }, [publishedOnly]);

  return { news, loading, error };
}

export function useSanityPartners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchPartners() {
      setLoading(true);
      try {
        const data = await sanityService.getPartners();
        if (!cancelled) {
          setPartners(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPartners();
    
    return () => { cancelled = true; };
  }, []);

  return { partners, loading, error };
}

export function useSanitySuccessStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchStories() {
      setLoading(true);
      try {
        const data = await sanityService.getSuccessStories();
        if (!cancelled) {
          setStories(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchStories();
    
    return () => { cancelled = true; };
  }, []);

  return { stories, loading, error };
}

export function useSanityMedia() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchMedia() {
      setLoading(true);
      try {
        const data = await sanityService.getMedia();
        if (!cancelled) {
          setMedia(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMedia();
    
    return () => { cancelled = true; };
  }, []);

  return { media, loading, error };
}

export function useSanityReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchReports() {
      setLoading(true);
      try {
        const data = await sanityService.getReports();
        if (!cancelled) {
          setReports(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchReports();
    
    return () => { cancelled = true; };
  }, []);

  return { reports, loading, error };
}