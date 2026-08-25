import React from 'react';
import { AlertTriangle, ArrowUpRight, Link2, GitCompare } from 'lucide-react';
import EntityBadge from '../components/EntityBadge';
import { MOCK_REDUNDANCIES } from '../store/useGraphStore';

const RedundancyDetection = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Redundancy Detection</h2>
        <p className="text-sm text-slate-400">
          Identify overlapping research studies across departments to reduce duplicate efforts and find collaboration opportunities.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 stat-card stat-card-warm">
          <p className="text-2xl font-bold text-white">{MOCK_REDUNDANCIES.length}</p>
          <p className="text-xs text-slate-400 mt-1">Redundancies Detected</p>
        </div>
        <div className="glass-card p-5 stat-card stat-card-purple">
          <p className="text-2xl font-bold text-white">
            {MOCK_REDUNDANCIES.filter((r) => r.paper1.department !== r.paper2.department).length}
          </p>
          <p className="text-xs text-slate-400 mt-1">Cross-Department Overlaps</p>
        </div>
        <div className="glass-card p-5 stat-card stat-card-emerald">
          <p className="text-2xl font-bold text-white">
            {MOCK_REDUNDANCIES.filter((r) => r.similarity > 0.7).length}
          </p>
          <p className="text-xs text-slate-400 mt-1">High Similarity ({'>'}70%)</p>
        </div>
      </div>

      {/* Redundancy Cards */}
      <div className="space-y-5">
        {MOCK_REDUNDANCIES.map((item) => (
          <div key={item.id} className="glass-card p-6 hover:bg-white/[0.06] transition-all">
            <div className="flex items-start justify-between gap-6 mb-5">
              {/* Papers */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Paper 1 */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-2">
                    <GitCompare size={14} className="text-blue-400" />
                    <span className="text-[0.65rem] text-slate-500 uppercase font-semibold">Paper A</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">{item.paper1.title}</h4>
                  <div className="space-y-1">
                    {item.paper1.authors.map((a) => (
                      <p key={a} className="text-xs text-slate-400">{a}</p>
                    ))}
                  </div>
                  <div className="mt-2">
                    <EntityBadge type="department" name={item.paper1.department} />
                  </div>
                </div>

                {/* Paper 2 */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-2">
                    <GitCompare size={14} className="text-purple-400" />
                    <span className="text-[0.65rem] text-slate-500 uppercase font-semibold">Paper B</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">{item.paper2.title}</h4>
                  <div className="space-y-1">
                    {item.paper2.authors.map((a) => (
                      <p key={a} className="text-xs text-slate-400">{a}</p>
                    ))}
                  </div>
                  <div className="mt-2">
                    <EntityBadge type="department" name={item.paper2.department} />
                  </div>
                </div>
              </div>

              {/* Similarity Score */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold ${
                  item.similarity > 0.8
                    ? 'bg-rose-500/15 text-rose-400'
                    : item.similarity > 0.6
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'bg-emerald-500/15 text-emerald-400'
                }`}>
                  {(item.similarity * 100).toFixed(0)}%
                </div>
                <span className="text-[0.6rem] text-slate-600 uppercase font-semibold">Overlap</span>
                {/* Similarity bar */}
                <div className="w-14 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.similarity > 0.8
                        ? 'bg-rose-500'
                        : item.similarity > 0.6
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${item.similarity * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Shared Entities */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center gap-1.5 shrink-0">
                <Link2 size={12} className="text-slate-500" />
                <span className="text-[0.65rem] text-slate-500 uppercase font-semibold">Shared Entities:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.sharedEntities.map((e) => (
                  <EntityBadge key={e} type="concept" name={e} />
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className={`flex items-start gap-3 p-3 rounded-xl ${
              item.similarity > 0.8
                ? 'bg-rose-500/[0.06] border border-rose-500/10'
                : item.similarity > 0.6
                ? 'bg-amber-500/[0.06] border border-amber-500/10'
                : 'bg-emerald-500/[0.06] border border-emerald-500/10'
            }`}>
              {item.similarity > 0.8 ? (
                <AlertTriangle size={14} className="text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm text-slate-300">{item.recommendation}</p>
                <a
                  href="/graph"
                  className="text-[0.65rem] text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1.5"
                >
                  View overlap in Graph <ArrowUpRight size={10} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedundancyDetection;
