import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices / mobile
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 768
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    let rafId;

    // Mouse Move
    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate3d(${mouseX - 4}px, ${
        mouseY - 4
      }px, 0)`;
    };

    // Smooth Ring Animation
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      ring.style.transform = `translate3d(${ringX - 18}px, ${
        ringY - 18
      }px, 0)`;

      rafId = requestAnimationFrame(animateRing);
    };

    // Hover Effects
    const handleEnter = () => {
      ring.classList.add('hovered');
    };

    const handleLeave = () => {
      ring.classList.remove('hovered');
    };

    // Interactive Elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    document.addEventListener('mousemove', moveCursor, {
      passive: true,
    });

    rafId = requestAnimationFrame(animateRing);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', moveCursor);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });

      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={dotRef}
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '9999px',
          background: '#ffffff',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />

      {/* Cursor Ring */}
      <div
        ref={ringRef}
        className="hidden md:block cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '9999px',
          border: '1px solid rgba(255,255,255,0.45)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition:
            'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
          willChange: 'transform',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Cursor Styles */}
      <style>
        {`
          .cursor-ring.hovered {
            width: 54px !important;
            height: 54px !important;
            border-color: rgba(249, 115, 22, 0.8) !important;
          }
        `}
      </style>
    </>
  );
}