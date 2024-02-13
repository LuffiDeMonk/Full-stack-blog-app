import { z } from 'zod'

const MAX_FILE_SIZE = 5000000

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const FormSchema = z.object({
    title: z.string().min(1, "This is a required field"),
    description: z.string({
        invalid_type_error: "Invalid value",
        required_error: "This is a required field"
    }).min(1, 'This is a required field'),
    poster: z.any({
        invalid_type_error: "This is a required field"
    }).refine(file => file !== undefined, "This is a required field").refine(file => file[0]?.size <= MAX_FILE_SIZE, "Maximum file size is 5MB").refine(file => SUPPORTED_FORMATS.includes(file[0]?.type), "Only .jpg, .jpeg, .png, and .webp formats supported"),
    category: z.string({
        invalid_type_error: "Invalid value",
        required_error: 'This is a required field'
    })
})

export type TFormSchema = z.infer<typeof FormSchema>