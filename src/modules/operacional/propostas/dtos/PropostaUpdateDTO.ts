import { z } from "zod";

enum status {
    Criada = 'criada',
    Enviada = 'enviada',
    Aprovada = 'aprovada',
    Executada = 'executada',
    Cancelada = 'cancelada'
}

export const propostaUpdateSchema = z.object({
    descricao: z.string().optional(),
    status: z.nativeEnum(status),
    tituloProjeto: z.string().optional(),
    endereco: z.string().optional()
})

export type PropostaUpdateDTO = z.infer<typeof propostaUpdateSchema>