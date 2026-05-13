import express from 'express';
import { register, login, refreshToken, logout, getMe } from '../controllers/auth.js';
import { registerValidation, loginValidation } from '../validations/index.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/refresh', refreshToken);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;
