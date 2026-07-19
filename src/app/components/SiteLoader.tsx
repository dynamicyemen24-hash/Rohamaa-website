// Site Loader - موجه الموقع الاحترافي مع الرسائل الترحيبية ومؤشر التقدم الذكي
// Professional Site Loader with Welcome Messages and Smart Progress
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Shield, CheckCircle2, Zap, Video } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SiteLoaderProps {
  onComplete: () => void;
}

// رسائل الترحيب المتقدمة
const WELCOME_MESSAGES = [
  { text: 'مرحباً بك في مؤسسة رحماء بينهم الخيرية', icon: Heart, color: '#10B981' },
  { text: 'نحملك رحابة الخير والعطاء', icon: Sparkles, color: '#F59E0B' },
  { text: 'حملة دعوية إنسانية تنموية منذ 2014', icon: Shield, color: '#3B82F6' },
  { text: 'فيديو تعريفي يروي قصة أثرنا', icon: Video, color: '#10B981' },
  { text: 'جاري التحضير لتجربة مميزة...', icon: Zap, color: '#8B5CF6' },
];

export function SiteLoader({ onComplete }: SiteLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showLogoVideo, setShowLogoVideo] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 18;
        
        // تغيير الرسالة كل 20%
        if (newProgress >= (currentStep + 1) * 20 && currentStep < WELCOME_MESSAGES.length - 1) {
          setCurrentStep(step => Math.min(step + 1, WELCOME_MESSAGES.length - 1));
        }
        
        // إظهار فيديو الشعار عند الخطوة الرابعة
        if (newProgress >= 80) {
          setShowLogoVideo(true);
        }
        
        // إكمال التحميل
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 600);
        }
        
        return Math.min(newProgress, 100);
      });
    }, 250);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  const currentMessage = WELCOME_MESSAGES[currentStep];
  const Icon = currentMessage.icon;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0a2e1f 0%, #1A5C48 30%, #0d3b2a 60%, #0a2e1f 100%)',
            backgroundSize: '400% 400%',
          }}
        >
          {/* خلفية متحركة */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255,215,0,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(16,185,129,0.1) 0%, transparent 50%)
              `,
            }}
          />
          
          <div className="text-center max-w-lg mx-auto px-6 z-10" dir="rtl">
            {/* شعار المؤسسة مع فيديو تحفيزي */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
              className="relative w-32 h-32 mx-auto mb-10"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                <Heart className="w-16 h-16 text-white animate-pulse" fill="white" />
              </div>
              
              {/* تأثير الضوء المتحرك */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[var(--brand-gold)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-4 rounded-full border border-[var(--brand-gold)]/30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* الرسالة الحالية */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <Icon 
                  className="w-8 h-8" 
                  style={{ color: currentMessage.color }}
                />
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                  {currentMessage.text}
                </h2>
              </div>
            </motion.div>

            {/* شريط التقدم الذكي */}
            <div className="relative mb-8">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ 
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--brand-gold), var(--brand-green), var(--brand-gold))',
                    boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {/* توهج متحرك */}
                  <motion.div
                    className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '400%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-white/70 text-sm font-medium">
                <span>جاري التحميل...</span>
                <span className="tabular-nums">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* نقاط التحميل المحسنة */}
            <div className="flex justify-center gap-3 mb-8">
              {WELCOME_MESSAGES.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-[var(--brand-gold)] w-12 scale-125' 
                      : index < currentStep 
                        ? 'bg-emerald-400' 
                        : 'bg-white/20'
                  }`}
                  animate={index === currentStep ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))}
            </div>

            {/* رسالة ترحيبية إضافية */}
<motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/50 text-sm italic"
            >
              وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا - الآية الكربلائية
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}