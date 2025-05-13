import express from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { registerSchema, loginSchema } from '../validation/auth.schema';

const router = express.Router();

// Routes
router.post('/register', validate(registerSchema, ['name']), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);

export default router; 