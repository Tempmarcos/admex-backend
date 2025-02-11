import { z } from "zod"

const LoginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
})

export type LoginDTO = z.infer<typeof LoginSchema>