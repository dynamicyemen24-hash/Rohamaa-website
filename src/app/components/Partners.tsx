import { Handshake, ArrowLeft } from "lucide-react";

const partners = [
  { name: "هيئة الهلال الأحمر", type: "إنساني", abbr: "هأ" },
  { name: "منظمة التعاون الإسلامي", type: "دولي", abbr: "منتعا" },
  { name: "صندوق دعم التنمية", type: "تنموي", abbr: "صدت" },
  { name: "اتحاد منظمات المجتمع المدني", type: "مجتمعي", abbr: "اتمم" },
  { name: "مؤسسة الوقف الخيري", type: "وقفي", abbr: "موق" },
  { name: "برنامج الخليج للتنمية", type: "إقليمي", abbr: "بخت" },
  { name: "صندوق الأمم المتحدة للطفولة", type: "أممي", abbr: "يونيسف" },
  { name: "المنظمة الدولية للهجرة", type: "دولي", abbr: "IOM" },
  { name: "برنامج الغذاء العالمي", type: "أممي", abbr: "WFP" },
  { name: "مؤسسة التعليم للجميع", type: "تعليمي", abbr: "تجم" },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  إنساني: { bg: "#FEF2F2", text: "#E74C3C" },
  دولي: { bg: "#EFF6FF", text: "#2563EB" },
  تنموي: { bg: "var(--brand-green-pale)", text: "var(--brand-green)" },
  مجتمعي: { bg: "#F5F3FF", text: "#7C3AED" },
  وقفي: { bg: "var(--brand-gold-pale)", text: "var(--brand-gold)" },
  إقليمي: { bg: "#F0FDF4", text: "#16A34A" },
  أممي: { bg: "#FFF7ED", text: "#EA580C" },
  تعليمي: { bg: "#EFF6FF", text: "#0891B2" },
};

export function Partners({ setCurrentPage }: { setCurrentPage: (p: string) => void }) {
  return (
    <section className="py-20 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block mb-3 text-[var(--brand-green)] border border-[var(--brand-green)]/30 bg-[var(--brand-green-pale)] px-4 py-1 rounded-full"
            style={{ fontSize: "0.8rem", fontWeight: 600 }}
          >
            شبكة الشراكات
          </span>
          <h2 className="text-[var(--foreground)] mb-3">
            شركاؤنا في{" "}
            <span className="text-[var(--brand-green)]">صناعة الأثر</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
            نفخر بشراكات راسخة مع منظمات ومؤسسات محلية وإقليمية ودولية تشاركنا رسالة التغيير الإيجابي
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {partners.map((partner) => {
            const colors = colorMap[partner.type] || { bg: "var(--muted)", text: "var(--muted-foreground)" };
            return (
              <div
                key={partner.name}
                className="group bg-white rounded-xl p-5 border border-[var(--border)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ background: colors.bg }}
                >
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color: colors.text }}>
                    {partner.abbr}
                  </span>
                </div>
                <div
                  className="text-[var(--foreground)] mb-1 leading-tight"
                  style={{ fontSize: "0.78rem", fontWeight: 600 }}
                >
                  {partner.name}
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full"
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    background: colors.bg,
                    color: colors.text,
                  }}
                >
                  {partner.type}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 sm:p-10 text-center"
          style={{ background: "linear-gradient(135deg, var(--brand-green-pale) 0%, var(--brand-gold-pale) 100%)" }}
        >
          <Handshake
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "var(--brand-green)" }}
          />
          <h3 className="text-[var(--foreground)] mb-3" style={{ fontWeight: 700 }}>
            كن شريكًا في صناعة الأثر
          </h3>
          <p className="text-[var(--muted-foreground)] mb-6 max-w-md mx-auto" style={{ fontSize: "0.85rem", lineHeight: "1.7" }}>
            ندعوك للانضمام إلى شبكة شركائنا ومشاركتنا مسيرة العطاء والتغيير الإيجابي في المجتمع
          </p>
          <button
            onClick={() => setCurrentPage("contact")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--brand-green)] text-white rounded-xl hover:bg-[var(--brand-green-light)] transition-all shadow-md hover:shadow-lg"
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            تواصل معنا
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
