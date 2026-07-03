import { Heart, ChevronLeft, Play, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

import { dashboardService } from "@/shared/services/dashboard.service";

interface HeroProps {
  readonly setCurrentPage: (page: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.8 + i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function Hero({ setCurrentPage }: HeroProps) {
  const [metrics, setMetrics] = useState<{
    totalBeneficiaries?: number;
    activeProjects?: number;
    totalPartners?: number;
    totalVolunteers?: number;
  } | null>(null);
  const metricsFetched = useRef(false);

  useEffect(() => {
    if (metricsFetched.current) return;
    metricsFetched.current = true;
    dashboardService
      .getMetrics()
      .then((data) => {
        setMetrics(data);
      })
      .catch(() => {
        /* use default fallback if metrics fail */
      });
  }, []);

  const formatStat = (value: number | undefined) =>
    typeof value === "number" ? `+${value.toLocaleString("ar-SA")}` : "...";

  const stats = [
    { value: formatStat(metrics?.totalBeneficiaries), label: "مستفيد" },
    { value: formatStat(metrics?.activeProjects), label: "مشروع" },
    { value: formatStat(metrics?.totalPartners), label: "شريك" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ direction: "rtl" }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1656416584402-b720e0d786dc?w=1600&h=900&auto=format&fit=crop&q=80"
          alt="مدينة يمنية ومجتمع متقدم"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[var(--brand-green)]/90 via-[var(--brand-green)]/70 to-[var(--brand-ink)]/50" />
        {/* Islamic geometric overlay */}
        <div className="absolute inset-0 pattern-bg opacity-30" />
        {/* Mecca road subtle pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 L50 90 M30 30 L70 30 M30 70 L70 70' stroke='%23C8861E' stroke-width='0.5' fill='none' opacity='0.4'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="max-w-3xl" variants={itemVariants}>
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-8"
            variants={itemVariants}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--brand-gold)] animate-pulse" />
            <span className="text-white/90" style={{ fontSize: "0.8rem" }}>
              منذ عام ١٤٣٠هـ، نحقّق الأثر اليمني ونوصل الدعم لكل مجتمع
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-white mb-6 leading-tight"
            style={{ fontWeight: 800 }}
            variants={itemVariants}
          >
            رحماء بينهم...{' '}
            <span className="text-[var(--brand-gold-light)]">أثرٌ يدوم</span>{' '}
            مستقبلٌ{' '}
            <span className="relative inline-block mr-2">
              يُبنى
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-gold)] rounded-full" />
            </span>
          </motion.h1>

          <motion.p
            className="text-white/85 mb-10 max-w-2xl"
            style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
            variants={itemVariants}
          >
            مؤسسة رحماء بينهم منظمة إنسانية تنموية رائدة في اليمن، تعمل على تخفيف معاناة الأسرة اليمنية وتحقيق التنمية المستدامة عبر برامج متكاملة في الإغاثة والتعليم والتنمية المجتمعية والدعوة.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap items-center gap-4" variants={itemVariants}>
            <button
              onClick={() => setCurrentPage("donate")}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-[var(--brand-gold)] text-white rounded-xl hover:bg-[var(--brand-gold-light)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ fontSize: "1rem", fontWeight: 700 }}
            >
              <Heart className="w-5 h-5" fill="white" />
              تبرع الآن
            </button>
            <button
              onClick={() => setCurrentPage("programs")}
              className="flex items-center gap-2 px-7 py-3.5 bg-white/15 backdrop-blur-sm text-white border border-white/30 rounded-xl hover:bg-white/25 transition-all"
              style={{ fontSize: "1rem" }}
            >
              تعرف على برامجنا
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage("success")}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontSize: "0.9rem" }}
            >
              <span className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-white/70 transition-colors">
                <Play className="w-4 h-4 mr-0.5" fill="white" />
              </span>
              شاهد قصتنا
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div className="mt-16 grid grid-cols-3 gap-6 max-w-lg" variants={itemVariants}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate="visible"
              >
                <div
                  className="text-[var(--brand-gold-light)] mb-1"
                  style={{ fontSize: "1.6rem", fontWeight: 800 }}
                >
                  {stat.value}
                </div>
                <div className="text-white/70" style={{ fontSize: "0.75rem" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span style={{ fontSize: "0.7rem" }}>اكتشف أكثر</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
