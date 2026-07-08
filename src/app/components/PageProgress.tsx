// ============================================================
// PageProgress - Professional loading progress indicator with splash screen
// ============================================================
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface PageProgressProps {
  isLoading?: boolean;
}

export function PageProgress({ isLoading = false }: PageProgressProps) {
  const [progress, setProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  // Simulate loading progress
  useEffect(() => {
    if (isLoading) {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
        }
        setProgress(Math.min(currentProgress, 100));
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  // Auto-hide splash after loading
  useEffect(() => {
    if (!isLoading && showSplash) {
      const timer = setTimeout(() => setShowSplash(false), 500);
      return () => clearTimeout(timer);
    }
    if (isLoading) {
      setShowSplash(true);
    }
  }, [isLoading, showSplash]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-gradient-to-br from-[var(--brand-green)] via-[var(--brand-green-light)] to-[var(--brand-gold)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Progress bar at top */}
          <div className="fixed top-0 left-0 right-0 z-[300] pointer-events-none">
            <div className="h-1 bg-white/20">
              <motion.div
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                }}
              />
            </div>
          </div>

          {/* Splash Content */}
          <div className="text-center text-white px-6">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" fill="white" />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-2"
            >
              رحماء بينهم
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl opacity-90 mb-8"
            >
              منصة إغاثة وتنمية خيرية
            </motion.p>

            {/* Loading Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Spinner */}
              <div className="relative w-16 h-16 mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full border-3 border-white/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-3 border-white border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Progress Text */}
              <div className="space-y-2">
                <p className="text-sm opacity-80">
                  {progress < 30 && "جاري تحميل المنصة..."}
                  {progress >= 30 && progress < 60 && "تحضير المحتوى..."}
                  {progress >= 60 && progress < 90 && "تحميل البيانات..."}
                  {progress >= 90 && "اقتربت من الانتهاء..."}
                </p>
                
                <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                
                <p className="text-xs opacity-60">{Math.round(progress)}%</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Inline progress bar for sections
export function InlineProgress({ progress = 0, label }: { progress?: number; label?: string }) {
  return (
    <div className="w-full space-y-1">
      {label && (
        <div className="flex justify-between">
          <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{label}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-green)' }}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className="relative w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-gold)]"
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Skeleton for cards with shimmer effect
export function ShimmerCard() {
  return (
    <div className="bg-white rounded-xl p-5 border border-[var(--border)] space-y-3">
      <div className="flex items-start justify-between">
        <motion.div
          className="w-10 h-10 bg-[var(--muted)] rounded-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="w-16 h-6 bg-[var(--muted)] rounded"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        />
      </div>
      <motion.div
        className="w-3/5 h-6 bg-[var(--muted)] rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-4/5 h-4 bg-[var(--muted)] rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
    </div>
  );
}