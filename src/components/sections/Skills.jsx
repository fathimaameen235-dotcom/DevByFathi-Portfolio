import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, tools } from '../../data/portfolioData';

const CATEGORIES = Object.keys(skills);
const CATEGORY_COLORS = {
  Frontend: '#f97316', Backend: '#22d3ee', Database: '#a855f7',
  Languages: '#ec4899', Tools: '#84cc16',
};

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

function SkillBar({ name, level, color, visible, delay }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300 font-medium">{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: visible ? `${level}%` : 0 }}
          transition={{ duration: 1.2, delay: delay, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
        />
      </div>
    </div>
  );
}

function ToolCard({ tool, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-center cursor-default transition-all duration-300 overflow-hidden"
      style={{ '--accent': tool.color }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at center, ${tool.color}15 0%, transparent 70%)` }}/>
      <div className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ borderColor: `${tool.color}40` }}/>
      <div className="relative z-10">
        <div className="text-3xl mb-3 transition-transform group-hover:scale-110 duration-300">{tool.icon}</div>
        <p className="text-white font-semibold text-sm">{tool.name}</p>
        <p className="text-gray-500 text-xs mt-1 leading-4">{tool.description}</p>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  const activeColor = CATEGORY_COLORS[activeCategory] || '#f97316';
  const activeSkills = skills[activeCategory] || [];

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden py-28 px-6">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/8 blur-3xl rounded-full pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/8 blur-3xl rounded-full pointer-events-none"/>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-4 font-medium">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Skills
            </span>{' '}&amp; Stack
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-400 text-sm leading-6">
            A curated set of technologies I use to build modern, scalable applications.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={activeCategory === cat
                ? { color: CATEGORY_COLORS[cat], border: `1px solid ${CATEGORY_COLORS[cat]}40`, background: `${CATEGORY_COLORS[cat]}12` }
                : { color: '#9ca3af', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }
              }>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 mb-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: activeColor }}/>
              <h3 className="text-lg font-bold text-white">{activeCategory} Skills</h3>
              <span className="ml-auto text-xs text-gray-500">{activeSkills.length} technologies</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {activeSkills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                  visible={inView}
                  delay={0.1 + i * 0.08}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <p className="text-yellow-400 uppercase tracking-[0.3em] text-xs mb-3 font-medium">Developer Toolbox</p>
            <h3 className="text-2xl font-bold text-white">Tools I Use</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} i={i}/>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}