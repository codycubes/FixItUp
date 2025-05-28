import { z } from 'zod';

// Create issue schema
export const createIssueSchema = z.object({
  body: z.object({
    title: z.string()
      .min(1, { message: 'Title is required' })
      .max(200, { message: 'Title cannot be more than 200 characters' })
      .trim(),
    description: z.string()
      .min(1, { message: 'Description is required' })
      .max(1000, { message: 'Description cannot be more than 1000 characters' })
      .trim(),
    location: z.string()
      .min(1, { message: 'Location is required' })
      .trim(),
    categoryId: z.string()
      .min(1, { message: 'Category ID is required' }),
    municipalityId: z.string()
      .min(1, { message: 'Municipality ID is required' }),
    priority: z.enum(['Low', 'Medium', 'High']).optional()
  })
});

// Update issue schema
export const updateIssueSchema = z.object({
  body: z.object({
    title: z.string()
      .max(200, { message: 'Title cannot be more than 200 characters' })
      .trim()
      .optional(),
    description: z.string()
      .max(1000, { message: 'Description cannot be more than 1000 characters' })
      .trim()
      .optional(),
    location: z.string()
      .trim()
      .optional(),
    status: z.enum(['Pending', 'Assigned', 'In Progress', 'Completed', 'Rejected'])
      .optional(),
    priority: z.enum(['Low', 'Medium', 'High'])
      .optional(),
    assignedTo: z.string().optional()
  })
});

// Add issue image schema
export const addIssueImageSchema = z.object({
  body: z.object({
    imageUrl: z.string()
      .min(1, { message: 'Image URL is required' })
  })
});

// Add issue update schema
export const addIssueUpdateSchema = z.object({
  body: z.object({
    newStatus: z.enum(['Pending', 'Assigned', 'In Progress', 'Completed', 'Rejected']),
    comment: z.string()
      .max(500, { message: 'Comment cannot be more than 500 characters' })
      .optional()
  })
});

// Types based on schemas
export type CreateIssueInput = z.infer<typeof createIssueSchema>['body'];
export type UpdateIssueInput = z.infer<typeof updateIssueSchema>['body'];
export type AddIssueImageInput = z.infer<typeof addIssueImageSchema>['body'];
export type AddIssueUpdateInput = z.infer<typeof addIssueUpdateSchema>['body']; 