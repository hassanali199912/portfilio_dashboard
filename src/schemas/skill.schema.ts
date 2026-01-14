import { z } from "zod";



export const skillsSchema = z.object({
    name: z.string().min(3, "Min is 3").refine(s => !s.includes(' '), 'No Spaces!'),
    value: z.number().nonnegative("must be positive value"),
    image: z.string()
        .url("Invalid image URL"),
    order: z.number().nonnegative("must be positive value")
})


export type skillSchemaFormData = z.infer<typeof skillsSchema>