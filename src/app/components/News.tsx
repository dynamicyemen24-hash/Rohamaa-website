import { Calendar, ArrowLeft, Eye } from "lucide-react";

interface NewsProps {
  setCurrentPage: (page: string) => void;
}

export const newsData = [
  {
    id: 1,
    title: "إطلاق مشروع التعليم المستدام في المناطق النائية لعام ١٤٤٦هـ",
    excerpt:
      "أطلقت مؤسسة رحماء بينهم مشروعها السنوي للتعليم المستدام الذي يستهدف أكثر من ٥٠٠ طالب وطالبة في المناطق النائية، ويشمل توفير الكتب والقرطاسية والحقائب المدرسية.",
    category: "تعليم",
    categoryColor: "#2563EB",
    categoryBg: "#EFF6FF",
    date: "١٥ ربيع الثاني ١٤٤٦",
    dateEn: "2024-10-18",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop&auto=format",
    views: "١٢٤٠",
    featured: true,
  },
  {
    id: 2,
    title: "توزيع ٨٠٠ سلة غذائية على الأسر المتضررة في محافظة تعز",
    excerpt:
      "نفّذ فريق الإغاثة الميداني حملة موسعة لتوزيع السلال الغذائية على الأسر الأكثر احتياجًا في عدة مديريات بمحافظة تعز، وذلك في إطار برنامج الإغاثة الإنسانية الدوري.",
    category: "إغاثة",
    categoryColor: "#E74C3C",
    categoryBg: "#FEF2F2",
    date: "٨ ربيع الثاني ١٤٤٦",
    dateEn: "2024-10-11",
    image: "https://images.unsplash.com/photo-1694286068611-d0c24cbc2cd5?w=600&h=400&fit=crop&auto=format",
    views: "٩٨٦",
    featured: false,
  },
  {
    id: 3,
    title: "توقيع اتفاقية شراكة استراتيجية مع منظمة التنمية الخليجية",
    excerpt:
      "وقّعت مؤسسة رحماء بينهم اتفاقية شراكة استراتيجية مع منظمة التنمية الخليجية تشمل تنفيذ مشاريع مشتركة في قطاعي التعليم والتنمية المجتمعية على مدى ثلاث سنوات.",
    category: "شراكات",
    categoryColor: "var(--brand-green)",
    categoryBg: "var(--brand-green-pale)",
    date: "٢ ربيع الثاني ١٤٤٦",
    dateEn: "2024-10-05",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&h=400&fit=crop&auto=format",
    views: "٧٥٤",
    featured: false,
  },
  {
    id: 4,
    title: "ختام دورة تدريبية لـ ١٢٠ مدرباً في مجال التنمية المجتمعية",
    excerpt:
      "اختتمت المؤسسة برنامجها التدريبي المكثف الذي أُقيم على مدار ٤ أسابيع وخرّج ١٢٠ مدرباً مؤهلاً في مجال التنمية المجتمعية وإدارة المشاريع الاجتماعية.",
    category: "تدريب",
    categoryColor: "#7C3AED",
    categoryBg: "#F5F3FF",
    date: "٢٥ ربيع الأول ١٤٤٦",
    dateEn: "2024-09-28",
    image: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=600&h=400&fit=crop&auto=format",
    views: "٦٣٢",
    featured: false,
  },
];

export function News({ setCurrentPage }: NewsProps) {
  const featured = newsData[0];
  const rest = newsData.slice(1);

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
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4">
                <span
                  className="px-3 py-1 rounded-full text-white"
                  style={{ fontSize: "0.7rem", fontWeight: 700, background: featured.categoryColor }}
                >
                  {featured.category}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 left-4">
                <h3 className="text-white mb-2" style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                  {featured.title}
                </h3>
                <div className="flex items-center gap-4 text-white/70">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}>
                    <Calendar className="w-3.5 h-3.5" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}>
                    <Eye className="w-3.5 h-3.5" />
                    {featured.views}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.85rem", lineHeight: "1.7" }}>
                {featured.excerpt}
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
            {rest.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--border)] hover:shadow-md transition-all duration-300 cursor-pointer flex"
                onClick={() => setCurrentPage("news")}
              >
                <div className="w-28 sm:w-32 flex-shrink-0 relative overflow-hidden">
                  <img
                    src={item.image}
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
                        color: item.categoryColor,
                        background: item.categoryBg,
                      }}
                    >
                      {item.category}
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
