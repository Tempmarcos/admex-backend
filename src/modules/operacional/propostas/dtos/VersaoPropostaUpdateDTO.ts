import { z } from "zod";



export const versaoUpdateSchema = z.object({
    dataProposta: z.date().min(new Date),
    valorTotal: z.string(),
    aprovado: z.boolean(),
    executado: z.boolean(),
    produto: z.object({
        nome: z.string(),
        preco: z.string(),
        quantidade: z.number(),
        unidadeDeMedida: z.string()
    }).array(),
    servico: z.object({
        nome: z.string(),
        preco: z.string(),
    }).array()
})

export type VersaoPropostaUpdateDTO = z.infer<typeof versaoUpdateSchema>