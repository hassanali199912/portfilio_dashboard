import { z } from "zod";

/**
 * 
 
  ar_name: {
        type: String,
        require: true,
    },
    en_name: {
        type: String,
        require: true,
    },
    ar_title: {
        type: String,
        require: true,
    },
    en_title: {
        type: String,
        require: true,
    },
    ar_description: {
        type: String,
        require: true,
    },
    en_description: {
        type: String,
        require: true,
    },
    profile_photo: {
        type: String
    },
    button_link: {
        type: String,
        default: "mailto:hassanalihassan1203@gmail.com"
    },
    isVisible: { type: Boolean, default: true }
 */
export const heroSectionSchema = z.object({
    ar_name: z.string().min(1, "Min Is 1"),
    en_name: z.string().min(1, "Min Is 1"),
    ar_title: z.string().min(1, "Min Is 1"),
    en_title: z.string().min(1, "Min Is 1"),
    ar_description: z.string().min(1, "Min Is 1"),
    en_description: z.string().min(1, "Min Is 1"),
    profile_photo: z.url(),
    button_link: z.string(),

})


export type heroSectionFormData = z.infer<typeof heroSectionSchema> 
