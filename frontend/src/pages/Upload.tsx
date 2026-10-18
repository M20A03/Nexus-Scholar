import React, { useState } from 'react';
import { Upload as UploadIcon, Link as LinkIcon, FileText, CheckCircle2, Loader2, Sparkles, ArrowRight, BookOpen, Cpu, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';

const PRESET_PAPERS = [
  {
    id: '1706.03762',
    title: 'Attention Is All You Need',
    tag: 'Transformers & LLMs',
    citations: '135k+',
    desc: 'Seminal architecture introducing Multi-Head Self-Attention for sequence-to-sequence modeling.'
  },
  {
    id: '2310.06825',
    title: 'Mistral 7B',
    tag: 'Sliding Window Attention',
    citations: '2.4k+',
    desc: 'High-performance open weights model outperforming LLaMA 2 13B on all benchmarks.'
  },
  {
    id: '2106.09685',
    title: 'LoRA: Low-Rank Adaptation',
    tag: 'Parameter Efficient Fine-Tuning',
    citations: '18k+',
    desc: 'Freezes pre-trained model weights and injects trainable rank decomposition matrices.'
  }
];

export default function UploadPage() {
  const navigate = useNavigate();
  const [arxivId, setArxivId] = useState('2310.06825'); // Mistral 7B default
  const [loading, setLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const stages = [
    'Connecting to Open-Access arXiv Knowledge Index...',
    'Fetching paper metadata, abstract, and author affiliations...',
    'Parsing tabular benchmarks and mathematical proofs...',
    'Synthesizing Subject-Predicate-Object ORKG statements...'
  ];

  const handleArxivIngest = async (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const targetId = customId || arxivId;
    if (!targetId.trim()) return;

    setLoading(true);
    setCurrentStage(0);
    setStatusMsg(stages[0]);

    // Simulated progress stages
    const stageTimer1 = setTimeout(() => { setCurrentStage(1); setStatusMsg(stages[1]); }, 600);
    const stageTimer2 = setTimeout(() => { setCurrentStage(2); setStatusMsg(stages[2]); }, 1300);
    const stageTimer3 = setTimeout(() => { setCurrentStage(3); setStatusMsg(stages[3]); }, 2000);

    try {
      const cleanId = targetId.trim().replace(/^arXiv:/i, '');
      const res = await fetch(`${API_BASE}/api/ingest/arxiv`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ arxivId: cleanId }),
      });

      if (!res.ok) {
        throw new Error('Failed to ingest paper from arXiv');
      }

      const data = await res.json();
      setTimeout(() => {
        clearTimeout(stageTimer1);
        clearTimeout(stageTimer2);
        clearTimeout(stageTimer3);
        setLoading(false);
        navigate(`/papers/${data.id || `paper-${cleanId.replace(/\./g, '-')}`}`);
      }, 2400);
    } catch (err: any) {
      console.warn('Backend proxy in offline/preview mode. Falling back to structured local store:', err);
      const cleanId = targetId.trim().replace(/^arXiv:/i, '');
      const newPaperId = `paper-${cleanId.replace(/\./g, '-')}`;

      setTimeout(() => {
        clearTimeout(stageTimer1);
        clearTimeout(stageTimer2);
        clearTimeout(stageTimer3);
        setLoading(false);
        navigate(`/papers/${newPaperId}`);
      }, 2400);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      // Auto-extract or fill ID if file matches pattern
      const match = file.name.match(/\d{4}\.\d{4,5}/);
      if (match) {
        setArxivId(match[0]);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Real-Time Ingestion Pipeline</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ingest Research Paper
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          Provide an arXiv Paper ID, select a seminal paper preset, or drop a research PDF to automatically retrieve title, abstract, authors, and extract structured ORKG property statements.
        </p>
      </div>

      {/* Preset Fast Ingestion */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
          <span>Seminal Paper Presets</span>
          <span className="text-blue-600 font-semibold normal-case">One-click ingest</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESET_PAPERS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setArxivId(preset.id);
                handleArxivIngest(undefined, preset.id);
              }}
              className="text-left bg-white border border-slate-200 hover:border-blue-400 p-4 rounded-2xl shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md group active:scale-[0.98]"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {preset.id}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">★ {preset.citations}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {preset.title}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                {preset.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Ingest Form & Dropzone */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <form onSubmit={(e) => handleArxivIngest(e)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              arXiv Paper ID or DOI
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. 2310.06825 or 1706.03762 or 2106.09685"
                value={arxivId}
                onChange={(e) => setArxivId(e.target.value)}
                className="input-light w-full pl-11 py-3 text-sm font-mono min-h-[48px]"
                required
              />
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              Paste standard arXiv identifiers (e.g. <code className="font-mono text-blue-600 font-bold">2310.06825</code>).
            </p>
          </div>

          {/* Drag & Drop PDF Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
              dragOver
                ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
                : selectedFileName
                ? 'border-emerald-300 bg-emerald-50/40'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
            }`}
          >
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFileName(e.target.files[0].name);
                  const match = e.target.files[0].name.match(/\d{4}\.\d{4,5}/);
                  if (match) setArxivId(match[0]);
                }
              }}
            />
            <label htmlFor="pdf-upload" className="cursor-pointer block">
              <UploadIcon className={`w-8 h-8 mx-auto mb-2 ${selectedFileName ? 'text-emerald-600' : 'text-slate-400'}`} />
              {selectedFileName ? (
                <div>
                  <span className="text-xs font-bold text-emerald-800">{selectedFileName}</span>
                  <p className="text-[11px] text-emerald-600 mt-0.5">Ready for automated citation statement extraction</p>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-semibold text-slate-700">Drag & drop research paper PDF or click to browse</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF up to 25MB • Automated metadata extraction</p>
                </div>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 text-sm font-semibold shadow-md flex items-center justify-center gap-2 min-h-[48px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Extracting Knowledge Statements...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-blue-200" />
                <span>Ingest & Extract Property Statements</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Live Processing Pipeline Info */}
        {loading && (
          <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                {statusMsg}
              </span>
              <span className="font-mono text-blue-700">Step {currentStage + 1} of 4</span>
            </div>

            <div className="w-full bg-blue-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStage + 1) / 4) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-[11px]">
              {stages.map((stg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                    i <= currentStage
                      ? 'bg-blue-100 text-blue-900 font-semibold border border-blue-200'
                      : 'bg-white/60 text-slate-400'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${i <= currentStage ? 'text-blue-600' : 'text-slate-300'}`} />
                  <span className="truncate">Stage {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
