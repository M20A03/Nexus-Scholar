import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Sparkles, BookOpen, GitCompare, UserCheck, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LuminaActivityFeed() {
  const { scrollYProgress } = useScroll();

  // Differential parallax stack translation factors
  const yOffset1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yOffset2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yOffset3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const activities = [
    {
      id: 1,
      type: 'paper',
      title: 'Ingested Paper: "Mistral 7B — Efficient Foundation Model"',
      desc: 'Extracted 14 key-value property statements (GQA, Sliding Window Attention).',
      time: 'Just now',
      tag: 'Computer Science',
      badgeClass: 'badge-lumina-blue',
      icon: BookOpen,
      offset: yOffset1,
      link: '/papers/paper-2310-06825',
    },
    {
      id: 2,
      type: 'comparison',
      title: 'Created Matrix: Transformer vs Mistral vs LLaMA 2',
      desc: 'Compared context window, parameters, and BLEU translation scores side-by-side.',
      time: '4 min ago',
      tag: 'Foundation Models',
      badgeClass: 'badge-lumina-gold',
      icon: GitCompare,
      offset: yOffset2,
      link: '/compare',
    },
    {
      id: 3,
      type: 'network',
      title: 'Discovered Cross-Disciplinary Edge: Deep Learning ↔ Protein Folding',
      desc: 'Linked CS Attention mechanism with Biomedical Engineering AlphaFold 3 model.',
      time: '12 min ago',
      tag: 'Biomedical / CS',
      badgeClass: 'badge-lumina-sage',
      icon: Network,
      offset: yOffset3,
      link: '/graph',
    },
  ];

  return (
    <section className="relative py-16 px-4 max-w-5xl mx-auto z-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-[#D4A373] animate-pulse" />
            <span className="text-xs font-mono uppercase font-bold text-[#1E3A5F] tracking-wider">
              Live Academic Stream
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A5F]">
            Real-Time Activity Feed & Parallax Stack
          </h2>
        </div>

        <Link
          to="/search"
          className="btn-lumina-secondary text-xs flex items-center gap-1.5"
        >
          <span>View All Activity</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Vertical Timeline Stack */}
      <div className="relative space-y-6">
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#D4A373] via-[#A3B18A] to-transparent opacity-40 pointer-events-none" />

        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <motion.div
              key={act.id}
              style={{ y: act.offset }}
              className="relative pl-14 group"
            >
              {/* Timeline Icon Node */}
              <div className="absolute left-3.5 top-5 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-[#D4A373] flex items-center justify-center text-[#1E3A5F] shadow-sm group-hover:scale-110 group-hover:border-[#1E3A5F] transition-all">
                <Icon className="w-3 h-3" />
              </div>

              {/* Parallax Index Card */}
              <div className="lumina-card p-6 border border-white/80 hover:border-[#D4A373]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={act.badgeClass}>{act.tag}</span>
                    <span className="text-xs font-mono text-slate-400">{act.time}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1E3A5F] group-hover:text-[#b5834b] transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                <Link
                  to={act.link}
                  className="btn-lumina-secondary text-xs self-start md:self-auto shrink-0 flex items-center gap-1 group-hover:border-[#D4A373]"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
