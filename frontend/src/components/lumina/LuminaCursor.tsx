import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function LuminaCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);

  // Elastic spring physics for smooth gold academic beam trail
  const springConfig = { damping: 28, stiffness: 220 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on devices with a mouse/fine pointer to prevent mobile touch glitches
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('a') ||
          target.closest('button') ||
          target.classList.contains('interactive-hover'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Small Amber/Gold Focus Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#D4A373] rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#D4A373]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Trailing Academic Beam Glow Orb */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-[#D4A373]/50 bg-[#D4A373]/10 backdrop-blur-[0.5px] transition-all duration-150 ease-out"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          borderColor: isHovered ? 'rgba(212, 163, 115, 0.8)' : 'rgba(212, 163, 115, 0.4)',
          boxShadow: isHovered
            ? '0 0 25px rgba(212, 163, 115, 0.35), inset 0 0 15px rgba(212, 163, 115, 0.2)'
            : '0 0 12px rgba(212, 163, 115, 0.15)',
        }}
      />
    </>
  );
}
