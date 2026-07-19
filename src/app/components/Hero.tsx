import { Heart, ChevronLeft, Play, ArrowDown, Pause, Volume2, VolumeX, Target, Gift, Award, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";

import { SEED_IMPACT } from "@/content/website";
import { useDynamicContent } from "@/shared/hooks/useDynamicContent";
import { contentBridge } from "@/shared/services/content-bridge.service";

interface HeroProps {
  readonly setCurrentPage: (page: string) => void;
}

// Visitor behavior types for personalized content
type VisitorType = 'donor' | 'partner' | 'beneficiary' | 'general';

// ============================================================
// Quranic Verses & Prophetic Hadiths for animation
// ============================================================
const QURAN_VERSES = [
  {
    arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنۢبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَن يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ",
    surah: "البقرة: ٢٦١",
    translation: "مثل الذين ينفقون أموالهم في سبيل الله كمثل حبة أنبتت سبع سنابل في كل سنبلة مائة حبة",
    theme: "الإنفاق",
  },
  {
    arabic: "إِنَّ الْمُصَّدِّقِينَ وَالْمُصَّدِّقَاتِ وَأَقْرَضُوا اللَّهَ قَرْضًا حَسَنًا يُضَاعَفُ لَهُمْ وَلَهُمْ أَجْرٌ كَرِيمٌ",
    surah: "الحديد: ١٨",
    translation: "إن المصدقين والمصدقات وأقرضوا الله قرضا حسنا يضاعف لهم ولهم أجر كريم",
    theme: "التصدق",
  },
  {
    arabic: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ ۚ وَمَا تُنفِقُوا مِن شَيْءٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ",
    surah: "آل عمران: ٩٢",
    translation: "لن تنالوا البر حتى تنفقوا مما تحبون",
    theme: "الإيثار",
  },
  {
    arabic: "وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا",
    surah: "المائدة: ٣٢",
    translation: "ومن أحياها فكأنما أحيا الناس جميعا",
    theme: "الإحياء",
  },
  {
    arabic: "وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ",
    surah: "سبأ: ٣٩",
    translation: "وما أنفقتم من شيء فهو يخلفه وهو خير الرازقين",
    theme: "الخلف",
  },
  {
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِمَّا رَزَقْنَاكُم مِّن قَبْلِ أَن يَأْتِيَ يَوْمٌ لَّا بَيْعٌ فِيهِ وَلَا خُلَّةٌ وَلَا شَفَاعَةٌ",
    surah: "البقرة: ٢٥٤",
    translation: "يا أيها الذين آمنوا أنفقوا مما رزقناكم من قبل أن يأتي يوم",
    theme: "المسارعة",
  },
];

const PROPHETIC_HADITHS = [
  {
    arabic: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا، نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ",
    narrator: "مسلم",
    theme: "التنفيس",
  },
  {
    arabic: "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ الْوَاحِدِ",
    narrator: "البخاري ومسلم",
    theme: "التراحم",
  },
  {
    arabic: "الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ",
    narrator: "الترمذي",
    theme: "الصدقة",
  },
  {
    arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    narrator: "الطبراني",
    theme: "النفع",
  },
  {
    arabic: "اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ",
    narrator: "البخاري ومسلم",
    theme: "التقوى",
  },
];

// Combine verses and hadiths for the rotation
const ISLAMIC_TEXTS = [
  ...QURAN_VERSES.map(v => ({ type: 'ayah' as const, ...v })),
  ...PROPHETIC_HADITHS.map(h => ({ type: 'hadith' as const, ...h })),
];

// Personalized content for different visitor types
const PERSONALIZED_CONTENT = {
  donor: {
    headline: "ساهمتك تغيّر حياة",
    subheadline: "تبرعك ليس مجرد عطاء، بل هو أنطلاقة لمستقبل أفضل. انضم إلى آلاف المحسنين الذين يصنعون الفارق كل يوم.",
    primaryCTA: { label: "تأثير تبرعاتك", page: "donor-portal", icon: Award },
    secondaryCTA: { label: "تبرع جديد", page: "donate", icon: Heart },
    statsFocus: ['totalDonated', 'beneficiaries', 'projectsCompleted'],
  },
  partner: {
    headline: "شراكتنا لبرامج مستدامة",
    subheadline: "نحن نؤمن بقوة التعاون. شاركنا رسالتك وشاركنا في بناء مستقبل أفضل للمجتمع.",
    primaryCTA: { label: "استراتيجيتنا", page: "about", icon: Target },
    secondaryCTA: { label: "طلب شراكة", page: "partners", icon: Sparkles },
    statsFocus: ['projectsCompleted', 'partners', 'volunteers'],
  },
  beneficiary: {
    headline: "نحن هنا من أجلك",
    subheadline: "تابع مشاريعنا وانضم إلى برامجنا التي تأتي بعون الله وعونك. نحن فخورون بشركتك معنا.",
    primaryCTA: { label: "برامجنا", page: "programs", icon: Gift },
    secondaryCTA: { label: "تقديم طلب", page: "contact", icon: Heart },
    statsFocus: ['beneficiaries', 'projects', 'volunteers'],
  },
  general: {
    headline: "رحماء بينهم... أثرٌ يدوم",
    subheadline: "مؤسسة رحماء بينهم منظمة إنسانية تنموية رائدة، تعمل على تخفيف معاناة الإنسان وتحقيق التنمية المستدامة عبر برامج متكاملة.",
    primaryCTA: { label: "تبرع الآن", page: "donate", icon: Heart },
    secondaryCTA: { label: "تعرف على برامجنا", page: "programs", icon: ChevronLeft },
    statsFocus: ['beneficiaries', 'projects', 'partners'],
  },
} as const;

type PersonalContentType = typeof PERSONALIZED_CONTENT;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.8 + i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

// ============================================================
// Islamic Text Carousel Component
// ============================================================
interface QuranAyah {
  type: 'ayah';
  arabic: string;
  surah: string;
  translation: string;
  theme: string;
}

interface PropheticHadith {
  type: 'hadith';
  arabic: string;
  narrator: string;
  translation?: string;
  theme: string;
}

type IslamicText = QuranAyah | PropheticHadith;

function IslamicTextCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ISLAMIC_TEXTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = ISLAMIC_TEXTS[currentIndex] as IslamicText;
  const surah = (current as QuranAyah).surah;
  const narrator = (current as PropheticHadith).narrator;
  const translation = (current as QuranAyah).translation;

  return (
    <div
      className="absolute inset-0 z-10 flex items-end pb-28 md:pb-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative"
          >
            {/* Decorative line */}
            <div className="absolute -top-4 right-0 w-16 h-0.5 bg-[var(--brand-gold)]/60 rounded-full" />
            <div className="absolute -top-4 right-20 w-8 h-0.5 bg-[var(--brand-gold)]/30 rounded-full" />

            {/* Type badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[var(--brand-gold)]/20 backdrop-blur-sm border border-[var(--brand-gold)]/30 text-[var(--brand-gold-light)] text-xs font-semibold">
                {current.type === 'ayah' ? 'آية قرآنية' : 'حديث نبوي'}
              </span>
              <span className="text-white/50 text-xs">
                {current.type === 'ayah' ? surah : `رواه ${narrator}`}
              </span>
              {isPaused && (
                <button
                  onClick={() => setIsPaused(false)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                  title="استئناف"
                >
                  <Play className="w-3 h-3 text-white" fill="white" />
                </button>
              )}
            </div>

            {/* Arabic Text */}
            <p
              className="text-white leading-relaxed mb-2 font-arabic"
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.8rem)",
                fontWeight: 600,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                lineHeight: 1.9,
                fontFamily: "'Noto Naskh Arabic', 'Traditional Arabic', serif",
              }}
            >
              {current.arabic}
            </p>

            {/* Translation */}
            <p className="text-white/60 text-sm leading-relaxed">
              {translation || current.theme}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================
