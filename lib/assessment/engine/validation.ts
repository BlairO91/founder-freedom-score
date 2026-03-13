import { z } from 'zod';

export const emailGateSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
});

export type EmailGateData = z.infer<typeof emailGateSchema>;

export const stepSchema = z
  .number()
  .int()
  .min(1, 'Invalid step')
  .max(15, 'Invalid step');
