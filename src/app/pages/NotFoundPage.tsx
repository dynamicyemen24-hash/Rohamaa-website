import { motion } from "framer-motion";
import { Home, ArrowRight, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 flex items-center" dir="rtl">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="text-[var(--brand-green)] text-9xl font-bold mb-6">404</div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            عذراً، الصفحة غير موجودة
          </h1>
          
          <p className="text-[var(--muted-foreground)] text-lg mb-8">
            الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <button className="inline-flex items-center gap-2 bg-[var(--brand-green)] text-white px-8 py-3 rounded-xl font-bold hover:bg-[var(--brand-green-light)] transition-colors">
                <Home className="w-5 h-5" />
                العودة للرئيسية
              </button>
            </Link>
            
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--foreground)] px-8 py-3 rounded-xl font-bold hover:bg-[var(--secondary)] transition-colors">
                تواصل معنا
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              يمكنك العودة إلى الصفحات الرئيسية:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="text-[var(--brand-green)] hover:underline">من نحن</Link>
              <Link to="/programs" className="text-[var(--brand-green)] hover:underline">برامجنا</Link>
              <Link to="/projects" className="text-[var(--brand-green)] hover:underline">مشاريعنا</Link>
              <Link to="/stories" className="text-[var(--brand-green)] hover:underline">قصص النجاح</Link>
              <Link to="/media" className="text-[var(--brand-green)] hover:underline">المعرض</Link>
              <Link to="/donate" className="text-[var(--brand-green)] hover:underline">تبرع</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}