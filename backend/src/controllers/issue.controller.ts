import { Request, Response, NextFunction } from 'express';
import Issue from '../models/issue.model';
import IssueImage from '../models/issue-image.model';
import IssueUpdate from '../models/issue-update.model';
import { AppError } from '../middleware/error.middleware';
import { 
  CreateIssueInput, 
  UpdateIssueInput,
  AddIssueImageInput,
  AddIssueUpdateInput
} from '../validation/issue.schema';

// @desc    Get all issues
// @route   GET /api/issues
// @access  Private
export const getIssues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Build filter object
    const filter: any = {};
    
    // Add filters based on query parameters
    if (req.query.municipalityId) {
      filter.municipalityId = req.query.municipalityId;
    }
    
    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    const issues = await Issue.find(filter)
      .populate('userId', 'username')
      .populate('categoryId', 'name')
      .populate('municipalityId', 'name')
      .populate('assignedTo', 'username');

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
// @access  Private
export const getIssue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('userId', 'username')
      .populate('categoryId', 'name')
      .populate('municipalityId', 'name')
      .populate('assignedTo', 'username');

    if (!issue) {
      return next(new AppError(`Issue not found with id of ${req.params.id}`, 404));
    }

    // Get issue images
    const images = await IssueImage.find({ issueId: req.params.id });

    // Get issue updates
    const updates = await IssueUpdate.find({ issueId: req.params.id })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        issue,
        images,
        updates
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create issue
// @route   POST /api/issues
// @access  Private
export const createIssue = async (
  req: Request<{}, {}, CreateIssueInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Add user ID to request body
    req.body.userId = req.user.id;

    const issue = await Issue.create(req.body);

    res.status(201).json({
      success: true,
      data: issue
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update issue
// @route   PUT /api/issues/:id
// @access  Private
export const updateIssue = async (
  req: Request<{ id: string }, {}, UpdateIssueInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) {
      return next(new AppError(`Issue not found with id of ${req.params.id}`, 404));
    }

    // Update issue
    issue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private
export const deleteIssue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return next(new AppError(`Issue not found with id of ${req.params.id}`, 404));
    }

    await Issue.findByIdAndDelete(req.params.id);

    // Also delete related images and updates
    await IssueImage.deleteMany({ issueId: req.params.id });
    await IssueUpdate.deleteMany({ issueId: req.params.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add issue image
// @route   POST /api/issues/:id/images
// @access  Private
export const addIssueImage = async (
  req: Request<{ id: string }, {}, AddIssueImageInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return next(new AppError(`Issue not found with id of ${req.params.id}`, 404));
    }

    const image = await IssueImage.create({
      issueId: req.params.id,
      imageUrl: req.body.imageUrl
    });

    res.status(201).json({
      success: true,
      data: image
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add issue update
// @route   POST /api/issues/:id/updates
// @access  Private
export const addIssueUpdate = async (
  req: Request<{ id: string }, {}, AddIssueUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return next(new AppError(`Issue not found with id of ${req.params.id}`, 404));
    }

    // Create a new update
    const update = await IssueUpdate.create({
      issueId: req.params.id,
      userId: req.user.id,
      newStatus: req.body.newStatus,
      comment: req.body.comment
    });

    // Update the issue status
    await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.newStatus },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(201).json({
      success: true,
      data: update
    });
  } catch (error) {
    next(error);
  }
}; 