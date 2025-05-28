import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user.model';
import { AppError } from '../middleware/error.middleware';
import { RegisterInput, LoginInput } from '../validation/auth.schema';

// @desc    Register a user
// @route   POST /api/auth/register
// @access  Public
export const register = async (
  req: Request<{}, {}, RegisterInput>,
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

    // Send token response
    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('roleId', 'roleName')
      .populate('municipalityId', 'name')
      .populate('corporationId', 'name');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      municipalityId: user.municipalityId,
      corporationId: user.corporationId
    }
  });
}; 