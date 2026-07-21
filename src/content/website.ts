// Content Seed Data - صور خيرية ومحتوى تنموي
// صور بديلة من Unsplash (روابط موثوقة)
const PLACEHOLDER_BENEFICIARY = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&q=80';
const PLACEHOLDER_AID = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&q=80';
const PLACEHOLDER_EDUCATION = 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&q=80';
const PLACEHOLDER_DEVELOPMENT = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&q=80';
const PLACEHOLDER_WATER = 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&h=600&q=80';
const PLACEHOLDER_TRAINING = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&q=80';

export const SEED_NEWS_ITEMS = [
  {
    id: '1',
    title: 'إطلاق مشروع التعليم المستدام في المناطق النائية لعام ١٤٤٦هـ',
    excerpt: 'أطلقت مؤسسة رحماء بينهم مشروعها السنوي للتعليم المستدام الذي يستهدف أكثر من ٥٠٠ طالب وطالبة في المناطق النائية، ويشمل توفير الكتب والقرطاسية والحقائب المدرسية والتدريب المهني.',
    content: 'في إطار جهودها المتواصلة لدعم التعليم في اليمن، أطلقت مؤسسة رحماء بينهم مشروعها السنوي للتعليم المستدام لعام ١٤٤٦هـ، الذي يستهدف أكثر من ٥٠٠ طالب وطالبة في المناطق النائية. يشمل المشروع توزيع الكتب المدرسية والقرطاسية والحقائب المدرسية، إضافة إلى برامج التدريب المهني والتأهيل للطلاب المتسربين من التعليم. ويأتي هذا المشروع ضمن استراتيجية المؤسسة لتعزيز التعليم كأداة للتنمية المستدامة وتمكين الأجيال القادمة.',
    category: 'تعليم',
    categoryColor: '#2563EB',
    categoryBg: '#EFF6FF',
    date: '١٥ ربيع الثاني ١٤٤٦',
    dateEn: '2024-10-18',
    image: PLACEHOLDER_EDUCATION,
    views: 1240,
    featured: true,
    status: 'PUBLISHED',
    tags: ['تعليم', 'تنمية', 'طلاب'],
    location: 'عدة محافظات',
  },
  {
    id: '2',
    title: 'توزيع ٨٠٠ سلة غذائية على الأسر المتضررة في محافظة تعز',
    excerpt: 'نفّذ فريق الإغاثة الميداني التابع للمؤسسة حملة موسعة لتوزيع السلال الغذائية على الأسر الأكثر احتياجًا في عدة مديريات بمحافظة تعز.',
    content: 'نفذ فريق الإغاثة الميداني التابع لمؤسسة رحماء بينهم حملة موسعة لتوزيع ٨٠٠ سلة غذائية على الأسر المتضررة والنازحة في عدة مديريات بمحافظة تعز. تأتي هذه الحملة ضمن البرنامج الإغاثي الدوري للمؤسسة الذي يستهدف الأسر الأكثر احتياجاً في المناطق المتأثرة بالصراع. وتحتوي كل سلة غذائية على المواد الأساسية التي تكفي أسرة لمدة شهر كامل.',
    category: 'إغاثة',
    categoryColor: '#E74C3C',
    categoryBg: '#FEF2F2',
    date: '٨ ربيع الثاني ١٤٤٦',
    dateEn: '2024-10-11',
    image: PLACEHOLDER_AID,
    views: 986,
    featured: true,
    status: 'PUBLISHED',
    tags: ['إغاثة', 'مساعدات', 'نازحين'],
    location: 'تعز',
  },
  {
    id: '3',
    title: 'توقيع اتفاقية شراكة استراتيجية مع منظمة التنمية الخليجية',
    excerpt: 'وقّعت مؤسسة رحماء بينهم اتفاقية شراكة استراتيجية مع منظمة التنمية الخليجية لمدة ثلاث سنوات بقيمة ٢ مليون دولار.',
    content: 'وقّعت مؤسسة رحماء بينهم ومنظمة التنمية الخليجية اتفاقية شراكة استراتيجية تشمل تنفيذ مشاريع مشتركة في قطاعي التعليم والتنمية المجتمعية على مدى ثلاث سنوات، بقيمة إجمالية تتجاوز ٢ مليون دولار. وتهدف الشراكة إلى توسيع نطاق البرامج التنموية والتعليمية في المناطق الأكثر احتياجاً في اليمن، والاستفادة من خبرات المنظمة في مجال التنمية المستدامة.',
    category: 'شراكات',
    categoryColor: 'var(--brand-green)',
    categoryBg: 'var(--brand-green-pale)',
    date: '٢ ربيع الثاني ١٤٤٦',
    dateEn: '2024-10-05',
    image: PLACEHOLDER_DEVELOPMENT,
    views: 754,
    featured: false,
    status: 'PUBLISHED',
    tags: ['شراكات', 'تنمية', 'تعليم'],
    location: 'الرياض',
  },
  {
    id: '4',
    title: 'ختام دورة تدريبية لـ ١٢٠ مدرباً في مجال التنمية المجتمعية',
    excerpt: 'اختتمت المؤسسة برنامجها التدريبي المكثف الذي أُقيم على مدار ٤ أسابيع وخرّج ١٢٠ مدرباً مؤهلاً.',
    content: 'اختتمت مؤسسة رحماء بينهم برنامجها التدريبي المكثف الذي أُقيم على مدار ٤ أسابيع بالتعاون مع جامعة صنعاء. خرّج البرنامج ١٢٠ مدرباً مؤهلاً في مجال التنمية المجتمعية وإدارة المشاريع الاجتماعية. شمل التدريب مهارات التخطيط الاستراتيجي وإدارة المشاريع والقيادة المجتمعية، بالإضافة إلى تطبيقات عملية في المجتمعات المحلية.',
    category: 'تدريب',
    categoryColor: '#7C3AED',
    categoryBg: '#F5F3FF',
    date: '٢٥ ربيع الأول ١٤٤٦',
    dateEn: '2024-09-28',
    image: PLACEHOLDER_TRAINING,
    views: 632,
    featured: false,
    status: 'PUBLISHED',
    tags: ['تدريب', 'تنمية', 'تأهيل'],
    location: 'صنعاء',
  },
  {
    id: '5',
    title: 'حملة مياه الشرب النقية تصل إلى ١٠ قرى في مأرب',
    excerpt: 'تمكنت المؤسسة من تركيب محطات تنقية مياه في ١٠ قرى بمحافظة مأرب يستفيد منها أكثر من ١٥٠٠ أسرة.',
    content: 'في إطار برنامج المياه والإصحاح البيئي، تمكنت مؤسسة رحماء بينهم من تركيب محطات تنقية مياه تعمل بالطاقة الشمسية في ١٠ قرى بمحافظة مأرب. يستفيد من هذه المحطات أكثر من ١٥٠٠ أسرة، حيث توفر مياهاً نقية وصالحة للشرب. ساهم المشروع في تقليل الأمراض المرتبطة بتلوث المياه بنسبة كبيرة في المناطق المستهدفة.',
    category: 'إغاثة',
    categoryColor: '#E74C3C',
    categoryBg: '#FEF2F2',
    date: '١٠ ربيع الأول ١٤٤٦',
    dateEn: '2024-09-15',
    image: PLACEHOLDER_WATER,
    views: 543,
    featured: false,
    status: 'PUBLISHED',
    tags: ['مياه', 'إغاثة', 'بنية تحتية'],
    location: 'مأرب',
  },
];

