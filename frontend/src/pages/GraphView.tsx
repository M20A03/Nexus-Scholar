import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import axios from 'axios';

const GraphView = () => {
  const fgRef = useRef<any>();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    // In a real scenario, you would fetch this from /api/graph/:entityId
    // For demo purposes, we will mock a starting dataset
    const loadMockData = () => {
      setGraphData({
        nodes: [
          { id: '1', name: 'Dr. John Doe', type: 'author', val: 5 },
          { id: '2', name: 'Machine Learning', type: 'concept', val: 3 },
          { id: '3', name: 'MIT', type: 'organization', val: 8 },
        ] as any,
        links: [
          { source: '1', target: '2', name: 'researches' },
          { source: '1', target: '3', name: 'works_at' },
        ] as any
      });
    };
    loadMockData();
  }, []);

  const handleNodeClick = async (node: any) => {
    // Center view on node
    fgRef.current?.centerAt(node.x, node.y, 1000);
    fgRef.current?.zoom(4, 2000);
    
    try {
      // Fetch expanded network
      const res = await axios.get(`http://localhost:4000/api/graph/${node.id}?depth=1`);
      console.log("Fetched new relationships", res.data);
      // In a full implementation, you would merge the returned data into graphData.nodes and graphData.links
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden" style={{ height: '70vh' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="type"
        onNodeClick={handleNodeClick}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color || '#3B82F6';
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
        }}
      />
    </div>
  );
};

export default GraphView;
