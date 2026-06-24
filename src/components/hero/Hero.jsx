import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import {
  ExternalLink,
  Mail,
 ArrowRight,
  Download,
  MapPin,
} from 'lucide-react';

import {
  personalInfo,
  typingRoles,
  techStack,
} from '../../data/portfolioData';

const socials = [
  {
    icon: ExternalLink,
    label: 'GitHub',
    href: personalInfo.github,
  },
  {
    icon: ExternalLink,
    label: 'LinkedIn',
    href: personalInfo.linkedin,
  },
  {
    icon: Mail,
    label: 'Email',
    href: `mailto:${personalInfo.email}`,
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.75,
    ease: [0.22, 1, 0.36, 1],
  },
});

export default function Hero() {
  const typedRef = useRef(null);
  const cardRef = useRef(null);

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  // Typed.js
  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: typingRoles,
      typeSpeed: 80,
      backSpeed: 38,
      backDelay: 1800,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // Tilt effect
  const onMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    setTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 10,
    });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-24 lg:pt-28 lg:pb-32"
    >
      {/* Ambient Blobs */}
      <div
        className="glow-blob absolute w-72 h-72 rounded-full bg-orange-500/15 blur-3xl"
        style={{
          top: '15%',
          left: '-5%',
        }}
      />

      <div
        className="glow-blob absolute w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"
        style={{
          top: '25%',
          right: '-8%',
          animationDelay: '2s',
        }}
      />

      <div
        className="glow-blob absolute w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
        style={{
          bottom: '20%',
          left: '40%',
          animationDelay: '4s',
        }}
      />

      <div className="container mx-auto max-w-7xl w-full px-6">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* LEFT */}
          <div className="space-y-8">

            {/* Badge */}
            <motion.div
              {...fadeUp(0)}
              className="flex flex-wrap items-center gap-3"
            >
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs"
                style={{
                  borderColor: 'rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'DM Mono, monospace',
                  letterSpacing: '0.14em',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to opportunities
              </span>

              <span
                className="inline-flex items-center gap-1.5 text-xs"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'DM Mono, monospace',
                  letterSpacing: '0.1em',
                }}
              >
                <MapPin size={11} />
                {personalInfo.location}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              {...fadeUp(0.08)}
              className="space-y-3"
            >
              <p
                className="text-xs uppercase"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  letterSpacing: '0.28em',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                Full Stack Developer
              </p>

              <h1 className="section-title">
                Hi, I&apos;m{' '}
                <span className="grad-orange">
                  {personalInfo.name}
                </span>
              </h1>
            </motion.div>

            {/* Summary */}
            <motion.p
              {...fadeUp(0.16)}
              className="max-w-lg text-base leading-7"
              style={{
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {personalInfo.summary}
            </motion.p>

            {/* Typed Card */}
            <motion.div
              {...fadeUp(0.22)}
              className="rounded-2xl border p-5"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <p className="section-label mb-3">
                Currently
              </p>

              <div className="min-h-[2rem] font-sora text-xl font-semibold text-white">
                <span ref={typedRef} />
              </div>
            </motion.div>

            {/* Buttons */}
            {/* Buttons */}
<motion.div
  {...fadeUp(0.28)}
  className="flex flex-wrap gap-3"
>
  <a
    href="/resume/FullstackDeveloper.pdf"
    download
    className="btn btn-primary"
  >
    <Download size={16} />
    Download Resume
  </a>

  <a
    href="#projects"
    className="btn btn-secondary"
  >
    View Projects
    <ArrowRight size={16} />
  </a>
</motion.div>
            {/* Socials */}
            <motion.div
              {...fadeUp(0.34)}
              className="flex items-center gap-3 pt-2"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={
                    href.startsWith('mailto:')
                      ? undefined
                      : '_blank'
                  }
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-orange-400 hover:text-orange-400"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Glow */}
            <div
              className="absolute -top-10 -left-10 h-28 w-28 rounded-full pointer-events-none blur-3xl"
              style={{
                background: 'rgba(249,115,22,0.12)',
              }}
            />

            <div
              className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full pointer-events-none blur-3xl"
              style={{
                background: 'rgba(34,211,238,0.1)',
              }}
            />

            {/* Card */}
            <motion.div
              ref={cardRef}
              onMouseMove={onMove}
              onMouseLeave={() =>
                setTilt({ x: 0, y: 0 })
              }
              animate={{
                rotateX: tilt.y,
                rotateY: tilt.x,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 22,
              }}
              className="relative overflow-hidden rounded-3xl border"
              style={{
                borderColor: 'rgba(255,255,255,0.09)',
                background: '#111111',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 20% 20%, rgba(249,115,22,0.1) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.07) 0%, transparent 45%)',
                }}
              />

              <div className="relative space-y-6 p-7">

                {/* Header */}
                <div
                  className="flex items-center justify-between rounded-2xl border px-4 py-3"
                  style={{
                    borderColor: 'rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-orange-400"
                      style={{
                        boxShadow:
                          '0 0 8px rgba(249,115,22,0.7)',
                      }}
                    />

                    <span className="section-label">
                      Developer workspace
                    </span>
                  </div>

                  <span className="section-label">
                    Live ●
                  </span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-[1fr_0.52fr] gap-4">

                  <div
                    className="rounded-2xl border p-5"
                    style={{
                      borderColor: 'rgba(255,255,255,0.07)',
                      background: 'rgba(0,0,0,0.4)',
                    }}
                  >
                    <p className="section-label mb-3">
                      Active build
                    </p>

                    <p className="mb-5 font-sora text-lg font-semibold text-white">
                      NovaCart MERN
                    </p>

                    <div className="space-y-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          background:
                            'rgba(255,255,255,0.08)',
                        }}
                      />

                      <div
                        className="h-2.5 w-4/5 rounded-full"
                        style={{
                          background:
                            'rgba(255,255,255,0.06)',
                        }}
                      />

                      <div
                        className="h-2.5 w-3/5 rounded-full"
                        style={{
                          background:
                            'rgba(255,255,255,0.05)',
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">

                    <div
                      className="rounded-2xl border p-4"
                      style={{
                        borderColor: 'rgba(255,255,255,0.07)',
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <p className="section-label mb-3">
                        Stack
                      </p>

                      <div className="space-y-1.5">
                        <div
                          className="h-2 w-full rounded-full"
                          style={{
                            background:
                              'rgba(249,115,22,0.3)',
                          }}
                        />

                        <div
                          className="h-2 w-4/5 rounded-full"
                          style={{
                            background:
                              'rgba(34,211,238,0.25)',
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className="rounded-2xl border p-4"
                      style={{
                        borderColor: 'rgba(255,255,255,0.07)',
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <div className="grad-orange font-sora text-2xl font-bold">
                        82%
                      </div>

                      <p className="section-label mt-1">
                        React level
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: 'Stack',
                      value: 'Java • React',
                    },
                    {
                      label: 'Design',
                      value: 'Tailwind • Figma',
                    },
                    {
                      label: 'Focus',
                      value: 'Ship & polish',
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-xl border p-3"
                      style={{
                        borderColor:
                          'rgba(255,255,255,0.07)',
                        background:
                          'rgba(255,255,255,0.03)',
                      }}
                    >
                      <p className="section-label mb-2">
                        {label}
                      </p>

                      <p className="font-sora text-xs font-medium text-white">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
          }}
          className="mt-20 overflow-hidden"
        >
          <div className="section-label mb-5 text-center">
            Tech stack
          </div>

          <div className="relative overflow-hidden py-1">

            <div
              className="absolute left-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, #080808, transparent)',
              }}
            />

            <div
              className="absolute right-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
              style={{
                background:
                  'linear-gradient(-90deg, #080808, transparent)',
              }}
            />

            <div className="marquee-track">
              {[...techStack, ...techStack].map(
                (tech, i) => (
                  <span
                    key={`${tech}-${i}`}
                    className="mx-3 inline-flex whitespace-nowrap rounded-full border px-4 py-2 text-xs"
                    style={{
                      borderColor:
                        'rgba(255,255,255,0.08)',
                      background:
                        'rgba(255,255,255,0.03)',
                      color:
                        'rgba(255,255,255,0.5)',
                      fontFamily:
                        'DM Mono, monospace',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}