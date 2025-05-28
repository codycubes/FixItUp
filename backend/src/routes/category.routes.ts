import express from 'express';
import { 
  getCategories, 
  getCategory, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../controllers/category.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createCategorySchema, updateCategorySchema } from '../validation/category.schema';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getCategories)
  .post(validate(createCategorySchema), createCategory);

router.route('/:id')
  .get(getCategory)
  .put(validate(updateCategorySchema), updateCategory)
  .delete(deleteCategory);

export default router; 