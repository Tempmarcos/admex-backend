import { TarefaNotExistsError } from "../../../../shared/errors/tarefa/TarefaNotExistsError";
import { TarefaRepository } from "../../infra/repositories/interfaceDB/tarefaRepository";

export class GetTarefaUseCase {
    constructor(private repository: TarefaRepository) {}

     async execute(id: string): Promise<void> {
        const tarefaExists = await this.repository.findById(id)
        
        if(!tarefaExists) {
            throw new TarefaNotExistsError();
        }
        
        return await this.repository.get(id)
     }
}