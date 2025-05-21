import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";
import { ListUserDTO } from "../../dtos/user/ListUserDTO";


export class ListUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(empresaId: string): Promise<ListUserDTO[]> {
        return this.userRepository.list(empresaId)
        }
    }