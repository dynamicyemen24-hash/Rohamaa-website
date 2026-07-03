export function EndowmentPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="inline-block mb-3 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-pale)] px-4 py-1 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            الوقف الخيري
          </span>
          <h1 className="text-[var(--foreground)]">الوقف الخيري <span className="text-[var(--brand-green)]">للمؤسسة</span></h1>
          <p className="text-[var(--muted-foreground)] mt-2 max-w-xl mx-auto" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
            ساهم في الوقف الخيري للمؤسسة وتأمين مستقبل مشاريعها
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-green-light)] rounded-3xl p-8 sm:p-12 text-white text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5">
              <span style={{ fontSize: "2.5rem" }}>🏗️</span>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>الوقف الخيري</h2>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.8", opacity: 0.9, maxWidth: "500px", margin: "0 auto 1.5rem" }}>
              الوقف الخيري هو مشروع استثماري مستدام يهدف إلى تأمين مصادر دخل ثابتة للمؤسسة لضمان استمرارية برامجها ومشاريعها الإنسانية.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-white text-[var(--brand-green)] rounded-xl hover:bg-white/90 transition-colors" style={{ fontWeight: 700 }}>ساهم في الوقف</button>
              <button className="px-8 py-3 border-2 border-white/40 text-white rounded-xl hover:bg-white/10 transition-colors" style={{ fontWeight: 600 }}>استفسر عن الوقف</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'العوائد السنوية', value: '١٢٪', desc: 'عائد استثماري مجدٍ' },
              { label: 'رأس المال', value: '٥٠٠,٠٠٠$', desc: 'مستهدف جمعه' },
              { label: 'المستفيدون', value: '٢٠٠٠+', desc: 'سنوياً من العوائد' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-5 border border-[var(--border)] text-center">
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--brand-green)" }}>{s.value}</div>
                <div className="text-[var(--foreground)]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{s.label}</div>
                <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.75rem" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}