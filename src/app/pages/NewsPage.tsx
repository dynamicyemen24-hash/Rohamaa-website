// News Page - صفحة الأخبار
import { Newspaper, FolderOpen, Calendar, User, Tag } from "lucide-react";
import { useState, useEffect } from "react";

import { Skeleton, CardSkeleton } from "@/app/components/Skeleton";
import { SEED_NEWS_ITEMS } from "@/content/website";
import { sanityService } from "@/shared/services/sanity.service";

function NewsLoadingSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <Skeleton width="100px" height="28px" className="mx-auto mb-3" />
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

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fallback = SEED_NEWS_ITEMS.map((n: any) => ({
      id: n.id,
      title: n.title,
      excerpt: n.excerpt,
      category: n.category,
      date: n.date,
      image: n.image,
      views: n.views,
    }));
    sanityService.getNews().then((items) => {
      if (!cancelled) {
        const normalized = items.length > 0
          ? items.map((n: any) => ({
              id: n._id || n.id,
              title: n.title,
              excerpt: n.excerpt,
              category: n.category,
              date: n.publishDate || n.date,
              image: n.mainImage ? sanityService.getImageUrl(n.mainImage) : undefined,
              views: n.views,
            }))
          : fallback;
        setNews(normalized);
      }
    }).catch(() => {
      if (!cancelled) setNews(fallback);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <NewsLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="inline-block mb-3 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-pale)] px-4 py-1 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            الأخبار والفعاليات
          </span>
          <h1 className="text-[var(--foreground)]">آخر <span className="text-[var(--brand-green)]">الأخبار</span></h1>
          <p className="text-[var(--muted-foreground)] mt-2 max-w-xl mx-auto" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
            تابع أخبار مؤسسة رحماء بينهم والفعاليات القادمة
          </p>
        </div>
        {news.length === 0 ? (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4 opacity-50" />
            <h3 className="text-[var(--foreground)] text-lg font-semibold mb-2">لا توجد أخبار حالياً</h3>
            <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.85rem" }}>
              نعمل على إضافة محتوى جديد، تابعنا لاحقاً
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n: any) => (
              <article key={n.id} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {n.image && (
                  <img src={n.image} alt={n.title} className="w-full h-48 object-cover" loading="lazy" />
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "var(--brand-green-pale)", color: "var(--brand-green)" }}>
                      {n.category}
                    </span>
                    <span className="text-[var(--muted-foreground)]" style={{ fontSize: "0.72rem" }}>
                      • {n.date ? new Date(n.date).toLocaleDateString('ar-SA') : ''}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{n.title}</h3>
                  <p className="text-[var(--muted-foreground)] flex-1 mb-4" style={{ fontSize: "0.85rem", lineHeight: "1.7" }}>
                    {n.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                    <span className="text-[var(--muted-foreground)]" style={{ fontSize: "0.75rem" }}>
                      <Calendar className="w-3.5 h-3.5 inline mr-1" />
                      {n.views || 0} مشاهدة
                    </span>
                    <button className="px-4 py-1.5 bg-[var(--brand-green)] text-white rounded-lg text-xs hover:bg-[var(--brand-green-light)] transition-colors">
                      اقرأ المزيد
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}