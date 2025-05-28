import express from 'express';
import { 
  getCorporations, 
  getCorporation, 
  createCorporation, 
  updateCorporation, 
  deleteCorporation 
} from '../controllers/corporation.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createCorporationSchema, updateCorporationSchema } from '../validation/corporation.schema';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getCorporations)
  .post(validate(createCorporationSchema), createCorporation);

router.route('/:id')
  .get(getCorporation)
  .put(validate(updateCorporationSchema), updateCorporation)
  .delete(deleteCorporation);

export default router; 