import { env } from '../../../../env';
import { UserRepository } from '../../infra/repositories/interfaceDB/UserRepository';
import { LoginDTO } from '../../dtos/login/LoginDTO';
import { UserNotExistsError } from '../../../shared/errors/user/userNotExistsError';
import { AuthInterface } from '../../infra/services/auth/authInterface';
import { InvalidSenhaError } from '../../../shared/errors/senha/invalidSenhaError';
import { PasswordHasher } from '../../infra/services/passwordHasher';


export class LoginUseCase {
    constructor(private userRepository: UserRepository, private authInterface: AuthInterface) { }


    async execute({email, senha}: LoginDTO) : Promise<object>{
  
      const userExist = await this.userRepository.findByEmail(email)
  
      if (!userExist) {
        throw new UserNotExistsError()
      }
  
      // console.log(userExist)

      const passwordMatch = await PasswordHasher.compare(senha, userExist.senha)

      // console.log(passwordMatch)
      
      if (!passwordMatch) {
        throw new InvalidSenhaError()
      }
  
      const token = await this.authInterface.sign({userID: userExist.id, 
        empresaID: 'empresaID'});
  
        // console.log(token)
      return {
        user: userExist,
        token,
      }
    }
  };