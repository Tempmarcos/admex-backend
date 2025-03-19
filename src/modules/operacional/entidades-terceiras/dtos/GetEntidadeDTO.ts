import { z } from "zod"
import { contatoSchema } from "../domain/value-objects/contato"
import { dadosFiscaisSchema } from "../../empresa/dtos/DadosFiscais/DadosFiscaisDTO"

const getEntidadeSchema = z.object({
    id: z.string(),
    empresaId: z.string(),
    nome: z.string(),
    contato: contatoSchema,
    endereco: z.any(),
    dadosFiscais: dadosFiscaisSchema
})

export type getEntidadeDTO = z.infer<typeof getEntidadeSchema>