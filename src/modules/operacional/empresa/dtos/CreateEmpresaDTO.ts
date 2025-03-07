import { z } from "zod";
import { dadosGeraisSchema } from "./createDadosGeraisDTO";
import { dadosFiscaisSchema } from "./DadosFiscais/createDadosFiscaisDTO";


const empresaSchema = z.object({
    DadosGerais: dadosGeraisSchema,
    DadosFiscais: dadosFiscaisSchema,
})


export type CreateEmpresaDTO = z.infer<typeof empresaSchema>;
