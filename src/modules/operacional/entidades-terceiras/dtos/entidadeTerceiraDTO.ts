import { z } from "zod";
import { dadosFiscaisSchema } from "../../empresa/dtos/DadosFiscais/DadosFiscaisDTO";
import { contatoSchema } from "../domain/value-objects/contato";

const entidadeSchema = z.object({
    nome: z.string(),
    contato: contatoSchema,
    endereco: z.any(),
    dadosFiscais: dadosFiscaisSchema
})

export type entidadeTerceiraDTO = z.infer<typeof entidadeSchema>