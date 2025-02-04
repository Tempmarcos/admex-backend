import { User } from "@prisma/client";
import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";


export class ListUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(empresaId: string): Promise<User[]> {
  
        return this.userRepository.list(empresaId)
        }
    }