import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Database, Upload as UploadIcon, Share2, Search as SearchIcon, Users } from 'lucide-react';

import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import GraphView from './pages/GraphView';
import Search from './pages/Search';
import Collaboration from './pages/Collaboration';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Toaster position="top-right" />
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Database size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">KG Builder</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
            <Link to="/upload" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2 transition-colors"><UploadIcon size={18} /> Upload</Link>
            <Link to="/graph" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2 transition-colors"><Share2 size={18} /> Graph</Link>
            <Link to="/search" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2 transition-colors"><SearchIcon size={18} /> Search</Link>
            <Link to="/collaboration" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2 transition-colors"><Users size={18} /> Collaborate</Link>
          </div>
        </nav>
        <main className="flex-1 max-w-7xl w-full mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/graph" element={<GraphView />} />
            <Route path="/search" element={<Search />} />
            <Route path="/collaboration" element={<Collaboration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
