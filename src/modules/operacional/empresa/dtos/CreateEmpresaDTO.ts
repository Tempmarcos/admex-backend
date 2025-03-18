import { z } from "zod";
import { dadosGeraisSchema } from "./createDadosGeraisDTO";
import { dadosFiscaisSchema } from "./DadosFiscais/DadosFiscaisDTO";
import { dadosFinanceirosSchema } from "./createDadosFinanceirosDTO";
import { CreateUserInputZod } from "../../../user-management/dtos/user/CreateUserInputDTO";



export const empresaSchema = z.object({
    DadosGerais: dadosGeraisSchema,
    DadosFiscais: dadosFiscaisSchema,
    DadosFinanceiros: dadosFinanceirosSchema,
    User: CreateUserInputZod
})


export type CreateEmpresaDTO = z.infer<typeof empresaSchema>;
