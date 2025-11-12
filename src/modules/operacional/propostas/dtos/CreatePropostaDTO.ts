import { z } from "zod";

export enum status {
    Criada = 'criada',
    Enviada = 'enviada',
    Aprovada = 'aprovada',
    Executada = 'executada',
    Cancelada = 'cancelada'
}

export const createPropostaSchema = z.object({
    descricao: z.string().optional(),
    clienteId: z.string(),
    status: z.preprocess(
  (val) => (val === '' ? undefined : val),
  z.nativeEnum(status).optional().nullable()
)
})

export type CreatePropostaDTO = z.infer<typeof createPropostaSchema>