import { useState } from "react";
import { Heart, Mail, Phone, MapPin, ArrowUp, Shield, FileText, AlertCircle, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const footerLinks = {
  المؤسسة: [
    { label: "من نحن", href: "about" },
    { label: "رؤيتنا ورسالتنا", href: "about" },
    { label: "فريق العمل", href: "about" },
    { label: "التقارير السنوية", href: "reports" },
    { label: "حوكمة المؤسسة", href: "about" },
  ],
  البرامج: [
    { label: "برامجنا", href: "programs" },
    { label: "مشاريعنا", href: "projects" },
    { label: "قصص النجاح", href: "success" },
  ],
  المشاركة: [
    { label: "تبرع الآن", href: "donate" },
    { label: "كن متطوعًا", href: "volunteer" },
    { label: "الشراكات المؤسسية", href: "partners" },
    { label: "الوقف الخيري", href: "endowment" },
  ],
  "الموارد": [
    { label: "الأخبار", href: "news" },
    { label: "قصص النجاح", href: "success" },
    { label: "التقارير والإصدارات", href: "reports" },
    { label: "معرض الوسائط", href: "media" },
    { label: "تواصل معنا", href: "contact" },
  ],
  "روابط سريعة": [
    { label: "التطوع", href: "volunteer" },
    { label: "الوقف الخيري", href: "endowment" },
    { label: "معرض الوسائط", href: "media" },
    { label: "التقارير", href: "reports" },
  ],
};

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export function Footer({ setCurrentPage }: FooterProps) {
  const navigate = useNavigate();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePolicyClick = (policyType: string) => {
    navigate('/privacy-policy', { state: { policyType } });
  };

  // Newsletter subscription
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    if (email) {
      setSubscribeStatus('success');
      form.reset();
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  return (
    <footer
      className="pt-16 pb-8"
      style={{
        direction: "rtl",
        background: "linear-gradient(180deg, #0F3D2E 0%, #0A2A1F 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <button onClick={() => setCurrentPage("home")} className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-[var(--brand-gold)] flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div className="text-right">
                <div className="text-white" style={{ fontWeight: 800, fontSize: "1.15rem" }}>
                  رحماء بينهم
                </div>
                <div className="text-white/50" style={{ fontSize: "0.65rem" }}>
                  Rohamaa Foundation
                </div>
              </div>
            </button>
            <p className="text-white/65 mb-6" style={{ fontSize: "0.82rem", lineHeight: "1.8" }}>
              مؤسسة إنسانية تنموية تعمل على تخفيف معاناة الإنسان وبناء مجتمعات مستدامة، منذ عام ١٤٣٠هـ.
            </p>
            <div className="space-y-2.5">
              {[
                { icon: MapPin, text: "صنعاء، اليمن" },
                { icon: Phone, text: "+٩٦٧ ١ ٢٣٤ ٥٦٧٨" },
                { icon: Mail, text: "info@rohamaa.org" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-white/60">
                  <Icon className="w-3.5 h-3.5 flex-shrink-0 text-[var(--brand-gold)]" />
                  <span style={{ fontSize: "0.78rem" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="lg:col-span-1">
              <h4
                className="text-white mb-4 border-r-2 border-[var(--brand-gold)] pr-3"
                style={{ fontSize: "0.88rem", fontWeight: 700 }}
              >
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => setCurrentPage(link.href)}
                      className="text-white/55 hover:text-[var(--brand-gold-light)] transition-colors"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div>
            <div className="text-white mb-1" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
              اشترك في نشرتنا البريدية
            </div>
            <div className="text-white/55" style={{ fontSize: "0.78rem" }}>
              كن أول من يعلم بأخبار المؤسسة وبرامجها وفعالياتها
            </div>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="بريدك الإلكتروني"
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-lg text-white bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:border-[var(--brand-gold)] transition-colors"
              style={{ fontSize: "0.82rem" }}
              dir="ltr"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[var(--brand-gold)] text-white rounded-lg hover:bg-[var(--brand-gold-light)] transition-colors flex-shrink-0"
              style={{ fontSize: "0.82rem", fontWeight: 600 }}
            >
              اشتراك
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <div className="text-white/40 text-center sm:text-right" style={{ fontSize: "0.75rem" }}>
            © ٢٠٢٥ مؤسسة رحماء بينهم. جميع الحقوق محفوظة.
          </div>
<div className="flex items-center gap-4">
             {/* License Numbers */}
             <div className="text-white/40 text-xs">
               <span>رخصة جمع التبرعات: 2024/YEM/001</span>
               <span className="mx-2">|</span>
               <span>مؤسسة معتمدة من وزارة التعاون والتنمية</span>
             </div>
             
             {/* Payment Gateways Icons */}
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
               <div className="flex items-center gap-1" title="Stripe - مؤمون">
                 <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                   <CreditCard className="w-3 h-3 text-white" />
                 </div>
               </div>
               <div className="flex items-center gap-1" title="مدى - مؤمن">
                 <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
                   <CreditCard className="w-3 h-3 text-white" />
                 </div>
               </div>
               <div className="flex items-center gap-1" title="SSL - مشفر">
                 <Shield className="w-3 h-3 text-[var(--brand-gold)]" />
               </div>
               <span className="text-white/60 text-xs font-medium">آمن</span>
             </div>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--brand-gold)] flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}