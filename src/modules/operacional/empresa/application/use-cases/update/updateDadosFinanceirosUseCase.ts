import { DadosFinanceiros } from "../../../domain/value-objects/dadosFinanceiros/dadosFinanceiros";
import { CreateDadosFinanceirosDTO } from "../../../dtos/createDadosFinanceirosDTO";
import { EmpresaRepository } from "../../../infra/repositories/interfaceDB/EmpresaRepository";

export class UpdateDadosFinanceirosUseCase {
    constructor(private empresaRepository: EmpresaRepository){}

    async execute(props: CreateDadosFinanceirosDTO, id: string){
        const dadosFinanceirosData = await DadosFinanceiros.create(props)

        this.empresaRepository.updateDadosFinanceiros(dadosFinanceirosData, id)
    }
}