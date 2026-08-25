import React, { useEffect, useState } from 'react';
import { GitCompare, ArrowRight, Table, Layers, Plus, Filter, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../config';

export default function Comparisons() {
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/comparisons`)
      .then(res => res.json())
      .then(data => {
        setComparisons(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#ab2328] rounded-2xl p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm border border-white/10">
            <GitCompare size={14} className="text-[#e86161]" /> ORKG Signature Feature
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
            Research Comparisons
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
            Compare research contributions side-by-side across standardized properties (methods, datasets, metrics, accuracy, parameters, and open source code).
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/upload" className="btn-orkg flex items-center gap-2">
              <Plus size={16} /> Create New Comparison
            </Link>
            <Link to="/problems" className="btn-orkg-outline text-white border-white/30 hover:bg-white/10">
              Browse by Research Field
            </Link>
          </div>
        </div>
      </div>

      {/* Main Comparisons Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-800">Featured Comparison Matrices</h2>
            <p className="text-xs text-slate-500 mt-1">Side-by-side evaluation tables compiled from open access literature</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs flex items-center gap-1.5 py-1.5">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {loading ? (
          <div className="academic-card p-12 text-center text-slate-500">
            <div className="w-8 h-8 border-2 border-[#e86161] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading ORKG comparisons...
          </div>
        ) : comparisons.length === 0 ? (
          <div className="academic-card p-12 text-center text-slate-500">
            No comparisons found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map((comp) => (
              <div key={comp.id} className="academic-card p-6 flex flex-col justify-between hover:border-[#e86161]/50 group">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-field">{comp.field || 'Computer Science'}</span>
                    <span className="badge-orkg">{comp.papers?.length || comp.paperIds?.length || 3} Papers Compared</span>
                  </div>

                  <Link to={`/comparisons/${comp.id}`} className="font-serif font-bold text-xl text-slate-900 group-hover:text-[#ab2328] transition-colors mb-2 block leading-snug">
                    {comp.title}
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {comp.description}
                  </p>

                  {/* Properties preview pills */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Compared Properties:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(comp.properties || ['Architecture', 'Objective', 'Parameters', 'Primary Metric']).slice(0, 5).map((prop: string, i: number) => (
                        <span key={i} className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Table size={14} /> Side-by-side Matrix
                  </span>
                  <Link to={`/comparisons/${comp.id}`} className="text-xs font-bold text-[#ab2328] hover:underline flex items-center gap-1">
                    View Comparison Matrix <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
