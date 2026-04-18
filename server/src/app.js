/** @format */

import express from 'express';
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

// Health Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

export default app;
