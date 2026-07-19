// Partners Page - صفحة الشركاء
import { motion } from "framer-motion";
import { Handshake, Heart, Globe, Users, Mail, Phone, ExternalLink, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { SEED_PARTNERS } from "@/content/website";
import { sanityService } from "@/shared/services/sanity.service";

export default function PartnersPage() {
  const [partners, setPartners] = useState(SEED_PARTNERS);

  // Fetch partners from Sanity if available
  useEffect(() => {
    const loadPartners = async () => {
      try {
        const data = await sanityService.getPartners();
        if (data && data.length > 0) {
          setPartners(data.map((p: any) => ({
            id: p._id || p.id,
            name: p.name,
            type: p.type,
            status: p.status,
            url: p.website || p.url,
          })));
        }
      } catch (error) {
        // Fallback to seed data
        console.log('Using seed partners data');
      }
    };
    loadPartners();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[var(--brand-green)] text-sm font-semibold bg-[var(--brand-green-pale)] px-4 py-1.5 rounded-full mb-4">
            <Handshake className="w-4 h-4" />
            شركاء النجاح
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            شركاؤنا في <span className="text-[var(--brand-green)]">العمل الخيري</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            نحن نعمل مع شركاء إستراتيجيين ومؤسسات داعمة لتحقيق أثر أوسع وأدوم
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl p-6 border border-[var(--border)] shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Handshake className="w-7 h-7 text-[var(--brand-green)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] text-lg mb-1">{partner.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs" style={{ 
                    background: partner.status === 'active' ? 'var(--brand-green-pale)' : 'var(--muted)',
                    color: partner.status === 'active' ? 'var(--brand-green)' : 'var(--muted-foreground)'
                  }}>
                    {partner.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>

              <p className="text-[var(--muted-foreground)] text-sm mb-4 leading-relaxed">
                شريك استراتيجي في مشاريعنا الخيرية
              </p>

              <div className="space-y-2 mb-4">
                {partner.url && partner.url !== '#' ? (
                  <a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--brand-green)] hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    زيارة الموقع
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button 
                    onClick={() => window.location.href = '/contact'}
                    className="flex items-center gap-2 text-sm text-[var(--brand-green)] hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    تواصل للشراكة
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-sm font-semibold" style={{ color: "var(--brand-green)" }}>{partner.type}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {partners.length === 0 && (
          <div className="text-center py-16">
            <Handshake className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">لا توجد شراكات متاحة حالياً</h3>
            <p className="text-[var(--muted-foreground)]">نحن نعمل على إضافة شركاء جديدين</p>
          </div>
        )}
      </div>
    </div>
  );
}