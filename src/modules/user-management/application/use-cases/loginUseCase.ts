import { env } from '../../../../env';
import { UserRepository } from '../../infra/repositories/interfaceDB/UserRepository';
import { LoginDTO } from '../../dtos/login/LoginDTO';
import { UserNotExistsError } from '../../../shared/errors/user/userNotExistsError';
import { AuthInterface } from '../../infra/services/auth/authInterface';
import { PasswordHasher } from '../../infra/services/passwordHasher';
import { LoginResponseDTO } from '../../dtos/login/LoginResponseDTO';
import { SenhaErradaError } from '../../../shared/errors/senha/senhaErradaError';


export class LoginUseCase {
    constructor(private userRepository: UserRepository, private authInterface: AuthInterface) { }

    async execute({email, senha}: LoginDTO) : Promise<object>{
      const userExist = await this.userRepository.findByEmail(email)
      if (!userExist) {
        throw new UserNotExistsError
      }
      // console.log(userExist)
      const passwordMatch = await PasswordHasher.compare(senha, userExist.senha)
      // console.log(passwordMatch)
      if (!passwordMatch) {
        throw new SenhaErradaError()
      }
  
      const token = await this.authInterface.sign({userID: userExist.id}, '6h');
  
        // console.log(token)


        const loginResponse : Omit<LoginResponseDTO,  'admin'> = {
          id: userExist.id,
          nome: userExist.nome,
          email: userExist.email,
          permissoes: userExist.permissoes,
          created_at: userExist.created_at,
          updatedAt: userExist.updatedAt,
          empresaId: '',
          perfil: {
            // @ts-ignore Tá funcionando perfeitamente, o typescript que tá enchendo o saco
            foto: userExist.perfil.foto,
            // @ts-ignore
            nomeDeUsuario: userExist.perfil.nomeDeUsuario,
            // @ts-ignore
            fonte: userExist.perfil.fonte,
            // @ts-ignore
            tema: userExist.perfil.tema
          },
          token: token
        }
      return {
        loginResponse
        
      }
    }
  };