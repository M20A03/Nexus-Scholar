import express from 'express';
import cors from 'cors';
import apiRouter from '../src/routes/api';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use((req, res, next) => {
  // Strip /api prefix if present so apiRouter handles clean paths
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace(/^\/api/, '');
  }
  if (!req.url || req.url === '') {
    req.url = '/';
  }
  apiRouter(req, res, next);
});

export default app;
