import { EmpresaRepository } from "../../infra/repositories/interfaceDB/EmpresaRepository";


export class TestarRegistroUseCase {
    constructor(private empresaRepository: EmpresaRepository){}

    async execute(registro: string): Promise<boolean> {
        const test = this.empresaRepository.verifyRegistro(registro)
        return test;
        }
    }