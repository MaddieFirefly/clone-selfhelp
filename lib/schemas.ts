import { z } from 'zod';

export const onboardingSchema = z.object({
  userName: z.string().min(1),
  petName: z.string().min(1),
  color: z.string().min(1),
  personality: z.string().min(1),
  checkInWindows: z.array(z.string()).min(1),
});

export const goalSchema = z.object({
  title: z.string().min(1),
  category: z.string().default('wellness'),
  frequency: z.enum(['daily', 'weekly']).default('daily'),
});

export const checkinSchema = z.object({
  mood: z.number().int().min(1).max(5),
  energy: z.number().int().min(1).max(5),
  stress: z.number().int().min(1).max(5),
  note: z.string().optional(),
});

export const journalSchema = z.object({
  prompt: z.string().optional(),
  content: z.string().min(1),
  mood: z.number().int().min(1).max(5).optional(),
  tags: z.array(z.string()).default([]),
});

export const breathingSchema = z.object({
  pattern: z.enum(['box', '4-7-8', 'calm-cadence']),
  seconds: z.number().int().min(30).max(1800),
});

export const purchaseSchema = z.object({
  itemId: z.string().min(1),
});

export const homeLayoutSchema = z.object({
  background: z.string().min(1),
  furniture: z.array(z.string()),
});
