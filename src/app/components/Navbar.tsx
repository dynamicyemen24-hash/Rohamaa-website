import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Heart } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setAdminOpen: (open: boolean) => void;
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
  { label: "الشركاء", href: "partners" },
  { label: "تواصل معنا", href: "contact" },
];

export function Navbar({ currentPage, setCurrentPage, setAdminOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setCurrentPage(href);
    setMobileOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.href ? null : link.href)
                    }
                    onMouseEnter={() => setOpenDropdown(link.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentPage.startsWith("programs")
                        ? "text-[var(--brand-green)] bg-[var(--brand-green-pale)]"
                        : "text-[var(--foreground)] hover:text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === link.href && (
                    <div
                      className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-[var(--border)] py-2 z-50"
                      onMouseEnter={() => setOpenDropdown(link.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.children.map((child) => (
                        <button
                          key={child.href}
                          onClick={() => handleNav(child.href)}
                          className="w-full text-right px-4 py-2.5 text-sm text-[var(--foreground)] hover:text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)] transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentPage === link.href
                      ? "text-[var(--brand-green)] bg-[var(--brand-green-pale)]"
                      : "text-[var(--foreground)] hover:text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)]"
                  }`}
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav("donate")}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[var(--brand-green)] text-white rounded-lg hover:bg-[var(--brand-green-light)] transition-colors shadow-sm hover:shadow-md"
              style={{ fontSize: "0.85rem" }}
            >
              <Heart className="w-4 h-4" fill="white" />
              تبرع الآن
            </button>
            <button
              onClick={() => setAdminOpen(true)}
              className="hidden sm:block px-3 py-2 text-xs text-[var(--muted-foreground)] hover:text-[var(--brand-green)] border border-[var(--border)] rounded-lg hover:border-[var(--brand-green)] transition-colors"
            >
              لوحة التحكم
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
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
          <div className="lg:hidden border-t border-[var(--border)] py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.href ? null : link.href)
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-lg hover:bg-[var(--brand-green-pale)] hover:text-[var(--brand-green)]"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === link.href ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === link.href && (
                    <div className="pr-4 space-y-1 mt-1">
                      {link.children.map((child) => (
                        <button
                          key={child.href}
                          onClick={() => handleNav(child.href)}
                          className="w-full text-right px-4 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)] rounded-lg transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`w-full text-right px-4 py-2.5 text-sm rounded-lg transition-colors ${
                    currentPage === link.href
                      ? "text-[var(--brand-green)] bg-[var(--brand-green-pale)]"
                      : "text-[var(--foreground)] hover:text-[var(--brand-green)] hover:bg-[var(--brand-green-pale)]"
                  }`}
                >
                  {link.label}
                </button>
              )
            )}
            <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
              <button
                onClick={() => handleNav("donate")}
                className="w-full py-3 bg-[var(--brand-green)] text-white rounded-lg text-sm"
              >
                تبرع الآن
              </button>
              <button
                onClick={() => { setAdminOpen(true); setMobileOpen(false); }}
                className="w-full py-2.5 border border-[var(--border)] text-[var(--muted-foreground)] rounded-lg text-sm"
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
