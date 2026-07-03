import { FileText, Loader2, FolderOpen } from "lucide-react";
import { useState, useEffect } from "react";

import { Skeleton, CardSkeleton } from "@/app/components/Skeleton";
import { reportsDashboardService } from "@/shared/services/dashboard.service";

function ReportsLoadingSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <Skeleton width="140px" height="28px" className="mx-auto mb-3" />
          <Skeleton width="300px" height="36px" className="mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    reportsDashboardService.getAll().then((items) => {
      if (!cancelled) setReports(items.filter((item: any) => item.status !== 'draft'));
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <ReportsLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="inline-block mb-3 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-pale)] px-4 py-1 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            التقارير والإصدارات
          </span>
          <h1 className="text-[var(--foreground)]">التقارير <span className="text-[var(--brand-green)]">الدورية</span></h1>
        </div>
        {reports.length === 0 ? (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4 opacity-50" />
            <h3 className="text-[var(--foreground)] text-lg font-semibold mb-2">لا توجد تقارير حالياً</h3>
            <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.85rem" }}>
              ستتم إضافة التقارير قريباً
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((r: any) => (
              <div key={r.id} className="bg-white rounded-xl p-6 border border-[var(--border)] hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[var(--brand-green)]" />
                </div>
                <div className="flex-1">
                  <h3 style={{ fontWeight: 700, fontSize: "0.85rem" }}>{r.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-[var(--muted-foreground)]" style={{ fontSize: "0.75rem" }}>
                    <span>{r.type}</span>
                    <span>•</span>
                    <span>{r.size}</span>
                    <span>•</span>
                    <span>{r.date}</span>
                  </div>
                  <button className="mt-3 px-4 py-1.5 bg-[var(--brand-green)] text-white rounded-lg text-xs hover:bg-[var(--brand-green-light)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/50">
                    تحميل
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}