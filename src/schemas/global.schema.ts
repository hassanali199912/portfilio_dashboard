import { z } from "zod";

 const ContactSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),

    phone: z
        .string()
        .min(8, "Phone number is too short")
        .regex(/^\+?[0-9\s-]+$/, "Invalid phone number format"),

    address: z
        .string()
        .min(5, "Address is required"),
});

export const AboutSchema = z.object({
    contact: ContactSchema,

    cvLink: z
        .string()
        .url("Invalid CV URL"),

    personalImage: z
        .string()
        .url("Invalid image URL"),
});

export type AboutData = z.infer<typeof AboutSchema>;