export const SEED_SUCCESS_STORIES = [
  {
    id: '1',
    title: 'من اللجوء إلى ريادة الأعمال',
    excerpt: 'قصة نجاح للمستفيدة فاطمة أحمد التي تحولت من مستفيدة من برامج الإغاثة إلى سيدة أعمال ناجحة تدعم ٨ أسر في محافظة تعز.',
    quote: 'لم أكن أتخيل أنني سأصبح سيدة أعمال تدعم أسرتي وثماني أسر أخرى. مؤسسة رحماء بينهم غيرت حياتي بالكامل.',
    name: 'فاطمة أحمد',
    role: 'مستفيدة سابقة - مشروع تمكين المرأة',
    program: 'تمكين المرأة',
    category: 'تنمية مجتمعية',
    year: '١٤٤٥هـ',
    location: 'تعز',
    rating: 5,
    image: PLACEHOLDER_BENEFICIARY,
    status: 'PUBLISHED',
  },
  {
    id: '2',
    title: 'أحمد يبني مستقبله',
    excerpt: 'بعد انقطاعه عن التعليم بسبب الحرب، عاد أحمد إلى مقاعد الدراسة من خلال برنامج التعليم المستمر للمؤسسة.',
    quote: 'كنت أظلم أن التعليم انتهى بالنسبة لي، لكن بفضل برنامج التعليم المستمر، الآن أدرس في كلية الهندسة.',
    name: 'أحمد محمد',
    role: 'طالب في برنامج التعليم',
    program: 'التعليم المستمر',
    category: 'تعليم',
    year: '١٤٤٦هـ',
    location: 'صنعاء',
    rating: 5,
    image: PLACEHOLDER_EDUCATION,
    status: 'PUBLISHED',
  },
  {
    id: '3',
    title: 'مبادرة مجتمعية تغير واقع قرية نائية',
    excerpt: 'بفضل جهود المتطوعين ودعم المؤسسة، تحولت قرية نائية في محافظة حجة إلى قرية منتجة تمتلك مشروعاً مجتمعياً مستداماً.',
    quote: 'كنا نحلم بمشروع يغير واقعنا، واليوم أصبح الحلم حقيقة بفضل الله ثم بفضل مؤسسة رحماء بينهم.',
    name: 'مصعب عبدالله',
    role: 'قائد مبادرة مجتمعية',
    program: 'التنمية المجتمعية',
    category: 'تنمية',
    year: '١٤٤٦هـ',
    location: 'حجة',
    rating: 5,
    image: PLACEHOLDER_DEVELOPMENT,
    status: 'PUBLISHED',
  },
  {
    id: '4',
    title: 'محفظة قرآن كامل في عام واحد',
    excerpt: 'المتطوع عمار الحميدي استطاع أن يحفظ القرآن كاملاً خلال عام واحد في حلقات التحفيظ التي تدعمها المؤسسة.',
    quote: 'الحمد لله الذي وفقني لحفظ كتابه، بفضل الحلقات القرآنية والدعم المتواصل من المؤسسة.',
    name: 'عمار الحميدي',
    role: 'طالب حفظ',
    program: 'التعليم والتحفيظ',
    category: 'تعليم',
    year: '١٤٤٥هـ',
    location: 'صنعاء',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1542815391-5e04e9682458?w=800&h=600&q=80',
    status: 'PUBLISHED',
  },
];

