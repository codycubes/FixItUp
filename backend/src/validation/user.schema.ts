import { z } from 'zod';

// Create user schema
export const createUserSchema = z.object({
  body: z.object({
    username: z.string()
      .min(1, { message: 'Username is required' })
      .max(50, { message: 'Username cannot be more than 50 characters' })
      .trim(),
    email: z.string()
      .email({ message: 'Please provide a valid email' })
      .trim()
      .toLowerCase(),
    password: z.string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .refine(value => /\d/.test(value), {
        message: 'Password must contain at least 1 number'
      }),
    roleId: z.string()
      .min(1, { message: 'Role ID is required' }),
    municipalityId: z.string().optional(),
    corporationId: z.string().optional()
  })
});

// Update user schema
export const updateUserSchema = z.object({
  body: z.object({
    username: z.string()
      .min(1, { message: 'Username is required' })
      .max(50, { message: 'Username cannot be more than 50 characters' })
      .trim()
      .optional(),
    email: z.string()
      .email({ message: 'Please provide a valid email' })
      .trim()
      .toLowerCase()
      .optional(),
    password: z.string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .refine(value => /\d/.test(value), {
        message: 'Password must contain at least 1 number'
      })
      .optional(),
    roleId: z.string().optional(),
    municipalityId: z.string().optional(),
    corporationId: z.string().optional()
  })
});

// Types based on schemas
export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body']; 