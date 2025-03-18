import { EmpresaNotExistsError } from "../../../../shared/errors/empresa/empresaNotExistsError";
import { EmpresaRepository } from "../../infra/repositories/interfaceDB/EmpresaRepository";



export class DeleteEmpresaUseCase {
    constructor(private empresaRepository: EmpresaRepository){}

    async execute(empresaId: string): Promise<void>{
        const empresaExists = await this.empresaRepository.findById(empresaId)

        if(!empresaExists) {
            throw new EmpresaNotExistsError();
        }

        await this.empresaRepository.delete(empresaId)
    }
}