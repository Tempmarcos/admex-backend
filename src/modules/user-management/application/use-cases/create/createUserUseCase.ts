import { EmailAlreadyExistsError } from "../../../../shared/errors/email/emailAlreadyExistsError";
import { User } from "../../../domain/entities/user";
import { CreateUserConviteDTO } from "../../../dtos/user/CreateUserConviteDTO";
import { ConviteRepository } from "../../../infra/repositories/interfaceDB/ConviteRepository";
import { UserRepository } from "../../../infra/repositories/interfaceDB/UserRepository";
import { PasswordHasher } from "../../../infra/services/passwordHasher";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository, private conviteRepository: ConviteRepository) { }

    async execute(props: CreateUserConviteDTO, token: string, empresaId: string): Promise<void> {
        let { nome, email, senha, perfil } = props
        senha = await PasswordHasher.hash(senha);
        User.nomeValidate(nome)
        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) throw new EmailAlreadyExistsError;
        const permissoes: any = [];
        const admin = false;
        const user = await User.create({ nome, email, senha, permissoes, perfil, admin });
        await this.userRepository.create(user, empresaId)
        await this.conviteRepository.utilizarConvite(token, user.nome)
    }
}