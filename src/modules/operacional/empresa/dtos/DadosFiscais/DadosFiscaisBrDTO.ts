import { z } from "zod";


enum regimeTributario  {
    Simples = 'simples',
    LucroPresumido = 'lucroPresumido', 
    LucroReal = 'lucroReal',
}

const dadosFiscaisBRSchema = z.object({
    registro: z.string(),
    classificacao: z.string(),
    inscricaoEstadual: z.string(),
    certificadoDigital: z.string(),
    regimeTributario: z.nativeEnum(regimeTributario)
})


export type DadosFiscaisBrDTO = z.infer<typeof dadosFiscaisBRSchema>;
