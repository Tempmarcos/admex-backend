import { z } from "zod";

export const revisaoSchema = z.object({
    propostaId: z.string().optional(),
    dataProposta: z.string(),
    valorTotal: z.string(),
    numeroRevisao: z.number(),
    itens: z.object({
        nome: z.string(),
        preco: z.string(),
        quantidade: z.number(),
        unidadeDeMedida: z.string()
    }).array()
})

export type RevisaoDTO = z.infer<typeof revisaoSchema>