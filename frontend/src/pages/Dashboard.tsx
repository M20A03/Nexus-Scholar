import React, { useEffect, useState } from 'react';
import { 
  GitCompare, 
  BookOpen, 
  Layers, 
  Network, 
  Search, 
  ArrowRight, 
  Plus, 
  FileText, 
  Sparkles,
  ExternalLink,
  Table,
  Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ 
    papersCount: 12, 
    authorsCount: 24, 
    problemsCount: 5, 
    comparisonsCount: 8, 
    statementsCount: 42,
    entitiesCount: 65 
  });
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/stats`).then(res => res.json()).catch(() => stats),
      fetch(`${API_BASE}/api/comparisons`).then(res => res.json()).catch(() => []),
      fetch(`${API_BASE}/api/papers`).then(res => res.json()).catch(() => ({ data: [] }))
    ]).then(([sData, cData, pData]) => {
      if (sData && !sData.error) setStats(sData);
      if (Array.isArray(cData)) setComparisons(cData);
      if (pData && Array.isArray(pData.data)) setPapers(pData.data);
      setLoading(false);
    });
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto">
      {/* ORKG Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#ab2328] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-[#e86161]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/10">
            <Sparkles size={14} className="text-[#e86161]" /> Open Research Knowledge Graph
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Structuring scientific research for real-time discovery.
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            ORKG extracts structured contribution statements (Subject-Predicate-Object triples) from open access research papers to build a live, queryable knowledge graph.
          </p>

          {/* Hero Search Box */}
          <form onSubmit={handleHeroSearch} className="flex items-center bg-white rounded-2xl p-1.5 shadow-xl max-w-2xl">
            <Search className="text-slate-400 ml-3.5 shrink-0" size={20} />
            <input 
              type="text" 
              placeholder="Search research papers, methods, datasets, or metrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-3 py-2.5 text-slate-800 text-sm focus:outline-none placeholder:text-slate-400"
            />
            <button type="submit" className="btn-orkg rounded-xl px-6 py-3 font-semibold text-sm shrink-0">
              Search ORKG
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap gap-3 pt-2 text-xs font-medium text-slate-300">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">Popular Comparisons:</span>
            <Link to="/comparisons/comp-1" className="hover:text-white underline decoration-slate-500">
              Transformer vs BERT vs LLaMA
            </Link>
            <span>•</span>
            <Link to="/comparisons/comp-2" className="hover:text-white underline decoration-slate-500">
              ResNet Vision Benchmark
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="academic-card p-5 border-l-4 border-l-[#e86161]">
          <span className="text-2xl font-bold text-slate-900 block">{stats.papersCount}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Open Access Papers</span>
        </div>
        <div className="academic-card p-5 border-l-4 border-l-blue-500">
          <span className="text-2xl font-bold text-slate-900 block">{stats.comparisonsCount}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Research Matrices</span>
        </div>
        <div className="academic-card p-5 border-l-4 border-l-purple-500">
          <span className="text-2xl font-bold text-slate-900 block">{stats.problemsCount}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Research Problems</span>
        </div>
        <div className="academic-card p-5 border-l-4 border-l-emerald-500">
          <span className="text-2xl font-bold text-slate-900 block">{stats.statementsCount}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Structured Triples</span>
        </div>
        <div className="academic-card p-5 border-l-4 border-l-amber-500 col-span-2 md:col-span-1">
          <span className="text-2xl font-bold text-slate-900 block">{stats.authorsCount}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indexed Authors</span>
        </div>
      </div>

      {/* Featured ORKG Comparisons */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 badge-orkg mb-1">
              <GitCompare size={12} /> ORKG Signature Feature
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Featured Comparisons</h2>
          </div>
          <Link to="/comparisons" className="text-xs font-bold text-[#ab2328] hover:underline flex items-center gap-1">
            View All Comparisons <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisons.slice(0, 2).map((comp) => (
            <div key={comp.id} className="academic-card p-6 flex flex-col justify-between hover:border-[#e86161]/50 group">
              <div>
                <span className="badge-field mb-2">{comp.field || 'Computer Science'}</span>
                <Link to={`/comparisons/${comp.id}`} className="font-serif font-bold text-xl text-slate-900 group-hover:text-[#ab2328] block mb-2 leading-snug">
                  {comp.title}
                </Link>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {comp.description}
                </p>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono mb-4 text-slate-700">
                  <span className="text-slate-400 font-sans font-semibold text-[10px] uppercase block mb-1">Compared Properties:</span>
                  {(comp.properties || ['Architecture', 'Objective', 'Parameters']).slice(0, 4).join(' • ')}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Table size={14} /> Side-by-Side Matrix
                </span>
                <Link to={`/comparisons/${comp.id}`} className="font-bold text-[#ab2328] hover:underline flex items-center gap-1">
                  Inspect Comparison →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Open Access Research Papers Section */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Open Access Research Papers</h2>
            <p className="text-xs text-slate-500 mt-1">Populated with real papers, structured statements, and open access PDFs</p>
          </div>
          <Link to="/search" className="text-xs font-bold text-[#ab2328] hover:underline flex items-center gap-1">
            Browse All Papers <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-4">
          {papers.slice(0, 4).map((paper) => (
            <div key={paper.id} className="academic-card p-6 flex flex-col sm:flex-row justify-between gap-6 hover:bg-slate-50/50">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge-field">{paper.venue || 'arXiv'} ({paper.year})</span>
                  <span className="badge-orkg">Open Access PDF</span>
                </div>

                <Link to={`/papers/${paper.id}`} className="font-serif font-bold text-lg text-slate-900 hover:text-[#ab2328] hover:underline mb-2 block leading-snug">
                  {paper.title}
                </Link>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {paper.abstract}
                </p>

                <div className="flex flex-wrap gap-2 text-xs">
                  {paper.statements?.slice(0, 3).map((st: any, idx: number) => (
                    <span key={idx} className="badge-predicate">
                      {st.predicate}: {st.object}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <a 
                  href={paper.pdfUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-secondary text-xs flex items-center gap-1.5 py-1.5"
                >
                  <FileText size={14} className="text-[#e86161]" /> Download PDF
                </a>

                <Link to={`/papers/${paper.id}`} className="text-xs font-bold text-[#ab2328] hover:underline mt-2">
                  View Statements →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
