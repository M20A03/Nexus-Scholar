import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { PaperCardSkeleton } from '../components/Skeletons';
import { RequireAuth } from './guards';

// Lazy-loaded pages for code-splitting and bundle performance
const LuminaPortal = lazy(() => import('../pages/LuminaPortal'));
const Homepage = lazy(() => import('../pages/Homepage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const PaperDetail = lazy(() => import('../pages/PaperDetail'));
const ComparisonBuilder = lazy(() => import('../pages/ComparisonBuilder'));
const UploadPage = lazy(() => import('../pages/Upload'));
const Architecture = lazy(() => import('../pages/Architecture'));
const GraphView = lazy(() => import('../pages/GraphView'));
const LandingPage = lazy(() => import('../pages/LandingPage'));

/**
 * Standard Portal Layout with persistent Navbar and responsive footer
 */
export const PortalLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors">
      <Navbar />
      <main className="flex-1 container-app py-6 sm:py-8">
        <Suspense fallback={<div className="space-y-4 max-w-4xl mx-auto"><PaperCardSkeleton /><PaperCardSkeleton /></div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="bg-white dark:bg-[#131C2A] border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 mt-auto transition-colors">
        <div className="container-app flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-bold text-[#1E3A5F] dark:text-cyan-400">Nexus Scholar</span>
            <span> • Academic Research Knowledge Graph</span>
          </div>
          <div className="flex gap-4 font-medium">
            <Link to="/" className="hover:text-[#1E3A5F] dark:hover:text-cyan-300">Home</Link>
            <Link to="/feed" className="hover:text-[#1E3A5F] dark:hover:text-cyan-300">Feed</Link>
            <Link to="/search" className="hover:text-[#1E3A5F] dark:hover:text-cyan-300">Search</Link>
            <Link to="/compare" className="hover:text-[#1E3A5F] dark:hover:text-cyan-300">Comparisons</Link>
            <Link to="/graph" className="hover:text-[#1E3A5F] dark:hover:text-cyan-300">Graph</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root Portal / Hero */}
      <Route 
        path="/" 
        element={
          <Suspense fallback={<div className="p-8 text-center"><PaperCardSkeleton /></div>}>
            <LuminaPortal />
          </Suspense>
        } 
      />

      {/* Main Portal Application with Persistent Layout */}
      <Route element={<PortalLayout />}>
        <Route path="/feed" element={<Homepage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/papers/:id" element={<PaperDetail />} />
        <Route path="/compare" element={<ComparisonBuilder />} />
        <Route path="/comparison-builder" element={<ComparisonBuilder />} />
        <Route path="/comparisons" element={<ComparisonBuilder />} />
        <Route path="/graph" element={<GraphView />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/landing" element={<LandingPage />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<LuminaPortal />} />
    </Routes>
  );
};
