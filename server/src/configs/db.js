/** @format */

import mongoose from 'mongoose';

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'lms',
    });

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
