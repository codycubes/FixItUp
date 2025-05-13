import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user.model';
import { AppError } from '../middleware/error.middleware';
import { isValidEmail, isStrongPassword, hasRequiredFields, sanitizeInput } from '../utils/validator';

// @desc    Register a user
// @route   POST /api/auth/register
// @access  Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!hasRequiredFields({ name, email, password }, ['name', 'email', 'password'])) {
      return next(new AppError('Please provide name, email and password', 400));
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return next(new AppError('Please provide a valid email', 400));
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return next(
        new AppError(
          'Password must be at least 6 characters and contain at least 1 number',
          400
        )
      );
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError('User already exists', 400));
    }

    // Create user with sanitized input
    const user = await User.create({
      name: sanitizeInput(name),
      email: email.toLowerCase(),
      password
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return next(new AppError('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

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
    const user = await User.findById(req.user.id);

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
      name: user.name,
      email: user.email
    }
  });
}; 