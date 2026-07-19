// Transparency & Impact Page - مركز الأثر والشفافية
import { FileText, Download, Shield, Award, Users, Quote, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { useSEO } from '@/utils/seoAdvanced';

export default function TransparencyPage() {
  const [activeTab, setActiveTab] = useState('documents');

  useSEO({
    title: 'مركز الأثر والشفافية - رحماء بينهم',
    description: 'الشفافية الكاملة في العمل الخيري - التقارير والوثائق وقصص النجاح',
  });

  const tabs = [
    { id: 'documents', name: 'الوثائق والتراخيص', icon: Shield },
    { id: 'reports', name: 'التقارير الدورية', icon: FileText },
    { id: 'stories', name: 'قصص النجاح', icon: Award },
    { id: 'challenges', name: 'التحديات', icon: AlertTriangle },
    { id: 'testimonials', name: 'تزكيات وآراء', icon: Quote },
  ];

  const documents = [
    { name: 'ترخيص جمع التبرعات', number: 'رقم الترخيص: 2024/123', date: '2024-01-15', file: '/docs/license.pdf' },
    { name: 'شهادة التسجيل الرسمية', number: 'رقم التسجيل: 456/2024', date: '2024-02-01', file: '/docs/registration.pdf' },
    { name: 'تقرير التدقيق المالي', number: 'لعام 2024', date: '2024-12-31', file: '/docs/audit-2024.pdf' },
    { name: 'شهادة الامتثال للشريعة', number: 'رقم الشهادة: SH-2024-789', date: '2024-06-01', file: '/docs/sharia-compliance.pdf' },
  ];

  const reports = [
    { title: 'التقرير السنوي 2024', type: 'تقرير شامل', size: '15 م.ب', date: '2024', file: '/reports/annual-2024.pdf' },
    { title: 'التقرير المالي الربع الرابع', type: 'تقرير مالي', size: '5 م.ب', date: '2024-Q4', file: '/reports/financial-q4-2024.pdf' },
    { title: 'تقرير إنجاز مشاريع المياه', type: 'تقرير مشروع', size: '8 م.ب', date: '2024', file: '/reports/water-projects-2024.pdf' },
    { title: 'نشرة الإنجاز الشهرية', type: 'نشرة دورية', size: '3 م.ب', date: 'شهرية', file: '/reports/monthly-bulletin.pdf' },
  ];

  const successStories = [
    {
      title: 'من العوز إلى الاكتفاء',
      excerpt: 'قصة أسرة يمنية تحولت من الاحتياج إلى الإنتاج بفضل مشروع التمكين',
      image: '/stories/story1.jpg',
      name: 'أم أحمد',
      location: 'حضرموت',
      program: 'التمكين الاقتصادي',
    },
    {
      title: 'بئر الخير',
      excerpt: 'كيف غير بئر ماء واحد حياة 500 أسرة في منطقة نائية',
      image: '/stories/story2.jpg',
      name: 'قرية الجوف',
      location: 'الجوف',
      program: 'مشروع الآبار',
    },
    {
      title: 'حافظة القرآن',
      excerpt: 'من حلقات التحفيظ إلى تدريس القرآن في مسجد قريتها',
      image: '/stories/story3.jpg',
      name: 'مريم',
      location: 'تعز',
      program: 'تحفيظ القرآن',
    },
  ];

  const testimonials = [
    {
      text: 'نشهد بالله على ما رأيناه من أمانة وإخلاص في عمل هذه المؤسسة المباركة، جعلها الله في ميزان حسنات القائمين عليها والداعمين لها.',
      author: 'الشيخ/ عبدالله الحكيمي',
      role: 'عضو هيئة علماء اليمن',
    },
    {
      text: 'مؤسسة رحماء بينهم نموذج يحتذى به في الشفافية والإتقان، نشهد لهم بحسن الإدارة ودقة التنفيذ.',
      author: 'د. محمد العيدروس',
      role: 'باحث في الشؤون الإنسانية',
    },
    {
      text: 'الحمد لله الذي وفقنا للتعاون مع هذه المؤسسة المباركة، رأينا بأم أعيننا أثر تبرعاتنا في حياة المحتاجين.',
      author: 'أبو سعيد',
      role: 'متبرع من سلطنة عمان',
    },
  ];

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-[var(--brand-green)]/10 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-[var(--brand-green)]" />
            <h1 className="text-5xl font-bold mb-6">مركز الأثر والشفافية</h1>
            <p className="text-2xl text-gray-600 mb-8">
              نؤمن بأن الشفافية هي أساس الثقة، ونحرص على إطلاعكم على كل صغيرة وكبيرة
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--brand-green)] text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <h2 className="text-3xl font-bold mb-8">الوثائق والتراخيص الرسمية</h2>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="card p-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{doc.name}</h3>
                        <p className="text-sm text-gray-600">{doc.number}</p>
                        <p className="text-sm text-gray-500">تاريخ الإصدار: {doc.date}</p>
                      </div>
                      <a
                        href={doc.file}
                        className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        تحميل
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div>
                <h2 className="text-3xl font-bold mb-8">التقارير الدورية</h2>
                <div className="space-y-4">
                  {reports.map((report, index) => (
                    <div key={index} className="card p-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{report.title}</h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>{report.type}</span>
                          <span>{report.size}</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                      <a
                        href={report.file}
                        className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        تحميل PDF
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Success Stories Tab */}
            {activeTab === 'stories' && (
              <div>
                <h2 className="text-3xl font-bold mb-8">قصص نجاح</h2>
                <p className="text-lg text-gray-600 mb-8">أثر حقيقي من واقع الحياة - حالات المستفيدين قبل وبعد التدخل</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {successStories.map((story, index) => (
                    <div key={index} className="card overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-[var(--brand-green)]/20 to-[var(--brand-green)]/5 flex items-center justify-center">
                        <Award className="w-16 h-16 text-[var(--brand-green)]" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                        <p className="text-gray-600 mb-4">{story.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{story.name}</span>
                          <span>{story.location}</span>
                          <span className="text-[var(--brand-green)]">{story.program}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges Tab */}
            {activeTab === 'challenges' && (
              <div>
                <h2 className="text-3xl font-bold mb-8">العقبات والتحديات وكيف نواجهها</h2>
                <div className="space-y-6">
                  {[
                    {
                      challenge: 'صعوبة الوصول للمناطق النائية',
                      solution: 'استخدام فرق ميدانية مدربة ووسائل نقل مناسبة، والتعاون مع المجالس المحلية',
                    },
                    {
                      challenge: 'ارتفاع تكاليف النقل والشحن',
                      solution: 'الشراكة مع شركات النقل المحلية والدولية للحصول على أسعار مخفضة',
                    },
                    {
                      challenge: 'تحديات أمنية في بعض المناطق',
                      solution: 'التنسيق مع الجهات المختصة واختيار أوقات آمنة للتنفيذ',
                    },
                    {
                      challenge: 'تقلبات أسعار المواد الغذائية',
                      solution: 'الشراء المسبق بكميات كبيرة والتخزين الاستراتيجي',
                    },
                  ].map((item, index) => (
                    <div key={index} className="card p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold mb-2">التحدي: {item.challenge}</h3>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-green)] flex-shrink-0 mt-1" />
                            <p className="text-gray-600">{item.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div>
                <h2 className="text-3xl font-bold mb-8">تزكيات وآراء</h2>
                <p className="text-lg text-gray-600 mb-8">قالوا عن المؤسسة</p>
                <div className="space-y-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="card p-8">
                      <Quote className="w-8 h-8 text-[var(--brand-green)] mb-4" />
                      <p className="text-lg leading-relaxed mb-6">{testimonial.text}</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--brand-green)]/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-[var(--brand-green)]" />
                        </div>
                        <div>
                          <p className="font-bold">{testimonial.author}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}