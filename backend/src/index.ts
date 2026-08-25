import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

dotenv.config();

let prismaInstance: any = null;
if (process.env.DATABASE_URL) {
  try {
    const { PrismaClient } = require('@prisma/client');
    prismaInstance = new PrismaClient();
  } catch (e) {
    console.warn('Prisma initialization skipped:', e);
  }
}

export const prisma = prismaInstance;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.set('io', io);

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 8001;
  server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

export default app;
