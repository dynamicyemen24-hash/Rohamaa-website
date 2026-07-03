import { useState, useEffect } from "react";

import { CardSkeleton, ShimmerSkeleton } from "@/app/components/Skeleton";
import { mediaDashboardService } from "@/shared/services/dashboard.service";

function MediaLoadingSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <ShimmerSkeleton className="mx-auto mb-4 w-32 h-6" />
          <ShimmerSkeleton className="mx-auto mb-4 w-64 h-8" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
              <ShimmerSkeleton className="h-40 w-full" />
              <div className="p-3 space-y-2">
                <ShimmerSkeleton className="w-3/4 h-4" />
                <ShimmerSkeleton className="w-1/2 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    mediaDashboardService.getAll().then((items) => {
      if (!cancelled) setMedia(items);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <MediaLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="inline-block mb-3 text-[var(--brand-green)] border border-[var(--brand-green)]/30 bg-[var(--brand-green-pale)] px-4 py-1 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            معرض الوسائط
          </span>
          <h1 className="text-[var(--foreground)]">صور <span className="text-[var(--brand-green)]">وفيديوهات</span></h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((m: any) => (
            <div key={m.id} className="bg-white rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-40 overflow-hidden">
                <img src={m.url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-xs font-semibold">{m.type}</span>
              </div>
              <div className="p-3">
                <div style={{ fontSize: "0.78rem", fontWeight: 600 }}>{m.title}</div>
                <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.65rem" }}>{m.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}