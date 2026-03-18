import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { PERSONAL } from '../data/content';

const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.getElementById(item.toLowerCase()));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'backdrop-blur-2xl border-b border-border/30'
            : ''
          }`}
        style={
          scrolled
            ? { background: 'hsl(222 28% 3% / 0.85)', boxShadow: '0 4px 30px rgba(0,0,0,0.3)' }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Scroll to top"
            className="text-xl font-bold mono relative group"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, hsl(162 85% 52%), hsl(268 65% 65%))',
              }}
            >
              SER
            </span>
            {/* Underline grow */}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-400 rounded-full" />
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.toLowerCase();
              const isHovered = hoverItem === item;
              return (
                <motion.button
                  key={item}
                  onClick={() => scrollTo(item)}
                  onHoverStart={() => setHoverItem(item)}
                  onHoverEnd={() => setHoverItem(null)}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative px-4 py-2 rounded-xl text-sm mono transition-colors duration-300 group"
                  style={{ color: isActive ? 'hsl(162 85% 55%)' : 'hsl(215 14% 52%)' }}
                >
                  {/* Background pill on hover */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.span
                        layoutId="nav-bg"
                        key="nav-bg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: isActive
                            ? 'hsl(162 85% 48% / 0.08)'
                            : 'hsl(222 18% 15% / 0.6)',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <span className="relative z-10">
                    <span className="text-primary/40 mr-1 text-xs">0{i + 1}.</span>
                    {item}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Desktop Resume */}
          <motion.a
            href={PERSONAL.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-medium mono transition-all duration-300 hover:bg-primary/8 hover:border-primary/55"
            style={{ boxShadow: '0 0 15px hsl(162 85% 48% / 0.1)' }}
          >
            <Download size={14} />
            Resume
          </motion.a>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -16, height: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[65px] left-0 right-0 z-40 overflow-hidden md:hidden border-b border-border/30"
            style={{ background: 'hsl(222 28% 3% / 0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col gap-0.5 px-6 py-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => scrollTo(item)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`text-left py-3 px-4 rounded-xl text-sm mono transition-all duration-200 ${activeSection === item.toLowerCase()
                      ? 'text-primary bg-primary/8'
                      : 'text-muted-foreground hover:text-primary hover:bg-white/4'
                    }`}
                >
                  <span className="text-primary/40 mr-2 text-xs">0{i + 1}.</span>
                  {item}
                </motion.button>
              ))}
              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-primary/30 text-primary text-sm mono hover:bg-primary/8 transition-all duration-300"
              >
                <Download size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
