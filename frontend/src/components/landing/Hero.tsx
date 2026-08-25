import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Network, GitCompare, BookOpen, Database, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  isDark?: boolean;
}

export default function Hero({ isDark = true }: HeroProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // 3D Magnetic tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 15, stiffness: 300 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 15, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = x / width - 0.5;
    const normY = y / height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);

    setSpotlightPos({
      x: (x / width) * 100,
      y: (y / height) * 100,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setSpotlightPos({ x: 50, y: 50 });
  };

  // Split text stagger setup
  const titleText = "Structuring Scientific Discovery into 5D Knowledge Graphs";
  const words = titleText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as const },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-fuchsia-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide border mb-6 backdrop-blur-md shadow-lg"
          style={{
            backgroundColor: isDark ? 'rgba(0, 240, 255, 0.08)' : 'rgba(14, 165, 233, 0.1)',
            borderColor: isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(14, 165, 233, 0.3)',
            color: isDark ? '#00f0ff' : '#0284c7',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>OPEN RESEARCH KNOWLEDGE GRAPH — 5D PORTAL</span>
        </motion.div>

        {/* 3D Split Text Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15] perspective-1000"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          {words.map((word, wIdx) => (
            <span key={wIdx} className="inline-block mr-3 whitespace-nowrap">
              {word.split("").map((char, cIdx) => (
                <motion.span
                  key={cIdx}
                  variants={letterVariants}
                  className={
                    word === "5D" || word === "Knowledge" || word === "Graphs"
                      ? "inline-block bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent transform-gpu"
                      : "inline-block transform-gpu"
                  }
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          style={{ color: isDark ? '#94a3b8' : '#475569' }}
        >
          ORKG extracts structured key-value triples from open-access research papers to generate real-time hybrid search, cross-disciplinary network topologies, and side-by-side comparison matrices.
        </motion.p>

        {/* 3D Magnetic Tilt Glass Card */}
        <div style={{ perspective: 1000 }} className="flex justify-center mb-12">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className={`relative w-full max-w-2xl p-8 rounded-2xl border transition-shadow duration-300 backdrop-blur-xl ${
              isDark
                ? 'bg-slate-950/60 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-cyan-500/50'
                : 'bg-white/70 border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-cyan-500/40'
            }`}
          >
            {/* Dynamic Spotlight Effect */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${
                  isDark ? 'rgba(0, 240, 255, 0.15)' : 'rgba(14, 165, 233, 0.15)'
                }, transparent 80%)`,
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-2">
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-cyan-400 animate-spin-slow" />
                  <span className="font-bold text-lg" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                    Interactive Knowledge Matrix
                  </span>
                </div>
                <p className="text-xs font-mono" style={{ color: isDark ? '#64748b' : '#64748b' }}>
                  Indexed Papers: 47+ • Entities: 312+ • Graph Triples: 864+
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Link
                  to="/search"
                  className="interactive-hover flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95"
                >
                  <span>Explore Knowledge Graph</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/comparison-builder"
                  className={`interactive-hover inline-flex items-center justify-center p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-cyan-400'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-cyan-600'
                  }`}
                  title="Build Matrix Comparison"
                >
                  <GitCompare className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
