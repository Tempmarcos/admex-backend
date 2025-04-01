import { z } from "zod";

enum status {
    Agendada = 'agendada',
    Atrasada = 'atrasada',
    Executada = 'executada',
    Cancelada = 'cancelada'
}

enum tipo {
    Proposta = 'proposta',
    Servico = 'servico',
    Compra = 'compra',
    Tarefa = 'tarefa'
}

export const tarefaCreateSchema = z.object({
    nome: z.string(),
    tipo: z.nativeEnum(tipo),
    responsavelId: z.string(),
    criadorId: z.string(),
    status: z.nativeEnum(status),
    dataAgendada: z.date().optional(),
    dataExecutada: z.date().optional(), 
})

export type TarefaCreateDTO = z.infer<typeof tarefaCreateSchema>