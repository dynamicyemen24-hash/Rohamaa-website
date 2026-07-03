import { Target, Eye, Heart, Award, Users, Calendar, MapPin, ChevronLeft } from "lucide-react";

const values = [
  { icon: Heart, title: "الرحمة والإنسانية", desc: "نضع الإنسان في قلب كل ما نفعل، ونتعامل مع كل حالة بقدر وافر من الرحمة والتقدير." },
  { icon: Award, title: "الأمانة والشفافية", desc: "نلتزم بأعلى معايير النزاهة في إدارة الموارد والإفصاح عن النتائج." },
  { icon: Target, title: "الأثر والفاعلية", desc: "نسعى دائمًا لتحقيق أعمق أثر ممكن بأفضل استخدام للموارد المتاحة." },
  { icon: Users, title: "الشراكة والتكامل", desc: "نؤمن بقيمة الشراكات المجتمعية والمؤسسية في تضخيم الأثر وتحقيق التغيير." },
];

const milestones = [
  { year: "١٤٣٠هـ", title: "تأسيس المؤسسة", desc: "بدأت رحماء بينهم بفريق متطوع صغير ورؤية كبيرة" },
  { year: "١٤٣٣هـ", title: "أول برنامج تعليمي", desc: "إطلاق برنامج دعم الطلاب في المناطق النائية" },
  { year: "١٤٣٥هـ", title: "الاعتماد الرسمي", desc: "الحصول على الترخيص الرسمي والاعتراف المؤسسي" },
  { year: "١٤٣٨هـ", title: "التوسع الإقليمي", desc: "فتح مكاتب في ٥ محافظات وإطلاق البرامج الإقليمية" },
  { year: "١٤٤١هـ", title: "١٠,٠٠٠ مستفيد", desc: "تجاوزنا عتبة العشرة آلاف مستفيد مباشر" },
  { year: "١٤٤٦هـ", title: "اليوم", desc: "نواصل المسيرة بأكثر من ١٢,٠٠٠ مستفيد و٣٤٧ مشروع" },
];

const team = [
  { name: "د. عبدالله محمد العمري", role: "رئيس مجلس الإدارة", specialty: "اقتصادي ومتخصص في التنمية" },
  { name: "أ. منى علي السلامي", role: "المدير التنفيذي", specialty: "خبيرة إدارة منظمات المجتمع المدني" },
  { name: "أ. خالد إبراهيم الزبيدي", role: "مدير البرامج", specialty: "متخصص في إدارة المشاريع الإنسانية" },
  { name: "أ. سارة أحمد الحداد", role: "مديرة التواصل والإعلام", specialty: "إعلامية ومختصة في التواصل المؤسسي" },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]" style={{ direction: "rtl" }}>
      {/* Hero */}
      <section className="relative py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1642425145481-d59fbcfde153?w=1600&h=600&auto=format&fit=crop&q=80"
            alt="قوة المجتمع اليمني"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[var(--brand-green-pale)]" style={{ opacity: 0.8 }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span
            className="inline-block mb-4 text-[var(--brand-green)] border border-[var(--brand-green)]/30 bg-white px-4 py-1 rounded-full"
            style={{ fontSize: "0.8rem", fontWeight: 600 }}
          >
            من نحن
          </span>
          <h1 className="text-[var(--foreground)] mb-4" style={{ fontWeight: 800 }}>
            مؤسسة رحماء بينهم
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto" style={{ fontSize: "1rem", lineHeight: "1.8" }}>
            منظمة إنسانية تنموية مستقلة تأسست لتكون صوتًا للمحتاجين وجسرًا بين المانحين والمستفيدين في اليمن،
            ورافدًا للتغيير الإيجابي في حياة آلاف الأسر اليمنية.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Eye,
                label: "رؤيتنا",
                text: "أن تكون مؤسسة رحماء بينهم المرجع الأول في العمل الإنساني التنموي، ونموذجًا ريادًا للمؤسسات الخيرية في المنطقة، تُحقق التنمية المستدامة وتبني مجتمعات قادرة على إدارة مستقبلها بكفاءة.",
                color: "var(--brand-green)",
                bg: "var(--brand-green-pale)",
              },
              {
                icon: Target,
                label: "رسالتنا",
                text: "تخفيف معاناة الإنسان وتحقيق التنمية المستدامة من خلال برامج إغاثية وتعليمية وتنموية ودعوية متكاملة، تنبع من القيم الإسلامية وتلتزم بأعلى معايير الشفافية والمساءلة والفاعلية.",
                color: "var(--brand-gold)",
                bg: "var(--brand-gold-pale)",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-2xl p-7 border border-[var(--border)]"
                  style={{ background: item.bg }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${item.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-[var(--foreground)] mb-3" style={{ fontWeight: 700 }}>
                    {item.label}
                  </h3>
                  <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.88rem", lineHeight: "1.8" }}>
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-[var(--foreground)]">قيمنا وثوابتنا</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-xl p-5 border border-[var(--border)] hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-[var(--brand-green)]" />
                  </div>
                  <h4 className="text-[var(--foreground)] mb-2" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    {v.title}
                  </h4>
                  <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.78rem", lineHeight: "1.7" }}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-[var(--foreground)]">
              مسيرتنا عبر{" "}
              <span className="text-[var(--brand-green)]">السنوات</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-[var(--border)]" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 pr-14 relative">
                  <div
                    className="absolute right-3 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md"
                    style={{ background: i === milestones.length - 1 ? "var(--brand-green)" : "var(--brand-gold)" }}
                  >
                    {i === milestones.length - 1 && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex-1 bg-[var(--background)] rounded-xl p-4 border border-[var(--border)]">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full"
                        style={{ fontSize: "0.7rem", fontWeight: 800, background: "var(--brand-green-pale)", color: "var(--brand-green)" }}
                      >
                        {m.year}
                      </span>
                      <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)" }}>
                        {m.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-[var(--foreground)]">فريق القيادة</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-5 border border-[var(--border)] text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--brand-green)] flex items-center justify-center mx-auto mb-4 text-white" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                  {member.name.charAt(0)}
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>
                  {member.name}
                </div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--brand-green)", marginBottom: "0.5rem" }}>
                  {member.role}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>
                  {member.specialty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
