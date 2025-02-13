import { GetUserDTO } from "../../dtos/user/GetUserDTO";
import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";





export class GetUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(id: string): Promise<GetUserDTO | null> {
        // console.log(id)
        return this.userRepository.get(id)
        }
    }