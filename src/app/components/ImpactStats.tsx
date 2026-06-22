import { useState, useEffect, useRef } from "react";
import { Users, FolderOpen, Handshake, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 12847,
    display: "+١٢٨٤٧",
    label: "مستفيد مباشر",
    sub: "من مختلف المحافظات والمناطق",
    color: "var(--brand-green)",
  },
  {
    icon: FolderOpen,
    value: 347,
    display: "+٣٤٧",
    label: "مشروع منجز",
    sub: "في مجالات متنوعة ومؤثرة",
    color: "var(--brand-gold)",
  },
  {
    icon: Handshake,
    value: 48,
    display: "+٤٨",
    label: "شريك استراتيجي",
    sub: "من مؤسسات وجهات داعمة",
    color: "var(--brand-green-light)",
  },
  {
    icon: Globe,
    value: 15,
    display: "+١٥",
    label: "محافظة مخدومة",
    sub: "امتداد جغرافي واسع",
    color: "var(--brand-gold)",
  },
];

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

function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
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
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-[var(--secondary)]" style={{ direction: "rtl" }} ref={ref}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
