import { MOCK_PAPERS, MOCK_COMPARISONS, MOCK_RESEARCH_PROBLEMS } from './mockData';

const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 
  (isLocal ? 'http://localhost:8001' : 'https://nexus-scholar-coral.vercel.app');

export async function fetchPapers(searchQuery?: string): Promise<any[]> {
  try {
    const url = searchQuery 
      ? `${API_BASE}/api/papers/search?q=${encodeURIComponent(searchQuery)}`
      : `${API_BASE}/api/papers`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    throw new Error('Invalid format');
  } catch (err) {
    let filtered = [...MOCK_PAPERS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.abstract.toLowerCase().includes(q) ||
        p.authors.some(a => a.name.toLowerCase().includes(q))
      );
    }
    return filtered;
  }
}

export async function fetchStats(): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/api/stats`);
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    if (data && data.papersCount) return data;
    throw new Error('Invalid format');
  } catch (err) {
    return {
      papersCount: MOCK_PAPERS.length,
      authorsCount: 28,
      problemsCount: MOCK_RESEARCH_PROBLEMS.length,
      comparisonsCount: MOCK_COMPARISONS.length,
      statementsCount: MOCK_PAPERS.reduce((acc, p) => acc + (p.statements?.length || 0), 0),
      entitiesCount: MOCK_PAPERS.length + 28 + 145,
    };
  }
}

export async function fetchComparisons(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/api/comparisons`);
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    throw new Error('Invalid format');
  } catch (err) {
    return MOCK_COMPARISONS;
  }
}

export async function fetchPaperById(id: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/api/papers/${id}`);
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    if (data && data.id) return data;
    throw new Error('Invalid format');
  } catch (err) {
    return MOCK_PAPERS.find(p => p.id === id) || MOCK_PAPERS[0];
  }
}

export async function fetchPaperGraph(id: string): Promise<{ nodes: any[]; links: any[] }> {
  try {
    const res = await fetch(`${API_BASE}/api/papers/${id}/graph`);
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    if (data && Array.isArray(data.nodes)) return data;
    throw new Error('Invalid format');
  } catch (err) {
    const paper = MOCK_PAPERS.find(p => p.id === id) || MOCK_PAPERS[0];
    const nodes: any[] = [{ id: paper.id, name: paper.title, group: 'paper' }];
    const links: any[] = [];
    
    (paper.authors || []).forEach(a => {
      nodes.push({ id: a.id, name: a.name, group: 'author' });
      links.push({ source: a.id, target: paper.id, label: 'authored' });
    });
    
    (paper.statements || []).forEach(st => {
      const objId = `concept-${st.object.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      nodes.push({ id: objId, name: st.object, group: 'concept' });
      links.push({ source: paper.id, target: objId, label: st.predicate });
    });

    return { nodes, links };
  }
}
