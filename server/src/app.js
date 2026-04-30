/** @format */

import express from 'express';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

import userRouter from './routers/user.routes.js';
import courseRouter from './routers/course.routes.js';
import educatorRouter from './routers/educator.routes.js';

import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';

const app = express();

// Middlewares
app.use(clerkMiddleware());
app.use(cors());

// Server initiated
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to API v1.0.0',
    timestamp: new Date().toISOString(),
  });
});

//Routes
app.post(
  '/api/v1/clerk',
  express.raw({ type: 'application/json' }),
  clerkWebhooks,
);
app.post(
  '/api/v1/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhooks,
);
app.use('/api/v1/user', express.json(), userRouter);
app.use('/api/v1/course', express.json(), courseRouter);
app.use('/api/v1/educator', express.json(), educatorRouter);

// Health Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

export default app;
