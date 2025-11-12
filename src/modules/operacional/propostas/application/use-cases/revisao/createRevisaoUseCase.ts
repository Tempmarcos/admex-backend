import { CreateRevisaoDTO } from "../../../dtos/CreateRevisaoDTO";
import { PropostaRepository } from "../../../infra/repositories/interfaceDB/propostaRepository";

export class CreateRevisaoUseCase {
    constructor(private propostaRepository: PropostaRepository){}

     async execute(data: CreateRevisaoDTO, propostaId : string): Promise<void>{
        await this.propostaRepository.createRevisao(data, propostaId);
    }
}