import { User } from "@prisma/client";
import { PrismaUserRepository } from "../../infra/repositories/prisma/prismaUserRepo"


export class ListUserUseCase {
    constructor(private userRepository: PrismaUserRepository){}

    async execute(empresaId: string): Promise<User[]> {
  
        return this.userRepository.list(empresaId)
        }
    }