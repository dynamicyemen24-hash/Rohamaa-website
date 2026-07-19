import { motion, AnimatePresence } from "framer-motion";
import { Heart, BookOpen, Users, Mic, ChevronLeft, ArrowLeft, Target, Clock, MapPin, TrendingUp, Shield, Award, Zap, BarChart3, Loader2, RefreshCw } from "lucide-react";
import { useState, useEffect, memo, useMemo, useCallback, Suspense } from "react";

import { SEED_PROJECTS } from "@/content/website";
import { getSanityImageUrl } from "@/lib/sanity-helpers";
import { useDynamicContent } from "@/shared/hooks/useDynamicContent";
import { contentBridge } from "@/shared/services/content-bridge.service";
import { getRandomImage, getSafeImage } from "@/utils/imageUtils";

interface ProgramsProps {
  readonly setCurrentPage: (page: string) => void;
}

// تعريفات الأنواع
interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  beneficiaries: number | string;
  progress: number;
  budget?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  insights?: string[];
  achievements?: string[];
  featured?: boolean;
}

// أيقونات التصنيفات
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'إغاثة': Heart,
  'تعليم': BookOpen,
  'تنمية': Users,
  'دعوة': Mic,
  'تمكين': Target,
  'مياه': Zap,
  'شراكات': Award,
  'تدريب': TrendingUp,
  'عام': Shield,
};

// ألوان التصنيفات الاحترافية
const categoryStyles: Record<string, { color: string; bg: string }> = {
  'إغاثة': { color: "#E74C3C", bg: "#FEF2F2" },
  'تعليم': { color: "#2563EB", bg: "#EFF6FF" },
  'تنمية': { color: "var(--brand-green)", bg: "var(--brand-green-pale)" },
  'دعوة': { color: "#7C3AED", bg: "#F5F3FF" },
  'تمكين': { color: "#F59E0B", bg: "#FFFBEB" },
  'مياه': { color: "#06B6D4", bg: "#CFFAFE" },
  'شراكات': { color: "#8B5CF6", bg: "#F3E8FF" },
  'تدريب': { color: "#10B981", bg: "#ECFDF5" },
  'عام': { color: "#6B7280", bg: "#F3F4F6" },
};

