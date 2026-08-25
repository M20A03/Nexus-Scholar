import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Sparkles, Moon, Sun, ArrowRight, GitCompare, BookOpen, Database, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import CustomCursor from '../components/landing/CustomCursor';
import BackgroundCanvas from '../components/landing/BackgroundCanvas';
import Hero from '../components/landing/Hero';
import FeatureShowcase from '../components/landing/FeatureShowcase';
import StatsSection from '../components/landing/StatsSection';

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      className={`min-h-screen relative font-sans transition-colors duration-500 overflow-x-hidden ${
        isDark ? 'bg-[#0A0E17] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 5D Custom Cursor */}
      <CustomCursor />

      {/* 5D Background Particle Nebula */}
      <BackgroundCanvas isDark={isDark} />

      {/* Floating Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-800/40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Network className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                ORKG 5D
              </span>
              <span className="text-[10px] font-mono block text-slate-400 -mt-1">
                Knowledge Graph Platform
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/search" className="hover:text-cyan-400 transition-colors">
              Hybrid Search
            </Link>
            <Link to="/comparison-builder" className="hover:text-cyan-400 transition-colors">
              Matrix Comparisons
            </Link>
            <Link to="/collaboration" className="hover:text-cyan-400 transition-colors">
              Cross-Dept Topology
            </Link>
            <Link to="/upload" className="hover:text-cyan-400 transition-colors">
              Ingest Paper
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Theme (Dark Luxury / Light Academic)"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/app"
              className="interactive-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all duration-200 active:scale-95"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero isDark={isDark} />

      {/* Physics-driven Stats Section */}
      <StatsSection isDark={isDark} />

      {/* 5D Feature Showcase */}
      <FeatureShowcase isDark={isDark} />

      {/* Bottom CTA Banner */}
      <section className="relative py-20 px-4 max-w-5xl mx-auto z-10 text-center">
        <div
          className={`rounded-3xl p-12 md:p-16 border backdrop-blur-xl relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border-slate-800 shadow-[0_30px_70px_rgba(0,0,0,0.8)]'
              : 'bg-gradient-to-tr from-white via-slate-50 to-white border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)]'
          }`}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to Explore the{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
              Knowledge Graph?
            </span>
          </h2>

          <p className="text-base md:text-lg max-w-2xl mx-auto mb-8 text-slate-400">
            Ingest open access arXiv papers, compare models, and extract structured key-value property statements in seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/app"
              className="interactive-hover px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 shadow-xl shadow-cyan-500/30 transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Knowledge Graph Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/upload"
              className={`interactive-hover px-6 py-4 rounded-2xl font-semibold text-sm border transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
            >
              Upload Paper
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/40 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-400">ORKG 5D Research Knowledge Graph</span>
          </div>

          <p>© 2026 University Research Portal. Inspired by ORKG & Stanford Explore.</p>

          <div className="flex items-center gap-6 font-mono">
            <a
              href="https://orkg.org"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>orkg.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
