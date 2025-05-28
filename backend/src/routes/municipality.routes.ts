import express from 'express';
import { 
  getMunicipalities, 
  getMunicipality, 
  createMunicipality, 
  updateMunicipality, 
  deleteMunicipality 
} from '../controllers/municipality.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createMunicipalitySchema, updateMunicipalitySchema } from '../validation/municipality.schema';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getMunicipalities)
  .post(validate(createMunicipalitySchema), createMunicipality);

router.route('/:id')
  .get(getMunicipality)
  .put(validate(updateMunicipalitySchema), updateMunicipality)
  .delete(deleteMunicipality);

export default router; 