import React, { useEffect, useState } from 'react';
import { Layers, BookOpen, GitCompare, ArrowRight, FolderTree, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../config';

export default function ResearchProblems() {
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/problems`)
      .then(res => res.json())
      .then(data => {
        setProblems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProblems = problems.filter(p => 
    p.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    p.field.toLowerCase().includes(filterQuery.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 badge-orkg mb-2">
            <FolderTree size={12} /> Research Field Taxonomy
          </div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">Research Problems</h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse structured scientific problems organized by academic disciplines and domains.
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Filter problems or fields..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="input-light pl-10 w-full"
          />
        </div>
      </div>

      {/* Main Problems List */}
      {loading ? (
        <div className="academic-card p-12 text-center text-slate-500">
          <div className="w-8 h-8 border-2 border-[#e86161] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading ORKG Research Problems...
        </div>
      ) : filteredProblems.length === 0 ? (
        <div className="academic-card p-12 text-center text-slate-500">
          No research problems match your query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProblems.map((prob) => (
            <div key={prob.id} className="academic-card p-6 flex flex-col justify-between hover:border-[#e86161]/50 group">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-field">{prob.field}</span>
                  <span className="badge-orkg">{prob.paperCount || prob.papers?.length || 10} Papers</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-[#ab2328] transition-colors mb-2 leading-snug">
                  {prob.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {prob.description || 'No description available for this research problem.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <BookOpen size={14} /> Open Access Papers
                </span>
                <Link to="/comparisons" className="font-bold text-[#ab2328] hover:underline flex items-center gap-1">
                  View Comparisons <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
