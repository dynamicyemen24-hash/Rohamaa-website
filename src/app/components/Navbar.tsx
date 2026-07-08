import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { useState, useEffect, useCallback, memo } from "react";

import { useThrottle } from "@/app/hooks/useDebounce";
import { useAuth } from "@/features/auth/contexts/AuthContext";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setAdminOpen: (open: boolean) => void;
  onHoverPage?: (page: string) => void;
}

const navLinks = [
  { label: "الرئيسية", href: "home" },
  { label: "من نحن", href: "about" },
  {
    label: "برامجنا",
    href: "programs",
    children: [
      { label: "الإغاثة الإنسانية", href: "programs-relief" },
      { label: "التعليم والتأهيل", href: "programs-education" },
      { label: "التنمية المجتمعية", href: "programs-development" },
      { label: "الدعوة والإرشاد", href: "programs-dawah" },
    ],
  },
  { label: "مشاريعنا", href: "projects" },
  { label: "قصص النجاح", href: "success" },
  { label: "الأخبار", href: "news" },
  { label: "معرض الوسائط", href: "media" },
  { label: "التقارير", href: "reports" },
  { label: "الشركاء", href: "partners" },
  { label: "تواصل معنا", href: "contact" },
];

interface NavLinkButtonProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  hasDropdown?: boolean;
  isDropdownOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

const NavLinkButton = memo(function NavLinkButton({
  href,
  label,
  isActive,
  onClick,
  hasDropdown,
  isDropdownOpen,
  onMouseEnter,
  onMouseLeave,
  className = '',
}: NavLinkButtonProps) {
  const baseClasses = "flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30";
  const activeClasses = isActive
    ? "text-[var(--brand-green)] bg-[var(--brand-green-pale)]"
    : "text-[var(--foreground)] hover:text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)]";

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${baseClasses} ${activeClasses} ${className}`}
      aria-current={isActive ? 'page' : undefined}
      aria-expanded={hasDropdown ? isDropdownOpen : undefined}
      aria-haspopup={hasDropdown ? 'true' : undefined}
    >
      {label}
      {hasDropdown && (
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      )}
    </button>
  );
});

export function Navbar({ currentPage, setCurrentPage, setAdminOpen, onHoverPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  const throttledScrollHandler = useThrottle(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  const handleNav = (href: string) => {
    setCurrentPage(href);
    setMobileOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onHoverPage?.(href);
  };

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setAdminOpen(true);
    } else {
      setCurrentPage("login");
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg border-b border-[var(--border)]"
          : "bg-white/95 backdrop-blur-md"
      }`}
      style={{ direction: "rtl" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--brand-green)] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="white" />
            </div>
            <div className="text-right">
              <div
                className="text-[var(--brand-green)] leading-tight"
                style={{ fontSize: "1.15rem", fontWeight: 800 }}
              >
                رحماء بينهم
              </div>
              <div
                className="text-[var(--muted-foreground)] leading-none"
                style={{ fontSize: "0.65rem", fontWeight: 400 }}
              >
                Rohamaa Foundation
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="التنقل الرئيسي">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative">
                  <NavLinkButton
                    href={link.href}
                    label={link.label}
                    isActive={currentPage.startsWith("programs")}
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.href ? null : link.href)
                    }
                    hasDropdown={true}
                    isDropdownOpen={openDropdown === link.href}
                    onMouseEnter={() => { setOpenDropdown(link.href); onHoverPage?.(link.href); }}
                    onMouseLeave={() => setOpenDropdown(null)}
                  />
                  {openDropdown === link.href && (
                    <div
                      className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-[var(--border)] py-2 z-50 animate-fadeInDown"
                      onMouseEnter={() => setOpenDropdown(link.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.children.map((child) => (
                        <button
                          key={child.href}
                          onClick={() => handleNav(child.href)}
                          className="w-full text-right px-4 py-2.5 text-sm text-[var(--foreground)] hover:text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)] transition-colors focus:outline-none focus:bg-[var(--brand-green-pale)]"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLinkButton
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={currentPage === link.href}
                  onClick={() => handleNav(link.href)}
                  onMouseEnter={() => onHoverPage?.(link.href)}
                />
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav("donate")}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[var(--brand-green)] text-white rounded-lg hover:bg-[var(--brand-green-light)] transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/50"
              style={{ fontSize: "0.85rem" }}
            >
              <Heart className="w-4 h-4" fill="white" />
              تبرع الآن
            </button>
            <button
              onClick={handleAdminAccess}
              className="hidden sm:block px-3 py-2 text-xs text-[var(--muted-foreground)] hover:text-[var(--brand-green)] border border-[var(--border)] rounded-lg hover:border-[var(--brand-green)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30"
            >
              لوحة التحكم
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/30"
              aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-[var(--foreground)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--foreground)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[var(--border)] py-4 space-y-1 animate-fadeInDown">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <NavLinkButton
                    href={link.href}
                    label={link.label}
                    isActive={currentPage.startsWith("programs")}
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.href ? null : link.href)
                    }
                    hasDropdown={true}
                    isDropdownOpen={openDropdown === link.href}
                    className="w-full justify-between"
                  />
                  {openDropdown === link.href && (
                    <div className="pr-4 space-y-1 mt-1">
                      {link.children.map((child) => (
                        <button
                          key={child.href}
                          onClick={() => handleNav(child.href)}
                          className="w-full text-right px-4 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)] rounded-lg transition-colors focus:outline-none focus:bg-[var(--brand-green-pale)]"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLinkButton
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={currentPage === link.href}
                  onClick={() => handleNav(link.href)}
                  className="w-full justify-start"
                />
              )
            )}
            <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
              <button
                onClick={() => handleNav("donate")}
                className="w-full py-3 bg-[var(--brand-green)] text-white rounded-lg text-sm hover:bg-[var(--brand-green-light)] transition-colors"
              >
                تبرع الآن
              </button>
              <button
                onClick={() => { handleAdminAccess(); setMobileOpen(false); }}
                className="w-full py-2.5 border border-[var(--border)] text-[var(--muted-foreground)] rounded-lg text-sm hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] transition-colors"
              >
                لوحة التحكم
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}