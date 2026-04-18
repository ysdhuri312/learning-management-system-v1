/** @format */

import app from './app.js';
import { disconnectDB, connectDB } from './configs/db.js';

// Connect to database
await connectDB();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Press Ctrl+C to stop`);
});
// handle promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhadled Rejection: ', error);
  server.close(async () => {
    await disconnectDB();
  });
  process.exit(1);
});

// handled try_catch errors
process.on('uncaughtException', async (error) => {
  console.error('Uncaught Exception: ', error);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown (still possible with direct approach)
const gracefulShutdown = () => {
  console.log('\nReceived shutdown signal, closing server...');

  server.close(() => {
    console.log('Server closed gracefully');
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 10000);
};

// SIGTERM received, Gracefully shutdown.
process.on('SIGTERM', gracefulShutdown);

// SIGINT received (Ctrl+C), Gracefully shutdown.
process.on('SIGINT', gracefulShutdown);
