import { Router } from 'express';
import { googleLogin, googleAuth } from '../controllers/auth.controller';

const router = Router();

// Google OAuth 2.0
router.get('/google', googleAuth);
router.get('/google/redirect', googleLogin);

export default router;
