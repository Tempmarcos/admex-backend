import { z } from "zod";

export const revisaoUpdateSchema = z.object({
    dataProposta: z.string(),
    valorTotal: z.number(),
    aprovado: z.boolean(),
    executado: z.boolean(),
    itens: z.object({
        nome: z.string(),
        preco: z.number(),
        quantidade: z.number(),
        unidadeDeMedida: z.string().optional()
    }).array(),
})

export type RevisaoUpdateDTO = z.infer<typeof revisaoUpdateSchema>