import { ListEmpresaDTO } from "../../dtos/listEmpresaDTO";
import { EmpresaRepository } from "../../infra/repositories/interfaceDB/EmpresaRepository";



export class ListEmpresaUseCase {
    constructor(private empresaRepository: EmpresaRepository){}

    async execute(): Promise<ListEmpresaDTO[]> {
        return this.empresaRepository.list()
    }
}