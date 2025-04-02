import { TarefaRepository } from "../../infra/repositories/interfaceDB/tarefaRepository";

export class ListTarefaUseCase {
    constructor(private repository: TarefaRepository) {}

     async execute(empresaId: string): Promise<void> {
        return this.repository.list(empresaId)
     }
}