import { EmailAlreadyExistsError } from "../../../../shared/errors/email/emailAlreadyExistsError";
import { MesmoEmailError } from "../../../../shared/errors/email/mesmoEmailError";
import { UserNotExistsError } from "../../../../shared/errors/user/userNotExistsError";
import { Email } from "../../../../shared/value-objects/email/email";
import { UpdateEmailDTO } from "../../../dtos/user/UpdateEmailDTO";
import { UserRepository } from "../../../infra/repositories/interfaceDB/UserRepository";



export class UpdateEmailUseCase {
        constructor(private userRepository: UserRepository){}

        async execute(email: string, id: string){
            Email.validate(email)

            const userExist = await this.userRepository.findById(id)
            if (!userExist) {
                throw new UserNotExistsError()
            }
            if(userExist.email === email){
                throw new MesmoEmailError()
            }

            const emailExists = await this.userRepository.findByEmail(email);
            if (emailExists){ 
                throw new EmailAlreadyExistsError;
            }
        }
}