import { z } from "zod";



export const versaoCreateSchema = z.object({
    propostaId: z.string().optional(),
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

export type CreateVersaoPropostaDTO = z.infer<typeof versaoCreateSchema>