import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth elastic spring motion for outer ring
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('a') || target.closest('button') || target.classList.contains('interactive-hover'))) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Inner glowing dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_12px_#00f0ff]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Outer elastic trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-cyan-400/40 bg-cyan-500/10 backdrop-blur-[1px] transition-all duration-150 ease-out"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? '56px' : '32px',
          height: isHovered ? '56px' : '32px',
          borderColor: isHovered ? 'rgba(255, 0, 127, 0.7)' : 'rgba(0, 240, 255, 0.4)',
          boxShadow: isHovered ? '0 0 25px rgba(255, 0, 127, 0.4)' : '0 0 15px rgba(0, 240, 255, 0.2)',
        }}
      />
    </>
  );
}
