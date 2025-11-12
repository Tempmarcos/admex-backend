import { z } from "zod";
import { revisaoSchema } from "./RevisaoDTO";


enum status {
    Criada = 'criada',
    Enviada = 'enviada',
    Aprovada = 'aprovada',
    Executada = 'executada',
    Cancelada = 'cancelada'
}

export const propostaSchema = z.object({
    codigo: z.string(),
    descricao: z.string().optional(),
    clienteId: z.string(),
    status: z.nativeEnum(status),
    revisao: revisaoSchema.optional()
})

export type PropostaDTO = z.infer<typeof propostaSchema>