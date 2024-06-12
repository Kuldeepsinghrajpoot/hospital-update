import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(3,'Password must be at least 5 characters'),
})
export type LoginType = z.infer<typeof LoginSchema>
