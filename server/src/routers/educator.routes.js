/** @format */

import express from 'express';
import {
  addCourse,
  updateRoleToEducator,
} from '../controllers/educator.controller.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Add Educator Role
router.get('/update-role', updateRoleToEducator);

// Add Courses
router.post('/add-course', upload.single('image'), protectEducator, addCourse);

export default router;
