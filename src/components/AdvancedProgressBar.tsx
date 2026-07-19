// Advanced Progress Bar with Smart Loading Messages and Ayah
import { motion, AnimatePresence, useScroll, useSpring as useFramerSpring } from 'framer-motion';
import { Sparkles, Zap, Award, TrendingUp, Heart } from 'lucide-react';
import { useMemo, useCallback } from 'react';

interface AyahVerse {
  text: string;
  surah: string;
  icon: React.ElementType;
}

interface AdvancedProgressBarProps {
  readonly percentage: number | { get: () => number };
  readonly message: string;
  readonly isComplete: boolean;
  readonly isReady: boolean;
  readonly showAyah?: boolean;
}

// Beautiful Quranic verses for loading - Immutable constant
const AYAH_VERSES: readonly AyahVerse[] = [
  { text: 'وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا', surah: 'المائدة (٣٢)', icon: Heart },
  { text: 'وَمَن تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ', surah: 'البقرة (١٥٨)', icon: Award },
  { text: 'إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ', surah: 'هود (١١٥)', icon: Zap },
  { text: 'وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ', surah: 'المزّمّل (٢٠)', icon: TrendingUp },
  { text: 'وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ', surah: 'مسلم', icon: Sparkles },
] as const;

// Motion variants for smooth animations
const MOTION_VARIANTS = {
  bar: {
    initial: { width: '0%' },
    animate: ({ width }: { width: string }) => ({ width }),
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  container: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  },
  spinner: {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: 'linear' as const },
  },
} as const;

/**
 * Secure random index generator using Web Crypto API
 * Returns cryptographically secure random number with fallback
 */
function getSecureRandomIndex(length: number): number {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % length;
  }
  // Fallback for non-browser environments
  return Math.floor(Math.random() * length);
}

/**
 * Extracts numeric progress value from flexible input types
 * Supports both native numbers and framer-motion MotionValue-like objects
 * Implements value clamping for robustness (0-100 range)
 * 
 * @param percentage - Input value (number or object with .get() method)
 * @param isReady - Whether the loading is complete
 * @returns Normalized progress percentage (0-100)
 */
function extractProgress(percentage: number | { get: () => number }, isReady: boolean): number {
  if (isReady) return 100;
  
  // Type guard for MotionValue-like objects
  if (typeof percentage === 'object' && percentage !== null && 'get' in percentage) {
    const value = percentage.get();
    return Math.max(0, Math.min(100, value)); // Clamp between 0-100
  }
  
  if (typeof percentage === 'number') {
    return Math.max(0, Math.min(100, percentage));
  }
  
  return 0;
}

export default function AdvancedProgressBar({
  percentage,
  message,
  isComplete,
  isReady,
  showAyah = true
}: AdvancedProgressBarProps) {
  // Memoized ayah selection for stable rendering
  const ayah = useMemo(() => AYAH_VERSES[getSecureRandomIndex(AYAH_VERSES.length)], []);
  const AyahIcon = ayah.icon;
  
  // Extract and normalize progress value
  const progressPercent = extractProgress(percentage, isReady);
  
  // Memoized width string to prevent unnecessary recalculations
  const progressWidth = useMemo(() => `${progressPercent}%`, [progressPercent]);

  // Shimmer animation keyframes
  const shimmerAnimation = useCallback(() => ({
    x: ['-100%', '400%'],
    transition: { duration: 2, repeat: Infinity, ease: 'linear' as const },
  }), []);

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          {...MOTION_VARIANTS.container}
          className="fixed top-0 left-0 right-0 z-[9999]"
          dir="rtl"
        >
          <div className="bg-gradient-to-r from-[var(--brand-green)]/95 via-[var(--brand-green-dark)]/95 to-[var(--brand-green)]/95 backdrop-blur-xl shadow-2xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div {...MOTION_VARIANTS.spinner}>
                        <motion.div
                          className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                          {...MOTION_VARIANTS.spinner}
                        />
                      </motion.div>
                      <span className="text-white/90 text-sm font-medium">{message}</span>
                    </div>
                    <span className="text-white/80 text-sm font-bold tabular-nums">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>

                  <div className="relative h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--brand-gold)] via-white to-[var(--brand-gold)] rounded-full"
                      style={{ width: progressWidth }}
                      {...MOTION_VARIANTS.bar.animate({ width: progressWidth })}
                      transition={MOTION_VARIANTS.bar.transition}
                    />
                    <motion.div
                      className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={shimmerAnimation()}
                    />
                  </div>
                </div>

                {showAyah && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="hidden md:block text-right max-w-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-gold)]/20 flex items-center justify-center flex-shrink-0">
                        <AyahIcon className="w-4 h-4 text-[var(--brand-gold-light)]" />
                      </div>
                      <div>
                        <p className="text-white/90 text-sm leading-relaxed font-arabic">
                          {ayah.text}
                        </p>
                        <p className="text-white/50 text-xs mt-1">
                          {ayah.surah}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Scroll-based reading progress indicator
export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useFramerSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-1" dir="ltr">
      <motion.div
        className="h-full bg-gradient-to-r from-[var(--brand-green)] via-[var(--brand-gold)] to-[var(--brand-green)]"
        style={{
          scaleX: smoothProgress,
          transformOrigin: 'left center',
        }}
      />
    </div>
  );
}