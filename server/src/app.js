/** @format */

import express from 'express';
import 'dotenv/config';

import userRouter from './routers/user.router.js';

const app = express();

app.use(express.json());

// Server initiated
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to API v1.0.0',
    timestamp: new Date().toISOString(),
  });
});

//Routes
app.use('/api/user', userRouter);

// Health Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

export default app;
