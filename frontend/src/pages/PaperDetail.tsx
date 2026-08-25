import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, Network, Sparkles, X, FileText, Layers, Download } from 'lucide-react';
import { API_BASE } from '../config';

export default function PaperDetail() {
  const { id } = useParams<{ id: string }>();
  const [paper, setPaper] = useState<any>(null);
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'triples' | 'pdf' | 'graph'>('triples');

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/papers/${id}`).then(r => r.json()).catch(() => null),
      fetch(`${API_BASE}/api/papers/${id}/graph`).then(r => r.json()).catch(() => null)
    ]).then(([pData, gData]) => {
      if (pData && !pData.detail) setPaper(pData);
      if (gData && Array.isArray(gData.nodes)) setGraphData(gData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-24 text-center text-slate-500 space-y-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium">Loading Paper & Extracted Knowledge Statements...</p>
      </div>
    );
  }

  if (!paper || paper.detail) {
    return (
      <div className="max-w-5xl mx-auto py-16 text-center space-y-4">
        <p className="text-red-600 font-bold text-lg">Research Paper Not Found.</p>
        <Link to="/search" className="btn-secondary text-xs inline-flex items-center gap-1.5">
          <ArrowLeft size={14} /> Back to Search Results
        </Link>
      </div>
    );
  }

  const pdfUrl = paper.pdfUrl || paper.pdf_url || `https://arxiv.org/pdf/${paper.id?.replace('paper-', '')}.pdf`;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <Link to="/search" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors">
        <ArrowLeft size={14} /> Back to Research Search Results
      </Link>

      {/* Main Paper Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-field">{paper.venue || 'arXiv'} ({paper.year || 2024})</span>
          {paper.doi && <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">DOI: {paper.doi}</span>}
          {paper.openAccess && (
            <span className="badge-concept inline-flex items-center gap-1">
              Open Access PDF
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-snug tracking-tight">
          {paper.title}
        </h1>

        {/* Authors */}
        <div className="flex flex-wrap items-center gap-2 border-y border-slate-100 py-4 text-xs md:text-sm text-slate-700">
          <span className="font-semibold text-slate-500">Authors:</span>
          {(paper.authors || []).map((a: any, idx: number) => (
            <span key={idx} className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
              {typeof a === 'string' ? a : a.name}
            </span>
          ))}
        </div>

        {/* Abstract */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <BookOpen size={15} className="text-blue-600" /> Abstract
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base text-justify">
            {paper.abstract}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} />
            <span>Download Official PDF</span>
            <ExternalLink size={12} />
          </a>
          <Link
            to={`/compare`}
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            <span>Compare in Matrix</span>
          </Link>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm flex items-center gap-2">
        <button
          onClick={() => setActiveTab('triples')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'triples'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles size={15} />
          <span>Extracted Knowledge Triples ({paper.statements?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('pdf')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'pdf'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText size={15} />
          <span>Live PDF Viewer</span>
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'graph'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Network size={15} />
          <span>Graph View</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'triples' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Extracted Subject-Predicate-Object Triples</h2>
              <p className="text-xs text-slate-500">Structured key-value property assertions extracted from paper content.</p>
            </div>
            <span className="text-xs font-mono bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200 font-bold">
              {paper.statements?.length || 0} Statements
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(paper.statements || []).map((st: any) => (
              <div key={st.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-xs transition-all space-y-2">
                <div className="text-xs font-bold text-slate-900">{st.subject}</div>
                <div className="flex items-center gap-2">
                  <span className="badge-predicate">{st.predicate}</span>
                  <span className="text-xs font-medium text-slate-700">{st.object}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pdf' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm min-h-[650px] flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 mb-3">
            <span className="text-xs font-semibold text-slate-700">Live arXiv Open Access Reader</span>
            <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-mono">
              Open Full PDF in New Tab <ExternalLink size={12} />
            </a>
          </div>
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
            className="w-full flex-1 min-h-[600px] rounded-xl border border-slate-200"
            title="arXiv PDF Viewer"
          />
        </div>
      )}

      {activeTab === 'graph' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Paper Local Knowledge Sub-graph</h2>
            <Link to="/graph" className="text-xs font-semibold text-blue-600 hover:underline">
              Open Full Graph View →
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 min-h-[300px] flex flex-wrap items-center justify-center gap-3">
            {(graphData.nodes || []).map((n: any) => (
              <div
                key={n.id}
                className={`p-3 rounded-xl border text-xs font-bold shadow-2xs ${
                  n.group === 'paper'
                    ? 'bg-blue-600 text-white border-blue-400'
                    : n.group === 'author'
                    ? 'bg-amber-500 text-white border-amber-300'
                    : 'bg-purple-600 text-white border-purple-400'
                }`}
              >
                {n.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
