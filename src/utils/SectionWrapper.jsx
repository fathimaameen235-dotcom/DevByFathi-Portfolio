import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function SectionWrapper({
  children,
  id,
  className = "",
}) {
  const ref = useRef(null);
  const controls = useAnimation();

  // safer config (prevents weird re-trigger issues)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px",
  });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.section>
  );
}