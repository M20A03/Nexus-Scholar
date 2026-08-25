import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

// GET /api/stats
router.get('/stats', async (req, res) => {
  try {
    const [papersCount, authorsCount, entitiesCount] = await Promise.all([
      prisma.paper.count(),
      prisma.author.count(),
      prisma.entity.count(),
    ]);
    res.json({ papersCount, authorsCount, entitiesCount });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// GET /api/papers
router.get('/papers', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;

  try {
    const papers = await prisma.paper.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: search ? { title: { contains: search, mode: 'insensitive' } } : undefined,
      include: { authors: true },
      orderBy: { publishedAt: 'desc' },
    });
    const total = await prisma.paper.count({
      where: search ? { title: { contains: search, mode: 'insensitive' } } : undefined,
    });
    res.json({ data: papers, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// GET /api/papers/:id
router.get('/papers/:id', async (req, res) => {
  try {
    const paper = await prisma.paper.findUnique({
      where: { id: req.params.id },
      include: {
        authors: true,
        citationsFrom: { include: { targetPaper: true } },
        citationsTo: { include: { sourcePaper: true } },
      },
    });
    if (!paper) return res.status(404).json({ error: 'Not found' });
    res.json(paper);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// GET /api/authors/:id
router.get('/authors/:id', async (req, res) => {
  try {
    const author = await prisma.author.findUnique({
      where: { id: req.params.id },
      include: { papers: true },
    });
    if (!author) return res.status(404).json({ error: 'Not found' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// POST /api/ingest/upload
router.post('/ingest/upload', upload.array('files'), async (req, res) => {
  try {
    const io = req.app.get('io');
    const files = req.files as Express.Multer.File[];
    
    // Simulate upload process to AI service
    io.emit('ingest_progress', { status: 'Parsing documents...' });
    
    // TODO: Call python AI service /ingest endpoint here
    
    io.emit('ingest_progress', { status: 'Complete', filesProcessed: files?.length || 0 });
    res.json({ message: 'Upload started successfully', filesCount: files?.length || 0 });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// GET /api/entities
router.get('/entities', async (req, res) => {
  const type = req.query.type as string;
  const department = req.query.department as string;
  try {
    const where: any = {};
    if (type) where.type = type;
    // Note: department filter might be more complex in a real scenario
    const entities = await prisma.entity.findMany({ where, take: 50 });
    res.json(entities);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// GET /api/graph
router.get('/graph', async (req, res) => {
  try {
    // A simplified graph endpoint returning a subset of nodes and edges
    const entities = await prisma.entity.findMany({ take: 100 });
    const rels = await prisma.relationship.findMany({ take: 200 });
    
    const nodes = entities.map(e => ({ id: e.id, name: e.name, group: e.type }));
    const links = rels.map(r => ({ source: r.sourceId, target: r.targetId, label: r.type }));
    
    res.json({ nodes, links });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// POST /api/search (Semantic Search using pgvector)
router.post('/search', async (req, res) => {
  const { query, limit = 10 } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });
  
  try {
    // 1. Get embedding for the query from AI service (mocked for now)
    // 2. Perform cosine similarity search using $queryRaw
    // Example (Requires cast to vector):
    // const results = await prisma.$queryRaw\`
    //   SELECT id, title, abstract, 1 - (embeddings <=> \${embedding}::vector) as similarity
    //   FROM "Paper"
    //   ORDER BY embeddings <=> \${embedding}::vector
    //   LIMIT \${limit}
    // \`;
    
    // For now, return a mock response or empty array until AI service is wired up
    res.json({ results: [], message: 'Semantic search requires AI service connection' });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// GET /api/collaborations
router.get('/collaborations', async (req, res) => {
  try {
    // Mock algorithm for cross-disciplinary collaboration
    res.json({ suggested: [] });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// GET /api/redundancies
router.get('/redundancies', async (req, res) => {
  try {
    // Mock algorithm for finding papers with high embedding similarity
    res.json({ redundancies: [] });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

export default router;
