import { CreateUserInputDTO } from "../../../../user-management/dtos/user/CreateUserInputDTO";
import { UserRepository } from "../../../../user-management/infra/repositories/interfaceDB/UserRepository";
import { CreateEmpresaDTO } from "../../dtos/CreateEmpresaDTO";
import { EmpresaRepository } from "../../infra/repositories/interfaceDB/EmpresaRepository";

export class CreateEmpresaUseCase {
    constructor(
        private empresaRepository: EmpresaRepository,
        private userRepository: UserRepository
    ){}

    async execute(empresa: CreateEmpresaDTO, user: CreateUserInputDTO)
    // : Promise<{empresa: Empresa; admin: Usuario}
    {
        const empresaCriada = await this.empresaRepository.create(empresa)

        const admin = await this.userRepository.create(user, empresaCriada!.id)
    }

}