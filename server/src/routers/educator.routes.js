/** @format */

import express from 'express';
import {
  addCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  updateRoleToEducator,
} from '../controllers/educator.controller.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Add Educator Role
router.get('/update-role', updateRoleToEducator);

// Add Courses
router.post('/add-course', upload.single('image'), protectEducator, addCourse);

// Get Educator Courses
router.get('/courses', protectEducator, getEducatorCourses);

// Get Educator Dashboard Data
router.get('/dashboard', protectEducator, educatorDashboardData);

// Get Educator Students Data
router.get('/enrolled-students', protectEducator, getEnrolledStudentsData);

export default router;
