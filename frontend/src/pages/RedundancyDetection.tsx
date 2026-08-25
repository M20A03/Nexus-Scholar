import React, { useEffect, useState } from 'react';
import { AlertTriangle, ArrowUpRight, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RedundancyDetection() {
  const [redundancies, setRedundancies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/redundancies')
      .then(res => res.json())
      .then(data => {
        setRedundancies(data.redundancies || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="academic-title text-3xl mb-1">Redundancy Detection</h2>
        <p className="text-slate-500">
          Identify overlapping research studies across departments to reduce duplicate efforts and find collaboration opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="academic-card p-5 bg-slate-50">
          <p className="text-2xl font-bold text-slate-800">{redundancies.length}</p>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Redundancies Detected</p>
        </div>
      </div>

      <div className="space-y-5">
        {loading ? (
          <p className="text-slate-500 italic text-sm">Loading redundancy analysis...</p>
        ) : redundancies.length === 0 ? (
          <div className="academic-card p-10 text-center">
            <GitCompare className="mx-auto text-slate-300 mb-3" size={48} />
            <h3 className="text-lg font-serif font-bold text-slate-700">No Redundancies Found</h3>
            <p className="text-sm text-slate-500 mt-2">The system hasn't detected any highly overlapping studies yet.</p>
          </div>
        ) : (
          redundancies.map((item, i) => (
            <div key={i} className="academic-card p-6">
              {/* Item details */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
