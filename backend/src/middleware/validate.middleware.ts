import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from './error.middleware';
import { sanitizeInput } from '../utils/validator';

/**
 * Middleware for validating requests with Zod schemas
 * @param schema Zod schema to validate against
 * @param sanitizeFields Optional array of fields to sanitize
 */
export const validate = (
  schema: AnyZodObject, 
  sanitizeFields: string[] = []
) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate the request against the schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      
      // Sanitize specified fields if needed
      if (sanitizeFields.length > 0 && req.body) {
        sanitizeFields.forEach(field => {
          if (req.body[field] && typeof req.body[field] === 'string') {
            req.body[field] = sanitizeInput(req.body[field]);
          }
        });
      }
      
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format all validation errors
        const errors = error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }));
        
        return next(new AppError('Validation failed', 400, errors));
      }
      
      return next(error);
    }
  }; 