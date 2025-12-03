import { z } from "zod";

export const revisaoCreateSchema = z.object({
    propostaId: z.string().optional().nullish(),
    dataProposta: z.string(),
    valorTotal: z.number(),
    itens: z.object({
        nome: z.string(),
        preco: z.number(),
        quantidade: z.number(),
        unidadeDeMedida: z.string().optional()
    }).array(),
})

export type CreateRevisaoDTO = z.infer<typeof revisaoCreateSchema>