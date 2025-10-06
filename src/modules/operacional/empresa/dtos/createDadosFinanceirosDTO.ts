import { z } from "zod";

export const dadosFinanceirosSchema = z.object({
    banco: z.string().optional(),
    agencia: z.string().optional(),
    conta: z.string().optional(),
    pix: z.string().optional()
})

export type CreateDadosFinanceirosDTO = z.infer<typeof dadosFinanceirosSchema>