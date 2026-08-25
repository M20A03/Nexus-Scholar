const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 
  (isLocal ? 'http://localhost:8001' : 'https://nexus-scholar-coral.vercel.app');
