import { motion, useInView, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';
import { SKILLS } from '../data/content';

function TiltCard({ children, glowColor, index, inView }: {
  children: React.ReactNode;
  glowColor: string;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 160, damping: 22 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 160, damping: 22 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springGX = useSpring(glowX, { stiffness: 140, damping: 20 });
  const springGY = useSpring(glowY, { stiffness: 140, damping: 20 });

  const spotlight = useMotionTemplate`radial-gradient(320px at ${springGX}% ${springGY}%, ${glowColor}16, transparent 65%)`;
  const borderGlow = useMotionTemplate`radial-gradient(180px at ${springGX}% ${springGY}%, ${glowColor}, transparent 65%)`;

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    rotateXRaw.set((ny - 0.5) * -10);
    rotateYRaw.set((nx - 0.5) * 10);
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  };

  const reset = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    glowX.set(50);
    glowY.set(50);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
      className="relative group cursor-default"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 z-0 blur-sm"
        style={{ background: borderGlow }}
      />

      {/* Spotlight overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-[1]"
        style={{ background: spotlight }}
      />

      {/* Card body */}
      <div
        className="relative z-[2] rounded-2xl p-7 h-full overflow-hidden transition-all duration-500"
        style={{
          background: 'hsl(224 26% 7% / 0.85)',
          border: '1px solid hsl(224 18% 15%)',
          backdropFilter: 'blur(20px)',
          boxShadow: hovered
            ? `0 24px 50px -15px rgba(0,0,0,0.5), 0 0 30px -8px ${glowColor}20`
            : '0 4px 20px -8px rgba(0,0,0,0.3)',
        }}
      >
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l opacity-0 group-hover:opacity-60 transition-all duration-600 rounded-tl-2xl" style={{ borderColor: glowColor }} />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r opacity-0 group-hover:opacity-60 transition-all duration-600 rounded-br-2xl" style={{ borderColor: glowColor }} />

        {children}
      </div>
    </motion.div>
  );
}

function AnimatedBar({ level, delay, inView, glowColor }: {
  level: number; delay: number; inView: boolean; glowColor: string;
}) {
  return (
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: `${level}%`, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full relative"
        style={{
          background: `linear-gradient(90deg, ${glowColor}cc, ${glowColor})`,
          boxShadow: `0 0 8px ${glowColor}80`,
        }}
      >
        {/* Shimmer sweep */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={inView ? { x: '250%' } : {}}
          transition={{ duration: 1.4, delay: delay + 0.9, ease: 'easeOut' }}
          className="absolute inset-0 w-1/3"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
        />
      </motion.div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-18 pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-25, 25, -25], x: [-15, 15, -15], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 right-8 w-80 h-80 rounded-full pointer-events-none orb"
        style={{ background: 'radial-gradient(circle, hsl(162 85% 48% / 0.06), transparent)' }}
      />
      <motion.div
        animate={{ y: [20, -35, 20], x: [12, -12, 12], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 left-8 w-[420px] h-[420px] rounded-full pointer-events-none orb"
        style={{ background: 'radial-gradient(circle, hsl(268 65% 62% / 0.05), transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="section-label">02.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Skills &amp; Tech</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent ml-4 origin-left"
          />
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2.5 mb-12 justify-center"
        >
          {SKILLS.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 240 }}
              whileHover={{ y: -2, scale: 1.04 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm cursor-default transition-colors duration-300 hover:border-primary/30"
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="text-xs mono text-muted-foreground">{cat.title}</span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: cat.glowColor, boxShadow: `0 0 6px ${cat.glowColor}` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1400 }}>
          {SKILLS.map((cat, catIdx) => (
            <TiltCard key={cat.title} glowColor={cat.glowColor} index={catIdx} inView={inView}>
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.span
                  animate={inView ? { rotate: [0, 12, -12, 0] } : {}}
                  transition={{ duration: 2.5, delay: catIdx * 0.2 + 1.2, repeat: Infinity, repeatDelay: 6 }}
                  className="text-2xl"
                >
                  {cat.icon}
                </motion.span>
                <div>
                  <h3 className="font-semibold text-foreground">{cat.title}</h3>
                  <p className="mono text-xs text-muted-foreground/50">{cat.skills.length} skills</p>
                </div>
                {/* Colored dot accent */}
                <div className="ml-auto w-2 h-2 rounded-full" style={{ background: cat.glowColor, boxShadow: `0 0 8px ${cat.glowColor}` }} />
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {cat.skills.map((skill, i) => {
                  const delay = catIdx * 0.12 + i * 0.06 + 0.4;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay }}
                      className="group/skill"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-secondary-foreground group-hover/skill:text-foreground transition-colors duration-300">
                          {skill.name}
                        </span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ delay: delay + 0.6 }}
                          className="mono text-xs text-muted-foreground/60"
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <AnimatedBar
                        level={skill.level}
                        delay={delay}
                        inView={inView}
                        glowColor={cat.glowColor}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
