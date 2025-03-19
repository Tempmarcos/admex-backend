import { z } from "zod";

export const contatoSchema = z.object({
    nome: z.string(),
    cargo: z.string(),
    email: z.string().email().optional(),
    telefone: z.string()
})

export type contatoDTO = z.infer<typeof contatoSchema>

