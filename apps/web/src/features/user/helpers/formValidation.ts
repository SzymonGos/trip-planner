import { z } from 'zod';

export const userSettingsSchema = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters long').max(25, 'Username is too long'),
  email: z.string().email('Invalid email address'),
  profileImage: z.instanceof(File).optional(),
});
