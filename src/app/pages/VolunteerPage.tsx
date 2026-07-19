import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

import { Skeleton } from "@/app/components/Skeleton";
import { intakeService } from "@/shared/services/intake.service";

function VolunteerLoadingSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <Skeleton width="100px" height="28px" className="mx-auto mb-3" />
          <Skeleton width="350px" height="36px" className="mx-auto" />
          <Skeleton width="500px" height="20px" className="mx-auto mt-2" />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-[var(--border)]">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton height="80px" />
                <Skeleton height="80px" />
              </div>
              <Skeleton height="80px" />
              <Skeleton height="140px" />
              <Skeleton height="48px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const field = String(formData.get('field') || '').trim();

    if (!name || !email || !phone) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      setSending(false);
      return;
    }

    try {
      await intakeService.submitVolunteer({
        name,
        email,
        phone,
        field,
        motivation: String(formData.get('reason') || '').trim(),
      });
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء إرسال الطلب');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="inline-block mb-3 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-pale)] px-4 py-1 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            التطوع
          </span>
          <h1 className="text-[var(--foreground)]">تطوع مع <span className="text-[var(--brand-green)]">رحماء بينهم</span></h1>
          <p className="text-[var(--muted-foreground)] mt-2 max-w-xl mx-auto" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
            انضم إلى فريق متطوعي المؤسسة وكن جزءاً من العطاء
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-[var(--border)] shadow-sm">
          {submitted && (
            <div className="mb-5 rounded-xl border border-[var(--brand-green)]/20 bg-[var(--brand-green-pale)] p-4 flex items-start gap-3" style={{ fontSize: "0.85rem", fontWeight: 700 }}>
              <CheckCircle className="w-5 h-5 text-[var(--brand-green)] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[var(--brand-green)] font-bold mb-1">تم استلام طلبك بنجاح</div>
                <div className="text-[var(--muted-foreground)] font-normal" style={{ fontSize: "0.8rem" }}>
                  سيظهر طلبك في لوحة التحكم للمراجعة. سنتواصل معك قريباً عبر البريد الإلكتروني.
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3" style={{ fontSize: "0.85rem" }}>
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-red-700">{error}</div>
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-1 text-[var(--foreground)] text-sm font-semibold">الاسم الكامل *</label>
                <input 
                  id="name"
                  required 
                  name="name" 
                  placeholder="مثال: محمد أحمد" 
                  className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30 focus:border-[var(--brand-green)] transition-colors" 
                  style={{ fontSize: "0.85rem" }}
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-[var(--foreground)] text-sm font-semibold">البريد الإلكتروني *</label>
                <input 
                  id="email"
                  required 
                  type="email" 
                  name="email" 
                  placeholder="example@email.com" 
                  className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30 transition-colors" 
                  style={{ fontSize: "0.85rem" }}
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 text-[var(--foreground)] text-sm font-semibold">رقم الهاتف *</label>
                <input 
                  id="phone"
                  required 
                  name="phone" 
                  placeholder="+967 ..." 
                  className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30 transition-colors" 
                  style={{ fontSize: "0.85rem" }}
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="field" className="block mb-1 text-[var(--foreground)] text-sm font-semibold">مجال التطوع</label>
                <select 
                  id="field"
                  name="field" 
                  className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30 transition-colors" 
                  style={{ fontSize: "0.85rem" }}
                >
                  <option value="">اختر المجال</option>
                  <option value="تعليمي">تعليمي</option>
                  <option value="صحي">صحي</option>
                  <option value="إغاثي">إغاثي</option>
                  <option value="إعلامي">إعلامي</option>
                  <option value="إداري">إداري</option>
                  <option value="تقني">تقني</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="reason" className="block mb-1 text-[var(--foreground)] text-sm font-semibold">لماذا ترغب في التطوع معنا؟</label>
              <textarea 
                id="reason"
                rows={4} 
                name="reason" 
                placeholder="اكتب دوافعك للتطوع..." 
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30 resize-none transition-colors" 
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <button 
              type="submit" 
              disabled={sending} 
              className="w-full py-3 bg-[var(--brand-green)] text-white rounded-xl hover:bg-[var(--brand-green-light)] transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/50"
              style={{ fontWeight: 700, fontSize: "0.9rem" }}
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "تقديم طلب التطوع"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}