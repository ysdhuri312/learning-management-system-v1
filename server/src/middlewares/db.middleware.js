/** @format */

import { connectDB } from '../configs/db.js';

export const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'DB connection failed' });
  }
};
