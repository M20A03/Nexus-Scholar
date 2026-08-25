import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Library, 
  Search, 
  Network, 
  Upload, 
  Users, 
  GitCompare, 
  Database,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/Upload';
import GraphView from './pages/GraphView';
import SearchPage from './pages/Search';
import PaperDetail from './pages/PaperDetail';
import Collaboration from './pages/Collaboration';
import RedundancyDetection from './pages/RedundancyDetection';
import Architecture from './pages/Architecture';

// A simple Navbar component
const Navbar = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold font-serif text-lg">
            N
          </div>
          <span className="font-serif font-bold text-xl text-slate-800 tracking-tight">
            Nexus Scholar
          </span>
        </Link>
        <div className="flex-1 max-w-xl px-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search researchers, papers, concepts..." 
              className="w-full bg-slate-100 border-none text-slate-800 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-slate-800 hidden md:block">Sign In</button>
          <button className="btn-primary hidden md:block">Submit Research</button>
          <button className="md:hidden text-slate-500">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Library, path: '/' },
  { id: 'search', label: 'Publications', icon: Search, path: '/search' },
  { id: 'upload', label: 'Ingest Data', icon: Upload, path: '/upload' },
  { id: 'graph', label: 'Knowledge Graph', icon: Network, path: '/graph' },
  { id: 'collaboration', label: 'Collaborations', icon: Users, path: '/collaboration' },
  { id: 'redundancy', label: 'Redundancy', icon: GitCompare, path: '/redundancy' },
  { id: 'architecture', label: 'Architecture', icon: Database, path: '/architecture' },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 hidden md:flex flex-col h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="p-4 py-6 flex-1 flex flex-col gap-1">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Navigation</h3>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Navbar />
        <div className="flex flex-1 max-w-7xl mx-auto w-full">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/papers/:id" element={<PaperDetail />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/graph" element={<GraphView />} />
              <Route path="/collaboration" element={<Collaboration />} />
              <Route path="/redundancy" element={<RedundancyDetection />} />
              <Route path="/architecture" element={<Architecture />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
