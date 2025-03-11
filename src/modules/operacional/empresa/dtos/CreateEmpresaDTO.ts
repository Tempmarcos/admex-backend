import { z } from "zod";
import { dadosGeraisSchema } from "./createDadosGeraisDTO";
import { dadosFiscaisSchema } from "./DadosFiscais/createDadosFiscaisDTO";
import { dadosFinanceirosSchema } from "./createDadosFinanceirosDTO";



const empresaSchema = z.object({
    DadosGerais: dadosGeraisSchema,
    DadosFiscais: dadosFiscaisSchema,
    DadosFinanceiros: dadosFinanceirosSchema.optional()
})


export type CreateEmpresaDTO = z.infer<typeof empresaSchema>;
