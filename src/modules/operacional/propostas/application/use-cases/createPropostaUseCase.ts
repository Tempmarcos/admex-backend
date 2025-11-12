import { CreatePropostaDTO, status } from "../../dtos/CreatePropostaDTO";
import { PropostaDTO } from "../../dtos/PropostaDTO";
import { PropostaRepository } from "../../infra/repositories/interfaceDB/propostaRepository";

export class CreatePropostaUseCase {
    constructor(private propostaRepository: PropostaRepository){}

     async execute(data: CreatePropostaDTO, empresaId : string): Promise<void>{
        const codigo = await this.propostaRepository.checarUltimoCodigo(empresaId)

        if(!data.status){
            data.status = status.Criada
        }

        const proposta : PropostaDTO = {
            codigo: codigo!, 
            descricao: data.descricao,
            status: data.status,
            clienteId: data.clienteId,
        }
        await this.propostaRepository.create(proposta, empresaId)
    }
}