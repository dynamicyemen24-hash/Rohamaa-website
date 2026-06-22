import { useState } from "react";
import { Quote, ChevronRight, ChevronLeft, Star } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "أم محمد",
    location: "تعز",
    program: "الإغاثة الإنسانية",
    programColor: "#E74C3C",
    quote:
      "بعد أن فقدنا كل شيء جاء فريق رحماء بينهم كالمطر في الصحراء. لم يكتفوا بتقديم الطعام والكساء، بل أعادوا إلينا الأمل والكرامة. أطفالي اليوم يذهبون إلى المدرسة ويحلمون بمستقبل أفضل.",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=400&fit=crop&auto=format",
    rating: 5,
    category: "أسرة",
    year: "٢٠٢٤",
  },
  {
    id: 2,
    name: "خالد ناصر",
    location: "إب",
    program: "التعليم والتأهيل",
    programColor: "#2563EB",
    quote:
      "حصلت على منحة المؤسسة وتمكنت من إكمال دراستي الجامعية في تخصص الطب. اليوم أعود لمجتمعي طبيبًا متخصصًا وأسهم في علاج من احتجت إليهم يومًا. رحماء بينهم غيّرت مسار حياتي كلها.",
    image: "https://images.unsplash.com/photo-1628717341663-0007b0ee2597?w=400&h=400&fit=crop&auto=format",
    rating: 5,
    category: "طالب",
    year: "٢٠٢٣",
  },
  {
    id: 3,
    name: "فاطمة عبدالله",
    location: "حضرموت",
    program: "التنمية المجتمعية",
    programColor: "var(--brand-green)",
    quote:
      "بدأت بمشروع خياطة صغير بدعم من برنامج تمكين المرأة. اليوم لديّ ورشة تضم ١٢ موظفة وأوفر دخلًا لأسري وللأسر الأخرى. أحلامي أصبحت حقيقة بفضل ثقة المؤسسة بي.",
    image: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=400&h=400&fit=crop&auto=format",
    rating: 5,
    category: "رائدة أعمال",
    year: "٢٠٢٤",
  },
];

export function SuccessStories() {
  const [active, setActive] = useState(0);

  const story = stories[active];

  return (
    <section
      className="py-20 overflow-hidden"
      style={{
        direction: "rtl",
        background: "linear-gradient(135deg, var(--brand-green) 0%, var(--brand-green-light) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block mb-3 text-[var(--brand-gold-light)] border border-[var(--brand-gold)]/40 bg-white/10 px-4 py-1 rounded-full"
            style={{ fontSize: "0.8rem", fontWeight: 600 }}
          >
            من حياة المستفيدين
          </span>
          <h2 className="text-white mb-3">
            قصص تُلهم وأثرٌ{" "}
            <span className="text-[var(--brand-gold-light)]">يمتد</span>
          </h2>
          <p className="text-white/75 max-w-xl mx-auto" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
            كل مشروع وراءه إنسان وكل رقم وراءه قصة نجاح تستحق أن تُروى
          </p>
        </div>

        {/* Story Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Image */}
              <div className="md:col-span-2 relative h-64 md:h-auto min-h-56">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 to-transparent" />
                <div className="absolute bottom-4 right-4 md:top-4 md:right-4 flex flex-col gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-white"
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      background: story.programColor,
                    }}
                  >
                    {story.program}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {story.category} • {story.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-8 flex flex-col justify-between">
                {/* Quote */}
                <div>
                  <Quote
                    className="w-8 h-8 mb-4"
                    style={{ color: "var(--brand-gold)", opacity: 0.5 }}
                  />
                  <p
                    className="text-[var(--foreground)] mb-6"
                    style={{ fontSize: "0.95rem", lineHeight: "1.9", fontStyle: "italic" }}
                  >
                    "{story.quote}"
                  </p>
                </div>

                {/* Author */}
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: story.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
                    ))}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--foreground)" }}>
                    {story.name}
                  </div>
                  <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.8rem" }}>
                    {story.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActive((active - 1 + stories.length) % stories.length)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${
                    i === active
                      ? "w-8 h-3 bg-[var(--brand-gold)]"
                      : "w-3 h-3 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((active + 1) % stories.length)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
