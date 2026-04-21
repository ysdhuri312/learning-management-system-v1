/** @format */

import express from 'express';

import { getUserData, purchaseCourse } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/data', getUserData);
router.post('/purchase', purchaseCourse);

export default router;
