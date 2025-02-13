import { EmailAlreadyExistsError } from "../../../../shared/errors/email/emailAlreadyExistsError";
import { User } from "../../../domain/entities/user";
import { Permissoes } from "../../../domain/value-objects/permissoes/permissoes";
import { CreateUserInputDTO } from "../../../dtos/user/CreateUserInputDTO";
import { UserRepository } from "../../../infra/repositories/interfaceDB/UserRepository";
import { PasswordHasher } from "../../../infra/services/passwordHasher";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository){}

     async execute(props: CreateUserInputDTO, empresaId : string): Promise<void>{
        let { nome, email, senha, permissoes, perfil} = props
        senha = await PasswordHasher.hash(senha);
        Permissoes.validatePermissions(permissoes);
        User.nomeValidate(nome)
        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) throw new EmailAlreadyExistsError;


        const user = await User.create(props);
        await this.userRepository.create(user, empresaId)
    }
}