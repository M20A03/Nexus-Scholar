import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, ExternalLink, SlidersHorizontal, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { API_BASE } from '../config';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedField, setSelectedField] = useState<string>('all');

  useEffect(() => {
    fetchResults(initialQuery);
  }, [initialQuery]);

  const fetchResults = async (q: string) => {
    setLoading(true);
    try {
      let url = `${API_BASE}/api/papers/`;
      if (q) {
        url = `${API_BASE}/api/papers/search?q=${encodeURIComponent(q)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setPapers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    fetchResults(query);
  };

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="badge-field">Hybrid Search</span>
          <span className="text-xs text-slate-500 font-mono">Full-Text + Knowledge Triples</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Research Knowledge Graph
        </h1>

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by paper title, author, keyword, or arXiv DOI..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-light w-full pl-11 py-3 text-sm"
            />
          </div>
          <button type="submit" className="btn-primary text-sm px-6 py-3 font-semibold shadow-md flex items-center justify-center gap-2">
            <span>Search Graph</span>
          </button>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-500 font-medium">
        <span>Found <strong className="text-slate-900 font-bold">{papers.length}</strong> matching research papers</span>
        {initialQuery && <span>Results for: "<span className="text-blue-600 font-bold">{initialQuery}</span>"</span>}
      </div>

      {/* Results List */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-500 space-y-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium">Searching knowledge graph papers...</p>
        </div>
      ) : papers.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center space-y-3">
          <p className="text-slate-700 font-bold text-base">No papers found matching your query.</p>
          <p className="text-xs text-slate-500">Try searching for keywords like "Attention", "Transformer", "Mistral", "ResNet", or "AlphaFold".</p>
        </div>
      ) : (
        <div className="space-y-4">
          {papers.map((paper) => (
            <div key={paper.id} className="academic-card p-6 md:p-8 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge-field">{paper.venue || 'arXiv'}</span>
                    <span className="text-xs font-mono text-slate-400">{paper.year}</span>
                    {paper.doi && <span className="text-xs font-mono text-slate-400">DOI: {paper.doi}</span>}
                  </div>

                  <Link
                    to={`/papers/${paper.id}`}
                    className="text-lg md:text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug block"
                  >
                    {paper.title}
                  </Link>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {paper.abstract}
              </p>

              {/* Authors */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Authors:</span>
                {(paper.authors || []).map((a: any, i: number) => (
                  <span key={i} className="text-slate-800 font-medium">
                    {typeof a === 'string' ? a : a.name}
                    {i < (paper.authors || []).length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>

              {/* Property Statements */}
              {paper.statements && paper.statements.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Extracted Knowledge Statements
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {paper.statements.slice(0, 3).map((st: any, i: number) => (
                      <div key={i} className="text-xs flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs">
                        <span className="font-semibold text-slate-900">{st.subject}</span>
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
                  View Full Detail & Triples <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-mono text-[11px]"
                  >
                    Open Access PDF <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
