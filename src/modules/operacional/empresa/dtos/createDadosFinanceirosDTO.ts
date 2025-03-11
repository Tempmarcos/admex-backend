import { z } from "zod";

export const dadosFinanceirosSchema = z.object({
    contaBancaria: z.string(),
    
})

export type CreateDadosFinanceirosDTO = z.infer<typeof dadosFinanceirosSchema>