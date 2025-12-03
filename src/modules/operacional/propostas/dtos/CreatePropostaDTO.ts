import { z } from "zod";
import { revisaoCreateSchema } from "./CreateRevisaoDTO";

export enum status {
    Criada = 'criada',
    Enviada = 'enviada',
    Aprovada = 'aprovada',
    Executada = 'executada',
    Cancelada = 'cancelada'
}

export const createPropostaSchema = z.object({
    descricao: z.string().optional(),
    tituloProjeto: z.string().optional(),
    endereco: z.string().optional(),
    clienteId: z.string(),
    status: z.preprocess(
  (val) => (val === '' ? undefined : val),
  z.nativeEnum(status).optional().nullish()
),
    revisao: revisaoCreateSchema.optional().nullish()
})

export type CreatePropostaDTO = z.infer<typeof createPropostaSchema>