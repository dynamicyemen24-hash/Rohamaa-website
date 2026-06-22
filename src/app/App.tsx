import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ImpactStats } from "./components/ImpactStats";
import { Programs } from "./components/Programs";
import { SuccessStories } from "./components/SuccessStories";
import { News, newsData } from "./components/News";
import { Partners } from "./components/Partners";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AdminDashboard } from "./components/AdminDashboard";
import { DonatePage } from "./components/DonatePage";
import { AboutPage } from "./components/AboutPage";

function HomePage({ setCurrentPage }: { setCurrentPage: (p: string) => void }) {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <ImpactStats />
      <Programs setCurrentPage={setCurrentPage} />
      <SuccessStories />
      <News setCurrentPage={setCurrentPage} />
      <Partners setCurrentPage={setCurrentPage} />
      <Contact />
    </>
  );
}

function NewsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="inline-block mb-3 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-pale)] px-4 py-1 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            الأخبار
          </span>
          <h1 className="text-[var(--foreground)]">أخبار وفعاليات المؤسسة</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-white" style={{ fontSize: "0.68rem", fontWeight: 700, background: item.categoryColor }}>{item.category}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[var(--foreground)] mb-2" style={{ fontSize: "0.9rem", fontWeight: 700, lineHeight: "1.4" }}>{item.title}</h3>
                <p className="text-[var(--muted-foreground)] mb-3" style={{ fontSize: "0.78rem", lineHeight: "1.6" }}>{item.excerpt}</p>
                <div className="flex items-center justify-between text-[var(--muted-foreground)]" style={{ fontSize: "0.7rem" }}>
                  <span>{item.date}</span>
                  <span>👁 {item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="min-h-screen pt-32 pb-16 bg-[var(--background)] flex items-center justify-center" style={{ direction: "rtl" }}>
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--brand-green-pale)] flex items-center justify-center mx-auto mb-5">
          <span style={{ fontSize: "2rem" }}>🌱</span>
        </div>
        <h2 className="text-[var(--foreground)] mb-3" style={{ fontWeight: 800 }}>{title}</h2>
        <p className="text-[var(--muted-foreground)] max-w-sm" style={{ fontSize: "0.9rem" }}>{subtitle}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />;
      case "about":
        return <AboutPage />;
      case "donate":
        return <DonatePage />;
      case "news":
        return <NewsPage />;
      case "contact":
        return (
          <div className="pt-20">
            <Contact />
          </div>
        );
      case "partners":
        return (
          <div className="pt-20">
            <Partners setCurrentPage={setCurrentPage} />
          </div>
        );
      case "programs":
      case "programs-relief":
      case "programs-education":
      case "programs-development":
      case "programs-dawah":
        return (
          <div className="pt-20">
            <Programs setCurrentPage={setCurrentPage} />
          </div>
        );
      case "success":
        return (
          <div className="pt-20">
            <SuccessStories />
          </div>
        );
      case "projects":
        return <PlaceholderPage title="مشاريعنا" subtitle="تصفح جميع مشاريع المؤسسة وبرامجها التنموية والإنسانية" />;
      case "reports":
        return <PlaceholderPage title="التقارير والإصدارات" subtitle="التقارير السنوية والنشرات الدورية للمؤسسة" />;
      case "media":
        return <PlaceholderPage title="معرض الوسائط" subtitle="صور وفيديوهات من أنشطة وبرامج المؤسسة" />;
      case "volunteer":
        return <PlaceholderPage title="التطوع" subtitle="انضم إلى فريق متطوعي مؤسسة رحماء بينهم" />;
      case "endowment":
        return <PlaceholderPage title="الوقف الخيري" subtitle="ساهم في الوقف الخيري للمؤسسة وتأمين مستقبل مشاريعها" />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  const showFooter = !["donate"].includes(currentPage);

  return (
    <div className="min-h-screen bg-[var(--background)]" style={{ direction: "rtl" }}>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setAdminOpen={setAdminOpen}
      />

      <main>{renderPage()}</main>

      {showFooter && <Footer setCurrentPage={setCurrentPage} />}

      {adminOpen && <AdminDashboard onClose={() => setAdminOpen(false)} />}
    </div>
  );
}
