import express from 'express';
import cors from 'cors';
import { 
  MOCK_RESEARCH_PROBLEMS, 
  MOCK_PAPERS, 
  MOCK_COMPARISONS 
} from '../src/mockOrkgData';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

let localPapers = [...MOCK_PAPERS];
let localProblems = [...MOCK_RESEARCH_PROBLEMS];
let localComparisons = [...MOCK_COMPARISONS];

// Helper to strip /api prefix from request URL if present
app.use((req, res, next) => {
  if (req.url.startsWith('/api/')) {
    req.url = req.url.replace(/^\/api/, '');
  } else if (req.url === '/api') {
    req.url = '/';
  }
  next();
});

// GET /stats
app.get('/stats', (req, res) => {
  res.json({
    papersCount: localPapers.length,
    authorsCount: 28,
    problemsCount: localProblems.length,
    comparisonsCount: localComparisons.length,
    statementsCount: localPapers.reduce((acc, p) => acc + (p.statements?.length || 0), 0),
    entitiesCount: localPapers.length + 28 + 145,
  });
});

// GET /comparisons
app.get('/comparisons', (req, res) => {
  res.json(localComparisons);
});

// GET /comparisons/:id
app.get('/comparisons/:id', (req, res) => {
  const comp = localComparisons.find(c => c.id === req.params.id);
  if (!comp) return res.status(404).json({ error: 'Comparison not found' });
  res.json(comp);
});

// GET /problems
app.get('/problems', (req, res) => {
  res.json(localProblems);
});

// GET /problems/:id
app.get('/problems/:id', (req, res) => {
  const prob = localProblems.find(p => p.id === req.params.id);
  if (!prob) return res.status(404).json({ error: 'Research problem not found' });
  res.json(prob);
});

// GET /papers/search
app.get('/papers/search', (req, res) => {
  const q = (req.query.q as string || '').toLowerCase().trim();
  if (!q) return res.json(localPapers);

  const filtered = localPapers.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.abstract.toLowerCase().includes(q) ||
    p.authors.some(a => a.name.toLowerCase().includes(q))
  );
  res.json(filtered);
});

// GET /papers/:id/graph
app.get('/papers/:id/graph', (req, res) => {
  const paper = localPapers.find(p => p.id === req.params.id);
  if (!paper) return res.status(404).json({ error: 'Paper not found' });

  const nodes: any[] = [];
  const links: any[] = [];
  
  nodes.push({ id: paper.id, name: paper.title, group: 'paper' });
  
  (paper.authors || []).forEach(a => {
    nodes.push({ id: a.id, name: a.name, group: 'author' });
    links.push({ source: a.id, target: paper.id, label: 'authored' });
  });
  
  (paper.statements || []).forEach(st => {
    const objId = `concept-${st.object.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    nodes.push({ id: objId, name: st.object, group: 'concept' });
    links.push({ source: paper.id, target: objId, label: st.predicate });
  });

  res.json({ nodes, links });
});

// GET /papers/:id
app.get('/papers/:id', (req, res) => {
  const paper = localPapers.find(p => p.id === req.params.id);
  if (!paper) return res.status(404).json({ error: 'Paper not found' });
  res.json(paper);
});

// GET /papers
app.get('/papers', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const search = req.query.search as string;

  let filtered = [...localPapers];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.abstract.toLowerCase().includes(q) ||
      p.authors.some(a => a.name.toLowerCase().includes(q))
    );
  }

  res.json({
    data: filtered.slice((page - 1) * limit, page * limit),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit)
  });
});

// GET /graph
app.get('/graph', (req, res) => {
  const nodes: any[] = [];
  const links: any[] = [];
  const nodeMap = new Set<string>();

  localProblems.forEach(p => {
    if (!nodeMap.has(p.id)) {
      nodeMap.add(p.id);
      nodes.push({ id: p.id, name: p.name, group: 'problem' });
    }
  });

  localPapers.forEach(p => {
    if (!nodeMap.has(p.id)) {
      nodeMap.add(p.id);
      nodes.push({ id: p.id, name: p.title, group: 'paper' });
    }

    if (p.researchProblemId && nodeMap.has(p.researchProblemId)) {
      links.push({ source: p.id, target: p.researchProblemId, label: 'addresses_problem' });
    }
  });

  res.json({ nodes, links });
});

// POST /ingest/arxiv
app.post('/ingest/arxiv', (req, res) => {
  const { arxivId } = req.body;
  if (!arxivId) return res.status(400).json({ error: 'arXiv ID required' });

  const cleanId = String(arxivId).trim().replace(/^https?:\/\/arxiv\.org\/abs\//, '').replace(/^https?:\/\/arxiv\.org\/pdf\//, '').replace(/\.pdf$/, '');
  
  const newPaper = {
    id: `paper-arxiv-${cleanId}`,
    title: `arXiv Research Paper (${cleanId})`,
    abstract: `Open-access arXiv research paper ${cleanId} ingested into Nexus Scholar Knowledge Graph.`,
    doi: `10.48550/arXiv.${cleanId}`,
    year: 2024,
    venue: `arXiv 2024`,
    pdfUrl: `https://arxiv.org/pdf/${cleanId}.pdf`,
    openAccess: true,
    authors: [{ id: `auth-${cleanId}-1`, name: 'arXiv Contributor' }],
    statements: [
      { id: `st-${cleanId}-1`, paperId: `paper-arxiv-${cleanId}`, subject: `arXiv ${cleanId}`, predicate: 'source_repository', object: 'arXiv Open Access' }
    ]
  };

  localPapers.unshift(newPaper as any);
  res.json({ message: 'Paper successfully ingested!', paper: newPaper });
});

export default app;
