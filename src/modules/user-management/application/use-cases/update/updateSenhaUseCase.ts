import { MesmaSenhaError } from "../../../../shared/errors/senha/mesmaSenhaError";
import { SenhaErradaError } from "../../../../shared/errors/senha/senhaErradaError";
import { UserNotExistsError } from "../../../../shared/errors/user/userNotExistsError";
import { sendPasswordChangeNotification } from "../../../../shared/services/emailService";
import { Senha } from "../../../domain/value-objects/senha/senha";
import { UpdateSenhaDTO } from "../../../dtos/user/UpdateSenhaDTO";
import { UserRepository } from "../../../infra/repositories/interfaceDB/UserRepository";
import { PasswordHasher } from "../../../infra/services/passwordHasher";

export class UpdateSenhaUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(props: UpdateSenhaDTO, id: string){
        let { senhaAtual, novaSenha } = props
        
        if (senhaAtual === novaSenha){
            throw new MesmaSenhaError();
        }

        const userExist = await this.userRepository.findById(id)
        if (!userExist) {
                throw new UserNotExistsError()
              }

        Senha.validate(senhaAtual)
        const passwordMatch = await PasswordHasher.compare(senhaAtual, userExist.senha)
        if (!passwordMatch) {
                throw new SenhaErradaError()
              }

        const senha = Senha.validate(novaSenha)
        const senhaHash = await PasswordHasher.hash(senha)

        try{
          await this.userRepository.updateSenha(senhaHash, id)
          await sendPasswordChangeNotification(userExist.email, userExist.nome, new Date)
        }catch(error){
          console.log(error)
        }
    }
}