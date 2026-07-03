// ============================================================
// PageProgress - Professional loading progress indicator
// ============================================================
import { motion } from 'motion/react';

interface PageProgressProps {
  isLoading?: boolean;
}

export function PageProgress({ isLoading = false }: PageProgressProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[300] pointer-events-none">
      {/* Progress bar */}
      <div className="h-1 bg-[var(--brand-green-pale)]/30">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-gold)]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            boxShadow: '0 0 10px var(--brand-green), 0 0 20px var(--brand-green)',
          }}
        />
      </div>

      {/* Loading overlay */}
      <motion.div
        className="fixed inset-0 bg-white/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 299 }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            {/* Animated spinner */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-[var(--brand-green)] border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-4 border-[var(--brand-gold)] border-b-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Inner circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-[var(--brand-green)]"
                />
              </div>
            </div>

            {/* Loading text */}
            <motion.p
              className="text-[var(--foreground)] font-bold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '1rem' }}
            >
              جاري تحميل المنصة...
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
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