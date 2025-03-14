import { z } from "zod";
import { DadosGerais } from "../domain/value-objects/dadosGerais/dadosGerais";


const ListEmpresaZod = z.object({
    id: z.string(),
    DadosGerais: z.object({
        nome: z.string()
    }).nullish()
    
})

export type ListEmpresaDTO = z.infer<typeof ListEmpresaZod>;