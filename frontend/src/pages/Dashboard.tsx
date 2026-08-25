import React, { useEffect, useState } from 'react';
import { 
  Library, 
  Users, 
  Network, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ papersCount: 0, authorsCount: 0, entitiesCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="academic-title text-3xl mb-2">Research Overview</h1>
          <p className="text-slate-500">Global metrics across all university departments.</p>
        </div>
        <Link to="/upload" className="btn-primary flex items-center gap-2">
          <Activity size={18} />
          Ingest New Data
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="academic-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Library size={24} />
            </div>
            <h3 className="font-semibold text-slate-700">Publications</h3>
          </div>
          <div>
            <span className="text-4xl font-bold text-slate-800">
              {loading ? '...' : stats.papersCount}
            </span>
            <p className="text-sm text-slate-500 mt-1">Total documents indexed</p>
          </div>
        </div>

        <div className="academic-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Users size={24} />
            </div>
            <h3 className="font-semibold text-slate-700">Researchers</h3>
          </div>
          <div>
            <span className="text-4xl font-bold text-slate-800">
              {loading ? '...' : stats.authorsCount}
            </span>
            <p className="text-sm text-slate-500 mt-1">Identified authors</p>
          </div>
        </div>

        <div className="academic-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <Network size={24} />
            </div>
            <h3 className="font-semibold text-slate-700">Entities</h3>
          </div>
          <div>
            <span className="text-4xl font-bold text-slate-800">
              {loading ? '...' : stats.entitiesCount}
            </span>
            <p className="text-sm text-slate-500 mt-1">Concepts & methods</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="academic-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif font-bold text-lg text-slate-800">Recent Publications</h3>
            <Link to="/search" className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
             <p className="text-slate-500 text-sm italic">Connect to API to load recent publications.</p>
          </div>
        </div>

        <div className="academic-card p-6 bg-slate-50">
           <h3 className="font-serif font-bold text-lg text-slate-800 mb-2">Knowledge Graph</h3>
           <p className="text-slate-600 text-sm mb-6">Visual representation of cross-disciplinary research connections.</p>
           
           <div className="h-48 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
              <Link to="/graph" className="btn-secondary flex items-center gap-2">
                <Network size={18} />
                Open Full Graph
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
