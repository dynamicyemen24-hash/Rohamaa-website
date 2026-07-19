// App Shell - نسخة مبسطة تعمل
import { lazy, Suspense, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import { PageProgress } from "./components/PageProgress";
import { UpdateNotification } from "./components/UpdateNotification";

// Lazy load all pages - named exports from original pages
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.default })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.default })));
const ProgramsPage = lazy(() => import("./pages/ProgramsPage").then(m => ({ default: m.default })));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage").then(m => ({ default: m.default })));
const PartnersPage = lazy(() => import("./pages/PartnersPage").then(m => ({ default: m.default })));
const MediaPage = lazy(() => import("./pages/MediaPage").then(m => ({ default: m.default })));
const ReportsPage = lazy(() => import("./pages/ReportsPage").then(m => ({ default: m.default })));
const TransparencyPage = lazy(() => import("./pages/TransparencyPage").then(m => ({ default: m.default })));
const VolunteerPage = lazy(() => import("./pages/VolunteerPage").then(m => ({ default: m.default })));
const ZakatPage = lazy(() => import("./pages/ZakatPage").then(m => ({ default: m.default })));
const DonatePage = lazy(() => import("./pages/DonatePage").then(m => ({ default: m.default })));
const AdminPage = lazy(() => import("./pages/AdminPage").then(m => ({ default: m.default })));
const SuccessStoriesPage = lazy(() => import("./pages/SuccessStoriesPage").then(m => ({ default: m.default })));
const NewsPage = lazy(() => import("./pages/NewsPage").then(m => ({ default: m.default })));
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.default })));
const EndowmentPage = lazy(() => import("./pages/EndowmentPage").then(m => ({ default: m.default })));
const LoginPage = lazy(() => import("./pages/index").then(m => ({ default: m.LoginPage })));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-[var(--brand-green)] border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--muted-foreground)] text-sm">جاري التحميل...</p>
      </div>
    </div>
  );
}

// Wrapper for lazy pages
function PageWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine current page from URL
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.slice(1).split('/')[0];
  
  const setCurrentPage = useCallback((page: string) => {
    navigate(`/${page === 'home' ? '' : page}`, { replace: false });
  }, [navigate]);
  
  const setAdminOpen = useCallback((_open: boolean) => {
    // Admin functionality handled by React Router now
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]" dir="rtl">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} setAdminOpen={setAdminOpen} />
      <UpdateNotification />
      <PageProgress />
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/programs" element={<PageWrapper><ProgramsPage /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
          <Route path="/success" element={<PageWrapper><SuccessStoriesPage /></PageWrapper>} />
          <Route path="/news" element={<PageWrapper><NewsPage /></PageWrapper>} />
          <Route path="/media" element={<PageWrapper><MediaPage /></PageWrapper>} />
          <Route path="/reports" element={<PageWrapper><ReportsPage /></PageWrapper>} />
          <Route path="/transparency" element={<PageWrapper><TransparencyPage /></PageWrapper>} />
          <Route path="/volunteer" element={<PageWrapper><VolunteerPage /></PageWrapper>} />
          <Route path="/zakat" element={<PageWrapper><ZakatPage /></PageWrapper>} />
          <Route path="/endowment" element={<PageWrapper><EndowmentPage /></PageWrapper>} />
          <Route path="/donate" element={<PageWrapper><DonatePage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/partners" element={<PageWrapper><PartnersPage /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
          <Route path="/admin/*" element={<PageWrapper><AdminPage /></PageWrapper>} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center pt-20">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-[var(--brand-green)] mb-4">404</h1>
                <p className="text-[var(--muted-foreground)]">الصفحة غير موجودة</p>
              </div>
            </div>
          } />
        </Routes>
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
