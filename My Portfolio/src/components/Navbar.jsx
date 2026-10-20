import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiDownload, FiTerminal } from 'react-icons/fi';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'github', label: 'GitHub' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, isDark, toggleTheme, profile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#0a0d16]/85 dark:bg-[#0a0d16]/85 light:bg-white/85 backdrop-blur-xl border-b border-indigo-500/10 dark:border-white/10 shadow-lg shadow-black/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-sm">
              <div className="w-full h-full bg-[#0d111d] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-bold text-sm bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  MR
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-base tracking-tight text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors">
                {profile.name}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-400/90 dark:text-indigo-400 light:text-indigo-600 font-medium">
                <FiTerminal className="w-3 h-3" />
                Java Full Stack
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-800/80 dark:border-slate-800 light:border-slate-200 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white light:text-indigo-900 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full -z-10 shadow-glow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 dark:bg-slate-800/60 light:bg-slate-200/80 text-slate-300 light:text-slate-700 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 transition-colors"
            >
              {isDark ? (
                <FiSun className="w-4 h-4 text-amber-300" />
              ) : (
                <FiMoon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Resume Button */}
            <a
              href={profile.resumeUrl}
              download="Megatheshwaran_R_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-glow-sm transition-all transform hover:-translate-y-0.5"
            >
              <FiDownload className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Open mobile menu"
              className="lg:hidden p-2.5 rounded-xl bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-200/80 text-slate-300 light:text-slate-700 border border-slate-700/60"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0c0f18]/95 dark:bg-[#0c0f18]/95 light:bg-white/95 backdrop-blur-2xl border-b border-slate-800 light:border-slate-200 px-6 py-6"
          >
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-indigo-600 text-white font-semibold shadow-glow-sm'
                      : 'text-slate-300 light:text-slate-700 hover:bg-slate-800/50 light:hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-800 light:border-slate-200">
                <a
                  href={profile.resumeUrl}
                  download="Megatheshwaran_R_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-glow-sm"
                >
                  <FiDownload className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
