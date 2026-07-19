// About Page - من نحن - النسخة الاحترافية الفائقة
import { motion } from 'framer-motion';
import { 
  Users, Award, Globe, Heart, Target, BookOpen, HandHeart, 
  Star, Shield, Sparkles, Quote, Compass,
  TrendingUp, Clock, BadgeCheck,
  Mail, Phone, Facebook, Twitter, Instagram, Youtube,
  Calendar, CheckCircle2,
  GitCommit, Gem, Crown, Layers
} from 'lucide-react';
import { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSEO } from '@/utils/seoAdvanced';

export default function AboutPage() {
  useSEO({
    title: 'من نحن - رحماء بينهم',
    description: 'تعرف على حملة رحماء بينهم الخيرية وإنجازاتها منذ 2014',
  });

  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Pre-generated particle data (static values for consistent rendering)
  const particleData = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: ((i * 37) % 1000),
    y: ((i * 53) % 800),
    duration: 5 + (i % 10),
    delay: (i % 5) * 0.5,
  })), []);

  // النصوص المحفوظة كما هي
  const aboutText = "حملة \"رحماء بينهم\" الخيرية؛ حملة دعوية، إنسانية، وتنموية انطلقت عام 2014م استجابةً للأزمة اليمنية ومعاناة المواطن الإنسانية. ومنذ انطلاقها، تسعى الحملة – بدعم أهل الخير – إلى صون حياة الإنسان وإغاثته عبر برامج علمية وإغاثية متنوعة، مستهدفةً المحافظات والمناطق اليمنية الأشد تضرراً ومأساة، انطلقاً من واجبها الشرعي والإنساني.";

  const supervisorMessage = `إنه لمن دواعي سرورنا اليوم وبعد ما يقارب عشرة أعوام من العطاء المستمر والجهود الدؤوبة، وبما يتوافق مع رؤيتنا وأهدافنا، يطيب لنا أن نقف شاكرين لله تعالى، وممتنين لكل صاحب يد سخية وجهد مبارك رسمنا سويا بصمات شريفة وأثرا حميدا، مما جعل حملة رحماء بينهم تحقق نجاحات مبهرة في مجالات متنوعة على مساحات واسعة، عبر ما يزيد عقد من الزمن.

فشكرًا لكل داعمٍ ومحسن، وشكرًا لكل عاملٍ وداعية، وشكرًا لكل من جعل العطاء هويته ورسالة حياته.`;

  const partnersText = `"إلى أولئك الأخفياء الأتقياء الأصفياء، والذين ما كان لنا أن نحقق شيئاً من مشاريعنا، مؤمنين أن ما تعلّم متعلّم ولا حفظ حافظ ولا طعِم جائع ولا ارتوى ظامئ ولا اكتسى عارٍ ولا ارتسمت على محيّا حزين بسمة وكُفّت عنه دمعة إلا بفضل الله ثم بفضل الراغبين فيما عند الكريم، مَن يرون أن إصلاح المسلمين والإحسان إليهم مطلباً ربانياً ومسؤولية مجتمعية وواجباً قيمياً وأخلاقياً."`;

  // المؤشرات الإحصائية
  const stats = [
    { label: 'سنوات العطاء', value: '10+', icon: Clock },
    { label: 'مشروع منفذ', value: '500+', icon: Target },
    { label: 'مستفيد', value: '50K+', icon: Users },
    { label: 'متطوع', value: '200+', icon: HandHeart },
  ];

  // أقسام الصفحة للتنقل السريع
  const sections = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'definition', label: 'تعريف' },
    { id: 'supervisor', label: 'كلمة المشرف' },
    { id: 'identity', label: 'هوية' },
    { id: 'goals', label: 'أهدافنا' },
    { id: 'beneficiaries', label: 'المستفيدون' },
    { id: 'partners', label: 'الشركاء' },
  ];

  const handleSocialClick = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: 'https://facebook.com/rohamaa',
      twitter: 'https://twitter.com/rohamaa',
      instagram: 'https://instagram.com/rohamaa',
      youtube: 'https://youtube.com/@rohamaa',
    };
    window.open(urls[platform] || '/contact', '_blank');
  };

  const handleQuickLink = (href: string) => {
    navigate('/' + href);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--secondary)] pt-20" dir="rtl">
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/20 via-[#10B981]/5 to-[var(--secondary)]" />
        
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#10B981] rounded-full blur-3xl opacity-10"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: -1 }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#10B981] rounded-full blur-3xl opacity-10"
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: -1 }}
          />
          
           {particleData.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1.5 h-1.5 bg-[#10B981]/30 rounded-full"
                initial={{ 
                  x: particle.x,
                  y: particle.y,
                  scale: 0
                }}
                animate={{ 
                  y: [null, -200],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: particle.duration,
                  repeat: -1,
                  delay: particle.delay
                }}
              />
            ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#10B981]/20 px-5 py-2 rounded-full mb-8 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-4 h-4 text-[#10B981] animate-pulse" />
                <span className="text-[#10B981] text-sm font-medium">مؤسسة رحماء بينهم الخيرية</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="text-[#10B981] text-sm">منذ 2014</span>
              </motion.div>

              <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="text-[var(--foreground)]">من</span>
                <span className="text-[#10B981] bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent"> نحن</span>
              </motion.h1>

              <motion.div 
                className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#10B981] to-transparent mx-auto mb-8 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />

              <motion.p 
                className="text-2xl md:text-4xl text-[var(--muted-foreground)] font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                رحماء بينهم
                <span className="text-[#10B981] font-semibold block md:inline"> - تضامن إنساني وتنموي متكامل</span>
              </motion.p>

              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[var(--border)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <stat.icon className="w-6 h-6 text-[#10B981] mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* تعريف بالحملة */}
      <section id="definition" className="relative py-24 bg-white">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 text-[#10B981] text-sm font-semibold bg-[#10B981]/10 px-5 py-2 rounded-full mb-4">
                <Gem className="w-4 h-4" />
                نبذة عنا
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-[var(--foreground)]">
                تعريف <span className="text-[#10B981]">بالحملة</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent mx-auto mt-6" />
            </motion.div>

             <div className="relative">
                {/* خلفية مزخرفة */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#10B981]/5 via-transparent to-[#10B981]/5 rounded-3xl blur-2xl" />
                
                <motion.div 
                  className="relative bg-white rounded-3xl p-8 md:p-12 border border-[var(--border)] shadow-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)' }}
                >
                  {/* زخارف */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#10B981]/[0.02] rounded-full" />

                  <div className="relative z-10">
                    <Quote className="w-12 h-12 text-[#10B981]/20 mb-6" />
                    
                    <p className="text-xl md:text-2xl leading-[1.8] text-[var(--foreground)] font-light">
                      {aboutText}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-[var(--border)]">
                      {[
                        { icon: Calendar, label: 'انطلقت 2014م' },
                        { icon: Target, label: 'برامج متنوعة' },
                        { icon: Globe, label: 'تغطية واسعة' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                          <item.icon className="w-4 h-4 text-[#10B981]" />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* كلمة المشرف العام - بتأثير سينمائي */}
        {/* ============================================ */}
        <section id="supervisor" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#10B981]/5 via-[#10B981]/10 to-[#10B981]/5" />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 30, repeat: -1 }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span className="inline-flex items-center gap-2 text-[#10B981] text-sm font-semibold bg-[#10B981]/10 px-5 py-2 rounded-full mb-4">
                  <Crown className="w-4 h-4" />
                  كلمة القيادة
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-[var(--foreground)]">
                  كلمة <span className="text-[#10B981]">المشرف العام</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent mx-auto mt-6" />
              </motion.div>

              <motion.div 
                className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-r-8 border-[#10B981] overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ boxShadow: '0 30px 60px -20px rgba(16, 185, 129, 0.3)' }}
              >
                {/* خلفية زخرفية */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#10B981]/5 rounded-full" />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#10B981]/5 rounded-full" />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-6"
                  >
                    <Quote className="w-12 h-12 text-[#10B981]/20" />
                    <div className="w-16 h-1 bg-[#10B981]/30 rounded-full mt-2" />
                  </motion.div>
                  
                  {supervisorMessage.split('\n\n').map((paragraph, index) => (
                    <motion.p 
                      key={index} 
                      className={`text-xl md:text-2xl leading-[1.8] text-[var(--foreground)] font-light ${index > 0 ? 'mt-6' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                  
                  <motion.div 
                    className="mt-8 pt-6 border-t border-[var(--border)] flex flex-wrap items-center gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                        <Users className="w-8 h-8 text-[#10B981]" />
                      </div>
                      <div>
                        <p className="font-bold text-xl text-[var(--foreground)]">المشرف العام</p>
                        <p className="text-[var(--muted-foreground)]">حملة رحماء بينهم</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#10B981]">
                      <BadgeCheck className="w-5 h-5" />
                      <span>عقد من العطاء</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* الهوية التنموية - بتصميم ثلاثي الأبعاد */}
        {/* ============================================ */}
        <section id="identity" className="relative py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span className="inline-flex items-center gap-2 text-[#10B981] text-sm font-semibold bg-[#10B981]/10 px-5 py-2 rounded-full mb-4">
                  <Layers className="w-4 h-4" />
                  هوية
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-[var(--foreground)]">
                  هويتنا <span className="text-[#10B981]">التنموية</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent mx-auto mt-6" />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* الرؤية */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-gradient-to-br from-white to-[#10B981]/5 rounded-3xl p-8 border border-[var(--border)] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/0 via-[#10B981]/5 to-[#10B981]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-[#10B981]/20">
                      <Globe className="w-10 h-10 text-[#10B981]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">رؤيتنا</h3>
                    <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                      الريادة والشمولية في المجال الدعوي والإنساني والتنموي.
                    </p>
                  </div>
                </motion.div>

                {/* الرسالة */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-gradient-to-br from-white to-[#10B981]/5 rounded-3xl p-8 border border-[var(--border)] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/0 via-[#10B981]/5 to-[#10B981]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-[#10B981]/20">
                      <Heart className="w-10 h-10 text-[#10B981]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">رسالتنا</h3>
                    <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                      الإسهام في إصلاح المجتمع روحاً وسلوكاً، ومد يد العون لتوفير حياة كريمة يعيشها، 
                      بالشراكة مع المهتمين والخيرين في الداخل والخارج.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* القيم - بتصميم شبكي متقدم */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                    <Award className="w-7 h-7 text-[#10B981]" />
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--foreground)]">قيمنا الناظمة</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { icon: Star, label: 'الإخلاص', color: '#F59E0B', desc: 'نية صادقة' },
                    { icon: Shield, label: 'الشفافية', color: '#3B82F6', desc: 'وضوح تام' },
                    { icon: Award, label: 'الإتقان', color: '#10B981', desc: 'إتقان العمل' },
                    { icon: Users, label: 'المسؤولية', color: '#8B5CF6', desc: 'تحمل المسؤولية' },
                    { icon: Sparkles, label: 'المبادرة', color: '#F97316', desc: 'روح المبادرة' },
                  ].map((value) => (
                    <motion.div
                      key={value.label}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group bg-white rounded-2xl p-6 text-center border border-[var(--border)] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    >
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${value.color}15` }}
                      >
                        <value.icon className="w-7 h-7" style={{ color: value.color }} />
                      </div>
                      <p className="font-bold text-[var(--foreground)]">{value.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* أهدافنا - تصميم تفاعلي */}
        {/* ============================================ */}
        <section id="goals" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#10B981]/5 via-[#10B981]/10 to-[#10B981]/5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span className="inline-flex items-center gap-2 text-[#10B981] text-sm font-semibold bg-[#10B981]/10 px-5 py-2 rounded-full mb-4">
                  <Target className="w-4 h-4" />
                  طموحاتنا
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-[var(--foreground)]">
                  أهدافنا <span className="text-[#10B981]">وطموحاتنا</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent mx-auto mt-6" />
              </motion.div>

              <div className="space-y-4">
                {[
                  'تحقيق مبدأ التعاون على البر والتقوى، وخلق روح التكافل بين أفراد الأمة المسلمة',
                  'إحياء دور المسجد في التربية والإصلاح، وإبرار رسالة العلم، والمحافظة على أوقات المسلم',
                  'الإسهام في توفير حياة كريمة لشريحة المستفيدين وصيانتهم من مذلة السؤال',
                  'تحقيق الاكتفاء التنموي الذاتي لضمان بقاء المشاريع وديمومة أدائها',
                ].map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="group flex items-start gap-6 p-6 bg-white rounded-2xl border border-[var(--border)] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center text-lg font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#10B981]/20">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-[var(--foreground)] leading-relaxed">{goal}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-16 h-0.5 bg-[#10B981]/30 rounded-full" />
                        <span className="text-xs text-[#10B981]">هدف استراتيجي</span>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]/30 group-hover:text-[#10B981] transition-colors flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* الفئات المستهدفة - تصميم بطاقات متقدم */}
        {/* ============================================ */}
        <section id="beneficiaries" className="relative py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span className="inline-flex items-center gap-2 text-[#10B981] text-sm font-semibold bg-[#10B981]/10 px-5 py-2 rounded-full mb-4">
                  <Users className="w-4 h-4" />
                  من نستهدف
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-[var(--foreground)]">
                  الفئات <span className="text-[#10B981]">المستهدفة</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent mx-auto mt-6" />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { 
                    icon: Heart, 
                    title: 'الأيتام والأرامل والأسر المتعففة', 
                    desc: 'مستفيدو الكفالات المادية، الكسوة، وتفريج كرب الغارمين',
                    color: 'rose',
                    count: '2,500+'
                  },
                  { 
                    icon: HandHeart, 
                    title: 'المحتاجون والنازحون', 
                    desc: 'مستفيدو السلال الغذائية، المطابخ الخيرية، واللحوم وتفطير الصائمين',
                    color: 'amber',
                    count: '10,000+'
                  },
                  { 
                    icon: BookOpen, 
                    title: 'طلاب وحفظة القرآن والمعلمون', 
                    desc: 'مستفيدو كفالات الحلقات، طباعة المصاحف والكتب العلمية',
                    color: 'blue',
                    count: '1,200+'
                  },
                  { 
                    icon: Compass, 
                    title: 'سكان المناطق النائية والجافة', 
                    desc: 'مستفيدو حفر الآبار، شبكات السقيا، وبناء المساجد ودور القرآن',
                    color: 'emerald',
                    count: '5,000+'
                  },
                  { 
                    icon: TrendingUp, 
                    title: 'الأسر الباحثة عن الدخل', 
                    desc: 'مستفيدو تمليك الأدوات الإنتاجية للتحول إلى أسر منتجة',
                    color: 'purple',
                    count: '800+'
                  },
                ].map((group, index) => {
                  const colors = {
                    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', light: 'bg-rose-100' },
                    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', light: 'bg-amber-100' },
                    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', light: 'bg-blue-100' },
                    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', light: 'bg-emerald-100' },
                    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', light: 'bg-purple-100' },
                  };
                  const c = colors[group.color as keyof typeof colors];

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className={`group relative bg-white rounded-3xl p-6 border ${c.border} shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden`}
                    >
                      <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative z-10 flex items-start gap-5">
                        <div className={`w-16 h-16 rounded-2xl ${c.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <group.icon className={`w-8 h-8 ${c.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">{group.title}</h3>
                            <span className={`text-xs font-bold ${c.text} ${c.bg} px-2 py-0.5 rounded-full`}>
                              {group.count}
                            </span>
                          </div>
                          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{group.desc}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <div className={`w-12 h-1 ${c.bg} rounded-full`} />
                            <span className="text-xs text-[var(--muted-foreground)]">فئة مستهدفة</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* شركاء النجاح - تصميم ملهم */}
        {/* ============================================ */}
        <section id="partners" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#10B981]/5 via-[#10B981]/10 to-[#10B981]/5" />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 15, repeat: Infinity }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <motion.div 
                  className="w-24 h-24 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <Users className="w-12 h-12 text-[#10B981]" />
                </motion.div>
                
                <span className="inline-flex items-center gap-2 text-[#10B981] text-sm font-semibold bg-[#10B981]/10 px-5 py-2 rounded-full mb-4">
                  <GitCommit className="w-4 h-4" />
                  شراكات مستدامة
                </span>

                <h2 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-4">
                  شركاء <span className="text-[#10B981]">النجاح</span>
                </h2>
                
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent mx-auto mb-8" />

                <motion.div 
                  className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-[var(--border)] overflow-hidden"
                  whileHover={{ boxShadow: '0 30px 60px -20px rgba(16, 185, 129, 0.25)' }}
                >
                  {/* زخارف */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#10B981]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#10B981]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <Quote className="w-14 h-14 text-[#10B981]/10 mx-auto mb-6" />
                    </motion.div>
                    
                    <p className="text-xl md:text-2xl leading-[1.8] text-[var(--foreground)] font-light">
                      {partnersText}
                    </p>

                    <motion.div 
                      className="mt-8 pt-6 border-t border-[var(--border)] flex flex-wrap justify-center gap-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      {[
                        { icon: Heart, label: 'شركاء النجاح' },
                        { icon: Star, label: 'داعمون أوفياء' },
                        { icon: Target, label: 'صناع الأثر' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-[var(--muted-foreground)]">
                          <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* Footer - متقدم */}
        {/* ============================================ */}
        <footer className="relative bg-[var(--foreground)] text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center md:text-right">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Heart className="w-6 h-6 text-[#10B981]" />
                    <span className="font-bold text-lg">رحماء بينهم</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    حملة خيرية دعوية إنسانية تنموية
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">روابط سريعة</h4>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li><button onClick={() => handleQuickLink('about')} className="hover:text-[#10B981] transition-colors">من نحن</button></li>
                    <li><button onClick={() => handleQuickLink('programs')} className="hover:text-[#10B981] transition-colors">برامجنا</button></li>
                    <li><button onClick={() => handleQuickLink('contact')} className="hover:text-[#10B981] transition-colors">تواصل معنا</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">تواصل</h4>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li className="flex items-center justify-center md:justify-start gap-2">
                      <Phone className="w-4 h-4" /> +967 123 456 789
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2">
                      <Mail className="w-4 h-4" /> info@rahama.com
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">تابعنا</h4>
                  <div className="flex justify-center md:justify-start gap-3">
                    {[
                      { Icon: Facebook, platform: 'facebook' },
                      { Icon: Twitter, platform: 'twitter' },
                      { Icon: Instagram, platform: 'instagram' },
                      { Icon: Youtube, platform: 'youtube' }
                    ].map(({ Icon, platform }, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleSocialClick(platform)}
                        whileHover={{ y: -3 }}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#10B981] transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
                <p>{new Date().getFullYear()} © جميع الحقوق محفوظة - حملة رحماء بينهم الخيرية</p>
                <p className="mt-1 text-xs">رحماء بينهم - تضامن إنساني وتنموي متكامل منذ 2014</p>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}