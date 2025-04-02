import { TarefaCreateDTO, tarefaCreateSchema } from "../../dtos/tarefaCreateDTO";
import { TarefaRepository } from "../../infra/repositories/interfaceDB/tarefaRepository";

export class CreateTarefaUseCase {
  constructor(private repository: TarefaRepository) {}

  async execute(tarefa: TarefaCreateDTO, empresaId: string): Promise<void> {
    tarefaCreateSchema.parse(tarefa)
    await this.repository.create(tarefa, empresaId);
  }
}