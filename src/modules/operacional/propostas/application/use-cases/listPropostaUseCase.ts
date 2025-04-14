import { PropostaRepository } from "../../infra/repositories/interfaceDB/propostaRepository";

export class ListPropostaUseCase {
    constructor(private repository: PropostaRepository) {}

     async execute(empresaId: string): Promise<void> {
        return this.repository.list(empresaId)
     }
}