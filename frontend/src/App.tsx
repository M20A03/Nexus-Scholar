import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  GitCompare, 
  Search as SearchIcon, 
  Plus, 
  Menu, 
  X, 
  Lock, 
  User, 
  ExternalLink,
  Activity,
  Layers,
  Network,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

import LuminaPortal from './pages/LuminaPortal';
import Homepage from './pages/Homepage';
import SearchPage from './pages/SearchPage';
import PaperDetail from './pages/PaperDetail';
import ComparisonBuilder from './pages/ComparisonBuilder';
import UploadPage from './pages/Upload';
import Architecture from './pages/Architecture';
import GraphView from './pages/GraphView';
import LandingPage from './pages/LandingPage';
import { API_BASE } from './config';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? `${API_BASE}/api/auth/login` : `${API_BASE}/api/auth/register`;
      const body = isLogin 
        ? { username, password } 
        : { username, email: `${username}@orkg.org`, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          setToken(data.access_token);
        }
        setShowAuthModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Top Academic Banner */}
      <div className="bg-[#1E3A5F] text-slate-200 text-xs py-1.5 px-4 flex justify-between items-center font-medium">
        <div className="flex items-center gap-2">
          <span className="bg-[#D4A373] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Open Access</span>
          <span>Nexus Scholar — Real-Time Academic Research Knowledge Graph</span>
        </div>
        <a href="https://orkg.org" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-1 hover:text-[#D4A373] font-mono text-[11px]">
          Inspired by ORKG.org <ExternalLink size={12} />
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#254b7a] flex items-center justify-center text-[#D4A373] font-bold text-xl shadow-md">
            🔬
          </div>
          <div>
            <div className="academic-title text-lg leading-tight flex items-center gap-1.5 text-[#1E3A5F]">
              Nexus Scholar <span className="text-xs font-mono text-[#b5834b] bg-[#D4A373]/15 px-2 py-0.5 rounded border border-[#D4A373]/30 font-semibold">Portal</span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:block font-medium">University Knowledge Graph</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link 
            to="/" 
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isActive('/') ? 'bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold border border-[#1E3A5F]/20' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Activity size={17} className={isActive('/') ? 'text-[#1E3A5F]' : 'text-slate-400'} />
            Home
          </Link>

          <Link 
            to="/feed" 
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isActive('/feed') ? 'bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold border border-[#1E3A5F]/20' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen size={17} className={isActive('/feed') ? 'text-[#1E3A5F]' : 'text-slate-400'} />
            Research Feed
          </Link>

          <Link 
            to="/search" 
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isActive('/search') || isActive('/papers') ? 'bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold border border-[#1E3A5F]/20' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <SearchIcon size={17} className={isActive('/search') || isActive('/papers') ? 'text-[#1E3A5F]' : 'text-slate-400'} />
            Hybrid Search
          </Link>

          <Link 
            to="/compare" 
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isActive('/compare') || isActive('/comparisons') ? 'bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold border border-[#1E3A5F]/20' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <GitCompare size={17} className={isActive('/compare') || isActive('/comparisons') ? 'text-[#1E3A5F]' : 'text-slate-400'} />
            Comparisons
          </Link>

          <Link 
            to="/graph" 
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isActive('/graph') ? 'bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold border border-[#1E3A5F]/20' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Network size={17} className={isActive('/graph') ? 'text-[#1E3A5F]' : 'text-slate-400'} />
            Graph View
          </Link>

          <Link 
            to="/architecture" 
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isActive('/architecture') ? 'bg-[#1E3A5F]/10 text-[#1E3A5F] font-bold border border-[#1E3A5F]/20' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers size={17} className={isActive('/architecture') ? 'text-[#1E3A5F]' : 'text-slate-400'} />
            Specs
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Link to="/upload" className="btn-lumina-primary text-xs flex items-center gap-1.5 px-3.5 py-2 shadow-sm font-semibold">
            <Plus size={16} />
            <span>Ingest arXiv Paper</span>
          </Link>

          {token ? (
            <button onClick={logout} className="btn-lumina-secondary text-xs px-3 py-2 font-semibold">
              Sign Out
            </button>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="btn-lumina-secondary text-xs flex items-center gap-1 px-3 py-2 font-semibold">
              <Lock size={14} /> Sign In
            </button>
          )}

          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="lumina-card max-w-md w-full p-6 bg-white border border-slate-200 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="academic-title text-base text-[#1E3A5F]">
                {isLogin ? 'Sign In to Nexus Scholar' : 'Create Nexus Scholar Account'}
              </h3>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-lumina w-full text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-lumina w-full text-xs"
                  required
                />
              </div>

              <button type="submit" className="btn-lumina-primary w-full text-xs py-2.5 mt-2 font-semibold">
                {isLogin ? 'Sign In' : 'Register Account'}
              </button>
            </form>

            <div className="text-center pt-2">
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-xs text-[#1E3A5F] hover:underline font-semibold"
              >
                {isLogin ? "Need an account? Register" : "Already registered? Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function PortalLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E3A5F]">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
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
        </Routes>
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-bold text-[#1E3A5F]">Nexus Scholar</span>
            <span> • University Research Knowledge Graph</span>
          </div>
          <div className="flex gap-4 font-medium">
            <Link to="/" className="hover:text-[#1E3A5F]">Home</Link>
            <Link to="/search" className="hover:text-[#1E3A5F]">Search</Link>
            <Link to="/compare" className="hover:text-[#1E3A5F]">Comparisons</Link>
            <Link to="/graph" className="hover:text-[#1E3A5F]">Graph View</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LuminaPortal />} />
        <Route path="/feed" element={<PortalLayout />} />
        <Route path="/search" element={<PortalLayout />} />
        <Route path="/papers/:id" element={<PortalLayout />} />
        <Route path="/compare" element={<PortalLayout />} />
        <Route path="/comparison-builder" element={<PortalLayout />} />
        <Route path="/comparisons" element={<PortalLayout />} />
        <Route path="/graph" element={<PortalLayout />} />
        <Route path="/upload" element={<PortalLayout />} />
        <Route path="/architecture" element={<PortalLayout />} />
        <Route path="/landing" element={<PortalLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
