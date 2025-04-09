import { z } from "zod";
import { versaoSchema } from "./VersaoPropostaDTO";

enum status {
    Criada = 'criada',
    Enviada = 'enviada',
    Aprovada = 'aprovada',
    Executada = 'executada',
    Cancelada = 'cancelada'
}

export const propostaSchema = z.object({
    titulo: z.string(),
    codigo: z.string(),
    descricao: z.string().optional(),
    clienteId: z.string(),
    status: z.nativeEnum(status),
    versao: versaoSchema
})

export type PropostaDTO = z.infer<typeof propostaSchema>