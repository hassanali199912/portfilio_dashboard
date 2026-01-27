import { z } from "zod";


const localizedSchema = z.object({
    ar: z.string().min(1, "Arabic is required"),
    en: z.string().min(1, "English is required"),
});

export const experienceSchema = z.object({
    title: localizedSchema,
    shortDescription: localizedSchema,
    type: z.enum(["education", "work", "training"]),
    date: z.string().min(1, "date is required"),
    order: z.number().nonnegative("must be positive value")
})


export type experienceSchemaFormData = z.infer<typeof experienceSchema>