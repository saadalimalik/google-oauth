import { Router } from 'express';
import {
  googleLogin,
  googleAuth,
  otpAuth,
  verifyOtp,
} from '../controllers/auth.controller';

const router = Router();

// Google OAuth 2.0
router.get('/google', googleAuth);
router.get('/google/redirect', googleLogin);

router.get('/otp', otpAuth);
router.post('/otp/verify', verifyOtp);

export default router;
