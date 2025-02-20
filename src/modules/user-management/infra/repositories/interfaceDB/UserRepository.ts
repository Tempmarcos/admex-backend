import { User } from "@prisma/client";
import { CreateUserInputDTO } from "../../../dtos/user/CreateUserInputDTO";
import { ListUserDTO } from "../../../dtos/user/ListUserDTO";
import { UpdateUserInputDTO } from "../../../dtos/user/UpdateUserInputDTO";
import { GetUserDTO } from "../../../dtos/user/GetUserDTO";
import { UpdatePerfilInputDTO } from "../../../dtos/perfil/UpdatePerfilInputDTO";
import { UpdateSenhaDTO } from "../../../dtos/user/UpdateSenhaDTO";
import { UpdateEmailDTO } from "../../../dtos/user/UpdateEmailDTO";


export interface UserRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(data: CreateUserInputDTO, empresaId: string): Promise<User | null>
    list(empresaId: string): Promise<ListUserDTO[]>
    delete(id: string): Promise<User | null>
    get(id: string): Promise<GetUserDTO | null>
    update(data: UpdateUserInputDTO, id: string): Promise<User | null>
    updatePerfil(data: UpdatePerfilInputDTO, id: string): Promise<User | null>
    updateSenha(senha: string, id: string): Promise<User | null>
    updateEmail(email: string, id: string) : Promise<User | null>
}