// Install Prompt Component - تثبيت التطبيق
import { X, Download, Smartphone, Monitor, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useResponsive } from '@/shared/hooks/useResponsive';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
      return;
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or dismissed
  if (isStandalone || isInstalled || localStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  // iOS special prompt
  if (isIOS) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
        <div className="bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-dark)] rounded-2xl p-4 shadow-2xl text-white">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <span className="font-bold">تثبيت التطبيق</span>
            </div>
            <button onClick={handleDismiss} className="p-1 hover:bg-white/20 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm mb-3 opacity-90">
            لتثبيت التطبيق، اضغط على زر المشاركة 
            <span className="inline-block mx-1">📤</span>
            ثم اختر &ldquo;إضافة إلى الشاشة الرئيسية&rdquo;
          </p>
          <div className="flex gap-2">
            <button onClick={handleDismiss} className="flex-1 py-2 bg-white/20 rounded-lg text-sm">
              لاحقاً
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-dark)] rounded-2xl p-4 shadow-2xl text-white">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            <span className="font-bold">تثبيت تطبيق رحماء بينهم</span>
          </div>
          <button onClick={handleDismiss} className="p-1 hover:bg-white/20 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm mb-3 opacity-90">
          قم بتثبيت التطبيق على جهازك للوصول السريع والعمل دون اتصال
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 py-3 bg-white text-[var(--brand-green)] rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            تثبيت التطبيق
          </button>
          <button onClick={handleDismiss} className="px-4 py-3 bg-white/20 rounded-xl text-sm">
            لاحقاً
          </button>
        </div>
      </div>
    </div>
  );
}

// Detect PWA mode hook
export function usePWA() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isStandalone, isOnline };
}