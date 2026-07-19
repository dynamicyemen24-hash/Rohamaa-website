import { motion } from "framer-motion";
import { BookOpen, Heart, Droplet, GraduationCap, Globe, Users, ArrowRight, Calendar, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { SEED_PROJECTS } from "@/content/website";

const programCategories = [
  { id: 'education', label: 'التعليم', icon: BookOpen, color: 'blue' },
  { id: 'relief', label: 'الإغاثة', icon: Heart, color: 'rose' },
  { id: 'water', label: 'المياه', icon: Droplet, color: 'cyan' },
  { id: 'development', label: 'التنمية', icon: Globe, color: 'emerald' },
];

export default function ProgramsPage() {
  const navigate = useNavigate();
  const programs = SEED_PROJECTS;

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[var(--brand-green)] text-sm font-semibold bg-[var(--brand-green-pale)] px-4 py-1.5 rounded-full mb-4">
            <GraduationCap className="w-4 h-4" />
            برامجنا
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            برامجنا <span className="text-[var(--brand-green)]">ومشاريعنا</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            تصفح جميع برامجنا الخيرية والإنسانية والتنموية
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl p-6 border border-[var(--border)] shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[var(--brand-green-pale)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-[var(--brand-green)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] text-lg mb-1">{program.title}</h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                    program.status === 'active' ? 'bg-green-50 text-green-600' : 
                    program.status === 'completed' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {program.status === 'active' ? 'نشط' : program.status === 'completed' ? 'مكتمل' : 'قيد الانتظار'}
                  </span>
                </div>
              </div>

              <p className="text-[var(--muted-foreground)] text-sm mb-4 leading-relaxed">
                {program.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted-foreground)] flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {program.beneficiaries}
                  </span>
                  <span className="text-[var(--muted-foreground)]">📍 {program.location}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>نسبة الإنجاز</span>
                    <span className="text-xs font-bold" style={{ color: "var(--brand-green)" }}>{program.progress}%</span>
                  </div>
                  <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[var(--brand-green)] transition-all duration-500" style={{ width: `${program.progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-sm font-semibold" style={{ color: "var(--brand-green)" }}>{program.budget}</span>
                <button 
                  onClick={() => navigate('/projects')}
                  className="flex items-center gap-1 text-sm text-[var(--brand-green)] hover:underline"
                >
                  التفاصيل
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {programs.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">لا توجد برامج متاحة حالياً</h3>
            <p className="text-[var(--muted-foreground)]">نحن نعمل على إضافة برامج جديدة قريباً</p>
          </div>
        )}
      </div>
    </div>
  );
}