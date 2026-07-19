// Knowledge Library Component - Studies, Guides, Publications, Issues
// مكتبة المعرفة - الدراسات والأدلة والمطبوعات والإصدارات
import { motion } from 'framer-motion';
import { BookOpen, Download, Calendar, Users, TrendingUp, Shield, FileText, ExternalLink, Search, Filter, ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';

interface KnowledgeItem {
  id: string;
  title: string;
  titleEn?: string;
  type: 'study' | 'guide' | 'publication' | 'issue' | 'report' | 'bulletin' | 'financial';
  category: string;
  categoryColor: string;
  date: string;
  fileSize: string;
  downloads: number;
  description: string;
  downloadUrl?: string;
  featured?: boolean;
}

// Seed knowledge data
const SEED_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: '1',
    title: 'التقرير السنوي ١٤٤٥هـ',
    titleEn: 'Annual Report 2024',
    type: 'report',
    category: 'تقارير',
    categoryColor: 'var(--brand-green)',
    date: '١٤٤٦/١/١',
    fileSize: '٤.٢ م.ب',
    downloads: 1250,
    description: 'تقرير شامل عن أنشطة المؤسسة والإنجازات والأثر المستدام',
    downloadUrl: '/reports/annual-1445.pdf',
    featured: true,
  },
  {
    id: '2',
    title: 'نشرة شهر ربيع الأول ١٤٤٦هـ',
    titleEn: 'Monthly Bulletin - Rabī al-Awwal 1446',
    type: 'bulletin',
    category: 'نشرات',
    categoryColor: '#2563EB',
    date: '١٤٤٦/٣/١',
    fileSize: '١.٨ م.ب',
    downloads: 890,
    description: 'أبرز الإنجازات والبرامج النشطة والمشاريع الجارية',
    downloadUrl: '/reports/bulletin-rabialawwal-1446.pdf',
  },
  {
    id: '3',
    title: 'التقرير المالي للربع الثالث ٢٠٢٤',
    titleEn: 'Q3 Financial Report 2024',
    type: 'financial',
    category: 'تقارير مالية',
    categoryColor: '#059669',
    date: '١٤٤٦/٤/١٠',
    fileSize: '٣.٥ م.ب',
    downloads: 650,
    description: 'تحليل مالي مفصل للإيرادات والمصروفات والموازنة التشغيلية',
    downloadUrl: '/reports/financial-q3-2024.pdf',
  },
  {
    id: '4',
    title: 'دراسة: أثر البرامج التعليمية في الريف اليمني',
    titleEn: 'Study: Impact of Education Programs in Rural Yemen',
    type: 'study',
    category: 'دراسات',
    categoryColor: '#7C3AED',
    date: '١٤٤٥/١٢/١٥',
    fileSize: '٢.٩ م.ب',
    downloads: 420,
    description: 'تحليلنا لبرامج التعليم في المناطق الريفية وتأثيرها على تحصيل الأسر',
    downloadUrl: '/studies/education-impact-rural-yemen.pdf',
  },
  {
    id: '5',
    title: 'دليل المتطوع الفعال',
    titleEn: 'Effective Volunteer Guide',
    type: 'guide',
    category: 'أدلة',
    categoryColor: '#D97706',
    date: '١٤٤٦/٢/١',
    fileSize: '١.٢ م.ب',
    downloads: 1100,
    description: 'دليل شامل للمتطوعين الجدد حول البرامج والفرص والتدريب',
    downloadUrl: '/guides/volunteer-guide.pdf',
    featured: true,
  },
  {
    id: '6',
    title: 'نشرة الصيف ١٤٤٦هـ',
    titleEn: 'Summer Bulletin 2024',
    type: 'bulletin',
    category: 'نشرات',
    categoryColor: '#2563EB',
    date: '١٤٤٦/٢/١٥',
    fileSize: '١.٥ م.ب',
    downloads: 520,
    description: 'ملخص أنشطة الصيف وبرامج الإغاثة الصيفية',
    downloadUrl: '/reports/summer-bulletin-1446.pdf',
  },
];

const KNOWLEDGE_CATEGORIES = [
  { id: 'all', label: 'الكل', icon: BookOpen },
  { id: 'reports', label: 'التقارير السنوية', icon: FileText },
  { id: 'bulletins', label: 'النشرات الدورية', icon: Calendar },
  { id: 'financial', label: 'التقارير المالية', icon: TrendingUp },
  { id: 'studies', label: 'الدراسات', icon: Shield },
  { id: 'guides', label: 'الأدلة', icon: Users },
];

const TYPE_LABELS: Record<KnowledgeItem['type'], string> = {
  study: 'دراسة',
  guide: 'دليل',
  publication: 'إصدار',
  issue: 'العدد',
  report: 'تقرير',
  bulletin: 'نشرة',
  financial: 'تقرير مالي',
};

export function KnowledgeLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => {
    return SEED_KNOWLEDGE.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'reports' && item.type === 'report') ||
                           (selectedCategory === 'bulletins' && item.type === 'bulletin') ||
                           (selectedCategory === 'financial' && item.type === 'financial') ||
                           (selectedCategory === 'studies' && item.type === 'study') ||
                           (selectedCategory === 'guides' && item.type === 'guide');
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section className="py-20 bg-[var(--secondary)]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-3 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-pale)] px-4 py-1 rounded-full text-sm font-semibold">
            مكتبة المعرفة
          </span>
          <h2 className="text-[var(--foreground)] mb-4">
            مراجع ودراسات وإصدارات{' '}
            <span className="text-[var(--brand-green)]">المؤسسة</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-sm">
            نشاركك مجموعتنا من الدراسات والتقارير والأدلة التي توثق أثر عملنا وتُظهر شفافيتنا
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث في المكتبة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-green)]/30 outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            تصفية
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex flex-wrap gap-2">
              {KNOWLEDGE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--brand-green)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Knowledge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
            >
              {item.featured && (
                <span className="inline-block px-2 py-1 bg-[var(--brand-gold)]/20 text-[var(--brand-gold)] text-xs font-semibold rounded-full mb-3">
                  مميز
                </span>
              )}
              
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.categoryColor}20` }}>
                  <BookOpen className="w-6 h-6" style={{ color: item.categoryColor }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
                  <span className="text-xs text-gray-500">{TYPE_LABELS[item.type]}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{item.date}</span>
                <span>{item.fileSize}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(item.downloadUrl, '_blank')}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-[var(--brand-green)] text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  تحميل
                </button>
                <div className="flex items-center gap-1 text-gray-500">
                  <Download className="w-3 h-3" />
                  <span>{item.downloads}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            لا توجد نتائج مطابقة للبحث
          </div>
        )}
      </div>
    </section>
  );
}