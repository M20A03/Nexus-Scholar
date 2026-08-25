import React, { useState } from 'react';
import { Network } from 'lucide-react';

const Collaboration = () => {
  const [author1, setAuthor1] = useState('');
  const [author2, setAuthor2] = useState('');

  const findPath = (e: React.FormEvent) => {
    e.preventDefault();
    alert("In a full implementation, this would trigger a shortest-path graph query between the two authors.");
  };

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <Network size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Find Collaborations</h2>
            <p className="text-gray-500">Discover hidden paths between researchers.</p>
          </div>
        </div>
        
        <form onSubmit={findPath} className="flex gap-4">
          <input
            type="text"
            placeholder="Author 1 (e.g. Yoshua Bengio)"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
            value={author1}
            onChange={(e) => setAuthor1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author 2 (e.g. Yann LeCun)"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
            value={author2}
            onChange={(e) => setAuthor2(e.target.value)}
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Find Path
          </button>
        </form>
      </div>
    </div>
  );
};

export default Collaboration;
