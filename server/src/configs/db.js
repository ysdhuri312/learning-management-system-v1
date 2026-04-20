/** @format */

import mongoose from 'mongoose';

// Connect to the MongoDB database
const connectDB = async () => {
  await mongoose.connection.on('connected', () =>
    console.log('Database Connected'),
  );
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'lms',
  });
};

const disconnectDB = async () => {
  await mongoose.disconnect;
};

export { connectDB, disconnectDB };
