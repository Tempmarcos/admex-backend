import { Prisma, User } from "@prisma/client";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { ListUserDTO } from "../../dtos/user/ListUserDTO";


export interface UserRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(data: CreateUserInputDTO): Promise<User | null>
    list(): Promise<ListUserDTO[]>
    delete(id: string): Promise<User | null>
    //Criar get e update
}