export const SEED_PARTNERS = [
  { id: '1', name: 'منظمة الإغاثة الخيرية', logo: PLACEHOLDER_BENEFICIARY, type: 'شريك إستراتيجي', status: 'active', url: '#' },
  { id: '2', name: 'صندوق التنمية البشرية', logo: PLACEHOLDER_AID, type: 'جهة ممولة', status: 'active', url: '#' },
  { id: '3', name: 'جامعة العلوم والتكنولوجيا', logo: PLACEHOLDER_EDUCATION, type: 'شريك تنفيذي', status: 'active', url: '#' },
  { id: '4', name: 'هيئة الأعمال الخيرية', logo: PLACEHOLDER_DEVELOPMENT, type: 'شريك داعم', status: 'active', url: '#' },
  { id: '5', name: 'اللجنة الإغاثية العربية', logo: PLACEHOLDER_TRAINING, type: 'شريك إستراتيجي', status: 'active', url: '#' },
  { id: '6', name: 'بنك الطعام اليمني', logo: PLACEHOLDER_WATER, type: 'شريك تنفيذي', status: 'active', url: '#' },
];

export const SEED_IMPACT = {
  beneficiaries: 12847,
  projects: 24,
  partners: 48,
  volunteers: 320,
};

export const SEED_REPORTS = [
  { id: '1', title: 'التقرير السنوي ١٤٤٥هـ', type: 'تقرير سنوي', date: '١٤٤٦/١/١', file: '', size: '٤.٢ م.ب', status: 'published' },
  { id: '2', title: 'نشرة شهر ربيع الأول ١٤٤٦هـ', type: 'نشرة دورية', date: '١٤٤٦/٣/١', file: '', size: '١.٨ م.ب', status: 'published' },
  { id: '3', title: 'التقرير المالي للربع الثالث ٢٠٢٤', type: 'تقرير مالي', date: '١٤٤٦/٤/١٠', file: '', size: '٣.٥ م.ب', status: 'published' },
  { id: '4', title: 'دراسة: أثر البرامج التعليمية في الريف اليمني', type: 'دراسة', date: '١٤٤٥/١٢/١٥', file: '', size: '٢.٩ م.ب', status: 'draft' },
];

