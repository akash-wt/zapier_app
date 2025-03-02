import { z } from "zod";
export const SighupSchema = z.object({
    email: z.string().min(5),
    password: z.string().min(6),
    name: z.string().min(3)
})

export const SigninSchema = z.object({

    email: z.string(),
    password: z.string()
})