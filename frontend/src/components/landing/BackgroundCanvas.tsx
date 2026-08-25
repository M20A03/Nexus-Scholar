import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  isDark?: boolean;
}

export default function BackgroundCanvas({ isDark = true }: BackgroundCanvasProps) {
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

    // Mouse position state for 5D reactive warp
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 500 particle paper nodes
    const PARTICLE_COUNT = 350;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * width * 1.5 + width / 2,
      y: (Math.random() - 0.5) * height * 1.5 + height / 2,
      z: Math.random() * 1000 + 1, // Depth layer
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.3 ? '#00f0ff' : '#ff007f',
    }));

    const render = () => {
      // Smooth lerp mouse position
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const mouseOffsetX = (mouseX - width / 2) * 0.08;
      const mouseOffsetY = (mouseY - height / 2) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Draw faint background radial gradient
      if (isDark) {
        const bgGrad = ctx.createRadialGradient(mouseX, mouseY, 50, width / 2, height / 2, width);
        bgGrad.addColorStop(0, 'rgba(0, 240, 255, 0.06)');
        bgGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.3)');
        bgGrad.addColorStop(1, 'rgba(10, 14, 23, 1)');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        const bgGrad = ctx.createRadialGradient(mouseX, mouseY, 50, width / 2, height / 2, width);
        bgGrad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
        bgGrad.addColorStop(0.5, 'rgba(241, 245, 249, 0.8)');
        bgGrad.addColorStop(1, 'rgba(255, 255, 255, 1)');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and project particles
      const projected: { x: number; y: number; r: number; color: string; alpha: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < -width * 0.2) p.x = width * 1.2;
        if (p.x > width * 1.2) p.x = -width * 0.2;
        if (p.y < -height * 0.2) p.y = height * 1.2;
        if (p.y > height * 1.2) p.y = -height * 0.2;

        // Apply 3D parallax depth distortion based on mouse
        const depthFactor = (1000 - p.z) / 1000;
        const px = p.x + mouseOffsetX * depthFactor;
        const py = p.y + mouseOffsetY * depthFactor;
        const alpha = Math.max(0.1, depthFactor * 0.8);

        projected.push({ x: px, y: py, r: p.radius * (depthFactor + 0.5), color: p.color, alpha });

        // Draw particle node
        ctx.beginPath();
        ctx.arc(px, py, p.radius * (depthFactor + 0.5), 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? p.color === '#00f0ff'
            ? `rgba(0, 240, 255, ${alpha})`
            : `rgba(255, 0, 127, ${alpha})`
          : `rgba(14, 165, 233, ${alpha})`;
        ctx.fill();
      }

      // Connect nearby nodes with 3D proximity graph edges
      const MAX_DISTANCE = 110;
      for (let i = 0; i < projected.length; i += 2) {
        for (let j = i + 1; j < projected.length; j += 4) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            const lineAlpha = (1 - dist / MAX_DISTANCE) * 0.25 * projected[i].alpha;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.strokeStyle = isDark ? `rgba(0, 240, 255, ${lineAlpha})` : `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
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
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
}
