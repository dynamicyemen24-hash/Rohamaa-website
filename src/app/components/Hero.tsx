import { Heart, ChevronLeft, Play, ArrowDown } from "lucide-react";

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export function Hero({ setCurrentPage }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ direction: "rtl" }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&h=900&fit=crop&auto=format"
          alt="تطوع ومساعدة المجتمع"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[var(--brand-green)]/90 via-[var(--brand-green)]/70 to-[var(--brand-ink)]/50" />
        {/* Islamic geometric overlay */}
        <div className="absolute inset-0 pattern-bg opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-gold)] animate-pulse" />
            <span className="text-white/90" style={{ fontSize: "0.8rem" }}>
              منذ عام ١٤٣٠هـ نبني الأمل ونصنع الفارق
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white mb-6 leading-tight" style={{ fontWeight: 800 }}>
            رحماء بينهم...{" "}
            <span className="text-[var(--brand-gold-light)]">أثرٌ يدوم</span>
            {" "}ومستقبلٌ{" "}
            <span className="relative inline-block">
              يُبنى
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-gold)] rounded-full" />
            </span>
          </h1>

          <p className="text-white/85 mb-10 max-w-2xl" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            مؤسسة رحماء بينهم منظمة إنسانية تنموية تعمل على تخفيف معاناة الإنسان وتحقيق التنمية المستدامة،
            من خلال برامج متكاملة في الإغاثة والتعليم والتنمية المجتمعية والدعوة.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
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
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontSize: "0.9rem" }}
            >
              <span className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-white/70 transition-colors">
                <Play className="w-4 h-4 mr-0.5" fill="white" />
              </span>
              شاهد قصتنا
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { value: "+١٢٠٠٠", label: "مستفيد" },
              { value: "+٣٠٠", label: "مشروع" },
              { value: "+٤٥", label: "شريك" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-[var(--brand-gold-light)] mb-1"
                  style={{ fontSize: "1.6rem", fontWeight: 800 }}
                >
                  {stat.value}
                </div>
                <div className="text-white/70" style={{ fontSize: "0.75rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span style={{ fontSize: "0.7rem" }}>اكتشف أكثر</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
