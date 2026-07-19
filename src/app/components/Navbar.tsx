// Navbar Component - Navigation Bar for the Website
import { useState, useEffect, useCallback } from 'react';
import { Heart, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setAdminOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'about', label: 'عن المؤسسة' },
  { id: 'programs', label: 'برامجنا' },
  { id: 'projects', label: 'مشاريعنا' },
  { id: 'success', label: 'قصص النجاح' },
  { id: 'news', label: 'الأخبار' },
  { id: 'transparency', label: 'الشفافية' },
  { id: 'contact', label: 'اتصل بنا' },
];

export default function Navbar({ currentPage, setCurrentPage, setAdminOpen }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = useCallback((page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  }, [setCurrentPage]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
      dir="rtl"
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation('home')}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-green)] to-emerald-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div className="text-right hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">رحماء بينهم</h1>
              <p className="text-xs text-gray-500">Rahamaa Foundation</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative px-4 py-2 rounded-full transition-all text-sm font-medium ${
                  currentPage === item.id
                    ? 'bg-[var(--brand-green)]/10 text-[var(--brand-green)]'
                    : 'text-gray-600 hover:text-[var(--brand-green)] hover:bg-gray-100'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--brand-green)] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigation('donate')}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-l from-[var(--brand-green)] to-emerald-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              <Heart className="w-4 h-4" fill="white" />
              تبرع الآن
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white rounded-2xl shadow-xl border border-gray-100 mb-4 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full text-right px-4 py-3 rounded-lg transition-all ${
                      currentPage === item.id
                        ? 'bg-[var(--brand-green)]/10 text-[var(--brand-green)] font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigation('donate')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-l from-[var(--brand-green)] to-emerald-600 text-white rounded-lg font-medium mt-4"
                >
                  <Heart className="w-4 h-4" fill="white" />
                  تبرع الآن
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}