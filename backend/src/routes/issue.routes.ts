import express from 'express';
import { 
  getIssues, 
  getIssue, 
  createIssue, 
  updateIssue, 
  deleteIssue,
  addIssueImage,
  addIssueUpdate
} from '../controllers/issue.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { 
  createIssueSchema, 
  updateIssueSchema,
  addIssueImageSchema,
  addIssueUpdateSchema
} from '../validation/issue.schema';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getIssues)
  .post(validate(createIssueSchema), createIssue);

router.route('/:id')
  .get(getIssue)
  .put(validate(updateIssueSchema), updateIssue)
  .delete(deleteIssue);

router.route('/:id/images')
  .post(validate(addIssueImageSchema), addIssueImage);

router.route('/:id/updates')
  .post(validate(addIssueUpdateSchema), addIssueUpdate);

export default router; 