import { EmailAlreadyExistsError } from "../../../../shared/errors/email/emailAlreadyExistsError";
import { MesmoEmailError } from "../../../../shared/errors/email/mesmoEmailError";
import { UserNotExistsError } from "../../../../shared/errors/user/userNotExistsError";
import { sendEmailUpdateConfirmation } from "../../../../shared/services/emailService";
import { Email } from "../../../../shared/value-objects/email/email";
import { UpdateEmailDTO } from "../../../dtos/user/UpdateEmailDTO";
import { UserRepository } from "../../../infra/repositories/interfaceDB/UserRepository";
import { AuthInterface } from "../../../infra/services/auth/authInterface";



export class UpdateEmailUseCase {
        constructor(private userRepository: UserRepository, private authInterface: AuthInterface){}

        async execute(data: UpdateEmailDTO, id: string){
            const email = data.email;
            // console.log(data)

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

            const token = await this.authInterface.sign(
                {id, email},
                '1h'
            )

            const confirmationLink = 
            `http://localhost:3333/users/confirmar-email-update/${token}`;

            await sendEmailUpdateConfirmation(email, confirmationLink, userExist.nome)
        }
}