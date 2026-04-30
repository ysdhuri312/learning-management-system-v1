/** @format */

import mongoose from 'mongoose';

let isConnected = false;

// Connect to the MongoDB database
const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'lms',
    });

    isConnected = conn.connections[0].readyState === 1;

    console.log(`✅ Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // stop server if DB fails
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('Database Disconnected');
};

export { connectDB, disconnectDB };
