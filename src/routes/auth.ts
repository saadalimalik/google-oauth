import { Router } from 'express';
import { googleAuth } from '../controllers/auth.controller';

const router = Router();

router.get('/', googleAuth);

export default router;
