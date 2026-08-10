import { z } from 'zod';

const localizedSchema = z.object({
  ar: z.string().min(1, 'Arabic is required'),
  en: z.string().min(1, 'English is required'),
});

const richTextSchema = z.object({
  ar: z
    .string()
    .refine((val) => val.replace(/<[^>]*>/g, '').trim().length >= 1, 'Arabic content is required'),
  en: z
    .string()
    .refine((val) => val.replace(/<[^>]*>/g, '').trim().length >= 1, 'English content is required'),
});

export const blogFormSchema = z.object({
  title: localizedSchema,
  excerpt: localizedSchema,
  content: richTextSchema,
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  readingTime: z.number().int().min(1, 'Reading time must be at least 1 minute'),
  coverImage: z.string().url('Invalid cover image URL').optional().or(z.literal('')),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only'),
  isFeatured: z.boolean(),
  isVisible: z.boolean(),
  order: z.number().int().min(0),
});

export type BlogFormData = z.infer<typeof blogFormSchema>;
