import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  Share2,
  Search,
  Users,
  AlertTriangle,
  Server,
  Microscope,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/upload', icon: Upload, label: 'Ingest Data' },
  { to: '/graph', icon: Share2, label: 'Knowledge Graph' },
  { to: '/search', icon: Search, label: 'Semantic Search' },
  { to: '/collaboration', icon: Users, label: 'Collaborations' },
  { to: '/redundancy', icon: AlertTriangle, label: 'Redundancy' },
  { to: '/architecture', icon: Server, label: 'Architecture' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 min-h-screen flex flex-col border-r border-white/[0.06] bg-[#0d1117] py-6 px-4 shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-3 px-3 mb-10">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
          <Microscope size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white tracking-tight leading-none">ResearchGraph</h1>
          <p className="text-[0.65rem] text-slate-500 font-medium mt-0.5">University Knowledge Graph</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom GCP Badge */}
      <div className="mt-auto pt-6 border-t border-white/[0.06]">
        <div className="glass-card p-3 text-center">
          <p className="text-[0.65rem] text-slate-500 font-medium uppercase tracking-wider mb-1.5">Powered by</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="badge badge-concept">AlloyDB</span>
            <span className="badge badge-author">Vertex AI</span>
            <span className="badge badge-method">Cloud Run</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
