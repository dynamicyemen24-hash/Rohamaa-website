import { Calendar, ArrowLeft, Eye, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

import { newsService } from "@/features/news/services/news.service";

interface NewsProps {
  setCurrentPage?: (page: string) => void;
}

export const News = ({ setCurrentPage = () => {} }: NewsProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    newsService.getFeaturedNews().then((data) => {
      if (!cancelled) {
        setItems(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = items[0];
  const rest = items.slice(1);

  if (loading) {
    return (
      <section className="py-20 bg-[var(--secondary)]" style={{ direction: "rtl" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-green)]" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[var(--secondary)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span
              className="inline-block mb-3 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-pale)] px-4 py-1 rounded-full"
              style={{ fontSize: "0.8rem", fontWeight: 600 }}
            >
              آخر الأخبار
            </span>
            <h2 className="text-[var(--foreground)]">
              أخبار المؤسسة{" "}
              <span className="text-[var(--brand-green)]">وفعالياتها</span>
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage("news")}
            className="flex items-center gap-2 text-[var(--brand-green)] hover:text-[var(--brand-green-light)] transition-colors whitespace-nowrap"
            style={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            كل الأخبار
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured */}
          <div
            className="lg:col-span-3 group bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--border)] hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setCurrentPage("news")}
          >
              <div className="relative h-56 sm:h-72 overflow-hidden">
                <img
                  src={featured?.featuredImage}
                  alt={featured?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1 rounded-full text-white"
                    style={{ fontSize: "0.7rem", fontWeight: 700, background: featured?.category?.color }}
                  >
                    {featured?.category?.name}
                  </span>
                </div>
              <div className="absolute bottom-4 right-4 left-4">
                <h3 className="text-white mb-2" style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                  {featured?.title}
                </h3>
                <div className="flex items-center gap-4 text-white/70">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}>
                    <Calendar className="w-3.5 h-3.5" />
                    {featured?.date}
                  </span>
                  <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}>
                    <Eye className="w-3.5 h-3.5" />
                    {featured?.views}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.85rem", lineHeight: "1.7" }}>
                {featured?.excerpt}
              </p>
              <button
                className="mt-4 flex items-center gap-1.5 text-[var(--brand-green)] group-hover:gap-3 transition-all"
                style={{ fontSize: "0.82rem", fontWeight: 600 }}
              >
                اقرأ المزيد
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Side News */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((item: any) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--border)] hover:shadow-md transition-all duration-300 cursor-pointer flex"
                onClick={() => setCurrentPage("news")}
              >
                <div className="w-28 sm:w-32 flex-shrink-0 relative overflow-hidden">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full mb-2"
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: item.category.color,
                        background: item.category.bg,
                      }}
                    >
                      {item.category.name}
                    </span>
                    <h4
                      className="text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--brand-green)] transition-colors"
                      style={{ fontSize: "0.83rem", fontWeight: 700, lineHeight: "1.4" }}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1" style={{ fontSize: "0.68rem" }}>
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: "0.68rem" }}>
                      <Eye className="w-3 h-3" />
                      {item.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}