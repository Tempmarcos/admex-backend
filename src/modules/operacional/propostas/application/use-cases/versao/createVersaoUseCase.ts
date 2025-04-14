import { CreateVersaoPropostaDTO } from "../../../dtos/CreateVersaoPropostaDTO";
import { PropostaRepository } from "../../../infra/repositories/interfaceDB/propostaRepository";

export class CreateVersaoUseCase {
    constructor(private propostaRepository: PropostaRepository){}

     async execute(data: CreateVersaoPropostaDTO, propostaId : string): Promise<void>{
        await this.propostaRepository.createVersao(data, propostaId);
    }
}