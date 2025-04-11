import { z } from "zod";



export const versaoSchema = z.object({
    dataProposta: z.date().min(new Date),
    valorTotal: z.string(),
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

export type VersaoPropostaUpdateDTO = z.infer<typeof versaoSchema>