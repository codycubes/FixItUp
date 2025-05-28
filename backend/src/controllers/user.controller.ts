import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { AppError } from '../middleware/error.middleware';
import { CreateUserInput, UpdateUserInput } from '../validation/user.schema';

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only)
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Filter by municipality or corporation if provided
    const filter: any = {};
    
    if (req.query.municipalityId) {
      filter.municipalityId = req.query.municipalityId;
    }
    
    if (req.query.corporationId) {
      filter.corporationId = req.query.corporationId;
    }

    const users = await User.find(filter)
      .populate('roleId', 'roleName')
      .populate('municipalityId', 'name')
      .populate('corporationId', 'name');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin only)
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('roleId', 'roleName')
      .populate('municipalityId', 'name')
      .populate('corporationId', 'name');

    if (!user) {
      return next(new AppError(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create user
// @route   POST /api/users
// @access  Private (Admin only)
export const createUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, roleId, municipalityId, corporationId } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (userExists) {
      return next(new AppError('User already exists', 400));
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      roleId,
      ...(municipalityId && { municipalityId }),
      ...(corporationId && { corporationId })
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin only)
export const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError(`User not found with id of ${req.params.id}`, 404));
    }

    // Update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError(`User not found with id of ${req.params.id}`, 404));
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
}; 