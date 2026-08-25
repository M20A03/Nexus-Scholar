import React, { useState, useEffect } from 'react';
import { Network, ArrowRight, Sparkles, Users } from 'lucide-react';
// import MiniGraph from '../components/MiniGraph';

export default function Collaboration() {
  const [author1, setAuthor1] = useState('');
  const [author2, setAuthor2] = useState('');
  const [searching, setSearching] = useState(false);
  const [suggested, setSuggested] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/collaborations')
      .then(res => res.json())
      .then(data => setSuggested(data.suggested || []))
      .catch(console.error);
  }, []);

  const findPath = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author1 || !author2) return;
    setSearching(true);
    // Real implementation would fetch path here
    setTimeout(() => setSearching(false), 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="academic-title text-3xl mb-1">Collaboration Discovery</h2>
        <p className="text-slate-500">
          Find hidden paths between researchers and discover potential collaboration opportunities.
        </p>
      </div>

      <div className="academic-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Network size={20} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-800">Find Research Connection Path</h3>
            <p className="text-xs text-slate-500">Discover the shortest path connecting two researchers in the knowledge graph.</p>
          </div>
        </div>

        <form onSubmit={findPath} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search Researcher 1..."
            value={author1}
            onChange={(e) => setAuthor1(e.target.value)}
            className="input-light flex-1"
          />

          <div className="flex items-center justify-center text-slate-400">
            <ArrowRight size={20} />
          </div>

          <input
            type="text"
            placeholder="Search Researcher 2..."
            value={author2}
            onChange={(e) => setAuthor2(e.target.value)}
            className="input-light flex-1"
          />

          <button
            type="submit"
            disabled={searching || !author1 || !author2}
            className="btn-primary px-8 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {searching ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Network size={16} />
            )}
            Find Path
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-amber-500" />
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            AI-Suggested Collaborations
          </h3>
        </div>
        
        {suggested.length === 0 ? (
           <p className="text-slate-500 italic text-sm">No suggestions available yet. Ensure data is ingested.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggested.map((collab, i) => (
              <div key={i} className="academic-card p-5 hover:bg-slate-50">
                {/* Render collab data here */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
