import { z } from "zod";



export const skillsSchema = z.object({
    name: z.string().min(2, "Min is 2"),
    value: z.number().nonnegative("must be positive value"),
    image: z.string()
        .url("Invalid image URL"),
    order: z.number().nonnegative("must be positive value")
})


export type skillSchemaFormData = z.infer<typeof skillsSchema>