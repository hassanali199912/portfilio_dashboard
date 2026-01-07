import { z } from "zod";



export const SocialSchema = z.object({
    name: z.string()
        .min(5, "Name is required"),
    url: z.string()
        .url("Invalid image URL"),
    iconKey: z.string()
        .min(5, "Name is required"),
    order: z.number().nonnegative("must be positive value")
});

export type SocialFormData = z.infer<typeof SocialSchema>;
