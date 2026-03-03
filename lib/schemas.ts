import { z } from 'zod';

const moodValueSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

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
  mood: moodValueSchema,
  energy: moodValueSchema,
  stress: moodValueSchema,
  note: z.string().optional(),
});

export const journalSchema = z.object({
  prompt: z.string().optional(),
  content: z.string().min(1),
  mood: moodValueSchema.optional(),
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
