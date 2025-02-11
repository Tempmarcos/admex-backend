import { env } from '../../../../env';
import { UserRepository } from '../../infra/repositories/interfaceDB/UserRepository';
import { LoginDTO } from '../../dtos/user/loginDTO';
import { UserNotExistsError } from '../../../shared/errors/user/userNotExistsError';
import { compare } from 'bcrypt';
import { AuthInterface } from '../../infra/services/auth/authInterface';


export class AuthUseCase {
    constructor(private userRepository: UserRepository, private authInterface: AuthInterface) { }


    async execute({email, senha}: LoginDTO) {
  
      const userExist = await this.userRepository.findByEmail(email)
  
      if (!userExist) {
        throw new UserNotExistsError()
      }
  
      const passwordMatch = await compare(senha, userExist.senha)
  
      if (!passwordMatch) {
        throw new UserNotExistsError()
      }
  
      const token = await this.authInterface.sign({userID: userExist.id, 
        empresaID: 'empresaID'});
  
      return {
        user: {
          nome: userExist.nome,
          email: userExist.email,
          permissoes: userExist.permissoes,
          empresaID: 'empresaID',
        },
        token,
      }
    }
  };