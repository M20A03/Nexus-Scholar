import { Router } from 'express';
import { prisma } from '../index';
import axios from 'axios';

const router = Router();
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

router.get('/:entityId', async (req, res) => {
  const { entityId } = req.params;
  
  try {
    if (!prisma) return res.json([]);
    const relationships = await prisma.relationship.findMany({
      where: {
        OR: [
          { sourceId: entityId },
          { targetId: entityId }
        ]
      }
    });
    res.json(relationships);
  } catch (error) {
    res.json([]);
  }
});

router.post('/similar', async (req, res) => {
  try {
    if (!prisma) return res.json([]);
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
    res.json([]);
  }
});

export default router;
