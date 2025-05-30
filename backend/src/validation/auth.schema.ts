import { z } from 'zod';

// Register schema
export const registerSchema = z.object({
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

// Login schema
export const loginSchema = z.object({
  body: z.object({
    email: z.string()
      .email({ message: 'Please provide a valid email' })
      .trim()
      .toLowerCase(),
    password: z.string()
      .min(1, { message: 'Password is required' })
  })
});

// Types based on schemas
export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body']; 