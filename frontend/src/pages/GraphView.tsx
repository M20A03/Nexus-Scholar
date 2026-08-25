import React, { useEffect, useRef, useState, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useGraphStore, MOCK_NODES, MOCK_LINKS } from '../store/useGraphStore';
import EntityBadge from '../components/EntityBadge';
import { Filter, Maximize2, RotateCcw, Wifi, X } from 'lucide-react';

const TYPE_COLORS: Record<string, string> = {
  author: '#a78bfa',
  concept: '#60a5fa',
  method: '#34d399',
  dataset: '#fbbf24',
  department: '#fb7185',
  organization: '#22d3ee',
};

const DIMENSIONS = [
  { key: 'all', label: 'All Dimensions' },
  { key: 'topic', label: 'By Topic' },
  { key: 'author', label: 'By Author Network' },
  { key: 'department', label: 'By Department' },
  { key: 'method', label: 'By Method' },
] as const;

const ENTITY_TYPES = ['author', 'concept', 'method', 'dataset', 'department'];

const DEPARTMENTS = ['Computer Science', 'Biomedical Engineering', 'Physics', 'Mathematics', 'Chemistry'];

const GraphView = () => {
  const fgRef = useRef<any>();
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const {
    activeEntityTypes,
    toggleEntityType,
    departmentFilter,
    setDepartmentFilter,
    dimensionMode,
    setDimensionMode,
  } = useGraphStore();

  const filteredData = useMemo(() => {
    let nodes = MOCK_NODES.filter((n) => activeEntityTypes.includes(n.type));
    if (departmentFilter) {
      nodes = nodes.filter((n) => n.department === departmentFilter);
    }
    if (dimensionMode === 'topic') {
      nodes = nodes.filter((n) => n.type === 'concept' || n.type === 'method');
    } else if (dimensionMode === 'author') {
      nodes = nodes.filter((n) => n.type === 'author');
    } else if (dimensionMode === 'department') {
      nodes = nodes.filter((n) => n.type === 'department' || n.type === 'author');
    } else if (dimensionMode === 'method') {
      nodes = nodes.filter((n) => n.type === 'method' || n.type === 'concept');
    }

    const nodeIds = new Set(nodes.map((n) => n.id));
    const links = MOCK_LINKS.filter(
      (l) => nodeIds.has(l.source as string) && nodeIds.has(l.target as string)
    );

    return { nodes: nodes.map((n) => ({ ...n })), links: links.map((l) => ({ ...l })) };
  }, [activeEntityTypes, departmentFilter, dimensionMode]);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    fgRef.current?.centerAt(node.x, node.y, 800);
    fgRef.current?.zoom(3, 800);
  };

  const resetView = () => {
    setSelectedNode(null);
    fgRef.current?.zoomToFit(600, 50);
  };

  // Connected nodes for selected node
  const connectedInfo = useMemo(() => {
    if (!selectedNode) return null;
    const connected = MOCK_LINKS.filter(
      (l) => l.source === selectedNode.id || l.target === selectedNode.id
    ).map((l) => {
      const otherId = l.source === selectedNode.id ? l.target : l.source;
      const otherNode = MOCK_NODES.find((n) => n.id === otherId);
      return { ...l, otherNode };
    });
    return connected;
  }, [selectedNode]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Knowledge Graph Explorer</h2>
          <p className="text-sm text-slate-400">Interactive multi-dimensional research knowledge graph</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            <Wifi size={12} />
            <span>Real-time</span>
          </div>
          <button onClick={resetView} className="text-xs text-slate-400 bg-white/[0.04] px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors flex items-center gap-1.5">
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Dimension Selector */}
        <div className="glass-card px-1 py-1 flex items-center gap-0.5">
          {DIMENSIONS.map((d) => (
            <button
              key={d.key}
              onClick={() => setDimensionMode(d.key as any)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                dimensionMode === d.key
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Department Filter */}
        <select
          value={departmentFilter || ''}
          onChange={(e) => setDepartmentFilter(e.target.value || null)}
          className="input-dark text-xs py-1.5 px-3 w-auto min-w-[160px]"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Entity Type Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-slate-500" />
        {ENTITY_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => toggleEntityType(type)}
            className={`badge cursor-pointer transition-all ${
              activeEntityTypes.includes(type) ? `badge-${type}` : 'bg-white/[0.03] text-slate-600'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: activeEntityTypes.includes(type) ? TYPE_COLORS[type] : '#475569' }} />
            {type}
          </button>
        ))}
      </div>

      {/* Graph + Detail Panel */}
      <div className="flex gap-4">
        {/* Graph */}
        <div className="flex-1 glass-card overflow-hidden" style={{ height: '65vh' }}>
          <ForceGraph2D
            ref={fgRef}
            graphData={filteredData}
            nodeLabel="name"
            onNodeClick={handleNodeClick}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            linkColor={() => 'rgba(255,255,255,0.06)'}
            backgroundColor="#00000000"
            nodeCanvasObject={(node: any, ctx, globalScale) => {
              const radius = (node.val || 3) * 1.2;
              const color = TYPE_COLORS[node.type] || '#60a5fa';
              const isSelected = selectedNode?.id === node.id;

              // Glow
              if (isSelected) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius + 6, 0, Math.PI * 2);
                ctx.fillStyle = color.replace(')', ', 0.15)').replace('#', 'rgba(');
                const r = parseInt(color.slice(1, 3), 16);
                const g = parseInt(color.slice(3, 5), 16);
                const b = parseInt(color.slice(5, 7), 16);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
                ctx.fill();
              }

              // Node circle
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
              ctx.fillStyle = color;
              ctx.fill();

              // Label
              if (globalScale > 1.5 || isSelected) {
                const label = node.name;
                const fontSize = Math.max(10 / globalScale, 2);
                ctx.font = `${fontSize}px Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'rgba(241, 245, 249, 0.9)';
                ctx.fillText(label, node.x, node.y + radius + 2);
              }
            }}
            nodePointerAreaPaint={(node: any, color, ctx) => {
              const radius = (node.val || 3) * 1.5;
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
              ctx.fill();
            }}
          />
        </div>

        {/* Detail Sidebar */}
        {selectedNode && (
          <div className="w-72 glass-card p-5 overflow-y-auto animate-slide-up" style={{ height: '65vh' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Node Details</h3>
              <button onClick={() => setSelectedNode(null)} className="text-slate-500 hover:text-slate-300">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-lg font-bold text-white">{selectedNode.name}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <EntityBadge type={selectedNode.type} />
                  <EntityBadge type="department" name={selectedNode.department} />
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Connections ({connectedInfo?.length || 0})</p>
                <div className="space-y-2">
                  {connectedInfo?.map((conn, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
                      <span className="w-2 h-2 rounded-full" style={{ background: TYPE_COLORS[conn.otherNode?.type || 'concept'] }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-300 truncate">{conn.otherNode?.name}</p>
                        <p className="text-[0.6rem] text-slate-600">{conn.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="glass-card p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Legend:</span>
          {Object.entries(TYPE_COLORS).map(([type, color]) => (
            <span key={type} className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-3 h-3 rounded-full" style={{ background: color }} />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-600">
          {filteredData.nodes.length} nodes · {filteredData.links.length} edges
        </span>
      </div>
    </div>
  );
};

export default GraphView;
