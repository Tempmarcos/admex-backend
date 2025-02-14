import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6).max(500),
})

export type LoginDTO = z.infer<typeof LoginSchema>