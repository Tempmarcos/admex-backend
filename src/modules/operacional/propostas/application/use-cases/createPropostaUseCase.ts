import { CreatePropostaDTO } from "../../dtos/CreatePropostaDTO";
import { PropostaDTO } from "../../dtos/PropostaDTO";
import { VersaoPropostaDTO } from "../../dtos/VersaoPropostaDTO";
import { PropostaRepository } from "../../infra/repositories/interfaceDB/propostaRepository";

export class CreatePropostaUseCase {
    constructor(private propostaRepository: PropostaRepository){}

     async execute(data: CreatePropostaDTO, empresaId : string): Promise<void>{
        const numeroVersao = 1;
        const versao : VersaoPropostaDTO = {
            dataProposta: data.versao.dataProposta,
            valorTotal: data.versao.valorTotal,
            numeroVersao: numeroVersao,
            produto: data.versao.produto,
            servico: data.versao.servico
        }
        const proposta : PropostaDTO = {
            titulo: data.titulo,
            codigo: data.codigo,
            descricao: data.descricao,
            status: data.status,
            clienteId: data.clienteId,
            versao: versao
        }
        await this.propostaRepository.create(proposta, empresaId)
    }
}