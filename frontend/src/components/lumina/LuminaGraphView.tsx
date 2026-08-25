import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Sparkles, BookOpen, UserCheck, X, ArrowRight, RefreshCw, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../../config';

interface NodeItem {
  id: string;
  name: string;
  group: 'paper' | 'author' | 'concept';
  dept?: string;
}

export default function LuminaGraphView() {
  const [nodes, setNodes] = useState<NodeItem[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/papers/`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const list: NodeItem[] = [];
          data.slice(0, 12).forEach((p: any) => {
            list.push({ id: p.id, name: p.title, group: 'paper', dept: 'Computer Science' });
            (p.authors || []).slice(0, 1).forEach((a: any) => {
              const aName = typeof a === 'string' ? a : a.name;
              list.push({ id: `author-${aName}`, name: aName, group: 'author', dept: 'AI Lab' });
            });
            (p.statements || []).slice(0, 1).forEach((st: any) => {
              list.push({ id: `concept-${st.object}`, name: st.object, group: 'concept' });
            });
          });
          setNodes(list);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleNodeClick = (node: NodeItem) => {
    setSelectedNode(node);
    // Trigger 5D breathing pulse effect
    setIsBreathing(true);
    setTimeout(() => setIsBreathing(false), 800);
  };

  return (
    <section className="relative py-16 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4A373]/15 text-[#b5834b] border border-[#D4A373]/30">
          <Network className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>Interactive Knowledge Topology</span>
        </div>
        <h2 className="text-3xl font-extrabold text-[#1E3A5F]">
          Explore Academic Graph Network
        </h2>
        <p className="text-xs md:text-sm text-slate-600">
          Click any node to spotlight its connections and inspect extracted subject-predicate-object assertions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main 5D Breathing Interactive Graph Canvas Container */}
        <div className="lg:col-span-2 lumina-card p-8 min-h-[480px] relative overflow-hidden flex flex-col justify-between">
          {/* 5D Museum Spotlight Radial Background Highlight when Node Selected */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: 'radial-gradient(450px circle at 50% 50%, rgba(212, 163, 115, 0.2), rgba(255, 255, 255, 0) 80%)',
                }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Nodes: {nodes.length}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-[#D4A373]" /> Click to inspect
            </span>
          </div>

          {/* Interactive Node Network Cluster */}
          <motion.div
            animate={{
              scale: isBreathing ? [1, 1.04, 1] : 1,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative z-10 flex flex-wrap items-center justify-center gap-3 py-10 min-h-[360px]"
          >
            {nodes.map((node) => {
              const isHovered = hoveredNodeId === node.id;
              const isSelected = selectedNode?.id === node.id;

              return (
                <motion.button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  whileHover={{ scale: 1.12, zIndex: 30 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl border text-xs text-left transition-all duration-200 backdrop-blur-md shadow-xs ${
                    node.group === 'paper'
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                      : node.group === 'author'
                      ? 'bg-[#D4A373] text-white border-[#D4A373]'
                      : 'bg-[#A3B18A] text-white border-[#A3B18A]'
                  } ${isSelected ? 'ring-3 ring-[#D4A373] ring-offset-2 shadow-lg' : ''}`}
                >
                  <div className="font-bold line-clamp-1 max-w-[200px]">{node.name}</div>
                  <div className="text-[10px] opacity-90 capitalize mt-0.5 font-mono">
                    {node.group} {node.dept ? `• ${node.dept}` : ''}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Legend */}
          <div className="relative z-10 flex items-center justify-center gap-6 text-xs text-slate-600 border-t border-slate-200/60 pt-3">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-full bg-[#1E3A5F]" /> Papers
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-full bg-[#D4A373]" /> Authors
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-full bg-[#A3B18A]" /> Concepts
            </span>
          </div>
        </div>

        {/* Selected Node Details Drawer */}
        <div className="lumina-card p-6 border border-white/80 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1E3A5F] border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Node Inspector</span>
              {selectedNode && (
                <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </h3>

            {selectedNode ? (
              <div className="pt-4 space-y-3">
                <span className="badge-lumina-gold capitalize">{selectedNode.group}</span>
                <h4 className="text-base font-bold text-[#1E3A5F] leading-snug">
                  {selectedNode.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connected within the University Research Knowledge Graph network topology.
                </p>
                {selectedNode.group === 'paper' && (
                  <Link
                    to={`/papers/${selectedNode.id}`}
                    className="btn-lumina-primary text-xs w-full flex items-center justify-center gap-1.5 mt-4"
                  >
                    <span>View Full Details & Triples</span>
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 space-y-2">
                <Network className="w-8 h-8 mx-auto text-[#D4A373]" />
                <p className="text-xs font-medium">Click any node to inspect details and spotlight connections</p>
              </div>
            )}
          </div>

          <Link
            to="/graph"
            className="btn-lumina-secondary text-xs text-center justify-center flex items-center gap-1 mt-4"
          >
            <span>Open Full Graph Topology</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
