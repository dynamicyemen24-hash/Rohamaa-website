import { Handshake, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { partnersDashboardService } from "@/shared/services/dashboard.service";

export function Partners({ setCurrentPage }: { setCurrentPage: (p: string) => void } = { setCurrentPage: () => {} }) {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    partnersDashboardService.getAll().then((items) => {
      if (!cancelled) setPartners(items.filter((item: any) => item.status !== 'inactive' && item.status !== 'suspended'));
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-[var(--background)]" style={{ direction: "rtl" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-green)]" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-2xl p-6 border border-[var(--border)] hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-8 h-8 text-[var(--brand-green)]" />
              </div>
              <h3 className="text-[var(--foreground)] mb-1" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                {partner.name}
              </h3>
              <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.78rem" }}>
                {partner.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
