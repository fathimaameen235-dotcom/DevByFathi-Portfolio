import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }) {
  const [pct, setPct] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Progress Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPct((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setIsVisible(false);

            // Wait for exit animation
            setTimeout(() => {
              onComplete?.();
            }, 600);
          }, 250);

          return 100;
        }

        const step =
          prev < 40 ? 3 :
          prev < 70 ? 2 :
          prev < 90 ? 1 :
          0.5;

        return Math.min(Math.round(prev + step), 100);
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{
            background: "#080808",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          {/* Ambient Glow Blobs */}
          <div
            className="absolute w-80 h-80 rounded-full blur-3xl bg-orange-500/20 animate-pulse"
            style={{
              top: "15%",
              left: "10%",
            }}
          />

          <div
            className="absolute w-96 h-96 rounded-full blur-3xl bg-cyan-500/15 animate-pulse"
            style={{
              bottom: "10%",
              right: "10%",
              animationDelay: "1s",
            }}
          />

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            {/* Logo */}
            <div className="select-none font-black tracking-widest text-5xl">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Dev
              </span>

              <span className="text-white mx-1">By</span>

              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                AF
              </span>
            </div>

            {/* Loader */}
            <div className="flex flex-col items-center gap-4 w-64">
              {/* Percentage */}
              <motion.div
                key={pct}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-5xl font-bold tabular-nums bg-gradient-to-r from-orange-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent"
              >
                {pct}%
              </motion.div>

              {/* Progress Bar */}
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #f97316, #22d3ee, #a855f7)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    ease: "linear",
                    duration: 0.08,
                  }}
                />
              </div>

              {/* Text */}
              <p
                className="text-[10px] uppercase tracking-[0.35em] text-white/30"
                style={{
                  fontFamily: "DM Mono, monospace",
                }}
              >
                Loading Portfolio
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}