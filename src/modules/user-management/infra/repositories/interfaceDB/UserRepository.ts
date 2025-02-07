import { Prisma, User } from "@prisma/client";
import { CreateUserInputDTO } from "../../../dtos/user/CreateUserInputDTO";
import { ListUserDTO } from "../../../dtos/user/ListUserDTO";
import { UpdateUserInputDTO } from "../../../dtos/user/UpdateUserInputDTO";


export interface UserRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(data: CreateUserInputDTO, empresaId: string): Promise<User | null>
    list(empresaId: string): Promise<ListUserDTO[]>
    delete(id: string): Promise<User | null>
    //Criar get e update
    update(data: UpdateUserInputDTO, id: string): Promise<User | null>

}