// src/shared/hooks/useDynamicContent.ts
import { useState, useEffect, useCallback } from 'react';

import { contentBridge } from '@/shared/services/content-bridge.service';

interface UseDynamicContentOptions<T> {
  contentType: string;
  initialData?: T[];
  enableRealtime?: boolean;
  refreshInterval?: number;
}

export function useDynamicContent<T = any>({
  contentType,
  initialData,
  enableRealtime = false,
  refreshInterval = 300000 // 5 دقائق
}: UseDynamicContentOptions<T>) {
  const [data, setData] = useState<T[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [source, setSource] = useState<'static' | 'sanity' | 'hybrid'>('static');
  const [error, setError] = useState<Error | null>(null);

  const loadContent = useCallback(async () => {
    try {
      const result = await contentBridge.getContent<T>(contentType as any);
      setData(result.data);
      setSource(result.source);
      setError(result.error ? new Error(result.error) : null);
    } catch (err) {
      setError(err as Error);
      // استخدام المحتوى الاحتياطي
      if (initialData) {
        setData(initialData);
      }
    } finally {
      setIsLoading(false);
    }
  }, [contentType, initialData]);

  useEffect(() => {
    loadContent();

    if (enableRealtime) {
      const interval = setInterval(loadContent, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [loadContent, enableRealtime, refreshInterval]);

  return {
    data,
    isLoading,
    source,
    error,
    isDynamic: source === 'sanity' || source === 'hybrid',
    refresh: loadContent
  };
}