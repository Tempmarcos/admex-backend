import { z } from "zod";

export const revisaoCreateSchema = z.object({
    propostaId: z.string().optional(),
    dataProposta: z.string(),
    valorTotal: z.string(),
    itens: z.object({
        nome: z.string(),
        preco: z.string(),
        quantidade: z.number(),
    }).array(),
})

export type CreateRevisaoDTO = z.infer<typeof revisaoCreateSchema>