import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "العنوان",
    lines: ["صنعاء، اليمن", "شارع الستين، برج رحماء، الطابق الخامس"],
    color: "var(--brand-green)",
  },
  {
    icon: Phone,
    title: "الهاتف",
    lines: ["+٩٦٧ ١ ٢٣٤ ٥٦٧٨", "+٩٦٧ ٧٧٧ ٨٨٨ ٩٩٩"],
    color: "var(--brand-gold)",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    lines: ["info@rohamaa.org", "support@rohamaa.org"],
    color: "var(--brand-green)",
  },
  {
    icon: Clock,
    title: "أوقات العمل",
    lines: ["الأحد – الخميس", "٨:٠٠ ص – ٤:٠٠ م"],
    color: "var(--brand-gold)",
  },
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section className="py-20 bg-[var(--secondary)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block mb-3 text-[var(--brand-green)] border border-[var(--brand-green)]/30 bg-[var(--brand-green-pale)] px-4 py-1 rounded-full"
            style={{ fontSize: "0.8rem", fontWeight: 600 }}
          >
            تواصل معنا
          </span>
          <h2 className="text-[var(--foreground)] mb-3">
            نحن هنا{" "}
            <span className="text-[var(--brand-green)]">للاستماع إليك</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
            سواء كنت مانحًا أو متطوعًا أو شريكًا أو مستفيدًا، نسعد بتواصلك معنا
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-5 border border-[var(--border)] flex gap-4 items-start"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--foreground)" }}>
                      {item.title}
                    </div>
                    {item.lines.map((line) => (
                      <div key={line} className="text-[var(--muted-foreground)]" style={{ fontSize: "0.8rem" }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Social */}
            <div className="bg-[var(--brand-green)] rounded-xl p-5 text-white">
              <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                تابعنا على منصات التواصل
              </div>
              <div className="flex gap-3">
                {[
                  { label: "X", href: "#" },
                  { label: "FB", href: "#" },
                  { label: "IG", href: "#" },
                  { label: "YT", href: "#" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors"
                    style={{ fontSize: "0.7rem", fontWeight: 700 }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-7 sm:p-8 border border-[var(--border)] shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CheckCircle className="w-16 h-16 text-[var(--brand-green)] mb-4" />
                <h3 className="text-[var(--foreground)] mb-2" style={{ fontWeight: 700 }}>
                  تم إرسال رسالتك بنجاح
                </h3>
                <p className="text-[var(--muted-foreground)] max-w-xs" style={{ fontSize: "0.85rem" }}>
                  شكرًا لتواصلك معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", type: "", message: "" }); }}
                  className="mt-6 px-6 py-2.5 border border-[var(--brand-green)] text-[var(--brand-green)] rounded-lg hover:bg-[var(--brand-green-pale)] transition-colors"
                  style={{ fontSize: "0.85rem" }}
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-[var(--foreground)] mb-6" style={{ fontWeight: 700 }}>
                  أرسل رسالتك
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-[var(--foreground)]" style={{ fontSize: "0.82rem" }}>
                      الاسم الكامل <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="أدخل اسمك"
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/40 focus:border-[var(--brand-green)] transition-colors"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[var(--foreground)]" style={{ fontSize: "0.82rem" }}>
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/40 focus:border-[var(--brand-green)] transition-colors"
                      style={{ fontSize: "0.85rem" }}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-[var(--foreground)]" style={{ fontSize: "0.82rem" }}>
                      رقم الهاتف
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+٩٦٧ ..."
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/40 focus:border-[var(--brand-green)] transition-colors"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[var(--foreground)]" style={{ fontSize: "0.82rem" }}>
                      نوع التواصل
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/40 focus:border-[var(--brand-green)] transition-colors"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <option value="">اختر...</option>
                      <option value="donor">مانح / داعم</option>
                      <option value="volunteer">متطوع</option>
                      <option value="partner">شريك مؤسسي</option>
                      <option value="beneficiary">مستفيد</option>
                      <option value="media">صحفي / إعلامي</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5 text-[var(--foreground)]" style={{ fontSize: "0.82rem" }}>
                    الموضوع <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="موضوع رسالتك"
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/40 focus:border-[var(--brand-green)] transition-colors"
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-[var(--foreground)]" style={{ fontSize: "0.82rem" }}>
                    الرسالة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/40 focus:border-[var(--brand-green)] transition-colors resize-none"
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--brand-green)] text-white rounded-xl hover:bg-[var(--brand-green-light)] transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                  style={{ fontWeight: 600 }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      إرسال الرسالة
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
