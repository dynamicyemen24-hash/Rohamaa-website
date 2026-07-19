import { motion } from "framer-motion";
import { Handshake, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { SEED_PARTNERS } from "@/content/website";
import { useDynamicContent } from "@/shared/hooks/useDynamicContent";
import { contentBridge } from "@/shared/services/content-bridge.service";
import { sanityService } from "@/shared/services/sanity.service";

export function Partners({ setCurrentPage }: { setCurrentPage: (p: string) => void } = { setCurrentPage: () => {} }) {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentSource, setContentSource] = useState<'static' | 'sanity' | 'hybrid'>('static');
  const [showDevBadge, setShowDevBadge] = useState(false);

  // Use dynamic content hook
  const { data: dynamicPartners, isLoading: dynamicLoading, source } = useDynamicContent<any>({
    contentType: 'partners',
    enableRealtime: false,
    refreshInterval: 300000
  });

  // Show dev badge in development mode
  useEffect(() => {
    if (import.meta.env?.DEV) {
      setShowDevBadge(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fallback = SEED_PARTNERS.map((p: any) => ({
      id: p.id,
      name: p.name,
      type: p.type,
      status: p.status,
      logo: p.logo,
      website: p.url,
    }));

    const loadPartners = async () => {
      try {
        // Try dynamic content first
        if (dynamicPartners.length > 0) {
          const normalized = dynamicPartners.map((p: any) => ({ 
            id: p._id, 
            name: p.name, 
            type: p.type, 
            status: p.status, 
            logo: p.logo, 
            website: p.website 
          }));
          setPartners(normalized.filter((item: any) => item.status !== 'inactive' && item.status !== 'suspended'));
          setContentSource(source);
        } else {
          // Fallback to direct Sanity fetch
          const items = await sanityService.getPartners();
          if (!cancelled) {
            const normalized = items.length > 0
              ? items.map((p: any) => ({ id: p._id, name: p.name, type: p.type, status: p.status, logo: p.logo, website: p.website }))
              : fallback;
            setPartners(normalized.filter((item: any) => item.status !== 'inactive' && item.status !== 'suspended'));
            setContentSource('static');
          }
        }
      } catch (error) {
        if (!cancelled) {
          setPartners(fallback.filter((item: any) => item.status !== 'inactive' && item.status !== 'suspended'));
          setContentSource('static');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadPartners();
    return () => { cancelled = true; };
  }, [dynamicPartners, source]);

  if (loading || dynamicLoading) {
    return (
      <section className="py-20 bg-[var(--background)]" style={{ direction: "rtl" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-green)]" />
        </div>
      </section>
    );
  }

  // Dev indicator badge
  const DevBadge = showDevBadge ? (
    <div className="fixed top-4 left-4 z-50 bg-purple-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          contentSource === 'sanity' ? 'bg-green-400' : 
          contentSource === 'hybrid' ? 'bg-blue-400' : 'bg-yellow-400'
        }`} />
        <span>{contentSource === 'sanity' ? 'Sanity CMS' : contentSource === 'hybrid' ? 'Hybrid' : 'Static Content'}</span>
      </div>
    </div>
  ) : null;

  return (
    <section className="py-20 bg-[var(--background)]" style={{ direction: "rtl" }}>
      {DevBadge}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-3 text-[var(--brand-green)] border border-[var(--brand-green)]/30 bg-[var(--brand-green-pale)] px-4 py-1 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            شركاء النجاح
          </span>
          <h2 className="text-[var(--foreground)]">
            شركاؤنا في{" "}
            <span className="text-[var(--brand-green)]">العمل الإنساني</span>
          </h2>
          <p className="text-[var(--muted-foreground)] mt-2 max-w-xl mx-auto" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
            نعمل مع شركاء إستراتيجيين ومؤسسات داعمة لتحقيق أثر أوسع وأدوم
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="bg-white rounded-2xl p-6 border border-[var(--border)] hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <Handshake className="w-8 h-8 text-[var(--brand-green)]" />
              </div>
              <h3 className="text-[var(--foreground)] mb-1" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                {partner.name}
              </h3>
              <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.78rem" }}>
                {partner.type}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
