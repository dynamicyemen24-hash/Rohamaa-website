/**
 * MediaPage - صفحة الوسائط المتكاملة
 * Professional Media Gallery Page
 * 
 * Uses the new ProfessionalMediaViewer component
 */

import { lazy, Suspense } from "react";

// Lazy load the professional media viewer for better performance
const ProfessionalMediaViewer = lazy(() => 
  import("@/app/components/MediaViewer").then(m => ({ 
    default: m.ProfessionalMediaViewer 
  }))
);

// Loading component
function MediaPageLoader() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-[var(--background)]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--muted-foreground)] text-sm">جاري تحميل المكتبة المرئية...</p>
      </div>
    </div>
  );
}

// Main component
export default function MediaPage() {
  return (
    <Suspense fallback={<MediaPageLoader />}>
      <ProfessionalMediaViewer
        options={{
          autoPlay: false,
          showSidebar: true,
          sidebarViewMode: 'expanded',
          theme: 'charity',
          enableKeyboardNav: true,
          enableMouseWheel: true,
          enableSwipe: true,
        }}
      />
    </Suspense>
  );
}