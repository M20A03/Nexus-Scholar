import React, { useState } from 'react';
import { Network, ArrowRight, Sparkles, Users } from 'lucide-react';
import EntityBadge from '../components/EntityBadge';
import MiniGraph from '../components/MiniGraph';
import {
  MOCK_COLLABORATION_PATH,
  MOCK_SUGGESTED_COLLABORATIONS,
  MOCK_NODES,
} from '../store/useGraphStore';

const Collaboration = () => {
  const [author1, setAuthor1] = useState('');
  const [author2, setAuthor2] = useState('');
  const [pathResult, setPathResult] = useState<typeof MOCK_COLLABORATION_PATH | null>(null);
  const [searching, setSearching] = useState(false);

  const findPath = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author1 || !author2) return;
    setSearching(true);
    await new Promise((r) => setTimeout(r, 1000));
    setPathResult(MOCK_COLLABORATION_PATH);
    setSearching(false);
  };

  // Build mini-graph from path result
  const pathGraphNodes = pathResult
    ? pathResult.map((n) => ({ id: n.id, name: n.name, type: n.type }))
    : [];
  const pathGraphLinks = pathResult
    ? pathResult.slice(0, -1).map((n, i) => ({ source: n.id, target: pathResult[i + 1].id }))
    : [];

  const authors = MOCK_NODES.filter((n) => n.type === 'author');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Collaboration Discovery</h2>
        <p className="text-sm text-slate-400">
          Find hidden paths between researchers and discover potential collaboration opportunities.
        </p>
      </div>

      {/* Path Finder */}
      <div className="glass-card p-6 glow-purple">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
            <Network size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Find Research Connection Path</h3>
            <p className="text-xs text-slate-500">Discover the shortest path connecting two researchers in the knowledge graph.</p>
          </div>
        </div>

        <form onSubmit={findPath} className="flex flex-col sm:flex-row gap-3">
          <select
            value={author1}
            onChange={(e) => setAuthor1(e.target.value)}
            className="input-dark flex-1"
          >
            <option value="">Select Researcher 1...</option>
            {authors.map((a) => (
              <option key={a.id} value={a.name}>{a.name} — {a.department}</option>
            ))}
          </select>

          <div className="flex items-center justify-center text-slate-600">
            <ArrowRight size={20} />
          </div>

          <select
            value={author2}
            onChange={(e) => setAuthor2(e.target.value)}
            className="input-dark flex-1"
          >
            <option value="">Select Researcher 2...</option>
            {authors.map((a) => (
              <option key={a.id} value={a.name}>{a.name} — {a.department}</option>
            ))}
          </select>

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

      {/* Path Result */}
      {pathResult && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Path Chain */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">
              Connection Path ({pathResult.length} hops)
            </h3>
            <div className="space-y-1">
              {pathResult.map((node, i) => (
                <React.Fragment key={node.id}>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background:
                          node.type === 'author'
                            ? 'rgba(139, 92, 246, 0.2)'
                            : 'rgba(59, 130, 246, 0.2)',
                        color:
                          node.type === 'author' ? '#a78bfa' : '#60a5fa',
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{node.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <EntityBadge type={node.type} />
                        <EntityBadge type="department" name={node.department} />
                      </div>
                    </div>
                  </div>
                  {i < pathResult.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <div className="w-px h-4 bg-white/[0.08]" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Path Mini Graph */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Path Visualization
            </h3>
            <div className="flex items-center justify-center bg-white/[0.02] rounded-xl p-4">
              <MiniGraph
                nodes={pathGraphNodes}
                links={pathGraphLinks}
                width={380}
                height={250}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {pathResult
                .filter((n) => n.type !== 'author')
                .map((n) => (
                  <span key={n.id} className="text-xs text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg">
                    {n.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Suggested Collaborations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            AI-Suggested Collaborations
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_SUGGESTED_COLLABORATIONS.map((collab, i) => (
            <div key={i} className="glass-card p-5 hover:bg-white/[0.06] transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-purple-400" />
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Match Score</span>
                <span className="text-sm font-bold text-white ml-auto">{(collab.strength * 100).toFixed(0)}%</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <p className="text-sm text-white font-medium">{collab.author1}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <p className="text-sm text-white font-medium">{collab.author2}</p>
                </div>
              </div>

              {/* Strength bar */}
              <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: `${collab.strength * 100}%` }}
                />
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {collab.departments.map((d) => (
                  <EntityBadge key={d} type="department" name={d} />
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {collab.sharedTopics.map((t) => (
                  <span key={t} className="text-[0.6rem] text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
