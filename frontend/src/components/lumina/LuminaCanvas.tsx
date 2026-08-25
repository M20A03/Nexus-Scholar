import React, { useEffect, useRef } from 'react';

export default function LuminaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for constellation formation
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll morph tracking
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // 300 Ambient "Knowledge Dust" particles in soft pastel hues
    const PARTICLE_COUNT = 280;
    const palette = [
      'rgba(56, 189, 248, 0.4)', // soft sky blue
      'rgba(212, 163, 115, 0.45)', // pale amber/gold
      'rgba(167, 139, 250, 0.35)', // light lavender
      'rgba(163, 177, 138, 0.4)', // sage green
    ];

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2.2 + 0.8,
      color: palette[Math.floor(Math.random() * palette.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Soft light radial gradient overlay
      const bgGrad = ctx.createRadialGradient(mouseX, mouseY, 30, width / 2, height / 2, width);
      bgGrad.addColorStop(0, 'rgba(255, 251, 235, 0.4)');
      bgGrad.addColorStop(0.6, 'rgba(248, 249, 250, 0.2)');
      bgGrad.addColorStop(1, 'rgba(248, 249, 250, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Scroll morph offset
      const scrollOffset = (scrollY * 0.15) % height;

      // Update & render particles
      const activeNodes: { x: number; y: number; r: number; color: string }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // Wrap bounds
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Mouse attraction when close (constellation effect)
        const dx = mouseX - p.x;
        const dy = mouseY - (p.y - scrollOffset);
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        let drawX = p.x;
        let drawY = p.y - scrollOffset;
        if (drawY < 0) drawY += height;

        if (distToMouse < 160) {
          const force = (160 - distToMouse) / 160;
          drawX += dx * force * 0.06;
          drawY += dy * force * 0.06;
        }

        const currentRadius = p.radius + Math.sin(p.pulse) * 0.4;
        activeNodes.push({ x: drawX, y: drawY, r: currentRadius, color: p.color });

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(drawX, drawY, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // Constellation graph edge connections
      const MAX_DIST = 90;
      for (let i = 0; i < activeNodes.length; i += 3) {
        for (let j = i + 1; j < activeNodes.length; j += 4) {
          const dx = activeNodes[i].x - activeNodes[j].x;
          const dy = activeNodes[i].y - activeNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const lineAlpha = (1 - dist / MAX_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(activeNodes[i].x, activeNodes[i].y);
            ctx.lineTo(activeNodes[j].x, activeNodes[j].y);
            ctx.strokeStyle = `rgba(212, 163, 115, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
}