// Video Background Component
// ============================================================
function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Fallback video sources (multiple format support)
  const videoSources = [
    // Primary - MP4 from public/videos
    '/videos/hero-bg.mp4',
    // Fallback - external MP4
    'https://cdn.sanity.io/files/xd0ohyiz/production/hero-background.mp4',
  ];

  const handleVideoError = () => {
    setVideoError(true);
  };

  if (videoError) {
    return (
      // Animated gradient fallback
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            background: "linear-gradient(135deg, #0a2e1f 0%, #1A5C48 30%, #0d3b2a 60%, #0a2e1f 100%)",
            backgroundSize: '400% 400%',
            animation: 'gradientShift 20s ease infinite',
          }}
        />
        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,215,0,0.03) 40px, rgba(255,215,0,0.03) 41px),
              repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,215,0,0.03) 40px, rgba(255,215,0,0.03) 41px)
            `,
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1656416584402-b720e0d786dc?w=1600&h=900&auto=format&fit=crop&q=80"
        className="w-full h-full object-cover"
        onError={handleVideoError}
        aria-label="فيديو خلفية تعريفي لمؤسسة رحماء بينهم"
      >
        {videoSources.map((src, i) => (
          <source key={i} src={src} type="video/mp4" />
        ))}
        <track kind="captions" src="" label="Arabic" srcLang="ar" />
      </video>

      {/* Dark gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-l from-[var(--brand-green)]/92 via-[var(--brand-green)]/75 to-[var(--brand-ink)]/60" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 pattern-bg opacity-20" />

      {/* Animated light particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
        }} />
        <div className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite reverse',
        }} />
      </div>

      {/* Sound toggle button */}
      <button onClick={toggleMute} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all text-white/70 hover:text-white" title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}>
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      <style>{`
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.1); } }
      `}</style>
    </div>
  );
}

// ============================================================
// Main Hero Component
// ============================================================
export function Hero({ setCurrentPage }: HeroProps) {
  const [metrics, setMetrics] = useState<{
    totalBeneficiaries?: number;
    activeProjects?: number;
    totalPartners?: number;
    totalVolunteers?: number;
  } | null>(null);
  const [contentSource, setContentSource] = useState<'sanity' | 'static'>('static');
  const [showDevBadge, setShowDevBadge] = useState(false);
  const metricsFetched = useRef(false);

  useEffect(() => {
    if (metricsFetched.current) return;
    metricsFetched.current = true;
    
    if (import.meta.env?.DEV) {
      setShowDevBadge(true);
    }
    
    const fallback = {
      totalBeneficiaries: SEED_IMPACT.beneficiaries,
      activeProjects: SEED_IMPACT.projects,
      totalPartners: SEED_IMPACT.partners,
      totalVolunteers: SEED_IMPACT.volunteers,
    };

    const loadMetrics = async () => {
      const result = await contentBridge.getContent<any>('impact');
      const data = result.data[0];
      
      if (result.isDynamic && data) {
        setMetrics({
          totalBeneficiaries: data?.totalBeneficiaries || data?.beneficiaries || fallback.totalBeneficiaries,
          activeProjects: data?.activeProjects || data?.projects || fallback.activeProjects,
          totalPartners: data?.totalPartners || data?.partners || fallback.totalPartners,
          totalVolunteers: data?.totalVolunteers || data?.volunteers || fallback.totalVolunteers,
        });
        setContentSource('sanity');
      } else {
        setMetrics(fallback);
        setContentSource('static');
      }
    };

    loadMetrics();
  }, []);

  const formatStat = (value: number | undefined) =>
    typeof value === "number" ? `+${value.toLocaleString("ar-SA")}` : "...";

  const DevBadge = showDevBadge ? (
    <div className="fixed top-4 left-4 z-50 bg-purple-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${contentSource === 'sanity' ? 'bg-green-400' : 'bg-yellow-400'}`} />
        <span>{contentSource === 'sanity' ? 'Sanity CMS' : 'Static Content'}</span>
      </div>
    </div>
  ) : null;

  const stats = [
    { value: formatStat(metrics?.totalBeneficiaries), label: "مستفيد" },
    { value: formatStat(metrics?.activeProjects), label: "مشروع" },
    { value: formatStat(metrics?.totalPartners), label: "شريك" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ direction: "rtl" }}>
      {DevBadge}
      
      <VideoBackground />
      <IslamicTextCarousel />

      <div className="relative z-20 w-full">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-48 md:pb-56"
          variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="max-w-3xl" variants={itemVariants}>
            <motion.div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-8" variants={itemVariants}>
              <span className="w-2 h-2 rounded-full bg-[var(--brand-gold)] animate-pulse" />
              <span className="text-white/90" style={{ fontSize: "0.8rem" }}>
                منذ عام ١٤٣٠هـ، نحقّق الأثر ونوصل الدعم لكل محتاج
              </span>
            </motion.div>

            <motion.h1 className="text-white mb-6 leading-tight"
              style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)" }} variants={itemVariants}>
              رحماء بينهم...{' '}
              <span className="text-[var(--brand-gold-light)]">أثرٌ يدوم</span>{' '}
              مستقبلٌ{' '}
              <span className="relative inline-block mr-2">
                يُبنى
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-gold)] rounded-full" />
              </span>
            </motion.h1>

            <motion.p className="text-white/85 mb-10 max-w-2xl"
              style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: "1.8" }} variants={itemVariants}>
              مؤسسة رحماء بينهم منظمة إنسانية تنموية رائدة، تعمل على تخفيف معاناة 
              الأسرة وتحقيق التنمية المستدامة عبر برامج متكاملة في الإغاثة والتعليم والتنمية المجتمعية.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4" variants={itemVariants}>
              <button onClick={() => setCurrentPage("donate")}
                className="flex items-center gap-2.5 px-7 py-3.5 bg-[var(--brand-gold)] text-white rounded-xl hover:bg-[var(--brand-gold-light)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontSize: "1rem", fontWeight: 700 }}>
                <Heart className="w-5 h-5" fill="white" />
                تبرع الآن
              </button>
              <button onClick={() => setCurrentPage("programs")}
                className="flex items-center gap-2 px-7 py-3.5 bg-white/15 backdrop-blur-sm text-white border border-white/30 rounded-xl hover:bg-white/25 transition-all"
                style={{ fontSize: "1rem" }}>
                تعرف على برامجنا
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentPage("success")}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                style={{ fontSize: "0.9rem" }}>
                <span className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-white/70 transition-colors">
                  <Play className="w-4 h-4 mr-0.5" fill="white" />
                </span>
                شاهد قصتنا
              </button>
            </motion.div>

            <motion.div className="mt-16 grid grid-cols-3 gap-6 max-w-lg" variants={itemVariants}>
              {stats.map((stat, i) => (
                <motion.div key={stat.label} className="text-center" custom={i}
                  variants={statVariants} initial="hidden" animate="visible">
                  <div className="text-[var(--brand-gold-light)] mb-1" style={{ fontSize: "1.6rem", fontWeight: 800 }}>
                    {stat.value}
                  </div>
                  <div className="text-white/70" style={{ fontSize: "0.75rem" }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span style={{ fontSize: "0.7rem" }}>اكتشف أكثر</span>
        <ArrowDown className="w-4 h-4" />
      </div>

      <style>{`
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.1); } }
      `}</style>
    </section>
  );
}