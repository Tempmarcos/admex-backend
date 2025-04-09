import { z } from "zod";



export const versaoSchema = z.object({
    propostaId: z.string().optional(),
    dataProposta: z.date().min(new Date),
    valorTotal: z.string(),
    numeroVersao: z.number(),
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

export type VersaoPropostaDTO = z.infer<typeof versaoSchema>