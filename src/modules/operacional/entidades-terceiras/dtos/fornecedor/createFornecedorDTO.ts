import { z } from "zod"
import { contatoSchema } from "../../domain/value-objects/contato"
import { dadosFiscaisSchema } from "../../../empresa/dtos/DadosFiscais/DadosFiscaisDTO"
import { dadosFinanceirosSchema } from "../../../empresa/dtos/createDadosFinanceirosDTO"

export const fornecedorSchema = z.object({
    nome: z.string(),
    contato: contatoSchema,
    endereco: z.any(),
    dadosFiscais: dadosFiscaisSchema,
    dadosFinanceiros: dadosFinanceirosSchema
})

export type createFornecedorDTO = z.infer<typeof fornecedorSchema>