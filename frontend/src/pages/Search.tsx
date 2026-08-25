import React, { useState } from 'react';
import axios from 'axios';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/graph/similar', { query });
      setResults(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Semantic Search</h2>
      
      <form onSubmit={handleSearch} className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-lg shadow-sm"
          placeholder="Search across documents and entities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute inset-y-2 right-2 flex items-center px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="space-y-4">
        {results.map((result, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-blue-600 mb-2">{result.title || 'Untitled Document'}</h3>
            <p className="text-gray-600">Similarity Score: <span className="font-semibold text-gray-900">{(result.similarity * 100).toFixed(1)}%</span></p>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-12">
            Enter a natural language query above to search the knowledge graph.
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
