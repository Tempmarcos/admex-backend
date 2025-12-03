import { z } from "zod";
import { revisaoSchema } from "./RevisaoDTO";
import { revisaoCreateSchema } from "./CreateRevisaoDTO";


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
    tituloProjeto: z.string().optional(),
    endereco: z.string().optional(),
    clienteId: z.string(),
    status: z.nativeEnum(status),
    revisao: revisaoCreateSchema.optional().nullish()
})

export type PropostaDTO = z.infer<typeof propostaSchema>