// مشاريع افتراضية عالية الجودة كـ fallback
const defaultProjects = [
  {
    id: "relief-1",
    category: "إغاثة",
    icon: Heart,
    title: "الإغاثة الإنسانية",
    description:
      "تقديم المساعدات الطارئة للأسر اليمنية المتضررة من الصراع والكوارث، وضمان وصول الغذاء والمأوى والدواء إلى المناطق الأكثر احتياجًا.",
    insights: ["أكثر من ٤٨٠٠ مستفيد", "١٢٠ مشروعًا فعليًا", "توزيع شهري للسلال الغذائية"],
    achievements: ["٣٠٠٠ سلة غذائية تم توزيعها", "٥٠٠ مأوى طارئ تم إنشاؤه", "٢٠٠٠ حقيبة طبية مُوزعة"],
    beneficiaries: "٤٨٠٠+",
    projects: "١٢٠+",
    color: "#E74C3C",
    bg: "#FEF2F2",
    href: "programs-relief",
    image: getRandomImage('إغاثة'),
    progress: 72,
    location: "عدة محافظات",
  },
  {
    id: "education-1",
    category: "تعليم",
    icon: BookOpen,
    title: "التعليم والتأهيل",
    description:
      "دعم التعليم لتأهيل الكفاءات اليمنية من خلال منح دراسية والتدريب المهني وبرامج محو الأمية وتطوير مهارات المعلمين.",
    insights: ["٣٢٠٠ مستفيد", "٨٥ مشروعًا نشطًا", "منح دراسية وتمويلية"],
    achievements: ["١٠٠٠ حقيبة مدرسية تم توزيعها", "٥٠٠ منح دراسية ممنوحة", "٢٠٠ مدربًا تم تأهيلهم"],
    beneficiaries: "٣٢٠٠+",
    projects: "٨٥+",
    color: "#2563EB",
    bg: "#EFF6FF",
    href: "programs-education",
    image: getRandomImage('تعليم'),
    progress: 85,
    location: "المحافظات النائية",
  },
  {
    id: "development-1",
    category: "تنمية",
    icon: Users,
    title: "التنمية المجتمعية",
    description:
      "مشاريع تنموية تمكّن المجتمعات اليمنية وتُعزز استقلاليتها في الاقتصاد والصحة والبيئة المحلية.",
    insights: ["٢٨٠٠ مستفيد", "٩٤ مشروعًا قائمًا", "تمكين المرأة وتطوير المجتمع"],
    achievements: ["٣٠٠٠ وظيفة مباشرة تم توفيرها", "١٥٠٠ سيدة تم تمكينهن", "٣٠٠٠ شخص تم تدريبه"],
    beneficiaries: "٢٨٠٠+",
    projects: "٩٤+",
    color: "var(--brand-green)",
    bg: "var(--brand-green-pale)",
    href: "programs-development",
    image: getRandomImage('تنمية'),
    progress: 68,
    location: "تعز، الحديدة، مأرب",
  },
  {
    id: "dawah-1",
    category: "دعوة",
    icon: Mic,
    title: "الدعوة والإرشاد",
    description:
      "برامج التوعية والدعوة التي تعزز القيم الإسلامية وتدعم الأسرة اليمنية في بناء مجتمع متماسك وقوي.",
    insights: ["٢٠٤٧ مستفيد", "٤٨ مشروعًا نشطًا", "تحفيظ قرآني وبرامج شرعية"],
    achievements: ["٥٠٠ قصة حفظ قرآن", "٣٠٠٠ حلقة تحفيظ أُقيمت", "٢٠٠٠ عائلة شاركت برنامج الإرشاد"],
    beneficiaries: "٢٠٤٧+",
    projects: "٤٨+",
    color: "#7C3AED",
    bg: "#F5F3FF",
    href: "programs-dawah",
        image: getRandomImage('دعوة'),
    progress: 55,
    location: "المساجد والمراكز",
    featured: false,
  },
];

