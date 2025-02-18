import { env } from '../../../../env';
import { UserRepository } from '../../infra/repositories/interfaceDB/UserRepository';
import { LoginDTO } from '../../dtos/login/LoginDTO';
import { UserNotExistsError } from '../../../shared/errors/user/userNotExistsError';
import { AuthInterface } from '../../infra/services/auth/authInterface';
import { InvalidSenhaError } from '../../../shared/errors/senha/invalidSenhaError';
import { PasswordHasher } from '../../infra/services/passwordHasher';
import { LoginResponseDTO } from '../../dtos/login/LoginResponseDTO';


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


        const loginResponse : Omit<LoginResponseDTO, 'perfil'> = {
          id: userExist.id,
          nome: userExist.nome,
          email: userExist.email,
          permissoes: userExist.permissoes,
          created_at: userExist.created_at,
          updatedAt: userExist.updatedAt,
          // perfil: userExist.perfil,
          token: token
        }
      return {
        loginResponse
        
      }
    }
  };