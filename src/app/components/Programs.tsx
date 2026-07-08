import { Heart, BookOpen, Users, Mic, ChevronLeft, ArrowLeft } from "lucide-react";
import { useState, useEffect, memo } from "react";

import { createOptimizedImageSrc } from "@/app/hooks/useOptimizedImage";
import { projectsDashboardService } from "@/shared/services/dashboard.service";

interface ProgramsProps {
  readonly setCurrentPage: (page: string) => void;
}

const programs = [
  {
    icon: Heart,
    title: "الإغاثة الإنسانية",
    description:
      "تقديم المساعدات الطارئة للأسر اليمنية المتضررة من الصراع والكوارث، وضمان وصول الغذاء والمأوى والدواء إلى المناطق الأكثر احتياجًا.",
    highlights: ["توزيع السلال الغذائية", "الكساء الشتوي", "الإيواء الطارئ", "الرعاية الصحية"],
    beneficiaries: "٤٨٠٠+",
    projects: "١٢٠+",
    color: "#E74C3C",
    bg: "#FEF2F2",
    href: "programs-relief",
    image: "https://images.unsplash.com/photo-1733654039689-f0852bed75d6?w=600&h=400&auto=format&fit=crop&q=80",
  },
  {
    icon: BookOpen,
    title: "التعليم والتأهيل",
    description:
      "دعم التعليم لتأهيل الكفاءات اليمنية من خلال المنح الدراسية والتدريب المهني وبرامج محو الأمية وتطوير مهارات المعلمين.",
    highlights: ["منح دراسية", "تدريب مهني", "محو الأمية", "دعم المعلمين"],
    beneficiaries: "٣٢٠٠+",
    projects: "٨٥+",
    color: "#2563EB",
    bg: "#EFF6FF",
    href: "programs-education",
    image: "https://images.unsplash.com/photo-1611907671216-7ec6ef949163?w=600&h=400&auto=format&fit=crop&q=80",
  },
  {
    icon: Users,
    title: "التنمية المجتمعية",
    description:
      "مشاريع تنموية تمكّن المجتمعات اليمنية وتُعزز استقلاليتها في الاقتصاد والصحة والبيئة المحلية.",
    highlights: ["مشاريع تشغيل", "تمكين المرأة", "صحة المجتمع", "مشاريع بيئية"],
    beneficiaries: "٢٨٠٠+",
    projects: "٩٤+",
    color: "var(--brand-green)",
    bg: "var(--brand-green-pale)",
    href: "programs-development",
    image: "https://images.unsplash.com/photo-1642425149556-b6f90e946859?w=600&h=400&auto=format&fit=crop&q=80",
  },
  {
    icon: Mic,
    title: "الدعوة والإرشاد",
    description:
      "برامج التوعية والدعوة التي تعزز القيم الإسلامية وتدعم الأسرة اليمنية في بناء مجتمع متماسك وقوي.",
    highlights: ["حلقات قرآنية", "إرشاد أسري", "دورات شرعية", "برامج شبابية"],
    beneficiaries: "٢٠٤٧+",
    projects: "٤٨+",
    color: "#7C3AED",
    bg: "#F5F3FF",
    href: "programs-dawah",
    image: "https://images.unsplash.com/photo-1642425145481-d59fbcfde153?w=600&h=400&auto=format&fit=crop&q=80",
  },
];

const DEFAULT_PROGRAM_IMAGE = "https://images.unsplash.com/photo-1642425149556-b6f90e946859?w=600&h=400&auto=format&fit=crop&q=80";

const mapProjectToCard = (project: any) => ({
  icon: Heart,
  title: project.title || project.name || "مشروع جديد",
  description: project.description || project.excerpt || "وصف مختصر للمشروع.",
  highlights: [project.category || "عام", project.status || "قيد التنفيذ"],
  beneficiaries: typeof project.beneficiaries === "number" ? `${project.beneficiaries}` : project.beneficiaries || "...",
  projects: typeof project.progress === "number" ? `${project.progress}%` : project.status || "...",
  color: "var(--brand-green)",
  bg: "var(--brand-green-pale)",
  href: `projects-${project.id || Math.random().toString(36).slice(2)}`,
  image: project.image || DEFAULT_PROGRAM_IMAGE,
});

export function Programs({ setCurrentPage }: ProgramsProps) {
  const [programItems, setProgramItems] = useState<any[]>(programs);

  useEffect(() => {
    let cancelled = false;
    projectsDashboardService
      .getAll()
      .then((items) => {
        if (!cancelled && items.length > 0) {
          setProgramItems(items.slice(0, 4).map(mapProjectToCard));
        }
      })
      .catch(() => {
        /* keep fallback programs */
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
          {programItems.map((program) => {
            const Icon = program.icon;
            return (
              <button
                key={program.href}
                type="button"
                onClick={() => setCurrentPage(program.href)}
                className="group text-left bg-white rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
                    {program.highlights.map((h: string) => (
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
                    <span
                      className="flex items-center gap-1.5 text-[var(--brand-green)] group-hover:gap-3 transition-all"
                      style={{ fontSize: "0.82rem", fontWeight: 600 }}
                    >
                      اعرف أكثر
                      <ChevronLeft className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
