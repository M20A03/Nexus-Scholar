import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async (searchQuery = '') => {
    setLoading(true);
    try {
      const url = searchQuery 
        ? `http://localhost:4000/api/papers?search=${encodeURIComponent(searchQuery)}`
        : 'http://localhost:4000/api/papers';
      const res = await fetch(url);
      const data = await res.json();
      setPapers(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPapers(query);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="academic-title text-3xl mb-2">Publications</h1>
          <p className="text-slate-500">Search and explore research papers across the university.</p>
        </div>
      </div>

      <div className="academic-card p-4">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, or keyword..." 
              className="w-full input-light pl-10"
            />
          </div>
          <button type="button" className="btn-secondary flex items-center gap-2">
            <Filter size={18} /> Filters
          </button>
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-500 text-center py-10">Loading publications...</p>
        ) : papers.length === 0 ? (
          <p className="text-slate-500 text-center py-10">No publications found.</p>
        ) : (
          papers.map(paper => (
            <div key={paper.id} className="academic-card p-6 flex flex-col sm:flex-row gap-6 hover:bg-slate-50 transition-colors">
              <div className="flex-1">
                <Link to={`/papers/${paper.id}`} className="academic-title text-xl text-blue-700 hover:underline mb-2 inline-block">
                  {paper.title}
                </Link>
                <div className="text-sm text-slate-600 mb-3 font-medium">
                  {paper.authors?.map((a: any) => a.name).join(', ')} • {paper.year || new Date(paper.publishedAt).getFullYear()}
                </div>
                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                  {paper.abstract || "No abstract available for this publication."}
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="badge badge-department">{paper.doi ? `DOI: ${paper.doi}` : 'No DOI'}</span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end justify-between shrink-0">
                <div className="text-slate-400">
                  <BookOpen size={24} />
                </div>
                <Link to={`/papers/${paper.id}`} className="text-sm text-blue-600 font-medium hover:underline">
                  View Details →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
