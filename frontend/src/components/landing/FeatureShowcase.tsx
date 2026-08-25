import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network, GitCompare, Sparkles, Cpu, Search, Share2, Layers, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureShowcaseProps {
  isDark?: boolean;
}

export default function FeatureShowcase({ isDark = true }: FeatureShowcaseProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const features = [
    {
      id: 'semantic-extraction',
      icon: Cpu,
      title: 'AI Semantic Triple Extraction',
      description: 'Automatically converts raw PDF research papers into structured subject-predicate-object knowledge statements with high precision.',
      badge: 'Vertex AI + Groq',
      gradient: 'from-cyan-500 to-blue-600',
      link: '/upload',
      detailSnippet: 'Extracts 15+ properties per paper (dataset, approach, metric, hardware specs).'
    },
    {
      id: 'matrix-comparison',
      icon: GitCompare,
      title: 'N-Dimensional Matrix Comparisons',
      description: 'Generates real-time side-by-side comparative matrices across multiple benchmarks, algorithms, and dataset parameters.',
      badge: 'Live State Engine',
      gradient: 'from-fuchsia-500 to-pink-600',
      link: '/comparison-builder',
      detailSnippet: 'Compare Transformers, Mistral, PaLM, ResNet & LLaMA instantly.'
    },
    {
      id: 'cross-dept-graph',
      icon: Network,
      title: 'Cross-Disciplinary Discovery',
      description: 'Uncovers hidden research overlaps, potential collaboration networks, and redundant studies across university departments.',
      badge: 'Interactive Topology',
      gradient: 'from-amber-400 to-orange-500',
      link: '/collaboration',
      detailSnippet: 'Links CS Deep Learning with Biomedical Protein Folding & Physics.'
    },
  ];

  return (
    <section className="relative py-24 px-4 max-w-7xl mx-auto z-10" onMouseMove={handleMouseMove}>
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          Next-Generation{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
            Knowledge Infrastructure
          </span>
        </h2>
        <p className="text-base md:text-lg" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
          Experience 5D interactive depth layers, micro-animations, and instant semantic research exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          // 5D depth layer translations based on mouse position
          const bgTranslateX = mousePos.x * (idx + 1) * -15;
          const bgTranslateY = mousePos.y * (idx + 1) * -15;
          const fgTranslateX = mousePos.x * (idx + 1) * 25;
          const fgTranslateY = mousePos.y * (idx + 1) * 25;

          return (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="group relative rounded-2xl p-[1px] transition-all duration-300 overflow-hidden"
            >
              {/* Rotating Conic Gradient Neon Border on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,#00f0ff,#ff007f,#00f0ff)] animate-spin-slow" />

              {/* Main Card Body */}
              <div
                className={`relative h-full rounded-2xl p-8 flex flex-col justify-between backdrop-blur-xl transition-colors duration-300 ${
                  isDark ? 'bg-slate-900/90 border border-slate-800' : 'bg-white/80 border border-slate-200'
                }`}
              >
                {/* Background Parallax Layer */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl pointer-events-none opacity-20 transition-transform duration-200 ease-out"
                  style={{
                    background: feat.id === 'semantic-extraction' ? '#00f0ff' : feat.id === 'matrix-comparison' ? '#ff007f' : '#f59e0b',
                    transform: `translate3d(${bgTranslateX}px, ${bgTranslateY}px, 0)`,
                  }}
                />

                <div>
                  {/* Top Badge & Foreground Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="p-3.5 rounded-xl text-white shadow-lg transition-transform duration-200 ease-out"
                      style={{
                        background: `linear-gradient(135deg, ${feat.id === 'semantic-extraction' ? '#00f0ff, #2563eb' : feat.id === 'matrix-comparison' ? '#d946ef, #e11d48' : '#fbbf24, #ea580c'})`,
                        transform: `translate3d(${fgTranslateX}px, ${fgTranslateY}px, 0)`,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-full border"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        color: isDark ? '#94a3b8' : '#475569',
                      }}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                    {feat.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                    {feat.description}
                  </p>
                </div>

                <div>
                  <div
                    className="p-3 rounded-lg text-xs font-mono mb-6 border"
                    style={{
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                      borderColor: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(203, 213, 225, 0.8)',
                      color: isDark ? '#cbd5e1' : '#334155',
                    }}
                  >
                    ⚡ {feat.detailSnippet}
                  </div>

                  <Link
                    to={feat.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                  >
                    <span>Launch Feature</span>
                    <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
