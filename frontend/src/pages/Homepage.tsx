import React, { useEffect, useState } from 'react';
import { Search, GitCompare, BookOpen, UserCheck, Sparkles, ArrowRight, Activity, Plus, Filter, ExternalLink, Network, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';

export default function Homepage() {
  const navigate = useNavigate();
  const [papers, setPapers] = useState<any[]>([]);
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [stats, setStats] = useState({ papersCount: 35, authorsCount: 28, statementsCount: 145, comparisonsCount: 12 });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes, sRes] = await Promise.all([
        fetch(`${API_BASE}/api/papers/`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/comparisons/`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/stats`).then(r => r.json()).catch(() => null),
      ]);

      if (Array.isArray(pRes)) setPapers(pRes);
      if (Array.isArray(cRes)) setComparisons(cRes);
      if (sRes) setStats(sRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Search Section */}
      <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Open Access Research Knowledge Graph</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Structuring scientific discovery into a queryable knowledge graph.
          </h1>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            ORKG extracts structured key-value property statements from open access research papers to enable real-time hybrid search, side-by-side matrices, and interactive network graphs.
          </p>

          {/* Quick Search Input */}
          <form onSubmit={handleSearchSubmit} className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, abstract, arXiv ID, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-light w-full pl-11 py-3 text-sm shadow-xs"
              />
            </div>
            <button type="submit" className="btn-primary text-sm px-6 py-3 font-semibold shadow-md flex items-center justify-center gap-2">
              <span>Hybrid Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2">
            <span>Quick Actions:</span>
            <Link to="/comparison-builder" className="text-blue-600 hover:underline flex items-center gap-1">
              <GitCompare className="w-3.5 h-3.5" /> Comparison Builder
            </Link>
            <span>•</span>
            <Link to="/upload" className="text-blue-600 hover:underline flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Ingest arXiv Paper
            </Link>
            <span>•</span>
            <Link to="/graph" className="text-blue-600 hover:underline flex items-center gap-1">
              <Network className="w-3.5 h-3.5" /> Interactive Graph
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.papersCount || 35}</div>
            <div className="text-xs text-slate-500 font-medium">Indexed Papers</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.statementsCount || 145}</div>
            <div className="text-xs text-slate-500 font-medium">Extracted Triples</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.comparisonsCount || 12}</div>
            <div className="text-xs text-slate-500 font-medium">Matrix Comparisons</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.authorsCount || 28}</div>
            <div className="text-xs text-slate-500 font-medium">Verified Authors</div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Research Paper Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">Recent Updates Feed</h2>
            </div>
            <Link to="/search" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
              Loading papers...
            </div>
          ) : (
            <div className="space-y-4">
              {papers.slice(0, 8).map((paper) => (
                <div key={paper.id} className="academic-card p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="badge-field">{paper.venue || 'arXiv'}</span>
                        <span className="text-xs font-mono text-slate-400">{paper.year}</span>
                      </div>
                      <Link
                        to={`/papers/${paper.id}`}
                        className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug block"
                      >
                        {paper.title}
                      </Link>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {paper.abstract}
                  </p>

                  {/* Authors */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Authors:</span>
                    {(paper.authors || []).map((a: any, i: number) => (
                      <span key={i} className="text-slate-700 font-medium">
                        {typeof a === 'string' ? a : a.name}
                        {i < (paper.authors || []).length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>

                  {/* Statements Snippet */}
                  {paper.statements && paper.statements.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5">
                      <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        Extracted Property Statements
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {paper.statements.slice(0, 3).map((st: any, i: number) => (
                          <div key={i} className="text-xs flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs">
                            <span className="font-semibold text-slate-800">{st.subject}</span>
                            <span className="badge-predicate">{st.predicate}</span>
                            <span className="text-slate-600">{st.object}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 text-xs">
                    <Link
                      to={`/papers/${paper.id}`}
                      className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      View Details & Knowledge Graph <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {paper.pdfUrl && (
                      <a
                        href={paper.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-mono text-[11px]"
                      >
                        PDF <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Features */}
        <div className="space-y-6">
          {/* Active Comparisons */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-slate-900 text-base">Active Comparisons</h3>
            </div>
            <p className="text-xs text-slate-500">
              Side-by-side benchmark matrices across foundation models and datasets.
            </p>

            <div className="space-y-3">
              {comparisons.slice(0, 3).map((comp) => (
                <Link
                  key={comp.id}
                  to="/compare"
                  className="block p-3 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all text-xs"
                >
                  <div className="font-bold text-slate-900">{comp.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    {comp.papers?.length || 4} papers compared • {comp.field || 'AI'}
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/comparison-builder"
              className="btn-secondary text-xs w-full flex items-center justify-center gap-1.5"
            >
              <span>Build Custom Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Verified Authors */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-base">Top Contributors</h3>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Ashish Vaswani', dept: 'Natural Language Processing', papers: '14 papers' },
                { name: 'Jacob Devlin', dept: 'Deep Learning & Pre-training', papers: '12 papers' },
                { name: 'Hugo Touvron', dept: 'Foundation Models', papers: '9 papers' },
                { name: 'Kaiming He', dept: 'Computer Vision & ResNet', papers: '18 papers' },
              ].map((auth, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-900">{auth.name}</div>
                    <div className="text-[10px] text-slate-500">{auth.dept}</div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{auth.papers}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
