import { Email } from "../../../shared/value-objects/email/email";
import { User } from "../../domain/entities/user";
import { Perfil } from "../../domain/value-objects/perfil/perfil";
import { Permissoes } from "../../domain/value-objects/permissoes/permissoes";
import { Senha } from "../../domain/value-objects/senha/senha";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { PrismaUserRepository } from "../../infra/repositories/prisma/prismaUserRepo";
import { PasswordHasher } from "../../infra/services/passwordHasher";

export class CreateUserUseCase {
    static async execute(props: CreateUserInputDTO, empresaId : string){
        let { nome, email, senha, permissoes, perfil} = props
        User.nomeValidate(nome);
        Email.validate(email);
        Senha.validate(senha);
        senha = await PasswordHasher.hash(senha);
        Permissoes.validatePermissions(permissoes);
        Perfil.validate(perfil)



        const user = await User.create(props);
        const repo = new PrismaUserRepository();
        repo.create(user)
    }
}