import { PropostaNotExistsError } from "../../../../shared/errors/proposta/propostaNotExistsError";
import { PropostaRepository } from "../../infra/repositories/interfaceDB/propostaRepository";

export class DeletePropostaUseCase {
    constructor(private repository: PropostaRepository) {}

     async execute(id: string): Promise<void> {
        const propostaExists = await this.repository.findById(id)
        
        if(!propostaExists) {
            throw new PropostaNotExistsError();
        }
        
        await this.repository.delete(id)
     }
}