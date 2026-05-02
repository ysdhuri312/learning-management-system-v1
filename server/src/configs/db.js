/** @format */

import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Connect to the MongoDB database
const connectDB = async () => {
  if (cached.conn) {
    return cached.conn; // ✅ reuse connection
  }

  try {
    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'lms',
        bufferCommands: false,
      });
    }

    cached.conn = await cached.promise;
    console.log('✅ Database Connected:', cached.conn.connection.host);

    return cached.conn;
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
