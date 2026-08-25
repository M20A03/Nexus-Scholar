import React, { useState, useEffect } from 'react';
import { GitCompare, Plus, Trash2, Check, BarChart2, Table, ArrowUpDown, Save, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { API_BASE } from '../config';

export default function ComparisonBuilder() {
  const [allPapers, setAllPapers] = useState<any[]>([]);
  const [selectedPaperIds, setSelectedPaperIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/papers/`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllPapers(data);
          // Default select first 4 papers for comparison matrix
          setSelectedPaperIds(data.slice(0, 4).map((p: any) => p.id));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const togglePaperSelection = (id: string) => {
    if (selectedPaperIds.includes(id)) {
      if (selectedPaperIds.length <= 2) return; // keep at least 2
      setSelectedPaperIds(selectedPaperIds.filter((pId) => pId !== id));
    } else {
      setSelectedPaperIds([...selectedPaperIds, id]);
    }
  };

  const selectedPapers = allPapers.filter((p) => selectedPaperIds.includes(p.id));

  // Extract unique predicates across selected papers for matrix rows
  const matrixProperties = Array.from(
    new Set(
      selectedPapers.flatMap((p) => (p.statements || []).map((s: any) => s.predicate))
    )
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-field">ORKG Matrix Builder</span>
            <span className="text-xs text-slate-500 font-mono">Side-by-Side Comparison</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            N-Dimensional Paper Comparison Matrix
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Compare research models, datasets, metrics, and property statements side-by-side.
          </p>
        </div>

        <button className="btn-primary text-xs flex items-center gap-1.5 shadow-sm">
          <Download size={14} />
          <span>Export Matrix CSV</span>
        </button>
      </div>

      {/* Paper Selection Chips Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Select Papers to Include in Comparison ({selectedPapers.length} Selected)
        </div>
        <div className="flex flex-wrap gap-2">
          {allPapers.map((paper) => {
            const isSelected = selectedPaperIds.includes(paper.id);
            return (
              <button
                key={paper.id}
                onClick={() => togglePaperSelection(paper.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {isSelected && <Check size={12} className="text-blue-600" />}
                <span className="line-clamp-1 max-w-[200px]">{paper.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-500 space-y-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium">Generating comparison matrix...</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th className="p-4 font-bold min-w-[180px] bg-slate-100/80 sticky left-0 z-10">
                    Property / Predicate
                  </th>
                  {selectedPapers.map((paper) => (
                    <th key={paper.id} className="p-4 font-bold min-w-[240px] border-l border-slate-200">
                      <div className="text-sm text-slate-900 line-clamp-2 leading-snug">{paper.title}</div>
                      <div className="text-[11px] font-mono text-slate-500 mt-1 font-normal">
                        {paper.venue} ({paper.year})
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {/* Year */}
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50 sticky left-0 z-10 border-r border-slate-200">
                    Publication Year
                  </td>
                  {selectedPapers.map((paper) => (
                    <td key={paper.id} className="p-4 border-l border-slate-200 font-mono font-bold text-blue-700">
                      {paper.year}
                    </td>
                  ))}
                </tr>

                {/* Authors */}
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50 sticky left-0 z-10 border-r border-slate-200">
                    Key Authors
                  </td>
                  {selectedPapers.map((paper) => (
                    <td key={paper.id} className="p-4 border-l border-slate-200">
                      {(paper.authors || []).map((a: any) => (typeof a === 'string' ? a : a.name)).join(', ')}
                    </td>
                  ))}
                </tr>

                {/* Extracted Statement Rows */}
                {matrixProperties.map((pred) => (
                  <tr key={pred} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-mono font-semibold text-purple-700 bg-purple-50/30 sticky left-0 z-10 border-r border-slate-200">
                      {pred}
                    </td>
                    {selectedPapers.map((paper) => {
                      const matchingStatements = (paper.statements || []).filter(
                        (st: any) => st.predicate === pred
                      );
                      return (
                        <td key={paper.id} className="p-4 border-l border-slate-200">
                          {matchingStatements.length > 0 ? (
                            <div className="space-y-1">
                              {matchingStatements.map((st: any) => (
                                <div key={st.id} className="bg-white p-2 rounded border border-slate-200 shadow-2xs font-medium text-slate-900">
                                  {st.object}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-400 font-mono">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
