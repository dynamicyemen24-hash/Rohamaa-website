// Enterprise App Shell - World-Class Architecture 2026
import { Loader2, Zap, Activity } from "lucide-react";
import { useState, useEffect, lazy, Suspense, useCallback, memo, ComponentType } from "react";

import { LoginPage } from "@/features/auth/components/LoginPage";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { PageProgress } from "./components/PageProgress";
import { SmartToolbar } from "./components/SmartToolbar";
import { useSEO } from "@/utils/seoAdvanced";
import { logger, metrics } from "@/features/core/observability/metrics";
import { healthCheckService, createDefaultChecks } from "@/utils/healthCheck";
import { eventBus, DOMAIN_EVENTS } from "@/features/core/events/eventBus";
import { auditLogger } from "@/features/core/security/advancedSecurity";

// Initialize health checks
createDefaultChecks();

// Lazy load all pages
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.default })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.default })));
const ProgramsPage = lazy(() => import("./pages/ProgramsPage").then(m => ({ default: m.default })));
const TransparencyPage = lazy(() => import("./pages/TransparencyPage").then(m => ({ default: m.default })));
const ZakatPage = lazy(() => import("./pages/ZakatPage").then(m => ({ default: m.default })));
const DonatePage = lazy(() => import("./pages/DonatePage").then(m => ({ default: m.default })));
const VolunteerPage = lazy(() => import("./pages/VolunteerPage").then(m => ({ default: m.VolunteerPage })));
const MediaPage = lazy(() => import("./pages/MediaPage").then(m => ({ default: m.MediaPage })));
const ReportsPage = lazy(() => import("./pages/ReportsPage").then(m => ({ default: m.ReportsPage })));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage").then(m => ({ default: m.ProjectsPage })));
const EndowmentPage = lazy(() => import("./pages/EndowmentPage").then(m => ({ default: m.EndowmentPage })));
const AdminPage = lazy(() => import("./pages/AdminPage").then(m => ({ default: m.default })));
const AdminDashboard = lazy(() => import("./components/AdminDashboard").then(m => ({ default: m.AdminDashboard })));

// Advanced Page Loader
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <Loader2 className="w-16 h-16 animate-spin text-[var(--brand-green)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-[var(--brand-green)] rounded-full animate-ping" />
          </div>
        </div>
        <p className="text-[var(--muted-foreground)] text-sm">جاري التحميل...</p>
      </div>
    </div>
  );
}

const PageWrapper = memo(function PageWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
});

// Route configuration
interface RouteConfig {
  component: ComponentType<any>;
  title: string;
  showFooter?: boolean;
  seo?: { title: string; description: string; type?: 'website' | 'article' };
}

