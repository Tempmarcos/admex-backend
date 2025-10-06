import { z } from "zod"
import { contatoSchema } from "../../domain/value-objects/contato"

export const clienteSchema = z.object({
    // nome: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
    // .regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais"),
    nome: z.string(),
    contato: contatoSchema,
    endereco: z.any(),
    registro: z.string()
})

export type createClienteDTO = z.infer<typeof clienteSchema>