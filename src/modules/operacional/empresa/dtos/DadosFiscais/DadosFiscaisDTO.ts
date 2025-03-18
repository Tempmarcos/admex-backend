import { z } from "zod";


export const dadosFiscaisSchema = z.object({
    registro: z.string(),
    classificacao: z.string(),
    camposEspecificos: z.any()
})


export type DadosFiscaisDTO = z.infer<typeof dadosFiscaisSchema>;
