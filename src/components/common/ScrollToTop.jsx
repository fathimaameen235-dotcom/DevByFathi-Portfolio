import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      setVisible(window.scrollY > 500);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    // Initial check
    checkScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{
            duration: 0.25,
            ease: 'easeOut',
          }}
          onClick={scrollTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 hover:border-orange-400/40 hover:text-orange-400"
          style={{
            background: '#181818',
            boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(10px)',
          }}
          whileTap={{ scale: 0.92 }}
          whileHover={{
            scale: 1.06,
          }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}