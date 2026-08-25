import React, { useEffect, useState, useRef, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Network, Filter, Maximize2, ZoomIn, ZoomOut, Search as SearchIcon } from 'lucide-react';

export default function GraphView() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>();

  useEffect(() => {
    fetch('http://localhost:4000/api/graph')
      .then(res => res.json())
      .then(data => {
        setGraphData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleZoomIn = () => fgRef.current?.zoom(fgRef.current.zoom() * 1.2, 400);
  const handleZoomOut = () => fgRef.current?.zoom(fgRef.current.zoom() / 1.2, 400);
  const handleFit = () => fgRef.current?.zoomToFit(400);

  const getNodeColor = (node: any) => {
    switch (node.group) {
      case 'author': return '#3b82f6'; // blue-500
      case 'concept': return '#8b5cf6'; // purple-500
      case 'method': return '#10b981'; // emerald-500
      case 'dataset': return '#f59e0b'; // amber-500
      case 'department': return '#64748b'; // slate-500
      default: return '#94a3b8';
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col animate-fade-in max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-6 shrink-0">
        <div>
          <h1 className="academic-title text-3xl mb-2">Knowledge Graph</h1>
          <p className="text-slate-500">
            Interactive visualization of researchers, papers, and concepts across the university.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Find node..." 
              className="input-light pl-9 py-2 text-sm w-48"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="flex-1 academic-card flex flex-col md:flex-row overflow-hidden relative">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-slate-500 bg-slate-50">
            Loading graph data...
          </div>
        ) : (
          <div className="flex-1 relative bg-slate-50" ref={containerRef}>
            <ForceGraph2D
              ref={fgRef}
              width={dimensions.width}
              height={dimensions.height}
              graphData={graphData}
              nodeColor={getNodeColor}
              nodeRelSize={6}
              linkColor={() => '#cbd5e1'}
              linkWidth={1}
              backgroundColor="#f8fafc"
              nodeLabel="name"
              onNodeClick={(node: any) => {
                // Handle node click (e.g., center on node)
                fgRef.current?.centerAt(node.x, node.y, 1000);
                fgRef.current?.zoom(4, 2000);
              }}
            />
            
            {/* Graph Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <button onClick={handleZoomIn} className="w-10 h-10 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <ZoomIn size={18} />
              </button>
              <button onClick={handleZoomOut} className="w-10 h-10 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <ZoomOut size={18} />
              </button>
              <button onClick={handleFit} className="w-10 h-10 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <Maximize2 size={18} />
              </button>
            </div>
            
            {/* Legend */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm border border-slate-200 p-4 rounded-xl shadow-sm">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Node Types</h4>
              <div className="space-y-2">
                {[
                  { label: 'Author', color: 'bg-blue-500' },
                  { label: 'Concept', color: 'bg-purple-500' },
                  { label: 'Method', color: 'bg-emerald-500' },
                  { label: 'Dataset', color: 'bg-amber-500' },
                  { label: 'Department', color: 'bg-slate-500' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-xs text-slate-700 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
