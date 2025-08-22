import { z } from "zod";


enum regimeTributario  {
    Simples = 'simples',
    LucroPresumido = 'lucroPresumido', 
    LucroReal = 'lucroReal',
}

const dadosFiscaisBRSchema = z.object({
    registro: z.string().length(14),
    classificacao: z.string(),
    naturezaJuridica: z.string(),
    regimeTributario: z.string()
})


export type DadosFiscaisBrDTO = z.infer<typeof dadosFiscaisBRSchema>;
