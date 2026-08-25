import { Router } from 'express';
import { prisma } from '../index';
import axios from 'axios';

const router = Router();
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

router.get('/:entityId', async (req, res) => {
  const { entityId } = req.params;
  const depth = parseInt(req.query.depth as string) || 2;
  
  try {
    // Simplified fetch for hackathon - fetch direct relationships
    const relationships = await prisma.relationship.findMany({
      where: {
        OR: [
          { source_entity_id: entityId },
          { target_entity_id: entityId }
        ]
      },
      include: {
        source_entity: true,
        target_entity: true
      }
    });
    res.json(relationships);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/similar', async (req, res) => {
  try {
    const { query } = req.body;
    
    // Embed query
    const embedRes = await axios.post(`${AI_SERVICE_URL}/embed`, { text: query });
    const vector = embedRes.data.embedding;

    // pgvector semantic search
    const similarDocs = await prisma.$queryRaw`
      SELECT id, title, 1 - (embedding <=> ${vector}::vector) as similarity
      FROM documents
      ORDER BY embedding <=> ${vector}::vector
      LIMIT 5;
    `;

    res.json(similarDocs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
