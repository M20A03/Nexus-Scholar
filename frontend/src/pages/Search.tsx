import React, { useState } from 'react';
import { Search as SearchIcon, Filter, ArrowUpRight, FileText, Sparkles } from 'lucide-react';
import EntityBadge from '../components/EntityBadge';
import { MOCK_SEARCH_RESULTS } from '../store/useGraphStore';

const DEPARTMENTS = ['All Departments', 'Computer Science', 'Biomedical Engineering', 'Physics', 'Mathematics', 'Chemistry'];
const DOC_TYPES = ['All Types', 'PDF', 'Markdown', 'Code'];

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof MOCK_SEARCH_RESULTS>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setSearched(true);

    // Simulate search delay
    await new Promise((r) => setTimeout(r, 800));

    // Filter mock results
    let filtered = MOCK_SEARCH_RESULTS;
    if (deptFilter !== 'All Departments') {
      filtered = filtered.filter((r) => r.department === deptFilter);
    }
    if (typeFilter !== 'All Types') {
      filtered = filtered.filter((r) => r.type === typeFilter.toLowerCase());
    }
    setResults(filtered);
    setLoading(false);
  };

  const RELATED_SUGGESTIONS = [
    { topic: 'Cross-Disciplinary: ML + Biology', count: 12 },
    { topic: 'Shared Method: Transformer Architecture', count: 8 },
    { topic: 'Common Dataset: PDB', count: 5 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Semantic Search</h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Search across all ingested documents and entities using natural language. Discover cross-disciplinary connections.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-slate-500" />
        </div>
        <input
          type="text"
          className="input-dark w-full pl-13 pr-28 py-4 text-base rounded-2xl"
          style={{ paddingLeft: '3rem' }}
          placeholder="Search across documents, entities, and research topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute inset-y-2 right-2 btn-primary px-6 flex items-center gap-2 rounded-xl"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Search
            </>
          )}
        </button>
      </form>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Filter size={14} className="text-slate-500" />
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="input-dark text-xs py-1.5 px-3 w-auto min-w-[160px]"
        >
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="input-dark text-xs py-1.5 px-3 w-auto min-w-[120px]"
        >
          {DOC_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Results */}
        <div className="xl:col-span-2 space-y-4">
          {results.map((result, i) => (
            <div key={i} className="glass-card p-5 hover:bg-white/[0.06] transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={14} className="text-slate-500 shrink-0" />
                    <h3 className="text-base font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                      {result.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">{result.snippet}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <EntityBadge type="department" name={result.department} />
                    {result.entities.map((e, j) => (
                      <EntityBadge key={j} type="concept" name={e} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {/* Similarity bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{(result.similarity * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${result.similarity * 100}%` }}
                    />
                  </div>
                  <a
                    href="/graph"
                    className="text-[0.65rem] text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1"
                  >
                    View in Graph <ArrowUpRight size={10} />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {searched && results.length === 0 && !loading && (
            <div className="glass-card p-12 text-center">
              <p className="text-slate-500">No results found. Try a different query or adjust filters.</p>
            </div>
          )}

          {!searched && (
            <div className="glass-card p-12 text-center">
              <SearchIcon size={32} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500">Enter a natural language query to search the knowledge graph.</p>
              <p className="text-xs text-slate-600 mt-2">Try: "neural networks for protein structure prediction"</p>
            </div>
          )}
        </div>

        {/* Related Research Sidebar */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Related Cross-Disciplinary Research
            </h3>
            <div className="space-y-3">
              {RELATED_SUGGESTIONS.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm text-slate-300 font-medium">{s.topic}</p>
                    <p className="text-[0.65rem] text-slate-600 mt-0.5">{s.count} papers connected</p>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Quick Search</h3>
            <div className="flex flex-wrap gap-2">
              {['Deep Learning', 'Protein Folding', 'Quantum Computing', 'Graph Theory', 'Transformer'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs text-slate-400 bg-white/[0.04] px-3 py-1.5 rounded-lg hover:bg-white/[0.06] hover:text-slate-300 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
