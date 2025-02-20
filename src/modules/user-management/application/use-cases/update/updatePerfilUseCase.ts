import { Perfil } from "../../../domain/value-objects/perfil/perfil";
import { UpdatePerfilInputDTO } from "../../../dtos/perfil/UpdatePerfilInputDTO";
import { UserRepository } from "../../../infra/repositories/interfaceDB/UserRepository";


export class UpdatePerfilUseCase {
    constructor(private userRepository: UserRepository){}
    
    async execute(props: UpdatePerfilInputDTO, id: string){
        let {foto, nomeDeUsuario, tema, fonte} = props
        Perfil.validate(props)

        await this.userRepository.updatePerfil(props, id)

    }
}