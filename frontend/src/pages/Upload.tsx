import React, { useCallback, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UploadCloud, FileText, FileCode, FileType, X, CheckCircle2, Loader2 } from 'lucide-react';
import ProcessingPipeline from '../components/ProcessingPipeline';
import EntityBadge from '../components/EntityBadge';

interface QueuedFile {
  file: File;
  status: 'queued' | 'processing' | 'done' | 'error';
  entities?: { name: string; type: string }[];
}

const FILE_ICONS: Record<string, React.ElementType> = {
  'application/pdf': FileText,
  'text/markdown': FileType,
  'application/zip': FileCode,
  'application/x-zip-compressed': FileCode,
};

const ACCEPTED_TYPES = [
  { label: 'PDF', ext: '.pdf', color: 'text-rose-400' },
  { label: 'Markdown', ext: '.md', color: 'text-blue-400' },
  { label: 'Code ZIP', ext: '.zip', color: 'text-emerald-400' },
];

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [processingStep, setProcessingStep] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const addFiles = (files: FileList) => {
    const newFiles: QueuedFile[] = Array.from(files).map((f) => ({
      file: f,
      status: 'queued' as const,
    }));
    setQueue((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  }, []);

  const removeFromQueue = (index: number) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    const Icon = FILE_ICONS[file.type] || FileText;
    return <Icon size={18} />;
  };

  const getFileColor = (file: File) => {
    if (file.name.endsWith('.pdf')) return 'text-rose-400 bg-rose-500/10';
    if (file.name.endsWith('.md')) return 'text-blue-400 bg-blue-500/10';
    if (file.name.endsWith('.zip')) return 'text-emerald-400 bg-emerald-500/10';
    return 'text-slate-400 bg-slate-500/10';
  };

  const simulateProcessing = async () => {
    if (queue.length === 0) return;
    setIsProcessing(true);

    for (let i = 0; i < queue.length; i++) {
      setQueue((prev) =>
        prev.map((item, idx) => (idx === i ? { ...item, status: 'processing' } : item))
      );

      // Simulate each pipeline step
      for (let step = 0; step < 5; step++) {
        setProcessingStep(step);
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      }

      // Fake extracted entities
      const fakeEntities = [
        { name: 'Neural Networks', type: 'concept' },
        { name: 'Dr. Sarah Chen', type: 'author' },
        { name: 'Transformer', type: 'method' },
        { name: 'ImageNet', type: 'dataset' },
      ].slice(0, Math.floor(Math.random() * 3) + 2);

      setQueue((prev) =>
        prev.map((item, idx) =>
          idx === i ? { ...item, status: 'done', entities: fakeEntities } : item
        )
      );
    }

    setProcessingStep(-1);
    setIsProcessing(false);
    toast.success(`${queue.length} document(s) ingested and knowledge graph updated!`);
  };

  const handleUploadReal = async () => {
    // For real backend connection
    for (const item of queue) {
      const formData = new FormData();
      formData.append('file', item.file);
      try {
        await axios.post('http://localhost:4000/api/ingest/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        console.error('Upload failed for', item.file.name);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Ingest Research Data</h2>
        <p className="text-sm text-slate-400">
          Upload PDFs, Markdown files, or Code repositories to extract entities and build the knowledge graph.
        </p>
      </div>

      {/* Accepted Types */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Accepted:</span>
        {ACCEPTED_TYPES.map((t) => (
          <span key={t.ext} className={`text-xs font-medium ${t.color} bg-white/[0.04] px-3 py-1.5 rounded-lg`}>
            {t.label} ({t.ext})
          </span>
        ))}
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`glass-card cursor-pointer p-12 flex flex-col items-center justify-center transition-all ${
          isDragging
            ? 'border-blue-500/50 bg-blue-500/[0.06] shadow-[0_0_30px_rgba(59,130,246,0.1)]'
            : 'hover:bg-white/[0.04]'
        }`}
      >
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${
          isDragging ? 'bg-blue-500/20 text-blue-400 scale-110' : 'bg-white/[0.04] text-slate-500'
        }`}>
          <UploadCloud size={32} />
        </div>
        <p className="text-base font-medium text-slate-300">
          {isDragging ? 'Drop files here' : 'Drag & drop research files here'}
        </p>
        <p className="text-sm text-slate-500 mt-1.5">or click to browse from your computer</p>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.md,.zip"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {/* File Queue */}
      {queue.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Upload Queue ({queue.length} file{queue.length > 1 ? 's' : ''})
          </h3>
          <div className="space-y-2">
            {queue.map((item, i) => (
              <div
                key={i}
                className={`glass-card p-4 flex items-center gap-4 ${
                  item.status === 'processing' ? 'ring-1 ring-blue-500/30' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getFileColor(item.file)}`}>
                  {item.status === 'processing' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : item.status === 'done' ? (
                    <CheckCircle2 size={18} className="text-emerald-400" />
                  ) : (
                    getFileIcon(item.file)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 font-medium truncate">{item.file.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    {item.status === 'processing' && ' · Processing...'}
                    {item.status === 'done' && ' · Complete'}
                  </p>
                  {/* Show extracted entities */}
                  {item.entities && item.entities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.entities.map((e, j) => (
                        <EntityBadge key={j} type={e.type} name={e.name} />
                      ))}
                    </div>
                  )}
                </div>
                {item.status === 'queued' && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFromQueue(i); }}
                    className="text-slate-600 hover:text-slate-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Processing Pipeline */}
          {isProcessing && <ProcessingPipeline currentStep={processingStep} />}

          {/* Upload Button */}
          {!isProcessing && (
            <button
              onClick={simulateProcessing}
              className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2"
            >
              <UploadCloud size={18} />
              Upload & Build Graph ({queue.filter((q) => q.status === 'queued').length} files)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;