export const SEED_MEDIA = [
  { id: '1', title: 'حفل تكريم المتفوقين', type: 'image', url: PLACEHOLDER_EDUCATION, date: '١٤٤٦/٣/١٥', size: '١.٢ م.ب' },
  { id: '2', title: 'توزيع المساعدات في تعز', type: 'image', url: PLACEHOLDER_AID, date: '١٤٤٦/٢/٢٠', size: '٠.٩ م.ب' },
  { id: '3', title: 'برنامج التدريب المهني', type: 'image', url: PLACEHOLDER_TRAINING, date: '١٤٤٦/١/٥', size: '١.١ م.ب' },
  { id: '4', title: 'تعريف بالمؤسسة', type: 'video', url: PLACEHOLDER_DEVELOPMENT, date: '١٤٤٥/١١/١', size: '٢٥ م.ب' },
];

export const SEED_DONATIONS = [
  { id: '1', donor: 'أحمد محمد علي', amount: 500, project: 'الصندوق العام', method: 'card', date: '١٤٤٦/٤/١', status: 'completed' },
  { id: '2', donor: 'فاطمة عبدالله', amount: 250, project: 'الإغاثة الإنسانية', method: 'mobile', date: '١٤٤٦/٤/٣', status: 'completed' },
  { id: '3', donor: 'خالد صالح', amount: 1000, project: 'دعم التعليم', method: 'transfer', date: '١٤٤٦/٣/٢٨', status: 'pending' },
  { id: '4', donor: 'محمد حسين', amount: 100, project: 'مشروع رمضان', method: 'card', date: '١٤٤٦/٣/٢٥', status: 'completed' },
  { id: '5', donor: 'سارة أحمد', amount: 2000, project: 'الصندوق العام', method: 'transfer', date: '١٤٤٦/٣/٢٠', status: 'completed' },
  { id: '6', donor: 'عمر حسن', amount: 350, project: 'التنمية المجتمعية', method: 'mobile', date: '١٤٤٦/٣/١٥', status: 'failed' },
];

export const SEED_USER_REQUESTS = [
  { id: '1', name: 'مؤسسة الخير الدولية', email: 'info@alkhair.org', type: 'منظمة داعمة', message: 'نرغب في الشراكة مع المؤسسة في مشاريع المياه', date: 'منذ يوم', status: 'new' },
  { id: '2', name: 'محمد عبدالله العريفي', email: 'mohd@email.com', type: 'فاعل خير', message: 'أرغب في التبرع بمبلغ شهري للمؤسسة', date: 'منذ ساعتين', status: 'new' },
  { id: '3', name: 'جمعية البر والتقوى', email: 'info@albr.org', type: 'منظمة داعمة', message: 'نقترح توقيع مذكرة تفاهم للتعاون المشترك', date: 'منذ ٣ أيام', status: 'read' },
  { id: '4', name: 'أحمد علي الحميدي', email: 'ahmed@email.com', type: 'فاعل خير', message: 'استفسار عن مشروع كفالة يتيم', date: 'منذ ٥ ساعات', status: 'new' },
  { id: '5', name: 'هيئة الإغاثة الإسلامية', email: 'info@islamicrelief.org', type: 'منظمة داعمة', message: 'دعوة للمشاركة في مؤتمر الإغاثة الدولي', date: 'منذ أسبوع', status: 'replied' },
];

export const SEED_VOLUNTEERS = [
  { id: '1', name: 'عبدالرحمن النجار', phone: '+٩٦٧ ٧٧٧ ١١١ ٢٢٢', email: 'abdu@email.com', field: 'تعليمي', status: 'active', hours: 120 },
  { id: '2', name: 'نورة أحمد', phone: '+٩٦٧ ٧٧٧ ٣٣٣ ٤٤٤', email: 'nora@email.com', field: 'صحي', status: 'active', hours: 85 },
  { id: '3', name: 'سعيد محمد', phone: '+٩٦٧ ٧٧٧ ٥٥٥ ٦٦٦', email: 'saeed@email.com', field: 'إداري', status: 'pending', hours: 0 },
  { id: '4', name: 'مريم عبدالملك', phone: '+٩٦٧ ٧٧٧ ٧٧٧ ٨٨٨', email: 'maryam@email.com', field: 'إعلامي', status: 'active', hours: 200 },
];

