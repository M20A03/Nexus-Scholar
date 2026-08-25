import React from 'react';
import {
  Database,
  Brain,
  Cloud,
  FileText,
  ArrowRight,
  Server,
  Search,
  Share2,
  Cpu,
} from 'lucide-react';

const PIPELINE_STEPS = [
  {
    icon: FileText,
    title: 'Document Ingestion',
    description: 'Raw PDFs, Markdown files, and Code repositories are uploaded via the frontend or API.',
    tech: 'Cloud Run + Multer',
    color: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-500/15 text-blue-400',
  },
  {
    icon: Brain,
    title: 'AI Entity Extraction',
    description: 'Vertex AI Natural Language API extracts entities (authors, concepts, methods, datasets) and their relationships from document text.',
    tech: 'Vertex AI · Cloud Natural Language v2',
    color: 'from-purple-500 to-purple-600',
    iconBg: 'bg-purple-500/15 text-purple-400',
  },
  {
    icon: Cpu,
    title: 'Embedding Generation',
    description: 'Text chunks are embedded into 768-dimensional vectors using Vertex AI text-embedding-004 for semantic similarity search.',
    tech: 'Vertex AI · text-embedding-004',
    color: 'from-cyan-500 to-cyan-600',
    iconBg: 'bg-cyan-500/15 text-cyan-400',
  },
  {
    icon: Database,
    title: 'Graph Storage',
    description: 'Entities, relationships, and vector embeddings are stored in AlloyDB (PostgreSQL) with the pgvector extension for efficient similarity queries.',
    tech: 'AlloyDB · pgvector · Prisma ORM',
    color: 'from-emerald-500 to-emerald-600',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
  },
  {
    icon: Search,
    title: 'Semantic Search & Query',
    description: 'Natural language queries are embedded and matched against document/entity embeddings using cosine similarity via pgvector.',
    tech: 'pgvector <=> operator',
    color: 'from-amber-500 to-amber-600',
    iconBg: 'bg-amber-500/15 text-amber-400',
  },
  {
    icon: Share2,
    title: 'Knowledge Graph Visualization',
    description: 'The multi-dimensional graph is rendered in the browser, enabling interactive exploration with real-time WebSocket updates.',
    tech: 'React Force Graph · Socket.io',
    color: 'from-rose-500 to-rose-600',
    iconBg: 'bg-rose-500/15 text-rose-400',
  },
];

const COMPONENTS = [
  {
    name: 'Frontend',
    tech: 'React + Vite + TypeScript',
    icon: Share2,
    description: 'Interactive SPA with real-time graph visualization, semantic search, and collaboration discovery.',
    color: 'text-blue-400',
    badge: 'Cloud Run',
  },
  {
    name: 'Backend API',
    tech: 'Express.js + Prisma + Socket.io',
    icon: Server,
    description: 'REST API with real-time WebSocket events. Handles document ingestion pipeline orchestration.',
    color: 'text-emerald-400',
    badge: 'Cloud Run',
  },
  {
    name: 'AI Service',
    tech: 'Python FastAPI + Vertex AI SDK',
    icon: Brain,
    description: 'Microservice for text embedding generation and entity extraction via Google Cloud AI.',
    color: 'text-purple-400',
    badge: 'Cloud Run',
  },
  {
    name: 'Database',
    tech: 'AlloyDB (PostgreSQL + pgvector)',
    icon: Database,
    description: 'Vector-enabled relational database storing documents, entities, relationships, and 768-dim embeddings.',
    color: 'text-amber-400',
    badge: 'AlloyDB',
  },
  {
    name: 'Cache',
    tech: 'Redis Alpine',
    icon: Cloud,
    description: 'In-memory cache for session data, query caching, and real-time event pub/sub.',
    color: 'text-rose-400',
    badge: 'Memorystore',
  },
];

const Architecture = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">System Architecture</h2>
        <p className="text-sm text-slate-400">
          End-to-end data pipeline from document ingestion to knowledge graph visualization, powered by Google Cloud.
        </p>
      </div>

      {/* GCP Banner */}
      <div className="glass-card p-6 glow-blue">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <span className="text-sm text-slate-300 font-medium">Google Cloud Stack:</span>
          <div className="flex items-center gap-3">
            <span className="badge badge-concept px-4 py-1.5 text-xs">AlloyDB + pgvector</span>
            <span className="badge badge-author px-4 py-1.5 text-xs">Vertex AI</span>
            <span className="badge badge-method px-4 py-1.5 text-xs">Cloud Run</span>
            <span className="badge badge-dataset px-4 py-1.5 text-xs">Memorystore (Redis)</span>
          </div>
        </div>
      </div>

      {/* Data Pipeline Flow */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">
          Data Pipeline Flow
        </h3>
        <div className="space-y-3">
          {PIPELINE_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={i}>
                <div className="glass-card p-5 flex items-start gap-4 hover:bg-white/[0.06] transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${step.iconBg}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-slate-600 font-bold">STEP {i + 1}</span>
                      <h4 className="text-base font-semibold text-white">{step.title}</h4>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{step.description}</p>
                    <span className="text-[0.65rem] text-slate-600 bg-white/[0.04] px-2.5 py-1 rounded-lg font-medium">
                      {step.tech}
                    </span>
                  </div>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowRight size={16} className="text-slate-700 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Component Architecture */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">
          Service Components
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPONENTS.map((comp, i) => {
            const Icon = comp.icon;
            return (
              <div key={i} className="glass-card p-5 hover:bg-white/[0.06] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Icon size={20} className={comp.color} />
                  <span className="badge badge-method text-[0.6rem]">{comp.badge}</span>
                </div>
                <h4 className="text-base font-semibold text-white mb-1">{comp.name}</h4>
                <p className="text-[0.7rem] text-slate-600 font-medium mb-2">{comp.tech}</p>
                <p className="text-sm text-slate-400">{comp.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Features Summary */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
          Key Technical Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { feature: 'Vector Similarity Search', desc: 'pgvector cosine distance for semantic document matching' },
            { feature: 'Real-time Graph Updates', desc: 'WebSocket events push new nodes/edges to connected clients' },
            { feature: 'Multi-format Ingestion', desc: 'PDF, Markdown, and Code ZIP parsing with text extraction' },
            { feature: 'Entity Extraction Pipeline', desc: 'Automated NLP pipeline using Google Cloud Natural Language v2' },
            { feature: 'Cross-disciplinary Discovery', desc: 'Graph traversal algorithms to find hidden research connections' },
            { feature: 'Redundancy Detection', desc: 'Embedding-based similarity scoring to flag overlapping studies' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              <div>
                <p className="text-sm text-white font-medium">{item.feature}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Architecture;