const ROUTES: Record<string, RouteConfig> = {
  home: {
    component: HomePage,
    title: 'الرئيسية',
    seo: { title: 'رحماء بينهم - منصة إغاثة وتنمية', description: 'حملة رحماء بينهم الخيرية - تضامن إنساني وتنموي متكامل منذ 2014' },
  },
  about: {
    component: AboutPage,
    title: 'من نحن',
    seo: { title: 'من نحن - رحماء بينهم', description: 'تعرف على حملة رحماء بينهم الخيرية وإنجازاتها منذ 2014' },
  },
  programs: {
    component: ProgramsPage,
    title: 'برامجنا',
    seo: { title: 'برامجنا ومشاريعنا - رحماء بينهم', description: 'استعرض جميع برامجنا ومشاريعنا الخيرية والإنسانية والتنموية' },
  },
  transparency: {
    component: TransparencyPage,
    title: 'الشفافية',
    seo: { title: 'مركز الأثر والشفافية - رحماء بينهم', description: 'الشفافية الكاملة في العمل الخيري - التقارير والوثائق وقصص النجاح' },
  },
  zakat: {
    component: ZakatPage,
    title: 'حاسبة الزكاة',
    seo: { title: 'حاسبة الزكاة - رحماء بينهم', description: 'احسب زكاة مالك وذهبك وفطرك بدقة وسهولة' },
  },
  donate: {
    component: DonatePage,
    title: 'تبرع',
    showFooter: false,
    seo: { title: 'تبرع الآن - رحماء بينهم', description: 'ساهم في دعم المشاريع الخيرية والإنسانية' },
  },
  volunteer: {
    component: VolunteerPage,
    title: 'تطوع',
    seo: { title: 'انضم إلينا - رحماء بينهم', description: 'تطوع وشارك في العمل الإنساني' },
  },
  media: {
    component: MediaPage,
    title: 'المركز الإعلامي',
    seo: { title: 'المركز الإعلامي - رحماء بينهم', description: 'آخر الأخبار والتقارير المصورة' },
  },
  reports: {
    component: ReportsPage,
    title: 'التقارير',
    seo: { title: 'التقارير - رحماء بينهم', description: 'التقارير المالية والإنجازية' },
  },
  projects: {
    component: ProjectsPage,
    title: 'المشاريع',
    seo: { title: 'المشاريع - رحماء بينهم', description: 'مشاريعنا الخيرية والتنموية' },
  },
  endowment: {
    component: EndowmentPage,
    title: 'الأوقاف',
    seo: { title: 'الأوقاف - رحماء بينهم', description: 'الأوقاف والاستثمار المستدام لدعم المشاريع' },
  },
  login: {
    component: LoginPage,
    title: 'تسجيل الدخول',
    showFooter: false,
  },
  admin: {
    component: AdminPage,
    title: 'لوحة التحكم',
    showFooter: false,
    seo: { title: 'لوحة التحكم - رحماء بينهم', description: 'لوحة تحكم إدارية للمنصة' },
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [adminOpen, setAdminOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  // Performance metrics
  const pageLoadCounter = metrics.createCounter('page.loads', { app: 'rohamaa' });
  const pageLoadHistogram = metrics.createHistogram('page.load.duration', { app: 'rohamaa' });

  // Apply SEO based on current route
  const currentRoute = ROUTES[currentPage];
  useSEO(currentRoute?.seo || { title: 'رحماء بينهم', description: 'منصة إغاثة وتنمية' });

  // Prefetch pages on hover
  const prefetchPage = useCallback((pageName: string) => {
    const moduleMap: Record<string, () => Promise<any>> = {
      home: () => import("./pages/HomePage"),
      about: () => import("./pages/AboutPage"),
      programs: () => import("./pages/ProgramsPage"),
      transparency: () => import("./pages/TransparencyPage"),
      zakat: () => import("./pages/ZakatPage"),
      donate: () => import("./pages/DonatePage"),
      volunteer: () => import("./pages/VolunteerPage"),
      media: () => import("./pages/MediaPage"),
      reports: () => import("./pages/ReportsPage"),
      projects: () => import("./pages/ProjectsPage"),
      endowment: () => import("./pages/EndowmentPage"),
    };
    const loadModule = moduleMap[pageName];
    if (loadModule) loadModule().catch(() => {});
  }, []);

  // Smooth scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Auto-redirect authenticated users
  useEffect(() => {
    if (!isLoading && isAuthenticated && currentPage === 'login') {
      setCurrentPage('home');
      setAdminOpen(true);
    }
  }, [isAuthenticated, isLoading, currentPage]);

  // Track page views
  useEffect(() => {
    pageLoadCounter.increment();
    const startTime = performance.now();
    eventBus.publish(DOMAIN_EVENTS.USER_LOGIN, { page: currentPage, timestamp: Date.now() });
    return () => {
      const duration = performance.now() - startTime;
      pageLoadHistogram.observe(duration);
    };
  }, [currentPage]);

  // Handle page navigation
  const handleSetPage = useCallback((page: string) => {
    const startTime = performance.now();
    setPageLoading(true);
    setCurrentPage(page);
    auditLogger.log('page.navigate', page, true);
    requestAnimationFrame(() => {
      const duration = performance.now() - startTime;
      logger.info('Page navigation', { page, duration: `${duration.toFixed(2)}ms` });
    });
    setTimeout(() => setPageLoading(false), 100);
  }, []);

  const handleSetAdmin = useCallback((open: boolean) => {
    setAdminOpen(open);
    if (open) auditLogger.log('admin.open', 'dashboard', true);
  }, []);

  // Render current page
  const renderPage = useCallback(() => {
    const route = ROUTES[currentPage];
    if (!route) {
      return (
        <PageWrapper>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p className="text-gray-600">الصفحة غير موجودة</p>
            </div>
          </div>
        </PageWrapper>
      );
    }
    const Component = route.component;
    return <PageWrapper><Component setCurrentPage={handleSetPage} /></PageWrapper>;
  }, [currentPage, handleSetPage]);

  const showFooter = currentRoute?.showFooter !== false && currentPage !== "login";

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[var(--background)]" dir="rtl">
        <PageProgress isLoading={pageLoading} />
        <Navbar currentPage={currentPage} setCurrentPage={handleSetPage} setAdminOpen={handleSetAdmin} onHoverPage={prefetchPage} />
        <main className="min-h-screen">{renderPage()}</main>
        {showFooter && <Footer setCurrentPage={handleSetPage} />}
        {adminOpen && (
          <Suspense fallback={<PageLoader />}>
            <AdminDashboard onClose={() => setAdminOpen(false)} />
          </Suspense>
        )}
        <SmartToolbar setCurrentPage={handleSetPage} />
        {import.meta.env.DEV && (
          <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-2">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>Dev Mode</span>
            <Activity className="w-3 h-3 text-green-400" />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}