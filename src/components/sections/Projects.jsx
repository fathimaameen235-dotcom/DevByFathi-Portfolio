import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Users,
  Star,
  Zap,
  ShoppingCart,
  PlayCircle,
  Wallet,
} from 'lucide-react';

import {
  projects,
  groupProject,
} from '../../data/portfolioData';

const FILTERS = ['All', 'React', 'Java', 'MERN', 'Team'];

/* ─────────────────────────────────────────────────────────────
   ICON MAP for spotlight badge row (per-project accent icon)
───────────────────────────────────────────────────────────── */
const SPOTLIGHT_ICONS = {
  NovaCart: ShoppingCart,
  'Expense Tracker': Wallet,
};

/* ─────────────────────────────────────────────────────────────
   REUSABLE PROJECT SPOTLIGHT
   Full-width hero card used for every featured project
   (NovaCart, Expense Tracker, and any future flagship project)
───────────────────────────────────────────────────────────── */
function ProjectSpotlight({ proj }) {
  const accent = proj.accentColor || '#f97316';
  const BadgeIcon = SPOTLIGHT_ICONS[proj.name] || Star;
  const hasDemo = proj.demo && proj.demo !== 'PASTE_DEMO_VIDEO_LINK';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative w-full mb-16 rounded-[32px] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #0f0f0f 50%, #0f0f0f 100%)',
        boxShadow: `0 0 0 1px ${accent}40, 0 32px 80px ${accent}30, 0 0 120px ${accent}10`,
      }}
    >
      {/* Animated shimmer border */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent}80 0%, transparent 40%, ${accent}50 70%, transparent 100%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Glow orb top-right */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}26 0%, transparent 70%)` }}
      />
      {/* Glow orb bottom-left */}
      <div
        className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}1a 0%, transparent 70%)` }}
      />

      {/* Top accent bar — animated */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, ${accent}cc, ${accent}, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s linear infinite',
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 md:p-12">
        {/* Top badge row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#fff' }}
          >
            <Star size={11} fill="currentColor" />
            Featured Project
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live · Deployed
          </span>
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{ borderColor: `${accent}4d`, background: `${accent}1a`, color: accent }}
          >
            <BadgeIcon size={11} />
            Full Stack
          </span>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT — title, description, CTA */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${accent}40, ${accent}14)`,
                  border: `1px solid ${accent}4d`,
                  boxShadow: `0 8px 24px ${accent}33`,
                }}
              >
                {proj.icon}
              </div>
              <div>
                <h3
                  className="text-3xl md:text-4xl font-black tracking-tight"
                  style={{
                    background: `linear-gradient(135deg, #ffffff 30%, ${accent} 80%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {proj.name}
                </h3>
                <p className="text-sm font-medium mt-0.5" style={{ color: accent }}>
                  {proj.category}
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-7 mb-8">
              {proj.extendedDescription}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={proj.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                  color: '#fff',
                  boxShadow: `0 8px 24px ${accent}59`,
                }}
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
              <a
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/10 bg-white/5 text-white transition-all duration-200 hover:scale-105 active:scale-95"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent}66`;
                  e.currentTarget.style.background = `${accent}14`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                <Github size={15} />
                GitHub Repo
              </a>
              {hasDemo && (
                <a
                  href={proj.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/10 bg-white/5 text-white transition-all duration-200 hover:scale-105 active:scale-95"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}66`;
                    e.currentTarget.style.background = `${accent}14`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <PlayCircle size={15} />
                  Demo Video
                </a>
              )}
            </div>
          </div>

          {/* RIGHT — features + tech badges */}
          <div className="space-y-6">
            {/* Key features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                Key Features
              </p>
              <div className="grid grid-cols-2 gap-2">
                {proj.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs text-gray-300 py-1"
                  >
                    <Zap size={11} style={{ color: accent }} className="shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack badges */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {proj.techBadges.map((badge) => (
                  <span
                    key={badge.name}
                    className="text-xs px-3 py-1.5 rounded-full font-semibold border"
                    style={{
                      borderColor: `${badge.color}40`,
                      background: `${badge.color}12`,
                      color: badge.color,
                    }}
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STANDARD FLIP CARD (all other projects)
───────────────────────────────────────────────────────────── */
function FlipCard({ proj, i }) {
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const isFlippingRef = useRef(false);
  const accent = proj.accentColor || '#f97316';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileToggle = (e) => {
    if (!isMobile) return;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (isFlippingRef.current) return;
    isFlippingRef.current = true;
    setFlipped((prev) => !prev);
    setTimeout(() => { isFlippingRef.current = false; }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className="relative w-full"
      style={{ perspective: '1200px', height: '420px' }}
      onMouseEnter={() => !isMobile && setFlipped(true)}
      onMouseLeave={() => !isMobile && setFlipped(false)}
      onClick={isMobile ? handleMobileToggle : undefined}
      onTouchEnd={isMobile ? handleMobileToggle : undefined}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-[28px] border border-white/10 bg-[#111111] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            pointerEvents: flipped ? 'none' : 'auto',
            touchAction: 'manipulation',
            boxShadow: `0 20px 60px ${accent}15`,
          }}
        >
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          <div
            className="relative h-40 flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${accent}18, ${accent}05)` }}
          >
            <div className="text-7xl relative z-10">{proj.icon}</div>
            <div className="absolute top-3 right-3">
              <span
                className="text-xs px-3 py-1 rounded-full border font-semibold"
                style={{ borderColor: `${accent}40`, background: `${accent}15`, color: accent }}
              >
                {proj.status === 'live' ? '● Live' : proj.badge}
              </span>
            </div>
            {proj.isGroupProject && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300">
                <Users size={11} />
                Team
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col" style={{ height: 'calc(420px - 161px)' }}>
            <div className="flex-1 overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-2">{proj.name}</h3>
              <p className="text-sm mb-4 font-medium" style={{ color: accent }}>{proj.category}</p>
              <div className="flex flex-wrap gap-2">
                {proj.tech?.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{ borderColor: `${accent}30`, background: `${accent}10`, color: accent }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {!isMobile ? (
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                Hover to flip <ArrowRight size={12} />
              </div>
            ) : (
              <button
                onClick={handleMobileToggle}
                className="w-full py-2 rounded-lg border text-xs font-semibold mt-3"
                style={{ borderColor: `${accent}40`, background: `${accent}10`, color: accent }}
              >
                View Details
              </button>
            )}
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-[28px] border border-white/10 bg-[#0d0d0d] overflow-hidden p-6 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            pointerEvents: flipped ? 'auto' : 'none',
            touchAction: 'manipulation',
            boxShadow: `0 20px 60px ${accent}20`,
          }}
        >
          <div className="h-0.5 w-full mb-5" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          <h3 className="text-lg font-bold text-white">{proj.name}</h3>
          <p className="text-xs mt-1 mb-4" style={{ color: accent }}>{proj.category}</p>
          <p className="text-gray-400 text-xs leading-6 mb-5 flex-1 overflow-hidden line-clamp-5">
            {proj.description}
          </p>
          <div className="flex items-center flex-wrap gap-2">
            {proj.github && (
              <a
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs text-gray-300 border border-white/10 px-3 py-2 rounded-lg"
              >
                <Github size={13} />
                GitHub
              </a>
            )}
            {proj.live ? (
              <a
                href={proj.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border font-semibold"
                style={{ borderColor: `${accent}40`, background: `${accent}15`, color: accent }}
              >
                <ExternalLink size={13} />
                Live
              </a>
            ) : (
              <span className="text-xs text-gray-600 px-2">Coming Soon</span>
            )}
            {!isMobile ? (
              <span className="ml-auto text-xs text-gray-500">← Hover back</span>
            ) : (
              <button
                onClick={handleMobileToggle}
                className="ml-auto text-xs text-gray-400 border border-white/10 px-3 py-2 rounded-lg"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GROUP PROJECT SECTION
───────────────────────────────────────────────────────────── */
function GroupProjectSection() {
  const gp = groupProject;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 rounded-[28px] border border-purple-500/20 bg-[#0d0d0d] overflow-hidden"
      style={{ boxShadow: '0 20px 60px rgba(168,85,247,0.12)' }}
    >
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899, transparent)' }} />
      <div className="p-6 sm:p-8 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-purple-400" />
              <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                {gp.teamName} · Team Project
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{gp.name}</h3>
            <p className="text-sm text-gray-400">{gp.type}</p>
          </div>
          <a
            href={gp.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-gray-300 border border-white/10 px-4 py-2.5 rounded-xl hover:border-purple-500/40 transition-colors"
          >
            <Github size={14} />
            View on GitHub
          </a>
        </div>
        <p className="text-gray-400 text-sm leading-7 mb-8">{gp.description}</p>
        <div className="mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Platform Modules</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gp.modules.map((mod) => (
              <div key={mod.name} className="flex items-start gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <span className="text-xl shrink-0">{mod.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">{mod.name}</p>
                  <p className="text-xs text-gray-500 leading-5">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-purple-500/15 bg-purple-500/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              My Role — {gp.myRole.role}
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
            {gp.myRole.responsibilities.map((r) => (
              <li key={r} className="flex items-start gap-2 text-xs text-gray-400">
                <span className="text-purple-500 mt-0.5 shrink-0">▸</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {Object.values(gp.techStack).flat().map((tech) => (
              <span key={tech} className="text-xs px-2.5 py-1 rounded-full border border-purple-500/20 bg-purple-500/8 text-purple-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PROJECTS SECTION
───────────────────────────────────────────────────────────── */
export default function Projects() {
  const [filter, setFilter] = useState('All');

  // Featured projects (NovaCart + Expense Tracker) get the spotlight treatment.
  // Order is preserved from the projects array so NovaCart stays primary.
  const spotlightProjects = projects.filter((p) => p.featured);

  // Grid projects — exclude all featured/spotlight projects, then apply filter
  const gridProjects =
    filter === 'All'
      ? projects.filter((p) => !p.featured)
      : projects.filter((p) => !p.featured && p.filterTags?.includes(filter));

  // Which spotlight projects are visible under the active filter.
  // 'All' always shows every spotlight. Otherwise match on filterTags.
  const visibleSpotlights =
    filter === 'All'
      ? spotlightProjects
      : spotlightProjects.filter((p) => p.filterTags?.includes(filter));

  const showSpotlight = visibleSpotlights.length > 0;

  return (
    <section id="projects" className="relative overflow-hidden py-28 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                filter === f
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured Project Spotlights (NovaCart, Expense Tracker, ...) */}
        <AnimatePresence>
          {visibleSpotlights.map((proj) => (
            <ProjectSpotlight key={`spotlight-${proj.id}`} proj={proj} />
          ))}
        </AnimatePresence>

        {/* Grid label when spotlight is showing */}
        {showSpotlight && gridProjects.length > 0 && (
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-8 text-center">
            More Projects
          </p>
        )}

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-7"
          >
            {gridProjects.length === 0 && !showSpotlight ? (
              <div className="col-span-full text-center py-20 text-gray-500 text-sm">
                No projects found for this filter.
              </div>
            ) : (
              gridProjects.map((proj, i) => (
                <FlipCard key={proj.id} proj={proj} i={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Group project section */}
        {(filter === 'All' || filter === 'Team') && <GroupProjectSection />}
      </div>
    </section>
  );
}