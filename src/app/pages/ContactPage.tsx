import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useState } from "react";

import { sendMessage } from "@/api/messages";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await sendMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'حدث خطأ في إرسال الرسالة');
      }
    } catch (err) {
      setError('خطأ في الاتصال بالخادم');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--background)] pt-20" dir="rtl">
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-12 border border-[var(--border)] max-w-2xl mx-auto"
          >
            <Send className="w-16 h-16 text-[var(--brand-green)] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              تم إرسال رسالتك بنجاح!
            </h2>
            <p className="text-[var(--muted-foreground)]">
              شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[var(--brand-green)] text-sm font-semibold bg-[var(--brand-green-pale)] px-4 py-1.5 rounded-full mb-4">
            <Mail className="w-4 h-4" />
            تواصل معنا
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            نحن هنا لمساعدتك
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            يسرنا تواصلك معنا. لا تتردد في مراسلتنا بأي استفسار أو اقتراح
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[var(--border)] shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[var(--brand-green)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1">الهاتف</h3>
                  <p className="text-[var(--muted-foreground)]">+967 1 234 567</p>
                  <p className="text-[var(--muted-foreground)]">+967 777 888 999</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[var(--border)] shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[var(--brand-green)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1">البريد الإلكتروني</h3>
                  <p className="text-[var(--muted-foreground)]">info@rahmaabaynahum.org</p>
                  <p className="text-[var(--muted-foreground)]">donations@rahmaabaynahum.org</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[var(--border)] shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--brand-green)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1">العنوان</h3>
                  <p className="text-[var(--muted-foreground)]">صنعاء - شارع الزبيري</p>
                  <p className="text-[var(--muted-foreground)]">اليمن</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[var(--border)] shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[var(--brand-green)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1">ساعات العمل</h3>
                  <p className="text-[var(--muted-foreground)]">السبت - الخميس: 8 صباحاً - 4 مساءً</p>
                  <p className="text-[var(--muted-foreground)]">الجمعة: مغلق</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-[var(--border)] shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl">
                  {error}
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:ring-2 focus:ring-[var(--brand-green)]/30 outline-none"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:ring-2 focus:ring-[var(--brand-green)]/30 outline-none"
                    placeholder="أدخل بريدك"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                  رقم الهاتف
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:ring-2 focus:ring-[var(--brand-green)]/30 outline-none"
                  placeholder="+967"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                  الموضوع
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:ring-2 focus:ring-[var(--brand-green)]/30 outline-none"
                  placeholder="موضوع رسالتك"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:ring-2 focus:ring-[var(--brand-green)]/30 outline-none resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--brand-green)] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[var(--brand-green-light)] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}