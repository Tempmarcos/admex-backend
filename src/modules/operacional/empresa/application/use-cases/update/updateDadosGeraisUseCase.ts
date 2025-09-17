import { EnderecoFactory } from "../../../../shared/endereco/enderecoFactory";
import { DadosGerais } from "../../../domain/value-objects/dadosGerais/dadosGerais";
import { CreateDadosGeraisDTO } from "../../../dtos/createDadosGeraisDTO";
import { EmpresaRepository } from "../../../infra/repositories/interfaceDB/EmpresaRepository";

export class UpdateDadosGeraisUseCase {
    constructor(private empresaRepository: EmpresaRepository){}

    async execute(props: CreateDadosGeraisDTO, id: string){
        const enderecoFormatado = EnderecoFactory.criar(props.endereco)
        enderecoFormatado.validar(enderecoFormatado)
        props.endereco = enderecoFormatado
        const dadosGeraisData = await DadosGerais.create(props)
        this.empresaRepository.updateDadosGerais(dadosGeraisData, id)
    }
}