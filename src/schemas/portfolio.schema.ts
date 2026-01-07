import { z } from "zod";

const localizedSchema = z.object({
  ar: z.string().min(1, "Arabic is required"),
  en: z.string().min(1, "English is required"),
});

export const portfolioFormSchema = z.object({
  title: localizedSchema,
  shortDescription: localizedSchema,
  role: localizedSchema,

  techStack: z.array(z.string()).min(1, "At least one tech is required"),
  projectType: z.string().min(1, "Project type is required"),

  isFeatured: z.boolean(),
  isVisible: z.boolean(),

  liveUrl: z.string().url().optional().or(z.literal("")),
  image: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  order: z.number().int().min(0),
});

export type PortfolioFormData = z.infer<typeof portfolioFormSchema>;
