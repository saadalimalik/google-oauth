import express from 'express';
import { Router } from 'express-serve-static-core';
import authRouter from './auth';
import usersRouter from './users';
import { authenticateUser } from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.use('/api/users', authenticateUser, usersRouter);
router.use('/api/auth', authRouter);

export default router;
