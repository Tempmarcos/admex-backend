import { z } from "zod";


export const dadosFiscaisSchema = z.object({
    registro: z.string(),
    classificacao: z.string(),
})


export type DadosFiscaisDTO = z.infer<typeof dadosFiscaisSchema>;
