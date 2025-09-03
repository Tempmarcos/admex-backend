import { cantGivePermissionError } from "../../../../shared/errors/permissoes/cantGivePermissionError";
import { sameIdError } from "../../../../shared/errors/permissoes/sameIdError";
import { cantUpdateAdminError } from "../../../../shared/errors/user/cantUpdateAdminError";
import { User } from "../../../domain/entities/user";
import { Permissoes } from "../../../domain/value-objects/permissoes/permissoes";
import { UpdatePermissionsInputDTO } from "../../../dtos/user/UpdatePermissionDTO";

import { UserRepository } from "../../../infra/repositories/interfaceDB/UserRepository";


export class UpdatePermissionsUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(props: UpdatePermissionsInputDTO, id: string, actingUser: any){
        if(actingUser.id === id) throw new sameIdError();

        const user = await this.userRepository.findById(id)
        if(user?.admin === true) throw new cantUpdateAdminError();

        
        let { permissoes, admin } = props
        if(Permissoes.comparePermissions(permissoes, actingUser.permissoes) === false) throw new cantGivePermissionError()

        if(admin === true) Permissoes.giveAllPermissoes(permissoes)
        if(permissoes) Permissoes.validatePermissions(permissoes);

        await this.userRepository.update(props, id)
    }
}