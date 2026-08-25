import React from 'react';
import { motion } from 'framer-motion';
import { Network, Sparkles, ArrowRight, GitCompare, BookOpen, ExternalLink, ShieldCheck, Layers, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

import LuminaCursor from '../components/lumina/LuminaCursor';
import LuminaCanvas from '../components/lumina/LuminaCanvas';
import LuminaHero from '../components/lumina/LuminaHero';
import LuminaStatsCards from '../components/lumina/LuminaStatsCards';
import LuminaActivityFeed from '../components/lumina/LuminaActivityFeed';
import LuminaGraphView from '../components/lumina/LuminaGraphView';

export default function LuminaPortal() {
  return (
    <div className="min-h-screen relative font-sans text-[#1E3A5F] bg-[#F8F9FA] overflow-x-hidden selection:bg-amber-100 selection:text-amber-900">
      {/* 5D Custom Amber/Gold Cursor */}
      <LuminaCursor />

      {/* Ambient "Knowledge Dust" Background Canvas */}
      <LuminaCanvas />

      {/* Floating Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#254b7a] flex items-center justify-center text-[#D4A373] shadow-md group-hover:scale-105 transition-transform">
              <Network className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#1E3A5F] group-hover:text-[#b5834b] transition-colors">
                Nexus Scholar
              </span>
              <span className="text-[10px] font-mono text-[#D4A373] block -mt-1 font-semibold">
                University Knowledge Graph
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-700">
            <Link to="/search" className="hover:text-[#1E3A5F] transition-colors">
              Hybrid Search
            </Link>
            <Link to="/compare" className="hover:text-[#1E3A5F] transition-colors">
              Matrix Comparisons
            </Link>
            <Link to="/graph" className="hover:text-[#1E3A5F] transition-colors">
              Graph Network
            </Link>
            <Link to="/upload" className="hover:text-[#1E3A5F] transition-colors">
              Ingest arXiv Paper
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/search"
              className="btn-lumina-primary text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Explore Nexus Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <LuminaHero />

      {/* Physical 3D Stats Cards */}
      <LuminaStatsCards />

      {/* Live Academic Stream / Activity Feed */}
      <LuminaActivityFeed />

      {/* Interactive 5D Graph View */}
      <LuminaGraphView />

      {/* Bottom CTA Banner */}
      <section className="relative py-20 px-4 max-w-5xl mx-auto z-10 text-center">
        <div className="lumina-card p-12 md:p-16 border border-white/90 shadow-xl relative overflow-hidden bg-gradient-to-br from-white via-[#F8F9FA] to-white">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4A373]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#A3B18A]/15 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1E3A5F] mb-4 tracking-tight">
            Elevate Scientific Research with{' '}
            <span className="serif-title italic font-normal text-[#b5834b]">Nexus Scholar</span>
          </h2>

          <p className="text-sm md:text-base max-w-2xl mx-auto mb-8 text-slate-600">
            Ingest open-access arXiv research, extract structured property statements, and explore cross-disciplinary collaboration graphs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/search"
              className="btn-lumina-primary px-8 py-3.5 text-xs font-bold shadow-lg flex items-center gap-2"
            >
              <span>Launch Nexus Scholar Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/upload"
              className="btn-lumina-secondary px-6 py-3.5 text-xs font-semibold"
            >
              Ingest Paper by arXiv ID
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/80 py-8 px-6 text-center text-xs text-slate-500 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#D4A373]" />
            <span className="font-bold text-[#1E3A5F]">Nexus Scholar — University Research Knowledge Graph</span>
          </div>

          <p>© 2026 Nexus Scholar. Inspired by ORKG.org & University Research Collections.</p>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <a href="https://orkg.org" target="_blank" rel="noreferrer" className="hover:text-[#1E3A5F] flex items-center gap-1">
              <span>orkg.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
