import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Layers,
  Users,
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
    typeof window !== 'undefined'
      ? window.innerWidth < 768
      : false
  );

  const isFlippingRef = useRef(false);

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
    if (!isMobile) return;

    e?.preventDefault?.();
    e?.stopPropagation?.();

    if (isFlippingRef.current) return;

    isFlippingRef.current = true;

    setFlipped((prev) => !prev);

    setTimeout(() => {
      isFlippingRef.current = false;
    }, 700);
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
      onClick={
        isMobile
          ? handleMobileToggle
          : undefined
      }
      onTouchEnd={
        isMobile
          ? handleMobileToggle
          : undefined
      }
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle:
            'preserve-3d',
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
            backfaceVisibility:
              'hidden',
            WebkitBackfaceVisibility:
              'hidden',
            pointerEvents: flipped
              ? 'none'
              : 'auto',
            touchAction:
              'manipulation',
            boxShadow: `0 20px 60px ${accent}15`,
          }}
        >
          <div
            className="h-1 w-full"
            style={{
              background: `linear-gradient(90deg, ${accent}, transparent)`,
            }}
          />

          <div
            className="relative h-40 flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accent}18, ${accent}05)`,
            }}
          >
            <div className="text-7xl relative z-10">
              {proj.icon}
            </div>

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

            {proj.isGroupProject && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300">
                <Users size={11} />
                Team
              </div>
            )}
          </div>

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
            backfaceVisibility:
              'hidden',
            WebkitBackfaceVisibility:
              'hidden',
            transform:
              'rotateY(180deg)',
            pointerEvents: flipped
              ? 'auto'
              : 'none',
            touchAction:
              'manipulation',
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

          <div className="flex items-center flex-wrap gap-2">
            <a
              href={proj.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) =>
                e.stopPropagation()
              }
              className="flex items-center gap-2 text-xs text-gray-300 border border-white/10 px-3 py-2 rounded-lg"
            >
              <Github size={13} />
              GitHub
            </a>

            {proj.live ? (
              <a
                href={proj.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) =>
                  e.stopPropagation()
                }
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
    <motion.div>
      Group Section
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
    ? projects.filter((project) =>
        project.category
          ?.toLowerCase()
          .includes('react')
      )
    : filter === 'Java'
    ? projects.filter(
        (project) =>
          project.category
            ?.toLowerCase()
            .includes('java') ||
          project.tech?.some((tech) =>
            tech
              .toLowerCase()
              .includes('java')
          ) ||
          project.tech?.some((tech) =>
            tech
              .toLowerCase()
              .includes('spring')
          )
      )
    : filter === 'MERN'
    ? projects.filter((project) =>
        project.category
          ?.toLowerCase()
          .includes('mern')
      )
    : filter === 'Team'
    ? projects.filter(
        (project) =>
          project.isGroupProject ===
          true
      )
    : projects;
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-28 px-6"
    >
      <div className="max-w-7xl mx-auto relative z-10">
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
      </div>
    </section>
  );
}