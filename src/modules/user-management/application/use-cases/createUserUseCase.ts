import { User } from "../../domain/entities/user";
import { Permissoes } from "../../domain/value-objects/permissoes/permissoes";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { PrismaUserRepository } from "../../infra/repositories/prisma/prismaUserRepo";
import { PasswordHasher } from "../../infra/services/passwordHasher";

export class CreateUserUseCase {
    static async execute(props: CreateUserInputDTO, empresaId : string){
        let { nome, email, senha, permissoes, perfil} = props
        senha = await PasswordHasher.hash(senha);
        Permissoes.validatePermissions(permissoes);

        const user = await User.create(props);
        const repo = new PrismaUserRepository();
        repo.create(user)
    }
}