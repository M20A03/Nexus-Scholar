import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { Database, FileText, Network, Users, Award } from 'lucide-react';

interface StatsSectionProps {
  isDark?: boolean;
}

export default function StatsSection({ isDark = true }: StatsSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Measure scroll velocity for 5D scroll speed reaction
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Map scroll velocity to an acceleration multiplier (1x up to 4x speed)
  const velocityMultiplier = useTransform(smoothVelocity, [-2000, 0, 2000], [2.5, 1, 2.5]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Indexed Research Papers', target: 47, suffix: '+', icon: FileText, color: 'text-cyan-400' },
    { label: 'Extracted Graph Triples', target: 864, suffix: '+', icon: Network, color: 'text-fuchsia-400' },
    { label: 'Matrix Comparisons', target: 12, suffix: '', icon: Database, color: 'text-emerald-400' },
    { label: 'University Authors', target: 28, suffix: '+', icon: Users, color: 'text-amber-400' },
  ];

  return (
    <section ref={containerRef} className="relative py-20 px-4 max-w-7xl mx-auto z-10">
      <div
        className={`rounded-3xl p-10 md:p-14 border backdrop-blur-2xl transition-all duration-300 ${
          isDark
            ? 'bg-slate-900/70 border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
            : 'bg-white/80 border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800/50">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center pt-6 md:pt-0 md:px-4">
              <div className={`p-3 rounded-2xl mb-4 ${isDark ? 'bg-slate-800/60' : 'bg-slate-100'} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>

              <Counter
                target={stat.target}
                suffix={stat.suffix}
                isInView={isInView}
                velocityMultiplier={velocityMultiplier}
                isDark={isDark}
              />

              <p className="text-xs md:text-sm font-medium mt-2" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-component for individual animated counter with velocity boost
function Counter({
  target,
  suffix,
  isInView,
  velocityMultiplier,
  isDark,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
  velocityMultiplier: any;
  isDark: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing curve
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentTarget = Math.floor(easeOutQuad * target);

      setCount(currentTarget);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, target]);

  return (
    <span
      className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
      style={{
        color: isDark ? '#ffffff' : '#0f172a',
      }}
    >
      {count}
      {suffix}
    </span>
  );
}
