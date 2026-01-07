import { z } from "zod";



export const sectionSchema = z.object({
    key: z.string().min(3, "Min is 3").refine(s => !s.includes(' '), 'No Spaces!'),
    title: z.string().min(3, "Min is 3")
})


export type sectionSchemaFormData = z.infer<typeof sectionSchema>