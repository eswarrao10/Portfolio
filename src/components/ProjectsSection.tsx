import { motion, useInView, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';
import { ExternalLink, Github, ArrowUpRight, Clock, Layers } from 'lucide-react';
import { PROJECTS } from '../data/content';

function ProjectCard({ project, idx, inView }: { project: typeof PROJECTS[0]; idx: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseXRaw = useMotionValue(0.5);
  const mouseYRaw = useMotionValue(0.5);
  const springX = useSpring(mouseXRaw, { stiffness: 160, damping: 22 });
  const springY = useSpring(mouseYRaw, { stiffness: 160, damping: 22 });

  const pctX = useMotionTemplate`calc(${springX} * 100%)`;
  const pctY = useMotionTemplate`calc(${springY} * 100%)`;
  const spotlight = useMotionTemplate`radial-gradient(550px at ${pctX} ${pctY}, ${project.accentColor}12, transparent 60%)`;

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseXRaw.set((e.clientX - rect.left) / rect.width);
    mouseYRaw.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.1, delay: idx * 0.22, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: spotlight }}
      />

      {/* Card */}
      <div
        className="relative z-[1] rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: 'hsl(224 26% 6% / 0.85)',
          border: `1px solid ${hovered ? `${project.accentColor}30` : 'hsl(224 18% 14%)'}`,
          backdropFilter: 'blur(20px)',
          boxShadow: hovered
            ? `0 30px 70px -20px rgba(0,0,0,0.5), 0 0 40px -10px ${project.accentColor}18`
            : '0 8px 30px -10px rgba(0,0,0,0.3)',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease, border-color 0.4s ease',
        }}
      >
        {/* Gradient top bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: idx * 0.22 + 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`h-[2px] bg-gradient-to-r ${project.gradient} origin-left`}
        />

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Left: content */}
            <div className="flex-1 space-y-5">
              {/* Project label + number */}
              <div className="flex items-center gap-3">
                <motion.p
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.22 + 0.35 }}
                  className="mono text-xs text-muted-foreground/50 tracking-widest uppercase"
                >
                  Project {project.number}
                </motion.p>
                <div className="flex-1 h-px bg-border/20" />
                <Layers size={14} className="text-muted-foreground/30" />
              </div>

              <div>
                <h3
                  className="text-2xl md:text-3xl font-bold transition-colors duration-500"
                  style={{ color: hovered ? project.accentColor : 'hsl(210 20% 93%)' }}
                >
                  {project.title}
                </h3>
                <p className="mono text-sm text-muted-foreground mt-1">{project.subtitle}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-[0.95rem]">{project.description}</p>

              {/* Tech stack pills with stagger */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: idx * 0.22 + 0.6 + i * 0.04, type: 'spring', stiffness: 280 }}
                    className="tag"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* Action links */}
              <div className="flex items-center gap-5 pt-1">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mono"
                >
                  <Github size={15} />
                  Source
                  <ArrowUpRight size={13} />
                </motion.a>

                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mono"
                  >
                    <ExternalLink size={15} />
                    Live
                    <ArrowUpRight size={13} />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Right: stats */}
            <div className="md:w-44 flex md:flex-col gap-4 shrink-0">
              {project.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.75, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.22 + 0.75 + i * 0.18, type: 'spring', stiffness: 220 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="flex-1 rounded-xl p-4 text-center cursor-default transition-all duration-400"
                  style={{
                    background: `${project.accentColor}08`,
                    border: `1px solid ${project.accentColor}20`,
                  }}
                >
                  <p className="text-2xl font-bold mono" style={{ color: project.accentColor }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}

              {/* Watermark number */}
              <div className="hidden md:flex items-center justify-center flex-1">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 0.04 } : {}}
                  transition={{ delay: idx * 0.22 + 1 }}
                  className="text-9xl font-bold mono select-none pointer-events-none"
                >
                  {project.number}
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Floating orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full pointer-events-none orb"
        style={{ background: 'radial-gradient(circle, hsl(268 65% 62%), transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="section-label">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Projects</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent ml-4 origin-left"
          />
        </motion.div>

        <div className="space-y-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
