import { Router } from 'express';
import {
  createUser,
  getUsers,
  deleteAllUsers,
  deleteAllGoogleUsers,
  getGoogleUsers,
} from '../controllers/users.controller';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.delete('/', deleteAllUsers);

router.get('/google', getGoogleUsers);
router.delete('/google', deleteAllGoogleUsers);

export default router;
