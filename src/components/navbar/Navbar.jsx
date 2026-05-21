import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { navLinks } from '../../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      // Navbar background
      setScrolled(window.scrollY > 40);

      // Active section
      const ids = navLinks.map((link) =>
        link.href.replace('#', '')
      );

      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);

        if (
          el &&
          window.scrollY >= el.offsetTop - 140
        ) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll
      );
    };
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? 'hidden'
      : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = (href) => {
    setMenuOpen(false);

    const id = href.replace('#', '');
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.75,
          ease: 'easeOut',
        }}
        className="fixed left-0 right-0 top-0 z-[9000] transition-all duration-500"
        style={
          scrolled
            ? {
                background:
                  'rgba(8,8,8,0.85)',
                backdropFilter: 'blur(32px)',
                borderBottom:
                  '1px solid rgba(255,255,255,0.06)',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
              }
            : {
                background: 'transparent',
                paddingTop: '1.25rem',
                paddingBottom: '1.25rem',
              }
        }
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="group select-none font-sora text-2xl font-black tracking-wider"
            aria-label="Go to home"
          >
            <span className="grad-orange transition-opacity duration-300 group-hover:opacity-75">
              Dev
            </span>

            <span className="text-white/90">
              By
            </span>

            <span className="grad-cyan transition-opacity duration-300 group-hover:opacity-75">
              AF
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active =
                activeSection ===
                link.href.replace('#', '');

              return (
                <button
                  key={link.href}
                  onClick={() =>
                    scrollTo(link.href)
                  }
                  className="group relative px-4 py-2 text-sm font-medium font-sora transition-all duration-300"
                >
                  <span
                    className="transition-colors duration-300"
                    style={{
                      color: active
                        ? '#ffffff'
                        : 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {link.label}
                  </span>

                  {/* Active Dot */}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute left-1/2 -bottom-0.5 h-[3px] w-[3px] -translate-x-1/2 rounded-full"
                      style={{
                        background: '#f97316',
                      }}
                    />
                  )}

                  {/* Hover Line */}
                  <span
                    className="absolute inset-x-3 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)',
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() =>
                scrollTo('#contact')
              }
              className="btn btn-secondary px-5 py-2 text-sm transition-all duration-300"
              style={{
                borderColor:
                  'rgba(249,115,22,0.4)',
                color: '#f97316',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  '#f97316';

                e.currentTarget.style.color =
                  '#ffffff';

                e.currentTarget.style.borderColor =
                  '#f97316';

                e.currentTarget.style.boxShadow =
                  '0 0 22px rgba(249,115,22,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  'transparent';

                e.currentTarget.style.color =
                  '#f97316';

                e.currentTarget.style.borderColor =
                  'rgba(249,115,22,0.4)';

                e.currentTarget.style.boxShadow =
                  'none';
              }}
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white md:hidden"
            style={{
              background:
                'rgba(255,255,255,0.04)',
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[8999] md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'rgba(4,4,4,0.9)',
                backdropFilter: 'blur(24px)',
              }}
              onClick={() =>
                setMenuOpen(false)
              }
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.32,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="absolute right-0 top-0 flex h-full w-72 flex-col p-8 pt-20"
              style={{
                background: '#111111',
                borderLeft:
                  '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Glow */}
              <div
                className="absolute right-0 top-24 h-40 w-40 rounded-full pointer-events-none blur-3xl"
                style={{
                  background:
                    'rgba(249,115,22,0.08)',
                }}
              />

              {/* Links */}
              <div className="relative z-10 flex flex-col gap-1.5">
                {navLinks.map((link, i) => {
                  const active =
                    activeSection ===
                    link.href.replace('#', '');

                  return (
                    <motion.button
                      key={link.href}
                      initial={{
                        opacity: 0,
                        x: 24,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: i * 0.06,
                      }}
                      onClick={() =>
                        scrollTo(link.href)
                      }
                      className="rounded-xl px-4 py-3.5 text-left text-base font-medium font-sora transition-all duration-300"
                      style={
                        active
                          ? {
                              background:
                                'rgba(249,115,22,0.1)',
                              color: '#f97316',
                              border:
                                '1px solid rgba(249,115,22,0.2)',
                            }
                          : {
                              color:
                                'rgba(255,255,255,0.55)',
                              border:
                                '1px solid transparent',
                            }
                      }
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div className="relative z-10 mt-auto">
                <button
                  onClick={() =>
                    scrollTo('#contact')
                  }
                  className="w-full rounded-xl py-3.5 font-sora font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background:
                      'linear-gradient(135deg, #f97316, #ea580c)',
                  }}
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}