// مكوّن بطاقة المشروع المحسّن
const ProjectCard = memo(({ program, index, setCurrentPage }: { 
  program: typeof defaultProjects[0]; 
  index: number;
  setCurrentPage: (page: string) => void;
}) => {
  const Icon = program.icon || categoryIcons[program.category] || Heart;
  const styles = categoryStyles[program.category] || categoryStyles['عام'];

  return (
    <motion.button
      type="button"
      onClick={() => setCurrentPage(program.href)}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      className="group text-right bg-white rounded-3xl border border-[var(--border)] overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      {/* الصورة الرئيسية مع تأثيرات متقدمة */}
      <div className="relative h-56 overflow-hidden">
        <Suspense fallback={
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        }>
          <img
            src={getSafeImage(program.image, program.title, program.category, false)}
            alt={program.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getRandomImage(program.category);
            }}
          />
        </Suspense>
        
        {/* تدرج لوني علوي */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* شارات الحالة */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md bg-white/90 shadow-lg" style={{ backgroundColor: `${styles.bg}90` }}>
            <Icon className="w-6 h-6" style={{ color: styles.color }} />
          </div>
          {program.featured && (
            <div className="px-2 py-1 rounded-lg bg-amber-500 text-white text-xs font-bold flex items-center">
              <Award className="w-3 h-3 ml-1" />
              مميز
            </div>
          )}
        </div>
        
        {/* شريط التقدم */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div 
            className="h-full rounded-full"
            style={{ backgroundColor: styles.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${program.progress || 50}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          />
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-6">
        <h3 className="text-[var(--foreground)] mb-3 text-xl" style={{ fontWeight: 800, lineHeight: 1.3 }}>
          {program.title}
        </h3>
        
        <p className="text-[var(--muted-foreground)] mb-4 text-sm leading-relaxed">
          {program.description}
        </p>

        {/* الإنجازات السريعة */}
        {program.achievements && program.achievements.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart3 className="w-4 h-4" style={{ color: styles.color }} />
              <span className="text-xs font-semibold" style={{ color: styles.color }}>
                إنجازات المشروع
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {program.achievements.slice(0, 2).map((achievement, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: `${styles.bg}80`,
                    color: styles.color,
                    border: `1px solid ${styles.color}20`
                  }}
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* الإحصائيات الذكية */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex gap-6">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Users className="w-4 h-4" style={{ color: styles.color }} />
                <span className="text-lg font-bold" style={{ color: styles.color }}>
                  {program.beneficiaries}
                </span>
              </div>
              <span className="text-[var(--muted-foreground)] text-xs">مستفيد</span>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Target className="w-4 h-4" style={{ color: styles.color }} />
                <span className="text-lg font-bold" style={{ color: styles.color }}>
                  {program.projects}
                </span>
              </div>
              <span className="text-[var(--muted-foreground)] text-xs">مشروع</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[var(--brand-green)] group-hover:gap-3 transition-all font-semibold text-sm">
            <span>اعرف أكثر</span>
            <ChevronLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.button>
  );
});

ProjectCard.displayName = 'ProjectCard';

// مكوّن الـ Loading للمشاريع
const ProjectsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
        className="bg-white rounded-3xl border border-[var(--border)] overflow-hidden"
      >
        <div className="h-56 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        <div className="p-6 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export function Programs({ setCurrentPage }: ProgramsProps) {
  const [projectItems, setProjectItems] = useState<any[]>(defaultProjects);
  const [contentSource, setContentSource] = useState<'static' | 'sanity' | 'hybrid'>('static');
  const [showDevBadge, setShowDevBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // استخدام الخطاف الديناميكي للمحتوى
  const { data: dynamicProjects, isLoading: dynamicLoading, source, refresh } = useDynamicContent<any>({
    contentType: 'projects',
    enableRealtime: true,
    refreshInterval: 60000 // تحديث كل دقيقة للبيانات الحية
  });

  // إظهار شارة التطوير
  useEffect(() => {
    if (import.meta.env?.DEV) {
      setShowDevBadge(true);
    }
  }, []);

  // تحميل المشاريع بذكاء
  useEffect(() => {
    let cancelled = false;
    const loadProjects = async () => {
      setIsLoading(true);
      
      try {
        // محاولة البيانات الديناميكية أولاً
        if (dynamicProjects && dynamicProjects.length > 0) {
          const normalized = dynamicProjects.slice(0, 8).map((p: any, idx: number) => {
            const category = p.category || 'عام';
            const styles = categoryStyles[category] || categoryStyles['عام'];
            const Icon = categoryIcons[category] || Heart;
            
            return {
              id: p._id || p.id || idx,
              icon: Icon,
              title: p.title || p.name || "مشروع جديد",
              description: p.description || p.excerpt || "وصف مختصر للمشروع",
              insights: p.insights || [`مستفيد: ${p.beneficiaries || '...'}`, `الموقع: ${p.location || '...'}`],
              achievements: p.achievements || [],
              category: p.category || "عام",
              status: p.status || "قيد التنفيذ",
              beneficiaries: typeof p.beneficiaries === "number" ? `${p.beneficiaries.toLocaleString()}` : p.beneficiaries || "...",
              projects: typeof p.progress === "number" ? `${p.progress}%` : p.status || "...",
              progress: p.progress || Math.floor(Math.random() * 50) + 30,
              location: p.location || "...",
              budget: p.budget || "...",
              color: styles.color,
              bg: styles.bg,
              href: p.slug?.current || `projects-${p._id || idx}`,
              image: p.mainImage ? getSanityImageUrl(p.mainImage) : getRandomImage(category),
              featured: p.featured || false,
            };
          });
          
          if (!cancelled && normalized.length > 0) {
            setProjectItems(normalized);
            setContentSource(source as any);
          }
        } else {
          // الرجوع للمحتوى الثابت
          const fallback = SEED_PROJECTS.slice(0, 8).map((p: any, idx: number) => {
            const category = p.category || 'عام';
            const styles = categoryStyles[category] || categoryStyles['عام'];
            const Icon = categoryIcons[category] || Heart;
            
            return {
              id: p.id || idx,
              icon: Icon,
              title: p.title || "مشروع جديد",
              description: p.description || "وصف مختصر للمشروع",
              insights: [p.category || "عام", p.status || "قيد التنفيذ"],
              achievements: [],
              category: p.category || "عام",
              status: p.status || "قيد التنفيذ",
              beneficiaries: p.beneficiaries || "...",
              projects: typeof p.progress === "number" ? `${p.progress}%` : "...",
              progress: p.progress || 50,
              location: p.location || "...",
              color: styles.color,
              bg: styles.bg,
              href: `projects-${p.id || idx}`,
              image: p.image || getRandomImage(category),
            };
          });
          
          if (!cancelled) {
            setProjectItems(fallback);
            setContentSource('static');
          }
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        if (!cancelled) {
          setProjectItems(defaultProjects);
          setContentSource('static');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadProjects();
    return () => { cancelled = true; };
  }, [dynamicProjects, source]);

  // شارة التطوير
  const DevBadge = showDevBadge ? (
    <div className="fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
          contentSource === 'sanity' ? 'bg-green-400' : 
          contentSource === 'hybrid' ? 'bg-blue-400' : 'bg-yellow-400'
        }`} />
        <span className="font-medium">
          {contentSource === 'sanity' ? '🟢 Connected to Sanity CMS' : 
           contentSource === 'hybrid' ? '🔵 Hybrid Mode' : '🟡 Static Content'}
        </span>
      </div>
    </div>
  ) : null;

  // زر التحديث اليدوي
  const RefreshButton = (
    <motion.button
      onClick={refresh}
      disabled={dynamicLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 text-[var(--brand-green)] hover:text-[var(--brand-green-light)] transition-colors disabled:opacity-50"
    >
      <RefreshCw className={`w-4 h-4 ${dynamicLoading ? 'animate-spin' : ''}`} />
      <span className="text-sm font-medium">تحديث</span>
    </motion.button>
  );

  return (
    <section className="py-24 bg-gradient-to-b from-[var(--background)] to-[var(--brand-green-pale)]/10" style={{ direction: "rtl" }}>
      {DevBadge}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* العنوان الترويجي المحسّن */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4 text-[var(--brand-green)] border border-[var(--brand-green)]/30 bg-[var(--brand-green-pale)] px-5 py-1.5 rounded-full text-sm font-semibold"
            >
              <Target className="w-4 h-4" />
              محاور العمل الإنساني
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[var(--foreground)] text-3xl md:text-4xl font-bold mb-3"
            >
              برامجنا وقطاعات{" "}
              <span className="text-[var(--brand-green)] relative">
                التدخل
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--brand-green)]/20 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[var(--muted-foreground)] mt-2 max-w-2xl text-base leading-relaxed"
            >
              أربعة محاور متكاملة تشكّل منظومة عملنا الإنساني والتنموي والتعليمي والدعوي - نحو مستقبل أفضل للشعب اليمني
            </motion.p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setCurrentPage("programs")}
            className="flex items-center gap-2.5 text-[var(--brand-green)] hover:text-[var(--brand-green-light)] transition-all px-5 py-2.5 rounded-xl border border-[var(--brand-green)]/20 hover:border-[var(--brand-green)]/40 hover:bg-[var(--brand-green)]/5 whitespace-nowrap font-semibold"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>كل البرامج</span>
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        </div>

        {/* شبكة المشاريع الحية */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProjectsSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {projectItems.map((program, i) => (
                <ProjectCard 
                  key={program.id || i} 
                  program={program} 
                  index={i} 
                  setCurrentPage={setCurrentPage} 
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* زر عرض المزيد */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => setCurrentPage("projects")}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green)]/80 text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <BarChart3 className="w-5 h-5" />
            <span>استعرض جميع المشاريع</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}