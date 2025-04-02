import { TarefaUpdateDTO, tarefaUpdateSchema } from "../../dtos/tarefaUpdateDTO";
import { TarefaRepository } from "../../infra/repositories/interfaceDB/tarefaRepository";

export class UpdateTarefaUseCase {
  constructor(private repository: TarefaRepository) {}

  async execute(tarefa: TarefaUpdateDTO, id: string): Promise<void> {
    tarefaUpdateSchema.parse(tarefa)
    await this.repository.update(tarefa, id);
  }
}