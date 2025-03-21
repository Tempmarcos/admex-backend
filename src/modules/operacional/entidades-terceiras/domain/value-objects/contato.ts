import { z } from "zod";

export const contatoSchema = z.object({
    nome: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais"),
    cargo: z.string(),
    email: z.string().email().optional(),
    telefone: z.string().optional()
})

export type contatoDTO = z.infer<typeof contatoSchema>

