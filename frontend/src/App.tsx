import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import GraphView from './pages/GraphView';
import Search from './pages/Search';
import Collaboration from './pages/Collaboration';
import RedundancyDetection from './pages/RedundancyDetection';
import Architecture from './pages/Architecture';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#0a0e1a]">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              fontSize: '0.875rem',
            },
          }}
        />
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/graph" element={<GraphView />} />
              <Route path="/search" element={<Search />} />
              <Route path="/collaboration" element={<Collaboration />} />
              <Route path="/redundancy" element={<RedundancyDetection />} />
              <Route path="/architecture" element={<Architecture />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
