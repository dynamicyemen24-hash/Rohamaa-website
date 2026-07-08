import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Component, ReactNode } from 'react';

import { errorTracker } from '@/utils/errorTracking';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    errorTracker.captureException(error, {
      componentStack: errorInfo.componentStack,
      boundary: 'ErrorBoundary',
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]" style={{ direction: "rtl" }}>
          <div className="text-center p-8">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-[var(--foreground)] mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              حدث خطأ غير متوقع
            </h2>
            <p className="text-[var(--muted-foreground)] mb-6 max-w-md">
              نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو الاتصال بفريق الدعم إذا استمرت المشكلة.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--brand-green)] text-white rounded-xl hover:bg-[var(--brand-green-light)] transition-colors mx-auto"
              style={{ fontWeight: 600 }}
            >
              <RefreshCw className="w-4 h-4" />
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}