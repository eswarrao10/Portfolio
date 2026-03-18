import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { PERSONAL, ABOUT_STATS, AWARDS } from '../data/content';
import { Trophy, Star } from 'lucide-react';

// Counter animation hook
function useCountUp(target: number, inView: boolean) {
  const [value, setValue] = useState(0);
  const ref = useRef(false);
  if (inView && !ref.current) {
    ref.current = true;
    let start = 0;
    const step = () => {
      start += (target - start) * 0.1 + 0.5;
      setValue(Math.min(Math.floor(start), target));
      if (start < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  return value;
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      {/* Subtle background dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-18"
        >
          <span className="section-label">01.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent ml-4 origin-left"
          />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Bio paragraphs with blur-in */}
          <div className="md:col-span-3 space-y-6">
            {PERSONAL.bio.map((content, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="text-muted-foreground leading-relaxed text-[1.05rem]"
              >
                {content}
              </motion.p>
            ))}

            {/* Awards row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              {AWARDS.map((award, i) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.12, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm cursor-default transition-all duration-300 hover:border-primary/30"
                >
                  <span className="text-xl">{award.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{award.title}</p>
                    <p className="text-xs text-muted-foreground">{award.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'hsl(224 26% 7% / 0.8)',
                border: '1px solid hsl(224 18% 15%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px -20px rgba(0,0,0,0.5), 0 0 40px -15px hsl(214 92% 62% / 0.1)',
              }}
            >
              {/* Animated top gradient line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                style={{
                  background: 'linear-gradient(90deg, hsl(214 92% 62%), hsl(38 95% 55%), hsl(214 92% 62%))',
                }}
              />

              <div className="p-7">
                {/* Profile photo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.45, type: 'spring', stiffness: 200, damping: 18 }}
                  className="relative mx-auto mb-5 w-fit"
                  style={{ animation: inView ? 'float-y 6s ease-in-out infinite' : 'none' }}
                >
                  {/* Outer rotating glow ring */}
                  <div
                    className="absolute inset-[-6px] rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, hsl(214 92% 62%), hsl(38 95% 55%), hsl(214 92% 62% / 0.3), hsl(214 92% 62%))',
                      animation: 'spin-slow 6s linear infinite',
                    }}
                  />
                  {/* White gap ring */}
                  <div className="absolute inset-[-2px] rounded-full bg-background" />
                  {/* Photo */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src={`/avatar.jpg?v=${Date.now()}`}
                      alt="Sambangi Eswar Rao"
                      className="w-full h-full object-cover object-top"
                      style={{ filter: 'brightness(1.05) contrast(1.05)' }}
                    />
                    {/* Subtle blue overlay tint */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'radial-gradient(circle at 30% 20%, hsl(214 92% 62% / 0.12), transparent 60%)' }}
                    />
                  </div>
                </motion.div>

                <p className="mono text-xs text-primary/60 mb-4">// quick_stats</p>

                <div className="space-y-0.5">
                  {ABOUT_STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                      transition={{ delay: 0.65 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ x: 5, backgroundColor: 'hsl(214 92% 62% / 0.04)' }}
                      className="flex justify-between items-center py-2.5 px-3 -mx-3 rounded-lg border-b border-border/15 last:border-0 cursor-default transition-all duration-300"
                    >
                      <span className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="text-base">{stat.icon}</span>
                        {stat.label}
                      </span>
                      <span className="text-foreground font-medium text-sm mono">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
