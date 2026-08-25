import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Network, GitCompare, BookOpen, ExternalLink, Zap } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function LuminaHero() {
  const navigate = useNavigate();
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // 3D Magnetic tilt physics for pill search bar
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 18, stiffness: 280 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 18, stiffness: 280 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!searchBarRef.current) return;
    const rect = searchBarRef.current.getBoundingClientRect();
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // 5D Split Word 3D Animation variants
  const headline = "Discover Hidden Research Connections Across Knowledge Graphs";
  const words = headline.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24, rotateX: -12 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative pt-16 pb-20 px-4 max-w-6xl mx-auto text-center z-10">
      {/* Background Soft Gold Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#D4A373]/15 via-[#A3B18A]/10 to-transparent rounded-full blur-[110px] pointer-events-none" />

      {/* Top Academic Tag */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/80 border border-[#D4A373]/40 text-[#1E3A5F] shadow-xs backdrop-blur-md mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4A373] animate-pulse" />
        <span>OPEN RESEARCH KNOWLEDGE GRAPH — ACADEMIC PORTAL</span>
      </motion.div>

      {/* Headline with 5D 3D Word-by-Word Rotation */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#1E3A5F] tracking-tight mb-6 leading-[1.15] perspective-800"
      >
        {words.map((word, wIdx) => (
          <motion.span
            key={wIdx}
            variants={wordVariants}
            className={`inline-block mr-3 transform-gpu ${
              word === "Research" || word === "Connections" || word === "Knowledge" || word === "Graphs"
                ? "serif-title italic font-normal text-[#b5834b] underline decoration-[#D4A373]/30 underline-offset-8"
                : ""
            }`}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-base md:text-xl max-w-3xl mx-auto text-slate-600 mb-10 leading-relaxed"
      >
        Structured key-value property statements, real-time cross-disciplinary topology, and side-by-side paper benchmark matrices for modern researchers.
      </motion.p>

      {/* Magic 3D Pill Search Bar */}
      <div style={{ perspective: 800 }} className="flex justify-center mb-10">
        <motion.div
          ref={searchBarRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-2xl p-2 rounded-full lumina-card border border-[#D4A373]/30 shadow-[0_20px_50px_rgba(30,58,95,0.08)] backdrop-blur-xl"
        >
          {/* Spotlight Cursor Glow Effect */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(350px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(212, 163, 115, 0.22), transparent 75%)`,
            }}
          />

          <form onSubmit={handleSearchSubmit} className="relative z-10 flex items-center gap-2 px-3">
            <Search className="w-5 h-5 text-[#D4A373] shrink-0 ml-2" />
            <input
              type="text"
              placeholder="Search arXiv papers, authors, dataset metrics, or DOIs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent border-none py-3 text-sm md:text-base text-[#1E3A5F] placeholder:text-slate-400 focus:outline-none font-medium"
            />
            <button
              type="submit"
              className="interactive-hover px-6 py-3 rounded-full font-semibold text-xs text-white bg-gradient-to-r from-[#1E3A5F] to-[#254b7a] hover:from-[#152842] hover:to-[#1E3A5F] shadow-md shadow-[#1E3A5F]/20 transition-all duration-200 active:scale-95 shrink-0 flex items-center gap-1.5"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Suggestion Chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-2 text-xs"
      >
        <span className="text-slate-500 font-medium mr-1">Trending Research:</span>
        {['1706.03762 (Transformer)', '2310.06825 (Mistral 7B)', '2106.09685 (LoRA)', '2404.14219 (Phi-3)'].map((chip, i) => (
          <Link
            key={i}
            to={`/search?q=${encodeURIComponent(chip.split(' ')[0])}`}
            className="px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-700 hover:border-[#D4A373] hover:text-[#b5834b] transition-all font-mono text-[11px]"
          >
            {chip}
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
