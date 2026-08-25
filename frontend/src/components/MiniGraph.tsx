import React, { useRef, useEffect, useCallback } from 'react';

interface MiniGraphNode {
  id: string;
  name: string;
  type: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface MiniGraphLink {
  source: string;
  target: string;
}

interface MiniGraphProps {
  nodes: MiniGraphNode[];
  links: MiniGraphLink[];
  width?: number;
  height?: number;
}

const TYPE_COLORS: Record<string, string> = {
  author: '#a78bfa',
  concept: '#60a5fa',
  method: '#34d399',
  dataset: '#fbbf24',
  department: '#fb7185',
  organization: '#22d3ee',
};

const MiniGraph: React.FC<MiniGraphProps> = ({ nodes: initialNodes, links, width = 300, height = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<MiniGraphNode[]>([]);
  const animFrameRef = useRef<number>(0);

  const init = useCallback(() => {
    nodesRef.current = initialNodes.map((n, i) => ({
      ...n,
      x: width / 2 + (Math.random() - 0.5) * width * 0.6,
      y: height / 2 + (Math.random() - 0.5) * height * 0.6,
      vx: 0,
      vy: 0,
    }));
  }, [initialNodes, width, height]);

  useEffect(() => {
    init();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodeMap = new Map<string, MiniGraphNode>();

    const tick = () => {
      const ns = nodesRef.current;
      nodeMap.clear();
      ns.forEach(n => nodeMap.set(n.id, n));

      // Simple force simulation
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ns[j].x! - ns[i].x!;
          const dy = ns[j].y! - ns[i].y!;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 150 / (dist * dist);
          ns[i].vx! -= (dx / dist) * force;
          ns[i].vy! -= (dy / dist) * force;
          ns[j].vx! += (dx / dist) * force;
          ns[j].vy! += (dy / dist) * force;
        }
      }

      links.forEach(l => {
        const s = nodeMap.get(l.source);
        const t = nodeMap.get(l.target);
        if (!s || !t) return;
        const dx = t.x! - s.x!;
        const dy = t.y! - s.y!;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - 60) * 0.03;
        s.vx! += (dx / dist) * force;
        s.vy! += (dy / dist) * force;
        t.vx! -= (dx / dist) * force;
        t.vy! -= (dy / dist) * force;
      });

      // Center gravity
      ns.forEach(n => {
        n.vx! += (width / 2 - n.x!) * 0.005;
        n.vy! += (height / 2 - n.y!) * 0.005;
        n.vx! *= 0.9;
        n.vy! *= 0.9;
        n.x! += n.vx!;
        n.y! += n.vy!;
        n.x = Math.max(12, Math.min(width - 12, n.x!));
        n.y = Math.max(12, Math.min(height - 12, n.y!));
      });

      // Draw
      ctx.clearRect(0, 0, width, height);

      // Links
      links.forEach(l => {
        const s = nodeMap.get(l.source);
        const t = nodeMap.get(l.target);
        if (!s || !t) return;
        ctx.beginPath();
        ctx.moveTo(s.x!, s.y!);
        ctx.lineTo(t.x!, t.y!);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Nodes
      ns.forEach(n => {
        const color = TYPE_COLORS[n.type] || '#60a5fa';
        ctx.beginPath();
        ctx.arc(n.x!, n.y!, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x!, n.y!, 8, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(')', ', 0.15)').replace('rgb', 'rgba');
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [init, links, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-xl"
      style={{ width, height }}
    />
  );
};

export default MiniGraph;
