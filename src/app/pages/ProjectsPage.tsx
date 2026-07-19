import { FolderOpen, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

import { Skeleton, CardSkeleton } from "@/app/components/Skeleton";
import { SEED_PROJECTS } from "@/content/website";
import { sanityService } from "@/shared/services/sanity.service";

function ProjectsLoadingSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <Skeleton width="120px" height="28px" className="mx-auto mb-3" />
          <Skeleton width="300px" height="36px" className="mx-auto" />
          <Skeleton width="400px" height="20px" className="mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

const LoadingSkeleton = ProjectsLoadingSkeleton;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fallback = SEED_PROJECTS.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      status: p.status,
      beneficiaries: p.beneficiaries,
      location: p.location,
      progress: p.progress,
      image: p.image,
    }));
    sanityService.getProjects().then((items) => {
      if (!cancelled) {
        const normalized = items.length > 0
          ? items.map((p: any) => ({
              id: p._id,
              title: p.title,
              description: p.description,
              status: p.status,
              beneficiaries: p.beneficiaries,
              location: p.location,
              progress: p.progress,
              image: p.mainImage ? sanityService.getImageUrl(p.mainImage) : undefined,
            }))
          : fallback;
        setProjects(normalized);
      }
    }).catch(() => {
      if (!cancelled) setProjects(fallback);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <ProjectsLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="inline-block mb-3 text-[var(--brand-green)] border border-[var(--brand-green)]/30 bg-[var(--brand-green-pale)] px-4 py-1 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            مشاريعنا
          </span>
          <h1 className="text-[var(--foreground)]">مشاريع <span className="text-[var(--brand-green)]">المؤسسة</span></h1>
          <p className="text-[var(--muted-foreground)] mt-2 max-w-xl mx-auto" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
            تصفح جميع مشاريع المؤسسة وبرامجها التنموية والإنسانية
          </p>
        </div>
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4 opacity-50" />
            <h3 className="text-[var(--foreground)] text-lg font-semibold mb-2">لا توجد مشاريع حالياً</h3>
            <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.85rem" }}>
              نعمل حالياً على إضافة مشاريع جديدة، تابعنا لاحقاً
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p: any) => (
              <div key={p.id} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[var(--brand-green)]/30">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 style={{ fontWeight: 700, fontSize: "0.9rem" }}>{p.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === 'active' ? 'bg-green-50 text-green-600' : p.status === 'completed' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                      {p.status === 'active' ? 'نشط' : p.status === 'completed' ? 'مكتمل' : 'قيد الانتظار'}
                    </span>
                  </div>
                  <p className="text-[var(--muted-foreground)] mb-4" style={{ fontSize: "0.8rem", lineHeight: "1.7" }}>{p.description}</p>
                  <div className="flex gap-4 text-[var(--muted-foreground)] mb-3" style={{ fontSize: "0.75rem" }}>
                    <span>👥 {p.beneficiaries}</span>
                    <span>📍 {p.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>نسبة الإنجاز</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--brand-green)" }}>{p.progress}٪</span>
                  </div>
                  <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[var(--brand-green)] transition-all duration-500" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}