const { MOCK_RESEARCH_PROBLEMS, MOCK_PAPERS, MOCK_COMPARISONS } = require('./data.js');

let localPapers = [...MOCK_PAPERS];
let localProblems = [...MOCK_RESEARCH_PROBLEMS];
let localComparisons = [...MOCK_COMPARISONS];

function handleCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Idempotency-Key');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return true;
  }
  return false;
}

module.exports = async function handler(req, res) {
  if (handleCors(req, res)) return;

  try {
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = urlObj.pathname.replace(/^\/api/, '');
    if (!pathname || pathname === '') pathname = '/';

    const method = req.method.toUpperCase();

    // GET / or /health
    if (pathname === '/' || pathname === '/health') {
      res.statusCode = 200;
      return res.end(JSON.stringify({
        status: 'Nexus Scholar API Online',
        papersCount: localPapers.length,
        endpoints: ['/api/stats', '/api/papers', '/api/papers/search', '/api/comparisons', '/api/problems', '/api/graph']
      }));
    }

    // GET /stats
    if (pathname === '/stats') {
      res.statusCode = 200;
      return res.end(JSON.stringify({
        papersCount: localPapers.length,
        authorsCount: 28,
        problemsCount: localProblems.length,
        comparisonsCount: localComparisons.length,
        statementsCount: localPapers.reduce((acc, p) => acc + (p.statements ? p.statements.length : 0), 0),
        entitiesCount: localPapers.length + 28 + 145,
      }));
    }

    // GET /comparisons
    if (pathname === '/comparisons') {
      res.statusCode = 200;
      return res.end(JSON.stringify(localComparisons));
    }

    // GET /comparisons/:id
    const compMatch = pathname.match(/^\/comparisons\/([^\/]+)$/);
    if (compMatch) {
      const compId = compMatch[1];
      const comp = localComparisons.find(c => c.id === compId);
      if (!comp) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Comparison not found' }));
      }
      res.statusCode = 200;
      return res.end(JSON.stringify(comp));
    }

    // GET /problems
    if (pathname === '/problems') {
      res.statusCode = 200;
      return res.end(JSON.stringify(localProblems));
    }

    // GET /problems/:id
    const probMatch = pathname.match(/^\/problems\/([^\/]+)$/);
    if (probMatch) {
      const probId = probMatch[1];
      const prob = localProblems.find(p => p.id === probId);
      if (!prob) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Research problem not found' }));
      }
      res.statusCode = 200;
      return res.end(JSON.stringify(prob));
    }

    // GET /papers/search
    if (pathname === '/papers/search') {
      const q = (urlObj.searchParams.get('q') || '').toLowerCase().trim();
      if (!q) {
        res.statusCode = 200;
        return res.end(JSON.stringify(localPapers));
      }

      const filtered = localPapers.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.abstract && p.abstract.toLowerCase().includes(q)) ||
        (p.authors && p.authors.some(a => (a.name || a).toLowerCase().includes(q)))
      );
      res.statusCode = 200;
      return res.end(JSON.stringify(filtered));
    }

    // GET /papers/:id/graph
    const graphMatch = pathname.match(/^\/papers\/([^\/]+)\/graph$/);
    if (graphMatch) {
      const paperId = graphMatch[1];
      const paper = localPapers.find(p => p.id === paperId) || localPapers[0];
      const nodes = [{ id: paper.id, name: paper.title, group: 'paper' }];
      const links = [];

      (paper.authors || []).forEach(a => {
        const aName = typeof a === 'string' ? a : a.name;
        const aId = `author-${aName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        nodes.push({ id: aId, name: aName, group: 'author' });
        links.push({ source: aId, target: paper.id, label: 'authored' });
      });

      (paper.statements || []).forEach(st => {
        const objId = `concept-${st.object.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        nodes.push({ id: objId, name: st.object, group: 'concept' });
        links.push({ source: paper.id, target: objId, label: st.predicate });
      });

      res.statusCode = 200;
      return res.end(JSON.stringify({ nodes, links }));
    }

    // GET /papers/:id
    const paperMatch = pathname.match(/^\/papers\/([^\/]+)$/);
    if (paperMatch) {
      const paperId = paperMatch[1];
      const paper = localPapers.find(p => p.id === paperId);
      if (!paper) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Paper not found' }));
      }
      res.statusCode = 200;
      return res.end(JSON.stringify(paper));
    }

    // GET /papers
    if (pathname === '/papers') {
      const page = parseInt(urlObj.searchParams.get('page') || '1', 10) || 1;
      const limit = parseInt(urlObj.searchParams.get('limit') || '50', 10) || 50;
      const search = (urlObj.searchParams.get('search') || '').toLowerCase().trim();

      let filtered = [...localPapers];
      if (search) {
        filtered = filtered.filter(p =>
          (p.title && p.title.toLowerCase().includes(search)) ||
          (p.abstract && p.abstract.toLowerCase().includes(search)) ||
          (p.authors && p.authors.some(a => (a.name || a).toLowerCase().includes(search)))
        );
      }

      res.statusCode = 200;
      return res.end(JSON.stringify({
        data: filtered.slice((page - 1) * limit, page * limit),
        total: filtered.length,
        page,
        totalPages: Math.ceil(filtered.length / limit)
      }));
    }

    // GET /graph
    if (pathname === '/graph') {
      const nodes = [];
      const links = [];
      const nodeMap = new Set();

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

      res.statusCode = 200;
      return res.end(JSON.stringify({ nodes, links }));
    }

    // POST /ingest/arxiv
    if (pathname === '/ingest/arxiv' && method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          const arxivId = parsed.arxivId || '2310.06825';
          const cleanId = String(arxivId).trim().replace(/^https?:\/\/arxiv\.org\/abs\//, '').replace(/^https?:\/\/arxiv\.org\/pdf\//, '').replace(/\.pdf$/, '');

          const newPaper = {
            id: `paper-arxiv-${cleanId.replace(/\./g, '-')}`,
            title: `arXiv Research Paper: ${cleanId}`,
            abstract: `Open-access arXiv research publication (${cleanId}) parsed into knowledge graph format.`,
            doi: `10.48550/arXiv.${cleanId}`,
            year: 2024,
            venue: 'arXiv 2024',
            pdfUrl: `https://arxiv.org/pdf/${cleanId}.pdf`,
            openAccess: true,
            authors: [{ id: `auth-${cleanId}`, name: 'arXiv Research Scholar', department: 'Computer Science' }],
            statements: [
              { id: `st-${cleanId}-1`, paperId: `paper-arxiv-${cleanId.replace(/\./g, '-')}`, subject: `arXiv ${cleanId}`, predicate: 'source_repository', object: 'arXiv Open Access' },
              { id: `st-${cleanId}-2`, paperId: `paper-arxiv-${cleanId.replace(/\./g, '-')}`, subject: `arXiv ${cleanId}`, predicate: 'uses_method', object: 'Transformer Architecture' }
            ]
          };

          localPapers.unshift(newPaper);
          res.statusCode = 200;
          return res.end(JSON.stringify({ message: 'Paper successfully ingested!', id: newPaper.id, paper: newPaper }));
        } catch (e) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // POST /auth/login or /auth/register
    if (pathname === '/auth/login' || pathname === '/auth/register') {
      res.statusCode = 200;
      return res.end(JSON.stringify({
        access_token: 'nexus_scholar_jwt_mock_token_' + Date.now(),
        token_type: 'bearer'
      }));
    }

    // Fallback 404
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: 'Endpoint not found', path: pathname }));
  } catch (err) {
    console.error('Serverless function error:', err);
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'Internal server error', message: err.message }));
  }
};
