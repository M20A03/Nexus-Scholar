import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  GitCompare, 
  Search as SearchIcon, 
  Plus, 
  Menu, 
  X, 
  Lock, 
  ExternalLink,
  Activity,
  Layers,
  Network,
  Command as CommandIcon,
  LogOut
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { CommandPalette } from './CommandPalette';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { apiFetch } from '../lib/fetcher';
import toast from 'react-hot-toast';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(() => 
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );

  // Global Cmd+K / Ctrl+K shortcut
  useKeyboardShortcut({ key: 'k', ctrlOrCmd: true }, () => {
    setShowCommandPalette(prev => !prev);
  });

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { username, password } 
        : { username, email: `${username.toLowerCase()}@nexus-scholar.org`, password };

      const data = await apiFetch<any>(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        silent: false,
      });

      if (data && data.access_token) {
        localStorage.setItem('token', data.access_token);
        setToken(data.access_token);
        toast.success(isLogin ? 'Successfully signed in!' : 'Account registered successfully!');
        setShowAuthModal(false);
        setUsername('');
        setPassword('');
      }
    } catch (err: any) {
      // Handled via apiFetch toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Signed out successfully');
  };

  return (
    <>
      <header className="bg-white/90 dark:bg-[#131C2A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors">
        {/* Top Academic Banner */}
        <div className="bg-[#1E3A5F] dark:bg-[#0E1726] text-slate-200 text-xs py-1.5 px-4 flex justify-between items-center font-medium">
          <div className="flex items-center gap-2">
            <span className="bg-[#D4A373] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Open Access</span>
            <span className="truncate">Nexus Scholar — Academic Knowledge Graph & Discovery Platform</span>
          </div>
          <a 
            href="https://orkg.org" 
            target="_blank" 
            rel="noreferrer" 
            className="hidden sm:flex items-center gap-1 hover:text-[#D4A373] font-mono text-[11px] transition-colors"
          >
            Inspired by ORKG.org <ExternalLink size={12} />
          </a>
        </div>

        {/* Main Navbar Container */}
        <div className="container-app h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 focus:outline-none" aria-label="Nexus Scholar Home">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#254b7a] dark:from-cyan-900 dark:to-blue-950 flex items-center justify-center text-[#D4A373] font-bold text-xl shadow-md">
              🔬
            </div>
            <div>
              <div className="academic-title text-base sm:text-lg leading-tight flex items-center gap-1.5 text-[#1E3A5F] dark:text-cyan-300">
                Nexus Scholar <span className="text-[10px] font-mono text-[#b5834b] dark:text-amber-300 bg-[#D4A373]/15 dark:bg-amber-400/10 px-1.5 py-0.5 rounded border border-[#D4A373]/30 font-semibold">Portal</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">University Knowledge Graph</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                isActive('/') 
                  ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold border border-[#1E3A5F]/20 dark:border-cyan-800/40' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Activity size={16} />
              Home
            </Link>

            <Link 
              to="/feed" 
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                isActive('/feed') 
                  ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold border border-[#1E3A5F]/20 dark:border-cyan-800/40' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen size={16} />
              Feed
            </Link>

            <Link 
              to="/search" 
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                isActive('/search') 
                  ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold border border-[#1E3A5F]/20 dark:border-cyan-800/40' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <SearchIcon size={16} />
              Search
            </Link>

            <Link 
              to="/compare" 
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                isActive('/compare') 
                  ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold border border-[#1E3A5F]/20 dark:border-cyan-800/40' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <GitCompare size={16} />
              Comparisons
            </Link>

            <Link 
              to="/graph" 
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                isActive('/graph') 
                  ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold border border-[#1E3A5F]/20 dark:border-cyan-800/40' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Network size={16} />
              Graph
            </Link>

            <Link 
              to="/architecture" 
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                isActive('/architecture') 
                  ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold border border-[#1E3A5F]/20 dark:border-cyan-800/40' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers size={16} />
              Specs
            </Link>
          </nav>

          {/* Action Controls & Utilities */}
          <div className="flex items-center gap-2">
            {/* Quick Search Palette Trigger */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              title="Search and Commands (Ctrl+K or ⌘K)"
            >
              <SearchIcon size={14} />
              <span>Search</span>
              <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">
                <CommandIcon size={10} /> K
              </kbd>
            </button>

            {/* Ingest Action Button */}
            <Link 
              to="/upload" 
              className="btn-lumina-primary text-xs flex items-center gap-1.5 px-3 py-2 shadow-xs font-semibold"
            >
              <Plus size={15} />
              <span className="hidden md:inline">Ingest arXiv Paper</span>
              <span className="md:hidden">Ingest</span>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Controls */}
            {token ? (
              <button 
                onClick={logout} 
                className="btn-lumina-secondary text-xs px-2.5 py-2 font-semibold flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)} 
                className="btn-lumina-secondary text-xs flex items-center gap-1 px-3 py-2 font-semibold"
              >
                <Lock size={14} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#131C2A]/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-fade-in">
            <Link 
              to="/" 
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/') ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <Activity size={18} /> Home
            </Link>

            <Link 
              to="/feed" 
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/feed') ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <BookOpen size={18} /> Research Feed
            </Link>

            <Link 
              to="/search" 
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/search') ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <SearchIcon size={18} /> Hybrid Search
            </Link>

            <Link 
              to="/compare" 
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/compare') ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <GitCompare size={18} /> Comparison Matrix
            </Link>

            <Link 
              to="/graph" 
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/graph') ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <Network size={18} /> Graph Explorer
            </Link>

            <Link 
              to="/architecture" 
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/architecture') ? 'bg-[#1E3A5F]/10 dark:bg-cyan-950/40 text-[#1E3A5F] dark:text-cyan-300 font-bold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <Layers size={18} /> Architecture Specs
            </Link>
          </div>
        )}

        {/* Auth Modal with Idempotency Protection */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="lumina-card max-w-md w-full p-6 bg-white dark:bg-[#131C2A] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-fade-in">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="academic-title text-base text-[#1E3A5F] dark:text-cyan-300">
                  {isLogin ? 'Sign In to Nexus Scholar' : 'Create Nexus Scholar Account'}
                </h3>
                <button 
                  onClick={() => setShowAuthModal(false)} 
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-lumina"
                    placeholder="e.g. jdoe"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-lumina"
                    placeholder="••••••••"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-lumina-primary w-full text-xs py-2.5 mt-2 font-semibold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : (
                    <span>{isLogin ? 'Sign In' : 'Register Account'}</span>
                  )}
                </button>
              </form>

              <div className="text-center pt-2">
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-xs text-[#1E3A5F] dark:text-cyan-400 hover:underline font-semibold"
                >
                  {isLogin ? "Need an account? Register" : "Already registered? Sign in"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette Modal */}
      <CommandPalette 
        isOpen={showCommandPalette} 
        onClose={() => setShowCommandPalette(false)} 
      />
    </>
  );
};
