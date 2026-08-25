import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { BookOpen, UserCheck, Sparkles, Network, GitCompare } from 'lucide-react';

export default function LuminaStatsCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Indexed arXiv Papers', target: 35, suffix: '+', icon: BookOpen, tag: 'Open Access' },
    { label: 'Extracted Graph Triples', target: 145, suffix: '+', icon: Sparkles, tag: 'Key-Value Triples' },
    { label: 'Active University Authors', target: 28, suffix: '', icon: UserCheck, tag: 'Verified Faculty' },
    { label: 'Matrix Comparisons', target: 12, suffix: '', icon: GitCompare, tag: 'N-Dimensional' },
  ];

  return (
    <section ref={containerRef} className="relative py-16 px-4 max-w-6xl mx-auto z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <PhysicalCard key={idx} stat={stat} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

function PhysicalCard({ stat, isInView }: { stat: any; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [count, setCount] = useState(0);

  // Dynamic light reflection gradient on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });
  };

  // Eased count up animation
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * stat.target));

      if (progress < 1) requestAnimationFrame(updateCounter);
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, stat.target]);

  const Icon = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="relative lumina-card p-6 border border-white/80 shadow-md flex flex-col justify-between overflow-hidden cursor-default"
    >
      {/* 5D Cursor Light Reflection Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(212, 163, 115, 0.18), transparent 70%)`,
        }}
      />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F]">
            <Icon className="w-5 h-5" />
          </div>
          <span className="badge-lumina-gold font-mono text-[10px]">{stat.tag}</span>
        </div>

        <div>
          <div className="text-3xl md:text-4xl font-extrabold text-[#1E3A5F] tracking-tight">
            {count}
            {stat.suffix}
          </div>
          <p className="text-xs font-semibold text-slate-600 mt-1">{stat.label}</p>
        </div>
      </div>
    </motion.div>
  );
}
