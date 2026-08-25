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

// Support routes mounted at /api or at root /
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
