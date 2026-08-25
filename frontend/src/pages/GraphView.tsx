import React, { useState, useEffect } from 'react';
import { Network, Search, Filter, RefreshCw, BookOpen, UserCheck, Sparkles, X, ExternalLink, Layers, ArrowRight } from 'lucide-react';
import { API_BASE } from '../config';
import { Link } from 'react-router-dom';

interface GraphNode {
  id: string;
  name: string;
  group: 'paper' | 'author' | 'concept' | 'problem';
  department?: string;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
  label: string;
}

export default function GraphView() {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    fetchGraphData();
  }, []);

  const fetchGraphData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/papers/`);
      const papers = await res.json();

      const nList: GraphNode[] = [];
      const lList: GraphLink[] = [];
      const nodeSet = new Set<string>();

      (Array.isArray(papers) ? papers : []).slice(0, 15).forEach((p: any) => {
        // Paper node
        if (!nodeSet.has(p.id)) {
          nodeSet.add(p.id);
          nList.push({ id: p.id, name: p.title, group: 'paper', department: 'Computer Science' });
        }

        // Author nodes
        (p.authors || []).forEach((a: any) => {
          const aId = `author-${a.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
          if (!nodeSet.has(aId)) {
            nodeSet.add(aId);
            nList.push({ id: aId, name: a.name, group: 'author', department: a.department || 'Research' });
          }
          lList.push({ source: aId, target: p.id, label: 'authored' });
        });

        // Property statement nodes
        (p.statements || []).slice(0, 3).forEach((st: any) => {
          const cId = `concept-${st.object.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
          if (!nodeSet.has(cId)) {
            nodeSet.add(cId);
            nList.push({ id: cId, name: st.object, group: 'concept' });
          }
          lList.push({ source: p.id, target: cId, label: st.predicate });
        });
      });

      setNodes(nList);
      setLinks(lList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredNodes = nodes.filter((n) => {
    const matchesSearch = n.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || n.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const getNodeColor = (group: string) => {
    switch (group) {
      case 'paper':
        return 'bg-blue-600 border-blue-300 text-white';
      case 'author':
        return 'bg-amber-500 border-amber-300 text-white';
      case 'concept':
        return 'bg-purple-600 border-purple-300 text-white';
      case 'problem':
        return 'bg-emerald-600 border-emerald-300 text-white';
      default:
        return 'bg-slate-600 border-slate-300 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              Interactive Topology
            </span>
            <span className="text-xs text-slate-500 font-mono">2D Knowledge Net</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Research Knowledge Graph Network
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Visualize relationships between open-access research papers, verified authors, and extracted property statements.
          </p>
        </div>

        <button
          onClick={fetchGraphData}
          className="btn-secondary text-xs flex items-center gap-1.5 self-stretch md:self-auto justify-center"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Graph</span>
        </button>
      </div>

      {/* Filter & Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search nodes in graph..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-light w-full pl-9 text-xs"
          />
        </div>

        {/* Group Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['all', 'paper', 'author', 'concept'].map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                selectedGroup === grp
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {grp === 'all' ? 'All Nodes' : grp}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[500px] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
              Nodes: {filteredNodes.length} • Edges: {links.length}
            </span>
          </div>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-24 text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mb-3" />
              <p className="text-sm font-medium">Rendering Knowledge Network...</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-wrap content-start gap-3 py-6">
              {filteredNodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNode(n)}
                  className={`p-3 rounded-xl border text-xs text-left transition-all duration-150 transform active:scale-95 hover:scale-105 shadow-sm ${getNodeColor(
                    n.group
                  )} ${selectedNode?.id === n.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                >
                  <div className="font-bold line-clamp-1">{n.name}</div>
                  <div className="text-[10px] opacity-80 capitalize mt-0.5 flex items-center justify-between gap-2">
                    <span>{n.group}</span>
                    {n.department && <span>• {n.department}</span>}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Graph Legend */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
              <span>Research Papers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span>Authors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
              <span>Property Concepts</span>
            </div>
          </div>
        </div>

        {/* Selected Node Details Drawer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                    {selectedNode.group}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                    {selectedNode.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              {selectedNode.group === 'paper' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Open access paper ingested into the knowledge graph dataset.
                  </p>
                  <Link
                    to={`/papers/${selectedNode.id}`}
                    className="btn-primary text-xs w-full flex items-center justify-center gap-1.5"
                  >
                    <span>View Full Paper & Statements</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              {selectedNode.group === 'author' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Affiliation:</span>{' '}
                    {selectedNode.department || 'University AI Research Lab'}
                  </div>
                  <Link
                    to={`/search?q=${encodeURIComponent(selectedNode.name)}`}
                    className="btn-secondary text-xs w-full flex items-center justify-center gap-1"
                  >
                    <span>Search Author's Papers</span>
                  </Link>
                </div>
              )}

              {selectedNode.group === 'concept' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-600">
                    Extracted key-value property statement concept connected to research benchmarks.
                  </div>
                  <Link
                    to={`/search?q=${encodeURIComponent(selectedNode.name)}`}
                    className="btn-secondary text-xs w-full flex items-center justify-center gap-1"
                  >
                    <span>Find Related Papers</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Network className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs font-medium">Click any node in the graph to inspect details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
