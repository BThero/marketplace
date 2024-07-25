import { z } from 'zod';

export const createChecklistSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name has to be at most 255 characters long'),
});

export const deleteChecklistSchema = z.object({
  id: z.number(),
});

export const updateChecklistSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name has to be at most 255 characters long'),
});

export const completeChecklistSchema = z.object({
  id: z.number(),
});

export const toggleChecklistItemSchema = z.object({
  id: z.number(),
});

export const deleteChecklistItemSchema = z.object({
  id: z.number(),
});

export const renameChecklistItemSchema = z.object({
  id: z.number(),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(255, 'Description has to be at most 255 characters long'),
});

export const createChecklistItemSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required')
    .max(255, 'Description has to be at most 255 characters long'),
  checklistId: z.number(),
});

export type CreateChecklistSchemaType = z.infer<typeof createChecklistSchema>;
export type ToggleChecklistItemSchemaType = z.infer<
  typeof toggleChecklistItemSchema
>;
export type DeleteChecklistItemSchemaType = z.infer<
  typeof deleteChecklistItemSchema
>;
export type CreateChecklistItemSchemaType = z.infer<
  typeof createChecklistItemSchema
>;
export type UpdateChecklistSchemaType = z.infer<typeof updateChecklistSchema>;
export type RenameChecklistItemSchemaType = z.infer<
  typeof renameChecklistItemSchema
>;
