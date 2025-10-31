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
    dataAgendada:z.preprocess((val) => {
    if (typeof val === "string") {
      return new Date(val); // transforma string em Date
    }
    return val;
  }, z.date().optional().nullish()),
    dataExecutada: z.preprocess((val) => {
    if (typeof val === "string") {
      return new Date(val); // transforma string em Date
    }
    return val;
  }, z.date().optional().nullish()), 
})

export type TarefaUpdateDTO = z.infer<typeof tarefaUpdateSchema>