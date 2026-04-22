/** @format */

import express from 'express';
import { updateRoleToEducator } from '../controllers/educator.controller';

const router = express.Router();

// Add Educator Role
educatorRouter.get('/update-role', updateRoleToEducator);

export default router;
