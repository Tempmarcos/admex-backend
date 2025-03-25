import { z } from "zod";
import { dadosFiscaisSchema } from "../../empresa/dtos/DadosFiscais/DadosFiscaisDTO";
import { contatoSchema } from "../domain/value-objects/contato";
import { dadosFinanceirosSchema } from "../../empresa/dtos/createDadosFinanceirosDTO";

export const entidadeSchema = z.object({
    nome: z.string(),
    contato: contatoSchema,
    endereco: z.any(),
    registro: z.string(),
    dadosFinanceiros: dadosFinanceirosSchema.optional()
})

export type entidadeTerceiraDTO = z.infer<typeof entidadeSchema>