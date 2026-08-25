import React from 'react';
import { useGraphStore } from '../store/useGraphStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { stats } = useGraphStore();

  const data = [
    { name: 'Documents', count: stats.docs || 12 },
    { name: 'Entities', count: stats.entities || 150 },
    { name: 'Relationships', count: stats.relationships || 320 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Knowledge Graph Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-blue-600">{data[0].count}</span>
          <span className="text-gray-500 mt-2 font-medium">Ingested Documents</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-green-600">{data[1].count}</span>
          <span className="text-gray-500 mt-2 font-medium">Extracted Entities</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-purple-600">{data[2].count}</span>
          <span className="text-gray-500 mt-2 font-medium">Graph Relationships</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Database Growth</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
            <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
