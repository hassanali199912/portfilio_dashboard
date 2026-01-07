import { z } from "zod";
export const contentEditorSchema = z.object({
    title: z.object({
        ar: z.string().min(1, "Arabic title is required"),
        en: z.string().min(1, "English title is required"),
    }),
    description: z.object({
        ar: z.string().min(1, "Arabic description is required"),
        en: z.string().min(1, "English description is required"),
    }),
});

export type ContentEditorFormData = z.infer<typeof contentEditorSchema>;