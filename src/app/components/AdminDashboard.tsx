import { useState } from "react";
import {
  LayoutDashboard, Newspaper, FolderOpen, Star, Handshake,
  FileText, Image, MessageSquare, FormInput, Settings,
  X, Plus, Edit2, Trash2, Eye, CheckCircle,
  Users, Globe, ChevronDown, Search,
  Bell,
} from "lucide-react";
import { newsData } from "./News";

const sidebarItems = [
  { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { id: "news", label: "إدارة الأخبار", icon: Newspaper },
  { id: "projects", label: "إدارة المشاريع", icon: FolderOpen },
  { id: "stories", label: "قصص النجاح", icon: Star },
  { id: "partners", label: "الشركاء", icon: Handshake },
  { id: "reports", label: "التقارير والإصدارات", icon: FileText },
  { id: "media", label: "إدارة الوسائط", icon: Image },
  { id: "messages", label: "الرسائل والاستفسارات", icon: MessageSquare },
  { id: "forms", label: "إدارة النماذج", icon: FormInput },
  { id: "content", label: "المحتوى المؤسسي", icon: Settings },
];

const mockProjects = [
  { id: 1, title: "مشروع الكساء الشتوي ١٤٤٦", category: "إغاثة", status: "active", beneficiaries: "٢٠٠٠ أسرة", budget: "٣٥٠,٠٠٠ ر.ي", progress: 72, date: "٢٠٢٤-١٠-١" },
  { id: 2, title: "مشروع التعليم في الريف", category: "تعليم", status: "completed", beneficiaries: "٥٠٠ طالب", budget: "١٨٠,٠٠٠ ر.ي", progress: 100, date: "٢٠٢٤-٨-١" },
  { id: 3, title: "مشروع تمكين المرأة الريفية", category: "تنمية", status: "pending", beneficiaries: "١٢٠ سيدة", budget: "٢٢٠,٠٠٠ ر.ي", progress: 15, date: "٢٠٢٤-١١-١" },
  { id: 4, title: "مشروع حفر الآبار", category: "بنية تحتية", status: "active", beneficiaries: "٣ قرى", budget: "٤٨٠,٠٠٠ ر.ي", progress: 58, date: "٢٠٢٤-٩-١٥" },
];

const mockMessages = [
  { id: 1, name: "أحمد محمد", email: "ahmed@email.com", type: "مانح", subject: "الاستفسار عن التبرع", status: "new", date: "منذ ساعتين" },
  { id: 2, name: "فاطمة علي", email: "fatima@email.com", type: "متطوع", subject: "طلب التطوع", status: "read", date: "منذ يوم" },
  { id: 3, name: "سارة ناصر", email: "sara@email.com", type: "شريك", subject: "اقتراح شراكة", status: "replied", date: "منذ ٣ أيام" },
  { id: 4, name: "خالد إبراهيم", email: "k@email.com", type: "إعلامي", subject: "طلب مقابلة صحفية", status: "new", date: "منذ ٤ ساعات" },
];

const statusConfig = {
  active: { label: "نشط", color: "var(--brand-green)", bg: "var(--brand-green-pale)" },
  completed: { label: "مكتمل", color: "#2563EB", bg: "#EFF6FF" },
  pending: { label: "قيد الانتظار", color: "var(--brand-gold)", bg: "var(--brand-gold-pale)" },
  new: { label: "جديد", color: "#E74C3C", bg: "#FEF2F2" },
  read: { label: "مقروء", color: "var(--muted-foreground)", bg: "var(--muted)" },
  replied: { label: "تم الرد", color: "var(--brand-green)", bg: "var(--brand-green-pale)" },
};

interface AdminDashboardProps {
  onClose: () => void;
}

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNews, setNewNews] = useState({ title: "", category: "", excerpt: "" });
  const [localNews, setLocalNews] = useState([...newsData]);

  const currentItem = sidebarItems.find((s) => s.id === activeSection);

  const filteredProjects = mockProjects.filter(
    (p) =>
      p.title.includes(searchTerm) ||
      p.category.includes(searchTerm)
  );

  const filteredMessages = mockMessages.filter(
    (m) =>
      m.name.includes(searchTerm) ||
      m.subject.includes(searchTerm)
  );

  const filteredNews = localNews.filter(
    (n) =>
      n.title.includes(searchTerm) ||
      n.category.includes(searchTerm)
  );

  const handleAddNews = () => {
    if (!newNews.title || !newNews.category) return;
    const item = {
      id: Date.now(),
      title: newNews.title,
      excerpt: newNews.excerpt || "وصف الخبر...",
      category: newNews.category,
      categoryColor: "var(--brand-green)",
      categoryBg: "var(--brand-green-pale)",
      date: "اليوم",
      dateEn: new Date().toISOString().slice(0, 10),
      image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&h=400&fit=crop&auto=format",
      views: "٠",
      featured: false,
    };
    setLocalNews([item, ...localNews]);
    setNewNews({ title: "", category: "", excerpt: "" });
    setShowAddModal(false);
  };

  const handleDeleteNews = (id: number) => {
    setLocalNews(localNews.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed inset-0 z-[100] flex" style={{ direction: "rtl", fontFamily: "Cairo, sans-serif" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 flex w-full max-w-7xl mx-auto my-4 rounded-2xl overflow-hidden shadow-2xl bg-[var(--background)]">
        {/* Sidebar */}
        <aside
          className={`flex-shrink-0 transition-all duration-300 flex flex-col border-l border-[var(--border)] bg-white ${
            sidebarCollapsed ? "w-16" : "w-56"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            {!sidebarCollapsed && (
              <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--brand-green)" }}>
                لوحة التحكم
              </span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 text-[var(--muted-foreground)] transition-transform ${
                  sidebarCollapsed ? "-rotate-90" : "rotate-90"
                }`}
              />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-right ${
                    active
                      ? "bg-[var(--brand-green-pale)] text-[var(--brand-green)]"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span style={{ fontSize: "0.8rem", fontWeight: active ? 700 : 500 }}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-[var(--border)]">
            <button
              onClick={onClose}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <X className="w-4 h-4" />
              {!sidebarCollapsed && <span style={{ fontSize: "0.8rem" }}>إغلاق</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-white">
            <div>
              <h2 className="text-[var(--foreground)]" style={{ fontSize: "1rem", fontWeight: 700 }}>
                {currentItem?.label || "لوحة التحكم"}
              </h2>
              <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.72rem" }}>
                مرحباً بك في لوحة إدارة مؤسسة رحماء بينهم
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-[var(--muted)] transition-colors">
                <Bell className="w-4 h-4 text-[var(--muted-foreground)]" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--muted)] rounded-lg">
                <div className="w-6 h-6 rounded-full bg-[var(--brand-green)] flex items-center justify-center text-white" style={{ fontSize: "0.6rem", fontWeight: 700 }}>م</div>
                {!sidebarCollapsed && <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>المدير</span>}
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Search */}
            {activeSection !== "dashboard" && (
              <div className="relative mb-5">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="بحث..."
                  className="w-full pr-10 pl-4 py-2.5 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30 focus:border-[var(--brand-green)]"
                  style={{ fontSize: "0.85rem" }}
                />
              </div>
            )}

            {/* Dashboard Overview */}
            {activeSection === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "إجمالي المستفيدين", value: "١٢,٨٤٧", trend: "+١٢٪", icon: Users, color: "var(--brand-green)" },
                    { label: "المشاريع النشطة", value: "٢٤", trend: "+٣", icon: FolderOpen, color: "var(--brand-gold)" },
                    { label: "رسائل جديدة", value: "٨", trend: "جديد", icon: MessageSquare, color: "#E74C3C" },
                    { label: "الشركاء", value: "٤٨", trend: "+٢", icon: Handshake, color: "#7C3AED" },
                  ].map((card) => {
                    const Icon = card.icon;
                    return (
                      <div key={card.label} className="bg-white rounded-xl p-5 border border-[var(--border)] shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${card.color}18` }}>
                            <Icon className="w-4 h-4" style={{ color: card.color }} />
                          </div>
                          <span className="text-[var(--brand-green)]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                            {card.trend}
                          </span>
                        </div>
                        <div style={{ fontSize: "1.5rem", fontWeight: 800, color: card.color }}>
                          {card.value}
                        </div>
                        <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.72rem" }}>
                          {card.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
                    <h3 className="text-[var(--foreground)] mb-4" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                      آخر الأخبار المنشورة
                    </h3>
                    <div className="space-y-3">
                      {localNews.slice(0, 3).map((n) => (
                        <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--muted)] transition-colors">
                          <img src={n.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="text-[var(--foreground)] truncate" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{n.title}</div>
                            <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.68rem" }}>{n.date}</div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full flex-shrink-0" style={{ fontSize: "0.62rem", fontWeight: 700, background: n.categoryBg, color: n.categoryColor }}>
                            {n.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
                    <h3 className="text-[var(--foreground)] mb-4" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                      الرسائل الجديدة
                    </h3>
                    <div className="space-y-3">
                      {mockMessages.filter(m => m.status === "new").map((m) => (
                        <div key={m.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--muted)] transition-colors">
                          <div className="w-8 h-8 rounded-full bg-[var(--brand-green-pale)] flex items-center justify-center flex-shrink-0" style={{ color: "var(--brand-green)", fontSize: "0.75rem", fontWeight: 700 }}>
                            {m.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[var(--foreground)]" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{m.name}</span>
                              <span className="text-[var(--muted-foreground)]" style={{ fontSize: "0.65rem" }}>{m.date}</span>
                            </div>
                            <div className="text-[var(--muted-foreground)] truncate" style={{ fontSize: "0.72rem" }}>{m.subject}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Workflow */}
                <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
                  <h3 className="text-[var(--foreground)] mb-4" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                    دورة اعتماد المحتوى
                  </h3>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {[
                      { label: "إعداد المحتوى", icon: Edit2, count: 3, color: "#7C3AED" },
                      { label: "المراجعة التحريرية", icon: Eye, count: 2, color: "var(--brand-gold)" },
                      { label: "الاعتماد", icon: CheckCircle, count: 1, color: "#2563EB" },
                      { label: "النشر", icon: Globe, count: 8, color: "var(--brand-green)" },
                      { label: "الأرشفة", icon: FileText, count: 45, color: "var(--muted-foreground)" },
                    ].map((step, i, arr) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.label} className="flex items-center gap-2 flex-shrink-0">
                          <div className="flex flex-col items-center text-center">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center mb-2 relative"
                              style={{ background: `${step.color}18` }}
                            >
                              <Icon className="w-4 h-4" style={{ color: step.color }} />
                              <span
                                className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-white"
                                style={{ fontSize: "0.6rem", fontWeight: 800, background: step.color }}
                              >
                                {step.count}
                              </span>
                            </div>
                            <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--foreground)" }}>{step.label}</span>
                          </div>
                          {i < arr.length - 1 && (
                            <div className="w-8 h-0.5 bg-[var(--border)] flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* News Management */}
            {activeSection === "news" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.8rem" }}>
                    {filteredNews.length} خبر
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-green)] text-white rounded-lg hover:bg-[var(--brand-green-light)] transition-colors"
                    style={{ fontSize: "0.82rem", fontWeight: 600 }}
                  >
                    <Plus className="w-4 h-4" />
                    إضافة خبر
                  </button>
                </div>

                {showAddModal && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
                    <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl" style={{ direction: "rtl" }}>
                      <div className="flex items-center justify-between mb-5">
                        <h3 style={{ fontWeight: 700 }}>إضافة خبر جديد</h3>
                        <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-[var(--muted)]">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 600 }}>عنوان الخبر</label>
                          <input
                            value={newNews.title}
                            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                            className="w-full mt-1.5 px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30 focus:border-[var(--brand-green)]"
                            style={{ fontSize: "0.85rem" }}
                            placeholder="أدخل عنوان الخبر"
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 600 }}>التصنيف</label>
                          <select
                            value={newNews.category}
                            onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                            className="w-full mt-1.5 px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <option value="">اختر التصنيف</option>
                            <option>إغاثة</option>
                            <option>تعليم</option>
                            <option>تنمية</option>
                            <option>شراكات</option>
                            <option>تدريب</option>
                            <option>أخبار</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 600 }}>ملخص الخبر</label>
                          <textarea
                            rows={3}
                            value={newNews.excerpt}
                            onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })}
                            className="w-full mt-1.5 px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--input-background)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30 resize-none"
                            style={{ fontSize: "0.85rem" }}
                            placeholder="ملخص الخبر..."
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleAddNews}
                            className="flex-1 py-2.5 bg-[var(--brand-green)] text-white rounded-lg hover:bg-[var(--brand-green-light)] transition-colors"
                            style={{ fontSize: "0.85rem", fontWeight: 600 }}
                          >
                            حفظ ونشر
                          </button>
                          <button
                            onClick={() => setShowAddModal(false)}
                            className="flex-1 py-2.5 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors"
                            style={{ fontSize: "0.85rem" }}
                          >
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                        {["الخبر", "التصنيف", "التاريخ", "المشاهدات", "الإجراءات"].map((h) => (
                          <th key={h} className="px-4 py-3 text-right text-[var(--muted-foreground)]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {filteredNews.map((item) => (
                        <tr key={item.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                              <span className="text-[var(--foreground)]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                                {item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.7rem", fontWeight: 700, background: item.categoryBg, color: item.categoryColor }}>
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[var(--muted-foreground)]" style={{ fontSize: "0.75rem" }}>
                            {item.date}
                          </td>
                          <td className="px-4 py-3 text-[var(--muted-foreground)]" style={{ fontSize: "0.75rem" }}>
                            {item.views}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 rounded-lg text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)] transition-colors">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteNews(item.id)}
                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Projects Management */}
            {activeSection === "projects" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.8rem" }}>
                    {filteredProjects.length} مشروع
                  </div>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-green)] text-white rounded-lg hover:bg-[var(--brand-green-light)] transition-colors"
                    style={{ fontSize: "0.82rem", fontWeight: 600 }}
                  >
                    <Plus className="w-4 h-4" />
                    مشروع جديد
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProjects.map((project) => {
                    const sc = statusConfig[project.status as keyof typeof statusConfig];
                    return (
                      <div key={project.id} className="bg-white rounded-xl p-5 border border-[var(--border)] hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--foreground)" }}>
                              {project.title}
                            </div>
                            <div className="text-[var(--muted-foreground)]" style={{ fontSize: "0.72rem" }}>
                              {project.category}
                            </div>
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-full flex-shrink-0"
                            style={{ fontSize: "0.68rem", fontWeight: 700, background: sc.bg, color: sc.color }}
                          >
                            {sc.label}
                          </span>
                        </div>
                        <div className="flex gap-4 mb-3 text-[var(--muted-foreground)]">
                          <span style={{ fontSize: "0.72rem" }}>👥 {project.beneficiaries}</span>
                          <span style={{ fontSize: "0.72rem" }}>💰 {project.budget}</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>التقدم</span>
                            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--brand-green)" }}>{project.progress}٪</span>
                          </div>
                          <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[var(--brand-green)]"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                          <span className="text-[var(--muted-foreground)]" style={{ fontSize: "0.7rem" }}>{project.date}</span>
                          <div className="flex gap-1.5">
                            <button className="p-1.5 rounded-lg text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)]">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg text-red-400 hover:bg-red-50">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            {activeSection === "messages" && (
              <div>
                <div className="text-[var(--muted-foreground)] mb-5" style={{ fontSize: "0.8rem" }}>
                  {filteredMessages.length} رسالة — {filteredMessages.filter(m => m.status === "new").length} جديدة
                </div>
                <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                        {["المرسل", "النوع", "الموضوع", "الحالة", "التاريخ", "إجراء"].map((h) => (
                          <th key={h} className="px-4 py-3 text-right text-[var(--muted-foreground)]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {filteredMessages.map((msg) => {
                        const sc = statusConfig[msg.status as keyof typeof statusConfig];
                        return (
                          <tr key={msg.id} className={`hover:bg-[var(--muted)]/50 transition-colors ${msg.status === "new" ? "font-semibold" : ""}`}>
                            <td className="px-4 py-3">
                              <div>
                                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--foreground)" }}>{msg.name}</div>
                                <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }} dir="ltr">{msg.email}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]" style={{ fontSize: "0.7rem" }}>
                                {msg.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-[var(--foreground)]" style={{ fontSize: "0.8rem" }}>{msg.subject}</td>
                            <td className="px-4 py-3">
                              <span className="px-2.5 py-1 rounded-full" style={{ fontSize: "0.68rem", fontWeight: 700, background: sc.bg, color: sc.color }}>
                                {sc.label}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-[var(--muted-foreground)]" style={{ fontSize: "0.72rem" }}>{msg.date}</td>
                            <td className="px-4 py-3">
                              <button className="px-3 py-1.5 bg-[var(--brand-green-pale)] text-[var(--brand-green)] rounded-lg hover:bg-[var(--brand-green)] hover:text-white transition-colors" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                                رد
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Other Sections — Placeholder */}
            {!["dashboard", "news", "projects", "messages"].includes(activeSection) && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[var(--brand-green-pale)] flex items-center justify-center mb-4">
                  {(() => {
                    const Icon = sidebarItems.find(s => s.id === activeSection)?.icon || Settings;
                    return <Icon className="w-8 h-8 text-[var(--brand-green)]" />;
                  })()}
                </div>
                <h3 className="text-[var(--foreground)] mb-2" style={{ fontWeight: 700 }}>
                  {currentItem?.label}
                </h3>
                <p className="text-[var(--muted-foreground)] max-w-sm" style={{ fontSize: "0.85rem" }}>
                  هذا القسم قيد التطوير وسيكون متاحًا قريبًا. يمكنك إدارة المحتوى المرتبط بهذا القسم من هنا.
                </p>
                <button
                  className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-[var(--brand-green)] text-white rounded-lg hover:bg-[var(--brand-green-light)] transition-colors"
                  style={{ fontSize: "0.82rem", fontWeight: 600 }}
                >
                  <Plus className="w-4 h-4" />
                  إضافة محتوى
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
