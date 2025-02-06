import { User } from "../../domain/entities/user";
import { Permissoes } from "../../domain/value-objects/permissoes/permissoes";

import { UpdateUserInputDTO } from "../../dtos/user/UpdateUserInputDTO";
import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";


export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(props: UpdateUserInputDTO, id: string){
        let { nome, permissoes } = props
        if(permissoes) Permissoes.validatePermissions(permissoes);
        if(nome) User.nomeValidate(nome)

        await this.userRepository.update(props, id)
    }
}