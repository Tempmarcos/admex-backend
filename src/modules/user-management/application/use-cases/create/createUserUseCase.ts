import { EmailAlreadyExistsError } from "../../../../shared/errors/email/emailAlreadyExistsError";
import { User } from "../../../domain/entities/user";
import { Permissoes } from "../../../domain/value-objects/permissoes/permissoes";
import { CreateUserConviteDTO } from "../../../dtos/user/CreateUserConviteDTO";
import { UserRepository } from "../../../infra/repositories/interfaceDB/UserRepository";
import { PasswordHasher } from "../../../infra/services/passwordHasher";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(props: CreateUserConviteDTO, token: string): Promise<void> {
        let { nome, email, senha, perfil } = props
        senha = await PasswordHasher.hash(senha);
        User.nomeValidate(nome)
        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) throw new EmailAlreadyExistsError;
        const permissoes: any = [];
        const admin = false;

        const user = await User.create({ nome, email, senha, permissoes, perfil, admin });

        //DESCRIPTOGRAFAR O TOKEN
        const empresaId = 'oii'
        await this.userRepository.create(user, empresaId)
    }
}