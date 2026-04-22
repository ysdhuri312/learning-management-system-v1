/** @format */

import express from 'express';

import {
  getUserCourseProgress,
  getUserData,
  purchaseCourse,
  userEnrolledCourses,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/data', getUserData);
router.post('/purchase', purchaseCourse);
router.get('/enrolled-courses', userEnrolledCourses);
router.post('/update-course-progress', updateUserCourseProgress);
router.post('/get-course-progress', getUserCourseProgress);

export default router;
