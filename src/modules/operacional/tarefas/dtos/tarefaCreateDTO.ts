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

export const tarefaCreateSchema = z.object({
    nome: z.string(),
    tipo: z.nativeEnum(tipo),
    descricao: z.string().optional().nullish(),
    responsavelId: z.string(),
    dataAgendada:z.preprocess((val) => {
    if (typeof val === "string") {
      return new Date(val); // transforma string em Date
    }
    return val;
  }, z.date().optional().nullish()),
})

export type TarefaCreateDTO = z.infer<typeof tarefaCreateSchema>