import { z } from "zod";

export const revisaoUpdateSchema = z.object({
    dataProposta: z.string(),
    valorTotal: z.string(),
    aprovado: z.boolean(),
    executado: z.boolean(),
    itens: z.object({
        nome: z.string(),
        preco: z.string(),
        quantidade: z.number(),
    }).array(),
})

export type RevisaoUpdateDTO = z.infer<typeof revisaoUpdateSchema>