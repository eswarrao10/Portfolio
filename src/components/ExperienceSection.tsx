import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, BookOpen, GraduationCap, ChevronRight, Terminal, Github } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION, AWARDS } from '../data/content';

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding relative overflow-hidden" ref={ref}>
      {/* BG orb */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [10, -10, 10] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] pointer-events-none orb"
        style={{ background: 'radial-gradient(circle, hsl(162 85% 48% / 0.04), transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="section-label">04.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Experience &amp; Education</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent ml-4 origin-left"
          />
        </motion.div>

        {/* Top row: Training + Awards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* Training panel */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
            style={{
              background: 'hsl(222 22% 7% / 0.85)',
              border: '1px solid hsl(222 18% 14%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 30px -10px rgba(0,0,0,0.35)',
            }}
          >
            {/* Terminal header bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/25 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-primary/50" />
              </div>
              <span className="mono text-xs text-muted-foreground/50 ml-2">training.log</span>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'hsl(162 85% 48% / 0.1)', border: '1px solid hsl(162 85% 48% / 0.2)' }}
                >
                  <Terminal size={16} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Training</h3>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.55 }}
                className="space-y-3 pl-1"
              >
                <div className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-primary" />
                  <p className="mono text-sm text-primary/75">LPU — Jun’ 25 - Jul’ 25</p>
                </div>
                <p className="text-foreground font-medium pl-5 mt-1">From Data to Decisions: A Hands-On Approach to Data Science</p>
                <div className="text-muted-foreground text-sm leading-relaxed pl-5 space-y-2 mt-2">
                  <p>• Designed a wine quality classification system to apply ML and Power BI concepts on a real-world imbalanced dataset.</p>
                  <p>• Performed data preprocessing and feature scaling using Python and pandas; implemented Logistic Regression and Random Forest with scikit-learn.</p>
                  <p>• Achieved a macro F1-score of 0.78 using Random Forest, addressed class imbalance, and visualized results through an interactive Power BI dashboard.</p>
                  <a href="https://github.com/eswarrao10/Wine-Quality-Prediction" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors mt-3 text-sm font-medium"><Github size={14} /> View Repository</a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Awards panel */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
            style={{
              background: 'hsl(222 22% 7% / 0.85)',
              border: '1px solid hsl(222 18% 14%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 30px -10px rgba(0,0,0,0.35)',
            }}
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/25 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-primary/50" />
              </div>
              <span className="mono text-xs text-muted-foreground/50 ml-2">achievements.md</span>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'hsl(268 65% 62% / 0.1)', border: '1px solid hsl(268 65% 62% / 0.2)' }}
                >
                  <Award size={16} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Awards</h3>
              </div>

              <div className="space-y-3">
                {AWARDS.map((award, i) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, x: -18 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.14 }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-3 p-3 -mx-1 rounded-xl hover:bg-white/[0.03] transition-all duration-300 cursor-default"
                  >
                    <motion.span
                      animate={inView ? { rotate: [0, -18, 18, 0] } : {}}
                      transition={{ delay: 1.1 + i * 0.3, duration: 0.7 }}
                      className="text-xl mt-0.5"
                    >
                      {award.emoji}
                    </motion.span>
                    <div>
                      <p className="text-foreground font-medium text-sm">{award.title}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{award.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-base font-semibold text-foreground mb-5 flex items-center gap-3">
            <Award size={17} className="text-primary" />
            Certificates/Certifications
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 28, scale: 0.93 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.65 + i * 0.1, type: 'spring', stiffness: 240 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="rounded-xl p-5 cursor-default transition-all duration-400 group"
                style={{
                  background: 'hsl(222 22% 7% / 0.8)',
                  border: '1px solid hsl(222 18% 14%)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{cert.icon}</span>
                  <span className="mono text-xs text-muted-foreground/45">{cert.date}</span>
                </div>
                <p className="text-foreground font-medium text-sm group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </p>
                <p className="text-muted-foreground text-xs mt-1">{cert.org}</p>
                {/* Bottom accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-px mt-3 bg-gradient-to-r from-primary to-accent origin-left"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Education timeline */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-base font-semibold text-foreground mb-6 flex items-center gap-3">
            <GraduationCap size={17} className="text-primary" />
            Education
          </h3>

          <div className="relative">
            {/* Timeline vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[5px] top-6 bottom-0 w-[1px] origin-top hidden sm:block"
              style={{ background: 'linear-gradient(to bottom, hsl(162 85% 48% / 0.5), transparent)' }}
            />

            <div className="space-y-4">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -36 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.85 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="relative sm:pl-10 group"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.95 + i * 0.14, type: 'spring', stiffness: 320 }}
                    className="absolute left-0 top-5 hidden sm:flex w-[11px] h-[11px] rounded-full border-2 items-center justify-center transition-all duration-400 group-hover:scale-150"
                    style={{ borderColor: edu.color, background: edu.color + '25' }}
                  />

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-all duration-300 cursor-default"
                    style={{
                      background: 'hsl(222 22% 7% / 0.7)',
                      border: '1px solid hsl(222 18% 13%)',
                      backdropFilter: 'blur(16px)',
                    }}
                  >
                    <div>
                      <p className="text-foreground font-medium">{edu.degree}</p>
                      <p className="text-muted-foreground text-sm">{edu.school}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="mono text-sm font-bold" style={{ color: edu.color }}>{edu.score}</p>
                      <p className="text-muted-foreground text-xs">{edu.period}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
