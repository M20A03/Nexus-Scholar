import { Router } from 'express';
import multer from 'multer';
import { prisma } from '../index';
import axios from 'axios';
import fs from 'fs';

const router = Router();
const upload = multer({ dest: 'uploads/' });

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    const textContent = fs.readFileSync(req.file.path, 'utf-8');
    
    // 1. Get embedding
    const embedRes = await axios.post(`${AI_SERVICE_URL}/embed`, { text: textContent.substring(0, 5000) });
    const documentEmbedding = embedRes.data.embedding;

    // 2. Extract entities
    const entityRes = await axios.post(`${AI_SERVICE_URL}/extract-entities`, { text: textContent.substring(0, 5000) });
    const entities = entityRes.data.entities;

    // 3. Save to DB
    const newDoc = await prisma.document.create({
      data: {
        title: req.file.originalname,
        full_text: textContent,
        file_type: req.file.mimetype,
        authors: [],
      }
    });

    // Update embedding manually using raw query due to Unsupported vector type
    await prisma.$executeRaw`UPDATE documents SET embedding = ${documentEmbedding}::vector WHERE id = ${newDoc.id}::uuid`;

    for (const ent of entities) {
      const dbEntity = await prisma.entity.create({
        data: {
          name: ent.name,
          type: ent.type
        }
      });
      // In a full implementation, we'd also embed the entity and create relationships
      await prisma.relationship.create({
        data: {
          source_entity_id: dbEntity.id,
          target_entity_id: dbEntity.id, // placeholder
          relationship_type: 'mentioned_in',
          confidence: ent.salience,
          document_id: newDoc.id
        }
      });
    }

    const io = req.app.get('io');
    io.emit('graph_updated', { message: 'New document ingested', docId: newDoc.id });

    res.json({ success: true, docId: newDoc.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
});

export default router;
