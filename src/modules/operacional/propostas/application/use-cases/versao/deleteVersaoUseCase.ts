import { VersaoNotExistsError } from "../../../../../shared/errors/proposta/versaoNotExistsError";
import { PropostaRepository } from "../../../infra/repositories/interfaceDB/propostaRepository";

export class DeleteTarefaUseCase {
    constructor(private repository: PropostaRepository) {}

     async execute(id: string): Promise<void> {
        const propostaExists = await this.repository.findById(id)
        
        if(!propostaExists) {
            throw new VersaoNotExistsError();
        }
        
        await this.repository.delete(id)
     }
}