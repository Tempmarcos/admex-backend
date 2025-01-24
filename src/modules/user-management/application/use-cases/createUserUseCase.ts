import { Email } from "../../../shared/value-objects/email/email";
import { User } from "../../domain/entities/user";
import { Senha } from "../../domain/value-objects/senha/senha";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { PasswordHasher } from "../../infra/services/passwordHasher";

export class CreateUserUseCase {
    static async execute(props: CreateUserInputDTO, empresaId : string){
        const { nome, email, senha, permissoes, perfil} = props
        User.nomeValidate(nome);
        Email.validate(email);
        Senha.validate(senha);
        const senhaHash = await PasswordHasher.hash(senha)



        // User.create()
    }
}