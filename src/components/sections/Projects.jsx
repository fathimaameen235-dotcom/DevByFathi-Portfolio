import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Layers,
  Users,
  Cpu,
} from 'lucide-react';

import {
  projects,
  groupProject,
} from '../../data/portfolioData';

const FILTERS = [
  'All',
  'React',
  'Java',
  'MERN',
  'Team',
];

function FlipCard({ proj, i }) {
  const [flipped, setFlipped] = useState(false);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  const accent =
    proj.accentColor || '#f97316';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    window.addEventListener(
      'resize',
      handleResize
    );

    return () =>
      window.removeEventListener(
        'resize',
        handleResize
      );
  }, []);

  const handleMobileToggle = (e) => {
    if (isMobile) {
      e.preventDefault();
      setFlipped(!flipped);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: i * 0.08,
      }}
      className="relative w-full"
      style={{
        perspective: '1200px',
        height: '420px',
      }}
      onMouseEnter={() =>
        !isMobile && setFlipped(true)
      }
      onMouseLeave={() =>
        !isMobile && setFlipped(false)
      }
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-[28px] border border-white/10 bg-[#111111] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: `0 20px 60px ${accent}15`,
          }}
        >
          <div
            className="h-1 w-full"
            style={{
              background: `linear-gradient(90deg, ${accent}, transparent)`,
            }}
          />

          {/* Banner */}
          <div
            className="relative h-40 flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accent}18, ${accent}05)`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
              }}
            />

            <div className="text-7xl relative z-10">
              {proj.icon}
            </div>

            {/* Status */}
            <div className="absolute top-3 right-3">
              <span
                className="text-xs px-3 py-1 rounded-full border font-semibold"
                style={{
                  borderColor: `${accent}40`,
                  background: `${accent}15`,
                  color: accent,
                }}
              >
                {proj.status === 'live'
                  ? '● Live'
                  : proj.badge}
              </span>
            </div>

            {/* Team */}
            {proj.isGroupProject && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300">
                <Users size={11} />
                Team
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {proj.name}
              </h3>

              <p
                className="text-sm mb-4 font-medium"
                style={{
                  color: accent,
                }}
              >
                {proj.category}
              </p>

              <div className="flex flex-wrap gap-2">
                {proj.tech
                  ?.slice(0, 4)
                  .map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full border"
                      style={{
                        borderColor: `${accent}30`,
                        background: `${accent}10`,
                        color: accent,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            </div>

            {!isMobile ? (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                Hover to flip
                <ArrowRight size={12} />
              </div>
            ) : (
              <button
                onClick={
                  handleMobileToggle
                }
                className="w-full py-2 rounded-lg border text-xs font-semibold"
                style={{
                  borderColor: `${accent}40`,
                  background: `${accent}10`,
                  color: accent,
                }}
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
            transform:
              'rotateY(180deg)',
            boxShadow: `0 20px 60px ${accent}20`,
          }}
        >
          <div
            className="h-0.5 w-full mb-5"
            style={{
              background: `linear-gradient(90deg, ${accent}, transparent)`,
            }}
          />

          <h3 className="text-lg font-bold text-white">
            {proj.name}
          </h3>

          <p
            className="text-xs mt-1 mb-4"
            style={{
              color: accent,
            }}
          >
            {proj.category}
          </p>

          <p className="text-gray-400 text-xs leading-6 mb-5 flex-1">
            {proj.description}
          </p>

          {/* Features */}
          <div className="mb-5">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              Features
            </p>

            <div className="flex flex-wrap gap-2">
              {proj.features
                ?.slice(0, 4)
                .map((f) => (
                  <span
                    key={f}
                    className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400"
                  >
                    {f}
                  </span>
                ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <a
              href={proj.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-gray-300 border border-white/10 px-3 py-2 rounded-lg hover:border-white/30 transition"
            >
              <Github size={13} />
              GitHub
            </a>

            {proj.live ? (
              <a
                href={proj.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border font-semibold"
                style={{
                  borderColor: `${accent}40`,
                  background: `${accent}15`,
                  color: accent,
                }}
              >
                <ExternalLink size={13} />
                Live
              </a>
            ) : (
              <span className="text-xs text-gray-600 px-2">
                Coming Soon
              </span>
            )}

            {!isMobile ? (
              <span className="ml-auto text-xs text-gray-500">
                ← Hover back
              </span>
            ) : (
              <button
                onClick={
                  handleMobileToggle
                }
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

function GroupProjectSection() {
  const gp = groupProject;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-24"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-4">
          <Users size={14} />
          Team Project
        </div>

        <h3 className="text-4xl font-bold text-white">
          <span
            style={{
              background:
                'linear-gradient(135deg,#a855f7,#ec4899)',
              WebkitBackgroundClip:
                'text',
              WebkitTextFillColor:
                'transparent',
            }}
          >
            {gp.name}
          </span>
        </h3>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm leading-7">
          {gp.description}
        </p>
      </div>

      {/* Contribution */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h4 className="text-white text-xl font-bold mb-4">
            My Contribution
          </h4>

          <p className="text-purple-400 font-medium mb-5">
            {gp.myRole.role}
          </p>

          <div className="space-y-3">
            {gp.myRole.responsibilities.map(
              (item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-300"
                >
                  <span className="text-purple-400">
                    →
                  </span>

                  {item}
                </div>
              )
            )}
          </div>
        </div>

        {/* Right */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h4 className="text-white text-xl font-bold mb-5">
            Platform Features
          </h4>

          <div className="flex flex-wrap gap-3">
            {gp.features.map(
              (feature, i) => (
                <span
                  key={i}
                  className="px-3 py-2 rounded-full text-xs border border-purple-500/30 bg-purple-500/10 text-purple-300"
                >
                  {feature}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] =
    useState('All');

  const filteredProjects =
  filter === 'All'
    ? projects

    : filter === 'React'
    ? projects.filter(
        (project) =>
          project.category
            ?.toLowerCase()
            .includes('react')
      )

    : filter === 'Java'
    ? projects.filter(
        (project) =>
          project.category
            ?.toLowerCase()
            .includes('java')
      )

    : filter === 'MERN'
    ? projects.filter(
        (project) =>
          project.category
            ?.toLowerCase()
            .includes('mern')
      )

    : filter === 'Team'
    ? projects.filter(
        (project) =>
          project.isGroupProject === true
      )

    : projects;

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-28 px-6"
    >
      {/* Glow */}
      <div className="absolute top-0 left-[-10%] w-96 h-96 bg-orange-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-[-10%] w-[28rem] h-[28rem] bg-purple-500/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-orange-400 uppercase tracking-[0.3em] text-sm mb-4 font-medium">
            Portfolio
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span
              style={{
                background:
                  'linear-gradient(135deg,#f97316,#ec4899)',
                WebkitBackgroundClip:
                  'text',
                WebkitTextFillColor:
                  'transparent',
              }}
            >
              Featured
            </span>{' '}
            Projects
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-gray-400 leading-7 text-sm">
            Modern projects built
            using React, Java,
            MERN & Full Stack
            technologies.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === item
                  ? 'text-orange-400 border border-orange-500/40 bg-orange-500/10'
                  : 'text-gray-400 border border-white/10 bg-white/[0.03] hover:text-white hover:border-white/20'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-7"
          >
            {filteredProjects.map(
              (proj, i) => (
                <FlipCard
                  key={proj.id}
                  proj={proj}
                  i={i}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>

        {/* Team */}
        <GroupProjectSection />

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/fathimaameen235-dotcom"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 text-white font-semibold transition-all hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <Layers size={18} />

            More on GitHub

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}