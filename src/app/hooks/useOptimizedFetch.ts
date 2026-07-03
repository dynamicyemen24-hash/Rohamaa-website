// ============================================================
// useOptimizedFetch Hook - optimized fetching with caching and deduplication
// ============================================================
import { useState, useEffect, useCallback, useRef, memo } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  promise?: Promise<T>;
}

const globalCache = new Map<string, CacheEntry<any>>();
const pendingRequests = new Map<string, Promise<any>>();

export function useOptimizedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number;
    staleTime?: number;
    immediate?: boolean;
  } = {}
): { data: T | null; loading: boolean; error: string | null; refetch: () => void } {
  const { ttl = 5 * 60 * 1000, staleTime = 60 * 1000, immediate = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    const now = Date.now();
    const cached = globalCache.get(key);

    // Return stale data immediately if available
    if (cached && now - cached.timestamp < ttl + staleTime) {
      if (!mountedRef.current) return;
      setData(cached.data);

      // Background refresh if stale
      if (now - cached.timestamp > ttl && !cached.promise) {
        const promise = fetcher().catch(() => {});
        cached.promise = promise;
        pendingRequests.set(key, promise);

        promise.then(result => {
          if (mountedRef.current) {
            setData(result as T);
            globalCache.set(key, { data: result, timestamp: Date.now() });
          }
        }).finally(() => {
          pendingRequests.delete(key);
        });
      }
      return;
    }

    // Deduplicate in-flight requests
    if (pendingRequests.has(key)) {
      try {
        const result = await pendingRequests.get(key)!;
        if (mountedRef.current) setData(result as T);
      } catch {
        // Ignore dedup errors
      }
      return;
    }

    // Fetch new data
    setLoading(true);
    setError(null);

    const promise = fetcher();
    pendingRequests.set(key, promise);

    promise
      .then(result => {
        if (mountedRef.current) {
          setData(result as T);
          globalCache.set(key, { data: result, timestamp: Date.now() });
        }
      })
      .catch((err: any) => {
        if (mountedRef.current) {
          setError(err?.message || 'حدث خطأ');
        }
      })
      .finally(() => {
        pendingRequests.delete(key);
        if (mountedRef.current) setLoading(false);
      });

    return promise;
  }, [key, fetcher, ttl, staleTime]);

  useEffect(() => {
    mountedRef.current = true;
    if (immediate) fetchData();

    return () => {
      mountedRef.current = false;
    };
  }, [immediate, fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Optimize re-renders with memo comparison
export function createOptimizedComponent<T extends object>(
  Component: React.FC<T>,
  areEqual?: (prev: T, next: T) => boolean
) {
  return memo(Component, areEqual);
}
