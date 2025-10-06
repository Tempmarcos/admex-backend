import { z } from "zod"
import { contatoSchema } from "../../domain/value-objects/contato"
import { dadosFinanceirosSchema } from "../../../empresa/dtos/createDadosFinanceirosDTO"

export const fornecedorSchema = z.object({
    nome: z.string(),
    contato: contatoSchema,
    registro: z.string(),
    endereco: z.any(),
    dadosFinanceiros: dadosFinanceirosSchema
})

export type createFornecedorDTO = z.infer<typeof fornecedorSchema>