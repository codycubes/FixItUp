import { Request, Response, NextFunction } from 'express';

// Custom error class
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors?: Array<{ path: string; message: string }>;

  constructor(
    message: string, 
    statusCode: number, 
    errors?: Array<{ path: string; message: string }>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;
  
  // Pass through the errors property
  if ((err as AppError).errors) {
    (error as AppError).errors = (err as AppError).errors;
  }

  // Log error for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if ((err as any).code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors)
      .map((val: any) => val.message)
      .join(', ');
    error = new AppError(message, 400);
  }

  // Build the response object
  const response: {
    success: boolean;
    error: string;
    errors?: Array<{ path: string; message: string }>;
  } = {
    success: false,
    error: error.message || 'Server Error',
  };

  // Add detailed errors if available
  if ((error as AppError).errors) {
    response.errors = (error as AppError).errors;
  }

  res.status((error as AppError).statusCode || 500).json(response);
}; 