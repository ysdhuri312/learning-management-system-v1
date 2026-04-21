/** @format */

import express from 'express';
import { getAllCourse, getCourseId } from '../controllers/course.controller.js';

const router = express.Router();

// Get All Course
router.get('/all', getAllCourse);

// Get Course Data By Id
router.get('/:id', getCourseId);

export default router;
