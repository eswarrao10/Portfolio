import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import { PERSONAL } from '../data/content';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);
  const [hoverEmail, setHoverEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const socials = [
    { icon: Github, href: PERSONAL.github, label: 'GitHub', color: 'hsl(215 14% 60%)' },
    { icon: Linkedin, href: PERSONAL.linkedin, label: 'LinkedIn', color: '#0ea5e9' },
    { icon: Mail, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL.email}`, label: 'Email', color: 'hsl(162 85% 48%)' },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Large breathing orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(162 85% 48%), transparent 65%)' }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(268 65% 62%), transparent 65%)' }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">

        {/* Section number */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-4"
        >
          05. What&apos;s Next?
        </motion.p>

        {/* Heading with gradient word */}
        <motion.h2
          initial={{ opacity: 0, y: 36, filter: 'blur(12px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
        >
          Let&apos;s Build Something{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, hsl(162 85% 52%), hsl(268 65% 65%))',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease infinite',
            }}
          >
            Amazing
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-lg mx-auto"
        >
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to build something great.
        </motion.p>

        {/* Email CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          {/* Main email button */}
          <motion.a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL.email}`}
            target="_blank"
            rel="noopener noreferrer"
            onHoverStart={() => setHoverEmail(true)}
            onHoverEnd={() => setHoverEmail(false)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Send email"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 overflow-hidden font-semibold text-base mono transition-colors duration-400"
            style={{
              borderColor: 'hsl(162 85% 48% / 0.4)',
              color: 'hsl(162 85% 55%)',
              boxShadow: hoverEmail ? '0 0 40px hsl(162 85% 48% / 0.2)' : '0 0 20px hsl(162 85% 48% / 0.08)',
            }}
          >
            {/* Fill on hover */}
            <motion.span
              initial={false}
              animate={{ opacity: hoverEmail ? 1 : 0, scale: hoverEmail ? 1 : 0.8 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 bg-primary/6 rounded-2xl"
            />
            <Mail size={18} className="relative z-10 shrink-0" />
            <span className="relative z-10 text-sm">{PERSONAL.email}</span>
            <ArrowUpRight
              size={16}
              className="relative z-10 opacity-0 group-hover:opacity-100 -ml-1 transition-opacity"
            />
          </motion.a>

          {/* Copy button */}
          <motion.button
            onClick={copyEmail}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Copy email address"
            className="relative w-14 h-14 rounded-2xl border border-border/40 flex items-center justify-center transition-all duration-300 overflow-hidden group"
            style={{ color: copied ? 'hsl(162 85% 48%)' : undefined }}
          >
            <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/6 transition-all duration-300" />
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10"
                >
                  <Check size={19} className="text-primary" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <Copy size={19} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-center gap-3"
        >
          {socials.map(({ icon: Icon, href, label, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 18, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.75 + i * 0.1, type: 'spring', stiffness: 260 }}
              whileHover={{ y: -6, scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="group relative w-12 h-12 rounded-xl border border-border/40 flex items-center justify-center text-muted-foreground transition-all duration-300 overflow-hidden"
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `${color}10` }}
              />
              <Icon size={20} className="relative z-10 transition-colors duration-300 group-hover:text-current" style={{ '--tw-text-opacity': 1 } as React.CSSProperties} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.1 }}
        className="text-center mt-28 pt-8 border-t border-border/15"
      >
        <p className="mono text-xs text-muted-foreground/30">
          Designed &amp; Built by{' '}
          <span className="text-muted-foreground/50">{PERSONAL.name}</span> · 2026
        </p>
      </motion.div>
    </section>
  );
}