export const SEED_PROJECTS = [
  { id: 1, title: 'مشروع الكساء الشتوي ١٤٤٦', category: 'إغاثة', status: 'active', beneficiaries: '٢٠٠٠ أسرة', budget: '٣٥٠,٠٠٠ ر.ي', progress: 72, date: '٢٠٢٤-١٠-١', description: 'توزيع كسوة شتوية على الأسر المتضررة من البرد في المناطق المرتفعة', location: 'عدة محافظات' },
  { id: 2, title: 'مشروع التعليم في الريف', category: 'تعليم', status: 'completed', beneficiaries: '٥٠٠ طالب', budget: '١٨٠,٠٠٠ ر.ي', progress: 100, date: '٢٠٢٤-٨-١', description: 'دعم التعليم في المناطق الريفية النائية بالمحافظات', location: 'حجة، عمران' },
  { id: 3, title: 'مشروع تمكين المرأة الريفية', category: 'تنمية', status: 'pending', beneficiaries: '١٢٠ سيدة', budget: '٢٢٠,٠٠٠ ر.ي', progress: 15, date: '٢٠٢٤-١١-١', description: 'تمكين المرأة الريفية اقتصادياً عبر التدريب والتأهيل', location: 'تعز، الحديدة' },
  { id: 4, title: 'مشروع حفر الآبار', category: 'بنية تحتية', status: 'active', beneficiaries: '٣ قرى', budget: '٤٨٠,٠٠٠ ر.ي', progress: 58, date: '٢٠٢٤-٩-١٥', description: 'توفير مياه شرب نظيفة عبر حفر آبار في المناطق المحتاجة', location: 'مأرب، الجوف' },
  { id: 5, title: 'توزيع السلال الغذائية الرمضانية', category: 'إغاثة', status: 'active', beneficiaries: '٣٠٠٠ أسرة', budget: '٥٠٠,٠٠٠ ر.ي', progress: 90, date: '٢٠٢٤-٣-١', description: 'توزيع سلال غذائية خلال شهر رمضان المبارك', location: 'عدة محافظات' },
  { id: 6, title: 'برنامج التحفيظ القرآني', category: 'دعوي', status: 'active', beneficiaries: '٨٠٠ طالب', budget: '١٢٠,٠٠٠ ر.ي', progress: 45, date: '٢٠٢٤-٩-١', description: 'حلقات تحفيظ قرآن في المساجد والمراكز', location: 'صنعاء، عدن' },
];

export const SAFAVI_QIBLA_DIRECTIONS = [
  { id: '1', label: 'اتجاه القبلة', angle: 0, emoji: '🕋' },
  { id: '2', label: 'المسافة إلى مكة', value: '٣٨٠٠ كم', emoji: '📏' },
];

export const EASTER_EGG_STATES: Record<string, boolean> = {
  qibla_compass: false,
  donation_confetti: false,
  secret_projects: false,
  dev_mode: false,
  ramadan_greeting: false,
  map_3d_view: false,
};

export const NEWS_CATEGORIES = [
  { id: '1', name: 'تعليم', slug: 'education', color: '#2563EB', bg: '#EFF6FF' },
  { id: '2', name: 'إغاثة', slug: 'relief', color: '#E74C3C', bg: '#FEF2F2' },
  { id: '3', name: 'تنمية', slug: 'development', color: 'var(--brand-green)', bg: 'var(--brand-green-pale)' },
  { id: '4', name: 'شراكات', slug: 'partnerships', color: '#7C3AED', bg: '#F5F3FF' },
  { id: '5', name: 'تدريب', slug: 'training', color: '#F59E0B', bg: '#FFFBEB' },
  { id: '6', name: 'أخبار', slug: 'news', color: '#6B7280', bg: '#F3F4F6' },
];
