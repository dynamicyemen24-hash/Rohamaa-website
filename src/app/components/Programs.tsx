import { Heart, BookOpen, Users, Mic, ChevronLeft, ArrowLeft } from "lucide-react";

interface ProgramsProps {
  setCurrentPage: (page: string) => void;
}

const programs = [
  {
    icon: Heart,
    title: "الإغاثة الإنسانية",
    description:
      "تقديم المساعدات الطارئة للأسر المتضررة من الأزمات والكوارث، وضمان وصول الغذاء والدواء والمأوى للمحتاجين.",
    highlights: ["توزيع السلال الغذائية", "الكساء الشتوي", "الإيواء الطارئ", "الرعاية الصحية"],
    beneficiaries: "٤٨٠٠+",
    projects: "١٢٠+",
    color: "#E74C3C",
    bg: "#FEF2F2",
    href: "programs-relief",
    image: "https://images.unsplash.com/photo-1628717341663-0007b0ee2597?w=600&h=400&fit=crop&auto=format",
  },
  {
    icon: BookOpen,
    title: "التعليم والتأهيل",
    description:
      "دعم التعليم وتأهيل الكفاءات من خلال المنح الدراسية والتدريب المهني وبرامج محو الأمية وتطوير المناهج.",
    highlights: ["منح دراسية", "تدريب مهني", "محو الأمية", "دعم المعلمين"],
    beneficiaries: "٣٢٠٠+",
    projects: "٨٥+",
    color: "#2563EB",
    bg: "#EFF6FF",
    href: "programs-education",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop&auto=format",
  },
  {
    icon: Users,
    title: "التنمية المجتمعية",
    description:
      "مشاريع التنمية المستدامة التي تمكّن المجتمعات وتعزز اعتمادها على الذات في مجالات الاقتصاد والصحة والبيئة.",
    highlights: ["مشاريع تشغيل", "تمكين المرأة", "صحة المجتمع", "مشاريع بيئية"],
    beneficiaries: "٢٨٠٠+",
    projects: "٩٤+",
    color: "var(--brand-green)",
    bg: "var(--brand-green-pale)",
    href: "programs-development",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop&auto=format",
  },
  {
    icon: Mic,
    title: "الدعوة والإرشاد",
    description:
      "برامج التوعية الدينية والإرشاد الأسري والتعليم الشرعي، لتعزيز القيم الإسلامية وبناء الشخصية المسلمة المتوازنة.",
    highlights: ["حلقات قرآنية", "إرشاد أسري", "دورات شرعية", "برامج شبابية"],
    beneficiaries: "٢٠٤٧+",
    projects: "٤٨+",
    color: "#7C3AED",
    bg: "#F5F3FF",
    href: "programs-dawah",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&h=400&fit=crop&auto=format",
  },
];

export function Programs({ setCurrentPage }: ProgramsProps) {
  return (
    <section className="py-20 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span
              className="inline-block mb-3 text-[var(--brand-green)] border border-[var(--brand-green)]/30 bg-[var(--brand-green-pale)] px-4 py-1 rounded-full"
              style={{ fontSize: "0.8rem", fontWeight: 600 }}
            >
              محاور العمل
            </span>
            <h2 className="text-[var(--foreground)]">
              برامجنا وقطاعات{" "}
              <span className="text-[var(--brand-green)]">التدخل</span>
            </h2>
            <p className="text-[var(--muted-foreground)] mt-2 max-w-xl" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
              أربعة محاور متكاملة تشكّل منظومة عملنا الإنساني والتنموي والتعليمي والدعوي
            </p>
          </div>
          <button
            onClick={() => setCurrentPage("programs")}
            className="flex items-center gap-2 text-[var(--brand-green)] hover:text-[var(--brand-green-light)] transition-colors whitespace-nowrap"
            style={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            كل البرامج
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.href}
                className="group bg-white rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setCurrentPage(program.href)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: program.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: program.color }} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[var(--foreground)] mb-2" style={{ fontWeight: 700 }}>
                    {program.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-4" style={{ fontSize: "0.85rem", lineHeight: "1.7" }}>
                    {program.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {program.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-full"
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          background: program.bg,
                          color: program.color,
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Stats + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <div className="flex gap-6">
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: program.color }}>
                          {program.beneficiaries}
                        </div>
                        <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.7rem" }}>
                          مستفيد
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: program.color }}>
                          {program.projects}
                        </div>
                        <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.7rem" }}>
                          مشروع
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 text-[var(--brand-green)] group-hover:gap-3 transition-all"
                      style={{ fontSize: "0.82rem", fontWeight: 600 }}
                    >
                      اعرف أكثر
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
