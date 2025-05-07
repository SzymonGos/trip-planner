import { z } from 'zod';

export const tripSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title must be at most 100 characters long'),
  description: z.string().max(700, 'Description must be at most 700 characters long').optional(),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
});
