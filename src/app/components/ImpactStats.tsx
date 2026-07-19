// Impact Statistics Component - Enhanced with additional metrics
// إحصائيات الأثر - محسنة ببيانات إضافية
import { Users, FolderOpen, Handshake, Heart, DollarSign } from "lucide-react";
import { useState, useEffect, useRef, type ComponentType } from "react";

import { SEED_IMPACT } from "@/content/website";
import { useDynamicContent } from "@/shared/hooks/useDynamicContent";
import { contentBridge } from "@/shared/services/content-bridge.service";

interface Stat {
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: number;
  label: string;
  sub: string;
  color: string;
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);
  return count;
}

function StatCard({ stat, index, inView }: { readonly stat: Stat; readonly index: number; readonly inView: boolean }) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, 2000 + index * 200, inView);

  return (
    <div
      className="relative bg-white rounded-2xl p-7 shadow-sm border border-[var(--border)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
        style={{ background: `${stat.color}18` }}
      >
        <Icon className="w-7 h-7" style={{ color: stat.color }} />
      </div>
      <div
        className="mb-1 tabular-nums"
        style={{ fontSize: "2.2rem", fontWeight: 800, color: stat.color }}
      >
        {inView ? `+${count.toLocaleString("ar-SA")}` : "٠"}
      </div>
      <div className="text-[var(--foreground)] mb-1" style={{ fontWeight: 700, fontSize: "1rem" }}>
        {stat.label}
      </div>
      <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.8rem" }}>
        {stat.sub}
      </div>
      <div
        className="absolute bottom-0 right-0 w-1 h-12 rounded-r-full"
        style={{ background: stat.color }}
      />
    </div>
  );
}

export function ImpactStats() {
  const [metrics, setMetrics] = useState<{
    totalBeneficiaries?: number;
    activeProjects?: number;
    totalPartners?: number;
    totalVolunteers?: number;
    totalDonations?: number;
    productiveFamilies?: number;
  } | null>(null);
  const [contentSource, setContentSource] = useState<'static' | 'sanity'>('static');
  const [showDevBadge, setShowDevBadge] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Use dynamic content hook
  const { data: dynamicImpact, source } = useDynamicContent<any>({
    contentType: 'impact',
    enableRealtime: false,
    refreshInterval: 300000
  });

  // Show dev badge in development mode
  useEffect(() => {
    if (import.meta.env?.DEV) {
      setShowDevBadge(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fallback = {
      totalBeneficiaries: SEED_IMPACT.beneficiaries,
      activeProjects: SEED_IMPACT.projects,
      totalPartners: SEED_IMPACT.partners,
      totalVolunteers: SEED_IMPACT.volunteers,
      totalDonations: 3200000, // إجمالي المساعدات الموزعة
      productiveFamilies: 472,  // عدد الأسر المنتجة
    };

    const loadMetrics = async () => {
      try {
        if (dynamicImpact.length > 0) {
          const data = dynamicImpact[0];
          setMetrics({
            totalBeneficiaries: data?.totalBeneficiaries || data?.beneficiaries || fallback.totalBeneficiaries,
            activeProjects: data?.activeProjects || data?.projects || fallback.activeProjects,
            totalPartners: data?.totalPartners || data?.partners || fallback.totalPartners,
            totalVolunteers: data?.totalVolunteers || data?.volunteers || fallback.totalVolunteers,
            totalDonations: data?.totalDonations || fallback.totalDonations,
            productiveFamilies: data?.productiveFamilies || fallback.productiveFamilies,
          });
          setContentSource(source as 'sanity' | 'static');
        } else {
          setMetrics(fallback);
          setContentSource('static');
        }
      } catch (error) {
        if (!cancelled) {
          setMetrics(fallback);
          setContentSource('static');
        }
      }
    };

    loadMetrics();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [dynamicImpact, source]);

  const stats = [
    {
      icon: Users,
      value: metrics?.totalBeneficiaries ?? 0,
      label: "مستفيد مباشر",
      sub: "من مختلف المحافظات والمناطق",
      color: "var(--brand-green)",
    },
    {
      icon: FolderOpen,
      value: metrics?.activeProjects ?? 0,
      label: "مشروع منجز",
      sub: "في مجالات متنوعة ومؤثرة",
      color: "var(--brand-gold)",
    },
    {
      icon: DollarSign,
      value: metrics?.totalDonations ?? 0,
      label: "إجمالي المساعدات",
      sub: "المبالغ المالية الموزعة",
      color: "#059669",
    },
    {
      icon: Handshake,
      value: metrics?.totalPartners ?? 0,
      label: "شريك استراتيجي",
      sub: "من مؤسسات وجهات داعمة",
      color: "var(--brand-green-light)",
    },
    {
      icon: Heart,
      value: metrics?.totalVolunteers ?? 0,
      label: "متطوع ومبادر",
      sub: "فريق عمل المؤسسة",
      color: "var(--brand-gold)",
    },
    {
      icon: Users,
      value: metrics?.productiveFamilies ?? 0,
      label: "أسرة منتجة",
      sub: "نتاج برامج التمكين الاقتصادي",
      color: "#7C3AED",
    },
  ];

  // Dev indicator badge
  const DevBadge = showDevBadge ? (
    <div className="fixed top-4 left-4 z-50 bg-purple-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${contentSource === 'sanity' ? 'bg-green-400' : 'bg-yellow-400'}`} />
        <span>{contentSource === 'sanity' ? 'Sanity CMS' : 'Static Content'}</span>
      </div>
    </div>
  ) : null;

  return (
    <section className="py-20 bg-[var(--secondary)]" style={{ direction: "rtl" }} ref={ref}>
      {DevBadge}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block mb-3 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-pale)] px-4 py-1 rounded-full"
            style={{ fontSize: "0.8rem", fontWeight: 600 }}
          >
            أثرنا بالأرقام
          </span>
          <h2 className="text-[var(--foreground)] mb-4">
            أرقامٌ تحكي قصة{" "}
            <span className="text-[var(--brand-green)]">التغيير الحقيقي</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto" style={{ fontSize: "0.95rem", lineHeight: "1.7" }}>
            خلال سنوات من العمل المتواصل، أسهمت مؤسسة رحماء بينهم في إحداث تحول ملموس في حياة آلاف الأسر
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* Progress bar visual */}
        <div className="mt-14 bg-white rounded-2xl p-8 shadow-sm border border-[var(--border)]">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-[var(--foreground)]" style={{ fontSize: "1rem", fontWeight: 700 }}>
              توزيع البرامج حسب القطاع
            </h3>
            <span className="text-[var(--muted-foreground)]" style={{ fontSize: "0.75rem" }}>
              ٢٠٢٥م
            </span>
          </div>
          <div className="space-y-4">
            {[
              { label: "الإغاثة الإنسانية", pct: 38, color: "var(--brand-green)" },
              { label: "التعليم والتأهيل", pct: 28, color: "var(--brand-gold)" },
              { label: "التنمية المجتمعية", pct: 22, color: "var(--brand-green-light)" },
              { label: "الدعوة والإرشاد", pct: 12, color: "#8B5CF6" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                    {item.pct}٪
                  </span>
                </div>
                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: inView ? `${item.pct}%` : "0%",
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}