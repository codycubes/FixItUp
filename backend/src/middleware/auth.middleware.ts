import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';
import User from '../models/user.model';
import config from '../config/config';

// Extend the Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    // Cast the secret to string to ensure TypeScript accepts it
    const secret: string = String(config.jwtSecret);
    const decoded = jwt.verify(
      token,
      secret
    ) as jwt.JwtPayload;

    // Find user by id
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Not authorized to access this route', 401));
  }
}; 