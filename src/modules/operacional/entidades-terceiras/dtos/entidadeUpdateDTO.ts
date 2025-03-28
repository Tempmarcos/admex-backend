import { z } from "zod";
import { contatoSchema } from "../domain/value-objects/contato";
import { dadosFinanceirosSchema } from "../../empresa/dtos/createDadosFinanceirosDTO";

export const entidadeUpdateSchema = z.object({
    nome: z.string().optional(),
    contato: contatoSchema.optional(),
    endereco: z.any().optional(),
    registro: z.string().optional(),
    dadosFinanceiros: dadosFinanceirosSchema.optional()
})

export type entidadeUpdateDTO = z.infer<typeof entidadeUpdateSchema>