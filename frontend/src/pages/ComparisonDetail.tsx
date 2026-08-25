import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Table, Download, Check, Share2, BookOpen, GitCompare, ExternalLink } from 'lucide-react';
import { API_BASE } from '../config';

export default function ComparisonDetail() {
  const { id } = useParams<{ id: string }>();
  const [comp, setComp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/comparisons/${id}`)
      .then(res => res.json())
      .then(data => {
        setComp(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCSV = () => {
    if (!comp) return;
    const properties = comp.properties || [];
    const papers = comp.papers || comp.matrixData || [];
    
    let csv = `Property,${papers.map((p: any) => `"${p.title.replace(/"/g, '""')}"`).join(',')}\n`;
    properties.forEach((prop: string) => {
      const row = papers.map((p: any) => `"${(p.values?.[prop] || '-').replace(/"/g, '""')}"`).join(',');
      csv += `"${prop}",${row}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${comp.title.slice(0, 30)}-ORKG-Comparison.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-16 text-center text-slate-500">
        <div className="w-8 h-8 border-2 border-[#e86161] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        Loading ORKG Comparison Matrix...
      </div>
    );
  }

  if (!comp || comp.error) {
    return (
      <div className="max-w-6xl mx-auto py-16 text-center text-red-500">
        Comparison Matrix Not Found.
      </div>
    );
  }

  const papers = comp.papers || comp.matrixData || [];
  const properties = comp.properties || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Navigation & Header */}
      <div>
        <Link to="/comparisons" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#ab2328] mb-4 transition-colors">
          <ArrowLeft size={14} /> Back to Comparisons List
        </Link>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-orkg">ORKG Comparison Matrix</span>
              <span className="badge-field">{comp.field || 'Computer Science'}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-3 leading-snug">
              {comp.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {comp.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={handleShare} className="btn-secondary text-xs flex items-center gap-1.5 py-2">
              {copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
              {copied ? 'Link Copied' : 'Share Matrix'}
            </button>
            <button onClick={exportCSV} className="btn-orkg text-xs flex items-center gap-1.5 py-2">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* ORKG Side-by-Side Comparison Matrix Table */}
      <div className="academic-card overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <Table size={16} className="text-[#e86161]" />
            <span>Side-by-Side Matrix ({papers.length} Contributions compared)</span>
          </div>
          <span className="text-slate-400">Scroll horizontally to inspect full table</span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800 font-serif">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-64 sticky left-0 bg-slate-100 z-10 border-r border-slate-200">
                  Property / Predicate
                </th>
                {papers.map((p: any, idx: number) => (
                  <th key={p.id || idx} className="p-4 text-sm font-bold min-w-[260px] max-w-[320px] align-top border-r border-slate-200 last:border-r-0">
                    <div className="space-y-1">
                      <Link to={`/papers/${p.id}`} className="hover:text-[#ab2328] hover:underline block leading-snug">
                        {p.title}
                      </Link>
                      <div className="text-xs font-sans font-normal text-slate-500 flex items-center gap-2">
                        <span>{p.venue || 'Open Access'} ({p.year})</span>
                        {p.pdfUrl && (
                          <a href={p.pdfUrl} target="_blank" rel="noreferrer" className="text-[#e86161] hover:underline flex items-center gap-0.5">
                            PDF <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {properties.map((prop: string, pIdx: number) => (
                <tr key={pIdx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono text-xs font-semibold text-slate-700 bg-slate-50/50 sticky left-0 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                    {prop}
                  </td>
                  {papers.map((p: any, cIdx: number) => {
                    const val = p.values?.[prop] || '-';
                    return (
                      <td key={cIdx} className="p-4 text-slate-800 leading-relaxed border-r border-slate-200 last:border-r-0">
                        {val === '-' ? (
                          <span className="text-slate-400 italic text-xs">Not specified</span>
                        ) : (
                          <span className="font-medium">{val}</span>
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

      {/* Embedded Paper Contribution Cards */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl text-slate-800">Individual Research Contributions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {papers.map((p: any, idx: number) => (
            <div key={p.id || idx} className="academic-card p-5 flex flex-col justify-between">
              <div>
                <span className="badge-field mb-2">{p.venue || 'Open Access'} ({p.year})</span>
                <h4 className="font-serif font-bold text-base text-slate-900 mb-2 leading-snug">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-500 mb-3 font-medium">
                  {Array.isArray(p.authors) ? p.authors.join(', ') : 'Research Team'}
                </p>
              </div>

              <Link to={`/papers/${p.id}`} className="text-xs font-semibold text-[#ab2328] hover:underline inline-flex items-center gap-1">
                View Full Paper Statements & Triples →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
