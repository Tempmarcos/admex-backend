import { EmpresaNotExistsError } from "../../../../shared/errors/empresa/empresaNotExistsError";
import { GetEmpresaDTO } from "../../dtos/getEmpresaDTO";
import { EmpresaRepository } from "../../infra/repositories/interfaceDB/EmpresaRepository";

export class GetEmpresaUseCase {
    constructor(private empresaRepository: EmpresaRepository){}

    async execute(id: string): Promise<GetEmpresaDTO | null> {
        // console.log(id)
        const empresaExist = this.empresaRepository.findById(id);
        if(!empresaExist){
            throw new EmpresaNotExistsError();
        }
        return this.empresaRepository.get(id)
        }
    }