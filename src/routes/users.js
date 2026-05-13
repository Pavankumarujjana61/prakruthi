import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserStats
} from '../controllers/users.js';
import { protect, authorize } from '../middleware/auth.js';
import { createUserValidation, updateUserValidation } from '../validations/index.js';

const router = express.Router();

router.use(protect);
router.get('/', authorize('admin'), getUsers);
router.get('/stats', authorize('admin'), getUserStats);
router.post('/', authorize('admin'), createUserValidation, createUser);
router.get('/:id', getUser);
router.put('/:id', updateUserValidation, updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;
