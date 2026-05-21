import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;

    if (!bar) return;

    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      bar.style.width = `${progress}%`;

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Initial update
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar fixed top-0 left-0 z-[9999] h-[3px]"
      style={{
        width: '0%',
        transition: 'width 0.08s linear',
        background:
          'linear-gradient(90deg, #f97316, #22d3ee, #a855f7)',
        boxShadow: '0 0 12px rgba(249,115,22,0.5)',
      }}
    />
  );
}