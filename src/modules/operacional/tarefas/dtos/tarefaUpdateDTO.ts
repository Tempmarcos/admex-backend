import { z } from "zod";

enum status {
    Pendente = 'pendente',
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

export const tarefaUpdateSchema = z.object({
    nome: z.string(),
    tipo: z.nativeEnum(tipo),
    responsavelId: z.string(),
    status: z.nativeEnum(status),
    dataAgendada: z.date().optional(),
    dataExecutada: z.date().optional(), 
})

export type TarefaUpdateDTO = z.infer<typeof tarefaUpdateSchema>