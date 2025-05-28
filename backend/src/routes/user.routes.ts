import express from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createUserSchema, updateUserSchema } from '../validation/user.schema';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getUsers)
  .post(validate(createUserSchema), createUser);

router.route('/:id')
  .get(getUser)
  .put(validate(updateUserSchema), updateUser)
  .delete(deleteUser);

export default router; 