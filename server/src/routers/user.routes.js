/** @format */

import express from 'express';

import {
  getUserData,
  purchaseCourse,
  userEnrolledCourses,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/data', getUserData);
router.post('/purchase', purchaseCourse);
router.get('/enrolled-courses', userEnrolledCourses);

export default router;
