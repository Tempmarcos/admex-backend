import { User } from "../../domain/entities/user";
import { Permissoes } from "../../domain/value-objects/permissoes/permissoes";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";


export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(props: CreateUserInputDTO, id: string){
        let { nome, email, senha, permissoes, perfil} = props
        //HASHEAR SENHA????

        
    }
}