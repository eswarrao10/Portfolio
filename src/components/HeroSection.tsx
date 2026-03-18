import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import HeroScene from './HeroScene';
import { Github, Linkedin, Mail, ChevronDown, Download, Sparkles } from 'lucide-react';
import { PERSONAL } from '../data/content';

// ── Typewriter with smooth erase ────────────────────────────────────────────
function TypedText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 28);
      } else {
        setIndex(prev => (prev + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index, words]);

  return (
    <span className="inline-flex items-center gap-0.5">
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(214 92% 65%), hsl(38 95% 58%))',
          backgroundSize: '200% 200%',
        }}
      >
        {displayed}
      </span>
      <span className="cursor-blink" />
    </span>
  );
}

// ── Magnetic social button ───────────────────────────────────────────────────
function MagneticButton({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.9 }}
      className="group relative w-13 h-13 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300 overflow-hidden"
    >
      {/* Hover fill */}
      <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/8 transition-all duration-500 scale-0 group-hover:scale-100" />
      {/* Glow ring */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: '0 0 20px hsl(162 85% 48% / 0.35)' }} />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

// ── Staggered word animation ─────────────────────────────────────────────────
function AnimatedWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 32, rotateX: -45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', transformOrigin: '50% 100%' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const socials = [
    { icon: Github, href: PERSONAL.github, label: 'GitHub' },
    { icon: Linkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL.email}`, label: 'Email' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />

      {/* Vignette only — no grid (3D scene is the background) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 85% 65% at 50% 50%, transparent 25%, hsl(224 32% 3% / 0.65) 100%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ perspective: 1000 }}
      >
        {/* Available badge */}
        {PERSONAL.availableForWork && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/25 bg-primary/5 mb-8 backdrop-blur-sm"
            style={{ boxShadow: '0 0 30px hsl(162 85% 48% / 0.1)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="mono text-xs text-primary/80 tracking-widest uppercase">
              Available for opportunities
            </span>
            <Sparkles size={12} className="text-primary/60" />
          </motion.div>
        )}

        {/* Code-like tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <p className="mono text-primary/70 text-sm md:text-base tracking-wider">
            {'< '}<TypedText words={PERSONAL.taglines} />{' />'}
          </p>
        </motion.div>

        {/* Name - staggered words with 3D flip */}
        <div className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.05] mb-6">
          <div style={{ perspective: 800 }}>
            <AnimatedWords
              text={PERSONAL.name.split(' ')[0]}
              className="text-foreground block"
              delay={0.35}
            />
          </div>
          <div style={{ perspective: 800 }}>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, hsl(162 85% 52%), hsl(180 80% 60%), hsl(268 65% 70%))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease infinite',
                filter: 'drop-shadow(0 0 30px hsl(162 85% 48% / 0.3))',
              }}
            >
              <AnimatedWords
                text={PERSONAL.name.split(' ').slice(1).join(' ')}
                delay={0.5}
              />
            </span>
          </div>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          An aspiring <span className="text-foreground/80">Data Analyst</span> dedicated to turning complex data into actionable insights through{' '}
          <span className="text-foreground/80">Machine Learning</span> and statistical precision.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="flex items-center justify-center gap-5 flex-wrap"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <MagneticButton key={label} href={href} label={label}>
              <Icon size={20} />
            </MagneticButton>
          ))}

          <div className="w-px h-8 bg-border/30 hidden sm:block" />

          <motion.a
            href={PERSONAL.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-medium transition-all duration-300 mono text-sm relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, hsl(214 92% 55%), hsl(214 92% 45%))',
              color: '#ffffff',
              boxShadow: '0 0 30px hsl(214 92% 62% / 0.4), 0 8px 24px -8px rgba(0,0,0,0.4)',
            }}
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 0.8s ease',
              }}
            />
            <Download size={16} className="relative z-10" />
            <span className="relative z-10">Resume</span>
          </motion.a>

          <motion.a
            href="#about"
            onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline text-sm"
          >
            View Work
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
          aria-label="Scroll down"
        >
          <span className="mono text-[10px] text-muted-foreground/40 tracking-widest group-hover:text-primary/60 transition-colors">
            scroll
          </span>
          <ChevronDown size={16} className="text-primary/50 group-hover:text-primary/80 transition-colors" />
        </motion.button>
      </motion.div>
    </section>
  );
}
