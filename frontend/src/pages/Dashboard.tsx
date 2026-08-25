import React from 'react';
import {
  useGraphStore,
  MOCK_NODES,
  MOCK_LINKS,
  MOCK_ACTIVITY,
} from '../store/useGraphStore';
import {
  FileText,
  Brain,
  Link2,
  Building2,
  AlertTriangle,
  Users,
  Clock,
  ArrowUpRight,
  Zap,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import EntityBadge from '../components/EntityBadge';
import MiniGraph from '../components/MiniGraph';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const DEPARTMENT_COLORS: Record<string, string> = {
  'Computer Science': '#3b82f6',
  'Biomedical Engineering': '#8b5cf6',
  'Physics': '#06b6d4',
  'Mathematics': '#10b981',
  'Chemistry': '#f59e0b',
};

const Dashboard = () => {
  const { stats } = useGraphStore();

  const barData = [
    { name: 'Documents', count: stats.docs },
    { name: 'Entities', count: stats.entities },
    { name: 'Relations', count: stats.relationships },
  ];

  const pieData = Object.entries(DEPARTMENT_COLORS).map(([name, color]) => ({
    name,
    value: Math.floor(Math.random() * 30) + 10,
    color,
  }));

  const topEntities = MOCK_NODES.filter((n) => n.type !== 'department').slice(0, 8);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Knowledge Graph Overview</h2>
        <p className="text-sm text-slate-400">
          Real-time insights across university research departments
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={FileText} label="Ingested Documents" value={stats.docs} colorClass="stat-card-blue" iconColor="bg-blue-500/15 text-blue-400" delay={0} />
        <StatCard icon={Brain} label="Extracted Entities" value={stats.entities} colorClass="stat-card-purple" iconColor="bg-purple-500/15 text-purple-400" delay={50} />
        <StatCard icon={Link2} label="Graph Relationships" value={stats.relationships} colorClass="stat-card-emerald" iconColor="bg-emerald-500/15 text-emerald-400" delay={100} />
        <StatCard icon={Building2} label="Departments Connected" value={stats.departments} colorClass="stat-card-warm" iconColor="bg-cyan-500/15 text-cyan-400" delay={150} />
        <StatCard icon={AlertTriangle} label="Redundancies Found" value={stats.redundancies} colorClass="stat-card-warm" iconColor="bg-amber-500/15 text-amber-400" delay={200} />
        <StatCard icon={Users} label="Collaborations Detected" value={stats.collaborations} colorClass="stat-card-blue" iconColor="bg-rose-500/15 text-rose-400" delay={250} />
      </div>

      {/* Middle row: Activity + Mini Graph */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="xl:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Recent Activity</h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <Zap size={12} />
              <span>Live</span>
            </div>
          </div>
          <div className="space-y-3">
            {MOCK_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  item.type === 'ingest' ? 'bg-blue-500/15 text-blue-400' :
                  item.type === 'entity' ? 'bg-purple-500/15 text-purple-400' :
                  item.type === 'relationship' ? 'bg-emerald-500/15 text-emerald-400' :
                  item.type === 'redundancy' ? 'bg-amber-500/15 text-amber-400' :
                  'bg-rose-500/15 text-rose-400'
                }`}>
                  {item.type === 'ingest' ? <FileText size={14} /> :
                   item.type === 'entity' ? <Brain size={14} /> :
                   item.type === 'relationship' ? <Link2 size={14} /> :
                   item.type === 'redundancy' ? <AlertTriangle size={14} /> :
                   <Users size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[0.65rem] text-slate-500 flex items-center gap-1"><Clock size={10} />{item.time}</span>
                    <EntityBadge type="department" name={item.department} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Graph Preview */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Graph Preview</h3>
            <a href="/graph" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              Explore <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="flex items-center justify-center bg-white/[0.02] rounded-xl p-2">
            <MiniGraph
              nodes={MOCK_NODES.slice(0, 12)}
              links={MOCK_LINKS.slice(0, 15)}
              width={280}
              height={220}
            />
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-2 mt-4">
            <EntityBadge type="author" name="Authors" />
            <EntityBadge type="concept" name="Concepts" />
            <EntityBadge type="method" name="Methods" />
            <EntityBadge type="dataset" name="Datasets" />
          </div>
        </div>
      </div>

      {/* Bottom row: Charts + Top Entities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="glass-card p-6 h-80">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Database Growth</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: '#f1f5f9',
                  fontSize: '0.8rem',
                }}
              />
              <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart — Department Distribution */}
        <div className="glass-card p-6 h-80">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Department Distribution</h3>
          <ResponsiveContainer width="100%" height="75%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: '#f1f5f9',
                  fontSize: '0.8rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-1">
            {pieData.map((d) => (
              <span key={d.name} className="text-[0.6rem] text-slate-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: d.color }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>

        {/* Top Entities */}
        <div className="glass-card p-6 h-80 overflow-y-auto">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Top Entities</h3>
          <div className="space-y-2">
            {topEntities.map((entity) => (
              <div key={entity.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-sm text-slate-200 truncate">{entity.name}</span>
                </div>
                <EntityBadge type={entity.type} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GCP Architecture Banner */}
      <div className="glass-card p-6 glow-blue">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-1">Powered by Google Cloud</h3>
            <p className="text-xs text-slate-500">AlloyDB with pgvector · Vertex AI Embeddings & Entity Extraction · Cloud Run Microservices</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-concept px-3 py-1">AlloyDB + pgvector</span>
            <span className="badge badge-author px-3 py-1">Vertex AI</span>
            <span className="badge badge-method px-3 py-1">Cloud Run</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
