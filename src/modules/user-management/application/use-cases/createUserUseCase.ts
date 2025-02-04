import { User } from "../../domain/entities/user";
import { Permissoes } from "../../domain/value-objects/permissoes/permissoes";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";
import { PrismaUserRepository } from "../../infra/repositories/prisma/prismaUserRepo";
import { PasswordHasher } from "../../infra/services/passwordHasher";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository){}

     async execute(props: CreateUserInputDTO, empresaId : string): Promise<void>{
        let { nome, email, senha, permissoes, perfil} = props
        senha = await PasswordHasher.hash(senha);
        Permissoes.validatePermissions(permissoes);

        const user = await User.create(props);
        await this.userRepository.create(user)
    }
}