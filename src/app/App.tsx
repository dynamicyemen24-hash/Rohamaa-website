import { Loader2 } from "lucide-react";
import { useState, useEffect, lazy, Suspense, useCallback, memo } from "react";

import { LoginPage } from "@/features/auth/components/LoginPage";
import { useAuth } from "@/features/auth/contexts/AuthContext";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { PageProgress } from "./components/PageProgress";

// Lazy load all pages for performance
const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import("./components/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const Contact = lazy(() =>
  import("./components/Contact").then((m) => ({ default: m.Contact }))
);
const DonatePage = lazy(() =>
  import("./components/DonatePage").then((m) => ({ default: m.DonatePage }))
);
const News = lazy(() =>
  import("./components/News").then((m) => ({ default: m.News }))
);
const Partners = lazy(() =>
  import("./components/Partners").then((m) => ({ default: m.Partners }))
);
const Programs = lazy(() =>
  import("./components/Programs").then((m) => ({ default: m.Programs }))
);
const SuccessStories = lazy(() =>
  import("./components/SuccessStories").then((m) => ({ default: m.SuccessStories }))
);
const AdminDashboard = lazy(() =>
  import("./components/AdminDashboard").then((m) => ({ default: m.AdminDashboard }))
);

// Lazy load page-level components
const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage }))
);
const ReportsPage = lazy(() =>
  import("./pages/ReportsPage").then((m) => ({ default: m.ReportsPage }))
);
const MediaPage = lazy(() =>
  import("./pages/MediaPage").then((m) => ({ default: m.MediaPage }))
);
const VolunteerPage = lazy(() =>
  import("./pages/VolunteerPage").then((m) => ({ default: m.VolunteerPage }))
);
const EndowmentPage = lazy(() =>
  import("./pages/EndowmentPage").then((m) => ({ default: m.EndowmentPage }))
);

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--brand-green)] mx-auto mb-3" />
        <p className="text-[var(--muted-foreground)]" style={{ fontSize: "0.85rem" }}>جاري التحميل...</p>
      </div>
    </div>
  );
}

const PageWrapper = memo(function PageWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
});

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [adminOpen, setAdminOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();

  // Prefetch pages on hover for faster navigation
  const prefetchPage = useCallback((pageName: string) => {
    const moduleMap: Record<string, () => Promise<any>> = {
      home: () => import("./pages/HomePage"),
      about: () => import("./components/AboutPage"),
      donate: () => import("./components/DonatePage"),
      news: () => import("./components/News"),
      contact: () => import("./components/Contact"),
      partners: () => import("./components/Partners"),
      programs: () => import("./components/Programs"),
      "programs-relief": () => import("./components/Programs"),
      "programs-education": () => import("./components/Programs"),
      "programs-development": () => import("./components/Programs"),
      "programs-dawah": () => import("./components/Programs"),
      success: () => import("./components/SuccessStories"),
      projects: () => import("./pages/ProjectsPage"),
      reports: () => import("./pages/ReportsPage"),
      media: () => import("./pages/MediaPage"),
      volunteer: () => import("./pages/VolunteerPage"),
      endowment: () => import("./pages/EndowmentPage"),
    };

    const loadModule = moduleMap[pageName];
    if (loadModule) {
      loadModule().catch(() => {/* silent prefetch */});
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && currentPage === 'login') {
      setCurrentPage('home');
      setAdminOpen(true);
    }
  }, [isAuthenticated, isLoading, currentPage]);

  const handleSetPage = useCallback((page: string) => {
    setPageLoading(true);
    setCurrentPage(page);
    setTimeout(() => setPageLoading(false), 150);
  }, []);

  const handleSetAdmin = useCallback((open: boolean) => {
    setAdminOpen(open);
  }, []);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case "home":
        return <PageWrapper><HomePage setCurrentPage={handleSetPage} /></PageWrapper>;
      case "about":
        return <PageWrapper><AboutPage /></PageWrapper>;
      case "donate":
        return <PageWrapper><DonatePage /></PageWrapper>;
      case "news":
        return <PageWrapper><News setCurrentPage={handleSetPage} /></PageWrapper>;
      case "login":
        return <LoginPage />;
      case "contact":
        return <PageWrapper><div className="pt-20"><Contact setCurrentPage={handleSetPage} /></div></PageWrapper>;
      case "partners":
        return <PageWrapper><div className="pt-20"><Partners setCurrentPage={handleSetPage} /></div></PageWrapper>;
      case "programs":
      case "programs-relief":
      case "programs-education":
      case "programs-development":
      case "programs-dawah":
        return <PageWrapper><div className="pt-20"><Programs setCurrentPage={handleSetPage} /></div></PageWrapper>;
      case "success":
        return <PageWrapper><div className="pt-20"><SuccessStories setCurrentPage={handleSetPage} /></div></PageWrapper>;
      case "projects":
        return <PageWrapper><ProjectsPage /></PageWrapper>;
      case "reports":
        return <PageWrapper><ReportsPage /></PageWrapper>;
      case "media":
        return <PageWrapper><MediaPage /></PageWrapper>;
      case "volunteer":
        return <PageWrapper><VolunteerPage /></PageWrapper>;
      case "endowment":
        return <PageWrapper><EndowmentPage /></PageWrapper>;
      default:
        return <PageWrapper><HomePage setCurrentPage={handleSetPage} /></PageWrapper>;
    }
  }, [currentPage, handleSetPage]);

  const showFooter = currentPage !== "donate" && currentPage !== "login";

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[var(--background)]" style={{ direction: "rtl" }}>
        <PageProgress isLoading={pageLoading} />

        <Navbar
          currentPage={currentPage}
          setCurrentPage={handleSetPage}
          setAdminOpen={handleSetAdmin}
          onHoverPage={prefetchPage}
        />

        <main className="min-h-screen">
          {renderPage()}
        </main>

        {showFooter && <Footer setCurrentPage={handleSetPage} />}

        {adminOpen && (
          <Suspense fallback={<PageLoader />}>
            <AdminDashboard onClose={() => setAdminOpen(false)} />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  );
}